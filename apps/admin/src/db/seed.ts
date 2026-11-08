import { SEED_ANNOTATIONS, SEED_ARTIFACTS } from "@rizer/domain/seed";
import { and, count, eq, inArray, isNull } from "drizzle-orm";

import type { SeedImageManifest } from "@/entities/artifact";

import type { Database } from "./index";
import { annotations, artifacts, users } from "./schema";

export const SEED_USERS = {
  curator: { id: "usr_curator", email: "curator@rizer.dev", name: "큐레이터", role: "curator" as const },
  guest: { id: "usr_guest", email: "guest@rizer.dev", name: "게스트", role: "guest" as const },
};

/** 게스트 계정 비밀번호. 포트폴리오 방문자가 둘러볼 수 있게 로그인 화면에 공개한다(쓰기 권한 없음). */
export const GUEST_PASSWORD = "guest1234";
/** 개발용 큐레이터 비밀번호. 운영에서는 CURATOR_PASSWORD 환경 변수를 쓴다. */
export const DEV_CURATOR_PASSWORD = "rizer1234";

export async function isEmpty(db: Database) {
  const [row] = await db.select({ n: count() }).from(artifacts);
  return (row?.n ?? 0) === 0;
}

const seedArtifactId = (slug: string) => `art_${slug.replace(/-/g, "_")}`;

/**
 * 시드 데이터를 넣는다.
 * - 계정: 게스트는 항상, 큐레이터는 비밀번호 해시가 있을 때만.
 * - 시드 유물과 주석. 이미지는 manifest에 있는 것만 붙이고, 나머지는 syncSeedImages가 나중에 채운다.
 */
export async function insertSeedData(
  db: Database,
  hashes: { guest: string; curator?: string },
  manifest: SeedImageManifest = {},
  now = new Date(),
) {
  await db.insert(users).values([
    { ...SEED_USERS.guest, passwordHash: hashes.guest },
    ...(hashes.curator ? [{ ...SEED_USERS.curator, passwordHash: hashes.curator }] : []),
  ]);

  await insertSeedArtifacts(db, SEED_ARTIFACTS, manifest, now);
}

/** 시드 유물과 그 주석을 넣는다. 최근 수정 순서가 카탈로그 순서와 같도록 1분씩 차이를 둔다. */
async function insertSeedArtifacts(
  db: Database,
  list: typeof SEED_ARTIFACTS,
  manifest: SeedImageManifest,
  now: Date,
) {
  if (!list.length) return;
  await db.insert(artifacts).values(
    list.map((a, i) => ({
      ...a,
      id: seedArtifactId(a.slug),
      image: manifest[a.slug] ?? null,
      createdAt: new Date(now.getTime() - (list.length - i) * 60_000),
      updatedAt: new Date(now.getTime() - (list.length - i) * 60_000),
    })),
  );
  await insertSeedAnnotations(db, list.map((a) => a.slug));
}

/** 시드 주석을 넣는다. 아이디가 정해져 있어 여러 인스턴스가 동시에 넣어도 한 번만 들어간다(늦은 쪽은 고유 키 위반). */
async function insertSeedAnnotations(db: Database, slugs: string[]) {
  const wanted = new Set(slugs);
  const rows = Object.entries(SEED_ANNOTATIONS)
    .filter(([slug]) => wanted.has(slug))
    .flatMap(([slug, notes]) =>
      notes.map((a, order) => ({
        id: `ann_${slug.replace(/-/g, "_")}_${order}`,
        artifactId: seedArtifactId(slug),
        title: a.title,
        body: a.body,
        ...a.region,
        order,
      })),
    );
  if (rows.length) await db.insert(annotations).values(rows);
}

/** 키 순서(jsonb는 순서를 바꾼다)와 부동소수 오차에 흔들리지 않는 비교용 문자열 */
function stable(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${stable((value as Record<string, unknown>)[k])}`)
      .join(",")}}`;
  }
  if (typeof value === "number") return String(Math.round(value * 1000) / 1000);
  return JSON.stringify(value);
}

/**
 * 시드로 넣은 뒤 아무도 고치지 않은 유물(수정 시각 = 생성 시각)을 지금의 카탈로그와 맞춘다.
 * 해설·사진 출처·대체 텍스트, 시드 이미지, 주석이 달라졌으면 바꾼다. 수정 시각은 그대로 둬 계속 '손대지 않은' 상태로 남긴다.
 * 큐레이터가 고치거나 이미지를 올리거나 주석을 저장한 유물은 수정 시각이 바뀌므로 건드리지 않는다.
 * 달라진 것만 쓰므로, 바뀐 것이 없으면 읽기 두 번으로 끝난다.
 */
export async function refreshUntouchedSeedArtifacts(db: Database, manifest: SeedImageManifest) {
  const bySlug = new Map(SEED_ARTIFACTS.map((a) => [a.slug, a]));
  const rows = (
    await db
      .select()
      .from(artifacts)
      .where(and(inArray(artifacts.id, SEED_ARTIFACTS.map((a) => seedArtifactId(a.slug))), eq(artifacts.updatedAt, artifacts.createdAt)))
  ).filter((r) => bySlug.has(r.slug));
  if (!rows.length) return { fields: 0, images: 0, annotations: 0 };

  const notes = await db
    .select()
    .from(annotations)
    .where(inArray(annotations.artifactId, rows.map((r) => r.id)))
    .orderBy(annotations.order);
  const notesOf = (id: string) =>
    notes.filter((n) => n.artifactId === id).map((n) => [n.title, n.body, n.x, n.y, n.w, n.h]);

  const counts = { fields: 0, images: 0, annotations: 0 };
  for (const row of rows) {
    const seed = bySlug.get(row.slug)!;
    const { slug: _slug, ...fields } = seed;
    const current = Object.fromEntries(Object.keys(fields).map((k) => [k, row[k as keyof typeof row]]));
    const patch: Partial<typeof artifacts.$inferInsert> = {};
    if (stable(current) !== stable(fields)) {
      Object.assign(patch, fields);
      counts.fields++;
    }
    const image = manifest[row.slug];
    if (image && row.image?.dziKey !== image.dziKey) {
      patch.image = image;
      counts.images++;
    }
    if (Object.keys(patch).length) await db.update(artifacts).set(patch).where(eq(artifacts.id, row.id));

    const wanted = (SEED_ANNOTATIONS[row.slug] ?? []).map((a) => [a.title, a.body, a.region.x, a.region.y, a.region.w, a.region.h]);
    if (stable(notesOf(row.id)) !== stable(wanted)) {
      await db.delete(annotations).where(eq(annotations.artifactId, row.id));
      await insertSeedAnnotations(db, [row.slug]);
      counts.annotations++;
    }
  }
  return counts;
}

/**
 * 이미 시드가 들어간 DB에 새로 추가된 시드 유물을 넣는다(카탈로그를 늘렸을 때 운영 DB에도 나타나게).
 * 같은 주소(slug)의 유물이 있으면 건드리지 않는다. 큐레이터가 지운 시드 유물은 다시 생긴다.
 */
export async function insertMissingSeedArtifacts(db: Database, manifest: SeedImageManifest, now = new Date()) {
  const existing = new Set((await db.select({ slug: artifacts.slug }).from(artifacts)).map((r) => r.slug));
  const missing = SEED_ARTIFACTS.filter((a) => !existing.has(a.slug));
  await insertSeedArtifacts(db, missing, manifest, now);
  return missing.length;
}

/** 시드 유물 중 이미지가 비어 있는 것에 manifest의 이미지를 붙인다. 이미 붙은 이미지는 건드리지 않는다. */
export async function syncSeedImages(db: Database, manifest: SeedImageManifest) {
  let updated = 0;
  for (const [slug, image] of Object.entries(manifest)) {
    const result = await db
      .update(artifacts)
      .set({ image })
      .where(and(eq(artifacts.slug, slug), isNull(artifacts.image)))
      .returning({ id: artifacts.id });
    updated += result.length;
  }
  return updated;
}

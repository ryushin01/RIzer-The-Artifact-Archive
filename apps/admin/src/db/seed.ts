import { SEED_ANNOTATIONS, SEED_ARTIFACTS } from "@rizer/domain/seed";
import { count, eq, isNull, and } from "drizzle-orm";

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
 * - 유물 16점과 주석. 이미지는 manifest에 있는 것만 붙이고, 나머지는 syncSeedImages가 나중에 채운다.
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

  // 최근 수정 순서가 카탈로그 순서와 같도록 1분씩 차이를 둔다.
  await db.insert(artifacts).values(
    SEED_ARTIFACTS.map((a, i) => ({
      ...a,
      id: seedArtifactId(a.slug),
      image: manifest[a.slug] ?? null,
      createdAt: new Date(now.getTime() - (SEED_ARTIFACTS.length - i) * 60_000),
      updatedAt: new Date(now.getTime() - (SEED_ARTIFACTS.length - i) * 60_000),
    })),
  );

  const rows = Object.entries(SEED_ANNOTATIONS).flatMap(([slug, list]) =>
    list.map((a, order) => ({
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

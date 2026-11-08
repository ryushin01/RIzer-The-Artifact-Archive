import { SEED_ANNOTATIONS, SEED_ARTIFACTS } from "@rizer/domain/seed";
import { count, eq } from "drizzle-orm";
import { describe, expect, it } from "vitest";

import { createArtifactRepository } from "@/server/artifacts/repository";

import { annotations, artifacts } from "./schema";
import { insertMissingSeedArtifacts, refreshUntouchedSeedArtifacts, syncSeedImages } from "./seed";
import { createTestDb } from "./testing";

const countAnnotations = async (db: Awaited<ReturnType<typeof createTestDb>>, id: string) =>
  (await db.select({ n: count() }).from(annotations).where(eq(annotations.artifactId, id)))[0]!.n;

describe("시드 동기화", () => {
  it("빈 DB에는 시드 유물과 주석을 모두 넣는다", async () => {
    const db = await createTestDb();
    const [n] = await db.select({ n: count() }).from(artifacts);
    expect(n!.n).toBe(SEED_ARTIFACTS.length);
    const total = Object.values(SEED_ANNOTATIONS).reduce((s, list) => s + list.length, 0);
    const [a] = await db.select({ n: count() }).from(annotations);
    expect(a!.n).toBe(total);
  });

  it("지워진 시드 유물만 다시 넣고, 있는 유물은 건드리지 않는다", async () => {
    const db = await createTestDb();
    await db.delete(artifacts).where(eq(artifacts.slug, "vajra"));
    await db.update(artifacts).set({ title: "고친 이름" }).where(eq(artifacts.slug, "excalibur"));
    expect(await insertMissingSeedArtifacts(db, {})).toBe(1);
    const repo = createArtifactRepository(db);
    expect((await repo.getBySlug("vajra"))?.title).toBe("바즈라");
    expect((await repo.getBySlug("excalibur"))?.title).toBe("고친 이름");
  });

  it("카탈로그와 같으면 아무것도 쓰지 않는다(jsonb 키 순서, real 좌표 오차에 흔들리지 않음)", async () => {
    const db = await createTestDb();
    expect(await refreshUntouchedSeedArtifacts(db, {})).toEqual({ fields: 0, images: 0, annotations: 0 });
  });

  it("손대지 않은 시드 유물만 지금의 카탈로그(해설·출처·주석·이미지)로 맞춘다", async () => {
    const db = await createTestDb();
    const repo = createArtifactRepository(db);
    // 예전 카탈로그로 들어간 상태를 흉내: 출처와 대체 텍스트가 다르고 주석이 없다.
    await db.update(artifacts).set({ imageAlt: "옛 설명" }).where(eq(artifacts.slug, "vajra"));
    await db.delete(annotations).where(eq(annotations.artifactId, "art_vajra"));
    // 큐레이터가 고친 유물은 그대로 둔다(수정 시각이 바뀐다).
    const gram = (await repo.getBySlug("gram"))!;
    const { id: _id, slug: _slug, createdAt: _c, updatedAt: _u, image: _i, annotationCount: _n, source, ...input } = gram;
    await repo.update(gram.id, { ...input, slug: "gram", title: "고친 그람" }, source, new Date(Date.now() + 60_000));
    await repo.replaceAnnotations(gram.id, [], new Date(Date.now() + 60_000));

    const image = { dziKey: "tiles/art_vajra/v2/image.dzi", previewKey: "tiles/art_vajra/v2/preview.webp", originalKey: "", width: 10, height: 10, tileSize: 510, format: "webp" as const, lqip: "data:image/webp;base64,AA", dominantColor: "#000000", tileCount: 1, version: "2" };
    expect(await refreshUntouchedSeedArtifacts(db, { vajra: image, gram: image })).toEqual({ fields: 1, images: 1, annotations: 1 });

    const vajra = (await repo.getBySlug("vajra"))!;
    expect(vajra.imageAlt).not.toBe("옛 설명");
    expect(vajra.image?.dziKey).toBe(image.dziKey);
    expect(vajra.updatedAt.getTime()).toBe(vajra.createdAt.getTime());
    expect(await countAnnotations(db, "art_vajra")).toBe(SEED_ANNOTATIONS.vajra!.length);
    expect((await repo.getBySlug("gram"))?.title).toBe("고친 그람");
    expect(await countAnnotations(db, "art_gram")).toBe(0);
    // 다시 돌려도 더 바꾸지 않는다.
    expect(await refreshUntouchedSeedArtifacts(db, { vajra: image })).toEqual({ fields: 0, images: 0, annotations: 0 });
  });

  it("이미지가 빈 시드 유물에만 이미지를 붙인다", async () => {
    const db = await createTestDb();
    const image = { dziKey: "tiles/x/image.dzi", previewKey: "tiles/x/preview.webp", originalKey: "", width: 10, height: 10, tileSize: 254, format: "webp" as const, lqip: "data:image/webp;base64,AA", dominantColor: "#000000", tileCount: 1, version: "1" };
    expect(await syncSeedImages(db, { vajra: image })).toBe(1);
    expect(await syncSeedImages(db, { vajra: { ...image, version: "2" } })).toBe(0);
  });
});

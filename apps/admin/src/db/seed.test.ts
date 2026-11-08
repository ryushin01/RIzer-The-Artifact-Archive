import { SEED_ANNOTATIONS, SEED_ARTIFACTS } from "@rizer/domain/seed";
import { count, eq } from "drizzle-orm";
import { describe, expect, it } from "vitest";

import { createArtifactRepository } from "@/server/artifacts/repository";

import { annotations, artifacts } from "./schema";
import { insertMissingSeedArtifacts, syncSeedAnnotations, syncSeedImages } from "./seed";
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

  it("주석이 없고 아무도 고치지 않은 시드 유물에만 시드 주석을 채운다", async () => {
    const db = await createTestDb();
    // 유물을 먼저 넣고 주석은 나중에 생긴 상황: 주석을 지운다.
    await db.delete(annotations);
    // 큐레이터가 주석을 비우고 저장한 유물(수정 시각이 바뀜)은 그대로 둔다.
    const repo = createArtifactRepository(db);
    await repo.replaceAnnotations("art_gram", [], new Date(Date.now() + 60_000));

    const filled = await syncSeedAnnotations(db);
    expect(filled).toBe(Object.keys(SEED_ANNOTATIONS).length - 1);
    expect(await countAnnotations(db, "art_vajra")).toBe(SEED_ANNOTATIONS.vajra!.length);
    expect(await countAnnotations(db, "art_gram")).toBe(0);
    // 다시 돌려도 더 넣지 않는다.
    expect(await syncSeedAnnotations(db)).toBe(0);
  });

  it("이미지가 빈 시드 유물에만 이미지를 붙인다", async () => {
    const db = await createTestDb();
    const image = { dziKey: "tiles/x/image.dzi", previewKey: "tiles/x/preview.webp", originalKey: "", width: 10, height: 10, tileSize: 254, format: "webp" as const, lqip: "data:image/webp;base64,AA", dominantColor: "#000000", tileCount: 1, version: "1" };
    expect(await syncSeedImages(db, { vajra: image })).toBe(1);
    expect(await syncSeedImages(db, { vajra: { ...image, version: "2" } })).toBe(0);
  });
});

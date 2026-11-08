// @vitest-environment node
import { SEED_ARTIFACTS } from "@rizer/domain/seed";
import { describe, expect, it } from "vitest";

import { createTestDb } from "@/db/testing";
import type { StoredImage } from "@/entities/artifact";

import { toArtifact, toArtifactSummary } from "./public";
import { createArtifactRepository } from "./repository";

const storage = { publicUrl: (key: string) => `https://tiles.example.com/${key}` };

const image: StoredImage = {
  dziKey: "artifacts/a/v1/image.dzi",
  previewKey: "artifacts/a/v1/preview.webp",
  originalKey: "artifacts/a/original.jpg",
  width: 4000,
  height: 3000,
  lqip: "data:image/webp;base64,AAAA",
  dominantColor: "#112233",
  tileCount: 300,
  version: "1",
};

describe("artifact repository", () => {
  it("시드 유물을 모두, 대표 유물 먼저 보여 준다", async () => {
    const repo = createArtifactRepository(await createTestDb());
    const rows = await repo.list();
    expect(rows).toHaveLength(SEED_ARTIFACTS.length);
    const firstNonFeatured = rows.findIndex((r) => !r.featured);
    expect(rows.slice(firstNonFeatured).every((r) => !r.featured)).toBe(true);
  });

  it("이름·원어·소유자로 검색하고 전시실로 거른다", async () => {
    const repo = createArtifactRepository(await createTestDb());
    expect((await repo.list({ q: "excal" })).map((r) => r.slug)).toEqual(["excalibur"]);
    expect((await repo.list({ q: "mjöl" })).map((r) => r.slug)).toEqual(["mjolnir"]);
    expect((await repo.list({ q: "토르" })).map((r) => r.slug)).toContain("mjolnir");
    const korean = SEED_ARTIFACTS.filter((a) => a.gallery === "korean").map((a) => a.slug);
    expect((await repo.list({ gallery: "korean" })).map((r) => r.slug).sort()).toEqual(korean.sort());
    // 해설 본문과 주석까지 찾고, 이름이 맞은 유물을 앞에 둔다.
    expect((await repo.list({ q: "롤랑의 틈" })).map((r) => r.slug)).toEqual(["durandal"]);
    expect((await repo.list({ q: "반드시 끼던 쇠장갑" })).map((r) => r.slug)).toEqual(["jarngreipr"]);
    expect((await repo.list({ q: "묠니르" }))[0]?.slug).toBe("mjolnir");
    // LIKE 특수 문자는 글자 그대로 찾는다.
    expect(await repo.list({ q: "%" })).toHaveLength(0);
  });

  it("페이지를 나눠 읽고, 나눠 읽어도 순서가 이어진다", async () => {
    const repo = createArtifactRepository(await createTestDb());
    const all = (await repo.list({ sort: "title" })).map((r) => r.slug);
    const first = await repo.page({ sort: "title", limit: 10 });
    const second = await repo.page({ sort: "title", limit: 10, offset: 10 });
    expect(first.total).toBe(SEED_ARTIFACTS.length);
    expect([...first.rows, ...second.rows].map((r) => r.slug)).toEqual(all.slice(0, 20));
    expect((await repo.page({ gallery: "korean", limit: 1 })).total).toBe(
      SEED_ARTIFACTS.filter((a) => a.gallery === "korean").length,
    );
  });

  it("첫 기록 연도순으로 정렬한다", async () => {
    const repo = createArtifactRepository(await createTestDb());
    const years = (await repo.list({ sort: "oldest" })).map((r) => r.recordYear);
    expect(years).toEqual([...years].sort((a, b) => a - b));
  });

  it("만들고, 고치고, 상태와 이미지를 바꾸고, 지운다", async () => {
    const repo = createArtifactRepository(await createTestDb());
    const seed = SEED_ARTIFACTS[0]!;
    const { source, ...input } = seed;
    const id = await repo.create({ ...input, slug: "test-sword", status: "draft" }, source);

    expect(await repo.slugTaken("test-sword")).toBe(true);
    expect(await repo.slugTaken("test-sword", id)).toBe(false);

    await repo.update(id, { ...input, slug: "test-sword", title: "시험용 검", status: "draft" }, source);
    await repo.setStatus(id, "published");
    await repo.setImage(id, image);
    const row = await repo.get(id);
    expect(row).toMatchObject({ title: "시험용 검", status: "published", image });

    expect(await repo.remove(id)).toEqual({ slug: "test-sword" });
    expect(await repo.get(id)).toBeNull();
  });

  it("주석을 통째로 바꾸고 개수를 센다", async () => {
    const repo = createArtifactRepository(await createTestDb());
    const target = (await repo.getBySlug("excalibur"))!;
    await repo.replaceAnnotations(target.id, [
      { title: "칼끝", body: "가늘게 모인다.", region: { x: 1, y: 2, w: 3, h: 4 }, order: 0 },
      { title: "코등이", body: "십자형이다.", region: { x: 10, y: 20, w: 5, h: 5 }, order: 1 },
    ]);
    const list = await repo.listAnnotations(target.id);
    expect(list.map((a) => a.title)).toEqual(["칼끝", "코등이"]);
    expect((await repo.get(target.id))?.annotationCount).toBe(2);
  });

  it("같은 전시실의 다른 공개 유물을 고른다", async () => {
    const repo = createArtifactRepository(await createTestDb());
    const excalibur = (await repo.getBySlug("excalibur"))!;
    const related = await repo.related("arthurian", excalibur.id);
    expect(related).toHaveLength(4);
    expect(related.every((r) => r.gallery === "arthurian" && r.slug !== "excalibur")).toBe(true);
    // 대표 유물이 먼저 온다.
    expect(related.slice(0, 2).map((r) => r.slug).sort()).toEqual(["durandal", "holy-grail"]);
  });

  it("통계를 센다", async () => {
    const repo = createArtifactRepository(await createTestDb());
    expect(await repo.stats()).toMatchObject({
      total: SEED_ARTIFACTS.length,
      published: SEED_ARTIFACTS.length,
      draft: 0,
      withImage: 0,
    });
  });
});

describe("공개 API 변환", () => {
  it("스토리지 키를 공개 주소로 바꾸고 해설을 뺀 요약을 만든다", async () => {
    const db = await createTestDb({ excalibur: image });
    const row = (await createArtifactRepository(db).getBySlug("excalibur"))!;
    const artifact = toArtifact(row, storage);
    expect(artifact.image).toMatchObject({
      dziUrl: "https://tiles.example.com/artifacts/a/v1/image.dzi",
      previewUrl: "https://tiles.example.com/artifacts/a/v1/preview.webp",
      width: 4000,
    });
    expect(artifact.updatedAt).toMatch(/Z$/);
    expect("story" in toArtifactSummary(row, storage)).toBe(false);
    expect("source" in toArtifactSummary(row, storage)).toBe(false);
  });
});

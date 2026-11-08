import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import sharp from "sharp";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { contentTypeOf, generateDeepZoom, listFiles } from "./index";

let dir: string;

beforeAll(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "rizer-tiles-"));
});
afterAll(async () => {
  await rm(dir, { recursive: true, force: true });
});

/** 붉은색 바탕의 3000×2000 테스트 이미지 */
const sample = () =>
  sharp({ create: { width: 3000, height: 2000, channels: 3, background: { r: 200, g: 30, b: 40 } } })
    .png()
    .toBuffer();

describe("generateDeepZoom", () => {
  it("DZI 설명 파일, 타일, 미리보기, LQIP, 대표 색을 만든다", async () => {
    const result = await generateDeepZoom(await sample(), dir, { name: "art" });

    expect(result).toMatchObject({ width: 3000, height: 2000, dziPath: "art.dzi", previewPath: "preview.webp" });
    expect(result.lqip).toMatch(/^data:image\/webp;base64,/);
    expect(result.dominantColor).toMatch(/^#[0-9a-f]{6}$/);

    const dzi = await readFile(path.join(dir, "art.dzi"), "utf8");
    expect(dzi).toContain('TileSize="254"');
    expect(dzi).toContain('Format="webp"');
    expect(dzi).toContain('Width="3000"');

    // 레벨 0(1×1)부터 최대 레벨(3000px → 12레벨)까지 있다.
    const files = await listFiles(dir);
    expect(files).toContain("art_files/0/0_0.webp");
    expect(files).toContain("art_files/12/0_0.webp");
    expect(result.tileCount).toBe(files.filter((f) => f.startsWith("art_files/")).length);

    const preview = await sharp(path.join(dir, "preview.webp")).metadata();
    expect(Math.max(preview.width!, preview.height!)).toBe(1600);
  });
});

describe("generateDeepZoom 옵션", () => {
  it("긴 변을 줄이고 큰 타일로 자르면 파일 수가 줄어든다", async () => {
    const out = path.join(dir, "big");
    const result = await generateDeepZoom(await sample(), out, { name: "art", tileSize: 510, maxSize: 1500 });
    expect(result).toMatchObject({ width: 1500, height: 1000 });
    const dzi = await readFile(path.join(out, "art.dzi"), "utf8");
    expect(dzi).toContain('TileSize="510"');
    expect(dzi).toContain('Width="1500"');
    // 최대 레벨(1500px → 11레벨)은 3×2 타일
    const files = await listFiles(out);
    expect(files.filter((f) => f.startsWith("art_files/11/"))).toHaveLength(6);
  });
});

describe("contentTypeOf", () => {
  it("확장자로 Content-Type을 고른다", () => {
    expect(contentTypeOf("a/b.dzi")).toBe("application/xml");
    expect(contentTypeOf("x.WEBP")).toBe("image/webp");
    expect(contentTypeOf("x.bin")).toBe("application/octet-stream");
  });
});

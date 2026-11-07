import { mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

/**
 * 초고해상도 이미지를 딥줌(DZI) 타일로 자른다.
 *
 * - 타일: 256px(겹침 1px을 더해 254 + 1 + 1), WebP. 화면에 보이는 영역의 타일만 내려받으므로
 *   원본이 수백 MB여도 처음 화면은 수십 KB로 열린다.
 * - 미리보기: 긴 변 1600px WebP. 목록 카드와 뷰어가 열리기 전 화면에 쓴다.
 * - LQIP: 긴 변 24px WebP를 data URL로. 미리보기가 오기 전 흐린 자리 표시자.
 * - 대표 색: 배경과 스켈레톤 색.
 *
 * 경로의 turbopackIgnore 표시: 출력 폴더는 실행 중에 정해지는 작업 폴더라서, 번들러가 프로젝트 전체를
 * 서버 번들에 넣지 않게 한다.
 */

export const TILE_SIZE = 254;
export const TILE_OVERLAP = 1;
export const PREVIEW_SIZE = 1600;

// 매우 큰 이미지(파노라마·고해상도 스캔)도 열 수 있게 픽셀 수 제한을 1기가픽셀로 둔다.
const LIMIT_INPUT_PIXELS = 1_000_000_000;

export type TileResult = {
  width: number;
  height: number;
  /** outDir 기준 상대 경로 */
  dziPath: string;
  previewPath: string;
  tileCount: number;
  lqip: string;
  dominantColor: string;
};

export type TileOptions = {
  /** 결과물 이름(파일 이름 앞부분). 기본값 "image" */
  name?: string;
  /** WebP 품질(1~100). 기본값 82 */
  quality?: number;
};

const hex = (n: number) => n.toString(16).padStart(2, "0");

/** input(파일 경로 또는 Buffer)을 outDir 안에 <name>.dzi, <name>_files/, preview.webp로 만든다. */
export async function generateDeepZoom(
  input: string | Buffer,
  outDir: string,
  { name = "image", quality = 82 }: TileOptions = {},
): Promise<TileResult> {
  const source = () => sharp(input, { limitInputPixels: LIMIT_INPUT_PIXELS }).rotate();
  const meta = await source().metadata();
  // rotate()가 EXIF 방향을 반영하므로, 90도 회전된 사진은 가로세로를 바꾼다.
  const swapped = (meta.orientation ?? 1) >= 5;
  const width = swapped ? meta.height : meta.width;
  const height = swapped ? meta.width : meta.height;
  if (!width || !height) throw new Error("이미지 크기를 읽지 못했습니다.");

  await rm(path.join(/*turbopackIgnore: true*/ outDir, `${name}_files`), { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const dziBase = path.join(/*turbopackIgnore: true*/ outDir, name);
  await source()
    .toColourspace("srgb")
    .webp({ quality, effort: 4 })
    .tile({ size: TILE_SIZE, overlap: TILE_OVERLAP, layout: "dz", container: "fs" })
    .toFile(dziBase);

  const previewPath = path.join(/*turbopackIgnore: true*/ outDir, "preview.webp");
  await source()
    .resize(PREVIEW_SIZE, PREVIEW_SIZE, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(previewPath);

  const lqipBuffer = await source().resize(24, 24, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
  const { dominant } = await source().resize(64, 64, { fit: "inside" }).stats();

  return {
    width,
    height,
    dziPath: `${name}.dzi`,
    previewPath: "preview.webp",
    tileCount: await countFiles(path.join(/*turbopackIgnore: true*/ outDir, `${name}_files`)),
    lqip: `data:image/webp;base64,${lqipBuffer.toString("base64")}`,
    dominantColor: `#${hex(dominant.r)}${hex(dominant.g)}${hex(dominant.b)}`,
  };
}

async function countFiles(dir: string): Promise<number> {
  let count = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    count += entry.isDirectory() ? await countFiles(path.join(/*turbopackIgnore: true*/ dir, entry.name)) : 1;
  }
  return count;
}

/** 폴더 안 모든 파일을 상대 경로로 나열한다. 스토리지에 올릴 때 쓴다. */
export async function listFiles(dir: string, base = dir): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(/*turbopackIgnore: true*/ dir, entry.name);
    if (entry.isDirectory()) files.push(...(await listFiles(full, base)));
    else if ((await stat(full)).isFile()) files.push(path.relative(base, full).split(path.sep).join("/"));
  }
  return files;
}

/** 확장자로 Content-Type을 고른다. */
export function contentTypeOf(file: string): string {
  const ext = path.extname(file).toLowerCase();
  return (
    {
      ".dzi": "application/xml",
      ".xml": "application/xml",
      ".webp": "image/webp",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".json": "application/json",
    }[ext] ?? "application/octet-stream"
  );
}

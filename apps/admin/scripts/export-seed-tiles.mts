// 시드 유물 16점의 딥줌 타일을 공개 사이트의 정적 파일(apps/web/public/tiles)로 내보낸다.
//
//   pnpm --filter @rizer/admin export:seed-tiles   (먼저 pnpm seed:images로 로컬 타일을 만든다)
//
// 시드 타일은 git에 넣어 공개 사이트가 CDN 정적 파일로 내보낸다. Vercel Blob Hobby의 업로드 작업 한도(월 2,000회)를
// 타일 수천 개로 다 쓰지 않기 위해서다. Blob은 큐레이터가 새로 올리는 이미지에만 쓴다.
// 결과 목록은 src/db/seed-images.json에 쓴다. 키는 tiles/로 시작하고, 어드민이 STATIC_TILES_URL(기본 WEB_URL)로 바꾼다.
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

import { SEED_ARTIFACTS } from "@rizer/domain/seed";

import { SEED_MANIFEST_KEY, type SeedImageManifest } from "../src/entities/artifact/model/types";

const storageRoot = path.join(process.cwd(), ".data/storage");
const webTiles = path.join(process.cwd(), "../web/public/tiles");
const manifestFile = path.join(storageRoot, SEED_MANIFEST_KEY);
if (!existsSync(manifestFile)) {
  console.error("로컬 시드 이미지가 없습니다. 먼저 pnpm seed:images를 실행하세요.");
  process.exit(1);
}
const local = JSON.parse(readFileSync(manifestFile, "utf8")) as SeedImageManifest;

rmSync(webTiles, { recursive: true, force: true });
mkdirSync(webTiles, { recursive: true });

const bundled: SeedImageManifest = {};
for (const { slug } of SEED_ARTIFACTS) {
  const image = local[slug];
  if (!image) {
    console.warn(`- ${slug}: 로컬 이미지가 없어 건너뜁니다.`);
    continue;
  }
  // artifacts/<id>/v<버전>/image.dzi → tiles/<id>/v<버전>/image.dzi
  const versionDir = path.posix.dirname(image.dziKey);
  const target = versionDir.replace(/^artifacts\//, "tiles/");
  cpSync(path.join(storageRoot, versionDir), path.join(webTiles, "..", target), { recursive: true });
  bundled[slug] = {
    ...image,
    dziKey: image.dziKey.replace(/^artifacts\//, "tiles/"),
    previewKey: image.previewKey.replace(/^artifacts\//, "tiles/"),
    // 원본은 내보내지 않는다(다시 타일링하려면 seed:images).
    originalKey: "",
  };
}
writeFileSync(path.join(process.cwd(), "src/db/seed-images.json"), `${JSON.stringify(bundled, null, 2)}\n`);
console.log(`${Object.keys(bundled).length}점을 apps/web/public/tiles로 내보냈습니다.`);

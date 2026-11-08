// 시드 유물의 원본 이미지를 받아 딥줌 타일로 자르고 스토리지에 올린다.
//
//   pnpm seed:images              소장품 원본(The Met·클리블랜드 미술관 Open Access, CC0)을 받는다(처음 한 번, .data/originals에 보관)
//   pnpm seed:images --synthetic  네트워크 없이 무늬 이미지를 만든다(CI·E2E용)
//   pnpm seed:images --only excalibur,gram
//   pnpm seed:images --missing                  목록에 아직 없는 유물만
//   --tile-size 510 --max-size 3000              타일 크기·최대 해상도(기본 510, 3000. 처음 16점은 254·원본 크기로 만들었다)
//
// 결과 목록(manifest)은 스토리지의 seed/manifest.json에 쓴다. 어드민 서버가 켜질 때 읽어,
// 이미지가 빈 시드 유물에 붙인다. 이미 띄운 서버에는 다시 켜면 반영된다.
// 스토리지는 어드민과 같은 환경 변수(STORAGE_DRIVER 등)를 따른다. 운영 R2에 올릴 때는 .env.local에 값을 둔다.
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { SEED_ARTIFACTS } from "@rizer/domain/seed";
import { storageFromEnv } from "@rizer/storage";
import sharp from "sharp";

import { SEED_MANIFEST_KEY, type SeedImageManifest } from "../src/entities/artifact/model/types";
import { tileAndUpload } from "../src/server/images/process";

for (const file of [".env.local", ".env.development"]) {
  if (existsSync(file)) process.loadEnvFile(file);
}

const args = process.argv.slice(2);
const synthetic = args.includes("--synthetic");
const onlyArg = args.find((a) => a.startsWith("--only"));
const only = onlyArg ? (onlyArg.split("=")[1] ?? args[args.indexOf(onlyArg) + 1] ?? "").split(",") : null;
const missingOnly = args.includes("--missing");
const numberArg = (name: string, fallback: number) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? Number(args[i + 1]) : fallback;
};
const tileOptions = { tileSize: numberArg("--tile-size", 510), maxSize: numberArg("--max-size", 3000) };

const ORIGINALS = path.join(process.cwd(), ".data/originals");
const adminUrl = (process.env.ADMIN_URL || process.env.NEXTAUTH_URL || "http://localhost:3000").replace(/\/$/, "");
const storage = storageFromEnv(process.env, path.join(process.cwd(), ".data/storage"), `${adminUrl}/files`);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const seedId = (slug: string) => `art_${slug.replace(/-/g, "_")}`;

/** 미술관 이미지 서버(특히 The Met)는 짧은 시간에 요청이 몰리면 막으므로 간격을 두고, 실패하면 늘려 가며 다시 시도한다. */
async function download(url: string, file: string) {
  if (existsSync(file)) return readFile(file);
  for (let attempt = 1; attempt <= 5; attempt++) {
    await sleep(1500 * attempt);
    const res = await fetch(encodeURI(url), { headers: { "user-agent": "rizer-artifact-archive (portfolio seed)" } });
    const type = res.headers.get("content-type") ?? "";
    if (res.ok && type.startsWith("image/")) {
      const body = Buffer.from(await res.arrayBuffer());
      await writeFile(file, body);
      return body;
    }
    console.warn(`  ${res.status} ${type} — ${attempt}번째 재시도`);
  }
  throw new Error(`원본을 받지 못했습니다: ${url}`);
}

const escapeXml = (s: string) =>
  s.replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[c]!);

/** 네트워크 없이 쓰는 무늬 이미지(4000×3000). 확대해도 무늬가 보이도록 동심원과 격자를 그린다. */
async function syntheticImage(index: number, title: string) {
  const hue = (index * 47) % 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="4000" height="3000">
    <defs><radialGradient id="g"><stop offset="0" stop-color="hsl(${hue},60%,55%)"/><stop offset="1" stop-color="hsl(${hue},40%,12%)"/></radialGradient>
    <pattern id="p" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M100 0H0V100" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="2"/></pattern></defs>
    <rect width="4000" height="3000" fill="url(#g)"/><rect width="4000" height="3000" fill="url(#p)"/>
    ${Array.from({ length: 12 }, (_, i) => `<circle cx="2000" cy="1500" r="${120 * (i + 1)}" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="6"/>`).join("")}
    <text x="2000" y="1530" font-size="120" text-anchor="middle" fill="#fff" font-family="sans-serif">${escapeXml(title)}</text></svg>`;
  return sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toBuffer();
}

/**
 * 여러 소장품 사진을 나란히 이어 한 장으로 만든다(삼면화).
 * 사진마다 배경색이 달라서, 전시 벽처럼 같은 어두운 바탕 위에 같은 높이로 걸어 둔다.
 */
async function composite(parts: Buffer[]) {
  const HEIGHT = 4200;
  const INNER = 3600;
  const GAP = 48;
  const WALL = { r: 20, g: 18, b: 17 };
  const panels = await Promise.all(
    parts.map(async (body) => {
      const img = sharp(body).rotate();
      const resized = await img.clone().resize({ height: INNER, fit: "inside" }).toBuffer({ resolveWithObject: true });
      const width = resized.info.width + 600;
      const panel = await sharp({ create: { width, height: HEIGHT, channels: 3, background: WALL } })
        .composite([{ input: resized.data, left: 300, top: Math.round((HEIGHT - resized.info.height) / 2) }])
        .png()
        .toBuffer();
      return { panel, width };
    }),
  );
  const total = panels.reduce((sum, p) => sum + p.width, 0) + GAP * (panels.length + 1);
  let left = GAP;
  const layers = panels.map((p) => {
    const layer = { input: p.panel, left, top: 0 };
    left += p.width + GAP;
    return layer;
  });
  return sharp({ create: { width: total, height: HEIGHT, channels: 3, background: WALL } })
    .composite(layers)
    .jpeg({ quality: 90 })
    .toBuffer();
}

async function main() {
  await mkdir(ORIGINALS, { recursive: true });
  const existing = await storage.get(SEED_MANIFEST_KEY);
  const manifest: SeedImageManifest = existing ? JSON.parse(existing.toString("utf8")) : {};

  const targets = SEED_ARTIFACTS.filter((a) => (!only || only.includes(a.slug)) && (!missingOnly || !manifest[a.slug]));
  console.log(`${targets.length}점 처리 (${synthetic ? "무늬 이미지" : "소장품 원본"}, 스토리지: ${storage.driver})`);

  for (const [i, artifact] of targets.entries()) {
    const started = performance.now();
    process.stdout.write(`- ${artifact.title} (${artifact.slug}) `);
    const { parts } = artifact.source;
    const body = synthetic
      ? await syntheticImage(i, artifact.titleOriginal || artifact.slug)
      : parts.length
        ? await composite(
            await Promise.all(
              parts.map((part) => download(part.imageUrl, path.join(ORIGINALS, `${artifact.slug}-${part.objectId}.jpg`))),
            ),
          )
        : await download(artifact.source.imageUrl, path.join(ORIGINALS, `${artifact.slug}-${artifact.source.objectId}.jpg`));
    const id = seedId(artifact.slug);
    const key = `artifacts/${id}/original.jpg`;
    await storage.put(key, body, "image/jpeg");
    const image = await tileAndUpload(storage, id, { key, body }, manifest[artifact.slug] ?? null, new Date(), tileOptions);
    manifest[artifact.slug] = image;
    // 하나씩 끝날 때마다 저장해, 중간에 멈춰도 다시 실행하면 이어서 쓸 수 있다.
    await storage.put(SEED_MANIFEST_KEY, Buffer.from(JSON.stringify(manifest, null, 2)), "application/json", "no-cache");
    const seconds = ((performance.now() - started) / 1000).toFixed(1);
    console.log(`${image.width}×${image.height}px, 타일 ${image.tileCount}개, ${seconds}초`);
  }
  console.log(`완료. 목록: ${SEED_MANIFEST_KEY}. 어드민을 다시 켜면 이미지가 붙습니다.`);
}

await main();

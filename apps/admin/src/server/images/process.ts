import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { contentTypeOf, generateDeepZoom, listFiles } from "@rizer/tiles";
import type { Storage } from "@rizer/storage";

import type { StoredImage } from "@/entities/artifact";

/** 어드민에서 받는 원본의 최대 크기. 이보다 큰 원본은 `pnpm tiles` CLI로 자른다. */
export const MAX_UPLOAD_BYTES = 80 * 1024 * 1024;
export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/tiff"] as const;

/** 원본 키. 유물마다 한 장이다. */
export const originalKey = (artifactId: string, ext: string) => `artifacts/${artifactId}/original.${ext}`;

export const extensionOf = (contentType: string) =>
  ({ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/tiff": "tif" })[contentType] ?? "bin";

/**
 * 원본을 딥줌 타일로 잘라 스토리지에 올린다.
 * 키에 버전(시각)을 넣어 경로가 매번 달라지므로, CDN이 오래 캐시해도 새 타일이 바로 보인다.
 * 올린 뒤 이전 버전의 타일은 지운다.
 */
export async function tileAndUpload(
  storage: Storage,
  artifactId: string,
  original: { key: string; body: Buffer },
  previous: StoredImage | null,
  now = new Date(),
): Promise<StoredImage> {
  const version = now.toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const prefix = `artifacts/${artifactId}/v${version}`;
  const workDir = await mkdtemp(path.join(tmpdir(), "rizer-tiles-"));
  try {
    const result = await generateDeepZoom(original.body, workDir, { name: "image" });
    await storage.putFiles(workDir, await listFiles(workDir), prefix, contentTypeOf);
    const image: StoredImage = {
      dziKey: `${prefix}/${result.dziPath}`,
      previewKey: `${prefix}/${result.previewPath}`,
      originalKey: original.key,
      width: result.width,
      height: result.height,
      lqip: result.lqip,
      dominantColor: result.dominantColor,
      tileCount: result.tileCount,
      version,
    };
    if (previous && previous.version !== version) {
      await storage.removePrefix(`artifacts/${artifactId}/v${previous.version}`);
    }
    return image;
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}

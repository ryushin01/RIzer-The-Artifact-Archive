import "server-only";

import path from "node:path";

import { type Storage, storageFromEnv } from "@rizer/storage";

/** 이 어드민의 바깥 주소. 로컬 스토리지의 타일 주소를 절대 주소로 만들 때 쓴다(공개 사이트가 다른 포트에서 읽는다). */
function adminOrigin() {
  return (process.env.ADMIN_URL || process.env.NEXTAUTH_URL || "http://localhost:3000").replace(/\/$/, "");
}

/** 시드 타일(tiles/로 시작하는 키)을 내보내는 곳: 공개 사이트의 정적 파일(apps/web/public/tiles) */
function staticTilesOrigin() {
  return (process.env.STATIC_TILES_URL || process.env.WEB_URL || "http://localhost:3001").replace(/\/$/, "");
}

const STATIC_TILES_PREFIX = "tiles/";

const globalForStorage = globalThis as { storage?: Storage };

/**
 * 원본·타일 스토리지 그 자체. STORAGE_DRIVER에 따라 로컬(.data/storage, /files로 내보냄), S3(R2), Vercel Blob.
 * 로컬 파일을 직접 읽는 /files 라우트가 쓴다.
 */
export function getBaseStorage(): Storage {
  return (globalForStorage.storage ??= storageFromEnv(
    process.env,
    path.join(process.cwd(), ".data/storage"),
    `${adminOrigin()}/files`,
  ));
}

/**
 * 서버 전체가 쓰는 스토리지. 공개 주소만 키에 따라 나눈다.
 * - tiles/…: 저장소에 넣은 시드 타일 → 공개 사이트의 정적 파일
 * - 그 밖: 스토리지(큐레이터가 올린 이미지)
 */
export function getStorage(): Storage {
  const base = getBaseStorage();
  return {
    driver: base.driver,
    put: (...args) => base.put(...args),
    putFiles: (...args) => base.putFiles(...args),
    get: (key) => base.get(key),
    removePrefix: (prefix) => base.removePrefix(prefix),
    presignUpload: (key, contentType) => base.presignUpload(key, contentType),
    publicUrl: (key) =>
      key.startsWith(STATIC_TILES_PREFIX) ? `${staticTilesOrigin()}/${key}` : base.publicUrl(key),
  };
}

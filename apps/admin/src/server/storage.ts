import "server-only";

import path from "node:path";

import { type Storage, storageFromEnv } from "@rizer/storage";

/** 이 어드민의 바깥 주소. 로컬 스토리지의 타일 주소를 절대 주소로 만들 때 쓴다(공개 사이트가 다른 포트에서 읽는다). */
export function adminOrigin() {
  return (process.env.ADMIN_URL || process.env.NEXTAUTH_URL || "http://localhost:3000").replace(/\/$/, "");
}

const globalForStorage = globalThis as { storage?: Storage };

/**
 * 서버 전체가 함께 쓰는 스토리지.
 * STORAGE_DRIVER=s3이면 R2(S3 호환), 아니면 apps/admin/.data/storage에 두고 /files로 내보낸다.
 */
export function getStorage(): Storage {
  return (globalForStorage.storage ??= storageFromEnv(
    process.env,
    path.join(process.cwd(), ".data/storage"),
    `${adminOrigin()}/files`,
  ));
}

import "server-only";

import { hash } from "bcryptjs";

import { getStorage } from "@/server/storage";
import { SEED_MANIFEST_KEY, type SeedImageManifest } from "@/entities/artifact";

import bundledSeedImages from "./seed-images.json";

import { type Database, openPglite, openPostgres } from "./index";
import { DEV_CURATOR_PASSWORD, GUEST_PASSWORD, insertSeedData, isEmpty, syncSeedImages } from "./seed";

/**
 * 서버 전체가 함께 쓰는 DB 연결.
 * - DATABASE_URL이 있으면 PostgreSQL, 없으면 PGlite(PGLITE_DATA_DIR, 기본 .data/pglite).
 * - 처음 열 때 마이그레이션을 적용하고, 비어 있으면 시드를 넣는다(운영에서는 SEED_DEMO=1일 때만).
 * - 시드 이미지(pnpm seed:images가 만든 manifest)가 있으면 이미지가 빈 시드 유물에 붙인다.
 * 개발 서버 HMR로 모듈이 다시 로드돼도 연결을 유지하도록 globalThis에 보관한다.
 */
const globalForDb = globalThis as { dbPromise?: Promise<Database> };

export function getDb(): Promise<Database> {
  return (globalForDb.dbPromise ??= open().catch((error) => {
    globalForDb.dbPromise = undefined;
    throw error;
  }));
}

/**
 * 시드 이미지 목록. 스토리지에 있으면(pnpm seed:images로 만든 로컬 타일) 그것을,
 * 없으면 저장소에 넣은 목록(공개 사이트의 정적 타일, scripts/export-seed-tiles.mts)을 쓴다.
 */
async function readManifest(): Promise<SeedImageManifest> {
  const raw = await getStorage().get(SEED_MANIFEST_KEY);
  if (raw) {
    try {
      return JSON.parse(raw.toString("utf8")) as SeedImageManifest;
    } catch {
      /* 아래 목록을 쓴다. */
    }
  }
  return bundledSeedImages as SeedImageManifest;
}

async function open() {
  const url = process.env.DATABASE_URL;
  const db = url ? await openPostgres(url) : await openPglite(process.env.PGLITE_DATA_DIR ?? ".data/pglite");
  const production = process.env.NODE_ENV === "production";
  const seedAllowed = !production || process.env.SEED_DEMO === "1";
  if (!seedAllowed) return db;

  const manifest = await readManifest();
  if (await isEmpty(db)) {
    const curatorPassword = production ? process.env.CURATOR_PASSWORD : DEV_CURATOR_PASSWORD;
    await insertSeedData(
      db,
      {
        guest: await hash(GUEST_PASSWORD, 10),
        curator: curatorPassword ? await hash(curatorPassword, 10) : undefined,
      },
      manifest,
    );
  } else {
    await syncSeedImages(db, manifest);
  }
  return db;
}

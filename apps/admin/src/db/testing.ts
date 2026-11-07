import type { SeedImageManifest } from "@/entities/artifact";

import { openPglite } from "./index";
import { insertSeedData } from "./seed";

/** 테스트용 비밀번호 해시(bcrypt, "test1234"). 테스트마다 해시를 만들면 느려서 미리 만들어 둔다. */
export const TEST_PASSWORD = "test1234";
export const TEST_HASH = "$2b$04$a3JH1jHNuGqVZPdtvKcTIebRWTdT4iCUZo0t9CQi5TFWBwXrvZUQG";

/** 테스트마다 새로 만드는 메모리 DB. 시드(계정 둘, 유물 16점, 주석)를 넣는다. */
export async function createTestDb(manifest: SeedImageManifest = {}) {
  const db = await openPglite("memory://");
  await insertSeedData(db, { guest: TEST_HASH, curator: TEST_HASH }, manifest);
  return db;
}

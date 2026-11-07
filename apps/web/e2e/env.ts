/** E2E 포트와 환경 변수. 개발 서버(3000·3001)와 겹치지 않게 한다. CI의 빌드 단계도 같은 값을 쓴다. */
export const ADMIN_PORT = 3100;
export const WEB_PORT = 3101;
export const ADMIN_URL = `http://localhost:${ADMIN_PORT}`;
export const CURATOR = { email: "curator@rizer.dev", password: "e2e-curator-pass" };

export const E2E_ENV = {
  // 어드민
  PGLITE_DATA_DIR: "memory://",
  SEED_DEMO: "1",
  CURATOR_PASSWORD: CURATOR.password,
  NEXTAUTH_URL: ADMIN_URL,
  NEXTAUTH_SECRET: "e2e-only-secret",
  WEB_URL: `http://localhost:${WEB_PORT}`,
  WEB_REVALIDATE_URL: `http://localhost:${WEB_PORT}/api/revalidate`,
  REVALIDATE_SECRET: "e2e-revalidate-secret",
  // 공개 사이트
  ARCHIVE_API_URL: ADMIN_URL,
  NEXT_PUBLIC_ARCHIVE_API_URL: ADMIN_URL,
  SITE_URL: `http://localhost:${WEB_PORT}`,
};

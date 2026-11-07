import { defineConfig, devices } from "@playwright/test";

import { ADMIN_PORT, E2E_ENV, WEB_PORT } from "./e2e/env";

// CI는 앞 단계의 pnpm build 결과를 그대로 쓴다(빌드 때 같은 E2E_ENV를 넣는다).
const buildThen = (dir: string, command: string) =>
  process.env.CI ? `pnpm --dir ${dir} ${command}` : `pnpm --dir ${dir} build && pnpm --dir ${dir} ${command}`;

/**
 * 공개 사이트와 어드민을 프로덕션 빌드로 함께 띄워 끝에서 끝까지 확인한다.
 * 어드민은 매번 새 메모리 DB에 시드(유물 16점, 계정)를 넣고 시작한다. 이미지는 apps/admin/.data/storage에 있어야 한다
 * (pnpm seed:images, CI는 --synthetic).
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  expect: { timeout: 10_000 },
  use: { baseURL: `http://localhost:${WEB_PORT}`, trace: "on-first-retry" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] }, testIgnore: /mobile\.spec/ },
    { name: "mobile", use: { ...devices["Pixel 7"] }, testMatch: /mobile\.spec/ },
  ],
  webServer: [
    {
      command: buildThen("../admin", `start --port ${ADMIN_PORT}`),
      url: `http://localhost:${ADMIN_PORT}/login`,
      reuseExistingServer: !process.env.CI,
      timeout: 300_000,
      env: E2E_ENV,
    },
    {
      command: buildThen(".", `start --port ${WEB_PORT}`),
      url: `http://localhost:${WEB_PORT}`,
      reuseExistingServer: !process.env.CI,
      timeout: 300_000,
      env: E2E_ENV,
    },
  ],
});

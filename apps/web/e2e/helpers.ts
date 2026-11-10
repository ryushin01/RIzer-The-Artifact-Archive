import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

import { ADMIN_URL, CURATOR } from "./env";

/** 입장 화면을 건너뛴다(같은 탭에서 이미 지나간 것처럼). */
export async function skipGate(page: Page) {
  await page.addInitScript(() => sessionStorage.setItem("rizer:gate", "1"));
}

/** axe 자동 검사. 위반이 있으면 실패한다(KWCAG를 모두 보장하지는 않는다). */
export async function expectNoA11yViolations(page: Page) {
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(result.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
}

/** 없는 유물 화면. 스트리밍 중에 notFound가 나오면 상태 코드는 200이지만 404 화면과 noindex가 나온다. */
export async function expectNotFound(page: Page) {
  await expect(page.getByRole("heading", { name: /Lost Relic/ })).toBeVisible();
  // 라우트 그룹의 not-found는 프레임워크가 같은 meta를 두 번 넣을 수 있다. 값은 같으므로 첫 번째만 본다.
  await expect(page.locator('head meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
  // 화면 제목으로도 404임을 알 수 있어야 한다(KWCAG 6.4.2).
  await expect(page).toHaveTitle(/페이지를 찾을 수 없습니다|Page not found/);
  await expect(page.locator("title")).toHaveCount(1);
}

export async function loginAsCurator(page: Page) {
  await page.goto(`${ADMIN_URL}/login`);
  await page.getByLabel("이메일").fill(CURATOR.email);
  await page.getByLabel("비밀번호").fill(CURATOR.password);
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByRole("heading", { name: /반갑습니다/ })).toBeVisible();
}

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
  await expect(page.locator('head meta[name="robots"]')).toHaveAttribute("content", /noindex/);
}

export async function loginAsCurator(page: Page) {
  await page.goto(`${ADMIN_URL}/login`);
  await page.getByLabel("이메일").fill(CURATOR.email);
  await page.getByLabel("비밀번호").fill(CURATOR.password);
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByRole("heading", { name: /반갑습니다/ })).toBeVisible();
}

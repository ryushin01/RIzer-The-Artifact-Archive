import { expect, test } from "@playwright/test";

import { expectNoA11yViolations, expectNotFound, skipGate } from "./helpers";

test.describe("첫 화면", () => {
  test("입장 화면을 지나면 같은 탭에서는 다시 보이지 않는다", async ({ page }) => {
    await page.goto("/");
    const enter = page.getByRole("button", { name: /아카이브 입장/ });
    await expect(enter).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(page.getByRole("heading", { level: 1, name: /Legends/ })).toBeVisible();
    await page.reload();
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("섹션과 메뉴가 있고 접근성 위반이 없다", async ({ page }) => {
    await skipGate(page);
    await page.goto("/");
    for (const name of ["전설이 남긴 열여섯 점", "여섯 개의 신화, 여섯 개의 전시실", "처음 글로 남은 순간"]) {
      await expect(page.getByRole("heading", { name })).toBeVisible();
    }
    await expect(page.getByRole("navigation", { name: "주 메뉴" })).toBeVisible();
    await expectNoA11yViolations(page);
  });

  test("움직임 효과를 끌 수 있다", async ({ page }) => {
    await skipGate(page);
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "움직임 효과" });
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-motion", "reduce");
  });
});

test.describe("아카이브", () => {
  test.beforeEach(async ({ page }) => skipGate(page));

  test("검색어와 전시실로 거르고 주소에 남긴다", async ({ page }) => {
    await page.goto("/artifacts");
    // 다른 테스트가 동시에 유물을 공개할 수 있어 정확한 개수(16점)는 단위 테스트에서 확인한다.
    await expect(page.getByRole("status")).toHaveText(/^유물 \d+점$/);
    await page.getByRole("searchbox", { name: "검색" }).fill("토르");
    await expect(page.getByRole("status")).toHaveText("유물 1점");
    await expect(page.getByRole("link", { name: "묠니르" })).toBeVisible();
    await expect(page).toHaveURL(/q=%ED%86%A0%EB%A5%B4/);

    await page.getByRole("button", { name: "조건 지우기" }).click();
    await page.getByRole("radio", { name: "한국 신화" }).check();
    await expect(page.getByRole("status")).toHaveText("유물 2점");
    await expect(page).toHaveURL(/gallery=korean/);
    await expectNoA11yViolations(page);
  });

  test("주소의 조건으로 서버에서 바로 거른다", async ({ page }) => {
    await page.goto("/artifacts?gallery=norse");
    await expect(page.getByRole("status")).toHaveText("유물 4점");
    await expect(page.getByRole("radio", { name: "북유럽 신화" })).toBeChecked();
  });
});

test.describe("유물 화면", () => {
  test.beforeEach(async ({ page }) => skipGate(page));

  test("딥줌 뷰어와 주석, 안내 투어", async ({ page }) => {
    await page.goto("/artifacts/excalibur");
    await expect(page.getByRole("heading", { level: 1, name: "엑스칼리버" })).toBeVisible();
    // 타일을 불러와 주석 번호 버튼을 얹는다.
    const markers = page.getByRole("button", { name: /^주석 \d: / });
    await expect(markers).toHaveCount(4, { timeout: 20_000 });

    await markers.nth(1).click();
    await expect(page.getByRole("button", { name: /십자형 코등이/, pressed: true })).toBeVisible();

    // 고른 주석(2번)에서 투어를 이어 간다.
    await page.getByRole("button", { name: "안내 투어 재생" }).click();
    await expect(page.getByRole("button", { name: "투어 멈춤" })).toBeVisible();
    await expect(page.getByText("02 / 04")).toBeVisible();
    await page.getByRole("button", { name: "다음 주석" }).click();
    await expect(page.getByText("03 / 04")).toBeVisible();

    await expect(page.getByRole("link", { name: /Hand-and-a-Half Sword/ })).toHaveAttribute("href", /metmuseum\.org/);
    await expectNoA11yViolations(page);
  });

  test("합성 이미지는 구성 소장품을 모두 밝힌다", async ({ page }) => {
    await page.goto("/artifacts/cheonbuin");
    await expect(page.getByText(/합성 이미지입니다/)).toBeVisible();
    for (const name of ["Short Sword (Duan Jian)", "Mirror in Han style", "Dōtaku (Bronze Bell)"]) {
      await expect(page.getByRole("link", { name: new RegExp(name.replace(/[()]/g, "\\$&")) })).toBeVisible();
    }
  });

  test("없는 유물은 404", async ({ page }) => {
    await page.goto("/artifacts/no-such-relic");
    await expectNotFound(page);
  });
});

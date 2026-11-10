import { expect, test } from "@playwright/test";

import { expectNoA11yViolations, expectNotFound, skipGate } from "./helpers";

test.describe("첫 화면", () => {
  test("입장 화면을 지나면 같은 탭에서는 다시 보이지 않는다", async ({
    page,
  }) => {
    await page.goto("/");
    const enter = page.getByRole("button", { name: /아카이브 입장/ });
    await expect(enter).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(
      page.getByRole("heading", { level: 1, name: /Legends/ }),
    ).toBeVisible();
    await page.reload();
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("섹션과 메뉴가 있고 접근성 위반이 없다", async ({ page }) => {
    await skipGate(page);
    await page.goto("/");
    for (const name of [
      "먼저 만나는 대표 유물",
      "열 갈래의 신화, 열 개의 전시실",
      "처음 글로 남은 순간",
    ]) {
      await expect(page.getByRole("heading", { name })).toBeVisible();
    }
    await expect(
      page.getByRole("navigation", { name: "주 메뉴" }),
    ).toBeVisible();
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
    // 다른 테스트가 동시에 유물을 공개할 수 있어 정확한 개수는 단위 테스트에서 확인한다.
    await expect(page.getByRole("status")).toHaveText(/^유물 \d+점$/);
    await page.getByRole("searchbox", { name: "검색" }).fill("토르");
    // 해설과 주석까지 찾으므로 여러 점이 나오고, 이름이 맞는 쪽이 앞에 온다.
    await expect(page.getByRole("status")).toHaveText(/^유물 \d+점$/);
    await expect(page.getByRole("link", { name: "묠니르" })).toBeVisible();
    await expect(page).toHaveURL(/q=%ED%86%A0%EB%A5%B4/);

    await page.getByRole("button", { name: "조건 지우기" }).click();
    await page.getByRole("radio", { name: "한국 신화와 설화" }).check();
    await expect(page.getByRole("status")).toHaveText("유물 4점");
    await expect(page).toHaveURL(/gallery=korean/);
    await expectNoA11yViolations(page);
  });

  test("한 묶음씩 보여 주고, 더 보기로 이어 붙이면 새 카드로 초점이 간다", async ({
    page,
  }) => {
    await page.goto("/artifacts");
    const cards = page
      .getByRole("list", { name: "검색 결과" })
      .getByRole("listitem");
    await expect(cards).toHaveCount(24);
    await expect(page.getByText(/^\d+점 중 24점$/)).toBeVisible();
    await page.getByRole("button", { name: "유물 더 보기" }).click();
    await expect(cards).toHaveCount(48);
    await expect(cards.nth(24).getByRole("link")).toBeFocused();
    await expect(page.getByText(/^\d+점 중 48점$/)).toBeVisible();
    // 페이지 나누기는 화면 주소에 남기지 않는다.
    await expect(page).toHaveURL(/\/artifacts$/);
    await expectNoA11yViolations(page);
  });

  test("주소의 조건으로 서버에서 바로 거른다", async ({ page }) => {
    await page.goto("/artifacts?gallery=norse");
    await expect(page.getByRole("status")).toHaveText("유물 18점");
    await expect(
      page.getByRole("radio", { name: "북유럽·게르만 신화" }),
    ).toBeChecked();
  });
});

test.describe("유물 화면", () => {
  test.beforeEach(async ({ page }) => skipGate(page));

  test("딥줌 뷰어와 주석, 안내 투어", async ({ page }) => {
    await page.goto("/artifacts/excalibur");
    await expect(
      page.getByRole("heading", { level: 1, name: "엑스칼리버" }),
    ).toBeVisible();
    // 타일을 불러와 주석 번호 버튼을 얹는다.
    const markers = page.getByRole("button", { name: /^주석 \d: / });
    await expect(markers).toHaveCount(4, { timeout: 20_000 });

    await markers.nth(1).click();
    await expect(
      page.getByRole("button", { name: /십자형 코등이/, pressed: true }),
    ).toBeVisible();

    // 고른 주석(2번)에서 투어를 이어 간다.
    await page.getByRole("button", { name: "안내 투어 재생" }).click();
    await expect(page.getByRole("button", { name: "투어 멈춤" })).toBeVisible();
    await expect(page.getByText("02 / 04")).toBeVisible();
    await page.getByRole("button", { name: "다음 주석" }).click();
    await expect(page.getByText("03 / 04")).toBeVisible();

    await expect(
      page.getByRole("link", { name: /Hand-and-a-Half Sword/ }),
    ).toHaveAttribute("href", /metmuseum\.org/);
    await expectNoA11yViolations(page);
  });

  test("주석 바로가기 주소로 들어오면 그 주석이 열리고, 고르면 주소가 따라 바뀐다", async ({
    page,
  }) => {
    await page.goto("/artifacts/excalibur?note=3");
    await expect(
      page.getByRole("button", { name: /^03\s*곧은 양날$/, pressed: true }),
    ).toBeVisible({ timeout: 20_000 });
    const tip = page.getByRole("button", { name: /^04\s*칼끝$/ });
    await tip.click();
    await expect(page).toHaveURL(/\?note=4$/);
    await expect(
      page.getByRole("button", { name: "이 주석 링크 복사" }),
    ).toBeVisible();
    // 다시 누르면 닫히고 주소에서도 빠진다.
    await tip.click();
    await expect(page).toHaveURL(/\/artifacts\/excalibur$/);
  });

  test("유물마다 공유 이미지가 있다", async ({ page, request }) => {
    await page.goto("/artifacts/excalibur");
    const og = await page
      .locator('meta[property="og:image"]')
      .first()
      .getAttribute("content");
    expect(og).toContain("/artifacts/excalibur/opengraph-image");
    const res = await request.get(new URL(og!).pathname + new URL(og!).search);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toBe("image/png");
    expect((await res.body()).byteLength).toBeGreaterThan(20_000);
  });

  test("다른 영역 안에 든 주석 번호도 마우스로 누를 수 있다", async ({
    page,
  }) => {
    // 카바차와 쿤달라: 1번 영역이 2번 영역 안에 있다. 바깥 영역이 클릭을 가로채면 안 된다.
    await page.goto("/artifacts/kavacha-kundala");
    const first = page.getByRole("button", { name: /^주석 1: / });
    await expect(first).toBeVisible({ timeout: 20_000 });
    await first.click({ timeout: 5_000 });
    await expect(
      page.getByRole("button", { name: /가루다를 탄 비슈누/, pressed: true }),
    ).toBeVisible();
  });

  test("합성 이미지는 구성 소장품을 모두 밝힌다", async ({ page }) => {
    await page.goto("/artifacts/cheonbuin");
    await expect(page.getByText(/합성 이미지입니다/)).toBeVisible();
    for (const name of [
      "Short Sword (Duan Jian)",
      "Mirror in Han style",
      "Dōtaku (Bronze Bell)",
    ]) {
      await expect(
        page.getByRole("link", {
          name: new RegExp(name.replace(/[()]/g, "\\$&")),
        }),
      ).toBeVisible();
    }
  });

  test("없는 유물은 404", async ({ page }) => {
    await page.goto("/artifacts/no-such-relic");
    await expectNotFound(page);
  });
});

test.describe("영어판", () => {
  test.beforeEach(async ({ page }) => skipGate(page));

  test("첫 화면이 영어로 나오고 언어 표시가 맞으며 접근성 위반이 없다", async ({
    page,
  }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(
      page.getByRole("navigation", { name: "Main menu" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Skip to main content" }),
    ).toBeAttached();
    await expectNoA11yViolations(page);
  });

  test("입장 화면도 영어로 나온다", async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto("/en");
    await expect(
      page.getByRole("button", { name: /Enter the archive/ }).first(),
    ).toBeFocused();
    await page.close();
  });

  test("유물 해설과 주석이 영어로 나오고, 한국어판과 오갈 수 있다", async ({
    page,
  }) => {
    await page.goto("/en/artifacts/excalibur");
    await expect(
      page.getByRole("heading", { level: 1, name: "Excalibur" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Story" })).toBeVisible();
    await expect(
      page.locator('link[rel="alternate"][hreflang="ko"]'),
    ).toHaveAttribute("href", /\/artifacts\/excalibur$/);
    await expectNoA11yViolations(page);

    await page
      .getByRole("navigation", { name: "Main menu" })
      .getByRole("link", { name: "한국어" })
      .click();
    await expect(page).toHaveURL(/\/artifacts\/excalibur$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
    await expect(
      page.getByRole("heading", { level: 1, name: "엑스칼리버" }),
    ).toBeVisible();

    await page
      .getByRole("navigation", { name: "주 메뉴" })
      .getByRole("link", { name: "English" })
      .click();
    await expect(page).toHaveURL(/\/en\/artifacts\/excalibur$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("영어로 검색하고, 더 보기로 이어 붙인 카드도 영어다", async ({
    page,
  }) => {
    await page.goto("/en/artifacts");
    const cards = page
      .getByRole("list", { name: "Search results" })
      .getByRole("listitem");
    await expect(cards).toHaveCount(24);
    await page.getByRole("button", { name: "Show more artifacts" }).click();
    await expect(cards).toHaveCount(48);
    await expect(cards.nth(30)).not.toHaveText(/[가-힣]/);

    await page.getByRole("searchbox", { name: /Search/ }).fill("thor");
    await expect(
      page.getByRole("link", { name: /Mjölnir/ }).first(),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/en\/artifacts\?.*q=thor/);
  });

  test("카드를 눌러도 영어판에 머문다", async ({ page }) => {
    await page.goto("/en/artifacts");
    await page
      .getByRole("list", { name: "Search results" })
      .getByRole("link")
      .first()
      .click();
    await expect(page).toHaveURL(/\/en\/artifacts\/[a-z-]+/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("없는 주소는 영어 404 화면이다", async ({ page }) => {
    await page.goto("/en/artifacts/no-such-relic");
    await expectNotFound(page);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await page.goto("/en/no/such/page");
    await expectNotFound(page);
    await expect(page).toHaveTitle(/Page not found/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("유물별 공유 이미지가 만들어진다", async ({ request }) => {
    const response = await request.get(
      "/en/artifacts/excalibur/opengraph-image",
    );
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });
});

test.describe("디자인 시스템", () => {
  test("바닥글에서 사이트와 함께 배포한 Storybook으로 간다", async ({
    page,
  }) => {
    await skipGate(page);
    await page.goto("/");
    const link = page.getByRole("link", { name: "디자인 시스템(Storybook)" });
    await expect(link).toHaveAttribute("href", "/storybook/index.html");
    await link.click();
    await expect(page).toHaveURL(/\/storybook\/index\.html/);
    // 미리보기 iframe은 같은 출처에서만 허용한다.
    await expect(
      page
        .frameLocator("#storybook-preview-iframe")
        .locator("#storybook-root > *")
        .first(),
    ).toBeVisible({
      timeout: 30_000,
    });
  });

  test("Storybook 주소는 index.html로 보내고 같은 출처 프레임만 허용한다", async ({
    request,
  }) => {
    const folder = await request.get("/storybook", { maxRedirects: 0 });
    expect(folder.status()).toBe(307);
    expect(folder.headers().location).toMatch(/\/storybook\/index\.html$/);
    const page = await request.get("/storybook/index.html");
    expect(page.headers()["x-frame-options"]).toBe("SAMEORIGIN");
    expect(page.headers()["content-security-policy"]).toContain(
      "frame-ancestors 'self'",
    );
    const home = await request.get("/");
    expect(home.headers()["x-frame-options"]).toBe("DENY");
  });
});

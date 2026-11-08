import { readFile } from "node:fs/promises";

import { expect, test } from "@playwright/test";

import { ADMIN_URL } from "./env";
import { expectNoA11yViolations, expectNotFound, loginAsCurator, skipGate } from "./helpers";

/** 1×1 PNG. 업로드·타일링 흐름만 확인한다. */
const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  "base64",
);

test.describe("어드민: 게스트", () => {
  test("둘러볼 수 있지만 저장은 거절된다", async ({ page }) => {
    await page.goto(`${ADMIN_URL}/login`);
    await page.getByRole("button", { name: "게스트로 둘러보기" }).click();
    await expect(page.getByRole("heading", { name: /게스트님, 반갑습니다/ })).toBeVisible();
    await expect(page.getByRole("link", { name: "새 유물" })).toHaveCount(0);

    await page.getByRole("link", { name: "유물", exact: true }).click();
    await expect(page.getByText("게스트로 둘러보는 중입니다")).toBeVisible();
    // 목록은 30점씩 쪽을 나눈다.
    const pages = page.getByRole("navigation", { name: "유물 목록 쪽" });
    await expect(pages.getByRole("link", { name: "1쪽" })).toHaveAttribute("aria-current", "page");
    await pages.getByRole("link", { name: "2쪽" }).click();
    await expect(page).toHaveURL(/page=2/);
    await expect(pages.getByRole("link", { name: "2쪽" })).toHaveAttribute("aria-current", "page");
    await pages.getByRole("link", { name: "1쪽" }).click();
    await page.getByRole("link", { name: "엑스칼리버" }).click();
    await page.getByRole("button", { name: "저장" }).click();
    const toast = page.locator("[data-sonner-toast]").filter({ hasText: /게스트 계정은 둘러보기만/ });
    await expect(toast).toBeVisible();
    // 알림이 나타나는 애니메이션(투명도)이 끝난 뒤 대비를 잰다.
    await expect(toast).toHaveAttribute("data-mounted", "true");
    await page.waitForTimeout(500);
    await expectNoA11yViolations(page);
  });
});

test.describe("어드민: 큐레이터", () => {
  test("유물을 만들고 이미지를 올려 공개하면 공개 사이트에 보이고, 지우면 사라진다", async ({ page }) => {
    const slug = `e2e-relic-${Date.now()}`;
    await loginAsCurator(page);
    await page.getByRole("link", { name: "새 유물" }).click();

    const fill = (label: string | RegExp, value: string) => page.getByLabel(label, { exact: typeof label === "string" }).fill(value);
    await fill("이름", "시험의 검");
    await fill("원어 이름", "Sword of Trial");
    await fill("주소", slug);
    await fill("첫 기록 연도", "1200");
    await fill("첫 기록 문헌", "E2E 문헌");
    await fill("권능", "테스트를 통과시킨다.");
    await fill("요약", "E2E에서 만든 유물입니다.");
    await fill("본문", "첫 문단.\n\n둘째 문단.");
    await fill("이미지 설명(대체 텍스트)", "검은 점 하나");
    await fill("소장품 번호", "0");
    await fill("사진 속 소장품 이름", "Test object");
    await fill("소장품 페이지", "https://example.com/object");
    await fill("원본 이미지 주소", "https://example.com/object.jpg");
    await page.getByRole("button", { name: "만들기" }).click();

    await expect(page.getByText("유물을 만들었습니다")).toBeVisible();
    await page.locator('input[type="file"]').setInputFiles({ name: "relic.png", mimeType: "image/png", buffer: PNG });
    await expect(page.getByText(/타일 \d+개를 만들었습니다/)).toBeVisible({ timeout: 30_000 });

    await page.getByRole("button", { name: "공개하기" }).click();
    await expect(page.getByText("공개했습니다.")).toBeVisible();

    const web = await page.context().newPage();
    await skipGate(web);
    await expect(async () => {
      await web.goto(`/artifacts/${slug}`);
      await expect(web.getByRole("heading", { level: 1, name: "시험의 검" })).toBeVisible({ timeout: 3_000 });
    }).toPass({ timeout: 15_000 });

    await page.getByRole("button", { name: "삭제" }).click();
    await page.getByRole("alertdialog").getByRole("button", { name: "삭제" }).click();
    await expect(page).toHaveURL(/\/artifacts\?deleted=1/);
    // 캐시 비우기 알림은 응답 뒤(after)에 가므로 반영될 때까지 다시 연다.
    await expect(async () => {
      await web.goto(`/artifacts/${slug}`);
      await expectNotFound(web);
    }).toPass({ timeout: 15_000 });
  });

  test("주석을 W3C JSON으로 내보내고, 고친 파일을 가져와 편집기에 올린다", async ({ page }) => {
    await loginAsCurator(page);
    await page.goto(`${ADMIN_URL}/artifacts/art_excalibur/annotations`);
    await expect(page.locator(".openseadragon-canvas")).toBeVisible();

    const [download] = await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: "JSON 내보내기" }).click()]);
    const exported = JSON.parse(await readFile(await download.path(), "utf8")) as { type: string; items: { body: unknown }[] };
    expect(exported.type).toBe("AnnotationPage");
    expect(exported.items.length).toBeGreaterThan(1);

    const one = { ...exported, items: exported.items.slice(0, 1) };
    await page.locator('input[type="file"]').setInputFiles({ name: "notes.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(one)) });
    await expect(page.getByText(/주석 1개를 가져왔습니다/)).toBeVisible();

    await page.locator('input[type="file"]').setInputFiles({ name: "broken.json", mimeType: "application/json", buffer: Buffer.from("{ not json") });
    await expect(page.getByText("JSON 파일을 읽지 못했습니다.")).toBeVisible();
    // 저장하지 않고 떠나므로 시드 주석은 그대로다.
  });

  test("주석을 고치면 공개 사이트에 바로 반영된다", async ({ page }) => {
    const title = `자루 끝 ${Date.now()}`;
    await loginAsCurator(page);
    // 주석 편집기(Annotorious·PixiJS)가 운영 CSP(unsafe-eval 없음)에서도 오류 없이 떠야 한다.
    const pageErrors: string[] = [];
    page.on("pageerror", (e) => pageErrors.push(e.message));
    await page.goto(`${ADMIN_URL}/artifacts/art_durandal/annotations`);
    await expect(page.locator(".openseadragon-canvas")).toBeVisible();
    await page.waitForTimeout(1_000);
    expect(pageErrors).toEqual([]);
    await page.getByRole("button", { name: /1\.\s*자루 끝/ }).click();
    // 펼친 주석의 입력칸만 보인다(나머지는 hidden).
    await page.getByRole("textbox", { name: "제목" }).fill(title);
    await page.getByRole("button", { name: "저장", exact: true }).click();
    await expect(page.getByText(/주석 4개를 저장했습니다/)).toBeVisible();

    await skipGate(page);
    await expect(async () => {
      await page.goto("/artifacts/durandal");
      await expect(page.getByRole("button", { name: `주석 1: ${title}` })).toBeVisible({ timeout: 5_000 });
    }).toPass({ timeout: 20_000 });
  });
});

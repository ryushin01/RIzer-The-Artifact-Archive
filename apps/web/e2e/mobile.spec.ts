import { expect, test } from "@playwright/test";

import { skipGate } from "./helpers";

// 실제 화면의 넘침은 스토리 테스트로 잡히지 않아 프로덕션 빌드에서 확인한다.
for (const path of ["/", "/artifacts", "/artifacts/cheonbuin", "/en", "/en/artifacts", "/en/artifacts/cheonbuin"]) {
  test(`${path}: 가로로 넘치지 않는다`, async ({ page }) => {
    await skipGate(page);
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

// 좁은 터치 화면에서도 끌기 없이 한 번 누르기로 사진을 옮길 수 있다(KWCAG 6.5.1).
test("유물 화면: 이동 버튼을 눌러 사진을 옮긴다", async ({ page }) => {
  await skipGate(page);
  await page.goto("/artifacts/excalibur");
  const marker = page.getByRole("button", { name: /^주석 1: / });
  await expect(marker).toBeVisible({ timeout: 20_000 });
  const y = async () => (await marker.boundingBox())!.y;
  const before = await y();
  await page.getByRole("group", { name: "사진 이동" }).getByRole("button", { name: "아래로 이동" }).tap();
  await expect.poll(y).toBeLessThan(before - 20);
});

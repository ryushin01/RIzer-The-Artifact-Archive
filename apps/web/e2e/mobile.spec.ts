import { expect, test } from "@playwright/test";

import { skipGate } from "./helpers";

// 실제 화면의 넘침은 스토리 테스트로 잡히지 않아 프로덕션 빌드에서 확인한다.
for (const path of ["/", "/artifacts", "/artifacts/cheonbuin"]) {
  test(`${path}: 가로로 넘치지 않는다`, async ({ page }) => {
    await skipGate(page);
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

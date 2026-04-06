import { test, expect } from "@playwright/test";

test.describe("Search results", () => {
  test("Should Find test results", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.fill("#searchTerm", "bank");
    await page.keyboard.press("Enter");

    const numberOfLinks = page.locator("li > a");
    await expect(numberOfLinks).toHaveCount(2);
  });
  test.skip("Transfer Funds", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html");
    await page.pause();
    await page.locator('name="fromAccountId"').selectOption({ index: 2 });
    await page.locator('name="toAccountId"').selectOption({ index: 3 });
    await page.fill("#tf_amount", "200");
    await page.fill("#tf_description", "Wire transfer");
    await page.locator("#btn_submit").click();
  });
});

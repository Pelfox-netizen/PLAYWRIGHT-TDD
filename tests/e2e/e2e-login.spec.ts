import { test, expect } from "@playwright/test";

test.describe("Login/Logout", () => {
  //before hook
  test.beforeEach(async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/");
  });
  // negative scenario
  test("Negative scenario for login", async ({ page }) => {
    await page.click("#signin_button");
    await page.fill("#user_login", "invalid_username");
    await page.fill("#user_password", "invalid_password");
    await page.click("text=Sign in");
    const errorMessage = page.locator(".alert-error");
    await expect(errorMessage).toContainText("Login and/or password are wrong");
  });
  //positive scenario
});

import { test, expect } from "@playwright/test";

test.describe.only("Login/Logout", () => {
  //before hook
  // test.beforeEach(async ({ page }) => {
  //   await page.goto("http://zero.webappsecurity.com/");
  // });
  // negative scenario
  test("KAN-2 Negative scenario for login", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/");
    await page.click("#signin_button");
    await page.fill("#user_login", "invalid_username");
    await page.fill("#user_password", "invalid_password");
    await page.click("text=Sign in");
    const errorMessage = page.locator(".alert-error");
    await expect(errorMessage).toContainText("Login and/or password are wrong");
  });
  //positive scenario
  test("KAN-3 Feedback Form", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/feedback.html");
    await page.locator("#name").fill("Jack");
    await page.locator("#email").fill("Sparrow");
    await page.locator("#subject").fill("Confidential Info");
    // await page.pause();
    await page.locator("#comment").fill("Test info");
    await page.locator("input[type='submit']").click();
  });
});

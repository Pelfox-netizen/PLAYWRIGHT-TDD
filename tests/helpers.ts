import { Page } from "@playwright/test";
export async function loadHomePage(page: Page) {
  await page.goto("url");
}

export async function assertTitle(page: Page) {}

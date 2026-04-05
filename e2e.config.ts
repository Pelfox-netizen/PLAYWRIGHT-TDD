import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 60000,
  retries: 1,
  testDir: "tests/e2e",
  use: {
    headless: false,
    viewport: {
      width: 1280,
      height: 720,
    },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    video: "off",
    screenshot: "off",
  },
  // npx playwright test --config=playwright.config.ts --projects=Chromium
  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  reporter: "html",
});

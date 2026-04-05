import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 60000,
  retries: 1,
  use: {
    headless: true,
    viewport: {
      width: 1280,
      height: 720,
    },
    actionTimeout: 15000,
    ignoreHTTPSErrors: true,
    video: "off",
    screenshot: "off",
  },
  // npx playwright test --config=playwright.config.ts --project=Chromium
  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  reporter: "html",
});

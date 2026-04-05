import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 60000,
  retries: 0,
  testDir: "tests/e2e",
  use: {
    headless: false,

    launchOptions: {
      args: ["--start-maximized"],
    },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    video: "off",
    screenshot: "off",
  },
  projects: [
    {
      name: "Chromium",
      use: {
        //  ...devices["Desktop Chrome"]
        viewport: null,
      },
    },
  ],
  //reporter: "html",
});

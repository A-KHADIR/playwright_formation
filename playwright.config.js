// browserstack.config.js
const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
        baseURL: 'https://your-website.com',
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=browserstack.accessKey=${process.env.BROWSERSTACK_ACCESS_KEY}&browser=chrome&os=Windows`,
          headers: {
            'User-Agent': 'playwright',
          },
        },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
        viewport: { width: 1280, height: 720 },
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=browserstack.accessKey=${process.env.BROWSERSTACK_ACCESS_KEY}&browser=firefox&os=Windows`,
          headers: {
            'User-Agent': 'playwright',
          },
        },
      },
    },
    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        viewport: { width: 1280, height: 720 },
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=browserstack.accessKey=${process.env.BROWSERSTACK_ACCESS_KEY}&browser=edge&os=Windows`,
          headers: {
            'User-Agent': 'playwright',
          },
        },
      },
    },
  ],
});

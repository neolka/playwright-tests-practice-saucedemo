import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 1,
  use: {
    baseURL: 'https://www.saucedemo.com/',
    headless: true,
    launchOptions: {
      args: [
        '--disable-save-password-bubble',
        '--disable-features=PasswordManagerOnboarding,PasswordLeakDetection,AutofillKeyboardAccessoryView'
      ],
    },
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  reporter: [
    ['list'], // console output
    ['json', { outputFile: 'test-results/results.json' }], // JSON report
    ['html', { outputFolder: 'playwright-report', open: 'never' }], // HTML report
  ],
});

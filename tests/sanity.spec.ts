import { test, expect } from '@playwright/test';

test('Sanity check', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
});
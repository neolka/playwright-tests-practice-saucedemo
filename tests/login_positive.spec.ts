import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { getAuthData } from '../utils/utils.ts';

test.describe ('Login positive scenarios',() => { 

  test('Login with standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const authData = getAuthData();

    await loginPage.goto();
    await loginPage.login();
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Login page input supports tab navigation', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await page.focus('#user-name');
    await page.keyboard.press('Tab');
    const activeElement = await page.evaluate(() => document.activeElement?.id);
    await expect(activeElement).toBe('password');
  });

});
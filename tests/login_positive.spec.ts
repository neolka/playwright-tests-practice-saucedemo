import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../utils/testData';

test.describe ('Login positive scenarios',() => { 

  test('Login with standard user', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login(users.standardValid.username, users.standardValid.password);
    await inventory.assertOnInventoryPage();
  });

  test('Successful login redirects to Home page', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(users.standardValid.username, users.standardValid.password);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Login page input supports tab navigation', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await page.focus('#user-name');
    await page.keyboard.press('Tab');
    const activeElement = await page.evaluate(() => document.activeElement?.id);
    expect(activeElement).toBe('password');
  });

});
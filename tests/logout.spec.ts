import { test, expect } from '../fixtures/fixtures';
import { InventoryPage } from '../pages/InventoryPage';

test('user can logout successfully', async ({ loggedInPage }) => {
  const inventory = new InventoryPage(loggedInPage);

  //Make sure the user is on Inventory page
  await inventory.assertOnInventoryPage();
  await inventory.logout();

  // After logout, user should be back on login page
  await expect(loggedInPage).toHaveURL(/saucedemo\.com\/$/);
  await expect(loggedInPage.locator('#login-button')).toBeVisible();
});
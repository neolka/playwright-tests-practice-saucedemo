import { test, expect } from '../fixtures/authFixture.ts';
import { InventoryPage } from '../pages/InventoryPage.ts';

test('user can logout successfully', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);

  //Make sure the user is on Inventory page
  await inventoryPage.assertOnInventoryPage();
  await inventoryPage.logout();

  // After logout, user should be back on login page
  await expect(loggedInPage).toHaveURL(/saucedemo\.com\/$/);
  await expect(loggedInPage.locator('#login-button')).toBeVisible();
});
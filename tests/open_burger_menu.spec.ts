import { InventoryPage } from '../pages/InventoryPage.ts';
import { test, expect } from '../fixtures/authFixture.ts';

test('Burger menu is visible', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);

  await inventoryPage.assertOnInventoryPage();
  
  await expect(loggedInPage.locator('#react-burger-menu-btn')).toBeVisible();
});
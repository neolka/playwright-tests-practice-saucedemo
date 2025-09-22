import { InventoryPage } from '../pages/InventoryPage';
import { test, expect } from '../fixtures/fixtures';

test('Burger menu is visible', async ({ loggedInPage }) => {
  const inventory = new InventoryPage(loggedInPage);

  await inventory.assertOnInventoryPage();
  
  await expect(loggedInPage.locator('#react-burger-menu-btn')).toBeVisible();
});
import { InventoryPage } from '../pages/InventoryPage.ts';
import { test, expect} from '../fixtures/authFixture.ts';

test('Check UI of product cell', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);

    await inventoryPage.assertOnInventoryPage();

    const productCount = await inventoryPage.products.count();
  expect(productCount).toBeGreaterThan(0);

  for (let i = 0; i < productCount; i++) {
    const product = inventoryPage.productAt(i);

    await expect(product.locator('.inventory_item_img img')).toBeVisible();
    await expect(product.locator('.inventory_item_name')).toBeVisible();
    await expect(product.locator('.inventory_item_desc')).toBeVisible();
    await expect(product.locator('.inventory_item_price')).toBeVisible();
    await expect(product.locator('button.btn_inventory')).toBeVisible();
  }
  });
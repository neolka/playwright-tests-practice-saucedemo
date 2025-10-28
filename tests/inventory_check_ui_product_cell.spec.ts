import { InventoryPage } from '../pages/InventoryPage.ts';
import { test, expect} from '../fixtures/authFixture.ts';


test.describe('Inventory page tests', () => { 

  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ loggedInPage }) => {
    inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.assertOnInventoryPage();
  });

  test.afterEach(async () => {
    try {
      await inventoryPage.resetAppState();
    } catch (e) { 
      console.warn('⚠️ Failed to reset app state:', e);
    }
  });
  
  test('Check UI of product cell', async () => {
    await inventoryPage.verifyAllProductsHaveRequiredElements();
  });
  
  test('Add product to cart', async () => {
    await test.step('Verify initial cart state', async () => {
      const count = await inventoryPage.getCartBadgeCount();
      expect(count).toBe(0);
    });

    await test.step('Add product and verify badge update', async () => {
      await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
      expect(await inventoryPage.getCartBadgeCount()).toBe(1);
    });
  });

  test('Remove product from cart', async () => {
    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
    await inventoryPage.removeProductFromCartByName('Sauce Labs Backpack');

    expect(await inventoryPage.getCartBadgeCount()).toBe(0);
  });

});
import { InventoryPage } from '../pages/InventoryPage.ts';
import { test, expect} from '../fixtures/authFixture.ts';


test.describe('Inventory page tests', () => { 
  
  test('Check UI of product cell', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);

    await inventoryPage.assertOnInventoryPage();
    await inventoryPage.verifyAllProductsHaveRequiredElements();
    //console.log("badge count is " + inventoryPage.getCartBadgeCount());
  
  });
  
  test('Add product to cart', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
  
    await inventoryPage.assertOnInventoryPage();

    const initialCount = await inventoryPage.getCartBadgeCount();
    console.log('🟢 Initial cart badge count:', initialCount);
    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');

    const afterAddCount = await inventoryPage.getCartBadgeCount();
    console.log('🟡 Cart badge count after adding:', afterAddCount);

    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
    await inventoryPage.resetAppState();
  
  });

  // test('Remove product from cart', async ({ loggedInPage }) => {
  //   const inventoryPage = new InventoryPage(loggedInPage);
  //   await inventoryPage.assertOnInventoryPage();

  //   await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
  //   await inventoryPage.removeProductFromCartByName('Sauce Labs Backpack');

  //   const cartBadge = loggedInPage.locator('.shopping_cart_badge');
  //   await expect(cartBadge).not.toBeVisible();
  // });


});
import { InventoryPage } from '../pages/InventoryPage.ts';
import { test, expect} from '../fixtures/authFixture.ts';


test.describe('Inventory page tests', () => { 
  
  test('Check UI of product cell', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);

    await inventoryPage.assertOnInventoryPage();
    await inventoryPage.verifyAllProductsHaveRequiredElements();
  
  });
  
  test('Add product to cart', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    
    await inventoryPage.assertOnInventoryPage();
    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');

    // Verify the cart badge shows "1"
    //const cartBadge = loggedInPage.locator('.shopping_cart_badge');
    //await expect(cartBadge).toHaveText('1');
  
  });


});
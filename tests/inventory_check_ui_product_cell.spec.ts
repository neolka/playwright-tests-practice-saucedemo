import { InventoryPage } from '../pages/InventoryPage.ts';
import { test, expect} from '../fixtures/authFixture.ts';

test('Check UI of product cell', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);

  await inventoryPage.assertOnInventoryPage();
  await inventoryPage.verifyAllProductsHaveRequiredElements();
  
  });
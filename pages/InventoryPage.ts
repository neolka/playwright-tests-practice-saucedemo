import { Page, expect, Locator } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  products: Locator = this.page.locator('.inventory_item');

  async assertOnInventoryPage() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.page.locator('.inventory_list')).toBeVisible();
  }

  productAt(index: number) {
    return this.products.nth(index);
  }

  async verifyProductElements(product: Locator, index: number) {
    const elements = {
      image: product.locator('.inventory_item_img img'),
      title: product.locator('.inventory_item_name'),
      description: product.locator('.inventory_item_desc'),
      price: product.locator('.inventory_item_price'),
      button: product.locator('button.btn_inventory'),
    };

    for (const [key, locator] of Object.entries(elements)) {
      await expect(locator, `Product ${index + 1} missing ${key}`).toBeVisible();
    }
  }

  async verifyAllProductsHaveRequiredElements() {
    const productCount = await this.products.count();
    expect(productCount).toBeGreaterThan(0);

    for (let i = 0; i < productCount; i++) {
      const product = this.productAt(i);
      await this.verifyProductElements(product, i);
    }
  }

  async openBurgerMenu() {
    await expect(this.page.locator('#react-burger-menu-btn')).toBeVisible();
    await this.page.click('#react-burger-menu-btn');
  }

  async addProductToCartByName(productName: string) {
    const product = this.page.locator('.inventory_item').filter({
    has: this.page.locator('.inventory_item_name', { hasText: productName })
    });
    const addButton = product.locator('button.btn_inventory');

    await expect(addButton).toBeVisible();
    await addButton.click();

    await expect(addButton).toHaveText('Remove');
  }

  async removeProductFromCartByName(productName: string) {
    const product = this.page.locator('.inventory_item').filter({
    has: this.page.locator('.inventory_item_name', { hasText: productName })
    });
    const removeButton = product.locator('button.btn_inventory');

    await expect(removeButton).toHaveText('Remove');
    await removeButton.click();

    await expect(removeButton).toHaveText('Add to cart');
  }

  async getCartBadgeCount() {
    const badge = this.page.locator('.shopping_cart_badge');
    if (await badge.isVisible()) {
      return parseInt(await badge.innerText(), 10);
    }
    return 0;
  }

  async resetAppState() {
  await this.page.locator('#react-burger-menu-btn').click();
  await this.page.locator('#reset_sidebar_link').click();
  await this.page.locator('#react-burger-cross-btn').click();
}

  async logout() {
    await this.page.click('#react-burger-menu-btn');
    await this.page.click('#logout_sidebar_link');
  }
}
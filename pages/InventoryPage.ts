import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async assertOnInventoryPage() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.page.locator('.inventory_list')).toBeVisible();
  }

  async openBurgerMenu() {
    await expect(this.page.locator('#react-burger-menu-btn')).toBeVisible();
    await this.page.click('#react-burger-menu-btn');
  }

  async addToCart(productName: string) {
    await this.page.click(`text=${productName} >> xpath=../..//button`);
  }

  async removeFromCart(productName: string) {
    await this.page.click(`text=${productName} >> xpath=../..//button[contains(., 'Remove')]`);
  }

  async getCartBadgeCount() {
    const badge = this.page.locator('.shopping_cart_badge');
    if (await badge.isVisible()) {
      return parseInt(await badge.innerText(), 10);
    }
    return 0;
  }

  async logout() {
    await this.page.click('#react-burger-menu-btn');
    await this.page.click('#logout_sidebar_link');
  }
}
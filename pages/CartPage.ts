import { Page, Locator, expect } from '@playwright/test';

/**
 * CartPage
 * Represents the shopping cart page.
 */
export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async gotoCart() {
    await this.page.goto('/cart.html');
  }

  async expectItemInCart(itemName: string) {
    await expect(this.page.locator('.cart_item').filter({ hasText: itemName })).toBeVisible();
  }

  async expectItemNotInCart(itemName: string) {
    await expect(this.page.locator('.cart_item').filter({ hasText: itemName })).not.toBeVisible();
  }

  async expectCartItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

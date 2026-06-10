import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../pages/HeaderPage';

/**
 * Regression Tests — Header Navigation
 * Runs on every push to main and pull request.
 * Validates burger menu, logout and navigation flows.
 */
test.describe('Header Navigation', () => {
  let headerPage: HeaderPage;

  test.beforeEach(async ({ page }) => {
    headerPage = new HeaderPage(page);
    await page.goto('/inventory.html');
  });

  test('burger menu opens successfully', async ({ page }) => {
    await headerPage.openMenu();
    await expect(page.locator('.bm-menu-wrap')).toBeVisible();
  });

  test('burger menu closes successfully', async ({ page }) => {
    await headerPage.openMenu();
    await headerPage.closeMenuBtn();
    await expect(page.locator('.bm-menu-wrap')).not.toBeVisible();
  });

  test('logout redirects to login page', async ({ page }) => {
    await headerPage.logout();
    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('reset app state clears the cart', async ({ page }) => {
    // Add item first
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Reset app state
    await headerPage.resetApp();
    await headerPage.closeMenuBtn();

    // Cart should be empty
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('all items link navigates to inventory', async ({ page }) => {
    await headerPage.goToAllItems();
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });
});
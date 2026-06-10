import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { products } from '../../fixtures/testData';

/**
 * Inventory Tests
 * Uses saved storageState so no login needed — tests start directly on the product page.
 */
test.describe('Inventory', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
  });

  test('inventory page displays products', async ({ page }) => {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('adding item updates cart badge', async () => {
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.expectCartCount(1);
  });

  test('adding multiple items updates cart badge correctly', async () => {
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.addItemToCart(products.bikeLight);
    await inventoryPage.expectCartCount(2);
  });

  test('removing item decrements cart badge', async () => {
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.addItemToCart(products.bikeLight);
    await inventoryPage.removeItemFromCart(products.backpack);
    await inventoryPage.expectCartCount(1);
  });

  test('sort by price low to high is correct', async () => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getItemPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('sort by price high to low is correct', async () => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getItemPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('sort by name A-Z is correct', async () => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getItemNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });
});

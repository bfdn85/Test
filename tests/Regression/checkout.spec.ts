import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { products, checkoutInfo } from '../../fixtures/testData';

/**
 * Checkout E2E Tests
 * Full happy path + edge cases for the complete purchase flow.
 * This mirrors the kind of critical user journey testing PublicInput
 * would care about — e.g. a resident completing a public survey submission.
 */
test.describe('Checkout Flow', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await inventoryPage.goto();
  });

  test('happy path: add item, checkout, confirm order', async ({ page }) => {
    // Add items to cart
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.addItemToCart(products.fleeceJacket);
    await inventoryPage.expectCartCount(2);

    // Go to cart and verify
    await inventoryPage.cartIcon.click();
    await cartPage.expectItemInCart(products.backpack);
    await cartPage.expectItemInCart(products.fleeceJacket);
    await cartPage.expectCartItemCount(2);

    // Checkout step 1: shipping info
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);

    await checkoutPage.fillShippingInfo(
      checkoutInfo.valid.firstName,
      checkoutInfo.valid.lastName,
      checkoutInfo.valid.postalCode
    );

    // Checkout step 2: order summary
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.locator('.cart_item')).toHaveCount(2);

    // Complete order
    await checkoutPage.completeOrder();
    await checkoutPage.expectOrderConfirmation();
  });

  test('checkout fails when first name is missing', async ({ page }) => {
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.cartIcon.click();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillShippingInfo(
      checkoutInfo.missingFirstName.firstName,
      checkoutInfo.missingFirstName.lastName,
      checkoutInfo.missingFirstName.postalCode
    );

    await checkoutPage.expectErrorMessage('First Name is required');
  });

  test('cart persists items when navigating away and back', async ({ page }) => {
    await inventoryPage.addItemToCart(products.backpack);

    // Navigate away
    await page.goto('/');
    await inventoryPage.goto();

    // Cart should still show 1 item
    await inventoryPage.expectCartCount(1);
  });

  test('removing item in cart updates cart correctly', async () => {
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.addItemToCart(products.bikeLight);
    await inventoryPage.cartIcon.click();

    await cartPage.expectCartItemCount(2);

    // Remove one item
    const removeButton = cartPage.page.locator('[data-test="remove-sauce-labs-backpack"]');
    await removeButton.click();

    await cartPage.expectCartItemCount(1);
    await cartPage.expectItemNotInCart(products.backpack);
    await cartPage.expectItemInCart(products.bikeLight);
  });
});

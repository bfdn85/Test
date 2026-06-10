import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../../fixtures/testData';

/**
 * Login Tests
 * These run WITHOUT storageState (fresh browser context) because
 * we specifically want to test the login flow itself.
 */
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('standard user can log in successfully', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('locked out user sees error message', async () => {
    await loginPage.login(users.locked.username, users.locked.password);
    await loginPage.expectErrorMessage('Sorry, this user has been locked out');
  });

  test('wrong password shows error', async () => {
    await loginPage.login(users.standard.username, 'wrong_password');
    await loginPage.expectErrorMessage('Username and password do not match');
  });

  test('empty username shows validation error', async () => {
    await loginPage.login('', users.standard.password);
    await loginPage.expectErrorMessage('Username is required');
  });

  test('empty password shows validation error', async () => {
    await loginPage.login(users.standard.username, '');
    await loginPage.expectErrorMessage('Password is required');
  });
});

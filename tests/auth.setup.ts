import { test as setup, expect } from '@playwright/test';
import * as path from 'path';

const authFile = path.join(__dirname, '../auth/storageState.json');

/**
 * Auth Setup
 * Runs once before all tests. Logs in and saves session to storageState.json
 * so individual tests don't need to re-authenticate each time.
 */
setup('authenticate', async ({ page }) => {
  await page.goto('/');

  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Verify login succeeded before saving state
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  // Save signed-in state for all subsequent tests
  await page.context().storageState({ path: authFile });
});

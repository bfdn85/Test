import { Page, Locator, expect } from '@playwright/test';

/**
 * HeaderPage
 * Encapsulates all interactions with the navigation menu.
 */
export class HeaderPage {
  readonly page: Page;
  readonly burgerMenu: Locator;
  readonly logoutLink: Locator;
  readonly resetAppState: Locator;
  readonly allItemsLink: Locator;
  readonly closeMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetAppState = page.locator('#reset_sidebar_link');
    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.closeMenu = page.locator('#react-burger-cross-btn');
  }

  async openMenu() {
    await this.burgerMenu.click();
  }

  async closeMenuBtn() {
    await this.closeMenu.click();
  }

  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }

  async resetApp() {
    await this.burgerMenu.click();
    await this.resetAppState.click();
  }

  async goToAllItems() {
    await this.burgerMenu.click();
    await this.allItemsLink.click();
  }
}
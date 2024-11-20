import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly alertError: Locator;
  readonly alertSuccess: Locator;
  readonly logoHeader: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertError = this.page.locator('.alert-error');
    this.alertSuccess = this.page.locator('.alert-success');
    this.logoHeader = this.page.locator('.text-xl');
    this.logoutButton = this.page.locator('.btn-neutral');
  }

  async isLogoDisplayed() {
    return await this.logoHeader.isVisible();
  }

  async clickLogout() {
    await this.logoutButton.click();
  }

  async isErrorAlertDisplayed() {
    return await this.alertError.isVisible();
  }

  async isSuccessAlertDisplayed() {
    return await this.alertSuccess.isVisible();
  }

  async getAlertText() {
    return await this.page.locator('.alert').innerText();
  }
}

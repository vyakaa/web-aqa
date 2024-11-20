import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly _alertError: Locator;
  readonly _alertSuccess: Locator;
  readonly _logoHeader: Locator;
  readonly _logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this._alertError = this.page.locator('.alert-error');
    this._alertSuccess = this.page.locator('.alert-success');
    this._logoHeader = this.page.locator('.text-xl');
    this._logoutButton = this.page.locator('.btn-neutral');
  }

  async isLogoDisplayed() {
    return await this._logoHeader.isVisible();
  }

  async clickLogout() {
    await this._logoutButton.click();
  }

  async isErrorAlertDisplayed() {
    return await this._alertError.isVisible();
  }

  async isSuccessAlertDisplayed() {
    return await this._alertSuccess.isVisible();
  }

  async getAlertText() {
    return await this.page.locator('.alert').innerText();
  }
}

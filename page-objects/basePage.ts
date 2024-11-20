import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly _alert: Locator;
  readonly _logoHeader: Locator;
  readonly _logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this._alert = this.page.locator('.alert');
    this._logoHeader = this.page.locator('.text-xl');
    this._logoutButton = this.page.locator('.btn-neutral');
  }

  async isLogoDisplayed() {
    return await this._logoHeader.isVisible();
  }

  async clickLogout() {
    await this._logoutButton.click();
  }

  async isAlertDisplayed() {
    return await this._alert.isVisible();
  }

  async getAlertText() {
    return await this._alert.innerText();
  }
}

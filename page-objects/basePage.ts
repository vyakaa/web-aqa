import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly _logoutButton: Locator;
  readonly _logoHeader: Locator;
  readonly _spinner: Locator;

  constructor(page: Page) {
    this.page = page;
    this._logoutButton = this.page.locator('.btn-neutral');
    this._logoHeader = this.page.locator('.text-xl');
    this._spinner = this.page.locator('');
  }

  async isLogoDisplayed() {
    return await this._logoHeader.isVisible();
  }

  async clickLogout() {
    await this._logoutButton.click();
  }

  async clickOutsideBanner() {
    await this.page.mouse.click(200, 200);
  }

  async countInvalidFields() {
    return await this.page.locator('input[aria-invalid="true"]').count();
  }

  async waitForProgressBarNotPresent() {
    await this.page.waitForSelector('[role="progressbar"]', {
      state: 'detached',
    });
  }
}

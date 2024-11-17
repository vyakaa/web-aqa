import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly _logoutButton: Locator;
  readonly _svgLogoHeader: Locator;
  readonly _spinner: Locator;

  constructor(page: Page) {
    this.page = page;
    this._logoutButton = page.locator('button[aria-label="back"]');
    this._svgLogoHeader = page.locator('img[alt="COCO"]');
    this._spinner = page.locator('');
  }

  async isSvgHeaderLogoDisplayed() {
    return await this._svgLogoHeader.isVisible();
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

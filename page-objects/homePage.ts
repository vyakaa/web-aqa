import { Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  readonly _welcomeMessage: Locator = this.page.locator('div.MuiPaper-root p');
  readonly _systemAlert: Locator = this.page.locator(
    'div.MuiCollapse-wrapperInner'
  );

  async open() {
    await this.page.goto('', { waitUntil: 'networkidle' });
  }

  async getBannerText() {
    return (await this._systemAlert.innerText()).toUpperCase();
  }

  async getWelcomeMessage() {
    return await this._welcomeMessage.innerText();
  }
}

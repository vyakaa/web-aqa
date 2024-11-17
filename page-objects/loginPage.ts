import { Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  readonly _emailInput: Locator = this.page.getByTestId('phone-number-field');
  readonly _passwordInput: Locator =
    this.page.getByTestId('phone-number-field');
  readonly _submitButton: Locator = this.page.getByTestId('confirm-btn');
  readonly _systemAlert: Locator = this.page.locator('#notistack-snackbar');

  // async open() {
  //   await this.page.goto();
  // }

  async enterEmail(email: string) {
    await this._emailInput.fill(email);
  }

  async enterPassword(password: string) {
    await this._passwordInput.fill(password);
  }

  async clickSubmitButton() {
    await this._submitButton.click();
    await this.waitForLinkIsSentMessage();
  }

  async getBannerText() {
    return await this._systemAlert.innerText();
  }

  async waitForLinkIsSentMessage() {
    await this.page.waitForSelector('#notistack-snackbar', {
      state: 'visible',
    });
  }
}

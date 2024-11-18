import { Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  readonly _emailInput: Locator = this.page.locator('input[name="email"]');
  readonly _passwordInput: Locator = this.page.locator(
    'input[name="password"]'
  );
  readonly _submitButton: Locator = this.page.locator('button[type="submit"]');
  readonly _alert: Locator = this.page.locator('.alert');

  async open() {
    await this.page.goto('http://localhost:3000/');
  }

  async enterEmail(email: string) {
    await this._emailInput.fill(email);
  }

  async enterPassword(password: string) {
    await this._passwordInput.fill(password);
  }

  async clickSubmitButton() {
    await this._submitButton.click();
  }

  async loginWithCredentials(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSubmitButton();
  }

  async isAlertEnabled() {
    return await this._alert.isVisible();
  }

  async getAlertText() {
    return await this._alert.innerText();
  }
}

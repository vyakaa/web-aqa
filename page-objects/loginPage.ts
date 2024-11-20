import { Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator = this.page.locator('input[name="email"]');
  readonly passwordInput: Locator = this.page.locator('input[name="password"]');
  readonly submitButton: Locator = this.page.locator('button[type="submit"]');

  async open() {
    await this.page.goto('', { waitUntil: 'networkidle' });
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async loginWithCredentials(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSubmitButton();
  }
}

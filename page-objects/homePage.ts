import { Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  readonly welcomeMessage: Locator = this.page.locator('.text-center');
  readonly goToConvertPdfButton: Locator = this.page.locator('a[href="/convert"]');

  async open() {
    await this.page.goto('', { waitUntil: 'networkidle' });
  }

  async getWelcomeMessage() {
    return await this.welcomeMessage.innerText();
  }

  async goToConvertPdf() {
    await this.goToConvertPdfButton.click();
  }
}

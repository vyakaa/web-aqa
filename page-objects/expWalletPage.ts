import { Locator } from '@playwright/test';
import { getExpAppUrl as getExpAppBaseUrl } from '../../fixtures/methods';
import { ExperienceBasePage } from './basePage';

export class WalletPage extends ExperienceBasePage {
  readonly _walletPageContent: Locator = this.page.locator('div.css-zw236w');
  readonly _addCreditOrDebitCardButton: Locator = this.page
    .locator('button.MuiButtonBase-root')
    .last();
  readonly _systemAlert: Locator = this.page.locator('#notistack-snackbar');

  // Add Card banner
  readonly _addCardContent: Locator = this.page.locator(
    'div.MuiContainer-root'
  );
  readonly _cardNumberInput: Locator = this.page.locator(
    'input[name="cardNumber"]'
  );
  readonly _expirationDate: Locator = this.page.locator(
    'input[name="expirationDate"]'
  );
  readonly _cvvCode: Locator = this.page.locator('input[name="cvv"]');
  readonly _cardholderName: Locator = this.page.locator(
    'input[name="cardholderName"]'
  );
  readonly _zipCode: Locator = this.page.locator('input[name="billingZip"]');
  readonly _submitButton: Locator = this.page.locator('button[type="submit"]');

  async open() {
    await this.page.goto(getExpAppBaseUrl() + '/profile/wallet', {
      waitUntil: 'networkidle',
    });
  }

  async clickAddCreditOrDebitCard() {
    await this._addCreditOrDebitCardButton.click();
  }

  async clickSubmit() {
    await this._submitButton.click();
  }

  async fillCardNumberInput(cardNumber: string) {
    await this._cardNumberInput.fill(cardNumber);
  }

  async fillExpirationDate(expirationDate: string) {
    await this._expirationDate.fill(expirationDate);
  }

  async fillCvvCode(cvvCode: string) {
    await this._cvvCode.fill(cvvCode);
  }

  async fillCardholderName(cardholderName: string) {
    await this._cardholderName.fill(cardholderName);
  }

  async fillZipCode(zipCode: string) {
    await this._zipCode.fill(zipCode);
  }

  async fillInCreditCard() {
    await this.fillCardNumberInput('4111 1102 0000 0219');
    await this.fillExpirationDate('12/25');
    await this.fillCvvCode('444');
    await this.fillCardholderName('Test Member');
    await this.fillZipCode('00008');
  }

  async getWalletPageContent() {
    return (await this._walletPageContent.innerText()).toUpperCase();
  }

  async getAddCardContent() {
    return (await this._addCardContent.innerText()).toUpperCase();
  }

  async getCreditCardLogoClass() {
    return await this._cardNumberInput.getAttribute('class');
  }

  async getBannerText() {
    return (await this._systemAlert.innerText()).toUpperCase();
  }
}

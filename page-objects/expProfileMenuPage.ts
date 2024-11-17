import { Locator } from '@playwright/test';
import { getExpAppUrl as getExpAppBaseUrl } from '../../fixtures/methods';
import { ExperienceBasePage } from './basePage';

export class ProfileMenuPage extends ExperienceBasePage {
  readonly _profileMenuContent: Locator = this.page.locator('div.css-1li79mo');
  readonly _yourInformationSection: Locator = this.page
    .locator('button.MuiButtonBase-root')
    .nth(1);
  readonly _productInterestsLink: Locator = this.page
    .locator('a.MuiButtonBase-root')
    .nth(0);
  readonly _receiptsLink: Locator = this.page
    .locator('a.MuiButtonBase-root')
    .nth(1);
  readonly _walletLink: Locator = this.page
    .locator('a.MuiButtonBase-root')
    .nth(2);
  readonly _privacyPolicyLink: Locator = this.page
    .locator('a.MuiButtonBase-root')
    .nth(3);
  readonly _termsAndConditionsLink: Locator = this.page
    .locator('a.MuiButtonBase-root')
    .nth(4);
  readonly _supportAndFeedbackLink: Locator = this.page
    .locator('button.MuiButtonBase-root')
    .nth(2);
  readonly _deleteAccountLink: Locator = this.page.locator('a', {
    hasText: 'Delete Account',
  });
  readonly _signOutButton: Locator = this.page
    .locator('button.MuiButtonBase-root')
    .last();
  readonly _systemAlert: Locator = this.page.locator('div.css-ejcdc5');
  readonly _appVersion: Locator = this.page
    .locator('p.MuiTypography-root')
    .last();

  // Complete profile
  readonly _completeProfileAlert: Locator = this.page.locator(
    'div.MuiContainer-root'
  );

  async open() {
    await this.page.goto(getExpAppBaseUrl() + '/profile', {
      waitUntil: 'networkidle',
    });
  }

  async clickYourInformation() {
    await this._yourInformationSection.click();
  }

  async clickProductInterests() {
    await this._productInterestsLink.click();
  }

  async clickReceipts() {
    await this._receiptsLink.click();
  }

  async clickWallet() {
    await this._walletLink.click();
  }

  async clickTermsAndConditionsLink() {
    await this._termsAndConditionsLink.click();
  }

  async clickPrivacyPolicyLink() {
    await this._privacyPolicyLink.click();
  }

  async clickSupportAndFeedbackLink() {
    await this._supportAndFeedbackLink.click();
  }

  async clickDeleteAccount() {
    await this._deleteAccountLink.click();
  }

  async clickSignOut() {
    await this._signOutButton.click();
  }

  async getBannerText() {
    return (await this._systemAlert.innerText()).toUpperCase();
  }

  async getCompleteProfileText() {
    return (await this._completeProfileAlert.innerText()).toUpperCase();
  }

  async getProfileMenuContent() {
    return (await this._profileMenuContent.innerText()).toUpperCase();
  }

  async getAppVersion() {
    return await this._appVersion.innerText();
  }
}

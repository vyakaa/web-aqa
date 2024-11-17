import { Locator } from '@playwright/test';
import { getExpAppUrl as getExpAppBaseUrl } from '../../fixtures/methods';
import { ExperienceBasePage } from './basePage';

export class ReceiptsPage extends ExperienceBasePage {
  readonly _mobilePaymentsTab: Locator = this.page
    .locator('button.MuiButtonBase-root')
    .nth(1);
  readonly _loyaltyTransactionsTab: Locator = this.page
    .locator('button.MuiButtonBase-root')
    .nth(2);
  readonly _tabIndicator: Locator = this.page.locator('span.MuiTabs-indicator');
  readonly _receiptsList: Locator = this.page.locator(
    '#transaction-history-tabpanel-mobile'
  );
  readonly _loyaltyTransactionsList: Locator = this.page.locator(
    '#transaction-history-tabpanel-loyalty'
  );

  async open() {
    await this.page.goto(getExpAppBaseUrl() + '/transactions');
  }

  async isMobilePaymentsTabActive() {
    return (await this._tabIndicator.getAttribute('style'))?.startsWith(
      'left: 0px;'
    );
  }

  async isLoyaltyTransactionsTabActive() {
    return !(await this._tabIndicator.getAttribute('style'))?.startsWith(
      'left: 0px;'
    );
  }

  async getReceipts() {
    return (await this._receiptsList.locator('h5').innerText()).toUpperCase();
  }
}

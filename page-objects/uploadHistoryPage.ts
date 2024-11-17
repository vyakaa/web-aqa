// import { Locator } from '@playwright/test';
// import { getExpAppUrl as getExpAppBaseUrl } from '../../fixtures/methods';
// import { BasePage } from './basePage';

// export class ConvertPage extends BasePage {
//   readonly _tabIndicator: Locator = this.page.locator('span.MuiTabs-indicator');

//   async open() {
//     await this.page.goto(getExpAppBaseUrl() + '/convert');
//   }

//   async isMobilePaymentsTabActive() {
//     return (await this._tabIndicator.getAttribute('style'))?.startsWith(
//       'left: 0px;'
//     );
//   }

//   async isLoyaltyTransactionsTabActive() {
//     return !(await this._tabIndicator.getAttribute('style'))?.startsWith(
//       'left: 0px;'
//     );
//   }
// }

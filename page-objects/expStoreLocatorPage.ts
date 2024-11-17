import { Locator } from '@playwright/test';
import { getExpAppUrl as getExpAppBaseUrl } from '../../fixtures/methods';
import { ExperienceBasePage } from './basePage';

export class StoreLocatorPage extends ExperienceBasePage {
  readonly _currentLocationIcon: Locator = this.page
    .locator('button.MuiFab-root')
    .first();
  readonly _locationsListIcon: Locator = this.page
    .locator('button.MuiFab-root')
    .last();
  readonly _searchField: Locator = this.page.locator('input[type="search"]');
  readonly _storeLocatorContent: Locator = this.page
    .locator('div.MuiBox-root')
    .nth(2);
  readonly _systemAlert: Locator = this.page.locator(
    'div.MuiCollapse-wrapperInner'
  );

  async open() {
    await this.page.goto(getExpAppBaseUrl() + '/store-locator');
  }

  async clickCurrentLocation() {
    await this._currentLocationIcon.click();
  }

  async clickLocationsList() {
    await this._locationsListIcon.click();
  }

  async isCurrentLocationButtonDisplayed() {
    return await this._locationsListIcon.isVisible();
  }

  async isLocationsListButtonDisplayed() {
    return await this._locationsListIcon.isVisible();
  }

  async isSearchFieldDisplayed() {
    return await this._searchField.isVisible();
  }

  async getBannerText() {
    return (await this._systemAlert.innerText()).toUpperCase();
  }

  async getStoreLocatorContent() {
    return (await this._storeLocatorContent.innerText()).toUpperCase();
  }
}

import { Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class HistoryPage extends BasePage {
  readonly _spinner: Locator = this.page.locator('');
  readonly _backToConvertButton: Locator =
    this.page.locator('a[href="/convert"]');
  readonly _clearAllEntriesButton: Locator = this.page.locator('.btn-sm');
  readonly _clearHoveredEntryButton: Locator = this.page.locator('.w-80');

  async open() {
    await this.page.goto('/history', { waitUntil: 'networkidle' });
  }

  async goBackToConvert() {
    await this._backToConvertButton.click();
  }

  async clearAllEntries() {
    await this._clearAllEntriesButton.click();
  }

  async clearFirstHoveredEntry() {
    await this._clearHoveredEntryButton.hover();
    await this._clearHoveredEntryButton.click();
  }

  async getEntries() {
    const elements = this.page.locator('.w-80');
    const entries = await elements.allInnerTexts();

    return { count: (await elements).count(), entries: entries };
  }
}

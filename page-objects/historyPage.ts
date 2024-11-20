import { Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class HistoryPage extends BasePage {
  readonly _backToConvertButton: Locator = this.page.locator('a[href="/convert"]');
  readonly _clearAllEntriesButton: Locator = this.page.locator('.btn-sm');
  readonly _entryRows: Locator = this.page.locator('.w-80');
  readonly _clearHoveredEntryButton: Locator = this.page.locator('.hidden').nth(0);

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
    await this._entryRows.nth(0).hover();
    await this._clearHoveredEntryButton.click();
  }

  async getHistoryEntries() {
    const firstEntry = {
      status: (await this._entryRows.nth(0).locator('div').nth(0).innerText()).split('\n\n')[0],
      date: (await this._entryRows.nth(0).locator('div').nth(0).innerText()).split('\n\n')[1],
      fileName: await this.page.locator('.text-base').nth(0).innerText(),
      fileSize: await this.page.locator('.text-xs').nth(0).innerText(),
    };

    const secondEntry = {
      status: (await this._entryRows.nth(1).locator('div').nth(0).innerText()).split('\n\n')[0],
      date: (await this._entryRows.nth(1).locator('div').nth(0).innerText()).split('\n\n')[1],
      fileName: await this.page.locator('.text-base').nth(1).innerText(),
      fileSize: await this.page.locator('.text-xs').nth(1).innerText(),
    };

    return { firstEntry: firstEntry, secondEntry: secondEntry };
  }

  async getEntriesCount() {
    return await this._entryRows.count();
  }
}

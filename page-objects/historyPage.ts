import { Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class HistoryPage extends BasePage {
  readonly backToConvertButton: Locator = this.page.locator('a[href="/convert"]');
  readonly clearAllEntriesButton: Locator = this.page.locator('.btn-sm');
  readonly entryRows: Locator = this.page.locator('.w-80');
  readonly clearHoveredEntryButton: Locator = this.page.locator('.hidden').nth(0);

  async open() {
    await this.page.goto('/history', { waitUntil: 'networkidle' });
  }

  async goBackToConvert() {
    await this.backToConvertButton.click();
  }

  async clearAllEntries() {
    await this.clearAllEntriesButton.click();
  }

  async clearFirstHoveredEntry() {
    await this.entryRows.nth(0).hover();
    await this.clearHoveredEntryButton.click();
  }

  async getHistoryEntries() {
    const firstEntry = {
      status: (await this.entryRows.nth(0).locator('div').nth(0).innerText()).split('\n\n')[0],
      date: (await this.entryRows.nth(0).locator('div').nth(0).innerText()).split('\n\n')[1],
      fileName: await this.page.locator('.text-base').nth(0).innerText(),
      fileSize: await this.page.locator('.text-xs').nth(0).innerText(),
    };

    const secondEntry = {
      status: (await this.entryRows.nth(1).locator('div').nth(0).innerText()).split('\n\n')[0],
      date: (await this.entryRows.nth(1).locator('div').nth(0).innerText()).split('\n\n')[1],
      fileName: await this.page.locator('.text-base').nth(1).innerText(),
      fileSize: await this.page.locator('.text-xs').nth(1).innerText(),
    };

    return { firstEntry: firstEntry, secondEntry: secondEntry };
  }

  async getEntriesCount() {
    return await this.entryRows.count();
  }
}

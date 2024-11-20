import { Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { readFileSync } from 'fs';
import fs from 'fs';

export class ConvertPage extends BasePage {
  readonly _uploadFileButton: Locator = this.page.locator('input[type="file"]');
  readonly _convertFileButton: Locator = this.page.locator('button[type="submit"]');
  readonly _deleteFileButton: Locator = this.page.locator('.btn-square');
  readonly _goToUploadHistoryButton: Locator = this.page.locator('.link');
  readonly _downloadConvertedFileButton: Locator = this.page.locator('.card-actions > a');

  async open() {
    await this.page.goto('/convert', { waitUntil: 'networkidle' });
  }

  async uploadFile(name: string) {
    const buffer = readFileSync(`./test-files/${name}`);
    const arg = { fileName: name, buffer: buffer };
    const dataTransfer = await this.page.evaluateHandle((arg) => {
      const dt = new DataTransfer();
      const file = new File([arg.buffer.toString('hex')], `${arg.fileName}`, {
        type: `application/${arg.fileName.split('.')[1]}`,
      });
      dt.items.add(file);
      return dt;
    }, arg);

    await this.page.dispatchEvent('input[type="file"]', 'drop', {
      dataTransfer,
    });
  }

  async deleteUploadedFile() {
    await this._deleteFileButton.click();
  }

  async clickConvert() {
    await this._convertFileButton.click();
  }

  async uploadAndConvertFile(name: string) {
    await this.uploadFile(name);
    await this.clickConvert();
    await this.waitForProgressBarToDisappear();
  }

  async getUploadedFileDetails() {
    return {
      name: `${await this.page.locator('.card-title').innerText()}`,
      type: `${await this.page.locator('.card-body > p').nth(0).innerText()}`,
      size: `${await this.page.locator('.card-body > p').nth(1).innerText()}`,
    };
  }

  async goToUploadHistory() {
    await this._goToUploadHistoryButton.click();
  }

  async getUploadHistoryText() {
    return await this._goToUploadHistoryButton.innerText();
  }

  async getUploadHistoryFilesCount() {
    const filesCount = (await this.getUploadHistoryText()).split(' ').at(-1);
    return Number.parseInt(String(filesCount));
  }

  async isDownloadConvertedFileAvailable() {
    return await this._downloadConvertedFileButton.isVisible();
  }

  async getDownloadConvertedFileLink() {
    return await this._downloadConvertedFileButton.getAttribute('href');
  }

  async downloadConvertedFile() {
    if (!(await this.isDownloadConvertedFileAvailable())) return;

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this._downloadConvertedFileButton.click(),
    ]);

    const path = './test-files/' + download.suggestedFilename();
    await download.saveAs(path);

    const details = {
      name: download.suggestedFilename(),
      size: (await fs.promises.stat(path)).size,
    };
    return details;
  }

  async deleteConvertedFile() {
    await this._deleteFileButton.click();
  }

  async waitForProgressBarToDisappear() {
    await this.page.waitForSelector('.progress', { state: 'hidden' });
  }
}

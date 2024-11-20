import { Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { readFileSync } from 'fs';

export class ConvertPage extends BasePage {
  readonly _uploadFileButton: Locator = this.page
    .locator('div')
    .filter({ hasText: "Drag 'n' drop PDF files here," });
  readonly _convertFileButton: Locator = this.page.getByRole('button', {
    name: 'Convert PDF file',
  });
  readonly _deleteUploadedFileButton: Locator = this.page
    .getByRole('button')
    .nth(1);
  readonly _goToUploadHistoryButton: Locator = this.page.getByRole('link', {
    name: 'Go to upload history, files',
  });

  async open() {
    await this.page.goto('/convert', { waitUntil: 'networkidle' });
  }

  async uploadFile(name: string) {
    // const fileChooserPromise = this.page.waitForEvent('filechooser');
    // await this._uploadFileButton.click();
    // const fileChooser = await fileChooserPromise;
    // await fileChooser.setFiles(`../test-files/${name}`);

    // Read your file into a buffer.
    const buffer = readFileSync(`./test-files/${name}`);

    // Create the DataTransfer and File
    const dataTransfer = await this.page.evaluateHandle((data) => {
      const dt = new DataTransfer();
      // Convert the buffer to a hex array
      const file = new File([data.toString('hex')], 'test.pdf', {
        type: 'application/pdf',
      });
      dt.items.add(file);
      return dt;
    }, buffer);

    // Now dispatch
    await this.page.dispatchEvent('input[type="file"]', 'drop', {
      dataTransfer,
    });
  }

  async deleteUploadedFile() {
    await this._deleteUploadedFileButton.click();
  }

  async clickConvert() {
    await this._convertFileButton.click();
  }

  async uploadAndConvertFile(name: string) {
    await this.uploadFile(name);
    await this.clickConvert();
    // wait for upload progress to finish
  }

  async goToUploadHistory() {
    await this._goToUploadHistoryButton.click();
  }

  async getUploadHistoryText() {
    return await this._goToUploadHistoryButton.textContent();
  }

  async downloadConvertedFile() {}

  async deleteConvertedFile() {}
}

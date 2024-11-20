import { expect, test } from '@playwright/test';
import { ConvertPage } from '../page-objects/convertPage';

let convertPage: ConvertPage;

test.beforeEach(async ({ page }) => {
  convertPage = new ConvertPage(page);
  await convertPage.open();
});

test('TC_020: should open convert page by direct url', async ({ page }) => {
  await expect(page).toHaveURL('/convert');
  expect(await convertPage.getUploadHistoryText()).toBe(
    'Go to upload history, files uploaded: 0'
  );
});

// check files uploaded counter before and after each upload and conversion

test.fail('TC_008: should upload and convert a valid pdf file', async () => {
  await convertPage.uploadAndConvertFile('test.pdf');
  // check progress bar and it's absense after loaded

  expect(await convertPage.isAlertDisplayed()).toBeFalsy();
});

test('TC_009: should display uploaded file extension and size', async () => {
  // expect(await historyPage)
});

test('TC_010: should display conversion progress', async () => {
  // expect(await historyPage)
});

test('TC_011: uploaded file should be possible to delete before conversion', async () => {
  // expect(await historyPage)
});

test('TC_012: uploaded file should be possible to delete after conversion', async () => {
  // expect(await historyPage)
});

test('TC_013: should download a converted docx file', async () => {
  // expect(await historyPage)
});

test('TC_014: should not display error messages for a valid pdf file upload', async () => {
  // expect(await historyPage)
});

test('TC_015: content in converted file should duplicate content in an uploaded file', async () => {
  // expect(await historyPage)
});

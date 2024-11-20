import { expect, test } from '@playwright/test';
import { ConvertPage } from '../page-objects/convertPage';
import fs from 'fs';

let convertPage: ConvertPage;

const VALID_PDF = 'test.pdf';
const EMPTY_PDF = 'empty.pdf';
const DOCX_FILE = 'test.docx';
const EMPTY_DOCX = 'empty.docx';
const PATH_VALID_DOCX_FILE = './test-files/test.docx';
const PATH_EMPTY_DOCX_FILE = './test-files/empty.docx';
const PATH_CONVERTED_FILE = './test-files/converted-file.docx';
const UTF8 = 'utf-8';

const FILE_CONVERTED_SUCCESSFULLY = 'File converted successfully!';
const CONVERT_IS_IN_PROGRESS = 'Real PDF Convert is in Progress! Honestly!';
const DRAG_N_DROP_PDF_FILES_HERE = "Drag 'n' drop PDF files here,";
const GO_TO_UPLOAD_HISTORY_FILES_COUNT = 'Go to upload history, files uploaded:';

test.beforeEach(async ({ page }) => {
  convertPage = new ConvertPage(page);
  await convertPage.open();
});

test('TC_020: should open convert page by direct url', async ({ page }) => {
  await page.reload();

  await expect(page).toHaveURL('/convert');
  expect(await convertPage.getUploadHistoryText()).toBe(`${GO_TO_UPLOAD_HISTORY_FILES_COUNT} 0`);
});

test.fail('TC_008, B009: should upload and convert a valid pdf file', async () => {
  await convertPage.uploadAndConvertFile(VALID_PDF);

  expect.soft(await convertPage.isSuccessAlertDisplayed()).toBeTruthy();
  expect(await convertPage.getAlertText()).toBe(FILE_CONVERTED_SUCCESSFULLY);
  expect(await convertPage.isErrorAlertDisplayed()).toBeFalsy();
  expect(await convertPage.isDownloadConvertedFileAvailable()).toBeTruthy();
  expect(await convertPage.getDownloadConvertedFileLink()).toContain(
    '/api/docs/converted-file.docx',
  );
});

test.fail('TC_009, B013: should display uploaded file extension and size', async () => {
  const expectedFileDetails = {
    name: VALID_PDF,
    type: 'application/pdf',
    size: '9820 bytes',
  };
  const filesCountBefore = await convertPage.getUploadHistoryFilesCount();
  await convertPage.uploadFile(VALID_PDF);

  const fileDetails = await convertPage.getUploadedFileDetails();
  const filesCountAfter = await convertPage.getUploadHistoryFilesCount();

  expect(fileDetails).toMatchObject(expectedFileDetails);
  expect(filesCountAfter).toEqual(filesCountBefore + 1);
});

test('TC_010: should display conversion progress', async ({ page }) => {
  await convertPage.uploadFile(VALID_PDF);
  await convertPage.clickConvert();

  await expect(page.getByText(CONVERT_IS_IN_PROGRESS)).toBeVisible();
  await convertPage.waitForProgressBarToDisappear();
});

test('TC_011: uploaded file should be possible to delete before conversion', async ({ page }) => {
  const filesCountBefore = await convertPage.getUploadHistoryFilesCount();
  await convertPage.uploadFile(VALID_PDF);

  const filesCountAfter = await convertPage.getUploadHistoryFilesCount();

  await convertPage.deleteUploadedFile();

  await expect(page.getByText(DRAG_N_DROP_PDF_FILES_HERE)).toBeVisible();
  expect(filesCountAfter).toEqual(filesCountBefore + 1);
});

test('TC_012: uploaded file should be possible to delete after conversion', async ({ page }) => {
  const filesCountBefore = await convertPage.getUploadHistoryFilesCount();
  await convertPage.uploadAndConvertFile(VALID_PDF);

  const filesCountAfter = await convertPage.getUploadHistoryFilesCount();

  await convertPage.deleteConvertedFile();

  await expect(page.getByText(DRAG_N_DROP_PDF_FILES_HERE)).toBeVisible();
  expect(filesCountAfter).toEqual(filesCountBefore + 1);
});

test('TC_014: should display error message for non-pdf file uploaded', async () => {
  const filesCountBefore = await convertPage.getUploadHistoryFilesCount();

  await convertPage.uploadAndConvertFile(DOCX_FILE);

  const filesCountAfter = await convertPage.getUploadHistoryFilesCount();

  expect(await convertPage.isErrorAlertDisplayed()).toBeTruthy();
  expect(await convertPage.getAlertText()).toEqual(expect.anything());
  expect(filesCountAfter).toEqual(filesCountBefore + 1);
});

test.describe('Download converted files', async () => {
  test.afterEach(async () => {
    fs.unlink(PATH_CONVERTED_FILE, (_) => {});
  });

  test.fail('TC_013, B005, B013: should download a converted docx file', async () => {
    await convertPage.uploadAndConvertFile(VALID_PDF);
    const expectedFileDetails = {
      name: DOCX_FILE,
      size: '9820',
    };
    const expectedFileContent = fs.readFileSync(PATH_VALID_DOCX_FILE, UTF8);

    const fileDetails = await convertPage.downloadConvertedFile();

    expect(fileDetails).toBeDefined();
    expect.soft(fileDetails).toMatchObject(expectedFileDetails);

    const actualFileContent = fs.readFileSync(PATH_CONVERTED_FILE, UTF8);
    expect(actualFileContent).toMatch(expectedFileContent);
  });

  test.fail('TC_015, B005, B013: should convert empty pdf without errors', async () => {
    await convertPage.uploadAndConvertFile(EMPTY_PDF);

    expect.soft(await convertPage.getAlertText()).toBe(FILE_CONVERTED_SUCCESSFULLY);
    expect(await convertPage.isErrorAlertDisplayed()).toBeFalsy();

    const expectedFileDetails = {
      name: EMPTY_DOCX,
      size: '847',
    };
    const expectedFileContent = fs.readFileSync(PATH_EMPTY_DOCX_FILE, UTF8);

    const fileDetails = await convertPage.downloadConvertedFile();

    expect(fileDetails).toBeDefined();
    expect.soft(fileDetails).toMatchObject(expectedFileDetails);

    const actualFileContent = fs.readFileSync(PATH_CONVERTED_FILE, UTF8);
    expect(actualFileContent).toMatch(expectedFileContent);
  });
});

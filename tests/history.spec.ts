import { expect, test } from '@playwright/test';
import { HistoryPage } from '../page-objects/historyPage';
import { ConvertPage } from '../page-objects/convertPage';

let convertPage: ConvertPage;
let historyPage: HistoryPage;

const VALID_PDF = 'test.pdf';
const EMPTY_PDF = 'empty.pdf';

test.beforeEach(async ({ page }) => {
  convertPage = new ConvertPage(page);

  await convertPage.open();
  await convertPage.uploadAndConvertFile(VALID_PDF);
  await convertPage.open();
  await convertPage.uploadAndConvertFile(EMPTY_PDF);
  await convertPage.goToUploadHistory();

  historyPage = new HistoryPage(page);
  await page.waitForURL('**/history');
  await page.waitForSelector('text="Loading history..."', { state: 'hidden' });
});

test('TC_020: should open history page by direct url', async ({ page }) => {
  await page.reload();

  await expect(page).toHaveURL('/history');
});

test.fail('TC_017, B004: history should contain records on each conversion', async () => {
  const date = new Date();
  const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  const { firstEntry, secondEntry } = await historyPage.getHistoryEntries();
  const fileNamesPattern = new RegExp(/test.pdf|empty.pdf/);

  expect(firstEntry.status).toEqual(expect.stringMatching(/☑️|✅|❌|🗑️/));
  expect(firstEntry.date).toBe(formattedDate);
  expect(firstEntry.fileName).toEqual(expect.stringMatching(fileNamesPattern));
  expect.soft(Number.parseInt(firstEntry.fileSize.split(' ')[0])).toBeGreaterThan(500);

  expect(secondEntry.status).toEqual(expect.stringMatching(/☑️|✅|❌|🗑️/));
  expect(secondEntry.date).toBe(formattedDate);
  expect(secondEntry.fileName).toEqual(expect.stringMatching(fileNamesPattern));
  expect.soft(Number.parseInt(secondEntry.fileSize.split(' ')[0])).toBeGreaterThan(500);
});

test('TC_018: history should be possible to clear', async ({ page }) => {
  await historyPage.clearAllEntries();

  expect(await historyPage.getEntriesCount()).toEqual(0);
  expect(page.getByText('- No history yet -')).toBeVisible();
});

test('TC_019: each history record should be possible to delete', async ({ page }) => {
  const filesCountBefore = await historyPage.getEntriesCount();
  await historyPage.clearFirstHoveredEntry();

  let filesCountAfter = await historyPage.getEntriesCount();
  expect(filesCountAfter).toEqual(filesCountBefore - 1);

  await historyPage.clearFirstHoveredEntry();
  filesCountAfter = await historyPage.getEntriesCount();

  if (filesCountAfter === 0) expect(page.getByText('- No history yet -')).toBeVisible();
});

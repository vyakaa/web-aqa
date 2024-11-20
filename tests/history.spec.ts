import { expect, test } from '@playwright/test';
import { HistoryPage } from '../page-objects/historyPage';
import { ConvertPage } from '../page-objects/convertPage';

let convertPage: ConvertPage;
let historyPage: HistoryPage;

test.beforeEach(async ({ page }) => {
  convertPage = new ConvertPage(page);
  historyPage = new HistoryPage(page);
  await convertPage.open();
  await convertPage.uploadAndConvertFile('test.pdf');

  // await historyPage.open();
  await convertPage.goToUploadHistory();
});

test('TC_020: should open history page by direct url', async ({ page }) => {
  await page.reload();
  await expect(page).toHaveURL('/history');
});

test('TC015: history should contain records on each conversion', async () => {
  const { count, entries } = await historyPage.getEntries();
  expect(count).toBe(2);

  for (const entry in entries) {
    expect(entry).toBe('');
  }

  // file name
  // file extension
  // file size
  // conversion status
});

test('TC016: history should be possible to clear', async () => {
  await historyPage.clearAllEntries();
  expect((await historyPage.getEntries()).count).toBe(0);
});

test('TC017: each history record should be possible to delete', async ({
  page,
}) => {
  const filesCountBefore = (await historyPage.getEntries()).count;
  await historyPage.clearFirstHoveredEntry();

  const filesCountAfter = (await historyPage.getEntries()).count;
  expect(filesCountAfter).toBeLessThan(await filesCountBefore);

  if ((await filesCountAfter) === 0)
    expect(page.getByText('- No history yet -')).toBeVisible();
});

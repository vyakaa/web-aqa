import { expect, test, Page } from '@playwright/test';
import { HomePage } from '../page-objects/homePage';
import { ConvertPage } from '../page-objects/convertPage';
import { HistoryPage } from '../page-objects/historyPage';

[
  { pageName: 'home', newPageFunc: (page: Page) => new HomePage(page) },
  { pageName: 'convert', newPageFunc: (page: Page) => new ConvertPage(page) },
  { pageName: 'history', newPageFunc: (page: Page) => new HistoryPage(page) },
].forEach(({ pageName, newPageFunc }) => {
  test.fail(
    `TC_006: should logout successfully from ${pageName} page`,
    async ({ page }) => {
      const newPage = newPageFunc(page);
      await newPage.open();
      await newPage.clickLogout();

      expect(page.url()).toBe('http://localhost:3000/');
      expect((await page.context().storageState()).cookies).toBeNull();
    }
  );
});

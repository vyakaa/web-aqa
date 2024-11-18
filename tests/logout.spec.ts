import { expect, test } from '@playwright/test';
import { HomePage } from '../page-objects/homePage';

let homePage: HomePage;

test.fail('T011: Logout from home page', async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.open();
  await homePage.clickLogout();

  await expect(page).toHaveURL('');
  expect((await page.context().storageState()).cookies).toBeNull();
});

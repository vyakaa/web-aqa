import { expect, test } from '@playwright/test';
import { HomePage } from '../page-objects/homePage';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.open();
});

test('TC_020: should open home page by direct url', async ({ page }) => {
  await page.reload();
  await expect(page).toHaveURL('');
});

test('TC_007: should display logo and logout button', async () => {
  expect(homePage._logoHeader).toBeVisible();
  expect(await homePage._logoHeader.innerText()).toBe('⌨️ LOGO 🥸');
  expect(homePage._logoutButton).toBeVisible();
});

test('TC: should display welcome message and link to converter', async () => {
  const welcomeMessage = await homePage.getWelcomeMessage();
  expect(welcomeMessage).toContain('Welcome!');
  expect(welcomeMessage).toContain('Go to Convert PDF');
});

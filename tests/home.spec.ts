import { expect, test } from '@playwright/test';
import { HomePage } from '../page-objects/homePage';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.open();
});

test('TC_020: should open home page by direct url', async ({ page }) => {
  await page.reload();

  expect(page.url()).toBe('http://localhost:3000/');
});

test('TC_007: should display logo and logout button', async () => {
  expect(homePage.logoHeader).toBeVisible();
  expect(homePage.logoutButton).toBeVisible();
  expect(await homePage.logoHeader.innerText()).toBe('⌨️ LOGO 🥸');
});

test('TC: should display welcome message and link to converter', async () => {
  const welcomeMessage = await homePage.getWelcomeMessage();

  expect(welcomeMessage).toBe('Welcome!\nGo to Convert PDF');
});

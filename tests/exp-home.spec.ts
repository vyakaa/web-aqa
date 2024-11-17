import { expect, test } from '@playwright/test';
// import { HomePage } from '../page-objects/homePage';

// let homePage: HomePage;

test.describe.parallel('Home', async () => {
  test.use({ storageState: './appState.json' });

  // test.beforeEach(async ({ page }) => {
  //   homePage = new ExperienceHomePage(page);
  //   await homePage.open();
  //   await homePage.waitForProgressBarHidden();
  // });

  test('home page baseUrl', async ({ page }) => {
    await page.goto('/convert');
    await expect(page).toHaveURL('/convert');
  });

  // test('S5819-C3532751: Checking a welcome section with a missing name @smoke', async () => {
  //   expect(await homePage.getWelcomeMessage()).toBe('Welcome!');
  // });

  // test('S5819-C3533194: Tap on Pay at Pump button if the Email is not filled in @smoke', async ({
  //   context,
  //   page,
  // }) => {
  //   await homePage.clickPayAtPumpIcon();

  //   expect(page).toHaveTitle('Home');
  //   await expect(homePage._systemAlert).toBeVisible();
  //   expect(await homePage.getBannerText()).toBe(
  //     'PLEASE PROVIDE YOUR LOCATION\n\nWE NEED ACCESS TO YOUR LOCATION SO WE CAN HELP YOU FIND YOUR NEAREST STORE.\n\nNEED HELP?'
  //   );

  //   await context.grantPermissions(['geolocation']);
  //   await context.setGeolocation({
  //     latitude: 39.956668,
  //     longitude: -75.160194,
  //   });

  //   await homePage.clickOutsideBanner();
  //   await homePage.clickPayAtPumpIcon();

  //   await page.waitForTimeout(2000);

  //   expect(page).toHaveTitle('Home');
  //   await expect(homePage._systemAlert).toBeVisible();
  //   expect(await homePage.getBannerText()).toBe(
  //     'ADD YOUR EMAIL TO CONTINUE\n\nAN EMAIL IS REQUIRED TO USE MOBILE PAYMENTS.\n\nEMAIL\nEMAIL\nBY ENTERING YOUR EMAIL ADDRESS, YOU AGREE TO RECEIVE OCCASIONAL PROMOTIONAL EMAILS\nSAVE\n\nNEED HELP?'
  //   );
  // });

  // test('S5819-C3533195: Tap on Pay Inside button if the Email is not filled in @smoke', async ({
  //   page,
  // }) => {
  //   await homePage.clickPayInsideIcon();

  //   await page.waitForTimeout(1000);

  //   expect(page).toHaveTitle('Home');
  //   await expect(homePage._systemAlert).toBeVisible();
  //   expect(await homePage.getBannerText()).toBe(
  //     'ADD YOUR EMAIL TO CONTINUE\n\nAN EMAIL IS REQUIRED TO USE MOBILE PAYMENTS.\n\nEMAIL\nEMAIL\nBY ENTERING YOUR EMAIL ADDRESS, YOU AGREE TO RECEIVE OCCASIONAL PROMOTIONAL EMAILS\nSAVE\n\nNEED HELP?'
  //   );
  // });

  // test('S5819-C3826167: On tap Member profile @smoke', async ({ page }) => {
  //   await homePage.clickUserDataIcon();

  //   await page.waitForURL(`${getExpAppUrl()}/profile`);
  //   expect(page).toHaveTitle('Profile');

  //   const profileMenuPage = new ProfileMenuPage(page);
  //   await expect(profileMenuPage._backButton).toBeVisible();
  //   expect(await profileMenuPage.getProfileMenuContent()).toContain(
  //     'TAP TO VIEW AND EDIT YOUR INFORMATION\n\nPRODUCT INTERESTS\n\nRECEIPTS\n\nWALLET\n\nABOUT\n\nPRIVACY POLICY\n\nTERMS & CONDITIONS\n\nSUPPORT & FEEDBACK\n\nACCOUNT\n\nSIGN OUT'
  //   );
  //   await expect(profileMenuPage._appVersion).toBeVisible();
  //   expect(await profileMenuPage.isSvgLogosDisplayed()).toBeTruthy();
  // });
});

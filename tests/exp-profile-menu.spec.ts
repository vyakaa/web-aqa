// import { expect, test } from '@playwright/test';
// import { ProfileMenuPage } from '../../page-objects/experience-app/expProfileMenuPage';
// import { ReceiptsPage } from '../../page-objects/experience-app/expReceiptsPage';
// import { WalletPage } from '../../page-objects/experience-app/expWalletPage';
// import { ExperienceLoginPage } from '../../page-objects/experience-app/expLoginPage';
// import { getExpAppUrl } from '../../fixtures/methods';

// let profileMenuPage: ProfileMenuPage;

// test.describe.parallel('ExpApp. Profile menu', async () => {
//   test.use({ storageState: './expAppState.json' });

//   test.beforeEach(async ({ page }) => {
//     profileMenuPage = new ProfileMenuPage(page);
//     await profileMenuPage.open();
//     await profileMenuPage.waitForProgressBarHidden();
//   });

//   test('S5819-C3532933: Check a profile with a missing name @smoke', async () => {
//     await expect(profileMenuPage._yourInformationSection).toHaveText('Tap to view and edit your information');
//   });

//   test('S5819-C3532931: Your information screen is shown @smoke', async () => {
//     await profileMenuPage.clickYourInformation();

//     await expect(profileMenuPage._completeProfileAlert).toBeVisible();
//     expect(await profileMenuPage.getCompleteProfileText()).toBe('COMPLETE PROFILE\nFIRST NAME\nFIRST NAME\nLAST NAME\nLAST NAME\nEMAIL\nEMAIL\nBY ENTERING YOUR EMAIL ADDRESS, YOU AGREE TO RECEIVE OCCASIONAL PROMOTIONAL EMAILS\nPHONE NUMBER\nPHONE NUMBER\n\nYOUR BIRTHDAY\n\nMONTH\nMONTH\nDAY\nDAY\nYEAR\nYEAR\n\nWE\'D LOVE TO SEND YOU A GIFT ON YOUR SPECIAL DAY!\nSUBMIT\nCLOSE');
//   });

//   test('S5819-C3533263: Check a default tab @smoke', async ({ page }) => {
//     await profileMenuPage.clickReceipts();
//     const receiptsPage = new ReceiptsPage(page);

//     await page.waitForURL(`${getExpAppUrl()}/transactions`);
//     expect(page).toHaveTitle('Mobile Payments');
//     expect(await receiptsPage.isMobilePaymentsTabActive()).toBeTruthy();
//     expect(await receiptsPage.isLoyaltyTransactionsTabActive()).toBeFalsy();
//     expect(await receiptsPage.getReceipts()).toBe('NO RECEIPTS YET');
//   });

//   test('S5819-C3533094: On tap Wallet @smoke', async ({ page }) => {
//     await profileMenuPage.clickWallet();
//     const walletPage = new WalletPage(page);

//     await page.waitForURL(`${getExpAppUrl()}/profile/wallet`);
//     expect(page).toHaveTitle('Wallet');
//     expect(await walletPage.getWalletPageContent()).toBe('GOOGLE PAY\n\nADD CREDIT OR DEBIT CARD\nYOU MAY ADD UP TO 5 PAYMENT METHODS.');
//   });

//   test('S5819-C3532742: On tap "Terms of Service" link @smoke', async ({ context }) => {
//     const [newTab] = await Promise.all([
//       context.waitForEvent('page'),
//       await profileMenuPage.clickTermsAndConditionsLink()
//     ]);

//     await newTab.waitForLoadState();
//     expect(newTab.url()).toBe('https://www.stuzo.com/');
//   });

//   test('S5819-C3532743: On tap "Privacy Policy" link @smoke', async ({ context }) => {
//     const [newTab] = await Promise.all([
//       context.waitForEvent('page'),
//       await profileMenuPage.clickPrivacyPolicyLink()
//     ]);

//     await newTab.waitForLoadState();
//     expect(newTab.url()).toBe('https://www.stuzo.com/');
//   });

//   test('S5819-C3533283: Tap on Support & Feedback @smoke', async () => {
//     await profileMenuPage.clickSupportAndFeedbackLink();

//     await expect(profileMenuPage._systemAlert).toBeVisible();
//     expect(await profileMenuPage.getBannerText()).toBe('NEED HELP?\n\nCALL US OR EMAIL OUR SUPPORT TEAM.\n\nCALL (555) 555-5555\nSEND EMAIL\nCANCEL');
//   });

//   test('S5819-C3532744: On tap Logout @smoke', async ({ page }) => {
//     expect(page).toHaveTitle('Profile');
//     await page.waitForTimeout(2000);
//     await profileMenuPage.clickSignOut();
//     await page.getByTestId('phone-number-field').waitFor();
//     expect(page.url()).toBe(`${getExpAppUrl()}/auth/request-magic-link`);
//     expect(page).toHaveTitle('Sign Up');

//     const loginPage = new ExperienceLoginPage(page);
//     await page.waitForTimeout(1000);
//     await expect(loginPage._submitButton).toBeDisabled();
//   });

//   test('S5819-C3532932: Check app version @smoke', async ({ page }) => {
//     await page.waitForTimeout(2000);
//     await expect(profileMenuPage._appVersion).toBeVisible();
//     expect(await profileMenuPage.getAppVersion()).toContain('App version: v');
//   });
// });

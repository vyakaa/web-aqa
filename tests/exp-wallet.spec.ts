import { expect, test } from '@playwright/test';
import { WalletPage } from '../../page-objects/experience-app/expWalletPage';

let walletPage: WalletPage;

test.describe.parallel('ExpApp. Wallet', async () => {
  test.use({ storageState: './expAppState.json' });

  test.beforeEach(async ({ page }) => {
    walletPage = new WalletPage(page);
    await walletPage.open();
    await walletPage.waitForProgressBarHidden();
  });
  

  test('S5819-C3533095: On tap "Add credit or debit card" button @smoke', async ({ page }) => {
    await page.waitForTimeout(2000);
    await walletPage.clickAddCreditOrDebitCard();

    expect(await walletPage.getAddCardContent()).toBe('ADD CARD\nCARD NUMBER\nCARD NUMBER\nEXPIRATION DATE\nEXPIRATION DATE\nCVV\nCVV\nCARDHOLDER NAME\nCARDHOLDER NAME\n\nENTER NAME AS IT APPEARS ON CARD\n\nBILLING ZIP\nBILLING ZIP\nSUBMIT');

    await expect(walletPage._submitButton).toBeDisabled();

    await walletPage.fillInCreditCard();

    expect(await walletPage.getCreditCardLogoClass()).toContain('visa');
    expect(await walletPage.countInvalidFields()).toBe(0);
    await expect(walletPage._submitButton).toBeEnabled();
  });
});

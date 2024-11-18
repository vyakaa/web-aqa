import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';

let loginPage: LoginPage;

setup('TC_001: App_Setup', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.loginWithCredentials('aqa@example.com', 'SecurePassword');

  await expect(page).toHaveURL('/convert');
  await expect
    .poll(
      async () => {
        const response = (await page.context().storageState()).cookies.filter(
          (x) => x.name == 'secure-user-data'
        );
        return response;
      },
      {
        message: 'No user data in cookies',
        timeout: 1000,
      }
    )
    .toHaveLength(1);

  await page.context().storageState({ path: './appState.json' as string });
});

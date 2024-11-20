import { expect, test } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';

let loginPage: LoginPage;

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.open();
});

test.fail('TC_002: should not login with no credentials', async () => {
  expect.soft(loginPage._submitButton.isDisabled).toBeTruthy();
  await loginPage.clickSubmitButton();

  expect(await loginPage.getAlertText()).toBe(expect.anything());
});

test('TC_003: should mask a password', async () => {
  expect(await loginPage._passwordInput.getAttribute('type')).toBe('password');
});

[
  {
    testCase: 'not existing credentials',
    email: 'random@example.com',
    password: 'somepassword',
  },
  {
    testCase: 'existing password for other email',
    email: 'random@example.com',
    password: 'test',
  },
  {
    testCase: 'incorrect password',
    email: 'aqa@example.com',
    password: 'test',
  },
  { testCase: 'short password', email: 'random@example.com', password: 't' },
  {
    testCase: 'long password',
    email: 'random@example.com',
    password:
      '9OpkG2Rb3O5HKw1GBg4nE7ginzJMuyUXUxbeoKQTRYQpNsQBM9QsKyqvwlBrozBZzVtBNINwN9MI5nMutui3Zq7e3uD4dWEDfGzh',
  },
  {
    testCase: 'uppercase email',
    email: 'AQA@EXAMPLE.COM',
    password: 'SecurePassword',
  },
].forEach(({ testCase, email, password }) => {
  test.fail(`TC_004, B001: should login with ${testCase}`, async () => {
    await loginPage.loginWithCredentials(`${email}`, `${password}`);

    expect(await loginPage.isErrorAlertDisplayed()).toBeTruthy();
    expect(await loginPage.getAlertText()).toEqual(expect.anything());
  });
});

test.fail('TC_005: should login with alias in email', async ({ page }) => {
  await loginPage.loginWithCredentials('aqa+1@example.com', 'SecurePassword');
  await page.waitForLoadState();

  expect(await loginPage.isErrorAlertDisplayed()).toBeFalsy();
  await expect(page).toHaveURL('/convert');
});

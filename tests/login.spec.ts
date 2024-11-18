import { expect, test } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';

let loginPage: LoginPage;

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.open();
});

test('T002: Login with no credentials', async () => {
  await loginPage.clickSubmitButton();

  expect(await loginPage.getAlertText()).toBe('No empty fields allowed!');
});

test('T003: Ensure password is masked', async () => {
  expect(await loginPage._passwordInput.getAttribute('type')).toBe('password');
});

test.fail('T004: Login with not existing credentials', async () => {
  await loginPage.loginWithCredentials('random@example.com', 'somepassword');

  expect(await loginPage.isAlertEnabled()).toBeTruthy();
  expect(await loginPage.getAlertText()).toEqual(expect.anything());
});

test.fail('T005: Login with existing password', async () => {
  await loginPage.loginWithCredentials('random@example.com', 'test');

  expect(await loginPage.isAlertEnabled()).toBeTruthy();
  expect(await loginPage.getAlertText()).toEqual(expect.anything());
});

test.fail('T006: Login with incorrect password', async () => {
  await loginPage.loginWithCredentials('aqa@example.com', 'test');

  expect(await loginPage.isAlertEnabled()).toBeTruthy();
  expect(await loginPage.getAlertText()).toEqual(expect.anything());
});

test.fail('T007: Login with short password', async () => {
  await loginPage.loginWithCredentials('random@example.com', 't');

  expect(await loginPage.isAlertEnabled()).toBeTruthy();
  expect(await loginPage.getAlertText()).toEqual(expect.anything());
});

test.fail('T008: Login with long password', async () => {
  await loginPage.loginWithCredentials(
    'random@example.com',
    '9OpkG2Rb3O5HKw1GBg4nE7ginzJMuyUXUxbeoKQTRYQpNsQBM9QsKyqvwlBrozBZzVtBNINwN9MI5nMutui3Zq7e3uD4dWEDfGzh'
  );

  expect(await loginPage.isAlertEnabled()).toBeTruthy();
  expect(await loginPage.getAlertText()).toEqual(expect.anything());
});

test.fail('T009: Login with uppercase email', async () => {
  await loginPage.loginWithCredentials('AQA@EXAMPLE.COM', 'SecurePassword');

  expect(await loginPage.isAlertEnabled()).toBeTruthy();
  expect(await loginPage.getAlertText()).toEqual(expect.anything());
});

test.fail('T010: Login with alias in email', async ({ page }) => {
  await loginPage.loginWithCredentials('aqa+1@example.com', 'SecurePassword');

  expect(await loginPage.getAlertText()).toBe('');
  await expect(page).toHaveURL('/convert');
});

import { expect, test } from '@playwright/test';
import { ExperienceLoginPage } from '../../page-objects/experience-app/expLoginPage';
import { ExperienceHomePage } from '../../page-objects/experience-app/expHomePage';
import { USER_PHONE_NUMBER } from '../../fixtures/constants';
import { PhoneHelper } from '../../helpers/phone_helper';
import { getExpAppUrl } from '../../fixtures/methods';

let loginPage: ExperienceLoginPage;

const phoneHelper = new PhoneHelper();
const phoneNumbers = ['+17815610209', '+1 781 561 02 09', '781 561 0209', '17815610209'];

test.describe.parallel('ExpApp. Signup', async () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new ExperienceLoginPage(page);
    await loginPage.open();
  });


  test('S5819-C3532920: On tap "Terms of Service" link @smoke', async ({ context }) => {
    const [newTab] = await Promise.all([
      context.waitForEvent('page'),
      await loginPage.clickTermsOfServiceLink()
    ]);

    await newTab.waitForLoadState();
    expect(newTab.url()).toBe('https://www.stuzo.com/');
  });


  test('S5819-C3532921: On tap "Privacy Policy" link @smoke', async ({ context }) => {
    const [newTab] = await Promise.all([
      context.waitForEvent('page'),
      await loginPage.clickPrivacyPolicyLink()
    ]);

    await newTab.waitForLoadState();
    expect(newTab.url()).toBe('https://www.stuzo.com/');
  });


  test('S5819-C3532886: Confirm button is disabled @smoke', async ({ page }) => {
    await page.locator('button[disabled]').waitFor({state: 'attached'});
    await expect(loginPage._submitButton).toBeDisabled();
  });


  test('S5819-C3532888: Enter a valid phone number @smoke', async () => {
    for (const phoneNumber of phoneNumbers) {
      await loginPage.enterPhone(phoneNumber);
      const regex = new RegExp(/^[1]?\s?(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/);

      expect(loginPage._phoneInput).toHaveAttribute('aria-invalid', 'false');
      expect(await loginPage.getExteredPhoneNumber()).toMatch(regex);
      await expect(loginPage._submitButton).toBeEnabled();

      await loginPage.enterPhone('');
    }
  });


  test('S5819-C3532889: On tap Submit button @smoke', async () => {
    await loginPage.enterPhone(USER_PHONE_NUMBER);
    await loginPage.clickSubmitButton();
    expect(await loginPage.getBannerText()).toBe('We sent you a text message with a link to access your account.');
    
    const searchCriteria = {
      sentTo: USER_PHONE_NUMBER,
    };

    const searchOptions = {
      timeout: 12000,
    };

    await expect.poll(async () => {
      const sms = await phoneHelper.getMessage(searchCriteria, searchOptions);
      return sms.text?.body as string;
    }, {
      message: 'No sms found following the search criteria',
      timeout: 10000,
    }).toContain(`Follow this link to check your point balance and spend your points on rewards! ${getExpAppUrl()}/login/`);
  });

  
  test('S5819-C3532892: Open magic link @smoke', async ({ page }) => {
    expect(page).toHaveTitle('Sign Up');
    const magicLink = await phoneHelper.getMagicLinkFromPhone(USER_PHONE_NUMBER);
    if (magicLink) await loginPage.open(magicLink);
    
    const homePage = new ExperienceHomePage(page);
    await homePage._userDataIcon.waitFor();
    expect(page).toHaveTitle('Home');
    await expect(homePage._userDataIcon).toBeVisible();
  });
});

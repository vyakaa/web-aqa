import { expect, test } from '@playwright/test';
import { StoreLocatorPage } from '../../page-objects/experience-app/expStoreLocatorPage';

let storeLocatorPage: StoreLocatorPage;

test.describe.parallel('ExpApp. Location', async () => {
  test.use({ storageState: './expAppState.json' });

  
  test('S5819-C3532880: Location permission.Access to location allowed @smoke', async({ context, page}) => {
    await context.grantPermissions(['geolocation']);
    await context.setGeolocation({latitude: 50.8551729, longitude: 4.340312});

    storeLocatorPage = new StoreLocatorPage(page)
    await storeLocatorPage.open();
    await storeLocatorPage.clickCurrentLocation();
    
    await expect(storeLocatorPage._systemAlert).not.toBeVisible();
    expect(page).toHaveTitle('Store locator');
  });


  test('S5819-C3532881: Location permission.Access to location denied @smoke', async({ page }) => {
    storeLocatorPage = new StoreLocatorPage(page);
    await storeLocatorPage.open();
    await storeLocatorPage.clickCurrentLocation();
    
    await expect(storeLocatorPage._systemAlert).toBeVisible();
    expect(await storeLocatorPage.getBannerText()).toBe('PLEASE PROVIDE YOUR LOCATION\n\nWE NEED ACCESS TO YOUR LOCATION SO WE CAN HELP YOU FIND YOUR NEAREST STORE.\n\nNEED HELP?');
  });
});

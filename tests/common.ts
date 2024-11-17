// import { test, expect, Page } from '@playwright/test';

// export async function loginIntoApp(page: Page) {
//   await test.step(`Executing login to app step`, async () => {
//     await Navigation.loginIntoExpApp(page, getExpAppUrl(), USER_PHONE_NUMBER);

//     await expect
//       .poll(
//         async () => {
//           const response = (await page.context().storageState()).origins
//             .at(-1)
//             ?.localStorage.filter((x) => x.name == 'atk');
//           return response;
//         },
//         {
//           message: 'No Bearer token in local storage',
//           timeout: 5000,
//         }
//       )
//       .toHaveLength(1);

//     await page
//       .context()
//       .storageState({ path: './storageState.json' as string });
//   });
// }

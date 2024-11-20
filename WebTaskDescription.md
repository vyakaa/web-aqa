## Greetings %username% !

This is a quick manual on what we expect from you during performing the test task.
This will be a simple app that contains two features: Login & Convert file to docx feature.

## Getting Started

### Pre-requisites

Node 18 or higher (20-22 preferred)
Project uses React 19, but react-dropzone doesn't support it yet, so need legacy deps.

```sh
npm install --legacy-peer-deps
```

## Run the app

```sh
npm run dev
```

Terminal will provide a link to the app.
By default, it will be `http://localhost:3000` (aka `origin`)

#### Login Credentials:

- email: `aqa@example.com`
- password: `SecurePassword`

* First of all, get to know with the application under test, build the web app and check out its possibilities and bugs.

* Second of all, we need to evaluate your qa manual background, so create down below:

- short test plan
- list of the test cases
- list of discovered issues

* Third of all, write test automation according test automation purposes.

## Good Luck!

- p.s. Do not tamper codebase of application
- You can modify only `/web-aqa/src/lib/config.ts` to generate more or less errors

#YOUR TASK STARTS HERE:

# TEST PLAN:

- Environment: dev

- What parts of app will be tested:
  Login
  Home
  Upload a file
  Convert a file
  Download a converted file
  See upload history
  Clear upload history
  Logout

- Cover all the manual test cases with automation, as well as discovered issues (when possible)

# LIST OF TEST CASES:

- [TC_002] Attempt login without entering a username or password and ensure validation messages are displayed
- [TC_003] Ensure that the password input field masks the characters entered
- [TC_004] Attempt login with an invalid or non-existent username and verify an appropriate error message is displayed
- [TC_004] Attempt login with a valid username but an incorrect password and verify an appropriate error message is displayed
- [TC_004] Attempt login with a password that is too short or too long, ensuring appropriate validation messages are displayed
- [TC_001] Ensure the user is redirected to the appropriate homepage or dashboard after a successful login
- [TC_004] Ensure the login form error messages are clear, concise, and do not expose sensitive details
- Ensure a spinner appears during pages load
- [TC_004] Verify if the system respects case sensitivity for both usernames and passwords, as per requirements
- [TC_005] Attempt login with special characters in the username and password fields to verify input handling
- [TC_001] Ensure a user can log in using valid credentials
- [TC_009] Ensure that the user can successfully upload a PDF file for conversion
- [TC_010] Ensure a progress indicator or status message is displayed during the conversion process
- [TC_009] Convert a PDF with plain text (no images or formatting) into DOCX and verify all text is present and readable
- [TC_015] Convert an empty PDF file and ensure the output DOCX is empty but valid
- Convert a large PDF file to ensure the system handles it without crashing
- [TC_014] Attempt to upload a non-PDF file (e.g., JPG, TXT) and confirm an appropriate error message is displayed
- Attempt to convert a corrupted PDF file and verify the system gracefully handles the error
- [TC_013] Ensure the user can download the converted DOCX file without errors
- Ensure that the UI provides clear instructions for uploading a PDF and downloading the converted DOCX
- [TC_011] [TC_012] Ensure uploaded files counter increases as new file uploaded and converted, as well as decreases when a file is deleted
- [TC_013] Ensure file details in upload history correspond the details of uploaded file
- Ensure that an inactive session logs the user out after the timeout period
- [TC_007] Ensure the logout button is visible and accessible from all pages where the user is logged in
- [TC_006] Ensure that clicking the logout button logs the user out and redirects to the clean login page (fields are cleared, no session data remains)
- [TC_006] Ensure that the user cannot access secured pages or features after logging out without logging in again
- Ensure that using the browser back button after logging out does not grant access to secured pages
- [TC_004] [TC_014] Ensure that appropriate error messages are displayed for invalid inputs or failed conversions

- TODO: Test advanced formatting and content are preserved after conversion (e.g. text formatting, fonts, images, tables, hyperlinks)
- TODO: Test conversion of PDFs with text in multiple languages to ensure all characters are preserved
- TODO: Convert a PDF with special characters (e.g., ©, €, etc.) and ensure they appear correctly in the DOCX
- TODO: Ensure conversion of a password-protected PDF and ensure the system prompts for the password or displays an appropriate error
- TODO: Perform OWASP top-10 security testing of application
- TODO: Performance: Measure the time taken to convert PDFs of varying sizes and ensure it is within acceptable limits
- TODO: Performance: Test multiple users uploading and converting files simultaneously to ensure stability and performance
- TODO: API testing, add automation tests

# LIST OF DISCOVERED ISSUES:

- B001: [High] [Login] Password owner email is disclosed when use 'test' as password value
- B005: [High] [Download] Converted file is impossible to download following link (does not reproduce with every convert you make)
- B007: [High] [Logout] After logout it is still possible to access the app and Logout button is hidden
- B014: [High] [Login] No secure token set in local storage
- B006: [High] [Login] No Signup / Forgot password functionality
- B012: [High] [Login] It is possible to get logged in to app using a secure-user-data:secure-token as a cookie
- B013: [High] [Upload] Wrong file size is displayed for uploaded and converted files
- B002: [Medium] [Upload] Upload progress message 'Real PDF Convert is in Progress! Honestly!' is not user-friendly
- B003: [Medium] [Upload] Info on how to use a functionality is missing (e.g. supported file format, size etc)
- B009: [Medium] [Convert] 'File is corrupted' / 'File is too large' / 'File is empty' messages appears randomly on same file upload
- B004: [Medium] [History] It is impossible to access neither uploaded nor converted files from history
- B011: [Low] [Home] No global spinner when pages load

### TODO

// review
// check for OOP, DRY, KISS, SOLID
// share public repo

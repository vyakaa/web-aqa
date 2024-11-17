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

- short testplan
- list of the testcases
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
  Validate a file
  Convert a file
  Download a converted file
  See upload history
  Clear upload history
  Logout

- Cover all the manual test cases with automation, as well as discovered issues

# LIST OF TEST CASES:

- Attempt login without entering a username or password and ensure validation messages are displayed
- Ensure that the password input field masks the characters entered
- Attempt login with an invalid or non-existent username and verify an appropriate error message is displayed
- Attempt login with a valid username but an incorrect password and verify an appropriate error message is displayed
- Attempt login with a password that is too short or too long, ensuring appropriate validation messages are displayed
- Ensure the user is redirected to the appropriate homepage or dashboard after a successful login
- Ensure the login form error messages are clear, concise, and do not expose sensitive details
- Ensure a spinner appears during login attempts
- !!! Verify if the system respects case sensitivity for both usernames and passwords, as per requirements
- !!! Attempt login with special characters in the username and password fields to verify input handling
- !!! Test logging in from multiple devices or browsers with the same account and verify session handling
- !!! Test for SQL injection vulnerabilities in the username and password fields
- !!! Validate that the login and logout fields are safe from XSS attacks
- Ensure a user can log in using valid credentials
- Ensure that the user can successfully upload a PDF file for conversion
- Ensure a progress indicator or status message is displayed during the conversion process
- Convert a PDF with plain text (no images or formatting) into DOCX and verify all text is present and readable
- Test conversion of an empty PDF file and ensure the output DOCX is empty but valid
- Convert a very large PDF file to ensure the system handles it without crashing
- Attempt to upload a non-PDF file (e.g., JPG, TXT) and confirm an appropriate error message is displayed
- Attempt to convert a corrupted PDF file and verify the system gracefully handles the error
- Convert a PDF with special characters (e.g., ©, €, etc.) and ensure they appear correctly in the DOCX
- Ensure conversion of a password-protected PDF and ensure the system prompts for the password or displays an appropriate error
- Ensure the user can download the converted DOCX file without errors
- Ensure that the UI provides clear instructions for uploading a PDF and downloading the converted DOCX
- Upload history...
- Upload history...
- !!! Verify that an inactive session logs the user out after the timeout period, as per requirements
- Ensure the logout button is visible and accessible from all pages where the user is logged in
- Ensure that clicking the logout button logs the user out and redirects to the clean login page (fields are cleared, no session data remains)
- Ensure that the user cannot access secured pages or features after logging out without logging in again
- Ensure that using the browser back button after logging out does not grant access to secured pages
- Logout...
- Logout...
- !!! Validate that appropriate error messages are displayed for invalid inputs or failed conversions

- Performance: Measure the time taken to convert PDFs of varying sizes and ensure it is within acceptable limits
- Performance: Test multiple users uploading and converting files simultaneously to ensure stability and performance

- TODO: Test formatting and content are preserved after conversion (e.g. text formatting, fonts, images, tables, hyperlinks)
- TODO: Test conversion of PDFs with text in multiple languages to ensure all characters are preserved

# LIST OF DISCOVERED ISSUES:

- e.g. Login can be performed with empty password field (not a real issue)
- W001: [High] [Login] Password owner email is disclosed when use 'test' as password value
- W005: [High] [Download] Converted file is impossible to download following link, need to update a file name in url // check a result page more
- W007: [High] [Logout] After logout it is still possible to access the app and Logout button is hidden
- W006: [High] [Login] No Signup / Forgot password functionality
- W002: [Medium] [Upload] Upload progress message 'Real PDF Convert is in Progress! Honestly!' is not user-friendly
- W003: [Medium] [Upload] Info on how to use a functionality is missing (e.g. supported file format, size etc)
- W009: [Medium] [Convert] 'File is corrupted' / 'File is too large' / 'File is empty' messages appears randomly on same file upload
- W004: [Medium] [History] It is impossible to access neither uploaded nor converted files from history
- W010: [Medium] [Upload] 'Files uploaded' counter is not updated after successful upload unless refresh a page
- W008: [Low] [Home] Click on logo does not redirect to home page // reproduce for all pages!

### TODO

// check how changes in configuration file affect app work

// test resulting file (docx) for different files uploaded:
// empty file
// corrupted file
// non-PDF file
// check file size limitation x-y MB

// Manual testing: endpoints - include into test cases list; cookies; local storage; refresh, back browser buttons on each page

// setup Github actions for npm install ---> npm run dev ---> playwright test

// playwright:
// init, configure setup
// introduce page objects
// add all tests titles by files (come up with fine naming system); follow AAA
// read latest documentation for TS + Playwright
// make screenshot on failure (page vs element), add console logs
// add reporting with artifacts
// add playwright config filtering tests with tags
// think about global setup and teardown

// API tests

// UI tests

// map automation tests to manual test cases and discovered issues (test.skip - check how it notifies if fixed)

// review

// check for OOP, DRY, KISS, SOLID

// add Github actions status tracker for develop branch into readme file

// share public repo

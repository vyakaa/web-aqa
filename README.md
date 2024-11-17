# PoC for testing a web PDF Convert application with Playwright

## Project Description

- Project setup with Playwright version 1.48.2. A config file is in `./playwright.config.ts` directory.
- All scripts are written in Typescript.
- Page Object model is in the `./pageObjects` folder.
- Mock and test data are in `./fixtures` directory.
- Helper functions and methods are in `./helpers` directory.
- All api methods and calls are in `./helpers/api` directory.
- Smoke tests are marked with `@smoke` tag.

It supports and provides:

- [playwright](https://playwright.dev/)

## To Get Started

#### Pre-requisites

1. NodeJS installed globally in the system.
   https://nodejs.org/en/download/

2. Clonning repo

#### Setup Scripts

- Clone the repository into a folder by running git clone TODO
- Open project folder in VS Code or other IDE and launch a terminal
- Run the following command from terminal `npm install --legacy-peer-deps`
- All the dependencies from package.json and ambient typings will be installed in `node_modules` folder.

3. Run tests locally:
   !!! `.env` file

Headless mode is ON by default. if you want to change it open `playwright.config.ts` file and set 'headless' property to false

#### Run Scripts

- For running smoke tests `npm run smoke`

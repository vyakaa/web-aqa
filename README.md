# PoC for testing a web PDF Convert application with Playwright

[![Playwright Tests](https://github.com/vyakaa/web-aqa/actions/workflows/playwright.yml/badge.svg)](https://github.com/vyakaa/web-aqa/actions/workflows/playwright.yml)

## Project Description

- Project setup with Playwright version 1.48.2. A config file is in `./playwright.config.ts` directory.
- All scripts are written in Typescript.
- Page Object model is in the `./pageObjects` folder.
- Test files are in `./test-files` directory.

It supports and provides:

- [playwright](https://playwright.dev/)

## To Get Started

#### Pre-requisites

NodeJS installed globally in the system.
https://nodejs.org/en/download/

#### Run Scripts

Headless mode is ON by default. if you want to change it open `playwright.config.ts` file and set `headless` property to `false`.

- For running tests `npm run tests`, this includes Desktop and Mobile configuration for Chromium.
- There is also another configuration for local check for flakiness, it runs Desktop Chromium: `npm run tests:check_for_flakiness`.
- Show HTML report: `npm run report`.

## Copyright and Usage

Copyright (c) 2024 Viktoriia Chykrii.

This repository contains personal assigment, web application and tests. The tests are located in './tests' folder and were implemented by Viktoriia Chykrii. The code is intended solely for educational purposes, and unauthorized copying, distribution, or modification is strictly prohibited. This code is not licensed for commercial use.


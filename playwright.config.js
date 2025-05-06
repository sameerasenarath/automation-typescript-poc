
// @ts-check

const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries :0,

  /* Maximum time one test can run for. */
  timeout: 120 * 1000,
  expect: {

    timeout: 5000
  },

  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    browserName : 'chromium',
    channel: 'chrome',
    video:'on',
    headless : false,
    screenshot : 'on',
    trace : 'on',//off,on
    //...devices['iPhone 13 Pro Max'],



  },
  /* Define test suites */
  projects: [
    {
      name: 'smoke-tests',
      testMatch: ['tests/NewCustomerFullYearCheckOutTest.spec.ts'], //
      video:'retain-on-failure',
      headless : false,
      screenshot : 'on',// Run only smoke test files
    },
    {
      name: 'regression-tests',
      testMatch: ['tests/regression/*.spec.ts'], // Run only regression test files
    },
    {
      name: 'sanity-tests',
      testMatch: ['tests/sanity/*.spec.ts'], // Run only sanity test files
    },
    {
      name: 'data-prep-tests',
      testMatch: ['tests/dataPreparation/**/*.spec.ts'],
    }
  ],


};

module.exports = config;

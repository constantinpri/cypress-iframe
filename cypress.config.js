const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1050,
  viewportWidth: 1500,
  downloadsFolder: "cypress/downloads",
  screenshotsFolder: "cypress/reports/screenshots",
  videosFolder: "cypress/videos",
  screenshotOnRunFailure: true,
  watchForFileChanges: true,
  video: true,
  chromeWebSecurity: false,
  e2e: {
    baseUrl: "http://checkout.stripe.dev/preview",
    includeShadowDom: true,
    defaultCommandTimeout: 20000,
    execTimeout: 40000,
    pageLoadTimeout: 40000,
    requestTimeout: 20000,
    responseTimeout: 20000,
    specPattern: "cypress/e2e/**/*.cy.js",
  },
});

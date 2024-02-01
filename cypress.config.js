const { defineConfig } = require("cypress");

module.exports = defineConfig({
  baseUrl: "https://example.cypress.io",
  testFiles: ["cypress/e2e/**/*.spec.js"],
});

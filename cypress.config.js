const { defineConfig } = require("cypress");

module.exports = defineConfig({
  baseUrl: "https://example.cypress.io",
  // Diğer Cypress konfigürasyonları...
  // setupNodeEvents gerekmiyorsa bu kısmı kaldırabilirsiniz.
});

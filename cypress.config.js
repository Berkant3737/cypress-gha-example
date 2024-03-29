const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1440,
    viewportHeight: 800,
    defaultCommandTimeout: 10000, // 10 saniye olarak ayarlanmış örnek bir değer
  },
});

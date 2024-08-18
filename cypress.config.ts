import { defineConfig } from 'cypress'

export default defineConfig({
  screenshotOnRunFailure: false,
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
})

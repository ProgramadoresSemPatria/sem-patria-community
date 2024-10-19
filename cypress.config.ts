import { clerkSetup } from '@clerk/testing/cypress'
import { defineConfig } from 'cypress'

export default defineConfig({
  screenshotOnRunFailure: false,
  defaultCommandTimeout: 50000,
  e2e: {
    async setupNodeEvents(on, config) {
      return await clerkSetup({ config })
    },
    baseUrl: process.env.BASE_URL_PRODUCTION || process.env.BASE_URL_DEVELOPMENT
  }
})

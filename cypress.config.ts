import { clerkSetup } from '@clerk/testing/cypress'
import { defineConfig } from 'cypress'

export default defineConfig({
  screenshotOnRunFailure: false,
  defaultCommandTimeout: 10000,
  e2e: {
    async setupNodeEvents(on, config) {
      return await clerkSetup({ config })
    },
    baseUrl: 'http://localhost:3000'
  }
})

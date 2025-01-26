import { clerkSetup } from '@clerk/testing/cypress'
import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  screenshotOnRunFailure: false,
  defaultCommandTimeout: 20000,
  e2e: {
    async setupNodeEvents(on, config) {
      console.log('config', config)
      return await clerkSetup({ config })
    },
    baseUrl: 'http://localhost:3000'
    // baseUrl: process.env.BASE_URL_PRODUCTION || process.env.BASE_URL_DEVELOPMENT
  }
})

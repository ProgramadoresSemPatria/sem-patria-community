import { clerkSetup } from '@clerk/testing/cypress'
import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  screenshotOnRunFailure: false,
  defaultCommandTimeout: 20000,
  env: {
    CLERK_TESTING_TOKEN: process.env.CLERK_TESTING_TOKEN,
    TEST_EMAIL: process.env.TEST_EMAIL || 'lucasyule6@gmail.com',
    TEST_PASSWORD: process.env.TEST_PASSWORD || 'lucasyule'
  },
  e2e: {
    async setupNodeEvents(on, config) {
      return await clerkSetup({ config })
    },
    baseUrl:
      process.env.BASE_URL_PRODUCTION ||
      'https://community.borderlesscoding.com'
  }
})

import { clerkSetup } from '@clerk/testing/cypress'
import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  screenshotOnRunFailure: false,
  defaultCommandTimeout: 20000,
  env: {
    CLERK_TESTING_TOKEN: process.env.CLERK_TESTING_TOKEN
  },
  e2e: {
    async setupNodeEvents(on, config) {
      config.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY =
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
      config.env.BASE_URL_PRODUCTION = process.env.BASE_URL_PRODUCTION
      config.env.BASE_URL_DEVELOPMENT = process.env.BASE_URL_DEVELOPMENT
      config.env.CLERK_TESTING_TOKEN = process.env.CLERK_TESTING_TOKEN

      console.log('Loaded Environment Variables:', {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
          process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        BASE_URL_PRODUCTION: process.env.BASE_URL_PRODUCTION,
        BASE_URL_DEVELOPMENT: process.env.BASE_URL_DEVELOPMENT,
        CLERK_TESTING_TOKEN: process.env.CLERK_TESTING_TOKEN
      })
      return await clerkSetup({ config })
    },
    baseUrl:
      process.env.BASE_URL_PRODUCTION ||
      'https://community.borderlesscoding.com'
  }
})

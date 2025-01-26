import { clerkSetup } from '@clerk/testing/cypress'
import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  screenshotOnRunFailure: false,
  defaultCommandTimeout: 20000,
  e2e: {
    async setupNodeEvents(on, config) {
      config.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY =
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
      config.env.BASE_URL_PRODUCTION = process.env.BASE_URL_PRODUCTION
      config.env.BASE_URL_DEVELOPMENT = process.env.BASE_URL_DEVELOPMENT

      console.log('Loaded Environment Variables:', {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
          config.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        BASE_URL_PRODUCTION: config.env.BASE_URL_PRODUCTION,
        BASE_URL_DEVELOPMENT: config.env.BASE_URL_DEVELOPMENT
      })
      return await clerkSetup({ config })
    },
    baseUrl:
      process.env.NODE_ENV === 'production'
        ? process.env.BASE_URL_PRODUCTION
        : process.env.BASE_URL_DEVELOPMENT
  }
})

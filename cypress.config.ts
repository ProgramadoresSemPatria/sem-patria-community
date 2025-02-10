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
    TEST_PASSWORD: process.env.TEST_PASSWORD || 'lucasyule',
    DATABASE_URL:
      'postgresql://yuripramos:pQfNqlUG1a5S@ep-shrill-frog-a5g9gqgb.us-east-2.aws.neon.tech/neondb?sslmode=require'
  },
  e2e: {
    async setupNodeEvents(on, config) {
      return await clerkSetup({ config })
    },
    baseUrl: 'http://localhost:3000/'
  }
})

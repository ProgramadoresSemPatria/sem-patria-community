import { clerkSetup } from '@clerk/testing/cypress'
import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  screenshotOnRunFailure: false,
  defaultCommandTimeout: 20000,
  e2e: {
    async setupNodeEvents(on, config) {
      return await clerkSetup({ config })
    }
  }
})

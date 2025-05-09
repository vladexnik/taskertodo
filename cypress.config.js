import { defineConfig } from 'cypress'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    specPattern: 'tests/cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5174',
    supportFile: 'tests/cypress/support/e2e.{js,jsx,ts,tsx}'
    // defaultCommandTimeout: 2000
  },
  env: {
    VITE_CYPRESS_EMAIL: process.env.VITE_CYPRESS_EMAIL,
    VITE_CYPRESS_PASSWORD: process.env.VITE_CYPRESS_PASSWORD
  }
})

import { defineConfig, devices } from '@playwright/test'

export const setupDir = 'playwright/.setup'
export const setupFile = `${setupDir}/user.json`
const testUrl = 'http://localhost:8080'

export default defineConfig({
  globalSetup: require.resolve('./tests/global.setup'),
  webServer: {
    command: 'npm run dev',
    url: testUrl,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  projects: [
    {
      name: 'chromium',
      testDir: './tests/',
      
      use: {
        baseURL: testUrl,
        ...devices['Desktop Chrome'],
        // Use "database" with existing accounts
        storageState: setupFile,
      }
    },
  ],
})

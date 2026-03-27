import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Config - Optimized for 8GB RAM
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Low RAM optimization
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Limiting workers for 8GB RAM stability
  reporter: 'html',
  
  globalSetup: require.resolve('./global-setup'),

  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry', // Only record trace when it fails to save RAM/Disk
    screenshot: 'only-on-failure',
    storageState: 'storageState.json', // Path to save/load auth state
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

import { Page } from '@playwright/test';

/**
 * Backend Mock Utility (Laravel API)
 * Memotong request dari frontend ke Laravel Backend Port 9090
 */
export async function mockBackend(page: Page, mockUsers: any[]) {
  // Mock endpoint: http://localhost:9090/api/users
  await page.route('**/api/users', async (route) => {
    const response = {
      status: 'success',
      data: mockUsers
    };

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(response),
    });
  });
}

import { Page } from '@playwright/test';

/**
 * Firestore Mock Utility
 * Memotong request ke Firebase REST API dan menggantinya dengan mock data
 */
export async function mockFirestore(page: Page, collection: string, mockData: any[]) {
  // Regex untuk menangkap request ke Firestore REST API (v1)
  const firestoreUrl = new RegExp(`firestore.googleapis.com/v1/projects/.*/databases/\\(default\\)/documents/${collection}`);

  await page.route(firestoreUrl, async (route) => {
    if (route.request().method() === 'GET') {
      // Format response sesuai dengan struktur REST Firestore
      const response = {
        documents: mockData.map(doc => ({
          name: `projects/automation-qa-aab5f/databases/(default)/documents/${collection}/${doc.id}`,
          fields: {
            name: { stringValue: doc.name },
            email: { stringValue: doc.email },
          },
          createTime: new Date().toISOString(),
          updateTime: new Date().toISOString(),
        }))
      };

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(response),
      });
    } else {
        await route.continue();
    }
  });
}

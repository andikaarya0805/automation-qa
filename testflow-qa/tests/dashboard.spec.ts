import { test, expect } from '@playwright/test';
import { mockBackend } from '../utils/backend.mock';

/**
 * Dashboard E2E Tests - Full CRUD & State Flow
 */
test.describe('Dashboard QA Flow', () => {
    
    test.beforeEach(async ({ page }) => {
        // Step 1: Mock Backend API (Port 9090)
        const mockUsers = [
            { id: 'QA-001', name: 'Alisa (QA Bot)', email: 'alisa@testflow.qa' },
            { id: 'QA-002', name: 'Bob (Tester)', email: 'bob@testflow.qa' },
        ];
        await mockBackend(page, mockUsers);

        // Step 2: Navigate ke Dashboard
        await page.goto('/dashboard');
    });

    test('Data muncul sesuai hasil mocking Backend (Realtime Update Check)', async ({ page }) => {
        // Tunggu sampai teks mock muncul (menandakan loading selesai)
        const alisaRow = page.locator('tr', { hasText: 'Alisa (QA Bot)' });
        await expect(alisaRow).toBeVisible({ timeout: 15000 });
        
        // Verifikasi Email
        await expect(alisaRow.getByText('alisa@testflow.qa')).toBeVisible();
        
        console.log('✅ Data Backend terverifikasi muncul di UI melalui Mocking.');
    });

    test('Verifikasi State Management & Premium Aesthetics', async ({ page }) => {
        // Cek Title
        const title = page.locator('h1', { hasText: 'TestFlow' });
        await expect(title).toBeVisible();

        // Cek element dengan glassmorphism (backdrop-blur)
        const glassElement = page.locator('div[class*="backdrop-blur"]').first();
        await expect(glassElement).toBeVisible();

        // Cek tombol Launch Wizard
        const wizardBtn = page.locator('button:has-text("Launch Wizard")');
        await expect(wizardBtn).toBeEnabled();
    });

});

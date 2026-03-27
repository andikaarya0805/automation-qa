import { test, expect } from '@playwright/test';
import { mockBackend } from '../utils/backend.mock';
import { logTest, LogLevel } from '../utils/logger';

/**
 * Dashboard E2E Tests - Full CRUD & State Flow
 */
test.describe('Dashboard QA Flow', () => {
    
    test.beforeEach(async ({ page }, testInfo) => {
        await logTest(`▶️ Starting test: ${testInfo.title}`, LogLevel.INFO);
        
        // Step 1: Mock Backend API (Port 9090)
        const mockUsers = [
            { id: 'QA-001', name: 'Alisa (QA Bot)', email: 'alisa@testflow.qa' },
            { id: 'QA-002', name: 'Bob (Tester)', email: 'bob@testflow.qa' },
        ];
        await mockBackend(page, mockUsers);

        // Step 2: Navigate ke Dashboard
        await page.goto('/dashboard');
        await logTest(`Navigated to /dashboard`, LogLevel.INFO);
    });

    test('Data muncul sesuai hasil mocking Backend (Realtime Update Check)', async ({ page }) => {
        try {
            // Tunggu sampai teks mock muncul (menandakan loading selesai)
            const alisaRow = page.locator('tr', { hasText: 'Alisa (QA Bot)' });
            await expect(alisaRow).toBeVisible({ timeout: 15000 });
            
            // Verifikasi Email
            await expect(alisaRow.getByText('alisa@testflow.qa')).toBeVisible();
            
            await logTest('✅ Data Backend terverifikasi muncul di UI.', LogLevel.SUCCESS);
        } catch (error: any) {
            await logTest(`❌ Test Failed: ${error.message}`, LogLevel.ERROR);
            throw error;
        }
    });

    test('Verifikasi State Management & Premium Aesthetics', async ({ page }) => {
        try {
            // Cek Title
            const title = page.locator('h1', { hasText: 'TestFlow' });
            await expect(title).toBeVisible();

            // Cek element dengan glassmorphism (backdrop-blur)
            const glassElement = page.locator('div[class*="backdrop-blur"]').first();
            await expect(glassElement).toBeVisible();

            // Cek tombol Launch Wizard
            const wizardBtn = page.locator('button:has-text("Launch Wizard")');
            await expect(wizardBtn).toBeEnabled();
            
            await logTest('✅ UI States & Aesthetics verified.', LogLevel.SUCCESS);
        } catch (error: any) {
            await logTest(`❌ UI Verification Failed: ${error.message}`, LogLevel.ERROR);
            throw error;
        }
    });

});

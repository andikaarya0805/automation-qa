import { test, expect } from '@playwright/test';
import { logTest, LogLevel } from '../utils/logger';

test.describe('AbsensiDigital - Landing Page QA', () => {
    
    test.beforeEach(async ({ page }, testInfo) => {
        await logTest(`▶️ Starting test: ${testInfo.title} (AbsensiDigital)`, LogLevel.INFO);
    });

    test('Verifikasi Landing Page HadirMu', async ({ page }) => {
        try {
            await page.goto('/');
            await logTest('Navigated to AbsensiDigital Landing Page', LogLevel.INFO);

            // Verifikasi Title
            const brand = page.locator('span', { hasText: 'HadirMu' });
            await expect(brand).toBeVisible();

            // Verifikasi Hero Text
            const hero = page.locator('h1');
            await expect(hero).toContainText('Presensi Lebih Cepat');

            // Verifikasi Tombol Mulai
            const startBtn = page.locator('a:has-text("Mulai Sekarang")');
            await expect(startBtn).toBeVisible();
            
            await logTest('✅ AbsensiDigital Landing Page verified successfully.', LogLevel.SUCCESS);
        } catch (error: any) {
            await logTest(`❌ AbsensiDigital Test Failed: ${error.message}`, LogLevel.ERROR);
            throw error;
        }
    });

});

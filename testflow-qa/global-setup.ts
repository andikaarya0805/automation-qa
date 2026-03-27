import { chromium, FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Global Setup - Firebase Auth Bypass (Resilient Version)
 * Menangani login satu kali dan menyimpan session.
 */
async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const storageStatePath = storageState as string;
  
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log(`--- Starting Global Setup (Auth Bypass) ---`);
    console.log(`Targeting: ${baseURL}/login`);

    // Step 1: Coba akses halaman login
    await page.goto(baseURL as string + '/login');

    // Step 2: Automasi Login (Gunakan ENV atau mock)
    const user = process.env.FIREBASE_USER || 'qa@testflow.me';
    const pass = process.env.FIREBASE_PASS || 'password123';

    await page.fill('input[type="email"]', user);
    await page.fill('input[type="password"]', pass);
    
    // Tunggu navigasi setelah klik login
    await Promise.all([
      page.waitForURL('**/dashboard', { timeout: 15000 }),
      page.click('button:has-text("SIGN IN")'),
    ]);

    // Step 3: Simpan cookies & local storage
    await page.context().storageState({ path: storageStatePath });
    console.log('✅ Auth state saved to storageState.json');

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('⚠️ Global setup warning/failed:', errorMessage);
    
    // Fallback: Jika gagal (server belum up / login error), 
    // pastikan file storageState.json tetap ada agar test tidak crash ENOENT.
    if (!fs.existsSync(storageStatePath)) {
        fs.writeFileSync(storageStatePath, JSON.stringify({ cookies: [], origins: [] }));
        console.log('👷 Created dummy storageState.json as fallback.');
    }
  } finally {
    await browser.close();
  }
}

export default globalSetup;

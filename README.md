# TestFlow - Automation QA & Real-time Monitoring 🚀

TestFlow adalah platform monitoring real-time dan engine QA otomatis yang dibangun dengan stack **Next.js 15 Full-Stack** dan **Google Cloud Firestore**. Project ini dirancang untuk kecepatan, estetika premium, dan reliabilitas pengujian.

---

## 🏗️ Arsitektur Proyek
Project ini menggunakan arsitektur **Unified Full-Stack**:
- **Frontend & Backend**: Next.js 15 (App Router).
- **Database**: Google Cloud Firestore (NoSQL).
- **Testing Framework**: Playwright (TypeScript) dengan Bypass Auth & Mocking.
- **CI/CD**: GitHub Actions terintegrasi.

---

## 🛠️ Cara Instalasi & Menjalankan

### 1. Prasyarat
- Node.js v18+
- Akun Firebase (Firestore enabled)

### 2. Setup Environment
Buat file `.env.local` di dalam folder `testflow-frontend` dan isi dengan konfigurasi Firebase Anda:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
```

### 3. Jalankan Aplikasi Utama
```bash
cd testflow-frontend
npm install
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000)

---

## 🧪 Automated QA (Testing)
Framework testing berada di folder `testflow-qa`. Untuk menjalankan test:
```bash
cd testflow-qa
npm install
npx playwright test
```
**Fitur Testing:**
- **Bypass Auth**: Menggunakan `storageState.json` (login hanya sekali).
- **Backend Mocking**: Menggunakan Router Interception untuk simulasi data tanpa biaya cloud.

---

## 📂 Struktur Folder
- `/testflow-frontend`: Root aplikasi Next.js (Pages, API Routes, Libs).
- `/testflow-qa`: Framework Playwright E2E.
- `/.github/workflows`: Konfigurasi CI/CD untuk GitHub Actions.

---

## ✍️ Kontributor
Dibuat dengan ❤️ oleh **Antigravity (AI from Google DeepMind)** untuk **Andika Arya**.

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import * as dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS"
}

/**
 * Real-time Logging Utility for QA Engine
 * Writes logs directly to Firestore for Dashboard monitoring.
 */
export async function logTest(message: string, level: LogLevel = LogLevel.INFO) {
  try {
    const logData = {
      message,
      level,
      timestamp: serverTimestamp(),
      source: "QA-Engine",
    };

    console.log(`[${level}] ${message}`);
    await addDoc(collection(db, "test_logs"), logData);
  } catch (err) {
    console.error("Failed to write log to Firestore:", err);
  }
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Debug: Log config to check if env vars are loaded
console.log('Firebase config loaded:', {
  apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : 'MISSING',
  authDomain: firebaseConfig.authDomain || 'MISSING',
  projectId: firebaseConfig.projectId || 'MISSING',
  appId: firebaseConfig.appId ? `${firebaseConfig.appId.substring(0, 10)}...` : 'MISSING'
});

// Initialize Firebase safely
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  // If config is invalid or already initialized, log and continue
  console.error("Firebase init error:", e);
}

// Initialize analytics only in browser and when measurementId exists
try {
  if (typeof window !== "undefined" && firebaseConfig?.measurementId && app) {
    getAnalytics(app);
  }
} catch (_) {
  // Analytics not supported or not available — ignore in production
}

// Initialize Auth with the app instance
export const auth = app ? getAuth(app) : undefined;

export default app;

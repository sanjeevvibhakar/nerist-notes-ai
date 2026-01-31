// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKd_QxfNDW2sdKSKOSlzTU4mhQRVVVeKs",
  authDomain: "nerist-notes-ai.firebaseapp.com",
  projectId: "nerist-notes-ai",
  storageBucket: "nerist-notes-ai.firebasestorage.app",
  messagingSenderId: "904496973358",
  appId: "1:904496973358:web:34a79dfe3cb946d4a981bf",
  measurementId: "G-6C3WKHWK2X"
};

// ✅ Ensure app is initialized only once (even with hot reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Export initialized auth object
const auth = getAuth(app);

export { app, auth };

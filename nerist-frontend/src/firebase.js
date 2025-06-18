// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "nerist-study-portal-ffad5.firebaseapp.com",
  projectId: "nerist-study-portal-ffad5",
  storageBucket: "nerist-study-portal-ffad5.appspot.com",
  messagingSenderId: "312820885435",
  appId: "1:312820885435:web:976888f631bade911bc69e",
  measurementId: "G-48DSW0WKLW"
};

// ✅ Ensure app is initialized only once (even with hot reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Export initialized auth object
const auth = getAuth(app);

export { app, auth };

'use client';

import { FirebaseError, initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only if it hasn't been initialized already
let app;
try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
} catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
}

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Register the site in Firebase App Check before setting this public site key.
// Enforcement is a separate project setting; a missing key does not imply protection.
const appCheckSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_SITE_KEY;
if (typeof window !== 'undefined' && appCheckSiteKey) {
    try {
        initializeAppCheck(app, {
            provider: new ReCaptchaEnterpriseProvider(appCheckSiteKey),
            isTokenAutoRefreshEnabled: true,
        });
    } catch (error) {
        // A hot reload may evaluate this module again for the same Firebase app.
        if (!(error instanceof FirebaseError) || error.code !== 'appCheck/already-initialized') throw error;
    }
}

export { db, auth, storage, signInWithEmailAndPassword };

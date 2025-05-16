'use client';

import { initializeApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Debug environment variables
if (process.env.NODE_ENV === 'development') {
    console.log('Firebase Config Environment Variables:');
    console.log('API Key exists:', !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
    console.log('Auth Domain exists:', !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
    console.log('Project ID exists:', !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
    console.log('Storage Bucket exists:', !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
    console.log('Storage Bucket value:', process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
}

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Log the config in development (without sensitive values)
if (process.env.NODE_ENV === 'development') {
    console.log('Firebase Config:', {
        ...firebaseConfig,
        apiKey: firebaseConfig.apiKey ? '[EXISTS]' : '[MISSING]',
        appId: firebaseConfig.appId ? '[EXISTS]' : '[MISSING]'
    });
}

// Ensure we have required config
if (!firebaseConfig.storageBucket) {
    throw new Error('Firebase Storage Bucket is not configured. Please check your environment variables.');
}

// Initialize Firebase only if it hasn't been initialized already
let app;
try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
} catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
}

export const storage = getStorage(app); 
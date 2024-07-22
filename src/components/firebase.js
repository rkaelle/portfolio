import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCnrX1zznSun6Kzna9DHKpsYWhdg_ukcqQ",
    authDomain: "ryansdailynews-7df9d.firebaseapp.com",
    databaseURL: "https://ryansdailynews-7df9d-default-rtdb.firebaseio.com",
    projectId: "ryansdailynews-7df9d",
    storageBucket: "ryansdailynews-7df9d.appspot.com",
    messagingSenderId: "1054342648575",
    appId: "1:1054342648575:web:5ab56429df6f474095b2ca",
    measurementId: "G-YC3ZE3KKTT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
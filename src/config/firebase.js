// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC1F_KRYiNou3u3zcN4VKIIUup6ZLHb1es",
  authDomain: "greencan-a0782.firebaseapp.com",
  projectId: "greencan-a0782",
  storageBucket: "greencan-a0782.firebasestorage.app",
  messagingSenderId: "759079495162",
  appId: "1:759079495162:web:670f0d9055ebdf60ecb043"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;


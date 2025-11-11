import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJJ2xM9XIEuqUWNlU_PV4xtzJDKlzkbIA",
  authDomain: "manageapp-fa78c.firebaseapp.com",
  projectId: "manageapp-fa78c",
  storageBucket: "manageapp-fa78c.firebasestorage.app",
  messagingSenderId: "799566474201",
  appId: "1:799566474201:web:4465a4a8778f06275e87c8",
  measurementId: "G-EN8REJ6225"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

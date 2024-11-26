// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBz2S9B5cFei_EAkjLZbGN1l-uu7klmJeo",
    authDomain: "chatbot-n-ec760.firebaseapp.com",
    projectId: "chatbot-n-ec760",
    storageBucket: "chatbot-n-ec760.firebasestorage.app",
    messagingSenderId: "620760974181",
    appId: "1:620760974181:web:6c7596d281e7d807ced78c",
    measurementId: "G-SMZJ8J39ST"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

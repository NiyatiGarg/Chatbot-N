// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBh9cqx0ACnttK6TNSCS09kd3-P3os8R6I",
  authDomain: "bumppy-bot-7f36c.firebaseapp.com",
  projectId: "bumppy-bot-7f36c",
  storageBucket: "bumppy-bot-7f36c.firebasestorage.app",
  messagingSenderId: "490768730346",
  appId: "1:490768730346:web:ea21e447a82f57e8a26f93",
  measurementId: "G-KR55PZM6HR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDiGz2rnAixEWGkM1gJjxXFeWS2zTa0dc4",
  authDomain: "exwise-32efe.firebaseapp.com",
  projectId: "exwise-32efe",
  storageBucket: "exwise-32efe.appspot.com",
  messagingSenderId: "192664395108",
  appId: "1:192664395108:web:9db18d4d59c36a8cb46e71",
  measurementId: "G-1VTMPW9LW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

export { messaging };

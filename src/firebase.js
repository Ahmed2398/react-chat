import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAdDgDEZzwQP8O3foR1_Do8oBBWzxs0fMo",
  authDomain: "chat-2fce5.firebaseapp.com",
  projectId: "chat-2fce5",
  storageBucket: "chat-2fce5.appspot.com",
  messagingSenderId: "94394895229",
  appId: "1:94394895229:web:b773f7856042842d685a14"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()

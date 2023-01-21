// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyBNel0f_u_L1x41wgFqjBHV7z_dcaErWco",
  authDomain: "react-authentication-3e17d.firebaseapp.com",
  projectId: "react-authentication-3e17d",
  storageBucket: "react-authentication-3e17d.appspot.com",
  messagingSenderId: "995641135568",
  appId: "1:995641135568:web:1db5c94aa438c40615e9d5",
  measurementId: "G-8JRFJCN8LZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
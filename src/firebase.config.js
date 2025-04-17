// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9AHaONQaUdemMvcAGpiSAD7aj9GeKHw4",
  authDomain: "house-market-fe04a.firebaseapp.com",
  projectId: "house-market-fe04a", 
  storageBucket: "house-market-fe04a.appspot.com",
  messagingSenderId: "428640793734",
  appId: "1:428640793734:web:1909437be1d16d9dd40d07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore();

// Initialize Functions
export const functions = getFunctions(app);

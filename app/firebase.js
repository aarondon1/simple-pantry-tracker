// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { 
    getFirestore, 
    collection, 
    getDocs, 
    addDoc, 
    query$napshot, 
    query, 
    onSnapshot, 
    deleteDoc,
    doc,
   } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9lPyuXLfQ9TeXaAIX60E0G7ds_y7cqu4",
  authDomain: "pantrytracker-6bb11.firebaseapp.com",
  projectId: "pantrytracker-6bb11",
  storageBucket: "pantrytracker-6bb11.appspot.com",
  messagingSenderId: "751559029038",
  appId: "1:751559029038:web:7013415f9147453fcb0abf",
  measurementId: "G-PYCVZY8VS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export const db = getFirestore(app);
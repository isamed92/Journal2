// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5Ca3qWGBgt-tx41Qj2cCSj0UKf5doEsA",
  authDomain: "journal-84544.firebaseapp.com",
  projectId: "journal-84544",
  storageBucket: "journal-84544.appspot.com",
  messagingSenderId: "731808773018",
  appId: "1:731808773018:web:a5451c4d152ff2ad98c023",
  measurementId: "G-0TDZ4PW2MB"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseDB = getFirestore(FirebaseApp);
const FirebaseAuth = getAuth();


export { FirebaseApp, FirebaseDB, FirebaseAuth };
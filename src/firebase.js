// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiw76w0wfz5spoZ2DLZJc-poiNmayiz38",
  authDomain: "reactproject-6e7e1.firebaseapp.com",
  projectId: "reactproject-6e7e1",
  storageBucket: "reactproject-6e7e1.firebasestorage.app",
  messagingSenderId: "853550329369",
  appId: "1:853550329369:web:5e2fcae1ade7c0332d4488",
  measurementId: "G-3MZ185DT3S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
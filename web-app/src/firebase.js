import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcCsh6Yw5qCFWT7X7I7FJUXbC8zJTKHr4",
  authDomain: "ayamas-87c58.firebaseapp.com",
  projectId: "ayamas-87c58",
  storageBucket: "ayamas-87c58.appspot.com",
  messagingSenderId: "640703075691",
  appId: "1:640703075691:web:d2e979f986c708d54d682e",
  measurementId: "G-BMP4Y1GSZE"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  
  export { db, auth };
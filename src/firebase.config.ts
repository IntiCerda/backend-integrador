// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCRFE1_b4Hvw6z5fWy1unRaajBRiP1ltqc",
  authDomain: "bd-proyecto-2bbf0.firebaseapp.com",
  projectId: "bd-proyecto-2bbf0",
  storageBucket: "bd-proyecto-2bbf0.appspot.com",
  messagingSenderId: "226396399701",
  appId: "1:226396399701:web:3bf6369ab9e39d67394cdc",
  measurementId: "G-8J6JRK4ZHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6q3j7n24d4Te38xV7RW0RSjP_tCSRkF0",
  authDomain: "mrjohn-8ee8b.firebaseapp.com",
  projectId: "mrjohn-8ee8b",
  storageBucket: "mrjohn-8ee8b.firebasestorage.app",
  messagingSenderId: "662877699866",
  appId: "1:662877699866:web:451ade51fbfafafed236a3",
  measurementId: "G-BBLWJYWS31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 
console.log(analytics)

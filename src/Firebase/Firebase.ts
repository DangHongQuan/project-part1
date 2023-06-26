// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { createContext } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCJHCALUKzkM2XdidBlMspd_wzLct7i20Q",
    authDomain: "project-1-reacts.firebaseapp.com",
    projectId: "project-1-reacts",
    storageBucket: "project-1-reacts.appspot.com",
    messagingSenderId: "395325290124",
    appId: "1:395325290124:web:23279b969c1122c2916da9",
    measurementId: "G-3R3FD5ZNM7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);


export const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: (value: boolean) => {},
  });
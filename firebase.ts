// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDoBAiymGnGulMDNawZd-qOOS4aCMAcy5o",
    authDomain: "movie-app-f9694.firebaseapp.com",
    projectId: "movie-app-f9694",
    storageBucket: "movie-app-f9694.appspot.com",
    messagingSenderId: "106659601916",
    appId: "1:106659601916:web:4709894c370b048784a679",
    measurementId: "G-WYYQ19B9NK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
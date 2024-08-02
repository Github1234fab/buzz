// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
        apiKey: "AIzaSyCFHBvYMXfOcrus3gU6IgSo9GhibD5YCv8",
        authDomain: "cimes-ea988.firebaseapp.com",
        projectId: "cimes-ea988",
        storageBucket: "cimes-ea988.appspot.com",
        messagingSenderId: "13894992326",
        appId: "1:13894992326:web:ebeb90e7c9352e10c3f2c7",
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
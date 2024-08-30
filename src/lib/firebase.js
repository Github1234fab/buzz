// firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Configuration Firebase
const firebaseConfig = {
        apiKey: "AIzaSyDuXg-vTfxDVXZc_Lbazl1IAMZow-hh8oA",
        authDomain: "fleche-18ba1.firebaseapp.com",
        projectId: "fleche-18ba1",
        storageBucket: "fleche-18ba1.appspot.com",
        messagingSenderId: "1096439940539",
        appId: "1:1096439940539:web:ffc791a18592d2f5fc309e",
        measurementId: "G-7MGYVVRW5T",
};

// Initialiser Firebase App
const app = initializeApp(firebaseConfig);

// Initialiser Firebase Analytics uniquement côté client
export const initAnalytics = () => {
        if (typeof window !== "undefined") {
                return initializeAnalytics(app);
        }
        return null;
};

// Initialiser Firestore
export const db = getFirestore(app);

// Fonction pour demander la permission de notification
const requestNotificationPermission = async (messaging) => {
        try {
                console.log("Requesting permission...");
                const permission = await Notification.requestPermission();
                if (permission === "granted") {
                        console.log("Notification permission granted.");

                        const token = await getToken(messaging, {
                                vapidKey: "BA7CoHKR1lKVE-0ZfASVSNOfoBoLtYd7OjJNGfeJLTqG0_47YDVOiGKC-L9v5_EWcGvgXk06CeK2wbIzz2Kd-08",
                        });

                        console.log("Notification token:", token);

                        // TODO: Envoyer ce token à votre serveur pour stockage et utilisation
                        // await saveTokenToServer(token);
                } else {
                        console.log("Notification permission denied.");
                }
        } catch (error) {
                console.error("Error requesting notification permission:", error);
        }
};

// Initialiser Firebase Cloud Messaging uniquement côté client
export const initMessaging = () => {
        if (typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator) {
                const messaging = getMessaging(app);

                requestNotificationPermission(messaging);

                // Gestion des messages reçus lorsque l'application est au premier plan
                onMessage(messaging, (payload) => {
                        console.log("Message received. ", payload);
                        // Personnalisez la notification ici
                });
        }
};

// Appeler cette fonction dans votre composant pour initialiser Firebase Messaging
initMessaging();

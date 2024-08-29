import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

if (typeof window !== "undefined" && typeof navigator !== "undefined") {
        // Initialisation de Firebase Cloud Messaging
        const messaging = getMessaging(app);

        async function requestPermission() {
                console.log("Requesting permission...");
                try {
                        const permission = await Notification.requestPermission();
                        if (permission === "granted") {
                                console.log("Notification permission granted.");

                                // Remplacez par votre clé VAPID
                                const token = await getToken(messaging, { vapidKey: "BA7CoHKR1lKVE-0ZfASVSNOfoBoLtYd7OjJNGfeJLTqG0_47YDVOiGKC-L9v5_EWcGvgXk06CeK2wbIzz2Kd-08" });
                                console.log("Notification token:", token);

                                // TODO: Envoyer ce token à votre serveur pour stocker et utiliser pour l'envoi de notifications
                                // await saveTokenToServer(token);
                        } else {
                                console.log("Notification permission denied.");
                        }
                } catch (error) {
                        console.error("Error requesting notification permission:", error);
                }
        }

        requestPermission();

        // Gestion des messages reçus lorsque l'application est au premier plan
        onMessage(messaging, (payload) => {
                console.log("Message received. ", payload);
                // Personnalisez la notification ici
        });
}

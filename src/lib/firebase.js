// // src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// // import { getMessaging, getToken } from "firebase/messaging";

// const firebaseConfig = {
//         apiKey: "AIzaSyCFHBvYMXfOcrus3gU6IgSo9GhibD5YCv8",
//         authDomain: "cimes-ea988.firebaseapp.com",
//         projectId: "cimes-ea988",
//         storageBucket: "cimes-ea988.appspot.com",
//         messagingSenderId: "13894992326",
//         appId: "1:13894992326:web:ebeb90e7c9352e10c3f2c7",
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
        apiKey: "AIzaSyDuXg-vTfxDVXZc_Lbazl1IAMZow-hh8oA",
        authDomain: "fleche-18ba1.firebaseapp.com",
        projectId: "fleche-18ba1",
        storageBucket: "fleche-18ba1.appspot.com",
        messagingSenderId: "1096439940539",
        appId: "1:1096439940539:web:ffc791a18592d2f5fc309e",
        measurementId: "G-7MGYVVRW5T",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Ce bloc de code ne s'exécute que dans le navigateur
if (typeof window !== "undefined" && typeof navigator !== "undefined") {
        import("firebase/messaging").then(({ getMessaging, getToken }) => {
                const messaging = getMessaging();

                async function requestPermission() {
                        console.log("Requesting permission...");
                        try {
                                const permission = await Notification.requestPermission();
                                if (permission === "granted") {
                                        console.log("Notification permission granted.");
                                        const token = await getToken(messaging, { vapidKey: "BPlvfZsRZjcO32p5zeMPiVnYRdJD1U8jie40vnzF7FgbzC6ZgxyKkQJlIuYIACMjrRyo6AKx7-Sftuiq5rY80xY" });
                                        console.log("Notification token:", token);

                                        // TODO: Envoyez ce token à votre serveur
                                        // await saveTokenToServer(token);
                                } else {
                                        console.log("Notification permission denied.");
                                }
                        } catch (error) {
                                console.error("Error requesting notification permission:", error);
                        }
                }

                requestPermission();
        });
}

import * as firebase from "firebase/app";
import "firebase/messaging";

// Votre clé de serveur Firebase
const firebaseConfig = {
        messagingSenderId: "BPlvfZsRZjcO32p5zeMPiVnYRdJD1U8jie40vnzF7FgbzC6ZgxyKkQJlIuYIACMjrRyo6AKx7-Sftuiq5rY80xY",
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);

// Obtenir une référence à l'objet Firebase Messaging
const messaging = firebase.messaging();

// Recevoir les messages
messaging.onMessage((payload) => {
        console.log("Received message", payload);

        // Afficher une notification
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
                body: payload.notification.body,
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
});

importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging.js");

const firebaseConfig = {
        apiKey: "AIzaSyDuXg-vTfxDVXZc_Lbazl1IAMZow-hh8oA",
        authDomain: "fleche-18ba1.firebaseapp.com",
        projectId: "fleche-18ba1",
        storageBucket: "fleche-18ba1.appspot.com",
        messagingSenderId: "1096439940539",
        appId: "1:1096439940539:web:ffc791a18592d2f5fc309e",
        vapidKey: "BA7CoHKR1lKVE-0ZfASVSNOfoBoLtYd7OjJNGfeJLTqG0_47YDVOiGKC-L9v5_EWcGvgXk06CeK2wbIzz2Kd-08",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Gestion des messages en arrière-plan via Firebase
messaging.onBackgroundMessage((payload) => {
        console.log("Received background message ", payload);
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
                body: payload.notification.body,
                icon: "/firebase-logo.png",
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
});

// Gestion des pushs
self.addEventListener("push", function (event) {
        console.log("Push event data:", event.data ? event.data.text() : "No payload");

        let data = {};
        if (event.data) {
                try {
                        data = event.data.json(); // Parse le payload JSON
                } catch (error) {
                        console.error("Erreur de parsing JSON:", error);
                }
        }

        console.log("Parsed data:", data);

        const title = data.notification?.title || "Notification par défaut";
        const options = {
                body: data.notification?.body || "Vous avez une nouvelle notification.",
                icon: data.notification?.icon || "/default-icon.png",
                badge: data.notification?.badge || "/default-badge.png",
                data: data.notification?.data || {}, // Pour stocker des données additionnelles
        };

        event.waitUntil(self.registration.showNotification(title, options));
});

// Gestion des clics sur les notifications
self.addEventListener("notificationclick", function (event) {
        console.log("Notification click received: ", event.notification);

        event.notification.close(); // Fermer la notification

        // Exemple : Ouverture d'une URL spécifique
        event.waitUntil(clients.openWindow(event.notification.data.url || "/"));
});

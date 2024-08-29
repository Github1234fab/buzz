// // Importer les scripts Firebase nécessaires
// importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging.js");

// // Configuration de Firebase pour le service worker
// const firebaseConfig = {
//         apiKey: "AIzaSyDuXg-vTfxDVXZc_Lbazl1IAMZow-hh8oA",
//         authDomain: "fleche-18ba1.firebaseapp.com",
//         projectId: "fleche-18ba1",
//         storageBucket: "fleche-18ba1.appspot.com",
//         messagingSenderId: "1096439940539",
//         appId: "1:1096439940539:web:ffc791a18592d2f5fc309e",
//         vapidKey: "BA7CoHKR1lKVE-0ZfASVSNOfoBoLtYd7OjJNGfeJLTqG0_47YDVOiGKC-L9v5_EWcGvgXk06CeK2wbIzz2Kd-08",
// };

// // Initialiser Firebase dans le service worker
// firebase.initializeApp(firebaseConfig);

// // Obtenir une instance de Firebase Messaging
// const messaging = firebase.messaging();

// // Gestion des messages en arrière-plan
// messaging.onBackgroundMessage((payload) => {
//         console.log("Received background message ", payload);

//         const notificationTitle = "Background Message Title";
//         const notificationOptions = {
//                 body: "Background Message body.",
//                 icon: "/firebase-logo.png",
//         };

//         self.registration.showNotification(notificationTitle, notificationOptions);
// });


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

messaging.onBackgroundMessage((payload) => {
        console.log("Received background message ", payload);
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
                body: payload.notification.body,
                icon: "/firebase-logo.png",
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("push", function (event) {
        console.log("Push event received:", event);

        const data = event.data ? event.data.json() : { title: "Default Title", body: "Default Body" };

        const options = {
                body: data.body,
                icon: "/path/to/icon.png",
                badge: "/path/to/badge.png",
        };

        event.waitUntil(self.registration.showNotification(data.title, options));
});
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getMessaging, getToken } from "firebase/messaging";

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





//         // src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getMessaging, getToken } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyCFHBvYMXfOcrus3gU6IgSo9GhibD5YCv8",
//   authDomain: "cimes-ea988.firebaseapp.com",
//   projectId: "cimes-ea988",
//   storageBucket: "cimes-ea988.appspot.com",
//   messagingSenderId: "13894992326",
//   appId: "1:13894992326:web:ebeb90e7c9352e10c3f2c7",
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

// // Initialize Firebase Cloud Messaging and get a reference to the service
// const messaging = getMessaging();

// // Function to request permission
// async function requestPermission() {
//   console.log("Requesting permission...");
//   try {
//     const permission = await Notification.requestPermission();
//     if (permission === "granted") {
//       console.log("Notification permission granted.");
//       // Get the registration token (within the granted permission block)
//       const token = await getToken(messaging, { vapidKey: "BPlvfZsRZjcO32p5zeMPiVnYRdJD1U8jie40vnzF7FgbzC6ZgxyKkQJlIuYIACMjrRyo6AKx7-Sftuiq5rY80xY" });
//       console.log("Notification token:", token);
//       // Send the token to your server for further processing
//     } else {
//       console.log("Notification permission denied.");
//     }
//   } catch (error) {
//     console.error("Error requesting notification permission:", error);
//   }
// }

// // Request permission before retrieving token
// requestPermission();

// // (Optional) You can keep the commented-out code for reference, but it's not necessary due to caching.
// // getToken(messaging, { vapidKey: "BPlvfZsRZjcO32p5zeMPiVnYRdJD1U8jie40vnzF7FgbzC6ZgxyKkQJlIuYIACMjrRyo6AKx7-Sftuiq5rY80xY" })
// //   .then((currentToken) => {
// //     // ...
// //   })
// //   .catch((err) => {
// //     // ...
// //   });
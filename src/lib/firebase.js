
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1wZueyhJBPhqa1BxI0v3NvdKhGoYK1UE",
  authDomain: "buzzdesmonts.firebaseapp.com",
  projectId: "buzzdesmonts",
  storageBucket: "buzzdesmonts.appspot.com",
  messagingSenderId: "145766146483",
  appId: "1:145766146483:web:5d13d66ac564e7365cebc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



async function getEvents() {
        const eventsCollection = collection(db, "events");
        const snapshot = await getDocs(eventsCollection);
        return snapshot.docs.map((doc) => doc.data());
}

export { getEvents };

<!-- AVEC STORE -->
<!-- <script>
  import { collection, getDocs } from "firebase/firestore";
  import { db } from "../lib/firebase.js"; // Import your Firestore instance
  import { jsonDataByDate } from '../lib/store.js'; // Import the store

  async function fetchJsonData() {
    try {
      const jsonDataCollection = collection(db, "jsonstock");
      const querySnapshot = await getDocs(jsonDataCollection);
      const dataByDate = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const eventDate = new Date(data.date); // Convertir la date en objet Date
        const dateKey = eventDate.toISOString().slice(0, 10); // Formatter la date pour la clé

        if (!dataByDate[dateKey]) {
          dataByDate[dateKey] = [];
        }
        dataByDate[dateKey].push(data);
      });

      jsonDataByDate.set(dataByDate); // Mettre à jour le store
      console.log("jsonDataByDate:", dataByDate);
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  }

  // Appeler la fonction pour récupérer les données au chargement du composant
  $: fetchJsonData();
</script> -->



<!-- SANS STORE -->

<script>
  import { collection, getDocs } from "firebase/firestore";
  import { db } from "../lib/firebase.js"; // Import your Firestore instance
  
  export let jsonDataByDate = {}; // Exporter les données



async function fetchJsonData() {
  try {
    const jsonDataCollection = collection(db, "jsonstock");
    const querySnapshot = await getDocs(jsonDataCollection);
    jsonDataByDate = {}; // Réinitialiser l'objet vide à chaque appel

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const eventDate = new Date(data.date); // Convertir la date en objet Date
      const dateKey = eventDate.toISOString().slice(0, 10); // Formatter la date pour la clé

      if (!jsonDataByDate[dateKey]) {
        jsonDataByDate[dateKey] = [];
      }

      // Déclaration de docData en dehors de la boucle
      let docData = jsonDataByDate[dateKey];
      docData.push(data);
    });

    console.log("jsonDataByDate:", jsonDataByDate); // Log des données récupérées
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
}


  // Appeler la fonction pour récupérer les données au chargement du composant
  $: fetchJsonData();
</script>

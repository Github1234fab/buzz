<script>
  import { collection, getDocs } from "firebase/firestore";
  import { db } from "../lib/firebase.js";
  import { jsonServicesByDate } from "../lib/storeAdvertisement.js"; // Importer le store pour les services

  async function fetchJsonServicesData() {
    try {
      const jsonDataCollection = collection(db, "jsonAdvertisement");
      const querySnapshot = await getDocs(jsonDataCollection);
      let tempJsonServicesByDate = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        const eventDate = new Date(data.date);
        const dateKey = eventDate.toISOString().slice(0, 10);

        if (!tempJsonServicesByDate[dateKey]) {
          tempJsonServicesByDate[dateKey] = [];
        }

        tempJsonServicesByDate[dateKey].push(data);
      });

      jsonServicesByDate.set(tempJsonServicesByDate);
    } catch (error) {
      console.error("Error fetching JSON services data:", error);
    }
  }

  fetchJsonServicesData();
</script>

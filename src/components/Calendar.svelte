<script>
  import { jsonDataByDate } from "../lib/store.js"; // Import the store
  import { get } from 'svelte/store';

  let currentDate = new Date();
  let selectedDate = new Date();
  let today = new Date();
  let days = [];
  let eventsForSelectedDay = null;

  function loadDays(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
    const endDay = lastDayOfMonth.getDay() === 0 ? 6 : lastDayOfMonth.getDay() - 1;

    days = [];

    for (let i = startDay; i > 0; i--) {
      days.push(new Date(year, month, 1 - i));
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    for (let i = 1; i < 7 - endDay; i++) {
      days.push(new Date(year, month + 1, i));
    }
  }

  function handleDayClick(day) {
    selectedDate = new Date(day); // Créer une nouvelle date à partir du jour cliqué
    selectedDate.setHours(0, 0, 0, 0); // Assurez-vous que l'heure est réglée sur minuit pour éviter les problèmes de fuseau horaire

    const selectedDateISO = selectedDate.toISOString().slice(0, 10);
    eventsForSelectedDay = get(jsonDataByDate)[selectedDateISO] || [];
    console.log("Date sélectionnée :", selectedDateISO);
    console.log("Événements pour cette date :", eventsForSelectedDay);
  }

  function goToNextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    loadDays(currentDate);
  }

  function goToPreviousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    loadDays(currentDate);
  }

  $: loadDays(currentDate);
</script>

<div>
  <button on:click={goToPreviousMonth}>Mois précédent</button>
  <button on:click={goToNextMonth}>Mois suivant</button>
</div>
<p>Date actuelle formatée : {currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</p>

<div class="calendar">
  {#each days as day}
    <button
      class="day
        {day.getMonth() !== currentDate.getMonth() ? 'other-month' : ''}
        {day.getTime() === selectedDate.getTime() ? 'selected' : ''}
        {day.toDateString() === today.toDateString() ? 'today' : ''}
        {jsonDataByDate && jsonDataByDate[day.toISOString().slice(0, 10)] ? 'has-data' : ''}

      "
      on:click={() => handleDayClick(day)}
    >
      {day.getDate()}
    </button>
  {/each}

  {#if eventsForSelectedDay}
    <div class="event-info">
      <p>Il y a {eventsForSelectedDay.length} événement(s) prévu(s) pour cette date.</p>
      {#each eventsForSelectedDay as event}
        <p>{event.date}</p>
        <p>{event.diffuseur}</p>
            <p>{event.horaire}</p>
                <p>{event.lieu}</p>
                    <p>{event.tarif}</p>
                        <p>{event.type}</p>
      {/each}
    </div>
  {/if}
</div>

<style>
  .day.has-data::after {
    content: '*';
    color: red;
    margin-left: 5px;
  }
          .event-info {
  /* Styles pour la zone d'information des événements */
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
}
        .calendar {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 5px;
        }
        .day {
                padding: 10px;
                text-align: center;
                cursor: pointer;
        }
        .selected {
                background-color: #007bff;
                color: white;
        }
        .other-month {
                color: #ccc;
        }
        .today {
                background-color: yellow;
        }
</style>




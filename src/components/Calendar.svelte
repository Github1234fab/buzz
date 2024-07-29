<!-- <script>
        let currentDate = new Date();
        let selectedDate = new Date();
        let today = new Date();
        let days = [];

        function loadDays(date) {
                const year = date.getFullYear();
                const month = date.getMonth();
                const firstDayOfMonth = new Date(year, month, 1);
                console.log(firstDayOfMonth);
                const lastDayOfMonth = new Date(year, month + 1, 0);
                console.log(lastDayOfMonth);
                const startDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
                const endDay = lastDayOfMonth.getDay() === 0 ? 6 : lastDayOfMonth.getDay() - 1;

                days = [];

                // Add days from previous month
                for (let i = startDay; i > 0; i--) {
                        days.push(new Date(year, month, 1 - i));
                }

                // Add days of current month
                for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
                        days.push(new Date(year, month, i));
                }

                // Add days from next month
                for (let i = 1; i < 7 - endDay; i++) {
                        days.push(new Date(year, month + 1, i));
                }
        }

        function handleDayClick(day) {
                selectedDate = day;
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
                <button class="day {day.getMonth() !== currentDate.getMonth() ? 'other-month' : ''} {day.getTime() === selectedDate.getTime() ? 'selected' : ''} {day.toDateString() === today.toDateString() ? 'today' : ''}" on:click={() => handleDayClick(day)}>
                        {day.getDate()}
                </button>
        {/each}
</div>

<style>
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
</style> -->


<script>
  import { onMount } from "svelte";
  import { getEvents } from "../lib/firebase.js";

  let currentDate = new Date();
  let selectedDate = new Date();
  let today = new Date();
  let days = [];
  let events = [];
  let eventsForSelectedDate = [];

  async function loadEvents() {
    events = await getEvents();
    updateEventsForSelectedDate();
  }

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
    selectedDate = day;
    updateEventsForSelectedDate();
  }

  function updateEventsForSelectedDate() {
    const selectedDateString = selectedDate.toISOString().split('T')[0];
    eventsForSelectedDate = events.filter(event => event.date === selectedDateString);
  }

  function goToNextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    loadDays(currentDate);
  }

  function goToPreviousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    loadDays(currentDate);
  }

  onMount(async () => {
    await loadEvents();
    loadDays(currentDate);
  });
</script>

<div>
  <button on:click={goToPreviousMonth}>Mois précédent</button>
  <button on:click={goToNextMonth}>Mois suivant</button>
</div>
<p>Date actuelle formatée : {currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</p>
<div class="calendar">
  {#each days as day}
    <button 
      class="day {day.getMonth() !== currentDate.getMonth() ? 'other-month' : ''} {day.getTime() === selectedDate.getTime() ? 'selected' : ''} {day.toDateString() === today.toDateString() ? 'today' : ''}"
      on:click={() => handleDayClick(day)}>
      {day.getDate()}
      {#if events.some(event => event.date === day.toISOString().split('T')[0])}
        <span class="event-indicator">•</span>
      {/if}
    </button>
  {/each}
</div>

{#if eventsForSelectedDate.length > 0}
  <div class="events">
    {#each eventsForSelectedDate as event}
      <div class="event">
        <h3>{event.type}</h3>
        <p>{event.diffuseur}</p>
        <p>{event.lieu}</p>
        <p>{event.horaire}</p>
        <p>{event.tarif}</p>
      </div>
    {/each}
  </div>
{/if}

<style>
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }
  .day {
    padding: 10px;
    text-align: center;
    cursor: pointer;
    position: relative;
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
  .event-indicator {
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 1.2em;
    color: red;
  }
  .events {
    margin-top: 20px;
  }
  .event {
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
  }
</style>

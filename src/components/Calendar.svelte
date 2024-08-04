<script>
    import { onMount } from "svelte";
    import { jsonDataByDate, selectedDate } from "../lib/store.js";
    import { writable, get } from "svelte/store";
    import Collapse from "../components/Collapse.svelte";

    let currentDate = new Date();
    let today = new Date();
    let days = [];
    let eventsForSelectedDay = writable([]);
    let dataLoaded = writable(false);

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
        const adjustedDay = adjustForTimezone(day);
        selectedDate.set(adjustedDay);
        const selectedDateISO = adjustedDay.toISOString().slice(0, 10);
        const events = get(jsonDataByDate)[selectedDateISO] || [];
        eventsForSelectedDay.set(events);
        console.log("handleDayClick - selectedDateISO:", selectedDateISO);
        console.log("handleDayClick - eventsForSelectedDay:", events);
    }

    function goToNextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        loadDays(currentDate);
    }

    function goToPreviousMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        loadDays(currentDate);
    }

    function adjustForTimezone(date) {
        const adjustedDate = new Date(date);
        adjustedDate.setHours(adjustedDate.getHours() - adjustedDate.getTimezoneOffset() / 60);
        return adjustedDate;
    }

    onMount(() => {
        loadDays(currentDate);
        // Wait until jsonDataByDate is populated
        const unsubscribe = jsonDataByDate.subscribe((data) => {
            if (Object.keys(data).length > 0) {
                const todayISO = today.toISOString().slice(0, 10);
                const initialEvents = data[todayISO] || [];
                eventsForSelectedDay.set(initialEvents);
                dataLoaded.set(true);
                unsubscribe(); // Unsubscribe after the data is loaded
            }
        });
    });

    $: if (dataLoaded) {
        selectedDate.subscribe(date => {
            const selectedDateISO = date.toISOString().slice(0, 10);
            const events = get(jsonDataByDate)[selectedDateISO] || [];
            eventsForSelectedDay.set(events);
            console.log("$ - selectedDateISO:", selectedDateISO);
            console.log("$ - eventsForSelectedDay:", events);
        });
    }

    $: console.log("Days:", days);
</script>

<div>
    <button on:click={goToPreviousMonth}>Mois précédent</button>
    <button on:click={goToNextMonth}>Mois suivant</button>
</div>
<p>Mois actuellement affiché : {currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</p>

{#if $dataLoaded}
    <div class="calendar">
        {#each days as day}
            <button
                class="day
                {day.getMonth() !== currentDate.getMonth() ? 'other-month' : ''}
                {adjustForTimezone(day).toISOString().slice(0, 10) === $selectedDate.toISOString().slice(0, 10) ? 'selected' : ''}
                {day.toDateString() === today.toDateString() ? 'today' : ''}
                {get(jsonDataByDate) && get(jsonDataByDate)[adjustForTimezone(day).toISOString().slice(0, 10)] ? 'tag-data' : ''}"
                on:click={() => handleDayClick(day)}
            >
                {day.getDate()}
            </button>
        {/each}
    </div>
    <div class="event-info">
        <p>{$eventsForSelectedDay.length} événement(s) prévu(s) pour cette date. {$selectedDate.toISOString().slice(0, 10)}</p>
        {#each $eventsForSelectedDay as event}
            <Collapse type={event.type} annonceur={event.annonceur} date={event.date} horaire={event.horaire} lieu={event.lieu} tarif={event.tarif} />
        {/each}
    </div>
{:else}
    <p>Chargement des données...</p>
{/if}

<style>
    button.tag-data::after {
        position: absolute;
        content: "*";
        background-color: blue;
        width: 30%;
        height: 30%;
        transform: rotate(45deg);
        top: -20%;
        left: 80%;
        z-index: 2;
    }
    button {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: center;
        cursor: pointer;
        position: relative;
        z-index: 0;
        overflow: hidden;
    }

    .event-info {
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
        background-color: #28a745; /* Vert pour la date sélectionnée */
        color: white;
    }
    .other-month {
        color: #ccc;
    }
    .today {
        background-color: yellow;
    }
</style>

<script>
        import { writable } from "svelte/store";

        export let jsonDataByDate;
        export let startDate = "";
        export let endDate = "";
        export let filterLieu = "";
        export let type = ""; // Champ pour le type d'évènement
        export let filteredEvents = writable([]);

        const types = ["brocante", "foire", "café philo", "concert", "conférence", "concours photo", "lecture contes"];

        function applyFilter() {
                let filtered = [];
                const start = startDate ? new Date(startDate) : null;
                const end = endDate ? new Date(endDate) : null;

                for (const [date, events] of Object.entries(jsonDataByDate)) {
                        const currentDate = new Date(date);
                        if ((start && currentDate < start) || (end && currentDate > end)) {
                                continue;
                        }

                        events.forEach((event) => {
                                const matchesLieu = filterLieu ? event.lieu?.toLowerCase().includes(filterLieu.toLowerCase()) : true;

                                const matchesType = type ? event.type?.toLowerCase() === type.toLowerCase() : true;

                                if (matchesLieu && matchesType) {
                                        filtered.push(event);
                                }
                        });
                }

                filteredEvents.set(filtered);
        }

        function resetFilters() {
                startDate = "";
                endDate = "";
                filterLieu = "";
                type = "";
                applyFilter(); // Réapplique le filtre avec les valeurs réinitialisées
        }
</script>

<div class="wrapper-inputs">
        <label>
                Lieu :
                <input type="text" bind:value={filterLieu} placeholder="Filtrer par lieu" />
                <button on:click={() => (filterLieu = "")}>Effacer</button>
        </label>
        <label>
                Type :
                <select bind:value={type}>
                        <option value="">Tous les types</option>
                        {#each types as t}
                                <option value={t}>{t}</option>
                        {/each}
                </select>
                <button on:click={() => (type = "")}>Effacer</button>
        </label>
        <label>
                Date de début :
                <input type="date" bind:value={startDate} />
                <button on:click={() => (startDate = "")}>Effacer</button>
        </label>
        <label>
                Date de fin :
                <input type="date" bind:value={endDate} />
                <button on:click={() => (endDate = "")}>Effacer</button>
        </label>
        <button on:click={applyFilter}>Appliquer les filtres</button>
        <button on:click={resetFilters}>Réinitialiser tous les filtres</button>
</div>

<style>
        .wrapper-inputs {
                display: flex;
                flex-direction: column;
                align-items: left;
                justify-content: left;
                gap: 4px;
                padding: 5px;
        }
        input, button, select{
          padding: 4px;
          min-width: auto;
        }
     
</style>

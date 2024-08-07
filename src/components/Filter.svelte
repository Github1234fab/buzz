<!-- src/components/Filter.svelte -->
<script>
    import { filters } from '../lib/store.js';

    let type = '';
    let location = '';
    let startDate = '';
    let endDate = '';
    let organizer = '';

    function applyFilters() {
        filters.set({
            type,
            location,
            startDate,
            endDate,
            organizer
        });
    }
</script>

<div>
    <h3>Filtres</h3>
    <label>
        Type:
        <input type="text" bind:value={type} />
    </label>
    <label>
        Lieu:
        <input type="text" bind:value={location} />
    </label>
    <label>
        Date de début:
        <input type="date" bind:value={startDate} />
    </label>
    <label>
        Date de fin:
        <input type="date" bind:value={endDate} />
    </label>
    <label>
        Organisateur:
        <input type="text" bind:value={organizer} />
    </label>
    <button on:click={applyFilters}>Appliquer les filtres</button>
</div>

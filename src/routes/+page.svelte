<script>
        import Calendar from "../components/Calendar.svelte";
        import UpLoadJson from "../components/UpLoadJson.svelte";
        import UpLoadJsonAdvertisement from "../components/UpLoadJsonAdvertisement.svelte";
        import "../routes/styles.css";
</script>

<main>
        <Calendar />
        <UpLoadJson />
        <UpLoadJsonAdvertisement />
</main>

<style>
        main {
                height: auto;
        }
</style>

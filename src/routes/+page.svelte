<script>
        import Calendar from "../components/Calendar.svelte";
        // import FireLoad from "../components/FireLoad.svelte";
        // import FireLoadJsonAdvertisement from "../components/FireLoadJsonAdvertisement.svelte";
        import UpLoadJson from "../components/UpLoadJson.svelte";
        import UpLoadJsonAdvertisement from "../components/UpLoadJsonAdvertisement.svelte";
        import "../routes/styles.css";
        // import Advertisement from "../components/Advertisement.svelte";

</script>

<main>
<Calendar />

<!-- <FireLoad /> -->
<!-- <FireLoadJsonAdvertisement /> -->
<UpLoadJson />
<UpLoadJsonAdvertisement />

<!-- <Advertisement /> -->

</main>

<style>
        main{
       height: auto;
        }
</style>
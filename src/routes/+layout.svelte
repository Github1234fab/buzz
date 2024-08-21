<script>
    import { onMount } from 'svelte';
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";

    // Enregistrement du Service Worker
    onMount(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then((registration) => {
                    registration.onupdatefound = () => {
                        const installingWorker = registration.installing;
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {
                                    // Informer l'utilisateur de la nouvelle version disponible
                                    const userConfirmed = confirm("Une nouvelle version de l'application est disponible. Voulez-vous recharger?");
                                    if (userConfirmed) {
                                        window.location.reload();
                                    }
                                } else {
                                    console.log("Service Worker installé pour la première fois.");
                                }
                            }
                        };
                    };
                })
                .catch((error) => {
                    console.error("Erreur lors de l'enregistrement du Service Worker:", error);
                });
        }
    });
</script>

<main>
    <Header />
    <slot />
    <Footer />
</main>

<style>
    main {
        min-height: 100vh;
    }
</style>

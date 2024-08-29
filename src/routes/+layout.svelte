
<script>
    import { onMount } from "svelte";
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";

    onMount(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/service-worker.js")
                .then((registration) => {
                    console.log("Service Worker enregistré avec succès");

                    // Vérifier les mises à jour du Service Worker
                    registration.onupdatefound = () => {
                        const installingWorker = registration.installing;
                        if (installingWorker) {
                            installingWorker.onstatechange = () => {
                                if (installingWorker.state === "installed") {
                                    if (navigator.serviceWorker.controller) {
                                        const userConfirmed = confirm("Une nouvelle version de l'application est disponible. Voulez-vous recharger?");
                                        if (userConfirmed) {
                                            window.location.reload();
                                        }
                                    } else {
                                        console.log("Service Worker installé pour la première fois.");
                                    }
                                }
                            };
                        }
                    };

                    // Demander la permission pour les notifications
                    Notification.requestPermission().then((permission) => {
                        if (permission === "granted") {
                            console.log("Permission de notification accordée.");
                        } else {
                            console.log("Permission de notification refusée.");
                        }
                    });
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

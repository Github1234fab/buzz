const CACHE_NAME = "flech-cache-v3";
const urlsToCache = ["/", "/app.html", "/styles.css", "/icon-192x192.png", "/icon-512x512.png", "/manifest.json"];

self.addEventListener("install", (event) => {
        console.log("Service Worker installing.");
        event.waitUntil(
                caches.open(CACHE_NAME).then((cache) => {
                        console.log("Opened cache");
                        return cache.addAll(urlsToCache).catch((error) => {
                                console.error("Failed to cache:", error);
                        });
                })
        );
        // self.skipWaiting(); // Force l'activation immédiate de la nouvelle version
});

self.addEventListener("activate", (event) => {
        console.log("Service Worker activating.");
        event.waitUntil(
                caches
                        .keys()
                        .then((cacheNames) => {
                                return Promise.all(
                                        cacheNames.map((cacheName) => {
                                                if (cacheName !== CACHE_NAME) {
                                                        console.log("Deleting old cache:", cacheName);
                                                        return caches.delete(cacheName);
                                                }
                                        })
                                );
                        })
                        .then(() => {
                                return self.clients.claim(); // Prend immédiatement le contrôle de tous les clients
                        })
        );
});

self.addEventListener("fetch", (event) => {
        console.log("Fetching:", event.request.url);

        if (event.request.url.startsWith("chrome-extension://") || event.request.url.startsWith("https://firestore.googleapis.com/")) {
                return;
        }

        event.respondWith(
                caches.match(event.request).then((response) => {
                        if (response) {
                                fetchAndUpdateCache(event.request); // Optionnel : met à jour le cache en arrière-plan
                                return response;
                        }
                        return fetch(event.request)
                                .then((response) => {
                                        if (!response || response.status !== 200 || response.type !== "basic") {
                                                return response;
                                        }
                                        const responseToCache = response.clone();
                                        caches.open(CACHE_NAME).then((cache) => {
                                                cache.put(event.request, responseToCache);
                                        });
                                        return response;
                                })
                                .catch((error) => {
                                        console.error(`Fetch failed for ${event.request.url}:`, error);
                                        throw error;
                                });
                })
        );
});

function fetchAndUpdateCache(request) {
        return fetch(request).then((response) => {
                if (!response || response.status !== 200 || response.type !== "basic") {
                        return response;
                }
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseToCache);
                });
                return response;
        });
}

self.addEventListener("push", (event) => {
        console.log("Push reçu : ", event);
        const title = "Notification push";
        const options = {
                body: event.data ? event.data.text() : "Message par défaut.",
                icon: "/icon-192x192.png",
                badge: "/icon-192x192.png",
        };
        event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("sync", (event) => {
        console.log("Synchronisation en arrière-plan : ", event);
        if (event.tag === "test-tag-from-devtools") {
                event.waitUntil(doSomeBackgroundSync());
        }
});

async function doSomeBackgroundSync() {
        console.log("Tâche de synchronisation exécutée.");
}

// Gestion du changement de contrôleur pour détecter une nouvelle version
if ("serviceWorker" in navigator) {
        navigator.serviceWorker.addEventListener("controllerchange", function () {
                // Affiche une notification ou une alerte pour indiquer à l'utilisateur qu'une mise à jour est disponible
                alert("Une nouvelle version est disponible, veuillez recharger la page.");
        });
}

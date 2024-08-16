const CACHE_NAME = "flech-cache-v1";
const urlsToCache = ["/", "/app.html", "/styles.css", "/icon-192x192.png", "/icon-512x512.png", "/manifest.json"];

self.addEventListener("install", (event) => {
        console.log("Service Worker installing.");
        event.waitUntil(
                caches
                        .open(CACHE_NAME)
                        .then((cache) => {
                                console.log("Opened cache");
                                return cache.addAll(urlsToCache).catch((error) => {
                                        console.error("Failed to cache:", error);
                                });
                        })
                        .catch((error) => {
                                console.error("Failed to open cache:", error);
                        })
        );
});

self.addEventListener("activate", (event) => {
        console.log("Service Worker activating.");
        const cacheWhitelist = [CACHE_NAME];
        event.waitUntil(
                caches.keys().then((cacheNames) => {
                        return Promise.all(
                                cacheNames.map((cacheName) => {
                                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                                                console.log("Deleting old cache:", cacheName);
                                                return caches.delete(cacheName);
                                        }
                                })
                        );
                })
        );
});

self.addEventListener("fetch", (event) => {
        console.log("Fetching:", event.request.url);

        // Ignore requests with unsupported schemes
        if (event.request.url.startsWith("chrome-extension://") || event.request.url.startsWith("https://firestore.googleapis.com/")) {
                return;
        }

        event.respondWith(
                caches.match(event.request).then((response) => {
                        if (response) {
                                fetchAndUpdateCache(event.request);
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
        // Exemple de tâche de synchronisation
        console.log("Tâche de synchronisation exécutée.");
        // Implémentez la logique de synchronisation ici, par exemple, envoyer des données hors ligne à un serveur
}


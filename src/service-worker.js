const CACHE_NAME = "flech-cache-v1";
const urlsToCache = ["/", "/index.html", "/styles.css", "/app.js", "/icon-192x192.png", "/icon-512x512.png", "/manifest.json"];

self.addEventListener("install", (event) => {
        console.log("Service Worker installing.");
        event.waitUntil(
                caches.open(CACHE_NAME).then((cache) => {
                        console.log("Opened cache");
                        return cache.addAll(urlsToCache);
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
        event.respondWith(
                caches.match(event.request).then((response) => {
                        return response || fetch(event.request);
                })
        );
});

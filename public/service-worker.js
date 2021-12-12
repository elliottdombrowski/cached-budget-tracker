const CACHE_NAME = "static-transation-v2";
const DATA_CACHE_NAME = "data-transaction-v1";

const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/styles.css",
    "/index.js",
    "indexdb.js",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
    );
    self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log("Updating cache data", key);
                        return caches.delete(key);
                    };
                })
            )
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    if (e.request.url.includes('/api/')) {
        e.respondWith(
            caches.open(DATA_CACHE_NAME).then((cache) => {
                return fetch(e.request).then((res) => {
                    if(res.status === 200) {
                        cache.put(e.request.url, res.clone());
                    }
                    return res;
                }).catch((err) => {
                    return cache.match(e.request);
                })
            }).catch((err) => console.log(err))
        )
        return;
    }
    e.respondWith(
        caches.opem(CACHE_NAME)
            .then((cache) => {
                return cache.match(e.request).then((res) => {
                    return response || fetch(e.request);
                });
            })
    );
});
const cacheName = 'HappyBeanzPWA-v1';
const appFiles = [
  '/',
  '/index.html',
  '/contact.html',
  '/drinks.html',
  '/team.html',
  '/video.html',
  '/css/filters.css',
  '/css/style.css',
  '/images/coffees.webp',
  '/images/CoffeeShop.webp',
  '/images/HappyCup.webp',
  '/images/HappyCupSquare.png',
  '/images/LoyaltyCard.webp',
  '/images/ValentinesDay.webp',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/mstile-150x150.png',
  '/site.webmanifest'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install', e);
    self.skipWaiting();
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching files');
        await cache.addAll(appFiles);
    })());
});
self.addEventListener('activate', (e) => {
    console.log('[Service Worker] Activate', e);
    registerPeriodicSync();
});
self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) { return r; }
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
    })());
});

self.addEventListener('notificationclick', event => {
    event.waitUntil(self.clients.openWindow('/'));
});

self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Sync', event);
});

self.addEventListener('periodicsync', (event) => {
    console.log('[Service Worker] Periodic Sync', event);
    if (event.tag === 'HappyBeanzOffers') {
        fetch('https://www.rwsbetas.com/notifications/offers.json')
            .then(response => response.json())
            .then(data => {
                //console.log(data.offers[0].tag);

                for (let offer of data.offers) {
                    //console.log(offer.tag);
                    
                    registration.showNotification(notificationTitle, {
                        tag: offer.tag,
                        body: offer.text,
                        icon: offer.icon,
                        data: offer.URL,
                        vibrate: offer.vibration
                    });
                }
            });
        registration.update();
    }
});

self.addEventListener('updatefound', (event) => {
    console.log('[Service Worker] Update Found', event);
});

self.addEventListener('statechange', (event) => {
    console.log('[Service Worker] State Changed', event);
});

self.addEventListener('controllerchange', (event) => {
    console.log('[Service Worker] State Changed', event);
});

async function requestBackgroundSync() {
    //await self.registration.sync.register('HappyBeanzOffers');
}

async function registerPeriodicSync() {
    await registration.periodicSync.register('HappyBeanzOffers', {
        minInterval: notificationShowTime
    });
}
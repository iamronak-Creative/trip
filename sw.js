const CACHE_NAME = 'uttarakhand-trip-v51';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700;800&display=swap',
  './assets/images/airport.jpg',
  './assets/images/sahastradhara.jpg',
  './assets/images/dehradun_thali.jpg',
  './assets/images/mindrolling.jpg',
  './assets/images/fri.jpg',
  './assets/images/tapkeshwar.jpg',
  './assets/images/hotel_sevenoaks.jpg',
  './assets/images/mallroad.jpg',
  './assets/images/kempty.jpg',
  './assets/images/gunhill.jpg',
  './assets/images/camelsback.jpg',
  './assets/images/chardukan.jpg',
  './assets/images/laltibba.jpg',
  './assets/images/georgeeverest.jpg',
  './assets/images/cloudsend.jpg',
  './assets/images/surkanda.jpg',
  './assets/images/mountain_drive.jpg',
  './assets/images/hotel_mysticfalls.jpg',
  './assets/images/gangabeach.jpg',
  './assets/images/parmarth.jpg',
  './assets/images/rafting.jpg',
  './assets/images/bungee.jpg',
  './assets/images/freedom_cafe.jpg',
  './assets/images/ramjhula.jpg',
  './assets/images/teramanzil.jpg',
  './assets/images/beatles.jpg',
  './assets/images/trivenighat.jpg',
  './assets/images/kunjapuri.jpg',
  './assets/images/neelkanth.jpg',
  './assets/images/hotel_aalaaysuites.jpg',
  './assets/images/harkipauri.jpg',
  './assets/images/mohanji_puri.jpg',
  './assets/images/chandidevi.jpg',
  './assets/images/motibazaar.jpg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const asset of ASSETS_TO_CACHE) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn('Failed to cache asset:', asset, err);
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Network-first strategy for navigation / HTML requests so updates show live immediately
  if (e.request.mode === 'navigate' || e.request.url.endsWith('index.html') || e.request.url.endsWith('/')) {
    e.respondWith(
      fetch(e.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(e.request);
      })
    );
    return;
  }

  // Cache-first strategy for images and static assets
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
        }
        return networkResponse;
      });
    }).catch(() => {
      return fetch(e.request);
    })
  );
});

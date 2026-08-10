const CACHE_NAME = 'uttarakhand-trip-v18';
const ASSETS_TO_CACHE = [
  './',
  './index.html?v=18',
  './manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@1,600;1,700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,600&family=Space+Mono:wght@400;700&display=swap',
  './assets/images/airport.jpg?v=18',
  './assets/images/sahastradhara.jpg?v=18',
  './assets/images/dehradun_thali.jpg?v=18',
  './assets/images/mindrolling.jpg?v=18',
  './assets/images/fri.jpg?v=18',
  './assets/images/tapkeshwar.jpg?v=18',
  './assets/images/hotel_sevenoaks.jpg?v=18',
  './assets/images/mallroad.jpg?v=18',
  './assets/images/kempty.jpg?v=18',
  './assets/images/gunhill.jpg?v=18',
  './assets/images/camelsback.jpg?v=18',
  './assets/images/chardukan.jpg?v=18',
  './assets/images/laltibba.jpg?v=18',
  './assets/images/georgeeverest.jpg?v=18',
  './assets/images/cloudsend.jpg?v=18',
  './assets/images/surkanda.jpg?v=18',
  './assets/images/mountain_drive.jpg?v=18',
  './assets/images/hotel_mysticfalls.jpg?v=18',
  './assets/images/gangabeach.jpg?v=18',
  './assets/images/parmarth.jpg?v=18',
  './assets/images/rafting.jpg?v=18',
  './assets/images/bungee.jpg?v=18',
  './assets/images/freedom_cafe.jpg?v=18',
  './assets/images/ramjhula.jpg?v=18',
  './assets/images/teramanzil.jpg?v=18',
  './assets/images/beatles.jpg?v=18',
  './assets/images/trivenighat.jpg?v=18',
  './assets/images/kunjapuri.jpg?v=18',
  './assets/images/neelkanth.jpg?v=18',
  './assets/images/hotel_aalaaysuites.jpg?v=18',
  './assets/images/harkipauri.jpg?v=18',
  './assets/images/mohanji_puri.jpg?v=18',
  './assets/images/chandidevi.jpg?v=18',
  './assets/images/motibazaar.jpg?v=18'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
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
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});

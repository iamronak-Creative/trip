const CACHE_NAME = 'uttarakhand-trip-v13';
const ASSETS_TO_CACHE = [
  './',
  './index.html?v=13',
  './manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
  './assets/images/airport.jpg?v=13',
  './assets/images/sahastradhara.jpg?v=13',
  './assets/images/dehradun_thali.jpg?v=13',
  './assets/images/mindrolling.jpg?v=13',
  './assets/images/fri.jpg?v=13',
  './assets/images/tapkeshwar.jpg?v=13',
  './assets/images/hotel_sevenoaks.jpg?v=13',
  './assets/images/mallroad.jpg?v=13',
  './assets/images/kempty.jpg?v=13',
  './assets/images/gunhill.jpg?v=13',
  './assets/images/camelsback.jpg?v=13',
  './assets/images/chardukan.jpg?v=13',
  './assets/images/laltibba.jpg?v=13',
  './assets/images/georgeeverest.jpg?v=13',
  './assets/images/cloudsend.jpg?v=13',
  './assets/images/surkanda.jpg?v=13',
  './assets/images/mountain_drive.jpg?v=13',
  './assets/images/hotel_mysticfalls.jpg?v=13',
  './assets/images/gangabeach.jpg?v=13',
  './assets/images/parmarth.jpg?v=13',
  './assets/images/rafting.jpg?v=13',
  './assets/images/bungee.jpg?v=13',
  './assets/images/freedom_cafe.jpg?v=13',
  './assets/images/ramjhula.jpg?v=13',
  './assets/images/teramanzil.jpg?v=13',
  './assets/images/beatles.jpg?v=13',
  './assets/images/trivenighat.jpg?v=13',
  './assets/images/kunjapuri.jpg?v=13',
  './assets/images/neelkanth.jpg?v=13',
  './assets/images/hotel_aalaaysuites.jpg?v=13',
  './assets/images/harkipauri.jpg?v=13',
  './assets/images/mohanji_puri.jpg?v=13',
  './assets/images/chandidevi.jpg?v=13',
  './assets/images/motibazaar.jpg?v=13'
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

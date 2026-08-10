const CACHE_NAME = 'uttarakhand-trip-v11';
const ASSETS_TO_CACHE = [
  './',
  './index.html?v=11',
  './manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
  './assets/images/airport.jpg?v=11',
  './assets/images/sahastradhara.jpg?v=11',
  './assets/images/dehradun_thali.jpg?v=11',
  './assets/images/mindrolling.jpg?v=11',
  './assets/images/fri.jpg?v=11',
  './assets/images/tapkeshwar.jpg?v=11',
  './assets/images/mallroad.jpg?v=11',
  './assets/images/kempty.jpg?v=11',
  './assets/images/gunhill.jpg?v=11',
  './assets/images/camelsback.jpg?v=11',
  './assets/images/chardukan.jpg?v=11',
  './assets/images/laltibba.jpg?v=11',
  './assets/images/georgeeverest.jpg?v=11',
  './assets/images/cloudsend.jpg?v=11',
  './assets/images/surkanda.jpg?v=11',
  './assets/images/mountain_drive.jpg?v=11',
  './assets/images/gangabeach.jpg?v=11',
  './assets/images/parmarth.jpg?v=11',
  './assets/images/rafting.jpg?v=11',
  './assets/images/bungee.jpg?v=11',
  './assets/images/freedom_cafe.jpg?v=11',
  './assets/images/ramjhula.jpg?v=11',
  './assets/images/teramanzil.jpg?v=11',
  './assets/images/beatles.jpg?v=11',
  './assets/images/trivenighat.jpg?v=11',
  './assets/images/kunjapuri.jpg?v=11',
  './assets/images/neelkanth.jpg?v=11',
  './assets/images/harkipauri.jpg?v=11',
  './assets/images/mohanji_puri.jpg?v=11',
  './assets/images/chandidevi.jpg?v=11',
  './assets/images/motibazaar.jpg?v=11'
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

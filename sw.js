const CACHE_NAME = 'uttarakhand-trip-v10';
const ASSETS_TO_CACHE = [
  './',
  './index.html?v=10',
  './manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  './assets/images/airport.jpg?v=10',
  './assets/images/sahastradhara.jpg?v=10',
  './assets/images/dehradun_thali.jpg?v=10',
  './assets/images/mindrolling.jpg?v=10',
  './assets/images/fri.jpg?v=10',
  './assets/images/tapkeshwar.jpg?v=10',
  './assets/images/mallroad.jpg?v=10',
  './assets/images/kempty.jpg?v=10',
  './assets/images/gunhill.jpg?v=10',
  './assets/images/camelsback.jpg?v=10',
  './assets/images/chardukan.jpg?v=10',
  './assets/images/laltibba.jpg?v=10',
  './assets/images/georgeeverest.jpg?v=10',
  './assets/images/cloudsend.jpg?v=10',
  './assets/images/surkanda.jpg?v=10',
  './assets/images/mountain_drive.jpg?v=10',
  './assets/images/gangabeach.jpg?v=10',
  './assets/images/parmarth.jpg?v=10',
  './assets/images/rafting.jpg?v=10',
  './assets/images/bungee.jpg?v=10',
  './assets/images/freedom_cafe.jpg?v=10',
  './assets/images/ramjhula.jpg?v=10',
  './assets/images/teramanzil.jpg?v=10',
  './assets/images/beatles.jpg?v=10',
  './assets/images/trivenighat.jpg?v=10',
  './assets/images/kunjapuri.jpg?v=10',
  './assets/images/neelkanth.jpg?v=10',
  './assets/images/harkipauri.jpg?v=10',
  './assets/images/mohanji_puri.jpg?v=10',
  './assets/images/chandidevi.jpg?v=10',
  './assets/images/motibazaar.jpg?v=10'
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

const CACHE_NAME = 'uttarakhand-trip-v8';
const ASSETS_TO_CACHE = [
  './',
  './index.html?v=8',
  './manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  './assets/images/airport.jpg?v=8',
  './assets/images/sahastradhara.jpg?v=8',
  './assets/images/dehradun_thali.jpg?v=8',
  './assets/images/mindrolling.jpg?v=8',
  './assets/images/fri.jpg?v=8',
  './assets/images/tapkeshwar.jpg?v=8',
  './assets/images/mallroad.jpg?v=8',
  './assets/images/kempty.jpg?v=8',
  './assets/images/gunhill.jpg?v=8',
  './assets/images/camelsback.jpg?v=8',
  './assets/images/chardukan.jpg?v=8',
  './assets/images/laltibba.jpg?v=8',
  './assets/images/georgeeverest.jpg?v=8',
  './assets/images/cloudsend.jpg?v=8',
  './assets/images/surkanda.jpg?v=8',
  './assets/images/mountain_drive.jpg?v=8',
  './assets/images/gangabeach.jpg?v=8',
  './assets/images/parmarth.jpg?v=8',
  './assets/images/rafting.jpg?v=8',
  './assets/images/bungee.jpg?v=8',
  './assets/images/freedom_cafe.jpg?v=8',
  './assets/images/ramjhula.jpg?v=8',
  './assets/images/teramanzil.jpg?v=8',
  './assets/images/beatles.jpg?v=8',
  './assets/images/trivenighat.jpg?v=8',
  './assets/images/kunjapuri.jpg?v=8',
  './assets/images/neelkanth.jpg?v=8',
  './assets/images/harkipauri.jpg?v=8',
  './assets/images/mohanji_puri.jpg?v=8',
  './assets/images/chandidevi.jpg?v=8',
  './assets/images/motibazaar.jpg?v=8'
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

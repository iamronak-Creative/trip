const CACHE_NAME = 'uttarakhand-trip-v6';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  './assets/images/airport.jpg',
  './assets/images/sahastradhara.jpg',
  './assets/images/dehradun_thali.jpg',
  './assets/images/mindrolling.jpg',
  './assets/images/fri.jpg',
  './assets/images/tapkeshwar.jpg',
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
  './assets/images/harkipauri.jpg',
  './assets/images/mohanji_puri.jpg',
  './assets/images/chandidevi.jpg',
  './assets/images/motibazaar.jpg'
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

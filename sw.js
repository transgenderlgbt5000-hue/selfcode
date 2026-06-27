const CACHE_NAME = 'site-cache-v2';
const ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/sw.js',
  '/images/w-icon-192.png',
  '/images/w-icon-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS).catch(() => {}))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
          return null;
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const respClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, respClone));
        return response;
      })
      .catch(() => caches.match(event.request).then((r) => r || caches.match('/')))
  );
});

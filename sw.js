const CACHE_NAME = 'th-staff-app-v2';
const APP_SHELL = [
  '/',
  '/index.html',
  '/service-calculator.html',
  '/serial-queue.html',
  '/task-manager.html',
  '/station-checklist.html',
  '/notes.html',
  '/requirements.html',
  '/products.html',
  '/product-requests.html',
  '/settings.html',
  '/shared.js',
  '/nav.js',
  '/auth.js',
  '/manifest.json',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL).catch((err) => {
        console.warn('PWA pre-cache notice:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) {
            return caches.delete(k);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests and non-firebase/non-external requests
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  
  // Skip external APIs (firebase, google fonts, etc.)
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          }).catch(() => {});
        }
        return networkResponse;
      }).catch(() => {
        if (cachedResponse) return cachedResponse;
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('Network offline', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'text/plain' }
        });
      });
    })
  );
});

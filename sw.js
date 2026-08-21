/* Offline shell. Bump CACHE when assets change. */
const CACHE = 'jamal-v4';
const ASSETS = ['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-180.png',
  './icon-192.png','./icon-512.png','./css/app.css','./js/app.js','./js/data.js','./js/store.js'];

self.addEventListener('install', e => {
  /* {cache:'reload'} matters: a plain addAll() fetches through the HTTP cache, so a
     brand-new cache can be filled with the files it was created to replace. */
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const { request } = e;
  if (request.method !== 'GET') return;
  if (request.mode === 'navigate') {
    e.respondWith(fetch(request)
      .then(r => { caches.open(CACHE).then(c => c.put('./index.html', r.clone())); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(request).then(hit => hit || fetch(request).then(r => {
    if (r.ok && new URL(request.url).origin === location.origin) {
      const copy = r.clone(); caches.open(CACHE).then(c => c.put(request, copy));
    }
    return r;
  }).catch(() => hit)));
});

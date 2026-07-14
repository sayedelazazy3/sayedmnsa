
const CACHE='azzazy-v150-FIXED-2COL-V3';
const ASSETS=['./','./index.html?v=150final2','./manifest.json?v=150final2','./icon-192.png?v=2','./icon-512.png?v=2'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});

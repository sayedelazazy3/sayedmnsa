const CACHE='sayed-v10-real-links-fixed-01009450493';
self.addEventListener('install',e=>{self.skipWaiting();console.log('SW v10 install - real links');});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>{console.log('deleting',k);return caches.delete(k);}))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request).then(r=>r.clone()).catch(()=>caches.match(e.request)));});

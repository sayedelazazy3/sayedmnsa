const CACHE='sayed-v13-INSTALL-FIXED-01009450493';
self.addEventListener('install',e=>{
  self.skipWaiting();
  console.log('SW v13 install - INSTALL FIXED');
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html?v=13','./manifest.json?v=13','./icon-192.png','./icon-512.png']).catch(()=>{})));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>{
    if(k!==CACHE){console.log('deleting old cache that breaks install',k);return caches.delete(k);}
  }))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  e.respondWith(fetch(e.request).then(r=>{caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r;}).catch(()=>caches.match(e.request)));
});

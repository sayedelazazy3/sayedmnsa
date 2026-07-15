const CACHE='sayed-v12-install-FIXED-01009450493';
self.addEventListener('install',e=>{
  self.skipWaiting();
  console.log('SW v12 - install fixed');
  e.waitUntil(
    caches.open(CACHE).then(cache=>{
      return cache.addAll(['./','./index.html?v=12','./manifest.json?v=12','./icon-192.png','./icon-512.png']).catch(err=>console.log('cache add fail',err));
    })
  );
});
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(k=>{
      if(k!==CACHE){
        console.log('deleting old cache',k);
        return caches.delete(k);
      }
    }))).then(()=>self.clients.claim())
  );
});
self.addEventListener('fetch',e=>{
  e.respondWith(
    fetch(e.request).then(r=>{
      const clone=r.clone();
      caches.open(CACHE).then(c=>c.put(e.request,clone));
      return r;
    }).catch(()=>caches.match(e.request))
  );
});

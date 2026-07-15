const CACHE='sayed-v11-install-fixed-01009450493';
self.addEventListener('install',e=>{
  self.skipWaiting();
  console.log('SW v11 install - fix install button');
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html?v=11','./manifest.json?v=11']).catch(()=>{})));
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
      let clone=r.clone();
      caches.open(CACHE).then(c=>c.put(e.request,clone));
      return r;
    }).catch(()=>caches.match(e.request))
  );
});

// v17.7 NO-CACHE - الصفحة الرئيسية برامج ذكاء مجاني - مفيش كاش تاني
const NC='azzazy-v177-AI-HUB-NO-CACHE-01009450493';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>caches.delete(k)))));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>{if(k!==NC)return caches.delete(k);}))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request)));});

const C='tc-v4';const F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','supabase.js'];
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(x){d={body:e.data?e.data.text():''}}
e.waitUntil(self.registration.showNotification(d.title||'Training Club',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:d.tag||'tc',renotify:true,data:{url:d.url||'./'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return clients.openWindow((e.notification.data&&e.notification.data.url)||'./')}))});
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});

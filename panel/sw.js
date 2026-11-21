const C='tcp-v24';const F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','supabase.js'];
const VIB={motivacion:[60,40,60,40,160],rutina:[120,60,120],cuota:[200,100,200],pago:[80,50,80,50,80]};
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(x){d={body:e.data?e.data.text():''}}
const tag=d.tag||'tc';
e.waitUntil(Promise.all([self.registration.showNotification(d.title||'Training Club',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:tag,renotify:true,vibrate:VIB[tag]||[100,60,100],timestamp:Date.now(),data:{url:d.url||'./'}}),
clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>l.forEach(c=>c.postMessage({tc:'push',tag:tag,title:d.title||''})))]))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return clients.openWindow((e.notification.data&&e.notification.data.url)||'./')}))});
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;let u;try{u=new URL(q.url)}catch(x){return}if(u.origin!==self.location.origin)return;
const nav=q.mode==='navigate'||/\/(index\.html)?$/.test(u.pathname);
const guarda=r=>{if(r&&r.ok&&r.type==='basic'){const cp=r.clone();caches.open(C).then(c=>c.put(nav?'index.html':q,cp)).catch(()=>{})}return r};
const copia=()=>nav?caches.match('index.html').then(r=>r||caches.match('./')).then(r=>r||caches.match(q)):caches.match(q);
const red=fetch(nav?new Request(u.href,{cache:'no-cache',credentials:'same-origin'}):q).then(guarda);
if(!nav){e.respondWith(red.catch(()=>copia().then(r=>r||Response.error())));return}
e.respondWith(new Promise(ok=>{let listo=false;const fin=r=>{if(!listo&&r){listo=true;ok(r)}};
red.then(fin,()=>copia().then(r=>{if(r)fin(r);else if(!listo){listo=true;ok(Response.error())}}));
setTimeout(()=>{copia().then(fin)},6000)}))});

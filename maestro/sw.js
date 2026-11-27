/* Panel general de Forge Studio: se instala como app. Siempre busca la versión nueva y, sin internet, abre la última guardada. */
const C='fsm-v1';const P='fsm';
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(['./','manifest.webmanifest','icon-192.png','icon-512.png'])).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x.slice(0,x.lastIndexOf('-v'))===P).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;const u=new URL(q.url);if(u.origin!==location.origin||!u.pathname.startsWith(new URL('./',self.registration.scope).pathname))return;
e.respondWith(fetch(q,{cache:'no-cache'}).then(r=>{if(r.ok&&r.type==='basic'){const cp=r.clone();caches.open(C).then(c=>c.put(q.mode==='navigate'?'./':q,cp))}return r}).catch(()=>caches.match(q.mode==='navigate'?'./':q)))});

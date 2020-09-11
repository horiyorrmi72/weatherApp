const CACHE_NAME = 'SITE CONTENT_V2';

const urlsToCache = [
    '/service-workers/404.html',
    '/src/index.html',
    ];
   
    self.addEventListener('install', installer => {
        console.log('installing');

        const done = async () => {
            const cache = await caches.open(CACHE_NAME);
            return cache.addAll(urlsToCache);
        };
        installer.waitUntil(done());
    });
     self.addEventListener('fetch', fetchEvent => {
         const url = fetchEvent.request.url;
         console.log(`Fetching: ${url}`);

         const getResponse = async (request) => {
             let response;
             response = await caches.match(request);
             if(response && response.status === 200) {
                 console.log('File in cache. Returning cached version.');
                 return response;
             }
             try{
                 response = await fetch(request);
                 if(reponse && response.status === 400) {
                     return caches.match('/service-workers/404.html');
                 }
             }catch (e) {
                 return caches.match('/service-workers/offline.html')
             }

             const clone = response.clone();
             const cache = await caches.open(CACHE_NAME);
             cache.put(url,clone);
             return response;
         };

         fetchEvent.respondWith(getResponse(fetchEvent.request));
     });

     self.addEventListener('activate', activator => {
         console.log('Activating');
         const currentCaches = [CACHE_NAME];
         const done = async () => {
             const names = await caches.keys();
             return Promise.all(names.map(name => {
                 if(!currentCaches.includes(name)) {
                     return caches.delete(name);
                 }
             }));
         };
         activator.waitUntil(done());
     });

    
/*
//asignar nombre y version de cache
const CACHE_NAME = 'v1_cache_awp';

//configurar los archivos del cache

var urlToCache = [
    './',
    './css/style.css',
    './css/normalize.css',
    './img/close.png',
    './img/Microsoft_Azure.svg.png',
    './img/microsoft-logo.png',
    './img/Microsoft-slide.jpg',
    './img/windows-logo.png',
    './img/xbox-logo.jpg',
    './img/menu-logo.png',
];

// Evento install
// Instalacion del service worker y guardar en cache los recursos estaticos
self.addEventListener('install', e =>{
    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => {
                    return cache.addAll(urlToCache)
                           .then(() => {
                                self.skipWaiting();
                           })
                 })
                 .catch(err => {
                    console.log('No se ha registrado el cache', err);
                   })
    )
});

//Evento activate
self.addEventListener('activate', e =>{
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
              .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if(cacheWhiteList.indexOf(cacheName) === -1){
                            // Borrar los elementos q no se necesitan
                            return caches.delete(cacheName);
                        }
                    })
                );
              })
              .then(() =>{
                //activar la cache
                self.clients.claim();
              })
    );
});

//Evento fetch

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    //devuelvo los datos desde cache
                    return res;
                }
                return fetch(e.request);
            })
    );
})*/
/*self.addEventListener("fetch", event => {
    if (event.request.url.includes("style.css")) {
        event.respondWidth(null);
    } else {
        event.respondWidth(fetch(event.request));
    }
})*/

self.addEventListener("install", e => {
    caches.open("cache-v1")
        .then(cache => {
            cache.addAll([
                './',
                './index.html',
                './css/style.css',
                './css/normalize.css',
                './img/close.png',
                './img/Microsoft_Azure.svg.png',
                './img/microsoft-logo.png',
                './img/Microsoft-slide.jpg',
                './img/windows-logo.png',
                './img/xbox-logo.jpg',
                './img/menu-logo.png',
                './video/azure_video.mp4',
                './video/windows_video.mp4',
                './video/Xbox_videos.mp4'
            ])
        });
    e.waitUntil(cacheProm);
});

/*self.addEventListener("fetch", e =>{
    e.respondWith(caches.match( e.request ));
});*/

self.addEventListener('fetch', e =>{
    //cache with network fallback
    const respuesta = caches.match( e.request )
        .then ( res => {
            if ( res ) return res;
            //no existe el archivo
            //tengo que ir a la web
            console.log('No existe', e.request.url);
            return fetch( e.request ).then ( newResp => {
                caches.open('cache-v1')
                    .then( cache => {
                        cache.put( e.request, newResp);
                    }

                    )
                return newResp.clone;
            });
        });
        e.respondWith(respuesta);
    //only cache
    //e.respondWith( caches.match(e.request));
});
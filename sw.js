self.addEventListener("install", e => {
    caches.open("cache-v1")
        .then(cache => {
            cache.addAll([
                'index.html',
                'css/style.css',
                'css/normalize.css',
                'img/close.png',
                'img/Microsoft_Azure.svg.png',
                'img/microsoft-logo.png',
                'img/Microsoft-slide.jpg',
                'img/windows-logo.png',
                'img/xbox-logo.jpg'
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

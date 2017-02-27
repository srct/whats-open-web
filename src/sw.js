var CACHE = 'whats-open-cache';
var urlsToCache = [
    '/',
    '/assets/Bking.jpg',
    '/inline.bundle.js',
    '/polyfills.bundle.js',
    '/scripts.bundle.js',
    '/styles.bundle.js',
    '/vendor.bundle.js',
    '/main.bundle.js'
];

self.addEventListener('install', function (evt) {
    // Perform install steps
    evt.waitUntil(precache());
    console.log('The service worker is being installed.');

});

function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll(urlsToCache);
    });
}
// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request)
//         .then(function (response) {
//             // Cache hit - return response
//             if (response) {
//                 return response;
//             }

//             // IMPORTANT: Clone the request. A request is a stream and
//             // can only be consumed once. Since we are consuming this
//             // once by cache and once by the browser for fetch, we need
//             // to clone the response.
//             var fetchRequest = event.request.clone();
//             return fetch(fetchRequest).then(
//                 (response) => {
//                     // Check if we received a valid response
//                     if (!response || response.status !== 200 || response.type !== 'basic') {
//                         return response;
//                     }

//                     // IMPORTANT: Clone the response. A response is a stream
//                     // and because we want the browser to consume the response
//                     // as well as the cache consuming the response, we need
//                     // to clone it so we have two streams.
//                     if(event.request.url.search('sockjs-node') === -1){
//                     var responseToCache = response.clone();
//                     caches.open(CACHE_NAME)
//                         .then(function (cache) {
//                             cache.put(event.request, responseToCache);
//                         });
//                     }
//                     return response;
//                 }

//             );
//             // }
//         })
//     );
// });
self.addEventListener('fetch', function (evt) {
    console.log('The service worker is serving the asset.');
    evt.respondWith(fromCache(evt.request));

    evt.waitUntil(update(evt.request));
});

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            if(matching){
            return matching || null;
            }
             return fetch(request).then(function (response) {
                return response;
            });
        });
    });
}

function update(request) {
    if (request.url.search('sockjs-node') === -1) {
        return caches.open(CACHE).then(function (cache) {
            return fetch(request).then(function (response) {
                return cache.put(request, response);
            });
        });
    }
    return Promise.resolve();
}
// this probably wont be used but this whitelists caches so if i want to use multiple they are not destroyed
// when a new service worker takes control
self.addEventListener('activate', function (event) {

    // var cacheWhitelist = ['whats-open-cache'];

    // event.waitUntil(
    //     caches.keys().then(function (cacheNames) {
    //         return Promise.all(
    //             cacheNames.map(function (cacheName) {
    //                 if (cacheWhitelist.indexOf(cacheName) === -1) {
    //                     return caches.delete(cacheName);
    //                 }
    //             })
    //         );
    //     })
    // );
});

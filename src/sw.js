var CACHE_NAME = 'whats-open-cache';
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

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});
// self.addEventListener('foreignfetch', event => {
// 	event.respondWith(fetch(event.request).then(response => {
// 		return {
// 			response: response,
// 			origin: event.origin,
// 			headers: ['Content-Type']
// 		}
// 	}));
// });
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            // Cache hit - return response
            if (response) {
                return response;
            }

            // IMPORTANT: Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            // if (event.request.url === 'https://whatsopen.gmu.edu/api/facilities/') {
            var fetchRequest = event.request.clone();
            fetchRequest.cache = 'only-if-cached';
            return fetch(fetchRequest).then(
                (response) => {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                   
                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have two streams.
                    var responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(function (cache) {
                            cache.put(event.request, responseToCache);
                        });
                    return response;
                }

            );
            // }
        })
    );
});
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

// function Load(url) {
// 	return new Promise(function (resolve, reject) {
// 		var request = new HttpRequest();
// 		request.open('GET', url);
// 		request.responseType = 'blob';

// 		request.onload = function () {
// 			if (request.status == 200) {
// 				resolve(request.response);
// 			} else {
// 				reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
// 			}
// 		};

// 		request.onerror = function () {
// 			reject(Error('There was a network error.'));
// 		};

// 		request.send();
// 	});
// }




/*
 * Callbacks for network and cache fetches
 */
function handleFetchCompletion(res) {

    var resClone = res.clone();
    caches.open(cacheName).then(function (cache) {
        cache.put(dataUrl, resClone);
    });

}


function handleCacheFetchCompletion(res) {

}


/*
 * This is the heart of the demo. Whenever the user clicks the
 * button, we'll make simultaneous (or nearly-simultaneous) requests
 * of the cache and the network for data. In a real application, this
 * would probably happen on page load rather than as a result of
 * user action, but to make the page more illustrative and allow
 * for user-specified delays, we've got a button.
 */
// getDataButton.addEventListener('click', function handleClick() {
//     var networkFetch = fetch(dataUrl, {
//         mode: 'cors',
//         cache: 'no-cache',
//     }).then(function (res) {

//         return new Promise(function (resolve, reject) {
//             setTimeout(function () {
//                 try {
//                     handleFetchCompletion(res);
//                     resolve();
//                 } catch (err) {
//                     reject(err);
//                 }
//             }, 0);
//         });
//     });

//     var cacheFetch = caches.open(cacheName).then(function (cache) {
//         return cache.match(dataUrl).then(function (res) {
//             var cacheDelay = cach9eDelayInput.value || 0;


//             return new Promise(function (resolve, reject) {
//                 setTimeout(function () {
//                     try {
//                         handleCacheFetchCompletion(res);
//                         resolve();
//                     } catch (err) {
//                         reject(err);
//                     }
//                 }, cacheDelay);
//             });
//         }).then(function () {
//             var now = Date.now();
//             var elapsed = now - cacheFetchStartTime;
//             cacheStatus.textContent = 'Success after ' + elapsed + 'ms';
//         }).catch(function (err) {
//             var now = Date.now();
//             var elapsed = now - cacheFetchStartTime;
//             cacheStatus.textContent = err + ' after ' + elapsed + 'ms';
//         });
//     });

//     Promise.all([networkFetch, cacheFetch]).then(enableUI);
// });

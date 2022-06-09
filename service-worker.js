const APP_PREFIX = "FoodFest-";
const VERSION = "version_01";
const CACHE_NAME = APP_PREFIX + VERSION;
// images aren't included because there is a cache limit and we prioritized the JS and HTML files
const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
];


// service workers run before the window object has been created so we use self (the service worker object) instead of window
self.addEventListener("install", function (e) {
    // wait until the work ic complete before terminating the service worker
    e.waitUntil(
        // finding the specific cache by name then add every file in the FILES_TO_CACHE array to the cache
        caches.open(CACHE_NAME).then(function (cache) {
            console.log("installing cache: " + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

self.addEventListener("activate", function (e) {
    e.waitUntil(
        // keys() returns an array of all cache names, which we're calling keyList
        // keyList is a parameter that contains all cache names under the github pages
        caches.keys().then(function (keyList) {
            // because we may host many sites from the same URL, we should filter out caches that have the app prefix
            // we'll capture the ones that have the prefix, and save them to an array called cacheKeepList
            let cacheKeepList = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            });
            // add current cache
            cacheKeepList.push(CACHE_NAME)

            return Promise.all(
                keyList.map(function(key, i) {
                    if (cacheKeepList.indexOf(key) === -1) {
                        console.log("deleting cache : " + keyList[i]);
                        return caches.delete(keyList[i]);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function (e) {
    console.log("fetch request : " + e.request.url)
    // adding the respondWith method on the event object to intercept the fetch request
    // then it checks to see if the request is stored in the cache.  If yes then it will deliver the resource directly
    // from the cache, otherwise the resource will be retrieved normally 
    e.respondWith(
        // using .match() to determine if the resource already exists in caches
        caches.match(e.request).then(function (request) {
            if (request) {
                console.log("responding with cache: " + e.request.url)
                return request
            } else {
                console.log("file is not cached, fetching : " + e.request.url)
                return fetch(e.request)
            }
        })
    )
})
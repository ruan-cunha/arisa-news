const CACHE_NAME = 'arisa-news-v1';
// Adicione todos os arquivos que seu app precisa para funcionar offline
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/news.js',
    '/images/icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
// sw.js - Service Worker untuk Millennia World School
// Progressive Web App dengan offline support

const CACHE_NAME = 'millennia-ws-v1';
const OFFLINE_URL = '/offline.html';

// Assets untuk pre-cache (critical resources)
const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/offline.html',
    '/Millennia.svg',
    '/manifest.json',
    // Add critical CSS/JS here
];

// Install event - pre-cache critical assets
self.addEventListener('install', (event) => {
    console.log('[SW] Install');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Pre-caching offline page');
                return cache.addAll(PRECACHE_URLS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activate');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Clone response untuk cache
                if (response.status === 200) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return response;
            })
            .catch(() => {
                // Network failed, try cache
                return caches.match(event.request)
                    .then((cachedResponse) => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }

                        // For navigation requests, return offline page
                        if (event.request.mode === 'navigate') {
                            return caches.match(OFFLINE_URL);
                        }

                        // For other requests, return a basic offline response
                        return new Response('Offline', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
            })
    );
});

// Handle push notifications (optional)
self.addEventListener('push', (event) => {
    console.log('[SW] Push Received');

    const options = {
        body: event.data ? event.data.text() : 'New update from Millennia World School',
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View',
                icon: '/check-icon.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/close-icon.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Millennia World School', options)
    );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Notification click Received.');

    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('https://millenniaws.sch.id/')
        );
    }
});

// Background sync (optional - for offline form submissions)
self.addEventListener('sync', (event) => {
    console.log('[SW] Background sync:', event.tag);

    if (event.tag === 'sync-forms') {
        event.waitUntil(syncForms());
    }
});

// Sync offline form submissions
async function syncForms() {
    try {
        const cache = await caches.open('form-submissions');
        const requests = await cache.keys();

        await Promise.all(
            requests.map(async (request) => {
                try {
                    const response = await fetch(request.clone());
                    if (response.ok) {
                        await cache.delete(request);
                    }
                } catch (error) {
                    console.error('[SW] Form sync failed:', error);
                }
            })
        );
    } catch (error) {
        console.error('[SW] Sync forms error:', error);
    }
}

// Message handler untuk manual cache update
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.addAll(event.data.urls);
            })
        );
    }
});
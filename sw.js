/**
 * PhiLang Service Worker
 * Provides offline support and caching for the PhiLang application
 */

const CACHE_NAME = 'philang-v1.0.0';
const CACHE_VERSION = '1.0.0';

// Debug mode - set to false in production
const SW_DEBUG = false;
const swLog = (...args) => SW_DEBUG && console.log('[SW]', ...args);
const swWarn = (...args) => console.warn('[SW]', ...args);
const swError = (...args) => console.error('[SW]', ...args);

// Files to cache for offline use
const STATIC_ASSETS = [
    './',
    './index.html',
    './derivation_graph.html',
    './socratic_counsel.html',
    './dialectical_dialogue.html',
    './philang_embeddings.html',
    './philang_embeddings_advanced.html',

    // Core scripts (load order matters)
    './philang_config.js',
    './philang_security.js',
    './philang_api.js',
    './philang_persistence.js',
    './philang_toast.js',
    './philang_shortcuts.js',
    './philang_ontology.js',
    './philang_skeleton.js',
    './philang_export.js',
    './philang_urlstate.js',
    './philang_ui.js',

    // Styles
    './philang-theme.css',

    // External dependencies (will be cached on first load)
    'https://cdn.tailwindcss.com',
    'https://d3js.org/d3.v7.min.js',
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
];

// Cache strategies
const CACHE_STRATEGIES = {
    // Cache first, then network (for static assets)
    cacheFirst: async (request) => {
        const cached = await caches.match(request);
        if (cached) return cached;

        try {
            const response = await fetch(request);
            if (response.ok) {
                const cache = await caches.open(CACHE_NAME);
                cache.put(request, response.clone());
            }
            return response;
        } catch (error) {
            return new Response('Offline - Resource not available', {
                status: 503,
                statusText: 'Service Unavailable'
            });
        }
    },

    // Network first, then cache (for dynamic content)
    networkFirst: async (request) => {
        try {
            const response = await fetch(request);
            if (response.ok) {
                const cache = await caches.open(CACHE_NAME);
                cache.put(request, response.clone());
            }
            return response;
        } catch (error) {
            const cached = await caches.match(request);
            if (cached) return cached;

            return new Response('Offline - Resource not available', {
                status: 503,
                statusText: 'Service Unavailable'
            });
        }
    },

    // Stale while revalidate (for fonts, images)
    staleWhileRevalidate: async (request) => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(request);

        const fetchPromise = fetch(request).then(response => {
            if (response.ok) {
                cache.put(request, response.clone());
            }
            return response;
        }).catch(() => cached);

        return cached || fetchPromise;
    }
};

// Install event - cache static assets
self.addEventListener('install', event => {
    swLog('Installing PhiLang Service Worker...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                swLog('Caching static assets...');
                // Cache local assets first (these should always succeed)
                const localAssets = STATIC_ASSETS.filter(url => !url.startsWith('http'));
                return cache.addAll(localAssets);
            })
            .then(() => {
                swLog('Static assets cached');
                return self.skipWaiting();
            })
            .catch(error => {
                swError('Cache installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    swLog('Activating PhiLang Service Worker...');

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(name => name !== CACHE_NAME)
                        .map(name => {
                            swLog('Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                swLog('Service Worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip chrome-extension and other non-http(s) requests
    if (!url.protocol.startsWith('http')) return;

    // API calls (Claude API) - network only, don't cache
    if (url.hostname === 'api.anthropic.com') {
        return; // Let it pass through without interception
    }

    // Determine caching strategy based on resource type
    let strategy;

    if (request.destination === 'document' || url.pathname.endsWith('.html')) {
        // HTML pages - network first
        strategy = CACHE_STRATEGIES.networkFirst;
    } else if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
        // Scripts and styles - cache first
        strategy = CACHE_STRATEGIES.cacheFirst;
    } else if (url.hostname.includes('fonts.googleapis.com') ||
               url.hostname.includes('fonts.gstatic.com')) {
        // Fonts - stale while revalidate
        strategy = CACHE_STRATEGIES.staleWhileRevalidate;
    } else if (request.destination === 'image') {
        // Images - cache first
        strategy = CACHE_STRATEGIES.cacheFirst;
    } else if (url.hostname !== self.location.hostname) {
        // External resources - stale while revalidate
        strategy = CACHE_STRATEGIES.staleWhileRevalidate;
    } else {
        // Default - cache first
        strategy = CACHE_STRATEGIES.cacheFirst;
    }

    event.respondWith(strategy(request));
});

// Handle messages from the main thread
self.addEventListener('message', event => {
    const { type, payload } = event.data || {};

    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;

        case 'GET_VERSION':
            event.ports[0].postMessage({ version: CACHE_VERSION });
            break;

        case 'CLEAR_CACHE':
            caches.delete(CACHE_NAME).then(() => {
                event.ports[0].postMessage({ success: true });
            });
            break;

        case 'CACHE_URLS':
            if (payload && Array.isArray(payload.urls)) {
                caches.open(CACHE_NAME).then(cache => {
                    cache.addAll(payload.urls);
                });
            }
            break;
    }
});

// Background sync for pending operations (when online again)
self.addEventListener('sync', event => {
    if (event.tag === 'sync-pending') {
        swLog('Background sync triggered');
        // Could implement sync of pending API calls here
    }
});

// Push notifications (for future use)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body || 'New philosophical insight available',
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            data: data.url || '/'
        };

        event.waitUntil(
            self.registration.showNotification(data.title || 'PhiLang', options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();

    event.waitUntil(
        clients.openWindow(event.notification.data || '/')
    );
});

swLog('PhiLang Service Worker loaded');

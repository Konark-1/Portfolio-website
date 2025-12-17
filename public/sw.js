// Service Worker for Portfolio Website
// Implements caching strategies for optimal performance

const CACHE_VERSION = 'v1';
const CACHE_NAME = `portfolio-cache-${CACHE_VERSION}`;

// Assets to cache on install
const STATIC_CACHE_URLS = [
  '/',
  '/manifest.json',
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Static assets - Cache first, fallback to network
  static: /\/_next\/static\/.*/,
  
  // Images - Cache first with stale-while-revalidate
  images: /\.(png|jpg|jpeg|gif|webp|avif|svg|ico)$/,
  
  // Fonts - Cache first (immutable)
  fonts: /\.(woff|woff2|ttf|otf|eot)$/,
  
  // PDFs - Cache first with revalidation
  pdfs: /\.pdf$/,
  
  // API routes - Network first, fallback to cache
  api: /\/api\/.*/,
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_CACHE_URLS);
    }).then(() => {
      // Force activation of new service worker
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip caching for:
  // 1. Chrome extensions
  // 2. Non-HTTP(S) requests
  // 3. PowerBI embeds (as requested - don't modify)
  if (
    url.protocol !== 'http:' && url.protocol !== 'https:' ||
    url.hostname.includes('chrome-extension') ||
    url.hostname.includes('powerbi.com') ||
    url.hostname.includes('fabric.microsoft.com')
  ) {
    return;
  }
  
  // Determine caching strategy
  if (CACHE_STRATEGIES.static.test(url.pathname)) {
    // Static assets - Cache first
    event.respondWith(cacheFirst(request));
  } else if (CACHE_STRATEGIES.images.test(url.pathname)) {
    // Images - Stale while revalidate
    event.respondWith(staleWhileRevalidate(request));
  } else if (CACHE_STRATEGIES.fonts.test(url.pathname)) {
    // Fonts - Cache first (immutable)
    event.respondWith(cacheFirst(request));
  } else if (CACHE_STRATEGIES.pdfs.test(url.pathname)) {
    // PDFs - Cache first with revalidation
    event.respondWith(staleWhileRevalidate(request));
  } else if (CACHE_STRATEGIES.api.test(url.pathname)) {
    // API routes - Network first
    event.respondWith(networkFirst(request));
  } else {
    // Default - Network first for HTML pages
    event.respondWith(networkFirst(request));
  }
});

// Cache first strategy
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response('Offline - No cached version available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Network first strategy
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    return new Response('Offline - No network connection', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  // Fetch in background regardless
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cached); // Fallback to cached if fetch fails
  
  // Return cached immediately if available, otherwise wait for fetch
  return cached || fetchPromise;
}

// Message handling for cache management
self.addEventListener('message', (event) => {
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

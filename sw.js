// Service Worker para Tudo Cell - PWA
const CACHE_NAME = "tudo-cell-v1.0.0";
const urlsToCache = [
  "/",
  "/index.html",
  "/css/style.css",
  "/css/extras.css",
  "/css/effects.css",
  "/css/polish.css",
  "/js/script.js",
  "/js/config.js",
  "/js/advanced.js",
  "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Cache aberto");
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error("Service Worker: Erro ao fazer cache:", error);
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(() => {
        // If both fail, return offline page
        return caches.match("/index.html");
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log("Service Worker: Removendo cache antigo:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "contact-form-sync") {
    event.waitUntil(
      // Handle background sync for contact forms
      console.log("Background sync: Contact form")
    );
  }
});

// Push notification handler
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Nova promoção disponível!",
    icon: "/icon-192x192.png",
    badge: "/badge-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Ver Promoções",
        icon: "/icon-check.png",
      },
      {
        action: "close",
        title: "Fechar",
        icon: "/icon-close.png",
      },
    ],
  };

  event.waitUntil(self.registration.showNotification("Tudo Cell", options));
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked:", event.notification.tag);

  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  }
});

console.log("Service Worker: Tudo Cell PWA ativo");

self.addEventListener('push', (event) => {
  console.log('📬 Push recibido:', event);

  const data = event.data?.json() || {
    title: 'Notificación',
    body: 'Contenido vacío',
    url: 'https://andynaistat.github.io/poc_push_notifications/',
  };

  const options = {
    body: data.body,
    icon: '/poc_push_notifications/icon.png',
    badge: '/poc_push_notifications/icon.png',
    vibrate: [200, 50, 100],
    tag: 'demo',
    data: {
      url: data.url, // 👉 esto nos servirá en el click
    },
    actions: [
      {
        action: 'open',
        title: 'Abrir sitio',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// 👇 Abrir el sitio al hacer clic
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // 👈 cerrar la notificación al hacer clic

  const urlToOpen = event.notification.data?.url || 'https://andynaistat.github.io/poc_push_notifications/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

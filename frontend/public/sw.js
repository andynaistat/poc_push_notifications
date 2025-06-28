self.addEventListener('push', (event) => {
  console.log('📬 Push recibido:', event);

  const data = event.data?.json() || {
    title: 'Notificación',
    body: 'Contenido vacío',
    url: 'https://andynaistat.github.io/poc_push_notifications/',
  };

  const options = {
    body: data.body,
    icon: '/poc_push_notifications/icon.png',  // Ajusta ruta a tu icono
    badge: '/poc_push_notifications/icon.png',
    vibrate: [100, 50, 100],
    tag: 'push-demo',
    data: {
      url: data.url,
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

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || 'https://andynaistat.github.io/poc_push_notifications/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.startsWith(urlToOpen) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

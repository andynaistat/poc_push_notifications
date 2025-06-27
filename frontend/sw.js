// sw.js
self.addEventListener('push', (event) => {
  console.log('📬 Push recibido:', event);

  const data = event.data?.json() || { title: 'Notificación', body: 'Contenido vacío' };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
    })
  );
});

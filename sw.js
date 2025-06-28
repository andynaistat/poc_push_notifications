self.addEventListener('push', (event) => {
  console.log('📬 Push recibido:', event);

  const data = event.data?.json() || {
    title: 'Notificación',
    body: 'Contenido vacío',
  };

  const options = {
    body: data.body,
    icon: `${self.registration.scope}icon.png`, // opcional: asegurate que exista en /public/
    vibrate: [100, 50, 100],
    tag: 'push-demo',
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

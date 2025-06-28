import { useState } from 'react';

const VAPID_PUBLIC_KEY = 'BKb3LSZGfNlj-Icg6sGWipj4Ac0Pge16YB5EqfBNSPC5bmqtVLDyzQ7sWhm_-IZNfLMUWzJeCpTbXXflSsQ_xzk';

async function subscribe() {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    alert('No se otorgaron permisos para notificaciones.');
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  console.log('Suscripción creada:', subscription);

  await fetch('https://4236-2800-a4-c1ef-9000-7859-52b0-3459-457b.ngrok-free.app/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  alert('Subscribed!');
}

function App() {
  return (
    <div>
      <h1>Push Notification POC</h1>
      <button onClick={subscribe}>📬 Suscribirse a notificaciones</button>
      <button onClick={sendTestNotification}>🚀 Enviar notificación de prueba</button>
    </div>
  );
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

async function sendTestNotification() {
  try {
    const res = await fetch('https://4236-2800-a4-c1ef-9000-7859-52b0-3459-457b.ngrok-free.app/send', {
      method: 'POST',
    });

    const data = await res.json();
    alert(data.message || 'Notificación enviada');
  } catch (error) {
    console.error('Error al enviar notificación:', error);
    alert('Error al enviar notificación');
  }
}


export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/poc_push_notifications/sw.js').then(() => {
    console.log('Service Worker registered');
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

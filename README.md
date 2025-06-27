# Push Notification POC

## Requisitos

- Node.js >= 18
- npm

## Claves VAPID

Generar con:

```
npx web-push generate-vapid-keys
```

Colocar en `.env` y reemplazar en el frontend (`App.jsx`).

## Instrucciones

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Probar en navegador móvil (usar `ngrok` para exponer el puerto si se necesita).

### Enviar notificación

```bash
curl -X POST http://localhost:3000/send
```

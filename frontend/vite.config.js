import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/poc_push_notifications/',
  server: {
    port: 5173,
    allowedHosts: [
      '4236-2800-a4-c1ef-9000-7859-52b0-3459-457b.ngrok-free.app'
    ]
  }
});

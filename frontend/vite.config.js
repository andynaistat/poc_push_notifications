import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    allowedHosts: [
      'f39e-2800-a4-c0e2-1500-cc77-1df4-d5c9-d8e5.ngrok-free.app'
    ]
  }
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  envDir: '.',
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // '0.0.0.0'
    port: 5173,
    watch: {
      usePolling: true,
    },
    allowedHosts: ['.nip.io', '.sslip.io'],
  },
});

/*
Usar DNS comodin 
Configurar DNS wildcard ya sea .nip.io o
.sslip.io o comprar un dominio propio
*/

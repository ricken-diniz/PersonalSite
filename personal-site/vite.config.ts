// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 8000,


    // 🔹 Garante que o HMR (hot reload) use o IP correto
    hmr: {
      host: '10.229.34.5',
      protocol: 'ws',
      port: 8000,
    },
  },
})

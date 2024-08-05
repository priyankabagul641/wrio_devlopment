import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('src/components')) {
            return 'components';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Suppress warnings for larger chunks
  },
  base: '/wrio', // Ensure your base URL is correct for your deployment
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      manifest: {
        name: 'WRIO',
        short_name: 'WRIO',
        description: 'WRIO',
        theme_color: '#ffffff',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
});

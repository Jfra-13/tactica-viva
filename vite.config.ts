import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vitest/config'
import { es } from './src/shared/i18n/es.ts'

// Mirrors --color-bg in tokens.css: the manifest cannot read CSS variables.
const backgroundColor = '#0b0e10'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Service worker only in the production build (pnpm build && pnpm preview).
    VitePWA({
      // The user decides when to reload: a toast offers the new version.
      registerType: 'prompt',
      includeAssets: ['logo.svg', 'apple-touch-icon.png'],
      manifest: {
        name: es.appName,
        short_name: es.appName,
        description: es.pwa.description,
        lang: 'es',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        // No orientation lock: tablets and laptops use landscape.
        theme_color: backgroundColor,
        background_color: backgroundColor,
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          // The logo keeps its content inside the maskable safe zone.
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // The whole shell, lazy chunks included, so it opens offline.
        globPatterns: ['**/*.{js,css,html,svg,png}'],
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            // Fira Sans and Fira Code come from Google Fonts until T9.1 (D-012).
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    // Unit tests only; tests/e2e belongs to Playwright.
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['src/test-setup.ts'],
  },
})

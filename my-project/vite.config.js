import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    target: 'es2015'
  },
  plugins: [
    VitePWA({
      manifest: {
        background_color: 'rgb(26, 26, 26);',
        display: 'standalone',
        icons: [
          {
            purpose: 'any',
            sizes: '192x192',
            src: 'manifest-icon-192.maskable.png',
            type: 'image/png'
          },
          {
            purpose: 'maskable',
            sizes: '192x192',
            src: 'manifest-icon-192.maskable.png',
            type: 'image/png'
          },
          {
            purpose: 'any',
            sizes: '512x512',
            src: 'manifest-icon-512.maskable.png',
            type: 'image/png'
          },
          {
            purpose: 'maskable',
            sizes: '512x512',
            src: 'manifest-icon-512.maskable.png',
            type: 'image/png'
          }
        ],
        name: 'Individuellt projekt, Mars och SpaceX',
        short_name: 'Mars',
        start_url: '.',
        theme_color: 'rgb(26, 26, 26)'
      },
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['assets/**', 'index.html', 'manifest.webmanifest'],
        runtimeCaching: [
          {
            handler: 'NetworkFirst',
            urlPattern: /https:\/\/api\.spacexdata\.com\/v4\/launches\/.+/i
          },
          {
            handler: 'NetworkFirst',
            urlPattern:
              /https:\/\/api\.nasa\.gov\/mars-photos\/api\/v1\/rovers\/.+/i
          }
        ]
      }
    }),
    vue()
  ]
})

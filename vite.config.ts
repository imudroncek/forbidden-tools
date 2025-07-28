import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,
    base: '/ft/',

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'Forbidden Tools',
      short_name: 'forbidden-tools',
      description: 'GM tools for Forbidden Lands TRPG',
      theme_color: '#1C6A73',
      background_color: '#1C6A73',
      //background_color: '#A9D1C1',
      start_url: '/ft/',
      scope: '/ft/',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})
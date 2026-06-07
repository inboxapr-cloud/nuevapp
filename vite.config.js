import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',

  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
      mangle: { toplevel: true },
      format: { comments: false },
    },
    rollupOptions: {
      output: {
        chunkFileNames:  'assets/[name]-[hash].js',
        entryFileNames:  'assets/[name]-[hash].js',
        assetFileNames:  'assets/[name]-[hash][extname]',
      },
    },
  },

  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['**/*'],
      workbox: {
        globPatterns: ['**/*.{js,css,html}'],
      },
      manifest: {
        name: 'MiCantón.cr',
        short_name: 'MiCantón',
        description: 'El portal de tu cantón',
        theme_color: '#1D9E75',
        background_color: '#F0EEE9',
        display: 'standalone',
        start_url: './',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],

  server: {
    port: 3000,
    open: true,
  },
});

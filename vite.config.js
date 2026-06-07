import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import legacy from '@vitejs/plugin-legacy';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => ({
  // ── Base path para Vercel / GitHub Pages ──
  base: '/',

  // ── Resolución de módulos ──
  resolve: {
    alias: {
      '@': '/src',
      '@data': '/src/data',
      '@modules': '/src/modules',
      '@utils': '/src/utils',
    },
  },

  // ── Build producción ──
  build: {
    outDir: 'dist',
    sourcemap: false,          // nunca en producción
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,    // quita console.log en producción
        drop_debugger: true,
        passes: 2,
      },
      mangle: {
        toplevel: true,        // ofusca nombres de funciones top-level
      },
      format: {
        comments: false,       // elimina comentarios
      },
    },
    rollupOptions: {
      output: {
        // ── Code splitting manual ──
        manualChunks: {
          'data':        ['./src/data/proveedores.js', './src/data/pros.js', './src/data/plantillas.js'],
          'mod-admin':   ['./src/modules/admin.js', './src/modules/cms.js'],
          'mod-catalog': ['./src/modules/catalog-public.js'],
          'mod-mkt':     ['./src/modules/marketing.js'],
        },
        // Nombres de chunk con hash para cache-busting
        chunkFileNames:  'assets/[name]-[hash].js',
        entryFileNames:  'assets/[name]-[hash].js',
        assetFileNames:  'assets/[name]-[hash][extname]',
      },
    },
    // Límite de warning para chunks (kb)
    chunkSizeWarningLimit: 500,
  },

  // ── PWA ──
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2}'],
        // Cachear fuentes e iconos externos
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts', expiration: { maxAgeSeconds: 60*60*24*365 } },
          },
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'jsdelivr-cdn', expiration: { maxAgeSeconds: 60*60*24*30 } },
          },
          {
            // API de Anthropic — NetworkFirst (no cachear respuestas de IA)
            urlPattern: /^https:\/\/api\.anthropic\.com\/.*/i,
            handler: 'NetworkOnly',
          },
        ],
      },
      manifest: {
        name: 'MiCantón.cr',
        short_name: 'MiCantón',
        description: 'El portal de tu cantón — negocios, noticias, empleos y más',
        theme_color: '#1D9E75',
        background_color: '#F0EEE9',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
          { name: 'Directorio', url: '/?mod=negocios', icons: [{ src: '/icons/icon-96.png', sizes: '96x96' }] },
          { name: 'Catálogo',   url: '/?mod=catalogo',  icons: [{ src: '/icons/icon-96.png', sizes: '96x96' }] },
        ],
      },
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    // Visualizador de bundle (solo en modo analyze)
    mode === 'analyze' && visualizer({
      filename: 'dist/bundle-analysis.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),

  // ── Dev server ──
  server: {
    port: 3000,
    open: true,
    // Proxy de la API de Anthropic para dev (evita CORS y exponer key)
    proxy: {
      '/api/ai': {
        target: 'https://api.anthropic.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ai/, '/v1/messages'),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('x-api-key', process.env.ANTHROPIC_API_KEY || '');
            proxyReq.setHeader('anthropic-version', '2023-06-01');
          });
        },
      },
    },
  },

  // ── Variables de entorno ──
  // Solo variables con prefijo VITE_ son expuestas al cliente
  // Las secretas (ANTHROPIC_API_KEY, FIREBASE_*) solo van a Cloud Functions
  envPrefix: 'VITE_',
}));

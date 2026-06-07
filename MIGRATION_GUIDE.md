# Guía de migración — MiCantón HTML → Vite

## Estado actual
- `micanton_v2.html` — HTML monolítico de 657KB, 9661 líneas
- 338 funciones, 154 variables globales
- Sin bundler, sin módulos ES, sin tree-shaking

## Resultado esperado con Vite
| Métrica            | Antes (HTML)  | Después (Vite)     |
|--------------------|---------------|--------------------|
| Tamaño inicial JS  | 605 KB        | ~80 KB (core)      |
| Carga completa     | 605 KB        | ~200 KB (chunks)   |
| CSS                | 42 KB inline  | ~15 KB (minified)  |
| Cacheable          | No            | Sí (hash en filename)|
| Offline            | No            | Sí (Service Worker)|
| Instalable (PWA)   | No            | Sí                 |

---

## Estructura de módulos creada

```
micanton-vite/
├── index.html              ← Shell HTML limpio
├── vite.config.js          ← Build, PWA, proxy, code splitting
├── vercel.json             ← Headers de seguridad, SPA rewrites
├── .env.example            ← Variables requeridas
├── .gitignore              ← Excluye .env y secretos
└── src/
    ├── main.js             ← Entry point, bootstrap
    ├── state.js            ← Estado global centralizado
    ├── core/
    │   ├── renderer.js     ← render() principal
    │   └── navigation.js   ← goMod, goBack, irPerfil...
    ├── data/
    │   ├── roles.js        ← USR_TIPOS, ROL_PERMS, ALL_NAV_MODULES
    │   ├── proveedores.js  ← PROVEEDORES (extraer del HTML)
    │   ├── pros.js         ← PROS (extraer del HTML)
    │   ├── catalog-items.js← catalogItems (extraer del HTML)
    │   ├── taxonomy.js     ← TAXONOMY, CATALOG_TAXONOMY
    │   └── plantillas.js   ← CAT_PLANTILLAS, MKT_PLANTILLAS
    ├── modules/
    │   ├── api.js          ← Anthropic API (vía proxy/Cloud Function)
    │   ├── admin.js        ← renderAdmin, renderAdminCMS... (extraer)
    │   ├── cms.js          ← renderAdminCMS, cmsToggleMod... (extraer)
    │   ├── catalog.js      ← renderCatalogo, renderCatCategorias (extraer)
    │   ├── catalog-public.js← renderCatalogoPublico, _renderItemConTpl (extraer)
    │   ├── marketing.js    ← renderMarketing, mkt* (extraer)
    │   ├── search.js       ← renderBuscadorModal, _calcResultados (extraer)
    │   ├── orders.js       ← renderPedidoModal, carrito* (extraer)
    │   └── profiles.js     ← renderPerfilNegocio, renderPerfilProfesional (extraer)
    ├── utils/
    │   ├── ui.js           ← showToast, llamar, abrirWhatsApp
    │   └── images.js       ← imgPickerHTML, imgPick, IMG_STORE
    └── styles/
        └── main.css        ← CSS refactorizado con variables
```

---

## Plan de migración por fases

### Fase 1 — Infraestructura (YA LISTA ✓)
- [x] vite.config.js con code splitting, Terser, PWA
- [x] vercel.json con headers de seguridad
- [x] .gitignore y .env.example
- [x] src/main.js, src/state.js
- [x] src/core/renderer.js, src/core/navigation.js
- [x] src/data/roles.js
- [x] src/utils/ui.js, src/utils/images.js
- [x] src/modules/api.js (Anthropic vía proxy)

### Fase 2 — Extracción de datos (2-3 horas)
Para cada archivo de datos, extraer del HTML actual:

```bash
# Ejemplo: extraer PROVEEDORES del HTML y convertir a módulo ES
# En micanton_v2.html, buscar: var PROVEEDORES = [
# Copiar el array y crear:
```

```js
// src/data/proveedores.js
export const PROVEEDORES = [
  // ... pegar array del HTML aquí
];
export default PROVEEDORES;
```

Archivos a crear:
- `src/data/proveedores.js` (12,709 chars en HTML)
- `src/data/pros.js` (16,189 chars)
- `src/data/catalog-items.js` (1,253 chars)
- `src/data/taxonomy.js` (9,910 chars)
- `src/data/catalog-taxonomy.js` (3,430 chars)
- `src/data/plantillas.js` (1,524 + 8,791 chars)
- `src/data/jobs.js` (966 chars)

### Fase 3 — Extracción de módulos (1-2 días)
Para cada módulo, extraer las funciones del HTML y agregarles:
- `export function` al inicio
- `import { render } from '../core/renderer.js'` donde render() sea necesario
- `import { showToast } from '../utils/ui.js'`

Orden recomendado (de menor a mayor complejidad):
1. `src/modules/profiles.js` (~3 funciones)
2. `src/modules/orders.js` (~5 funciones)
3. `src/modules/search.js` (~4 funciones)
4. `src/modules/templates.js` (~6 funciones)
5. `src/modules/catalog-public.js` (~8 funciones)
6. `src/modules/catalog.js` (~12 funciones)
7. `src/modules/marketing.js` (~10 funciones)
8. `src/modules/cms.js` (~15 funciones)
9. `src/modules/admin.js` (~20 funciones)

### Fase 4 — Integración Firebase (semana 2)
Ver FIREBASE_GUIDE.md

---

## Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo (con hot reload)
npm run dev

# Build producción
npm run build

# Preview del build
npm run preview

# Análisis del bundle (qué pesa qué)
npm run build:analyze
```

---

## Variables de entorno requeridas

En Vercel Dashboard → Settings → Environment Variables:
```
VITE_FIREBASE_API_KEY        = (pegar de Firebase Console)
VITE_FIREBASE_AUTH_DOMAIN    = micanton-cr.firebaseapp.com
VITE_FIREBASE_PROJECT_ID     = micanton-cr
VITE_FIREBASE_STORAGE_BUCKET = micanton-cr.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID = ...
VITE_FIREBASE_APP_ID         = ...
VITE_APP_ENV                 = production
```

En Vercel → Cloud Functions (secretos, NUNCA al cliente):
```
ANTHROPIC_API_KEY   = sk-ant-...
FIREBASE_ADMIN_KEY  = { ... JSON ... }
```

---

## Notas importantes

### Por qué Vite y no webpack/parcel
- Vite usa ESModules nativos en dev (sin bundling = inicio instantáneo)
- Rollup en producción = tree-shaking agresivo
- HMR (Hot Module Replacement) extremadamente rápido
- PWA plugin oficial y bien mantenido

### Code splitting automático
```js
// vite.config.js ya define:
manualChunks: {
  'data-providers': ['./src/data/proveedores.js', './src/data/pros.js'],
  'mod-admin':      ['./src/modules/admin.js', './src/modules/cms.js'],
  // etc.
}
// Resultado: el admin solo se carga cuando el usuario es admin
// Los datos de negocios solo cuando se entra al directorio
```

### Proxy en dev vs Cloud Function en prod
```
DEV:  /api/ai → vite proxy → api.anthropic.com (key en .env local)
PROD: /api/ai → Cloud Function → api.anthropic.com (key en Secret Manager)
```
El cliente **nunca** ve la ANTHROPIC_API_KEY.

### Tabler Icons (CDN → local)
Para evitar dependencia del CDN en producción:
```bash
npm install @tabler/icons-webfont
# En main.css:
@import '@tabler/icons-webfont/tabler-icons.css';
# Vite copiará los woff2 automáticamente
```

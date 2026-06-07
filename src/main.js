/**
 * MiCantón.cr — Entry point Vite
 * Carga modular con lazy loading por ruta
 */

// ── Estilos globales ──
import './styles/main.css';

// ── Core (siempre en el bundle inicial) ──
import { render, G }            from './core/renderer.js';
import { goMod, goBack,
         setPnTab, setAdminTab,
         irPerfilNegocio,
         irPerfilProfesional,
         abrirUrl }             from './core/navigation.js';
import { showToast, llamar,
         abrirWhatsApp, toggleUsrMenu,
         cerrarSesion, switchUsr,
         copiarDireccion }      from './utils/ui.js';
import { imgPickerHTML, imgPick,
         imgThumbFirst, imgDelete,
         IMG_STORE }            from './utils/images.js';

// ── Datos (chunk separado — cacheados en CDN) ──
import { PROVEEDORES }          from './data/proveedores.js';
import { PROS }                 from './data/pros.js';
import { catalogItems }         from './data/catalog-items.js';
import { USR_TIPOS, ROL_PERMS,
         ALL_NAV_MODULES }      from './data/roles.js';
import { CATALOG_TAXONOMY }     from './data/taxonomy.js';
import { CAT_PLANTILLAS,
         MKT_PLANTILLAS }       from './data/plantillas.js';
import { EVENTOS_DATA, JOBS }   from './data/events-jobs.js';
import { TIPO_BADGE,
         ALL_MODS_TABS }        from './data/ui-config.js';
import { CV_ITEMS }             from './data/cv-items.js';

// ── Firebase (lazy — solo cuando hay sesión) ──
let firebaseReady = false;
async function initFirebase() {
  if (firebaseReady) return;
  const { initAuthListener } = await import('./firebase/auth.js');
  initAuthListener(
    (user, tipo) => {
      console.log('[Auth] Logged in:', tipo);
      render();
    },
    () => {
      console.log('[Auth] Logged out');
      render();
    }
  );
  firebaseReady = true;
}

// ── Estado inicial global ──
const initialState = {
  // Navegación
  MOD: 'inicio', VIEW: null, activeUsr: 0, sesionUsuario: null, usrMenuOpen: false,
  // Panel
  pnTab: 'perfil', adminTab: 'dashboard', adminCanton: 0, adminDetail: null, adminDisTab: 'sistema',
  // CMS
  cmsRolSel: 'negocio', cmsSecSel: 'portal', cmsModalRol: null, cmsDragIdx: null,
  // Catálogo
  catViewFiltro: 'todos', catItemFotoOpen: null, catFotoViewer: null,
  catN1: null, catN2: null, catN3: null, catEditMode: false, catTaxonomia: null,
  // Pedidos
  carrito: [], misPedidos: [], pedidosRecibidos: [],
  pedidoModal: null, pedidoCantidad: 1, pedidoNotas: '', carritoOpen: false,
  // Plantillas
  negocioTplSel: {}, tplPickerOpen: false, tplPickerNeg: null,
  // Búsqueda
  searchOpen: false, searchQuery: '', searchResults: [], searchRecent: [], searchModFiltro: 'todos',
  // CV
  CV_ITEMS, cvDetalle: null, cvPublicarOpen: false, cvFormStep: 1, cvFormData: {},
};

// ── Exponer al scope global ──
// Necesario para onclick="" inline en el HTML renderizado
// En v3: reemplazar con event delegation
Object.assign(window, initialState, {
  // Core
  render, G, goMod, goBack, setPnTab, setAdminTab,
  irPerfilNegocio, irPerfilProfesional, abrirUrl,
  // UI
  showToast, llamar, abrirWhatsApp, toggleUsrMenu,
  cerrarSesion, switchUsr, copiarDireccion,
  // Imágenes
  imgPickerHTML, imgPick, imgThumbFirst, imgDelete, IMG_STORE,
  // Datos
  PROVEEDORES, PROS, catalogItems,
  USR_TIPOS, ROL_PERMS, ALL_NAV_MODULES,
  CATALOG_TAXONOMY, CAT_PLANTILLAS, MKT_PLANTILLAS,
  EVENTOS_DATA, JOBS, TIPO_BADGE, ALL_MODS_TABS,
  // Firebase loaders (lazy)
  getFirebaseAuth:      () => import('./firebase/auth.js'),
  getFirebaseFirestore: () => import('./firebase/firestore.js'),
  getFirebaseStorage:   () => import('./firebase/storage.js'),
  getFirebaseFunctions: () => import('./firebase/functions.js'),
});

// ── Bootstrap ──
async function init() {
  // Montar shell HTML
  document.getElementById('app').innerHTML = `
    <div id="app-root">
      <div id="hdr"></div>
      <div id="modTabs"></div>
      <div id="content"></div>
      <div id="navbot"></div>
      <div id="usrPanel"></div>
      <div id="hdrSearch"></div>
      <div id="carritoModal"></div>
      <div id="califModal"></div>
      <div id="carritoHeaderBtn"></div>
      <div id="tplPickerOverlay"></div>
      <div id="fotoViewerOverlay"></div>
    </div>`;

  // Render inicial (datos en memoria)
  render();

  // Iniciar Firebase en segundo plano
  initFirebase();

  // Pre-cargar módulos pesados cuando el browser esté idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      import('./modules/catalog-public.js');
      import('./modules/search.js');
      import('./modules/marketing.js');
    }, { timeout: 3000 });
  }
}

init();

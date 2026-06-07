/**
 * Estado global de MiCantón
 * Centralizado aquí para migración futura a Pinia/Zustand
 */

// ── Navegación ──
export let MOD = 'inicio';
export let VIEW = null;
export let activeUsr = 0;
export let sesionUsuario = null;
export let usrMenuOpen = false;

// ── Panel negocio ──
export let pnTab = 'perfil';
export let adminTab = 'dashboard';
export let adminCanton = 0;
export let adminDetail = null;
export let adminDisTab = 'sistema';

// ── CMS ──
export let cmsRolSel = 'negocio';
export let cmsSecSel = 'portal';
export let cmsModalRol = null;
export let cmsDragIdx = null;

// ── Catálogo ──
export let catViewFiltro = 'todos';
export let catItemFotoOpen = null;
export let catFotoViewer = null;
export let catN1 = null;
export let catN2 = null;
export let catN3 = null;
export let catEditMode = false;
export let catTaxonomia = null;

// ── Carrito y pedidos ──
export let carrito = [];
export let misPedidos = [];
export let pedidosRecibidos = [];
export let pedidoModal = null;
export let pedidoCantidad = 1;
export let pedidoNotas = '';
export let carritoOpen = false;

// ── Plantillas ──
export let negocioTplSel = {};
export let tplPickerOpen = false;
export let tplPickerNeg = null;

// ── Buscador ──
export let searchOpen = false;
export let searchQuery = '';
export let searchResults = [];
export let searchRecent = [];
export let searchModFiltro = 'todos';

// ── CV / Clasificados ──
export let CV_ITEMS = [];
export let cvDetalle = null;
export let cvPublicarOpen = false;
export let cvFormStep = 1;
export let cvFormData = {};

// ── Imágenes ──
export let IMG_STORE = {};

// ── Marketing ──
export let mktStudio = {};

// ── Setters reactivos ──
// Cuando se migre a Firebase, estos setters actualizarán Firestore
export const setState = (updates) => {
  Object.assign(module.exports ?? globalThis, updates);
};

// Compatibilidad: exponer todo al global para onclick handlers
// Se elimina en la versión con event listeners
if (typeof window !== 'undefined') {
  // Se hace en main.js con Object.assign(window, state)
}

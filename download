/**
 * Navegación — goMod, goBack, setPnTab, irPerfil, etc.
 */
import { render } from './renderer.js';

export function goMod(mod) {
  window.MOD = mod; window.VIEW = null;
  render();
  const c = document.getElementById('content');
  if (c) c.scrollTop = 0;
}

export function goBack() {
  if (window.VIEW) { window.VIEW = null; render(); return; }
  goMod('inicio');
}

export function setPnTab(tab) {
  window.pnTab = tab; render();
}

export function setAdminTab(tab) {
  window.adminTab = tab; window.adminDetail = null;
  window.MOD = 'admin'; render();
}

export function irPerfilNegocio(id) {
  window.VIEW = 'negocio-' + id; render();
  const c = document.getElementById('content');
  if (c) c.scrollTop = 0;
}

export function irPerfilProfesional(id) {
  window.VIEW = 'pro-' + id; render();
  const c = document.getElementById('content');
  if (c) c.scrollTop = 0;
}

export function abrirUrl(url) {
  if (url) window.open(url, '_blank');
  else if (typeof showToast === 'function') showToast('Sin sitio web registrado');
}

export default { goMod, goBack, setPnTab, setAdminTab, irPerfilNegocio, irPerfilProfesional, abrirUrl };

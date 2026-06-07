/**
 * Utilidades de UI — showToast, llamar, abrirWhatsApp, etc.
 */
import { render } from '../core/renderer.js';

// ── Toast ──
let _toastTimer = null;
export function showToast(msg, duration = 3000) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#0C2B1A;color:#fff;padding:10px 18px;border-radius:20px;font-size:12px;font-weight:700;z-index:9999;pointer-events:none;transition:opacity .3s;white-space:nowrap;box-shadow:0 4px 20px rgba(0,0,0,.3)';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => { t.style.opacity = '0'; }, duration);
}

// ── Comunicación ──
export function llamar(tel) {
  window.location.href = 'tel:' + tel;
}

export function abrirWhatsApp(wa, msg = '') {
  const encoded = encodeURIComponent(msg);
  window.open('https://wa.me/' + wa + (msg ? '?text=' + encoded : ''), '_blank');
}

export function copiarDireccion(dir) {
  navigator.clipboard?.writeText(dir).then(() => showToast('Dirección copiada ✓'));
}

// ── DOM ──
export function G(id) { return document.getElementById(id); }

// ── Toggle navbot ──
export function toggleUsrMenu() {
  window.usrMenuOpen = !window.usrMenuOpen; render();
}

export function cerrarSesion() {
  window.activeUsr = 0;
  window.sesionUsuario = null;
  window.usrMenuOpen = false;
  window.MOD = 'inicio';
  window.VIEW = null;
  render();
  showToast('Sesión cerrada');
}

export function switchUsr(idx) {
  window.activeUsr = idx;
  const u = (typeof USR_TIPOS !== 'undefined') && USR_TIPOS[idx];
  window.sesionUsuario = u || null;
  window.usrMenuOpen = false;
  window.pnTab = 'perfil';
  window.MOD = u?.mod || 'inicio';
  window.VIEW = null;
  render();
}

export default { showToast, llamar, abrirWhatsApp, copiarDireccion, G, toggleUsrMenu, cerrarSesion, switchUsr };

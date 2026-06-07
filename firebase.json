/**
 * Motor de render — MiCantón
 * Equivale al render() monolítico del HTML actual
 */
export const G = (id) => document.getElementById(id);

export function render() {
  const u    = (typeof USR_TIPOS !== 'undefined') && USR_TIPOS[activeUsr];
  const tipo = u?.tipo || 'visitante';
  const isPanelUser = ['negocio','profesional','creativo','medio','admin'].includes(tipo);

  const hdr = G('hdr');
  if (hdr && typeof renderHdr === 'function') hdr.innerHTML = renderHdr(u, tipo);

  const mt = G('modTabs');
  if (mt && typeof _renderModTabs === 'function') _renderModTabs(mt);

  const nb = G('navbot');
  if (nb && typeof _renderNavbot === 'function') _renderNavbot(nb);

  const up = G('usrPanel');
  if (up) up.innerHTML = (typeof usrMenuOpen !== 'undefined' && usrMenuOpen && typeof renderUsrPanel === 'function')
    ? renderUsrPanel(u) : '';

  const hs = G('hdrSearch');
  if (hs) hs.innerHTML = (typeof searchOpen !== 'undefined' && searchOpen && typeof renderBuscadorModal === 'function')
    ? renderBuscadorModal() : '';

  const c = G('content');
  if (!c) return;

  if (typeof VIEW !== 'undefined') {
    if (VIEW?.startsWith('negocio-')) { c.innerHTML = renderPerfilNegocio(VIEW.split('-')[1]); c.scrollTop=0; return; }
    if (VIEW?.startsWith('pro-'))     { c.innerHTML = renderPerfilProfesional(VIEW.split('-')[1]); c.scrollTop=0; return; }
  }

  const mod = typeof MOD !== 'undefined' ? MOD : 'inicio';

  if (isPanelUser && ['negocio','disenador','medio'].includes(mod)) {
    c.innerHTML = renderNegocioPanel();
  } else if (mod === 'admin' && tipo === 'admin') {
    c.innerHTML = renderAdmin();
  } else {
    const renderers = {
      inicio: renderInicio, noticias: renderNoticias,
      negocios: renderNegocios, clasificados: renderClasificados,
      empleo: renderEmpleo, gobierno: renderGobierno,
      eventos: renderEventos, ofertas: renderOfertas,
    };
    const fn = renderers[mod] || renderers.inicio;
    if (typeof fn === 'function') c.innerHTML = fn();
  }

  // Overlays
  const ensure = (id) => { let d=G(id); if(!d){d=document.createElement('div');d.id=id;document.body.appendChild(d);} return d; };
  if (typeof tplPickerOpen !== 'undefined' && tplPickerOpen && typeof tplPickerNeg !== 'undefined')
    ensure('tplPickerOverlay').innerHTML = typeof renderTplPicker === 'function' ? renderTplPicker(tplPickerNeg) : '';
  else { const d=G('tplPickerOverlay'); if(d) d.innerHTML=''; }
  if (typeof catFotoViewer !== 'undefined' && catFotoViewer)
    ensure('fotoViewerOverlay').innerHTML = typeof renderCatFotoViewer === 'function' ? renderCatFotoViewer() : '';
  else { const d=G('fotoViewerOverlay'); if(d) d.innerHTML=''; }
  const cm = G('carritoModal');
  if (cm && typeof renderCarrito === 'function') cm.innerHTML = renderCarrito();
}

export default { G, render };

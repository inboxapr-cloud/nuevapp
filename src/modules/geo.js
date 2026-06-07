/**
 * Selector geográfico — país, provincia, cantón
 */
import { render } from '../core/renderer.js';


function abrirGeoModal(tipo){
  geoModalTipo = tipo;
  geoFiltroTexto = '';
  const modal = G('geoModal');
  if(modal){ modal.style.display='flex'; }
  const titles = {pais:'Seleccionar país', prov:'Seleccionar provincia', cant:'Seleccionar cantón'};
  const subs   = {pais:'Elegí tu país para ver contenido local', prov:'Elegí tu provincia', cant:'Elegí tu cantón o ciudad'};
  if(G('geoModalTitle')) G('geoModalTitle').textContent = titles[tipo]||'Seleccionar';
  if(G('geoModalSub'))   G('geoModalSub').textContent   = subs[tipo]||'';
  if(G('geoSearchInput')){ G('geoSearchInput').value=''; G('geoSearchInput').focus(); }
  renderGeoLista('');
}

function cerrarGeoModal(){
  const modal = G('geoModal');
  if(modal) modal.style.display='none';
}

function filtrarGeoLista(q){
  geoFiltroTexto = q;
  if(G('geoSearchClear')) G('geoSearchClear').style.display = q?'block':'none';
  renderGeoLista(q);
}

function seleccionarPais(nm){
  paisActivo = nm;
  AP = Object.keys(PAISES[nm].provincias)[0];
  AC = DATA[AP]?.[0] || {nm:Object.values(PAISES[nm].provincias)[0][0]};
  cerrarGeoModal();
  updateBar(); updatePaisLabel();
  render();
  showToast('País: '+nm+' '+PAISES[nm].flag);
}

function seleccionarProv(prov){
  AP = prov;
  AC = DATA[prov]?.[0] || {nm:(PAISES[paisActivo]?.provincias[prov]||[])[0]||prov};
  cerrarGeoModal();
  updateBar();
  render();
  showToast('Provincia: '+prov);
}

function seleccionarCant(cant){
  AC = DATA[AP]?.find(c=>c.nm===cant) || {nm:cant,j:0,n:0,s:0,c:0,cli:{t:24,desc:'Soleado',ic:'☀️',hum:65,viento:12,sens:23}};
  cerrarGeoModal();
  updateBar();
  render();
  showToast('Cantón: '+cant);
}

function updatePaisLabel(){
  const p = PAISES[paisActivo];
  if(!p) return;
  // Update all header geo elements
  if(G('paisPillFlag'))  G('paisPillFlag').textContent  = p.flag;
  if(G('paisPillNm'))    G('paisPillNm').textContent    = paisActivo;
  if(G('infoBarFlag'))   G('infoBarFlag').textContent   = p.flag;
  if(G('infoBarPais'))   G('infoBarPais').textContent   = paisActivo.toUpperCase();
  if(G('tickerPaisFlag'))G('tickerPaisFlag').textContent= p.flag;
  if(G('tickerPaisNm'))  G('tickerPaisNm').textContent  = paisActivo.toUpperCase();
}

function getProvinciasCantones(pais, prov){
  const p = PAISES[pais];
  if(!p) return [];
  return p.provincias[prov] || [];
}

function renderGeoLista(q){
  const list = G('geoModalList');
  if(!list) return;
  const ql = q.toLowerCase();
  let items = [];

  if(geoModalTipo==='pais'){
    items = Object.entries(PAISES).map(([nm,p])=>({
      ic: p.flag, nm, sub: Object.keys(p.provincias).length+' provincias · '+p.idioma,
      on: paisActivo===nm,
      onclick: `seleccionarPais('${nm}')`
    }));
  } else if(geoModalTipo==='prov'){
    const p = PAISES[paisActivo]||PAISES['Costa Rica'];
    items = Object.keys(p.provincias).map(prov=>({
      ic: p.flag, nm: prov, sub: p.provincias[prov].length+' cantones',
      on: AP===prov,
      onclick: `seleccionarProv('${prov}')`
    }));
  } else {
    const p = PAISES[paisActivo]||PAISES['Costa Rica'];
    const provCants = p.provincias[AP]||[];
    items = provCants.map(c=>({
      ic: '📍', nm: c, sub: AP+' · '+paisActivo,
      on: AC&&AC.nm===c,
      onclick: `seleccionarCant('${c}')`
    }));
  }

  if(ql) items = items.filter(i=>i.nm.toLowerCase().includes(ql)||i.sub.toLowerCase().includes(ql));

  list.innerHTML = items.map(item=>`
    <div class="geo-item${item.on?' on':''}" onclick="${item.onclick}">
      <span class="gi-ic">${item.ic}</span>
      <div style="flex:1;min-width:0">
        <p class="gi-nm">${item.nm}</p>
        <p class="gi-sub">${item.sub}</p>
      </div>
      ${item.on?'<i class="ti ti-check" style="font-size:16px;color:var(--g)"></i>':'<i class="ti ti-chevron-right" style="font-size:14px;color:var(--bor)"></i>'}
    </div>`).join('') || `<div style="padding:32px;text-align:center;color:var(--t3);font-size:13px">Sin resultados para "${q}"</div>`;
}

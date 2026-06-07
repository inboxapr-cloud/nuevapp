/**
 * catalog-public — MiCantón.cr
 * Extraído del monolito micanton_v2.html
 * En v3: conectar a Firebase donde aplique
 */
// Nota: estas funciones usan variables globales de window.*
// Al migrar a Firebase, reemplazar con imports de ../state.js

function renderCatalogoPublico(negId){
  const {items, type, neg} = getItemsDeNegocio(negId);
  const activos = (items||[]).filter(i=>i.activo!==false);

  // Plantilla activa para este negocio (usar String para consistencia)
  const tpl    = getTplForNeg(String(negId));
  const layout = _getTplLayout(tpl);

  // Colores de la plantilla o del negocio
  const co     = tpl?.colores?.acento || neg?.co  || '#185FA5';
  const fondo  = tpl?.colores?.fondo1 || neg?.bg  || '#E6F1FB';
  const headerBg = tpl?.colores?.fondo1 || neg?.bg || '#E6F1FB';
  const headerCo = tpl?.colores?.texto  || neg?.co || '#185FA5';

  // Agrupar por N1(cat) → N2(sub) → N3(items)
  const n1Groups = {};
  activos.forEach(item=>{
    const cat = item.cat||'General';
    if(!n1Groups[cat]) n1Groups[cat]={subs:{}};
    const sub = item.sub||'';
    if(!n1Groups[cat].subs[sub]) n1Groups[cat].subs[sub]=[];
    n1Groups[cat].subs[sub].push(item);
  });
  const cats = Object.keys(n1Groups);

  const carritoCnt   = (carrito||[]).filter(c=>String(c.negId)===String(negId)).reduce((s,c)=>s+(c.qty||1),0);
  const carritoTotal = (carrito||[]).filter(c=>String(c.negId)===String(negId)).reduce((s,c)=>s+(c.prNum||0)*(c.qty||1),0);
  const label = (k)=>catLabel(type,k);
  const isGrid = layout==='grid';

  return `
  <!-- ── HEADER ── -->
  <div style="background:${headerBg};padding:12px 14px;display:flex;align-items:center;gap:10px">
    <button onclick="goBack()" style="width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.7);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0">
      <i class="ti ti-arrow-left" style="font-size:15px;color:${headerCo}"></i>
    </button>
    <div style="flex:1;min-width:0">
      <p style="font-size:14px;font-weight:800;color:${headerCo};overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
        ${tpl?`<span style="font-size:11px;opacity:.7">${tpl.ic||'🎨'} </span>`:''}${label('titulo')} · ${neg?.nm||'Negocio'}
      </p>
      <p style="font-size:10px;color:${headerCo};opacity:.7">${activos.length} ${label('item').toLowerCase()}s disponibles</p>
    </div>
    ${carritoCnt>0?`
    <button onclick="carritoOpen=true;render()" style="padding:7px 12px;border-radius:20px;border:none;background:${co};color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:5px;flex-shrink:0">
      <i class="ti ti-shopping-cart" style="font-size:14px"></i>
      ${carritoCnt} · ₡${carritoTotal.toLocaleString('es-CR')}
    </button>`:''}
  </div>

  <!-- ── Filtro por categoría (N1) ── -->
  ${cats.length>1?`
  <div style="display:flex;gap:5px;overflow-x:auto;scrollbar-width:none;padding:8px 12px;background:var(--surf);border-bottom:.5px solid var(--bor)">
    <span onclick="catViewFiltro='todos';render()" style="font-size:11px;font-weight:600;padding:5px 13px;border-radius:20px;cursor:pointer;white-space:nowrap;flex-shrink:0;background:${catViewFiltro==='todos'?co:'var(--bg)'};color:${catViewFiltro==='todos'?'#fff':'var(--t3)'};border:.5px solid ${catViewFiltro==='todos'?'transparent':'var(--bor)'}">Todos</span>
    ${cats.map(cat=>`<span onclick="catViewFiltro='${cat}';render()" style="font-size:11px;font-weight:600;padding:5px 13px;border-radius:20px;cursor:pointer;white-space:nowrap;flex-shrink:0;background:${catViewFiltro===cat?co:'var(--bg)'};color:${catViewFiltro===cat?'#fff':'var(--t3)'};border:.5px solid ${catViewFiltro===cat?'transparent':'var(--bor)'}">${cat}</span>`).join('')}
  </div>`:''}

  <!-- ── Contenido ── -->
  <div style="padding:10px 12px 80px">
    ${(catViewFiltro==='todos'?cats:cats.filter(c=>c===catViewFiltro)).map(cat=>`
    <!-- N1: Categoría -->
    <div style="margin-bottom:16px">
      <!-- Separador de categoría con color de plantilla -->
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div style="width:3px;height:18px;border-radius:2px;background:${co};flex-shrink:0"></div>
        <p style="font-size:12px;font-weight:700;color:${tpl?co:'var(--t1)'};">${cat}</p>
        <div style="flex:1;height:.5px;background:${co}22"></div>
        <span style="font-size:10px;color:var(--t3)">${Object.values(n1Groups[cat].subs).flat().length} items</span>
      </div>

      ${Object.entries(n1Groups[cat].subs).map(([sub,subitems])=>`
      <!-- N2: Sub -->
      ${sub?`<p style="font-size:10px;font-weight:600;color:var(--t3);margin:6px 0 5px;padding-left:11px">${sub}</p>`:''}

      <!-- N3: Items en layout de plantilla -->
      ${isGrid
        ?`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:4px">
            ${subitems.map(item=>_renderItemConTpl(item,negId,type,neg,tpl)).join('')}
          </div>`
        :`<div style="display:flex;flex-direction:column;gap:0">
            ${subitems.map(item=>_renderItemConTpl(item,negId,type,neg,tpl)).join('')}
          </div>`}
      `).join('')}
    </div>`).join('')}

    ${activos.length===0?`
    <div style="padding:40px 20px;text-align:center">
      <i class="ti ti-package" style="font-size:40px;color:var(--bor);display:block;margin-bottom:10px"></i>
      <p style="font-size:14px;font-weight:600;color:var(--t2)">Sin ${label('item').toLowerCase()}s disponibles</p>
    </div>`:''}
  </div>

  <!-- ── Botón flotante cambiar estilo ── -->
  ${_renderTplBtn(negId, tpl)}

  <!-- ── Selector de plantillas ── -->
  ${catViewTplOpen?_renderTplSelector(negId, neg):''}

  <!-- ── Modal de pedido ── -->
  ${pedidoModal?renderPedidoModal(pedidoModal,negId,type,neg):''}
  `;
}

function catLabel(type, key){
  const labels = {
    menu:      {titulo:'Menú',      item:'Platillo',  orden:'Pedido',     btn:'Pedir',     sec:'Categorías'},
    catalogo:  {titulo:'Catálogo',  item:'Producto',  orden:'Pedido',     btn:'Agregar',   sec:'Categorías'},
    servicios: {titulo:'Servicios', item:'Servicio',  orden:'Solicitud',  btn:'Solicitar', sec:'Servicios'},
  };
  return (labels[type]||labels.catalogo)[key]||key;
}

function getItemsDeNegocio(negId){
  // Buscar en PROVEEDORES (con guard para elementos undefined)
  const neg = (PROVEEDORES||[]).filter(Boolean).find(p=>String(p.id)===String(negId));
  if(neg?.items) return {items: neg.items, type: neg.catalogType||'catalogo', neg};
  // Buscar en PROS
  const pro = (PROS||[]).filter(Boolean).find(p=>String(p.id)===String(negId));
  if(pro?.items) return {items: pro.items, type: pro.catalogType||'servicios', neg: pro};
  // Fallback a catalogItems del negocio logueado
  return {items: catalogItems||[], type:'menu', neg: null};
}

function renderCatFotoViewer(){
  if(!catFotoViewer) return '';
  const {item, fotos, idx} = catFotoViewer;
  if(!fotos||!fotos.length) return '';
  const src = fotos[idx];
  return `
  <div onclick="if(event.target===this){catFotoViewer=null;render()}"
    style="position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:900;display:flex;flex-direction:column;align-items:center;justify-content:center">

    <!-- Header -->
    <div style="position:absolute;top:0;left:0;right:0;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(rgba(0,0,0,.5),transparent)">
      <p style="font-size:13px;font-weight:600;color:#fff">${item.nm}</p>
      <button onclick="catFotoViewer=null;render()"
        style="width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.15);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center">
        <i class="ti ti-x" style="font-size:16px;color:#fff"></i>
      </button>
    </div>

    <!-- Foto principal -->
    <img src="${src}" style="max-width:100%;max-height:75vh;object-fit:contain;border-radius:8px"
      onclick="event.stopPropagation()">

    <!-- Navegación anterior/siguiente -->
    ${fotos.length>1?`
    <div style="display:flex;align-items:center;gap:16px;margin-top:16px">
      <button onclick="event.stopPropagation();catFotoViewer.idx=Math.max(0,idx-1);render()"
        style="width:38px;height:38px;border-radius:50%;background:${idx>0?'rgba(255,255,255,.2)':'rgba(255,255,255,.06)'};border:none;cursor:pointer;display:flex;align-items:center;justify-content:center">
        <i class="ti ti-chevron-left" style="font-size:18px;color:${idx>0?'#fff':'rgba(255,255,255,.25)'}"></i>
      </button>
      <!-- Puntos indicadores -->
      <div style="display:flex;gap:6px">
        ${fotos.map((_,i)=>`<div onclick="event.stopPropagation();catFotoViewer.idx=${i};render()"
          style="width:${i===idx?20:7}px;height:7px;border-radius:4px;background:${i===idx?'#fff':'rgba(255,255,255,.35)'};cursor:pointer;transition:all .2s"></div>`).join('')}
      </div>
      <button onclick="event.stopPropagation();catFotoViewer.idx=Math.min(fotos.length-1,idx+1);render()"
        style="width:38px;height:38px;border-radius:50%;background:${idx<fotos.length-1?'rgba(255,255,255,.2)':'rgba(255,255,255,.06)'};border:none;cursor:pointer;display:flex;align-items:center;justify-content:center">
        <i class="ti ti-chevron-right" style="font-size:18px;color:${idx<fotos.length-1?'#fff':'rgba(255,255,255,.25)'}"></i>
      </button>
    </div>
    <!-- Miniaturas -->
    <div style="display:flex;gap:6px;margin-top:10px;overflow-x:auto;max-width:90vw;padding:2px">
      ${fotos.map((f,i)=>`<div onclick="event.stopPropagation();catFotoViewer.idx=${i};render()"
        style="width:48px;height:48px;border-radius:7px;overflow:hidden;flex-shrink:0;cursor:pointer;border:2px solid ${i===idx?'#fff':'transparent'};opacity:${i===idx?1:0.6}">
        <img src="${f}" style="width:100%;height:100%;object-fit:cover">
      </div>`).join('')}
    </div>`:''}

    <!-- Info del item -->
    <div style="position:absolute;bottom:0;left:0;right:0;padding:16px;background:linear-gradient(transparent,rgba(0,0,0,.7))">
      <p style="font-size:12px;color:rgba(255,255,255,.7);text-align:center">${item.desc||''}</p>
      <p style="font-size:16px;font-weight:700;color:#fff;text-align:center;margin-top:3px">${item.pr}</p>
    </div>
  </div>`;
}
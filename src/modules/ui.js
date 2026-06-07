/**
 * UI core — render, navbot, modtabs, header, toasts
 */


function render(){
  const c=G('content');
  if(!c) return;

  // ── Buscador fullscreen modal ──
  if(searchOpen){
    c.innerHTML=renderBuscadorModal();
    const mt=G('modTabs'); if(mt) mt.style.display='none';
    const nb=G('navbot'); if(nb) nb.style.display='none';
    const hi=G('hdrInfoBar'); if(hi) hi.style.display='none';
    const hs=G('hdrSearch'); if(hs) hs.style.display='none';
    return;
  }

  // ── HEADER: full vs compacto ──
  const PANEL_MODS=['negocio','disenador','medio','profesional','admin','equipos','pagos','publicar','registro','login'];
  const isPanel=PANEL_MODS.includes(MOD);
  const hdrInfoBar=G('hdrInfoBar'); const hdrSearch=G('hdrSearch');
  const hdrFrase=G('hdrFrase');     const hdrModTabs=G('modTabs');
  if(hdrInfoBar) hdrInfoBar.style.display = isPanel?'none':'';
  if(hdrSearch)  hdrSearch.style.display  = isPanel?'none':'';
  if(hdrFrase)   hdrFrase.style.display   = isPanel?'none':'';
  if(hdrModTabs) hdrModTabs.style.display = isPanel?'none':'';

  // ── navbot siempre visible ──
  const nb=G('navbot');
  if(nb){ nb.style.display=''; _renderNavbot(nb); }

  // ── modTabs (barra de módulos en header) ──
  if(hdrModTabs && !isPanel) _renderModTabs(hdrModTabs);

  // ── hdrSearch actualizado ──
  if(hdrSearch && !isPanel) _renderHdrSearch(hdrSearch);

  // ── usrPanel ──
  _renderUsrPanel();

  // ── Vistas especiales ──
  if(VIEW.startsWith('negocio-')){ c.innerHTML=renderPerfilNegocio(VIEW.split('-')[1]); c.scrollTop=0; return; }
  if(VIEW.startsWith('pro-')){ c.innerHTML=renderPerfilProfesional(VIEW.split('-')[1]); c.scrollTop=0; return; }
  if(VIEW.startsWith('search-')){ c.innerHTML=renderSearch(VIEW.slice(7)); c.scrollTop=0; return; }
  if(VIEW.startsWith('dp-')){ c.innerHTML=renderPerfilProfesional(VIEW.split('-')[1]); c.scrollTop=0; return; }
  if(VIEW.startsWith('dj-')){ c.innerHTML=renderJobDetail(parseInt(VIEW.split('-')[1])); c.scrollTop=0; return; }

  // ── Módulo principal ──
  const fns={inicio:renderInicio,noticias:renderNoticias,negocios:renderNegocios,eventos:renderEventos,ofertas:renderOfertas,clasificados:renderClasificados,empleo:renderEmpleo,servicios:renderServicios,publicar:renderPublicar,registro:renderRegistro,login:renderLogin,admin:renderAdmin,negocio:renderNegocioPanel,disenador:renderDisenador,medio:renderMedio,profesional:renderProfesional,equipos:renderEquipos,pagos:renderPagos};
  c.innerHTML=(fns[MOD]||renderInicio)();
  c.scrollTop=0;

  // ── Overlays ──
  const cm=G('carritoModal'); if(cm&&typeof renderCarrito==='function') cm.innerHTML=renderCarrito();
  const calif=G('califModal'); if(calif&&typeof renderPopCalif==='function') calif.innerHTML=renderPopCalif();
  const chb=G('carritoHeaderBtn'); if(chb&&typeof renderCarritoBtn==='function') chb.innerHTML=renderCarritoBtn();
  // ── Template picker overlay ──
  let tplDiv=G('tplPickerOverlay');
  if(!tplDiv){ tplDiv=document.createElement('div'); tplDiv.id='tplPickerOverlay'; document.body.appendChild(tplDiv); }
  tplDiv.innerHTML = (tplPickerOpen&&tplPickerNeg) ? renderTplPicker(tplPickerNeg) : '';

  // ── Foto viewer overlay ──
  let fvDiv=G('fotoViewerOverlay');
  if(!fvDiv){ fvDiv=document.createElement('div'); fvDiv.id='fotoViewerOverlay'; document.body.appendChild(fvDiv); }
  fvDiv.innerHTML = catFotoViewer ? renderCatFotoViewer() : '';
}

function showToast(msg, duration){
  const t=G('toast'); const m=G('toastMsg');
  if(!t||!m) return;
  m.textContent=msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer=setTimeout(()=>t.classList.remove('show'), duration||2800);
}

function toggleUsrMenu(){ usrMenuOpen=!usrMenuOpen; render(); }

function cerrarSesion(){
  sesionUsuario=null; activeUsr=0;
  usrMenuOpen=false;
  goMod('inicio');
  showToast('Sesión cerrada');
}

function switchUsr(i){
  activeUsr = i;
  const u = (typeof USR_TIPOS!=='undefined') && USR_TIPOS[i];
  sesionUsuario = (u && u.tipo !== 'visitante') ? {
    tipo:u.tipo, nm:u.nm, av:u.av, bg:u.bg||'#E6F1FB', co:u.co||'#185FA5'
  } : null;
  usrMenuOpen = false;
  const dest = u && u.mod;
  if(dest) goMod(dest);
  else render();
  updateUsrBtn();
  rebuildNav();
  showToast('¡Bienvenido '+( u ? u.nm : 'Visitante')+'!');
}

function llamar(tel){
  window.open('tel:'+tel.replace(/[^0-9+]/g,''));
}

function abrirWhatsApp(tel, msg){
  const num=(tel||'').replace(/[^0-9]/g,'');
  const phone=num.startsWith('506')?num:'506'+num;
  const text=encodeURIComponent(msg||'Hola! Vi su negocio en MiCantón.cr y me interesa más información.');
  window.open(`https://wa.me/${phone}?text=${text}`,'_blank');
}

function copiarDireccion(dir){
  const txt=dir||'200m norte del Parque Central, Alajuela';
  if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(()=>showToast('Dirección copiada ✓')).catch(()=>showToast('Dir: '+txt));
  else showToast('Dir: '+txt);
}

function compartir(titulo, texto, url){
  if(navigator.share){
    navigator.share({title:titulo||'MiCantón.cr',text:texto||'',url:url||window.location.href}).catch(()=>{});
  } else {
    copiarTexto(url||window.location.href,'Enlace');
  }
}

function compartirCatalogoWA(){
  const url='https://micanton.cr/menu/el-mirador';
  const txt=encodeURIComponent('¡Mirá nuestro menú digital! 🍽️ '+url+'\n\nEl Mirador Restaurante · Alajuela · #MiCantónCR');
  window.open('https://wa.me/?text='+txt,'_blank');
}

function calificar(estrellas, negocioId){
  showToast('¡Gracias por tu calificación! '+('⭐'.repeat(estrellas)));
}

function toggleNotif(){
  if('Notification' in window){
    Notification.requestPermission().then(p=>{
      showToast(p==='granted'?'Notificaciones activadas ✓':'Notificaciones desactivadas');
    });
  } else showToast('Tu navegador no soporta notificaciones');
}

function abrirBuscador(){
  searchOpen=true; render();
  setTimeout(()=>{ const el=G('searchInMain'); if(el) el.focus(); },120);
}

function cerrarBuscador(){
  searchOpen=false; render();
}

function _renderNavbot(nb){
  const u=(typeof USR_TIPOS!=='undefined')&&USR_TIPOS[activeUsr];
  const tipo=u?.tipo||'visitante';
  // ── Usar ROL_PERMS si está configurado ──
  const permsNav = (typeof ROL_PERMS!=='undefined') && ROL_PERMS[tipo]?.navbot;
  let navItems;
  if(permsNav&&permsNav.length>0){
    // Convertir IDs de navbot a [mod, label, ic]
    navItems = permsNav.slice(0,5).map(id=>{
      const m=(typeof ALL_NAV_MODULES!=='undefined')&&ALL_NAV_MODULES.find(x=>x.id===id);
      if(!m) return null;
      const mod = m.mod||id.replace('_nb','');
      return [mod, m.nm, m.ic];
    }).filter(Boolean);
  } else {
    // Fallback hardcoded
    navItems =
      tipo==='admin'
        ?[['inicio','Inicio','ti-home'],['admin','Admin','ti-shield-check'],['clasificados','Mercado','ti-shopping-bag'],['noticias','Noticias','ti-news'],['negocios','Directorio','ti-building-store']]
      :tipo==='negocio'
        ?[['inicio','Inicio','ti-home'],['negocio','Mi panel','ti-building-store'],['clasificados','Mercado','ti-shopping-bag'],['eventos','Eventos','ti-calendar'],['negocios','Directorio','ti-map']]
      :tipo==='creativo'||tipo==='profesional'
        ?[['inicio','Inicio','ti-home'],['disenador','Mi panel','ti-palette'],['clasificados','Mercado','ti-shopping-bag'],['empleo','Empleo','ti-briefcase'],['negocios','Directorio','ti-building-store']]
      :tipo==='medio'
        ?[['inicio','Inicio','ti-home'],['medio','Mi panel','ti-building-broadcast-tower'],['noticias','Noticias','ti-news'],['negocios','Directorio','ti-building-store'],['eventos','Eventos','ti-calendar']]
        :[['inicio','Inicio','ti-home'],['negocios','Directorio','ti-building-store'],['clasificados','Mercado','ti-shopping-bag'],['empleo','Empleo','ti-briefcase'],['negocio','Mi perfil','ti-user-circle']];
  }
  nb.innerHTML=navItems.map(([mod,label,ic])=>`<button class="nb${MOD===mod?' on':''}" onclick="goMod('${mod}')"><i class="ti ${ic}"></i><span>${label}</span></button>`).join('');
}

function _renderModTabs(el){
  const u=(typeof USR_TIPOS!=='undefined')&&USR_TIPOS[activeUsr];
  const tipo=u?.tipo||'visitante';
  // ── Usar ROL_PERMS.portal si está configurado ──
  const permsPortal = (typeof ROL_PERMS!=='undefined') && ROL_PERMS[tipo]?.portal;
  let tabs;
  if(permsPortal&&permsPortal.length>0){
    tabs = permsPortal.map(id=>{
      const m = (typeof ALL_NAV_MODULES!=='undefined')&&ALL_NAV_MODULES.find(x=>x.id===id&&x.cat==='portal');
      return m || ALL_MODS_TABS.find(t=>t.id===id);
    }).filter(Boolean);
  } else {
    tabs = ALL_MODS_TABS;
  }
  el.innerHTML=`<div style="display:flex;gap:0;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch">`+
    tabs.map(t=>`<button class="nb${MOD===t.id?' on':''}" style="flex-shrink:0;padding:6px 14px;font-size:11px;font-weight:600;white-space:nowrap;border:none;border-bottom:2px solid ${MOD===t.id?'var(--b)':'transparent'};background:transparent;color:${MOD===t.id?'var(--b)':'var(--t3)'};cursor:pointer;font-family:inherit" onclick="goMod('${t.id}')">
      ${t.nm}
    </button>`).join('')+'</div>';
}

function _renderHdrSearch(el){
  const hasMod=searchModFiltro&&searchModFiltro!=='todos';
  const modNm=hasMod?(SEARCH_MODS||[]).find(m=>m.id===searchModFiltro)?.nm||'Todos':'Todos';
  el.innerHTML=`<div style="display:flex;align-items:center;background:var(--bg);border:.5px solid var(--bor);border-radius:10px;overflow:hidden;height:38px;cursor:pointer" onclick="abrirBuscador()">
    <div style="display:flex;align-items:center;gap:3px;padding:0 8px;border-right:.5px solid var(--bor);height:100%;background:${hasMod?'var(--b)':'#E6F1FB'};flex-shrink:0">
      <i class="ti ti-search" style="font-size:12px;color:${hasMod?'#fff':'var(--b)'}"></i>
      <span style="font-size:10px;font-weight:700;color:${hasMod?'#fff':'var(--b)'};white-space:nowrap;max-width:60px;overflow:hidden;text-overflow:ellipsis">${modNm}</span>
      <i class="ti ti-chevron-down" style="font-size:9px;color:${hasMod?'rgba(255,255,255,.7)':'var(--b)'}"></i>
    </div>
    <div style="flex:1;padding:0 10px;font-size:13px;color:${searchQuery?'var(--t1)':'var(--t3)'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
      ${searchQuery||'Buscar en '+AC.nm+'...'}
    </div>
    <div style="width:38px;height:38px;background:var(--b);display:flex;align-items:center;justify-content:center;flex-shrink:0">
      <i class="ti ti-search" style="font-size:16px;color:#fff"></i>
    </div>
  </div>`;
}

function _renderUsrPanel(){
  const overlay=G('usrOverlay'); const panel=G('usrPanel');
  if(!panel) return;
  if(overlay) overlay.style.display=usrMenuOpen?'block':'none';
  if(!usrMenuOpen){ panel.style.display='none'; return; }
  panel.style.display='block';
  const u=(typeof USR_TIPOS!=='undefined')&&USR_TIPOS[activeUsr];
  panel.innerHTML=`
    <div style="padding:12px 14px;border-bottom:.5px solid var(--bor);background:${u?.bg||'#E6F1FB'}">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:${u?.tc||u?.co||'#185FA5'}">${u?.av||'VI'}</div>
        <div><p style="font-size:13px;font-weight:700;color:${u?.tc||'#185FA5'}">${u?.nm||'Visitante'}</p>
        <p style="font-size:10px;color:${u?.tc||'#185FA5'};opacity:.75">${u?.sub||'Portal público'}</p></div>
      </div>
    </div>
    <div style="padding:6px 0">
      <p style="font-size:9px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.06em;padding:6px 14px 4px">Demo — Cambiar usuario</p>
      ${(typeof USR_TIPOS!=='undefined'?USR_TIPOS:[]).map((u2,i)=>`<div style="display:flex;align-items:center;gap:10px;padding:9px 14px;cursor:pointer;background:${activeUsr===i?'var(--bg)':'transparent'}" onclick="switchUsr(${i})">
        <div style="width:32px;height:32px;border-radius:50%;background:${u2.bg||'#E6F1FB'};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:${u2.tc||u2.co||'#185FA5'};flex-shrink:0">${u2.av||'?'}</div>
        <div style="flex:1;min-width:0">
          <p style="font-size:12px;font-weight:${activeUsr===i?700:600};color:var(--t1)">${u2.nm}</p>
          <p style="font-size:10px;color:var(--t3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${u2.sub||''}</p>
        </div>
        ${activeUsr===i?'<i class="ti ti-check" style="font-size:14px;color:var(--g)"></i>':''}
      </div>`).join('')}
    </div>`;
}

function renderCarrito(){
  if(!carritoOpen) return '';
  if(carritoCheckout) return renderCarritoCheckout();

  // Agrupar por proveedor
  const provs = {};
  carrito.forEach(i=>{ if(!provs[i.provId]) provs[i.provId]={nm:i.provNm,av:i.provAv,bg:i.provBg,co:i.provCo,items:[]}; provs[i.provId].items.push(i); });
  const provList = Object.entries(provs);
  const total = carritoTotal();

  return `<div style="position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:600;display:flex;align-items:flex-end" onclick="carritoOpen=false;render()">
  <div style="background:var(--surf);border-radius:20px 20px 0 0;width:100%;max-width:480px;margin:0 auto;max-height:85dvh;display:flex;flex-direction:column" onclick="event.stopPropagation()">
    <div style="padding:14px 16px;border-bottom:.5px solid var(--bor);display:flex;align-items:center;justify-content:space-between;flex-shrink:0">
      <div>
        <p style="font-size:16px;font-weight:700;color:var(--t1)">Mi carrito</p>
        <p style="font-size:11px;color:var(--t3)">${carritoCount()} item${carritoCount()!==1?'s':''} · ${provList.length} proveedor${provList.length!==1?'es':''}</p>
      </div>
      <button style="width:30px;height:30px;border-radius:50%;border:.5px solid var(--bor);background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center" onclick="carritoOpen=false;render()"><i class="ti ti-x" style="font-size:15px;color:var(--t1)"></i></button>
    </div>

    <div style="overflow-y:auto;flex:1;padding:12px 16px">
    ${carrito.length===0?`<div style="padding:40px;text-align:center"><i class="ti ti-shopping-cart" style="font-size:40px;color:var(--bor);display:block;margin-bottom:10px"></i><p style="font-size:13px;color:var(--t3)">Tu carrito está vacío</p></div>`:''}
    ${provList.map(([pid,prov])=>`
      <div style="margin-bottom:14px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <div style="width:28px;height:28px;border-radius:7px;background:${prov.bg};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:${prov.co};flex-shrink:0">${prov.av}</div>
          <p style="font-size:12px;font-weight:700;color:var(--t1)">${prov.nm}</p>
          <span style="font-size:10px;color:var(--t3);margin-left:auto">Subtotal: <strong style="color:var(--g)">₡${prov.items.reduce((a,i)=>a+(i.itemPrNum*i.qty),0).toLocaleString()}</strong></span>
        </div>
        ${prov.items.map(item=>`<div style="display:flex;align-items:center;gap:10px;padding:9px 11px;background:var(--bg);border-radius:var(--rs);border:.5px solid var(--bor);margin-bottom:6px">
          <div style="flex:1;min-width:0"><p style="font-size:12px;font-weight:600;color:var(--t1);margin-bottom:2px">${item.itemNm}</p><p style="font-size:12px;font-weight:700;color:var(--g)">${item.itemPr}</p></div>
          <div style="display:flex;align-items:center;gap:7px;flex-shrink:0">
            <button style="width:26px;height:26px;border-radius:50%;border:.5px solid var(--bor);background:var(--surf);cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center" onclick="updateCarritoQty('${pid}','${item.itemId}',-1)">−</button>
            <span style="font-size:13px;font-weight:700;color:var(--t1);min-width:16px;text-align:center">${item.qty}</span>
            <button style="width:26px;height:26px;border-radius:50%;border:none;background:var(--g);color:#fff;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center" onclick="updateCarritoQty('${pid}','${item.itemId}',1)">+</button>
          </div>
        </div>`).join('')}
      </div>`).join('')}
    </div>

    ${carrito.length>0?`<div style="padding:14px 16px;border-top:.5px solid var(--bor);flex-shrink:0">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <p style="font-size:14px;font-weight:700;color:var(--t1)">Total general</p>
        <p style="font-size:20px;font-weight:700;color:var(--g)">₡${total.toLocaleString()}</p>
      </div>
      <div style="background:#E6F1FB;border:.5px solid #85B7EB;border-radius:var(--rs);padding:8px 12px;display:flex;gap:7px;font-size:11px;color:var(--bd);margin-bottom:10px">
        <i class="ti ti-info-circle" style="font-size:13px;flex-shrink:0;margin-top:1px"></i>
        El pago se coordina directamente con cada proveedor. Podés pagar en efectivo o SINPE al recibirlo.
      </div>
      <button style="width:100%;background:var(--g);color:#fff;border:none;border-radius:var(--rs);padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:7px" onclick="carritoCheckout=true;render()">
        <i class="ti ti-arrow-right" style="font-size:15px"></i>Revisar y confirmar pedido
      </button>
    </div>`:''}
  </div>
  </div>`;
}

function renderCarritoBtn(){
  const cnt = carritoCount();
  return `<button style="position:relative;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.15);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0" onclick="carritoOpen=true;render()">
    <i class="ti ti-shopping-cart" style="font-size:18px;color:#fff"></i>
    <span id="carritoBadge" style="display:${cnt>0?'flex':'none'};position:absolute;top:-2px;right:-2px;width:18px;height:18px;background:#E24B4A;border-radius:50%;font-size:10px;font-weight:700;color:#fff;align-items:center;justify-content:center;border:2px solid var(--hdr-bg,#085041)">${cnt}</span>
  </button>`;
}

function renderPopCalif(){
  if(!pedidoCalifId) return '';
  const p=misPedidos.find(x=>x.id===pedidoCalifId)||pedidosRecibidos.find(x=>x.id===pedidoCalifId);
  return `<div style="position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:700;display:flex;align-items:center;justify-content:center;padding:16px">
  <div style="background:var(--surf);border-radius:var(--r);padding:20px;width:100%;max-width:360px">
    <p style="font-size:18px;font-weight:700;color:var(--t1);text-align:center;margin-bottom:4px">¿Recibiste tu pedido?</p>
    <p style="font-size:12px;color:var(--t3);text-align:center;margin-bottom:16px">${p?p.provNm||p.clienteNm:''}</p>
    <div style="display:flex;justify-content:center;gap:8px;margin-bottom:16px">
      ${[1,2,3,4,5].map(n=>`<button style="font-size:32px;background:none;border:none;cursor:pointer;opacity:${califStars>=n?1:.3};transform:scale(${califStars>=n?1.1:1});transition:all .15s" onclick="setCalifStars(${n})">⭐</button>`).join('')}
    </div>
    ${califStars>0?`<div style="margin-bottom:12px"><p style="font-size:11px;font-weight:600;color:var(--t2);margin-bottom:4px">Reseña (opcional)</p><textarea id="califResenaInput" style="width:100%;font-size:12px;padding:9px 11px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t1);outline:none;resize:none;height:64px;font-family:inherit" placeholder="Contanos tu experiencia..."></textarea></div>`:''}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      <button style="padding:11px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t2);font-size:12px;font-weight:600;cursor:pointer;font-family:inherit" onclick="pedidoCalifId=null;render()">Aún no llegó</button>
      <button style="padding:11px;border-radius:var(--rs);border:none;background:${califStars>0?'var(--g)':'#ccc'};color:#fff;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit" ${califStars===0?'disabled':''} onclick="enviarCalif()">Confirmar ★</button>
    </div>
  </div>
  </div>`;
}


function G(id){ return document.getElementById(id); }

function renderHdr(u, tipo){
  return ''; // Header rendered via _renderHdrSearch and navbot
}

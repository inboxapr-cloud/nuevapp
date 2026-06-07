// header — MiCantón.cr

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

function scrollDirTabs(px){
  const tabs=document.querySelector('.dir-tabs-scroll')||
             document.querySelector('[id^="catTabs"]')||
             document.querySelector('.subcats-scroll');
  if(tabs) tabs.scrollLeft+=px;
  // Fallback: scroll todos los scrollables horizontales
  document.querySelectorAll('[style*="overflow-x:auto"],[style*="overflow-x: auto"]')
    .forEach(el=>{ if(el.scrollWidth>el.clientWidth) el.scrollLeft+=px; });
}
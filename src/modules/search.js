/**
 * search — MiCantón.cr
 * Extraído del monolito micanton_v2.html
 * En v3: conectar a Firebase donde aplique
 */
// Nota: estas funciones usan variables globales de window.*
// Al migrar a Firebase, reemplazar con imports de ../state.js

function _buildIndex(){
  const idx=[];
  // Negocios / PROVEEDORES
  if(typeof PROVEEDORES!=='undefined'){
    PROVEEDORES.forEach(p=>{
      idx.push({
        mod:'negocios', id:p.id, tipo:p.tipo||'local',
        titulo:p.nm, sub:p.cat||'', desc:p.desc||'',
        tags:(p.tags||'').toLowerCase()+' '+(p.nm||'').toLowerCase()+' '+(p.cat||'').toLowerCase(),
        zona:p.zona||'', ic:'ti-building-store', co:p.co||'#185FA5', bg:p.bg||'#E6F1FB', av:p.av||'?',
        rt:p.rt, abierto:p.abierto,
        extra:p.precio||'',
        action:`cvDetalle=null;goMod('negocios')`,
      });
    });
  }
  // Empleo / JOBS
  if(typeof JOBS!=='undefined'){
    JOBS.forEach(j=>{
      idx.push({
        mod:'empleo', id:'j'+j.id, tipo:j.tipo||'',
        titulo:j.tit, sub:j.emp||'', desc:'',
        tags:(j.tit||'').toLowerCase()+' '+(j.emp||'').toLowerCase()+' '+(j.cat||'').toLowerCase(),
        zona:j.zona||AC.nm, ic:'ti-briefcase', co:'#185FA5', bg:'#E6F1FB', av:j.av||'?',
        extra:j.sal||'', urgent:j.urg,
        action:`goMod('empleo')`,
      });
    });
  }
  // Profesionales / PROS
  if(typeof PROS!=='undefined'){
    PROS.forEach(p=>{
      idx.push({
        mod:'servicios', id:'pro'+p.id, tipo:'profesional',
        titulo:p.nm, sub:p.of||'', desc:p.desc||'',
        tags:(p.nm||'').toLowerCase()+' '+(p.of||'').toLowerCase(),
        zona:p.zona||AC.nm, ic:'ti-tools', co:'#854F0B', bg:'#FAEEDA', av:p.in||'?',
        rt:p.rt, extra:p.svcs?.[0]?.p||'',
        action:`goMod('negocios')`,
      });
    });
  }
  // Compra & Venta / CV_ITEMS
  if(typeof CV_ITEMS!=='undefined'){
    CV_ITEMS.forEach(item=>{
      idx.push({
        mod:'clasificados', id:item.id, tipo:item.cat||'',
        titulo:item.nm, sub:item.pr||'', desc:item.desc||'',
        tags:(item.nm||'').toLowerCase()+' '+(item.cat||'').toLowerCase()+' '+(item.desc||'').toLowerCase(),
        zona:item.zona||AC.nm, ic:'ti-shopping-bag', co:'#534AB7', bg:'#EEEDFE', av:item.uid||'?',
        extra:item.estado||'', negociable:item.negociable,
        action:`cvDetalle='${item.id}';goMod('clasificados')`,
      });
    });
  }
  return idx;
}

function ejecutarBusqueda(q){
  if(!q||!q.trim()) return;
  searchQuery=q.trim();
  if(!searchRecent.includes(searchQuery)){ searchRecent.unshift(searchQuery); searchRecent=searchRecent.slice(0,8); }
  _calcResultados(searchQuery);
  if(searchOpen) _renderSoloResultados();
  else render();
}

function _calcResultados(q){
  const qLow=(q||'').toLowerCase().trim();
  if(!qLow){ searchResults=[]; return; }
  const idx=_buildIndex();
  searchResults=idx.filter(item=>{
    const modOk = searchModFiltro==='todos' || item.mod===searchModFiltro;
    const textOk = item.tags.includes(qLow)
                || item.titulo.toLowerCase().includes(qLow)
                || (item.sub||'').toLowerCase().includes(qLow)
                || (item.desc||'').toLowerCase().substring(0,100).includes(qLow);
    return modOk && textOk;
  }).slice(0,40);
}

function renderBuscadorModal(){
  const hasQ  = searchQuery.length > 0;
  const hasMod= searchModFiltro !== 'todos';
  const selMod= SEARCH_MODS.find(m=>m.id===searchModFiltro)||SEARCH_MODS[0];
  const canton = AC.nm||'tu cantón';
  const pais   = paisActivo||'Costa Rica';
  const prov   = AP||'Alajuela';

  return `<div style="position:fixed;inset:0;z-index:999;background:var(--bg);display:flex;flex-direction:column;max-width:480px;margin:0 auto">

    <!-- ── BARRA TOP ── -->
    <div style="background:var(--surf);border-bottom:.5px solid var(--bor);padding:10px 12px;display:flex;align-items:center;gap:8px;flex-shrink:0">
      <button onclick="cerrarBuscador()" style="width:34px;height:34px;border-radius:50%;border:none;background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <i class="ti ti-arrow-left" style="font-size:17px;color:var(--t1)"></i>
      </button>

      <!-- Input + selector de módulo estilo Amazon -->
      <div style="flex:1;display:flex;align-items:center;background:var(--bg);border:1.5px solid ${hasMod?'var(--b)':'var(--bor)'};border-radius:10px;overflow:hidden;height:40px">
        <!-- Selector módulo -->
        <div style="position:relative;flex-shrink:0">
          <select onchange="buscarMod(this.value)"
            style="appearance:none;-webkit-appearance:none;border:none;background:${hasMod?'var(--b)':'#E6F1FB'};color:${hasMod?'#fff':'var(--b)'};font-size:10px;font-weight:700;padding:0 20px 0 8px;height:40px;cursor:pointer;outline:none;border-right:.5px solid var(--bor);max-width:90px;font-family:inherit">
            ${SEARCH_MODS.map(m=>`<option value="${m.id}" ${searchModFiltro===m.id?'selected':''}>${m.nm}</option>`).join('')}
          </select>
          <i class="ti ti-chevron-down" style="position:absolute;right:4px;top:50%;transform:translateY(-50%);font-size:9px;pointer-events:none;color:${hasMod?'#fff':'var(--b)'}"></i>
        </div>
        <!-- Input -->
        <input id="searchInMain" type="text" value="${searchQuery}"
          style="flex:1;border:none;background:transparent;font-size:14px;color:var(--t1);padding:0 8px;height:40px;outline:none;font-family:inherit;min-width:0"
          placeholder="Buscar en ${canton}..."
          oninput="onSearchInput(this.value)"
          onkeydown="if(event.key==='Enter'){ejecutarBusqueda(this.value.trim());}">
        ${searchQuery?`<button onclick="clearSearch()" style="width:32px;height:40px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <i class="ti ti-x" style="font-size:14px;color:var(--t3)"></i></button>`:''}
      </div>
      <button onclick="const v=G('searchInMain')?.value;if(v&&v.trim())ejecutarBusqueda(v.trim())"
        style="width:40px;height:40px;border-radius:10px;border:none;background:var(--b);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <i class="ti ti-search" style="font-size:17px;color:#fff"></i>
      </button>
    </div>

    <!-- ── FILTRO GEO (País → Provincia → Cantón) ── -->
    <div style="background:var(--surf);border-bottom:.5px solid var(--bor);padding:7px 12px;display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;flex-shrink:0;align-items:center">
      <i class="ti ti-map-pin" style="font-size:13px;color:var(--b);flex-shrink:0"></i>
      <!-- País -->
      <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;background:var(--bg);border:.5px solid var(--bor);border-radius:20px;padding:4px 10px;cursor:pointer" onclick="abrirGeoModal('pais')">
        <span style="font-size:11px;font-weight:600;color:var(--t2)">${pais}</span>
        <i class="ti ti-chevron-down" style="font-size:9px;color:var(--t3)"></i>
      </div>
      <i class="ti ti-chevron-right" style="font-size:10px;color:var(--t3);flex-shrink:0"></i>
      <!-- Provincia -->
      <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;background:var(--bg);border:.5px solid var(--bor);border-radius:20px;padding:4px 10px;cursor:pointer" onclick="abrirGeoModal('prov')">
        <span style="font-size:11px;font-weight:600;color:var(--t2)">${prov}</span>
        <i class="ti ti-chevron-down" style="font-size:9px;color:var(--t3)"></i>
      </div>
      <i class="ti ti-chevron-right" style="font-size:10px;color:var(--t3);flex-shrink:0"></i>
      <!-- Cantón -->
      <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;background:var(--b);border-radius:20px;padding:4px 10px;cursor:pointer" onclick="abrirGeoModal('cant')">
        <i class="ti ti-map-pin" style="font-size:10px;color:#fff"></i>
        <span style="font-size:11px;font-weight:700;color:#fff">${canton}</span>
        <i class="ti ti-chevron-down" style="font-size:9px;color:rgba(255,255,255,.7)"></i>
      </div>
    </div>

    <!-- ── CUERPO (panel con ID para actualizar sin re-render) ── -->
    <div id="searchResultsPanel" style="flex:1;overflow-y:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch">
    ${!hasQ?`
    <!-- Estado vacío: recientes + módulos para explorar -->
    <div style="padding:14px">

      ${searchRecent.length>0?`
      <!-- Búsquedas recientes -->
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;display:flex;align-items:center;gap:5px">
        <i class="ti ti-history" style="font-size:12px"></i>Búsquedas recientes
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px">
        ${searchRecent.map(r=>`<span onclick="G('searchInMain').value='${r}';ejecutarBusqueda('${r}')"
          style="display:flex;align-items:center;gap:5px;font-size:12px;padding:5px 12px;border-radius:20px;background:var(--bg);border:.5px solid var(--bor);cursor:pointer;color:var(--t2)">
          <i class="ti ti-clock" style="font-size:10px;color:var(--t3)"></i>${r}
        </span>`).join('')}
      </div>`:''}

      <!-- Buscar por módulo -->
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;display:flex;align-items:center;gap:5px">
        <i class="ti ti-layout-grid" style="font-size:12px"></i>Buscar en...
      </p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px">
        ${SEARCH_MODS.filter(m=>m.id!=='todos').map(m=>`<div onclick="buscarMod('${m.id}')"
          style="display:flex;align-items:center;gap:10px;padding:12px;border-radius:var(--r);border:${searchModFiltro===m.id?'2px solid var(--b)':'.5px solid var(--bor)'};background:${searchModFiltro===m.id?'#E6F1FB':'var(--surf)'};cursor:pointer">
          <div style="width:36px;height:36px;border-radius:var(--rs);background:${searchModFiltro===m.id?'var(--b)':'#E6F1FB'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <i class="ti ${m.ic}" style="font-size:18px;color:${searchModFiltro===m.id?'#fff':'var(--b)'}"></i>
          </div>
          <div>
            <p style="font-size:12px;font-weight:700;color:${searchModFiltro===m.id?'var(--b)':'var(--t1)'}">${m.nm}</p>
            <p style="font-size:10px;color:var(--t3)">en ${canton}</p>
          </div>
        </div>`).join('')}
      </div>

      <!-- Sugerencias según módulo seleccionado -->
      ${searchModFiltro!=='todos'?`
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;display:flex;align-items:center;gap:5px">
        <i class="ti ti-sparkles" style="font-size:12px"></i>Sugerencias en ${selMod.nm}
      </p>
      <div style="display:flex;flex-direction:column;gap:5px">
        ${_getSuggestions(searchModFiltro).map(sg=>`<div onclick="G('searchInMain').value='${sg}';ejecutarBusqueda('${sg}')"
          style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg);border:.5px solid var(--bor);border-radius:var(--rs);cursor:pointer">
          <i class="ti ti-search" style="font-size:13px;color:var(--t3);flex-shrink:0"></i>
          <p style="font-size:13px;color:var(--t1)">${sg}</p>
        </div>`).join('')}
      </div>`:''}
    </div>`:`

    <!-- ── RESULTADOS ── -->
    <div style="padding:12px">
      <!-- Resumen -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <p style="font-size:12px;color:var(--t3)">
          <strong style="color:var(--t1)">${searchResults.length}</strong> resultado${searchResults.length!==1?'s':''} para
          "<strong style="color:var(--b)">${searchQuery}</strong>"
          ${hasMod?`<span style="background:#E6F1FB;color:var(--b);font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;margin-left:5px">${selMod.nm}</span>`:''}
          · <span style="color:var(--b)">${canton}</span>
        </p>
        ${searchResults.length>0?`<button onclick="clearSearch()" style="font-size:10px;color:var(--t3);background:none;border:none;cursor:pointer;font-family:inherit;text-decoration:underline">Limpiar</button>`:''}
      </div>

      ${searchResults.length>0?`
      <div style="display:flex;flex-direction:column;gap:6px">
        ${searchResults.map(r=>`
        <div onclick="${r.action||`goMod('${r.mod}')`};cerrarBuscador()"
          style="display:flex;align-items:center;gap:11px;padding:11px 13px;background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);cursor:pointer;active:background:var(--bg)">
          <!-- Avatar -->
          <div style="width:40px;height:40px;border-radius:var(--rs);background:${r.bg||'#E6F1FB'};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:${r.co||'var(--b)'};flex-shrink:0">
            ${r.av||'?'}
          </div>
          <!-- Info -->
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:5px;margin-bottom:2px">
              <p style="font-size:13px;font-weight:700;color:var(--t1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.titulo}</p>
              ${r.abierto?'<span style="font-size:8px;font-weight:700;background:#E1F5EE;color:#0F6E56;padding:1px 5px;border-radius:5px;flex-shrink:0">Abierto</span>':''}
              ${r.urgent?'<span style="font-size:8px;font-weight:700;background:#FAEEDA;color:#854F0B;padding:1px 5px;border-radius:5px;flex-shrink:0">Urgente</span>':''}
            </div>
            <p style="font-size:11px;color:var(--t3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
              ${r.sub?r.sub+' · ':''}${r.zona}
            </p>
            ${r.extra?`<p style="font-size:11px;font-weight:700;color:var(--b);margin-top:1px">${r.extra}</p>`:''}
          </div>
          <!-- Módulo badge + flecha -->
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0">
            <span style="font-size:9px;font-weight:600;background:var(--bg);color:var(--t3);padding:2px 7px;border-radius:8px;border:.5px solid var(--bor)">${SEARCH_MODS.find(m=>m.id===r.mod)?.nm||r.mod}</span>
            ${r.rt?`<span style="font-size:10px;color:#EF9F27">★ ${r.rt}</span>`:''}
          </div>
        </div>`).join('')}
      </div>`:`
      <!-- Sin resultados -->
      <div style="padding:50px 20px;text-align:center">
        <i class="ti ti-search-off" style="font-size:44px;color:var(--bor);display:block;margin-bottom:12px"></i>
        <p style="font-size:15px;font-weight:700;color:var(--t2);margin-bottom:6px">Sin resultados en ${canton}</p>
        <p style="font-size:12px;color:var(--t3);margin-bottom:16px">
          No encontramos "<strong>${searchQuery}</strong>"${hasMod?` en ${selMod.nm}`:''}.<br>Intentá con otro término.
        </p>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
          ${hasMod?`<button onclick="buscarMod('todos')" style="background:var(--b);color:#fff;border:none;border-radius:var(--rs);padding:9px 16px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">Buscar en todo</button>`:''}
          <button onclick="clearSearch()" style="background:var(--bg);color:var(--t2);border:.5px solid var(--bor);border-radius:var(--rs);padding:9px 16px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit">Ver todo</button>
        </div>
      </div>`}
    </div>`}

    </div>
  </div>`;
}

function _renderResultadosHTML(){
  const hasQ  = searchQuery.length > 0;
  const hasMod= searchModFiltro !== 'todos';
  const selMod= (SEARCH_MODS||[]).find(m=>m.id===searchModFiltro)||(SEARCH_MODS||[])[0]||{nm:'Todos'};
  const canton = AC?.nm||'tu cantón';

  if(!hasQ) return _renderExploradorHTML();

  if(searchResults.length===0) return `
  <div style="padding:50px 20px;text-align:center">
    <i class="ti ti-search-off" style="font-size:44px;color:var(--bor);display:block;margin-bottom:12px"></i>
    <p style="font-size:15px;font-weight:700;color:var(--t2);margin-bottom:6px">Sin resultados en ${canton}</p>
    <p style="font-size:12px;color:var(--t3);margin-bottom:16px">No encontramos "<strong>${searchQuery}</strong>"${hasMod?' en '+selMod.nm:''}.<br>Intentá con otro término.</p>
    <div style="display:flex;gap:8px;justify-content:center">
      ${hasMod?`<button onclick="buscarMod('todos')" style="background:var(--b);color:#fff;border:none;border-radius:var(--rs);padding:9px 16px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">Buscar en todo</button>`:''}
      <button onclick="clearSearch()" style="background:var(--bg);color:var(--t2);border:.5px solid var(--bor);border-radius:var(--rs);padding:9px 16px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit">Ver todo</button>
    </div>
  </div>`;

  return `
  <div style="padding:10px 12px 4px;display:flex;align-items:center;justify-content:space-between">
    <p style="font-size:12px;color:var(--t3)">
      <strong style="color:var(--t1)">${searchResults.length}</strong> resultado${searchResults.length!==1?'s':''}
      · "<strong style="color:var(--b)">${searchQuery}</strong>"
      ${hasMod?`<span style="background:#E6F1FB;color:var(--b);font-size:10px;font-weight:700;padding:1px 7px;border-radius:8px;margin-left:4px">${selMod.nm}</span>`:''}
    </p>
    <button onclick="clearSearch()" style="font-size:10px;color:var(--t3);background:none;border:none;cursor:pointer;font-family:inherit;text-decoration:underline">Limpiar</button>
  </div>
  <div style="padding:4px 12px 12px;display:flex;flex-direction:column;gap:6px">
    ${searchResults.map(r=>`
    <div onclick="${r.action||`goMod('${r.mod}')`};cerrarBuscador()"
      style="display:flex;align-items:center;gap:11px;padding:10px 12px;background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);cursor:pointer">
      <div style="width:40px;height:40px;border-radius:var(--rs);background:${r.bg||'#E6F1FB'};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:${r.co||'var(--b)'};flex-shrink:0">${r.av||'?'}</div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:5px;margin-bottom:1px">
          <p style="font-size:13px;font-weight:700;color:var(--t1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.titulo}</p>
          ${r.abierto?'<span style="font-size:8px;font-weight:700;background:#E1F5EE;color:#0F6E56;padding:1px 5px;border-radius:5px;flex-shrink:0">Abierto</span>':''}
          ${r.urgent?'<span style="font-size:8px;font-weight:700;background:#FAEEDA;color:#854F0B;padding:1px 5px;border-radius:5px;flex-shrink:0">Urgente</span>':''}
        </div>
        <p style="font-size:11px;color:var(--t3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.sub?r.sub+' · ':''}${r.zona}</p>
        ${r.extra?`<p style="font-size:11px;font-weight:700;color:var(--b)">${r.extra}</p>`:''}
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px;flex-shrink:0">
        <span style="font-size:9px;font-weight:600;background:var(--bg);color:var(--t3);padding:1px 6px;border-radius:7px;border:.5px solid var(--bor)">${(SEARCH_MODS||[]).find(m=>m.id===r.mod)?.nm||r.mod}</span>
        ${r.rt?`<span style="font-size:10px;color:#EF9F27">★ ${r.rt}</span>`:''}
      </div>
    </div>`).join('')}
  </div>`;
}

function _renderExploradorHTML(){
  const canton=AC?.nm||'tu cantón';
  return `
  <div style="padding:14px">
    ${searchRecent.length>0?`
    <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;display:flex;align-items:center;gap:5px">
      <i class="ti ti-history" style="font-size:11px"></i>Recientes</p>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">
      ${searchRecent.map(r=>`<span onclick="const el=G('searchInMain');if(el){el.value='${r}';}onSearchInput('${r}')"
        style="display:flex;align-items:center;gap:4px;font-size:12px;padding:5px 11px;border-radius:20px;background:var(--bg);border:.5px solid var(--bor);cursor:pointer;color:var(--t2)">
        <i class="ti ti-clock" style="font-size:10px;color:var(--t3)"></i>${r}</span>`).join('')}
    </div>`:''}
    <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Buscar en...</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">
      ${(SEARCH_MODS||[]).filter(m=>m.id!=='todos').map(m=>`<div onclick="buscarMod('${m.id}')"
        style="display:flex;align-items:center;gap:9px;padding:11px;border-radius:var(--r);border:${searchModFiltro===m.id?'2px solid var(--b)':'.5px solid var(--bor)'};background:${searchModFiltro===m.id?'#E6F1FB':'var(--surf)'};cursor:pointer">
        <div style="width:34px;height:34px;border-radius:var(--rs);background:${searchModFiltro===m.id?'var(--b)':'#E6F1FB'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <i class="ti ${m.ic}" style="font-size:17px;color:${searchModFiltro===m.id?'#fff':'var(--b)'}"></i>
        </div>
        <div>
          <p style="font-size:12px;font-weight:700;color:${searchModFiltro===m.id?'var(--b)':'var(--t1)'}">${m.nm}</p>
          <p style="font-size:10px;color:var(--t3)">en ${canton}</p>
        </div>
      </div>`).join('')}
    </div>
    ${searchModFiltro!=='todos'?`
    <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Sugerencias</p>
    <div style="display:flex;flex-direction:column;gap:4px">
      ${_getSuggestions(searchModFiltro).map(sg=>`<div onclick="const el=G('searchInMain');if(el){el.value='${sg}';}onSearchInput('${sg}')"
        style="display:flex;align-items:center;gap:9px;padding:9px 12px;background:var(--bg);border:.5px solid var(--bor);border-radius:var(--rs);cursor:pointer">
        <i class="ti ti-search" style="font-size:12px;color:var(--t3);flex-shrink:0"></i>
        <p style="font-size:13px;color:var(--t1)">${sg}</p>
      </div>`).join('')}
    </div>`:''}
  </div>`;
}

function abrirBuscador(){
  searchOpen=true; render();
  setTimeout(()=>{ const el=G('searchInMain'); if(el) el.focus(); },120);
}

function cerrarBuscador(){
  searchOpen=false; render();
}

function buscarMod(modId){
  searchModFiltro=modId; searchCatFiltro=modId;
  if(searchQuery.trim()){
    _calcResultados(searchQuery);
    _renderSoloResultados();
  } else {
    // Re-render solo el panel de sugerencias
    const panel=G('searchResultsPanel');
    if(panel) panel.innerHTML=_renderResultadosHTML();
    // Actualizar selector visual
    const sel=G('searchModSel');
    if(sel) sel.value=modId;
  }
}

function setSearchCat(catId){
  searchModFiltro=catId; searchCatFiltro=catId;
  if(searchQuery.trim()) _calcResultados(searchQuery);
  _renderSoloResultados();
}
// providers — MiCantón.cr

function renderProveedores(){
  if(provDetalle) return renderProveedorDetalle(provDetalle);
  const filtros = [
    {id:'todos',   nm:'Todos',    ic:'ti-grid-dots'},
    {id:'servicios',nm:'Servicios',ic:'ti-tools'},
    {id:'negocios', nm:'Negocios', ic:'ti-building-store'},
    {id:'diseño',   nm:'Diseño',   ic:'ti-sparkles'},
    {id:'productos',nm:'Productos',ic:'ti-package'},
  ];
  const filtroMap = {gastronomia:'gastronomia',comercio:'negocios',salud:'negocios',belleza:'negocios',automotriz:'negocios',educacion:'negocios',diseno:'diseño',tecnologia:'negocios',inmuebles:'negocios',servicios:'servicios'};
  let lista = provFiltro==='todos' ? PROVEEDORES :
              PROVEEDORES.filter(p=>{
                const mapped=filtroMap[provFiltro];
                return mapped ? (p.filtro===mapped||p.cat.toLowerCase().includes(provFiltro.replace('diseno','dise'))||p.tags.toLowerCase().includes(provFiltro)) : p.filtro===provFiltro;
              });
  const featured = lista.filter(p=>p.featured);
  const resto    = lista.filter(p=>!p.featured);

  return `
  <div style="display:flex;align-items:center;background:var(--surf);border-bottom:.5px solid var(--bor)">
    <button onclick="scrollDirTabs(-120)" style="background:none;border:none;border-right:.5px solid var(--bor);padding:0 8px;cursor:pointer;color:var(--t3);flex-shrink:0;height:52px;display:flex;align-items:center"><i class="ti ti-chevron-left" style="font-size:16px"></i></button>
    <div id="dirTabsInner" style="display:flex;overflow-x:auto;scrollbar-width:none;flex:1">
      ${(SUBCATS.directorio||[]).map(c=>`<div style="display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 12px;cursor:pointer;border-bottom:2px solid ${provFiltro===c.id?'var(--g)':'transparent'};white-space:nowrap;flex-shrink:0" onclick="provFiltro='${c.id}';provDetalle=null;render()">
        <i class="ti ${c.ic}" style="font-size:16px;color:${provFiltro===c.id?'var(--g)':'var(--t3)'}"></i>
        <span style="font-size:9px;font-weight:600;color:${provFiltro===c.id?'var(--g)':'var(--t3)'}">${c.nm}</span>
      </div>`).join('')}
    </div>
    <button onclick="scrollDirTabs(120)" style="background:none;border:none;border-left:.5px solid var(--bor);padding:0 8px;cursor:pointer;color:var(--t3);flex-shrink:0;height:52px;display:flex;align-items:center"><i class="ti ti-chevron-right" style="font-size:16px"></i></button>
  </div>
  ${(()=>{const active=SUBCATS.directorio?.find(c=>c.id===provFiltro);return active?.subs?.length?`<div style="display:flex;gap:5px;overflow-x:auto;scrollbar-width:none;padding:7px 12px;background:var(--bg);border-bottom:.5px solid var(--bor)">${active.subs.map(s=>`<span style="font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px;white-space:nowrap;cursor:pointer;background:${provSubFiltro===s?'var(--g)':'var(--surf)'};color:${provSubFiltro===s?'#fff':'var(--t3)'};border:.5px solid ${provSubFiltro===s?'var(--g)':'var(--bor)'}" onclick="provSubFiltro='${s}';render()">${s}</span>`).join('')}</div>`:'';})()}

  <div style="padding:10px 12px">
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
    <p style="font-size:11px;color:var(--t3)">${lista.length} proveedor${lista.length!==1?'es':''} en <strong style="color:var(--t1)">${AC.nm}</strong></p>
    <div style="display:flex;gap:5px">
      <span style="font-size:10px;font-weight:600;background:#E1F5EE;color:#0F6E56;padding:2px 8px;border-radius:10px">${lista.filter(p=>p.abierto).length} abiertos</span>
    </div>
  </div>

  ${featured.length ? `
  <p style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--t3);margin-bottom:7px;display:flex;align-items:center;gap:5px"><i class="ti ti-star" style="color:#EF9F27;font-size:12px"></i>Destacados</p>
  ${featured.map(p=>renderProvCard(p,'large')).join('')}
  <p style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--t3);margin:10px 0 7px">Todos los proveedores</p>
  ` : ''}
  ${resto.map(p=>renderProvCard(p,'normal')).join('')}

  <button class="bigbtn" style="margin-top:6px" onclick="goMod('publicar')"><i class="ti ti-plus"></i>Publicar mi negocio o servicio</button>
  </div>`;
}

function renderProvCard(p, size){
  const tb = TIPO_BADGE[p.tipo]||TIPO_BADGE.local;
  const stars = Math.round(p.rt||0);

  // ── 4 botones siempre visibles ──
  const btnWA = `<button onclick="event.stopPropagation();${p.wa?`abrirWhatsApp('${p.wa}','Hola, vi su perfil en MiCantón.cr 👋')`:`showToast('Sin WhatsApp registrado')`}"
      style="flex:1;padding:9px 4px;border:none;background:none;font-size:10px;font-weight:700;color:${p.wa?'#25D366':'var(--t3)'};cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;border-right:.5px solid var(--bor);font-family:inherit">
      <i class="ti ti-brand-whatsapp" style="font-size:15px"></i>WhatsApp
    </button>`;

  const btnTel = `<button onclick="event.stopPropagation();${p.tel?`llamar('${p.tel}')`:`showToast('Sin teléfono registrado')`}"
      style="flex:1;padding:9px 4px;border:none;background:none;font-size:10px;font-weight:700;color:${p.tel?'var(--b)':'var(--t3)'};cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;border-right:.5px solid var(--bor);font-family:inherit">
      <i class="ti ti-phone" style="font-size:15px"></i>Llamar
    </button>`;

  const catTypeLabel = p.catalogType==='menu'?'Menú':p.catalogType==='servicios'?'Servicios':'Catálogo';
  const btnCat = `<button onclick="event.stopPropagation();VIEW='negocio-${p.id}';catViewFiltro='todos';render()"
      style="flex:1;padding:9px 4px;border:none;background:none;font-size:10px;font-weight:700;color:var(--b);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;border-right:.5px solid var(--bor);font-family:inherit">
      <i class="ti ti-package" style="font-size:15px"></i>${catTypeLabel}
    </button>`;

  const btnPerfil = `<button onclick="event.stopPropagation();irPerfilNegocio('${p.id}')"
      style="flex:1;padding:9px 4px;border:none;background:none;font-size:10px;font-weight:700;color:var(--t2);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;font-family:inherit">
      <i class="ti ti-user-circle" style="font-size:15px"></i>Perfil
    </button>`;

  const accionBar = `<div style="display:flex;border-top:.5px solid var(--bor)">${btnWA}${btnTel}${btnCat}${btnPerfil}</div>`;

  // ── Card GRANDE (featured) ──
  if(size==='large') return `
  <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);overflow:hidden;margin-bottom:10px">
    <div style="height:54px;background:linear-gradient(135deg,${p.bg},${p.co}22);position:relative">
      <div style="position:absolute;top:8px;left:12px;font-size:10px;font-weight:700;background:${tb.bg};color:${tb.co};padding:2px 8px;border-radius:20px;display:flex;align-items:center;gap:4px">
        <i class="ti ${tb.ic}" style="font-size:10px"></i>${tb.nm}
      </div>
      <div style="position:absolute;top:8px;right:12px;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:${p.abierto?'#E1F5EE':'#FDECEA'};color:${p.abierto?'#0F6E56':'#C0392B'}">
        ${p.abierto?'Abierto':'Cerrado'}
      </div>
    </div>
    <div style="padding:10px 13px 8px;display:flex;align-items:flex-start;gap:10px;cursor:pointer" onclick="irPerfilNegocio('${p.id}')">
      <div style="width:44px;height:44px;border-radius:12px;background:${p.bg};display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;color:${p.co};flex-shrink:0;border:2px solid var(--bg);margin-top:-22px;box-shadow:0 2px 8px rgba(0,0,0,.1)">
        ${p.av}
      </div>
      <div style="flex:1;min-width:0">
        <p style="font-size:14px;font-weight:700;color:var(--t1);margin-bottom:2px">${p.nm}</p>
        <p style="font-size:11px;color:var(--t3);margin-bottom:5px">${p.cat} · ${p.zona}</p>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span style="font-size:11px;font-weight:700;color:#854F0B;display:flex;align-items:center;gap:2px">
            <i class="ti ti-star-filled" style="font-size:11px;color:#EF9F27"></i>${p.rt||'5.0'}
            <span style="color:var(--t3);font-weight:400">(${p.rv||0})</span>
          </span>
          ${p.precio?`<span style="font-size:11px;color:var(--t3)">${p.precio}</span>`:''}
        </div>
      </div>
    </div>
    ${accionBar}
  </div>`;

  // ── Card NORMAL ──
  return `
  <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);overflow:hidden;margin-bottom:7px">
    <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;cursor:pointer" onclick="irPerfilNegocio('${p.id}')">
      <div style="width:44px;height:44px;border-radius:12px;background:${p.bg};display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;color:${p.co};flex-shrink:0">
        ${p.av}
      </div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:5px;margin-bottom:2px;flex-wrap:wrap">
          <p style="font-size:13px;font-weight:700;color:var(--t1)">${p.nm}</p>
          <span style="font-size:9px;font-weight:600;padding:1px 6px;border-radius:10px;background:${tb.bg};color:${tb.co}">${tb.nm}</span>
        </div>
        <p style="font-size:10px;color:var(--t3);margin-bottom:3px">${p.zona}${p.precio?' · '+p.precio:''}</p>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:10px;font-weight:700;color:#854F0B;display:flex;align-items:center;gap:2px">
            <i class="ti ti-star-filled" style="font-size:10px;color:#EF9F27"></i>${p.rt||'5.0'}
            <span style="color:var(--t3);font-weight:400">(${p.rv||0})</span>
          </span>
          <span style="font-size:10px;font-weight:600;color:${p.abierto?'#0F6E56':'#C0392B'}">${p.abierto?'● Abierto':'○ Cerrado'}</span>
          ${p.horario?`<span style="font-size:9px;color:var(--t3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100px">${p.horario.split('·')[0]?.trim()}</span>`:''}
        </div>
      </div>
    </div>
    ${accionBar}
  </div>`;
}

function renderProveedorDetalle(pid){
  const p = PROVEEDORES.find(x=>x.id===pid);
  if(!p) return '';
  const tb = TIPO_BADGE[p.tipo]||TIPO_BADGE.local;
  const catTabs = ['todo', ...new Set(p.catalogo.map(c=>c.cat))];
  const catFiltered = provCatDetalle==='todo' ? p.catalogo : p.catalogo.filter(c=>c.cat===provCatDetalle);

  return `
  <div style="background:linear-gradient(135deg,${p.bg},${p.co}44);padding:0;position:relative">
    <!-- COVER -->
    <div style="height:80px;background:linear-gradient(135deg,${p.co}44,${p.bg});display:flex;align-items:flex-end;padding:0 14px">
      <div style="width:60px;height:60px;border-radius:14px;background:${p.bg};display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;color:${p.co};border:3px solid var(--surf);position:relative;top:20px;flex-shrink:0">${p.av}</div>
      <div style="margin-left:10px;padding-bottom:6px;flex:1;min-width:0">
        <div style="display:flex;gap:5px;flex-wrap:wrap">
          <span style="font-size:10px;font-weight:700;background:${tb.bg};color:${tb.co};padding:2px 8px;border-radius:20px;display:flex;align-items:center;gap:3px"><i class="ti ${tb.ic}" style="font-size:10px"></i>${tb.nm}</span>
          ${p.verificado?'<span style="font-size:10px;font-weight:700;background:#E1F5EE;color:#0F6E56;padding:2px 8px;border-radius:20px;display:flex;align-items:center;gap:3px"><i class="ti ti-shield-check" style="font-size:10px"></i>Verificado</span>':''}
          ${p.abierto?'<span style="font-size:10px;font-weight:700;background:rgba(255,255,255,.8);color:#0F6E56;padding:2px 8px;border-radius:20px">Abierto ahora</span>':'<span style="font-size:10px;font-weight:700;background:rgba(255,255,255,.8);color:#854F0B;padding:2px 8px;border-radius:20px">Cerrado</span>'}
        </div>
      </div>
    </div>

    <!-- BACK BTN -->
    <div style="position:absolute;top:10px;left:12px;width:30px;height:30px;background:rgba(255,255,255,.85);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer" onclick="provDetalle=null;render()"><i class="ti ti-arrow-left" style="font-size:16px;color:var(--t1)"></i></div>
  </div>

  <div style="padding:28px 14px 14px;background:var(--surf);border-bottom:.5px solid var(--bor)">
    <p style="font-size:18px;font-weight:700;color:var(--t1);margin-bottom:3px">${p.nm}</p>
    <p style="font-size:12px;color:var(--t3);margin-bottom:5px">${p.cat} · ${p.zona}</p>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap">
      <span style="font-size:13px;font-weight:700;color:#854F0B">⭐${p.rt}</span>
      <span style="font-size:11px;color:var(--t3)">${p.rv} reseñas</span>
      ${p.equipo?`<span style="font-size:11px;color:var(--t3)">·</span><span style="font-size:11px;color:var(--t3)">${p.equipo} profesionales</span>`:''}
      <span style="font-size:11px;color:var(--t3)">·</span>
      <span style="font-size:11px;font-weight:600;color:var(--t2)">${p.precio}</span>
    </div>

    <!-- BOTONES PRINCIPALES -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
      <button style="padding:12px;border-radius:var(--rs);border:none;background:#25D366;color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px" onclick="abrirWhatsApp(p.wa,'Hola ${p.nm}, vi su perfil en MiCantón.cr y me interesa más información.')"><i class="ti ti-brand-whatsapp" style="font-size:15px"></i>WhatsApp</button>
      <button style="padding:12px;border-radius:var(--rs);border:none;background:var(--b);color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px" onclick="window.open('tel:'+p.tel.replace(/[^0-9+]/g,''))"><i class="ti ti-phone" style="font-size:15px"></i>Llamar</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
      <button style="padding:10px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t2);font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:5px" onclick="showToast('Reseñas disponibles próximamente')"><i class="ti ti-star" style="font-size:13px;color:#EF9F27"></i>Dejar reseña</button>
      <button style="padding:10px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t2);font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:5px" onclick="compartir('MiCantón.cr','Mirá este perfil en MiCantón.cr','https://micanton.cr')"><i class="ti ti-share" style="font-size:13px"></i>Compartir</button>
    </div>

    <!-- DIRECCIÓN + WAZE / MAPS -->
    ${p.dir?`<div style="background:var(--bg);border-radius:var(--rs);padding:10px 12px;margin-bottom:8px">
      <p style="font-size:11px;font-weight:600;color:var(--t1);margin-bottom:6px;display:flex;align-items:center;gap:5px"><i class="ti ti-map-pin" style="font-size:13px;color:var(--g)"></i>${p.dir}</p>
      <div style="display:grid;grid-template-columns:${p.waze&&p.maps?'1fr 1fr 1fr':'1fr 1fr'};gap:7px">
        ${p.waze?`<button style="padding:8px 6px;border-radius:var(--rs);border:none;background:#33CCFF;color:#fff;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:4px" onclick="abrirWaze(p.dir)"><i class="ti ti-navigation" style="font-size:12px"></i>Waze</button>`:''}
        ${p.maps?`<button style="padding:8px 6px;border-radius:var(--rs);border:none;background:#4285F4;color:#fff;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:4px" onclick="abrirMaps(p.dir)"><i class="ti ti-map" style="font-size:12px"></i>Google Maps</button>`:''}
        <button style="padding:8px 6px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--surf);color:var(--t2);font-size:10px;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:4px" onclick="copiarDireccion(p.dir)"><i class="ti ti-copy" style="font-size:12px"></i>Copiar</button>
      </div>
    </div>`:''}

    <!-- SOLICITAR DISEÑO RRSS -->
    <div style="background:#EEEDFE;border:.5px solid #AFA9EC;border-radius:var(--rs);padding:10px 12px;margin-bottom:8px;display:flex;align-items:center;gap:10px">
      <div style="flex:1"><p style="font-size:11px;font-weight:700;color:#3C3489;margin-bottom:2px;display:flex;align-items:center;gap:4px"><i class="ti ti-sparkles" style="font-size:12px;color:#534AB7"></i>Solicitá diseño para RRSS</p><p style="font-size:10px;color:#534AB7">Posts · Reels · Carruseles · Stories</p></div>
      <button style="font-size:11px;font-weight:700;padding:8px 12px;border-radius:var(--rs);border:none;background:#534AB7;color:#fff;cursor:pointer;font-family:inherit;white-space:nowrap" onclick="goMod('negocio');setPnTab('marketing')">Solicitar →</button>
    </div>

    <!-- INFO RÁPIDA -->
    <div style="display:flex;flex-direction:column;gap:5px">
      <div style="font-size:11px;color:var(--t2);display:flex;align-items:center;gap:6px"><i class="ti ti-clock" style="font-size:13px;color:var(--g);flex-shrink:0"></i>${p.horario}</div>
      <div style="font-size:11px;color:var(--t2);display:flex;align-items:center;gap:6px"><i class="ti ti-credit-card" style="font-size:13px;color:var(--g);flex-shrink:0"></i>${p.pago}</div>
      ${p.wifi?'<div style="font-size:11px;color:var(--t2);display:flex;align-items:center;gap:6px"><i class="ti ti-wifi" style="font-size:13px;color:var(--g);flex-shrink:0"></i>WiFi disponible para clientes</div>':''}
      ${p.acc?'<div style="font-size:11px;color:var(--t2);display:flex;align-items:center;gap:6px"><i class="ti ti-accessible" style="font-size:13px;color:var(--g);flex-shrink:0"></i>Acceso para personas con discapacidad</div>':''}
    </div>
  </div>

  <!-- DESCRIPCIÓN -->
  <div style="padding:12px 14px;background:var(--surf);border-bottom:.5px solid var(--bor)">
    <p style="font-size:11px;font-weight:700;color:var(--t2);margin-bottom:5px;text-transform:uppercase;letter-spacing:.04em">Sobre ${p.nm.split(' ')[0]}</p>
    <p style="font-size:12px;color:var(--t3);line-height:1.55">${p.desc}</p>
    <div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:8px">
      ${p.servicios.map(s=>`<span style="font-size:10px;font-weight:600;padding:3px 9px;border-radius:20px;background:var(--bg);border:.5px solid var(--bor);color:var(--t2)">${s}</span>`).join('')}
    </div>
  </div>

  <!-- CATÁLOGO / MENÚ CON QR Y PDF -->
  <div style="background:var(--surf);border-bottom:.5px solid var(--bor)">
    <div style="padding:10px 14px;display:flex;align-items:center;justify-content:space-between">
      <p style="font-size:12px;font-weight:700;color:var(--t1);display:flex;align-items:center;gap:5px"><i class="ti ti-package" style="font-size:14px;color:var(--g)"></i>${p.tipo==='local'||p.tipo==='empresa'?'Menú / Catálogo':'Lista de servicios'}</p>
      <div style="display:flex;gap:6px">
        <button style="font-size:10px;font-weight:600;padding:4px 9px;border-radius:20px;border:none;background:#E1F5EE;color:#0F6E56;cursor:pointer;display:flex;align-items:center;gap:3px;font-family:inherit" onclick="setCatTab('exportar')"><i class="ti ti-qrcode" style="font-size:11px"></i>QR</button>
        <button style="font-size:10px;font-weight:600;padding:4px 9px;border-radius:20px;border:none;background:#FCEBEB;color:#A32D2D;cursor:pointer;display:flex;align-items:center;gap:3px;font-family:inherit" onclick="generarPDFCatalogo()"><i class="ti ti-file-type-pdf" style="font-size:11px"></i>PDF</button>
        <button style="font-size:10px;font-weight:600;padding:4px 9px;border-radius:20px;border:none;background:#E6F1FB;color:#185FA5;cursor:pointer;display:flex;align-items:center;gap:3px;font-family:inherit" onclick="compartirCatalogoWA()"><i class="ti ti-brand-whatsapp" style="font-size:11px"></i>Compartir</button>
      </div>
    </div>
    <!-- CATEGORÍAS DEL CATÁLOGO -->
    ${catTabs.length>2?`<div style="display:flex;gap:5px;overflow-x:auto;scrollbar-width:none;padding:0 14px 8px">
      ${catTabs.map(c=>`<span style="font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px;white-space:nowrap;cursor:pointer;background:${provCatDetalle===c?'var(--g)':'var(--bg)'};color:${provCatDetalle===c?'#fff':'var(--t3)'};border:.5px solid ${provCatDetalle===c?'var(--g)':'var(--bor)'}" onclick="provCatDetalle='${c}';render()">${c==='todo'?'Todos':c}</span>`).join('')}
    </div>`:''}
    <!-- ITEMS -->
    ${catFiltered.map((item,idx)=>`<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-top:.5px solid var(--bor)">
      <div style="width:44px;height:42px;border-radius:9px;background:${item.foto?'#E1F5EE':'var(--bg)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;border:.5px solid var(--bor)">
        <i class="ti ti-${item.foto?'photo':'package'}" style="font-size:18px;color:${item.foto?'var(--g)':'var(--t3)'}"></i>
      </div>
      <div style="flex:1;min-width:0">
        <p style="font-size:12px;font-weight:700;color:var(--t1);margin-bottom:2px;display:flex;align-items:center;gap:5px">${item.nm}${item.popular?'<span style="font-size:9px;font-weight:700;background:#FAEEDA;color:#854F0B;padding:1px 6px;border-radius:10px">Popular</span>':''}</p>
        <p style="font-size:10px;color:var(--t3)">${item.cat}</p>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <p style="font-size:13px;font-weight:700;color:var(--g);margin-bottom:4px">${item.pr}</p>
        ${renderBtnCarrito(p.id,p.nm,p.av,p.bg,p.co,'item-'+(idx||0),item.nm,item.pr,parseInt((item.pr.replace(/[^0-9]/g,'')||'0')),'producto')}
      </div>
    </div>`).join('')}
  </div>

  <!-- RESEÑAS -->
  <div style="padding:12px 14px;background:var(--surf)">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <p style="font-size:12px;font-weight:700;color:var(--t1);display:flex;align-items:center;gap:5px"><i class="ti ti-star" style="font-size:14px;color:#EF9F27"></i>Reseñas · ${p.rt}★ (${p.rv})</p>
      <button style="font-size:11px;font-weight:600;color:var(--g);background:none;border:none;cursor:pointer;font-family:inherit" onclick="showToast('Ver todas las reseñas próximamente')">Ver todas →</button>
    </div>
    ${[{av:'MV',bg:'#E1F5EE',co:'#0F6E56',nm:'María V.',st:5,dt:'Hace 3 días',tx:'Excelente servicio. Muy profesionales y puntuales. Lo recomiendo totalmente.',ver:true},{av:'JP',bg:'#EEEDFE',co:'#534AB7',nm:'Juan P.',st:5,dt:'Hace 1 semana',tx:'Perfecto. El precio fue justo y el trabajo quedó impecable.',ver:true},{av:'AL',bg:'#FAEEDA',co:'#854F0B',nm:'Ana L.',st:4,dt:'Hace 2 semanas',tx:'Buena atención y buen trabajo. Tardó un poco más de lo prometido pero el resultado fue excelente.',ver:false}].map(r=>`
    <div style="padding:10px 0;border-bottom:.5px solid var(--bor)">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">
        <div style="width:28px;height:28px;border-radius:50%;background:${r.bg};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:${r.co};flex-shrink:0">${r.av}</div>
        <div style="flex:1"><p style="font-size:12px;font-weight:700;color:var(--t1)">${r.nm}${r.ver?'<span style="font-size:9px;font-weight:600;background:#E1F5EE;color:#0F6E56;padding:1px 6px;border-radius:10px;margin-left:5px">✓ Verificado</span>':''}</p><div style="display:flex">${Array(r.st).fill('<i class="ti ti-star" style="font-size:11px;color:#EF9F27"></i>').join('')}${Array(5-r.st).fill('<i class="ti ti-star" style="font-size:11px;color:var(--bor)"></i>').join('')}</div></div>
        <span style="font-size:10px;color:var(--t3)">${r.dt}</span>
      </div>
      <p style="font-size:12px;color:var(--t3);line-height:1.45">${r.tx}</p>
    </div>`).join('')}
    <button style="width:100%;margin-top:10px;padding:10px;border-radius:var(--rs);border:1.5px dashed var(--bor);background:var(--bg);color:var(--t2);font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px" onclick="showToast('Gracias, tu reseña se procesará pronto')"><i class="ti ti-star" style="font-size:13px;color:#EF9F27"></i>Dejar mi reseña</button>
  </div>`;
}
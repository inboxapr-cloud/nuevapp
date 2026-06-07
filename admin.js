// portal — MiCantón.cr

function renderInicio(){
  const proveedor1 = (PROVEEDORES||[])[0];
  return `
  <div style="padding:12px 12px 0">

  <!-- ── NOTICIAS DESTACADAS ─────────────────── -->
  <p style="font-size:12px;font-weight:700;color:var(--t1);margin-bottom:7px;display:flex;align-items:center;gap:5px">
    <i class="ti ti-news" style="font-size:14px;color:#E24B4A"></i>Noticias locales
  </p>
  <div class="card" style="margin-bottom:10px">
    <!-- Noticia destacada -->
    <div class="nfeat" onclick="goMod('noticias')" style="cursor:pointer">
      <span class="nf-tag">Destacado</span>
      <div class="nf-medio"><i class="ti ti-building-broadcast-tower"></i>Diario Occidente · ${AC.nm}</div>
      <p class="nf-title">Municipalidad de ${AC.nm} aprueba nuevo plan de desarrollo vial con inversión de ₡800 millones</p>
      <p class="nf-meta"><i class="ti ti-clock" style="font-size:10px"></i>Hace 1h <i class="ti ti-eye" style="font-size:10px"></i>1.240 vistas</p>
    </div>
    ${[
      {cat:'Urgente',cc:'#FCEBEB',ctc:'#A32D2D',tit:'Corte de agua programado miércoles en zonas norte',medio:'AyA Noticias',t:'Hace 3h',url:'https://aya.go.cr'},
      {cat:'Deporte',cc:'#E6F1FB',ctc:'#185FA5',tit:'La Liga clasifica a semifinal nacional sub-17',medio:'Deportes CR',t:'Hace 4h',url:'https://deportescr.com'},
      {cat:'Cultura',cc:'#EEEDFE',ctc:'#534AB7',tit:'Festival de las Artes confirma agosto en '+AC.nm,medio:'Cultura CR',t:'Hace 6h',url:'https://culturacr.cr'},
    ].map(n=>`<div class="nitem" onclick="abrirUrl('${n.url}')" style="cursor:pointer">
      <div class="nthumb"><i class="ti ti-photo"></i></div>
      <div>
        <span class="ncat" style="background:${n.cc};color:${n.ctc}">${n.cat}</span>
        <p class="ntit">${n.tit}</p>
        <div class="nmeta2">
          <span class="n-medio-tag"><i class="ti ti-building-broadcast-tower"></i>${n.medio}</span>
          <span>${n.t}</span>
        </div>
      </div>
    </div>`).join('')}
  </div>

  <!-- ── OFERTAS DEL DÍA ─────────────────────── -->
  <p style="font-size:12px;font-weight:700;color:var(--t1);margin-bottom:7px;display:flex;align-items:center;gap:5px">
    <i class="ti ti-ticket" style="font-size:14px;color:var(--g)"></i>Ofertas del día
  </p>
  <div class="card" style="margin-bottom:10px"><div class="ofgrid">
    ${[
      {id:'p1',neg:'El Mirador',desc:'Casado completo + refresco',pill:'₡3.500 hoy',bg:'#FAEEDA',tc:'#854F0B'},
      {id:'p2',neg:'Farmacia San Juan',desc:'20% descuento vitaminas',pill:'Solo hoy',bg:'#EAF3DE',tc:'#3B6D11'},
      {id:'p3',neg:'Auto Servicio',desc:'Cambio de aceite + revisión',pill:'₡18.000',bg:'#FAEEDA',tc:'#854F0B'},
      {id:'p4',neg:'Panadería La Esquina',desc:'Docena de pan casero',pill:'Hasta 12pm',bg:'#EAF3DE',tc:'#3B6D11'},
    ].map(o=>`<div class="ofitem" onclick="irPerfilNegocio('${o.id}')" style="cursor:pointer">
      <p class="of-neg"><i class="ti ti-building-store"></i>${o.neg}</p>
      <p class="of-desc">${o.desc}</p>
      <span class="of-pill" style="background:${o.bg};color:${o.tc}">${o.pill}</span>
    </div>`).join('')}
  </div></div>

  <!-- ── NEGOCIOS DESTACADOS ─────────────────── -->
  <p style="font-size:12px;font-weight:700;color:var(--t1);margin-bottom:7px;display:flex;align-items:center;gap:5px">
    <i class="ti ti-building-store" style="font-size:14px;color:var(--g)"></i>Negocios destacados
  </p>
  <div class="hscroll" style="margin-bottom:10px">
    ${(PROVEEDORES||[]).slice(0,5).map(n=>`
    <div class="hcard" onclick="irPerfilNegocio('${n.id}')" style="cursor:pointer">
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:6px">
        <div style="width:30px;height:30px;border-radius:8px;background:${n.bg};color:${n.co};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700">${n.av}</div>
        <div>
          <p style="font-size:11px;font-weight:700;color:var(--t1)">${n.nm}</p>
          <p style="font-size:10px;color:var(--t3)">${n.cat}</p>
        </div>
      </div>
      <p style="font-size:11px;color:#854F0B;font-weight:700;display:flex;align-items:center;gap:2px">
        <i class="ti ti-star" style="font-size:12px;color:#EF9F27"></i>${n.rt||'5.0'}
        <span style="font-size:9px;color:var(--t3);font-weight:400">(${n.rv||0})</span>
      </p>
      <span style="font-size:9px;font-weight:600;padding:2px 7px;border-radius:8px;background:${n.abierto?'#E1F5EE':'#FDECEA'};color:${n.abierto?'#085041':'#C0392B'};margin-top:4px;display:inline-block">${n.abierto?'Abierto':'Cerrado'}</span>
    </div>`).join('')}
  </div>

  <!-- ── PRÓXIMOS EVENTOS ─────────────────────── -->
  <p style="font-size:12px;font-weight:700;color:var(--t1);margin-bottom:7px;display:flex;align-items:center;gap:5px">
    <i class="ti ti-calendar-event" style="font-size:14px;color:var(--g)"></i>Próximos eventos
  </p>
  <div class="card" style="margin-bottom:10px">
    ${(EVENTOS_DATA||[]).slice(0,3).map(ev=>`
    <div class="evitem" onclick="${ev.url?`abrirUrl('${ev.url}')`:`goMod('eventos')`}" style="cursor:pointer">
      <div class="efecha" style="background:${ev.c}"><div class="edia">${ev.d}</div><div class="emes">${ev.m}</div></div>
      <div style="flex:1;min-width:0">
        <p class="enm">${ev.nm}</p>
        <p class="eloc"><i class="ti ti-map-pin"></i>${ev.loc} · ${ev.hr}</p>
        ${ev.org?`<p style="font-size:9px;color:var(--t3);margin-top:1px"><i class="ti ti-building" style="font-size:9px"></i> ${ev.org}</p>`:''}
      </div>
      <span class="etag" style="background:${ev.tc};color:${ev.tv}">${ev.tag}</span>
    </div>`).join('')}
  </div>

  <!-- ── SERVICIOS CERCA ─────────────────────── -->
  <p style="font-size:12px;font-weight:700;color:var(--t1);margin-bottom:7px;display:flex;align-items:center;gap:5px">
    <i class="ti ti-tools" style="font-size:14px;color:#185FA5"></i>Servicios cerca de vos
  </p>
  <div class="hscroll" style="padding-bottom:14px">
    ${(PROS||[]).slice(0,4).map(p=>`
    <div class="hcard" onclick="irPerfilProfesional('${p.id}')" style="cursor:pointer">
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:5px">
        <div style="width:30px;height:30px;border-radius:50%;background:${p.bg};color:${p.co};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700">${p.in||'?'}</div>
        <div>
          <p style="font-size:11px;font-weight:700;color:var(--t1)">${p.nm.split(' ')[0]}</p>
          <p style="font-size:10px;color:var(--t3)">${p.of.split(' ').slice(0,2).join(' ')}</p>
        </div>
      </div>
      <div style="display:flex;gap:1px;margin-bottom:3px">
        ${'<i class="ti ti-star-filled" style="font-size:10px;color:#EF9F27"></i>'.repeat(5)}
      </div>
      <p style="font-size:10px;color:var(--t3)">${p.rv||0} reseñas</p>
    </div>`).join('')}
  </div>

  </div>`;
}

function renderNoticias(){
  return `<div class="fbar">
    ${['Todas','Nacional','Local','Deportes','Cultura','Economía','Urgente'].map((f,i)=>`<span class="ftag${i===0?' on':''}" onclick="document.querySelectorAll('.ftag').forEach(x=>x.classList.remove('on','onb'));this.classList.add('on')">${f}</span>`).join('')}
  </div>
  <div style="padding:0 12px 12px">
  <div class="card" style="margin-top:10px">
    <div class="nfeat"><span class="nf-tag">Destacado</span><div class="nf-medio"><i class="ti ti-building-broadcast-tower"></i>Diario Occidente · ${AC.nm}</div><p class="nf-title">Municipalidad de ${AC.nm} aprueba nuevo plan de desarrollo vial con inversión de ₡800 millones para el cantón</p><p class="nf-meta"><i class="ti ti-clock" style="font-size:10px"></i>Hace 1h <i class="ti ti-eye" style="font-size:10px"></i>1.240 vistas</p></div>
    ${[{cat:'Municipal',cc:'#E1F5EE',ctc:'#0F6E56',tit:'Nuevo reglamento de construcción entra en vigencia la próxima semana',medio:'Diario Occidente',t:'Hace 2h',v:'842'},{cat:'Urgente',cc:'#FCEBEB',ctc:'#A32D2D',tit:'Corte de agua programado para zonas norte del cantón este miércoles',medio:'AyA Noticias CR',t:'Hace 3h',v:'2.341'},{cat:'Deportes',cc:'#E6F1FB',ctc:'#185FA5',tit:'Liga Deportiva Alajuelense clasifica a semifinal del torneo nacional sub-17',medio:'Deportes CR',t:'Hace 4h',v:'567'},{cat:'Cultura',cc:'#EEEDFE',ctc:'#534AB7',tit:'Festival Internacional de las Artes llega a ${AC.nm} en agosto con 30 espectáculos',medio:'Cultura Costa Rica',t:'Hace 6h',v:'389'},{cat:'Economía',cc:'#FAEEDA',ctc:'#854F0B',tit:'Tipo de cambio del dólar sube a ₡521 según informe del BCCR',medio:'Economía Hoy',t:'Hace 7h',v:'1.102'},{cat:'Local',cc:'#E1F5EE',ctc:'#0F6E56',tit:'Apertura de nuevo centro de salud beneficiará a 12.000 personas en ${AC.nm}',medio:'Diario Occidente',t:'Hace 8h',v:'743'}].map(n=>`<div class="nitem"><div class="nthumb"><i class="ti ti-photo"></i></div><div><span class="ncat" style="background:${n.cc};color:${n.ctc}">${n.cat}</span><p class="ntit">${n.tit}</p><div class="nmeta2"><span class="n-medio-tag"><i class="ti ti-building-broadcast-tower"></i>${n.medio}</span><span>${n.t}</span><span><i class="ti ti-eye" style="font-size:10px"></i>${n.v}</span></div></div></div>`).join('')}
  </div>
  <div style="margin-top:10px;background:#EEEDFE;border:.5px solid #AFA9EC;border-radius:var(--r);padding:13px;text-align:center">
    <p style="font-size:13px;font-weight:700;color:#3C3489;margin-bottom:3px">¿Sos periodista o tenés un medio?</p>
    <p style="font-size:11px;color:#534AB7;margin-bottom:10px">Primera publicación gratis · Llegá a toda la provincia</p>
    <button style="font-size:12px;font-weight:700;background:#534AB7;color:#fff;border:none;border-radius:9px;padding:9px 20px;cursor:pointer;font-family:inherit" onclick="goMod('registro')">Registrar mi medio →</button>
  </div>
  </div>`;
}

function renderNegocios(){
  // Directorio unificado reemplaza tanto "negocios" como "servicios"
  return renderProveedores();
}

function renderEmpleo(){
  if(empPublicarOpen) return renderEmpleoPublicar();
  return `${renderCatBar('empleo', empCatActiva||'todos', "empCatActiva='__CAT__';render()", '#3B6D11')}
  <div style="padding:10px 12px">
  <div class="tip"><i class="ti ti-info-circle"></i>Buscar empleo y postularse es gratis. Verificá tu identidad para que los empleadores vean tu perfil.</div>
  <div class="card">
    ${JOBS.map(j=>`<div class="jobitem${j.urg||j.nw?' feat':''}" onclick="VIEW='dj-${j.id}';render()">
      <div class="jt"><div class="jav" style="background:${j.bg};color:${j.co}">${j.av}</div><div style="flex:1"><p class="jtit">${j.tit}</p><p class="jemp"><i class="ti ti-building-store"></i>${j.emp}</p></div><button class="apply-btn" onclick="event.stopPropagation();pedirAcceso('contactar',()=>showToast('Postulación enviada al empleador ✓'))">Postular</button></div>
      <div class="jbadges"><span class="jb jb-t">${j.tipo}</span>${j.sal?`<span class="jb jb-s">${j.sal}</span>`:''}${j.urg?'<span class="jb jb-u">Urgente</span>':''}${j.nw?'<span class="jb jb-n">Nuevo</span>':''}${j.rem?'<span class="jb jb-r">Remoto</span>':''}</div>
      <div class="jmeta"><span><i class="ti ti-category"></i>${j.cat}</span><span><i class="ti ti-clock"></i>${j.t}</span></div>
    </div>`).join('')}
  </div>
  <button class="bigbtn" style="margin-top:4px" onclick="pedirAcceso('publicar_empleo',()=>{empPublicarOpen=true;render()})"><i class="ti ti-plus"></i>Publicar oferta laboral</button>
  </div>`;
}

function renderEventos(){
  if(evPublicarOpen) return renderEventoPublicar();
  return `
  <div style="background:linear-gradient(135deg,#0F6E56,#1D9E75);padding:12px 16px;display:flex;align-items:center;justify-content:space-between">
    <div><p style="font-size:15px;font-weight:700;color:#fff;margin-bottom:2px">Eventos en ${AC.nm}</p><p style="font-size:11px;color:rgba(255,255,255,.75)">${EVENTOS_DATA.length} próximos</p></div>
    <button style="background:rgba(255,255,255,.2);color:#fff;border:1px solid rgba(255,255,255,.4);border-radius:20px;padding:7px 13px;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:4px" onclick="pedirAcceso('publicar_evento',()=>{evPublicarOpen=true;render()})"><i class="ti ti-plus" style="font-size:12px"></i>Publicar evento</button>
  </div>
  ${renderCatBar('eventos', evCatActiva||'todos', "evCatActiva='__CAT__';render()", 'var(--g)')}
  <div style="padding:10px 12px"><div class="card">
    ${EVENTOS_DATA.map(e=>`<div style="display:flex;align-items:flex-start;gap:10px;padding:11px 13px;border-bottom:.5px solid var(--bor);cursor:pointer" onclick="showToast('Detalle completo próximamente')">
      <div style="width:46px;flex-shrink:0;text-align:center;background:${e.c};border-radius:9px;padding:6px 4px">
        <div style="font-size:20px;font-weight:700;color:#fff;line-height:1">${e.d}</div>
        <div style="font-size:10px;font-weight:600;color:rgba(255,255,255,.8);text-transform:uppercase">${e.m}</div>
      </div>
      <div style="flex:1;min-width:0">
        <p style="font-size:13px;font-weight:700;color:var(--t1);margin-bottom:3px;line-height:1.3">${e.nm}</p>
        <p style="font-size:11px;color:var(--t3);margin-bottom:4px;display:flex;align-items:center;gap:4px"><i class="ti ti-map-pin" style="font-size:11px"></i>${e.loc} · ${e.hr}</p>
        <p style="font-size:10px;color:var(--t3);margin-bottom:5px;display:flex;align-items:center;gap:4px"><i class="ti ti-user" style="font-size:11px"></i>${e.org}</p>
        <div style="display:flex;gap:5px;align-items:center">
          <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;background:${e.tc};color:${e.tv}">${e.tag}</span>
          <button style="font-size:10px;font-weight:600;padding:3px 9px;border-radius:10px;border:none;background:#E6F1FB;color:#185FA5;cursor:pointer;font-family:inherit" onclick="event.stopPropagation();pedirAcceso('publicar_evento',()=>showToast('Evento guardado en tu agenda ✓'))" >+ Mi agenda</button>
        </div>
      </div>
    </div>`).join('')}
  </div></div>`;
}

function renderOfertas(){
  if(ofPublicarOpen) return renderOfertaPublicar();
  return `${renderCatBar('ofertas', ofCatActiva||'todos', "ofCatActiva='__CAT__';render()", '#854F0B')}
  <div style="background:linear-gradient(135deg,#633806,#854F0B);padding:12px 16px;display:flex;align-items:center;justify-content:space-between">
    <div><p style="font-size:15px;font-weight:700;color:#fff;margin-bottom:2px">Ofertas del día</p><p style="font-size:11px;color:rgba(255,255,255,.75)">Solo por tiempo limitado</p></div>
    <button style="background:rgba(255,255,255,.2);color:#fff;border:1px solid rgba(255,255,255,.4);border-radius:20px;padding:7px 13px;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:4px" onclick="pedirAcceso('publicar_oferta',()=>{ofPublicarOpen=true;render()})"><i class="ti ti-plus" style="font-size:12px"></i>Mi oferta</button>
  </div>
  <div style="padding:10px 12px"><div class="card"><div class="ofgrid">
    ${OFERTAS_DATA.map(o=>`<div class="ofitem" onclick="pedirAcceso('leer',()=>showToast('Guardando oferta...'))" style="cursor:pointer">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px">
        <div style="width:22px;height:22px;border-radius:6px;background:${o.bg};display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:${o.co};flex-shrink:0">${o.av}</div>
        <p class="of-neg" style="margin:0">${o.neg}</p>
      </div>
      <p class="of-desc">${o.desc}</p>
      <span class="of-pill" style="background:#FAEEDA;color:#854F0B">${o.precio}</span>
      <p style="font-size:9px;color:var(--t3);margin-top:4px;display:flex;align-items:center;gap:3px"><i class="ti ti-clock" style="font-size:10px"></i>Vence: ${o.vence}</p>
    </div>`).join('')}
  </div></div></div>`;
}

function renderServicios(){
  return renderProveedores();
}
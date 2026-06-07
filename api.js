/**
 * profiles — MiCantón.cr
 * Extraído del monolito micanton_v2.html
 * En v3: conectar a Firebase donde aplique
 */
// Nota: estas funciones usan variables globales de window.*
// Al migrar a Firebase, reemplazar con imports de ../state.js

function renderPerfilNegocio(id){
  const neg = (PROVEEDORES||[]).find(p=>String(p.id)===String(id));
  if(!neg) return `<div style="padding:40px 20px;text-align:center"><p style="color:var(--t3)">Negocio no encontrado</p><button onclick="goBack()" style="margin-top:10px;padding:8px 16px;border-radius:var(--rs);border:none;background:var(--b);color:#fff;font-size:12px;cursor:pointer;font-family:inherit">Volver</button></div>`;

  const cats = (catalogItems||[]).filter(i=>i.activo);
  const catGroups = {};
  cats.forEach(i=>{ if(!catGroups[i.cat]) catGroups[i.cat]=[]; catGroups[i.cat].push(i); });

  return `
  <!-- HEADER foto/cover -->
  <div style="position:relative">
    <div style="height:120px;background:linear-gradient(135deg,${neg.bg||'#E1F5EE'},${neg.co||'#085041'}20)"></div>
    <button onclick="goBack()" style="position:absolute;top:10px;left:10px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.85);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center">
      <i class="ti ti-arrow-left" style="font-size:16px;color:var(--t1)"></i>
    </button>
    ${neg.web?`<button onclick="window.open('${neg.web}','_blank')" style="position:absolute;top:10px;right:10px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.85);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center">
      <i class="ti ti-world" style="font-size:15px;color:var(--b)"></i>
    </button>`:''}
    <!-- Avatar -->
    <div style="position:absolute;bottom:-22px;left:16px;width:54px;height:54px;border-radius:14px;background:${neg.bg};border:3px solid var(--bg);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:${neg.co}">
      ${neg.av}
    </div>
  </div>

  <!-- Info principal -->
  <div style="padding:30px 16px 12px">
    <div style="display:flex;align-items:flex-start;justify-content:space-between">
      <div>
        <p style="font-size:17px;font-weight:800;color:var(--t1)">${neg.nm}</p>
        <p style="font-size:12px;color:var(--t3);margin-top:2px">${neg.cat}</p>
      </div>
      ${neg.abierto!==undefined?`<span style="font-size:10px;font-weight:700;padding:3px 9px;border-radius:10px;background:${neg.abierto?'#E1F5EE':'#FDECEA'};color:${neg.abierto?'#085041':'#C0392B'}">${neg.abierto?'Abierto':'Cerrado'}</span>`:''}
    </div>
    ${neg.rt?`<div style="display:flex;align-items:center;gap:4px;margin-top:5px">
      ${'<i class="ti ti-star-filled" style="font-size:12px;color:#EF9F27"></i>'.repeat(Math.round(neg.rt))}
      <span style="font-size:12px;font-weight:700;color:var(--t1)">${neg.rt}</span>
      <span style="font-size:11px;color:var(--t3)">(${neg.rv||0} reseñas)</span>
    </div>`:''}
    <p style="font-size:13px;color:var(--t2);line-height:1.5;margin-top:8px">${neg.desc||''}</p>
  </div>

  <!-- Botones de contacto -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:0 16px 14px">
    ${neg.tel?`<button onclick="llamar('${neg.tel}')" style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:9px 4px;border-radius:var(--rs);border:none;background:var(--bg);cursor:pointer;font-family:inherit">
      <i class="ti ti-phone" style="font-size:18px;color:var(--b)"></i>
      <span style="font-size:9px;font-weight:600;color:var(--t3)">Llamar</span>
    </button>`:''}
    ${neg.wa?`<button onclick="abrirWhatsApp('${neg.wa}','Hola, vi tu negocio en MiCantón')" style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:9px 4px;border-radius:var(--rs);border:none;background:var(--bg);cursor:pointer;font-family:inherit">
      <i class="ti ti-brand-whatsapp" style="font-size:18px;color:#25D366"></i>
      <span style="font-size:9px;font-weight:600;color:var(--t3)">WhatsApp</span>
    </button>`:''}
    ${neg.waze?`<button onclick="window.open('${neg.waze}','_blank')" style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:9px 4px;border-radius:var(--rs);border:none;background:var(--bg);cursor:pointer;font-family:inherit">
      <i class="ti ti-navigation" style="font-size:18px;color:#00BCD4"></i>
      <span style="font-size:9px;font-weight:600;color:var(--t3)">Cómo llegar</span>
    </button>`:''}
    ${neg.web?`<button onclick="window.open('${neg.web}','_blank')" style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:9px 4px;border-radius:var(--rs);border:none;background:var(--bg);cursor:pointer;font-family:inherit">
      <i class="ti ti-world" style="font-size:18px;color:var(--b)"></i>
      <span style="font-size:9px;font-weight:600;color:var(--t3)">Sitio web</span>
    </button>`:''}
  </div>

  <!-- Info práctica -->
  <div style="margin:0 12px 12px;background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);overflow:hidden">
    ${neg.horario?`<div style="display:flex;align-items:center;gap:10px;padding:10px 13px;border-bottom:.5px solid var(--bor)">
      <i class="ti ti-clock" style="font-size:15px;color:var(--b);flex-shrink:0"></i>
      <p style="font-size:12px;color:var(--t1)">${neg.horario}</p>
    </div>`:''}
    ${neg.dir?`<div style="display:flex;align-items:center;gap:10px;padding:10px 13px;border-bottom:.5px solid var(--bor)">
      <i class="ti ti-map-pin" style="font-size:15px;color:var(--b);flex-shrink:0"></i>
      <p style="font-size:12px;color:var(--t1);flex:1">${neg.dir}</p>
      <button onclick="copiarDireccion('${neg.dir}')" style="background:none;border:none;cursor:pointer;color:var(--t3)"><i class="ti ti-copy" style="font-size:13px"></i></button>
    </div>`:''}
    ${neg.pago?`<div style="display:flex;align-items:center;gap:10px;padding:10px 13px">
      <i class="ti ti-credit-card" style="font-size:15px;color:var(--b);flex-shrink:0"></i>
      <p style="font-size:12px;color:var(--t1)">${neg.pago}</p>
    </div>`:''}
  </div>

  <!-- Catálogo del negocio -->
  ${Object.keys(catGroups).length>0?`
  <div style="padding:0 12px 6px">
    <p style="font-size:12px;font-weight:700;color:var(--t1);margin-bottom:8px">Menú / Catálogo</p>
    ${Object.entries(catGroups).map(([cat,items])=>`
    <p style="font-size:11px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.04em;margin:8px 0 5px">${cat}</p>
    <div style="display:flex;flex-direction:column;gap:5px">
      ${items.map(item=>`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:var(--surf);border:.5px solid var(--bor);border-radius:var(--rs)">
        <div style="flex:1;min-width:0">
          <p style="font-size:13px;font-weight:600;color:var(--t1)">${item.nm}</p>
          ${item.desc?`<p style="font-size:10px;color:var(--t3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${item.desc}</p>`:''}
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
          <p style="font-size:13px;font-weight:700;color:var(--b)">${item.pr}</p>
          <button onclick="agregarCarrito({id:${item.id},nm:'${item.nm.replace(/'/g,"\\'")}',pr:'${item.pr}',prNum:${item.prNum||0}})" style="width:28px;height:28px;border-radius:50%;border:none;background:var(--b);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center">
            <i class="ti ti-plus" style="font-size:14px"></i>
          </button>
        </div>
      </div>`).join('')}
    </div>`).join('')}
  </div>`:''}
  <div style="height:20px"></div>`;
}

function renderPerfilProfesional(id){
  const pro = (PROS||[]).filter(Boolean).find(p=>String(p.id)===String(id));
  if(!pro) return `<div style="padding:40px 20px;text-align:center"><p style="color:var(--t3)">Profesional no encontrado</p><button onclick="goBack()" style="margin-top:10px;padding:8px 16px;border-radius:var(--rs);border:none;background:var(--b);color:#fff;font-size:12px;cursor:pointer;font-family:inherit">Volver</button></div>`;

  return `
  <div style="position:relative">
    <div style="height:100px;background:linear-gradient(135deg,${pro.bg||'#FAEEDA'},${pro.co||'#854F0B'}30)"></div>
    <button onclick="goBack()" style="position:absolute;top:10px;left:10px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.85);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center">
      <i class="ti ti-arrow-left" style="font-size:16px;color:var(--t1)"></i>
    </button>
    <div style="position:absolute;bottom:-24px;left:16px;width:56px;height:56px;border-radius:50%;background:${pro.bg};border:3px solid var(--bg);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:${pro.co}">
      ${pro.in||'?'}
    </div>
  </div>

  <div style="padding:32px 16px 12px">
    <p style="font-size:17px;font-weight:800;color:var(--t1)">${pro.nm}</p>
    <p style="font-size:12px;color:var(--t3);margin-top:2px">${pro.of}</p>
    <div style="display:flex;align-items:center;gap:4px;margin-top:5px">
      ${'<i class="ti ti-star-filled" style="font-size:12px;color:#EF9F27"></i>'.repeat(5)}
      <span style="font-size:12px;font-weight:700;color:var(--t1)">${pro.rt||'5.0'}</span>
      <span style="font-size:11px;color:var(--t3)">(${pro.rv||0} reseñas)</span>
    </div>
    <p style="font-size:13px;color:var(--t2);line-height:1.5;margin-top:8px">${pro.desc||''}</p>
  </div>

  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:0 16px 14px">
    ${pro.tel?`<button onclick="llamar('${pro.tel}')" style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:9px 4px;border-radius:var(--rs);border:none;background:var(--bg);cursor:pointer;font-family:inherit">
      <i class="ti ti-phone" style="font-size:18px;color:var(--b)"></i>
      <span style="font-size:9px;font-weight:600;color:var(--t3)">Llamar</span>
    </button>`:''}
    ${pro.wa?`<button onclick="abrirWhatsApp('${pro.wa}','Hola, vi tu perfil en MiCantón')" style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:9px 4px;border-radius:var(--rs);border:none;background:var(--bg);cursor:pointer;font-family:inherit">
      <i class="ti ti-brand-whatsapp" style="font-size:18px;color:#25D366"></i>
      <span style="font-size:9px;font-weight:600;color:var(--t3)">WhatsApp</span>
    </button>`:''}
    ${pro.web?`<button onclick="window.open('${pro.web}','_blank')" style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:9px 4px;border-radius:var(--rs);border:none;background:var(--bg);cursor:pointer;font-family:inherit">
      <i class="ti ti-world" style="font-size:18px;color:var(--b)"></i>
      <span style="font-size:9px;font-weight:600;color:var(--t3)">Sitio web</span>
    </button>`:''}
  </div>

  <!-- Catálogo de servicios (sistema universal con pedidos/solicitudes) -->
  <div>
    ${pro.items ? renderCatalogoPublico(String(pro.id)) : (pro.svcs||[]).length>0?`
    <div style="padding:0 12px 14px">
      <p style="font-size:12px;font-weight:700;color:var(--t1);margin-bottom:8px">Servicios</p>
      <div style="display:flex;flex-direction:column;gap:5px">
        ${(pro.svcs||[]).map(sv=>`
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 13px;background:var(--surf);border:.5px solid var(--bor);border-radius:var(--rs)">
          <div><p style="font-size:13px;font-weight:600;color:var(--t1)">${sv.nm||sv}</p>${sv.desc?`<p style="font-size:11px;color:var(--t3)">${sv.desc}</p>`:''}</div>
          ${sv.p?`<p style="font-size:13px;font-weight:700;color:var(--b);flex-shrink:0">${sv.p}</p>`:''}
        </div>`).join('')}
      </div>
    </div>`:'' }
  </div>
  <div style="height:20px"></div>`;
}

function irPerfilNegocio(id){
  VIEW='negocio-'+id; render();
  const c=G('content'); if(c) c.scrollTop=0;
}

function irPerfilProfesional(id){
  VIEW='pro-'+id; render();
  const c=G('content'); if(c) c.scrollTop=0;
}

function abrirUrl(url){
  if(url) window.open(url,'_blank');
  else showToast('Sin sitio web registrado');
}

function renderMiPerfil(){
  const u   = (typeof USR_TIPOS !== 'undefined') && USR_TIPOS[activeUsr];
  const tipo = u?.tipo || 'registrado';

  // Datos editables del perfil (demo)
  const perfil = {
    nm:        u?.nm     || 'Mi cuenta',
    sub:       u?.sub    || '',
    av:        u?.av     || '?',
    bg:        u?.bg     || '#E6F1FB',
    tc:        u?.tc     || '#185FA5',
    tel:       '8888-0000',
    email:     'contacto@micanton.cr',
    zona:      AC?.nm    || 'Alajuela',
    web:       'https://micanton.cr',
    desc:      tipo==='negocio'   ? 'Negocio registrado en MiCantón. Actualiza tu descripción para que tus clientes te conozcan mejor.' :
               tipo==='profesional'||tipo==='creativo' ? 'Profesional independiente. Completa tu perfil para que más clientes te encuentren.' :
               tipo==='medio'     ? 'Medio de comunicación verificado por MiCantón.' :
               tipo==='admin'     ? 'Administrador del portal MiCantón.' :
               'Usuario registrado en MiCantón.',
    plan:      tipo==='negocio'||tipo==='profesional'||tipo==='creativo' ? 'Pro' :
               tipo==='medio' ? 'Media' : tipo==='admin' ? 'Admin' : 'Gratis',
    planColor: tipo==='negocio' ? '#085041' : tipo==='profesional'||tipo==='creativo' ? '#534AB7' :
               tipo==='medio' ? '#0C447C' : tipo==='admin' ? '#E24B4A' : '#185FA5',
  };

  // Icono de tipo
  const tipoInfo = {
    negocio:     {ic:'ti-building-store',     label:'Negocio',           bg:'#E1F5EE', tc:'#085041'},
    profesional: {ic:'ti-tools',              label:'Profesional',       bg:'#FAEEDA', tc:'#854F0B'},
    creativo:    {ic:'ti-palette',            label:'Creativo',          bg:'#EEEDFE', tc:'#534AB7'},
    medio:       {ic:'ti-building-broadcast-tower', label:'Medio',       bg:'#E6F1FB', tc:'#0C447C'},
    admin:       {ic:'ti-shield-check',       label:'Administrador',     bg:'#0C2B1A', tc:'#9FE1CB'},
    registrado:  {ic:'ti-user-check',         label:'Usuario',           bg:'#EAF3DE', tc:'#3B6D11'},
  }[tipo] || {ic:'ti-user', label:'Usuario', bg:'#E6F1FB', tc:'#185FA5'};

  // Secciones adicionales según tipo
  const extraSections = {
    negocio: `
      <!-- Estadísticas rápidas -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px">
        ${[['ti-eye','248','Visitas hoy','#E6F1FB','#185FA5'],
           ['ti-star','4.9','Calificación','#FAEEDA','#854F0B'],
           ['ti-receipt','${(pedidosRecibidos||[]).length}','Pedidos','#E1F5EE','#085041']
          ].map(([ic,v,l,bg,co])=>`
        <div style="background:${bg};border-radius:var(--rs);padding:10px;text-align:center">
          <i class="ti ${ic}" style="font-size:16px;color:${co}"></i>
          <p style="font-size:16px;font-weight:700;color:${co};margin:2px 0">${v}</p>
          <p style="font-size:9px;font-weight:600;color:${co};opacity:.8">${l}</p>
        </div>`).join('')}
      </div>`,

    profesional: `
      <!-- Servicios del profesional -->
      <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);padding:13px;margin-bottom:12px">
        <p style="font-size:12px;font-weight:700;color:var(--t1);margin-bottom:8px">Mis servicios</p>
        ${((typeof PROS!=='undefined'&&PROS.filter(Boolean).find(p=>String(p.id)===String(sesionUsuario?.proId||''))?.svcs)||[
          {nm:'Servicio principal',p:'₡15.000',desc:'Descripción del servicio'},
          {nm:'Consultoría',p:'₡8.000',desc:'Por hora'},
        ]).map(sv=>`
        <div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:.5px solid var(--bor)">
          <div style="flex:1"><p style="font-size:12px;font-weight:600;color:var(--t1)">${sv.nm||sv}</p>${sv.desc?`<p style="font-size:10px;color:var(--t3)">${sv.desc}</p>`:''}</div>
          ${sv.p?`<p style="font-size:12px;font-weight:700;color:var(--b)">${sv.p}</p>`:''}
        </div>`).join('')}
        <button onclick="showToast('Editor de servicios próximamente')" style="width:100%;margin-top:8px;padding:8px;border-radius:var(--rs);border:1.5px dashed var(--bor);background:var(--bg);color:var(--t3);font-size:11px;font-weight:600;cursor:pointer;font-family:inherit">
          <i class="ti ti-plus" style="font-size:12px"></i> Agregar servicio
        </button>
      </div>`,

    medio: `
      <!-- Estadísticas del medio -->
      <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);padding:13px;margin-bottom:12px">
        <p style="font-size:12px;font-weight:700;color:var(--t1);margin-bottom:8px">Estadísticas del medio</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          ${[['Noticias publicadas','12'],['Lectores únicos','4.820'],['Compartidos','361'],['Suscriptores','189']].map(([l,v])=>`
          <div style="background:var(--bg);border-radius:var(--rs);padding:9px">
            <p style="font-size:15px;font-weight:700;color:var(--b)">${v}</p>
            <p style="font-size:10px;color:var(--t3)">${l}</p>
          </div>`).join('')}
        </div>
      </div>`,

    registrado: `
      <!-- Actividad del usuario -->
      <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);padding:13px;margin-bottom:12px">
        <p style="font-size:12px;font-weight:700;color:var(--t1);margin-bottom:8px">Mi actividad</p>
        ${[
          ['ti-shopping-bag','Mis clasificados','Ver publicaciones',`goMod('clasificados')`,'#E6F1FB','#185FA5'],
          ['ti-briefcase','Bolsa de empleo','Ver aplicaciones',`goMod('empleo')`,'#EAF3DE','#3B6D11'],
          ['ti-heart','Favoritos','Negocios guardados',`showToast('Favoritos próximamente')`,'#FCEBEB','#C0392B'],
        ].map(([ic,nm,sub,fn,bg,co])=>`
        <div onclick="${fn}" style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:.5px solid var(--bor);cursor:pointer">
          <div style="width:34px;height:34px;border-radius:var(--rs);background:${bg};display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <i class="ti ${ic}" style="font-size:16px;color:${co}"></i>
          </div>
          <div style="flex:1"><p style="font-size:12px;font-weight:600;color:var(--t1)">${nm}</p><p style="font-size:10px;color:var(--t3)">${sub}</p></div>
          <i class="ti ti-chevron-right" style="font-size:14px;color:var(--t3)"></i>
        </div>`).join('')}
      </div>`,
  };

  return `
  <div style="padding-bottom:20px">

    <!-- ── AVATAR Y NOMBRE ── -->
    <div style="background:linear-gradient(135deg,${perfil.bg},${perfil.bg}88);padding:24px 16px 16px;text-align:center;position:relative">
      <!-- Botón editar -->
      <button onclick="showToast('Editor de perfil próximamente')"
        style="position:absolute;top:12px;right:12px;padding:5px 11px;border-radius:20px;border:none;background:rgba(255,255,255,.85);color:var(--t1);font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:4px">
        <i class="ti ti-pencil" style="font-size:11px"></i>Editar
      </button>
      <!-- Avatar grande -->
      <div style="width:72px;height:72px;border-radius:22px;background:${perfil.tc}22;border:3px solid ${perfil.tc}44;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:800;color:${perfil.tc};margin:0 auto 10px">
        ${perfil.av}
      </div>
      <p style="font-size:17px;font-weight:800;color:var(--t1)">${perfil.nm}</p>
      <p style="font-size:11px;color:var(--t3);margin-top:2px">${perfil.sub}</p>
      <!-- Badges tipo + plan -->
      <div style="display:flex;justify-content:center;gap:6px;margin-top:8px">
        <span style="font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;background:${tipoInfo.bg};color:${tipoInfo.tc};display:flex;align-items:center;gap:4px">
          <i class="ti ${tipoInfo.ic}" style="font-size:11px"></i>${tipoInfo.label}
        </span>
        <span style="font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;background:${perfil.planColor}20;color:${perfil.planColor};border:1px solid ${perfil.planColor}40">
          Plan ${perfil.plan}
        </span>
      </div>
    </div>

    <div style="padding:14px 12px 0">

      <!-- ── SECCIÓN EXTRA POR TIPO ── -->
      ${extraSections[tipo] || ''}

      <!-- ── DATOS DE CONTACTO ── -->
      <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);overflow:hidden;margin-bottom:12px">
        <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;padding:10px 13px 6px">Información de contacto</p>
        ${[
          ['ti-phone',   perfil.tel,   `llamar('${perfil.tel}')`,         ''],
          ['ti-mail',    perfil.email, `enviarEmail('${perfil.email}')`,   ''],
          ['ti-map-pin', perfil.zona,  `goMod('inicio')`,                  ''],
          ['ti-world',   perfil.web,   `abrirUrl('${perfil.web}')`,         ''],
        ].map(([ic,val,fn,_])=>`
        <div onclick="${fn}" style="display:flex;align-items:center;gap:10px;padding:10px 13px;border-top:.5px solid var(--bor);cursor:pointer">
          <i class="ti ${ic}" style="font-size:15px;color:var(--b);flex-shrink:0;width:18px;text-align:center"></i>
          <p style="font-size:12px;color:var(--t1);flex:1">${val}</p>
          <i class="ti ti-chevron-right" style="font-size:13px;color:var(--t3)"></i>
        </div>`).join('')}
      </div>

      <!-- ── DESCRIPCIÓN / BIO ── -->
      <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);padding:13px;margin-bottom:12px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <p style="font-size:11px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.04em">Acerca de</p>
          <button onclick="showToast('Editar descripción próximamente')" style="background:none;border:none;cursor:pointer;color:var(--b);font-size:10px;font-weight:700;font-family:inherit">Editar</button>
        </div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">${perfil.desc}</p>
      </div>

      <!-- ── CONFIGURACIÓN Y ACCIONES ── -->
      <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);overflow:hidden;margin-bottom:12px">
        <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;padding:10px 13px 6px">Cuenta</p>
        ${[
          ['ti-bell',          'Notificaciones',     `toggleNotif()`,                  '#E6F1FB','#185FA5'],
          ['ti-credit-card',   'Suscripción y pagos',`goMod('pagos')`,                 '#E1F5EE','#085041'],
          ['ti-shield-lock',   'Privacidad y seguridad',`showToast('Próximamente')`,   '#EEEDFE','#534AB7'],
          ['ti-help-circle',   'Ayuda y soporte',    `showToast('Soporte próximamente')`, '#FAEEDA','#854F0B'],
          ['ti-logout',        'Cerrar sesión',       `cerrarSesion()`,                '#FDECEA','#C0392B'],
        ].map(([ic,nm,fn,bg,co])=>`
        <div onclick="${fn}" style="display:flex;align-items:center;gap:10px;padding:11px 13px;border-top:.5px solid var(--bor);cursor:pointer">
          <div style="width:30px;height:30px;border-radius:var(--rs);background:${bg};display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <i class="ti ${ic}" style="font-size:14px;color:${co}"></i>
          </div>
          <p style="font-size:12px;font-weight:600;color:${fn.includes('cerrar')?co:'var(--t1)'};flex:1">${nm}</p>
          <i class="ti ti-chevron-right" style="font-size:13px;color:var(--t3)"></i>
        </div>`).join('')}
      </div>

      <!-- Versión -->
      <p style="text-align:center;font-size:10px;color:var(--t3);padding-bottom:4px">MiCantón.cr · v2.0 · ${AC?.nm||'Alajuela'}</p>

    </div>
  </div>`;
}
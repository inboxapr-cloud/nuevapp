// negocio-panel — MiCantón.cr

function renderNegocioPanel(){
  const u   = (typeof USR_TIPOS!=='undefined')&&USR_TIPOS[activeUsr];
  const tipo= u?.tipo||'negocio';
  const isPro = tipo==='profesional'||tipo==='creativo';
  const pedNuevos = (pedidosRecibidos||[]).filter(p=>p.st==='nuevo').length;
  const solNuevas = (pedidosRecibidos||[]).filter(p=>p.st==='nuevo').length; // solicitudes

  // ── Colores según tipo ──
  const headerBg = isPro
    ? 'linear-gradient(135deg,#534AB7,#3B3590)'
    : 'linear-gradient(135deg,#1D9E75,#085041)';
  const planLabel = isPro ? 'Plan Profesional · Activo' : 'Plan Pro · Activo hasta 30 Jun';

  // ── SECCIÓN 1: barra de navegación principal del panel ──
  // Buscar / Directorio / Marketing / Pedidos / Solicitudes / Perfil / Catálogo / Pagos
  // ── NAV del panel desde ROL_PERMS si está configurado ──
  const panelPerms = (typeof ROL_PERMS!=='undefined')&&ROL_PERMS[tipo]?.panel;
  const ALL_PANEL_NAV = [
    {id:'perfil',      nm:'Mi perfil',   ic:'ti-user-circle',  fn:`setPnTab('perfil')`},
    {id:'buscar',      nm:'Buscar',      ic:'ti-search',       fn:`goMod('inicio')`},
    {id:'directorio',  nm:'Directorio',  ic:'ti-building-store',fn:`goMod('negocios')`},
    {id:'marketing',   nm:'Marketing',   ic:'ti-sparkles',     fn:`setPnTab('marketing')`},
    {id:'pedidos',     nm:'Pedidos',     ic:'ti-inbox',        fn:`setPnTab('pedidos')`,    badge:pedNuevos},
    {id:'solicitudes', nm:'Solicitudes', ic:'ti-list-check',   fn:`setPnTab('missolicitudes')`, badge:solNuevas, pnId:'missolicitudes'},
    {id:'catalogo',    nm:'Catálogo',    ic:'ti-package',      fn:`setPnTab('catalogo')`},
    {id:'categorias',  nm:'Categorías',  ic:'ti-category',     fn:`setPnTab('catcats')`},
    {id:'stats',       nm:'Stats',       ic:'ti-chart-bar',    fn:`setPnTab('stats')`},
    {id:'pagos',       nm:'Pagos',       ic:'ti-credit-card',  fn:`goMod('pagos')`},
    {id:'publicar',    nm:'Publicar',    ic:'ti-photo',        fn:`goMod('publicar')`},
  ];
  // Usar ROL_PERMS.panel si existe, si no mostrar todo
  const navTabs = panelPerms&&panelPerms.length>0
    ? panelPerms.map(id=>ALL_PANEL_NAV.find(t=>t.id===id)).filter(Boolean)
    : ALL_PANEL_NAV.filter(t=>t.id!=='buscar'&&t.id!=='directorio');

  const activeTab = pnTab || 'marketing';

  const hdr = `
  <!-- ─── HEADER DEL PANEL ───────────────────── -->
  <div class="pn-header" style="background:${headerBg}">
    <div class="pn-logo-row">
      <div class="pn-av" style="background:${u?.bg||'#E1F5EE'};color:${u?.tc||'#085041'}">${u?.av||'EM'}</div>
      <div style="flex:1;min-width:0">
        <p class="pn-nm">${u?.nm||'Mi Negocio'}</p>
        <p class="pn-plan"><i class="ti ti-check-circle" style="font-size:10px"></i>${planLabel}</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        ${renderCarritoBtn()}
        <button onclick="goMod('inicio')" style="width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.2);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center">
          <i class="ti ti-home" style="font-size:15px;color:#fff"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- ─── BARRA DE NAVEGACIÓN PRINCIPAL ──────── -->
  <div style="background:var(--surf);border-bottom:.5px solid var(--bor);overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;display:flex">
    ${navTabs.map(t=>{
      const isActive = (t.id==='perfil'&&pnTab==='perfil')
        || (t.id==='marketing'&&pnTab==='marketing')
        || (t.id==='pedidos'&&pnTab==='pedidos')
        || (t.id==='solicitudes'&&pnTab==='missolicitudes')
        || (t.id==='catalogo'&&(pnTab==='catalogo'||pnTab==='catcats'||pnTab==='stats'))
        || (t.id==='categorias'&&pnTab==='catcats');
      return `<button onclick="${t.fn||''}" style="flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:3px;padding:10px 14px;border:none;background:transparent;cursor:pointer;border-bottom:2.5px solid ${isActive?'var(--b)':'transparent'};position:relative;font-family:inherit">
        <i class="ti ${t.ic}" style="font-size:17px;color:${isActive?'var(--b)':'var(--t3)'}"></i>
        <span style="font-size:9px;font-weight:${isActive?700:600};color:${isActive?'var(--b)':'var(--t3)'};white-space:nowrap">${t.nm}</span>
        ${(t.badge||0)>0?`<span style="position:absolute;top:6px;right:8px;width:14px;height:14px;background:#E24B4A;border-radius:50%;font-size:8px;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:center">${t.badge}</span>`:''}
      </button>`;
    }).join('')}
  </div>

  <!-- ─── TABS INTERNAS (solo para secciones del panel) ──── -->
  ${['marketing','pedidos','missolicitudes','catalogo','catcats','stats'].includes(pnTab)?`
  <div style="display:flex;background:var(--bg);border-bottom:.5px solid var(--bor);overflow-x:auto;scrollbar-width:none">
    ${pnTab==='catalogo'||pnTab==='catcats'?`
      <button onclick="setPnTab('catalogo')" style="flex-shrink:0;padding:8px 14px;border:none;background:transparent;cursor:pointer;border-bottom:2px solid ${pnTab==='catalogo'?'var(--b)':'transparent'};font-size:11px;font-weight:${pnTab==='catalogo'?700:600};color:${pnTab==='catalogo'?'var(--b)':'var(--t3)'};font-family:inherit">
        <i class="ti ti-package" style="font-size:12px"></i> Items
      </button>
      <button onclick="setPnTab('catcats')" style="flex-shrink:0;padding:8px 14px;border:none;background:transparent;cursor:pointer;border-bottom:2px solid ${pnTab==='catcats'?'var(--b)':'transparent'};font-size:11px;font-weight:${pnTab==='catcats'?700:600};color:${pnTab==='catcats'?'var(--b)':'var(--t3)'};font-family:inherit">
        <i class="ti ti-category" style="font-size:12px"></i> Categorías
      </button>
      <button onclick="setPnTab('stats')" style="flex-shrink:0;padding:8px 14px;border:none;background:transparent;cursor:pointer;border-bottom:2px solid ${pnTab==='stats'?'var(--b)':'transparent'};font-size:11px;font-weight:${pnTab==='stats'?700:600};color:${pnTab==='stats'?'var(--b)':'var(--t3)'};font-family:inherit">
        <i class="ti ti-chart-bar" style="font-size:12px"></i> Stats
      </button>
    `:pnTab==='pedidos'||pnTab==='missolicitudes'?`
      <button onclick="setPnTab('pedidos')" style="flex-shrink:0;padding:8px 14px;border:none;background:transparent;cursor:pointer;border-bottom:2px solid ${pnTab==='pedidos'?'var(--b)':'transparent'};font-size:11px;font-weight:${pnTab==='pedidos'?700:600};color:${pnTab==='pedidos'?'var(--b)':'var(--t3)'};font-family:inherit">
        <i class="ti ti-inbox" style="font-size:12px"></i> Recibidos${pedNuevos>0?` <span style="background:#E24B4A;color:#fff;font-size:8px;font-weight:700;padding:1px 5px;border-radius:8px">${pedNuevos}</span>`:''}
      </button>
      <button onclick="setPnTab('missolicitudes')" style="flex-shrink:0;padding:8px 14px;border:none;background:transparent;cursor:pointer;border-bottom:2px solid ${pnTab==='missolicitudes'?'var(--b)':'transparent'};font-size:11px;font-weight:${pnTab==='missolicitudes'?700:600};color:${pnTab==='missolicitudes'?'var(--b)':'var(--t3)'};font-family:inherit">
        <i class="ti ti-list-check" style="font-size:12px"></i> Mis pedidos
      </button>
    `:''}
  </div>`:''}
  `;

  const body =
    pnTab==='perfil'         ? renderMiPerfil()          :
    pnTab==='marketing'      ? renderMarketing()         :
    pnTab==='pedidos'        ? renderPedidosRecibidos()  :
    pnTab==='missolicitudes' ? renderMisPedidos()        :
    pnTab==='catalogo'       ? renderCatalogo()          :
    pnTab==='catcats'        ? renderCatCategorias()     :
    pnTab==='stats'          ? renderStats()             :
                               renderMiPerfil();

  return hdr + body;
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
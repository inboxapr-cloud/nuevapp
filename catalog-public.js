/**
 * cms — MiCantón.cr
 * Extraído del monolito micanton_v2.html
 * En v3: conectar a Firebase donde aplique
 */
// Nota: estas funciones usan variables globales de window.*
// Al migrar a Firebase, reemplazar con imports de ../state.js

function renderAdminCMS(){
  const tipoActual = (USR_TIPOS||[]).find(u=>u.tipo===cmsRolSel) || (USR_TIPOS||[])[0];
  const perms = ROL_PERMS[cmsRolSel] || {portal:[],panel:[],navbot:[]};
  const tipos = USR_TIPOS||[];

  const secInfo = {
    portal:{ nm:'Menú superior (portal)',   ic:'ti-layout-navbar',    co:'#185FA5', bg:'#E6F1FB', desc:'Pestañas en el header que todos los usuarios ven al explorar el portal' },
    panel: { nm:'Panel de usuario (tabs)',  ic:'ti-layout-sidebar',   co:'#534AB7', bg:'#EEEDFE', desc:'Tabs internas del panel personal: Perfil, Marketing, Pedidos, Catálogo...' },
    navbot:{ nm:'Barra inferior (navbot)',  ic:'ti-layout-bottombar', co:'#085041', bg:'#E1F5EE', desc:'Los 5 íconos de la barra de navegación en el pie de pantalla' },
  };

  const secMods = ALL_NAV_MODULES.filter(m => m.cat === cmsSecSel);
  const enabledIds = perms[cmsSecSel] || [];

  // Ordered: enabled first (in order), then disabled
  const orderedMods = [
    ...enabledIds.map(id => secMods.find(m=>m.id===id)).filter(Boolean),
    ...secMods.filter(m => !enabledIds.includes(m.id)),
  ];

  return `
  <div style="padding:12px;display:flex;flex-direction:column;gap:12px">

    <!-- ════ HEADER CMS ════ -->
    <div style="background:linear-gradient(135deg,#0C2B1A,#1D4A2E);border-radius:var(--r);padding:14px 16px;display:flex;align-items:center;gap:10px">
      <div style="width:38px;height:38px;border-radius:10px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <i class="ti ti-shield-half" style="font-size:20px;color:#9FE1CB"></i>
      </div>
      <div>
        <p style="font-size:14px;font-weight:700;color:#fff">CMS de Roles y Menús</p>
        <p style="font-size:10px;color:rgba(255,255,255,.6)">Los cambios se aplican en tiempo real a todos los usuarios del tipo seleccionado</p>
      </div>
    </div>

    <!-- ════ SELECTOR DE ROL (chips) ════ -->
    <div>
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:7px">Tipo de usuario</p>
      <div style="display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px">
        ${tipos.map(u=>`
        <div onclick="cmsRolSel='${u.tipo}';render()"
          style="display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:20px;cursor:pointer;flex-shrink:0;
            border:2px solid ${cmsRolSel===u.tipo?u.tc||'#185FA5':'var(--bor)'};
            background:${cmsRolSel===u.tipo?(u.bg||'#E6F1FB'):'var(--surf)'}">
          <div style="width:22px;height:22px;border-radius:6px;background:${u.bg||'#E6F1FB'};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:${u.tc||'#185FA5'}">
            ${u.av}
          </div>
          <span style="font-size:11px;font-weight:${cmsRolSel===u.tipo?700:600};color:${cmsRolSel===u.tipo?(u.tc||'#185FA5'):'var(--t2)'};white-space:nowrap">
            ${u.tipo}
          </span>
        </div>`).join('')}
        <!-- Crear nuevo rol -->
        <div onclick="cmsAbrirModalRol(null)"
          style="display:flex;align-items:center;gap:5px;padding:6px 12px;border-radius:20px;cursor:pointer;flex-shrink:0;border:2px dashed var(--bor);background:var(--bg)">
          <i class="ti ti-plus" style="font-size:12px;color:var(--t3)"></i>
          <span style="font-size:11px;font-weight:600;color:var(--t3)">Nuevo rol</span>
        </div>
      </div>
    </div>

    <!-- ════ INFO DEL ROL SELECCIONADO ════ -->
    ${tipoActual?`
    <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);padding:12px;display:flex;align-items:center;gap:10px">
      <div style="width:40px;height:40px;border-radius:12px;background:${tipoActual.bg||'#E6F1FB'};display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:${tipoActual.tc||'#185FA5'};flex-shrink:0">
        ${tipoActual.av}
      </div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px">
          <p style="font-size:13px;font-weight:700;color:var(--t1)">${tipoActual.nm}</p>
          <span style="font-size:9px;font-weight:600;padding:1px 7px;border-radius:10px;background:${tipoActual.bg};color:${tipoActual.tc}">${tipoActual.tipo}</span>
        </div>
        <p style="font-size:10px;color:var(--t3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${tipoActual.sub||''}</p>
      </div>
      <div style="display:flex;gap:5px;flex-shrink:0">
        <button onclick="cmsAbrirModalRol('${tipoActual.tipo}')" style="width:30px;height:30px;border-radius:8px;border:.5px solid var(--bor);background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center">
          <i class="ti ti-pencil" style="font-size:13px;color:var(--b)"></i>
        </button>
        ${tipoActual.tipo!=='admin'&&tipoActual.tipo!=='visitante'?`
        <button onclick="cmsEliminarRol('${tipoActual.tipo}')" style="width:30px;height:30px;border-radius:8px;border:.5px solid #FDECEA;background:#FFF5F5;cursor:pointer;display:flex;align-items:center;justify-content:center">
          <i class="ti ti-trash" style="font-size:13px;color:#E24B4A"></i>
        </button>`:'' }
      </div>
    </div>`:''}

    <!-- ════ SELECTOR DE SECCIÓN ════ -->
    <div>
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:7px">Sección de menú</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px">
        ${Object.entries(secInfo).map(([secId,sec])=>{
          const cnt=(ROL_PERMS[cmsRolSel]?.[secId]||[]).length;
          const total=ALL_NAV_MODULES.filter(m=>m.cat===secId).length;
          const active=cmsSecSel===secId;
          return `<div onclick="cmsSecSel='${secId}';render()"
            style="padding:10px 8px;border-radius:var(--rs);border:${active?'2px solid '+sec.co:'.5px solid var(--bor)'};
              background:${active?sec.bg:'var(--surf)'};cursor:pointer;text-align:center">
            <i class="ti ${sec.ic}" style="font-size:18px;color:${active?sec.co:'var(--t3)'}"></i>
            <p style="font-size:10px;font-weight:700;color:${active?sec.co:'var(--t2)'};margin:3px 0 1px">${sec.ic==='ti-layout-navbar'?'Portal':sec.ic==='ti-layout-sidebar'?'Panel':'Navbot'}</p>
            <p style="font-size:9px;color:${active?sec.co:'var(--t3)'};">${cnt}/${total}</p>
          </div>`;
        }).join('')}
      </div>
      <p style="font-size:10px;color:var(--t3);margin-top:5px;line-height:1.4">${secInfo[cmsSecSel].desc}</p>
    </div>

    <!-- ════ ACCIONES RÁPIDAS ════ -->
    <div style="display:flex;gap:7px">
      <button onclick="cmsActivarTodo('${cmsRolSel}','${cmsSecSel}')"
        style="flex:1;padding:9px;border-radius:var(--rs);border:none;background:#E1F5EE;color:#085041;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:5px">
        <i class="ti ti-check-all" style="font-size:13px"></i>Activar todo
      </button>
      <button onclick="cmsDesactivarTodo('${cmsRolSel}','${cmsSecSel}')"
        style="flex:1;padding:9px;border-radius:var(--rs);border:none;background:#FDECEA;color:#C0392B;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:5px">
        <i class="ti ti-x" style="font-size:13px"></i>Desactivar todo
      </button>
      <button onclick="cmsCopiarDeRol('${cmsRolSel}','${cmsSecSel}')"
        style="flex:1;padding:9px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t2);font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:5px">
        <i class="ti ti-copy" style="font-size:13px"></i>Copiar de...
      </button>
    </div>

    <!-- ════ LISTA DE MÓDULOS (drag & reorder) ════ -->
    <div>
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:7px">
        Módulos disponibles · <span style="color:var(--b);font-weight:700">${enabledIds.length} activos</span> de ${orderedMods.length}
      </p>
      <div id="cmsModList" style="display:flex;flex-direction:column;gap:5px">
        ${orderedMods.map((mod,idx)=>{
          const enabled = enabledIds.includes(mod.id);
          const secCo = secInfo[cmsSecSel].co;
          const secBg2 = secInfo[cmsSecSel].bg;
          return `
          <div draggable="true"
            ondragstart="cmsDragStart(event,${idx})"
            ondragover="event.preventDefault()"
            ondrop="cmsDrop(event,${idx},'${cmsRolSel}','${cmsSecSel}')"
            style="display:flex;align-items:center;gap:9px;padding:9px 11px;
              background:${enabled?secBg2+'88':'var(--surf)'};
              border:${enabled?'1px solid '+secCo+'44':'.5px solid var(--bor)'};
              border-radius:var(--rs);cursor:grab;transition:background .15s;user-select:none">
            <!-- Drag handle -->
            <i class="ti ti-grip-vertical" style="font-size:13px;color:#CCC;flex-shrink:0"></i>
            <!-- Ícono del módulo -->
            <div style="width:30px;height:30px;border-radius:8px;background:${enabled?secCo:'#E5E5E5'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <i class="ti ${mod.ic}" style="font-size:15px;color:${enabled?'#fff':'#AAA'}"></i>
            </div>
            <!-- Nombre -->
            <div style="flex:1;min-width:0">
              <p style="font-size:12px;font-weight:${enabled?700:600};color:${enabled?'var(--t1)':'var(--t3)'}">${mod.nm}</p>
              <p style="font-size:9px;color:#BBB;font-family:monospace">${mod.id}</p>
            </div>
            <!-- Badge categoría -->
            <span style="font-size:9px;font-weight:600;padding:2px 7px;border-radius:10px;background:${secBg2};color:${secCo};flex-shrink:0">${mod.cat}</span>
            <!-- Toggle -->
            <div onclick="cmsToggleMod('${cmsRolSel}','${cmsSecSel}','${mod.id}')"
              style="width:34px;height:19px;border-radius:10px;background:${enabled?secCo:'#D0D0D0'};position:relative;cursor:pointer;flex-shrink:0;transition:background .2s">
              <div style="width:13px;height:13px;background:#fff;border-radius:50%;position:absolute;top:3px;${enabled?'right:3px':'left:3px'};transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.2)"></div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- ════ PREVIEW: cómo se verá ════ -->
    <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);padding:12px">
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">
        Preview · ${secInfo[cmsSecSel].nm}
      </p>
      <div style="background:#1a1a1a;border-radius:8px;padding:8px 10px;overflow-x:auto">
        <div style="display:flex;gap:4px;min-width:max-content">
          ${enabledIds.map(id=>{
            const mod=ALL_NAV_MODULES.find(m=>m.id===id);
            if(!mod) return '';
            return `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:7px 10px;border-radius:7px;background:rgba(255,255,255,.08);min-width:52px">
              <i class="ti ${mod.ic}" style="font-size:16px;color:#fff"></i>
              <span style="font-size:8px;font-weight:600;color:rgba(255,255,255,.7);white-space:nowrap">${mod.nm}</span>
            </div>`;
          }).join('')}
          ${enabledIds.length===0?`<p style="font-size:10px;color:rgba(255,255,255,.4);padding:6px">Sin módulos activos</p>`:''}
        </div>
      </div>
    </div>

    <!-- ════ APLICAR A TODOS ════ -->
    <div style="background:#E6F1FB;border-radius:var(--rs);padding:10px 12px;display:flex;align-items:center;gap:8px">
      <i class="ti ti-info-circle" style="font-size:14px;color:var(--b);flex-shrink:0"></i>
      <p style="font-size:10px;color:var(--b);flex:1;line-height:1.5">
        Los cambios aplican en tiempo real. Al cambiar de usuario con el selector en la app, se usarán estos permisos automáticamente.
      </p>
    </div>

    <!-- Modal de edición de rol -->
    ${cmsModalRol!==null?renderCmsModalRol():''}

  </div>`;
}

function renderCmsModalRol(){
  const isNew = cmsModalRol === 'new';
  const rol = isNew ? {tipo:'',nm:'',sub:'',av:'??',bg:'#E6F1FB',tc:'#185FA5',ic:'ti-user',mod:'inicio',activo:true}
                    : ((USR_TIPOS||[]).find(u=>u.tipo===cmsModalRol)||{});
  const ICONS_LIST = ['ti-user','ti-user-circle','ti-user-check','ti-building-store','ti-tools',
    'ti-palette','ti-building-broadcast-tower','ti-shield-check','ti-briefcase','ti-star',
    'ti-heart','ti-sparkles','ti-camera','ti-car','ti-home','ti-package'];

  return `
  <div onclick="if(event.target===this)cmsModalRol=null;render()"
    style="position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:500;display:flex;align-items:flex-end;justify-content:center">
    <div onclick="event.stopPropagation()" style="background:var(--bg);border-radius:16px 16px 0 0;width:100%;max-width:480px;max-height:90vh;overflow-y:auto;padding:0 0 20px">

      <!-- Handle + Título -->
      <div style="padding:10px 16px 0;display:flex;align-items:center;justify-content:space-between">
        <div style="width:40px;height:4px;border-radius:2px;background:var(--bor);margin:4px auto 12px"></div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px 12px;border-bottom:.5px solid var(--bor)">
        <p style="font-size:14px;font-weight:700;color:var(--t1)">${isNew?'Nuevo tipo de usuario':'Editar rol · '+rol.tipo}</p>
        <button onclick="cmsModalRol=null;render()" style="width:28px;height:28px;border-radius:50%;border:none;background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center">
          <i class="ti ti-x" style="font-size:13px;color:var(--t2)"></i>
        </button>
      </div>

      <div style="padding:14px 16px;display:flex;flex-direction:column;gap:12px">

        <!-- Preview -->
        <div style="display:flex;align-items:center;gap:10px;padding:11px 13px;background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r)">
          <div id="cms_prev_av" style="width:40px;height:40px;border-radius:12px;background:${rol.bg};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:${rol.tc}">
            ${rol.av||'??'}
          </div>
          <div>
            <p id="cms_prev_nm" style="font-size:13px;font-weight:700;color:var(--t1)">${rol.nm||'Nombre del rol'}</p>
            <p id="cms_prev_sub" style="font-size:10px;color:var(--t3)">${rol.sub||'Descripción'}</p>
          </div>
        </div>

        <!-- ID del tipo -->
        ${isNew?`<div>
          <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;margin-bottom:4px">ID del rol (sin espacios)</p>
          <input id="cms_id" type="text" placeholder="ej: empresa, proveedor..."
            style="width:100%;padding:9px 12px;border:.5px solid var(--bor);border-radius:var(--rs);font-size:13px;font-family:inherit;background:var(--surf);color:var(--t1);outline:none;box-sizing:border-box">
        </div>`:''}

        <!-- Nombre -->
        <div>
          <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;margin-bottom:4px">Nombre visible</p>
          <input id="cms_nm" type="text" value="${rol.nm||''}" placeholder="Ej: Negocio, Profesional..."
            oninput="document.getElementById('cms_prev_nm').textContent=this.value||'Nombre del rol'"
            style="width:100%;padding:9px 12px;border:.5px solid var(--bor);border-radius:var(--rs);font-size:13px;font-family:inherit;background:var(--surf);color:var(--t1);outline:none;box-sizing:border-box">
        </div>

        <!-- Descripción -->
        <div>
          <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;margin-bottom:4px">Descripción corta</p>
          <input id="cms_sub" type="text" value="${rol.sub||''}" placeholder="Ej: Catálogo · pedidos · marketing"
            oninput="document.getElementById('cms_prev_sub').textContent=this.value||'Descripción'"
            style="width:100%;padding:9px 12px;border:.5px solid var(--bor);border-radius:var(--rs);font-size:13px;font-family:inherit;background:var(--surf);color:var(--t1);outline:none;box-sizing:border-box">
        </div>

        <!-- Avatar + colores -->
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
          <div>
            <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;margin-bottom:4px">Avatar</p>
            <input id="cms_av" type="text" value="${rol.av||''}" maxlength="2" placeholder="EM"
              oninput="document.getElementById('cms_prev_av').textContent=this.value.toUpperCase().slice(0,2)||'??'"
              style="width:100%;padding:9px 12px;border:.5px solid var(--bor);border-radius:var(--rs);font-size:18px;font-weight:700;text-align:center;font-family:inherit;background:var(--surf);color:var(--t1);outline:none;box-sizing:border-box">
          </div>
          <div>
            <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;margin-bottom:4px">Fondo</p>
            <input id="cms_bg" type="color" value="${rol.bg||'#E6F1FB'}"
              oninput="document.getElementById('cms_prev_av').style.background=this.value"
              style="width:100%;height:40px;border:none;border-radius:var(--rs);cursor:pointer;padding:2px">
          </div>
          <div>
            <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;margin-bottom:4px">Texto</p>
            <input id="cms_tc" type="color" value="${rol.tc||'#185FA5'}"
              oninput="document.getElementById('cms_prev_av').style.color=this.value"
              style="width:100%;height:40px;border:none;border-radius:var(--rs);cursor:pointer;padding:2px">
          </div>
        </div>

        <!-- Ícono -->
        <div>
          <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;margin-bottom:6px">Ícono</p>
          <div style="display:flex;flex-wrap:wrap;gap:6px" id="cms_ic_grid">
            ${ICONS_LIST.map(ic=>`<button onclick="document.querySelectorAll('#cms_ic_grid button').forEach(b=>b.style.borderColor='#E5E5E5');this.style.borderColor='var(--b)';this.dataset.ic='${ic}'"
              data-ic="${ic}" style="width:36px;height:36px;border-radius:8px;border:2px solid ${(rol.ic||'ti-user')===ic?'var(--b)':'#E5E5E5'};background:var(--surf);cursor:pointer;display:flex;align-items:center;justify-content:center">
              <i class="ti ${ic}" style="font-size:16px;color:var(--t2)"></i>
            </button>`).join('')}
          </div>
        </div>

        <!-- Módulo inicial -->
        <div>
          <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;margin-bottom:4px">Módulo inicial al hacer login</p>
          <select id="cms_mod" style="width:100%;padding:9px 12px;border:.5px solid var(--bor);border-radius:var(--rs);font-size:12px;font-family:inherit;background:var(--surf);color:var(--t1);outline:none">
            ${['inicio','negocio','admin','clasificados','disenador'].map(m=>`<option value="${m}" ${(rol.mod||'inicio')===m?'selected':''}>${m}</option>`).join('')}
          </select>
        </div>

      </div>

      <!-- Botones -->
      <div style="display:flex;gap:8px;padding:0 16px">
        <button onclick="cmsModalRol=null;render()"
          style="flex:1;padding:12px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--surf);color:var(--t2);font-size:13px;font-weight:600;cursor:pointer;font-family:inherit">
          Cancelar
        </button>
        <button onclick="cmsGuardarRol()"
          style="flex:2;padding:12px;border-radius:var(--rs);border:none;background:var(--b);color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">
          ${isNew?'Crear rol':'Guardar cambios'}
        </button>
      </div>
    </div>
  </div>`;
}

function cmsToggleMod(rolId, seccion, modId){
  if(!ROL_PERMS[rolId]) ROL_PERMS[rolId]={portal:[],panel:[],navbot:[]};
  const arr = ROL_PERMS[rolId][seccion] || [];
  const idx = arr.indexOf(modId);
  if(idx>=0) arr.splice(idx,1);
  else arr.push(modId);
  ROL_PERMS[rolId][seccion] = arr;
  render(); // Render completo — el cambio ya afecta _renderNavbot, _renderModTabs, NAV_NEGOCIO
  showToast((idx>=0?'Módulo desactivado':'Módulo activado')+' para '+rolId);
}

function cmsActivarTodo(rolId, seccion){
  if(!ROL_PERMS[rolId]) ROL_PERMS[rolId]={portal:[],panel:[],navbot:[]};
  ROL_PERMS[rolId][seccion] = ALL_NAV_MODULES.filter(m=>m.cat===seccion).map(m=>m.id);
  render(); showToast('Todos los módulos activados para '+rolId);
}

function cmsDesactivarTodo(rolId, seccion){
  if(!ROL_PERMS[rolId]) ROL_PERMS[rolId]={portal:[],panel:[],navbot:[]};
  ROL_PERMS[rolId][seccion] = seccion==='panel'?['perfil']:seccion==='navbot'?['inicio']:['inicio'];
  render(); showToast('Módulos desactivados (mínimo conservado)');
}

function cmsCopiarDeRol(rolId, seccion){
  const otros = Object.keys(ROL_PERMS).filter(r=>r!==rolId);
  const origen = prompt('Copiar permisos de qué rol?\n'+otros.join(', '));
  if(!origen||!ROL_PERMS[origen]) return showToast('Rol no encontrado');
  if(!ROL_PERMS[rolId]) ROL_PERMS[rolId]={portal:[],panel:[],navbot:[]};
  ROL_PERMS[rolId][seccion] = [...(ROL_PERMS[origen][seccion]||[])];
  render(); showToast('Permisos copiados de "'+origen+'" → "'+rolId+'" ✓');
}

function cmsDragStart(e, idx){ cmsDragIdx=idx; e.dataTransfer.effectAllowed='move'; }

function cmsDrop(e, dropIdx, rolId, seccion){
  e.preventDefault();
  if(cmsDragIdx===null||cmsDragIdx===dropIdx) return;
  const arr = [...(ROL_PERMS[rolId]?.[seccion]||[])];
  // Re-sort the full ordered list
  const secMods = ALL_NAV_MODULES.filter(m=>m.cat===seccion);
  const enabledIds = ROL_PERMS[rolId]?.[seccion]||[];
  const orderedAll = [
    ...enabledIds.map(id=>secMods.find(m=>m.id===id)).filter(Boolean),
    ...secMods.filter(m=>!enabledIds.includes(m.id)),
  ];
  const item = orderedAll.splice(cmsDragIdx,1)[0];
  orderedAll.splice(dropIdx,0,item);
  // Re-extract only the enabled ones in new order
  ROL_PERMS[rolId][seccion] = orderedAll.filter(m=>enabledIds.includes(m.id)).map(m=>m.id);
  cmsDragIdx=null;
  render(); showToast('Orden actualizado ✓');
}

function cmsAbrirModalRol(tipo){
  cmsModalRol = tipo===null?'new':tipo;
  render();
}

function cmsGuardarRol(){
  const isNew = cmsModalRol==='new';
  const id   = isNew ? (document.getElementById('cms_id')?.value||'').toLowerCase().replace(/\s/g,'_') : cmsModalRol;
  const nm   = document.getElementById('cms_nm')?.value||'';
  const sub  = document.getElementById('cms_sub')?.value||'';
  const av   = (document.getElementById('cms_av')?.value||'??').toUpperCase().slice(0,2);
  const bg   = document.getElementById('cms_bg')?.value||'#E6F1FB';
  const tc   = document.getElementById('cms_tc')?.value||'#185FA5';
  const mod  = document.getElementById('cms_mod')?.value||'inicio';
  const icEl = document.querySelector('#cms_ic_grid button[style*="var(--b)"]');
  const ic   = icEl?.dataset?.ic||'ti-user';

  if(!id||!nm){ showToast('El ID y el nombre son obligatorios','error'); return; }

  if(isNew){
    if((USR_TIPOS||[]).find(u=>u.tipo===id)){ showToast('Ya existe un rol con ese ID','error'); return; }
    (USR_TIPOS||[]).push({tipo:id,nm,sub,av,bg,tc,ic,mod,activo:true});
    if(!ROL_PERMS[id]) ROL_PERMS[id]={portal:['inicio','noticias'],panel:['perfil'],navbot:['inicio','negocios']};
    cmsRolSel=id;
    showToast('Rol "'+nm+'" creado ✓');
  } else {
    const idx = (USR_TIPOS||[]).findIndex(u=>u.tipo===id);
    if(idx>=0) USR_TIPOS[idx]={...USR_TIPOS[idx],nm,sub,av,bg,tc,ic,mod};
    showToast('Rol "'+nm+'" actualizado ✓');
  }
  cmsModalRol=null;
  render();
}

function cmsEliminarRol(tipo){
  if(tipo==='admin'||tipo==='visitante'){ showToast('No se puede eliminar este rol','error'); return; }
  if(!confirm('¿Eliminar el rol "'+tipo+'"? Los permisos se perderán.')) return;
  const idx=(USR_TIPOS||[]).findIndex(u=>u.tipo===tipo);
  if(idx>=0) USR_TIPOS.splice(idx,1);
  delete ROL_PERMS[tipo];
  cmsRolSel='negocio';
  render(); showToast('Rol eliminado');
}
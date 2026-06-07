/**
 * cv — MiCantón.cr
 * Extraído del monolito micanton_v2.html
 * En v3: conectar a Firebase donde aplique
 */
// Nota: estas funciones usan variables globales de window.*
// Al migrar a Firebase, reemplazar con imports de ../state.js

function cvGetMisItems(){ return CV_ITEMS.filter(i=>i.uid==='MR'); }

function cvEliminar(id){ if(confirm('¿Eliminar este anuncio?')){ CV_ITEMS=CV_ITEMS.filter(i=>i.id!==id); cvDetalle=null; render(); showToast('Anuncio eliminado ✓'); } }

function cvEditar(id){
  const item = CV_ITEMS.find(i=>i.id===id);
  if(!item) return;
  cvEditId = id;
  cvFormData = {cat:item.cat||'',nm:item.nm||'',pr:item.pr||'',negociable:item.negociable||false,estado:item.estado||'Nuevo',desc:item.desc||'',entrega:item.entrega||'A convenir',tel:item.tel||'',zona:item.zona||AC.nm};
  // Restore fotos
  if(item._fotos?.length) IMG_STORE['cv_new']=item._fotos.map(d=>({dataUrl:d,name:'foto.jpg',size:0}));
  cvPublicarOpen=true; cvFormStep=1; cvDetalle=null; render();
}

function cvFavorito(id){ const i=CV_ITEMS.find(x=>x.id===id); if(i){i.favoritos=(i.favoritos||0)+1; render(); showToast('Guardado en favoritos ❤️');} }

function publicarCV(){
  const fotos = (IMG_STORE['cv_new']||[]);
  const datos = {
    cat:    cvFormData.cat||'otros',
    nm:     cvFormData.nm||'Artículo sin título',
    desc:   cvFormData.desc||'',
    pr:     cvFormData.pr||'Precio a convenir',
    zona:   cvFormData.zona||AC.nm,
    t:      'Recién publicado',
    fotos:  fotos.length,
    _fotos: fotos.map(f=>f.dataUrl),
    estado: cvFormData.estado||'Nuevo',
    negociable: cvFormData.negociable,
    entrega:cvFormData.entrega||'A convenir',
    tel:    cvFormData.tel||'8888-0001',
    vendedor:'María Rodríguez',
    vistas: 0, favoritos: 0,
    uid: 'MR',
  };
  if(cvEditId){
    // Editar existente
    const idx = CV_ITEMS.findIndex(i=>i.id===cvEditId);
    if(idx>=0) CV_ITEMS[idx]={...CV_ITEMS[idx],...datos};
    cvEditId=null;
    showToast('Anuncio actualizado ✓');
  } else {
    // Nuevo
    datos.id='cv-'+Date.now();
    CV_ITEMS.unshift(datos);
    showToast('¡Anuncio publicado! Ya es visible ✓');
  }
  cvPublicarOpen=false; cvFormStep=1;
  cvFormData={cat:'',nm:'',pr:'',negociable:false,estado:'Nuevo',desc:'',entrega:'A convenir',tel:'',zona:''};
  IMG_STORE['cv_new']=[];
  render();
}

function renderCVForm(){
  const isEdit = !!cvEditId;
  const steps  = ['Categoría','Detalles','Fotos','Publicar'];
  const stepBar = `<div style="display:flex;gap:4px;margin-bottom:18px">
    ${steps.map((s,i)=>`<div style="flex:1;text-align:center">
      <div style="width:24px;height:24px;border-radius:50%;border:2px solid ${i+1<=cvFormStep?'var(--b)':'var(--bor)'};background:${i+1<cvFormStep?'var(--b)':i+1===cvFormStep?'var(--b)':'var(--surf)'};display:flex;align-items:center;justify-content:center;margin:0 auto 3px;color:${i+1<=cvFormStep?'#fff':'var(--t3)'};font-size:10px;font-weight:700">
        ${i+1<cvFormStep?'✓':i+1}
      </div>
      <p style="font-size:9px;font-weight:600;color:${i+1===cvFormStep?'var(--b)':'var(--t3)'}">${s}</p>
    </div>`).join('')}
  </div>`;

  let body = '';

  if(cvFormStep===1){
    const cats = SUBCATS?.clasificados||[];
    body = `<p style="font-size:13px;font-weight:700;color:var(--t1);margin-bottom:10px">¿Qué vas a vender?</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
      ${cats.map(c=>`<div style="border:${cvFormData.cat===c.id?'2px solid var(--b)':'1.5px solid var(--bor)'};border-radius:var(--r);padding:12px 8px;text-align:center;cursor:pointer;background:${cvFormData.cat===c.id?'#E6F1FB':'var(--surf)'}" onclick="cvFormData.cat='${c.id}';render()">
        <i class="ti ${c.ic}" style="font-size:24px;color:${cvFormData.cat===c.id?'var(--b)':'var(--t3)'}"></i>
        <p style="font-size:10px;font-weight:700;color:${cvFormData.cat===c.id?'var(--b)':'var(--t2)'};margin-top:5px">${c.nm}</p>
        ${cvFormData.cat===c.id?'<i class="ti ti-check" style="font-size:11px;color:var(--b)"></i>':''}
      </div>`).join('')}
    </div>`;

  } else if(cvFormStep===2){
    body = `<p style="font-size:13px;font-weight:700;color:var(--t1);margin-bottom:10px">Detalles del artículo</p>
    <div style="display:flex;flex-direction:column;gap:10px">

      <div><p style="font-size:11px;font-weight:600;color:var(--t2);margin-bottom:4px">Título del anuncio *</p>
        <input id="cvNm" style="width:100%;font-size:13px;padding:9px 11px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t1);outline:none;font-family:inherit;box-sizing:border-box"
          placeholder="Ej: iPhone 13 128GB azul, poco uso" value="${cvFormData.nm}" oninput="cvFormData.nm=this.value">
      </div>

      <div><p style="font-size:11px;font-weight:600;color:var(--t2);margin-bottom:4px">Precio *</p>
        <div style="display:flex;gap:8px;align-items:center">
          <input id="cvPr" style="flex:1;font-size:14px;padding:9px 11px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t1);outline:none;font-family:inherit;font-weight:700"
            placeholder="₡ 0" value="${cvFormData.pr}" oninput="cvFormData.pr=this.value">
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer;flex-shrink:0;padding:9px 12px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--surf)">
            <input type="checkbox" ${cvFormData.negociable?'checked':''} onchange="cvFormData.negociable=this.checked" style="accent-color:var(--b);width:16px;height:16px">
            <span style="font-size:12px;font-weight:600;color:var(--t2)">Negociable</span>
          </label>
        </div>
      </div>

      <div><p style="font-size:11px;font-weight:600;color:var(--t2);margin-bottom:5px">Estado *</p>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          ${['Nuevo','Como nuevo','Buen estado','Usado'].map(e=>`<span style="font-size:11px;font-weight:600;padding:6px 12px;border-radius:20px;border:${cvFormData.estado===e?'2px solid var(--b)':'.5px solid var(--bor)'};cursor:pointer;background:${cvFormData.estado===e?'var(--b)':'var(--surf)'};color:${cvFormData.estado===e?'#fff':'var(--t3)'}"
            onclick="cvFormData.estado='${e}';render()">${e}</span>`).join('')}
        </div>
      </div>

      <div><p style="font-size:11px;font-weight:600;color:var(--t2);margin-bottom:4px">Descripción</p>
        <textarea id="cvDesc" style="width:100%;font-size:12px;padding:9px 11px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t1);outline:none;resize:vertical;min-height:90px;font-family:inherit;box-sizing:border-box"
          placeholder="Describí el artículo: características, por qué lo vendés, qué incluye..." oninput="cvFormData.desc=this.value">${cvFormData.desc}</textarea>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div><p style="font-size:11px;font-weight:600;color:var(--t2);margin-bottom:4px">Entrega</p>
          <select style="width:100%;font-size:12px;padding:9px 11px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t1);outline:none;font-family:inherit" onchange="cvFormData.entrega=this.value">
            ${['Presencial','SINPE + courier','Solo presencial','A convenir'].map(o=>`<option ${cvFormData.entrega===o?'selected':''}>${o}</option>`).join('')}
          </select>
        </div>
        <div><p style="font-size:11px;font-weight:600;color:var(--t2);margin-bottom:4px">Teléfono</p>
          <input style="width:100%;font-size:12px;padding:9px 11px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t1);outline:none;font-family:inherit;box-sizing:border-box"
            placeholder="8888-0000" value="${cvFormData.tel}" oninput="cvFormData.tel=this.value">
        </div>
      </div>
    </div>`;

  } else if(cvFormStep===3){
    body = `<p style="font-size:13px;font-weight:700;color:var(--t1);margin-bottom:4px">Fotos del artículo</p>
    <p style="font-size:11px;color:var(--t3);margin-bottom:10px">Hasta 8 fotos · La primera es la principal</p>
    ${imgPickerHTML('cv_new', 8, 'Agregar fotos')}
    <div style="background:#E6F1FB;border:.5px solid #85B7EB;border-radius:var(--rs);padding:9px 12px;font-size:11px;color:var(--bd);display:flex;gap:7px;margin-top:8px">
      <i class="ti ti-info-circle" style="font-size:14px;flex-shrink:0"></i>
      Los anuncios con fotos reciben hasta 5× más contactos. Podés arrastrar para reordenar.
    </div>`;

  } else {
    // Paso 4: Confirmación
    const fotos = (IMG_STORE['cv_new']||[]).length;
    body = `<div style="text-align:center;padding:8px 0 16px">
      <div style="width:64px;height:64px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;margin:0 auto 12px">
        <i class="ti ti-${isEdit?'edit':'check'}" style="font-size:30px;color:var(--g)"></i>
      </div>
      <p style="font-size:16px;font-weight:700;color:var(--t1);margin-bottom:4px">${isEdit?'¿Guardar cambios?':'¡Todo listo para publicar!'}</p>
      <p style="font-size:12px;color:var(--t3);margin-bottom:16px">Revisá los datos antes de ${isEdit?'actualizar':'publicar'}</p>
      <div style="background:var(--bg);border-radius:var(--rs);padding:13px 14px;text-align:left;border:.5px solid var(--bor);display:flex;flex-direction:column;gap:9px">
        ${cvFormData.nm?`<div style="display:flex;gap:8px;align-items:flex-start">
          <i class="ti ti-check" style="font-size:13px;color:var(--g);flex-shrink:0;margin-top:1px"></i>
          <div><p style="font-size:12px;font-weight:600;color:var(--t1)">${cvFormData.nm}</p>
          <p style="font-size:10px;color:var(--t3)">${cvFormData.estado} · ${cvFormData.pr||'Precio a convenir'} · ${cvFormData.negociable?'Negociable':'Precio fijo'}</p></div>
        </div>`:'<p style="color:#E24B4A;font-size:12px">⚠ Falta el título del anuncio</p>'}
        ${cvFormData.cat?`<div style="display:flex;gap:8px"><i class="ti ti-tag" style="font-size:13px;color:var(--g);flex-shrink:0"></i><p style="font-size:12px;font-weight:600;color:var(--t1)">${cvFormData.cat}</p></div>`:''}
        <div style="display:flex;gap:8px"><i class="ti ti-photo" style="font-size:13px;color:${fotos>0?'var(--g)':'#854F0B'};flex-shrink:0"></i>
          <p style="font-size:12px;font-weight:600;color:${fotos>0?'var(--t1)':'#854F0B'}">${fotos>0?fotos+' foto'+(fotos!==1?'s':'')+' agregadas':'Sin fotos · (recomendado agregar)'}</p>
        </div>
        ${cvFormData.entrega?`<div style="display:flex;gap:8px"><i class="ti ti-truck" style="font-size:13px;color:var(--g);flex-shrink:0"></i><p style="font-size:12px;color:var(--t1)">${cvFormData.entrega}</p></div>`:''}
      </div>
    </div>`;
  }

  return `<div style="padding:14px">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
      <button style="width:32px;height:32px;border-radius:50%;border:.5px solid var(--bor);background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center"
        onclick="${cvFormStep>1?'cvFormStep--;render()':'cvPublicarOpen=false;cvEditId=null;render()'}">
        <i class="ti ti-arrow-left" style="font-size:15px;color:var(--t1)"></i>
      </button>
      <div>
        <p style="font-size:14px;font-weight:700;color:var(--t1)">${isEdit?'Editar anuncio':'Nuevo anuncio'}</p>
        <p style="font-size:11px;color:var(--t3)">Paso ${cvFormStep} de ${steps.length} · ${steps[cvFormStep-1]}</p>
      </div>
    </div>
    ${stepBar}${body}
    <button style="width:100%;background:${cvFormStep===4?'var(--g)':'var(--b)'};color:#fff;border:none;border-radius:var(--rs);padding:13px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;margin-top:16px;display:flex;align-items:center;justify-content:center;gap:6px"
      onclick="${cvFormStep<4?'cvFormStep++;render()':'publicarCV()'}">
      <i class="ti ti-${cvFormStep===4?'check':'arrow-right'}" style="font-size:14px"></i>
      ${cvFormStep===4?(isEdit?'Guardar cambios':'Publicar mi anuncio'):'Continuar →'}
    </button>
  </div>`;
}

function renderCVDetalle(id){
  const item = CV_ITEMS.find(x=>x.id===id);
  if(!item){ cvDetalle=null; render(); return ''; }
  const isMio = item.uid==='MR';
  const fotos = item._fotos?.length ? item._fotos : [];
  const cat   = CV_CATS?.find(c=>c.id===item.cat)||{ic:'ti-package',co:'#185FA5',nm:'Otros'};

  return `<div>
    <!-- GALERÍA -->
    <div style="height:240px;background:#E6F1FB;position:relative;overflow:hidden">
      ${fotos[0]?`<img src="${fotos[0]}" style="width:100%;height:100%;object-fit:cover" id="cvFotoMain">`
        :`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center"><i class="ti ${cat.ic}" style="font-size:64px;color:${cat.co};opacity:.25"></i></div>`}
      <!-- Botón volver -->
      <button style="position:absolute;top:12px;left:12px;width:34px;height:34px;background:rgba(255,255,255,.88);border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.2)"
        onclick="cvDetalle=null;render()"><i class="ti ti-arrow-left" style="font-size:16px;color:var(--t1)"></i></button>
      <!-- Acciones rápidas -->
      <div style="position:absolute;top:12px;right:12px;display:flex;gap:6px">
        <button style="width:34px;height:34px;background:rgba(255,255,255,.88);border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center"
          onclick="cvFavorito('${item.id}')"><i class="ti ti-heart" style="font-size:16px;color:#A32D2D"></i></button>
        <button style="width:34px;height:34px;background:rgba(255,255,255,.88);border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center"
          onclick="compartir('${item.nm}','${item.pr} · ${item.zona}','https://micanton.cr')"><i class="ti ti-share" style="font-size:16px;color:var(--t1)"></i></button>
      </div>
      <!-- Estado + negociable -->
      <div style="position:absolute;bottom:12px;left:12px;display:flex;gap:6px">
        <span style="background:rgba(255,255,255,.9);color:var(--t1);font-size:10px;font-weight:600;padding:3px 9px;border-radius:10px">${item.estado}</span>
        ${item.negociable?'<span style="background:#E1F5EE;color:#0F6E56;font-size:10px;font-weight:600;padding:3px 9px;border-radius:10px">Negociable</span>':''}
      </div>
      ${fotos.length>0?`<span style="position:absolute;bottom:12px;right:12px;background:rgba(0,0,0,.55);color:#fff;font-size:10px;font-weight:600;padding:3px 9px;border-radius:10px">📷 ${fotos.length}</span>`:''}
    </div>

    <!-- Miniaturas fotos -->
    ${fotos.length>1?`<div style="display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding:8px 12px;background:${tpl?tpl.colores?.fondo1+'22'||'var(--surf)':'var(--surf)'};border-bottom:.5px solid var(--bor)">
      ${fotos.map((src,i)=>`<img src="${src}" onclick="G('cvFotoMain').src='${src}'" style="width:56px;height:56px;object-fit:cover;border-radius:8px;flex-shrink:0;cursor:pointer;border:2px solid ${i===0?'var(--b)':'var(--bor)'}">`).join('')}
    </div>`:''}

    <!-- CONTENIDO -->
    <div style="padding:14px">
      <!-- Precio y título -->
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px;gap:10px">
        <div style="flex:1">
          <p style="font-size:22px;font-weight:700;color:var(--b);margin-bottom:4px">${item.pr}</p>
          <p style="font-size:15px;font-weight:600;color:var(--t1);line-height:1.3">${item.nm}</p>
        </div>
        <div style="flex-shrink:0;text-align:right">
          <p style="font-size:10px;color:var(--t3)"><i class="ti ti-eye" style="font-size:10px"></i> ${item.vistas} vistas</p>
          <p style="font-size:10px;color:var(--t3)"><i class="ti ti-heart" style="font-size:10px"></i> ${item.favoritos} favoritos</p>
        </div>
      </div>

      <!-- Datos rápidos -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px">
        ${[
          ['ti-map-pin','Zona',item.zona],
          ['ti-clock','Publicado',item.t],
          ['ti-package','Entrega',item.entrega],
          ['ti-tag','Categoría',cat.nm||item.cat],
        ].map(([ic,l,v])=>`<div style="background:var(--bg);border-radius:var(--rs);padding:8px 10px;border:.5px solid var(--bor)">
          <p style="font-size:9px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px"><i class="ti ${ic}" style="font-size:10px"></i> ${l}</p>
          <p style="font-size:12px;font-weight:600;color:var(--t1)">${v}</p>
        </div>`).join('')}
      </div>

      <!-- Descripción -->
      ${item.desc?`<div style="margin-bottom:14px">
        <p style="font-size:12px;font-weight:700;color:var(--t2);margin-bottom:6px">Descripción</p>
        <p style="font-size:13px;color:var(--t1);line-height:1.6">${item.desc}</p>
      </div>`:''}

      <!-- Vendedor -->
      <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--rs);padding:11px 13px;margin-bottom:14px;display:flex;align-items:center;gap:10px">
        <div style="width:40px;height:40px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#185FA5;flex-shrink:0">${(item.vendedor||'?').split(' ').map(w=>w[0]).join('').substring(0,2)}</div>
        <div style="flex:1">
          <p style="font-size:13px;font-weight:700;color:var(--t1)">${item.vendedor||'Vendedor'}</p>
          <p style="font-size:11px;color:var(--t3)">Miembro de MiCantón · ${item.zona}</p>
        </div>
        <i class="ti ti-circle-check" style="font-size:18px;color:var(--g)"></i>
      </div>

      <!-- Acciones del vendedor (si es mío) -->
      ${isMio?`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
        <button style="padding:11px;border-radius:var(--rs);border:none;background:#E6F1FB;color:#185FA5;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:5px"
          onclick="cvEditar('${item.id}')"><i class="ti ti-edit" style="font-size:14px"></i>Editar anuncio</button>
        <button style="padding:11px;border-radius:var(--rs);border:none;background:#FCEBEB;color:#A32D2D;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:5px"
          onclick="cvEliminar('${item.id}')"><i class="ti ti-trash" style="font-size:14px"></i>Eliminar</button>
      </div>`:''}

      <!-- Botones contacto -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <button style="padding:13px;border-radius:var(--rs);border:none;background:#25D366;color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px"
          onclick="abrirWhatsApp('${item.tel}','Hola! Vi tu anuncio en MiCantón.cr · ${item.nm.replace(/'/g,'')} · ${item.pr}. ¿Sigue disponible?')">
          <i class="ti ti-brand-whatsapp" style="font-size:16px"></i>WhatsApp
        </button>
        <button style="padding:13px;border-radius:var(--rs);border:none;background:var(--b);color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px"
          onclick="window.open('tel:${item.tel}')">
          <i class="ti ti-phone" style="font-size:16px"></i>Llamar
        </button>
      </div>
    </div>
  </div>`;
}

function renderClasificados(){
  if(cvDetalle) return renderCVDetalle(cvDetalle);
  if(cvPublicarOpen) return renderCVForm();

  const misItems = cvGetMisItems();
  const lista = cvMisAnuncios ? misItems
    : cvFiltro==='todos' ? CV_ITEMS
    : CV_ITEMS.filter(i=>i.cat===cvFiltro);

  return `
  <!-- HEADER -->
  <div style="background:linear-gradient(135deg,#0C447C,#185FA5);padding:14px 16px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <div>
        <p style="font-size:16px;font-weight:700;color:#fff">Compra & Venta</p>
        <p style="font-size:11px;color:rgba(255,255,255,.75)">${CV_ITEMS.length} artículos en ${AC.nm}</p>
      </div>
      <button style="background:#fff;color:#185FA5;border:none;border-radius:20px;padding:8px 14px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:5px"
        onclick="pedirAcceso('publicar_cv',()=>{cvPublicarOpen=true;cvFormStep=1;cvEditId=null;cvFormData={cat:'',nm:'',pr:'',negociable:false,estado:'Nuevo',desc:'',entrega:'A convenir',tel:'',zona:AC.nm};IMG_STORE['cv_new']=[];render()})">
        <i class="ti ti-plus" style="font-size:13px"></i>Vender algo
      </button>
    </div>
    <!-- Mis anuncios tab -->
    <div style="display:flex;gap:6px">
      <span style="font-size:11px;font-weight:600;padding:5px 12px;border-radius:20px;cursor:pointer;background:${!cvMisAnuncios?'rgba(255,255,255,.25)':'rgba(255,255,255,.1)'};color:#fff;border:.5px solid rgba(255,255,255,.3)"
        onclick="cvMisAnuncios=false;render()">Todos</span>
      <span style="font-size:11px;font-weight:600;padding:5px 12px;border-radius:20px;cursor:pointer;background:${cvMisAnuncios?'rgba(255,255,255,.25)':'rgba(255,255,255,.1)'};color:#fff;border:.5px solid rgba(255,255,255,.3)"
        onclick="cvMisAnuncios=true;render()">
        Mis anuncios (${misItems.length})
      </span>
    </div>
  </div>

  ${renderCatBar('clasificados', cvFiltro, "cvFiltro='__CAT__';cvSubFiltro=null;render()", 'var(--b)')}

  <!-- LISTADO -->
  <div style="padding:10px 12px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <p style="font-size:11px;color:var(--t3)">${lista.length} artículo${lista.length!==1?'s':''} · ${cvMisAnuncios?'Mis publicaciones':'Más reciente'}</p>
      ${cvMisAnuncios?`<button style="font-size:10px;font-weight:700;padding:4px 12px;border-radius:20px;border:none;background:var(--b);color:#fff;cursor:pointer;font-family:inherit"
        onclick="cvPublicarOpen=true;cvFormStep=1;cvEditId=null;cvFormData={cat:'',nm:'',pr:'',negociable:false,estado:'Nuevo',desc:'',entrega:'A convenir',tel:'',zona:AC.nm};IMG_STORE['cv_new']=[];render()">
        + Nuevo anuncio</button>`:''}
    </div>

    ${lista.length===0?`
      <div style="padding:40px;text-align:center">
        <i class="ti ti-shopping-bag" style="font-size:40px;color:var(--bor);display:block;margin-bottom:10px"></i>
        <p style="font-size:14px;font-weight:600;color:var(--t2);margin-bottom:4px">${cvMisAnuncios?'Todavía no tenés anuncios':'No hay artículos aquí'}</p>
        <p style="font-size:12px;color:var(--t3);margin-bottom:14px">${cvMisAnuncios?'Publicá tu primer artículo':'Sé el primero en publicar en esta categoría'}</p>
        <button style="background:var(--b);color:#fff;border:none;border-radius:var(--rs);padding:10px 20px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit"
          onclick="cvPublicarOpen=true;cvFormStep=1;cvEditId=null;cvFormData={cat:'',nm:'',pr:'',negociable:false,estado:'Nuevo',desc:'',entrega:'A convenir',tel:'',zona:AC.nm};IMG_STORE['cv_new']=[];render()">
          + Publicar artículo</button>
      </div>`:`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      ${lista.map(item=>{
        const isMio = item.uid==='MR';
        const foto  = item._fotos?.[0] || imgThumbFirst(imgKey('cv',item.id));
        const cat   = CV_CATS?.find(c=>c.id===item.cat)||{ic:'ti-package',co:'#185FA5'};
        return `<div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);overflow:hidden;cursor:pointer;position:relative" onclick="cvDetalle='${item.id}';render()">
          <!-- FOTO -->
          <div style="height:110px;background:#E6F1FB;position:relative;overflow:hidden">
            ${foto?`<img src="${foto}" style="width:100%;height:100%;object-fit:cover">`:`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center"><i class="ti ${cat.ic}" style="font-size:36px;color:${cat.co};opacity:.35"></i></div>`}
            <!-- Badges -->
            <div style="position:absolute;top:6px;left:6px;display:flex;gap:4px">
              <span style="background:rgba(0,0,0,.55);color:#fff;font-size:9px;font-weight:600;padding:2px 6px;border-radius:8px">${item.estado}</span>
              ${item.negociable?'<span style="background:#1D9E75;color:#fff;font-size:9px;font-weight:600;padding:2px 6px;border-radius:8px">Neg.</span>':''}
            </div>
            <!-- Favorito -->
            <button style="position:absolute;top:6px;right:6px;width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,.88);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center"
              onclick="event.stopPropagation();cvFavorito('${item.id}')">
              <i class="ti ti-heart" style="font-size:12px;color:#A32D2D"></i>
            </button>
            ${item.fotos>0?`<span style="position:absolute;bottom:5px;right:6px;background:rgba(0,0,0,.5);color:#fff;font-size:9px;font-weight:600;padding:1px 5px;border-radius:8px">📷 ${item.fotos}</span>`:''}
            <!-- Mis anuncios: botones editar/eliminar -->
            ${isMio&&cvMisAnuncios?`<div style="position:absolute;bottom:5px;left:5px;display:flex;gap:4px">
              <button style="background:rgba(255,255,255,.9);border:none;border-radius:8px;padding:3px 7px;font-size:9px;font-weight:700;cursor:pointer;color:#185FA5" onclick="event.stopPropagation();cvEditar('${item.id}')">✏️ Editar</button>
              <button style="background:rgba(255,255,255,.9);border:none;border-radius:8px;padding:3px 7px;font-size:9px;font-weight:700;cursor:pointer;color:#A32D2D" onclick="event.stopPropagation();cvEliminar('${item.id}')">🗑️</button>
            </div>`:''}
          </div>
          <!-- INFO -->
          <div style="padding:8px 9px">
            <p style="font-size:13px;font-weight:700;color:var(--b);margin-bottom:2px">${item.pr}</p>
            <p style="font-size:11px;font-weight:600;color:var(--t1);margin-bottom:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.35">${item.nm}</p>
            <p style="font-size:10px;color:var(--t3);display:flex;align-items:center;gap:3px;margin-bottom:4px"><i class="ti ti-map-pin" style="font-size:10px"></i>${item.zona} · ${item.t}</p>
            <div style="display:flex;align-items:center;gap:5px">
              <div style="width:16px;height:16px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:7px;font-weight:700;color:#185FA5;flex-shrink:0">${item.uid}</div>
              <span style="font-size:9px;color:var(--t3);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${item.vendedor||item.uid}</span>
              <div style="display:flex;align-items:center;gap:2px"><i class="ti ti-eye" style="font-size:9px;color:var(--t3)"></i><span style="font-size:9px;color:var(--t3)">${item.vistas}</span></div>
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>`}
  </div>`;
}
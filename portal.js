/**
 * templates — MiCantón.cr
 * Extraído del monolito micanton_v2.html
 * En v3: conectar a Firebase donde aplique
 */
// Nota: estas funciones usan variables globales de window.*
// Al migrar a Firebase, reemplazar con imports de ../state.js

function getTplForNeg(negId){
  const savedId = negocioTplSel[String(negId)];
  if(savedId!==undefined){
    return getAllPlantillas().find(p=>String(p.id)===String(savedId));
  }
  return null; // sin plantilla → vista estándar
}

function setTplForNeg(negId, tplId){
  if(!negocioTplSel) negocioTplSel={};
  negocioTplSel[String(negId)] = tplId;
  tplPickerOpen = false;
  render();
  showToast('Plantilla aplicada ✓ · tu catálogo ya tiene nuevo diseño');
}

function quitarTplNeg(negId){
  if(negocioTplSel) delete negocioTplSel[negId];
  tplPickerOpen = false;
  render();
  showToast('Plantilla removida · usando diseño estándar');
}

function getAllCatPlantillas(){
  const sys    = (CAT_PLANTILLAS||[]).map(p=>({...p, fuente:'Sistema'}));
  const custom = (adminPlantillasStore||[])
    .filter(p=>p.tipoPlan==='catalogo'||p.tipo==='catalogo')
    .map(p=>({...p, fuente:'Admin', esCustom:true}));
  return [...custom, ...sys]; // custom primero
}

function getCatPlantillasParaNeg(negId){
  const neg = (PROVEEDORES||[]).filter(Boolean).find(p=>String(p.id)===String(negId))
           || (PROS||[]).filter(Boolean).find(p=>String(p.id)===String(negId));
  const rubro = neg?.catalogType||neg?.rubro||'generico';
  const all = getAllCatPlantillas();
  // Mostrar todas pero ordenar las del rubro primero
  const deRubro = all.filter(p=>(p.rubros||[]).some(rb=>rb===rubro||rb===neg?.cat?.toLowerCase().split(' ')[0]||(rb||'').includes('generico')||rubro==='generico'));
  const otras   = all.filter(p=>!deRubro.includes(p));
  return [...deRubro,...otras];
}

function renderTplPicker(negId){
  const plantillas = getCatPlantillasParaNeg(negId);
  const tplActual  = getTplForNeg(negId);
  const neg = (PROVEEDORES||[]).filter(Boolean).find(p=>String(p.id)===String(negId))
           || (PROS||[]).filter(Boolean).find(p=>String(p.id)===String(negId));

  const TPL_STYLES = [
    // Estilos representados como preview visual puro (sin canvas, solo CSS)
    {id:'c1', nm:'Menú Especial',     estilo:'dark_gold',  colores:{fondo:'#1C1C1C',acento:'#EF9F27',texto:'#fff'},    ic:'👑', desc:'Oscuro premium · fotos circulares · dorado'},
    {id:'c2', nm:'Flyer Oferta',      estilo:'red_bold',   colores:{fondo:'#CC0020',acento:'#FFD600',texto:'#fff'},    ic:'📢', desc:'Rojo impactante · grilla de productos'},
    {id:'c3', nm:'Menú Limpio',       estilo:'white_clean',colores:{fondo:'#FFFFFF',acento:'#1D9E75',texto:'#111'},    ic:'🟢', desc:'Blanco minimalista · numerado'},
    {id:'c4', nm:'Carta Elegante',    estilo:'dark_elegant',colores:{fondo:'#111111',acento:'#C9A84C',texto:'#fff'},   ic:'🍽️', desc:'Oscuro elegante · tipografía refinada'},
    {id:'c5', nm:'Super Sale Verde',  estilo:'sale_green', colores:{fondo:'#1D9E75',acento:'#FFD600',texto:'#fff'},    ic:'🥦', desc:'Verde vibrante · hasta 8 items'},
    {id:'c6', nm:'Supermercado',      estilo:'market',     colores:{fondo:'#FFD600',acento:'#E24B4A',texto:'#111'},    ic:'🛒', desc:'Amarillo llamativo · estilo mercado'},
    {id:'c7', nm:'Sale Amarillo',     estilo:'sale_yellow',colores:{fondo:'#FFD600',acento:'#111',texto:'#111'},       ic:'🌟', desc:'Máximo impacto · hasta 12 productos'},
    {id:'c8', nm:'Fresh Hero',        estilo:'fresh',      colores:{fondo:'#1D4A1D',acento:'#E24B4A',texto:'#fff'},    ic:'🥬', desc:'Verde oscuro · foto hero + grilla'},
    {id:'c9', nm:'Boutique Rosa',     estilo:'boutique',   colores:{fondo:'#F8E1EA',acento:'#C4366E',texto:'#3A0A1E'}, ic:'🌸', desc:'Rosa pastel · moda y belleza'},
    {id:'c10',nm:'Tech Azul',         estilo:'tech_blue',  colores:{fondo:'#0A1628',acento:'#00BFFF',texto:'#fff'},    ic:'💻', desc:'Azul oscuro · tecnología'},
    {id:'c11',nm:'Natural Café',      estilo:'natural',    colores:{fondo:'#F5EDD8',acento:'#6B3F17',texto:'#3B1F00'}, ic:'🌿', desc:'Cálido orgánico · alimentación saludable'},
    {id:'c12',nm:'Profesional',       estilo:'pro',        colores:{fondo:'#1E2A4A',acento:'#4ECDC4',texto:'#fff'},    ic:'💼', desc:'Azul corporativo · servicios profesionales'},
  ];

  // Merge: priorizar admin custom, complementar con system styles
  const toShow = [...(getAllCatPlantillas().filter(p=>p.esCustom)), ...TPL_STYLES].slice(0,20);

  return `
  <div onclick="if(event.target===this){tplPickerOpen=false;render()}"
    style="position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:600;display:flex;align-items:flex-end;justify-content:center">
    <div onclick="event.stopPropagation()"
      style="background:var(--bg);border-radius:18px 18px 0 0;width:100%;max-width:500px;max-height:88vh;display:flex;flex-direction:column">

      <!-- Handle + Header -->
      <div style="padding:10px 16px 0;flex-shrink:0">
        <div style="width:40px;height:4px;border-radius:2px;background:var(--bor);margin:0 auto 12px"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:12px;border-bottom:.5px solid var(--bor)">
          <div>
            <p style="font-size:15px;font-weight:700;color:var(--t1)">Elegir plantilla</p>
            <p style="font-size:10px;color:var(--t3)">${neg?.nm||'Tu negocio'} · ${toShow.length} diseños disponibles</p>
          </div>
          <button onclick="tplPickerOpen=false;render()" style="width:28px;height:28px;border-radius:50%;border:none;background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center">
            <i class="ti ti-x" style="font-size:13px;color:var(--t2)"></i>
          </button>
        </div>
        ${tplActual?`
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0 6px">
          <p style="font-size:10px;color:var(--t3)">Actual: <strong style="color:var(--b)">${tplActual.nm}</strong></p>
          <button onclick="quitarTplNeg('${negId}')" style="font-size:10px;font-weight:600;color:var(--t3);background:none;border:none;cursor:pointer;font-family:inherit;text-decoration:underline">
            Quitar diseño
          </button>
        </div>`:''}
      </div>

      <!-- Grid de plantillas -->
      <div style="flex:1;overflow-y:auto;padding:10px 14px 14px;display:grid;grid-template-columns:1fr 1fr;gap:10px">

        <!-- Opción "Estándar" (sin plantilla) -->
        <div onclick="quitarTplNeg('${negId}')"
          style="border-radius:var(--r);border:2.5px solid ${!tplActual?'var(--b)':'var(--bor)'};overflow:hidden;cursor:pointer;background:${!tplActual?'#E6F1FB':'var(--surf)'}">
          <!-- Preview -->
          <div style="height:90px;background:var(--bg);display:flex;align-items:center;justify-content:center;border-bottom:.5px solid var(--bor)">
            <div style="text-align:center">
              <i class="ti ti-layout-list" style="font-size:28px;color:var(--t3)"></i>
              <p style="font-size:9px;color:var(--t3);margin-top:3px">Lista simple</p>
            </div>
          </div>
          <!-- Info -->
          <div style="padding:8px 10px">
            <p style="font-size:11px;font-weight:700;color:${!tplActual?'var(--b)':'var(--t1)'}">${!tplActual?'✓ ':''}Estándar</p>
            <p style="font-size:9px;color:var(--t3)">Sin diseño especial</p>
          </div>
        </div>

        ${toShow.map(tpl=>{
          const isActive = tplActual&&String(tplActual.id)===String(tpl.id);
          const co = tpl.colores?.acento||tpl.preview||'#185FA5';
          const bg = tpl.colores?.fondo||tpl.preview||'#1C1C1C';
          const tc = tpl.colores?.texto||'#fff';
          return `
          <div onclick="setTplForNeg('${negId}','${tpl.id}')"
            style="border-radius:var(--r);border:2.5px solid ${isActive?'var(--b)':'var(--bor)'};overflow:hidden;cursor:pointer">

            <!-- Preview visual (CSS puro — no canvas) -->
            <div style="height:90px;background:${bg};position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;padding:8px">
              <!-- Barra top simulada -->
              <div style="display:flex;gap:3px;align-items:center">
                <div style="height:6px;width:40%;border-radius:3px;background:${co};opacity:.9"></div>
                <div style="height:4px;width:20%;border-radius:3px;background:${tc};opacity:.4"></div>
              </div>
              <!-- Grilla de items simulada -->
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px">
                ${[1,2,3,4].map(i=>`<div style="height:18px;border-radius:3px;background:${tc};opacity:${0.08+i*0.04}"></div>`).join('')}
              </div>
              <!-- Badge precio simulado -->
              <div style="position:absolute;bottom:8px;right:8px;background:${co};border-radius:8px;padding:2px 7px">
                <span style="font-size:8px;font-weight:700;color:${bg.length>5?bg:'#fff'}">₡</span>
              </div>
              <!-- Ícono del estilo -->
              <div style="position:absolute;top:6px;right:8px;font-size:14px">${tpl.ic||'🎨'}</div>
              ${isActive?`<div style="position:absolute;inset:0;background:rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center"><div style="width:24px;height:24px;border-radius:50%;background:var(--b);display:flex;align-items:center;justify-content:center"><i class="ti ti-check" style="font-size:13px;color:#fff"></i></div></div>`:''}
            </div>

            <!-- Info -->
            <div style="padding:8px 10px;background:${isActive?'#E6F1FB':'var(--surf)'}">
              <div style="display:flex;align-items:center;gap:4px;margin-bottom:1px">
                <p style="font-size:11px;font-weight:700;color:${isActive?'var(--b)':'var(--t1)'}">${isActive?'✓ ':''}${tpl.nm}</p>
                ${tpl.esCustom?`<span style="font-size:7px;font-weight:700;background:#E1F5EE;color:#085041;padding:1px 5px;border-radius:8px">Admin</span>`:''}
              </div>
              <p style="font-size:9px;color:var(--t3);line-height:1.3">${tpl.desc||''}</p>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

function _getTplLayout(tpl){
  if(!tpl) return 'card';
  // Inferir layout desde nombre/tipo de plantilla
  const nm = (tpl.nm||'').toLowerCase();
  if(tpl.tipo==='catalogo'||nm.includes('catálog')||nm.includes('grid')||nm.includes('grilla')) return 'grid';
  if(nm.includes('oscuro')||nm.includes('dark')||nm.includes('especial')||nm.includes('al carbón')) return 'dark';
  if(nm.includes('magazine')||nm.includes('hero')||nm.includes('split')) return 'magazine';
  // Custom admin: usar tipoPlan
  if(tpl.esCustom&&tpl.colores?.fondo1) return _isDark(tpl.colores.fondo1)?'dark':'card';
  return 'card';
}

function _renderItemConTpl(item, negId, type, neg, tpl){
  const co   = tpl?.colores?.acento  || neg?.co  || '#185FA5';
  const fondo= tpl?.colores?.fondo1  || neg?.bg  || '#E6F1FB';
  const texto= tpl?.colores?.texto   || '#111';
  const ac   = tpl?.colores?.acento  || co;

  const enCarrito = (carrito||[]).find(c=>c.id===item.id&&String(c.negId)===String(negId));
  const qty = enCarrito?.qty||0;

  const btnAdd = qty>0
    ? `<div style="display:flex;align-items:center;gap:0;border:2px solid ${co};border-radius:20px;overflow:hidden">
        <button onclick="quitarItemCarrito('${item.id}','${negId}')" style="width:28px;height:28px;border:none;background:${fondo};color:${co};font-size:16px;font-weight:700;cursor:pointer">−</button>
        <span style="min-width:22px;text-align:center;font-size:12px;font-weight:700;color:${co}">${qty}</span>
        <button onclick="agregarItemCarrito('${item.id}','${negId}')" style="width:28px;height:28px;border:none;background:${co};color:#fff;font-size:16px;font-weight:700;cursor:pointer">+</button>
      </div>`
    : `<button onclick="abrirPedidoModal('${item.id}','${negId}','${type}')"
        style="padding:7px 12px;border-radius:20px;border:none;background:${co};color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit">
        ${catLabel(type,'btn')}
      </button>`;

  // ── Estilos de tarjeta según plantilla ──
  const layout = tpl?.layout || 'card'; // 'card'|'list'|'grid'|'dark'|'magazine'

  if(layout==='grid'){
    // Grid compacto — foto cuadrada arriba, texto abajo
    return `
    <div style="background:var(--surf);border-radius:var(--r);overflow:hidden;border:.5px solid var(--bor)">
      <div style="aspect-ratio:1;background:${fondo};display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;cursor:pointer"
        onclick="if((IMG_STORE['cat_item_'+item.id]||[]).length){catFotoViewer={item,fotos:(IMG_STORE['cat_item_'+item.id]||[]).map(f=>f.dataUrl),idx:0};render();}">
        ${ imgThumbFirst('cat_item_'+item.id)
            ? '<img src="'+imgThumbFirst('cat_item_'+item.id)+'" style="width:100%;height:100%;object-fit:cover">'
            : '<i class="ti '+(type==='servicios'?'ti-tools':type==='menu'?'ti-tools-kitchen-2':'ti-package')+'" style="font-size:32px;color:'+co+';opacity:.4"></i>'
        }
        ${item.popular?`<span style="position:absolute;top:5px;left:5px;font-size:8px;font-weight:700;background:${ac};color:#fff;padding:2px 6px;border-radius:8px">★</span>`:''}
        ${(IMG_STORE['cat_item_'+item.id]||[]).length>1?`<span style="position:absolute;bottom:4px;right:4px;background:rgba(0,0,0,.55);color:#fff;font-size:8px;font-weight:700;padding:1px 5px;border-radius:6px">${(IMG_STORE['cat_item_'+item.id]||[]).length}</span>`:''}
      </div>
      <div style="padding:8px">
        <p style="font-size:11px;font-weight:700;color:var(--t1);margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${item.nm}</p>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:5px">
          <p style="font-size:12px;font-weight:800;color:${co}">${item.pr}</p>
          ${btnAdd}
        </div>
      </div>
    </div>`;
  }

  if(layout==='dark'){
    // Oscuro con acento de color
    return `
    <div style="background:${fondo};border-radius:var(--r);overflow:hidden;margin-bottom:6px">
      <div style="display:flex;align-items:center;gap:10px;padding:11px 13px">
        <div style="width:50px;height:50px;border-radius:10px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0">
          ${ imgThumbFirst('cat_item_'+item.id) ? '<img src="'+imgThumbFirst('cat_item_'+item.id)+'" style="width:100%;height:100%;object-fit:cover">' : '<i class="ti '+(type==='servicios'?'ti-tools':type==='menu'?'ti-tools-kitchen-2':'ti-package')+'" style="font-size:22px;color:'+ac+'"></i>' }
        </div>
        <div style="flex:1;min-width:0">
          <p style="font-size:13px;font-weight:700;color:${texto};margin-bottom:2px">${item.nm}</p>
          <p style="font-size:10px;color:${ac};opacity:.8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${item.desc||''}</p>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px">
          <p style="font-size:14px;font-weight:800;color:${ac}">${item.pr}</p>
          ${btnAdd}
        </div>
      </div>
    </div>`;
  }

  if(layout==='magazine'){
    // Estilo magazine — foto grande a la derecha
    return `
    <div style="display:flex;gap:0;background:var(--surf);border-radius:var(--r);overflow:hidden;border:.5px solid var(--bor);margin-bottom:6px">
      <div style="flex:1;padding:12px 13px;display:flex;flex-direction:column;justify-content:space-between">
        <div>
          ${item.popular?`<span style="font-size:8px;font-weight:700;background:${ac}22;color:${co};padding:2px 7px;border-radius:8px">★ Popular</span><br>`:''}
          <p style="font-size:13px;font-weight:700;color:var(--t1);margin:${item.popular?'4px':0} 0 4px">${item.nm}</p>
          <p style="font-size:10px;color:var(--t3);line-height:1.4">${(item.desc||'').substring(0,60)}</p>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px">
          <p style="font-size:15px;font-weight:800;color:${co}">${item.pr}</p>
          ${btnAdd}
        </div>
      </div>
      <div style="width:90px;background:${fondo};display:flex;align-items:center;justify-content:center;flex-shrink:0">
        ${ imgThumbFirst('cat_item_'+item.id) ? '<img src="'+imgThumbFirst('cat_item_'+item.id)+'" style="width:100%;height:100%;object-fit:cover">' : '<i class="ti '+(type==='servicios'?'ti-tools':type==='menu'?'ti-tools-kitchen-2':'ti-package')+'" style="font-size:30px;color:'+co+';opacity:.5"></i>' }
      </div>
    </div>`;
  }

  // ── Default: card estándar ──
  return `
  <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);overflow:hidden;margin-bottom:6px">
    <div style="display:flex;gap:10px;padding:11px 12px">
      <div style="width:68px;height:68px;border-radius:10px;flex-shrink:0;background:${fondo};display:flex;align-items:center;justify-content:center;overflow:hidden">
        ${ imgThumbFirst('cat_item_'+item.id) ? '<img src="'+imgThumbFirst('cat_item_'+item.id)+'" style="width:100%;height:100%;object-fit:cover">' : '<i class="ti '+(type==='servicios'?'ti-tools':type==='menu'?'ti-tools-kitchen-2':'ti-package')+'" style="font-size:26px;color:'+co+';opacity:.5"></i>' }
      </div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:6px;margin-bottom:3px">
          <p style="font-size:13px;font-weight:700;color:var(--t1);line-height:1.3">${item.nm}</p>
          ${item.popular?`<span style="font-size:8px;font-weight:700;background:#FAEEDA;color:#854F0B;padding:2px 6px;border-radius:8px;flex-shrink:0">Popular</span>`:''}
        </div>
        <p style="font-size:11px;color:var(--t3);line-height:1.4;margin-bottom:6px">${(item.desc||'').substring(0,70)}</p>
        <div style="display:flex;align-items:center;justify-content:space-between">
          <p style="font-size:15px;font-weight:800;color:${co}">${item.pr}</p>
          ${btnAdd}
        </div>
      </div>
    </div>
  </div>`;
}
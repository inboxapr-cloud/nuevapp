/**
 * Catálogo (panel negocio) — items, categorías, fotos
 */
import { render } from '../core/renderer.js';
import { imgPickerHTML, imgThumbFirst, IMG_STORE } from '../utils/images.js';


function renderCatalogo(){
  const cats=[...new Set((catalogItems||[]).map(i=>i.cat))];
  const activos=(catalogItems||[]).filter(i=>i.activo);
  return `
  <div style="padding:12px">
    <!-- Acciones rápidas -->
    <!-- Plantilla activa -->
    ${(()=>{
      const u=(typeof USR_TIPOS!=='undefined')&&USR_TIPOS[activeUsr];
      // For panel negocio, use 'p1' as the current business ID
      const negId=sesionUsuario?.negId||u?.negId||'p1';
      const tplAct=getTplForNeg(negId);
      return `<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:${tplAct?'#E6F1FB':'var(--bg)'};border-radius:var(--rs);border:.5px solid ${tplAct?'var(--b)':'var(--bor)'};margin-bottom:10px;cursor:pointer" onclick="tplPickerNeg='${negId}';tplPickerOpen=true;render()">
        <div style="width:34px;height:34px;border-radius:8px;background:${tplAct?'var(--b)':'var(--bor)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:16px">
          ${tplAct?`<i class="ti ti-palette" style="font-size:16px;color:#fff"></i>`:'🎨'}
        </div>
        <div style="flex:1">
          <p style="font-size:12px;font-weight:700;color:${tplAct?'var(--b)':'var(--t2)'}">
            ${tplAct?'Plantilla: '+tplAct.nm:'Sin plantilla — toca para elegir diseño'}
          </p>
          <p style="font-size:10px;color:var(--t3)">Así verán tu catálogo tus clientes</p>
        </div>
        <i class="ti ti-chevron-right" style="font-size:14px;color:var(--t3)"></i>
      </div>`;
    })()}

    <div style="display:flex;gap:8px;margin-bottom:12px">
      <button onclick="setPnTab('catalogo')" style="flex:1;padding:10px;border-radius:var(--rs);border:none;background:var(--b);color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:5px">
        <i class="ti ti-photo" style="font-size:13px"></i>Vista Catálogo
      </button>
      <button onclick="dibujarCatalogoCanvas();showToast('Generando imagen ✓')" style="flex:1;padding:10px;border-radius:var(--rs);border:none;background:var(--g);color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:5px">
        <i class="ti ti-sparkles" style="font-size:13px"></i>Generar imagen
      </button>
    </div>

    <!-- Resumen -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px">
      ${[['ti-package',activos.length,'Activos','var(--g)','#E1F5EE'],['ti-category',cats.length,'Categorías','var(--b)','#E6F1FB'],['ti-star',activos.filter(i=>i.popular).length,'Populares','#854F0B','#FAEEDA']].map(([ic,n,l,co,bg])=>`
      <div style="background:${bg};border-radius:var(--r);padding:10px;text-align:center">
        <i class="ti ${ic}" style="font-size:20px;color:${co}"></i>
        <p style="font-size:18px;font-weight:700;color:${co};margin:2px 0">${n}</p>
        <p style="font-size:9px;font-weight:600;color:${co};opacity:.8">${l}</p>
      </div>`).join('')}
    </div>

    <!-- Lista de productos por categoría -->
    ${cats.map(cat=>`
    <div style="margin-bottom:14px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <p style="font-size:12px;font-weight:700;color:var(--t1)">${cat}</p>
        <span style="font-size:10px;color:var(--t3)">${(catalogItems||[]).filter(i=>i.cat===cat&&i.activo).length} items</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:5px">
        ${(catalogItems||[]).filter(i=>i.cat===cat).map(item=>{
        const fotoKey = 'cat_item_'+item.id;
        const thumb   = imgThumbFirst(fotoKey);
        const fotoCount = (IMG_STORE[fotoKey]||[]).length;
        return `
        <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);overflow:hidden;margin-bottom:6px">
          <!-- Fila principal -->
          <div style="display:flex;align-items:center;gap:10px;padding:10px 12px">
            <!-- Foto o placeholder (toca para agregar fotos) -->
            <div onclick="catItemFotoOpen='${fotoKey}';render()"
              style="width:52px;height:52px;border-radius:var(--rs);background:var(--bg);display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;cursor:pointer;position:relative;border:.5px solid var(--bor)">
              ${thumb
                ? `<img src="${thumb}" style="width:100%;height:100%;object-fit:cover">`
                : `<div style="display:flex;flex-direction:column;align-items:center;gap:2px">
                    <i class="ti ti-camera-plus" style="font-size:20px;color:var(--t3)"></i>
                    <span style="font-size:8px;color:var(--t3);font-weight:600">Foto</span>
                   </div>`}
              ${fotoCount>1?`<span style="position:absolute;bottom:2px;right:2px;background:rgba(0,0,0,.6);color:#fff;font-size:8px;font-weight:700;padding:1px 4px;border-radius:6px">${fotoCount}</span>`:''}
            </div>
            <!-- Info -->
            <div style="flex:1;min-width:0">
              <p style="font-size:13px;font-weight:600;color:var(--t1)">${item.nm}</p>
              <p style="font-size:10px;color:var(--t3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${item.desc||''}</p>
              <p style="font-size:12px;font-weight:700;color:var(--b);margin-top:2px">${item.pr}</p>
            </div>
            <!-- Toggle + badge popular -->
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex-shrink:0">
              ${item.popular?'<span style="font-size:8px;font-weight:700;background:#FAEEDA;color:#854F0B;padding:1px 6px;border-radius:8px">Popular</span>':''}
              <div onclick="item.activo=!item.activo;render()" style="cursor:pointer">
                <div style="width:32px;height:17px;border-radius:9px;background:${item.activo?'var(--g)':'#ccc'};position:relative;transition:background .2s">
                  <div style="width:13px;height:13px;background:#fff;border-radius:50%;position:absolute;top:2px;${item.activo?'right:2px':'left:2px'};box-shadow:0 1px 3px rgba(0,0,0,.2)"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- Picker de fotos (se abre al tocar la foto) -->
          ${catItemFotoOpen===fotoKey?`
          <div style="padding:0 12px 12px;border-top:.5px solid var(--bor)">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0 6px">
              <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em">
                Fotos · ${item.nm}
              </p>
              <button onclick="catItemFotoOpen=null;render()" style="background:none;border:none;cursor:pointer;color:var(--t3);font-size:10px;font-weight:600;font-family:inherit">Cerrar</button>
            </div>
            ${imgPickerHTML(fotoKey, 5, 'Agregar fotos de este producto')}
          </div>`:'' }
        </div>`;
      }).join('')}
      </div>
    </div>`).join('')}

    <!-- Botón agregar -->
    <button onclick="showToast('Editor de productos próximamente')" style="width:100%;padding:12px;border-radius:var(--rs);border:2px dashed var(--bor);background:var(--bg);color:var(--t3);font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px">
      <i class="ti ti-plus" style="font-size:14px"></i>Agregar producto
    </button>
  </div>`;
}

function renderCatCategorias(){
  initCatTaxonomia(); const tax = catTaxonomia || {};
  const n1Keys = Object.keys(tax);
  const selN1  = catN1 && tax[catN1] ? catN1 : null;
  const selN2  = selN1 && catN2 && tax[selN1].subs[catN2] ? catN2 : null;

  // Items del catálogo agrupados para mostrar conteo real
  const itemsPorCat = {};
  (catalogItems||[]).forEach(i=>{
    itemsPorCat[i.cat] = (itemsPorCat[i.cat]||0)+1;
  });

  return `
  <div style="min-height:300px">

    <!-- ── HEADER ──────────────────────────────── -->
    <div style="padding:12px;border-bottom:.5px solid var(--bor);display:flex;align-items:center;justify-content:space-between">
      <div>
        <p style="font-size:13px;font-weight:700;color:var(--t1)">Categorías del catálogo</p>
        <p style="font-size:10px;color:var(--t3)">Organizá tus productos en hasta 3 niveles</p>
      </div>
      <button onclick="catEditMode=!catEditMode;render()"
        style="font-size:11px;font-weight:700;padding:6px 12px;border-radius:var(--rs);border:none;background:${catEditMode?'var(--b)':'var(--bg)'};color:${catEditMode?'#fff':'var(--t2)'};cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:5px">
        <i class="ti ${catEditMode?'ti-check':'ti-pencil'}" style="font-size:12px"></i>
        ${catEditMode?'Listo':'Editar'}
      </button>
    </div>

    <!-- ── BREADCRUMB ──────────────────────────── -->
    ${selN1?`
    <div style="padding:8px 12px;background:var(--bg);display:flex;align-items:center;gap:5px;overflow-x:auto;scrollbar-width:none;border-bottom:.5px solid var(--bor)">
      <span onclick="catN1=null;catN2=null;catN3=null;render()"
        style="font-size:11px;font-weight:600;color:var(--b);cursor:pointer;white-space:nowrap">Todas</span>
      <i class="ti ti-chevron-right" style="font-size:10px;color:var(--t3)"></i>
      <span onclick="catN2=null;catN3=null;render()"
        style="font-size:11px;font-weight:${selN2?600:700};color:${selN2?'var(--b)':'var(--t1)'};cursor:${selN2?'pointer':'default'};white-space:nowrap">
        ${tax[selN1].ic} ${selN1}
      </span>
      ${selN2?`
      <i class="ti ti-chevron-right" style="font-size:10px;color:var(--t3)"></i>
      <span style="font-size:11px;font-weight:700;color:var(--t1);white-space:nowrap">
        ${tax[selN1].subs[selN2].ic} ${selN2}
      </span>`:''}
    </div>`:''}

    <!-- ── NIVEL 1 — módulos del catálogo ──────── -->
    ${!selN1?`
    <div style="padding:12px">
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">
        Nivel 1 · Módulo principal
      </p>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${n1Keys.map(n1=>{
          const n2Keys = Object.keys(tax[n1].subs||{});
          const totalItems = n2Keys.reduce((s,n2)=>s+(itemsPorCat[n2]||0),0);
          return `
          <div onclick="catN1='${n1}';catN2=null;catN3=null;render()"
            style="display:flex;align-items:center;gap:12px;padding:13px 14px;background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);cursor:pointer">
            <!-- Icono -->
            <div style="width:44px;height:44px;border-radius:var(--rs);background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">
              ${tax[n1].ic}
            </div>
            <!-- Info -->
            <div style="flex:1;min-width:0">
              <p style="font-size:14px;font-weight:700;color:var(--t1)">${n1}</p>
              <p style="font-size:11px;color:var(--t3);margin-top:1px">
                ${n2Keys.length} subcategorías · ${totalItems} productos
              </p>
              <!-- Subcategorías preview -->
              <div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:5px">
                ${n2Keys.slice(0,4).map(n2=>`
                <span style="font-size:9px;font-weight:600;padding:2px 7px;border-radius:10px;background:var(--bg);color:var(--t3);border:.5px solid var(--bor)">
                  ${tax[n1].subs[n2].ic} ${n2}
                </span>`).join('')}
                ${n2Keys.length>4?`<span style="font-size:9px;color:var(--t3)">+${n2Keys.length-4}</span>`:''}
              </div>
            </div>
            <i class="ti ti-chevron-right" style="font-size:16px;color:var(--t3);flex-shrink:0"></i>
          </div>`;
        }).join('')}
      </div>

      ${catEditMode?`
      <!-- Agregar Nivel 1 -->
      <button onclick="catAgregarN1()"
        style="width:100%;margin-top:10px;padding:12px;border-radius:var(--rs);border:2px dashed var(--bor);background:var(--bg);color:var(--t3);font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px">
        <i class="ti ti-plus" style="font-size:14px"></i>Agregar módulo principal
      </button>`:''}
    </div>`

    /* ── NIVEL 2 — subcategorías del N1 ─────────── */
    : !selN2?`
    <div style="padding:12px">
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">
        Nivel 2 · Subcategoría de ${selN1}
      </p>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${Object.keys(tax[selN1].subs).map(n2=>{
          const n3List = tax[selN1].subs[n2].subs||[];
          const itemCnt = itemsPorCat[n2]||0;
          return `
          <div onclick="catN2='${n2}';catN3=null;render()"
            style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);cursor:pointer">
            <div style="width:40px;height:40px;border-radius:var(--rs);background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">
              ${tax[selN1].subs[n2].ic}
            </div>
            <div style="flex:1;min-width:0">
              <div style="display:flex;align-items:center;gap:6px">
                <p style="font-size:13px;font-weight:700;color:var(--t1)">${n2}</p>
                ${itemCnt>0?`<span style="font-size:9px;font-weight:700;background:#E6F1FB;color:var(--b);padding:1px 6px;border-radius:8px">${itemCnt} items</span>`:''}
              </div>
              <p style="font-size:11px;color:var(--t3);margin-top:2px">
                ${n3List.length} tipos · ${n3List.slice(0,3).join(', ')}${n3List.length>3?'...':''}
              </p>
            </div>
            ${catEditMode?`
            <div style="display:flex;gap:4px;flex-shrink:0">
              <button onclick="event.stopPropagation();catEditarN2('${selN1}','${n2}')"
                style="width:28px;height:28px;border-radius:var(--rs);border:none;background:#E6F1FB;color:var(--b);cursor:pointer;display:flex;align-items:center;justify-content:center">
                <i class="ti ti-pencil" style="font-size:12px"></i>
              </button>
              <button onclick="event.stopPropagation();catEliminarN2('${selN1}','${n2}')"
                style="width:28px;height:28px;border-radius:var(--rs);border:none;background:#FDECEA;color:#E24B4A;cursor:pointer;display:flex;align-items:center;justify-content:center">
                <i class="ti ti-trash" style="font-size:12px"></i>
              </button>
            </div>`:`
            <i class="ti ti-chevron-right" style="font-size:16px;color:var(--t3);flex-shrink:0"></i>`}
          </div>`;
        }).join('')}
      </div>

      ${catEditMode?`
      <button onclick="catAgregarN2('${selN1}')"
        style="width:100%;margin-top:10px;padding:12px;border-radius:var(--rs);border:2px dashed var(--bor);background:var(--bg);color:var(--t3);font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px">
        <i class="ti ti-plus" style="font-size:14px"></i>Agregar subcategoría en ${selN1}
      </button>`:''}
    </div>`

    /* ── NIVEL 3 — tipos del N2 ───────────────── */
    :`
    <div style="padding:12px">
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">
        Nivel 3 · Tipos de ${selN2}
      </p>

      <!-- Items del catálogo en esta sub -->
      ${(catalogItems||[]).filter(i=>i.cat===selN2).length>0?`
      <div style="background:#E6F1FB;border-radius:var(--rs);padding:9px 12px;margin-bottom:10px;display:flex;align-items:center;gap:7px">
        <i class="ti ti-package" style="font-size:14px;color:var(--b)"></i>
        <p style="font-size:11px;font-weight:600;color:var(--b)">
          ${(catalogItems||[]).filter(i=>i.cat===selN2).length} producto${(catalogItems||[]).filter(i=>i.cat===selN2).length!==1?'s':''} en esta categoría
        </p>
      </div>`:''}

      <!-- Lista de Nivel 3 -->
      <div style="display:flex;flex-direction:column;gap:5px">
        ${(tax[selN1]?.subs[selN2]?.subs||[]).map((n3,idx)=>{
          const items=(catalogItems||[]).filter(i=>i.subcat===n3||i.tipo===n3);
          return `
          <div style="display:flex;align-items:center;gap:10px;padding:11px 13px;background:var(--surf);border:.5px solid var(--bor);border-radius:var(--rs)">
            <div style="width:6px;height:6px;border-radius:50%;background:var(--b);flex-shrink:0"></div>
            <p style="flex:1;font-size:13px;font-weight:600;color:var(--t1)">${n3}</p>
            ${items.length>0?`<span style="font-size:10px;color:var(--t3)">${items.length} items</span>`:''}
            ${catEditMode?`
            <div style="display:flex;gap:4px">
              <button onclick="catEditarN3('${selN1}','${selN2}',${idx})"
                style="width:26px;height:26px;border-radius:var(--rs);border:none;background:#E6F1FB;color:var(--b);cursor:pointer;display:flex;align-items:center;justify-content:center">
                <i class="ti ti-pencil" style="font-size:11px"></i>
              </button>
              <button onclick="catEliminarN3('${selN1}','${selN2}',${idx})"
                style="width:26px;height:26px;border-radius:var(--rs);border:none;background:#FDECEA;color:#E24B4A;cursor:pointer;display:flex;align-items:center;justify-content:center">
                <i class="ti ti-trash" style="font-size:11px"></i>
              </button>
            </div>`:''}
          </div>`;
        }).join('')}
      </div>

      ${catEditMode?`
      <button onclick="catAgregarN3('${selN1}','${selN2}')"
        style="width:100%;margin-top:10px;padding:11px;border-radius:var(--rs);border:2px dashed var(--bor);background:var(--bg);color:var(--t3);font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px">
        <i class="ti ti-plus" style="font-size:14px"></i>Agregar tipo en ${selN2}
      </button>

      <!-- Productos de este nivel -->
      ${(catalogItems||[]).filter(i=>i.cat===selN2).length>0?`
      <div style="margin-top:14px">
        <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:7px">Productos en ${selN2}</p>
        <div style="display:flex;flex-direction:column;gap:5px">
          ${(catalogItems||[]).filter(i=>i.cat===selN2).map(item=>`
          <div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:var(--surf);border:.5px solid var(--bor);border-radius:var(--rs)">
            <p style="flex:1;font-size:12px;font-weight:600;color:var(--t1)">${item.nm}</p>
            <p style="font-size:12px;font-weight:700;color:var(--b)">${item.pr}</p>
            <div style="width:28px;height:15px;border-radius:8px;background:${item.activo?'var(--g)':'#ccc'};position:relative;cursor:pointer" onclick="item.activo=!item.activo;render()">
              <div style="width:11px;height:11px;background:#fff;border-radius:50%;position:absolute;top:2px;${item.activo?'right:2px':'left:2px'}"></div>
            </div>
          </div>`).join('')}
        </div>
      </div>`:''}
      `:''}
    </div>`}

  </div>`;
}

function renderCatFotoViewer(){
  if(!catFotoViewer) return '';
  const {item, fotos, idx} = catFotoViewer;
  if(!fotos||!fotos.length) return '';
  const src = fotos[idx];
  return `
  <div onclick="if(event.target===this){catFotoViewer=null;render()}"
    style="position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:900;display:flex;flex-direction:column;align-items:center;justify-content:center">

    <!-- Header -->
    <div style="position:absolute;top:0;left:0;right:0;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(rgba(0,0,0,.5),transparent)">
      <p style="font-size:13px;font-weight:600;color:#fff">${item.nm}</p>
      <button onclick="catFotoViewer=null;render()"
        style="width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.15);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center">
        <i class="ti ti-x" style="font-size:16px;color:#fff"></i>
      </button>
    </div>

    <!-- Foto principal -->
    <img src="${src}" style="max-width:100%;max-height:75vh;object-fit:contain;border-radius:8px"
      onclick="event.stopPropagation()">

    <!-- Navegación anterior/siguiente -->
    ${fotos.length>1?`
    <div style="display:flex;align-items:center;gap:16px;margin-top:16px">
      <button onclick="event.stopPropagation();catFotoViewer.idx=Math.max(0,idx-1);render()"
        style="width:38px;height:38px;border-radius:50%;background:${idx>0?'rgba(255,255,255,.2)':'rgba(255,255,255,.06)'};border:none;cursor:pointer;display:flex;align-items:center;justify-content:center">
        <i class="ti ti-chevron-left" style="font-size:18px;color:${idx>0?'#fff':'rgba(255,255,255,.25)'}"></i>
      </button>
      <!-- Puntos indicadores -->
      <div style="display:flex;gap:6px">
        ${fotos.map((_,i)=>`<div onclick="event.stopPropagation();catFotoViewer.idx=${i};render()"
          style="width:${i===idx?20:7}px;height:7px;border-radius:4px;background:${i===idx?'#fff':'rgba(255,255,255,.35)'};cursor:pointer;transition:all .2s"></div>`).join('')}
      </div>
      <button onclick="event.stopPropagation();catFotoViewer.idx=Math.min(fotos.length-1,idx+1);render()"
        style="width:38px;height:38px;border-radius:50%;background:${idx<fotos.length-1?'rgba(255,255,255,.2)':'rgba(255,255,255,.06)'};border:none;cursor:pointer;display:flex;align-items:center;justify-content:center">
        <i class="ti ti-chevron-right" style="font-size:18px;color:${idx<fotos.length-1?'#fff':'rgba(255,255,255,.25)'}"></i>
      </button>
    </div>
    <!-- Miniaturas -->
    <div style="display:flex;gap:6px;margin-top:10px;overflow-x:auto;max-width:90vw;padding:2px">
      ${fotos.map((f,i)=>`<div onclick="event.stopPropagation();catFotoViewer.idx=${i};render()"
        style="width:48px;height:48px;border-radius:7px;overflow:hidden;flex-shrink:0;cursor:pointer;border:2px solid ${i===idx?'#fff':'transparent'};opacity:${i===idx?1:0.6}">
        <img src="${f}" style="width:100%;height:100%;object-fit:cover">
      </div>`).join('')}
    </div>`:''}

    <!-- Info del item -->
    <div style="position:absolute;bottom:0;left:0;right:0;padding:16px;background:linear-gradient(transparent,rgba(0,0,0,.7))">
      <p style="font-size:12px;color:rgba(255,255,255,.7);text-align:center">${item.desc||''}</p>
      <p style="font-size:16px;font-weight:700;color:#fff;text-align:center;margin-top:3px">${item.pr}</p>
    </div>
  </div>`;
}

function catAgregarN1(){
  const nm=prompt('Nombre del módulo principal:');
  if(!nm||!nm.trim()) return;
  const ic=prompt('Emoji (ej: 🍽️):','📦');
  initCatTaxonomia(); if(catTaxonomia){
    CATALOG_TAXONOMY[nm.trim()]={ic:ic||'📦',subs:{}};
    catN1=nm.trim();
    render(); showToast('Módulo "'+nm.trim()+'" creado ✓');
  }
}

function catAgregarN2(n1){
  const nm=prompt('Nombre de la subcategoría en '+n1+':');
  if(!nm||!nm.trim()) return;
  const ic=prompt('Emoji (ej: 🍛):','📋');
  initCatTaxonomia(); if(catTaxonomia&&catTaxonomia[n1]){
    catTaxonomia[n1].subs[nm.trim()]={ic:ic||'📋',subs:[]};
    catN2=nm.trim();
    render(); showToast('Subcategoría "'+nm.trim()+'" creada ✓');
  }
}

function catAgregarN3(n1,n2){
  const nm=prompt('Nombre del tipo en '+n2+':');
  if(!nm||!nm.trim()) return;
  if(typeof CATALOG_TAXONOMY!=='undefined'&&CATALOG_TAXONOMY[n1]?.subs[n2]){
    catTaxonomia[n1].subs[n2].subs.push(nm.trim());
    render(); showToast('Tipo "'+nm.trim()+'" agregado ✓');
  }
}

function catEditarN2(n1,n2){
  const nuevo=prompt('Nuevo nombre para "'+n2+'":',n2);
  if(!nuevo||!nuevo.trim()||nuevo===n2) return;
  initCatTaxonomia(); if(catTaxonomia&&catTaxonomia[n1]){
    const data=catTaxonomia?.[n1]?.subs[n2];
    delete catTaxonomia?.[n1]?.subs[n2];
    catTaxonomia[n1].subs[nuevo.trim()]=data;
    // Update catalogItems cat references
    (catalogItems||[]).forEach(i=>{ if(i.cat===n2) i.cat=nuevo.trim(); });
    catN2=nuevo.trim();
    render(); showToast('Categoría renombrada ✓');
  }
}

function catEliminarN2(n1,n2){
  if(!confirm('¿Eliminar "'+n2+'" y sus tipos? Los productos quedarán sin categoría.')) return;
  initCatTaxonomia(); if(catTaxonomia&&catTaxonomia[n1]){
    delete catTaxonomia?.[n1]?.subs[n2];
    catN2=null;
    render(); showToast('Categoría eliminada');
  }
}

function catEditarN3(n1,n2,idx){
  const subs=catTaxonomia?.[n1]?.subs[n2]?.subs||[];
  const nuevo=prompt('Nuevo nombre:',subs[idx]);
  if(!nuevo||!nuevo.trim()) return;
  subs[idx]=nuevo.trim();
  render(); showToast('Tipo actualizado ✓');
}

function catEliminarN3(n1,n2,idx){
  if(!confirm('¿Eliminar este tipo?')) return;
  catTaxonomia?.[n1]?.subs[n2]?.subs.splice(idx,1);
  render(); showToast('Tipo eliminado');
}

function initCatTaxonomia(){
  if(catTaxonomia) return;
  // Copia profunda de la taxonomía del sistema como punto de partida
  catTaxonomia = JSON.parse(JSON.stringify(
    typeof CATALOG_TAXONOMY !== 'undefined' ? CATALOG_TAXONOMY : {}
  ));
}

/**
 * orders — MiCantón.cr
 * Extraído del monolito micanton_v2.html
 * En v3: conectar a Firebase donde aplique
 */
// Nota: estas funciones usan variables globales de window.*
// Al migrar a Firebase, reemplazar con imports de ../state.js

function abrirPedidoModal(itemOrId, negId, type){
  // itemOrId puede ser el objeto item o solo el id
  let item = typeof itemOrId==='object' ? itemOrId : null;
  if(!item){
    const {items} = getItemsDeNegocio(negId);
    item = (items||[]).find(i=>String(i.id)===String(itemOrId));
  }
  if(!item) return;
  pedidoModal = item;
  pedidoCantidad = 1;
  pedidoNotas = '';
  render();
  setTimeout(()=>{ const el=document.getElementById('pedidoNotasInput'); if(el) el.focus(); },200);
}

function agregarItemCarrito(itemId, negId){
  const {items, type, neg} = getItemsDeNegocio(negId);
  const item = (items||[]).find(i=>String(i.id)===String(itemId));
  if(!item) return;
  const idx = (carrito||[]).findIndex(c=>c.id===item.id&&String(c.negId)===String(negId));
  if(idx>=0) carrito[idx].qty = (carrito[idx].qty||1)+1;
  else (carrito=carrito||[]).push({...item, negId, qty:1, negNm:neg?.nm||'', type});
  render();
  showToast(item.nm+' agregado ✓');
}

function quitarItemCarrito(itemId, negId){
  const idx = (carrito||[]).findIndex(c=>String(c.id)===String(itemId)&&String(c.negId)===String(negId));
  if(idx>=0){
    if(carrito[idx].qty>1) carrito[idx].qty--;
    else carrito.splice(idx,1);
    render();
  }
}

function confirmarItemPedido(item, negId, type, negNm){
  const qty = window.pedidoCantidad||1;
  const notas = pedidoNotas||'';
  // Agregar al carrito
  const idx=(carrito||[]).findIndex(c=>c.id===item.id&&String(c.negId)===String(negId));
  if(idx>=0) carrito[idx].qty=(carrito[idx].qty||0)+qty;
  else (carrito=carrito||[]).push({...item, negId, qty, negNm, type, notas});
  // Cerrar modal
  pedidoModal=null; pedidoCantidad=1; pedidoNotas='';
  render();
  showToast(`${catLabel(type,'orden')} agregado al carrito ✓`);
}

function renderPedidoModal(item, negId, type, neg){
  const co  = neg?.co||'#185FA5';
  const bg  = neg?.bg||'#E6F1FB';
  const lbl = catLabel(type,'orden');

  return `
  <div onclick="if(event.target===this){pedidoModal=null;render()}"
    style="position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:500;display:flex;align-items:flex-end;justify-content:center">
    <div onclick="event.stopPropagation()"
      style="background:var(--bg);border-radius:16px 16px 0 0;width:100%;max-width:480px;padding:16px 16px 28px">

      <!-- Handle -->
      <div style="width:40px;height:4px;border-radius:2px;background:var(--bor);margin:0 auto 14px"></div>

      <!-- Item seleccionado con foto real -->
      <div style="display:flex;gap:12px;padding:12px;background:var(--surf);border-radius:var(--r);margin-bottom:14px;border:.5px solid var(--bor)">
        <div style="width:64px;height:64px;border-radius:10px;background:${bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden">
          ${ imgThumbFirst('cat_item_'+item.id)
              ? '<img src="'+imgThumbFirst('cat_item_'+item.id)+'" style="width:100%;height:100%;object-fit:cover">'
              : '<i class="ti '+(type==='servicios'?'ti-tools':type==='menu'?'ti-tools-kitchen-2':'ti-package')+'" style="font-size:26px;color:'+co+'"></i>'
          }
        </div>
        <div style="flex:1">
          <p style="font-size:14px;font-weight:700;color:var(--t1)">${item.nm}</p>
          <p style="font-size:11px;color:var(--t3);margin-top:2px">${item.desc||''}</p>
          <p style="font-size:16px;font-weight:800;color:${co};margin-top:4px">${item.pr}</p>
        </div>
      </div>

      <!-- Cantidad -->
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">Cantidad</p>
      <div style="display:flex;align-items:center;gap:0;border:1.5px solid ${co};border-radius:20px;overflow:hidden;width:fit-content;margin-bottom:14px">
        <button onclick="pedidoCantidad=Math.max(1,(pedidoCantidad||1)-1);render()"
          style="width:36px;height:36px;border:none;background:${bg};color:${co};font-size:18px;font-weight:700;cursor:pointer">−</button>
        <span style="min-width:40px;text-align:center;font-size:15px;font-weight:700;color:${co}">${window.pedidoCantidad||1}</span>
        <button onclick="pedidoCantidad=(pedidoCantidad||1)+1;render()"
          style="width:36px;height:36px;border:none;background:${co};color:#fff;font-size:18px;font-weight:700;cursor:pointer">+</button>
      </div>

      <!-- Notas -->
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">
        ${type==='servicios'?'Descripción del trabajo':'Notas del pedido'} <span style="font-weight:400">(opcional)</span>
      </p>
      <textarea id="pedidoNotasInput" rows="3" placeholder="${type==='servicios'?'Ej: Necesito cambiar 3 tomas corrientes en cocina...':'Ej: Sin cebolla, para llevar, alérgico a mariscos...'}"
        oninput="pedidoNotas=this.value"
        style="width:100%;padding:10px 12px;border:.5px solid var(--bor);border-radius:var(--rs);font-size:12px;font-family:inherit;color:var(--t1);background:var(--surf);resize:none;outline:none;box-sizing:border-box;margin-bottom:14px">${pedidoNotas||''}</textarea>

      <!-- Total -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:${bg};border-radius:var(--rs);margin-bottom:14px">
        <p style="font-size:12px;font-weight:600;color:${co}">Total · ${window.pedidoCantidad||1} ${(window.pedidoCantidad||1)===1?catLabel(type,'item').toLowerCase():(catLabel(type,'item').toLowerCase()+'s')}</p>
        <p style="font-size:16px;font-weight:800;color:${co}">₡${((item.prNum||0)*(window.pedidoCantidad||1)).toLocaleString('es-CR')}</p>
      </div>

      <!-- Botones -->
      <div style="display:flex;gap:8px">
        <button onclick="pedidoModal=null;pedidoCantidad=1;pedidoNotas='';render()"
          style="flex:1;padding:13px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--surf);color:var(--t2);font-size:13px;font-weight:600;cursor:pointer;font-family:inherit">
          Cancelar
        </button>
        <button onclick="confirmarItemPedido(${JSON.stringify(item).replace(/"/g,'&quot;')?.substring?.(0,200)||"'"+item.id+"'"},'${negId}','${type}','${neg?.nm||''}')"
          style="flex:2;padding:13px;border-radius:var(--rs);border:none;background:${co};color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px">
          <i class="ti ti-check" style="font-size:15px"></i>Confirmar ${lbl}
        </button>
      </div>

      <!-- WhatsApp directo -->
      ${neg?.wa?`
      <button onclick="abrirWhatsApp('${neg.wa}','Hola! Quiero hacer un pedido de: ${item.nm} x${window.pedidoCantidad||1}. ${pedidoNotas?'Nota: '+pedidoNotas:''}')"
        style="width:100%;margin-top:10px;padding:11px;border-radius:var(--rs);border:none;background:#25D366;color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px">
        <i class="ti ti-brand-whatsapp" style="font-size:15px"></i>Pedir por WhatsApp
      </button>`:''}
    </div>
  </div>`;
}

function _renderCarritoItemBtn(item, negId, type, neg){
  const enCarrito = (carrito||[]).find(c=>c.id===item.id&&String(c.negId)===String(negId));
  const qty = enCarrito?.qty||0;
  const co = neg?.co||'#185FA5';
  const bg = neg?.bg||'#E6F1FB';
  const label = catLabel(type,'btn');

  if(qty>0){
    return `<div style="display:flex;align-items:center;gap:0;border:1.5px solid ${co};border-radius:20px;overflow:hidden">
      <button onclick="quitarItemCarrito('${item.id}','${negId}')"
        style="width:30px;height:30px;border:none;background:${bg};color:${co};font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center">−</button>
      <span style="min-width:24px;text-align:center;font-size:13px;font-weight:700;color:${co};padding:0 2px">${qty}</span>
      <button onclick="agregarItemCarrito('${item.id}','${negId}')"
        style="width:30px;height:30px;border:none;background:${co};color:#fff;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center">+</button>
    </div>`;
  }

  return `<button onclick="abrirPedidoModal(${JSON.stringify(item).replace(/"/g,'&quot;')?.substring?.(0,200)||item.id},'${negId}','${type}')"
    style="padding:7px 14px;border-radius:20px;border:none;background:${co};color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:4px">
    <i class="ti ti-plus" style="font-size:12px"></i>${label}
  </button>`;
}

function renderMisPedidos(){
  const pedidos = misPedidos||[];
  return `
  <div style="padding:12px">
    ${pedidos.length===0?`
    <div style="padding:40px 20px;text-align:center">
      <i class="ti ti-shopping-bag" style="font-size:40px;color:var(--bor);display:block;margin-bottom:10px"></i>
      <p style="font-size:14px;font-weight:600;color:var(--t2)">Sin pedidos todavía</p>
      <p style="font-size:12px;color:var(--t3);margin-top:4px;margin-bottom:14px">Tus pedidos aparecerán aquí</p>
      <button onclick="goMod('negocios')" style="background:var(--b);color:#fff;border:none;border-radius:var(--rs);padding:10px 20px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">
        Ver directorio
      </button>
    </div>`:`
    <div style="display:flex;flex-direction:column;gap:8px">
      ${pedidos.map(p=>{
        const colores={pendiente:'#EF9F27',preparando:'#EF9F27',listo:'#1D9E75',entregado:'#185FA5',cancelado:'#888'};
        const co=colores[p.st]||'#888';
        return `<div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);overflow:hidden">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:11px 13px;border-bottom:.5px solid var(--bor)">
            <div>
              <p style="font-size:13px;font-weight:700;color:var(--t1)">${p.negocio||'Negocio'}</p>
              <p style="font-size:10px;color:var(--t3)">${p.fecha||'Hoy'} · ${(p.items||[]).length} item${(p.items||[]).length!==1?'s':''}</p>
            </div>
            <div style="text-align:right">
              <span style="font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;background:${co}20;color:${co}">${p.st||'pendiente'}</span>
              <p style="font-size:13px;font-weight:700;color:var(--b);margin-top:3px">${p.total||'₡0'}</p>
            </div>
          </div>
          <div style="padding:8px 12px">
            ${(p.items||[]).slice(0,3).map(i=>`<p style="font-size:11px;color:var(--t3);margin-bottom:2px">· ${i.nm||''} ×${i.qty||1} — ${i.pr||''}</p>`).join('')}
            ${(p.items||[]).length>3?`<p style="font-size:10px;color:var(--t3)">+${(p.items||[]).length-3} más...</p>`:''}
          </div>
          ${p.st!=='entregado'&&p.st!=='cancelado'?`
          <div style="padding:6px 12px;border-top:.5px solid var(--bor);background:var(--bg)">
            <div style="display:flex;align-items:center;gap:6px">
              <div style="flex:1;height:4px;border-radius:2px;background:var(--bor);overflow:hidden">
                <div style="height:100%;background:${co};width:${p.st==='pendiente'?'25':p.st==='preparando'?'60':p.st==='listo'?'85':'100'}%"></div>
              </div>
              <p style="font-size:10px;font-weight:600;color:${co}">${p.st}</p>
            </div>
          </div>`:''}
        </div>`;
      }).join('')}
    </div>`}
  </div>`;
}

function renderPedidosRecibidos(){
  const pedidos = pedidosRecibidos||[];
  const filtros=['todos','nuevo','preparando','listo','entregado','cancelado'];
  const filtroActivo=window._pedFiltro||'todos';
  const lista=filtroActivo==='todos'?pedidos:pedidos.filter(p=>p.st===filtroActivo);
  const contNuevo=pedidos.filter(p=>p.st==='nuevo').length;

  return `
  <div>
    <!-- Filtros de estado -->
    <div style="display:flex;gap:5px;overflow-x:auto;scrollbar-width:none;padding:10px 12px;border-bottom:.5px solid var(--bor)">
      ${filtros.map(f=>`<span onclick="window._pedFiltro='${f}';render()" style="font-size:11px;font-weight:600;padding:5px 12px;border-radius:20px;cursor:pointer;white-space:nowrap;background:${filtroActivo===f?'var(--b)':'var(--bg)'};color:${filtroActivo===f?'#fff':'var(--t3)'};border:.5px solid ${filtroActivo===f?'var(--b)':'var(--bor)'}">${f==='todos'?'Todos':f==='nuevo'?'🔴 Nuevos'+(contNuevo>0?' ('+contNuevo+')':''):f==='preparando'?'🟡 Preparando':f==='listo'?'🟢 Listo':f==='entregado'?'✓ Entregado':'❌ Cancelado'}</span>`).join('')}
    </div>

    <div style="padding:12px">
    ${lista.length===0?`
    <div style="padding:40px 20px;text-align:center">
      <i class="ti ti-inbox" style="font-size:40px;color:var(--bor);display:block;margin-bottom:10px"></i>
      <p style="font-size:14px;font-weight:600;color:var(--t2)">Sin pedidos ${filtroActivo!=='todos'?'"'+filtroActivo+'"':''}</p>
      <p style="font-size:12px;color:var(--t3);margin-top:4px">Cuando lleguen pedidos aparecerán aquí</p>
    </div>`:`
    <div style="display:flex;flex-direction:column;gap:8px">
      ${lista.map(p=>{
        const colores={nuevo:'#E24B4A',preparando:'#EF9F27',listo:'#1D9E75',entregado:'#185FA5',cancelado:'#888'};
        const co=colores[p.st]||'#888';
        return `<div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);overflow:hidden">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-bottom:.5px solid var(--bor)">
            <div>
              <p style="font-size:13px;font-weight:700;color:var(--t1)">Pedido #${p.id||'001'}</p>
              <p style="font-size:10px;color:var(--t3)">${p.fecha||'Hoy'} · ${(p.items||[]).length} item${(p.items||[]).length!==1?'s':''}</p>
            </div>
            <div style="text-align:right">
              <span style="font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;background:${co}20;color:${co}">${p.st||'nuevo'}</span>
              <p style="font-size:13px;font-weight:700;color:var(--b);margin-top:3px">${p.total||'₡0'}</p>
            </div>
          </div>
          <!-- Items del pedido -->
          <div style="padding:8px 12px">
            ${(p.items||[]).map(i=>`<p style="font-size:11px;color:var(--t3);margin-bottom:2px">· ${i.nm||''} ×${i.qty||1} — ${i.pr||''}</p>`).join('')}
          </div>
          <!-- Acciones de estado -->
          <div style="display:flex;border-top:.5px solid var(--bor)">
            ${p.st==='nuevo'?`<button onclick="cambiarEstadoPedido('${p.id}','preparando')" style="flex:1;padding:8px;font-size:11px;font-weight:700;color:#EF9F27;background:transparent;border:none;cursor:pointer;font-family:inherit">🟡 Preparando</button>`:
              p.st==='preparando'?`<button onclick="cambiarEstadoPedido('${p.id}','listo')" style="flex:1;padding:8px;font-size:11px;font-weight:700;color:var(--g);background:transparent;border:none;cursor:pointer;font-family:inherit">🟢 Listo</button>`:
              p.st==='listo'?`<button onclick="cambiarEstadoPedido('${p.id}','entregado')" style="flex:1;padding:8px;font-size:11px;font-weight:700;color:var(--b);background:transparent;border:none;cursor:pointer;font-family:inherit">✓ Entregado</button>`:
              `<span style="flex:1;padding:8px;font-size:11px;color:var(--t3);text-align:center">${p.st}</span>`}
            <div style="width:.5px;background:var(--bor)"></div>
            <button onclick="p&&abrirWhatsApp&&abrirWhatsApp('${p.tel||''}','Hola! Tu pedido #${p.id} está ${p.st}')" style="flex:1;padding:8px;font-size:11px;font-weight:700;color:#25D366;background:transparent;border:none;cursor:pointer;font-family:inherit">
              <i class="ti ti-brand-whatsapp" style="font-size:13px"></i> Cliente
            </button>
          </div>
        </div>`;
      }).join('')}
    </div>`}
    </div>
  </div>`;
}

function cambiarEstadoPedido(id,st){
  const p=pedidosRecibidos.find(x=>x.id===id);
  if(p){ p.st=st; render(); showToast('Estado actualizado ✓'); }
}

function renderCarrito(){
  if(!carritoOpen) return '';
  if(carritoCheckout) return renderCarritoCheckout();

  // Agrupar por proveedor
  const provs = {};
  carrito.forEach(i=>{ if(!provs[i.provId]) provs[i.provId]={nm:i.provNm,av:i.provAv,bg:i.provBg,co:i.provCo,items:[]}; provs[i.provId].items.push(i); });
  const provList = Object.entries(provs);
  const total = carritoTotal();

  return `<div style="position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:600;display:flex;align-items:flex-end" onclick="carritoOpen=false;render()">
  <div style="background:var(--surf);border-radius:20px 20px 0 0;width:100%;max-width:480px;margin:0 auto;max-height:85dvh;display:flex;flex-direction:column" onclick="event.stopPropagation()">
    <div style="padding:14px 16px;border-bottom:.5px solid var(--bor);display:flex;align-items:center;justify-content:space-between;flex-shrink:0">
      <div>
        <p style="font-size:16px;font-weight:700;color:var(--t1)">Mi carrito</p>
        <p style="font-size:11px;color:var(--t3)">${carritoCount()} item${carritoCount()!==1?'s':''} · ${provList.length} proveedor${provList.length!==1?'es':''}</p>
      </div>
      <button style="width:30px;height:30px;border-radius:50%;border:.5px solid var(--bor);background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center" onclick="carritoOpen=false;render()"><i class="ti ti-x" style="font-size:15px;color:var(--t1)"></i></button>
    </div>

    <div style="overflow-y:auto;flex:1;padding:12px 16px">
    ${carrito.length===0?`<div style="padding:40px;text-align:center"><i class="ti ti-shopping-cart" style="font-size:40px;color:var(--bor);display:block;margin-bottom:10px"></i><p style="font-size:13px;color:var(--t3)">Tu carrito está vacío</p></div>`:''}
    ${provList.map(([pid,prov])=>`
      <div style="margin-bottom:14px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <div style="width:28px;height:28px;border-radius:7px;background:${prov.bg};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:${prov.co};flex-shrink:0">${prov.av}</div>
          <p style="font-size:12px;font-weight:700;color:var(--t1)">${prov.nm}</p>
          <span style="font-size:10px;color:var(--t3);margin-left:auto">Subtotal: <strong style="color:var(--g)">₡${prov.items.reduce((a,i)=>a+(i.itemPrNum*i.qty),0).toLocaleString()}</strong></span>
        </div>
        ${prov.items.map(item=>`<div style="display:flex;align-items:center;gap:10px;padding:9px 11px;background:var(--bg);border-radius:var(--rs);border:.5px solid var(--bor);margin-bottom:6px">
          <div style="flex:1;min-width:0"><p style="font-size:12px;font-weight:600;color:var(--t1);margin-bottom:2px">${item.itemNm}</p><p style="font-size:12px;font-weight:700;color:var(--g)">${item.itemPr}</p></div>
          <div style="display:flex;align-items:center;gap:7px;flex-shrink:0">
            <button style="width:26px;height:26px;border-radius:50%;border:.5px solid var(--bor);background:var(--surf);cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center" onclick="updateCarritoQty('${pid}','${item.itemId}',-1)">−</button>
            <span style="font-size:13px;font-weight:700;color:var(--t1);min-width:16px;text-align:center">${item.qty}</span>
            <button style="width:26px;height:26px;border-radius:50%;border:none;background:var(--g);color:#fff;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center" onclick="updateCarritoQty('${pid}','${item.itemId}',1)">+</button>
          </div>
        </div>`).join('')}
      </div>`).join('')}
    </div>

    ${carrito.length>0?`<div style="padding:14px 16px;border-top:.5px solid var(--bor);flex-shrink:0">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <p style="font-size:14px;font-weight:700;color:var(--t1)">Total general</p>
        <p style="font-size:20px;font-weight:700;color:var(--g)">₡${total.toLocaleString()}</p>
      </div>
      <div style="background:#E6F1FB;border:.5px solid #85B7EB;border-radius:var(--rs);padding:8px 12px;display:flex;gap:7px;font-size:11px;color:var(--bd);margin-bottom:10px">
        <i class="ti ti-info-circle" style="font-size:13px;flex-shrink:0;margin-top:1px"></i>
        El pago se coordina directamente con cada proveedor. Podés pagar en efectivo o SINPE al recibirlo.
      </div>
      <button style="width:100%;background:var(--g);color:#fff;border:none;border-radius:var(--rs);padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:7px" onclick="carritoCheckout=true;render()">
        <i class="ti ti-arrow-right" style="font-size:15px"></i>Revisar y confirmar pedido
      </button>
    </div>`:''}
  </div>
  </div>`;
}

function renderCarritoBtn(){
  const cnt = carritoCount();
  return `<button style="position:relative;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.15);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0" onclick="carritoOpen=true;render()">
    <i class="ti ti-shopping-cart" style="font-size:18px;color:#fff"></i>
    <span id="carritoBadge" style="display:${cnt>0?'flex':'none'};position:absolute;top:-2px;right:-2px;width:18px;height:18px;background:#E24B4A;border-radius:50%;font-size:10px;font-weight:700;color:#fff;align-items:center;justify-content:center;border:2px solid var(--hdr-bg,#085041)">${cnt}</span>
  </button>`;
}
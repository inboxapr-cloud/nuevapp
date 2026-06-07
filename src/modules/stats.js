/**
 * stats — MiCantón.cr
 * Extraído del monolito micanton_v2.html
 * En v3: conectar a Firebase donde aplique
 */
// Nota: estas funciones usan variables globales de window.*
// Al migrar a Firebase, reemplazar con imports de ../state.js

function renderStats(){
  const pedidos=pedidosRecibidos||[];
  const entregados=pedidos.filter(p=>p.st==='entregado');
  const ingresos=entregados.reduce((s,p)=>{
    const n=parseFloat((p.total||'0').replace(/[₡.,\s]/g,'').replace(',','.')||0);
    return s+n;
  },0);
  const mesStat=[{mes:'Ene',v:45},{mes:'Feb',v:62},{mes:'Mar',v:58},{mes:'Abr',v:71},{mes:'May',v:83},{mes:'Jun',v:pedidos.length||12}];
  const maxV=Math.max(...mesStat.map(m=>m.v));

  return `
  <div style="padding:12px">
    <!-- KPIs -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px">
      ${[
        ['ti-receipt','Pedidos hoy',pedidos.length,'#185FA5','#E6F1FB'],
        ['ti-currency-dollar','Ingresos','₡'+Math.round(ingresos).toLocaleString('es-CR'),'#085041','#E1F5EE'],
        ['ti-star','Calificación','4.8 ⭐','#854F0B','#FAEEDA'],
        ['ti-eye','Visitas hoy','248','#534AB7','#EEEDFE'],
      ].map(([ic,label,val,co,bg])=>`
      <div style="background:${bg};border-radius:var(--r);padding:12px">
        <i class="ti ${ic}" style="font-size:20px;color:${co}"></i>
        <p style="font-size:18px;font-weight:700;color:${co};margin:4px 0">${val}</p>
        <p style="font-size:10px;font-weight:600;color:${co};opacity:.8">${label}</p>
      </div>`).join('')}
    </div>

    <!-- Gráfico de barras -->
    <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);padding:13px;margin-bottom:12px">
      <p style="font-size:12px;font-weight:700;color:var(--t1);margin-bottom:12px">Pedidos por mes</p>
      <div style="display:flex;align-items:flex-end;gap:6px;height:80px">
        ${mesStat.map(m=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px">
          <p style="font-size:9px;color:var(--t3)">${m.v}</p>
          <div style="width:100%;border-radius:4px 4px 0 0;background:var(--b);height:${Math.round(m.v/maxV*60)}px"></div>
          <p style="font-size:9px;color:var(--t3)">${m.mes}</p>
        </div>`).join('')}
      </div>
    </div>

    <!-- Productos más vendidos -->
    <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);padding:13px">
      <p style="font-size:12px;font-weight:700;color:var(--t1);margin-bottom:10px">Productos más pedidos</p>
      ${(catalogItems||[]).filter(i=>i.popular).slice(0,4).map((item,i)=>`
      <div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:.5px solid var(--bor)">
        <span style="font-size:11px;font-weight:700;color:var(--t3);width:16px">${i+1}</span>
        <p style="flex:1;font-size:12px;font-weight:600;color:var(--t1)">${item.nm}</p>
        <span style="font-size:11px;color:var(--t3)">${Math.floor(Math.random()*20+10)} pedidos</span>
        <p style="font-size:12px;font-weight:700;color:var(--b)">${item.pr}</p>
      </div>`).join('')}
    </div>
  </div>`;
}
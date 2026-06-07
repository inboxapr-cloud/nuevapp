// admin — MiCantón.cr

function renderAdmin(){
  const ca=ADMIN_CANTONES[adminCanton];
  const pend=adminNoticias.filter(n=>n.st==='pendiente');
  const cantTabs=`<div style="background:#0a2213;padding:7px 14px;display:flex;align-items:center;gap:7px;border-bottom:.5px solid rgba(255,255,255,.06)">
    <span style="font-size:11px;color:rgba(255,255,255,.5);white-space:nowrap">Cantón:</span>
    <div style="display:flex;gap:5px;overflow-x:auto;scrollbar-width:none;flex:1">
      ${ADMIN_CANTONES.map((c,i)=>`<span style="font-size:11px;font-weight:500;padding:4px 11px;border-radius:20px;border:.5px solid rgba(255,255,255,.15);color:${i===adminCanton?'#fff':'rgba(255,255,255,.6)'};cursor:pointer;white-space:nowrap;background:${i===adminCanton?'#1D9E75':'transparent'}" onclick="setAdminCanton(${i})">${c.nm}</span>`).join('')}
    </div>
  </div>`;
  const navBar=`<div style="display:flex;background:var(--surf);border-bottom:.5px solid var(--bor);overflow-x:auto;scrollbar-width:none">
    ${['dashboard','negocios','creativos','noticias','clasificados','ingresos','cantones','disenos','cms'].map((t,i)=>{
      const labs=['Dashboard','Negocios','Creativos','Noticias','Clasificados','Ingresos','Cantones','Diseños','CMS Roles'];
      const ics=['ti-layout-dashboard','ti-building-store','ti-palette','ti-news','ti-tag','ti-coins','ti-map-pin','ti-photo','ti-shield-half'];
      return `<div style="display:flex;align-items:center;gap:4px;font-size:11px;font-weight:600;color:${adminTab===t?'var(--g)':'var(--t3)'};padding:9px 12px;white-space:nowrap;cursor:pointer;border-bottom:2px solid ${adminTab===t?'var(--g)':'transparent'}" onclick="setAdminTab('${t}')">
        <i class="ti ${ics[i]}" style="font-size:13px"></i>${labs[i]}${t==='noticias'&&pend.length>0?`<span style="width:7px;height:7px;background:#E24B4A;border-radius:50%;display:inline-block;margin-left:2px"></span>`:''}
      </div>`;}).join('')}
  </div>`;
  const header=`<div style="background:#0C2B1A;padding:11px 14px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0">
    <span style="font-size:15px;font-weight:600;color:#9FE1CB;display:flex;align-items:center;gap:7px"><i class="ti ti-shield-check" style="font-size:17px"></i>MiCantón · Admin</span>
    <div style="display:flex;align-items:center;gap:7px"><span style="font-size:12px;color:rgba(255,255,255,.7)">Edwin</span><div style="width:30px;height:30px;border-radius:50%;background:#1D9E75;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#fff">EV</div></div>
  </div>`;

  if(adminDetail){
    const [type,id]=adminDetail;
    let body='';
    if(type==='neg'){
      const n=adminNegocios.find(x=>x.id===id);
      if(n) body=`<div style="padding:14px">
        <div style="font-size:12px;font-weight:600;color:var(--g);cursor:pointer;display:flex;align-items:center;gap:4px;margin-bottom:14px" onclick="adminDetail=null;render()"><i class="ti ti-arrow-left"></i>Volver</div>
        <div style="display:flex;gap:12px;margin-bottom:14px">
          <div style="width:52px;height:52px;border-radius:12px;background:${n.bg};display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:${n.co};flex-shrink:0">${n.av}</div>
          <div style="flex:1"><p style="font-size:17px;font-weight:700;color:var(--t1);margin-bottom:2px">${n.nm}</p><p style="font-size:12px;color:var(--t3);margin-bottom:5px">${n.cat} · ${n.canton}</p><div style="display:flex;gap:6px;flex-wrap:wrap"><span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:20px;background:${n.st==='activo'?'#E1F5EE':'#FCEBEB'};color:${n.st==='activo'?'#0F6E56':'#A32D2D'}">${n.st}</span><span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:20px;background:#E6F1FB;color:#185FA5">${n.plan}</span></div></div>
        </div>
        <div class="card" style="margin-bottom:10px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:12px 13px">
            ${[['Teléfono',n.tel],['Plan activo',n.plan],['Email',n.email,'full'],['Ingresos',n.ing,'','var(--g)']].map(([l,v,cls,c])=>`<div style="${cls==='full'?'grid-column:1/-1':''}"><p style="font-size:11px;font-weight:600;color:var(--t2);margin-bottom:4px">${l}</p><p style="font-size:13px;color:${c||'var(--t1)'};background:var(--bg);border-radius:var(--rs);padding:7px 10px;border:.5px solid var(--bor)">${v}</p></div>`).join('')}
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px">
          ${[{n:n.vistas,l:'Vistas',c:'var(--g)'},{n:n.whatsapps,l:'WhatsApp',c:'#25D366'},{n:n.contenidos,l:'Contenidos',c:'var(--pu)'}].map(s=>`<div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--rs);padding:9px 10px;text-align:center"><div style="font-size:20px;font-weight:700;color:${s.c}">${s.n}</div><div style="font-size:10px;color:var(--t3)">${s.l}</div></div>`).join('')}
        </div>
        <div class="card" style="margin-bottom:10px">
          <div style="padding:10px 14px;border-bottom:.5px solid var(--bor);font-size:12px;font-weight:600;color:var(--t1);display:flex;align-items:center;gap:5px"><i class="ti ti-history" style="font-size:14px;color:var(--g)"></i>Historial</div>
          <div style="padding:8px 14px">${n.hist.map(h=>`<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:.5px solid var(--bor)"><div style="width:8px;height:8px;border-radius:50%;background:${h.c};flex-shrink:0"></div><span style="font-size:12px;color:var(--t2);flex:1">${h.t}</span><span style="font-size:10px;color:var(--t3)">${h.d}</span></div>`).join('')}</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <button style="padding:10px;border-radius:var(--rs);border:none;cursor:pointer;font-size:12px;font-weight:600;background:#E6F1FB;color:#185FA5;display:flex;align-items:center;justify-content:center;gap:5px;font-family:inherit" onclick="showToast('Mensaje enviado ✓')"><i class="ti ti-message"></i>Mensaje</button>
          <button style="padding:10px;border-radius:var(--rs);border:none;cursor:pointer;font-size:12px;font-weight:600;background:${n.st==='activo'?'#FCEBEB':'#E1F5EE'};color:${n.st==='activo'?'#A32D2D':'#0F6E56'};display:flex;align-items:center;justify-content:center;gap:5px;font-family:inherit" onclick="adminToggleNeg(${n.id})"><i class="ti ti-${n.st==='activo'?'player-pause':'player-play'}"></i>${n.st==='activo'?'Suspender':'Activar'}</button>
          <button style="grid-column:1/-1;padding:10px;border-radius:var(--rs);border:.5px solid var(--bor);cursor:pointer;font-size:12px;font-weight:600;background:var(--bg);color:var(--t1);display:flex;align-items:center;justify-content:center;gap:5px;font-family:inherit" onclick="showToast('Editor de contenido próximamente')"><i class="ti ti-edit"></i>Editar perfil del negocio</button>
        </div>
      </div>`;
    } else if(type==='creativo'){
      const c=ADMIN_CREATIVOS.find(x=>x.id===id);
      if(c) body=`<div style="padding:14px">
        <div style="font-size:12px;font-weight:600;color:var(--g);cursor:pointer;display:flex;align-items:center;gap:4px;margin-bottom:14px" onclick="adminDetail=null;render()"><i class="ti ti-arrow-left"></i>Volver</div>
        <div style="display:flex;gap:12px;margin-bottom:14px">
          <div style="width:52px;height:52px;border-radius:12px;background:${c.bg};display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:${c.co};flex-shrink:0">${c.av}</div>
          <div style="flex:1"><p style="font-size:17px;font-weight:700;color:var(--t1);margin-bottom:2px">${c.nm}</p><p style="font-size:12px;color:var(--t3);margin-bottom:5px">${c.rol} · ${c.canton}</p><div style="display:flex;gap:6px;flex-wrap:wrap"><span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:20px;background:${c.st==='activo'?'#E1F5EE':'#FAEEDA'};color:${c.st==='activo'?'#0F6E56':'#854F0B'}">${c.st}</span><span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:20px;background:#EEEDFE;color:#534AB7">${c.plan}</span></div></div>
        </div>
        <div class="card" style="margin-bottom:10px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:12px 13px">
            ${[['Teléfono',c.tel],['Rating','⭐ '+c.rating],['Email',c.email,'full'],['Completados',c.completados+' trabajos'],['Pendientes',c.pendientes+' en cola'],['Ingresos',c.ing,'','var(--g)']].map(([l,v,cls,col])=>`<div style="${cls==='full'?'grid-column:1/-1':''}"><p style="font-size:11px;font-weight:600;color:var(--t2);margin-bottom:4px">${l}</p><p style="font-size:13px;color:${col||'var(--t1)'};background:var(--bg);border-radius:var(--rs);padding:7px 10px;border:.5px solid var(--bor)">${v}</p></div>`).join('')}
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <button style="padding:10px;border-radius:var(--rs);border:none;cursor:pointer;font-size:12px;font-weight:600;background:#E6F1FB;color:#185FA5;display:flex;align-items:center;justify-content:center;gap:5px;font-family:inherit" onclick="showToast('Mensaje enviado ✓')"><i class="ti ti-message"></i>Mensaje</button>
          <button style="padding:10px;border-radius:var(--rs);border:none;cursor:pointer;font-size:12px;font-weight:600;background:${c.st==='activo'?'#FCEBEB':'#E1F5EE'};color:${c.st==='activo'?'#A32D2D':'#0F6E56'};display:flex;align-items:center;justify-content:center;gap:5px;font-family:inherit" onclick="showToast('Estado actualizado ✓')"><i class="ti ti-${c.st==='activo'?'player-pause':'player-play'}"></i>${c.st==='activo'?'Suspender':'Activar'}</button>
        </div>
      </div>`;
    }
    return header+cantTabs+navBar+body;
  }

  let body='';
  if(adminTab==='dashboard'){
    const negs=adminNegocios.filter(n=>n.canton===ca.nm);
    const maxBar=Math.max(...ADMIN_ING_MES);
    body=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:12px">
      <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--rs);padding:11px 12px"><div style="font-size:22px;font-weight:700;color:var(--g)">${ca.n}</div><div style="font-size:10px;color:var(--t3);margin-top:2px">Negocios activos</div><div style="font-size:10px;font-weight:600;color:#3B6D11;margin-top:3px;display:flex;align-items:center;gap:2px"><i class="ti ti-trending-up" style="font-size:11px"></i>+12 este mes</div></div>
      <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--rs);padding:11px 12px"><div style="font-size:22px;font-weight:700;color:var(--pu)">${ca.cr}</div><div style="font-size:10px;color:var(--t3);margin-top:2px">Creativos activos</div><div style="font-size:10px;font-weight:600;color:#3B6D11;margin-top:3px;display:flex;align-items:center;gap:2px"><i class="ti ti-trending-up" style="font-size:11px"></i>+3 este mes</div></div>
      <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--rs);padding:11px 12px"><div style="font-size:22px;font-weight:700;color:var(--b)">${ca.c}</div><div style="font-size:10px;color:var(--t3);margin-top:2px">Clasificados activos</div><div style="font-size:10px;font-weight:600;color:#3B6D11;margin-top:3px;display:flex;align-items:center;gap:2px"><i class="ti ti-trending-up" style="font-size:11px"></i>+8 semana</div></div>
      <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--rs);padding:11px 12px"><div style="font-size:22px;font-weight:700;color:var(--am)">${fmtM(ca.ing)}</div><div style="font-size:10px;color:var(--t3);margin-top:2px">Ingresos ${ca.nm}</div><div style="font-size:10px;font-weight:600;color:#3B6D11;margin-top:3px;display:flex;align-items:center;gap:2px"><i class="ti ti-trending-up" style="font-size:11px"></i>+18% vs ant.</div></div>
    </div>
    <div style="padding:0 12px 10px">
    <div class="card">
      <div style="padding:10px 14px;border-bottom:.5px solid var(--bor);display:flex;align-items:center;justify-content:space-between"><span style="font-size:12px;font-weight:600;color:var(--t1);display:flex;align-items:center;gap:5px"><i class="ti ti-trending-up" style="font-size:14px;color:var(--g)"></i>Ingresos 2025</span><span style="font-size:12px;font-weight:600;color:var(--g)">${fmtM(ADMIN_ING_MES[5])}</span></div>
      <div style="display:flex;align-items:flex-end;gap:4px;height:80px;padding:8px 14px 10px">
        ${ADMIN_MESES.map((m,i)=>{const h=Math.round((ADMIN_ING_MES[i]/maxBar)*64);const last=i===5;return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px"><div style="width:100%;border-radius:4px 4px 0 0;height:${h}px;background:${last?'var(--g)':'rgba(29,158,117,.25)'}"></div><span style="font-size:9px;color:var(--t3)">${m}</span></div>`;}).join('')}
      </div>
    </div>
    ${pend.length>0?`<div class="card" style="margin-top:0">
      <div style="padding:10px 14px;border-bottom:.5px solid var(--bor);display:flex;align-items:center;justify-content:space-between"><span style="font-size:12px;font-weight:600;color:var(--t1);display:flex;align-items:center;gap:5px"><i class="ti ti-news" style="font-size:14px;color:var(--g)"></i>Noticias por aprobar</span><span style="font-size:10px;font-weight:600;background:#FCEBEB;color:#A32D2D;padding:2px 8px;border-radius:10px">${pend.length}</span></div>
      ${pend.slice(0,2).map(n=>`<div style="padding:10px 13px;border-bottom:.5px solid var(--bor)">
        <p style="font-size:12px;font-weight:600;color:var(--t1);margin-bottom:3px">${n.tit.substring(0,48)}...</p>
        <p style="font-size:11px;color:var(--t3);margin-bottom:7px">${n.medio} · ${n.canton} · ${n.t}</p>
        <div style="display:flex;gap:6px">
          <button style="flex:1;font-size:11px;font-weight:600;padding:6px;border-radius:var(--rs);border:none;background:#E1F5EE;color:#0F6E56;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:4px" onclick="adminAprobarNoticia(${n.id})"><i class="ti ti-check" style="font-size:12px"></i>Aprobar</button>
          <button style="flex:1;font-size:11px;font-weight:600;padding:6px;border-radius:var(--rs);border:none;background:#FCEBEB;color:#A32D2D;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:4px" onclick="adminRechazarNoticia(${n.id})"><i class="ti ti-x" style="font-size:12px"></i>Rechazar</button>
        </div>
      </div>`).join('')}
    </div>`:''}
    <div class="card" style="margin-top:${pend.length>0?'0':'0'}">
      <div style="padding:10px 14px;border-bottom:.5px solid var(--bor);display:flex;align-items:center;justify-content:space-between"><span style="font-size:12px;font-weight:600;color:var(--t1);display:flex;align-items:center;gap:5px"><i class="ti ti-building-store" style="font-size:14px;color:var(--g)"></i>Negocios recientes</span><span style="font-size:11px;color:var(--g);cursor:pointer;font-weight:600" onclick="setAdminTab('negocios')">Ver todos →</span></div>
      ${negs.slice(0,3).map(n=>`<div style="display:flex;align-items:center;gap:9px;padding:10px 13px;border-bottom:.5px solid var(--bor);cursor:pointer" onclick="adminDetail=['neg',${n.id}];render()">
        <div style="width:34px;height:34px;border-radius:9px;background:${n.bg};color:${n.co};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${n.av}</div>
        <div style="flex:1"><p style="font-size:12px;font-weight:600;color:var(--t1);margin-bottom:1px">${n.nm}</p><p style="font-size:10px;color:var(--t3)">${n.cat} · ${n.plan}</p></div>
        <span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:20px;background:${n.st==='activo'?'#E1F5EE':'#FCEBEB'};color:${n.st==='activo'?'#0F6E56':'#A32D2D'}">${n.st}</span>
      </div>`).join('')}
    </div>
    </div>`;
  } else if(adminTab==='negocios'){
    const negs=adminNegocios.filter(n=>n.canton===ca.nm);
    body=`<div style="padding:10px 12px 0">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <div><p style="font-size:13px;font-weight:600;color:var(--t1)">${ca.nm} · ${negs.length} negocios</p><p style="font-size:11px;color:var(--t3)">${negs.filter(n=>n.st==='activo').length} activos · ${negs.filter(n=>n.st==='pendiente').length} pendientes · ${negs.filter(n=>n.st==='suspendido').length} suspendidos</p></div>
      <button style="font-size:11px;font-weight:600;background:var(--g);color:#fff;border:none;border-radius:20px;padding:5px 12px;cursor:pointer;font-family:inherit" onclick="showToast('Lista exportada ✓')"><i class="ti ti-download" style="font-size:11px"></i> Exportar</button>
    </div>
    </div>
    <div class="card" style="margin:0 12px">
      ${negs.map(n=>`<div style="display:flex;align-items:center;gap:9px;padding:10px 13px;border-bottom:.5px solid var(--bor);cursor:pointer" onclick="adminDetail=['neg',${n.id}];render()">
        <div style="width:34px;height:34px;border-radius:9px;background:${n.bg};color:${n.co};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${n.av}</div>
        <div style="flex:1"><p style="font-size:12px;font-weight:600;color:var(--t1);margin-bottom:1px">${n.nm}</p><p style="font-size:10px;color:var(--t3)">${n.cat} · <span style="font-weight:600;color:var(--b)">${n.plan}</span> · ${n.ing}</p></div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px"><span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:20px;background:${n.st==='activo'?'#E1F5EE':n.st==='pendiente'?'#FAEEDA':'#FCEBEB'};color:${n.st==='activo'?'#0F6E56':n.st==='pendiente'?'#854F0B':'#A32D2D'}">${n.st}</span><i class="ti ti-chevron-right" style="font-size:13px;color:var(--t3)"></i></div>
      </div>`).join('')}
    </div>`;
  } else if(adminTab==='creativos'){
    body=`<div style="padding:10px 12px">
    <div style="background:#EEEDFE;border:.5px solid #AFA9EC;border-radius:var(--r);padding:12px;margin-bottom:10px">
      <p style="font-size:12px;font-weight:600;color:#3C3489;margin-bottom:8px">Desempeño del equipo este mes</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${[{n:'147',l:'Completados'},{n:'98%',l:'A tiempo'},{n:'4.8',l:'Rating prom.'}].map(s=>`<div style="background:rgba(255,255,255,.6);border-radius:var(--rs);padding:8px;text-align:center"><div style="font-size:18px;font-weight:700;color:#534AB7">${s.n}</div><div style="font-size:10px;color:#534AB7;margin-top:1px">${s.l}</div></div>`).join('')}
      </div>
    </div>
    </div>
    <div class="card" style="margin:0 12px">
      ${ADMIN_CREATIVOS.map(c=>`<div style="display:flex;align-items:center;gap:9px;padding:10px 13px;border-bottom:.5px solid var(--bor);cursor:pointer" onclick="adminDetail=['creativo',${c.id}];render()">
        <div style="width:34px;height:34px;border-radius:9px;background:${c.bg};color:${c.co};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${c.av}</div>
        <div style="flex:1"><p style="font-size:12px;font-weight:600;color:var(--t1);margin-bottom:1px">${c.nm}</p><p style="font-size:10px;color:var(--t3)">${c.rol} · <span style="font-weight:600;color:var(--pu)">${c.plan}</span> · <i class="ti ti-star" style="font-size:10px;color:#EF9F27"></i>${c.rating}</p></div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px"><span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:20px;background:${c.st==='activo'?'#E1F5EE':'#FAEEDA'};color:${c.st==='activo'?'#0F6E56':'#854F0B'}">${c.st}</span><p style="font-size:10px;color:var(--t3)">${c.completados} completados</p></div>
      </div>`).join('')}
    </div>`;
  } else if(adminTab==='noticias'){
    const apro=adminNoticias.filter(n=>n.st==='aprobada');
    const rech=adminNoticias.filter(n=>n.st==='rechazada');
    const catC={'Municipal':'#E1F5EE:#0F6E56','Cultura':'#EEEDFE:#534AB7','Deportes':'#E6F1FB:#185FA5','Economía':'#FAEEDA:#854F0B'};
    body=`<div style="padding:10px 12px 0">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px">
      ${[{n:pend.length,l:'Pendientes',c:'#854F0B'},{n:apro.length,l:'Aprobadas',c:'var(--g)'},{n:rech.length,l:'Rechazadas',c:'#A32D2D'}].map(s=>`<div style="background:var(--surf);border-radius:var(--rs);border:.5px solid var(--bor);padding:9px 10px;text-align:center"><div style="font-size:18px;font-weight:700;color:${s.c}">${s.n}</div><div style="font-size:10px;color:var(--t3)">${s.l}</div></div>`).join('')}
    </div>
    </div>
    ${pend.length>0?`<div class="card" style="margin:0 12px 10px">
      <div style="padding:10px 14px;border-bottom:.5px solid var(--bor);display:flex;align-items:center;justify-content:space-between"><span style="font-size:12px;font-weight:600;color:var(--t1);display:flex;align-items:center;gap:5px"><i class="ti ti-clock" style="font-size:14px;color:#854F0B"></i>Pendientes de revisión</span><span style="font-size:10px;font-weight:600;background:#FAEEDA;color:#854F0B;padding:2px 8px;border-radius:10px">${pend.length}</span></div>
      ${pend.map(n=>{const [bc,tc]=(catC[n.tipo]||'#F0EEE9:#5F5E5A').split(':');return `<div style="padding:10px 13px;border-bottom:.5px solid var(--bor)">
        <p style="font-size:12px;font-weight:600;color:var(--t1);margin-bottom:3px">${n.tit}</p>
        <p style="font-size:11px;color:var(--t3);margin-bottom:7px;display:flex;align-items:center;gap:5px">${n.medio} · <span style="background:${bc};color:${tc};font-size:10px;font-weight:600;padding:1px 6px;border-radius:10px">${n.tipo}</span> · ${n.canton} · ${n.t}</p>
        <div style="display:flex;gap:6px">
          <button style="flex:1;font-size:11px;font-weight:600;padding:6px;border-radius:var(--rs);border:none;background:#E1F5EE;color:#0F6E56;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:4px" onclick="adminAprobarNoticia(${n.id})"><i class="ti ti-check" style="font-size:12px"></i>Aprobar</button>
          <button style="flex:1;font-size:11px;font-weight:600;padding:6px;border-radius:var(--rs);border:none;background:#FCEBEB;color:#A32D2D;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:4px" onclick="adminRechazarNoticia(${n.id})"><i class="ti ti-x" style="font-size:12px"></i>Rechazar</button>
          <button style="font-size:11px;font-weight:600;padding:6px 10px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t1);cursor:pointer;font-family:inherit" onclick="window.open('https://micanton.cr/noticias','_blank')"><i class="ti ti-eye" style="font-size:12px"></i></button>
        </div>
      </div>`;}).join('')}
    </div>`:''}
    ${apro.length>0?`<div class="card" style="margin:0 12px">
      <div style="padding:10px 14px;border-bottom:.5px solid var(--bor);font-size:12px;font-weight:600;color:var(--t1);display:flex;align-items:center;gap:5px"><i class="ti ti-check" style="font-size:14px;color:var(--g)"></i>Publicadas hoy</div>
      ${apro.map(n=>`<div style="display:flex;align-items:center;gap:8px;padding:10px 13px;border-bottom:.5px solid var(--bor)"><div style="width:30px;height:30px;border-radius:8px;background:#E1F5EE;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="ti ti-news" style="font-size:14px;color:var(--g)"></i></div><div style="flex:1"><p style="font-size:12px;font-weight:600;color:var(--t1);margin-bottom:1px">${n.tit.substring(0,45)}...</p><p style="font-size:10px;color:var(--t3)">${n.medio} · ${n.canton}</p></div><span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:10px;background:#E1F5EE;color:#0F6E56">Publicada</span></div>`).join('')}
    </div>`:''}`;
  } else if(adminTab==='clasificados'){
    body=`<div style="padding:10px 12px 0">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px">
      ${[{n:'318',l:'Activos',c:'var(--g)'},{n:'12',l:'Nuevos hoy',c:'var(--b)'},{n:'2',l:'Reportados',c:'#A32D2D'}].map(s=>`<div style="background:var(--surf);border-radius:var(--rs);border:.5px solid var(--bor);padding:9px 10px;text-align:center"><div style="font-size:18px;font-weight:700;color:${s.c}">${s.n}</div><div style="font-size:10px;color:var(--t3)">${s.l}</div></div>`).join('')}
    </div>
    </div>
    <div class="card" style="margin:0 12px 10px">
      <div style="padding:10px 14px;border-bottom:.5px solid var(--bor);display:flex;align-items:center;justify-content:space-between"><span style="font-size:12px;font-weight:600;color:var(--t1);display:flex;align-items:center;gap:5px"><i class="ti ti-alert-triangle" style="font-size:14px;color:#854F0B"></i>Anuncios reportados</span><span style="font-size:10px;font-weight:600;background:#FAEEDA;color:#854F0B;padding:2px 8px;border-radius:10px">2</span></div>
      ${[{nm:'Toyota Corolla 2018 en perfecto estado',v:'Mario R.',m:'Precio sospechosamente bajo',t:'Hace 1h'},{nm:'iPhone 15 Pro Max nuevo de caja',v:'User123',m:'Posible estafa · no verificado',t:'Hace 3h'}].map(r=>`<div style="padding:10px 13px;border-bottom:.5px solid var(--bor)">
        <p style="font-size:12px;font-weight:600;color:var(--t1);margin-bottom:2px">${r.nm}</p>
        <p style="font-size:11px;color:var(--t3);margin-bottom:7px">Vendedor: ${r.v} · ${r.m} · ${r.t}</p>
        <div style="display:flex;gap:6px">
          <button style="font-size:11px;font-weight:600;padding:5px 10px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t1);cursor:pointer;font-family:inherit" onclick="showToast('Ver anuncio próximamente')"><i class="ti ti-eye" style="font-size:12px"></i> Ver</button>
          <button style="font-size:11px;font-weight:600;padding:5px 10px;border-radius:var(--rs);border:none;background:#FCEBEB;color:#A32D2D;cursor:pointer;font-family:inherit" onclick="showToast('Anuncio eliminado ✓')"><i class="ti ti-trash" style="font-size:12px"></i> Eliminar</button>
          <button style="font-size:11px;font-weight:600;padding:5px 10px;border-radius:var(--rs);border:none;background:#E1F5EE;color:#0F6E56;cursor:pointer;font-family:inherit" onclick="showToast('Marcado como verificado ✓')"><i class="ti ti-check" style="font-size:12px"></i> Seguro</button>
        </div>
      </div>`).join('')}
    </div>`;
  } else if(adminTab==='ingresos'){
    const total=ADMIN_ING_MODS.reduce((s,m)=>s+m.monto,0);
    const maxBar=Math.max(...ADMIN_ING_MES);
    body=`<div style="padding:12px">
    <div style="background:var(--gdd);border-radius:var(--r);padding:14px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between">
      <div><p style="font-size:11px;color:rgba(255,255,255,.7);margin-bottom:3px">Ingresos totales · Junio 2025</p><p style="font-size:28px;font-weight:700;color:#9FE1CB">${fmtM(total)}</p><p style="font-size:11px;color:rgba(255,255,255,.6);margin-top:3px;display:flex;align-items:center;gap:4px"><i class="ti ti-trending-up" style="font-size:12px"></i>+22% vs mayo</p></div>
      <div style="display:flex;flex-direction:column;gap:4px">
        ${[['Esta semana','₡1.2M'],['Este mes',fmtM(total)],['Proy. año','₡58.8M']].map(([l,v])=>`<div style="background:rgba(255,255,255,.1);border-radius:var(--rs);padding:5px 10px;text-align:right"><div style="font-size:10px;color:rgba(255,255,255,.6)">${l}</div><div style="font-size:13px;font-weight:600;color:#9FE1CB">${v}</div></div>`).join('')}
      </div>
    </div>
    <div class="card" style="margin-bottom:10px">
      <div style="padding:10px 14px;border-bottom:.5px solid var(--bor);font-size:12px;font-weight:600;color:var(--t1);display:flex;align-items:center;gap:5px"><i class="ti ti-chart-bar" style="font-size:14px;color:var(--g)"></i>Ingresos por mes</div>
      <div style="display:flex;align-items:flex-end;gap:4px;height:88px;padding:8px 14px 10px">
        ${ADMIN_MESES.map((m,i)=>{const h=Math.round((ADMIN_ING_MES[i]/maxBar)*72);const last=i===5;return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px"><div style="width:100%;border-radius:4px 4px 0 0;height:${h}px;background:${last?'var(--g)':'rgba(29,158,117,.25)'}"></div><span style="font-size:9px;color:var(--t3)">${m}</span></div>`;}).join('')}
      </div>
    </div>
    <div class="card" style="margin-bottom:10px">
      <div style="padding:10px 14px;border-bottom:.5px solid var(--bor);font-size:12px;font-weight:600;color:var(--t1);display:flex;align-items:center;gap:5px"><i class="ti ti-pie-chart" style="font-size:14px;color:var(--g)"></i>Por módulo</div>
      ${ADMIN_ING_MODS.map(m=>`<div style="display:flex;align-items:center;gap:10px;padding:9px 14px;border-bottom:.5px solid var(--bor)">
        <div style="width:28px;height:28px;border-radius:7px;background:${m.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="ti ${m.ic}" style="font-size:14px;color:${m.co}"></i></div>
        <span style="font-size:12px;font-weight:600;color:var(--t1);flex:1">${m.nm}</span>
        <div style="width:60px;height:6px;background:var(--bg);border-radius:3px;overflow:hidden"><div style="height:100%;border-radius:3px;background:${m.color};width:${m.pct}%"></div></div>
        <span style="font-size:10px;color:var(--t3);min-width:26px;text-align:right">${m.pct}%</span>
        <span style="font-size:12px;font-weight:600;color:var(--t1);min-width:58px;text-align:right">${fmtK2(m.monto)}</span>
      </div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      ${[{t:'Negocios activos',v:'142',l:'Alajuela',c:'var(--g)'},{t:'Creativos',v:'23',l:'Plataforma',c:'var(--pu)'},{t:'Ticket promedio',v:'₡29.500',l:'Por negocio/mes',c:'var(--b)'},{t:'Retención',v:'94%',l:'Renovaciones mensuales',c:'var(--am)'}].map(s=>`<div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--rs);padding:11px 12px"><div style="font-size:20px;font-weight:700;color:${s.c}">${s.v}</div><div style="font-size:11px;font-weight:600;color:var(--t1);margin-top:2px">${s.t}</div><div style="font-size:10px;color:var(--t3)">${s.l}</div></div>`).join('')}
    </div>
    </div>`;
  } else if(adminTab==='cms'){
    body=renderAdminCMS();
  } else if(adminTab==='categorias'){
    content=renderAdminCategorias();
  } else if(adminTab==='disenos'){
    body = renderAdminDisenos();
  } else if(adminTab==='cantones'){
    const cants = getProvinciasCantones(adminGeoPais, adminGeoProv);
    body=`<div style="padding:12px">
    <!-- PAÍS SELECTOR -->
    <div class="card" style="margin-bottom:10px">
      <div style="padding:10px 14px;border-bottom:.5px solid var(--bor);font-size:12px;font-weight:600;color:var(--t1);display:flex;align-items:center;gap:5px"><i class="ti ti-world" style="font-size:14px;color:var(--g)"></i>País activo de la plataforma</div>
      <div style="padding:12px;display:flex;flex-direction:column;gap:9px">
        <div style="display:grid;grid-template-columns:repeat(${Object.keys(PAISES).length},1fr);gap:7px">
          ${Object.entries(PAISES).map(([nm,p])=>`<div style="border:${adminGeoPais===nm?'2px solid var(--g)':'1.5px solid var(--bor)'};border-radius:var(--rs);padding:9px 6px;text-align:center;cursor:pointer;background:${adminGeoPais===nm?'#E1F5EE':'var(--surf)'}" onclick="adminGeoPais='${nm}';adminGeoProv=Object.keys(PAISES['${nm}'].provincias)[0];render()">
            <div style="font-size:22px;margin-bottom:3px">${p.flag}</div>
            <p style="font-size:9px;font-weight:600;color:${adminGeoPais===nm?'var(--gdd)':'var(--t3)'};line-height:1.2">${nm}</p>
          </div>`).join('')}
        </div>
        <div style="background:#E1F5EE;border:.5px solid #9FE1CB;border-radius:var(--rs);padding:8px 12px;display:flex;align-items:center;justify-content:space-between">
          <div><span style="font-size:11px;font-weight:600;color:var(--gdd)">${PAISES[adminGeoPais]?.flag||"🌎"} ${adminGeoPais} activo · ${adminGeoPais===paisActivo?'Configuración actual':'Cambiar país'}</span></div>
          ${adminGeoPais!==paisActivo?`<button style="font-size:11px;font-weight:600;padding:5px 12px;border-radius:20px;border:none;background:var(--g);color:#fff;cursor:pointer;font-family:inherit" onclick="paisActivo='${adminGeoPais}';updatePaisLabel();showToast('País cambiado a ${adminGeoPais} '+(PAISES[adminGeoPais]?.flag||'🌎'))">Aplicar</button>`:`<span style="font-size:10px;font-weight:600;color:var(--g)">✓ País actual</span>`}
        </div>
      </div>
    </div>

    <!-- PROVINCIAS / DEPARTAMENTOS / ESTADOS -->
    <div class="card" style="margin-bottom:10px">
      <div style="padding:10px 14px;border-bottom:.5px solid var(--bor);display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:12px;font-weight:600;color:var(--t1);display:flex;align-items:center;gap:5px"><i class="ti ti-map-2" style="font-size:14px;color:var(--g)"></i>Provincias / Estados</span>
        <button style="font-size:11px;font-weight:600;background:var(--g);color:#fff;border:none;border-radius:20px;padding:4px 12px;cursor:pointer;font-family:inherit" onclick="showToast('Provincia activada ✓')">+ Nueva</button>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;padding:10px 13px;border-bottom:.5px solid var(--bor)">
        ${Object.keys(PAISES[adminGeoPais]?.provincias||{}).map(p=>`<span style="font-size:11px;font-weight:600;padding:5px 12px;border-radius:20px;cursor:pointer;border:.5px solid ${adminGeoProv===p?'var(--g)':'var(--bor)'};background:${adminGeoProv===p?'#E1F5EE':'var(--surf)'};color:${adminGeoProv===p?'var(--g)':'var(--t2)'}" onclick="adminGeoProv='${p}';render()">${p}</span>`).join('')}
      </div>
      <!-- CANTONES DE LA PROVINCIA SELECCIONADA -->
      <div style="padding:10px 14px;border-bottom:.5px solid var(--bor);display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:11px;font-weight:600;color:var(--t1)">Cantones de ${adminGeoProv} <span style="color:var(--t3);font-weight:400">(${cants.length})</span></span>
        <button style="font-size:11px;font-weight:600;color:var(--g);background:none;border:none;cursor:pointer" onclick="showToast('Cantón agregado ✓')">+ Cantón</button>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:5px;padding:10px 13px">
        ${cants.map((c,i)=>`<div style="display:flex;align-items:center;gap:4px;font-size:11px;padding:4px 10px;border-radius:20px;background:var(--bg);border:.5px solid var(--bor);color:var(--t1)">
          ${c}
          <i class="ti ti-x" style="font-size:10px;color:var(--t3);cursor:pointer" onclick="showToast('Cantón eliminado ✓')"></i>
        </div>`).join('')}
      </div>
    </div>

    <!-- CANTONES ACTIVOS EN LA PLATAFORMA -->
    <div class="card" style="margin-bottom:10px">
      <div style="padding:10px 14px;border-bottom:.5px solid var(--bor);display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:12px;font-weight:600;color:var(--t1);display:flex;align-items:center;gap:5px"><i class="ti ti-map-pin" style="font-size:14px;color:var(--g)"></i>Cantones activos en la plataforma</span>
        <button style="font-size:11px;font-weight:600;background:var(--g);color:#fff;border:none;border-radius:20px;padding:4px 12px;cursor:pointer;font-family:inherit" onclick="showToast('Configuración guardada ✓')">+ Activar</button>
      </div>
      ${ADMIN_CANTONES.map((c,i)=>`<div style="display:flex;align-items:center;gap:9px;padding:10px 13px;border-bottom:.5px solid var(--bor);cursor:pointer" onclick="setAdminCanton(${i});setAdminTab('dashboard')">
        <div style="width:34px;height:34px;border-radius:9px;background:#E1F5EE;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="ti ti-map-pin" style="font-size:17px;color:var(--g)"></i></div>
        <div style="flex:1"><p style="font-size:12px;font-weight:600;color:var(--t1);margin-bottom:1px">${c.nm}</p><p style="font-size:10px;color:var(--t3)">${c.n} negocios · ${c.cr} creativos · ${fmtM(c.ing)}/mes</p></div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px"><span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:10px;background:#E1F5EE;color:#0F6E56">Activo</span><i class="ti ti-chevron-right" style="font-size:13px;color:var(--t3)"></i></div>
      </div>`).join('')}
    </div>

    <!-- EN PREPARACIÓN -->
    <div class="card">
      <div style="padding:10px 14px;border-bottom:.5px solid var(--bor);font-size:12px;font-weight:600;color:var(--t1);display:flex;align-items:center;gap:5px"><i class="ti ti-clock" style="font-size:14px;color:#854F0B"></i>En preparación</div>
      ${[['Naranjo','Alajuela',53],['Atenas','Alajuela',49],['Turrialba','Cartago',51]].map(([nm,prov,n])=>`<div style="display:flex;align-items:center;gap:9px;padding:10px 13px;border-bottom:.5px solid var(--bor)">
        <div style="width:34px;height:34px;border-radius:9px;background:#FAEEDA;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="ti ti-map-pin" style="font-size:17px;color:#854F0B"></i></div>
        <div style="flex:1"><p style="font-size:12px;font-weight:600;color:var(--t1);margin-bottom:1px">${nm} · ${prov}</p><p style="font-size:10px;color:var(--t3)">${n} negocios pre-registrados</p></div>
        <button style="font-size:11px;font-weight:600;padding:5px 12px;border-radius:20px;border:none;background:var(--g);color:#fff;cursor:pointer;font-family:inherit" onclick="showToast('Configuración guardada ✓')">Activar</button>
      </div>`).join('')}
    </div>
    </div>`;
  }
  return header+cantTabs+navBar+body;
}

function renderAdminDisenos(){
  const d=adminTplEditorData;

  // ── TAB: CREAR / EDITAR ──
  if(adminDisTab==='ia') return renderAdminIAGenerator();
  if(adminDisTab==='crear'||adminDisTab==='editar'){
    const isEdit=adminDisTab==='editar';
    const layouts=[
      {id:'hero',     nm:'Hero Centrado', ic:'🖼️'},
      {id:'split',    nm:'Split Diagonal',ic:'◧'},
      {id:'text_bg',  nm:'Texto de Fondo',ic:'🔤'},
      {id:'circle',   nm:'Círculo Acento',ic:'⭕'},
      {id:'grid',     nm:'Grilla Prod.',  ic:'▦'},
    ];
    const emojis=['⭐','🔥','✨','🎯','🎁','💥','🏆','💰','🍔','🥗','🛍️','📱','🚗','🏠'];

    return `<div style="padding:12px">
    <!-- Header -->
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
      <button style="width:32px;height:32px;border-radius:50%;border:.5px solid var(--bor);background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center" onclick="adminDisTab='sistema';render()">
        <i class="ti ti-arrow-left" style="font-size:15px;color:var(--t1)"></i>
      </button>
      <div>
        <p style="font-size:15px;font-weight:700;color:var(--t1)">${isEdit?'Editar plantilla':'Nueva plantilla'}</p>
        <p style="font-size:11px;color:var(--t3)">Editor visual de canvas</p>
      </div>
    </div>

    <!-- CANVAS PREVIEW -->
    <div style="background:#e0e0e0;border-radius:var(--r);padding:10px;margin-bottom:14px;display:flex;flex-direction:column;align-items:center;gap:8px">
      <canvas id="adminTplCanvas" width="360" height="360" style="width:280px;height:280px;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.3);display:block"></canvas>
      <button style="font-size:11px;font-weight:700;padding:6px 16px;border-radius:20px;border:none;background:var(--gdd);color:#9FE1CB;cursor:pointer;font-family:inherit" onclick="adminRenderTplPreview()">↺ Actualizar preview</button>
    </div>

    <!-- CAMPOS EDITABLES -->
    <div style="display:flex;flex-direction:column;gap:10px">

      <!-- Nombre y emoji -->
      <div class="card" style="padding:12px">
        <p style="font-size:11px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Identificación</p>
        <div style="display:flex;gap:8px;margin-bottom:8px">
          <div style="flex:1"><p style="font-size:11px;font-weight:600;color:var(--t2);margin-bottom:4px">Nombre de la plantilla</p>
            <input style="width:100%;font-size:13px;padding:8px 10px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t1);outline:none;font-family:inherit;box-sizing:border-box"
              value="${d.nm}" placeholder="Ej: Oscuro Premium" oninput="adminTplField('nm',this.value)">
          </div>
        </div>
        <p style="font-size:11px;font-weight:600;color:var(--t2);margin-bottom:6px">Ícono</p>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${emojis.map(e=>`<span style="font-size:22px;cursor:pointer;padding:4px 6px;border-radius:8px;border:${d.ic===e?'2px solid var(--g)':'1px solid var(--bor)'};background:${d.ic===e?'#E1F5EE':'var(--surf)'}" onclick="adminTplField('ic','${e}')">${e}</span>`).join('')}
        </div>
      </div>

      <!-- Layout -->
      <div class="card" style="padding:12px">
        <p style="font-size:11px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Diseño / Layout</p>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">
          ${layouts.map(l=>`<div style="padding:10px 8px;border-radius:var(--rs);border:${d.layout===l.id?'2px solid var(--g)':'1px solid var(--bor)'};cursor:pointer;background:${d.layout===l.id?'#E1F5EE':'var(--surf)'};text-align:center" onclick="adminTplField('layout','${l.id}')">
            <span style="font-size:20px">${l.ic}</span>
            <p style="font-size:10px;font-weight:600;color:${d.layout===l.id?'var(--gdd)':'var(--t2)'};margin-top:3px">${l.nm}</p>
          </div>`).join('')}
        </div>
      </div>

      <!-- Colores -->
      <div class="card" style="padding:12px">
        <p style="font-size:11px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Colores</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          ${[
            ['fondo1','Fondo principal','#0d1f2d'],
            ['fondo2','Fondo secundario','#1a0800'],
            ['acento','Color acento','#EF9F27'],
            ['texto','Color de texto','#ffffff'],
            ['badge_bg','Badge fondo','#ffffff'],
            ['badge_tc','Badge texto','#1a1a1a'],
          ].map(([k,label,def])=>`<div>
            <p style="font-size:10px;font-weight:600;color:var(--t2);margin-bottom:4px">${label}</p>
            <div style="display:flex;align-items:center;gap:6px">
              <input type="color" value="${d[k]||def}" style="width:36px;height:30px;border-radius:6px;border:.5px solid var(--bor);cursor:pointer;padding:2px" onchange="adminTplField('${k}',this.value)" oninput="adminTplField('${k}',this.value)">
              <input style="flex:1;font-size:12px;padding:6px 8px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t1);outline:none;font-family:inherit" value="${d[k]||def}" oninput="adminTplField('${k}',this.value)">
            </div>
            <div style="height:12px;border-radius:4px;background:${d[k]||def};margin-top:3px;border:.5px solid var(--bor)"></div>
          </div>`).join('')}
        </div>
        <!-- Paletas preset -->
        <p style="font-size:10px;font-weight:600;color:var(--t3);margin:10px 0 6px">Paletas preset</p>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          ${[
            {nm:'Oscuro oro',f1:'#0d1f2d',f2:'#1a0800',ac:'#EF9F27',tx:'#fff'},
            {nm:'Verde CR',  f1:'#085041',f2:'#0d3329',ac:'#9FE1CB',tx:'#fff'},
            {nm:'Azul noche',f1:'#0C447C',f2:'#060e1a',ac:'#B5D4F4',tx:'#fff'},
            {nm:'Rojo drama',f1:'#8B0033',f2:'#4a0018',ac:'#FFD600',tx:'#fff'},
            {nm:'Blanco min',f1:'#f8f8f8',f2:'#fff',   ac:'#085041',tx:'#1a1a1a'},
            {nm:'Amarillo',  f1:'#FFD600',f2:'#FFB300', ac:'#2d7a2d',tx:'#1a1a1a'},
            {nm:'Naranja',   f1:'#E05A00',f2:'#FF8C00', ac:'#fff',   tx:'#fff'},
            {nm:'Café premium',f1:'#2a1a0a',f2:'#3d1f00',ac:'#EF9F27',tx:'#fff'},
          ].map(p=>`<div style="cursor:pointer;border-radius:8px;overflow:hidden;border:.5px solid var(--bor);flex-shrink:0" onclick="Object.assign(adminTplEditorData,{fondo1:'${p.f1}',fondo2:'${p.f2}',acento:'${p.ac}',texto:'${p.tx}'});render();setTimeout(adminRenderTplPreview,80)">
            <div style="display:flex">
              <div style="width:16px;height:32px;background:${p.f1}"></div>
              <div style="width:16px;height:32px;background:${p.ac}"></div>
            </div>
            <p style="font-size:8px;font-weight:600;color:var(--t3);text-align:center;padding:2px">${p.nm}</p>
          </div>`).join('')}
        </div>
      </div>

      <!-- Textos -->
      <div class="card" style="padding:12px">
        <p style="font-size:11px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Textos predeterminados</p>
        <div style="display:flex;flex-direction:column;gap:7px">
          ${[
            ['titulo','Título principal','TÍTULO PRINCIPAL'],
            ['subtitulo','Subtítulo','Subtítulo del post'],
            ['badge','Badge / Oferta','50% OFF'],
            ['cta','Botón CTA','Pedí ahora'],
            ['web','Web / Contacto','micanton.cr'],
          ].map(([k,label,ph])=>`<div>
            <p style="font-size:10px;font-weight:600;color:var(--t2);margin-bottom:3px">${label}</p>
            <input style="width:100%;font-size:12px;padding:7px 10px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t1);outline:none;font-family:inherit;box-sizing:border-box"
              value="${d[k]||''}" placeholder="${ph}" oninput="adminTplField('${k}',this.value)">
          </div>`).join('')}
        </div>
      </div>

      <!-- Opciones de visualización -->
      <div class="card" style="padding:12px">
        <p style="font-size:11px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Opciones</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
          ${[['showFoto','Mostrar foto'],['showNombre','Mostrar nombre'],['showPrecio','Mostrar precio'],['showDesc','Mostrar descripción']].map(([k,l])=>`<div style="display:flex;align-items:center;gap:7px;cursor:pointer;padding:8px 10px;border-radius:var(--rs);border:.5px solid var(--bor)" onclick="adminTplEditorData.${k}=!adminTplEditorData.${k};adminRenderTplPreview()">
            <div style="width:30px;height:16px;border-radius:8px;background:${d[k]?'var(--g)':'#ccc'};position:relative;flex-shrink:0">
              <div style="width:12px;height:12px;border-radius:50%;background:#fff;position:absolute;top:2px;${d[k]?'right:2px':'left:2px'}"></div>
            </div>
            <span style="font-size:11px;font-weight:600;color:${d[k]?'var(--gdd)':'var(--t3)'}">${l}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- GUARDAR -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px">
      <button style="padding:12px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t1);font-size:12px;font-weight:600;cursor:pointer;font-family:inherit" onclick="adminDisTab='sistema';render()">Cancelar</button>
      <button style="padding:12px;border-radius:var(--rs);border:none;background:var(--g);color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:5px" onclick="adminGuardarTpl()">
        <i class="ti ti-check" style="font-size:14px"></i>${isEdit?'Guardar cambios':'Crear plantilla'}
      </button>
    </div>
    </div>`;
  }

  // ── TAB: SISTEMA (listado) ──
  return `<div style="padding:12px">

  <!-- TABS -->
  <div style="display:flex;gap:6px;margin-bottom:14px">
    ${[['sistema','Sistema'],['custom','Personalizadas'],['ia','✨ IA']].map(([t,l])=>`<span style="font-size:11px;font-weight:600;padding:5px 13px;border-radius:20px;cursor:pointer;background:${adminDisTab===t?t==='ia'?'linear-gradient(135deg,#534AB7,#8B2FC9)':'var(--b)':'var(--bg)'};color:${adminDisTab===t?'#fff':'var(--t3)'};border:.5px solid ${adminDisTab===t?t==='ia'?'#534AB7':'var(--b)':'var(--bor)'}" onclick="adminDisTab='${t}';render()">${l}</span>`).join('')}
    <button style="margin-left:auto;font-size:11px;font-weight:700;background:var(--g);color:#fff;border:none;border-radius:20px;padding:5px 13px;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:4px" onclick="adminNuevaTpl()">
      <i class="ti ti-plus" style="font-size:12px"></i>Nueva
    </button>
  </div>

  ${adminDisTab==='sistema'?`
  <!-- PLANTILLAS DEL SISTEMA — separadas por tipo -->
  <div style="display:flex;gap:6px;margin-bottom:10px">
    <span style="font-size:11px;font-weight:600;padding:4px 11px;border-radius:20px;background:#E6F1FB;color:var(--b);border:.5px solid var(--b)">
      <i class="ti ti-brand-instagram" style="font-size:11px"></i> Post RRSS (${MKT_PLANTILLAS.filter(p=>!p.tipo||p.tipo==='post').length})
    </span>
    <span style="font-size:11px;font-weight:600;padding:4px 11px;border-radius:20px;background:#E1F5EE;color:var(--gdd);border:.5px solid var(--g)">
      <i class="ti ti-book" style="font-size:11px"></i> Catálogo (${(typeof CAT_PLANTILLAS!=='undefined'?CAT_PLANTILLAS:[]).length})
    </span>
  </div>
  <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;margin-bottom:8px">Post para RRSS</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px">
    ${MKT_PLANTILLAS.map((p,i)=>`<div style="border:.5px solid var(--bor);border-radius:var(--r);overflow:hidden;position:relative">
      <div style="height:80px;background:${p.preview};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;position:relative">
        <span style="font-size:24px">${p.ic}</span>
        <span style="font-size:8px;font-weight:700;background:rgba(0,0,0,.35);color:#fff;padding:1px 6px;border-radius:8px">#${i+1}</span>
      </div>
      <div style="padding:6px 8px;background:var(--surf)">
        <p style="font-size:10px;font-weight:700;color:var(--t1);margin-bottom:2px">${p.nm}</p>
        <p style="font-size:9px;color:var(--t3);margin-bottom:5px">${p.desc||''}</p>
        <div style="display:flex;gap:5px">
          <button style="flex:1;font-size:9px;font-weight:600;padding:3px;border-radius:6px;border:.5px solid var(--bor);background:var(--bg);cursor:pointer;font-family:inherit" onclick="adminEditarTpl(${p.id},'mkt')">✏️ Editar</button>
          <button style="width:24px;font-size:9px;border-radius:6px;border:.5px solid var(--bor);background:#FCEBEB;cursor:pointer" onclick="adminEliminarTpl(${p.id},'mkt')">🗑️</button>
        </div>
      </div>
    </div>`).join('')}
  </div>`:`

  <!-- PLANTILLAS PERSONALIZADAS -->
  <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;margin-bottom:10px">Personalizadas (${adminPlantillasStore.length})</p>
  ${adminPlantillasStore.length===0?`
  <div style="border:2px dashed var(--bor);border-radius:var(--r);padding:32px;text-align:center">
    <i class="ti ti-palette" style="font-size:40px;color:var(--bor);display:block;margin-bottom:10px"></i>
    <p style="font-size:13px;font-weight:600;color:var(--t2);margin-bottom:4px">No hay plantillas personalizadas</p>
    <p style="font-size:11px;color:var(--t3);margin-bottom:12px">Creá tu primera plantilla usando el editor visual</p>
    <button style="background:var(--g);color:#fff;border:none;border-radius:var(--rs);padding:9px 18px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit" onclick="adminNuevaTpl()">
      + Crear primera plantilla
    </button>
  </div>`:`
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
    ${adminPlantillasStore.map((p,i)=>`<div style="border:.5px solid var(--bor);border-radius:var(--r);overflow:hidden">
      <div style="height:80px;position:relative;overflow:hidden;background:${p.preview||'#1a1a1a'}">
        ${p.dataUrl?`<img src="${p.dataUrl}" style="width:100%;height:100%;object-fit:cover">`:`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:28px">${p.ic||'⭐'}</div>`}
        <span style="position:absolute;top:4px;right:4px;font-size:8px;font-weight:700;background:${p.activa?'#1D9E75':'#854F0B'};color:#fff;padding:2px 6px;border-radius:8px">${p.activa?'Activa':'Off'}</span>
      </div>
      <div style="padding:6px 8px;background:var(--surf)">
        <p style="font-size:10px;font-weight:700;color:var(--t1);margin-bottom:5px">${p.nm}</p>
        <div style="display:flex;gap:5px">
          <button style="flex:1;font-size:9px;font-weight:600;padding:3px;border-radius:6px;border:.5px solid var(--bor);background:var(--bg);cursor:pointer;font-family:inherit" onclick="adminPlantillasStore[${i}].activa=!adminPlantillasStore[${i}].activa;render()">${p.activa?'Desactivar':'Activar'}</button>
          <button style="width:24px;font-size:9px;border-radius:6px;border:.5px solid var(--bor);background:#FCEBEB;cursor:pointer" onclick="adminEliminarTpl(${p.id},'custom')">🗑️</button>
        </div>
      </div>
    </div>`).join('')}
  </div>`}

  <!-- Cargar imagen como plantilla -->
  <div style="border:2px dashed var(--bor);border-radius:var(--r);padding:20px;text-align:center;cursor:pointer;background:var(--bg);margin-top:14px"
    onclick="imgPick('admin_plantilla_img',1);setTimeout(()=>{const f=IMG_STORE['admin_plantilla_img']?.[0];if(f){adminPlantillasStore.push({id:Date.now(),nm:'Plantilla '+(adminPlantillasStore.length+1),ic:'🖼️',preview:'#1a1a1a',dataUrl:f.dataUrl,activa:true,desc:'Imagen cargada'});IMG_STORE['admin_plantilla_img']=[];showToast('Imagen cargada como plantilla ✓');render();}},1500)">
    <i class="ti ti-photo-up" style="font-size:32px;color:var(--t3);display:block;margin-bottom:8px"></i>
    <p style="font-size:12px;font-weight:600;color:var(--t2);margin-bottom:3px">Cargar imagen PNG/JPG como plantilla</p>
    <p style="font-size:10px;color:var(--t3)">Resolución recomendada: 1080×1080px</p>
  </div>`}

  </div>`;
}

function renderAdminCategorias(){
  if(adminCatTab==='crear'||adminCatTab==='editar') return renderAdminCatForm();

  const isEdit=(adminCatTab==='editar');
  const lista = adminCatFiltroTipo==='all' ? CAT_DIR
    : CAT_DIR.filter(c=>c.tipo===adminCatFiltroTipo);

  const ticosByTipo=(t)=>CAT_DIR.filter(c=>c.tipo===t).length;

  return `<div style="padding:12px">

  <!-- Header stats -->
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px">
    ${[
      ['ti-building-store','Negocios',ticosByTipo('negocio'),'#854F0B','#FAEEDA'],
      ['ti-tools','Profesionales',ticosByTipo('profesional'),'#185FA5','#E6F1FB'],
      ['ti-eye-off','Ocultas',CAT_DIR.filter(c=>!c.activa).length,'#A32D2D','#FCEBEB'],
    ].map(([ic,nm,count,co,bg])=>`<div style="background:${bg};border-radius:var(--r);padding:10px;text-align:center">
      <i class="ti ${ic}" style="font-size:20px;color:${co}"></i>
      <p style="font-size:18px;font-weight:700;color:${co};margin:2px 0">${count}</p>
      <p style="font-size:9px;font-weight:600;color:${co};opacity:.8">${nm}</p>
    </div>`).join('')}
  </div>

  <!-- Filtro tipo + botón crear -->
  <div style="display:flex;gap:6px;margin-bottom:12px;align-items:center">
    ${[['all','Todas'],['negocio','Negocios'],['profesional','Profesionales']].map(([t,l])=>`<span style="font-size:11px;font-weight:600;padding:5px 12px;border-radius:20px;cursor:pointer;background:${adminCatFiltroTipo===t?'var(--b)':'var(--bg)'};color:${adminCatFiltroTipo===t?'#fff':'var(--t3)'};border:.5px solid ${adminCatFiltroTipo===t?'var(--b)':'var(--bor)'}" onclick="adminCatFiltroTipo='${t}';render()">${l}</span>`).join('')}
    <button style="margin-left:auto;background:var(--g);color:#fff;border:none;border-radius:20px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:5px" onclick="adminCatNueva()">
      <i class="ti ti-plus" style="font-size:12px"></i>Nueva
    </button>
  </div>

  <!-- LISTA -->
  <div style="display:flex;flex-direction:column;gap:6px">
    ${lista.map((cat,i)=>`
    <div style="background:var(--surf);border:.5px solid var(--bor);border-radius:var(--r);overflow:hidden;opacity:${cat.activa?1:.55}">
      <div style="display:flex;align-items:center;gap:10px;padding:10px 12px">
        <!-- Ícono -->
        <div style="width:40px;height:40px;border-radius:var(--rs);background:${cat.tipo==='negocio'?'#FAEEDA':'#E6F1FB'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <i class="ti ${cat.ic}" style="font-size:20px;color:${cat.tipo==='negocio'?'#854F0B':'#185FA5'}"></i>
        </div>
        <!-- Info -->
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px">
            <p style="font-size:13px;font-weight:700;color:var(--t1)">${cat.emoji||''} ${cat.nm}</p>
            <span style="font-size:9px;font-weight:600;padding:2px 7px;border-radius:8px;background:${cat.tipo==='negocio'?'#FAEEDA':'#E6F1FB'};color:${cat.tipo==='negocio'?'#854F0B':'#185FA5'}">${cat.tipo==='negocio'?'Negocio':'Profesional'}</span>
            ${!cat.activa?'<span style="font-size:9px;font-weight:600;padding:2px 7px;border-radius:8px;background:#FCEBEB;color:#A32D2D">Oculta</span>':''}
          </div>
          <p style="font-size:10px;color:var(--t3)">${(cat.subs||[]).slice(0,3).join(' · ')}${(cat.subs||[]).length>3?' +'+((cat.subs||[]).length-3)+' más':''}</p>
        </div>
        <!-- Orden -->
        <div style="display:flex;flex-direction:column;gap:2px">
          <button style="width:20px;height:18px;border:none;background:var(--bg);border-radius:4px;cursor:pointer;font-size:10px" onclick="adminCatOrdenar('${cat.id}','up')">↑</button>
          <button style="width:20px;height:18px;border:none;background:var(--bg);border-radius:4px;cursor:pointer;font-size:10px" onclick="adminCatOrdenar('${cat.id}','down')">↓</button>
        </div>
      </div>
      <!-- Acciones -->
      <div style="display:flex;border-top:.5px solid var(--bor)">
        <button style="flex:1;padding:7px;font-size:10px;font-weight:600;color:var(--t2);background:transparent;border:none;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:4px" onclick="adminCatEditar('${cat.id}')">
          <i class="ti ti-edit" style="font-size:12px"></i>Editar
        </button>
        <div style="width:.5px;background:var(--bor)"></div>
        <button style="flex:1;padding:7px;font-size:10px;font-weight:600;color:${cat.activa?'#854F0B':'var(--g)'};background:transparent;border:none;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:4px" onclick="adminCatToggle('${cat.id}')">
          <i class="ti ti-eye${cat.activa?'-off':''}" style="font-size:12px"></i>${cat.activa?'Ocultar':'Mostrar'}
        </button>
        <div style="width:.5px;background:var(--bor)"></div>
        <button style="flex:1;padding:7px;font-size:10px;font-weight:600;color:#A32D2D;background:transparent;border:none;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:4px" onclick="adminCatEliminar('${cat.id}')">
          <i class="ti ti-trash" style="font-size:12px"></i>Eliminar
        </button>
      </div>
    </div>`).join('')}
  </div>
  ${lista.length===0?`<div style="padding:30px;text-align:center"><i class="ti ti-category" style="font-size:36px;color:var(--bor)"></i><p style="font-size:13px;color:var(--t3);margin-top:8px">No hay categorías en este filtro</p></div>`:''}
  </div>`;
}

function setAdminTab(t){ adminTab=t; adminDetail=null; MOD='admin'; render(); rebuildNav(); }

function setAdminCanton(i){ adminCanton=i; render(); }
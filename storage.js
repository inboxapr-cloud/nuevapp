/**
 * marketing — MiCantón.cr
 * Extraído del monolito micanton_v2.html
 * En v3: conectar a Firebase donde aplique
 */
// Nota: estas funciones usan variables globales de window.*
// Al migrar a Firebase, reemplazar con imports de ../state.js

function renderMarketing(){
  const st = mktStudio;
  const fmt = MKT_FORMATOS.find(f=>f.id===st.formato)||MKT_FORMATOS[0];
  const canvasH = st.formato==='historia' ? 420 : st.formato==='portrait' ? 350 : 300;

  return `
  <!-- HEADER TAB -->
  <div style="background:linear-gradient(135deg,#0a1628,#1a2d4a);padding:12px 14px;display:flex;align-items:center;justify-content:space-between">
    <div>
      <p style="font-size:14px;font-weight:700;color:#fff;margin-bottom:1px">✨ Creative Studio</p>
      <p style="font-size:10px;color:rgba(255,255,255,.6)">Diseños con IA · ${AC.nm}</p>
    </div>
    <div style="display:flex;gap:6px">
      ${['diseno','copy','descargar'].map(t=>`<button onclick="mktStudio.tab='${t}';render()" style="font-size:10px;font-weight:700;padding:5px 10px;border-radius:12px;border:none;cursor:pointer;background:${st.tab===t?'rgba(255,255,255,.25)':'rgba(255,255,255,.08)'};color:#fff">${t==='diseno'?'🎨 Diseño':t==='copy'?'✍️ Copy':'⬇️ Descargar'}</button>`).join('')}
    </div>
  </div>

  <!-- CANVAS PREVIEW -->
  <div style="background:#1a1a1a;padding:12px;display:flex;justify-content:center;align-items:center;min-height:${canvasH}px;position:relative">
    ${st.loading?`
    <div style="text-align:center">
      <div style="width:48px;height:48px;border-radius:50%;border:3px solid rgba(255,255,255,.1);border-top-color:#1D9E75;margin:0 auto 12px;animation:spin 1s linear infinite"></div>
      <p style="color:rgba(255,255,255,.6);font-size:12px;font-weight:600">Diseñando con IA...</p>
    </div>`:`
    <canvas id="mktCanvas" style="max-width:100%;max-height:${canvasH}px;box-shadow:0 20px 60px rgba(0,0,0,.5);border-radius:4px;display:block"></canvas>`}
  </div>

  <!-- TAB: DISEÑO ──────────────── -->
  ${st.tab==='diseno'?`
  <div style="padding:12px;display:flex;flex-direction:column;gap:10px">

    <!-- Formato -->
    <div>
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">Formato</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">
        ${MKT_FORMATOS.map(f=>`<div onclick="mktStudio.formato='${f.id}';mktDibujarCanvas()" style="padding:8px 4px;border-radius:var(--rs);border:${st.formato===f.id?'2px solid var(--b)':'.5px solid var(--bor)'};background:${st.formato===f.id?'#E6F1FB':'var(--surf)'};text-align:center;cursor:pointer">
          <i class="ti ${f.ic}" style="font-size:18px;color:${st.formato===f.id?'var(--b)':'var(--t3)'}"></i>
          <p style="font-size:9px;font-weight:700;color:${st.formato===f.id?'var(--b)':'var(--t2)'};margin-top:3px">${f.nm}</p>
        </div>`).join('')}
      </div>
    </div>

    <!-- Estilo -->
    <div>
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:5px">Estilo de plantilla</p>
      <select style="width:100%;font-size:12px;padding:9px 11px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t1);outline:none;font-family:inherit"
        onchange="mktStudio.estilo=this.value">
        ${MKT_ESTILOS.map((e,i)=>`<option value="${e}" ${st.estilo===e?'selected':''}>${i+1}. ${e}</option>`).join('')}
      </select>
    </div>

    <!-- Tono -->
    <div>
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:5px">Tono del copy</p>
      <div style="display:flex;gap:5px;flex-wrap:wrap">
        ${MKT_TONOS.map(t=>`<span onclick="mktStudio.tono='${t}'" style="font-size:11px;font-weight:600;padding:5px 10px;border-radius:20px;cursor:pointer;border:${st.tono===t?'2px solid var(--b)':'.5px solid var(--bor)'};background:${st.tono===t?'#E6F1FB':'var(--surf)'};color:${st.tono===t?'var(--b)':'var(--t3)'}">${t}</span>`).join('')}
      </div>
    </div>

    <!-- Elementos visibles -->
    <div>
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:5px">Mostrar elementos</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
        ${[['showTitulo','Título','ti-heading'],['showPrecio','Precio','ti-currency-dollar'],['showNombre','Nombre','ti-tag'],['showDesc','Descripción','ti-align-left']].map(([k,l,ic])=>`<div onclick="mktStudio['${k}']=!mktStudio['${k}'];mktDibujarCanvas()" style="display:flex;align-items:center;gap:7px;padding:8px 10px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--surf);cursor:pointer">
          <div style="width:26px;height:14px;border-radius:7px;background:${st[k]?'var(--g)':'#ccc'};position:relative;flex-shrink:0">
            <div style="width:10px;height:10px;background:#fff;border-radius:50%;position:absolute;top:2px;${st[k]?'right:2px':'left:2px'}"></div>
          </div>
          <i class="ti ${ic}" style="font-size:12px;color:${st[k]?'var(--g)':'var(--t3)'}"></i>
          <span style="font-size:11px;font-weight:600;color:${st[k]?'var(--gdd)':'var(--t3)'}">${l}</span>
        </div>`).join('')}
      </div>
    </div>

    <!-- Productos del catálogo -->
    <div>
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:5px">Productos del catálogo <span style="background:#E6F1FB;color:var(--b);font-size:9px;font-weight:700;padding:1px 6px;border-radius:8px;margin-left:4px">hasta 4</span></p>
      <div style="display:flex;flex-direction:column;gap:4px;max-height:180px;overflow-y:auto">
        ${(catalogItems||[]).filter(i=>i.activo).map(p=>`
        <div onclick="mktToggleProd(${p.id})" style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:var(--rs);border:${st.prodsSel.includes(p.id)?'2px solid var(--b)':'.5px solid var(--bor)'};background:${st.prodsSel.includes(p.id)?'#E6F1FB':'var(--surf)'};cursor:pointer">
          <div style="width:18px;height:18px;border-radius:50%;border:2px solid ${st.prodsSel.includes(p.id)?'var(--b)':'var(--bor)'};background:${st.prodsSel.includes(p.id)?'var(--b)':'transparent'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
            ${st.prodsSel.includes(p.id)?'<i class="ti ti-check" style="font-size:10px;color:#fff"></i>':''}
          </div>
          <div style="flex:1;min-width:0">
            <p style="font-size:12px;font-weight:${st.prodsSel.includes(p.id)?700:600};color:${st.prodsSel.includes(p.id)?'var(--b)':'var(--t1)'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.nm}</p>
            <p style="font-size:10px;color:var(--t3)">${p.cat} · ${p.pr}</p>
          </div>
          ${st.prodsSel.includes(p.id)?'<i class="ti ti-check-circle" style="font-size:14px;color:var(--b);flex-shrink:0"></i>':''}
        </div>`).join('')}
        ${!(catalogItems||[]).filter(i=>i.activo).length?'<p style="font-size:11px;color:var(--t3);padding:8px;text-align:center">No hay productos activos en el catálogo</p>':''}
      </div>
      ${st.prodsSel.length?`<p style="font-size:10px;color:var(--b);font-weight:600;margin-top:4px">${st.prodsSel.length} producto${st.prodsSel.length!==1?'s':''} seleccionado${st.prodsSel.length!==1?'s':''}</p>`:''}
    </div>

    <!-- Foto del producto -->
    <div>
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:5px">Foto del producto</p>
      <label style="display:flex;align-items:center;gap:10px;padding:12px;border:2px dashed var(--bor);border-radius:var(--rs);cursor:pointer;background:var(--bg)">
        <i class="ti ti-photo-up" style="font-size:22px;color:var(--t3)"></i>
        <div>
          <p style="font-size:12px;font-weight:600;color:var(--t2)">${st.userImg?'✓ Foto cargada — Toca para cambiar':'Subir foto del producto'}</p>
          <p style="font-size:10px;color:var(--t3)">JPG, PNG, WebP</p>
        </div>
        <input type="file" accept="image/*" style="display:none" onchange="mktHandleImg(event)">
      </label>
    </div>

    <!-- Prompt -->
    <div>
      <p style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:5px">¿Qué anunciamos?</p>
      <textarea style="width:100%;font-size:12px;padding:10px 11px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t1);outline:none;resize:vertical;min-height:80px;font-family:inherit;box-sizing:border-box"
        placeholder="Ej: Venta de pizza artesanal en San Ramón, 2x1 este viernes. El negocio se llama Pizza Moncho..."
        oninput="mktStudio.prompt=this.value">${st.prompt}</textarea>
    </div>

    <!-- Botón generar -->
    <button onclick="mktGenerarConIA()" style="width:100%;padding:14px;border-radius:var(--rs);border:none;background:linear-gradient(135deg,#0a1628,#1a3a6a);color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:8px">
      <i class="ti ti-sparkles" style="font-size:16px"></i>
      ${st.loading?'Generando...':'Generar diseño y copy con IA'}
    </button>

  </div>`

  // TAB: COPY ───────────────────
  :st.tab==='copy'?`
  <div style="padding:12px">
    ${st.copy?`
    <div style="background:var(--surf);border-left:4px solid var(--b);border-radius:var(--rs);padding:13px;margin-bottom:10px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <p style="font-size:12px;font-weight:700;color:var(--t1)">✍️ Copy generado por IA</p>
        <button onclick="mktCopiarTexto()" style="font-size:10px;font-weight:700;padding:5px 12px;border-radius:20px;border:none;background:var(--b);color:#fff;cursor:pointer;font-family:inherit">Copiar</button>
      </div>
      <pre style="font-size:12px;color:var(--t1);line-height:1.7;white-space:pre-wrap;font-family:inherit;margin:0">${st.copy}</pre>
    </div>
    <button onclick="mktGenerarConIA()" style="width:100%;padding:12px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t1);font-size:12px;font-weight:600;cursor:pointer;font-family:inherit">
      ↺ Regenerar
    </button>`:`
    <div style="padding:40px 20px;text-align:center">
      <i class="ti ti-pencil" style="font-size:36px;color:var(--bor);display:block;margin-bottom:10px"></i>
      <p style="font-size:13px;font-weight:600;color:var(--t2);margin-bottom:4px">Aún no hay copy generado</p>
      <p style="font-size:11px;color:var(--t3)">Completá el formulario y tocá "Generar"</p>
    </div>`}
  </div>`

  // TAB: DESCARGAR ─────────────
  :`
  <div style="padding:12px;display:flex;flex-direction:column;gap:10px">
    <div style="background:var(--surf);border-radius:var(--r);padding:14px">
      <p style="font-size:12px;font-weight:700;color:var(--t1);margin-bottom:8px">Descargar imagen</p>
      <div style="display:flex;gap:8px">
        <button onclick="mktDescargar()" style="flex:1;padding:12px;border-radius:var(--rs);border:none;background:var(--g);color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px">
          <i class="ti ti-download" style="font-size:14px"></i>Descargar PNG
        </button>
        <button onclick="mktDescargar()" style="flex:1;padding:12px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--bg);color:var(--t1);font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px">
          <i class="ti ti-brand-instagram" style="font-size:14px"></i>Para Instagram
        </button>
      </div>
    </div>
    ${st.copy?`
    <div style="background:var(--surf);border-radius:var(--r);padding:14px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <p style="font-size:12px;font-weight:700;color:var(--t1)">Copy listo para pegar</p>
        <button onclick="mktCopiarTexto()" style="font-size:10px;font-weight:700;padding:4px 10px;border-radius:20px;border:none;background:var(--b);color:#fff;cursor:pointer;font-family:inherit">Copiar</button>
      </div>
      <pre style="font-size:11px;color:var(--t3);line-height:1.6;white-space:pre-wrap;font-family:inherit;margin:0;max-height:200px;overflow-y:auto">${st.copy}</pre>
    </div>`:''}
    <div style="background:#E1F5EE;border-radius:var(--rs);padding:11px 13px;display:flex;gap:8px;align-items:flex-start">
      <i class="ti ti-info-circle" style="font-size:14px;color:var(--g);flex-shrink:0;margin-top:1px"></i>
      <p style="font-size:11px;color:var(--gdd);line-height:1.5">Formato 1080×1080px a 72dpi · Para mayor calidad abrí en Canva e importá como imagen base.</p>
    </div>
  </div>`}
  `;
}

async function mktToggleProd(id){
  const idx=mktStudio.prodsSel.indexOf(id);
  if(idx>=0) mktStudio.prodsSel.splice(idx,1);
  else if(mktStudio.prodsSel.length<4) mktStudio.prodsSel.push(id);
  else { showToast('Máximo 4 productos'); return; }
  render();
  setTimeout(mktDibujarCanvas,80);
}

async function mktGenerarConIA(){
  const st = mktStudio;
  if(!st.prompt.trim()){ showToast('Describí qué querés anunciar'); return; }
  st.loading=true; st.aiData=null; st.copy='';
  render();

  const system = `Sos un Director de Arte y Copywriter experto en marketing digital para negocios locales de Costa Rica.
Analizá la idea con el ESTILO "${st.estilo}" y TONO "${st.tono}".
Respondé SOLO con JSON válido sin markdown ni bloques de código, con esta estructura exacta:
{"visual":{"titulo":"MAX 3 PALABRAS MAYÚSCULAS","producto":"nombre producto","precio":"₡0.000","desc":"desc corta max 8 palabras","bg":"#hexcolor","tx":"#hexcolor","ac":"#hexcolor"},"copy":{"encabezado":"titular impactante","principal":"párrafo 2-3 oraciones","beneficios":["B1","B2","B3"],"cta":"llamado a acción","datos":"horario o contacto","hashtags":"#micanton #canton"}}`;

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 800,
        system: system,
        messages: [{ role: 'user', content: 'Negocio: ' + st.prompt + ' | Cantón: ' + (AC?.nm||'Alajuela') }]
      })
    });
    const data = await resp.json();
    const rawText = data?.content?.[0]?.text || '{}';
    const clean = rawText.replace(/```json\n?/g,'').replace(/```\n?/g,'').trim();
    st.aiData = JSON.parse(clean);

    const c = st.aiData.copy;
    st.copy = `${c.encabezado}\n\n${c.principal}\n\n${c.beneficios.map(b=>'✅ '+b).join('\n')}\n\n👉 ${c.cta}\n\n📍 ${c.datos}\n\n${c.hashtags}`;
    st.tab = 'copy';
    showToast('¡Diseño y copy generados ✓');
  } catch(err){
    console.error('mktGenerarConIA error:', err);
    showToast('Error generando · Verificá la conexión');
  } finally {
    st.loading = false;
    render();
    setTimeout(mktDibujarCanvas, 200);
  }
}

function mktDibujarCanvas(){
  const canvas = document.getElementById('mktCanvas');
  if(!canvas) return;
  const st = mktStudio;
  const fmt = MKT_FORMATOS.find(f=>f.id===st.formato)||MKT_FORMATOS[0];
  canvas.width = fmt.w; canvas.height = fmt.h;

  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  // Tomar primer producto seleccionado para enriquecer defaults
  const primerProd = st.prodsSel.length
    ? (typeof catalogItems!=='undefined'?catalogItems:[]).find(p=>p.id===st.prodsSel[0])
    : null;
  const d = st.aiData?.visual || {
    bg:'#1a1a1a', tx:'#ffffff', ac:'#1D9E75',
    titulo: primerProd ? (primerProd.cat||'PRODUCTO').toUpperCase() : 'TÍTULO',
    producto: primerProd?.nm || 'Producto',
    precio: primerProd?.pr || '₡0.000',
    desc: primerProd?.desc?.substring(0,40) || 'Descripción del producto',
  };

  // ── FONDO ──
  const grd = ctx.createLinearGradient(0,0,W,H);
  grd.addColorStop(0, d.bg);
  grd.addColorStop(1, _mktShade(d.bg, -30));
  ctx.fillStyle = grd;
  ctx.fillRect(0,0,W,H);

  // ── ELEMENTOS DECORATIVOS ──
  ctx.fillStyle = d.ac;
  ctx.globalAlpha = 0.18;
  ctx.beginPath(); ctx.arc(W*1.1, H*0.1, W*0.55, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(-W*0.1, H*0.85, W*0.35, 0, Math.PI*2); ctx.fill();
  ctx.globalAlpha = 0.07;
  ctx.fillRect(0, H*0.45, W, 4);
  ctx.globalAlpha = 1;

  // ── IMAGEN USUARIO O PRODUCTOS DEL CATÁLOGO ──
  const selProds = st.prodsSel.length
    ? (typeof catalogItems!=='undefined'?catalogItems:[]).filter(p=>st.prodsSel.includes(p.id))
    : [];

  if(st.userImg && !selProds.length){
    // Foto subida manualmente
    const img=st.userImg;
    const maxW=W*.85, maxH=H*.45;
    const scale=Math.min(maxW/img.width,maxH/img.height);
    const iw=img.width*scale, ih=img.height*scale;
    ctx.shadowColor='rgba(0,0,0,0.4)'; ctx.shadowBlur=40;
    ctx.drawImage(img,(W-iw)/2,H*.28,iw,ih);
    ctx.shadowBlur=0;
  } else if(selProds.length===1){
    // Un producto — hero grande
    _mktFotoHero(ctx,selProds[0],W*.08,H*.26,W*.84,H*.44,{foto:true,nombre:true,precio:true},{fondo1:d.bg,acento:d.ac,texto:d.tx},false);
  } else if(selProds.length>=2){
    // Múltiples productos — grilla
    const cols=selProds.length<=2?2:2;
    const rows=Math.ceil(selProds.length/cols);
    const pad=8, gx=W*.05, gy=H*.26;
    const cw=(W*.9-pad*(cols-1))/cols;
    const ch=Math.min((H*.44-pad*(rows-1))/rows, H*.22);
    selProds.forEach((p,i)=>{
      const col=i%cols, row=Math.floor(i/cols);
      const x=gx+col*(cw+pad), y=gy+row*(ch+pad);
      _mktFotoHero(ctx,p,x,y,cw,ch,{foto:true,nombre:true,precio:true},{fondo1:d.bg,acento:d.ac,texto:d.tx},true);
    });
  }

  // ── TEXTOS ──
  ctx.textAlign = 'center';

  // Título
  if(st.showTitulo){
    const fs = Math.round(W*0.075);
    ctx.font = `900 ${fs}px system-ui,sans-serif`;
    ctx.fillStyle = d.tx;
    ctx.globalAlpha = 1;
    ctx.fillText((d.titulo||'TÍTULO').toUpperCase().substring(0,20), W/2, H*0.14);
  }

  // Precio (destacado)
  if(st.showPrecio && d.precio){
    const fs = Math.round(W*0.095);
    ctx.font = `900 ${fs}px system-ui,sans-serif`;
    ctx.fillStyle = d.ac;
    // Badge redondeado
    const pw = ctx.measureText(d.precio).width + W*0.06;
    const ph = fs*1.3, px = (W-pw)/2, py = H*0.85 - ph*0.75;
    ctx.fillStyle = d.ac; ctx.globalAlpha = 0.15;
    _mktRoundRect(ctx, px, py, pw, ph, ph/2); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = d.ac;
    ctx.font = `900 ${fs}px system-ui,sans-serif`;
    ctx.fillText(d.precio, W/2, H*0.85);
  }

  // Nombre producto
  if(st.showNombre && d.producto){
    const fs = Math.round(W*0.055);
    ctx.font = `700 ${fs}px system-ui,sans-serif`;
    ctx.fillStyle = d.tx;
    ctx.globalAlpha = 0.95;
    ctx.fillText((d.producto||'').substring(0,30), W/2, H*0.78);
    ctx.globalAlpha = 1;
  }

  // Descripción
  if(st.showDesc && d.desc){
    const fs = Math.round(W*0.033);
    ctx.font = `400 ${fs}px system-ui,sans-serif`;
    ctx.fillStyle = d.tx;
    ctx.globalAlpha = 0.65;
    ctx.fillText((d.desc||'').substring(0,45), W/2, H*0.92);
    ctx.globalAlpha = 1;
  }

  // Branding fijo
  ctx.font = `600 ${Math.round(W*0.022)}px system-ui,sans-serif`;
  ctx.fillStyle = d.tx; ctx.globalAlpha = 0.28;
  ctx.fillText('MiCantón.cr · '+AC.nm, W/2, H - Math.round(H*0.022));
  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
}

function mktHandleImg(e){
  const file = e.target.files?.[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => { mktStudio.userImg=img; mktDibujarCanvas(); showToast('Imagen cargada ✓'); };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function mktDescargar(){
  const canvas = document.getElementById('mktCanvas'); if(!canvas) return;
  const a = document.createElement('a');
  a.download = `micanton-creativo-${Date.now()}.png`;
  a.href = canvas.toDataURL('image/png');
  a.click();
  showToast('Imagen descargada ✓');
}

function mktCopiarTexto(){
  const txt = mktStudio.copy;
  if(!txt){ showToast('Primero generá el copy'); return; }
  if(navigator.clipboard) navigator.clipboard.writeText(txt).then(()=>showToast('Copy copiado ✓'));
  else showToast('No se pudo copiar');
}

function dibujarCatalogoCanvas(){
  const canvas=G('catPreviewCanvas'); if(!canvas) return;
  const ctx=canvas.getContext('2d');
  const W=canvas.width, H=canvas.height;
  ctx.clearRect(0,0,W,H);
  const items=(catalogItems||[]).filter(i=>i.activo).slice(0,12);
  const hc=catHeaderColor||'#085041', tc=catTextColor||'#fff';
  const nm=G('catBizNm')?.value||'El Mirador';
  const sub=G('catBizSub')?.value||'Gastronomía · Alajuela';
  const titulo=G('catTitulo')?.value||catTituloTexto||nm;
  const badge=G('catBadge')?.value||catBadgeTexto||'';
  const footer=G('catFooter')?.value||catFooterTexto||'micanton.cr';
  const opts={foto:catShowFoto,precio:catShowPrecio,desc:catShowDesc,header:catShowHeader};
  const texts={titulo,badge,footer,nm,sub};
  switch(catActiveTpl){
    case 1:_catMenuEspecial(ctx,W,H,items,hc,tc,nm,sub,opts,texts);break;
    case 2:_catFlyerOferta(ctx,W,H,items,hc,tc,nm,sub,opts,texts);break;
    case 3:_catMenuLimpio(ctx,W,H,items,hc,tc,nm,sub,opts,texts);break;
    case 4:_catCartaRestaurante(ctx,W,H,items,hc,tc,nm,sub,opts,texts);break;
    case 5:_catSuperSaleVerde(ctx,W,H,items,hc,tc,nm,sub,opts,texts);break;
    case 6:_catSupermercado(ctx,W,H,items,hc,tc,nm,sub,opts,texts);break;
    case 7:_catSaleAmarillo(ctx,W,H,items,hc,tc,nm,sub,opts,texts);break;
    case 8:_catFreshHero(ctx,W,H,items,hc,tc,nm,sub,opts,texts);break;
    default:_catMenuEspecial(ctx,W,H,items,hc,tc,nm,sub,opts,texts);
  }
}

function generarPDFDesdeCanvas(){
  const nm = (document.getElementById('catBizNm')?.value)||'El Mirador';

  // Crear canvas de alta resolución (3× = ~300dpi para A4)
  const hqCanvas = document.createElement('canvas');
  hqCanvas.width  = 1240; // ~A4 portrait a 150dpi aprox
  hqCanvas.height = 1754;
  const ctx = hqCanvas.getContext('2d');

  const hc    = catHeaderColor||'#085041';
  const tc    = catTextColor||'#fff';
  const sub   = (document.getElementById('catBizSub')?.value)||'Gastronomía · Alajuela';
  const titulo  = (document.getElementById('catTitulo')?.value)||catTituloTexto||nm;
  const badge   = (document.getElementById('catBadge')?.value)||catBadgeTexto||'';
  const footer  = (document.getElementById('catFooter')?.value)||catFooterTexto||'micanton.cr';
  const items = catalogItems.filter(i=>i.activo).slice(0,12);
  const opts  = {foto:catShowFoto, precio:catShowPrecio, desc:catShowDesc, header:catShowHeader};
  const texts = {titulo, badge, footer, nm, sub};

  ctx.clearRect(0,0,hqCanvas.width,hqCanvas.height);
  switch(catActiveTpl){
    case 1: _catMenuEspecial(ctx,hqCanvas.width,hqCanvas.height,items,hc,tc,nm,sub,opts,texts); break;
    case 2: _catFlyerOferta(ctx,hqCanvas.width,hqCanvas.height,items,hc,tc,nm,sub,opts,texts); break;
    case 3: _catMenuLimpio(ctx,hqCanvas.width,hqCanvas.height,items,hc,tc,nm,sub,opts,texts); break;
    case 4: _catCartaRestaurante(ctx,hqCanvas.width,hqCanvas.height,items,hc,tc,nm,sub,opts,texts); break;
    case 5: _catSuperSaleVerde(ctx,hqCanvas.width,hqCanvas.height,items,hc,tc,nm,sub,opts,texts); break;
    case 6: _catSupermercado(ctx,hqCanvas.width,hqCanvas.height,items,hc,tc,nm,sub,opts,texts); break;
    case 7: _catSaleAmarillo(ctx,hqCanvas.width,hqCanvas.height,items,hc,tc,nm,sub,opts,texts); break;
    case 8: _catFreshHero(ctx,hqCanvas.width,hqCanvas.height,items,hc,tc,nm,sub,opts,texts); break;
    default: _catMenuEspecial(ctx,hqCanvas.width,hqCanvas.height,items,hc,tc,nm,sub,opts,texts);
  }

  // Esperar que las imágenes async carguen (~400ms) luego descargar
  setTimeout(()=>{
    try {
      const {jsPDF} = window.jspdf||{};
      if(jsPDF){
        const imgData = hqCanvas.toDataURL('image/jpeg',0.95);
      // Calcular proporciones para A4 (210×297mm)
      const ratio = canvas.height/canvas.width;
      const pdfW = 190; // margen 10mm cada lado
      const pdfH = Math.round(pdfW*ratio);
      // A4: 210×297mm
      const doc = new jsPDF({orientation:'portrait', unit:'mm', format:'a4'});
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const pdfW2 = pageW - 10; // 5mm margen cada lado
      const ratio2 = hqCanvas.height/hqCanvas.width;
      const pdfH2 = Math.min(pdfW2*ratio2, pageH-10);
      const x = (pageW-pdfW2)/2;
      const y = (pageH-pdfH2)/2;
      doc.addImage(imgData,'JPEG',x,y,pdfW2,pdfH2,'','FAST');
      doc.setTextColor(160,160,160); doc.setFontSize(6);
      doc.text('Generado con MiCantón.cr · '+new Date().toLocaleDateString('es-CR'),10,pageH-3);
      doc.save('catalogo-'+nm.replace(/\s+/g,'-').toLowerCase()+'.pdf');
      showToast('PDF de alta calidad descargado ✓');
      return;
    }
  } catch(e){ console.error('PDF error:',e); }

  // Fallback: ventana imprimible con imagen HQ
  const imgData = hqCanvas.toDataURL('image/jpeg',0.95);
  const w = window.open('','_blank');
  if(!w){ showToast('Activá los pop-ups del navegador'); return; }
  const wpdf = window.open('','_blank');
  if(!wpdf){ showToast('Activá los pop-ups'); return; }
  wpdf.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Catálogo · ${nm}</title>
  <style>*{margin:0;padding:0;box-sizing:border-box}body{background:#e8e8e8;display:flex;flex-direction:column;align-items:center;padding:20px;font-family:system-ui,sans-serif}.card{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.15);max-width:600px;width:100%;margin-bottom:16px}img{width:100%;display:block}.bar{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}.btn{padding:10px 22px;border-radius:8px;border:none;cursor:pointer;font-size:13px;font-weight:700;font-family:inherit}.g{background:#085041;color:#fff}.b{background:#185FA5;color:#fff}.tip{font-size:11px;color:#999;text-align:center;margin-top:10px}@media print{.bar,.tip{display:none}body{background:#fff;padding:0}.card{box-shadow:none;border-radius:0}}</style></head><body>
  <div class="bar" style="margin-bottom:16px">
    <button class="btn g" onclick="window.print()">🖨 Imprimir / Guardar PDF</button>
    <button class="btn b" onclick="const a=document.createElement('a');a.download='catalogo-${nm.replace(/'/g,'')}.jpg';a.href=document.querySelector('img').src;a.click()">📥 Descargar imagen</button>
  </div>
  <div class="card"><img src="${imgData}" alt="Catálogo ${nm}"></div>
  <p class="tip">Imprimir → "Guardar como PDF" → Sin márgenes → Ajustar a página</p>
  </body></html>`);
  w.document.close();
  showToast('PDF listo · Usá Ctrl+P para guardar ✓');
  }, 450); // esperar imágenes async del canvas
}
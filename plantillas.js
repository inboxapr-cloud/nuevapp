/**
 * PROS — Profesionales independientes del cantón
 * En v3: se carga desde Firestore (colección /profesionales)
 */
export const PROS=[
  {id:1,in:'CR',bg:'#E6F1FB',co:'#185FA5',nm:'Carlos Rodríguez',tel:'8888-1001',wa:'50688881001',of:'Fontanero certificado',rt:4.9,rv:47,zona:'Cantón central',disp:true,prem:true,nw:false,desc:'Fontanero con 12 años de experiencia. Trabajo garantizado por escrito.',svcs:[{n:'Reparación tuberías',p:'Desde ₡15.000'},{n:'Instalación grifos',p:'Desde ₡8.000'},{n:'Corrección filtraciones',p:'Desde ₡20.000'},{n:'Instalación sanitarios',p:'Desde ₡25.000'}],revs:[{av:'MV',bg:'#E1F5EE',co:'#0F6E56',nm:'María V.',st:5,dt:'Hace 3 días',tx:'Excelente trabajo. Llegó puntual y dejó todo limpio.'},{av:'JP',bg:'#EEEDFE',co:'#534AB7',nm:'Juan P.',st:5,dt:'Hace 1 semana',tx:'Muy profesional. Precio justo y buen trabajo.'}]},
  {id:2,in:'LM',bg:'#EAF3DE',co:'#3B6D11',nm:'Laura Méndez',of:'Doméstica y aseo del hogar',rt:4.8,rv:89,zona:'Alajuela, San Ramón, Grecia',disp:true,prem:false,nw:false,desc:'Servicio de limpieza, plancha y orden. Referencias disponibles.',svcs:[{n:'Limpieza general',p:'₡35.000/día'},{n:'Limpieza profunda',p:'₡50.000'},{n:'Plancha y orden',p:'₡20.000'},{n:'Contrato mensual',p:'Desde ₡180.000'}],revs:[{av:'SR',bg:'#FCEBEB',co:'#A32D2D',nm:'Sandra R.',st:5,dt:'Hace 2 días',tx:'Increíble. Deja la casa impecable. La tenemos fija.'}]},
  {id:3,in:'RP',bg:'#E1F5EE',co:'#0F6E56',nm:'Roberto Pérez',of:'Jardinero y mantenimiento',rt:4.7,rv:34,zona:'Todo el cantón',disp:true,prem:false,nw:true,desc:'Jardinería residencial y comercial. Herramientas propias.',svcs:[{n:'Corte de césped',p:'Desde ₡12.000'},{n:'Poda de árboles',p:'Desde ₡20.000'},{n:'Jardín ornamental',p:'Cotización'},{n:'Mantenimiento mensual',p:'Desde ₡45.000'}],revs:[{av:'PV',bg:'#FAEEDA',co:'#854F0B',nm:'Patricia V.',st:5,dt:'Hace 4 días',tx:'Roberto transformó mi jardín. Muy creativo y trabajador.'}]},
  {id:4,in:'AM',bg:'#FCEBEB',co:'#A32D2D',nm:'Alejandro Mora',of:'Electricista certificado CFIA',rt:4.6,rv:28,zona:'Cantón central',disp:false,prem:true,nw:false,desc:'Instalaciones residenciales y comerciales. Trabajo garantizado.',svcs:[{n:'Revisión eléctrica',p:'Desde ₡18.000'},{n:'Instalación tablero',p:'Cotización'},{n:'Corrección averías',p:'Desde ₡15.000'},{n:'Luminarias',p:'Desde ₡8.000'}],revs:[{av:'CV',bg:'#E6F1FB',co:'#185FA5',nm:'Carmen V.',st:5,dt:'Hace 1 semana',tx:'Muy profesional. Resolvió el problema rápido.'}]},
  {id:5,in:'MV',bg:'#EEEDFE',co:'#534AB7',nm:'Marta Vargas',of:'Pintora interior/exterior',rt:4.8,rv:19,zona:'Alajuela y alrededores',disp:true,prem:false,nw:true,desc:'Pintura interior y exterior. Trabajo prolijo a tiempo.',svcs:[{n:'Pintura interior',p:'Desde ₡8.000/m²'},{n:'Pintura exterior',p:'Cotización'},{n:'Estuco y textura',p:'Desde ₡12.000/m²'},{n:'Pintura rejas',p:'Desde ₡5.000'}],revs:[{av:'FB',bg:'#E1F5EE',co:'#0F6E56',nm:'Felipe B.',st:5,dt:'Hace 3 días',tx:'Pintó toda la casa en tiempo récord. Excelente trabajo.'}]},
,
  {id:10,in:'AM',bg:'#EEEDFE',co:'#534AB7',nm:'Ana Monge',tel:'8888-1002',wa:'50688881002',
   of:'Diseñadora gráfica · Branding',rt:4.8,rv:31,zona:'Cantón central',disp:true,prem:false,nw:true,
   desc:'Diseñadora con 8 años de experiencia en branding, redes sociales y material impreso.',
   catalogType:'servicios',
   items:[
     {id:'s1',nm:'Logo profesional',desc:'3 propuestas, 2 revisiones, archivos AI y PNG.',pr:'₡45.000',prNum:45000,cat:'Branding',sub:'Identidad visual',img:null,activo:true,popular:true},
     {id:'s2',nm:'Pack posts RRSS',desc:'5 publicaciones optimizadas para Instagram y Facebook.',pr:'₡18.000',prNum:18000,cat:'Redes Sociales',sub:'Posts',img:null,activo:true,popular:true},
     {id:'s3',nm:'Flyer digital A4',desc:'Diseño para eventos o productos. 1 revisión incluida.',pr:'₡8.500',prNum:8500,cat:'Material impreso',sub:'Flyers',img:null,activo:true,popular:false},
     {id:'s4',nm:'Tarjeta de presentación',desc:'Diseño 2 caras. Archivo listo para imprenta.',pr:'₡6.000',prNum:6000,cat:'Material impreso',sub:'Tarjetas',img:null,activo:true,popular:false},
   ],
   svcs:[{n:'Logo',p:'₡45.000'},{n:'Posts RRSS',p:'₡18.000'},{n:'Flyer',p:'₡8.500'}],revs:[]
  },
  {id:11,in:'LV',bg:'#FFF0D6',co:'#C07000',nm:'Luis Vargas',tel:'8888-1003',wa:'50688881003',
   of:'Electricista certificado',rt:5.0,rv:22,zona:'San Ramón · Alajuela',disp:true,prem:false,nw:false,
   desc:'Instalaciones eléctricas residenciales y comerciales. Certificado ICE.',
   catalogType:'servicios',
   items:[
     {id:'e1',nm:'Revisión panel eléctrico',desc:'Inspección completa con reporte y cotización.',pr:'₡15.000',prNum:15000,cat:'Inspecciones',sub:'Residencial',img:null,activo:true,popular:true},
     {id:'e2',nm:'Instalación toma corriente',desc:'Material e instalación por punto.',pr:'₡12.000',prNum:12000,cat:'Instalaciones',sub:'Residencial',img:null,activo:true,popular:false},
     {id:'e3',nm:'Cambio de breaker',desc:'Diagnóstico, pieza y mano de obra.',pr:'₡20.000',prNum:20000,cat:'Mantenimiento',sub:'Panel',img:null,activo:true,popular:false},
     {id:'e4',nm:'Instalación luminaria LED',desc:'Por punto. Material no incluido.',pr:'₡8.000',prNum:8000,cat:'Iluminación',sub:'LED',img:null,activo:true,popular:true},
   ],
   svcs:[{n:'Revisión panel',p:'₡15.000'},{n:'Toma corriente',p:'₡12.000'},{n:'Breaker',p:'₡20.000'}],revs:[]
  }];

let AP='Alajuela', AC=DATA.Alajuela[0], MOD='inicio', VIEW='', paso=1, tipoReg='persona', planSel=0;

const G=id=>document.getElementById(id);

// ── MARKETPLACE STATE (declarado antes de render) ──
var carritoOpen = false;
var carritoCheckout = false;
var pedidoCalifId = null;
var pedRecibidoDetalle = null;
var carrito = [];
var catShowFoto=true, catShowPrecio=true, catShowDesc=false, catShowHeader=true;
var catHeaderColor='#085041', catTextColor='#ffffff';
var catTituloTexto='', catBadgeTexto='', catFooterTexto='micanton.cr · Alajuela';

// PDF desde canvas — alta calidad 300dpi redibujar en canvas grande
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
var misPedidos = [];
var pedidosRecibidos = [];
var califStars = 0, califResena = '', califPedidoId = null;
var mktTipo = 'post', mktTono = 'amigable', mktResult = '', mktLoading = false;
var mktCustom = false, mktPaleta = 'verde', mktProductosSel = [], mktEstilo = 'flat';
var pnTab = 'perfil';
var negocioTplSel = {};    // {negId: plantillaId} — plantilla elegida por cada negocio
var catViewTplOpen = false; // selector de plantillas abierto en catálogo
var catViewTplId = null;    // plantilla activa en vista catálogo

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ROL_PERMS — permisos de menú por tipo de usuario
// Controlado desde Admin → CMS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
var ROL_PERMS = {
  visitante:   { portal:['inicio','noticias','negocios','clasificados','empleo','gobierno','eventos','ofertas'], panel:[], navbot:['inicio','negocios','clasificados','empleo','eventos'] },
  registrado:  { portal:['inicio','noticias','negocios','clasificados','empleo','gobierno','eventos','ofertas'], panel:['perfil','catalogo','pagos'], navbot:['inicio','negocios','clasificados','empleo','perfil'] },
  negocio:     { portal:['inicio','noticias','negocios','clasificados','empleo','gobierno','eventos','ofertas'], panel:['perfil','marketing','pedidos','catalogo','categorias','stats','pagos','publicar'], navbot:['inicio','negocio','clasificados','eventos','negocios'] },
  profesional: { portal:['inicio','noticias','negocios','clasificados','empleo','gobierno','eventos','ofertas'], panel:['perfil','marketing','solicitudes','catalogo','categorias','stats','pagos','publicar'], navbot:['inicio','disenador','clasificados','empleo','negocios'] },
  creativo:    { portal:['inicio','noticias','negocios','clasificados','empleo','gobierno','eventos','ofertas'], panel:['perfil','marketing','solicitudes','catalogo','categorias','stats','pagos','publicar'], navbot:['inicio','disenador','clasificados','empleo','negocios'] },
  medio:       { portal:['inicio','noticias','negocios','clasificados','empleo','gobierno','eventos','ofertas'], panel:['perfil','marketing','pedidos','catalogo','stats','publicar'], navbot:['inicio','medio_panel','noticias','negocios','eventos'] },
  admin:       { portal:['inicio','noticias','negocios','clasificados','empleo','gobierno','eventos','ofertas'], panel:['perfil','marketing','pedidos','catalogo','categorias','stats','pagos','publicar'], navbot:['inicio','admin','clasificados','noticias','negocios'] },
};

// Catálogo de TODOS los módulos posibles
var ALL_NAV_MODULES = [
  // Portal (header tabs)
  {id:'inicio',      nm:'Inicio',        ic:'ti-home',                    cat:'portal'},
  {id:'noticias',    nm:'Noticias',       ic:'ti-news',                    cat:'portal'},
  {id:'negocios',    nm:'Directorio',     ic:'ti-building-store',          cat:'portal'},
  {id:'clasificados',nm:'Compra & Venta', ic:'ti-shopping-bag',            cat:'portal'},
  {id:'empleo',      nm:'Empleo',         ic:'ti-briefcase',               cat:'portal'},
  {id:'gobierno',    nm:'Gobierno',       ic:'ti-building-bank',           cat:'portal'},
  {id:'eventos',     nm:'Eventos',        ic:'ti-calendar-event',          cat:'portal'},
  {id:'ofertas',     nm:'Ofertas',        ic:'ti-tag',                     cat:'portal'},
  // Panel (tabs internas del panel de usuario)
  {id:'perfil',      nm:'Mi perfil',      ic:'ti-user-circle',             cat:'panel'},
  {id:'marketing',   nm:'Marketing IA',   ic:'ti-sparkles',                cat:'panel'},
  {id:'pedidos',     nm:'Pedidos',        ic:'ti-inbox',                   cat:'panel'},
  {id:'solicitudes', nm:'Solicitudes',    ic:'ti-list-check',              cat:'panel'},
  {id:'catalogo',    nm:'Catálogo',       ic:'ti-package',                 cat:'panel'},
  {id:'categorias',  nm:'Categorías',     ic:'ti-category',                cat:'panel'},
  {id:'stats',       nm:'Estadísticas',   ic:'ti-chart-bar',               cat:'panel'},
  {id:'pagos',       nm:'Pagos',          ic:'ti-credit-card',             cat:'panel'},
  {id:'publicar',    nm:'Publicar',       ic:'ti-photo',                   cat:'panel'},
  // Navbot (barra inferior)
  {id:'inicio_nb',   nm:'Inicio',         ic:'ti-home',                    cat:'navbot', mod:'inicio'},
  {id:'negocio_nb',  nm:'Mi panel',       ic:'ti-building-store',          cat:'navbot', mod:'negocio'},
  {id:'negocios_nb', nm:'Directorio',     ic:'ti-building-store',          cat:'navbot', mod:'negocios'},
  {id:'clasificados_nb',nm:'Mercado',     ic:'ti-shopping-bag',            cat:'navbot', mod:'clasificados'},
  {id:'empleo_nb',   nm:'Empleo',         ic:'ti-briefcase',               cat:'navbot', mod:'empleo'},
  {id:'eventos_nb',  nm:'Eventos',        ic:'ti-calendar-event',          cat:'navbot', mod:'eventos'},
  {id:'noticias_nb', nm:'Noticias',       ic:'ti-news',                    cat:'navbot', mod:'noticias'},
  {id:'admin_nb',    nm:'Admin',          ic:'ti-shield-check',            cat:'navbot', mod:'admin'},
  {id:'perfil_nb',   nm:'Mi perfil',      ic:'ti-user-circle',             cat:'navbot', mod:'negocio'},
  {id:'diseno_nb',   nm:'Mi panel',       ic:'ti-palette',                 cat:'navbot', mod:'disenador'},
]
.filter(Boolean);

export default PROS;

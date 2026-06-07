/**
 * Plantillas de catálogo (sistema) y marketing
 * En v3: /config/plantillas en Firestore, editables desde admin
 */
export const CAT_PLANTILLAS = [
{ id:'c1', nm:'Menú Especial',     tipo:'catalogo', rubros:['gastronomia'],          ic:'👑', preview:'#1c1c1c', desc:'Oscuro · fotos circulares · badge dorado',
  drawFn:'_catMenuEspecial' },
{ id:'c2', nm:'Flyer Oferta',      tipo:'catalogo', rubros:['gastronomia','supermercado','ropa'],ic:'📍',preview:'#CC0020',desc:'Rojo · grilla 3 cols',
  drawFn:'_catFlyerOferta' },
{ id:'c3', nm:'Menú Limpio',       tipo:'catalogo', rubros:['gastronomia'],          ic:'🟢', preview:'#f8f8f8', desc:'Blanco minimalista · numerado',
  drawFn:'_catMenuLimpio' },
{ id:'c4', nm:'Carta Restaurante', tipo:'catalogo', rubros:['gastronomia'],          ic:'🍽️', preview:'#111',    desc:'Oscuro elegante · lista categorías',
  drawFn:'_catCartaRestaurante' },
{ id:'c5', nm:'Super Sale Verde',  tipo:'catalogo', rubros:['supermercado','gastronomia'],ic:'🥦',preview:'#1D9E75',desc:'Verde · grilla 4 cols · hasta 8 items',
  drawFn:'_catSuperSaleVerde' },
{ id:'c6', nm:'Supermercado',      tipo:'catalogo', rubros:['supermercado'],         ic:'🛒', preview:'#FFD600', desc:'Amarillo · verde · borde llamativo',
  drawFn:'_catSupermercado' },
{ id:'c7', nm:'Sale Amarillo',     tipo:'catalogo', rubros:['supermercado','ropa'],  ic:'🌟', preview:'#FFD600', desc:'Amarillo full · hasta 12 productos',
  drawFn:'_catSaleAmarillo' },
{ id:'c8', nm:'Fresh Hero',        tipo:'catalogo', rubros:['gastronomia','supermercado'],ic:'🥬',preview:'#1D4A1D',desc:'Verde oscuro · hero foto · badge rojo',
  drawFn:'_catFreshHero' },
];

export const MKT_PLANTILLAS = [
// ── GASTRONOMÍA ──
{ id:0, nm:'Menú Especial',   tipo:'post', rubros:['gastronomia','generico'],      ic:'👑', preview:'#1c1c1c', desc:'Oscuro · fotos circulares · badge dorado',    colores:{fondo1:'#1c1c1c',fondo2:'#0d0d0d',acento:'#EF9F27',texto:'#fff',badge_bg:'#EF9F27',badge_tc:'#1a1a1a'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplMenuEspecial(ctx,W,H,prods,opts,tx,col||this.colores); }},
{ id:1, nm:'Exclusivo Promo', tipo:'post', rubros:['gastronomia','ropa','generico'],ic:'✨', preview:'#8B0033', desc:'Magenta · banda amarilla · precio circular',   colores:{fondo1:'#6d0028',fondo2:'#cc0044',acento:'#FFD600',texto:'#fff',badge_bg:'#FFD600',badge_tc:'#1a1a1a'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplExclusivo(ctx,W,H,prods,opts,tx,col||this.colores); }},
{ id:2, nm:'Combo Azul',      tipo:'post', rubros:['gastronomia','supermercado'],  ic:'🎯', preview:'#1a3d9e', desc:'Azul · producto flotante · precio destacado',  colores:{fondo1:'#1a3d9e',fondo2:'#0d2070',acento:'#FFD600',texto:'#fff',badge_bg:'#FFD600',badge_tc:'#1a3d9e'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplComboAzul(ctx,W,H,prods,opts,tx,col||this.colores); }},
{ id:3, nm:'Fresh Grocery',   tipo:'post', rubros:['gastronomia','supermercado'],  ic:'🥗', preview:'#0d1a0d', desc:'Negro · verde · foto hero · % descuento',     colores:{fondo1:'#0d1a0d',fondo2:'#1a2d1a',acento:'#4CAF50',texto:'#fff',badge_bg:'#4CAF50',badge_tc:'#fff'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplFreshGrocery(ctx,W,H,prods,opts,tx,col||this.colores); }},
{ id:4, nm:'Delicious Deal',  tipo:'post', rubros:['gastronomia'],                 ic:'🍔', preview:'#1a1a1a', desc:'Gris oscuro · 2 productos · precio naranja',  colores:{fondo1:'#1a1a1a',fondo2:'#0d0d0d',acento:'#EF9F27',texto:'#fff',badge_bg:'#fff',badge_tc:'#1a1a1a'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplDeliciousDeal(ctx,W,H,prods,opts,tx,col||this.colores); }},
{ id:5, nm:'Super Delicious',  tipo:'post', rubros:['gastronomia'],                ic:'⭐', preview:'#111',    desc:'Hero fullbleed · texto grande · save %',      colores:{fondo1:'#111',fondo2:'#1a0800',acento:'#EF9F27',texto:'#fff',badge_bg:'#EF9F27',badge_tc:'#111'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplSuperDelicious(ctx,W,H,prods,opts,tx,col||this.colores); }},

// ── MULTI-RUBRO ──
{ id:6, nm:'Naranja Lateral',  tipo:'post', rubros:['gastronomia','servicios','generico'],ic:'🍊', preview:'#E05A00', desc:'Naranja · foto lateral · badge %',        colores:{fondo1:'#E05A00',fondo2:'#FF8C00',acento:'#fff',texto:'#fff',badge_bg:'#5c1a00',badge_tc:'#FFD600'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplNaranjaLateral(ctx,W,H,prods,opts,tx,col||this.colores); }},
{ id:7, nm:'Split Amarillo',   tipo:'post', rubros:['ropa','tecnologia','generico'], ic:'🟡', preview:'#C00020', desc:'Foto izquierda · texto derecha · 50% OFF',   colores:{fondo1:'#FFD600',fondo2:'#C00020',acento:'#C00020',texto:'#fff',badge_bg:'#fff',badge_tc:'#C00020'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplSplitAmarillo(ctx,W,H,prods,opts,tx,col||this.colores); }},
{ id:8, nm:'Brush Menú',       tipo:'post', rubros:['gastronomia','generico'],       ic:'🔴', preview:'#f5f5f5', desc:'Blanco · brush rojo · precio circular',      colores:{fondo1:'#f8f8f8',fondo2:'#fff',acento:'#CC0000',texto:'#1a1a1a',badge_bg:'#CC0000',badge_tc:'#fff'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplBrushMenu(ctx,W,H,prods,opts,tx,col||this.colores); }},
{ id:9, nm:'Diagonal Rojo',    tipo:'post', rubros:['gastronomia','servicios'],      ic:'🥩', preview:'#0d0d0d', desc:'Negro · rojo diagonal · delivery',           colores:{fondo1:'#0d0d0d',fondo2:'#1a0000',acento:'#C00020',texto:'#fff',badge_bg:'#C00020',badge_tc:'#fff'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplDiagonalRojo(ctx,W,H,prods,opts,tx,col||this.colores); }},
{ id:10,nm:'Premium Script',   tipo:'post', rubros:['gastronomia','belleza','generico'],ic:'🥩',preview:'#2a1a0a',desc:'Café · dorado · script · circular',         colores:{fondo1:'#2a1a0a',fondo2:'#3d1f00',acento:'#EF9F27',texto:'#fff',badge_bg:'#CC0020',badge_tc:'#fff'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplPremiumScript(ctx,W,H,prods,opts,tx,col||this.colores); }},

// ── SUPERMERCADO / COMERCIO ──
{ id:11,nm:'Super Sale Verde', tipo:'post', rubros:['supermercado','gastronomia'],   ic:'🥦', preview:'#1D9E75', desc:'Verde · grilla 4 cols · hasta 8 items',      colores:{fondo1:'#1D9E75',fondo2:'#0d5c3d',acento:'#fff',texto:'#fff',badge_bg:'#fff',badge_tc:'#1D9E75'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplSuperSaleVerde(ctx,W,H,prods,opts,tx,col||this.colores); }},
{ id:12,nm:'Supermercado',     tipo:'post', rubros:['supermercado'],                 ic:'🛒', preview:'#FFD600', desc:'Amarillo · verde · borde llamativo',         colores:{fondo1:'#2d7a2d',fondo2:'#FFD600',acento:'#FFD600',texto:'#fff',badge_bg:'#FFD600',badge_tc:'#2d7a2d'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplSupermercado(ctx,W,H,prods,opts,tx,col||this.colores); }},
{ id:13,nm:'Sale Amarillo',    tipo:'post', rubros:['supermercado','ropa','generico'],ic:'🌟',preview:'#FFD600',  desc:'Amarillo full · hasta 12 productos',         colores:{fondo1:'#FFD600',fondo2:'#FFB300',acento:'#2d7a2d',texto:'#1a1a1a',badge_bg:'#2d7a2d',badge_tc:'#fff'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplSaleAmarillo(ctx,W,H,prods,opts,tx,col||this.colores); }},

// ── ROPA Y CALZADO ──
{ id:14,nm:'Texto Fondo Dark', tipo:'post', rubros:['ropa','tecnologia','generico'], ic:'🔥', preview:'#0d1f2d', desc:'Oscuro · texto repetido · precio box',       colores:{fondo1:'#0d1f2d',fondo2:'#1a0800',acento:'#EF9F27',texto:'#fff',badge_bg:'#fff',badge_tc:'#EF9F27'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplTextoBG(ctx,W,H,prods,opts,tx,col||this.colores); }},
{ id:15,nm:'Fashion Split',    tipo:'post', rubros:['ropa'],                         ic:'👗', preview:'#1a1a1a', desc:'Negro · blanco · foto splash · precio',       colores:{fondo1:'#1a1a1a',fondo2:'#2d2d2d',acento:'#fff',texto:'#fff',badge_bg:'#fff',badge_tc:'#1a1a1a'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplFashionSplit(ctx,W,H,prods,opts,tx,col||this.colores); }},
{ id:16,nm:'Boutique Elegante',tipo:'post', rubros:['ropa','belleza'],               ic:'💎', preview:'#C8A96E', desc:'Dorado · elegante · minimalista',             colores:{fondo1:'#1a120a',fondo2:'#2a1e10',acento:'#C8A96E',texto:'#fff',badge_bg:'#C8A96E',badge_tc:'#1a1a1a'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplBoutiqueElegante(ctx,W,H,prods,opts,tx,col||this.colores); }},

// ── TECNOLOGÍA ──
{ id:17,nm:'Tech Azul',        tipo:'post', rubros:['tecnologia'],                   ic:'📱', preview:'#0C447C', desc:'Azul profundo · tech · spec sheet',           colores:{fondo1:'#0C447C',fondo2:'#060e1a',acento:'#B5D4F4',texto:'#fff',badge_bg:'#B5D4F4',badge_tc:'#0C447C'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplTechAzul(ctx,W,H,prods,opts,tx,col||this.colores); }},
{ id:18,nm:'Tech Negro',       tipo:'post', rubros:['tecnologia'],                   ic:'💻', preview:'#0a0a0a', desc:'Negro mate · degradado · precio grande',      colores:{fondo1:'#0a0a0a',fondo2:'#1a1a2e',acento:'#00D4FF',texto:'#fff',badge_bg:'#00D4FF',badge_tc:'#0a0a0a'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplTechNegro(ctx,W,H,prods,opts,tx,col||this.colores); }},

// ── SALUD / FARMACIA ──
{ id:19,nm:'Salud Verde',      tipo:'post', rubros:['salud'],                        ic:'💊', preview:'#1D9E75', desc:'Verde salud · limpio · confiable',            colores:{fondo1:'#fff',fondo2:'#f0f9f5',acento:'#1D9E75',texto:'#1a1a1a',badge_bg:'#1D9E75',badge_tc:'#fff'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplSaludVerde(ctx,W,H,prods,opts,tx,col||this.colores); }},

// ── BELLEZA ──
{ id:20,nm:'Beauty Rosa',      tipo:'post', rubros:['belleza'],                      ic:'💅', preview:'#FF6B9D', desc:'Rosa · elegante · beauty studio',             colores:{fondo1:'#2d0a1a',fondo2:'#4a0d2e',acento:'#FF6B9D',texto:'#fff',badge_bg:'#FF6B9D',badge_tc:'#fff'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplBeautyRosa(ctx,W,H,prods,opts,tx,col||this.colores); }},

// ── SERVICIOS / AUTOMOTRIZ ──
{ id:21,nm:'Servicios Oscuro', tipo:'post', rubros:['servicios','automotriz'],       ic:'🔧', preview:'#1a1a1a', desc:'Dark industrial · servicio técnico',          colores:{fondo1:'#111',fondo2:'#1a1a00',acento:'#FFD600',texto:'#fff',badge_bg:'#FFD600',badge_tc:'#111'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplServiciosOscuro(ctx,W,H,prods,opts,tx,col||this.colores); }},

// ── GENÉRICO ──
{ id:22,nm:'Fresh Hero',       tipo:'post', rubros:['gastronomia','supermercado','generico'],ic:'🥬',preview:'#1D4A1D',desc:'Verde oscuro · hero foto · badge rojo', colores:{fondo1:'#1D4A1D',fondo2:'#0d2a0d',acento:'#9FE1CB',texto:'#fff',badge_bg:'#CC0020',badge_tc:'#fff'},
  draw(ctx,W,H,prods,opts,tx,col){ _tplFreshHeroPost(ctx,W,H,prods,opts,tx,col||this.colores); }},
];

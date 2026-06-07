/**
 * Tipos de usuario, permisos y módulos de navegación
 * En v3: Firebase Custom Claims + Firestore /config/roles
 */

export const USR_TIPOS = [
  {tipo:'visitante',   nm:'Visitante',             sub:'Portal público · sin sesión',               av:'VI', bg:'#E6F1FB', tc:'#185FA5', ic:'ti-user',                     mod:'inicio'},
  {tipo:'admin',       nm:'Admin · Edwin',          sub:'Panel de administración completo',          av:'EV', bg:'#0C2B1A', tc:'#9FE1CB', ic:'ti-shield-check',             mod:'admin'},
  {tipo:'negocio',     nm:'Negocio · El Mirador',   sub:'Catálogo · diseños · pedidos',              av:'EM', bg:'#E1F5EE', tc:'#085041', ic:'ti-building-store',           mod:'negocio'},
  {tipo:'creativo',    nm:'Diseñador · Andrea',      sub:'Cola de trabajo · plantillas · ingresos',  av:'AM', bg:'#EEEDFE', tc:'#534AB7', ic:'ti-palette',                  mod:'disenador'},
  {tipo:'medio',       nm:'Medio · Diario Occ.',     sub:'Publicar noticias · estadísticas',         av:'DO', bg:'#E6F1FB', tc:'#0C447C', ic:'ti-building-broadcast-tower', mod:'medio'},
  {tipo:'profesional', nm:'Profesional · Carlos',    sub:'Mi perfil de servicios · galería',         av:'CR', bg:'#FAEEDA', tc:'#854F0B', ic:'ti-tools',                    mod:'disenador'},
  {tipo:'registrado',  nm:'Usuario · María',         sub:'Mis clasificados · bolsa de empleo',       av:'MR', bg:'#EAF3DE', tc:'#3B6D11', ic:'ti-user-check',               mod:'negocio'},
  {tipo:'negocio',     nm:'Pagos · El Mirador',      sub:'Suscripciones · historial · SINPE',        av:'₡',  bg:'#E6F1FB', tc:'#042C53', ic:'ti-credit-card',              mod:'pagos'},
];

export const ROL_PERMS = {
  visitante:   { portal:['inicio','noticias','negocios','clasificados','empleo','gobierno','eventos','ofertas'], panel:[], navbot:['inicio','negocios','clasificados','empleo','eventos'] },
  registrado:  { portal:['inicio','noticias','negocios','clasificados','empleo','gobierno','eventos','ofertas'], panel:['perfil','catalogo','pagos'], navbot:['inicio','negocios','clasificados','empleo','perfil'] },
  negocio:     { portal:['inicio','noticias','negocios','clasificados','empleo','gobierno','eventos','ofertas'], panel:['perfil','marketing','pedidos','catalogo','categorias','stats','pagos','publicar'], navbot:['inicio','negocio','clasificados','eventos','negocios'] },
  profesional: { portal:['inicio','noticias','negocios','clasificados','empleo','gobierno','eventos','ofertas'], panel:['perfil','marketing','solicitudes','catalogo','categorias','stats','pagos','publicar'], navbot:['inicio','disenador','clasificados','empleo','negocios'] },
  creativo:    { portal:['inicio','noticias','negocios','clasificados','empleo','gobierno','eventos','ofertas'], panel:['perfil','marketing','solicitudes','catalogo','categorias','stats','pagos','publicar'], navbot:['inicio','disenador','clasificados','empleo','negocios'] },
  medio:       { portal:['inicio','noticias','negocios','clasificados','empleo','gobierno','eventos','ofertas'], panel:['perfil','marketing','pedidos','catalogo','stats','publicar'], navbot:['inicio','medio_panel','noticias','negocios','eventos'] },
  admin:       { portal:['inicio','noticias','negocios','clasificados','empleo','gobierno','eventos','ofertas'], panel:['perfil','marketing','pedidos','catalogo','categorias','stats','pagos','publicar'], navbot:['inicio','admin','clasificados','noticias','negocios'] },
};

export const ALL_NAV_MODULES = [
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
];

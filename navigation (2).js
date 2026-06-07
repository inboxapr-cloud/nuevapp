/**
 * EVENTOS_DATA y JOBS
 * En v3: colecciones /eventos y /empleos en Firestore
 */
export const EVENTOS_DATA = [
  {id:'ev1',d:'14',m:'Jun',c:'var(--g)',nm:'Fiestas Patronales '+' · Alajuela',loc:'Parque Central',hr:'Todo el día',tag:'Gratis',tc:'#EAF3DE',tv:'#3B6D11',tipo:'municipal',org:'Municipalidad de Alajuela',url:'https://www.muniala.go.cr',desc:'Celebración anual de las fiestas patronales. Música, gastronomía, deportes y actividades para toda la familia.'},
  {id:'ev2',d:'18',m:'Jun',c:'var(--g)',nm:'Feria del Agricultor · Especial temporada',loc:'Plaza de Ferias',hr:'6am – 12pm',tag:'Gratis',url:'https://www.feriaagricultor.cr',tc:'#EAF3DE',tv:'#3B6D11',tipo:'publico',org:'MAG Costa Rica',desc:'Feria especial con productos de temporada. Frutas, verduras, artesanías y más directo del productor.'},
  {id:'ev3',d:'21',m:'Jun',c:'#534AB7',nm:'Concierto Noche de Trova',loc:'Teatro Municipal',hr:'7:00pm',tag:'₡3.000',tc:'#FAEEDA',tv:'#854F0B',tipo:'cultura',org:'Casa de la Cultura',desc:'Noche de trova y música latinoamericana. Artistas locales y nacionales. Entradas limitadas.'},
  {id:'ev4',d:'28',m:'Jun',c:'#854F0B',nm:'Torneo de Ajedrez · Copa del Cantón',loc:'Casa de la Cultura',hr:'9:00am',tag:'Gratis',tc:'#EAF3DE',tv:'#3B6D11',tipo:'deportes',org:'Asociación de Ajedrez',desc:'Torneo abierto para todas las categorías. Categorías: sub-12, sub-18 y adultos. Premios para los primeros lugares.'},
  {id:'ev5',d:'05',m:'Jul',c:'#185FA5',nm:'Carrera 5K · Fiestas de Julio',loc:'Estadio Municipal',hr:'7:00am',tag:'₡5.000',tc:'#FAEEDA',tv:'#854F0B',tipo:'deportes',org:'Comité de Deportes',desc:'Carrera popular 5K. Inscripción incluye camiseta oficial y medalla de participación. Categorías por edad.'},
];

export const JOBS=[
  {id:1,tit:'Cajero/a de supermercado',emp:'Súper Central',av:'SC',bg:'#E1F5EE',co:'#0F6E56',tipo:'Tiempo completo',sal:'₡400k–480k',urg:true,nw:false,rem:false,cat:'Comercio',t:'Hace 2h'},
  {id:2,tit:'Cocinero/a de restaurante',emp:'El Mirador',av:'EM',bg:'#FAEEDA',co:'#854F0B',tipo:'Tiempo completo',sal:'₡500k–600k',urg:false,nw:true,rem:false,cat:'Gastronomía',t:'Hace 5h'},
  {id:3,tit:'Asistente administrativo/a',emp:'Clínica Dr. Soto',av:'CD',bg:'#FCEBEB',co:'#A32D2D',tipo:'Medio tiempo',sal:'₡280k–320k',urg:false,nw:false,rem:false,cat:'Salud',t:'Ayer'},
  {id:4,tit:'Diseñador/a gráfico digital',emp:'MiCantón.cr',av:'MC',bg:'#EEEDFE',co:'#534AB7',tipo:'Freelance',sal:'Por proyecto',urg:false,nw:true,rem:true,cat:'Diseño',t:'Hace 3h'},
  {id:5,tit:'Mecánico general automotriz',emp:'Auto Servicio Vargas',av:'AV',bg:'#E6F1FB',co:'#185FA5',tipo:'Tiempo completo',sal:'₡550k–700k',urg:true,nw:false,rem:false,cat:'Mecánica',t:'Hace 6h'},
];

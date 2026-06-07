/**
 * Configuración de UI — badges, tabs, módulos
 * En v3: /config/ui en Firestore (editable desde admin CMS)
 */
export const TIPO_BADGE = {
  independiente: {nm:'Independiente', bg:'#FAEEDA', co:'#854F0B', ic:'ti-user'},
  empresa:       {nm:'Empresa',       bg:'#E6F1FB', co:'#185FA5', ic:'ti-building'},
  local:         {nm:'Local',         bg:'#E1F5EE', co:'#0F6E56', ic:'ti-building-store'},
  agencia:       {nm:'Agencia',       bg:'#EEEDFE', co:'#534AB7', ic:'ti-sparkles'},
};

export const ALL_MODS_TABS=[
  {id:'inicio',      nm:'Inicio',     ic:'ti-home'},
  {id:'noticias',    nm:'Noticias',   ic:'ti-news'},
  {id:'negocios',    nm:'Directorio', ic:'ti-building-store'},
  {id:'clasificados',nm:'C&V',        ic:'ti-shopping-bag'},
  {id:'empleo',      nm:'Empleo',     ic:'ti-briefcase'},
  {id:'gobierno',    nm:'Gobierno',   ic:'ti-building-bank'},
];

export const ADMIN_CANTONES=[
  {nm:'Alajuela',n:142,j:38,s:86,c:57,cr:23,ing:4200000},
  {nm:'San Ramón',n:87,j:22,s:42,c:18,cr:14,ing:2100000},
  {nm:'Grecia',n:71,j:18,s:34,c:12,cr:11,ing:1750000},
  {nm:'Palmares',n:64,j:14,s:28,c:9,cr:9,ing:1400000},
];

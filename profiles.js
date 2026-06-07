/**
 * Navegación — goMod, goBack, setPnTab, irPerfil...
 */
import { render } from '../core/renderer.js';


function goMod(m){ MOD=m; VIEW=''; render(); rebuildNav(); }

function goBack(){ VIEW=''; render(); rebuildNav(); }

function setPnTab(tab){
  pnTab=tab; render();
  if(tab==='marketing') setTimeout(mktDibujarCanvas,120);
  if(tab==='catalogo')  setTimeout(dibujarCatalogoCanvas,120);
}

function setAdminTab(t){ adminTab=t; adminDetail=null; MOD='admin'; render(); rebuildNav(); }

function setAdminCanton(i){ adminCanton=i; render(); }

function irPerfilNegocio(id){
  VIEW='negocio-'+id; render();
  const c=G('content'); if(c) c.scrollTop=0;
}

function irPerfilProfesional(id){
  VIEW='pro-'+id; render();
  const c=G('content'); if(c) c.scrollTop=0;
}

function abrirUrl(url){
  if(url) window.open(url,'_blank');
  else showToast('Sin sitio web registrado');
}

function scrollDirTabs(px){
  const tabs=document.querySelector('.dir-tabs-scroll')||
             document.querySelector('[id^="catTabs"]')||
             document.querySelector('.subcats-scroll');
  if(tabs) tabs.scrollLeft+=px;
  // Fallback: scroll todos los scrollables horizontales
  document.querySelectorAll('[style*="overflow-x:auto"],[style*="overflow-x: auto"]')
    .forEach(el=>{ if(el.scrollWidth>el.clientWidth) el.scrollLeft+=px; });
}

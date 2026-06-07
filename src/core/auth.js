// auth — MiCantón.cr

function switchUsr(i){
  activeUsr = i;
  const u = (typeof USR_TIPOS!=='undefined') && USR_TIPOS[i];
  sesionUsuario = (u && u.tipo !== 'visitante') ? {
    tipo:u.tipo, nm:u.nm, av:u.av, bg:u.bg||'#E6F1FB', co:u.co||'#185FA5'
  } : null;
  usrMenuOpen = false;
  const dest = u && u.mod;
  if(dest) goMod(dest);
  else render();
  updateUsrBtn();
  rebuildNav();
  showToast('¡Bienvenido '+( u ? u.nm : 'Visitante')+'!');
}

function cerrarSesion(){
  sesionUsuario=null; activeUsr=0;
  usrMenuOpen=false;
  goMod('inicio');
  showToast('Sesión cerrada');
}

function irRegistro(tipo){
  tipoReg=tipo; paso=1; goMod('registro');
}

function toggleUsrMenu(){ usrMenuOpen=!usrMenuOpen; render(); }

function toggleNotif(){
  if('Notification' in window){
    Notification.requestPermission().then(p=>{
      showToast(p==='granted'?'Notificaciones activadas ✓':'Notificaciones desactivadas');
    });
  } else showToast('Tu navegador no soporta notificaciones');
}
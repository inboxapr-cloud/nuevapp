@import './micanton.css';
/* MiCantón.cr — Estilos globales */
/* El CSS del micanton_v2.html va aquí, refactorizado */

:root {
  /* ── Colores del sistema ── */
  --g:    #1D9E75;  /* verde principal */
  --b:    #185FA5;  /* azul principal */
  --r:    #E24B4A;  /* rojo / error */
  --t1:   #111111;  /* texto primario */
  --t2:   #444444;  /* texto secundario */
  --t3:   #888888;  /* texto terciario */
  --bg:   #F0EEE9;  /* fondo de app */
  --surf: #FFFFFF;  /* superficie de cards */
  --bor:  #E0DDD6;  /* bordes */
  --r:    12px;     /* border-radius grande */
  --rs:   8px;      /* border-radius pequeño */

  /* ── Tipografía ── */
  --font: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  /* ── Sombras ── */
  --shadow-sm: 0 1px 4px rgba(0,0,0,.06);
  --shadow-md: 0 4px 16px rgba(0,0,0,.10);
}

/* Dark mode (auto) */
@media (prefers-color-scheme: dark) {
  :root {
    --bg:   #1A1A1A;
    --surf: #242424;
    --bor:  #333333;
    --t1:   #F0EEE9;
    --t2:   #BBBBBB;
    --t3:   #777777;
  }
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { font-size: 16px; -webkit-text-size-adjust: 100%; }

body {
  font-family: var(--font);
  background: var(--bg);
  color: var(--t1);
  min-height: 100vh;
  /* Soporte para iPhone X+ safe area */
  padding-bottom: env(safe-area-inset-bottom);
}

#app-root {
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

#content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 70px; /* espacio para navbot */
  -webkit-overflow-scrolling: touch;
}

/* ── Navbot ── */
#navbot {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  background: var(--surf);
  border-top: .5px solid var(--bor);
  display: flex;
  z-index: 100;
  padding-bottom: env(safe-area-inset-bottom);
}

/* Importar el resto del CSS del micanton_v2.html aquí */
/* Por ahora, copiar manualmente desde la sección <style> del HTML */

/* CSS extraído del HTML monolítico */
/* TODO: refactorizar en módulos por componente */


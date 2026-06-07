/* MiCantón.cr — Estilos extraídos del monolito */
:root {
  --g: #1D9E75; --gd: #0F6E56; --gdd: #085041;
  --b: #185FA5; --bd: #0C447C;
  --pu: #534AB7; --am: #854F0B;
  --bg: #F0EEE9; --surf: #fff;
  --bor: rgba(0,0,0,0.09);
  --t1: #1a1a18; --t2: #5f5e5a; --t3: #9a9892;
  --r: 13px; --rs: 9px;
  --hh: 0px;
}
* { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
html,body { height: 100%; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; background: #ddd; overscroll-behavior: none; }
.app { display: flex; flex-direction: column; height: 100dvh; max-width: 100%; margin: 0 auto; background: var(--bg); overflow: hidden; position: relative; }
@media (min-width: 768px) {
  body { background: #e8e8e8; }
  .app { max-width: 420px; box-shadow: 0 0 80px rgba(0,0,0,0.25); border-radius: 12px; margin-top: 16px; height: calc(100vh - 32px); }
}
@media (min-width: 1200px) {
  body { display: flex; align-items: flex-start; justify-content: center; padding-top: 20px; background: linear-gradient(135deg,#f0f0f0,#e0e0e0); }
}

/* ── HEADER ── */
.hdr { background: var(--g); flex-shrink: 0; position: sticky; top: 0; z-index: 100; }
.hdr-top { padding: 10px 14px 8px; display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.logo { font-size: 18px; font-weight: 700; color: #fff; letter-spacing: -.3px; }
.logo em { color: #9FE1CB; font-style: normal; }
.hdr-right { display: flex; gap: 6px; align-items: center; position: relative; }
.hbtn { font-size: 11px; color: rgba(255,255,255,.85); padding: 4px 10px; border-radius: 20px; border: .5px solid rgba(255,255,255,.3); cursor: pointer; background: transparent; font-family: inherit; }
.hbtn:active { background: rgba(255,255,255,.15); }
.usr-dropdown { position: absolute; top: calc(100% + 10px); right: 0; background: var(--surf); border: .5px solid var(--bor); border-radius: var(--r); box-shadow: 0 8px 32px rgba(0,0,0,.18); z-index: 200; min-width: 240px; overflow: hidden; }
.usr-header { background: #0C2B1A; padding: 12px 14px; display: flex; align-items: center; gap: 10px; }
.usr-av-big { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff; border: 2px solid rgba(255,255,255,.3); flex-shrink: 0; }
.usr-nm { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 1px; }
.usr-plan { font-size: 10px; color: rgba(255,255,255,.6); }
.usr-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; cursor: pointer; border-bottom: .5px solid var(--bor); transition: background .1s; }
.usr-item:last-child { border-bottom: none; }
.usr-item:hover { background: var(--bg); }
.usr-item.active-usr { background: #E1F5EE; }
.usr-ic { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.usr-ic i { font-size: 15px; }
.usr-item-nm { font-size: 12px; font-weight: 600; color: var(--t1); margin-bottom: 1px; }
.usr-item-sub { font-size: 10px; color: var(--t3); }
.usr-check { margin-left: auto; font-size: 14px; color: var(--g); }
.usr-sep { padding: 6px 14px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; color: var(--t3); background: var(--bg); border-bottom: .5px solid var(--bor); }

/* NEWS TICKER */
.ticker-wrap { background: var(--gdd); overflow: hidden; border-bottom: .5px solid rgba(255,255,255,.1); }
.ticker-inner { display: flex; align-items: center; }
.ticker-label { font-size: 10px; font-weight: 700; color: #9FE1CB; background: var(--g); padding: 5px 10px; white-space: nowrap; flex-shrink: 0; display: flex; align-items: center; gap: 4px; }
.ticker-label i { font-size: 12px; }
.ticker-scroll { flex: 1; overflow: hidden; }
.ticker-text { display: flex; gap: 0; animation: scroll-ticker 40s linear infinite; white-space: nowrap; }
.ticker-text:hover { animation-play-state: paused; }
.ticker-item { font-size: 11px; color: rgba(255,255,255,.85); padding: 5px 20px; border-right: .5px solid rgba(255,255,255,.1); cursor: pointer; white-space: nowrap; }
.ticker-item:hover { color: #fff; }
@keyframes scroll-ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

/* CLIMA + CANTON BAR */
.info-bar { background: var(--gdd); display: flex; align-items: center; padding: 5px 12px; gap: 8px; }
.clima-left { display: flex; align-items: center; gap: 6px; padding: 6px 10px 6px 0; border-right: .5px solid rgba(255,255,255,.2); flex-shrink: 0; }
.clima-icon { font-size: 20px; }
.clima-temp { font-size: 16px; font-weight: 700; color: #fff; line-height: 1; }
.clima-desc { font-size: 9px; color: rgba(255,255,255,.7); }
.canton-center { flex: 1; padding: 6px 10px; }
.canton-name { font-size: 12px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 4px; }
.canton-name i { font-size: 13px; color: #9FE1CB; }
.canton-stats { display: flex; gap: 8px; margin-top: 1px; }
.cs { font-size: 9px; color: rgba(255,255,255,.65); display: flex; align-items: center; gap: 2px; }
.cs strong { color: #9FE1CB; }
.clima-right { padding: 6px 0 6px 10px; border-left: .5px solid rgba(255,255,255,.2); flex-shrink: 0; text-align: right; }
.clima-detail { font-size: 10px; color: rgba(255,255,255,.8); line-height: 1.6; }
.clima-detail strong { color: #fff; }

/* PROV / CANT STRIPS */
.prov-strip { display: flex; overflow-x: auto; padding: 0 14px; background: var(--g); gap: 0; scrollbar-width: none; }
.prov-strip::-webkit-scrollbar { display: none; }
.pt { font-size: 11px; font-weight: 600; color: rgba(255,255,255,.7); padding: 6px 12px; white-space: nowrap; cursor: pointer; border-bottom: 2px solid transparent; }
.pt.on { color: #fff; border-color: #9FE1CB; }
.cant-strip { display: flex; gap: 5px; padding: 6px 14px; overflow-x: auto; background: var(--gdd); scrollbar-width: none; }
.cant-strip::-webkit-scrollbar { display: none; }
.ct { font-size: 11px; font-weight: 500; padding: 3px 11px; border-radius: 20px; border: .5px solid rgba(255,255,255,.2); color: rgba(255,255,255,.7); cursor: pointer; white-space: nowrap; }
.ct.on { background: #fff; color: var(--gdd); font-weight: 700; border-color: #fff; }
.ct.pend { opacity: .35; pointer-events: none; }

/* SEARCH */
.search-wrap { padding: 7px 14px 9px; background: var(--g); }
.search-box { display: flex; align-items: center; gap: 7px; background: rgba(255,255,255,.18); border-radius: 11px; padding: 7px 12px; border: .5px solid rgba(255,255,255,.2); }
.search-box input { background: transparent; border: none; outline: none; font-size: 12px; color: #fff; flex: 1; font-family: inherit; }
.search-box input::placeholder { color: rgba(255,255,255,.55); }
.search-box i { font-size: 15px; color: rgba(255,255,255,.7); }
.clr-btn { font-size: 14px; color: rgba(255,255,255,.6); cursor: pointer; display: none; }
.clr-btn.show { display: block; }

/* MOD TABS */
.mod-tabs { display: flex; background: var(--surf); border-bottom: .5px solid var(--bor); flex-shrink: 0; align-items: stretch; }
.mod-tabs::-webkit-scrollbar { display: none; }
.mtab { display: flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; color: var(--t3); padding: 9px 13px; white-space: nowrap; cursor: pointer; border-bottom: 2px solid transparent; }
.mtab i { font-size: 14px; }
.mtab.on { color: var(--g); border-color: var(--g); }

/* CONTENT */
.content { flex: 1; overflow-y: auto; scroll-behavior: smooth; scrollbar-width: thin; scrollbar-color: rgba(0,0,0,.1) transparent; }

/* ── CARDS ── */
.card { background: var(--surf); border-radius: var(--r); border: .5px solid var(--bor); overflow: hidden; margin-bottom: 10px; }

/* ── COMPONENTE DE IMÁGENES ── */
.img-uploader { border: 1.5px dashed var(--bor); border-radius: var(--rs); overflow: hidden; background: var(--bg); }
.img-drop-zone { padding: 20px; text-align: center; cursor: pointer; transition: background .15s; }
.img-drop-zone:hover { background: #E1F5EE; border-color: var(--g); }
.img-drop-zone i { font-size: 28px; color: var(--t3); display: block; margin-bottom: 6px; }
.img-drop-zone.has-imgs { padding: 10px; }
.img-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 6px; margin-bottom: 8px; }
.img-thumb { position: relative; aspect-ratio: 1; border-radius: 8px; overflow: hidden; background: var(--bg); border: .5px solid var(--bor); }
.img-thumb img { width: 100%; height: 100%; object-fit: cover; }
.img-thumb .img-del { position: absolute; top: 3px; right: 3px; width: 20px; height: 20px; background: rgba(0,0,0,.55); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; border: none; }
.img-thumb .img-del i { font-size: 10px; color: #fff; }
.img-thumb .img-main-badge { position: absolute; bottom: 3px; left: 3px; font-size: 9px; font-weight: 700; background: var(--g); color: #fff; padding: 1px 6px; border-radius: 8px; }
.img-thumb.add-more { border-style: dashed; display: flex; align-items: center; justify-content: center; cursor: pointer; background: var(--surf); }
.img-thumb.add-more i { font-size: 22px; color: var(--g); }
.img-count-tip { font-size: 10px; color: var(--t3); text-align: center; padding: 4px 0 8px; }

.ch { padding: 10px 14px; border-bottom: .5px solid var(--bor); display: flex; align-items: center; justify-content: space-between; }
.ct2 { font-size: 12px; font-weight: 700; color: var(--t1); display: flex; align-items: center; gap: 5px; }
.ct2 i { font-size: 14px; color: var(--g); }
.seeall { font-size: 11px; color: var(--g); cursor: pointer; font-weight: 600; }
.pad { padding: 12px; }

/* NEWS */
.nfeat { background: #E1F5EE; padding: 12px 14px; border-bottom: .5px solid var(--bor); cursor: pointer; }
.nfeat:active { background: #9FE1CB44; }
.nf-tag { font-size: 10px; font-weight: 700; color: var(--gd); background: #fff; border-radius: 20px; padding: 2px 8px; display: inline-block; margin-bottom: 4px; }
.nf-medio { font-size: 10px; font-weight: 700; color: var(--gd); margin-bottom: 3px; display: flex; align-items: center; gap: 4px; }
.nf-medio i { font-size: 11px; }
.nf-title { font-size: 14px; font-weight: 700; color: var(--gdd); line-height: 1.3; margin-bottom: 4px; }
.nf-meta { font-size: 10px; color: var(--gd); display: flex; gap: 8px; align-items: center; }
.nitem { display: flex; gap: 9px; padding: 10px 14px; border-bottom: .5px solid var(--bor); cursor: pointer; }
.nitem:last-child { border-bottom: none; }
.nitem:active { background: var(--bg); }
.nthumb { width: 56px; height: 56px; border-radius: 9px; background: var(--bg); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.nthumb i { font-size: 20px; color: var(--t3); opacity: .5; }
.ncat { font-size: 10px; font-weight: 700; padding: 1px 7px; border-radius: 20px; display: inline-block; margin-bottom: 3px; }
.ntit { font-size: 12px; font-weight: 600; color: var(--t1); line-height: 1.3; margin-bottom: 3px; }
.nmeta2 { font-size: 10px; color: var(--t3); display: flex; gap: 6px; align-items: center; }
.n-medio-tag { font-size: 10px; font-weight: 600; color: var(--g); display: flex; align-items: center; gap: 2px; }

/* EVENTS */
.evitem { display: flex; gap: 10px; padding: 10px 14px; border-bottom: .5px solid var(--bor); cursor: pointer; align-items: center; }
.evitem:last-child { border-bottom: none; }
.evitem:active { background: var(--bg); }
.efecha { border-radius: 10px; padding: 5px 8px; text-align: center; min-width: 38px; flex-shrink: 0; }
.edia { font-size: 17px; font-weight: 800; line-height: 1; color: #fff; }
.emes { font-size: 9px; color: rgba(255,255,255,.85); text-transform: uppercase; letter-spacing: .5px; }
.enm { font-size: 13px; font-weight: 600; color: var(--t1); margin-bottom: 2px; }
.eloc { font-size: 10px; color: var(--t3); display: flex; align-items: center; gap: 3px; }
.etag { font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 20px; margin-left: auto; flex-shrink: 0; }

/* OFERTAS */
.ofgrid { display: grid; grid-template-columns: 1fr 1fr; }
.ofitem { padding: 11px 12px; border-right: .5px solid var(--bor); border-bottom: .5px solid var(--bor); cursor: pointer; }
.ofitem:nth-child(even) { border-right: none; }
.ofitem:nth-last-child(-n+2) { border-bottom: none; }
.ofitem:active { background: var(--bg); }
.of-neg { font-size: 10px; color: var(--t3); margin-bottom: 3px; display: flex; align-items: center; gap: 3px; }
.of-neg i { font-size: 11px; color: var(--g); }
.of-desc { font-size: 12px; font-weight: 600; color: var(--t1); margin-bottom: 5px; line-height: 1.3; }
.of-pill { font-size: 10px; font-weight: 700; border-radius: 20px; padding: 2px 8px; display: inline-block; }

/* NEGOCIOS */
.negitem { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: .5px solid var(--bor); cursor: pointer; }
.negitem:last-child { border-bottom: none; }
.negitem:active { background: var(--bg); }
.nav { width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
.nnm { font-size: 13px; font-weight: 600; color: var(--t1); }
.ncat2 { font-size: 10px; color: var(--t3); }
.nsoc { display: flex; gap: 3px; margin-left: auto; }
.nsoc i { font-size: 14px; }
.nrat { font-size: 11px; color: var(--am); font-weight: 700; margin-left: 6px; display: flex; align-items: center; gap: 2px; }

/* CLASIFICADOS */
.clsgrid { display: grid; grid-template-columns: 1fr 1fr; }
.clsitem { padding: 10px 11px; border-right: .5px solid var(--bor); border-bottom: .5px solid var(--bor); cursor: pointer; }
.clsitem:nth-child(even) { border-right: none; }
.clsitem:nth-last-child(-n+2) { border-bottom: none; }
.clsitem:active { background: var(--bg); }
.cls-img { height: 50px; background: var(--bg); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 5px; }
.cls-img i { font-size: 20px; color: var(--t3); opacity: .4; }
.cls-price { font-size: 13px; font-weight: 700; color: var(--b); }
.cls-nm { font-size: 11px; font-weight: 500; color: var(--t1); margin: 1px 0 2px; }
.cls-vf { font-size: 10px; font-weight: 700; display: flex; align-items: center; gap: 2px; color: var(--g); }

/* EMPLEO */
.jobitem { padding: 11px 13px; border-bottom: .5px solid var(--bor); cursor: pointer; }
.jobitem:last-child { border-bottom: none; }
.jobitem:active { background: var(--bg); }
.jobitem.feat { background: #E1F5EE; border-left: 3px solid var(--g); }
.jt { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 6px; }
.jav { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
.jtit { font-size: 13px; font-weight: 700; color: var(--t1); margin-bottom: 2px; line-height: 1.3; }
.jemp { font-size: 10px; color: var(--t3); display: flex; align-items: center; gap: 3px; }
.jemp i { font-size: 11px; color: var(--g); }
.jbadges { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 5px; }
.jb { font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 20px; }
.jb-t { background: var(--bg); color: var(--t2); }
.jb-s { background: #EAF3DE; color: #3B6D11; }
.jb-u { background: #FCEBEB; color: #A32D2D; }
.jb-n { background: #E1F5EE; color: var(--gd); }
.jb-r { background: #EEEDFE; color: var(--pu); }
.jmeta { font-size: 10px; color: var(--t3); display: flex; gap: 10px; }
.jmeta span { display: flex; align-items: center; gap: 3px; }
.apply-btn { font-size: 11px; font-weight: 700; background: var(--g); color: #fff; border: none; border-radius: 20px; padding: 5px 12px; cursor: pointer; font-family: inherit; flex-shrink: 0; }

/* SERVICIOS */
.srvitem { padding: 12px 13px; border-bottom: .5px solid var(--bor); cursor: pointer; }
.srvitem:last-child { border-bottom: none; }
.srvitem:active { background: var(--bg); }
.srvitem.top { background: #E6F1FB; border-left: 3px solid var(--b); }
.srv-top { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 6px; }
.srv-av { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 17px; font-weight: 700; flex-shrink: 0; border: 2px solid transparent; }
.srv-av.vf { border-color: var(--g); }
.srv-nm { font-size: 13px; font-weight: 700; color: var(--t1); display: flex; align-items: center; gap: 5px; margin-bottom: 2px; }
.srv-vck { width: 14px; height: 14px; background: var(--g); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.srv-vck i { font-size: 9px; color: #fff; }
.srv-of { font-size: 11px; color: var(--t3); margin-bottom: 3px; }
.srv-stars { display: flex; align-items: center; gap: 3px; }
.srv-stars i { font-size: 12px; color: #EF9F27; }
.srv-stars span { font-size: 11px; color: var(--t3); }
.srv-badges { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 5px; }
.sb { font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 20px; }
.sb-z { background: #E6F1FB; color: var(--b); }
.sb-d { background: #EAF3DE; color: #3B6D11; }
.sb-p { background: #FAEEDA; color: var(--am); }
.sb-n { background: #E1F5EE; color: var(--gd); }
.srv-desc { font-size: 11px; color: var(--t3); line-height: 1.4; margin-bottom: 7px; }
.srv-btns { display: flex; gap: 6px; }
.sbtn { flex: 1; font-size: 11px; font-weight: 700; padding: 7px 8px; border-radius: 8px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; font-family: inherit; }
.sbtn.wa { background: #25D366; color: #fff; }
.sbtn.tel { background: var(--bg); color: var(--t1); border: .5px solid var(--bor); }
.sbtn.ver { background: var(--b); color: #fff; }

/* HSCROLL */
.hscroll { display: flex; gap: 9px; padding: 0 12px 12px; overflow-x: auto; scrollbar-width: none; }
.hscroll::-webkit-scrollbar { display: none; }
.hcard { background: var(--surf); border: .5px solid var(--bor); border-radius: var(--r); padding: 11px 12px; min-width: 148px; cursor: pointer; flex-shrink: 0; }
.hcard:active { background: var(--bg); }

/* DETAIL */
.detail { padding: 14px; }
.dback { font-size: 12px; font-weight: 600; color: var(--g); cursor: pointer; display: flex; align-items: center; gap: 4px; margin-bottom: 14px; }
.dhero { display: flex; gap: 12px; margin-bottom: 14px; }
.dav { width: 60px; height: 60px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 700; flex-shrink: 0; border: 2.5px solid var(--g); }
.dnm { font-size: 17px; font-weight: 700; color: var(--t1); margin-bottom: 2px; }
.dsub { font-size: 12px; color: var(--t3); margin-bottom: 5px; }
.dstars { display: flex; align-items: center; gap: 3px; }
.dstars i { font-size: 14px; color: #EF9F27; }
.dbtns { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; }
.dbtn { padding: 11px; border-radius: 10px; border: none; cursor: pointer; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 6px; font-family: inherit; }
.dbtn.wa { background: #25D366; color: #fff; }
.dbtn.tel { background: var(--bg); color: var(--t1); border: .5px solid var(--bor); }
.dbtn.apply { background: var(--g); color: #fff; grid-column: 1/-1; }
.slbl { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--t3); margin-bottom: 8px; }
.svcs { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 14px; }
.svc { background: var(--bg); border-radius: 8px; padding: 8px 10px; }
.svc-nm { font-size: 11px; font-weight: 600; color: var(--t1); margin-bottom: 1px; }
.svc-pr { font-size: 11px; font-weight: 700; color: var(--b); }
.fotos { display: grid; grid-template-columns: repeat(3,1fr); gap: 5px; margin-bottom: 14px; }
.foto { aspect-ratio: 1; background: var(--bg); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.foto i { font-size: 20px; color: var(--t3); opacity: .3; }
.revs { padding: 4px 0; }
.rev { padding: 10px 0; border-bottom: .5px solid var(--bor); }
.rev:last-child { border-bottom: none; }
.rev-h { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.rev-av { width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0; }
.rev-nm { font-size: 12px; font-weight: 600; color: var(--t1); }
.rev-dt { font-size: 10px; color: var(--t3); margin-left: auto; }
.rev-st { display: flex; }
.rev-st i { font-size: 11px; color: #EF9F27; }
.rev-txt { font-size: 12px; color: var(--t3); line-height: 1.45; }
.vbox { background: #E1F5EE; border: .5px solid #9FE1CB; border-radius: 10px; padding: 10px 12px; display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--gd); margin-top: 12px; }
.vbox i { font-size: 15px; color: var(--g); flex-shrink: 0; }

/* REGISTRO / LOGIN */
.reg-hero { background: linear-gradient(135deg, var(--g), var(--gd)); padding: 22px 20px; text-align: center; }
.reg-title { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 4px; }
.reg-sub { font-size: 12px; color: rgba(255,255,255,.8); }
.step-bar { display: flex; align-items: flex-start; justify-content: center; gap: 4px; padding: 10px 14px 8px; background: var(--surf); border-bottom: .5px solid var(--bor); }
.sd { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.sdot { width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; }
.sdot.done { background: var(--g); color: #fff; }
.sdot.act { background: var(--g); color: #fff; box-shadow: 0 0 0 3px rgba(29,158,117,.2); }
.sdot.pend { background: var(--bg); color: var(--t3); border: 1.5px solid var(--bor); }
.slnk { flex: 1; height: 2px; background: var(--bor); max-width: 36px; margin-top: 12px; }
.slnk.done { background: var(--g); }
.slab { font-size: 9px; color: var(--t3); }
.fb { padding: 14px; background: var(--bg); display: flex; flex-direction: column; gap: 10px; }
.fc { background: var(--surf); border-radius: var(--r); padding: 14px; }
.ftit { font-size: 13px; font-weight: 700; color: var(--t1); margin-bottom: 12px; display: flex; align-items: center; gap: 6px; }
.ftit i { font-size: 15px; color: var(--g); }
.fld { display: flex; flex-direction: column; gap: 5px; margin-bottom: 11px; }
.fld:last-child { margin-bottom: 0; }
.flbl { font-size: 12px; font-weight: 700; color: var(--t1); display: flex; justify-content: space-between; align-items: center; }
.fvtag { font-size: 10px; font-weight: 600; color: var(--g); }
.finp { width: 100%; font-size: 13px; padding: 10px 12px; border-radius: var(--rs); border: .5px solid rgba(0,0,0,.15); background: var(--bg); color: var(--t1); outline: none; font-family: inherit; transition: all .15s; }
.finp:focus { border-color: var(--g); background: #fff; }
.finp.ok { border-color: var(--g); background: #E1F5EE; }
.finp.err { border-color: #E24B4A; background: #FCEBEB; }
.vrow { display: flex; gap: 7px; }
.vrow .finp { flex: 1; }
.vbtn { font-size: 12px; font-weight: 700; background: var(--g); color: #fff; border: none; border-radius: var(--rs); padding: 10px 13px; cursor: pointer; white-space: nowrap; font-family: inherit; }
.vbtn:disabled { background: #9FE1CB; cursor: not-allowed; }
.fhint { font-size: 11px; color: var(--t3); }
.fhint.ok { color: var(--gd); display: flex; align-items: center; gap: 3px; }
.fhint.err { color: #A32D2D; display: flex; align-items: center; gap: 3px; }
.tipo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
.tipo-opt { border: 1.5px solid var(--bor); border-radius: var(--rs); padding: 10px 8px; cursor: pointer; text-align: center; transition: all .15s; }
.tipo-opt:hover { border-color: var(--g); }
.tipo-opt.on { border-color: var(--g); background: #E1F5EE; }
.tipo-opt i { font-size: 22px; display: block; margin-bottom: 5px; }
.tipo-opt p { font-size: 11px; font-weight: 700; color: var(--t1); margin-bottom: 1px; }
.tipo-opt span { font-size: 10px; color: var(--t3); }
.plan-list { display: flex; flex-direction: column; gap: 7px; }
.plan-opt { border: 1.5px solid var(--bor); border-radius: 10px; padding: 11px 12px; cursor: pointer; display: flex; align-items: center; gap: 11px; transition: all .15s; }
.plan-opt:hover { border-color: var(--g); }
.plan-opt.on { border-color: var(--g); background: #E1F5EE; }
.plan-opt.free-plan { border-color: #9FE1CB; background: #E1F5EE; }
.po-ic { width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.po-ic i { font-size: 18px; }
.po-nm { font-size: 13px; font-weight: 700; color: var(--t1); margin-bottom: 1px; }
.po-pr { font-size: 13px; font-weight: 700; color: var(--g); }
.po-sb { font-size: 10px; color: var(--t3); }
.po-chk { width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid var(--bor); display: flex; align-items: center; justify-content: center; margin-left: auto; flex-shrink: 0; }
.plan-opt.on .po-chk, .plan-opt.free-plan .po-chk { background: var(--g); border-color: var(--g); }
.plan-opt.on .po-chk::after, .plan-opt.free-plan .po-chk::after { content: '✓'; font-size: 11px; font-weight: 700; color: #fff; }
.warn-box { background: #FEF3C7; border: .5px solid #F59E0B; border-radius: 10px; padding: 10px 12px; display: flex; gap: 8px; font-size: 11px; color: #92400E; line-height: 1.5; }
.warn-box i { font-size: 15px; color: #D97706; flex-shrink: 0; margin-top: 1px; }
.bigbtn { width: 100%; background: var(--g); color: #fff; border: none; border-radius: 10px; padding: 13px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; display: flex; align-items: center; justify-content: center; gap: 7px; }
.bigbtn:hover { background: var(--gd); }
.bigbtn:disabled { background: #9FE1CB; cursor: not-allowed; }
.bigbtn.blue { background: var(--b); }
.bigbtn.gray { background: var(--bg); color: var(--t1); }
.divider { display: flex; align-items: center; gap: 10px; }
.divider hr { flex: 1; border: none; border-top: .5px solid var(--bor); }
.divider span { font-size: 11px; color: var(--t3); white-space: nowrap; }
.social-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.sl-btn { padding: 10px; border-radius: 9px; border: .5px solid var(--bor); background: var(--surf); font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer; font-family: inherit; }
.success-view { text-align: center; padding: 28px 20px; }
.success-view i.big { font-size: 56px; color: var(--g); display: block; margin-bottom: 14px; }
.success-view h2 { font-size: 21px; font-weight: 700; color: var(--t1); margin-bottom: 6px; }
.success-view p { font-size: 13px; color: var(--t3); line-height: 1.5; }
.free-badge { display: inline-flex; align-items: center; gap: 6px; background: #E1F5EE; border: .5px solid #9FE1CB; border-radius: 20px; padding: 5px 14px; font-size: 12px; font-weight: 700; color: var(--gdd); margin: 12px auto; }

/* ADMIN */
.admin-bar { background: var(--gdd); padding: 9px 16px; display: flex; align-items: center; justify-content: space-between; }
.admin-title { font-size: 13px; font-weight: 700; color: #9FE1CB; display: flex; align-items: center; gap: 5px; }
.astats { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 12px; }
.astat { background: var(--surf); border: .5px solid var(--bor); border-radius: var(--rs); padding: 12px; }
.astat-n { font-size: 22px; font-weight: 700; color: var(--g); }
.astat-l { font-size: 10px; color: var(--t3); margin-top: 2px; }
.req-row { display: flex; align-items: center; gap: 9px; padding: 10px 14px; border-bottom: .5px solid var(--bor); }
.req-row:last-child { border-bottom: none; }
.rr-av { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.rr-av i { font-size: 16px; }
.rr-nm { font-size: 12px; font-weight: 600; color: var(--t1); }
.rr-sub { font-size: 10px; color: var(--t3); }
.rr-st { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; margin-left: auto; white-space: nowrap; }

/* FILTROS */
.fbar { display: flex; gap: 6px; padding: 10px 14px; overflow-x: auto; scrollbar-width: none; background: var(--surf); border-bottom: .5px solid var(--bor); }
.fbar::-webkit-scrollbar { display: none; }
.ftag { font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 20px; cursor: pointer; white-space: nowrap; border: .5px solid var(--bor); color: var(--t3); background: transparent; }
.ftag.on { background: var(--g); color: #fff; border-color: var(--g); }
.ftag.onb { background: var(--b); color: #fff; border-color: var(--b); }

/* TIP BOX */
.tip { background: #E6F1FB; border: .5px solid #85B7EB; border-radius: 10px; padding: 9px 12px; display: flex; align-items: center; gap: 7px; font-size: 11px; color: var(--bd); margin: 0 12px 10px; }
.tip i { font-size: 14px; color: var(--b); flex-shrink: 0; }

/* PUBLICAR */
.pub-menu { display: flex; flex-direction: column; gap: 8px; }
.pub-item { background: var(--surf); border: .5px solid var(--bor); border-radius: var(--r); padding: 13px; display: flex; align-items: center; gap: 12px; cursor: pointer; }
.pub-item:active { background: var(--bg); }
.pub-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pub-icon i { font-size: 22px; }
.pub-nm { font-size: 13px; font-weight: 700; color: var(--t1); margin-bottom: 2px; }
.pub-sub { font-size: 11px; color: var(--t3); margin-bottom: 3px; }
.pub-pr { font-size: 11px; font-weight: 700; color: var(--g); }

/* NAV BOTTOM */
.navbot { background: var(--surf); border-top: .5px solid var(--bor); display: flex; flex-shrink: 0; height: 62px; padding-bottom: env(safe-area-inset-bottom,0px); overflow:hidden; align-items:stretch; }
.navbot .nb { background: none; border: none; cursor: pointer; font-family: inherit; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; color: var(--t3); font-size: 9px; font-weight: 600; padding: 4px 8px; white-space: nowrap; transition: color .15s; }
.navbot /* .nb.on integrated into .navbot .nb.on */
.navbot .nb i { font-size: 20px; }
.navbot .nb span { font-size: 9px; }
.nb { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 8px 4px 9px; cursor: pointer; border: none; background: transparent; font-family: inherit; }
.nb.on i { color: var(--g); }
.nb.on span { color: var(--g); font-weight: 700; }
.nb i { font-size: 21px; color: var(--t3); }
.nb span { font-size: 10px; color: var(--t3); }

/* PANEL NEGOCIO */
.pn-header { background: linear-gradient(135deg,#1D9E75,#085041); padding: 14px 16px; }
.pn-logo-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
.pn-av { width: 52px; height: 52px; border-radius: 12px; background: rgba(255,255,255,.2); display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; color: #fff; border: 2px solid rgba(255,255,255,.3); flex-shrink: 0; }
.pn-nm { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 2px; }
.pn-plan { font-size: 11px; color: rgba(255,255,255,.8); display: flex; align-items: center; gap: 5px; }
.pn-plan span { background: #9FE1CB; color: #085041; font-weight: 700; padding: 1px 8px; border-radius: 20px; font-size: 10px; }
.credits-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
.credit-box { background: rgba(255,255,255,.15); border-radius: 10px; padding: 8px 10px; text-align: center; }
.credit-n { font-size: 20px; font-weight: 700; color: #fff; line-height: 1; }
.credit-n.warn { color: #FAC775; }
.credit-n.ok { color: #9FE1CB; }
.credit-l { font-size: 10px; color: rgba(255,255,255,.75); margin-top: 2px; }
.pn-tabs { display: flex; background: var(--surf); border-bottom: .5px solid var(--bor); overflow-x: auto; scrollbar-width: none; flex-shrink: 0; }
.pn-tabs::-webkit-scrollbar { display: none; }
.pntab { font-size: 11px; font-weight: 600; color: var(--t3); padding: 10px 14px; white-space: nowrap; cursor: pointer; border-bottom: 2px solid transparent; display: flex; align-items: center; gap: 4px; }
.pntab i { font-size: 14px; }
.pntab.on { color: var(--g); border-color: var(--g); }
.pntab .dot { width: 7px; height: 7px; background: #E24B4A; border-radius: 50%; margin-left: 3px; }
.sol-new { padding: 12px; }
.tipo-content-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 8px; margin-bottom: 12px; }
.tc-opt { border: 1.5px solid var(--bor); border-radius: var(--r); padding: 12px 10px; text-align: center; cursor: pointer; transition: all .15s; background: var(--surf); }
.tc-opt:hover { border-color: var(--g); }
.tc-opt.on { border-color: var(--g); border-width: 2px; background: #E1F5EE; }
.tc-opt i { font-size: 24px; display: block; margin-bottom: 5px; }
.tc-opt p { font-size: 12px; font-weight: 700; color: var(--t1); margin-bottom: 2px; }
.tc-opt span { font-size: 10px; color: var(--t3); }
.tc-cred { font-size: 10px; font-weight: 700; margin-top: 5px; padding: 2px 7px; border-radius: 10px; display: inline-block; }
.form-sec { background: var(--surf); border-radius: var(--r); padding: 14px; margin-bottom: 10px; }
.form-sec-title { font-size: 12px; font-weight: 700; color: var(--t1); margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
.form-sec-title i { font-size: 14px; color: var(--g); }
.pre-tag { font-size: 10px; background: #E1F5EE; color: #0F6E56; padding: 2px 7px; border-radius: 10px; font-weight: 700; }
.finp2 { width: 100%; font-size: 13px; padding: 9px 11px; border-radius: var(--rs); border: .5px solid rgba(0,0,0,.12); background: #F4F2ED; color: var(--t1); outline: none; font-family: inherit; }
.finp2:focus { border-color: var(--g); background: #fff; }
.finp2.pre { background: #E1F5EE; border-color: #9FE1CB; color: #085041; }
.fld2 { display: flex; flex-direction: column; gap: 5px; margin-bottom: 10px; }
.fld2:last-child { margin-bottom: 0; }
.flbl2 { font-size: 12px; font-weight: 700; color: var(--t1); display: flex; align-items: center; gap: 6px; }
.chips-wrap { display: flex; flex-wrap: wrap; gap: 5px; }
.chip2 { font-size: 11px; font-weight: 600; padding: 4px 11px; border-radius: 20px; border: .5px solid var(--bor); color: var(--t3); cursor: pointer; background: var(--surf); transition: all .12s; }
.chip2.on { background: var(--g); color: #fff; border-color: var(--g); }
.prod-check-list { display: flex; flex-direction: column; gap: 6px; }
.pcl { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border: .5px solid var(--bor); border-radius: var(--rs); cursor: pointer; background: var(--surf); transition: all .12s; }
.pcl.on { border-color: var(--g); background: #E1F5EE; }
.pcl-chk { width: 18px; height: 18px; border-radius: 4px; border: 1.5px solid var(--bor); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pcl.on .pcl-chk { background: var(--g); border-color: var(--g); }
.pcl-chk i { font-size: 11px; color: #fff; display: none; }
.pcl.on .pcl-chk i { display: block; }
.pcl-thumb { width: 32px; height: 32px; border-radius: 7px; background: #E1F5EE; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pcl-thumb i { font-size: 14px; color: var(--g); }
.pcl-nm { font-size: 12px; font-weight: 600; color: var(--t1); }
.pcl-pr { font-size: 10px; color: var(--t3); }
.fmt-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 7px; }
.fmt-opt { border: 1.5px solid var(--bor); border-radius: var(--rs); overflow: hidden; cursor: pointer; transition: all .15s; background: var(--surf); }
.fmt-opt.on { border-color: var(--g); border-width: 2px; }
.fmt-preview { height: 56px; background: var(--bg); display: flex; align-items: center; justify-content: center; }
.fmt-preview i { font-size: 22px; color: var(--t3); opacity: .4; }
.fmt-label { padding: 5px 6px; text-align: center; border-top: .5px solid var(--bor); }
.fmt-nm { font-size: 10px; font-weight: 700; color: var(--t1); }
.fmt-sz { font-size: 9px; color: var(--t3); }
.copy-box { background: var(--bg); border-radius: var(--rs); padding: 10px 12px; font-size: 12px; color: var(--t1); line-height: 1.6; white-space: pre-wrap; min-height: 60px; margin-bottom: 8px; }
.loading-dots { display: inline-flex; gap: 3px; align-items: center; }
.loading-dots span { width: 6px; height: 6px; border-radius: 50%; background: var(--pu); animation: blink 1.2s infinite; }
.loading-dots span:nth-child(2){animation-delay:.2s}
.loading-dots span:nth-child(3){animation-delay:.4s}
@keyframes blink{0%,80%,100%{opacity:.2}40%{opacity:1}}
.gen-copy-btn { display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; background: #EEEDFE; color: #3C3489; border: .5px solid #AFA9EC; border-radius: var(--rs); padding: 7px 12px; cursor: pointer; font-family: inherit; }
.gen-copy-btn:hover { background: #CECBF6; }
.sol-item { padding: 12px 13px; border-bottom: .5px solid var(--bor); cursor: pointer; }
.sol-item:last-child { border-bottom: none; }
.sol-item:active { background: var(--bg); }
.sol-top { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.sol-tipo-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.sol-tipo-icon i { font-size: 16px; }
.sol-nm { font-size: 13px; font-weight: 700; color: var(--t1); flex: 1; }
.sol-st { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 10px; white-space: nowrap; }
.sol-meta { font-size: 11px; color: var(--t3); margin-bottom: 8px; }
.sol-timeline { display: flex; align-items: center; }
.stl-d { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.stl-dot { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.stl-dot i { font-size: 11px; }
.stl-dot.done { background: #E1F5EE; }
.stl-dot.done i { color: var(--g); }
.stl-dot.act { background: #FAEEDA; }
.stl-dot.act i { color: #854F0B; }
.stl-dot.pend { background: var(--bg); }
.stl-dot.pend i { color: #D3D1C7; }
.stl-line { flex: 1; height: 1px; background: var(--bor); }
.stl-line.done { background: var(--g); }
.stl-lbl { font-size: 9px; color: var(--t3); text-align: center; max-width: 34px; }
.borrador-preview { background: #E1F5EE; border-radius: var(--rs); height: 90px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; margin-top: 8px; cursor: pointer; border: .5px solid #9FE1CB; }
.borrador-preview i { font-size: 28px; color: var(--g); opacity: .5; }
.borrador-preview span { font-size: 11px; color: var(--gd); font-weight: 600; }
.rev-panel { background: #E6F1FB; border: .5px solid #85B7EB; border-radius: var(--rs); padding: 11px 12px; margin-top: 8px; }
.rev-panel-title { font-size: 12px; font-weight: 700; color: #0C447C; margin-bottom: 7px; display: flex; align-items: center; gap: 5px; }
.rev-chips { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 8px; }
.rev-chip { font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 20px; border: .5px solid #85B7EB; color: var(--b); cursor: pointer; background: #fff; }
.rev-chip:hover { background: #B5D4F4; }
.rev-chip.on { background: var(--b); color: #fff; border-color: var(--b); }
.rev-textarea { width: 100%; font-size: 12px; padding: 7px 9px; border-radius: var(--rs); border: .5px solid #85B7EB; background: #fff; color: var(--t1); outline: none; resize: vertical; min-height: 48px; font-family: inherit; margin-bottom: 7px; }
.rev-btns { display: flex; gap: 7px; }
.rev-btn { flex: 1; font-size: 11px; font-weight: 700; padding: 8px; border-radius: var(--rs); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px; font-family: inherit; }
.rev-btn.ajuste { background: var(--b); color: #fff; }
.rev-btn.aprobar { background: var(--g); color: #fff; }
.sol-actions { display: flex; gap: 6px; margin-top: 8px; }
.sa-btn { font-size: 11px; font-weight: 700; padding: 6px 10px; border-radius: var(--rs); border: .5px solid var(--bor); background: var(--surf); cursor: pointer; display: flex; align-items: center; gap: 4px; color: var(--t1); font-family: inherit; }
.sa-btn.dl { background: var(--g); color: #fff; border-color: var(--g); }
.sa-btn.wa { background: #25D366; color: #fff; border-color: #25D366; }
.sa-btn.cancel { background: #FCEBEB; color: #A32D2D; border-color: #F09595; }
.tok-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 12px; }
.tok-card { background: var(--surf); border: .5px solid var(--bor); border-radius: var(--r); padding: 12px; cursor: pointer; transition: all .15s; }
.tok-card:hover { border-color: var(--g); }
.tok-card i { font-size: 24px; display: block; margin-bottom: 6px; }
.tok-nm { font-size: 12px; font-weight: 700; color: var(--t1); margin-bottom: 2px; }
.tok-desc { font-size: 10px; color: var(--t3); line-height: 1.3; margin-bottom: 6px; }
.tok-cost { font-size: 12px; font-weight: 700; }
.toast { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); background: #085041; color: #fff; font-size: 12px; font-weight: 600; border-radius: 20px; padding: 10px 18px; display: flex; align-items: center; gap: 7px; z-index: 100; opacity: 0; transition: opacity .3s; pointer-events: none; white-space: nowrap; }
.toast.show { opacity: 1; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ── RESPONSIVE ── */
@media (min-width: 900px) {
  body { background: #d8d8d8; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; padding: 20px 0; }
  .app { max-width: 390px; height: calc(100vh - 40px); margin: 0 auto; border-radius: 36px; box-shadow: 0 20px 80px rgba(0,0,0,.4); border: 6px solid #1a1a1a; }
}
@media (max-width: 480px) {
  .app { max-width: 100%; border-radius: 0 !important; height: 100dvh; }
}
@keyframes spin { to { transform: rotate(360deg); } }
/**
 * Sistema de imágenes — imgPickerHTML, imgPick, imgThumbFirst
 * Usa IMG_STORE en memoria (migrar a Firebase Storage en v3)
 */
import { render } from '../core/renderer.js';

// En memoria — migrar a Firebase Storage
export const IMG_STORE = {};

export function imgKey(modulo, id) {
  return modulo + '_' + (id || 'new');
}

export function imgThumbFirst(key) {
  const imgs = IMG_STORE[key];
  if (!imgs || !imgs.length) return null;
  return imgs[0].dataUrl;
}

export function imgDelete(key, idx) {
  if (IMG_STORE[key]) {
    IMG_STORE[key].splice(idx, 1);
    render();
  }
}

export function imgPick(key, maxImgs = 6) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.multiple = true;
  input.onchange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!IMG_STORE[key]) IMG_STORE[key] = [];
    const remaining = maxImgs - IMG_STORE[key].length;
    const toProcess = files.slice(0, remaining);

    await Promise.all(toProcess.map(file => new Promise((resolve) => {
      // Comprimir a max 800px antes de guardar
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX = 800;
          let w = img.width, h = img.height;
          if (w > MAX) { h = h * MAX / w; w = MAX; }
          if (h > MAX) { w = w * MAX / h; h = MAX; }
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          IMG_STORE[key].push({
            dataUrl: canvas.toDataURL('image/jpeg', 0.82),
            name: file.name,
            size: file.size,
          });
          resolve();
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    })));
    render();
  };
  input.click();
}

export function imgPickerHTML(key, maxImgs = 6, label = 'Fotos') {
  const imgs = IMG_STORE[key] || [];
  const mainBadge = (i) => i === 0
    ? '<span style="position:absolute;bottom:3px;left:3px;background:rgba(0,0,0,.6);color:#fff;font-size:7px;font-weight:700;padding:1px 4px;border-radius:4px">Principal</span>'
    : '';
  const thumbs = imgs.map((img, i) => `
    <div style="position:relative;width:72px;height:72px;border-radius:8px;overflow:hidden;flex-shrink:0">
      <img src="${img.dataUrl}" style="width:100%;height:100%;object-fit:cover">
      ${mainBadge(i)}
      <button onclick="imgDelete('${key}',${i})" style="position:absolute;top:2px;right:2px;width:18px;height:18px;border-radius:50%;background:rgba(0,0,0,.6);border:none;color:#fff;font-size:10px;cursor:pointer;display:flex;align-items:center;justify-content:center">
        <i class="ti ti-x"></i>
      </button>
    </div>`).join('');

  const addBtn = imgs.length < maxImgs
    ? `<div onclick="imgPick('${key}',${maxImgs})" style="width:72px;height:72px;border-radius:8px;border:1.5px dashed var(--bor);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer;flex-shrink:0;background:var(--bg)">
        <i class="ti ti-plus" style="font-size:16px;color:var(--t3)"></i>
        <span style="font-size:8px;color:var(--t3)">Agregar</span>
      </div>` : '';

  if (!imgs.length) {
    return `<div onclick="imgPick('${key}',${maxImgs})" style="padding:16px;text-align:center;border:1.5px dashed var(--bor);border-radius:var(--rs);cursor:pointer;background:var(--bg)">
      <i class="ti ti-camera-plus" style="font-size:28px;color:var(--t3);display:block;margin-bottom:5px"></i>
      <p style="font-size:12px;font-weight:600;color:var(--t2);margin-bottom:2px">${label}</p>
      <p style="font-size:10px;color:var(--t3)">Tocá para agregar fotos · Hasta ${maxImgs}</p>
    </div>`;
  }

  return `<div>
    <div style="display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding:2px">
      ${thumbs}${addBtn}
    </div>
    <p style="font-size:10px;color:var(--t3);margin-top:5px">${imgs.length} de ${maxImgs} · La primera es la principal</p>
  </div>`;
}

export default { IMG_STORE, imgKey, imgThumbFirst, imgDelete, imgPick, imgPickerHTML };

/**
 * Firebase Storage — Subir fotos de catálogo
 * Reemplaza el sistema IMG_STORE en memoria
 */
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config.js';
import { auth } from './config.js';

/**
 * Subir foto de un item del catálogo
 * @param {string} negId - ID del negocio
 * @param {string} itemId - ID del item
 * @param {File} file - Archivo de imagen
 * @param {number} index - Índice de la foto
 * @returns {Promise<string>} URL pública de la foto
 */
export async function subirFotoItem(negId, itemId, file, index = 0) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('No autenticado');

  // Path: negocios/{negId}/items/{itemId}/foto_{index}.jpg
  const path = `negocios/${negId}/items/${itemId}/foto_${index}_${Date.now()}.jpg`;
  const storageRef = ref(storage, path);

  // Comprimir antes de subir
  const compressed = await comprimirImagen(file, 800, 0.82);
  
  const snap = await uploadBytes(storageRef, compressed, {
    contentType: 'image/jpeg',
    customMetadata: { negId, itemId, subidoPor: uid },
  });

  return await getDownloadURL(snap.ref);
}

/**
 * Eliminar foto de un item
 */
export async function eliminarFotoItem(url) {
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch (err) {
    console.error('Error eliminando foto:', err);
  }
}

/**
 * Comprimir imagen antes de subir
 */
async function comprimirImagen(file, maxPx = 800, quality = 0.82) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        if (w > maxPx) { h = Math.round(h * maxPx / w); w = maxPx; }
        if (h > maxPx) { w = Math.round(w * maxPx / h); h = maxPx; }
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

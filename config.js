/**
 * Firestore — Operaciones CRUD para MiCantón
 * Cada función reemplaza los datos hardcodeados del HTML
 */
import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit, onSnapshot, serverTimestamp,
  addDoc, increment,
} from 'firebase/firestore';
import { db } from './config.js';

// ── NEGOCIOS ──

export async function getNegocio(negId) {
  const snap = await getDoc(doc(db, 'negocios', negId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function getNegocios(canton = null) {
  const ref = collection(db, 'negocios');
  const q = canton
    ? query(ref, where('canton', '==', canton), where('activo', '==', true), orderBy('nm'))
    : query(ref, where('activo', '==', true), orderBy('nm'), limit(50));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function updateNegocio(negId, data) {
  await updateDoc(doc(db, 'negocios', negId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ── CATÁLOGO / ITEMS ──

export async function getItemsNegocio(negId) {
  const snap = await getDocs(
    query(collection(db, 'negocios', negId, 'items'), where('activo', '==', true), orderBy('orden'))
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function saveItem(negId, item) {
  if (item.id) {
    await updateDoc(doc(db, 'negocios', negId, 'items', item.id), {
      ...item,
      updatedAt: serverTimestamp(),
    });
  } else {
    await addDoc(collection(db, 'negocios', negId, 'items'), {
      ...item,
      activo: true,
      createdAt: serverTimestamp(),
    });
  }
}

export async function deleteItem(negId, itemId) {
  await deleteDoc(doc(db, 'negocios', negId, 'items', itemId));
}

// ── PEDIDOS ──

export async function crearPedido(pedido) {
  // La lógica de validación va en Cloud Function
  // Aquí solo se crea el documento inicial
  return await addDoc(collection(db, 'pedidos'), {
    ...pedido,
    st: 'nuevo',
    createdAt: serverTimestamp(),
  });
}

export async function getPedidosNegocio(negId, estado = null) {
  const ref = collection(db, 'pedidos');
  const q = estado
    ? query(ref, where('negocioId', '==', negId), where('st', '==', estado), orderBy('createdAt', 'desc'))
    : query(ref, where('negocioId', '==', negId), orderBy('createdAt', 'desc'), limit(50));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function updatePedidoEstado(pedidoId, nuevoEstado) {
  await updateDoc(doc(db, 'pedidos', pedidoId), {
    st: nuevoEstado,
    updatedAt: serverTimestamp(),
  });
}

// ── LISTENER TIEMPO REAL — Pedidos nuevos ──
export function listenPedidosNuevos(negId, callback) {
  return onSnapshot(
    query(
      collection(db, 'pedidos'),
      where('negocioId', '==', negId),
      where('st', '==', 'nuevo'),
      orderBy('createdAt', 'desc')
    ),
    (snap) => callback(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  );
}

// ── CLASIFICADOS ──

export async function getClasificados(cat = null) {
  const ref = collection(db, 'clasificados');
  const q = cat
    ? query(ref, where('cat', '==', cat), where('activo', '==', true), orderBy('createdAt', 'desc'), limit(30))
    : query(ref, where('activo', '==', true), orderBy('createdAt', 'desc'), limit(30));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function publicarClasificado(data, userId) {
  return await addDoc(collection(db, 'clasificados'), {
    ...data,
    userId,
    activo: true,
    createdAt: serverTimestamp(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
  });
}

// ── ROL_PERMS — Configuración desde Firestore ──
export async function getRolPerms() {
  const snap = await getDoc(doc(db, 'config', 'rolPerms'));
  return snap.exists() ? snap.data() : null;
}

export async function saveRolPerms(perms) {
  await setDoc(doc(db, 'config', 'rolPerms'), perms);
}

// ── ANALYTICS — Registrar vista ──
export async function registrarVista(tipo, id) {
  await updateDoc(doc(db, tipo === 'negocio' ? 'negocios' : 'profesionales', id), {
    vistas: increment(1),
  }).catch(() => {}); // Silenciar si el documento no existe
}

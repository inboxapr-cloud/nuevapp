/**
 * Firebase Cloud Functions — Llamadas desde el cliente
 * Las Cloud Functions contienen la lógica crítica y los secretos
 */
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './config.js';

const functions = getFunctions(app, 'us-central1');

// ── Generación de contenido con IA (Anthropic) ──
// La API key de Anthropic vive SOLO en la Cloud Function
const _generateContent = httpsCallable(functions, 'generateContent');

export async function generateWithAI(prompt, options = {}) {
  const result = await _generateContent({ prompt, ...options });
  return result.data.content || '';
}

// ── Procesar pedido (validación en servidor) ──
const _procesarPedido = httpsCallable(functions, 'procesarPedido');

export async function procesarPedido(pedido) {
  const result = await _procesarPedido(pedido);
  return result.data;
}

// ── Asignar rol a usuario (solo admins) ──
const _asignarRol = httpsCallable(functions, 'asignarRol');

export async function asignarRol(userId, tipo, metadata = {}) {
  const result = await _asignarRol({ userId, tipo, ...metadata });
  return result.data;
}

// ── Enviar notificación WhatsApp (WABA) ──
const _notificarWA = httpsCallable(functions, 'notificarWhatsApp');

export async function notificarWhatsApp(wa, mensaje) {
  const result = await _notificarWA({ wa, mensaje });
  return result.data;
}

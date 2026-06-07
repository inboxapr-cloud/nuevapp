/**
 * MiCantón.cr — Cloud Functions
 * Lógica crítica del servidor: secretos, validaciones, roles
 */
const { initializeApp } = require('firebase-admin/app');
const { getAuth }        = require('firebase-admin/auth');
const { getFirestore }   = require('firebase-admin/firestore');
const functions          = require('firebase-functions');
const Anthropic          = require('@anthropic-ai/sdk');

initializeApp();
const db   = getFirestore();
const auth = getAuth();

// ── Anthropic client (API key SOLO aquí, nunca en el cliente) ──
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TRIGGER: Al crear un nuevo usuario
// Asigna rol 'registrado' por defecto y crea perfil en Firestore
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.onCreateUser = functions.auth.user().onCreate(async (user) => {
  try {
    // 1. Asignar Custom Claim: tipo = 'registrado' por defecto
    await auth.setCustomUserClaims(user.uid, {
      tipo: 'registrado',
      createdAt: Date.now(),
    });

    // 2. Crear perfil en Firestore
    await db.collection('usuarios').doc(user.uid).set({
      uid:       user.uid,
      email:     user.email || null,
      nm:        user.displayName || user.email?.split('@')[0] || 'Usuario',
      tipo:      'registrado',
      photoURL:  user.photoURL || null,
      activo:    true,
      createdAt: getFirestore.FieldValue.serverTimestamp(),
    });

    functions.logger.info(`[onCreateUser] Nuevo usuario: ${user.uid} (${user.email})`);
  } catch (error) {
    functions.logger.error('[onCreateUser] Error:', error);
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CALLABLE: Asignar rol a un usuario
// Solo admins pueden cambiar roles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.asignarRol = functions.https.onCall(async (data, context) => {
  // 1. Verificar autenticación
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Sesión requerida');
  }

  // 2. Verificar que quien llama es admin
  if (context.auth.token.tipo !== 'admin') {
    throw new functions.https.HttpsError('permission-denied', 'Solo admins pueden asignar roles');
  }

  const { userId, tipo, negId, proId } = data;

  // 3. Validar tipo de rol
  const tiposValidos = ['visitante','registrado','negocio','profesional','creativo','medio','admin'];
  if (!tiposValidos.includes(tipo)) {
    throw new functions.https.HttpsError('invalid-argument', `Tipo inválido: ${tipo}`);
  }

  try {
    // 4. Asignar Custom Claims
    const claims = { tipo };
    if (negId) claims.negId = negId;
    if (proId) claims.proId = proId;

    await auth.setCustomUserClaims(userId, claims);

    // 5. Actualizar Firestore
    await db.collection('usuarios').doc(userId).update({
      tipo,
      ...(negId && { negId }),
      ...(proId && { proId }),
      updatedAt: getFirestore.FieldValue.serverTimestamp(),
      updatedBy: context.auth.uid,
    });

    functions.logger.info(`[asignarRol] ${userId} → ${tipo} (por ${context.auth.uid})`);
    return { success: true, userId, tipo };
  } catch (error) {
    functions.logger.error('[asignarRol] Error:', error);
    throw new functions.https.HttpsError('internal', 'Error al asignar rol');
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CALLABLE: Generar contenido con IA (Anthropic)
// La API key NUNCA llega al cliente
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.generateContent = functions
  .runWith({ timeoutSeconds: 60, memory: '256MB' })
  .https.onCall(async (data, context) => {
    // 1. Verificar autenticación
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'Sesión requerida');
    }

    // 2. Verificar rol — solo negocios, profesionales, creativos y admins
    const tiposPermitidos = ['negocio','profesional','creativo','medio','admin'];
    if (!tiposPermitidos.includes(context.auth.token.tipo)) {
      throw new functions.https.HttpsError('permission-denied', 'Plan no incluye IA');
    }

    const { prompt, maxTokens = 800, tipo: contentType } = data;

    if (!prompt || typeof prompt !== 'string' || prompt.length > 5000) {
      throw new functions.https.HttpsError('invalid-argument', 'Prompt inválido');
    }

    try {
      // 3. Llamar a Anthropic (API key en Secret Manager)
      const message = await anthropic.messages.create({
        model:      'claude-sonnet-4-20250514',
        max_tokens: maxTokens,
        system: contentType === 'marketing'
          ? 'Sos un experto en marketing digital para PYMES costarricenses. Respondé siempre en español. Generá contenido creativo, auténtico y orientado a ventas locales.'
          : 'Sos un asistente para negocios locales en Costa Rica. Respondé siempre en español de forma clara y concisa.',
        messages: [{ role: 'user', content: prompt }],
      });

      const content = message.content.map(b => b.text || '').join('');

      // 4. Registrar uso (para analytics y rate limiting futuro)
      await db.collection('ai_usage').add({
        userId:      context.auth.uid,
        tipo:        context.auth.token.tipo,
        contentType: contentType || 'general',
        tokens:      message.usage?.output_tokens || 0,
        createdAt:   getFirestore.FieldValue.serverTimestamp(),
      });

      return { content };
    } catch (error) {
      functions.logger.error('[generateContent] Error Anthropic:', error);
      throw new functions.https.HttpsError('internal', 'Error generando contenido');
    }
  });

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CALLABLE: Procesar pedido
// Validación en servidor antes de guardar
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.procesarPedido = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Sesión requerida');
  }

  const { negocioId, items, notas, total } = data;

  // Validar items
  if (!items?.length) {
    throw new functions.https.HttpsError('invalid-argument', 'Pedido vacío');
  }

  // Verificar que el negocio existe y está activo
  const negSnap = await db.collection('negocios').doc(negocioId).get();
  if (!negSnap.exists || !negSnap.data().activo) {
    throw new functions.https.HttpsError('not-found', 'Negocio no disponible');
  }

  // Verificar precios en servidor (no confiar en el cliente)
  const itemsSnap = await db.collection('negocios').doc(negocioId).collection('items')
    .where('activo', '==', true).get();
  const itemsMap = {};
  itemsSnap.docs.forEach(d => { itemsMap[d.id] = d.data(); });

  let totalVerificado = 0;
  const itemsVerificados = items.map(item => {
    const itemReal = itemsMap[item.id];
    if (!itemReal) throw new functions.https.HttpsError('not-found', `Item ${item.id} no encontrado`);
    const subtotal = itemReal.prNum * (item.qty || 1);
    totalVerificado += subtotal;
    return { ...item, prNum: itemReal.prNum, pr: itemReal.pr, nm: itemReal.nm };
  });

  // Crear pedido con total verificado en servidor
  const pedidoRef = await db.collection('pedidos').add({
    negocioId,
    clienteId: context.auth.uid,
    items:     itemsVerificados,
    total:     totalVerificado,
    notas:     notas || '',
    st:        'nuevo',
    createdAt: getFirestore.FieldValue.serverTimestamp(),
  });

  functions.logger.info(`[procesarPedido] Nuevo pedido ${pedidoRef.id} para negocio ${negocioId}`);
  return { pedidoId: pedidoRef.id, total: totalVerificado };
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TRIGGER: Notificar al negocio cuando llega un pedido nuevo
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.onNuevoPedido = functions.firestore
  .document('pedidos/{pedidoId}')
  .onCreate(async (snap, context) => {
    const pedido = snap.data();
    const negocioId = pedido.negocioId;

    try {
      // Obtener datos del negocio para notificación
      const negSnap = await db.collection('negocios').doc(negocioId).get();
      if (!negSnap.exists) return;

      const neg = negSnap.data();

      // Actualizar contador de pedidos nuevos
      await db.collection('negocios').doc(negocioId).update({
        pedidosNuevos: getFirestore.FieldValue.increment(1),
      });

      // Aquí se puede agregar: push notification, email, WhatsApp API
      functions.logger.info(`[onNuevoPedido] Pedido ${context.params.pedidoId} → ${neg.nm}`);
    } catch (error) {
      functions.logger.error('[onNuevoPedido] Error:', error);
    }
  });

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CALLABLE: Guardar ROL_PERMS desde el CMS Admin
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.guardarRolPerms = functions.https.onCall(async (data, context) => {
  if (!context.auth || context.auth.token.tipo !== 'admin') {
    throw new functions.https.HttpsError('permission-denied', 'Solo admins');
  }

  const { perms } = data;
  if (!perms || typeof perms !== 'object') {
    throw new functions.https.HttpsError('invalid-argument', 'Permisos inválidos');
  }

  await db.collection('config').doc('rolPerms').set({
    ...perms,
    updatedAt: getFirestore.FieldValue.serverTimestamp(),
    updatedBy: context.auth.uid,
  });

  return { success: true };
});

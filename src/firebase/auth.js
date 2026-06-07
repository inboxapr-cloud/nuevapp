/**
 * Firebase Auth — Login, registro, roles via Custom Claims
 */
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from './config.js';

// ── Providers ──
const googleProvider = new GoogleAuthProvider();

// ── Mensajes de error localizados ──
const AUTH_ERRORS = {
  'auth/user-not-found':      'Usuario no encontrado',
  'auth/wrong-password':      'Contraseña incorrecta',
  'auth/too-many-requests':   'Demasiados intentos. Intentá más tarde.',
  'auth/invalid-email':       'Email inválido',
  'auth/email-already-in-use':'Este email ya está registrado',
  'auth/weak-password':       'La contraseña debe tener al menos 6 caracteres',
  'auth/popup-closed-by-user':null, // silenciar
};

function handleAuthError(err) {
  const msg = AUTH_ERRORS[err.code];
  if (msg === null) return; // silenciar
  if (typeof window.showToast === 'function') {
    window.showToast(msg || 'Error de autenticación');
  }
}

// ── Login con email/contraseña ──
export async function loginEmail(email, password) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    if (typeof window.showToast === 'function') window.showToast('Sesión iniciada ✓');
    return cred.user;
  } catch (err) {
    handleAuthError(err);
    throw err;
  }
}

// ── Login con Google ──
export async function loginGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (typeof window.showToast === 'function') {
      window.showToast('Bienvenido, ' + result.user.displayName + ' ✓');
    }
    return result.user;
  } catch (err) {
    handleAuthError(err);
    throw err;
  }
}

// ── Registro ──
export async function register(email, password) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (typeof window.showToast === 'function') window.showToast('Cuenta creada ✓');
    return cred.user;
  } catch (err) {
    handleAuthError(err);
    throw err;
  }
}

// ── Cerrar sesión ──
export async function logout() {
  await signOut(auth);
  window.activeUsr = 0;
  window.sesionUsuario = null;
  window.MOD = 'inicio';
  if (typeof window.render === 'function') window.render();
  if (typeof window.showToast === 'function') window.showToast('Sesión cerrada');
}

// ── Reset contraseña ──
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    if (typeof window.showToast === 'function') window.showToast('Email de recuperación enviado ✓');
  } catch (err) {
    handleAuthError(err);
    throw err;
  }
}

// ── Auth state listener ──
// Se inicializa en main.js — callback con user + tipo
export function initAuthListener(onLogin, onLogout) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        // Obtener Custom Claims (tipo, negId, proId)
        const token = await user.getIdTokenResult(true);
        const tipo  = token.claims.tipo || 'registrado';

        window.sesionUsuario = {
          uid:    user.uid,
          email:  user.email,
          nm:     user.displayName || user.email?.split('@')[0] || 'Usuario',
          tipo,
          negId:  token.claims.negId || null,
          proId:  token.claims.proId || null,
          avatar: user.photoURL || null,
        };

        // Mapear tipo al índice de USR_TIPOS para compatibilidad
        const tipos = window.USR_TIPOS || [];
        const idx   = tipos.findIndex(u => u.tipo === tipo);
        window.activeUsr = idx >= 0 ? idx : 1;

        onLogin?.(user, tipo);
      } catch (err) {
        console.error('[Auth] Error obteniendo token:', err);
        window.activeUsr = 1; // registrado como fallback
        onLogin?.(user, 'registrado');
      }
    } else {
      window.sesionUsuario = null;
      window.activeUsr = 0; // visitante
      onLogout?.();
    }

    if (typeof window.render === 'function') window.render();
  });
}

// ── UI: render del modal de login ──
export function renderLoginModal() {
  return `
  <div onclick="if(event.target===this)this.remove()"
    style="position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:800;display:flex;align-items:flex-end;justify-content:center">
    <div onclick="event.stopPropagation()"
      style="background:var(--bg);border-radius:18px 18px 0 0;width:100%;max-width:480px;padding:20px 20px 32px">

      <div style="width:40px;height:4px;border-radius:2px;background:var(--bor);margin:0 auto 18px"></div>

      <p style="font-size:17px;font-weight:700;color:var(--t1);margin-bottom:4px">Iniciá sesión</p>
      <p style="font-size:12px;color:var(--t3);margin-bottom:18px">Para acceder a tu panel y realizar pedidos</p>

      <!-- Google -->
      <button onclick="window.getFirebaseAuth().then(m=>m.loginGoogle())"
        style="width:100%;padding:13px;border-radius:var(--rs);border:.5px solid var(--bor);background:var(--surf);font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:10px">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Continuar con Google
      </button>

      <div style="display:flex;align-items:center;gap:8px;margin:12px 0">
        <div style="flex:1;height:.5px;background:var(--bor)"></div>
        <span style="font-size:11px;color:var(--t3)">o con email</span>
        <div style="flex:1;height:.5px;background:var(--bor)"></div>
      </div>

      <!-- Email form -->
      <div style="display:flex;flex-direction:column;gap:8px">
        <input id="login_email" type="email" placeholder="tu@email.com"
          style="width:100%;padding:11px 13px;border:.5px solid var(--bor);border-radius:var(--rs);font-size:13px;font-family:inherit;background:var(--surf);color:var(--t1);outline:none;box-sizing:border-box">
        <input id="login_pass" type="password" placeholder="Contraseña"
          style="width:100%;padding:11px 13px;border:.5px solid var(--bor);border-radius:var(--rs);font-size:13px;font-family:inherit;background:var(--surf);color:var(--t1);outline:none;box-sizing:border-box">
        <button onclick="window.getFirebaseAuth().then(m=>m.loginEmail(document.getElementById('login_email').value,document.getElementById('login_pass').value))"
          style="width:100%;padding:13px;border-radius:var(--rs);border:none;background:var(--b);color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">
          Iniciar sesión
        </button>
      </div>

      <div style="display:flex;justify-content:space-between;margin-top:12px">
        <button onclick="window.getFirebaseAuth().then(m=>m.resetPassword(document.getElementById('login_email')?.value||''))"
          style="background:none;border:none;cursor:pointer;font-size:11px;color:var(--t3);font-family:inherit">
          ¿Olvidaste tu contraseña?
        </button>
        <button onclick="showToast('Registro próximamente')"
          style="background:none;border:none;cursor:pointer;font-size:11px;color:var(--b);font-weight:600;font-family:inherit">
          Crear cuenta
        </button>
      </div>
    </div>
  </div>`;
}

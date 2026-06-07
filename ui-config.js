/**
 * Firebase — Configuración e inicialización
 * Las variables VITE_* se inyectan en build desde .env
 * Los secretos (Admin SDK, API keys) van en Cloud Functions
 */
import { initializeApp } from 'firebase/app';
import { getAuth }        from 'firebase/auth';
import { getFirestore }   from 'firebase/firestore';
import { getStorage }     from 'firebase/storage';
import { getAnalytics }   from 'firebase/analytics';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validar que las variables estén presentes
if (!firebaseConfig.apiKey) {
  console.error('[Firebase] Variables de entorno no configuradas. Revisar .env');
}

export const app       = initializeApp(firebaseConfig);
export const auth      = getAuth(app);
export const db        = getFirestore(app);
export const storage   = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

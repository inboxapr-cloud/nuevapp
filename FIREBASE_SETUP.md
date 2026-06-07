# Firebase Setup — MiCantón.cr

## 1. Crear el proyecto en Firebase

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Iniciar proyecto (desde la carpeta micanton-vite)
firebase init

# Seleccionar:
# ✅ Firestore
# ✅ Functions
# ✅ Storage
# ✅ Hosting

# Proyecto: micanton-cr (o crear uno nuevo)
```

## 2. Variables de entorno

**En Firebase Console → Project Settings → Your apps:**
```
# Copiar estas variables al .env
VITE_FIREBASE_API_KEY             = AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN         = micanton-cr.firebaseapp.com
VITE_FIREBASE_PROJECT_ID          = micanton-cr
VITE_FIREBASE_STORAGE_BUCKET      = micanton-cr.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID = 123456789
VITE_FIREBASE_APP_ID              = 1:123456789:web:abc...
```

**En Firebase Console → Functions → Secrets (Secret Manager):**
```bash
# Agregar la API key de Anthropic como secreto
firebase functions:secrets:set ANTHROPIC_API_KEY
# Pegar: sk-ant-api03-...
```

**En Vercel Dashboard → Settings → Environment Variables:**
Agregar todas las VITE_FIREBASE_* variables

## 3. Habilitar Firebase Auth

En Firebase Console → Authentication → Sign-in method:
- ✅ Email/Password
- ✅ Google

## 4. Deployar en orden

```bash
# Instalar dependencias de functions
cd functions && npm install && cd ..

# 1. Firestore rules + indexes
firebase deploy --only firestore

# 2. Storage rules
firebase deploy --only storage

# 3. Cloud Functions
firebase deploy --only functions

# 4. Todo junto (para producción)
npm run build
firebase deploy --only hosting
```

## 5. Crear el primer admin

Después del primer deploy, en Firebase Console → Firestore:
1. Ir a usuarios/{tu-uid}
2. Cambiar `tipo: "registrado"` → `tipo: "admin"`

O desde la consola de Firebase Functions:
```js
// En Firebase Console → Functions → Shell
asignarRol({userId: "TU_UID", tipo: "admin"})
// ⚠ Este comando falla la primera vez porque nadie es admin aún
// La primera vez hay que hacerlo manualmente en Firestore
```

## 6. Verificar que funciona

```bash
# Probar en local con el emulador
firebase emulators:start

# Ver logs de functions
firebase functions:log

# Testear la función de IA
# En el browser (con sesión de negocio):
# Panel → Marketing → "Generar con IA"
```

## 7. Estructura en Firestore

```
/negocios/{negId}
  nm, cat, tel, wa, web, dir, horario, activo, canton
  /items/{itemId}
    nm, desc, pr, prNum, cat, sub, activo, fotos[]

/profesionales/{proId}
  nm, of, tel, wa, activo, catalogType
  /servicios/{svcId}
    nm, desc, pr, prNum, cat

/pedidos/{pedidoId}
  negocioId, clienteId, items[], total, notas, st, createdAt

/usuarios/{uid}
  uid, email, nm, tipo, negId, proId, activo, createdAt

/clasificados/{docId}
  userId, cat, nm, desc, pr, fotos[], activo, createdAt

/config/rolPerms
  negocio: { portal:[], panel:[], navbot:[] }
  profesional: { ... }
  ...

/config/taxonomy
  (copia de CATALOG_TAXONOMY)

/noticias/{docId}
  titulo, desc, url, medio, activo

/eventos/{docId}
  nm, loc, fecha, activo
```

## 8. Migrar datos del HTML a Firestore (script)

```js
// scripts/seed.js — ejecutar una sola vez
const admin = require('firebase-admin');
const { PROVEEDORES } = require('./src/data/proveedores.js');
const { PROS } = require('./src/data/pros.js');

admin.initializeApp();
const db = admin.firestore();

async function seed() {
  // Subir PROVEEDORES
  const batch = db.batch();
  PROVEEDORES.filter(Boolean).forEach(neg => {
    const ref = db.collection('negocios').doc(neg.id);
    batch.set(ref, { ...neg, activo: true, createdAt: new Date() });
  });
  
  // Subir PROS
  PROS.filter(Boolean).forEach(pro => {
    const ref = db.collection('profesionales').doc(String(pro.id));
    batch.set(ref, { ...pro, activo: true, createdAt: new Date() });
  });
  
  await batch.commit();
  console.log('✓ Datos sembrados en Firestore');
}

seed();
```

```bash
node --require firebase-admin scripts/seed.js
```

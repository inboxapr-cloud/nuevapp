{
  "name": "micanton-functions",
  "version": "1.0.0",
  "engines": { "node": "20" },
  "main": "src/index.js",
  "scripts": {
    "deploy":      "firebase deploy --only functions",
    "deploy:auth": "firebase deploy --only functions:onCreateUser,functions:asignarRol",
    "deploy:ai":   "firebase deploy --only functions:generateContent",
    "shell":       "firebase functions:shell",
    "logs":        "firebase functions:log"
  },
  "dependencies": {
    "firebase-admin":    "^12.2.0",
    "firebase-functions":"^5.0.0",
    "@anthropic-ai/sdk": "^0.24.0"
  },
  "devDependencies": {
    "firebase-functions-test": "^3.1.0"
  }
}

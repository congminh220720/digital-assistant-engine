const admin = require('firebase-admin');
const FIRESTORE_EMULATOR_HOST = "localhost:8080"
// credential: admin.credential.cert(serviceAccount)
const serviceAccount = 'E:/Node js ( PJ )/ggk/digital-assistant/digital-assitant-344814-3c9b481f2d1b.json';
admin.initializeApp({projectId: "digital-assitant-344814"}); 
const db = admin.firestore();


module.exports = db;

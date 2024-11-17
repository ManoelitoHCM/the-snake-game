import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

// Configuração do Firebase com variáveis de ambiente
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'), // Corrigir quebras de linha
  }),
});

// Obter instância do Firestore
const db = admin.firestore();

export default db;

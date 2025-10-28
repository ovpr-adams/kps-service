import { testSMTPConnection, sendContactEmail } from './utils/emailService.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('🧪 Test de la configuration e-mail o2switch...\n');

// Test de connexion SMTP
console.log('1. Test de connexion SMTP...');
const connectionTest = await testSMTPConnection();

if (connectionTest) {
  console.log('✅ Connexion SMTP réussie !\n');
  
  // Test d'envoi d'e-mail
  console.log('2. Test d\'envoi d\'e-mail...');
  
  const testContact = {
    name: 'Test KPS Services',
    email: 'test@example.com',
    phone: '01 23 45 67 89',
    subject: 'information',
    message: 'Ceci est un message de test pour vérifier le fonctionnement de l\'envoi d\'e-mails via o2switch.'
  };
  
  try {
    const result = await sendContactEmail(testContact);
    console.log('✅ E-mail de test envoyé avec succès !');
    console.log('📧 Message ID:', result.messageId);
    console.log('📬 Destinataires:', result.receivers.join(', '));
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'e-mail de test:', error.message);
  }
} else {
  console.log('❌ Échec de la connexion SMTP');
  console.log('Vérifiez votre configuration dans le fichier .env');
}

console.log('\n🔧 Configuration actuelle:');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_SECURE:', process.env.EMAIL_SECURE);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
console.log('EMAIL_TO:', process.env.EMAIL_TO);

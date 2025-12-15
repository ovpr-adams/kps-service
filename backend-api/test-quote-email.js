import dotenv from 'dotenv';
import { sendQuoteConfirmationEmail, sendQuoteNotificationEmail } from './utils/emailService.js';

dotenv.config();

// Données de test pour simuler une demande de devis
const testQuoteData = {
  name: 'Jean Dupont',
  email: 'votre-email-test@gmail.com', // ⚠️ Remplacer par votre email pour tester
  phone: '06 12 34 56 78',
  company: 'ABC Corporation',
  service: 'nettoyage-industriel',
  surface: 500,
  frequency: 'hebdomadaire',
  urgency: 'urgent',
  description: 'Besoin de nettoyage pour un entrepôt de 500m². Intervention souhaitée rapidement.'
};

console.log('🧪 Test d\'envoi d\'emails de devis...\n');
console.log('📋 Données de test:', testQuoteData);
console.log('\n' + '='.repeat(60) + '\n');

// Test email client
console.log('📧 Test 1: Envoi email de confirmation au CLIENT...');
sendQuoteConfirmationEmail(testQuoteData)
  .then(result => {
    console.log('✅ Email client envoyé avec succès!');
    console.log('   Message ID:', result.messageId);
    console.log('   Destinataire:', result.recipient);
    console.log('\n' + '='.repeat(60) + '\n');

    // Test email équipe
    console.log('📧 Test 2: Envoi email de notification à l\'ÉQUIPE...');
    return sendQuoteNotificationEmail(testQuoteData);
  })
  .then(result => {
    console.log('✅ Email équipe envoyé avec succès!');
    console.log('   Message ID:', result.messageId);
    console.log('   Destinataires:', result.receivers);
    console.log('\n' + '='.repeat(60) + '\n');
    console.log('🎉 TOUS LES TESTS RÉUSSIS!');
    console.log('\n✅ Le système d\'envoi d\'emails fonctionne correctement.');
    console.log('✅ Vérifiez vos boîtes email pour voir les messages reçus.');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ ERREUR lors du test:', error.message);
    console.error('\n⚠️  Vérifiez votre configuration:');
    console.error('   - EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS dans .env');
    console.error('   - Connexion internet');
    console.error('   - Paramètres SMTP corrects');
    process.exit(1);
  });

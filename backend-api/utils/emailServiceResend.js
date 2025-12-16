import { Resend } from 'resend';

// Lazy initialization pour s'assurer que dotenv est chargé
let resend = null;
const getResend = () => {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY manquante dans les variables d\'environnement');
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
};

const getReceivers = () => process.env.EMAIL_TO?.split(',') || [
  'contact@kpsservices.fr',
  'commercial@kpsservices.fr'
];

// Email de contact
export const sendContactEmail = async (contactData) => {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #16a34a;">📧 Nouveau Message de Contact</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom :</strong> ${contactData.name}</p>
            <p><strong>Email :</strong> ${contactData.email}</p>
            <p><strong>Téléphone :</strong> ${contactData.phone || 'Non fourni'}</p>
            <p><strong>Sujet :</strong> ${contactData.subject}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #16a34a;">
            <h3>Message :</h3>
            <p>${contactData.message}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
            Message reçu le ${new Date().toLocaleString('fr-FR')}
          </p>
        </div>
      </body>
      </html>
    `;

    const { data, error } = await getResend().emails.send({
      from: process.env.EMAIL_FROM || 'KPS Services <contact@kpsservices.fr>',
      to: getReceivers(),
      subject: `Nouveau message - ${contactData.subject} - ${contactData.name}`,
      html: htmlContent
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('✅ Email de contact envoyé via Resend:', data.id);
    return { success: true, messageId: data.id };

  } catch (error) {
    console.error('❌ Erreur Resend:', error.message);
    throw new Error(`Erreur d'envoi d'e-mail: ${error.message}`);
  }
};

// Email confirmation client devis
export const sendQuoteConfirmationEmail = async (quoteData) => {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"></head>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #16a34a;">🎉 Demande de Devis Reçue !</h2>
          
          <p>Bonjour <strong>${quoteData.name}</strong>,</p>
          <p>Nous avons bien reçu votre demande de devis et nous vous en remercions !</p>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Récapitulatif :</h3>
            <p><strong>Service :</strong> ${quoteData.service}</p>
            <p><strong>Surface :</strong> ${quoteData.surface} m²</p>
            <p><strong>Fréquence :</strong> ${quoteData.frequency}</p>
            <p><strong>Urgence :</strong> ${quoteData.urgency}</p>
          </div>
          
          <p><strong>Notre équipe va vous contacter sous 24h.</strong></p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 14px;">
            📞 <strong>01 23 45 67 89</strong><br>
            📧 <strong>contact@kpsservices.fr</strong>
          </p>
        </div>
      </body>
      </html>
    `;

    const { data, error } = await getResend().emails.send({
      from: process.env.EMAIL_FROM || 'KPS Services <contact@kpsservices.fr>',
      to: quoteData.email,
      subject: `Confirmation de votre demande de devis - KPS Services`,
      html: htmlContent
    });

    if (error) throw new Error(error.message);

    console.log(`✅ Email confirmation client envoyé: ${quoteData.email}`);
    return { success: true, messageId: data.id };

  } catch (error) {
    console.error('❌ Erreur email client:', error.message);
    throw new Error(`Erreur d'envoi d'e-mail client: ${error.message}`);
  }
};

// Email notification équipe devis
export const sendQuoteNotificationEmail = async (quoteData) => {
  try {
    const urgencyColors = {
      urgent: '#ef4444',
      moyen: '#f59e0b',
      faible: '#10b981'
    };

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"></head>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #16a34a;">🔔 Nouvelle Demande de Devis</h2>
          
          <div style="background: ${urgencyColors[quoteData.urgency] || '#f59e0b'}; color: white; padding: 10px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <strong>⏰ Urgence : ${quoteData.urgency?.toUpperCase()}</strong>
          </div>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
            <h3>Informations Client :</h3>
            <p><strong>👤 Nom :</strong> ${quoteData.name}</p>
            <p><strong>📧 Email :</strong> ${quoteData.email}</p>
            <p><strong>📞 Téléphone :</strong> ${quoteData.phone}</p>
            <p><strong>🏢 Entreprise :</strong> ${quoteData.company || 'Non fournie'}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
            <h3>Détails du Projet :</h3>
            <p><strong>🧹 Service :</strong> ${quoteData.service}</p>
            <p><strong>📏 Surface :</strong> ${quoteData.surface} m²</p>
            <p><strong>📅 Fréquence :</strong> ${quoteData.frequency}</p>
            <p><strong>📝 Description :</strong></p>
            <p>${quoteData.description || 'Aucune description fournie'}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 12px;">
            Reçu le ${new Date().toLocaleString('fr-FR')}
          </p>
        </div>
      </body>
      </html>
    `;

    const { data, error } = await getResend().emails.send({
      from: process.env.EMAIL_FROM || 'KPS Services <contact@kpsservices.fr>',
      to: getReceivers(),
      subject: `Nouvelle demande de devis - ${quoteData.service} - ${quoteData.name}`,
      html: htmlContent
    });

    if (error) throw new Error(error.message);

    console.log('✅ Email notification équipe envoyé:', data.id);
    return { success: true, messageId: data.id };

  } catch (error) {
    console.error('❌ Erreur email équipe:', error.message);
    throw new Error(`Erreur d'envoi d'e-mail équipe: ${error.message}`);
  }
};

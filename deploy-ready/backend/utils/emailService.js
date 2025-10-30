import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configuration du transporteur SMTP
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true' || false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Envoyer un e-mail de contact
export const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    // Vérifier que le mot de passe SMTP est configuré
    if (!process.env.EMAIL_PASS) {
      throw new Error('EMAIL_PASS non configuré dans les variables d\'environnement');
    }

    // Destinataires - Configuration flexible
    const receivers = process.env.EMAIL_TO?.split(',') || [
      'contact@kpsservices.fr',
      'commercial@kpsservices.fr'
    ];

    // Sujet de l'e-mail
    const subject = `Nouveau message de contact - ${contactData.subject} - ${contactData.name}`;

    // Corps de l'e-mail en HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nouveau message de contact</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #16a34a; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #16a34a; }
          .value { margin-top: 5px; }
          .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nouveau message de contact</h1>
            <p>KPS Services - Formulaire de contact</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">Nom complet :</div>
              <div class="value">${contactData.name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email :</div>
              <div class="value"><a href="mailto:${contactData.email}">${contactData.email}</a></div>
            </div>
            
            ${contactData.phone ? `
            <div class="field">
              <div class="label">Téléphone :</div>
              <div class="value">${contactData.phone}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Sujet :</div>
              <div class="value">${contactData.subject}</div>
            </div>
            
            <div class="field">
              <div class="label">Message :</div>
              <div class="value" style="white-space: pre-wrap;">${contactData.message}</div>
            </div>
            
            <div class="field">
              <div class="label">Date d'envoi :</div>
              <div class="value">${new Date().toLocaleString('fr-FR')}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>Ce message a été envoyé depuis le formulaire de contact du site KPS Services</p>
            <p>Pour répondre, utilisez l'adresse : ${contactData.email}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Corps de l'e-mail en texte brut
    const textContent = `
Nouveau message de contact - KPS Services

Nom complet : ${contactData.name}
Email : ${contactData.email}
${contactData.phone ? `Téléphone : ${contactData.phone}` : ''}
Sujet : ${contactData.subject}

Message :
${contactData.message}

Date d'envoi : ${new Date().toLocaleString('fr-FR')}

---
Ce message a été envoyé depuis le formulaire de contact du site KPS Services
Pour répondre, utilisez l'adresse : ${contactData.email}
    `;

    // Options de l'e-mail
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'KPS Services <noreply@kps-services.com>',
      to: receivers,
      subject: subject,
      text: textContent,
      html: htmlContent,
      replyTo: contactData.email
    };

    // Envoyer l'e-mail
    const result = await transporter.sendMail(mailOptions);
    
    console.log('✅ E-mail envoyé avec succès:', result.messageId);
    return {
      success: true,
      messageId: result.messageId,
      receivers: receivers
    };

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'e-mail:', error.message);
    throw new Error(`Erreur d'envoi d'e-mail: ${error.message}`);
  }
};

// Tester la connexion SMTP
export const testSMTPConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Connexion SMTP o2switch réussie');
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion SMTP:', error.message);
    return false;
  }
};

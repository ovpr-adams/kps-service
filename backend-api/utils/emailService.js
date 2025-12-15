import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configuration du transporteur SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
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

// Envoyer un e-mail de confirmation de devis au CLIENT
export const sendQuoteConfirmationEmail = async (quoteData) => {
  try {
    const transporter = createTransporter();

    if (!process.env.EMAIL_PASS) {
      throw new Error('EMAIL_PASS non configuré dans les variables d\'environnement');
    }

    const subject = `Confirmation de votre demande de devis - KPS Services`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Confirmation de devis</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #FFD700; color: #111; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #CC9E00; }
          .value { margin-top: 5px; }
          .footer { background: #111; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
          .highlight { background: #FFD700; color: #111; padding: 15px; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          ul { padding-left: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🎉 Demande de Devis Reçue !</h1>
            <p style="margin: 10px 0 0 0;">KPS Services - Nettoyage Professionnel</p>
          </div>
          
          <div class="content">
            <p>Bonjour <strong>${quoteData.name}</strong>,</p>
            
            <p>Nous avons bien reçu votre demande de devis et nous vous en remercions !</p>
            
            <div class="highlight">
              📋 Notre équipe va analyser votre demande et vous contacter sous 24h.
            </div>
            
            <h3 style="color: #111;">Récapitulatif de votre demande :</h3>
            
            <div class="field">
              <div class="label">Service demandé :</div>
              <div class="value">${quoteData.service}</div>
            </div>
            
            ${quoteData.surface ? `
            <div class="field">
              <div class="label">Surface :</div>
              <div class="value">${quoteData.surface} m²</div>
            </div>
            ` : ''}
            
            ${quoteData.frequency ? `
            <div class="field">
              <div class="label">Fréquence :</div>
              <div class="value">${quoteData.frequency}</div>
            </div>
            ` : ''}
            
            ${quoteData.urgency ? `
            <div class="field">
              <div class="label">Urgence :</div>
              <div class="value">${quoteData.urgency}</div>
            </div>
            ` : ''}
            
            ${quoteData.description ? `
            <div class="field">
              <div class="label">Description :</div>
              <div class="value">${quoteData.description}</div>
            </div>
            ` : ''}
            
            <h3 style="color: #111;">Ce qui se passe maintenant :</h3>
            <ul>
              <li>✅ Votre demande est enregistrée</li>
              <li>📞 Notre équipe va vous contacter sous 24h</li>
              <li>📄 Vous recevrez un devis détaillé et personnalisé</li>
              <li>🚀 Planification de l'intervention si vous validez</li>
            </ul>
            
            <p><strong>Besoin d'informations complémentaires ?</strong></p>
            <p>N'hésitez pas à nous contacter :</p>
            <p>📞 Téléphone : 01 23 45 67 89<br>
            📧 Email : contact@kps-services.fr</p>
          </div>
          
          <div class="footer">
            <p style="margin: 0 0 10px 0;"><strong>KPS Services</strong> - Votre partenaire nettoyage professionnel</p>
            <p style="margin: 0 0 10px 0;">123 Avenue de la Propreté, 75001 Paris</p>
            <p style="font-size: 12px; margin: 0; color: #999;">
              Cet email a été envoyé automatiquement suite à votre demande de devis.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
Confirmation de votre demande de devis - KPS Services

Bonjour ${quoteData.name},

Nous avons bien reçu votre demande de devis et nous vous en remercions !

Notre équipe va analyser votre demande et vous contacter sous 24h.

Récapitulatif de votre demande :
- Service : ${quoteData.service}
${quoteData.surface ? `- Surface : ${quoteData.surface} m²` : ''}
${quoteData.frequency ? `- Fréquence : ${quoteData.frequency}` : ''}
${quoteData.urgency ? `- Urgence : ${quoteData.urgency}` : ''}
${quoteData.description ? `- Description : ${quoteData.description}` : ''}

Ce qui se passe maintenant :
✅ Votre demande est enregistrée
📞 Notre équipe va vous contacter sous 24h
📄 Vous recevrez un devis détaillé et personnalisé
🚀 Planification de l'intervention si vous validez

Besoin d'informations complémentaires ?
📞 Téléphone : 01 23 45 67 89
📧 Email : contact@kps-services.fr

---
KPS Services - Votre partenaire nettoyage professionnel
123 Avenue de la Propreté, 75001 Paris
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'KPS Services <noreply@kps-services.com>',
      to: quoteData.email,
      subject: subject,
      text: textContent,
      html: htmlContent
    };

    const result = await transporter.sendMail(mailOptions);

    console.log('✅ Email de confirmation envoyé au client:', result.messageId);
    return {
      success: true,
      messageId: result.messageId,
      recipient: quoteData.email
    };

  } catch (error) {
    console.error('❌ Erreur envoi email client:', error.message);
    throw new Error(`Erreur d'envoi d'e-mail client: ${error.message}`);
  }
};

// Envoyer un e-mail de notification à l'ÉQUIPE KPS
export const sendQuoteNotificationEmail = async (quoteData) => {
  try {
    const transporter = createTransporter();

    if (!process.env.EMAIL_PASS) {
      throw new Error('EMAIL_PASS non configuré dans les variables d\'environnement');
    }

    // Destinataires - Configuration flexible
    const receivers = process.env.EMAIL_TO?.split(',') || [
      'contact@kpsservices.fr',
      'commercial@kpsservices.fr'
    ];

    const subject = `🔔 Nouvelle demande de devis - ${quoteData.service} - ${quoteData.name}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nouvelle demande de devis</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #FFD700; color: #111; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 20px; }
          .field { margin-bottom: 15px; padding: 10px; background: white; border-left: 4px solid #FFD700; }
          .label { font-weight: bold; color: #111; }
          .value { margin-top: 5px; }
          .footer { background: #111; color: white; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 10px 10px; }
          .urgent { background: #ff4444; color: white; padding: 10px; border-radius: 5px; text-align: center; margin: 15px 0; }
          .actions { background: #FFD700; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🔔 Nouvelle Demande de Devis</h1>
            <p style="margin: 10px 0 0 0;">KPS Services - Tableau de bord</p>
          </div>
          
          <div class="content">
            ${quoteData.urgency === 'urgent' ? `
            <div class="urgent">
              <strong>⚠️ DEMANDE URGENTE - Intervention rapide nécessaire</strong>
            </div>
            ` : ''}
            
            <h3 style="color: #111;">Informations Client :</h3>
            
            <div class="field">
              <div class="label">👤 Nom complet :</div>
              <div class="value">${quoteData.name}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Email :</div>
              <div class="value"><a href="mailto:${quoteData.email}">${quoteData.email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">📞 Téléphone :</div>
              <div class="value"><a href="tel:${quoteData.phone}">${quoteData.phone}</a></div>
            </div>
            
            ${quoteData.company ? `
            <div class="field">
              <div class="label">🏢 Entreprise :</div>
              <div class="value">${quoteData.company}</div>
            </div>
            ` : ''}
            
            <h3 style="color: #111;">Détails du Projet :</h3>
            
            <div class="field">
              <div class="label">🧹 Service demandé :</div>
              <div class="value"><strong>${quoteData.service}</strong></div>
            </div>
            
            ${quoteData.surface ? `
            <div class="field">
              <div class="label">📏 Surface :</div>
              <div class="value">${quoteData.surface} m²</div>
            </div>
            ` : ''}
            
            ${quoteData.frequency ? `
            <div class="field">
              <div class="label">📅 Fréquence :</div>
              <div class="value">${quoteData.frequency}</div>
            </div>
            ` : ''}
            
            ${quoteData.urgency ? `
            <div class="field">
              <div class="label">⏰ Urgence :</div>
              <div class="value"><strong>${quoteData.urgency}</strong></div>
            </div>
            ` : ''}
            
            ${quoteData.description ? `
            <div class="field">
              <div class="label">📝 Description :</div>
              <div class="value" style="white-space: pre-wrap;">${quoteData.description}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">🕐 Date de réception :</div>
              <div class="value">${new Date().toLocaleString('fr-FR')}</div>
            </div>
            
            <div class="actions">
              <h3 style="margin-top: 0; color: #111;">Actions à effectuer :</h3>
              <p style="margin: 0;">
                ✅ Contacter le client sous 24h<br>
                ✅ Analyser les besoins spécifiques<br>
                ✅ Préparer un devis détaillé<br>
                ✅ Planifier une visite si nécessaire
              </p>
            </div>
          </div>
          
          <div class="footer">
            <p style="margin: 0 0 5px 0;">Cette notification a été envoyée automatiquement depuis le formulaire de devis</p>
            <p style="margin: 0;">Pour répondre au client : ${quoteData.email} | ${quoteData.phone}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
🔔 NOUVELLE DEMANDE DE DEVIS - KPS Services

${quoteData.urgency === 'urgent' ? '⚠️ DEMANDE URGENTE - Intervention rapide nécessaire\n' : ''}

INFORMATIONS CLIENT :
👤 Nom : ${quoteData.name}
📧 Email : ${quoteData.email}
📞 Téléphone : ${quoteData.phone}
${quoteData.company ? `🏢 Entreprise : ${quoteData.company}` : ''}

DÉTAILS DU PROJET :
🧹 Service : ${quoteData.service}
${quoteData.surface ? `📏 Surface : ${quoteData.surface} m²` : ''}
${quoteData.frequency ? `📅 Fréquence : ${quoteData.frequency}` : ''}
${quoteData.urgency ? `⏰ Urgence : ${quoteData.urgency}` : ''}
${quoteData.description ? `📝 Description : ${quoteData.description}` : ''}

🕐 Date de réception : ${new Date().toLocaleString('fr-FR')}

ACTIONS À EFFECTUER :
✅ Contacter le client sous 24h
✅ Analyser les besoins spécifiques
✅ Préparer un devis détaillé
✅ Planifier une visite si nécessaire

---
Pour répondre au client :
Email : ${quoteData.email}
Téléphone : ${quoteData.phone}
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'KPS Services <noreply@kps-services.com>',
      to: receivers,
      subject: subject,
      text: textContent,
      html: htmlContent,
      replyTo: quoteData.email
    };

    const result = await transporter.sendMail(mailOptions);

    console.log('✅ Email de notification envoyé à l\'équipe:', result.messageId);
    return {
      success: true,
      messageId: result.messageId,
      receivers: receivers
    };

  } catch (error) {
    console.error('❌ Erreur envoi email équipe:', error.message);
    throw new Error(`Erreur d'envoi d'e-mail équipe: ${error.message}`);
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

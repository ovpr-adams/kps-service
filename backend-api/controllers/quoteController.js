import Quote from '../models/Quote.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendError, sendCreated, sendNotFound } from '../utils/responseHelpers.js';
import { getPaginationParams, sendPaginatedResponse } from '../utils/paginationHelpers.js';
import { sendQuoteConfirmationEmail, sendQuoteNotificationEmail } from '../utils/emailService.js';

// Créer une nouvelle demande de devis
export const createQuote = asyncHandler(async (req, res) => {
  // 1. Sauvegarder le devis dans MongoDB
  const quote = new Quote(req.body);
  await quote.save();

  // 2. Préparer les résultats d'envoi d'email
  const emailResults = {
    clientEmailSent: false,
    teamEmailSent: false,
    clientEmailError: null,
    teamEmailError: null
  };

  // 3. Envoyer l'email de confirmation au CLIENT
  try {
    const clientEmailResult = await sendQuoteConfirmationEmail(quote.toObject());
    emailResults.clientEmailSent = true;
    emailResults.clientEmailMessageId = clientEmailResult.messageId;
    console.log(`✅ Email de confirmation envoyé au client ${quote.email}`);
  } catch (clientEmailError) {
    emailResults.clientEmailError = clientEmailError.message;
    console.error('❌ Erreur envoi email client:', clientEmailError.message);
  }

  // 4. Envoyer l'email de notification à l'ÉQUIPE
  try {
    const teamEmailResult = await sendQuoteNotificationEmail(quote.toObject());
    emailResults.teamEmailSent = true;
    emailResults.teamEmailMessageId = teamEmailResult.messageId;
    console.log(`✅ Email de notification envoyé à l'équipe KPS`);
  } catch (teamEmailError) {
    emailResults.teamEmailError = teamEmailError.message;
    console.error('❌ Erreur envoi email équipe:', teamEmailError.message);
  }

  // 5. Retourner la réponse avec les informations d'email
  sendCreated(res, 'Demande de devis reçue avec succès', {
    ...quote.toObject(),
    emailStatus: emailResults
  });
});

// Récupérer tous les devis (admin)
export const getAllQuotes = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const { page, limit, skip } = getPaginationParams(req.query);

  const filter = {};
  if (status) filter.status = status;

  const quotes = await Quote.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  const total = await Quote.countDocuments(filter);

  sendPaginatedResponse(res, quotes, total, page, limit, 'Devis récupérés avec succès');
});

// Récupérer un devis par ID
export const getQuoteById = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id);

  if (!quote) {
    return sendNotFound(res, 'Devis non trouvé');
  }

  sendSuccess(res, 'Devis récupéré avec succès', quote);
});

// Mettre à jour un devis (admin)
export const updateQuote = asyncHandler(async (req, res) => {
  const quote = await Quote.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!quote) {
    return sendNotFound(res, 'Devis non trouvé');
  }

  sendSuccess(res, 'Devis mis à jour avec succès', quote);
});

// Supprimer un devis (admin)
export const deleteQuote = asyncHandler(async (req, res) => {
  const quote = await Quote.findByIdAndDelete(req.params.id);

  if (!quote) {
    return sendNotFound(res, 'Devis non trouvé');
  }

  sendSuccess(res, 'Devis supprimé avec succès');
});


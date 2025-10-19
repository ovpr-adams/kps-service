import Contact from '../models/Contact.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendError, sendCreated, sendNotFound } from '../utils/responseHelpers.js';
import { getPaginationParams, sendPaginatedResponse } from '../utils/paginationHelpers.js';

// Créer un nouveau message de contact
export const createContact = asyncHandler(async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  
  // TODO: Envoyer un email de confirmation au client
  // TODO: Notifier l'équipe KPS Services
  
  sendCreated(res, 'Message envoyé avec succès', contact);
});

// Récupérer tous les messages (admin)
export const getAllContacts = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const { page, limit, skip } = getPaginationParams(req.query);
  
  const filter = {};
  if (status) filter.status = status;
  
  const contacts = await Contact.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);
  
  const total = await Contact.countDocuments(filter);
  
  sendPaginatedResponse(res, contacts, total, page, limit, 'Messages récupérés avec succès');
});

// Récupérer un message par ID
export const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  
  if (!contact) {
    return sendNotFound(res, 'Message non trouvé');
  }
  
  sendSuccess(res, 'Message récupéré avec succès', contact);
});

// Mettre à jour un message (admin)
export const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  if (!contact) {
    return sendNotFound(res, 'Message non trouvé');
  }
  
  sendSuccess(res, 'Message mis à jour avec succès', contact);
});

// Supprimer un message (admin)
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  
  if (!contact) {
    return sendNotFound(res, 'Message non trouvé');
  }
  
  sendSuccess(res, 'Message supprimé avec succès');
});


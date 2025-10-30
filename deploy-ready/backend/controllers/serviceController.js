import Service from '../models/Service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendError, sendCreated, sendNotFound } from '../utils/responseHelpers.js';

// Créer un nouveau service (admin)
export const createService = asyncHandler(async (req, res) => {
  const service = new Service(req.body);
  await service.save();
  
  sendCreated(res, 'Service créé avec succès', service);
});

// Récupérer tous les services
export const getAllServices = asyncHandler(async (req, res) => {
  const { category, isActive } = req.query;
  
  const filter = {};
  if (category) filter.category = category;
  if (isActive !== undefined) filter.isActive = isActive === 'true';
  
  const services = await Service.find(filter).sort({ order: 1, createdAt: -1 });
  
  res.status(200).json({
    success: true,
    message: 'Services récupérés avec succès',
    data: services,
    total: services.length
  });
});

// Récupérer un service par slug
export const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });
  
  if (!service) {
    return sendNotFound(res, 'Service non trouvé');
  }
  
  sendSuccess(res, 'Service récupéré avec succès', service);
});

// Mettre à jour un service (admin)
export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  if (!service) {
    return sendNotFound(res, 'Service non trouvé');
  }
  
  sendSuccess(res, 'Service mis à jour avec succès', service);
});

// Supprimer un service (admin)
export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  
  if (!service) {
    return sendNotFound(res, 'Service non trouvé');
  }
  
  sendSuccess(res, 'Service supprimé avec succès');
});



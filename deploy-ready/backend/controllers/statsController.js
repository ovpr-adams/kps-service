import Stat from '../models/Stats.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendCreated, sendNotFound } from '../utils/responseHelpers.js';

export const getAllStats = asyncHandler(async (_req, res) => {
  const stats = await Stat.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
  sendSuccess(res, 'Statistiques récupérées', stats);
});

export const createStat = asyncHandler(async (req, res) => {
  const created = await Stat.create(req.body);
  sendCreated(res, 'Stat créée', created);
});

export const updateStat = asyncHandler(async (req, res) => {
  const updated = await Stat.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) return sendNotFound(res, 'Stat non trouvée');
  sendSuccess(res, 'Stat mise à jour', updated);
});

export const deleteStat = asyncHandler(async (req, res) => {
  const deleted = await Stat.findByIdAndDelete(req.params.id);
  if (!deleted) return sendNotFound(res, 'Stat non trouvée');
  sendSuccess(res, 'Stat supprimée');
});



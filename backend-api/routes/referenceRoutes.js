import express from 'express';
import Reference from '../models/Reference.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendCreated, sendNotFound } from '../utils/responseHelpers.js';

const router = express.Router();

// Public list
router.get('/', asyncHandler(async (_req, res) => {
  const refs = await Reference.find().sort({ createdAt: -1 });
  sendSuccess(res, 'Références récupérées', refs);
}));

// Admin CRUD
router.post('/', authenticateAdmin, asyncHandler(async (req, res) => {
  const created = await Reference.create(req.body);
  sendCreated(res, 'Référence créée', created);
}));

router.put('/:id', authenticateAdmin, asyncHandler(async (req, res) => {
  const updated = await Reference.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return sendNotFound(res, 'Référence non trouvée');
  sendSuccess(res, 'Référence mise à jour', updated);
}));

router.delete('/:id', authenticateAdmin, asyncHandler(async (req, res) => {
  const deleted = await Reference.findByIdAndDelete(req.params.id);
  if (!deleted) return sendNotFound(res, 'Référence non trouvée');
  sendSuccess(res, 'Référence supprimée');
}));

export default router;



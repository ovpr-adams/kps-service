import express from 'express';
import Settings from '../models/Settings.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/responseHelpers.js';

const router = express.Router();

// GET public settings
router.get('/', asyncHandler(async (_req, res) => {
  const settings = await Settings.getOrCreate();
  sendSuccess(res, 'Paramètres récupérés', settings);
}));

// PUT update settings (admin)
router.put('/', authenticateAdmin, asyncHandler(async (req, res) => {
  const existing = await Settings.getOrCreate();
  Object.assign(existing, req.body || {});
  await existing.save();
  sendSuccess(res, 'Paramètres mis à jour', existing);
}));

export default router;



import express from 'express';
import {
  createService,
  getAllServices,
  getServiceBySlug,
  updateService,
  deleteService
} from '../controllers/serviceController.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { validateService } from '../middleware/validation.js';

const router = express.Router();

// Routes publiques
router.get('/', getAllServices);
router.get('/:slug', getServiceBySlug);

// Routes admin (authentification requise)
router.post('/', authenticateAdmin, validateService, createService);
router.put('/:id', authenticateAdmin, validateService, updateService);
router.delete('/:id', authenticateAdmin, deleteService);

export default router;



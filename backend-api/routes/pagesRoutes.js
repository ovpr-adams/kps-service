import express from 'express';
import {
  getAllPages,
  getPageBySlug,
  getPageById,
  createPage,
  updatePage,
  deletePage,
  duplicatePage
} from '../controllers/pagesController.js';
import { authenticate, authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Routes publiques
router.get('/:slug', getPageBySlug);

// Routes admin (authentification requise)
router.get('/', authenticateAdmin, getAllPages);
router.get('/id/:id', authenticateAdmin, getPageById);
router.post('/', authenticateAdmin, createPage);
router.put('/:slug', authenticateAdmin, updatePage);
router.delete('/:id', authenticateAdmin, deletePage);
router.post('/:slug/duplicate', authenticateAdmin, duplicatePage);

export default router;














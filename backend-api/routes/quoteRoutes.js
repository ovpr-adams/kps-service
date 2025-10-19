import express from 'express';
import {
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote
} from '../controllers/quoteController.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { validateQuote } from '../middleware/validation.js';

const router = express.Router();

// Routes publiques
router.post('/', validateQuote, createQuote);

// Routes admin (authentification requise)
router.get('/', authenticateAdmin, getAllQuotes);
router.get('/:id', authenticateAdmin, getQuoteById);
router.put('/:id', authenticateAdmin, updateQuote);
router.delete('/:id', authenticateAdmin, deleteQuote);

export default router;



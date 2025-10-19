import express from 'express';
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact
} from '../controllers/contactController.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { validateContact } from '../middleware/validation.js';

const router = express.Router();

// Routes publiques
router.post('/', validateContact, createContact);

// Routes admin (authentification requise)
router.get('/', authenticateAdmin, getAllContacts);
router.get('/:id', authenticateAdmin, getContactById);
router.put('/:id', authenticateAdmin, updateContact);
router.delete('/:id', authenticateAdmin, deleteContact);

export default router;



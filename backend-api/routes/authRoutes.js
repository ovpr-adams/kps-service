import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
} from '../controllers/authController.js';
import { authenticate, authenticateAdmin } from '../middleware/auth.js';
import { validateLogin, validateRegister, validateChangePassword } from '../middleware/validation.js';

const router = express.Router();

// Routes publiques
router.post('/login', validateLogin, login);

// Routes protégées (authentification requise)
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.put('/change-password', authenticate, validateChangePassword, changePassword);

// Routes admin seulement
router.post('/register', authenticateAdmin, validateRegister, register);

export default router;

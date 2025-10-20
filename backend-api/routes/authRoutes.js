import express from 'express'
import { 
  login, 
  register, 
  getProfile, 
  logout, 
  verifyToken 
} from '../controllers/authController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Routes publiques
router.post('/login', login)
router.post('/register', register)

// Routes protégées
router.get('/profile', authenticateToken, getProfile)
router.post('/logout', authenticateToken, logout)
router.get('/verify', authenticateToken, verifyToken)

export default router
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// @desc    Authentifier un utilisateur
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Validation des données
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email et mot de passe requis'
    })
  }

  // Vérifier si l'utilisateur existe
  const user = await User.findOne({ email }).select('+password')
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Identifiants invalides'
    })
  }

  // Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password)
  
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Identifiants invalides'
    })
  }

  // Vérifier si l'utilisateur est admin
  if (!user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Accès refusé. Droits administrateur requis.'
    })
  }

  // Générer le token JWT
  const token = jwt.sign(
    { 
      userId: user._id,
      email: user.email,
      isAdmin: user.isAdmin 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  )

  // Configurer le cookie httpOnly sécurisé
  const isProduction = process.env.NODE_ENV === 'production'
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction, // HTTPS en production
    sameSite: isProduction ? 'strict' : 'lax', // 'lax' pour développement local
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 jours en millisecondes
    path: '/'
  }

  // Définir le cookie
  res.cookie('adminToken', token, cookieOptions)
  console.log('🍪 Cookie défini avec options:', cookieOptions)
  console.log('🍪 Token généré:', token.substring(0, 20) + '...')

  // Retourner les informations utilisateur (sans le mot de passe)
  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isAdmin: user.isAdmin,
    isActive: user.isActive,
    createdAt: user.createdAt
  }

  res.status(200).json({
    success: true,
    message: 'Connexion réussie',
    user: userResponse
  })
})

// @desc    Enregistrer un nouvel utilisateur
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body

  // Validation des données
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email et mot de passe sont requis'
    })
  }

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await User.findOne({ email })
  
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'Un utilisateur avec cet email existe déjà'
    })
  }

  // Hasher le mot de passe
  const saltRounds = 12
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  // Créer l'utilisateur
  const user = await User.create({
    email,
    password: hashedPassword,
    name: `${firstName} ${lastName}`.trim() || email.split('@')[0],
    isAdmin: false // Par défaut, pas admin
  })

  // Générer le token JWT
  const token = jwt.sign(
    { 
      userId: user._id,
      email: user.email,
      isAdmin: user.isAdmin 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  )

  // Retourner les informations utilisateur (sans le mot de passe)
  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isAdmin: user.isAdmin,
    isActive: user.isActive,
    createdAt: user.createdAt
  }

  res.status(201).json({
    success: true,
    message: 'Utilisateur créé avec succès',
    token,
    user: userResponse
  })
})

// @desc    Obtenir le profil de l'utilisateur connecté
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = asyncHandler(async (req, res) => {
  // req.user est déjà l'objet utilisateur complet (sans password) depuis le middleware authenticate
  // Pas besoin de refaire une requête à la base de données
  if (!req.user) {
    return res.status(404).json({
      success: false,
      message: 'Utilisateur non trouvé'
    })
  }

  res.status(200).json({
    success: true,
    user: req.user
  })
})

// @desc    Déconnecter l'utilisateur
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  // Supprimer le cookie httpOnly
  const isProduction = process.env.NODE_ENV === 'production'
  res.clearCookie('adminToken', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/'
  })

  res.status(200).json({
    success: true,
    message: 'Déconnexion réussie'
  })
})

// @desc    Vérifier le token
// @route   GET /api/auth/verify
// @access  Private
export const verifyToken = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Token valide',
    user: req.user
  })
})
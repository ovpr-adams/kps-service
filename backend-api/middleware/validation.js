import { body, validationResult } from 'express-validator';

// Middleware pour gérer les erreurs de validation
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Erreurs de validation',
      errors: errors.array()
    });
  }
  next();
};

// Validation pour les devis
export const validateQuote = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Le nom est requis')
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom doit contenir entre 2 et 100 caractères'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Email invalide'),
  
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Le téléphone est requis')
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('Format de téléphone invalide'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Le nom de l\'entreprise ne peut pas dépasser 200 caractères'),
  
  body('service')
    .notEmpty()
    .withMessage('Le type de service est requis')
    .isIn(['nettoyage-industriel', 'lavage-vitres', 'entretien-bureaux', 'autre'])
    .withMessage('Type de service invalide'),
  
  body('surface')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('La surface doit être un nombre positif'),
  
  body('frequency')
    .optional()
    .isIn(['ponctuel', 'hebdomadaire', 'mensuel', 'quotidien'])
    .withMessage('Fréquence invalide'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('La description ne peut pas dépasser 1000 caractères'),
  
  body('urgency')
    .optional()
    .isIn(['faible', 'moyen', 'urgent'])
    .withMessage('Niveau d\'urgence invalide'),
  
  handleValidationErrors
];

// Validation pour les contacts
export const validateContact = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Le nom est requis')
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom doit contenir entre 2 et 100 caractères'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Email invalide'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage('Format de téléphone invalide'),
  
  body('subject')
    .notEmpty()
    .withMessage('Le sujet est requis')
    .isIn(['devis', 'information', 'reclamation', 'partenariat', 'autre'])
    .withMessage('Sujet invalide'),
  
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Le message est requis')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Le message doit contenir entre 10 et 2000 caractères'),
  
  handleValidationErrors
];

// Validation pour les services
export const validateService = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Le titre est requis')
    .isLength({ min: 3, max: 200 })
    .withMessage('Le titre doit contenir entre 3 et 200 caractères'),
  
  body('slug')
    .trim()
    .notEmpty()
    .withMessage('Le slug est requis')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Le slug ne peut contenir que des lettres minuscules, chiffres et tirets'),
  
  body('category')
    .notEmpty()
    .withMessage('La catégorie est requise')
    .isIn(['nettoyage-industriel', 'lavage-vitres', 'entretien-bureaux', 'autre'])
    .withMessage('Catégorie invalide'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('La description est requise')
    .isLength({ min: 10, max: 5000 })
    .withMessage('La description doit contenir entre 10 et 5000 caractères'),
  
  body('shortDescription')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('La description courte ne peut pas dépasser 200 caractères'),
  
  body('features')
    .optional()
    .isArray()
    .withMessage('Les caractéristiques doivent être un tableau'),
  
  body('features.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Chaque caractéristique doit contenir entre 1 et 200 caractères'),
  
  body('pricing.startingPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Le prix de départ doit être un nombre positif'),
  
  body('pricing.unit')
    .optional()
    .isIn(['heure', 'jour', 'm²', 'projet', 'sur-devis'])
    .withMessage('Unité de prix invalide'),
  
  body('image')
    .optional()
    .trim()
    .isURL()
    .withMessage('L\'URL de l\'image est invalide'),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive doit être un booléen'),
  
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('L\'ordre doit être un nombre entier positif'),
  
  handleValidationErrors
];

// Validation pour l'authentification
export const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Email invalide'),
  
  body('password')
    .notEmpty()
    .withMessage('Le mot de passe est requis'),
  
  handleValidationErrors
];

export const validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Le nom est requis')
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom doit contenir entre 2 et 100 caractères'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Email invalide'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'),
  
  body('role')
    .optional()
    .isIn(['admin', 'user'])
    .withMessage('Rôle invalide'),
  
  handleValidationErrors
];

export const validateChangePassword = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Le mot de passe actuel est requis'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Le nouveau mot de passe doit contenir au moins 6 caractères')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Le nouveau mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'),
  
  handleValidationErrors
];


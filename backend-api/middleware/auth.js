import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware d'authentification
export const authenticate = async (req, res, next) => {
  try {
    // Essayer de récupérer le token depuis les cookies (priorité)
    let token = req.cookies?.adminToken;
    
    // Fallback sur l'Authorization header si pas de cookie
    if (!token) {
      token = req.header('Authorization')?.replace('Bearer ', '');
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token d\'authentification requis'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId || decoded.id).select('-password');
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Token invalide ou utilisateur inactif'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token invalide',
      error: error.message
    });
  }
};

// Middleware pour vérifier le rôle admin
export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Accès refusé. Droits administrateur requis.'
    });
  }
};

// Middleware combiné : authentification + admin
export const authenticateAdmin = async (req, res, next) => {
  try {
    // Debug: Afficher les cookies reçus
    console.log('🔍 Cookies reçus:', req.cookies);
    console.log('🔍 Headers Authorization:', req.header('Authorization'));
    
    // Essayer de récupérer le token depuis les cookies (priorité)
    let token = req.cookies?.adminToken;
    
    // Fallback sur l'Authorization header si pas de cookie
    if (!token) {
      token = req.header('Authorization')?.replace('Bearer ', '');
    }
    
    if (!token) {
      console.log('❌ Aucun token trouvé');
      return res.status(401).json({
        success: false,
        message: 'Token d\'authentification requis'
      });
    }
    
    console.log('✅ Token trouvé:', token.substring(0, 20) + '...');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId || decoded.id).select('-password');
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Token invalide ou utilisateur inactif'
      });
    }

    // Vérifier les droits admin
    if (!user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé. Droits administrateur requis.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token invalide',
      error: error.message
    });
  }
};

// Alias pour compatibilité
export const authenticateToken = authenticate;


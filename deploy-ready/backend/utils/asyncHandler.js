// Wrapper pour gérer les erreurs async/await automatiquement

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Middleware de gestion d'erreur global amélioré
export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Erreur de validation Mongoose
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    return res.status(400).json({
      success: false,
      message: 'Erreurs de validation',
      error: message
    });
  }

  // Erreur de duplication (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} existe déjà`;
    return res.status(400).json({
      success: false,
      message,
      error: message
    });
  }

  // Erreur CastError (ObjectId invalide)
  if (err.name === 'CastError') {
    const message = 'Ressource non trouvée';
    return res.status(404).json({
      success: false,
      message,
      error: message
    });
  }

  // Erreur JWT
  if (err.name === 'JsonWebTokenError') {
    const message = 'Token JWT invalide';
    return res.status(401).json({
      success: false,
      message,
      error: message
    });
  }

  // Erreur JWT expirée
  if (err.name === 'TokenExpiredError') {
    const message = 'Token JWT expiré';
    return res.status(401).json({
      success: false,
      message,
      error: message
    });
  }

  // Erreur par défaut
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Erreur interne du serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};


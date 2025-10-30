// Helpers pour standardiser les réponses API

export const sendSuccess = (res, message, data = null, statusCode = 200) => {
  const response = {
    success: true,
    message
  };
  
  if (data !== null) {
    response.data = data;
  }
  
  res.status(statusCode).json(response);
};

export const sendError = (res, message, error = null, statusCode = 500) => {
  const response = {
    success: false,
    message
  };
  
  if (error && process.env.NODE_ENV === 'development') {
    response.error = typeof error === 'string' ? error : error.message;
  }
  
  res.status(statusCode).json(response);
};

export const sendCreated = (res, message, data) => {
  sendSuccess(res, message, data, 201);
};

export const sendNotFound = (res, message = 'Ressource non trouvée') => {
  sendError(res, message, null, 404);
};

export const sendValidationError = (res, message = 'Erreurs de validation', errors) => {
  res.status(400).json({
    success: false,
    message,
    errors
  });
};

export const sendUnauthorized = (res, message = 'Non autorisé') => {
  sendError(res, message, null, 401);
};

export const sendForbidden = (res, message = 'Accès refusé') => {
  sendError(res, message, null, 403);
};


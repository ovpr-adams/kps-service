// Helpers pour la pagination

export const getPaginationParams = (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;
  
  return { page, limit, skip };
};

export const getPaginationResponse = (total, page, limit) => {
  return {
    total,
    page,
    pages: Math.ceil(total / limit),
    hasNext: page < Math.ceil(total / limit),
    hasPrev: page > 1
  };
};

export const sendPaginatedResponse = (res, data, total, page, limit, message = 'Données récupérées avec succès') => {
  res.status(200).json({
    success: true,
    message,
    data,
    pagination: getPaginationResponse(total, page, limit)
  });
};


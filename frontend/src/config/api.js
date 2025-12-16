// Configuration centralisée de l'API
const API_CONFIG = {
  // URL de base selon l'environnement
  // En développement, utilise le proxy Vite (/api)
  // En production, utilise VITE_API_URL ou l'URL complète
  BASE_URL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : 'https://kps-service.onrender.com'),

  // Endpoints
  ENDPOINTS: {
    AUTH: '/api/auth',
    QUOTES: '/api/quotes',
    CONTACTS: '/api/contacts',
    SERVICES: '/api/services',
    PAGES: '/api/pages',
    SETTINGS: '/api/settings',
    REFERENCES: '/api/references',
    HERO: '/api/hero',
    ENGAGEMENTS: '/api/engagements',
    ABOUT_SECTIONS: '/api/about-sections',
    STATS: '/api/stats'
  },

  // Configuration des requêtes
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },

  // Timeout des requêtes
  TIMEOUT: 10000
}

// Fonction utilitaire pour construire l'URL complète
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}

// Fonction utilitaire pour les requêtes avec authentification
export const getAuthHeaders = () => {
  return {
    ...API_CONFIG.DEFAULT_HEADERS
  }
}

// Fonction utilitaire pour les requêtes publiques
export const getPublicHeaders = () => {
  return API_CONFIG.DEFAULT_HEADERS
}

// URLs complètes pour faciliter l'utilisation
export const API_URLS = {
  AUTH_LOGIN: getApiUrl(API_CONFIG.ENDPOINTS.AUTH + '/login'),
  AUTH_LOGOUT: getApiUrl(API_CONFIG.ENDPOINTS.AUTH + '/logout'),
  AUTH_PROFILE: getApiUrl(API_CONFIG.ENDPOINTS.AUTH + '/profile'),
  AUTH_VERIFY: getApiUrl(API_CONFIG.ENDPOINTS.AUTH + '/verify'),
  QUOTES: getApiUrl(API_CONFIG.ENDPOINTS.QUOTES),
  CONTACTS: getApiUrl(API_CONFIG.ENDPOINTS.CONTACTS),
  SERVICES: getApiUrl(API_CONFIG.ENDPOINTS.SERVICES),
  PAGES: getApiUrl(API_CONFIG.ENDPOINTS.PAGES),
  SETTINGS: getApiUrl(API_CONFIG.ENDPOINTS.SETTINGS),
  REFERENCES: getApiUrl(API_CONFIG.ENDPOINTS.REFERENCES),
  HERO: getApiUrl(API_CONFIG.ENDPOINTS.HERO),
  ENGAGEMENTS: getApiUrl(API_CONFIG.ENDPOINTS.ENGAGEMENTS),
  ABOUT_SECTIONS: getApiUrl(API_CONFIG.ENDPOINTS.ABOUT_SECTIONS),
  STATS: getApiUrl(API_CONFIG.ENDPOINTS.STATS)
}

export default API_CONFIG

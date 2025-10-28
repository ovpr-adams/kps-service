import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';

// Import routes
import authRoutes from './routes/authRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import pagesRoutes from './routes/pagesRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import referenceRoutes from './routes/referenceRoutes.js';
import heroRoutes from './routes/heroRoutes.js';
import engagementRoutes from './routes/engagementRoutes.js';
import aboutSectionRoutes from './routes/aboutSectionRoutes.js';

// Import utilities
import { errorHandler } from './utils/asyncHandler.js';

// Configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Sécurité des headers HTTP
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logging des requêtes

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kps-services')
.then(() => {
  console.log('✅ Connecté à MongoDB');
})
.catch((error) => {
  console.error('❌ Erreur de connexion à MongoDB:', error.message);
  process.exit(1);
});

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenue sur l\'API KPS Services',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      quotes: '/api/quotes',
      contacts: '/api/contacts',
      services: '/api/services',
      pages: '/api/pages'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/references', referenceRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/engagements', engagementRoutes);
app.use('/api/about-sections', aboutSectionRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route non trouvée',
    path: req.path 
  });
});

// Gestion globale des erreurs
app.use(errorHandler);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📍 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
});

// Gestion propre de l'arrêt
process.on('SIGINT', async () => {
  console.log('\n⏹️  Arrêt du serveur...');
  await mongoose.connection.close();
  console.log('✅ Connexion MongoDB fermée');
  process.exit(0);
});

export default app;


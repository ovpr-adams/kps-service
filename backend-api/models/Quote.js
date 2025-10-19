import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  // Informations de contact
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email invalide']
  },
  phone: {
    type: String,
    required: [true, 'Le téléphone est requis'],
    trim: true
  },
  company: {
    type: String,
    trim: true
  },

  // Détails du projet
  service: {
    type: String,
    required: [true, 'Le type de service est requis'],
    enum: ['nettoyage-industriel', 'lavage-vitres', 'entretien-bureaux', 'autre']
  },
  surface: {
    type: Number,
    min: 0
  },
  frequency: {
    type: String,
    enum: ['ponctuel', 'hebdomadaire', 'mensuel', 'quotidien']
  },
  description: {
    type: String,
    trim: true
  },
  urgency: {
    type: String,
    enum: ['faible', 'moyen', 'urgent']
  },

  // Statut de la demande
  status: {
    type: String,
    enum: ['nouveau', 'en-cours', 'devis-envoye', 'accepte', 'refuse', 'archive'],
    default: 'nouveau'
  },

  // Notes internes
  notes: {
    type: String
  },

  // Estimation de prix (optionnel)
  estimatedPrice: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

// Index pour les recherches
quoteSchema.index({ email: 1 });
quoteSchema.index({ status: 1 });
quoteSchema.index({ createdAt: -1 });

const Quote = mongoose.model('Quote', quoteSchema);

export default Quote;


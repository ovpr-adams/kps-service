import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  // Contenu principal
  mainTitle: {
    type: String,
    required: [true, 'Le titre principal est requis'],
    trim: true,
    default: "L'expertise du nettoyage professionnel au service de vos espaces"
  },
  subtitle: {
    type: String,
    required: [true, 'Le sous-titre est requis'],
    trim: true,
    default: "Nettoyage industriel, entretien de bureau et lavage de vitres sur mesure"
  },
  foundedYear: {
    type: Number,
    required: [true, 'L\'année de fondation est requise'],
    default: 2002
  },
  teamSize: {
    type: String,
    required: [true, 'La taille d\'équipe est requise'],
    trim: true,
    default: "+35 professionnels qualifiés"
  },
  ctaText: {
    type: String,
    required: [true, 'Le texte CTA est requis'],
    trim: true,
    default: "OBTENEZ UN DEVIS GRATUIT"
  },
  ctaLink: {
    type: String,
    required: [true, 'Le lien CTA est requis'],
    trim: true,
    default: "/quote"
  },
  
  // Background
  backgroundImage: {
    type: String,
    required: [true, 'L\'image de fond est requise'],
    trim: true,
    default: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  },
  
  // Quote section
  quoteTitle: {
    type: String,
    required: [true, 'Le titre de la citation est requis'],
    trim: true,
    default: "ET SI LA PUISSANCE D'UN FILM REMPLAÇAIT LA LONGUEUR D'UN DISCOURS ?"
  },
  showQuote: {
    type: Boolean,
    default: true
  },
  
  // Services cards
  services: [{
    icon: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    subtitle: {
      type: String,
      required: true,
      trim: true
    },
    color: {
      type: String,
      required: true,
      trim: true
    },
    order: {
      type: Number,
      default: 0
    }
  }],
  
  // Statut
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index pour les recherches
heroSchema.index({ isActive: 1 });

// Middleware pour mettre à jour la date de modification
heroSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Hero = mongoose.model('Hero', heroSchema);

export default Hero;

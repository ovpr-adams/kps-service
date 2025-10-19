import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['nettoyage-industriel', 'lavage-vitres', 'entretien-bureaux', 'autre']
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    trim: true
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: 200
  },
  features: [{
    type: String,
    trim: true
  }],
  pricing: {
    startingPrice: {
      type: Number,
      min: 0
    },
    unit: {
      type: String,
      enum: ['heure', 'jour', 'm²', 'projet', 'sur-devis']
    }
  },
  image: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index pour les recherches
serviceSchema.index({ slug: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1 });

const Service = mongoose.model('Service', serviceSchema);

export default Service;


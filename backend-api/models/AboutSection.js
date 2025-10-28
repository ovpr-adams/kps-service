import mongoose from 'mongoose';

const aboutSectionSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    required: [true, 'L\'ID de section est requis'],
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true
  },
  icon: {
    type: String,
    required: [true, 'L\'icône est requise'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Le contenu est requis'],
    trim: true
  },
  stats: {
    type: String,
    required: [true, 'Les statistiques sont requises'],
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index pour les recherches
aboutSectionSchema.index({ sectionId: 1 });
aboutSectionSchema.index({ isActive: 1 });
aboutSectionSchema.index({ order: 1 });

const AboutSection = mongoose.model('AboutSection', aboutSectionSchema);

export default AboutSection;

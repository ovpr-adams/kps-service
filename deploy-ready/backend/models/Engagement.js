import mongoose from 'mongoose';

const engagementSchema = new mongoose.Schema({
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
  color: {
    type: String,
    required: [true, 'La couleur est requise'],
    trim: true,
    default: 'from-green-500 to-green-600'
  },
  bgColor: {
    type: String,
    required: [true, 'La couleur de fond est requise'],
    trim: true,
    default: 'bg-green-500'
  },
  description: {
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
engagementSchema.index({ isActive: 1 });
engagementSchema.index({ order: 1 });

const Engagement = mongoose.model('Engagement', engagementSchema);

export default Engagement;

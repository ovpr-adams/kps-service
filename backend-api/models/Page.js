import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, 'Le slug est requis'],
    unique: true,
    trim: true,
    lowercase: true
  },
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true
  },
  content: {
    type: String,
    default: ''
  },
  metaDescription: {
    type: String,
    trim: true
  },
  metaKeywords: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index pour les recherches
pageSchema.index({ slug: 1 });
pageSchema.index({ isActive: 1 });

// Middleware pour mettre à jour lastModified
pageSchema.pre('save', function(next) {
  this.lastModified = new Date();
  next();
});

const Page = mongoose.model('Page', pageSchema);

export default Page;










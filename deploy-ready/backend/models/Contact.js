import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
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
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Le sujet est requis'],
    enum: ['devis', 'information', 'reclamation', 'partenariat', 'autre']
  },
  message: {
    type: String,
    required: [true, 'Le message est requis'],
    trim: true,
    minlength: [10, 'Le message doit contenir au moins 10 caractères']
  },
  status: {
    type: String,
    enum: ['nouveau', 'lu', 'traite', 'archive'],
    default: 'nouveau'
  },
  response: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index pour les recherches
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;


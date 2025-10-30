import mongoose from 'mongoose';

const referenceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: '' },
  location: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  results: { type: [String], default: [] }
}, { timestamps: true });

const Reference = mongoose.model('Reference', referenceSchema);

export default Reference;



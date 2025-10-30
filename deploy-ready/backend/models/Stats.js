import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  value: { type: Number, required: true },
  unit: { type: String, default: '' },
  order: { type: Number, default: 0 },
  icon: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

statSchema.index({ order: 1 });
statSchema.index({ isActive: 1 });

const Stat = mongoose.model('Stat', statSchema);
export default Stat;



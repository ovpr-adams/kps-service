import mongoose from 'mongoose';

const businessHoursSchema = new mongoose.Schema({
  weekday: { type: String, required: true },
  open: { type: String, required: true },
  close: { type: String, required: true }
}, { _id: false });

const settingsSchema = new mongoose.Schema({
  phone: { type: String, default: '' },
  serviceAreas: { type: [String], default: [] },
  publicEmails: { type: [String], default: [] },
  contactRecipients: { type: [String], default: [] },
  foundedYear: { type: Number, default: 2002 },
  teamSize: { type: String, default: '+35' },
  businessHoursText: { type: String, default: '7h00-19h30' },
  businessHours: { type: [businessHoursSchema], default: undefined },
  domains: { type: [String], default: [] }
}, { timestamps: true });

// Single document collection (singleton)
settingsSchema.statics.getOrCreate = async function defaultGet() {
  const doc = await this.findOne();
  if (doc) return doc;
  return this.create({
    phone: '+33652323256',
    serviceAreas: ['Île-de-France', 'Nantes', 'Rouen'],
    publicEmails: ['contact@kpsservices.fr', 'commercial@kpsservices.fr'],
    contactRecipients: ['contact@kpsservices.fr', 'commercial@kpsservices.fr'],
    foundedYear: 2002,
    teamSize: '+35',
    businessHoursText: '7h00-19h30',
    domains: ['Nettoyage de chantier']
  });
};

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;



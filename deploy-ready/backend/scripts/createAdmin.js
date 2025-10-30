import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Configuration
dotenv.config();

const createAdmin = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kps-services');
    console.log('✅ Connecté à MongoDB');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@kps-services.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';

    // Vérifier si l'admin existe déjà
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('⚠️  L\'administrateur existe déjà');
      process.exit(0);
    }

    // Créer l'admin
    const admin = new User({
      name: 'Administrateur KPS',
      email: adminEmail,
      password: adminPassword,
      isAdmin: true,
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Administrateur créé avec succès');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Mot de passe: ${adminPassword}`);
    console.log('⚠️  Changez le mot de passe après la première connexion !');

  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'administrateur:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

createAdmin();


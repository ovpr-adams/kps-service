import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const fixAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kps-services');
    console.log('✅ Connecté à MongoDB');
    
    // Mettre à jour l'utilisateur admin
    const result = await User.updateOne(
      { email: 'admin@kps-services.com' },
      { $set: { isAdmin: true } }
    );
    
    console.log('📝 Résultat mise à jour:', result);
    
    // Vérifier l'utilisateur après mise à jour
    const user = await User.findOne({ email: 'admin@kps-services.com' });
    console.log('👤 Utilisateur admin après mise à jour:');
    console.log('- isAdmin:', user.isAdmin);
    console.log('- role:', user.role);
    console.log('- email:', user.email);
    
    await mongoose.connection.close();
    console.log('✅ Connexion fermée');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
};

fixAdmin();


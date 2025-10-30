import express from 'express';
import AboutSection from '../models/AboutSection.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendCreated, sendNotFound } from '../utils/responseHelpers.js';

const router = express.Router();

// GET public about sections
router.get('/', asyncHandler(async (req, res) => {
  const sections = await AboutSection.find({ isActive: true }).sort({ order: 1 });
  
  // Si aucune section n'existe, créer les par défaut
  if (sections.length === 0) {
    const defaultSections = [
      {
        sectionId: 'histoire',
        title: 'Notre Histoire',
        icon: 'Award',
        content: 'Fondée en 2002, KPS Services est née de la passion de ses fondateurs pour l\'excellence dans le domaine du nettoyage professionnel. Ce qui a commencé comme une petite entreprise familiale est aujourd\'hui une référence dans le secteur, avec plus de 500 clients satisfaits à travers la région parisienne.',
        stats: '22+ années d\'expérience',
        order: 1
      },
      {
        sectionId: 'equipe',
        title: 'Notre Équipe',
        icon: 'Users',
        content: 'Notre équipe est composée de professionnels expérimentés, formés aux dernières techniques de nettoyage et aux normes de sécurité les plus strictes. Chaque membre partage notre engagement pour la qualité et la satisfaction client.',
        stats: '+35 professionnels qualifiés',
        order: 2
      },
      {
        sectionId: 'valeurs',
        title: 'Nos Valeurs',
        icon: 'Heart',
        content: 'L\'intégrité, le respect et l\'excellence guident chacune de nos actions. Nous croyons en des relations durables avec nos clients et nos partenaires, fondées sur la confiance mutuelle et le professionnalisme.',
        stats: '100% satisfaction client',
        order: 3
      }
    ];
    
    await AboutSection.insertMany(defaultSections);
    const newSections = await AboutSection.find({ isActive: true }).sort({ order: 1 });
    return sendSuccess(res, 'Sections About récupérées', newSections);
  }
  
  sendSuccess(res, 'Sections About récupérées', sections);
}));

// POST create about section (admin)
router.post('/', authenticateAdmin, asyncHandler(async (req, res) => {
  const section = await AboutSection.create(req.body);
  sendCreated(res, 'Section About créée', section);
}));

// PUT update about section (admin)
router.put('/:id', authenticateAdmin, asyncHandler(async (req, res) => {
  const section = await AboutSection.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    { new: true }
  );
  
  if (!section) {
    return sendNotFound(res, 'Section About non trouvée');
  }
  
  sendSuccess(res, 'Section About mise à jour', section);
}));

// DELETE about section (admin)
router.delete('/:id', authenticateAdmin, asyncHandler(async (req, res) => {
  const section = await AboutSection.findByIdAndDelete(req.params.id);
  
  if (!section) {
    return sendNotFound(res, 'Section About non trouvée');
  }
  
  sendSuccess(res, 'Section About supprimée');
}));

export default router;

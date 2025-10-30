import express from 'express';
import Engagement from '../models/Engagement.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendCreated, sendNotFound } from '../utils/responseHelpers.js';

const router = express.Router();

// GET public engagements
router.get('/', asyncHandler(async (req, res) => {
  const engagements = await Engagement.find({ isActive: true }).sort({ order: 1 });
  
  // Si aucun engagement n'existe, créer les par défaut
  if (engagements.length === 0) {
    const defaultEngagements = [
      {
        title: 'Qualité',
        icon: 'CheckCircle',
        color: 'from-yellow-500 to-yellow-600',
        bgColor: 'bg-yellow-500',
        order: 1
      },
      {
        title: 'Écologie',
        icon: 'Leaf',
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-500',
        order: 2
      },
      {
        title: 'Sécurité',
        icon: 'CheckCircle',
        color: 'from-yellow-500 to-yellow-600',
        bgColor: 'bg-yellow-500',
        order: 3
      },
      {
        title: 'Réactivité',
        icon: 'Clock',
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-500',
        order: 4
      }
    ];
    
    await Engagement.insertMany(defaultEngagements);
    const newEngagements = await Engagement.find({ isActive: true }).sort({ order: 1 });
    return sendSuccess(res, 'Engagements récupérés', newEngagements);
  }
  
  sendSuccess(res, 'Engagements récupérés', engagements);
}));

// POST create engagement (admin)
router.post('/', authenticateAdmin, asyncHandler(async (req, res) => {
  const engagement = await Engagement.create(req.body);
  sendCreated(res, 'Engagement créé', engagement);
}));

// PUT update engagement (admin)
router.put('/:id', authenticateAdmin, asyncHandler(async (req, res) => {
  const engagement = await Engagement.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    { new: true }
  );
  
  if (!engagement) {
    return sendNotFound(res, 'Engagement non trouvé');
  }
  
  sendSuccess(res, 'Engagement mis à jour', engagement);
}));

// DELETE engagement (admin)
router.delete('/:id', authenticateAdmin, asyncHandler(async (req, res) => {
  const engagement = await Engagement.findByIdAndDelete(req.params.id);
  
  if (!engagement) {
    return sendNotFound(res, 'Engagement non trouvé');
  }
  
  sendSuccess(res, 'Engagement supprimé');
}));

export default router;

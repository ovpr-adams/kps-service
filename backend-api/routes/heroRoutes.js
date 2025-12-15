import express from 'express';
import Hero from '../models/Hero.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendCreated, sendNotFound } from '../utils/responseHelpers.js';

const router = express.Router();

// GET public hero content
router.get('/', asyncHandler(async (req, res) => {
  let hero = await Hero.findOne({ isActive: true });
  
  // Si aucun hero n'existe, créer un par défaut
  if (!hero) {
    hero = await Hero.create({
      mainTitle: "L'expertise du nettoyage professionnel au service de vos espaces",
      subtitle: "Nettoyage industriel, entretien de bureau et lavage de vitres sur mesure",
      foundedYear: 2002,
      teamSize: "+35 professionnels qualifiés",
      ctaText: "OBTENEZ UN DEVIS GRATUIT",
      ctaLink: "/quote",
      backgroundImage: "/hero-bg-1.jpg",
      quoteTitle: "ET SI LA PUISSANCE D'UN FILM REMPLAÇAIT LA LONGUEUR D'UN DISCOURS ?",
      showQuote: true,
      services: [
        {
          icon: "Building2",
          title: "Nettoyage Industriel",
          subtitle: "Sites de production",
          color: "text-green-400",
          order: 1
        },
        {
          icon: "Sparkles",
          title: "Entretien Bureaux",
          subtitle: "Espaces de travail",
          color: "text-yellow-400",
          order: 2
        },
        {
          icon: "Building2",
          title: "Lavage de Vitres",
          subtitle: "Haute sécurité",
          color: "text-green-400",
          order: 3
        },
        {
          icon: "Phone",
          title: "Nettoyage Chantier",
          subtitle: "Après travaux",
          color: "text-yellow-400",
          order: 4
        }
      ]
    });
  }
  
  sendSuccess(res, 'Contenu Hero récupéré', hero);
}));

// PUT update hero content (admin)
router.put('/', authenticateAdmin, asyncHandler(async (req, res) => {
  let hero = await Hero.findOne({ isActive: true });
  
  if (!hero) {
    hero = new Hero(req.body);
  } else {
    Object.assign(hero, req.body);
  }
  
  await hero.save();
  sendSuccess(res, 'Contenu Hero mis à jour', hero);
}));

// POST create new hero (admin)
router.post('/', authenticateAdmin, asyncHandler(async (req, res) => {
  // Désactiver l'ancien hero
  await Hero.updateMany({}, { isActive: false });
  
  const hero = await Hero.create(req.body);
  sendCreated(res, 'Contenu Hero créé', hero);
}));

export default router;

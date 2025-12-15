import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Page from '../models/Page.js';

dotenv.config();

const initPages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kps-services');
    console.log('✅ Connecté à MongoDB');

    const defaultPages = [
      {
        slug: 'accueil',
        title: 'Bienvenue sur KPS Services',
        content: `# Bienvenue sur KPS Services

Nous sommes votre partenaire de confiance pour tous vos besoins en services professionnels.

## Nos services

- **Consulting** : Accompagnement personnalisé
- **Formation** : Développement des compétences
- **Support** : Assistance technique

## Pourquoi nous choisir ?

- Expertise reconnue
- Approche personnalisée
- Résultats garantis

[Demander un devis](/quote)`,
        metaDescription: 'KPS Services - Votre partenaire de confiance pour tous vos besoins professionnels',
        metaKeywords: 'services, consulting, formation, support, professionnel'
      },
      {
        slug: 'services',
        title: 'Nos Services',
        content: `# Nos Services

Découvrez notre gamme complète de services professionnels.

## Consulting

Accompagnement personnalisé pour optimiser vos processus et améliorer vos performances.

## Formation

Programmes de formation adaptés à vos besoins spécifiques.

## Support Technique

Assistance technique de qualité pour résoudre vos problèmes rapidement.

[Contactez-nous](/contact) pour plus d'informations.`,
        metaDescription: 'Découvrez nos services de consulting, formation et support technique',
        metaKeywords: 'consulting, formation, support, services professionnels'
      },
      {
        slug: 'about',
        title: 'À Propos de KPS Services',
        content: `# À Propos de KPS Services

KPS Services est une entreprise spécialisée dans l'accompagnement des organisations.

## Notre Mission

Fournir des solutions innovantes et efficaces pour répondre aux défis de nos clients.

## Notre Vision

Devenir le partenaire de référence dans notre domaine d'expertise.

## Nos Valeurs

- **Excellence** : Nous visons toujours l'excellence
- **Innovation** : Nous adoptons les dernières technologies
- **Intégrité** : Nous agissons avec transparence et honnêteté`,
        metaDescription: 'Découvrez KPS Services, votre partenaire de confiance',
        metaKeywords: 'à propos, entreprise, mission, valeurs'
      },
      {
        slug: 'contact',
        title: 'Contactez-nous',
        content: `# Contactez-nous

Nous sommes là pour répondre à vos questions et vous accompagner.

## Informations de contact

- **Téléphone** : +33 1 23 45 67 89
- **Email** : contact@kps-services.com
- **Adresse** : 123 Rue de la Paix, 75001 Paris

## Horaires d'ouverture

- Lundi - Vendredi : 9h00 - 18h00
- Samedi : 9h00 - 12h00

[Demander un devis](/quote)`,
        metaDescription: 'Contactez KPS Services pour tous vos besoins professionnels',
        metaKeywords: 'contact, téléphone, email, adresse'
      },
      {
        slug: 'references',
        title: 'Nos Références',
        content: `# Nos Références

Découvrez les projets que nous avons réalisés avec succès.

## Clients satisfaits

- **Entreprise A** : Projet de digitalisation
- **Entreprise B** : Formation des équipes
- **Entreprise C** : Optimisation des processus

## Témoignages

> "KPS Services nous a accompagnés avec professionnalisme et expertise."

*— Directeur, Entreprise A*

[Demander un devis](/quote)`,
        metaDescription: 'Découvrez nos références et témoignages clients',
        metaKeywords: 'références, clients, témoignages, projets'
      }
    ];

    console.log('📝 Initialisation des pages par défaut...');
    
    for (const pageData of defaultPages) {
      const existingPage = await Page.findOne({ slug: pageData.slug });
      
      if (existingPage) {
        console.log(`⚠️  Page "${pageData.slug}" existe déjà`);
      } else {
        const page = new Page(pageData);
        await page.save();
        console.log(`✅ Page "${pageData.slug}" créée`);
      }
    }

    console.log('🎉 Initialisation terminée !');
    
    await mongoose.connection.close();
    console.log('✅ Connexion fermée');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error.message);
  }
};

initPages();














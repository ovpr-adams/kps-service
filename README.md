# 🧹 KPS Services - Plateforme de Nettoyage Professionnel

![KPS Services](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)

Site web moderne et application backend pour **KPS Services**, entreprise spécialisée dans le nettoyage industriel, le lavage de vitres et l'entretien de bureaux.

## 📋 Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Stack Technique](#stack-technique)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement](#lancement)
- [Structure du Projet](#structure-du-projet)
- [API Endpoints](#api-endpoints)
- [Déploiement](#déploiement)

## ✨ Fonctionnalités

### Frontend

- 🏠 Page d'accueil avec hero section animée
- 🔧 Présentation détaillée des services
- 📝 Formulaire de demande de devis multi-étapes
- 📧 Formulaire de contact
- 📚 Pages références et témoignages
- 📱 Design responsive (mobile-first)
- ⚡ Animations fluides avec Framer Motion
- 🎨 Interface moderne avec Tailwind CSS

### Backend

- 🔐 API RESTful avec Express.js
- 💾 Base de données MongoDB
- 📨 Gestion des devis et contacts
- 🛡️ Sécurité avec Helmet
- 🔒 CORS configuré
- 📊 Logging des requêtes

## 🛠️ Stack Technique

### Frontend

- **React 19.2** - Framework JavaScript
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Lucide React** - Icônes

### Backend

- **Node.js 18+** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **Helmet** - Sécurité HTTP
- **Morgan** - Logging HTTP
- **Nodemailer** - Envoi d'emails

## 📦 Prérequis

Assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure)
- **npm** (version 9 ou supérieure)
- **MongoDB** (version 6 ou supérieure)

Vérifiez les versions installées :

```bash
node --version
npm --version
mongod --version
```

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/kps-services.git
cd kps-services
```

### 2. Installer les dépendances

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend-api
npm install
```

## ⚙️ Configuration

### Backend

1. Créez un fichier `.env` dans le dossier `backend-api` :

```bash
cd backend-api
cp .env.example .env
```

2. Modifiez les variables d'environnement dans `.env` :

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/kps-services
JWT_SECRET=your-secret-key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-password
EMAIL_FROM=KPS Services <noreply@kps-services.fr>
NOTIFICATION_EMAIL=contact@kps-services.fr
```

### Frontend

La configuration Vite est déjà prête dans `frontend/vite.config.js`.

## 🎯 Lancement

### Démarrer MongoDB

```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongodb
# ou
sudo service mongodb start
```

### Démarrer le Backend

```bash
cd backend-api
npm run dev
```

Le serveur démarre sur `http://localhost:5000`

### Démarrer le Frontend

```bash
cd frontend
npm run dev
```

L'application démarre sur `http://localhost:5173`

## 📁 Structure du Projet

```
Kps-service/
├─ backend-api/
│   ├─ controllers/          # Logique métier
│   │   ├─ quoteController.js
│   │   ├─ contactController.js
│   │   └─ serviceController.js
│   ├─ models/              # Modèles MongoDB
│   │   ├─ Quote.js
│   │   ├─ Contact.js
│   │   └─ Service.js
│   ├─ routes/              # Routes API
│   │   ├─ quoteRoutes.js
│   │   ├─ contactRoutes.js
│   │   └─ serviceRoutes.js
│   ├─ .env.example         # Template variables d'environnement
│   ├─ package.json
│   └─ server.js            # Point d'entrée backend
│
├─ frontend/
│   ├─ public/              # Fichiers statiques
│   ├─ src/
│   │   ├─ components/      # Composants réutilisables
│   │   │   ├─ Header.jsx
│   │   │   ├─ Footer.jsx
│   │   │   ├─ Hero.jsx
│   │   │   ├─ ServicesSection.jsx
│   │   │   ├─ Values.jsx
│   │   │   └─ Testimonials.jsx
│   │   ├─ pages/           # Pages de l'application
│   │   │   ├─ Home.jsx
│   │   │   ├─ About.jsx
│   │   │   ├─ Services.jsx
│   │   │   ├─ References.jsx
│   │   │   ├─ Quote.jsx
│   │   │   ├─ Contact.jsx
│   │   │   ├─ Legal.jsx
│   │   │   ├─ Privacy.jsx
│   │   │   └─ Terms.jsx
│   │   ├─ assets/          # Images, fonts, etc.
│   │   ├─ App.jsx          # Composant principal
│   │   ├─ main.jsx         # Point d'entrée
│   │   └─ style.css        # Styles globaux
│   ├─ index.html
│   ├─ package.json
│   ├─ tailwind.config.js
│   ├─ postcss.config.js
│   └─ vite.config.js
│
├─ mongodb-data/            # Données MongoDB (non versionnées)
├─ .gitignore
├─ README.md
└─ DEPLOYMENT.md
```

## 🔌 API Endpoints

### Devis (Quotes)

| Méthode | Endpoint          | Description                      |
| ------- | ----------------- | -------------------------------- |
| POST    | `/api/quotes`     | Créer une demande de devis       |
| GET     | `/api/quotes`     | Récupérer tous les devis (admin) |
| GET     | `/api/quotes/:id` | Récupérer un devis par ID        |
| PUT     | `/api/quotes/:id` | Mettre à jour un devis (admin)   |
| DELETE  | `/api/quotes/:id` | Supprimer un devis (admin)       |

### Contacts

| Méthode | Endpoint            | Description                         |
| ------- | ------------------- | ----------------------------------- |
| POST    | `/api/contacts`     | Envoyer un message                  |
| GET     | `/api/contacts`     | Récupérer tous les messages (admin) |
| GET     | `/api/contacts/:id` | Récupérer un message par ID         |
| PUT     | `/api/contacts/:id` | Mettre à jour un message (admin)    |
| DELETE  | `/api/contacts/:id` | Supprimer un message (admin)        |

### Services

| Méthode | Endpoint              | Description                      |
| ------- | --------------------- | -------------------------------- |
| GET     | `/api/services`       | Récupérer tous les services      |
| GET     | `/api/services/:slug` | Récupérer un service par slug    |
| POST    | `/api/services`       | Créer un service (admin)         |
| PUT     | `/api/services/:id`   | Mettre à jour un service (admin) |
| DELETE  | `/api/services/:id`   | Supprimer un service (admin)     |

## 🚢 Déploiement

Consultez le fichier [DEPLOYMENT.md](./DEPLOYMENT.md) pour les instructions détaillées de déploiement.

## 📝 Scripts disponibles

### Frontend

```bash
npm run dev      # Démarrer en mode développement
npm run build    # Build pour la production
npm run preview  # Prévisualiser le build
```

### Backend

```bash
npm start        # Démarrer en mode production
npm run dev      # Démarrer avec nodemon (hot-reload)
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

Ce projet est sous licence ISC - voir le fichier LICENSE pour plus de détails.

## 👥 Auteurs

**KPS Services** - Entreprise de nettoyage professionnel

## 📞 Contact

- **Email** : contact@kps-services.fr
- **Téléphone** : 01 23 45 67 89
- **Adresse** : 123 Avenue de la Propreté, 75001 Paris

---

⭐ N'oubliez pas de donner une étoile si ce projet vous aide !


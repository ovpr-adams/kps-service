# Guide de Déploiement - KPS Services

## 🚀 Déploiement Local

### Prérequis
- Node.js (v16 ou supérieur)
- MongoDB (local ou MongoDB Atlas)
- Git

### 1. Installation des Dépendances

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend-api
npm install
```

### 2. Configuration de l'Environnement

#### Backend (.env)
Créer un fichier `backend-api/.env` avec le contenu suivant :

```env
# Configuration du serveur
PORT=5000
NODE_ENV=development

# URL du frontend (pour CORS)
FRONTEND_URL=http://localhost:5173

# MongoDB
MONGODB_URI=mongodb://localhost:27017/kps-services

# JWT Secret
JWT_SECRET=votre-secret-jwt-super-securise-changez-en-production

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-application-gmail
EMAIL_FROM=KPS Services <noreply@kps-services.fr>

# Email de notification
NOTIFICATION_EMAIL=contact@kps-services.fr
```

### 3. Démarrage des Services

#### Frontend
```bash
cd frontend
npm run dev
# Accessible sur http://localhost:5173
```

#### Backend
```bash
cd backend-api
npm start
# API accessible sur http://localhost:5000
```

#### MongoDB (si local)
```bash
mongod
```

## 🌐 Déploiement Production

### Option 1: Railway (Recommandé)

1. **Créer un compte** sur [railway.app](https://railway.app)

2. **Déployer le backend :**
   - Connecter le repo GitHub
   - Ajouter les variables d'environnement dans Railway Dashboard
   - Le déploiement est automatique

3. **Déployer le frontend :**
   - Build séparé avec `npm run build`
   - Déployer le dossier `dist` sur un service web statique

### Option 2: Heroku

#### Backend
```bash
# Créer l'application
heroku create kps-services-backend

# Ajouter MongoDB Atlas
heroku addons:create mongolab:sandbox

# Définir les variables d'environnement
heroku config:set MONGODB_URI=mongodb://...
heroku config:set JWT_SECRET=...
# etc.

# Déployer
git push heroku main
```

#### Frontend (Netlify/Vercel)
```bash
# Build de production
npm run build

# Déployer sur Netlify
netlify deploy --prod --dir=dist
```

## 🔧 Variables d'Environnement Production

### Obligatoires :
- `MONGODB_URI` : URL de connexion MongoDB
- `JWT_SECRET` : Secret JWT (256 bits minimum)
- `NODE_ENV=production`

### Email (Optionnel) :
- `EMAIL_HOST` : Serveur SMTP
- `EMAIL_USER` : Email expéditeur
- `EMAIL_PASSWORD` : Mot de passe application

## 📊 Monitoring et Logs

### Logs Railway :
```bash
railway logs
```

### Logs Heroku :
```bash
heroku logs --tail
```

## 🔒 Sécurité

1. **Variables sensibles** : Ne jamais committer `.env`
2. **JWT Secret** : Utiliser un secret fort (32 caractères minimum)
3. **HTTPS** : Toujours utiliser HTTPS en production
4. **CORS** : Configurer correctement les origines autorisées

## 🚨 Support

En cas de problème :
1. Vérifier les logs
2. Contrôler les variables d'environnement
3. Vérifier la connexion MongoDB
4. Tester l'API avec Postman/curl

## 📝 Checklist Déploiement

- [ ] Variables d'environnement configurées
- [ ] Base de données accessible
- [ ] Frontend buildé correctement
- [ ] Tests d'intégration passés
- [ ] HTTPS activé
- [ ] Domaines configurés

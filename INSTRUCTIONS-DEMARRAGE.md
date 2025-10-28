# 🚀 Instructions de Démarrage - KPS Services

## 📋 Prérequis

- Node.js installé
- MongoDB en cours d'exécution
- Fichier `.env` configuré dans `backend-api/`

## 🎯 Démarrage Rapide (Copier-Coller)

### Option 1: Démarrage Automatique (Recommandé)

```bash
# Double-cliquer sur le fichier start-both.bat
# OU exécuter cette commande :
start-both.bat
```

### Option 2: Démarrage Manuel

#### Terminal 1 - Backend

```bash
cd backend-api
npm run dev
```

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

## 🔧 Configuration E-mail (Important)

### 1. Créer le fichier .env dans backend-api/

```env
# ----------------------------
# Configuration du serveur
# ----------------------------
NODE_ENV=development
PORT=5000

# ----------------------------
# Base de données MongoDB (locale ou Atlas)
# ----------------------------
MONGODB_URI=mongodb://127.0.0.1:27017/kps-services

# ----------------------------
# Frontend URL pour CORS
# ----------------------------
FRONTEND_URL=http://localhost:5173

# ----------------------------
# JWT (authentification)
# ----------------------------
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d

# ----------------------------
# Configuration Email (Nodemailer / o2switch)
# ----------------------------
EMAIL_HOST=brune.o2switch.net
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=contact@kpsservices.fr
EMAIL_PASS=<mot_de_passe_contact>
EMAIL_FROM="KPS Services <contact@kpsservices.fr>"
EMAIL_TO=Contact@kpsservices.fr,Commercial@kpsservices.fr

# ----------------------------
# URL de l'application (pour les liens dans les emails)
# ----------------------------
APP_URL=http://localhost:5173

# ----------------------------
# Admin par défaut (pour tests)
# ----------------------------
ADMIN_EMAIL=admin@kpsservices.fr
ADMIN_PASSWORD=admin123456
```

### 2. Remplacer `<mot_de_passe_contact>` par le vrai mot de passe o2switch

## 🌐 URLs d'Accès

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Page Contact**: http://localhost:5173/contact

## ✅ Test du Système

### 1. Vérifier que les serveurs démarrent

- Backend: Message "🚀 Serveur démarré sur le port 5000"
- Frontend: Message "Local: http://localhost:5173"

### 2. Tester le formulaire de contact

1. Aller sur http://localhost:5173/contact
2. Remplir le formulaire
3. Cliquer "Envoyer le message"
4. Vérifier la réception des e-mails

### 3. Test e-mail (optionnel)

```bash
cd backend-api
node test-email.js
```

## 🐛 Résolution de Problèmes

### Backend ne démarre pas

- Vérifier que MongoDB est démarré
- Vérifier le fichier .env
- Vérifier que le port 5000 est libre

### Frontend ne démarre pas

- Vérifier que le port 5173 est libre
- Vérifier que Node.js est installé

### E-mails ne s'envoient pas

- Vérifier le mot de passe SMTP dans .env
- Vérifier la connexion Internet
- Vérifier les logs du backend

## 📞 Support

En cas de problème, vérifier les logs dans les terminaux ou contacter l'équipe technique.

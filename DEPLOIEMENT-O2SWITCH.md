# 🚀 Guide de Déploiement KPS Services sur o2switch

## 📋 Prérequis

### 1. Compte o2switch
- Hébergement web avec Node.js supporté
- Accès FTP/SFTP ou gestionnaire de fichiers
- Base de données MySQL ou MongoDB Atlas (recommandé)

### 2. Préparation locale
- Node.js installé
- Git configuré
- Projet KPS Services prêt

## 🔧 Étape 1 : Configuration de la Base de Données

### Option A : MongoDB Atlas (Recommandé)
1. Créer un compte sur [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Créer un cluster gratuit
3. Créer un utilisateur de base de données
4. Obtenir l'URI de connexion : `mongodb+srv://username:password@cluster0.mongodb.net/kps-services`

### Option B : Base de données o2switch
1. Créer une base de données MySQL via le panel o2switch
2. Noter les identifiants de connexion

## 🔧 Étape 2 : Configuration des Variables d'Environnement

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/kps-services
FRONTEND_URL=https://votre-domaine.com
JWT_SECRET=votre-super-secret-jwt-key-production
JWT_EXPIRE=30d
EMAIL_HOST=brune.o2switch.net
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=contact@kpsservices.fr
EMAIL_PASS=votre-mot-de-passe-email
EMAIL_FROM="KPS Services <contact@kpsservices.fr>"
EMAIL_TO=Contact@kpsservices.fr,Commercial@kpsservices.fr
APP_URL=https://votre-domaine.com
ADMIN_EMAIL=admin@kpsservices.fr
ADMIN_PASSWORD=votre-mot-de-passe-admin-securise
```

## 🔧 Étape 3 : Build du Frontend

```bash
cd frontend
npm run build
```

## 🔧 Étape 4 : Upload des Fichiers

### Structure des dossiers sur o2switch :
```
/
├── backend-api/          # API Node.js
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/             # Site React buildé
│   └── dist/             # Dossier de build
└── public_html/          # Point d'entrée (symlink vers frontend/dist)
```

## 🔧 Étape 5 : Configuration du Serveur

### 1. Créer un fichier .htaccess pour le frontend
```apache
# frontend/dist/.htaccess
RewriteEngine On
RewriteBase /

# Handle Angular and React Router
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"
```

### 2. Créer un fichier .htaccess pour l'API
```apache
# backend-api/.htaccess
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ server.js [QSA,L]
```

## 🔧 Étape 6 : Configuration PM2 (si supporté)

### Créer ecosystem.config.js
```javascript
module.exports = {
  apps: [{
    name: 'kps-backend',
    script: 'server.js',
    cwd: '/path/to/backend-api',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
}
```

### Démarrer l'application
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 🔧 Étape 7 : Configuration des Domaines

### 1. Point d'entrée principal
- `votre-domaine.com` → `frontend/dist/`
- `votre-domaine.com/api` → `backend-api/`

### 2. Configuration CORS
Vérifier que le backend accepte les requêtes depuis votre domaine.

## 🔧 Étape 8 : Test et Vérification

### 1. Tester l'API
```bash
curl https://votre-domaine.com/api/hero
curl https://votre-domaine.com/api/settings
```

### 2. Tester le frontend
- Visiter `https://votre-domaine.com`
- Vérifier que toutes les pages se chargent
- Tester l'interface admin

### 3. Tester l'envoi d'emails
- Utiliser le formulaire de contact
- Vérifier la réception des emails

## 🔧 Étape 9 : Configuration SSL

### 1. Activer SSL sur o2switch
- Via le panel d'administration o2switch
- Utiliser Let's Encrypt (gratuit)

### 2. Redirection HTTPS
```apache
# .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## 🔧 Étape 10 : Optimisations Production

### 1. Compression Gzip
```apache
# .htaccess
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### 2. Cache des fichiers statiques
```apache
# .htaccess
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

## 🔧 Étape 11 : Monitoring et Maintenance

### 1. Logs
- Surveiller les logs d'erreur
- Configurer les alertes email

### 2. Sauvegardes
- Sauvegarder régulièrement la base de données
- Sauvegarder les fichiers de configuration

### 3. Mises à jour
- Maintenir les dépendances à jour
- Surveiller les vulnérabilités de sécurité

## 🚨 Dépannage Courant

### Problème : API ne répond pas
- Vérifier que Node.js est démarré
- Vérifier les logs d'erreur
- Vérifier la configuration .env

### Problème : Frontend ne se charge pas
- Vérifier que le build est correct
- Vérifier la configuration .htaccess
- Vérifier les permissions des fichiers

### Problème : Emails ne s'envoient pas
- Vérifier les identifiants SMTP
- Vérifier que le port 465 est ouvert
- Tester avec un client email externe

## 📞 Support

En cas de problème :
1. Vérifier les logs d'erreur
2. Tester en local d'abord
3. Contacter le support o2switch si nécessaire

## ✅ Checklist de Déploiement

- [ ] Base de données configurée
- [ ] Variables d'environnement définies
- [ ] Frontend buildé
- [ ] Fichiers uploadés
- [ ] Configuration serveur
- [ ] SSL activé
- [ ] Tests fonctionnels
- [ ] Monitoring configuré
- [ ] Sauvegardes programmées

---

**Votre site KPS Services est maintenant déployé sur o2switch ! 🎉**

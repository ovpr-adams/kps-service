#!/bin/bash

# Script de build pour la production
echo "🚀 Build de KPS Services pour la production..."

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Exécutez ce script depuis la racine du projet"
    exit 1
fi

# Nettoyer les builds précédents
echo "🧹 Nettoyage des builds précédents..."
rm -rf frontend/dist
rm -rf backend-api/dist

# Installer les dépendances frontend
echo "📦 Installation des dépendances frontend..."
cd frontend
npm ci --production=false
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation des dépendances frontend"
    exit 1
fi

# Build du frontend
echo "🔨 Build du frontend..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build du frontend"
    exit 1
fi

# Retour à la racine
cd ..

# Installer les dépendances backend
echo "📦 Installation des dépendances backend..."
cd backend-api
npm ci --production=true
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation des dépendances backend"
    exit 1
fi

# Retour à la racine
cd ..

# Créer le dossier de déploiement
echo "📁 Création du dossier de déploiement..."
mkdir -p deploy
rm -rf deploy/*

# Copier les fichiers nécessaires
echo "📋 Copie des fichiers pour le déploiement..."

# Frontend (build)
cp -r frontend/dist deploy/frontend

# Backend
cp -r backend-api deploy/backend-api
rm -rf deploy/backend-api/node_modules
rm -rf deploy/backend-api/.env
rm -rf deploy/backend-api/.env.local
rm -rf deploy/backend-api/.env.development

# Fichiers de configuration
cp backend-api/env.production.example deploy/backend-api/.env.example
cp DEPLOIEMENT-O2SWITCH.md deploy/

# Créer les fichiers .htaccess
echo "⚙️ Création des fichiers .htaccess..."

# .htaccess pour le frontend
cat > deploy/frontend/.htaccess << 'EOF'
RewriteEngine On
RewriteBase /

# Handle React Router
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"

# Compression
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

# Cache
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

# HTTPS redirect
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
EOF

# .htaccess pour l'API
cat > deploy/backend-api/.htaccess << 'EOF'
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ server.js [QSA,L]

# CORS headers
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
EOF

# Créer un script de déploiement
cat > deploy/deploy.sh << 'EOF'
#!/bin/bash

echo "🚀 Déploiement de KPS Services sur o2switch..."

# Vérifier que les fichiers sont présents
if [ ! -d "frontend" ] || [ ! -d "backend-api" ]; then
    echo "❌ Erreur: Dossiers frontend ou backend-api manquants"
    exit 1
fi

echo "📋 Instructions de déploiement:"
echo "1. Connectez-vous à votre espace o2switch"
echo "2. Uploadez le contenu du dossier 'frontend' vers public_html/"
echo "3. Uploadez le contenu du dossier 'backend-api' vers un dossier 'api'"
echo "4. Configurez le fichier .env dans le dossier backend-api"
echo "5. Installez les dépendances Node.js: cd backend-api && npm install --production"
echo "6. Démarrez l'application Node.js"
echo "7. Configurez les redirections dans votre panel o2switch"

echo "✅ Fichiers prêts pour le déploiement !"
EOF

chmod +x deploy/deploy.sh

# Créer un README pour le déploiement
cat > deploy/README.md << 'EOF'
# 🚀 KPS Services - Fichiers de Déploiement

## Structure des fichiers

- `frontend/` - Site React buildé (à placer dans public_html/)
- `backend-api/` - API Node.js (à placer dans un dossier séparé)
- `.env.example` - Exemple de configuration pour la production

## Instructions de déploiement

1. **Frontend** : Uploadez le contenu de `frontend/` vers `public_html/`
2. **Backend** : Uploadez le contenu de `backend-api/` vers un dossier `api/`
3. **Configuration** : Copiez `.env.example` vers `.env` et configurez les variables
4. **Dépendances** : Installez les dépendances Node.js dans le dossier backend
5. **Démarrage** : Démarrez l'application Node.js

## Configuration requise

- Node.js supporté par o2switch
- Base de données MongoDB Atlas (recommandé)
- Compte email o2switch pour l'envoi d'emails

## Support

Consultez le fichier `DEPLOIEMENT-O2SWITCH.md` pour le guide complet.
EOF

echo "✅ Build de production terminé !"
echo "📁 Dossier de déploiement créé : ./deploy/"
echo "📋 Consultez le README.md dans le dossier deploy pour les instructions"
echo ""
echo "Prochaines étapes :"
echo "1. Uploadez le contenu de ./deploy/ sur votre serveur o2switch"
echo "2. Configurez le fichier .env avec vos paramètres de production"
echo "3. Installez les dépendances Node.js sur le serveur"
echo "4. Démarrez l'application"

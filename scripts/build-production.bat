@echo off
REM Script de build pour la production (Windows)
echo 🚀 Build de KPS Services pour la production...

REM Vérifier que nous sommes dans le bon répertoire
if not exist "package.json" (
    echo ❌ Erreur: Exécutez ce script depuis la racine du projet
    pause
    exit /b 1
)

REM Nettoyer les builds précédents
echo 🧹 Nettoyage des builds précédents...
if exist "frontend\dist" rmdir /s /q "frontend\dist"
if exist "backend-api\dist" rmdir /s /q "backend-api\dist"

REM Installer les dépendances frontend
echo 📦 Installation des dépendances frontend...
cd frontend
call npm ci --production=false
if errorlevel 1 (
    echo ❌ Erreur lors de l'installation des dépendances frontend
    pause
    exit /b 1
)

REM Build du frontend
echo 🔨 Build du frontend...
call npm run build
if errorlevel 1 (
    echo ❌ Erreur lors du build du frontend
    pause
    exit /b 1
)

REM Retour à la racine
cd ..

REM Installer les dépendances backend
echo 📦 Installation des dépendances backend...
cd backend-api
call npm ci --production=true
if errorlevel 1 (
    echo ❌ Erreur lors de l'installation des dépendances backend
    pause
    exit /b 1
)

REM Retour à la racine
cd ..

REM Créer le dossier de déploiement
echo 📁 Création du dossier de déploiement...
if exist "deploy" rmdir /s /q "deploy"
mkdir deploy

REM Copier les fichiers nécessaires
echo 📋 Copie des fichiers pour le déploiement...

REM Frontend (build)
xcopy "frontend\dist\*" "deploy\frontend\" /E /I /Y

REM Backend
xcopy "backend-api\*" "deploy\backend-api\" /E /I /Y
if exist "deploy\backend-api\node_modules" rmdir /s /q "deploy\backend-api\node_modules"
if exist "deploy\backend-api\.env" del "deploy\backend-api\.env"
if exist "deploy\backend-api\.env.local" del "deploy\backend-api\.env.local"
if exist "deploy\backend-api\.env.development" del "deploy\backend-api\.env.development"

REM Fichiers de configuration
copy "backend-api\env.production.example" "deploy\backend-api\.env.example"
copy "DEPLOIEMENT-O2SWITCH.md" "deploy\"

REM Créer les fichiers .htaccess
echo ⚙️ Création des fichiers .htaccess...

REM .htaccess pour le frontend
(
echo RewriteEngine On
echo RewriteBase /
echo.
echo # Handle React Router
echo RewriteCond %%{REQUEST_FILENAME} !-f
echo RewriteCond %%{REQUEST_FILENAME} !-d
echo RewriteRule . /index.html [L]
echo.
echo # Security headers
echo Header always set X-Frame-Options DENY
echo Header always set X-Content-Type-Options nosniff
echo Header always set X-XSS-Protection "1; mode=block"
echo.
echo # Compression
echo ^<IfModule mod_deflate.c^>
echo     AddOutputFilterByType DEFLATE text/plain
echo     AddOutputFilterByType DEFLATE text/html
echo     AddOutputFilterByType DEFLATE text/xml
echo     AddOutputFilterByType DEFLATE text/css
echo     AddOutputFilterByType DEFLATE application/xml
echo     AddOutputFilterByType DEFLATE application/xhtml+xml
echo     AddOutputFilterByType DEFLATE application/rss+xml
echo     AddOutputFilterByType DEFLATE application/javascript
echo     AddOutputFilterByType DEFLATE application/x-javascript
echo ^</IfModule^>
echo.
echo # Cache
echo ^<IfModule mod_expires.c^>
echo     ExpiresActive on
echo     ExpiresByType text/css "access plus 1 year"
echo     ExpiresByType application/javascript "access plus 1 year"
echo     ExpiresByType image/png "access plus 1 year"
echo     ExpiresByType image/jpg "access plus 1 year"
echo     ExpiresByType image/jpeg "access plus 1 year"
echo     ExpiresByType image/gif "access plus 1 year"
echo     ExpiresByType image/svg+xml "access plus 1 year"
echo ^</IfModule^>
echo.
echo # HTTPS redirect
echo RewriteCond %%{HTTPS} off
echo RewriteRule ^(.*^)$ https://%%{HTTP_HOST}%%{REQUEST_URI} [L,R=301]
) > "deploy\frontend\.htaccess"

REM .htaccess pour l'API
(
echo RewriteEngine On
echo RewriteCond %%{REQUEST_FILENAME} !-f
echo RewriteCond %%{REQUEST_FILENAME} !-d
echo RewriteRule ^(.*^)$ server.js [QSA,L]
echo.
echo # CORS headers
echo Header always set Access-Control-Allow-Origin "*"
echo Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
echo Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
) > "deploy\backend-api\.htaccess"

REM Créer un README pour le déploiement
(
echo # 🚀 KPS Services - Fichiers de Déploiement
echo.
echo ## Structure des fichiers
echo.
echo - `frontend/` - Site React buildé (à placer dans public_html/)
echo - `backend-api/` - API Node.js (à placer dans un dossier séparé)
echo - `.env.example` - Exemple de configuration pour la production
echo.
echo ## Instructions de déploiement
echo.
echo 1. **Frontend** : Uploadez le contenu de `frontend/` vers `public_html/`
echo 2. **Backend** : Uploadez le contenu de `backend-api/` vers un dossier `api/`
echo 3. **Configuration** : Copiez `.env.example` vers `.env` et configurez les variables
echo 4. **Dépendances** : Installez les dépendances Node.js dans le dossier backend
echo 5. **Démarrage** : Démarrez l'application Node.js
echo.
echo ## Configuration requise
echo.
echo - Node.js supporté par o2switch
echo - Base de données MongoDB Atlas (recommandé)
echo - Compte email o2switch pour l'envoi d'emails
echo.
echo ## Support
echo.
echo Consultez le fichier `DEPLOIEMENT-O2SWITCH.md` pour le guide complet.
) > "deploy\README.md"

echo ✅ Build de production terminé !
echo 📁 Dossier de déploiement créé : .\deploy\
echo 📋 Consultez le README.md dans le dossier deploy pour les instructions
echo.
echo Prochaines étapes :
echo 1. Uploadez le contenu de .\deploy\ sur votre serveur o2switch
echo 2. Configurez le fichier .env avec vos paramètres de production
echo 3. Installez les dépendances Node.js sur le serveur
echo 4. Démarrez l'application
echo.
pause

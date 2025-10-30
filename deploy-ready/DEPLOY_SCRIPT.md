# 🚀 Script de Déploiement Automatique

## 📋 **Script PowerShell pour Windows**

```powershell
# Script de déploiement KPS Services
# À exécuter depuis la racine du projet

Write-Host "🚀 Déploiement KPS Services..." -ForegroundColor Green

# 1. Nettoyer les anciens builds
Write-Host "🧹 Nettoyage des anciens builds..." -ForegroundColor Yellow
Remove-Item -Recurse -Force "frontend\dist" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "deploy-ready" -ErrorAction SilentlyContinue

# 2. Créer la structure deploy-ready
Write-Host "📁 Création de la structure deploy-ready..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "deploy-ready" -Force
New-Item -ItemType Directory -Path "deploy-ready\backend" -Force
New-Item -ItemType Directory -Path "deploy-ready\frontend" -Force

# 3. Build du frontend
Write-Host "🔨 Build du frontend..." -ForegroundColor Yellow
Set-Location "frontend"
npm run build
Set-Location ".."

# 4. Copier les fichiers backend
Write-Host "📦 Copie des fichiers backend..." -ForegroundColor Yellow
Copy-Item "backend-api\*" "deploy-ready\backend\" -Recurse -Force

# 5. Copier le build frontend
Write-Host "📦 Copie du build frontend..." -ForegroundColor Yellow
Copy-Item "frontend\dist\*" "deploy-ready\frontend\dist\" -Recurse -Force

# 6. Installer les dépendances backend
Write-Host "📦 Installation des dépendances backend..." -ForegroundColor Yellow
Set-Location "deploy-ready\backend"
npm install --production
Set-Location "..\.."

Write-Host "✅ Déploiement prêt ! Structure dans deploy-ready/" -ForegroundColor Green
Write-Host "📤 Transférer le contenu via FileZilla selon DEPLOYMENT_READY.md" -ForegroundColor Cyan
```

## 📋 **Script Bash pour Linux/Mac**

```bash
#!/bin/bash
# Script de déploiement KPS Services
# À exécuter depuis la racine du projet

echo "🚀 Déploiement KPS Services..."

# 1. Nettoyer les anciens builds
echo "🧹 Nettoyage des anciens builds..."
rm -rf frontend/dist
rm -rf deploy-ready

# 2. Créer la structure deploy-ready
echo "📁 Création de la structure deploy-ready..."
mkdir -p deploy-ready/backend
mkdir -p deploy-ready/frontend

# 3. Build du frontend
echo "🔨 Build du frontend..."
cd frontend
npm run build
cd ..

# 4. Copier les fichiers backend
echo "📦 Copie des fichiers backend..."
cp -r backend-api/* deploy-ready/backend/

# 5. Copier le build frontend
echo "📦 Copie du build frontend..."
cp -r frontend/dist/* deploy-ready/frontend/dist/

# 6. Installer les dépendances backend
echo "📦 Installation des dépendances backend..."
cd deploy-ready/backend
npm install --production
cd ../..

echo "✅ Déploiement prêt ! Structure dans deploy-ready/"
echo "📤 Transférer le contenu via FileZilla selon DEPLOYMENT_READY.md"
```

## 🔧 **Utilisation**

### **Windows :**
1. Ouvrir PowerShell en tant qu'administrateur
2. Naviguer vers le dossier du projet
3. Exécuter : `.\deploy-ready\DEPLOY_SCRIPT.md`

### **Linux/Mac :**
1. Ouvrir un terminal
2. Naviguer vers le dossier du projet
3. Rendre le script exécutable : `chmod +x deploy-ready/DEPLOY_SCRIPT.md`
4. Exécuter : `./deploy-ready/DEPLOY_SCRIPT.md`

## 📝 **Notes**

- Le script nettoie automatiquement les anciens builds
- Il recrée la structure deploy-ready complète
- Il installe les dépendances de production
- Il est prêt pour le transfert FileZilla

## 🚨 **Important**

- Vérifier que Node.js et npm sont installés
- S'assurer que les fichiers .env.production sont corrects
- Tester localement avant le déploiement
- Suivre les instructions de DEPLOYMENT_READY.md pour le transfert

# 🧪 Tests API KPS Services

Ce dossier contient les scripts de test automatisés pour l'API KPS Services.

## 📋 Scripts disponibles

### 1. `test-api.js` - Version complète avec couleurs

- Tests complets avec affichage coloré
- Dépendances: `node-fetch`, `chalk`
- Installation: `npm install`

### 2. `test-api-simple.js` - Version simple sans dépendances

- Tests basiques avec Node.js natif
- Aucune dépendance externe
- Plus léger et rapide

## 🚀 Utilisation

### Tests locaux (développement)

```bash
# Version simple (recommandée)
node test-api-simple.js

# Version complète
npm install
node test-api.js
```

### Tests avec URL personnalisée

```bash
# Test sur un serveur distant
node test-api-simple.js --url https://your-api.com

# Avec variables d'environnement
API_URL=https://your-api.com node test-api-simple.js
```

### Tests via npm scripts

```bash
# Tests locaux
npm run test

# Tests avec URL personnalisée
npm run test:prod
```

## 📊 Endpoints testés

### 🏥 Health Checks

- `GET /` - Endpoint racine
- CORS headers

### 📋 Services API

- `GET /api/services` - Récupérer tous les services
- `GET /api/services/:slug` - Service par slug
- `POST /api/services` - Créer un service (admin)

### 📧 Contacts API

- `POST /api/contacts` - Envoyer un message
- `GET /api/contacts` - Récupérer tous les messages (admin)
- `GET /api/contacts/:id` - Message par ID

### 💰 Quotes API

- `POST /api/quotes` - Créer un devis
- `GET /api/quotes` - Récupérer tous les devis (admin)
- `GET /api/quotes/:id` - Devis par ID

### 🔍 Validation

- Tests avec données invalides
- Tests avec données manquantes
- Vérification des codes de statut HTTP

## 📈 Interprétation des résultats

### ✅ Tests réussis

- **PASS** : L'endpoint fonctionne correctement
- **Status 200-299** : Requête réussie
- **Status 401** : Authentification requise (normal pour les routes admin)

### ❌ Tests échoués

- **FAIL** : L'endpoint ne répond pas comme attendu
- **Status 0** : Connexion impossible (serveur arrêté)
- **Status 500** : Erreur serveur interne

### ⚠️ Tests avec erreurs attendues

- **Status 400** : Données invalides (comportement normal)
- **Status 404** : Ressource non trouvée (normal si pas de données)

## 🔧 Configuration

### Variables d'environnement

```bash
# URL de base de l'API
API_URL=http://localhost:5000

# Pour les tests en production
API_URL=https://your-production-api.com
```

### Configuration du serveur

Assurez-vous que votre serveur backend est démarré :

```bash
# Démarrer le serveur
npm run dev

# Dans un autre terminal, lancer les tests
node test-api-simple.js
```

## 🐛 Dépannage

### Erreur "ECONNREFUSED"

- Vérifiez que le serveur backend est démarré
- Vérifiez le port (par défaut 5000)
- Vérifiez l'URL dans la configuration

### Erreur "Cannot find module"

- Utilisez `test-api-simple.js` (pas de dépendances)
- Ou installez les dépendances : `npm install`

### Tests qui échouent

- Vérifiez que MongoDB est démarré
- Vérifiez la configuration de la base de données
- Vérifiez les logs du serveur backend

## 📝 Exemple de sortie

```
🚀 === DÉMARRAGE DES TESTS API KPS SERVICES ===
📍 URL de base: http://localhost:5000
⏰ 12/01/2024 14:30:25

🏥 === TESTING HEALTH CHECKS ===
🧪 GET / - Endpoint racine... ✅ PASS

📋 === TESTING SERVICES API ===
🧪 GET /api/services - Récupérer tous les services... ✅ PASS
🧪 GET /api/services/:slug - Service par slug... ✅ PASS

📧 === TESTING CONTACTS API ===
🧪 POST /api/contacts - Envoyer un message... ✅ PASS
🧪 GET /api/contacts - Récupérer tous les messages... ✅ PASS

💰 === TESTING QUOTES API ===
🧪 POST /api/quotes - Créer un devis... ✅ PASS
🧪 GET /api/quotes - Récupérer tous les devis... ✅ PASS

🔍 === TESTING DATA VALIDATION ===
🧪 POST /api/contacts - Données invalides... ✅ PASS

📊 === RÉSULTATS DES TESTS ===
Total des tests: 8
✅ Réussis: 8
❌ Échoués: 0

📈 Taux de réussite: 100.0%

🎉 Tous les tests sont passés ! L'API fonctionne correctement.
```

## 🔄 Intégration CI/CD

### GitHub Actions

```yaml
name: API Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
      - run: cd backend-api && npm install
      - run: cd backend-api && npm start &
      - run: sleep 5 && cd backend-api && npm run test
```

### Script de déploiement

```bash
#!/bin/bash
# Script de déploiement avec tests
echo "🚀 Démarrage du serveur..."
npm start &
SERVER_PID=$!

echo "⏳ Attente du démarrage..."
sleep 5

echo "🧪 Lancement des tests..."
npm run test
TEST_RESULT=$?

echo "🛑 Arrêt du serveur..."
kill $SERVER_PID

exit $TEST_RESULT
```

## 📞 Support

En cas de problème avec les tests :

1. Vérifiez que le serveur backend fonctionne
2. Vérifiez la configuration MongoDB
3. Consultez les logs du serveur
4. Vérifiez la configuration réseau/firewall

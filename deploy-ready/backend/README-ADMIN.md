# 🔐 Système d'Administration KPS Services

Ce document explique comment utiliser le système d'authentification et d'administration pour KPS Services.

## 🚀 Accès à l'Administration

### URL d'accès

- **Page de connexion** : `http://localhost:5173/admin/login`
- **Tableau de bord** : `http://localhost:5173/admin/dashboard`

### Identifiants par défaut

```
Email : admin@kps-services.com
Mot de passe : admin123456
```

## 📋 Fonctionnalités Administratives

### 🏠 Tableau de Bord

- **Vue d'ensemble** : Statistiques générales
- **Gestion des devis** : Consultation et gestion des demandes
- **Messages** : Gestion des contacts clients
- **Services** : Administration des services proposés

### 📊 Statistiques Disponibles

- Nombre total de devis
- Nombre de messages reçus
- Nombre de services actifs
- Devis en attente de traitement

## 🔧 Configuration Backend

### Variables d'environnement requises

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d

# Admin par défaut
ADMIN_EMAIL=admin@kps-services.com
ADMIN_PASSWORD=admin123456
```

### Création de l'utilisateur admin

```bash
# Exécuter le script de création d'admin
cd backend-api
npm run create-admin
```

## 🛡️ Sécurité

### Authentification JWT

- **Token d'accès** : Stocké dans localStorage
- **Durée de validité** : 30 jours (configurable)
- **Protection des routes** : Middleware d'authentification

### Routes protégées

- `/api/quotes` - Gestion des devis (GET, PUT, DELETE)
- `/api/contacts` - Gestion des messages (GET, DELETE)
- `/api/services` - Gestion des services (POST, PUT, DELETE)

## 📱 Interface Utilisateur

### Page de Connexion

- **Design moderne** : Interface responsive avec Tailwind CSS
- **Validation en temps réel** : Feedback immédiat sur les erreurs
- **Sécurité** : Masquage du mot de passe avec toggle
- **Accessibilité** : Support des lecteurs d'écran

### Tableau de Bord

- **Navigation par onglets** : Vue d'ensemble, Devis, Messages, Services
- **Actions rapides** : Création, modification, suppression
- **Filtres et recherche** : Gestion efficace des données
- **Statistiques visuelles** : Graphiques et métriques

## 🔄 Workflow d'Administration

### 1. Connexion

1. Accéder à `/admin/login`
2. Saisir les identifiants admin
3. Redirection automatique vers le dashboard

### 2. Gestion des Devis

1. **Consultation** : Voir tous les devis reçus
2. **Détails** : Informations complètes du client
3. **Actions** : Approuver, rejeter, modifier le statut
4. **Suivi** : Historique des modifications

### 3. Gestion des Messages

1. **Réception** : Nouveaux messages clients
2. **Réponse** : Interface de réponse intégrée
3. **Archivage** : Organisation des conversations
4. **Statut** : Marquage comme lu/non lu

### 4. Gestion des Services

1. **Création** : Ajout de nouveaux services
2. **Modification** : Mise à jour des informations
3. **Tarification** : Gestion des prix
4. **Visibilité** : Activation/désactivation

## 🧪 Tests d'Authentification

### Test de connexion

```bash
# Tester l'endpoint de connexion
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@kps-services.com","password":"admin123456"}'
```

### Test de protection des routes

```bash
# Tester l'accès aux routes protégées
curl -X GET http://localhost:5000/api/quotes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🐛 Dépannage

### Problèmes de connexion

1. **Vérifier les identifiants** : Email et mot de passe corrects
2. **Vérifier la base de données** : Utilisateur admin créé
3. **Vérifier les logs** : Erreurs dans la console backend

### Problèmes d'accès

1. **Token expiré** : Se reconnecter
2. **Permissions** : Vérifier le statut admin
3. **CORS** : Configuration frontend/backend

### Problèmes d'affichage

1. **Cache navigateur** : Vider le cache
2. **Variables d'environnement** : Vérifier la configuration
3. **Dépendances** : Réinstaller les packages

## 📈 Améliorations Futures

### Fonctionnalités avancées

- **Gestion des rôles** : Différents niveaux d'accès
- **Audit trail** : Historique des actions
- **Notifications** : Alertes en temps réel
- **Export de données** : Rapports PDF/Excel

### Sécurité renforcée

- **2FA** : Authentification à deux facteurs
- **Rate limiting** : Protection contre les attaques
- **Session management** : Gestion avancée des sessions
- **Logs de sécurité** : Monitoring des accès

## 📞 Support

En cas de problème :

1. Vérifier les logs du serveur backend
2. Tester la connexion à la base de données
3. Vérifier la configuration JWT
4. Consulter la documentation des API

---

**Note** : Ce système d'administration est conçu pour un usage professionnel. Assurez-vous de changer les identifiants par défaut en production.

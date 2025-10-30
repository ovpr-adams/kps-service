#!/usr/bin/env node

/**
 * Script de test automatisé pour l'API KPS Services
 * Teste tous les endpoints de l'API backend
 */

import fetch from 'node-fetch';
import chalk from 'chalk';

// Configuration
const BASE_URL = process.env.API_URL || 'http://localhost:5000';
const API_BASE = `${BASE_URL}/api`;

// Couleurs pour les logs
const colors = {
  success: chalk.green,
  error: chalk.red,
  warning: chalk.yellow,
  info: chalk.blue,
  header: chalk.bold.cyan
};

// Statistiques des tests
let stats = {
  total: 0,
  passed: 0,
  failed: 0,
  errors: []
};

/**
 * Fonction utilitaire pour faire des requêtes HTTP
 */
async function makeRequest(method, endpoint, data = null, headers = {}) {
  const url = `${API_BASE}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    
    return {
      status: response.status,
      ok: response.ok,
      data: responseData
    };
  } catch (error) {
    return {
      status: 0,
      ok: false,
      error: error.message
    };
  }
}

/**
 * Fonction pour exécuter un test
 */
async function runTest(testName, testFunction) {
  stats.total++;
  process.stdout.write(`🧪 ${testName}... `);
  
  try {
    const result = await testFunction();
    if (result) {
      stats.passed++;
      console.log(colors.success('✅ PASS'));
    } else {
      stats.failed++;
      stats.errors.push(`${testName}: Test failed`);
      console.log(colors.error('❌ FAIL'));
    }
  } catch (error) {
    stats.failed++;
    stats.errors.push(`${testName}: ${error.message}`);
    console.log(colors.error('❌ ERROR'));
  }
}

/**
 * Tests pour les Services
 */
async function testServicesAPI() {
  console.log(colors.header('\n📋 === TESTING SERVICES API ==='));
  
  // GET /api/services - Récupérer tous les services
  await runTest('GET /api/services - Récupérer tous les services', async () => {
    const response = await makeRequest('GET', '/services');
    return response.ok && Array.isArray(response.data);
  });

  // GET /api/services/:slug - Récupérer un service par slug
  await runTest('GET /api/services/:slug - Service par slug', async () => {
    const response = await makeRequest('GET', '/services/nettoyage-industriel');
    return response.ok || response.status === 404; // 404 acceptable si pas de données
  });

  // POST /api/services - Créer un service (admin)
  await runTest('POST /api/services - Créer un service', async () => {
    const serviceData = {
      name: 'Test Service',
      slug: 'test-service',
      description: 'Service de test',
      price: 50,
      category: 'test'
    };
    const response = await makeRequest('POST', '/services', serviceData);
    return response.ok || response.status === 401; // 401 acceptable sans auth
  });
}

/**
 * Tests pour les Contacts
 */
async function testContactsAPI() {
  console.log(colors.header('\n📧 === TESTING CONTACTS API ==='));
  
  // POST /api/contacts - Envoyer un message
  await runTest('POST /api/contacts - Envoyer un message', async () => {
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '0123456789',
      subject: 'Test Contact',
      message: 'Message de test automatique'
    };
    const response = await makeRequest('POST', '/contacts', contactData);
    return response.ok;
  });

  // GET /api/contacts - Récupérer tous les messages (admin)
  await runTest('GET /api/contacts - Récupérer tous les messages', async () => {
    const response = await makeRequest('GET', '/contacts');
    return response.ok || response.status === 401; // 401 acceptable sans auth
  });

  // GET /api/contacts/:id - Récupérer un message par ID
  await runTest('GET /api/contacts/:id - Message par ID', async () => {
    const response = await makeRequest('GET', '/contacts/507f1f77bcf86cd799439011');
    return response.ok || response.status === 404 || response.status === 401;
  });
}

/**
 * Tests pour les Devis
 */
async function testQuotesAPI() {
  console.log(colors.header('\n💰 === TESTING QUOTES API ==='));
  
  // POST /api/quotes - Créer une demande de devis
  await runTest('POST /api/quotes - Créer un devis', async () => {
    const quoteData = {
      company: 'Test Company',
      contactName: 'Test User',
      email: 'test@example.com',
      phone: '0123456789',
      service: 'Nettoyage industriel',
      surface: 100,
      frequency: 'Hebdomadaire',
      message: 'Demande de test automatique'
    };
    const response = await makeRequest('POST', '/quotes', quoteData);
    return response.ok;
  });

  // GET /api/quotes - Récupérer tous les devis (admin)
  await runTest('GET /api/quotes - Récupérer tous les devis', async () => {
    const response = await makeRequest('GET', '/quotes');
    return response.ok || response.status === 401; // 401 acceptable sans auth
  });

  // GET /api/quotes/:id - Récupérer un devis par ID
  await runTest('GET /api/quotes/:id - Devis par ID', async () => {
    const response = await makeRequest('GET', '/quotes/507f1f77bcf86cd799439011');
    return response.ok || response.status === 404 || response.status === 401;
  });
}

/**
 * Tests de connectivité et santé
 */
async function testHealthChecks() {
  console.log(colors.header('\n🏥 === TESTING HEALTH CHECKS ==='));
  
  // Test de base - GET /
  await runTest('GET / - Endpoint racine', async () => {
    const response = await makeRequest('GET', '');
    return response.ok;
  });

  // Test CORS
  await runTest('CORS - Headers de sécurité', async () => {
    const response = await makeRequest('OPTIONS', '/quotes');
    return response.status === 200 || response.status === 204;
  });
}

/**
 * Tests de validation des données
 */
async function testDataValidation() {
  console.log(colors.header('\n🔍 === TESTING DATA VALIDATION ==='));
  
  // Test avec données invalides
  await runTest('POST /api/contacts - Données invalides', async () => {
    const invalidData = {
      name: '', // Nom vide
      email: 'invalid-email', // Email invalide
      message: '' // Message vide
    };
    const response = await makeRequest('POST', '/contacts', invalidData);
    return response.status === 400; // Doit retourner 400 Bad Request
  });

  // Test avec données manquantes
  await runTest('POST /api/quotes - Données manquantes', async () => {
    const incompleteData = {
      company: 'Test Company'
      // Manque email, phone, etc.
    };
    const response = await makeRequest('POST', '/quotes', incompleteData);
    return response.status === 400; // Doit retourner 400 Bad Request
  });
}

/**
 * Fonction principale
 */
async function runAllTests() {
  console.log(colors.header('🚀 === DÉMARRAGE DES TESTS API KPS SERVICES ==='));
  console.log(colors.info(`📍 URL de base: ${BASE_URL}`));
  console.log(colors.info(`⏰ ${new Date().toLocaleString()}\n`));

  try {
    // Tests de santé
    await testHealthChecks();
    
    // Tests des services
    await testServicesAPI();
    
    // Tests des contacts
    await testContactsAPI();
    
    // Tests des devis
    await testQuotesAPI();
    
    // Tests de validation
    await testDataValidation();

  } catch (error) {
    console.error(colors.error('❌ Erreur critique lors des tests:'), error.message);
  }

  // Affichage des résultats
  console.log(colors.header('\n📊 === RÉSULTATS DES TESTS ==='));
  console.log(colors.info(`Total des tests: ${stats.total}`));
  console.log(colors.success(`✅ Réussis: ${stats.passed}`));
  console.log(colors.error(`❌ Échoués: ${stats.failed}`));
  
  if (stats.errors.length > 0) {
    console.log(colors.warning('\n🔍 Détails des erreurs:'));
    stats.errors.forEach(error => console.log(colors.error(`  • ${error}`)));
  }

  // Score de réussite
  const successRate = ((stats.passed / stats.total) * 100).toFixed(1);
  console.log(colors.info(`\n📈 Taux de réussite: ${successRate}%`));

  if (stats.failed === 0) {
    console.log(colors.success('\n🎉 Tous les tests sont passés ! L\'API fonctionne correctement.'));
  } else {
    console.log(colors.warning(`\n⚠️  ${stats.failed} test(s) ont échoué. Vérifiez la configuration.`));
  }

  process.exit(stats.failed > 0 ? 1 : 0);
}

// Gestion des arguments de ligne de commande
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(colors.header('🧪 Script de test API KPS Services'));
  console.log('\nUsage:');
  console.log('  node test-api.js                    # Tests avec localhost:5000');
  console.log('  node test-api.js --url http://...    # Tests avec URL personnalisée');
  console.log('  node test-api.js --help             # Afficher cette aide');
  console.log('\nVariables d\'environnement:');
  console.log('  API_URL=http://localhost:5000       # URL de base de l\'API');
  process.exit(0);
}

// Récupération de l'URL personnalisée
const customUrlIndex = process.argv.indexOf('--url');
if (customUrlIndex !== -1 && process.argv[customUrlIndex + 1]) {
  process.env.API_URL = process.argv[customUrlIndex + 1];
}

// Lancement des tests
runAllTests();

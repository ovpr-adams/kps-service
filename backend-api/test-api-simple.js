#!/usr/bin/env node

/**
 * Script de test simple pour l'API KPS Services
 * Version simplifiée sans dépendances externes
 */

const http = require('http');
const https = require('https');

// Configuration
const BASE_URL = process.env.API_URL || 'http://localhost:5000';
const API_BASE = `${BASE_URL}/api`;

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
function makeRequest(method, endpoint, data = null) {
  return new Promise((resolve) => {
    const url = `${API_BASE}${endpoint}`;
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      const jsonData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(jsonData);
    }

    const req = client.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          resolve({
            status: res.statusCode,
            ok: res.statusCode >= 200 && res.statusCode < 300,
            data: parsedData
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            ok: res.statusCode >= 200 && res.statusCode < 300,
            data: responseData
          });
        }
      });
    });

    req.on('error', (error) => {
      resolve({
        status: 0,
        ok: false,
        error: error.message
      });
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
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
      console.log('✅ PASS');
    } else {
      stats.failed++;
      stats.errors.push(`${testName}: Test failed`);
      console.log('❌ FAIL');
    }
  } catch (error) {
    stats.failed++;
    stats.errors.push(`${testName}: ${error.message}`);
    console.log('❌ ERROR');
  }
}

/**
 * Tests pour les Services
 */
async function testServicesAPI() {
  console.log('\n📋 === TESTING SERVICES API ===');
  
  // GET /api/services - Récupérer tous les services
  await runTest('GET /api/services - Récupérer tous les services', async () => {
    const response = await makeRequest('GET', '/services');
    return response.ok && Array.isArray(response.data);
  });

  // GET /api/services/:slug - Récupérer un service par slug
  await runTest('GET /api/services/:slug - Service par slug', async () => {
    const response = await makeRequest('GET', '/services/nettoyage-industriel');
    return response.ok || response.status === 404;
  });
}

/**
 * Tests pour les Contacts
 */
async function testContactsAPI() {
  console.log('\n📧 === TESTING CONTACTS API ===');
  
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
    return response.ok || response.status === 401;
  });
}

/**
 * Tests pour les Devis
 */
async function testQuotesAPI() {
  console.log('\n💰 === TESTING QUOTES API ===');
  
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
    return response.ok || response.status === 401;
  });
}

/**
 * Tests de connectivité
 */
async function testHealthChecks() {
  console.log('\n🏥 === TESTING HEALTH CHECKS ===');
  
  // Test de base - GET /
  await runTest('GET / - Endpoint racine', async () => {
    const response = await makeRequest('GET', '');
    return response.ok;
  });
}

/**
 * Tests de validation des données
 */
async function testDataValidation() {
  console.log('\n🔍 === TESTING DATA VALIDATION ===');
  
  // Test avec données invalides
  await runTest('POST /api/contacts - Données invalides', async () => {
    const invalidData = {
      name: '', // Nom vide
      email: 'invalid-email', // Email invalide
      message: '' // Message vide
    };
    const response = await makeRequest('POST', '/contacts', invalidData);
    return response.status === 400;
  });
}

/**
 * Fonction principale
 */
async function runAllTests() {
  console.log('🚀 === DÉMARRAGE DES TESTS API KPS SERVICES ===');
  console.log(`📍 URL de base: ${BASE_URL}`);
  console.log(`⏰ ${new Date().toLocaleString()}\n`);

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
    console.error('❌ Erreur critique lors des tests:', error.message);
  }

  // Affichage des résultats
  console.log('\n📊 === RÉSULTATS DES TESTS ===');
  console.log(`Total des tests: ${stats.total}`);
  console.log(`✅ Réussis: ${stats.passed}`);
  console.log(`❌ Échoués: ${stats.failed}`);
  
  if (stats.errors.length > 0) {
    console.log('\n🔍 Détails des erreurs:');
    stats.errors.forEach(error => console.log(`  • ${error}`));
  }

  // Score de réussite
  const successRate = ((stats.passed / stats.total) * 100).toFixed(1);
  console.log(`\n📈 Taux de réussite: ${successRate}%`);

  if (stats.failed === 0) {
    console.log('\n🎉 Tous les tests sont passés ! L\'API fonctionne correctement.');
  } else {
    console.log(`\n⚠️  ${stats.failed} test(s) ont échoué. Vérifiez la configuration.`);
  }

  process.exit(stats.failed > 0 ? 1 : 0);
}

// Lancement des tests
runAllTests();

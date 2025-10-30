import fetch from 'node-fetch';

async function testAuth() {
  try {
    console.log('🧪 Test de connexion admin...');
    
    // Test de connexion
    const loginResponse = await fetch('http://127.0.0.1:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@kps-services.com',
        password: 'admin123456'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('📊 Status login:', loginResponse.status);
    console.log('📊 Response login:', loginData);
    
    if (loginResponse.ok && loginData.token) {
      console.log('✅ Connexion réussie, token reçu');
      
      // Test avec token
      console.log('🧪 Test API avec token...');
      const apiResponse = await fetch('http://127.0.0.1:5000/api/services', {
        headers: {
          'Authorization': `Bearer ${loginData.token}`
        }
      });
      
      console.log('📊 Status API:', apiResponse.status);
      const apiData = await apiResponse.json();
      console.log('📊 Response API:', apiData);
      
    } else {
      console.log('❌ Échec de connexion');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testAuth();

# Script PowerShell pour démarrer KPS Services
Write-Host "🚀 Démarrage de KPS Services..." -ForegroundColor Green
Write-Host ""

# Vérifier si Node.js est installé
try {
  $nodeVersion = node --version
  Write-Host "✅ Node.js détecté: $nodeVersion" -ForegroundColor Green
}
catch {
  Write-Host "❌ Node.js n'est pas installé ou pas dans le PATH" -ForegroundColor Red
  Write-Host "Veuillez installer Node.js depuis https://nodejs.org" -ForegroundColor Yellow
  Read-Host "Appuyez sur Entrée pour fermer"
  exit 1
}

# Vérifier si MongoDB est en cours d'exécution
try {
  $mongoStatus = Get-Process -Name "mongod" -ErrorAction SilentlyContinue
  if ($mongoStatus) {
    Write-Host "✅ MongoDB détecté" -ForegroundColor Green
  }
  else {
    Write-Host "⚠️  MongoDB n'est pas détecté. Assurez-vous qu'il est démarré." -ForegroundColor Yellow
  }
}
catch {
  Write-Host "⚠️  Impossible de vérifier MongoDB" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "1. Démarrage du backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend-api; npm run dev"

Write-Host "2. Attente de 3 secondes..." -ForegroundColor Cyan
Start-Sleep -Seconds 3

Write-Host "3. Démarrage du frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host ""
Write-Host "✅ Les serveurs sont en cours de démarrage..." -ForegroundColor Green
Write-Host "🌐 Frontend: http://localhost:5173" -ForegroundColor Blue
Write-Host "🔧 Backend: http://localhost:5000" -ForegroundColor Blue
Write-Host "📧 Contact: http://localhost:5173/contact" -ForegroundColor Blue
Write-Host ""
Write-Host "Appuyez sur Entrée pour fermer cette fenêtre..." -ForegroundColor Gray
Read-Host

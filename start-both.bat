@echo off
echo Demarrage de KPS Services (Backend + Frontend)...
echo.

echo 1. Demarrage du backend...
start "Backend KPS" cmd /k "cd backend-api && npm run dev"

echo 2. Attente de 3 secondes...
timeout /t 3 /nobreak >nul

echo 3. Demarrage du frontend...
start "Frontend KPS" cmd /k "cd frontend && npm run dev"

echo.
echo Les deux serveurs sont en cours de demarrage...
echo - Backend: http://localhost:5000
echo - Frontend: http://localhost:5173
echo.
echo Appuyez sur une touche pour fermer cette fenetre...
pause >nul

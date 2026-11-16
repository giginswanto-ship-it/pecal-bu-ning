@echo off
title Nasi Pecel Bu Ning's - Server Display Order
color 0A
echo ===============================================================
echo     SISTEM DISPLAY ORDER & KDS - NASI PECEL BU NING'S
echo ===============================================================
echo.
echo Sedang memeriksa Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js belum terinstall di komputer ini!
    echo Silakan install Node.js dari https://nodejs.org
    pause
    exit /b
)

echo Menjalankan Server Display Order...
echo Membuka browser...
start http://localhost:3000
node server.js
pause

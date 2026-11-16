@echo off
title Push Pecel Bu Ning ke GitHub (giginswanto-ship-it)
color 0B
echo ===============================================================
echo   PUSH PROYEK PECEL BU NING KE GITHUB (giginswanto-ship-it)
echo ===============================================================
echo.
echo Remote target: https://github.com/giginswanto-ship-it/pecal-bu-ning.git
echo.
echo Melakukan git push...
git push -u origin main
echo.
if %errorlevel% equ 0 (
    echo ===============================================================
    echo [SUKSES] Berhasil dipush ke GitHub!
    echo URL: https://github.com/giginswanto-ship-it/pecal-bu-ning
    echo ===============================================================
) else (
    echo ===============================================================
    echo [INFO] Jika diminta login GitHub, silakan selesaikan otorisasi di browser.
    echo ===============================================================
)
pause

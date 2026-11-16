@echo off
title Push Pecel Bu Ning ke GitHub (giginswanto-ship-it)
color 0B
echo ===============================================================
echo   PUSH PROYEK PECEL BU NING KE GITHUB (giginswanto-ship-it)
echo ===============================================================
echo.
echo Target Repositori : https://github.com/giginswanto-ship-it/pecal-bu-ning.git
echo Branch            : main dan pecal-bu-ning
echo.
echo Sedang melakukan upload (git push)...
git push -u origin main
git push -u origin pecal-bu-ning
echo.
if %errorlevel% equ 0 (
    echo ===============================================================
    echo [SUKSES] Berhasil dipush ke GitHub!
    echo Cek repositori: https://github.com/giginswanto-ship-it/pecal-bu-ning
    echo ===============================================================
) else (
    echo ===============================================================
    echo [PERHATIAN] Jika jendela browser / login GitHub muncul:
    echo 1. Pilih 'Sign in with your browser'
    echo 2. Login menggunakan akun: giginswanto-ship-it
    echo 3. Setelah disetujui, file akan otomatis ter-upload.
    echo ===============================================================
)
echo.
pause

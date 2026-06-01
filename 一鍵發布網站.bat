@echo off
echo ==========================================
echo    Embark - Web Auto Deploy System (v1.0)
echo ==========================================
echo.
echo Step 1: Initializing Git repository...
git init
echo.
echo Step 2: Adding all files...
git add .
echo.
echo Step 3: Committing changes...
git commit -m "Fix: mobile compatibility and layout overflow"
echo.
echo Step 4: Connecting to remote repository...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/ArpowChao/Embark-6th.git
echo.
echo Step 5: Pushing to GitHub (Netlify will auto deploy)...
echo (Note: If log in window pops up, click "Sign in with your browser")
git push -f origin main
echo.
echo ==========================================
echo    Deploy successfully! Netlify is rendering...
echo    Refresh page in 30 seconds to see updates!
echo ==========================================
pause

@echo off
echo ==========================================
echo    Embark 啟程 - 網站自動發布系統 (v1.0)
echo ==========================================
echo.
echo 步驟 1: 初始化您的 Git 倉儲...
git init
echo.
echo 步驟 2: 把所有檔案（含樣式與圖片）打包進去...
git add .
echo.
echo 步驟 3: 撰寫發布日誌...
git commit -m "Auto Update: 注入文學魂與動態導數功能渲染"
echo.
echo 步驟 4: 連結至您的 GitHub 遠端 (https://github.com/ArpowChao/Embark-6th)...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/ArpowChao/Embark-6th.git
echo.
echo 步驟 5: 正在推送到網路上 (Netlify 會自動接收)...
echo (註：如果跳出登入視窗，請點擊 "Sign in with your browser" 即可完成授權)
git push -f origin master
echo.
echo ==========================================
echo    任務完成！您的網站正在 Netlify 渲染中...
echo    過 30 秒後重新整理網址即可看見完美成果！
echo ==========================================
pause

@echo off
echo [1/4] Fixing Branding Assets (Logo and Favicon)...
copy /Y "C:\Users\Sajida Randhawa\.gemini\antigravity\brain\1081a7d2-a9ea-4af9-88a3-457921a1a02d\textsymbols_logo_premium_1774689740470.png" "favicon.png"
copy /Y "C:\Users\Sajida Randhawa\.gemini\antigravity\brain\1081a7d2-a9ea-4af9-88a3-457921a1a02d\og_image_branding_1774688752397.png" "og-image.png"

echo.
echo [2/4] Staging all branding changes...
git add .

echo.
echo [3/4] Committing changes...
git commit -m "Upgrade: Premium branding and relative path migration"

echo.
echo [4/4] Pushing to GitHub (alayanoor14-tech/Fancysymbols.com)...
git push origin main

echo.
echo ==========================================
echo DEPLOYMENT COMPLETE! ✦
echo ==========================================
pause

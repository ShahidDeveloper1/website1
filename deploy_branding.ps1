# Deployment Script for TextSymbols Branding

$logoSource = "C:\Users\Sajida Randhawa\.gemini\antigravity\brain\1081a7d2-a9ea-4af9-88a3-457921a1a02d\textsymbols_logo_premium_1774689740470.png"
$ogSource = "C:\Users\Sajida Randhawa\.gemini\antigravity\brain\1081a7d2-a9ea-4af9-88a3-457921a1a02d\og_image_branding_1774688752397.png"

Write-Host "[1/4] Deploying Image Assets..." -ForegroundColor Cyan
Copy-Item -Path $logoSource -Destination "favicon.png" -Force
Copy-Item -Path $ogSource -Destination "og-image.png" -Force

Write-Host "`n[2/4] Staging changes..." -ForegroundColor Cyan
git add .

Write-Host "`n[3/4] Committing changes..." -ForegroundColor Cyan
git commit -m "Upgrade: Premium branding and relative path migration"

Write-Host "`n[4/4] Pushing to GitHub (alayanoor14-tech/Fancysymbols.com)..." -ForegroundColor Cyan
git push origin main

Write-Host "`n===============================================" -ForegroundColor Green
Write-Host "DEPLOYMENT COMPLETE! ✦" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green
Read-Host "Press Enter to exit"

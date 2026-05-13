@echo off
echo ==============================================
echo   FANCY SYMBOLS - UNIVERSAL SITE FIXER
echo ==============================================
echo.
echo 1. Running Modernization Script (SEO + Clean URLs)...
node modernize_all_pages.js
echo.
echo 2. Cleaning up old Python files...
del clean_urls.py modernize_all_pages.py update_h1.py update_navigation.py update_pages.py
echo.
echo ==============================================
echo   DONE! Starting development server...
echo ==============================================
bun run dev

@echo off
setlocal
echo ==============================================
echo   FANCY SYMBOLS - PORT 3000 START
echo ==============================================
echo.

:CHECK_BUN
echo 1. Checking for Bun...
where bun >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Bun is installed.
    if not exist "node_modules" (
        echo [REPAIR] node_modules missing. Running 'bun install'...
        bun install
    )
    echo Cleaning Vite cache...
    if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite"
    echo Running 'bun run dev' on PORT 3000...
    bun run dev
    if %ERRORLEVEL% NEQ 0 goto CHECK_NODE
    goto DONE
)

:CHECK_NODE
echo.
echo 2. Checking for Node/NPM...
where npm >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node/NPM is installed.
    if not exist "node_modules" (
        echo [REPAIR] node_modules missing. Running 'npm install'...
        npm install
    )
    echo Cleaning Vite cache...
    if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite"
    echo Running 'npm run dev' on PORT 3000...
    npm run dev
    if %ERRORLEVEL% NEQ 0 goto CHECK_DIRECT
    goto DONE
)

:CHECK_DIRECT
echo.
echo 3. Trying Direct Node Execution on PORT 3000...
if exist "node_modules\vite\bin\vite.js" (
    echo [OK] Vite found in node_modules.
    node node_modules\vite\bin\vite.js --host 0.0.0.0 --port 3000 --strictPort
    if %ERRORLEVEL% EQU 0 goto DONE
)

:ERROR
echo.
echo ==============================================
echo   ⚠️ ERROR: FAILED TO START SERVER
echo ==============================================
echo   Please make sure Node.js is installed!
echo   https://nodejs.org
echo.
echo   IF YOU SEE "Port 3000 is in use", close other programs!
echo ==============================================
pause
exit /b 1

:DONE
echo.
echo ==============================================
echo   🚀 SERVER STARTED SUCCESSFULLY!
echo   OPEN: http://localhost:3000
echo ==============================================
pause

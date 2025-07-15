@echo off
echo.
echo ================================
echo  CGPA Tracker - Release Creator
echo ================================
echo.

REM Get version from user
set /p version="Enter version number (e.g., 1.0.1): "

REM Create release package
echo.
echo [1/4] Creating distribution package...
call package-extension.bat

REM Create ZIP file
echo.
echo [2/4] Creating ZIP file for release...
powershell -Command "Compress-Archive -Path 'dist/CGPA-Tracker-Extension' -DestinationPath 'CGPA-Tracker-v%version%.zip' -Force"

REM Verify ZIP creation
if exist "CGPA-Tracker-v%version%.zip" (
    echo ✅ ZIP file created successfully: CGPA-Tracker-v%version%.zip
) else (
    echo ❌ Failed to create ZIP file
    pause
    exit /b 1
)

REM Show ZIP details
echo.
echo [3/4] Release package details:
powershell -Command "Get-Item 'CGPA-Tracker-v%version%.zip' | Select-Object Name, Length, LastWriteTime"

REM Instructions for GitHub release
echo.
echo [4/4] Next steps for GitHub Release:
echo.
echo 📋 To create GitHub release:
echo 1. Go to: https://github.com/Anoopkr1906/GCPA-Tracker/releases
echo 2. Click "Create a new release"
echo 3. Tag version: v%version%
echo 4. Release title: CGPA Tracker v%version%
echo 5. Upload file: CGPA-Tracker-v%version%.zip
echo 6. Copy description from: RELEASE_NOTES_v1.0.0.md
echo 7. Publish release
echo.
echo 🚀 Your release package is ready!
echo.
pause

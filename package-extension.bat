@echo off
echo 📦 Packaging CGPA Tracker Extension for Distribution...
echo.

REM Create distribution folder
if exist "dist" rmdir /s /q "dist"
mkdir "dist"
mkdir "dist\CGPA-Tracker-Extension"

REM Copy essential files only
echo ✅ Copying extension files...
copy "manifest.json" "dist\CGPA-Tracker-Extension\"
copy "popup.html" "dist\CGPA-Tracker-Extension\"
copy "popup.js" "dist\CGPA-Tracker-Extension\"
copy "content.js" "dist\CGPA-Tracker-Extension\"
copy "styles.css" "dist\CGPA-Tracker-Extension\"
copy "Anoop.jpg" "dist\CGPA-Tracker-Extension\"

REM Copy icons if they exist
if exist "icons" (
    xcopy "icons" "dist\CGPA-Tracker-Extension\icons\" /E /I
    echo ✅ Copied icons folder
)

REM Create installation instructions
echo ✅ Creating installation instructions...
(
echo # 🎓 CGPA Tracker - Installation Guide
echo.
echo ## 📥 How to Install:
echo.
echo 1. **Extract Files**
echo    - Extract this ZIP to a folder on your computer
echo.
echo 2. **Open Chrome Extensions**
echo    - Open Chrome browser
echo    - Go to chrome://extensions/
echo    - Enable "Developer mode" ^(toggle in top-right^)
echo.
echo 3. **Load Extension**
echo    - Click "Load unpacked"
echo    - Select the "CGPA-Tracker-Extension" folder
echo.
echo 4. **Start Using**
echo    - Visit nitjsr.vercel.app
echo    - Look for the floating "🎓 CGPA Tracker" button
echo    - Click to start calculating your CGPA goals!
echo.
echo ## 🎯 Features:
echo - Calculate required CGPA for remaining semesters
echo - Beautiful, modern interface
echo - Auto-save your data
echo - Works specifically with NIT JSR website
echo.
echo ## 🔒 Privacy:
echo - All data stays on your device
echo - No external servers or data collection
echo - Open source and transparent
echo.
echo ## 📞 Support:
echo - GitHub: https://github.com/Anoopkr1906/CGPA-Tracker
echo - Issues: Report bugs or request features
echo.
echo **Made with ❤️ for NIT JSR students**
) > "dist\CGPA-Tracker-Extension\INSTALLATION_GUIDE.md"

REM Create version info
echo ✅ Creating version info...
(
echo Extension: CGPA Tracker
echo Version: 1.0.0
echo Built: %date% %time%
echo Target: NIT JSR Students
echo Website: nitjsr.vercel.app
echo.
echo Files included:
echo - manifest.json
echo - popup.html
echo - popup.js  
echo - content.js
echo - styles.css
echo - Anoop.jpg
echo - icons/ ^(if present^)
echo - INSTALLATION_GUIDE.md
echo.
echo Ready for distribution!
) > "dist\CGPA-Tracker-Extension\VERSION_INFO.txt"

echo.
echo ✅ Packaging complete!
echo 📁 Files are ready in: dist\CGPA-Tracker-Extension\
echo.
echo 📤 Next steps:
echo 1. ZIP the "CGPA-Tracker-Extension" folder
echo 2. Share the ZIP file with students
echo 3. Include the INSTALLATION_GUIDE.md for easy setup
echo.
echo 🚀 Your extension is ready for distribution!
pause

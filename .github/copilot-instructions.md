<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# CGPA Tracker Browser Extension

This is a browser extension project for helping college students calculate required CGPA for upcoming semesters.

## Project Context

- **Type**: Browser Extension (Chrome/Edge compatible)
- **Purpose**: CGPA calculation and academic planning tool
- **Target Users**: College students
- **Integration**: Works with college websites to auto-detect CGPA data

## Code Guidelines

- Use modern JavaScript (ES6+)
- Follow Chrome Extension Manifest V3 standards
- Maintain responsive design for popup UI
- Ensure cross-browser compatibility
- Keep security and privacy in mind (local storage only)

## Key Features to Maintain

1. CGPA calculation logic
2. Website integration for auto-detection
3. Data persistence using Chrome storage API
4. Real-time UI updates
5. Input validation and error handling

## File Structure

- `manifest.json`: Extension configuration
- `popup.html/js/css`: Main extension interface
- `content.js`: Website integration script
- `icons/`: Extension icons and assets

When making changes:
- Test calculations thoroughly
- Ensure UI remains user-friendly
- Maintain accessibility standards
- Consider edge cases in input validation

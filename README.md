# 🎓 CGPA Tracker Browser Extension

A powerful browser extension that helps college students calculate the CGPA they need in upcoming semesters to reach their target CGPA.

## ✨ Features

- **Smart CGPA Calculation**: Calculate required CGPA for remaining semesters
- **Target Achievement Analysis**: Determine if your target CGPA is achievable
- **Maximum CGPA Prediction**: Shows the highest CGPA you can possibly achieve
- **Semester-wise Planning**: Visual breakdown of required performance per semester
- **Auto-detection**: Automatically detects CGPA data on college websites
- **Data Persistence**: Saves your inputs for future sessions
- **Real-time Calculations**: Updates results as you type
- **Beautiful UI**: Modern, intuitive interface

## 🚀 Installation

### For Chrome/Edge:

1. **Download the Extension**:
   - Download or clone this repository
   - Or download the `.zip` file and extract it

2. **Load in Browser**:
   - Open Chrome/Edge and go to `chrome://extensions/` (or `edge://extensions/`)
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the folder containing the extension files

3. **Pin the Extension**:
   - Click the puzzle piece icon in the browser toolbar
   - Find "CGPA Tracker" and click the pin icon

## 📱 How to Use

### Method 1: Extension Popup
1. Click the CGPA Tracker icon in your browser toolbar
2. Enter your current CGPA
3. Enter completed semesters and total semesters
4. Enter your target CGPA
5. Click "Calculate Required CGPA"

### Method 2: On College Website
1. Visit your college website
2. Look for the floating "🎓 CGPA Tracker" button
3. If the extension detects your CGPA data, it will show a notification
4. Click the floating button to open the tracker with auto-filled data

## 📊 Example Calculation

**Scenario**: 
- Current CGPA: 6.7 (after 2 semesters)
- Target CGPA: 8.0 (after 8 semesters)
- Remaining semesters: 6

**Result**: 
- Required CGPA per remaining semester: 8.55
- Status: Challenging but possible!

## 🎯 Understanding the Results

### ✅ Target Achievable (Green)
- Required CGPA ≤ 8.5 per semester
- Realistic with good study habits

### ⚠️ Challenging but Possible (Orange)
- Required CGPA 8.5-10.0 per semester
- Requires excellent performance

### ❌ Target Not Achievable (Red)
- Required CGPA > 10.0 per semester
- Shows maximum possible CGPA instead

## 🏫 College Website Integration

The extension automatically detects CGPA data on websites containing:
- `.cgpa`, `.gpa` CSS classes
- `data-cgpa` attributes
- Common academic portal selectors

### Supported Website Patterns:
- University portals with "university", "college", "edu" in domain
- Student information systems
- Academic record pages

## 🔧 Customization

### For Your College Website:
1. Open `content.js`
2. Modify the `possibleSelectors` array to match your website's HTML structure
3. Add your college domain to `collegeDomains` array

Example:
```javascript
const possibleSelectors = [
    '.your-college-cgpa-class',
    '#cgpa-value',
    '.student-record .gpa'
];

const collegeDomains = [
    'yourcollege.edu',
    'studentportal.yourcollege'
];
```

## 📁 File Structure

```
CGPA Tracker/
├── manifest.json          # Extension configuration
├── popup.html             # Main UI
├── popup.js               # Calculation logic
├── styles.css             # Styling
├── content.js             # Website integration
├── icons/                 # Extension icons
├── package.json           # Project metadata
└── README.md             # This file
```

## 🛠️ Development

### Building the Extension:
```bash
npm run build
```

### Creating Distribution Package:
```bash
npm run package
```

## 💡 Tips for Students

1. **Focus on High-Credit Subjects**: Prioritize subjects with more credit hours
2. **Consistent Performance**: Maintain steady performance across semesters
3. **Early Planning**: Start tracking from early semesters
4. **Realistic Goals**: Set achievable targets based on calculations
5. **Subject Retakes**: Consider retaking subjects if your institution allows

## 🔒 Privacy

- All data is stored locally in your browser
- No personal information is sent to external servers
- CGPA calculations are performed entirely on your device

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - feel free to use and modify for your needs.

## 🆘 Support

If you encounter any issues:
1. Check that all input values are valid
2. Ensure your college website's HTML structure matches the selectors
3. Try refreshing the page and reopening the extension

## 🔄 Version History

- **v1.0.0**: Initial release with core CGPA calculation features

---

**Made with ❤️ for students by students**

*Help your fellow students by sharing this extension!*

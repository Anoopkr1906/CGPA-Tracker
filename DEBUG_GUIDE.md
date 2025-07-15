# 🔍 Debug Guide for CGPA Extraction

Your extension now has **enhanced debugging** to find out why CGPA extraction isn't working.

## 🚀 How to Test:

### **Step 1: Load Extension**
1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" → Select your extension folder
4. Make sure it's enabled

### **Step 2: Visit College Website**
1. Go to `https://nitjsr.vercel.app/`
2. You should see **two buttons**:
   - 🎓 **CGPA Tracker** (main button)
   - 🔍 **Test Detection** (debug button)

### **Step 3: Check Console**
1. Press **F12** to open Developer Tools
2. Go to **Console** tab
3. Look for messages starting with "CGPA Tracker:"

### **Step 4: Run Manual Test**
1. Click the **🔍 Test Detection** button
2. Check the alert popup for results
3. Check console for detailed logs

### **Alternative: Console Command**
1. In console, type: `testCGPAExtraction()`
2. Press Enter
3. Review the detailed output

## 🔍 What to Look For:

### **Console Messages:**
```
CGPA Tracker extension loaded
CGPA Tracker: Allowed website detected
CGPA Tracker: Scanning for CGPA data...
Current URL: https://nitjsr.vercel.app/
```

### **If Working:**
- Green notification: "📊 Academic Data Detected!"
- Console shows: "✅ Found element with selector..."

### **If Not Working:**
- Orange notification: "⚠️ No CGPA data detected"
- Console shows what was scanned but not found

## 📊 Debug Information Collected:

1. **Page Analysis:** URL, title, content length
2. **Element Scanning:** All selectors tested
3. **Text Search:** Brute force search for numbers
4. **Script Analysis:** JavaScript variables checked  
5. **Storage Check:** LocalStorage/SessionStorage data
6. **Global Variables:** Window object properties

## 🛠️ Common Issues & Solutions:

### **Issue 1: Extension Not Loading**
- **Check:** Extension enabled in chrome://extensions/
- **Solution:** Reload extension, check manifest.json

### **Issue 2: Wrong Website**
- **Check:** Are you on `nitjsr.vercel.app`?
- **Solution:** Make sure URL matches exactly

### **Issue 3: Data Not on Current Page**
- **Check:** Is this a login page or landing page?
- **Solution:** Navigate to student portal/results page

### **Issue 4: Dynamic Content**
- **Check:** Is data loaded via AJAX/JavaScript?
- **Solution:** Wait for page to fully load, refresh

## 🎯 Next Steps:

1. **Run the test** and share console output
2. **Check what page** you're actually on
3. **Look for login requirements** 
4. **Try different pages** on the website

The extension will now tell you **exactly what it finds** on each page! 🕵️‍♂️

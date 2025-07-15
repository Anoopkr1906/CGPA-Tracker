// Content script to integrate with college website
console.log('CGPA Tracker extension loaded');

// Check if Chrome extension API is available
function checkChromeAPI() {
    if (!chrome || !chrome.runtime) {
        console.error('CGPA Tracker: Chrome extension API not available. Extension may not be properly installed.');
        return false;
    }
    return true;
}

// Function to extract CGPA data from college website
function extractCGPAFromWebsite() {
    // This function will be customized based on your college website structure
    // Common selectors for CGPA data
    const possibleSelectors = [
        '.cgpa',
        '.gpa',
        '[data-cgpa]',
        '.academic-record .cgpa',
        '.result .cgpa',
        '.grade-point',
        '.cumulative-gpa'
    ];

    let cgpaElement = null;
    let cgpaValue = null;

    // Try to find CGPA element
    for (const selector of possibleSelectors) {
        cgpaElement = document.querySelector(selector);
        if (cgpaElement) {
            cgpaValue = extractNumberFromText(cgpaElement.textContent);
            if (cgpaValue !== null) break;
        }
    }

    // Also try to find semester information
    const semesterSelectors = [
        '.semester',
        '.term',
        '[data-semester]',
        '.academic-term'
    ];

    let semesterInfo = null;
    for (const selector of semesterSelectors) {
        const semElement = document.querySelector(selector);
        if (semElement) {
            const semText = semElement.textContent;
            const semMatch = semText.match(/(\d+)/);
            if (semMatch) {
                semesterInfo = parseInt(semMatch[1]);
                break;
            }
        }
    }

    return {
        cgpa: cgpaValue,
        semester: semesterInfo,
        found: cgpaValue !== null
    };
}

// Extract number from text
function extractNumberFromText(text) {
    if (!text) return null;
    const match = text.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : null;
}

// Create floating CGPA tracker button
function createFloatingButton() {
    console.log('CGPA Tracker: Creating floating button...');
    
    // Check if button already exists
    const existingButton = document.getElementById('cgpa-tracker-btn');
    if (existingButton) {
        console.log('CGPA Tracker: Button already exists, removing old one');
        existingButton.remove();
    }
    
    // Smart positioning to avoid common website elements
    let topPosition = '80px'; // Default position
    
    // Check for common header/navigation elements that might interfere
    const commonHeaderSelectors = [
        'header', '.header', '#header',
        'nav', '.nav', '.navbar', '.navigation',
        '.search', '.search-bar', '.search-box',
        '.menu', '.top-bar', '.header-bar'
    ];
    
    let maxHeaderHeight = 60; // Default assumption
    commonHeaderSelectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.bottom > maxHeaderHeight) {
                maxHeaderHeight = Math.max(maxHeaderHeight, rect.bottom + 20);
            }
        }
    });
    
    // Position button below detected headers with some padding
    if (maxHeaderHeight > 60) {
        topPosition = `${Math.min(maxHeaderHeight, 150)}px`; // Cap at 150px
    }

    const button = document.createElement('div');
    button.id = 'cgpa-tracker-btn';
    button.innerHTML = `
        <div style="
            position: fixed;
            top: ${topPosition};
            right: 20px;
            z-index: 10000;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 16px;
            border-radius: 25px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s ease;
            user-select: none;
        ">
            🎓 CGPA Tracker
        </div>
    `;

    // Add hover effects
    const btnElement = button.firstElementChild;
    btnElement.addEventListener('mouseenter', () => {
        btnElement.style.transform = 'translateY(-2px)';
        btnElement.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
    });

    btnElement.addEventListener('mouseleave', () => {
        btnElement.style.transform = 'translateY(0)';
        btnElement.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
    });

    // Add click handler
    btnElement.addEventListener('click', () => {
        console.log('CGPA Tracker: Button clicked!');
        openCGPATracker();
    });

    document.body.appendChild(button);
    console.log('CGPA Tracker: Floating button created and added to page');
}

// Open CGPA tracker modal
function openCGPATracker() {
    // Check if Chrome extension API is available
    if (!checkChromeAPI()) {
        alert('CGPA Tracker extension is not properly loaded. Please refresh the page and try again.');
        return;
    }

    // Remove existing modal if any
    const existingModal = document.getElementById('cgpa-tracker-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Extract data from website
    const websiteData = extractCGPAFromWebsite();

    // Get the popup URL safely
    let popupUrl;
    try {
        popupUrl = chrome.runtime.getURL('popup.html');
    } catch (error) {
        console.error('CGPA Tracker: Error getting popup URL:', error);
        alert('Extension error. Please refresh the page and try again.');
        return;
    }

    // Create modal
    const modal = document.createElement('div');
    modal.id = 'cgpa-tracker-modal';
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10001;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 0;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        width: 400px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    `;
    
    // Create close button
    const closeButton = document.createElement('div');
    closeButton.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
        font-size: 24px;
        color: #666;
        z-index: 10002;
    `;
    closeButton.textContent = '×';
    closeButton.onclick = () => {
        document.getElementById('cgpa-tracker-modal').remove();
    };
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'cgpa-tracker-iframe';
    iframe.src = popupUrl;
    iframe.style.cssText = `
        width: 100%;
        height: 600px;
        border: none;
        border-radius: 12px;
    `;
    
    // Assemble modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(iframe);
    overlay.appendChild(modalContent);
    modal.appendChild(overlay);

    document.body.appendChild(modal);

    // Auto-fill data if found on website
    if (websiteData.found) {
        setTimeout(() => {
            const iframeElement = document.getElementById('cgpa-tracker-iframe');
            if (iframeElement && iframeElement.contentWindow) {
                iframeElement.contentWindow.postMessage({
                    type: 'autofill',
                    data: websiteData
                }, '*');
            }
        }, 1000);
    }

    // Close modal when clicking outside
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
        }
    });
}

// Initialize the extension
function initializeExtension() {
    console.log('CGPA Tracker: Starting initialization...');
    
    // Check if we're on your specific college website
    const currentDomain = window.location.hostname.toLowerCase();
    const currentUrl = window.location.href.toLowerCase();
    
    console.log('CGPA Tracker: Current domain:', currentDomain);
    console.log('CGPA Tracker: Current URL:', currentUrl);
    
    // Add your college website domains here
    const allowedDomains = [
        'nitjsr.vercel.app'
    ];
    
    // Check if current domain matches allowed domains
    const isAllowedWebsite = allowedDomains.some(domain => 
        currentDomain.includes(domain) || currentDomain.endsWith(domain)
    );
    
    console.log('CGPA Tracker: Is allowed website:', isAllowedWebsite);
    
    // Only show button on allowed websites
    if (isAllowedWebsite) {
        console.log('CGPA Tracker: Allowed website detected, showing tracker button');
        createFloatingButton();
        
        // Add a notification if CGPA data is detected
        const websiteData = extractCGPAFromWebsite();
        if (websiteData.found) {
            setTimeout(() => {
                showDataFoundNotification(websiteData);
            }, 2000);
        }
    } else {
        console.log('CGPA Tracker: Not on allowed website, extension inactive');
        console.log('CGPA Tracker: Expected domain: nitjsr.vercel.app, Got:', currentDomain);
    }
}

// Show notification when data is found
function showDataFoundNotification(data) {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 140px;
            right: 20px;
            z-index: 10000;
            background: #4caf50;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
            animation: slideIn 0.3s ease;
        ">
            📊 CGPA detected: ${data.cgpa}
            ${data.semester ? `(Semester ${data.semester})` : ''}
            <br>
            <small>Click the tracker to auto-fill!</small>
        </div>
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Listen for messages from popup
window.addEventListener('message', (event) => {
    if (event.data.type === 'requestWebsiteData') {
        const websiteData = extractCGPAFromWebsite();
        event.source.postMessage({
            type: 'websiteDataResponse',
            data: websiteData
        }, '*');
    }
});

// Initialize when page loads
function waitForChromeApi() {
    return new Promise((resolve) => {
        if (checkChromeAPI()) {
            resolve();
        } else {
            // Wait a bit and try again
            setTimeout(() => {
                if (checkChromeAPI()) {
                    resolve();
                } else {
                    console.error('CGPA Tracker: Chrome extension API still not available after waiting');
                    resolve(); // Continue anyway
                }
            }, 100);
        }
    });
}

async function initializeWhenReady() {
    await waitForChromeApi();
    
    // Only initialize if Chrome API is available
    if (checkChromeAPI()) {
        initializeExtension();
    } else {
        console.log('CGPA Tracker: Skipping initialization due to missing Chrome API');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWhenReady);
} else {
    initializeWhenReady();
}

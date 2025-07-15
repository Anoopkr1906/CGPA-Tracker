// CGPA Calculation Logic
class CGPACalculator {
    constructor() {
        this.initializeEventListeners();
        this.loadSavedData();
    }

    initializeEventListeners() {
        document.getElementById('calculateBtn').addEventListener('click', () => {
            this.calculateRequiredCGPA();
        });

        // Auto-save inputs
        ['currentCGPA', 'completedSemesters', 'totalSemesters', 'targetCGPA'].forEach(id => {
            document.getElementById(id).addEventListener('input', () => {
                this.saveData();
            });
        });

        // Real-time calculation as user types
        ['currentCGPA', 'completedSemesters', 'totalSemesters', 'targetCGPA'].forEach(id => {
            document.getElementById(id).addEventListener('input', () => {
                this.debounce(() => this.calculateRequiredCGPA(), 500);
            });
        });
    }

    debounce(func, wait) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(func, wait);
    }

    saveData() {
        const data = {
            currentCGPA: document.getElementById('currentCGPA').value,
            completedSemesters: document.getElementById('completedSemesters').value,
            totalSemesters: document.getElementById('totalSemesters').value,
            targetCGPA: document.getElementById('targetCGPA').value
        };
        chrome.storage.local.set({ cgpaData: data });
    }

    loadSavedData() {
        chrome.storage.local.get(['cgpaData'], (result) => {
            if (result.cgpaData) {
                const data = result.cgpaData;
                document.getElementById('currentCGPA').value = data.currentCGPA || '';
                document.getElementById('completedSemesters').value = data.completedSemesters || '';
                document.getElementById('totalSemesters').value = data.totalSemesters || '';
                document.getElementById('targetCGPA').value = data.targetCGPA || '';
            }
        });
    }

    validateInputs() {
        const currentCGPA = parseFloat(document.getElementById('currentCGPA').value);
        const completedSemesters = parseInt(document.getElementById('completedSemesters').value);
        const totalSemesters = parseInt(document.getElementById('totalSemesters').value);
        const targetCGPA = parseFloat(document.getElementById('targetCGPA').value);

        const errors = [];

        if (isNaN(currentCGPA) || currentCGPA < 0 || currentCGPA > 10) {
            errors.push('Current CGPA must be between 0 and 10');
        }

        if (isNaN(completedSemesters) || completedSemesters < 1) {
            errors.push('Completed semesters must be at least 1');
        }

        if (isNaN(totalSemesters) || totalSemesters < 1) {
            errors.push('Total semesters must be at least 1');
        }

        if (completedSemesters >= totalSemesters) {
            errors.push('Completed semesters must be less than total semesters');
        }

        if (isNaN(targetCGPA) || targetCGPA < 0 || targetCGPA > 10) {
            errors.push('Target CGPA must be between 0 and 10');
        }

        return {
            isValid: errors.length === 0,
            errors,
            data: { currentCGPA, completedSemesters, totalSemesters, targetCGPA }
        };
    }

    calculateRequiredCGPA() {
        const validation = this.validateInputs();
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('resultContent');

        if (!validation.isValid) {
            resultsDiv.classList.remove('hidden');
            resultContent.innerHTML = `
                <div class="result-item result-impossible">
                    <strong>❌ Input Errors:</strong><br>
                    ${validation.errors.map(error => `• ${error}`).join('<br>')}
                </div>
            `;
            return;
        }

        const { currentCGPA, completedSemesters, totalSemesters, targetCGPA } = validation.data;
        const remainingSemesters = totalSemesters - completedSemesters;
        
        // Calculate required CGPA for remaining semesters
        const totalPointsNeeded = targetCGPA * totalSemesters;
        const currentTotalPoints = currentCGPA * completedSemesters;
        const remainingPointsNeeded = totalPointsNeeded - currentTotalPoints;
        const requiredCGPAPerSemester = remainingPointsNeeded / remainingSemesters;

        // Calculate maximum possible CGPA
        const maxPossiblePoints = currentTotalPoints + (remainingSemesters * 10);
        const maxPossibleCGPA = maxPossiblePoints / totalSemesters;

        this.displayResults({
            currentCGPA,
            completedSemesters,
            totalSemesters,
            targetCGPA,
            remainingSemesters,
            requiredCGPAPerSemester,
            maxPossibleCGPA,
            isPossible: requiredCGPAPerSemester <= 10 && requiredCGPAPerSemester >= 0
        });

        this.generateSemesterPlan(validation.data);
    }

    displayResults(data) {
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('resultContent');
        
        resultsDiv.classList.remove('hidden');

        let resultHTML = '';

        if (data.isPossible) {
            if (data.requiredCGPAPerSemester <= 8.5) {
                resultHTML = `
                    <div class="result-item result-possible">
                        <strong>✅ Target Achievable!</strong><br>
                        You need to maintain an average CGPA of <span class="highlight">${data.requiredCGPAPerSemester.toFixed(2)}</span> 
                        for the remaining ${data.remainingSemesters} semester(s).
                    </div>
                `;
            } else {
                resultHTML = `
                    <div class="result-item result-warning">
                        <strong>⚠️ Challenging but Possible!</strong><br>
                        You need to maintain an average CGPA of <span class="highlight">${data.requiredCGPAPerSemester.toFixed(2)}</span> 
                        for the remaining ${data.remainingSemesters} semester(s).<br>
                        <small>This requires excellent performance in all subjects.</small>
                    </div>
                `;
            }
        } else {
            resultHTML = `
                <div class="result-item result-impossible">
                    <strong>❌ Target Not Achievable</strong><br>
                    The required CGPA per semester would be <span class="highlight">${data.requiredCGPAPerSemester.toFixed(2)}</span>, 
                    which exceeds the maximum possible (10.0).<br>
                    <strong>Maximum possible CGPA:</strong> <span class="highlight">${data.maxPossibleCGPA.toFixed(2)}</span>
                </div>
            `;
        }

        // Add additional insights
        resultHTML += `
            <div class="result-item">
                <strong>📊 Summary:</strong><br>
                • Current CGPA: ${data.currentCGPA}<br>
                • Completed: ${data.completedSemesters}/${data.totalSemesters} semesters<br>
                • Target CGPA: ${data.targetCGPA}<br>
                • Maximum possible CGPA: ${data.maxPossibleCGPA.toFixed(2)}
            </div>
        `;

        resultContent.innerHTML = resultHTML;
    }

    generateSemesterPlan(data) {
        const semesterPlan = document.getElementById('semesterPlan');
        const { completedSemesters, totalSemesters, requiredCGPAPerSemester } = data;
        
        let planHTML = '';

        // Show completed semesters
        for (let i = 1; i <= completedSemesters; i++) {
            planHTML += `
                <div class="semester-item current">
                    <span>Semester ${i}</span>
                    <span class="success">✓ Completed</span>
                </div>
            `;
        }

        // Show remaining semesters with required CGPA
        for (let i = completedSemesters + 1; i <= totalSemesters; i++) {
            const targetCGPA = Math.min(requiredCGPAPerSemester, 10);
            const difficulty = targetCGPA > 9 ? 'Very Hard' : 
                             targetCGPA > 8.5 ? 'Hard' : 
                             targetCGPA > 7.5 ? 'Moderate' : 'Achievable';
            
            planHTML += `
                <div class="semester-item future">
                    <span>Semester ${i}</span>
                    <span>Target: ${targetCGPA.toFixed(2)} (${difficulty})</span>
                </div>
            `;
        }

        semesterPlan.innerHTML = planHTML;
    }
}

// Initialize the calculator when the popup loads
document.addEventListener('DOMContentLoaded', () => {
    new CGPACalculator();
    initializeProfileImage();
});

// Handle profile image loading
function initializeProfileImage() {
    const profileImg = document.getElementById('profileImage');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            // If image fails to load, show initials instead
            this.style.display = 'none';
            
            // Create initials fallback
            const initials = document.createElement('div');
            initials.className = 'profile-image fallback';
            initials.textContent = 'AK'; // Your initials
            initials.title = 'Anoop Kumar Burnwal';
            
            // Replace the image with initials
            this.parentNode.insertBefore(initials, this);
        });
    }
}

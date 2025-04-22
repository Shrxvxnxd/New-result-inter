// State Management
let currentResult = null;
const resultSection = document.getElementById('resultSection');
const loadingScreen = document.getElementById('loadingScreen');

// Tab Management
function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
        tab.hidden = true;
    });
    
    const activeTab = document.getElementById(tabId);
    activeTab.classList.add('active');
    activeTab.hidden = false;

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    document.querySelector(`[aria-controls="${tabId}"]`).classList.add('active');
    document.querySelector(`[aria-controls="${tabId}"]`).setAttribute('aria-selected', 'true');
}

// Loading Screen Control
function showLoading() {
    loadingScreen.style.display = 'flex';
}

function hideLoading() {
    loadingScreen.style.display = 'none';
}

// Error Handling
function showError(message, inputId = null) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <span class="error-icon">⚠</span>
        ${message}
    `;
    
    if (inputId) {
        const inputGroup = document.getElementById(inputId).parentElement;
        inputGroup.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    } else {
        document.body.prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    }
}

// Confirmation Dialog
function showConfirmation(message) {
    return confirm(message);
}

// Navigation Prevention
window.addEventListener('beforeunload', (e) => {
    if (currentResult) {
        e.preventDefault();
        return e.returnValue = 'Are you sure you want to leave? Your current result will be lost.';
    }
});

// Result Checking Logic
async function checkResults(yearType) {
    const inputId = `hallTicket${yearType === '1st' ? '1' : '2'}`;
    const hallTicketInput = document.getElementById(inputId);
    const hallTicket = hallTicketInput.value.trim();

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(e => e.remove());

    if (currentResult) {
        if (!showConfirmation('You already have a result displayed. Check another result?')) return;
        clearResults();
    }

    if (!hallTicket.match(/^\d{10}$/)) {
        showError('Please enter a valid 10-digit hall ticket number', inputId);
        hallTicketInput.focus();
        return;
    }

    showLoading();

    try {
        const response = await fetch('students.json');
        if (!response.ok) throw new Error('Failed to fetch results');
        
        const students = await response.json();
        const student = students.find(s => s.hallTicket === hallTicket);
        
        if (!student) throw new Error('No results found for this hall ticket number');

        // Year validation
        const expectedYear = yearType === '1st' ? 1 : 2;
        if (student.year !== expectedYear) {
            throw new Error(`This hall ticket belongs to ${student.year === 1 ? '1st' : '2nd'} Year. ` +
                `Please check the ${student.year === 1 ? 'first' : 'second'} year tab.`);
        }

        displayResults(student);
        currentResult = student;
        resultSection.style.display = 'block';

    } catch (error) {
        showError(error.message);
        hallTicketInput.value = '';
    } finally {
        hideLoading();
    }
}


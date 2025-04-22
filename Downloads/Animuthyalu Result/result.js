// Result Display Function
function displayResults(student) {
    const resultDiv = document.getElementById('resultData');
    
    resultDiv.innerHTML = `
        <div class="student-info">
            <h2>${student.name}</h2>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Hall Ticket:</span>
                    <span class="info-value">${student.hallTicket}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Year:</span>
                    <span class="info-value">Year ${student.year}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Status:</span>
                    <span class="status-${student.status.toLowerCase()}">${student.status}</span>
                </div>
            </div>
        </div>

        <div class="result-table-container">
            <table class="result-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Marks</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${student.subjects.map(subject => `
                        <tr>
                            <td>${subject.name}</td>
                            <td>${subject.grade}</td>
                            <td class="${subject.marks < 35 ? 'fail-mark' : ''}">${subject.marks}</td>
                            <td>${subject.marks >= 35 ? 'Pass' : 'Fail'}</td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr class="summary-row">
                        <td colspan="2">Total Marks</td>
                        <td colspan="2">${student.total.marks}</td>
                    </tr>
                    <tr class="summary-row">
                        <td colspan="2">Percentage</td>
                        <td colspan="2">${student.total.percentage}%</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="result-actions">
            <button class="print-btn" onclick="window.print()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
                </svg>
                Print Result `;
}

// Clear Results
function clearResults() {
    resultSection.style.display = 'none';
    document.getElementById('hallTicket1').value = '';
    document.getElementById('hallTicket2').value = '';
    currentResult = null;
}
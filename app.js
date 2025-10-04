// Sensor data from the provided JSON
const sensorData = {
    "currentReading": {
        "microplasticCount": 847,
        "concentration": 12.4,
        "detectionStatus": "active",
        "confidenceLevel": 94.2,
        "timestamp": "2025-09-07T01:15:23Z"
    },
    "waterQuality": {
        "temperature": 23.5,
        "ph": 7.8,
        "conductivity": 425,
        "turbidity": 2.1
    },
    "systemStatus": {
        "battery": 87,
        "calibrationStatus": "valid",
        "lastCalibration": "2025-09-05T10:30:00Z",
        "gpsLocation": {
            "latitude": 19.0760,
            "longitude": 72.8777,
            "accuracy": 3.2
        },
        "connectionQuality": "excellent",
        "sensorHealth": "optimal"
    },
    "historicalData": {
        "hourlyReadings": [
            {"time": "00:00", "count": 892, "concentration": 13.1},
            {"time": "01:00", "count": 847, "concentration": 12.4},
            {"time": "02:00", "count": 923, "concentration": 14.2},
            {"time": "03:00", "count": 756, "concentration": 11.8},
            {"time": "04:00", "count": 834, "concentration": 12.9},
            {"time": "05:00", "count": 901, "concentration": 13.7}
        ],
        "particleSizeDistribution": [
            {"size": "10-50μm", "percentage": 35.2},
            {"size": "50-100μm", "percentage": 28.7},
            {"size": "100-200μm", "percentage": 19.3},
            {"size": "200-500μm", "percentage": 12.4},
            {"size": ">500μm", "percentage": 4.4}
        ],
        "polymerTypes": [
            {"type": "Polyethylene (PE)", "percentage": 42.3, "color": "#1FB8CD"},
            {"type": "Polypropylene (PP)", "percentage": 28.1, "color": "#FFC185"},
            {"type": "Polystyrene (PS)", "percentage": 16.7, "color": "#B4413C"},
            {"type": "PET", "percentage": 8.9, "color": "#ECEBD5"},
            {"type": "Other", "percentage": 4.0, "color": "#5D878F"}
        ]
    }
};

// Chart instances
let trendChart, sizeChart, polymerChart;

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    updateCurrentTime();
    startRealTimeUpdates();
    setupEventListeners();
    animateCounters();
});

// Animate counter values
function animateCounters() {
    const counters = [
        { element: document.getElementById('microplasticCount'), target: sensorData.currentReading.microplasticCount },
        { element: document.getElementById('concentration'), target: sensorData.currentReading.concentration },
        { element: document.getElementById('confidence'), target: sensorData.currentReading.confidenceLevel },
        { element: document.getElementById('temperature'), target: sensorData.waterQuality.temperature },
        { element: document.getElementById('ph'), target: sensorData.waterQuality.ph },
        { element: document.getElementById('conductivity'), target: sensorData.waterQuality.conductivity }
    ];

    counters.forEach(counter => {
        if (counter.element) {
            animateValue(counter.element, 0, counter.target, 1500);
        }
    });
}

function animateValue(element, start, end, duration) {
    const isInteger = Number.isInteger(end);
    const startTime = performance.now();

    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOut;
        
        element.textContent = isInteger ? Math.round(current) : current.toFixed(1);
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        } else {
            element.textContent = isInteger ? end : end.toFixed(1);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Initialize all charts
function initializeCharts() {
    initializeTrendChart();
    initializeSizeDistributionChart();
    initializePolymerChart();
}

// Trend Chart (Line Chart)
function initializeTrendChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');
    
    trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sensorData.historicalData.hourlyReadings.map(reading => reading.time),
            datasets: [{
                label: 'Concentration (mg/L)',
                data: sensorData.historicalData.hourlyReadings.map(reading => reading.concentration),
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#1FB8CD',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#626C71'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#626C71'
                    },
                    beginAtZero: true
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    loop: false
                }
            }
        }
    });
}

// Size Distribution Chart (Bar Chart)
function initializeSizeDistributionChart() {
    const ctx = document.getElementById('sizeDistributionChart').getContext('2d');
    
    sizeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sensorData.historicalData.particleSizeDistribution.map(item => item.size),
            datasets: [{
                label: 'Percentage',
                data: sensorData.historicalData.particleSizeDistribution.map(item => item.percentage),
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
                borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
                borderWidth: 1,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#626C71',
                        maxRotation: 45
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#626C71',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    beginAtZero: true
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Polymer Chart (Doughnut Chart)
function initializePolymerChart() {
    const ctx = document.getElementById('polymerChart').getContext('2d');
    
    polymerChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: sensorData.historicalData.polymerTypes.map(item => item.type),
            datasets: [{
                data: sensorData.historicalData.polymerTypes.map(item => item.percentage),
                backgroundColor: sensorData.historicalData.polymerTypes.map(item => item.color),
                borderWidth: 0,
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#626C71',
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Update current time
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    document.getElementById('currentTime').textContent = `${dateString}, ${timeString}`;
}

// Start real-time updates
function startRealTimeUpdates() {
    // Update time every second
    setInterval(updateCurrentTime, 1000);
    
    // Simulate real-time data updates every 5 seconds
    setInterval(simulateDataUpdate, 5000);
}

// Simulate real-time data updates
function simulateDataUpdate() {
    // Generate slight variations in the data
    const variation = 0.9 + Math.random() * 0.2; // ±10% variation
    
    // Update microplastic count
    const newCount = Math.round(sensorData.currentReading.microplasticCount * variation);
    const newConcentration = Number((sensorData.currentReading.concentration * variation).toFixed(1));
    
    // Update DOM elements with smooth transitions
    const countElement = document.getElementById('microplasticCount');
    const concentrationElement = document.getElementById('concentration');
    
    if (countElement && concentrationElement) {
        animateValue(countElement, parseInt(countElement.textContent), newCount, 1000);
        animateValue(concentrationElement, parseFloat(concentrationElement.textContent), newConcentration, 1000);
    }
    
    // Update trend chart with new data point
    if (trendChart) {
        const currentTime = new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
        
        trendChart.data.labels.push(currentTime);
        trendChart.data.datasets[0].data.push(newConcentration);
        
        // Keep only last 10 data points
        if (trendChart.data.labels.length > 10) {
            trendChart.data.labels.shift();
            trendChart.data.datasets[0].data.shift();
        }
        
        trendChart.update('none');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Chart period selection
    const periodButtons = document.querySelectorAll('.chart-period');
    periodButtons.forEach(button => {
        button.addEventListener('click', function() {
            periodButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Here you could fetch different time period data
            console.log(`Switched to ${this.dataset.period} view`);
        });
    });
    
    // Export buttons
    const exportButtons = document.querySelectorAll('.export-buttons .btn');
    exportButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            // Add loading state
            const originalText = this.textContent;
            this.textContent = 'Processing...';
            this.disabled = true;
            
            // Simulate export process
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                
                if (buttonText.includes('CSV')) {
                    exportToCSV();
                } else if (buttonText.includes('JSON')) {
                    exportToJSON();
                } else if (buttonText.includes('Report')) {
                    generateReport();
                }
            }, 2000);
        });
    });
    
    // Battery level animation
    updateBatteryLevel();
}

// Update battery level display
function updateBatteryLevel() {
    const batteryLevel = sensorData.systemStatus.battery;
    const batteryElement = document.querySelector('.battery-level');
    const batteryText = document.getElementById('batteryLevel');
    
    if (batteryElement && batteryText) {
        batteryElement.style.width = `${batteryLevel}%`;
        batteryText.textContent = `${batteryLevel}%`;
        
        // Change color based on battery level
        if (batteryLevel < 20) {
            batteryElement.style.background = '#C0152F';
        } else if (batteryLevel < 50) {
            batteryElement.style.background = 'linear-gradient(90deg, #A84B2F, #E68161)';
        } else {
            batteryElement.style.background = 'linear-gradient(90deg, #21808D, #32B8CD)';
        }
    }
}

// Export functions
function exportToCSV() {
    const csvContent = generateCSVContent();
    downloadFile(csvContent, 'microplastics_data.csv', 'text/csv');
    showSuccessMessage('Data exported to CSV successfully!');
}

function exportToJSON() {
    const jsonContent = JSON.stringify(sensorData, null, 2);
    downloadFile(jsonContent, 'microplastics_data.json', 'application/json');
    showSuccessMessage('Data exported to JSON successfully!');
}

function generateReport() {
    const reportContent = generateReportContent();
    downloadFile(reportContent, 'microplastics_report.txt', 'text/plain');
    showSuccessMessage('Report generated successfully!');
}

function generateCSVContent() {
    let csv = 'Time,Microplastic Count,Concentration (mg/L)\n';
    sensorData.historicalData.hourlyReadings.forEach(reading => {
        csv += `${reading.time},${reading.count},${reading.concentration}\n`;
    });
    return csv;
}

function generateReportContent() {
    const now = new Date().toLocaleString();
    return `
Microplastics Detection Report
Generated: ${now}

Current Status:
- Microplastic Count: ${sensorData.currentReading.microplasticCount} particles
- Concentration: ${sensorData.currentReading.concentration} mg/L
- Detection Confidence: ${sensorData.currentReading.confidenceLevel}%
- System Status: ${sensorData.currentReading.detectionStatus}

Water Quality:
- Temperature: ${sensorData.waterQuality.temperature}°C
- pH Level: ${sensorData.waterQuality.ph}
- Conductivity: ${sensorData.waterQuality.conductivity} μS/cm

System Health:
- Battery: ${sensorData.systemStatus.battery}%
- Calibration: ${sensorData.systemStatus.calibrationStatus}
- Sensor Health: ${sensorData.systemStatus.sensorHealth}
- GPS Location: ${sensorData.systemStatus.gpsLocation.latitude}°N, ${sensorData.systemStatus.gpsLocation.longitude}°E

Polymer Type Distribution:
${sensorData.historicalData.polymerTypes.map(type => `- ${type.type}: ${type.percentage}%`).join('\n')}

Particle Size Distribution:
${sensorData.historicalData.particleSizeDistribution.map(size => `- ${size.size}: ${size.percentage}%`).join('\n')}
    `.trim();
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
}

function showSuccessMessage(message) {
    // Create and show a temporary success message
    const alertBanner = document.getElementById('alertsBanner');
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert--success';
    successAlert.innerHTML = `
        <div class="alert__icon">✅</div>
        <div class="alert__content">
            <strong>Success:</strong> ${message}
        </div>
        <button class="alert__close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add success styling
    successAlert.style.background = 'rgba(33, 128, 141, 0.1)';
    successAlert.style.borderColor = 'rgba(33, 128, 141, 0.2)';
    successAlert.style.color = '#21808D';
    
    alertBanner.appendChild(successAlert);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (successAlert.parentNode) {
            successAlert.remove();
        }
    }, 5000);
}

// Initialize GPS coordinates display
document.addEventListener('DOMContentLoaded', function() {
    const gpsElement = document.getElementById('gpsCoords');
    if (gpsElement) {
        const { latitude, longitude } = sensorData.systemStatus.gpsLocation;
        gpsElement.textContent = `${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E`;
    }
});
// Sample EIS data for different states
const eisData = {
    baseline: {
        frequencies: [0.1, 0.5, 1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000],
        zReal: [3.2, 3.0, 2.8, 2.5, 2.3, 2.1, 2.0, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4],
        zImag: [-0.1, -0.3, -0.5, -0.8, -1.0, -1.2, -1.0, -0.8, -0.6, -0.4, -0.2, -0.1, -0.05],
        rct: 2.4,
        rs: 1.4,
        cdl: 18,
        warburg: 0.32
    },
    low: {
        frequencies: [0.1, 0.5, 1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000],
        zReal: [2.8, 2.6, 2.4, 2.2, 2.0, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2],
        zImag: [-0.2, -0.4, -0.6, -0.9, -1.1, -1.3, -1.1, -0.9, -0.7, -0.5, -0.3, -0.1, -0.05],
        rct: 2.0,
        rs: 1.2,
        cdl: 22,
        warburg: 0.41
    },
    high: {
        frequencies: [0.1, 0.5, 1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000],
        zReal: [2.4, 2.2, 2.0, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.9],
        zImag: [-0.3, -0.5, -0.7, -1.0, -1.2, -1.4, -1.2, -1.0, -0.8, -0.6, -0.4, -0.2, -0.1],
        rct: 1.8,
        rs: 0.9,
        cdl: 24,
        warburg: 0.47
    }
};

let nyquistChart, bodeChart;
let currentSampleState = 'baseline';

// Initialize Analysis Section
function initializeAnalysis() {
    setupAnalysisEventListeners();
    initializeNyquistChart();
    initializeBodeChart();
    updateAnalysisDisplay();
}

function setupAnalysisEventListeners() {
    // Plot type switching
    const plotButtons = document.querySelectorAll('.plot-type');
    plotButtons.forEach(button => {
        button.addEventListener('click', function() {
            plotButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const plotType = this.dataset.plot;
            document.getElementById('nyquistChart').style.display = plotType === 'nyquist' ? 'block' : 'none';
            document.getElementById('bodeChart').style.display = plotType === 'bode' ? 'block' : 'none';
        });
    });

    // Sample state switching
    const sampleButtons = document.querySelectorAll('.sample-state');
    sampleButtons.forEach(button => {
        button.addEventListener('click', function() {
            sampleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            currentSampleState = this.dataset.state;
            updateAnalysisDisplay();
        });
    });
}

function initializeNyquistChart() {
    const ctx = document.getElementById('nyquistChart').getContext('2d');
    nyquistChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Baseline',
                data: [],
                borderColor: '#A7A9A9',
                backgroundColor: '#A7A9A9',
                pointRadius: 4,
                showLine: true,
                tension: 0.1
            }, {
                label: 'Current',
                data: [],
                borderColor: '#1FB8CD',
                backgroundColor: '#1FB8CD',
                pointRadius: 6,
                showLine: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Nyquist Plot: -Im(Z) vs Re(Z)',
                    font: { size: 16 }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: { display: true, text: 'Re(Z) [Ω]' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                y: {
                    type: 'linear',
                    title: { display: true, text: '-Im(Z) [Ω]' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                }
            },
            aspectRatio: 1
        }
    });
}

function initializeBodeChart() {
    const ctx = document.getElementById('bodeChart').getContext('2d');
    bodeChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: '|Z| [Ω]',
                data: [],
                borderColor: '#1FB8CD',
                yAxisID: 'y'
            }, {
                label: 'Phase [°]',
                data: [],
                borderColor: '#FFC185',
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Bode Plot: |Z| and Phase vs Frequency'
                }
            },
            scales: {
                x: {
                    type: 'logarithmic',
                    title: { display: true, text: 'Frequency [Hz]' }
                },
                y: {
                    type: 'logarithmic',
                    display: true,
                    position: 'left',
                    title: { display: true, text: '|Z| [Ω]' }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: { display: true, text: 'Phase [°]' },
                    grid: { drawOnChartArea: false }
                }
            }
        }
    });
}
function showSection(section) {
    // Hide all sections
    document.getElementById('dashboardMain').style.display = section === 'dashboard' ? 'block' : 'none';
    document.getElementById('analysisSection').style.display = section === 'analysis' ? 'block' : 'block';
}


function updateAnalysisDisplay() {
    const data = eisData[currentSampleState];
    const baselineData = eisData.baseline;
    
    // Update Nyquist chart
    if (nyquistChart) {
        // Baseline data
        const baselinePoints = baselineData.zReal.map((real, i) => ({
            x: real,
            y: Math.abs(baselineData.zImag[i])
        }));
        
        // Current data
        const currentPoints = data.zReal.map((real, i) => ({
            x: real,
            y: Math.abs(data.zImag[i])
        }));
        
        nyquistChart.data.datasets[0].data = baselinePoints;
        nyquistChart.data.datasets[1].data = currentPoints;
        nyquistChart.update();
    }
    
    // Update annotations
    document.getElementById('rsValue').textContent = `${data.rs} kΩ`;
    document.getElementById('rctValue').textContent = `${data.rct} kΩ`;
    document.getElementById('warburgValue').textContent = data.warburg.toString();
    
    // Update prediction based on state
    const predictions = {
        baseline: { status: 'None Detected', confidence: 12, color: 'var(--color-text-secondary)' },
        low: { status: 'Present (Low)', confidence: 78, color: 'var(--color-warning)' },
        high: { status: 'Present (High)', confidence: 92, color: 'var(--color-success)' }
    };
    
    const pred = predictions[currentSampleState];
    document.getElementById('predictionValue').textContent = pred.status;
    document.getElementById('predictionValue').style.color = pred.color;
    document.getElementById('confidenceFill').style.width = `${pred.confidence}%`;
    document.querySelector('.confidence-text').textContent = `${pred.confidence}% Confidence`;
    
    // Update feature values
    document.querySelector('.feature-grid .feature-item:nth-child(1) .feature-value').textContent = `${data.rct} kΩ ${data.rct < 2.0 ? '(↓)' : ''}`;
    document.querySelector('.feature-grid .feature-item:nth-child(2) .feature-value').textContent = `${data.cdl} μF`;
}

// Add analysis section to main initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    updateCurrentTime();
    startRealTimeUpdates();
    setupEventListeners();
    animateCounters();
    initializeAnalysis(); // Add this line
});

// Add smooth scroll behavior for mobile
document.documentElement.style.scrollBehavior = 'smooth';
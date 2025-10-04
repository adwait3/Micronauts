// Application Data
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
    "sensorHealth": "optimal",
    "onlineStatus": "online"
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
  },
  "eisData": {
    "baseline": {
      "frequencies": [0.01, 0.1, 1, 10, 100, 1000, 10000, 100000],
      "zReal": [145, 142, 138, 135, 132, 130, 128, 127],
      "zImag": [-2, -8, -25, -45, -35, -20, -8, -2],
      "features": {
        "rct": 18.5,
        "rs": 127.2,
        "cdl": 8.6e-6,
        "warburgIndex": 0.52,
        "zMag1kHz": 130.4,
        "phase100Hz": -15.2
      }
    },
    "low": {
      "frequencies": [0.01, 0.1, 1, 10, 100, 1000, 10000, 100000],
      "zReal": [138, 135, 130, 125, 120, 118, 116, 115],
      "zImag": [-3, -12, -35, -55, -42, -25, -10, -3],
      "features": {
        "rct": 23.2,
        "rs": 115.1,
        "cdl": 6.9e-6,
        "warburgIndex": 0.48,
        "zMag1kHz": 120.6,
        "phase100Hz": -19.3
      }
    },
    "high": {
      "frequencies": [0.01, 0.1, 1, 10, 100, 1000, 10000, 100000],
      "zReal": [128, 125, 118, 110, 105, 103, 101, 100],
      "zImag": [-4, -18, -48, -68, -52, -30, -12, -4],
      "features": {
        "rct": 28.7,
        "rs": 100.3,
        "cdl": 5.5e-6,
        "warburgIndex": 0.45,
        "zMag1kHz": 107.2,
        "phase100Hz": -23.8
      }
    }
  },
  "mlPredictions": {
    "baseline": {
      "status": "None",
      "confidence": 96.8,
      "sizeBand": "N/A",
      "polymer": "N/A",
      "statusChip": "success"
    },
    "low": {
      "status": "Present (Low)",
      "confidence": 87.3,
      "sizeBand": "50-200 μm",
      "polymer": "PE/PP",
      "statusChip": "warning"
    },
    "high": {
      "status": "Present (High)",
      "confidence": 94.2,
      "sizeBand": "50-500 μm",
      "polymer": "PE/PP/PS",
      "statusChip": "error"
    }
  },
  "opticalData": {
    "baseline": {
      "led450nm": 15.2,
      "led525nm": 18.7,
      "led625nm": 16.4,
      "ratio": 0.93,
      "fusionStatus": "ON"
    },
    "low": {
      "led450nm": 18.6,
      "led525nm": 22.1,
      "led625nm": 19.8,
      "ratio": 0.94,
      "fusionStatus": "ON"
    },
    "high": {
      "led450nm": 22.8,
      "led525nm": 28.3,
      "led625nm": 24.1,
      "ratio": 0.95,
      "fusionStatus": "ON"
    }
  },
  "links": {
    "cad": "https://a360.co/3W7gEjE",
    "ui": "https://adwait3.github.io/Micronauts"
  }
};

// Global state
let currentTab = 'dashboard';
let currentSampleState = 'baseline';
let currentPlotType = 'nyquist';
let charts = {};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
  updateTime();
  setInterval(updateTime, 1000);
  
  // Start real-time data simulation
  setInterval(simulateRealTimeData, 5000);
});

function initializeApp() {
  // Initialize dashboard charts
  createTrendChart();
  createSizeChart();
  createPolymerChart();
  
  // Initialize analysis chart
  createEISChart();
  
  // Update initial values
  updateHeroCardValues();
  updatePredictionCard();
  updateOpticalData();
  updateEISFeatures();
}

function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tab = e.target.dataset.tab;
      switchTab(tab);
    });
  });
  
  // Sample state toggles
  document.querySelectorAll('.sample-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const state = e.target.dataset.state;
      switchSampleState(state);
    });
  });
  
  // Plot type toggles
  document.querySelectorAll('.plot-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const plotType = e.target.dataset.plot;
      switchPlotType(plotType);
    });
  });
  
  // Copy link buttons
  document.getElementById('copyCadBtn').addEventListener('click', () => {
    copyToClipboard(sensorData.links.cad);
    showToast('CAD link copied to clipboard!');
  });
  
  document.getElementById('copyUiBtn').addEventListener('click', () => {
    copyToClipboard(sensorData.links.ui);
    showToast('Live UI link copied to clipboard!');
  });
  
  // Alert banner close
  document.getElementById('alertClose').addEventListener('click', () => {
    document.getElementById('alertBanner').classList.add('hidden');
  });
  
  // Export buttons
  document.getElementById('exportCsv').addEventListener('click', exportCSV);
  document.getElementById('exportPng').addEventListener('click', exportPNG);
  
  // Time period tabs
  document.querySelectorAll('.time-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const period = e.target.dataset.period;
      switchTimePeriod(period);
    });
  });
}

function switchTab(tabName) {
  // Update nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('nav-btn--active');
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('nav-btn--active');
  
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('tab-content--active');
  });
  document.getElementById(tabName).classList.add('tab-content--active');
  
  currentTab = tabName;
}

function switchSampleState(state) {
  // Update sample toggle buttons
  document.querySelectorAll('.sample-toggle').forEach(btn => {
    btn.classList.remove('sample-toggle--active');
  });
  document.querySelector(`[data-state="${state}"]`).classList.add('sample-toggle--active');
  
  currentSampleState = state;
  
  // Update all dependent components
  updateEISChart();
  updatePredictionCard();
  updateOpticalData();
  updateEISFeatures();
}

function switchPlotType(plotType) {
  // Update plot toggle buttons
  document.querySelectorAll('.plot-toggle').forEach(btn => {
    btn.classList.remove('plot-toggle--active');
  });
  document.querySelector(`[data-plot="${plotType}"]`).classList.add('plot-toggle--active');
  
  currentPlotType = plotType;
  updateEISChart();
}

function switchTimePeriod(period) {
  // Update time tab buttons
  document.querySelectorAll('.time-tab').forEach(btn => {
    btn.classList.remove('time-tab--active');
  });
  document.querySelector(`[data-period="${period}"]`).classList.add('time-tab--active');
  
  // Update trend chart data based on period
  updateTrendChart(period);
}

function createTrendChart() {
  const ctx = document.getElementById('trendChart').getContext('2d');
  charts.trend = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sensorData.historicalData.hourlyReadings.map(r => r.time),
      datasets: [{
        label: 'Concentration (mg/L)',
        data: sensorData.historicalData.hourlyReadings.map(r => r.concentration),
        borderColor: '#1FB8CD',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
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
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Concentration (mg/L)'
          }
        }
      },
      interaction: {
        intersect: false
      }
    }
  });
}

function createSizeChart() {
  const ctx = document.getElementById('sizeChart').getContext('2d');
  charts.size = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sensorData.historicalData.particleSizeDistribution.map(p => p.size),
      datasets: [{
        data: sensorData.historicalData.particleSizeDistribution.map(p => p.percentage),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
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
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Percentage (%)'
          }
        }
      }
    }
  });
}

function createPolymerChart() {
  const ctx = document.getElementById('polymerChart').getContext('2d');
  charts.polymer = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: sensorData.historicalData.polymerTypes.map(p => p.type),
      datasets: [{
        data: sensorData.historicalData.polymerTypes.map(p => p.percentage),
        backgroundColor: sensorData.historicalData.polymerTypes.map(p => p.color),
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 15
          }
        }
      }
    }
  });
}

function createEISChart() {
  const ctx = document.getElementById('eisChart').getContext('2d');
  
  const data = sensorData.eisData[currentSampleState];
  const chartData = currentPlotType === 'nyquist' ? 
    getNyquistData(data) : getBodeData(data);
  
  charts.eis = new Chart(ctx, {
    type: currentPlotType === 'nyquist' ? 'scatter' : 'line',
    data: chartData,
    options: currentPlotType === 'nyquist' ? getNyquistOptions() : getBodeOptions()
  });
}

function getNyquistData(data) {
  return {
    datasets: [{
      label: 'EIS Data',
      data: data.zReal.map((real, i) => ({
        x: real,
        y: -data.zImag[i],
        frequency: data.frequencies[i]
      })),
      backgroundColor: '#1FB8CD',
      borderColor: '#1FB8CD',
      showLine: true,
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  };
}

function getBodeData(data) {
  const zMag = data.zReal.map((real, i) => 
    Math.sqrt(real * real + data.zImag[i] * data.zImag[i])
  );
  const phase = data.zReal.map((real, i) => 
    Math.atan2(-data.zImag[i], real) * 180 / Math.PI
  );
  
  return {
    labels: data.frequencies,
    datasets: [{
      label: '|Z| (Ω)',
      data: zMag,
      borderColor: '#1FB8CD',
      backgroundColor: 'rgba(31, 184, 205, 0.1)',
      yAxisID: 'y',
      tension: 0.1
    }, {
      label: 'Phase (°)',
      data: phase,
      borderColor: '#FFC185',
      backgroundColor: 'rgba(255, 193, 133, 0.1)',
      yAxisID: 'y1',
      tension: 0.1
    }]
  };
}

function getNyquistOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const point = context.raw;
            return [
              `Frequency: ${point.frequency} Hz`,
              `Re(Z): ${point.x.toFixed(1)} Ω`,
              `-Im(Z): ${point.y.toFixed(1)} Ω`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Re(Z) [Ω]'
        }
      },
      y: {
        title: {
          display: true,
          text: '-Im(Z) [Ω]'
        }
      }
    }
  };
}

function getBodeOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      x: {
        type: 'logarithmic',
        title: {
          display: true,
          text: 'Frequency (Hz)'
        }
      },
      y: {
        type: 'logarithmic',
        position: 'left',
        title: {
          display: true,
          text: '|Z| (Ω)'
        }
      },
      y1: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Phase (°)'
        },
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };
}

function updateEISChart() {
  if (charts.eis) {
    charts.eis.destroy();
  }
  createEISChart();
}

function updateTrendChart(period) {
  // In a real app, this would fetch different data based on period
  // For demo purposes, we'll just update the existing chart
  if (charts.trend) {
    charts.trend.update();
  }
}

function updateHeroCardValues() {
  const count = sensorData.currentReading.microplasticCount;
  const concentration = sensorData.currentReading.concentration;
  const confidence = sensorData.currentReading.confidenceLevel;
  
  animateValue('microplasticCount', 0, count, 2000);
  animateValue('concentration', 0, concentration, 2000, 1);
  animateValue('confidence', 0, confidence, 2000, 1);
}

function updatePredictionCard() {
  const prediction = sensorData.mlPredictions[currentSampleState];
  
  document.getElementById('predictionStatus').textContent = prediction.status;
  document.getElementById('predictionStatus').className = `status status--${prediction.statusChip}`;
  document.getElementById('sizeBand').textContent = prediction.sizeBand;
  document.getElementById('polymerType').textContent = prediction.polymer;
  
  // Animate confidence bar
  const confidenceFill = document.getElementById('confidenceFill');
  const confidenceText = document.getElementById('confidenceText');
  
  confidenceFill.style.width = '0%';
  confidenceText.textContent = '0%';
  
  setTimeout(() => {
    confidenceFill.style.width = `${prediction.confidence}%`;
    animateValue('confidenceText', 0, prediction.confidence, 1000, 1, '%');
  }, 100);
}

function updateOpticalData() {
  const optical = sensorData.opticalData[currentSampleState];
  
  document.getElementById('led450').textContent = optical.led450nm.toFixed(1);
  document.getElementById('led525').textContent = optical.led525nm.toFixed(1);
  document.getElementById('led625').textContent = optical.led625nm.toFixed(1);
  document.getElementById('opticalRatio').textContent = optical.ratio.toFixed(2);
  
  // Update LED bar widths with animation
  setTimeout(() => {
    document.querySelector('.led-bar:nth-child(1) .led-indicator').style.width = 
      `${(optical.led450nm / 30) * 100}%`;
    document.querySelector('.led-bar:nth-child(2) .led-indicator').style.width = 
      `${(optical.led525nm / 30) * 100}%`;
    document.querySelector('.led-bar:nth-child(3) .led-indicator').style.width = 
      `${(optical.led625nm / 30) * 100}%`;
  }, 100);
}

function updateEISFeatures() {
  const features = sensorData.eisData[currentSampleState].features;
  
  document.getElementById('rctValue').textContent = `${features.rct.toFixed(1)} Ω`;
  document.getElementById('cdlValue').textContent = `${(features.cdl * 1e6).toFixed(1)} μF`;
  document.getElementById('zMagValue').textContent = `${features.zMag1kHz.toFixed(1)} Ω`;
  document.getElementById('phaseValue').textContent = `${features.phase100Hz.toFixed(1)}°`;
  document.getElementById('warburgValue').textContent = features.warburgIndex.toFixed(2);
  document.getElementById('rsValue').textContent = `${features.rs.toFixed(1)} Ω`;
}

function animateValue(elementId, start, end, duration, decimals = 0, suffix = '') {
  const element = document.getElementById(elementId);
  const range = end - start;
  const startTime = performance.now();
  
  function updateValue(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentValue = start + (range * easeOut);
    
    element.textContent = currentValue.toFixed(decimals) + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(updateValue);
    }
  }
  
  requestAnimationFrame(updateValue);
}

function simulateRealTimeData() {
  // Simulate small variations in readings
  const variation = (Math.random() - 0.5) * 0.2;
  sensorData.currentReading.concentration = 
    Math.max(10, sensorData.currentReading.concentration + variation);
  
  sensorData.currentReading.microplasticCount = 
    Math.round(sensorData.currentReading.concentration * 68 + Math.random() * 20);
  
  // Update dashboard if currently visible
  if (currentTab === 'dashboard') {
    document.getElementById('concentration').textContent = 
      sensorData.currentReading.concentration.toFixed(1);
    document.getElementById('microplasticCount').textContent = 
      sensorData.currentReading.microplasticCount;
  }
}

function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { 
    hour12: true,
    hour: 'numeric',
    minute: '2-digit'
  });
  document.getElementById('statusTime').textContent = timeString;
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  
  toastText.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function exportCSV() {
  const data = sensorData.historicalData.hourlyReadings;
  const csvContent = [
    ['Time', 'Particle Count', 'Concentration (mg/L)'],
    ...data.map(row => [row.time, row.count, row.concentration])
  ].map(row => row.join(',')).join('\n');
  
  downloadFile(csvContent, 'microplastics-data.csv', 'text/csv');
  showToast('CSV data exported successfully!');
}

function exportPNG() {
  const canvas = document.getElementById('trendChart');
  const link = document.createElement('a');
  link.download = 'trend-chart.png';
  link.href = canvas.toDataURL();
  link.click();
  showToast('Chart exported as PNG!');
}

function downloadFile(content, fileName, contentType) {
  const blob = new Blob([content], { type: contentType });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
}

// Handle reduced motion preference
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Disable animations for users who prefer reduced motion
  document.documentElement.style.setProperty('--duration-fast', '0ms');
  document.documentElement.style.setProperty('--duration-normal', '0ms');
}
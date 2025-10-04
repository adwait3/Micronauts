<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Micronauts - Microplastics Detection System</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header__content">
                <div class="header__brand">
                    <h1 class="brand__title">Micronauts</h1>
                    <span class="brand__subtitle">Microplastics Detection System</span>
                </div>
                
                <div class="header__status">
                    <div class="status-pill" id="statusPill">
                        <span class="pulse-dot"></span>
                        <span class="status-text">Online</span>
                        <span class="status-time" id="statusTime">12:15 PM</span>
                        <span class="status-location">Mumbai, IN</span>
                    </div>
                </div>
                
                <nav class="header__nav">
                    <button class="nav-btn nav-btn--active" data-tab="dashboard">Dashboard</button>
                    <button class="nav-btn" data-tab="analysis">Analysis</button>
                    <button class="nav-btn" data-tab="explain">Explain</button>
                </nav>
                
                <div class="header__actions">
                    <button class="btn btn--outline btn--sm" id="copyCadBtn">Copy CAD Link</button>
                    <button class="btn btn--outline btn--sm" id="copyUiBtn">Copy Live UI</button>
                </div>
            </div>
        </div>
    </header>

    <!-- Alert Banner -->
    <div class="alert-banner alert-banner--warning" id="alertBanner">
        <div class="container">
            <div class="alert-banner__content">
                <div class="alert-banner__icon">⚠️</div>
                <div class="alert-banner__text">
                    <strong>Microplastics Threshold Exceeded</strong>
                    <span class="sr-only">Warning:</span>
                    Current concentration: 12.4 mg/L (Threshold: 10.0 mg/L)
                </div>
                <button class="alert-banner__close" id="alertClose" aria-label="Dismiss alert">&times;</button>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <main class="main">
        <div class="container">
            <!-- Dashboard Tab -->
            <section class="tab-content tab-content--active" id="dashboard">
                <!-- Hero Detection Card -->
                <div class="hero-card">
                    <div class="hero-card__header">
                        <h2>Current Detection</h2>
                        <div class="detecting-pulse">
                            <span class="pulse-dot pulse-dot--detecting"></span>
                            <span>Detecting</span>
                        </div>
                    </div>
                    <div class="hero-card__metrics">
                        <div class="metric">
                            <div class="metric__value" id="microplasticCount">847</div>
                            <div class="metric__label">Particles Detected</div>
                        </div>
                        <div class="metric">
                            <div class="metric__value" id="concentration">12.4</div>
                            <div class="metric__unit">mg/L</div>
                            <div class="metric__label">Concentration</div>
                        </div>
                        <div class="metric">
                            <div class="metric__value" id="confidence">94.2</div>
                            <div class="metric__unit">%</div>
                            <div class="metric__label">Confidence</div>
                        </div>
                    </div>
                </div>

                <!-- Water Quality Cards -->
                <div class="quality-grid">
                    <div class="quality-card">
                        <div class="quality-card__icon">🌡️</div>
                        <div class="quality-card__value">23.5°C</div>
                        <div class="quality-card__label">Temperature</div>
                    </div>
                    <div class="quality-card">
                        <div class="quality-card__icon">⚗️</div>
                        <div class="quality-card__value">7.8</div>
                        <div class="quality-card__label">pH Level</div>
                    </div>
                    <div class="quality-card">
                        <div class="quality-card__icon">⚡</div>
                        <div class="quality-card__value">425 μS/cm</div>
                        <div class="quality-card__label">Conductivity</div>
                    </div>
                    <div class="quality-card">
                        <div class="quality-card__icon">💧</div>
                        <div class="quality-card__value">2.1 NTU</div>
                        <div class="quality-card__label">Turbidity</div>
                    </div>
                </div>

                <!-- Trend Area -->
                <div class="trend-section">
                    <div class="trend-section__header">
                        <h3>Microplastic Trends</h3>
                        <div class="time-tabs">
                            <button class="time-tab time-tab--active" data-period="6h">6h</button>
                            <button class="time-tab" data-period="24h">24h</button>
                            <button class="time-tab" data-period="7d">7d</button>
                        </div>
                    </div>
                    <div class="chart-container" style="position: relative; height: 300px;">
                        <canvas id="trendChart"></canvas>
                    </div>
                </div>

                <!-- Charts Grid -->
                <div class="charts-grid">
                    <div class="chart-card">
                        <h4>Particle Size Distribution</h4>
                        <div class="chart-container" style="position: relative; height: 250px;">
                            <canvas id="sizeChart"></canvas>
                        </div>
                    </div>
                    <div class="chart-card">
                        <h4>Polymer Type Breakdown</h4>
                        <div class="chart-container" style="position: relative; height: 250px;">
                            <canvas id="polymerChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- System Status Panel -->
                <div class="system-panel">
                    <h3>System Status</h3>
                    <div class="system-grid">
                        <div class="system-item">
                            <span class="system-label">Battery</span>
                            <div class="battery-indicator">
                                <div class="battery-level" style="width: 87%"></div>
                                <span class="battery-text">87%</span>
                            </div>
                        </div>
                        <div class="system-item">
                            <span class="system-label">GPS Location</span>
                            <span class="system-value">19.0760°N, 72.8777°E (±3.2m)</span>
                        </div>
                        <div class="system-item">
                            <span class="system-label">Last Calibration</span>
                            <span class="system-value">Sep 05, 2025 - 10:30 AM</span>
                        </div>
                        <div class="system-item">
                            <span class="system-label">Connection Quality</span>
                            <span class="status status--success">Excellent</span>
                        </div>
                    </div>
                    <div class="export-actions">
                        <button class="btn btn--outline btn--sm" id="exportCsv">Export CSV</button>
                        <button class="btn btn--outline btn--sm" id="exportPng">Export PNG</button>
                    </div>
                </div>
            </section>

            <!-- Analysis Tab -->
            <section class="tab-content" id="analysis">
                <div class="analysis-layout">
                    <!-- Left Panel: EIS Plots -->
                    <div class="analysis-left">
                        <div class="plot-card">
                            <div class="plot-card__header">
                                <h3>Electrochemical Impedance Spectroscopy</h3>
                                <div class="plot-toggles">
                                    <button class="plot-toggle plot-toggle--active" data-plot="nyquist">Nyquist</button>
                                    <button class="plot-toggle" data-plot="bode">Bode</button>
                                </div>
                            </div>
                            
                            <!-- Sample State Toggles -->
                            <div class="sample-toggles">
                                <button class="sample-toggle sample-toggle--active" data-state="baseline">Baseline</button>
                                <button class="sample-toggle" data-state="low">MPs-Low</button>
                                <button class="sample-toggle" data-state="high">MPs-High</button>
                            </div>

                            <!-- Chart Container -->
                            <div class="eis-plot-container">
                                <div class="chart-container" style="position: relative; height: 400px;">
                                    <canvas id="eisChart"></canvas>
                                </div>
                            </div>

                            <!-- Mini Legend -->
                            <div class="mini-legend">
                                <p>Each point = one frequency; left→right = low→high Re(Z); tooltips show frequency</p>
                            </div>
                        </div>
                    </div>

                    <!-- Right Panel: Predictions & Features -->
                    <div class="analysis-right">
                        <!-- ML Prediction Card -->
                        <div class="prediction-card">
                            <h4>ML Prediction</h4>
                            <div class="prediction-item">
                                <span class="prediction-label">Microplastics</span>
                                <span class="status status--success" id="predictionStatus">None</span>
                            </div>
                            <div class="prediction-item">
                                <span class="prediction-label">Size Band</span>
                                <span class="prediction-value" id="sizeBand">N/A</span>
                            </div>
                            <div class="prediction-item">
                                <span class="prediction-label">Likely Polymer</span>
                                <span class="prediction-value" id="polymerType">N/A</span>
                            </div>
                            <div class="prediction-item">
                                <span class="prediction-label">Confidence</span>
                                <div class="confidence-bar">
                                    <div class="confidence-fill" id="confidenceFill" style="width: 96.8%"></div>
                                    <span class="confidence-text" id="confidenceText">96.8%</span>
                                </div>
                            </div>
                        </div>

                        <!-- Optical Fusion Widget -->
                        <div class="optical-card">
                            <h4>Optical Fusion</h4>
                            <div class="led-bars">
                                <div class="led-bar">
                                    <span class="led-label">450nm</span>
                                    <div class="led-indicator" style="width: 60%; background: #4A90E2;"></div>
                                    <span class="led-value" id="led450">15.2</span>
                                </div>
                                <div class="led-bar">
                                    <span class="led-label">525nm</span>
                                    <div class="led-indicator" style="width: 75%; background: #7ED321;"></div>
                                    <span class="led-value" id="led525">18.7</span>
                                </div>
                                <div class="led-bar">
                                    <span class="led-label">625nm</span>
                                    <div class="led-indicator" style="width: 65%; background: #D0021B;"></div>
                                    <span class="led-value" id="led625">16.4</span>
                                </div>
                            </div>
                            <div class="optical-ratio">
                                <span>I450/I625 Ratio: <strong id="opticalRatio">0.93</strong></span>
                                <span class="status status--success">Optical fusion: ON</span>
                            </div>
                        </div>

                        <!-- EIS Features Grid -->
                        <div class="features-card">
                            <h4>EIS Features</h4>
                            <div class="features-grid">
                                <div class="feature-item">
                                    <span class="feature-label">Rct</span>
                                    <span class="feature-value" id="rctValue">18.5 Ω</span>
                                </div>
                                <div class="feature-item">
                                    <span class="feature-label">Cdl</span>
                                    <span class="feature-value" id="cdlValue">8.6 μF</span>
                                </div>
                                <div class="feature-item">
                                    <span class="feature-label">|Z|(1kHz)</span>
                                    <span class="feature-value" id="zMagValue">130.4 Ω</span>
                                </div>
                                <div class="feature-item">
                                    <span class="feature-label">Phase(100Hz)</span>
                                    <span class="feature-value" id="phaseValue">-15.2°</span>
                                </div>
                                <div class="feature-item">
                                    <span class="feature-label">Warburg Index</span>
                                    <span class="feature-value" id="warburgValue">0.52</span>
                                </div>
                                <div class="feature-item">
                                    <span class="feature-label">Rs</span>
                                    <span class="feature-value" id="rsValue">127.2 Ω</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Explain Tab -->
            <section class="tab-content" id="explain">
                <div class="explain-content">
                    <!-- How It Works -->
                    <div class="explain-section">
                        <h3>How the Sensor Works</h3>
                        <div class="steps-container">
                            <div class="step-item">
                                <div class="step-number">1</div>
                                <div class="step-content">
                                    <h4>Baseline Scan</h4>
                                    <p>System captures EIS signature of clean water sample to establish reference impedance profile</p>
                                </div>
                            </div>
                            <div class="step-item">
                                <div class="step-number">2</div>
                                <div class="step-content">
                                    <h4>Sample Scan</h4>
                                    <p>Test water is analyzed using AC impedance spectroscopy across frequency range 0.01Hz-100kHz</p>
                                </div>
                            </div>
                            <div class="step-item">
                                <div class="step-number">3</div>
                                <div class="step-content">
                                    <h4>Feature Extraction</h4>
                                    <p>Algorithm extracts key parameters: charge transfer resistance (Rct), double layer capacitance (Cdl), and Warburg diffusion index</p>
                                </div>
                            </div>
                            <div class="step-item">
                                <div class="step-number">4</div>
                                <div class="step-content">
                                    <h4>ML Inference</h4>
                                    <p>1D-CNN + Random Forest ensemble model processes EIS features to classify microplastic presence and type</p>
                                </div>
                            </div>
                            <div class="step-item">
                                <div class="step-number">5</div>
                                <div class="step-content">
                                    <h4>Decision + Alert</h4>
                                    <p>System outputs confidence-weighted prediction with particle size estimation and polymer identification</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Why EIS + LEDs -->
                    <div class="explain-section">
                        <h3>Why EIS + LEDs?</h3>
                        <div class="advantages-grid">
                            <div class="advantage-card">
                                <h4>Advantages</h4>
                                <ul>
                                    <li>Cost-effective: ₹7k-₹10k prototype vs ₹50L+ for FTIR/Raman systems</li>
                                    <li>Speed: &lt;2 minutes per test vs 30+ minutes for spectroscopy</li>
                                    <li>Field-ready: Battery-powered, ruggedized design for remote deployment</li>
                                    <li>Multi-modal: EIS + optical fusion improves accuracy by 15-20%</li>
                                    <li>Low maintenance: No complex optical alignment or consumables required</li>
                                </ul>
                            </div>
                            <div class="advantage-card">
                                <h4>Limitations</h4>
                                <ul>
                                    <li>Lower specificity than FTIR for polymer identification</li>
                                    <li>Requires calibration for different water matrices</li>
                                    <li>Cannot detect particles &lt;10μm effectively</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Validation Plan -->
                    <div class="explain-section">
                        <h3>Validation Plan</h3>
                        <div class="validation-list">
                            <div class="validation-item">
                                <div class="validation-icon">🧪</div>
                                <p>Lab-spiked samples with known microplastic concentrations (10-1000 particles/L)</p>
                            </div>
                            <div class="validation-item">
                                <div class="validation-icon">🔬</div>
                                <p>Cross-validation against FTIR/Raman spectroscopy for polymer ID accuracy</p>
                            </div>
                            <div class="validation-item">
                                <div class="validation-icon">🌊</div>
                                <p>Field deployment in 3 different water bodies (river, lake, coastal)</p>
                            </div>
                            <div class="validation-item">
                                <div class="validation-icon">📊</div>
                                <p>Blind testing with environmental samples collected by independent labs</p>
                            </div>
                            <div class="validation-item">
                                <div class="validation-icon">✅</div>
                                <p>Statistical validation: 95% accuracy for presence/absence, 78% for polymer type</p>
                            </div>
                        </div>
                    </div>

                    <!-- Cost & Power -->
                    <div class="explain-section">
                        <h3>Cost & Power</h3>
                        <div class="cost-grid">
                            <div class="cost-item">
                                <div class="cost-icon">💰</div>
                                <div class="cost-label">Prototype Cost</div>
                                <div class="cost-value">₹7,000 - ₹10,000</div>
                            </div>
                            <div class="cost-item">
                                <div class="cost-icon">⏱️</div>
                                <div class="cost-label">Test Duration</div>
                                <div class="cost-value">&lt;2 minutes</div>
                            </div>
                            <div class="cost-item">
                                <div class="cost-icon">🔋</div>
                                <div class="cost-label">Battery Life</div>
                                <div class="cost-value">24 hours continuous</div>
                            </div>
                            <div class="cost-item">
                                <div class="cost-icon">🔧</div>
                                <div class="cost-label">Maintenance</div>
                                <div class="cost-value">Monthly calibration</div>
                            </div>
                            <div class="cost-item">
                                <div class="cost-icon">🌧️</div>
                                <div class="cost-label">Deployment</div>
                                <div class="cost-value">IP67 rated</div>
                            </div>
                        </div>
                    </div>

                    <!-- Links Section -->
                    <div class="explain-section">
                        <h3>Project Links</h3>
                        <div class="links-grid">
                            <div class="link-card">
                                <h4>CAD Prototype</h4>
                                <p>3D model and technical drawings</p>
                                <a href="https://a360.co/3W7gEjE" target="_blank" class="btn btn--primary">View in Fusion 360</a>
                            </div>
                            <div class="link-card">
                                <h4>Live UI Demo</h4>
                                <p>Interactive web application</p>
                                <a href="https://adwait3.github.io/Micronauts" target="_blank" class="btn btn--primary">Launch Demo</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>

    <!-- Toast Notification -->
    <div class="toast" id="toast">
        <span class="toast-text" id="toastText">Link copied to clipboard!</span>
    </div>

    <script src="app.js"></script>
</body>
</html>
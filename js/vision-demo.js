/**
 * Murdifin Portfolio - Interactive AI Vision Sandbox
 * Real-time detection simulations with authentic photo backgrounds:
 * 1. Vehicle & Traffic Analysis (YOLO11 + ByteTrack)
 * 2. Warehouse SOP Packing Compliance (YOLO11 + State Machine)
 * 3. Smoking Activity Detection (YOLO11 + OpenCV)
 * 4. Calorie & Macronutrient Analyzer (Gemini Vision AI)
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvasPreview = document.getElementById('vision-canvas-preview');
  const scenarioButtons = document.querySelectorAll('.scenario-btn');
  const fpsMetric = document.getElementById('hud-fps');
  const latencyMetric = document.getElementById('hud-latency');
  const confMetric = document.getElementById('hud-conf');
  const modelSpecList = document.getElementById('model-spec-list');
  const liveLogs = document.getElementById('live-detections-list');
  const scenarioTitle = document.getElementById('scenario-title');
  const scenarioDesc = document.getElementById('scenario-desc');

  if (!canvasPreview) return;

  const scenarios = {
    traffic: {
      title: "Deteksi Kendaraan & Analisis Kepadatan Lalu Lintas",
      desc: "Sistem deteksi kendaraan dan tracking multi-objek real-time menggunakan YOLO11 dan ByteTrack dengan klasifikasi spesifik mobil, motor, dan truck.",
      model: "YOLO11-Traffic + ByteTrack",
      latency: "16.8 ms",
      fps: "58.4",
      conf: "96.4%",
      camTag: "CAM-01 · URBAN TRAFFIC INTERSECTION",
      image: "assets/images/traffic.jpg",
      viewBox: "0 0 960 639",
      imgW: 960,
      imgH: 639,
      specs: [
        { label: "Model Architecture", val: "YOLO11x / Ultralytics" },
        { label: "Tracker Algorithm", val: "ByteTrack (Multi-Class)" },
        { label: "Classes Monitored", val: "Mobil, Motor, Truck" },
        { label: "Traffic Flow", val: "Padat Merayap (48 unit/min)" },
        { label: "Hardware Target", val: "NVIDIA TensorRT / Edge GPU" }
      ],
      objects: [
        { id: "TRUCK #01", label: "Truck (Truk) · 0.97", x: 72, y: 228, w: 195, h: 265, color: "#f59e0b", textColor: "#000", pillPlacement: "top" },
        { id: "CAR #01", label: "Mobil (Car) · 0.99", x: 425, y: 360, w: 155, h: 125, color: "#38bdf8", textColor: "#000", pillPlacement: "top" },
        { id: "MOTO #01", label: "Motor (Motorcycle) · 0.98", x: 765, y: 350, w: 190, h: 285, color: "#10b981", textColor: "#000", pillPlacement: "top" },
        { id: "MOTO #02", label: "Motor (Scooter) · 0.96", x: 565, y: 375, w: 155, h: 240, color: "#10b981", textColor: "#000", pillPlacement: "top" }
      ],
      visualGuides: `
        <!-- ROI Virtual Counting Line -->
        <line x1="0" y1="480" x2="960" y2="480" stroke="rgba(212, 175, 55, 0.85)" stroke-width="2.5" stroke-dasharray="8 6"/>
        <rect x="15" y="492" width="220" height="20" rx="3" fill="rgba(10, 14, 22, 0.88)" stroke="#d4af37" stroke-width="1"/>
        <text x="25" y="506" fill="#f3d47a" font-size="11" font-family="'JetBrains Mono', monospace" font-weight="600">ROI COUNTING GATE · LINE A</text>
      `,
      logs: [
        { text: "[DETECTION] Truck (Truk cargo) ID #42 matched in outer lane", class: "target" },
        { text: "[DETECTION] Mobil (Car sedan) ID #88 crossed ROI line (+1)", class: "target" },
        { text: "[DETECTION] Motor (Motorcycle sport) ID #105 moving forward", class: "" },
        { text: "[FLOW AUDIT] 3 vehicle classes verified: Mobil, Motor, Truck", class: "target" }
      ]
    },
    packing: {
      title: "Deteksi Kepatuhan SOP Packing Gudang",
      desc: "Pemantauan otomatis tahapan pengemasan barang e-commerce berbasis YOLO11 untuk mendeteksi kesiapan box, lakban, dan resi pengiriman secara real-time.",
      model: "YOLO11-SOP + State Tracker",
      latency: "21.4 ms",
      fps: "46.2",
      conf: "97.8%",
      camTag: "CAM-04 · WAREHOUSE PACKING BENCH #02",
      image: "assets/images/packing.jpg",
      viewBox: "0 0 960 640",
      imgW: 960,
      imgH: 640,
      specs: [
        { label: "Model Pipeline", val: "YOLO11 + Finite State Machine" },
        { label: "Target Entities", val: "Box, Lakban, Resi" },
        { label: "SOP Step Status", val: "Step 3: Sealing & Resi Audit OK" },
        { label: "Compliance Score", val: "99.4% Compliant" },
        { label: "Alert Dispatch", val: "Auto-Log to Cloud Warehouse" }
      ],
      objects: [
        { id: "BOX #01", label: "Box (Kardus) · 0.99", x: 165, y: 220, w: 495, h: 345, color: "#10b981", textColor: "#000", pillPlacement: "inside-bottom" },
        { id: "LAKBAN #01", label: "Lakban (Tape) · 0.98", x: 55, y: 65, w: 170, h: 180, color: "#38bdf8", textColor: "#000", pillPlacement: "top" },
        { id: "RESI #01", label: "Resi (Barcode AWB) · 0.97", x: 280, y: 220, w: 260, h: 52, color: "#f59e0b", textColor: "#000", pillPlacement: "top" }
      ],
      visualGuides: `
        <!-- Packing Workstation ROI Boundary -->
        <rect x="40" y="50" width="880" height="540" rx="8" fill="none" stroke="rgba(16, 185, 129, 0.4)" stroke-width="1.5" stroke-dasharray="6 4"/>
        <text x="55" y="575" fill="#34d399" font-size="11" font-family="'JetBrains Mono', monospace" font-weight="600">INSPECTION ZONE: BENCH ACTIVE (BOX, LAKBAN, RESI)</text>
      `,
      logs: [
        { text: "[SOP DETECT] Box (Kardus standard) orientation verified OK", class: "target" },
        { text: "[SOP DETECT] Lakban (Packing tape) seam sealing active", class: "target" },
        { text: "[BARCODE OCR] Resi AWB label #SPX-982014 detected OK", class: "target" },
        { text: "[SOP SUMMARY] All 3 packing items verified (Box, Lakban, Resi)", class: "target" }
      ]
    },
    smoking: {
      title: "Deteksi Rokok Real-Time",
      desc: "Sistem monitoring kawasan tanpa rokok menggunakan YOLO11 untuk mendeteksi keberadaan objek rokok secara instan dan presisi tinggi.",
      model: "YOLO11-Smoke Precision",
      latency: "18.2 ms",
      fps: "54.0",
      conf: "98.2%",
      camTag: "CAM-02 · RESTRICTED INDOOR CORRIDOR",
      image: "assets/images/smoking.jpg",
      viewBox: "0 0 630 420",
      imgW: 630,
      imgH: 420,
      specs: [
        { label: "Target Class", val: "Rokok (Cigarette Detection)" },
        { label: "Model Precision", val: "mAP@0.5: 96.4%" },
        { label: "Inference Engine", val: "ONNX Runtime / TensorRT" },
        { label: "Monitoring Area", val: "Indoor Campus Restricted Area" },
        { label: "Violation Status", val: "ALERT: Rokok Terdeteksi" }
      ],
      objects: [
        { id: "ROKOK #01", label: "ALERT: Rokok · 0.98", x: 105, y: 115, w: 190, h: 70, color: "#ef4444", textColor: "#fff", pillPlacement: "top" }
      ],
      visualGuides: `
        <!-- Restricted Zone Warning Banner (Cleanly at bottom left) -->
        <rect x="15" y="380" width="245" height="24" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" stroke-width="1"/>
        <text x="25" y="396" fill="#fca5a5" font-size="10" font-family="'JetBrains Mono', monospace" font-weight="700">RESTRICTED ZONE · VIOLATION</text>
      `,
      logs: [
        { text: "[DETECTION] Rokok (Cigarette) terdeteksi di perimeter terlarang", class: "alert" },
        { text: "[OBJECT ID] Single target match: Rokok (Confidence: 98.2%)", class: "alert" },
        { text: "[ZONE AUDIT] Non-smoking policy violation confirmed", class: "alert" },
        { text: "[ALERT DISPATCH] Push notification ke petugas keamanan dikirim", class: "alert" }
      ]
    },
    calorie: {
      title: "Deteksi Kalori & Makronutrisi Makanan",
      desc: "Aplikasi otomatis pengenal porsi makanan dan estimasi kandungan kalori, protein, lemak, dan karbohidrat menggunakan Google Gemini Vision AI dan FastAPI.",
      model: "Google Gemini 1.5 Vision + FastAPI",
      latency: "142 ms",
      fps: "API",
      conf: "98.9%",
      camTag: "MULTI-MODAL VISION · GEMINI 1.5 FLASH",
      image: "assets/images/food.jpg",
      viewBox: "0 100 800 533",
      imgW: 800,
      imgH: 800,
      specs: [
        { label: "Vision Backbone", val: "Google Gemini Vision AI" },
        { label: "Server Runtime", val: "FastAPI + Pydantic v2" },
        { label: "Est. Total Kalori", val: "460 kKal" },
        { label: "Makronutrisi", val: "K: 48g | P: 28g | L: 16g" },
        { label: "Diet Compliance", val: "High Protein Salad Bowl" }
      ],
      objects: [
        { id: "EGG #01", label: "Boiled Eggs (140 kcal) · 0.99", x: 165, y: 195, w: 180, h: 175, color: "#38bdf8", textColor: "#000", pillPlacement: "bottom" },
        { id: "CORN #01", label: "Sweet Corn (65 kcal) · 0.96", x: 480, y: 245, w: 170, h: 205, color: "#f59e0b", textColor: "#000", pillPlacement: "top" },
        { id: "GREENS #01", label: "Edamame & Greens (45 kcal) · 0.93", x: 275, y: 155, w: 245, h: 100, color: "#a855f7", textColor: "#fff", pillPlacement: "top" },
        { id: "TOFU #01", label: "Grilled Tofu (185 kcal) · 0.98", x: 270, y: 225, w: 270, h: 270, color: "#10b981", textColor: "#000", pillPlacement: "inside-bottom" },
        { id: "TOMATO #01", label: "Tomatoes (25 kcal) · 0.95", x: 135, y: 340, w: 145, h: 225, color: "#ef4444", textColor: "#fff", pillPlacement: "inside-top" }
      ],
      visualGuides: `
        <!-- Meal Plate Circular Guide -->
        <circle cx="400" cy="400" r="380" fill="none" stroke="rgba(212, 175, 55, 0.4)" stroke-width="1.5" stroke-dasharray="8 6"/>
        <text x="35" y="140" fill="#f3d47a" font-size="11.5" font-family="'JetBrains Mono', monospace" font-weight="600">MEAL SEGMENTATION MAP · 5 MACRO PORTIONS</text>
      `,
      logs: [
        { text: "[GEMINI VISION] Multi-modal visual tokens analyzed: 420 tokens", class: "target" },
        { text: "[PORTION ESTIMATE] Plate fill ratio: 82% healthy macro density", class: "target" },
        { text: "[NUTRITION SYNC] Macros logged: P 28g, C 48g, F 16g", class: "target" },
        { text: "[STATUS] 200 OK — Nutrition JSON returned in 142ms", class: "" }
      ]
    }
  };

  function getCurrentTimeString() {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }

  function renderScenario(key) {
    const data = scenarios[key];
    if (!data) return;

    // Update HUD & Text
    scenarioTitle.textContent = data.title;
    scenarioDesc.textContent = data.desc;
    fpsMetric.textContent = data.fps;
    latencyMetric.textContent = data.latency;
    confMetric.textContent = data.conf;

    // Update Model Specs
    modelSpecList.innerHTML = data.specs.map(s => `
      <div class="spec-item">
        <span class="spec-name">${s.label}</span>
        <span class="spec-val">${s.val}</span>
      </div>
    `).join('');

    // Update Live Logs
    liveLogs.innerHTML = data.logs.map(l => `
      <div class="det-log-entry ${l.class}">
        <span>${l.text}</span>
      </div>
    `).join('');

    // Generate SVG bounding boxes
    const boxesHtml = data.objects.map(obj => {
      const pillHeight = 22;
      let pillY;
      if (obj.pillPlacement === 'bottom') {
        pillY = obj.y + obj.h + 3;
      } else if (obj.pillPlacement === 'inside-top') {
        pillY = obj.y + 4;
      } else if (obj.pillPlacement === 'inside-bottom') {
        pillY = obj.y + obj.h - pillHeight - 4;
      } else {
        pillY = Math.max(4, obj.y - pillHeight - 3);
      }

      const textX = obj.x + 8;
      const textY = pillY + pillHeight - 6;
      const pillWidth = Math.max(130, obj.label.length * 8.2);

      // Corner reticles
      const retLen = Math.min(18, Math.round(obj.w * 0.25));
      const retThick = 2.5;

      return `
        <g class="detection-box-group" data-id="${obj.id}">
          <!-- Semi-transparent Object Fill -->
          <rect x="${obj.x}" y="${obj.y}" width="${obj.w}" height="${obj.h}"
                fill="${obj.color}" fill-opacity="0.16" rx="4"/>
          
          <!-- Bounding Box Border -->
          <rect x="${obj.x}" y="${obj.y}" width="${obj.w}" height="${obj.h}"
                fill="none" stroke="${obj.color}" stroke-width="2" rx="4"/>

          <!-- Reticle Top-Left -->
          <line x1="${obj.x}" y1="${obj.y}" x2="${obj.x + retLen}" y2="${obj.y}" stroke="${obj.color}" stroke-width="${retThick}"/>
          <line x1="${obj.x}" y1="${obj.y}" x2="${obj.x}" y2="${obj.y + retLen}" stroke="${obj.color}" stroke-width="${retThick}"/>
          
          <!-- Reticle Bottom-Right -->
          <line x1="${obj.x + obj.w}" y1="${obj.y + obj.h}" x2="${obj.x + obj.w - retLen}" y2="${obj.y + obj.h}" stroke="${obj.color}" stroke-width="${retThick}"/>
          <line x1="${obj.x + obj.w}" y1="${obj.y + obj.h}" x2="${obj.x + obj.w}" y2="${obj.y + obj.h - retLen}" stroke="${obj.color}" stroke-width="${retThick}"/>

          <!-- Label Tag Background Pill -->
          <rect x="${obj.x}" y="${pillY}" width="${pillWidth}" height="${pillHeight}"
                fill="${obj.color}" rx="3" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.45))"/>

          <!-- Label Text -->
          <text x="${textX}" y="${textY}" fill="${obj.textColor || '#000000'}"
                font-size="11" font-family="'JetBrains Mono', monospace" font-weight="700">
            ${obj.label}
          </text>
        </g>
      `;
    }).join('');

    const timeStr = getCurrentTimeString();

    canvasPreview.innerHTML = `
      <div class="viewfinder-camera-bar">
        <div class="viewfinder-tag">
          <span class="rec-bullet"></span>
          <span class="cam-text">${data.camTag}</span>
        </div>
        <div class="viewfinder-info">
          <span class="cam-fps">${data.fps === 'API' ? 'REST API' : data.fps + ' FPS'}</span>
          <span class="cam-time">${timeStr}</span>
        </div>
      </div>
      <div class="scan-line"></div>
      <svg class="vision-svg-overlay" viewBox="${data.viewBox}" preserveAspectRatio="xMidYMid slice">
        <image href="${data.image}" x="0" y="0" width="${data.imgW}" height="${data.imgH}" preserveAspectRatio="xMidYMid slice"/>
        ${data.visualGuides || ''}
        ${boxesHtml}
      </svg>
    `;
  }

  // Setup Button Handlers
  scenarioButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      scenarioButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const scenarioKey = btn.getAttribute('data-scenario');
      renderScenario(scenarioKey);
    });
  });

  // Initial render
  renderScenario('traffic');
});

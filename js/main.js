/**
 * Murdifin Portfolio - Main JavaScript
 * Handles navigation, theme switching, project filters, case study modal,
 * copy-to-clipboard actions, and form handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Permanent Light Mode (No Dark Mode)
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.removeItem('murdifin_theme');

  // 2. Mobile Drawer Menu
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  function openDrawer() {
    if (!navMenu) return;
    navMenu.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!navMenu) return;
    navMenu.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.contains('open') ? closeDrawer() : openDrawer();
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  // Close drawer when clicking nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navLink) navLink.classList.add('active');
      } else {
        if (navLink) navLink.classList.remove('active');
      }
    });
  });

  // 4. Project Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // 5. Technical Case Study Project Details Data & Modal
  const projectDetails = {
    'ai-electronic-module': {
      title: "AI-Electronic-Module-Identifier",
      badge: "AI Vision & Hardware Copilot",
      repo: "https://github.com/murdifin15/AI-Electronic-Module-Identifier",
      tags: ["TypeScript", "Google Gemini Vision API", "Interactive Pinout", "FastAPI"],
      summary: "Platform cerdas untuk mengidentifikasi modul mikrokontroler dan komponen elektronik secara instan hanya dari tangkapan visual kamera.",
      highlights: [
        "Identifikasi akurat berbagai modul elektronika (ESP32, Arduino, Raspberry Pi Pico, Sensors) menggunakan multimodal Gemini Vision AI.",
        "Visualisasi interaktif diagram pinout dengan pemetaan GPIO, ADC, PWM, dan protokol komunikasi (I2C, SPI, UART).",
        "Fitur Hardware Copilot: rekomendasi troubleshooting dan panduan wiring kabel cerdas langsung pada tampilan web."
      ],
      stack: "TypeScript, Google Gemini Vision API, Canvas/SVG Rendering, Modern Component Architecture"
    },
    'deteksi-kendaraan': {
      title: "Deteksi-Kendaraan & Analisis Kepadatan",
      badge: "Real-Time Computer Vision",
      repo: "https://github.com/murdifin15/Deteksi-Kendaraan",
      tags: ["Python", "YOLO11", "ByteTrack", "FastAPI", "WebSocket"],
      summary: "Sistem cerdas pemantauan arus lalu lintas real-time yang mampu mendeteksi jenis kendaraan, melacak trajektori, dan menghitung volume serta kepadatan jalan raya.",
      highlights: [
        "Penerapan arsitektur model YOLO11 untuk inferensi kecepatan tinggi dengan akurasi klasifikasi multi-kelas (Mobil, Motor, Bus, Truk).",
        "Algoritma ByteTrack terintegrasi untuk mencegah duplicate counting pada saat oklusi atau kendaraan saling berdekatan.",
        "Dashboard analitik web responsif dengan streaming visual dan notifikasi kemacetan otomatis melalui WebSocket."
      ],
      stack: "Python, Ultralytics YOLO11, ByteTrack, OpenCV, FastAPI, Chart.js"
    },
    'deteksi-sop-packing': {
      title: "Deteksi-SOP-Packing Gudang",
      badge: "Industrial Quality Assurance AI",
      repo: "https://github.com/murdifin15/Deteksi-SOP-Packing",
      tags: ["Python", "YOLO11", "OpenCV", "State Machine Tracker"],
      summary: "Solusi otomatisasi pengawasan kepatuhan Standar Operasional Prosedur (SOP) pengemasan barang e-commerce untuk meminimalkan human error.",
      highlights: [
        "State Machine Tracker melacak 4 tahapan kritis: Scan Barcode -> Pemasangan Bubblewrap -> Lakban Segel H-Pattern -> Penempelan Resi Pengiriman.",
        "Verifikasi urutan sekuensial secara real-time; sistem memicu peringatan seketika jika ada langkah pengemasan yang terlewat.",
        "Mendukung audit otomatis log kepatuhan pergudangan dengan bukti snapshot insiden."
      ],
      stack: "Python 3.10, YOLO11, OpenCV, Finite State Machine, SQLite Logging"
    },
    'deteksi-kalori': {
      title: "Deteksi-Kalori & Analisis Makronutrisi",
      badge: "Nutrition & Multimodal AI",
      repo: "https://github.com/murdifin15/Deteksi-Kalori",
      tags: ["JavaScript", "FastAPI", "Gemini Vision AI", "Nutrition Engine"],
      summary: "Aplikasi deteksi makanan otomatis berbasis foto yang membedah porsi makan dan mengkalkulasi komposisi nutrisi harian.",
      highlights: [
        "Pengenalan beragam masakan lokal Indonesia dan internasional menggunakan prompt multimodal terstruktur pada Google Gemini Vision.",
        "Estimasi gramatur dan breakdown makronutrisi: Kalori total, Karbohidrat, Protein, serta Lemak.",
        "API backend FastAPI berkecepatan tinggi dengan validasi skema Pydantic v2."
      ],
      stack: "Google Gemini Vision API, FastAPI, Python, Modern JS Frontend"
    },
    'deteksi-rokok': {
      title: "Deteksi Rokok / Merokok Real-Time",
      badge: "Public Safety & Regulation AI",
      repo: "https://github.com/murdifin15/Deteksi-Rokok",
      tags: ["Python", "YOLO11", "ByteTrack", "OpenCV"],
      summary: "Sistem pemantau kawasan dilarang merokok cerdas dengan deteksi objek rokok berukuran kecil dan verifikasi gestur tangan ke mulut.",
      highlights: [
        "Fine-tuning model YOLO11 khusus untuk deteksi objek berukuran sangat kecil (small object detection) seperti rokok dan vape.",
        "Filter temporal untuk mencegah false positive dari gestur makan atau menyentuh wajah biasa.",
        "Integrasi notifikasi peringatan seketika untuk penegakan aturan di ruang publik dan institusi pendidikan."
      ],
      stack: "Python, YOLO11, OpenCV High-FPS Pipeline, ByteTrack"
    },
    'inventori-toko': {
      title: "Inventori-Toko Modern",
      badge: "Fullstack Architecture",
      repo: "https://github.com/murdifin15/Inventori-Toko",
      tags: ["React 19", "Vite", "Node.js", "Express", "SQLite", "Glassmorphism"],
      summary: "Sistem manajemen stok barang toko berkecepatan tinggi dengan antarmuka premium dark glassmorphism dan pengelolaan transaksi komprehensif.",
      highlights: [
        "Mengadopsi React 19 terbaru dengan arsitektur modular, state management efisien, dan rendering kilat via Vite.",
        "REST API aman berbasis Express.js dan SQLite yang ringan, andal, serta mudah di-deploy.",
        "Desain UI/UX mewah dengan indikator stok menipis, grafik penjualan real-time, dan ekspor laporan transaksi."
      ],
      stack: "React 19, Node.js, Express.js, SQLite, CSS Glassmorphism"
    },
    'bima-nesia': {
      title: "Bima-Nesia – Kamus Digital & Penerjemah",
      badge: "Language Preservation & NLP",
      repo: "https://github.com/murdifin15/Bima-Nesia",
      tags: ["JavaScript", "Web Speech API", "Text-to-Speech", "Cultural Tech"],
      summary: "Platform pelestarian budaya lokal interaktif yang menjembatani bahasa daerah Bima (Nggahi Mbojo) dan Bahasa Indonesia dengan teknologi audio cerdas.",
      highlights: [
        "Fitur Speech-to-Text (STT) dan Text-to-Speech (TTS) untuk membantu pelafalan autentik penutur asli.",
        "Pencarian leksikal cepat dengan indeks kosakata dwibahasa komprehensif.",
        "Didesain ringan dan ramah mobile agar mudah diakses oleh pelajar, peneliti budaya, maupun wisatawan."
      ],
      stack: "Vanilla JavaScript (ES6+), Web Speech API, IndexedDB, Responsive CSS"
    },
    'pestoka-uiux': {
      title: "Start Up Pestoka – Desain UI/UX",
      badge: "Product & UI/UX Case Study",
      repo: "https://github.com/murdifin15",
      tags: ["Figma", "User Research", "Wireframing", "Design System"],
      summary: "Perancangan pengalaman antarmuka pengguna (UI/UX) menyeluruh untuk aplikasi rintisan Pestoka di bidang penanganan hama dan pertanian.",
      highlights: [
        "Riset mendalam kepada calon pengguna (petani & pelaku usaha) untuk memetakan pain points dalam identifikasi hama tanaman.",
        "Penyusunan alur wireframe, user flow, dan Design System konsisten berbasis pedoman UI modern di Figma.",
        "Pengujian prototype interaktif (Usability Testing) hingga siap diserahkan ke tim engineer pengembang."
      ],
      stack: "Figma, FigJam, Prototyping, Usability Testing Metrics"
    },
    'design-thinking-ibadah': {
      title: "Design Thinking Aplikasi Pengelolaan Tempat Ibadah",
      badge: "Social Impact & Case Study",
      repo: "https://github.com/murdifin15",
      tags: ["Design Thinking", "Community Research", "Prototype", "Desa Renda"],
      summary: "Studi kasus empiris perancangan aplikasi manajemen tempat ibadah di Desa Renda, NTB dengan menerapkan 5 tahapan metodologi Design Thinking.",
      highlights: [
        "Tahap Empathize & Define: observasi langsung kebutuhan pengurus masjid dan masyarakat terkait transparansi keuangan kas serta jadwal kegiatan.",
        "Ideate & Prototype: perancangan antarmuka sederhana yang inklusif untuk semua rentang usia pengurus.",
        "Testing & Validasi: evaluasi langsung bersama tokoh masyarakat dan pengurus takmir dengan respon kepuasan yang tinggi."
      ],
      stack: "Design Thinking Methodology, User Journey Mapping, Rapid Prototyping"
    }
  };

  const modalOverlay = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  document.querySelectorAll('.btn-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectDetails[projectId];
      if (!data || !modalOverlay || !modalBody) return;

      modalBody.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <span class="badge-tag badge-gold">${data.badge}</span>
        </div>
        <h2 style="font-size: 1.6rem; margin-bottom: 14px; line-height: 1.3;">${data.title}</h2>
        <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px;">
          ${data.summary}
        </p>

        <h4 style="font-size: 1rem; color: var(--accent-gold-light); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-family: var(--font-mono);">
          Fitur Kunci & Solusi Rekayasa
        </h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
          ${data.highlights.map(h => `
            <li style="font-size: 0.88rem; color: var(--text-secondary); display: flex; gap: 10px; align-items: flex-start;">
              <span style="color: var(--accent-gold); flex-shrink: 0; font-weight: bold;">✓</span>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>

        <h4 style="font-size: 1rem; color: var(--accent-gold-light); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.05em; font-family: var(--font-mono);">
          Tech Stack & Tools
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 30px;">
          ${data.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 18px; border-top: 1px solid var(--border-subtle);">
          <a href="${data.repo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 9px 18px; font-size: 0.85rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            Buka Repositori GitHub
          </a>
          <button type="button" class="btn btn-outline modal-cancel-btn" style="padding: 9px 16px; font-size: 0.85rem;">
            Tutup
          </button>
        </div>
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Attach cancel inside modal
      const cancelBtn = modalBody.querySelector('.modal-cancel-btn');
      if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
      }
    });
  });

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 6. Copy to Clipboard Utility with Toast
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        showToast(`Tersalin: "${text}"`);
      }).catch(() => {
        // Fallback
        showToast(`Gagal menyalin, teks: ${text}`);
      });
    });
  });

  // Toast Function
  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // 7. Contact Form Simulation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name')?.value.trim();
      const email = document.getElementById('sender-email')?.value.trim();
      const message = document.getElementById('sender-message')?.value.trim();

      if (!name || !email || !message) {
        showToast('Mohon lengkapi semua kolom pesan.');
        return;
      }

      // Open mailto fallback smoothly
      const subject = encodeURIComponent(`Kolaborasi AI / Inkuiri Proyek dari ${name}`);
      const body = encodeURIComponent(`Halo Murdifin,\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}\n\nSalam,\n${name}`);
      window.location.href = `mailto:murdifin15@gmail.com?subject=${subject}&body=${body}`;

      showToast('Membuka aplikasi email Anda...');
      contactForm.reset();
    });
  }

  // 8. Email Direct Action Feedback
  document.querySelectorAll('.email-smart-link').forEach(link => {
    link.addEventListener('click', () => {
      showToast('Membuka Gmail (murdifin15@gmail.com)...');
    });
  });
});

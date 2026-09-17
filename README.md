# Murdifin - Personal Portfolio & AI Vision Lab

Web portofolio berkelas dunia (*quiet luxury & tech precision*) untuk **Murdifin, M.Kom** — Peneliti Kecerdasan Buatan & Perekayasa *Computer Vision*. Didesain dengan estetika modern, berwibawa, dan elegan tanpa alay (*obsidian dark mode with champagne gold accents*).

---

## Fitur Utama

1. **Quiet Luxury Visual Aesthetic**:
   - Skema warna elegan: *Obsidian Dark Canvas* (`#07080B`), *Champagne Gold Highlights* (`#D4AF37`), *Precision Titanium*, dan *Glassmorphism* halus.
   - Tipografi terkurasi: **Outfit** (Heading berkarakter tegas), **Inter** (Keterbacaan body text maksimal), dan **JetBrains Mono** (Metrik teknis komputasi).
   - Mendukung **Beralih Tema (Dark & Light Mode)** dengan persistensi `localStorage`.

2. **Interactive AI Vision Sandbox**:
   - Simulasi interaktif modul *Computer Vision* langsung di browser tanpa instalasi backend tambahan.
   - 4 Skenario Inferensi Real-Time:
     - **Deteksi Kendaraan & Kepadatan Lalu Lintas** (YOLO11 + ByteTrack)
     - **Deteksi Kepatuhan SOP Packing Pergudangan** (YOLO11 + State Machine Tracker)
     - **Deteksi Aktivitas Merokok** (YOLO11 + OpenCV)
     - **Deteksi Kalori & Nutrisi Makanan** (Google Gemini Vision AI)
   - Dilengkapi HUD metrik live (FPS, Inference Latency, Avg Confidence) dan log event real-time.

3. **Featured Projects & Engineering Works**:
   - Mengintegrasikan 7 repositori GitHub resmi ([github.com/murdifin15](https://github.com/murdifin15)) serta proyek UI/UX riset:
     - `AI-Electronic-Module-Identifier` (Gemini Vision AI, TypeScript)
     - `Deteksi-Kendaraan` (YOLO11, ByteTrack, FastAPI)
     - `Deteksi-SOP-Packing` (YOLO11, State Machine, OpenCV)
     - `Deteksi-Kalori` (Google Gemini Vision AI, FastAPI)
     - `Deteksi-Rokok` (YOLO11, ByteTrack, OpenCV)
     - `Inventori-Toko` (React 19, Vite, SQLite, Express)
     - `Bima-Nesia` (Speech-to-Text & Text-to-Speech)
     - `Start Up Pestoka` (UI/UX Case Study, Figma)
     - `Penerapan Design Thinking Tempat Ibadah` (Studi Kasus Desa Renda, NTB)
   - Filter instan multi-kategori dan popup modal **Detail Arsitektur Teknis** pada setiap proyek.

4. **Academic Research & Publications**:
   - Tesis S2: *Analisis Komparatif RetinaFace dan YOLOv8-Face Terhadap Kinerja Klasifikasi Ekspresi Wajah* (2026).
   - *Klasifikasi Hewan Menggunakan CNN* (2025).
   - *Penerapan Machine Learning Dalam Optimasi Proses Konversi Biomassa Menjadi Energi* (2025).

5. **Technical Arsenal & Capabilities Matrix**:
   - Pemetaan keahlian *AI & Computer Vision*, *Backend & Architecture*, *Frontend & Interaction*, serta *Product & Leadership*.

6. **Dual-Track Timeline**:
   - Track Pendidikan Formal (S2 Informatika UIN Sunan Kalijaga IPK 3.71, S1 Informatika UAD IPK 3.46).
   - Track Kepemimpinan (Sekretaris Bidang Riset & Teknologi IMM DIY, Komisi DPM UAD, IMM FTI UAD).

7. **Direct Executive Contact**:
   - Salin email & telepon instan dengan notifikasi *toast*.
   - Formulir pesan kolaborasi dengan fallback *mailto*.

---

## Struktur Direktori

```
d:\web portofolio\
├── index.html            # Markup semantik, SEO meta tags, OpenGraph
├── css\
│   └── style.css         # Desain sistem mewah, CSS custom properties, responsivitas
├── js\
│   ├── main.js           # Navigasi, theme switcher, filter proyek, modal dialog, toast
│   └── vision-demo.js    # Simulasi interaktif AI Vision & deteksi bounding box
└── README.md             # Dokumentasi proyek & panduan deployment
```

---

## Cara Menjalankan Secara Lokal

Website ini dibangun menggunakan arsitektur Vanilla Web murni (HTML5, CSS3, JavaScript ES6+) sehingga **sangat ringan, cepat, dan tidak memerlukan dependensi `node_modules`**.

### Opsi 1: Python Built-in Server (Rekomendasi)
```bash
# Buka terminal di folder d:\web portofolio
python -m http.server 3000
```
Buka browser di: `http://localhost:3000`

### Opsi 2: Live Server (VS Code Extension)
Cukup klik kanan pada `index.html` dan pilih **"Open with Live Server"**.

---

## Panduan Deployment Gratis

### 1. GitHub Pages
1. Unggah seluruh isi repositori ini ke GitHub (`murdifin15.github.io` atau branch `main`).
2. Masuk ke **Settings** > **Pages** > pilih branch `main` > Save.
3. Website akan langsung aktif secara publik dalam beberapa detik!

### 2. Vercel / Netlify
1. Hubungkan akun GitHub dengan Vercel/Netlify.
2. Pilih repositori `web-portofolio`.
3. Deploy otomatis (Zero configuration needed).

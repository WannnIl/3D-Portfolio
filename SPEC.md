# Spesifikasi Teknis: 3D Interactive Portfolio

## 1. Objektif
Membangun website portofolio interaktif berbasis 3D untuk memamerkan proyek (Web Development, Mobile Development, Riset Keamanan). Target pengguna adalah rekruter, klien potensial, dan sesama developer. Keberhasilan diukur dari performa website (lancar di berbagai perangkat), navigasi yang intuitif meskipun menggunakan 3D, dan tampilan proyek yang informatif.

## 2. Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **3D Rendering:** React Three Fiber (R3F) & Three.js
- **Animasi Tambahan:** Framer Motion (untuk transisi UI HTML)
- **Deployment:** Vercel (direkomendasikan)

## 3. Konsep Adegan 3D (3D Scene Concept)
**Konsep Visual Terpilih: Cyberpunk / Hacker Room**
- **Kamera & Navigasi:** Pengguna melihat sebuah ruang kerja bergaya cyberpunk dengan pencahayaan neon (ruang hacker).
- **Interaksi:**
  - **Monitor Utama / Setup Komputer:** Saat diklik, menampilkan "Projects Showcase" Web Development dan "Terminal" untuk Riset Keamanan.
  - **Smartphone/Tablet di Meja:** Menampilkan proyek "Mobile Development".
  - **Server / Perangkat Keras / Modul Hologram:** Menampilkan informasi "Skills".
  - **Papan Ketik / Panel Kontrol:** Berfungsi memunculkan "Contact Form".
- **Aset 3D:** Menggunakan aset *open-source* gratis dengan modifikasi material/pencahayaan agar sesuai tema cyberpunk.

## 4. Struktur Komponen Halaman
1. **Hero 3D (Landing):**
   - Kanvas 3D yang memuat adegan Hacker Room.
   - Teks overlay HTML (Nama, Role) dan instruksi navigasi (misal: "Click objects to explore").
2. **Projects Showcase (Web, Mobile, Security):**
   - Menggunakan **Overlay UI HTML 2D** yang muncul di atas Canvas saat objek 3D dipilih (memastikan keterbacaan teks dan responsivitas).
3. **Skills:**
   - Panel overlay 2D yang muncul dengan animasi transisi yang mulus.
4. **Contact Form:**
   - Overlay HTML form bergaya cyber/retro terminal yang terhubung dengan API route Next.js.

## 5. Strategi Penanganan Fallback (Performance & Low-End Devices)
- **Deteksi Performa:** Menggunakan pengecekan hardware atau mendeteksi FPS awal (`detect-gpu`).
- **Tier Perangkat:**
  - **High-End:** Resolusi penuh, shadow dinamis, anti-aliasing, efek post-processing (bloom/glow neon).
  - **Low/Medium (Mobile):** Kualitas tekstur diturunkan, mematikan shadow, menonaktifkan bloom tebal.
  - **Fallback 2D:** Menyediakan tombol "Switch to 2D / Low Performance Mode" yang mematikan Canvas 3D sepenuhnya dan menggantinya dengan layout grid/kartu biasa berbasis Tailwind CSS.

## 6. Commands
```bash
# Setup
npm install

# Development
npm run dev

# Build
npm run build
npm run start
```

## 7. Project Structure
```text
src/
├── app/               # Next.js App Router (pages, layout, api)
├── components/
│   ├── 3d/            # Komponen React Three Fiber (Scene, Models, Camera Controls)
│   ├── ui/            # Komponen HTML 2D (Buttons, Modals, Overlay)
│   └── sections/      # Organisasi bagian halaman
├── hooks/             # Custom hooks (contoh: usePerformanceTier)
├── lib/               # Utilities, data proyek statis
├── public/
│   └── models/        # Aset 3D (.gltf, .glb) dan tekstur
└── styles/            # Global CSS (Tailwind)
```

## 8. Code Style
- **Pemisahan State:** Pisahkan state 3D (di dalam Canvas) dari UI luar (HTML). Gunakan pustaka manajemen state minimal (misal `zustand`) jika diperlukan komunikasi kompleks.
- **Konvensi Penamaan:** PascalCase untuk komponen UI/3D (`HeroScene.tsx`), camelCase untuk fungsi.

## 9. Boundaries
- **Always do:** Gunakan `<Suspense>` untuk proses *lazy loading* aset 3D (model, tekstur) dipadukan dengan layar *loading* (progress bar).
- **Ask first:** Mengimpor model 3D berukuran besar (>5MB) atau menambah pustaka baru yang mengubah arsitektur drastis.
- **Never do:** Memblokir interaksi pengguna saat memuat model 3D (harus asinkron).

## 10. Kriteria Kesuksesan (Success Criteria)
- Website berjalan tanpa jeda *stuttering* yang signifikan di desktop modern.
- Pengguna mobile tetap mendapatkan pengalaman yang baik, minimal lewat mekanisme fallback 2D yang cepat.
- Semua proyek web, mobile, dan riset keamanan dapat diakses maksimal dalam 2-3 kali klik dari posisi awal kamera.

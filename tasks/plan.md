# Implementation Plan: 3D Interactive Portfolio

## Overview
Membangun website portofolio 3D interaktif menggunakan Next.js, Tailwind CSS, dan React Three Fiber. Proyek ini menampilkan karya dalam bentuk objek 3D interaktif di ruang kerja (Hacker Room) bergaya cyberpunk, dengan standar performa dan batas ukuran aset yang ketat.

## Architecture Decisions
- **Framework:** Next.js App Router untuk struktur halaman dan optimasi bawaan.
- **3D Engine:** React Three Fiber (`@react-three/fiber`) dan Drei (`@react-three/drei`) untuk membangun dan mengontrol scene 3D secara deklaratif.
- **Styling:** Tailwind CSS dipadukan dengan komponen `shadcn/ui` untuk overlay HTML demi memastikan konsistensi desain dan aksesibilitas.
- **State Management:** Memisahkan state lokal komponen UI dengan state Canvas 3D.
- **Performance:** Menggunakan kompresi Draco untuk model GLTF/GLB dan `<Suspense>` untuk mencegah blocking render awal.

## Task List

### Phase 1: Foundation (Setup & Base 3D Canvas)
- [ ] Task 1: Inisialisasi proyek Next.js dengan Tailwind CSS & instalasi dependensi (R3F, Drei, Framer Motion).
- [ ] Task 2: Implementasi komponen Canvas 3D dasar dengan pencahayaan awal (Ambient & Directional Light).
- [ ] Task 3: Konfigurasi kontrol kamera dasar (`OrbitControls`) dengan batasan rotasi agar pengguna tidak tersesat.
- [ ] Task 4: Pembuatan komponen indikator loading (Loader/Fallback) saat memuat adegan 3D.

### Checkpoint: Foundation
- [ ] Aplikasi berjalan tanpa error, Canvas 3D tampil di layar dengan performa stabil 60FPS saat kosong.
- [ ] LCP awal < 2.5s.

### Phase 2: Assets & Interactions (Models & Overlay UI)
- [ ] Task 5: Memuat *placeholder* model 3D (sebelum aset asli siap) dengan kompresi yang benar (Draco).
- [ ] Task 6: Implementasi logika *raycasting* (klik pada objek 3D) untuk memicu interaksi.
- [ ] Task 7: Pembuatan komponen `ProjectCard` (HTML Overlay) menggunakan palet warna `shadcn/ui` dan animasi Framer Motion.
- [ ] Task 8: Menghubungkan klik objek 3D dengan kemunculan `ProjectCard` (transisi masuk/keluar halus).

### Checkpoint: Core Features
- [ ] Pengguna dapat memutar kamera dalam batas wajar.
- [ ] Mengklik objek 3D memunculkan overlay UI HTML.

### Phase 3: Forms & Optimization (Contact & Performance)
- [ ] Task 9: Pembuatan halaman/panel "Contact Form" yang terintegrasi (UI).
- [ ] Task 10: Integrasi pengiriman formulir kontak dengan API Routes.
- [ ] Task 11: Optimasi adegan 3D (penurunan kualitas material/shadow berdasarkan deteksi perangkat/performa).

### Checkpoint: Complete
- [ ] Target 60 FPS desktop / 30 FPS mobile terpenuhi.
- [ ] Ukuran total aset 3D ≤ 3MB.
- [ ] LCP ≤ 2500ms, CLS ≤ 0.1.

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Penurunan framerate di device *low-end* | High | Matikan *shadows*, gunakan material dasar tanpa kalkulasi cahaya rumit, sediakan mode statis 2D. |
| Ukuran bundle membengkak karena aset 3D | High | Paksa batas 3MB di pipeline, gunakan Draco/Meshopt, dan manfaatkan *lazy loading*. |
| Pengguna tersesat saat bernavigasi | Medium | Batasi sudut polar dan azimuth pada `OrbitControls`. Tambahkan tombol "Reset View". |

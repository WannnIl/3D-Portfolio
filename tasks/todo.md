# Project Tasks

## Checkpoint: Foundation
- [x] All tests pass
- [x] Application builds without errors
- [x] Canvas 3D renders with basic lighting and limited camera controls

## Phase 1: Foundation (Setup & Base 3D Canvas)

- [x] Task 1: Inisialisasi proyek Next.js dengan Tailwind CSS & instalasi dependensi
  - Acceptance: Folder Next.js terbentuk, dependencies R3F terpasang.
  - Verify: `npm run dev` berjalan.
  - Files: `package.json`, `next.config.js`, `tailwind.config.ts`.

- [x] Task 2: Implementasi komponen Canvas 3D dasar
  - Acceptance: Komponen React yang membungkus `<Canvas>` dari R3F, dengan ambient dan directional light.
  - Verify: Tidak ada error di konsol browser.
  - Files: `src/components/3d/Scene.tsx`, `src/app/page.tsx`.

- [x] Task 3: Konfigurasi kontrol kamera interaktif
  - Acceptance: Menggunakan `OrbitControls` dengan rotasi terbatas (min/max polar dan azimuth).
  - Verify: Pengguna dapat menggeser kamera namun tidak bisa melihat bawah meja / membalikkan kamera.
  - Files: `src/components/3d/Scene.tsx`.

- [x] Task 4: Pembuatan efek loader sederhana
  - Acceptance: Efek UI loader HTML saat aset `<Suspense>` sedang di-resolve.
  - Verify: Terlihat loading text/spinner sebelum 3D selesai dimuat.
  - Files: `src/components/ui/Loader.tsx`, `src/components/3d/Scene.tsx`.

## Checkpoint: Core Features
- [x] Object interactions trigger UI
- [x] Performance is stable

## Phase 2: Assets & Interactions

- [x] Task 5: Memuat placeholder model 3D
  - Acceptance: Menampilkan objek dasar (Box/Sphere) yang merepresentasikan meja / monitor.
  - Verify: Objek terlihat di canvas.
  - Files: `src/components/3d/DeskModel.tsx`.

- [x] Task 6: Implementasi logika interaksi objek
  - Acceptance: State terpilih saat objek diklik (mengubah state ID yang aktif).
  - Verify: Mengklik objek mencetak log atau mengubah warna objek.
  - Files: `src/components/3d/DeskModel.tsx`.

- [x] Task 7: Pembuatan komponen ProjectCard HTML
  - Acceptance: Komponen overlay UI berbasis Tailwind/shadcn yang memiliki animasi Framer Motion.
  - Verify: Card muncul dan dapat ditutup.
  - Files: `src/components/ui/ProjectCard.tsx`.

- [x] Task 8: Menghubungkan klik 3D ke ProjectCard
  - Acceptance: Menampilkan ProjectCard saat monitor 3D diklik.
  - Verify: End-to-end user click flow.
  - Files: `src/app/page.tsx`, `src/components/3d/Scene.tsx`.

## Checkpoint: Complete
- [ ] Core Web Vitals met
- [ ] 3D Asset sizes < 3MB

## Phase 3: Forms & Optimization

- [ ] Task 9: Pembuatan halaman/panel Contact Form
  - Acceptance: UI formulir (nama, email, pesan) konsisten dengan tema.
  - Verify: Form tervalidasi di client-side.
  - Files: `src/components/ui/ContactForm.tsx`.

- [ ] Task 10: Integrasi pengiriman formulir kontak dengan API Routes
  - Acceptance: Endpoint `/api/contact` menerima request POST.
  - Verify: Respons sukses 200.
  - Files: `src/app/api/contact/route.ts`.

- [ ] Task 11: Optimasi adegan 3D
  - Acceptance: Mematikan bayangan jika frame rate turun (atau berikan kontrol manual).
  - Verify: FPS mendekati target di device lambat.
  - Files: `src/components/3d/Scene.tsx`.

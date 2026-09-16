# Sistem Informasi Desa Wawasan

Website Resmi dan Sistem Informasi Desa (SID) Digital Desa Wawasan, Kecamatan Tanjung Sari, Kabupaten Lampung Selatan. Portal ini dibangun sebagai platform pelayanan mandiri masyarakat desa, keterbukaan informasi publik, transparansi APBDes, pemetaan potensi wilayah (WebGIS), serta tata kelola administrasi pemerintahan desa modern.

---

## 📋 Deskripsi

Sistem Informasi Desa Wawasan merupakan aplikasi berbasis web modern yang menggabungkan antarmuka publik informatif untuk masyarakat umum dengan sistem manajemen administrasi internal (*Back-Office*) berbasis peran (*Role-Based Access Control / RBAC*). Platform ini dirancang responsif dan cepat untuk mempermudah warga dalam mengakses layanan administrasi kependudukan serta mempromosikan potensi lokal desa.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend Core**: React 19, TypeScript
- **Build Tool & Bundler**: Vite 8
- **Styling**: Tailwind CSS v4, Vanilla CSS Design System Tokens
- **Routing**: React Router DOM (HashRouter untuk kompatibilitas penuh GitHub Pages)
- **Database & Backend Services**: Supabase (PostgreSQL, Real-time Subscriptions, Row Level Security)
- **Peta Digital & Geospasial**: Leaflet, React-Leaflet (WebGIS)
- **Visualisasi & Grafik**: Chart.js, React-Chartjs-2
- **Animasi & Interaktivitas**: Framer Motion, Canvas Confetti
- **Ikonografi**: Lucide React
- **Hosting & CI/CD**: GitHub Pages & GitHub Actions

---

## ✨ Fitur-Fitur Utama

### 1. Portal Publik (Warga & Pengunjung)
- **Beranda Interaktif**: Slider dinamis kegiatan desa, sambutan resmi Kepala Desa, sorotan berita & agenda desa terbaru.
- **Asisten Cerdas Wawasan AI**: Floating chatbot interaktif untuk konsultasi persyaratan surat, jam operasional kantor, serta FAQ desa.
- **Profil Desa & Aparatur**: Informasi sejarah, visi dan misi resmi desa, struktur aparatur pemerintahan desa, serta kepala dusun wilayah.
- **Layanan Surat Mandiri**: Pengajuan permohonan surat online (SKD, SKTM, SKU, SKBM, SKK, SKP) dengan upload berkas dan tracking status permohonan.
- **Verifikasi Surat Digital**: Validasi keaslian surat melalui pemindaian QR Code resmi desa (`/#/verifikasi-surat/:kode`).
- **Transparansi APBDes & Pembangunan**: Grafik visualisasi realisasi anggaran pendapatan, belanja, serta progres fisik program pembangunan desa.
- **Statistik Kependudukan Interaktif**: Analisis piramida usia, perbandingan jenis kelamin, dan demografi persebaran per dusun.
- **Peta Interaktif Desa (WebGIS)**: Pemetaan batas wilayah, fasilitas kantor, posyandu, tempat ibadah, sarana umum, dan sentra UMKM.
- **Katalog Potensi & UMKM Desa**: Direktori produk unggulan warga (kripik pisang, gula aren, kerajinan) terintegrasi ke WhatsApp pemilik usaha.
- **Berita & Agenda Desa**: Liputan kegiatan kemasyarakatan, pembangunan, dan pengumuman resmi desa.

### 2. Panel Administrasi (Back-Office SID)
- **Multi-Role RBAC**: Mendukung peran Super Admin, Kepala Desa, Sekretaris Desa, Kasi (Pemerintahan, Kesejahteraan, Pelayanan), Kaur (Keuangan, Perencanaan, TU & Umum), dan Kepala Dusun.
- **Manajemen Surat**: Disposisi, verifikasi berkas, persetujuan/penolakan permohonan surat lengkap dengan catatan revisi.
- **Kelola Berita & Konten**: Pembuatan, pengeditan, serta publikasi berita dan agenda desa.
- **Manajemen APBDes & Program**: Pembaruan pagu anggaran, realisasi serapan dana, dan persentase progres fisik di lapangan.
- **Kelola UMKM**: Pendaftaran dan verifikasi pelaku UMKM binaan desa.
- **Status Koneksi Supabase**: Diagnostics latensi dan ketersediaan tabel database secara langsung dari panel admin.

---

## 📁 Struktur Project

```text
kkn-desa-wawasan/
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD otomatis ke GitHub Pages
├── docs/
│   └── screenshots/              # Dokumentasi tangkapan layar website
├── public/
│   ├── images/                   # Asset gambar logo & foto perangkat desa
│   ├── favicon.svg               # Favicon website
│   └── icons.svg
├── src/
│   ├── components/               # Komponen UI modular
│   │   ├── ai/                   # Komponen Wawasan AI Chatbot
│   │   ├── charts/               # Grafik statistik kependudukan & APBDes
│   │   ├── home/                 # Komponen beranda & modal statistik
│   │   ├── layout/               # Navbar, Footer, AdminHeader, AdminSidebar
│   │   └── maps/                 # WebGIS Leaflet peta desa
│   ├── context/                  # State management (AuthContext & RBAC)
│   ├── layouts/                  # MainLayout (Publik) & AdminLayout (Internal)
│   ├── pages/
│   │   ├── admin/                # Halaman panel kontrol admin & verifikasi
│   │   ├── auth/                 # Login portal internal & warga
│   │   └── public/               # Beranda, Profil, Berita, Transparansi, Layanan Surat, dsb.
│   ├── routes/                   # Konfigurasi perutean aplikasi
│   ├── services/                 # Supabase client, Data service & Mock fallback
│   ├── types/                    # Definisi tipe TypeScript & skema database
│   ├── App.tsx                   # Root component dengan HashRouter
│   ├── index.css                 # Konfigurasi Tailwind CSS v4 & custom token
│   └── main.tsx                  # Entry point React
├── supabase/
│   ├── migrations/               # Skema DDL tabel Supabase PostgreSQL
│   └── seed.sql                  # Data awal (dusun, surat, APBDes, berita, UMKM)
├── .env.example                  # Contoh template variabel lingkungan
├── .gitignore                    # Konfigurasi file yang diabaikan Git
├── index.html                    # HTML root template
├── package.json                  # Konfigurasi dependencies & script NPM
├── tsconfig.json                 # Konfigurasi TypeScript
└── vite.config.ts                # Konfigurasi bundler Vite
```

---

## 🚀 Deployment

Website ini siap dideploy secara otomatis menggunakan **GitHub Pages** dan **GitHub Actions**:
1. Setiap commit yang di-*push* ke branch `main` akan secara otomatis memicu proses *checkout*, instalasi dependensi, kompilasi build produksi, dan publikasi ke GitHub Pages.
2. Routing aplikasi menggunakan `HashRouter` untuk menjamin seluruh rute internal (`/#/profil`, `/#/berita`, `/#/layanan-surat`, dsb.) tidak mengalami error 404 saat halaman dimuat ulang (*refresh*) di server statis GitHub Pages.
3. Base path Vite telah disesuaikan untuk format repositori: `/desa-wawasan/`.

URL Akses Production:
```text
https://USERNAME.github.io/desa-wawasan/
```

---

## 🗄️ Database & Backend

Sistem terintegrasi dengan **Supabase Database (PostgreSQL)** untuk penyimpanan data persisten:
- **Tabel Utama**: `dusun`, `rt`, `rw`, `profiles`, `keluarga`, `penduduk`, `jenis_surat`, `permohonan_surat`, `apbdes`, `program_desa`, `umkm`, `produk_umkm`, `berita`, `agenda`, dan `activity_logs`.
- **Hybrid Service Architecture**: Aplikasi memiliki mekanisme *resilient fallback* ke mock data lokal yang lengkap apabila koneksi internet atau variabel lingkungan database belum dihubungkan, sehingga seluruh alur demo UI tetap berjalan mulus.
- **Keamanan**: Kredensial *service_role* dan *secret key* database tidak pernah disertakan dalam repositori maupun aplikasi frontend. Hanya *public anon key* yang digunakan untuk otentikasi klien.

Template konfigurasi variabel lingkungan dapat dilihat pada file `.env.example`.

---

## 📸 Dokumentasi & Tangkapan Layar

Tangkapan layar dokumentasi antarmuka website disimpan dalam folder `docs/screenshots/`:

| Halaman / Fitur | File Screenshot |
|---|---|
| Beranda & Hero Section | `docs/screenshots/01-beranda.png` |
| Profil Desa & Visi Misi | `docs/screenshots/02-profil-desa.png` |
| Aparatur & Perangkat Desa | `docs/screenshots/03-perangkat-desa.png` |
| Layanan Pengajuan Surat Online | `docs/screenshots/04-layanan-surat.png` |
| Transparansi APBDes | `docs/screenshots/05-apbdes.png` |
| Peta WebGIS Desa Wawasan | `docs/screenshots/06-peta-desa.png` |
| Katalog Potensi UMKM | `docs/screenshots/07-potensi-umkm.png` |
| Panel Administrasi SID | `docs/screenshots/08-admin-panel.png` |

---

## 💻 Panduan Menjalankan Secara Lokal

1. **Clone repositori**:
   ```bash
   git clone https://github.com/USERNAME/desa-wawasan.git
   cd desa-wawasan
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Setup environment variable**:
   Salin file `.env.example` menjadi `.env` dan sesuaikan dengan proyek Supabase Anda:
   ```bash
   cp .env.example .env
   ```

4. **Jalankan server pengembangan**:
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:5173/`.

5. **Build produksi**:
   ```bash
   npm run build
   ```

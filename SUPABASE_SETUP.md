# Panduan Integrasi Supabase BaaS - Website SID Desa Wawasan

Dokumen ini menjelaskan langkah-langkah praktis untuk menghubungkan website **Sistem Informasi Desa (SID) Wawasan** ke layanan cloud **Supabase PostgreSQL & Auth BaaS**.

---

## 🚀 Langkah 1: Membuat Project Supabase Baru
1. Buka [https://supabase.com](https://supabase.com) dan buat akun/login.
2. Klik **New Project**, beri nama project (contoh: `sid-desa-wawasan`).
3. Tentukan Password Database dan pilih region terdekat (misal: `Singapore`).
4. Tunggu beberapa saat hingga database selesai disiapkan oleh Supabase.

---

## 🗄️ Langkah 2: Menjalankan SQL Migration & Seed Data
1. Pada menu navigasi kiri Supabase Dashboard, pilih menu **SQL Editor**.
2. Buka berkas `supabase/migrations/20260724_schema.sql` dari project ini, salin seluruh kodenya, lalu tempelkan ke SQL Editor dan klik **Run**.
   - Ini akan membuat seluruh tabel (`penduduk`, `permohonan_surat`, `apbdes`, `program_desa`, `berita`, `umkm`, dll), *Row Level Security (RLS)*, dan *Trigger* nomor surat otomatis.
3. Selanjutnya, buka berkas `supabase/seed.sql`, salin kodenya ke SQL Editor Supabase, lalu klik **Run**.
   - Ini akan mengisi data awal 4 Dusun, jenis-jenis surat desa, anggaran APBDes 2026, berita awal, dan daftar UMKM desa.

---

## 🔑 Langkah 3: Menghubungkan API Key ke File `.env`
1. Buka menu **Project Settings** > **API** di Supabase Dashboard.
2. Salin nilai:
   - **Project URL** (contoh: `https://xxxx.supabase.co`)
   - **anon / public Key** (API Key publik)
3. Buka file `.env` di folder utama website ini dan perbarui nilainya:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Simpan file `.env` dan restart dev server jika sedang berjalan (`npm run dev`).

---

## 🧪 Langkah 4: Uji Koneksi
1. Buka website SID Desa Wawasan dan masuk ke halaman **Admin > Pengaturan Sistem**.
2. Pada panel **Status Supabase Cloud BaaS**, klik tombol **"Uji Koneksi Supabase"**.
3. Jika konfigurasi benar, indikator akan berubah menjadi **Supabase Active** (Hijau) beserta laporan waktu respon (*latency*) dalam milidetik.

---

## 🛡️ Fitur Fallback Otomatis
Jika URL atau Anon Key Supabase belum diisi atau server sedang offline:
- Sistem akan secara otomatis beralih ke mode **Fallback / Local Cache**.
- Aplikasi tetap berfungsi 100% normal tanpa error menggunakan *localStorage* sehingga aman untuk demonstrasi offline maupun pengembangan lokal.

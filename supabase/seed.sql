-- =================================================================
-- SEED DATA DESA WAWASAN, KECAMATAN TANJUNG SARI, LAMPUNG SELATAN
-- =================================================================

-- 1. SEED DUSUN
INSERT INTO dusun (id, nama_dusun, kepala_dusun_nama, kontak_kadus, luas_wilayah_ha) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Dusun Asri Jaya', 'Krisna Abi Pratama', '081277889901', 120.5),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Dusun Budi Jaya', 'Wahyudi', '081277889902', 98.2),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Dusun Cinta Jaya', 'Ashar Sodik', '081277889903', 145.0),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'Dusun Damai Jaya', 'Harsono', '081277889904', 110.8)
ON CONFLICT DO NOTHING;

-- 2. SEED JENIS SURAT
INSERT INTO jenis_surat (kode_surat, nama_surat, deskripsi, persyaratan) VALUES
  ('SKD', 'Surat Keterangan Domisili', 'Surat keterangan bukti tempat tinggal resmi warga di Desa Wawasan', ARRAY['Fotocopy KTP', 'Fotocopy KK', 'Surat Pengantar RT/RW']),
  ('SKTM', 'Surat Keterangan Tidak Mampu', 'Surat keterangan untuk pengajuan bantuan sekolah/beasiswa/kesehatan', ARRAY['Fotocopy KTP', 'Fotocopy KK', 'Surat Pernyataan Tidak Mampu Matrai 10.000']),
  ('SKU', 'Surat Keterangan Usaha', 'Surat legalitas usaha mikro/kecil masyarakat desa untuk bank/izin', ARRAY['Fotocopy KTP', 'Fotocopy KK', 'Foto Tempat Usaha']),
  ('SKBM', 'Surat Belum Menikah', 'Surat keterangan status pernikahan untuk keperluan pekerjaan/pernikahan', ARRAY['Fotocopy KTP Pemohon', 'Fotocopy KK', 'Pernyataan Belum Menikah']),
  ('SKK', 'Surat Keterangan Kematian', 'Surat pelaporan peristiwa kematian warga', ARRAY['Fotocopy KTP Almarhum/ah', 'Fotocopy KK', 'Surat Keterangan RS/Puskesmas']),
  ('SKP', 'Surat Pengantar Pindah/Datang', 'Surat pengantar mutasi kependudukan keluar/masuk desa', ARRAY['Fotocopy KTP', 'KK Asli', 'Pass Foto 3x4'])
ON CONFLICT DO NOTHING;

-- 3. SEED APBDES 2025
INSERT INTO apbdes (tahun_anggaran, kategori, rincian_akun, jumlah_anggaran, jumlah_realisasi) VALUES
  (2025, 'pendapatan', 'Dana Desa (APBN)', 820000000.00, 410000000.00),
  (2025, 'pendapatan', 'Alokasi Dana Desa (ADD Kab. Lampung Selatan)', 465000000.00, 465000000.00),
  (2025, 'pendapatan', 'Bagi Hasil Pajak & Retribusi Daerah', 47276616.00, 47276616.00),
  (2025, 'belanja', 'Bidang Penyelenggaraan Pemerintahan Desa', 398040159.48, 284120000.00),
  (2025, 'belanja', 'Bidang Pelaksanaan Pembangunan Desa (Infrastruktur & Jalan)', 545000000.00, 389026220.00),
  (2025, 'belanja', 'Bidang Pembinaan Kemasyarakatan Desa', 106000000.00, 75660000.00),
  (2025, 'belanja', 'Bidang Pemberdayaan Masyarakat (Tani & UMKM)', 163000000.00, 116420000.00),
  (2025, 'pembiayaan', 'Penerimaan Pembiayaan (SILPA)', 45000000.00, 45000000.00)
ON CONFLICT DO NOTHING;

-- 4. SEED PROGRAM DESA
INSERT INTO program_desa (nama_program, lokasi, anggaran, sumber_dana, persentase_progres, status) VALUES
  ('Pavingisasi Jalan Usaha Tani Dusun Cinta Jaya', 'Dusun Cinta Jaya', 185000000.00, 'Dana Desa 2025', 85, 'Sedang Berjalan'),
  ('Pembangunan Gedung Posyandu & Balai RT 02', 'Dusun Asri Jaya', 120000000.00, 'ADD 2025', 100, 'Selesai'),
  ('Digitalisasi SID & Sarana Balai Desa', 'Balai Desa Wawasan', 45000000.00, 'Dana Desa 2025', 90, 'Sedang Berjalan'),
  ('Pelatihan UMKM Kripik Pisang & Digital Marketing', 'Gedung Serbaguna Desa', 25000000.00, 'Dana Desa 2025', 60, 'Sedang Berjalan');

-- 5. SEED KATEGORI & BERITA
INSERT INTO kategori_berita (id, nama_kategori, slug) VALUES
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Pemerintahan', 'pemerintahan'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Pembangunan', 'pembangunan'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Pemberdayaan', 'pemberdayaan'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'Kegiatan Warga', 'kegiatan-warga');

INSERT INTO berita (judul, slug, konten, kategori_id, is_published, views_count) VALUES
  (
    'Peluncuran Sistem Informasi Desa (SID) Wawasan Berbasis Serverless Modern',
    'peluncuran-sistem-informasi-desa-wawasan-berbasis-serverless-modern',
    'Pemerintah Desa Wawasan, Kecamatan Tanjung Sari, Kabupaten Lampung Selatan bersama Tim Mahasiswa KKN secara resmi meluncurkan Portal Website Informasi Desa Wawasan modern. Portal ini mengintegrasikan layanan surat online mandiri, transparansi anggaran APBDes, serta peta digital potensi UMKM dan pertanian desa.',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    true,
    342
  ),
  (
    'Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) Tahun 2026 Selesai Dilaksanakan',
    'musyawarah-perencanaan-pembangunan-desa-musrenbangdes-tahun-2026',
    'Kepala Desa Wawasan bersama BPD dan Tokoh Masyarakat sukses menggelar Musrenbangdes 2026. Fokus prioritas pembangunan disepakati pada perbaikan drainase, perluasan penerangan jalan desa, serta penguatan BUMDes bidang pengolahan hasil pertanian.',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    true,
    189
  ),
  (
    'BUMDes Wawasan Jaya Buka Pelatihan Pemasaran Digital bagi Pelaku UMKM Kripik & Kerajinan',
    'bumdes-wawasan-jaya-buka-pelatihan-pemasaran-digital-bagi-pelaku-umkm',
    'Dalam rangka meningkatkan taraf ekonomi warga, BUMDes Wawasan Jaya memberikan pendampingan pendaftaran Sertifikasi Halal gratis dan pembuatan kemasan modern bagi produk unggulan kripik pisang dan gula aren lokal.',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    true,
    275
  );

-- 6. SEED AGENDA DESA
INSERT INTO agenda (judul_kegiatan, tanggal_kegiatan, waktu_mulai, lokasi, penyelenggara, keterangan) VALUES
  ('Posyandu Balita & Lansia Dusun Asri Jaya', '2026-08-05', '08:00:00', 'Posyandu Mawar Dusun Asri Jaya', 'Kader Posyandu & Puskesmas', 'Imunisasi gratis, penimbangan balita, dan pemberian makanan tambahan.'),
  ('Gotong Royong Bersih Saluran Air', '2026-08-10', '07:00:00', 'Sepanjang Jalan Utama Desa', 'Karang Taruna & Warga RT 01-04', 'Membawa cangkul dan arit pribadi.'),
  ('Pengajian Rutin Jumat Kliwon', '2026-08-14', '19:30:00', 'Masjid Al-Barokah Desa Wawasan', 'Majelis Taklim Desa', 'Penceramah: Ustadz Ahmad Fauzi, S.Pd.I');

-- 7. SEED UMKM DESA
INSERT INTO umkm (nama_usaha, pemilik_nama, kategori_usaha, no_hp, deskripsi, alamat_usaha) VALUES
  ('Kripik Pisang Renyah Mas Agus', 'Agus Susanto', 'Makanan & Minuman', '085311223344', 'Produsen kripik pisang renyah aneka rasa (Cokelat, Keju, Balado) khas Tanjung Sari', 'Dusun Asri Jaya RT 02 / RW 01'),
  ('Gula Aren Asli Pak Karyo', 'Karyono', 'Pertanian & Olahan', '085355667788', 'Gula aren organik murni tanpa cetakan bahan kimia buatan', 'Dusun Damai Jaya RT 01 / RW 02'),
  ('Kerajinan Bambu Wawasan Creative', 'Siti Rahmawati', 'Kerajinan Tangan', '085399001122', 'Kreativitas anyaman bambu untuk tempat lampu, tas, dan perabotan ramah lingkungan', 'Dusun Budi Jaya RT 03 / RW 01');

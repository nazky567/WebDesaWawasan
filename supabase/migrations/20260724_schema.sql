-- =================================================================
-- SKEMA DATABASE POSTGRESQL SUPABASE - SID DESA WAWASAN
-- Kecamatan Tanjung Sari, Kabupaten Lampung Selatan
-- =================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ENUMS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM (
      'super_admin', 'kepala_desa', 'sekretaris_desa', 
      'kasi_pemerintahan', 'kasi_pelayanan', 'kasi_kesejahteraan', 
      'kepala_dusun', 'warga'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE jenis_kelamin AS ENUM ('L', 'P');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE status_perkawinan AS ENUM ('belum_menikah', 'menikah', 'cerai_hidup', 'cerai_mati');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE status_surat AS ENUM ('pending', 'diverifikasi', 'disetujui', 'ditolak', 'selesai');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE kategori_apbdes AS ENUM ('pendapatan', 'belanja', 'pembiayaan');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 1. TABEL WILAYAH (DUSUN, RT, RW)
CREATE TABLE IF NOT EXISTS dusun (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama_dusun VARCHAR(100) NOT NULL,
  kepala_dusun_nama VARCHAR(150),
  kontak_kadus VARCHAR(20),
  luas_wilayah_ha NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rt (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dusun_id UUID REFERENCES dusun(id) ON DELETE CASCADE,
  nomor_rt VARCHAR(10) NOT NULL,
  ketua_rt VARCHAR(150),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rw (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dusun_id UUID REFERENCES dusun(id) ON DELETE CASCADE,
  nomor_rw VARCHAR(10) NOT NULL,
  ketua_rw VARCHAR(150),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABEL PROFILES (SINKRON DENGAN SUPABASE AUTH)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nik VARCHAR(16) UNIQUE,
  nama_lengkap VARCHAR(150) NOT NULL,
  email VARCHAR(150),
  no_hp VARCHAR(20),
  role user_role DEFAULT 'warga',
  dusun_id UUID REFERENCES dusun(id) ON DELETE SET NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL KEPENDUDUKAN & KELUARGA
CREATE TABLE IF NOT EXISTS keluarga (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  no_kk VARCHAR(16) UNIQUE NOT NULL,
  kepala_keluarga_nama VARCHAR(150) NOT NULL,
  alamat_lengkap TEXT NOT NULL,
  dusun_id UUID REFERENCES dusun(id),
  rt_id UUID REFERENCES rt(id),
  rw_id UUID REFERENCES rw(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS penduduk (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nik VARCHAR(16) UNIQUE NOT NULL,
  no_kk VARCHAR(16) REFERENCES keluarga(no_kk) ON DELETE SET NULL,
  nama_lengkap VARCHAR(150) NOT NULL,
  tempat_lahir VARCHAR(100) NOT NULL,
  tanggal_lahir DATE NOT NULL,
  jenis_kelamin jenis_kelamin NOT NULL,
  agama VARCHAR(50) NOT NULL,
  pendidikan_terakhir VARCHAR(100),
  pekerjaan VARCHAR(100),
  status_perkawinan status_perkawinan NOT NULL,
  status_hubungan_keluarga VARCHAR(50) NOT NULL,
  golongan_darah VARCHAR(5),
  is_disabilitas BOOLEAN DEFAULT FALSE,
  is_penerima_bansos BOOLEAN DEFAULT FALSE,
  is_miskin BOOLEAN DEFAULT FALSE,
  dusun_id UUID REFERENCES dusun(id),
  rt_id UUID REFERENCES rt(id),
  rw_id UUID REFERENCES rw(id),
  alamat_detail TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PERISTIWA DAN MUTASI
CREATE TABLE IF NOT EXISTS kelahiran (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  penduduk_id UUID REFERENCES penduduk(id) ON DELETE CASCADE,
  nama_bayi VARCHAR(150) NOT NULL,
  tanggal_lahir TIMESTAMPTZ NOT NULL,
  nama_ayah VARCHAR(150),
  nama_ibu VARCHAR(150),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS kematian (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  penduduk_id UUID REFERENCES penduduk(id) ON DELETE CASCADE,
  tanggal_wafat DATE NOT NULL,
  sebab_kematian TEXT,
  tempat_wafat VARCHAR(150),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SURAT DAN PERSYARATAN
CREATE TABLE IF NOT EXISTS jenis_surat (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kode_surat VARCHAR(20) UNIQUE NOT NULL,
  nama_surat VARCHAR(150) NOT NULL,
  deskripsi TEXT,
  persyaratan TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS permohonan_surat (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nomor_surat VARCHAR(100) UNIQUE,
  jenis_surat_id UUID REFERENCES jenis_surat(id),
  pemohon_nik VARCHAR(16) REFERENCES penduduk(nik),
  pemohon_nama VARCHAR(150) NOT NULL,
  keperluan TEXT NOT NULL,
  berkas_persyaratan_urls TEXT[],
  status status_surat DEFAULT 'pending',
  catatan_revisi TEXT,
  file_surat_pdf_url TEXT,
  qr_code_hash VARCHAR(255) UNIQUE,
  disetujui_oleh UUID REFERENCES profiles(id),
  tanggal_pengajuan TIMESTAMPTZ DEFAULT NOW(),
  tanggal_disetujui TIMESTAMPTZ
);

-- 6. TRANSPARANSI APBDES & PROGRAM
CREATE TABLE IF NOT EXISTS apbdes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tahun_anggaran INT NOT NULL,
  kategori kategori_apbdes NOT NULL,
  rincian_akun VARCHAR(200) NOT NULL,
  jumlah_anggaran NUMERIC(15,2) NOT NULL,
  jumlah_realisasi NUMERIC(15,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS program_desa (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama_program VARCHAR(200) NOT NULL,
  lokasi VARCHAR(200),
  anggaran NUMERIC(15,2) NOT NULL,
  sumber_dana VARCHAR(100) NOT NULL,
  persentase_progres INT DEFAULT 0,
  foto_kegiatan_urls TEXT[],
  status VARCHAR(50) DEFAULT 'Berjalan',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. UMKM & POTENSI DESA
CREATE TABLE IF NOT EXISTS umkm (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama_usaha VARCHAR(150) NOT NULL,
  pemilik_nama VARCHAR(150) NOT NULL,
  kategori_usaha VARCHAR(100) NOT NULL,
  no_hp VARCHAR(20),
  deskripsi TEXT,
  alamat_usaha TEXT,
  foto_usaha_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS produk_umkm (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  umkm_id UUID REFERENCES umkm(id) ON DELETE CASCADE,
  nama_produk VARCHAR(150) NOT NULL,
  harga NUMERIC(12,2) NOT NULL,
  foto_produk_url TEXT,
  deskripsi TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PUBLIKASI & AUDIT LOGS
CREATE TABLE IF NOT EXISTS kategori_berita (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama_kategori VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS berita (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  judul VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  konten TEXT NOT NULL,
  thumbnail_url TEXT,
  kategori_id UUID REFERENCES kategori_berita(id),
  author_id UUID REFERENCES profiles(id),
  is_published BOOLEAN DEFAULT TRUE,
  views_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS agenda (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  judul_kegiatan VARCHAR(200) NOT NULL,
  tanggal_kegiatan DATE NOT NULL,
  waktu_mulai TIME NOT NULL,
  lokasi VARCHAR(200) NOT NULL,
  penyelenggara VARCHAR(100) NOT NULL,
  keterangan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  description TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TRIGGER GENERATE SURAT METADATA
CREATE OR REPLACE FUNCTION generate_surat_metadata_fn()
RETURNS TRIGGER AS $$
DECLARE
  seq_num INT;
  year_str TEXT;
BEGIN
  year_str := TO_CHAR(NOW(), 'YYYY');
  SELECT COUNT(*) + 1 INTO seq_num FROM permohonan_surat WHERE TO_CHAR(tanggal_pengajuan, 'YYYY') = year_str;
  
  IF NEW.nomor_surat IS NULL THEN
    NEW.nomor_surat := '470/' || LPAD(seq_num::TEXT, 3, '0') || '/DS-WWS/' || year_str;
  END IF;
  
  IF NEW.qr_code_hash IS NULL THEN
    NEW.qr_code_hash := encode(digest(NEW.nomor_surat || NOW()::TEXT || NEW.pemohon_nik, 'sha256'), 'hex');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_surat_metadata ON permohonan_surat;
CREATE TRIGGER trigger_surat_metadata
BEFORE INSERT OR UPDATE OF status ON permohonan_surat
FOR EACH ROW
WHEN (NEW.status = 'disetujui')
EXECUTE PROCEDURE generate_surat_metadata_fn();

-- ENABLE RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE penduduk ENABLE ROW LEVEL SECURITY;
ALTER TABLE permohonan_surat ENABLE ROW LEVEL SECURITY;
ALTER TABLE apbdes ENABLE ROW LEVEL SECURITY;
ALTER TABLE berita ENABLE ROW LEVEL SECURITY;

-- BASIC POLICIES
CREATE POLICY "Public profiles reading" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public read berita" ON berita FOR SELECT USING (is_published = true);
CREATE POLICY "Public read apbdes" ON apbdes FOR SELECT USING (true);

CREATE POLICY "Warga read own surat" ON permohonan_surat FOR SELECT USING (
  pemohon_nik = (SELECT nik FROM profiles WHERE id = auth.uid()) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'kepala_desa', 'sekretaris_desa', 'kasi_pelayanan'))
);

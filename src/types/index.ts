export type UserRole =
  | 'super_admin'
  | 'kepala_desa'
  | 'sekretaris_desa'
  | 'kasi_pemerintahan'
  | 'kasi_pelayanan'
  | 'kasi_kesejahteraan'
  | 'kaur_keuangan'
  | 'kaur_perencanaan'
  | 'kaur_tu_umum'
  | 'kepala_dusun'
  | 'warga';

export type StatusSurat = 'pending' | 'diverifikasi' | 'disetujui' | 'ditolak' | 'selesai';

export type JenisKelamin = 'L' | 'P';

export type StatusPerkawinan = 'belum_menikah' | 'menikah' | 'cerai_hidup' | 'cerai_mati';

export type KategoriAPBDes = 'pendapatan' | 'belanja' | 'pembiayaan';

export interface UserProfile {
  id: string;
  nik?: string;
  nama_lengkap: string;
  email?: string;
  no_hp?: string;
  role: UserRole;
  dusun_id?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Dusun {
  id: string;
  nama_dusun: string;
  kepala_dusun_nama?: string;
  kontak_kadus?: string;
  luas_wilayah_ha?: number;
  created_at?: string;
}

export interface Penduduk {
  id: string;
  nik: string;
  no_kk?: string;
  nama_lengkap: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: JenisKelamin;
  agama: string;
  pendidikan_terakhir?: string;
  pekerjaan?: string;
  status_perkawinan: StatusPerkawinan;
  status_hubungan_keluarga: string;
  golongan_darah?: string;
  is_disabilitas: boolean;
  is_penerima_bansos: boolean;
  is_miskin: boolean;
  dusun_id?: string;
  rt_id?: string;
  rw_id?: string;
  alamat_detail?: string;
  created_at?: string;
}

export interface PermohonanSurat {
  id: string;
  nomor_surat?: string;
  jenis_surat_id: string;
  pemohon_nik: string;
  pemohon_nama: string;
  keperluan: string;
  berkas_persyaratan_urls?: string[];
  status: StatusSurat;
  catatan_revisi?: string;
  file_surat_pdf_url?: string;
  qr_code_hash?: string;
  disetujui_oleh?: string;
  tanggal_pengajuan: string;
  tanggal_disetujui?: string;
  jenis_surat?: JenisSurat;
}

export interface JenisSurat {
  id: string;
  kode_surat: string;
  nama_surat: string;
  deskripsi: string;
  persyaratan: string[];
}

export interface APBDesItem {
  id: string;
  tahun_anggaran: number;
  kategori: KategoriAPBDes;
  rincian_akun: string;
  jumlah_anggaran: number;
  jumlah_realisasi: number;
}

export interface ProgramDesa {
  id: string;
  nama_program: string;
  lokasi: string;
  anggaran: number;
  sumber_dana: string;
  persentase_progres: number;
  status: string;
}

export interface BeritaItem {
  id: string;
  judul: string;
  slug: string;
  konten: string;
  thumbnail_url?: string;
  kategori_id?: string;
  author_id?: string;
  is_published: boolean;
  views_count: number;
  created_at: string;
  kategori_berita?: {
    nama_kategori: string;
  };
}

export interface AgendaItem {
  id: string;
  judul_kegiatan: string;
  tanggal_kegiatan: string;
  waktu_mulai: string;
  lokasi: string;
  penyelenggara: string;
  keterangan?: string;
}

export interface UMKMItem {
  id: string;
  nama_usaha: string;
  pemilik_nama: string;
  kategori_usaha: string;
  no_hp?: string;
  deskripsi?: string;
  alamat_usaha?: string;
  foto_usaha_url?: string;
}

export interface VillageMarker {
  id: string;
  name: string;
  category: 'Balai Desa' | 'Sekolah' | 'Masjid' | 'Posyandu' | 'BUMDes' | 'Pertanian' | 'UMKM' | 'Wisata';
  lat: number;
  lng: number;
  description: string;
}

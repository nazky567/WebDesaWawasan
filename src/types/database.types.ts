export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

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

export type JenisKelamin = 'L' | 'P';
export type StatusPerkawinan = 'belum_menikah' | 'menikah' | 'cerai_hidup' | 'cerai_mati';
export type StatusSurat = 'pending' | 'diverifikasi' | 'disetujui' | 'ditolak' | 'selesai';
export type KategoriAPBDes = 'pendapatan' | 'belanja' | 'pembiayaan';

export interface Database {
  public: {
    Tables: {
      dusun: {
        Row: {
          id: string
          nama_dusun: string
          kepala_dusun_nama: string | null
          kontak_kadus: string | null
          luas_wilayah_ha: number | null
          created_at: string
        }
        Insert: {
          id?: string
          nama_dusun: string
          kepala_dusun_nama?: string | null
          kontak_kadus?: string | null
          luas_wilayah_ha?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          nama_dusun?: string
          kepala_dusun_nama?: string | null
          kontak_kadus?: string | null
          luas_wilayah_ha?: number | null
          created_at?: string
        }
      }
      rt: {
        Row: {
          id: string
          dusun_id: string | null
          nomor_rt: string
          ketua_rt: string | null
          created_at: string
        }
        Insert: {
          id?: string
          dusun_id?: string | null
          nomor_rt: string
          ketua_rt?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          dusun_id?: string | null
          nomor_rt?: string
          ketua_rt?: string | null
          created_at?: string
        }
      }
      rw: {
        Row: {
          id: string
          dusun_id: string | null
          nomor_rw: string
          ketua_rw: string | null
          created_at: string
        }
        Insert: {
          id?: string
          dusun_id?: string | null
          nomor_rw: string
          ketua_rw?: string | null
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          nik: string | null
          nama_lengkap: string
          email: string | null
          no_hp: string | null
          role: UserRole
          dusun_id: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          nik?: string | null
          nama_lengkap: string
          email?: string | null
          no_hp?: string | null
          role?: UserRole
          dusun_id?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nik?: string | null
          nama_lengkap?: string
          email?: string | null
          no_hp?: string | null
          role?: UserRole
          dusun_id?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      keluarga: {
        Row: {
          id: string
          no_kk: string
          kepala_keluarga_nama: string
          alamat_lengkap: string
          dusun_id: string | null
          rt_id: string | null
          rw_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          no_kk: string
          kepala_keluarga_nama: string
          alamat_lengkap: string
          dusun_id?: string | null
          rt_id?: string | null
          rw_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          no_kk?: string
          kepala_keluarga_nama?: string
          alamat_lengkap?: string
          dusun_id?: string | null
          rt_id?: string | null
          rw_id?: string | null
          created_at?: string
        }
      }
      penduduk: {
        Row: {
          id: string
          nik: string
          no_kk: string | null
          nama_lengkap: string
          tempat_lahir: string
          tanggal_lahir: string
          jenis_kelamin: JenisKelamin
          agama: string
          pendidikan_terakhir: string | null
          pekerjaan: string | null
          status_perkawinan: StatusPerkawinan
          status_hubungan_keluarga: string
          golongan_darah: string | null
          is_disabilitas: boolean
          is_penerima_bansos: boolean
          is_miskin: boolean
          dusun_id: string | null
          rt_id: string | null
          rw_id: string | null
          alamat_detail: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nik: string
          no_kk?: string | null
          nama_lengkap: string
          tempat_lahir: string
          tanggal_lahir: string
          jenis_kelamin: JenisKelamin
          agama: string
          pendidikan_terakhir?: string | null
          pekerjaan?: string | null
          status_perkawinan: StatusPerkawinan
          status_hubungan_keluarga: string
          golongan_darah?: string | null
          is_disabilitas?: boolean
          is_penerima_bansos?: boolean
          is_miskin?: boolean
          dusun_id?: string | null
          rt_id?: string | null
          rw_id?: string | null
          alamat_detail?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nik?: string
          no_kk?: string | null
          nama_lengkap?: string
          tempat_lahir?: string
          tanggal_lahir?: string
          jenis_kelamin?: JenisKelamin
          agama?: string
          pendidikan_terakhir?: string | null
          pekerjaan?: string | null
          status_perkawinan?: StatusPerkawinan
          status_hubungan_keluarga?: string
          golongan_darah?: string | null
          is_disabilitas?: boolean
          is_penerima_bansos?: boolean
          is_miskin?: boolean
          dusun_id?: string | null
          rt_id?: string | null
          rw_id?: string | null
          alamat_detail?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      jenis_surat: {
        Row: {
          id: string
          kode_surat: string
          nama_surat: string
          deskripsi: string | null
          persyaratan: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          kode_surat: string
          nama_surat: string
          deskripsi?: string | null
          persyaratan?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          kode_surat?: string
          nama_surat?: string
          deskripsi?: string | null
          persyaratan?: string[] | null
          created_at?: string
        }
      }
      permohonan_surat: {
        Row: {
          id: string
          nomor_surat: string | null
          jenis_surat_id: string | null
          pemohon_nik: string
          pemohon_nama: string
          keperluan: string
          berkas_persyaratan_urls: string[] | null
          status: StatusSurat
          catatan_revisi: string | null
          file_surat_pdf_url: string | null
          qr_code_hash: string | null
          disetujui_oleh: string | null
          tanggal_pengajuan: string
          tanggal_disetujui: string | null
        }
        Insert: {
          id?: string
          nomor_surat?: string | null
          jenis_surat_id?: string | null
          pemohon_nik: string
          pemohon_nama: string
          keperluan: string
          berkas_persyaratan_urls?: string[] | null
          status?: StatusSurat
          catatan_revisi?: string | null
          file_surat_pdf_url?: string | null
          qr_code_hash?: string | null
          disetujui_oleh?: string | null
          tanggal_pengajuan?: string
          tanggal_disetujui?: string | null
        }
        Update: {
          id?: string
          nomor_surat?: string | null
          jenis_surat_id?: string | null
          pemohon_nik?: string
          pemohon_nama?: string
          keperluan?: string
          berkas_persyaratan_urls?: string[] | null
          status?: StatusSurat
          catatan_revisi?: string | null
          file_surat_pdf_url?: string | null
          qr_code_hash?: string | null
          disetujui_oleh?: string | null
          tanggal_pengajuan?: string
          tanggal_disetujui?: string | null
        }
      }
      apbdes: {
        Row: {
          id: string
          tahun_anggaran: number
          kategori: KategoriAPBDes
          rincian_akun: string
          jumlah_anggaran: number
          jumlah_realisasi: number
          created_at: string
        }
        Insert: {
          id?: string
          tahun_anggaran: number
          kategori: KategoriAPBDes
          rincian_akun: string
          jumlah_anggaran: number
          jumlah_realisasi?: number
          created_at?: string
        }
        Update: {
          id?: string
          tahun_anggaran?: number
          kategori?: KategoriAPBDes
          rincian_akun?: string
          jumlah_anggaran?: number
          jumlah_realisasi?: number
          created_at?: string
        }
      }
      program_desa: {
        Row: {
          id: string
          nama_program: string
          lokasi: string | null
          anggaran: number
          sumber_dana: string
          persentase_progres: number
          foto_kegiatan_urls: string[] | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          nama_program: string
          lokasi?: string | null
          anggaran: number
          sumber_dana: string
          persentase_progres?: number
          foto_kegiatan_urls?: string[] | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          nama_program?: string
          lokasi?: string | null
          anggaran?: number
          sumber_dana?: string
          persentase_progres?: number
          foto_kegiatan_urls?: string[] | null
          status?: string
          created_at?: string
        }
      }
      umkm: {
        Row: {
          id: string
          nama_usaha: string
          pemilik_nama: string
          kategori_usaha: string
          no_hp: string | null
          deskripsi: string | null
          alamat_usaha: string | null
          foto_usaha_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          nama_usaha: string
          pemilik_nama: string
          kategori_usaha: string
          no_hp?: string | null
          deskripsi?: string | null
          alamat_usaha?: string | null
          foto_usaha_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          nama_usaha?: string
          pemilik_nama?: string
          kategori_usaha?: string
          no_hp?: string | null
          deskripsi?: string | null
          alamat_usaha?: string | null
          foto_usaha_url?: string | null
          created_at?: string
        }
      }
      kategori_berita: {
        Row: {
          id: string
          nama_kategori: string
          slug: string
        }
        Insert: {
          id?: string
          nama_kategori: string
          slug: string
        }
        Update: {
          id?: string
          nama_kategori?: string
          slug?: string
        }
      }
      berita: {
        Row: {
          id: string
          judul: string
          slug: string
          konten: string
          thumbnail_url: string | null
          kategori_id: string | null
          author_id: string | null
          is_published: boolean
          views_count: number
          created_at: string
        }
        Insert: {
          id?: string
          judul: string
          slug: string
          konten: string
          thumbnail_url?: string | null
          kategori_id?: string | null
          author_id?: string | null
          is_published?: boolean
          views_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          judul?: string
          slug?: string
          konten?: string
          thumbnail_url?: string | null
          kategori_id?: string | null
          author_id?: string | null
          is_published?: boolean
          views_count?: number
          created_at?: string
        }
      }
      agenda: {
        Row: {
          id: string
          judul_kegiatan: string
          tanggal_kegiatan: string
          waktu_mulai: string
          lokasi: string
          penyelenggara: string
          keterangan: string | null
          created_at: string
        }
        Insert: {
          id?: string
          judul_kegiatan: string
          tanggal_kegiatan: string
          waktu_mulai: string
          lokasi: string
          penyelenggara: string
          keterangan?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          judul_kegiatan?: string
          tanggal_kegiatan?: string
          waktu_mulai?: string
          lokasi?: string
          penyelenggara?: string
          keterangan?: string | null
          created_at?: string
        }
      }
    }
  }
}

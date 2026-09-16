import type { 
  Penduduk, PermohonanSurat, APBDesItem, ProgramDesa, 
  BeritaItem, AgendaItem, UMKMItem, VillageMarker, JenisSurat, Dusun
} from '../types';

export const INITIAL_DUSUN: Dusun[] = [
  { id: 'dusun-1', nama_dusun: 'Dusun Asri Jaya', kepala_dusun_nama: 'Krisna Abi Pratama', kontak_kadus: '081277889901', luas_wilayah_ha: 120.5 },
  { id: 'dusun-2', nama_dusun: 'Dusun Budi Jaya', kepala_dusun_nama: 'Wahyudi', kontak_kadus: '081277889902', luas_wilayah_ha: 98.2 },
  { id: 'dusun-3', nama_dusun: 'Dusun Cinta Jaya', kepala_dusun_nama: 'Ashar Sodik', kontak_kadus: '081277889903', luas_wilayah_ha: 145.0 },
  { id: 'dusun-4', nama_dusun: 'Dusun Damai Jaya', kepala_dusun_nama: 'Harsono', kontak_kadus: '081277889904', luas_wilayah_ha: 110.8 },
];

export const INITIAL_JENIS_SURAT: JenisSurat[] = [
  {
    id: 'js-1',
    kode_surat: 'SKD',
    nama_surat: 'Surat Keterangan Domisili',
    deskripsi: 'Surat keterangan bukti tempat tinggal resmi warga di Desa Wawasan',
    persyaratan: ['Fotocopy KTP Pemohon', 'Fotocopy Kartu Keluarga (KK)', 'Surat Pengantar RT/RW']
  },
  {
    id: 'js-2',
    kode_surat: 'SKTM',
    nama_surat: 'Surat Keterangan Tidak Mampu',
    deskripsi: 'Surat keterangan untuk pengajuan bantuan sekolah, beasiswa, atau jaminan kesehatan',
    persyaratan: ['Fotocopy KTP Pemohon', 'Fotocopy Kartu Keluarga (KK)', 'Surat Pernyataan Tidak Mampu Bermaterai 10.000']
  },
  {
    id: 'js-3',
    kode_surat: 'SKU',
    nama_surat: 'Surat Keterangan Usaha',
    deskripsi: 'Surat legalitas usaha mikro/kecil masyarakat desa untuk bank atau perizinan',
    persyaratan: ['Fotocopy KTP Pemohon', 'Fotocopy Kartu Keluarga (KK)', 'Foto Tempat Usaha']
  },
  {
    id: 'js-4',
    kode_surat: 'SKBM',
    nama_surat: 'Surat Keterangan Belum Menikah',
    deskripsi: 'Surat keterangan status belum pernah menikah untuk lamaran kerja atau dokumen nikah',
    persyaratan: ['Fotocopy KTP Pemohon', 'Fotocopy Kartu Keluarga (KK)', 'Surat Pernyataan Belum Menikah']
  },
  {
    id: 'js-5',
    kode_surat: 'SKK',
    nama_surat: 'Surat Keterangan Kematian',
    deskripsi: 'Surat resmi pelaporan peristiwa kematian warga Desa Wawasan',
    persyaratan: ['Fotocopy KTP Almarhum/ah', 'Fotocopy Kartu Keluarga (KK)', 'Surat Keterangan RS / Puskesmas']
  }
];

export const INITIAL_PENDUDUK: Penduduk[] = [
  {
    id: 'p-1',
    nik: '1801051508850001',
    no_kk: '1801050101150001',
    nama_lengkap: 'Budi Santoso',
    tempat_lahir: 'Lampung Selatan',
    tanggal_lahir: '1985-08-15',
    jenis_kelamin: 'L',
    agama: 'Islam',
    pendidikan_terakhir: 'S1 Teknik Civil',
    pekerjaan: 'Wiraswasta',
    status_perkawinan: 'menikah',
    status_hubungan_keluarga: 'Kepala Keluarga',
    golongan_darah: 'O',
    is_disabilitas: false,
    is_penerima_bansos: false,
    is_miskin: false,
    dusun_id: 'dusun-1',
    alamat_detail: 'Dusun Asri Jaya RT 02 / RW 01'
  },
  {
    id: 'p-2',
    nik: '1801055204900002',
    no_kk: '1801050101150001',
    nama_lengkap: 'Siti Aminah',
    tempat_lahir: 'Tanjung Sari',
    tanggal_lahir: '1990-04-12',
    jenis_kelamin: 'P',
    agama: 'Islam',
    pendidikan_terakhir: 'SMA / Sederajat',
    pekerjaan: 'Ibu Rumah Tangga',
    status_perkawinan: 'menikah',
    status_hubungan_keluarga: 'Istri',
    golongan_darah: 'A',
    is_disabilitas: false,
    is_penerima_bansos: false,
    is_miskin: false,
    dusun_id: 'dusun-1',
    alamat_detail: 'Dusun Asri Jaya RT 02 / RW 01'
  },
  {
    id: 'p-3',
    nik: '1801051010780003',
    no_kk: '1801050101150009',
    nama_lengkap: 'Karyono',
    tempat_lahir: 'Lampung Selatan',
    tanggal_lahir: '1978-10-10',
    jenis_kelamin: 'L',
    agama: 'Islam',
    pendidikan_terakhir: 'SMP / Sederajat',
    pekerjaan: 'Petani / Pekebun',
    status_perkawinan: 'menikah',
    status_hubungan_keluarga: 'Kepala Keluarga',
    golongan_darah: 'B',
    is_disabilitas: false,
    is_penerima_bansos: true,
    is_miskin: true,
    dusun_id: 'dusun-4',
    alamat_detail: 'Dusun Damai Jaya RT 01 / RW 02'
  },
  {
    id: 'p-4',
    nik: '1801052512950004',
    no_kk: '1801050101150012',
    nama_lengkap: 'Rina Kartika',
    tempat_lahir: 'Bandar Lampung',
    tanggal_lahir: '1995-12-25',
    jenis_kelamin: 'P',
    agama: 'Islam',
    pendidikan_terakhir: 'D3 Kebidanan',
    pekerjaan: 'Tenaga Kesehatan / Bidan',
    status_perkawinan: 'belum_menikah',
    status_hubungan_keluarga: 'Anak',
    golongan_darah: 'AB',
    is_disabilitas: false,
    is_penerima_bansos: false,
    is_miskin: false,
    dusun_id: 'dusun-2',
    alamat_detail: 'Dusun Budi Jaya RT 01 / RW 01'
  }
];

export const INITIAL_SURAT: PermohonanSurat[] = [
  {
    id: 'surat-101',
    nomor_surat: '470/042/DS-WWS/2026',
    jenis_surat_id: 'js-1',
    pemohon_nik: '1801051508850001',
    pemohon_nama: 'Budi Santoso',
    keperluan: 'Persyaratan Pengajuan Kredit Usaha Rakyat (KUR) Bank BRI',
    status: 'disetujui',
    qr_code_hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    tanggal_pengajuan: '2026-07-20T08:30:00Z',
    tanggal_disetujui: '2026-07-20T11:15:00Z',
    file_surat_pdf_url: '#',
    jenis_surat: INITIAL_JENIS_SURAT[0]
  },
  {
    id: 'surat-102',
    nomor_surat: '470/043/DS-WWS/2026',
    jenis_surat_id: 'js-3',
    pemohon_nik: '1801051010780003',
    pemohon_nama: 'Karyono',
    keperluan: 'Izin Usaha Gula Aren dan Bantuan Modal BUMDes',
    status: 'diverifikasi',
    tanggal_pengajuan: '2026-07-23T09:00:00Z',
    jenis_surat: INITIAL_JENIS_SURAT[2]
  },
  {
    id: 'surat-103',
    jenis_surat_id: 'js-2',
    pemohon_nik: '1801052512950004',
    pemohon_nama: 'Rina Kartika',
    keperluan: 'Pengajuan Beasiswa Program KKN & Pendidikan Tinggi',
    status: 'pending',
    tanggal_pengajuan: '2026-07-24T06:00:00Z',
    jenis_surat: INITIAL_JENIS_SURAT[1]
  }
];

export const INITIAL_APBDES: APBDesItem[] = [
  { id: 'apb-1', tahun_anggaran: 2025, kategori: 'pendapatan', rincian_akun: 'Dana Desa (APBN)', jumlah_anggaran: 820000000, jumlah_realisasi: 410000000 },
  { id: 'apb-2', tahun_anggaran: 2025, kategori: 'pendapatan', rincian_akun: 'Alokasi Dana Desa (ADD Kab. Lampung Selatan)', jumlah_anggaran: 465000000, jumlah_realisasi: 465000000 },
  { id: 'apb-3', tahun_anggaran: 2025, kategori: 'pendapatan', rincian_akun: 'Bagi Hasil Pajak & Retribusi Daerah', jumlah_anggaran: 47276616, jumlah_realisasi: 47276616 },
  { id: 'apb-4', tahun_anggaran: 2025, kategori: 'belanja', rincian_akun: 'Bidang Penyelenggaraan Pemerintahan Desa', jumlah_anggaran: 398040159.48, jumlah_realisasi: 284120000 },
  { id: 'apb-5', tahun_anggaran: 2025, kategori: 'belanja', rincian_akun: 'Bidang Pelaksanaan Pembangunan Desa (Infrastruktur & Jalan)', jumlah_anggaran: 545000000, jumlah_realisasi: 389026220 },
  { id: 'apb-6', tahun_anggaran: 2025, kategori: 'belanja', rincian_akun: 'Bidang Pembinaan Kemasyarakatan Desa', jumlah_anggaran: 106000000, jumlah_realisasi: 75660000 },
  { id: 'apb-7', tahun_anggaran: 2025, kategori: 'belanja', rincian_akun: 'Bidang Pemberdayaan Masyarakat (Tani & UMKM)', jumlah_anggaran: 163000000, jumlah_realisasi: 116420000 },
  { id: 'apb-8', tahun_anggaran: 2025, kategori: 'pembiayaan', rincian_akun: 'Penerimaan Pembiayaan (SILPA)', jumlah_anggaran: 45000000, jumlah_realisasi: 45000000 }
];

export const INITIAL_PROGRAM: ProgramDesa[] = [
  { id: 'prog-1', nama_program: 'Pavingisasi Jalan Usaha Tani Dusun Cinta Jaya', lokasi: 'Dusun Cinta Jaya', anggaran: 185000000, sumber_dana: 'Dana Desa 2025', persentase_progres: 85, status: 'Sedang Berjalan' },
  { id: 'prog-2', nama_program: 'Pembangunan Gedung Posyandu & Balai RW Dusun Asri Jaya', lokasi: 'Dusun Asri Jaya', anggaran: 120000000, sumber_dana: 'ADD 2025', persentase_progres: 100, status: 'Selesai' },
  { id: 'prog-3', nama_program: 'Digitalisasi SID & Sarana Balai Desa', lokasi: 'Balai Desa Wawasan', anggaran: 45000000, sumber_dana: 'Dana Desa 2025', persentase_progres: 90, status: 'Sedang Berjalan' },
  { id: 'prog-4', nama_program: 'Pelatihan UMKM Kripik Pisang & Digital Marketing', lokasi: 'Gedung Serbaguna Desa', anggaran: 25000000, sumber_dana: 'Dana Desa 2025', persentase_progres: 60, status: 'Sedang Berjalan' }
];

export const INITIAL_BERITA: BeritaItem[] = [
  {
    id: 'news-1',
    judul: 'Peluncuran Website Sistem Informasi Desa (SID) Wawasan Berbasis Serverless Modern',
    slug: 'peluncuran-website-sistem-informasi-desa-wawasan-berbasis-serverless-modern',
    konten: `Pemerintah Desa Wawasan, Kecamatan Tanjung Sari, Kabupaten Lampung Selatan bekerjasama dengan Tim Mahasiswa KKN secara resmi merilis portal website Desa Wawasan modern. Portal ini mengintegrasikan seluruh layanan informasi publik mulai dari transparansi anggaran APBDes hingga peta interaktif UMKM dan pertanian desa.

Kepala Desa Wawasan menyampaikan bahwa portal ini menjadi wujud nyata komitmen transparansi dan efisiensi informasi desa bagi seluruh masyarakat, baik yang berdomisili di desa maupun warga luar desa.`,
    thumbnail_url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    views_count: 428,
    created_at: '2026-07-24T08:00:00Z',
    kategori_berita: { nama_kategori: 'Pemerintahan' }
  },
  {
    id: 'news-2',
    judul: 'Hasil Musrenbangdes 2026: Sepakati Prioritas Pembangunan Drainase & Perluasan BUMDes',
    slug: 'hasil-musrenbangdes-2026-sepakati-prioritas-pembangunan-drainase',
    konten: `Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) Wawasan Tahun 2026 telah sukses diselenggarakan di Balai Desa. Acara ini dihadiri oleh jajaran Perangkat Desa, BPD, Tokoh Agama, Tokoh Pemuda Karang Taruna, dan perwakilan Kecamatan Tanjung Sari.

Hasil kesepakatan memprioritaskan pembenahan saluran drainase di Dusun Budi Jaya dan Dusun Damai Jaya guna mengantisipasi genangan air musim hujan, serta pengalokasian modal kerja bagi unit usaha BUMDes bidang kripik olahan pisang.`,
    thumbnail_url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    views_count: 215,
    created_at: '2026-07-22T10:30:00Z',
    kategori_berita: { nama_kategori: 'Pembangunan' }
  },
  {
    id: 'news-3',
    judul: 'Pelatihan Kemasan Produk & Pemasaran Online bagi UMKM Kripik Pisang Desa Wawasan',
    slug: 'pelatihan-kemasan-produk-dan-pemasaran-online-bagi-umkm-kripik-pisang',
    konten: `BUMDes Wawasan Jaya memberikan pendampingan khusus bagi 25 pelaku UMKM lokal di bidang pengolahan kripik pisang, gula aren, dan kerajinan bambu. Pelatihan ini fokus pada desain packaging higienis dan pendaftaran merchant di e-commerce nasional.`,
    thumbnail_url: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    views_count: 310,
    created_at: '2026-07-18T14:15:00Z',
    kategori_berita: { nama_kategori: 'Pemberdayaan' }
  }
];

export const INITIAL_AGENDA: AgendaItem[] = [
  {
    id: 'ag-1',
    judul_kegiatan: 'Posyandu Balita & Posbindu Lansia Dusun Asri Jaya',
    tanggal_kegiatan: '2026-08-05',
    waktu_mulai: '08:00',
    lokasi: 'Posyandu Mawar, Dusun Asri Jaya',
    penyelenggara: 'Kader Posyandu & Bidan Desa',
    keterangan: 'Pemeriksaan kesehatan gratis, imunisasi dasar, dan penyuluhan gizi balita.'
  },
  {
    id: 'ag-2',
    judul_kegiatan: 'Gotong Royong Kebersihan Lingkungan & Drainase',
    tanggal_kegiatan: '2026-08-10',
    waktu_mulai: '07:00',
    lokasi: 'Sepanjang Jalan Utama Desa Wawasan',
    penyelenggara: 'Karang Taruna Wawasan & Warga Dusun Asri Jaya, Budi Jaya, Cinta Jaya, Damai Jaya',
    keterangan: 'Pembersihan rumput liat dan pengerukan sedimentasi parit desa.'
  },
  {
    id: 'ag-3',
    judul_kegiatan: 'Pengajian Rutin Majelis Taklim Desa Wawasan',
    tanggal_kegiatan: '2026-08-15',
    waktu_mulai: '19:30',
    lokasi: 'Masjid Al-Barokah Desa Wawasan',
    penyelenggara: 'Pengurus Majelis Taklim',
    keterangan: 'Tausiyah keagamaan dan doa bersama untuk keharmonisan desa.'
  }
];

export const INITIAL_UMKM: UMKMItem[] = [
  {
    id: 'u-1',
    nama_usaha: 'Kripik Pisang Renyah Mas Agus',
    pemilik_nama: 'Agus Susanto',
    kategori_usaha: 'Makanan & Minuman',
    no_hp: '085311223344',
    deskripsi: 'Produsen kripik pisang renyah khas Desa Wawasan dengan aneka varian rasa (Cokelat Lumer, Keju Gurih, Balado Pedas).',
    alamat_usaha: 'Dusun Asri Jaya RT 02 / RW 01',
    foto_usaha_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'u-2',
    nama_usaha: 'Gula Aren Murni Pak Karyo',
    pemilik_nama: 'Karyono',
    kategori_usaha: 'Pertanian & Olahan',
    no_hp: '085355667788',
    deskripsi: 'Gula aren organik hasil sadapan nira murni dari perkebunan Desa Wawasan tanpa bahan pengawet.',
    alamat_usaha: 'Dusun Damai Jaya RT 01 / RW 02',
    foto_usaha_url: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'u-3',
    nama_usaha: 'Anyaman Bambu Wawasan Creative',
    pemilik_nama: 'Siti Rahmawati',
    kategori_usaha: 'Kerajinan Tangan',
    no_hp: '085399001122',
    deskripsi: 'Sentra kerajinan hiasan lampu, tampah, dan keranjang bambu ramah lingkungan buatan tangan warga.',
    alamat_usaha: 'Dusun Budi Jaya RT 03 / RW 01',
    foto_usaha_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_MARKERS: VillageMarker[] = [
  {
    id: 'm-1',
    name: 'Balai Desa Wawasan',
    category: 'Balai Desa',
    lat: -5.3582,
    lng: 105.3421,
    description: 'Pusat pelayanan administrasi dan balai musyawarah pemerintah Desa Wawasan.'
  },
  {
    id: 'm-2',
    name: 'SD Negeri 1 Wawasan',
    category: 'Sekolah',
    lat: -5.3565,
    lng: 105.3405,
    description: 'Sekolah Dasar Negeri pusat pendidikan anak-anak Desa Wawasan.'
  },
  {
    id: 'm-3',
    name: 'Masjid Agung Al-Barokah',
    category: 'Masjid',
    lat: -5.3590,
    lng: 105.3440,
    description: 'Masjid utama tempat peribadatan dan pusat kegiatan keagamaan desa.'
  },
  {
    id: 'm-4',
    name: 'Posyandu Mawar Dusun Asri Jaya',
    category: 'Posyandu',
    lat: -5.3570,
    lng: 105.3430,
    description: 'Pusat layanan kesehatan balita, ibu hamil, dan posbindu lansia.'
  },
  {
    id: 'm-5',
    name: 'Sentra UMKM Kripik Mas Agus',
    category: 'UMKM',
    lat: -5.3601,
    lng: 105.3412,
    description: 'Lokasi produksi dan outlet oleh-oleh kripik pisang renyah Desa Wawasan.'
  },
  {
    id: 'm-6',
    name: 'Perkebunan Aren & Pertanian Tani Jaya',
    category: 'Pertanian',
    lat: -5.3620,
    lng: 105.3465,
    description: 'Kawasan lahan perkebunan aren organik dan persawahan irigasi desa.'
  }
];

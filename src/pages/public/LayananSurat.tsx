import React, { useEffect, useState } from 'react';
import { 
  FileText, CheckCircle2, Upload, Clock, 
  Download, QrCode, FileCheck, ArrowRight
} from 'lucide-react';
import { PageHeroSlider } from '../../components/layout/PageHeroSlider';
import { dataService } from '../../services/dataService';
import { INITIAL_JENIS_SURAT } from '../../services/mockData';
import type { PermohonanSurat } from '../../types';
import confetti from 'canvas-confetti';

export const LayananSurat: React.FC = () => {
  const [step, setStep] = useState(1);
  const jenisList = INITIAL_JENIS_SURAT;
  const [requests, setRequests] = useState<PermohonanSurat[]>([]);

  // Form State
  const [selectedJenisId, setSelectedJenisId] = useState(INITIAL_JENIS_SURAT[0].id);
  const [pemohonNik, setPemohonNik] = useState('1801051508850001');
  const [pemohonNama, setPemohonNama] = useState('Budi Santoso');
  const [keperluan, setKeperluan] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSurat, setSubmittedSurat] = useState<PermohonanSurat | null>(null);

  // Search status tracker
  const [searchNik, setSearchNik] = useState('1801051508850001');

  useEffect(() => {
    dataService.getSuratRequests().then(setRequests);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keperluan.trim()) return;

    setIsSubmitting(true);
    const newSurat = await dataService.submitSuratRequest({
      jenis_surat_id: selectedJenisId,
      pemohon_nik: pemohonNik,
      pemohon_nama: pemohonNama,
      keperluan: keperluan
    });

    setIsSubmitting(false);
    setSubmittedSurat(newSurat);
    setStep(4);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    // Refresh request list
    dataService.getSuratRequests().then(setRequests);
  };

  const selectedJenis = jenisList.find((j) => j.id === selectedJenisId) || jenisList[0];
  const userRequests = requests.filter((r) => r.pemohon_nik === searchNik);

  return (
    <div className="space-y-12 pb-16">
      
      {/* PAGE HERO SLIDER */}
      <PageHeroSlider
        badge="Portal Administrasi Mandiri"
        title="Layanan Surat Online Desa Wawasan"
        subtitle="Ajukan permohonan surat keterangan desa secara cepat tanpa antre. Dilengkapi verifikasi digital dan keabsahan QR Code."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Stepper Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Interactive Form Wizard */}
          <div className="lg:col-span-7 light-card p-6 sm:p-8 rounded-3xl space-y-6">
            
            {/* Stepper Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full brand-gradient text-white flex items-center justify-center text-xs font-bold">
                  {step}
                </div>
                <span className="text-sm font-bold text-slate-800">
                  {step === 1 && 'Langkah 1: Pilih Jenis Surat'}
                  {step === 2 && 'Langkah 2: Data Pemohon'}
                  {step === 3 && 'Langkah 3: Unggah Persyaratan'}
                  {step === 4 && 'Permohonan Berhasil Dikirim!'}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-semibold">{step} dari 4</span>
            </div>

            {/* STEP 1: Select Type */}
            {step === 1 && (
              <div className="space-y-4">
                <label className="text-xs font-semibold text-slate-600 block">Pilih Jenis Surat Keterangan:</label>
                <div className="grid grid-cols-1 gap-3">
                  {jenisList.map((j) => (
                    <div
                      key={j.id}
                      onClick={() => setSelectedJenisId(j.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 ${
                        selectedJenisId === j.id
                          ? 'bg-blue-50 border-[#040DBF] shadow-lg shadow-blue-500/10'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <FileText className={`w-5 h-5 shrink-0 mt-0.5 ${selectedJenisId === j.id ? 'text-[#040DBF]' : 'text-slate-400'}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-800">{j.nama_surat}</h4>
                          <span className="text-[10px] font-bold text-[#040DBF] bg-blue-50 px-2 py-0.5 rounded">
                            {j.kode_surat}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{j.deskripsi}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full brand-gradient hover:opacity-90 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 text-xs"
                >
                  <span>Lanjut ke Form Pemohon</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: Identity & Purpose */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Nomor Induk Kependudukan (NIK)</label>
                  <input
                    type="text"
                    value={pemohonNik}
                    onChange={(e) => setPemohonNik(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#040DBF] focus:ring-1 focus:ring-[#040DBF]/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Nama Lengkap Sesuai KTP</label>
                  <input
                    type="text"
                    value={pemohonNama}
                    onChange={(e) => setPemohonNama(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#040DBF] focus:ring-1 focus:ring-[#040DBF]/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Keperluan Pengajuan Surat</label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Persyaratan Pengajuan Kredit KUR Bank BRI / Beasiswa Pendidikan..."
                    value={keperluan}
                    onChange={(e) => setKeperluan(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#040DBF] focus:ring-1 focus:ring-[#040DBF]/20"
                  />
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-3 rounded-xl text-xs border border-slate-200"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!keperluan.trim()}
                    className="w-2/3 brand-gradient hover:opacity-90 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-xs shadow-lg shadow-blue-600/30 transition-all"
                  >
                    Lanjut Upload Berkas
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Requirements */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-[#040DBF] block">Daftar Berkas Syarat ({selectedJenis.kode_surat}):</span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {selectedJenis.persyaratan.map((syarat, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{syarat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-2 border-dashed border-slate-300 hover:border-[#040DBF]/50 rounded-2xl p-6 text-center space-y-2 cursor-pointer bg-slate-50 transition-colors">
                  <Upload className="w-8 h-8 text-[#040DBF] mx-auto" />
                  <span className="text-xs font-bold text-slate-700 block">Klik untuk memilih file PDF / Foto Persyaratan</span>
                  <span className="text-[10px] text-slate-400 block">Format didukung: PDF, JPG, PNG (Maks 5MB)</span>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-3 rounded-xl text-xs border border-slate-200"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-2/3 brand-gradient hover:opacity-90 text-white font-bold py-3 rounded-xl text-xs shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? 'Mengirim Permohonan...' : 'Submit Permohonan Sekarang'}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Success View */}
            {step === 4 && submittedSurat && (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-500 flex items-center justify-center mx-auto">
                  <FileCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Permohonan Berhasil Dikirim!</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Permohonan surat Anda sedang diproses oleh Kasi Pelayanan & Sekretaris Desa Wawasan. Anda dapat memantau statusnya menggunakan NIK Anda.
                </p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-left space-y-1 inline-block text-slate-600">
                  <div><span className="text-slate-400 font-semibold">Nama Pemohon:</span> {submittedSurat.pemohon_nama}</div>
                  <div><span className="text-slate-400 font-semibold">NIK:</span> {submittedSurat.pemohon_nik}</div>
                  <div><span className="text-slate-400 font-semibold">Jenis Surat:</span> {submittedSurat.jenis_surat?.nama_surat}</div>
                  <div><span className="text-slate-400 font-semibold">Status:</span> <span className="text-amber-500 font-bold uppercase">{submittedSurat.status}</span></div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-[#040DBF] font-semibold py-3 rounded-xl text-xs border border-slate-200 block"
                >
                  Buat Permohonan Baru
                </button>
              </div>
            )}

          </div>

          {/* Right: Live Status Tracker */}
          <div className="lg:col-span-5 space-y-6">
            <div className="light-card p-6 rounded-3xl space-y-4">
              <div className="flex items-center space-x-2 text-[#040DBF] font-bold text-sm">
                <Clock className="w-5 h-5" />
                <span>Lacak Status Permohonan Surat</span>
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Masukkan NIK Anda..."
                  value={searchNik}
                  onChange={(e) => setSearchNik(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#040DBF]"
                />
                <button className="brand-gradient text-white font-bold text-xs px-4 py-2 rounded-xl">
                  Cek
                </button>
              </div>

              {/* List of user requests */}
              <div className="space-y-3 pt-2">
                {userRequests.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-4">Tidak ada riwayat permohonan surat untuk NIK ini.</p>
                ) : (
                  userRequests.map((req) => (
                    <div key={req.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{req.jenis_surat?.nama_surat || 'Surat Keterangan'}</h4>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{req.nomor_surat || 'Nomor Belum Terbit'}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          req.status === 'disetujui' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
                        }`}>
                          {req.status}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 line-clamp-1"><span className="text-slate-400">Keperluan:</span> {req.keperluan}</p>

                      {req.status === 'disetujui' && (
                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                          <a
                            href={`#/verifikasi-surat/${req.qr_code_hash}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-bold text-[#040DBF] hover:underline flex items-center gap-1"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                            <span>Cek Validasi QR Code</span>
                          </a>
                          <button 
                            onClick={() => alert(`Unduh PDF Surat Resmi ${req.nomor_surat}`)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] px-3 py-1 rounded-lg flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download PDF</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

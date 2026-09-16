import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, QrCode } from 'lucide-react';
import { dataService } from '../../services/dataService';
import type { PermohonanSurat } from '../../types';

export const ManajemenSurat: React.FC = () => {
  const [suratList, setSuratList] = useState<PermohonanSurat[]>([]);

  useEffect(() => {
    fetchSurat();
  }, []);

  const fetchSurat = () => {
    dataService.getSuratRequests().then(setSuratList);
  };

  const handleApprove = async (id: string) => {
    await dataService.updateSuratStatus(id, 'disetujui');
    fetchSurat();
  };

  const handleReject = async (id: string) => {
    await dataService.updateSuratStatus(id, 'ditolak', 'Persyaratan berkas KTP/KK kurang jelas');
    fetchSurat();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Manajemen Permohonan Surat Online</h1>
        <p className="text-xs text-slate-400">Verifikasi Berkas, Penomoran Otomatis & Penerbitan QR E-Signature (Kasi Pelayanan & Sekdes)</p>
      </div>

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Pemohon / NIK</th>
                <th className="p-4">Jenis Surat</th>
                <th className="p-4">Keperluan</th>
                <th className="p-4">Nomor Surat Resmi</th>
                <th className="p-4">Status & Waktu</th>
                <th className="p-4 text-center">Tindakan Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {suratList.map((s) => (
                <tr key={s.id} className="hover:bg-slate-900/60">
                  <td className="p-4">
                    <span className="font-bold text-white block">{s.pemohon_nama}</span>
                    <span className="text-[10px] text-slate-400 block">NIK: {s.pemohon_nik}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-cyan-400 block">{s.jenis_surat?.nama_surat}</span>
                    <span className="text-[10px] text-slate-500 uppercase">{s.jenis_surat?.kode_surat}</span>
                  </td>
                  <td className="p-4 max-w-xs truncate">{s.keperluan}</td>
                  <td className="p-4">
                    {s.nomor_surat ? (
                      <span className="font-mono text-cyan-300 font-bold">{s.nomor_surat}</span>
                    ) : (
                      <span className="text-slate-500 italic text-[10px]">Otomatis saat disetujui</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      s.status === 'disetujui' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {s.status}
                    </span>
                    <span className="text-[9px] text-slate-500 block mt-1">
                      {new Date(s.tanggal_pengajuan).toLocaleDateString('id-ID', { dateStyle: 'short' })}
                    </span>
                  </td>
                  <td className="p-4 text-center space-x-2">
                    {s.status !== 'disetujui' ? (
                      <>
                        <button
                          onClick={() => handleApprove(s.id)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg shadow transition-colors inline-flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Setujui</span>
                        </button>
                        <button
                          onClick={() => handleReject(s.id)}
                          className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Tolak</span>
                        </button>
                      </>
                    ) : (
                      <a
                        href={`#/verifikasi-surat/${s.qr_code_hash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-bold text-cyan-400 hover:underline inline-flex items-center gap-1"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Lihat QR Code</span>
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

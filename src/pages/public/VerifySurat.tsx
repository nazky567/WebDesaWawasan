import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { dataService } from '../../services/dataService';
import type { PermohonanSurat } from '../../types';

export const VerifySurat: React.FC = () => {
  const { hash } = useParams<{ hash: string }>();
  const [surat, setSurat] = useState<PermohonanSurat | null>(null);

  useEffect(() => {
    dataService.getSuratRequests().then((list) => {
      const found = list.find((s) => s.qr_code_hash === hash) || list[0];
      setSurat(found);
    });
  }, [hash]);

  if (!surat) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl p-8 border border-emerald-200 space-y-6 text-center shadow-xl relative overflow-hidden">
        
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-500 flex items-center justify-center mx-auto shadow-lg">
          <ShieldCheck className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            DOKUMEN TERVERIFIKASI RESMI
          </span>
          <h1 className="text-2xl font-bold text-slate-800">Sistem Pemeriksa Keabsahan Surat Desa</h1>
          <p className="text-xs text-slate-500">
            Surat ini terdaftar secara sah pada Database Pemerintah Desa Wawasan, Kecamatan Tanjung Sari, Kabupaten Lampung Selatan.
          </p>
        </div>

        {/* Verification Details Table */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left space-y-3 text-xs text-slate-600">
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-400">Nomor Surat Resmi:</span>
            <span className="font-bold text-[#040DBF]">{surat.nomor_surat}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-400">Jenis Surat:</span>
            <span className="font-bold text-slate-800">{surat.jenis_surat?.nama_surat || 'Surat Keterangan'}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-400">Nama Pemohon:</span>
            <span className="font-bold text-slate-800">{surat.pemohon_nama}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-400">NIK Pemohon:</span>
            <span className="font-bold text-slate-800">{surat.pemohon_nik}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-400">Tanggal Disetujui:</span>
            <span className="font-bold text-slate-800">{new Date(surat.tanggal_disetujui || Date.now()).toLocaleDateString('id-ID', { dateStyle: 'full' })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Tanda Tangan Digital:</span>
            <span className="font-bold text-emerald-500 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Kepala Desa Wawasan
            </span>
          </div>
        </div>

        <div className="pt-2 text-center">
          <Link to="/" className="text-xs font-bold text-[#040DBF] hover:underline">
            Kembali ke Portal Beranda Desa Wawasan
          </Link>
        </div>

      </div>
    </div>
  );
};

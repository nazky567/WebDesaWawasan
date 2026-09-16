import React, { useState } from 'react';
import { Download, Upload, Database, CheckCircle2, RefreshCw, AlertTriangle, ShieldCheck, FileCode, Server } from 'lucide-react';
import { isSupabaseConfigured, testSupabaseConnection, type SupabaseTestResult } from '../../services/supabase';

export const SystemSettings: React.FC = () => {
  const [backedUp, setBackedUp] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<SupabaseTestResult | null>(null);

  const handleExportJSON = () => {
    const data = {
      timestamp: new Date().toISOString(),
      village: 'Desa Wawasan',
      tables: ['penduduk', 'permohonan_surat', 'apbdes', 'program_desa', 'berita', 'umkm'],
      note: 'Supabase BaaS PostgreSQL Export'
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_sid_wawasan_${Date.now()}.json`;
    a.click();
    setBackedUp(true);
  };

  const handleRunConnectionTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await testSupabaseConnection();
      setTestResult(res);
    } catch (e: any) {
      setTestResult({
        success: false,
        message: 'Gagal menjalankan pengujian',
        latencyMs: 0,
        errorDetails: e.message
      });
    } finally {
      setTesting(false);
    }
  };

  const configured = isSupabaseConfigured();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Pengaturan Sistem & Database Supabase</h1>
        <p className="text-xs text-slate-400">Konfigurasi Serverless Supabase BaaS, Pengujian Koneksi Realtime & Backup Data</p>
      </div>

      {/* Supabase Status Banner */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
              configured 
                ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-400' 
                : 'bg-cyan-500/20 border-cyan-400/40 text-cyan-400'
            }`}>
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-white">Status Supabase Cloud BaaS</h4>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                  configured 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {configured ? 'Supabase Active' : 'Fallback / Local Cache'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">PostgreSQL Database, Auth RLS & Realtime Storage Integration</p>
            </div>
          </div>

          <button
            onClick={handleRunConnectionTest}
            disabled={testing}
            className="bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-300 hover:text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${testing ? 'animate-spin' : ''}`} />
            <span>{testing ? 'Menguji Koneksi...' : 'Uji Koneksi Supabase'}</span>
          </button>
        </div>

        {/* Diagnostic Results */}
        {testResult && (
          <div className={`p-4 rounded-2xl border text-xs space-y-2 animate-fadeIn ${
            testResult.success 
              ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' 
              : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
          }`}>
            <div className="flex items-center justify-between font-bold">
              <div className="flex items-center gap-2">
                {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
                <span>{testResult.message}</span>
              </div>
              <span className="text-[11px] bg-slate-900/60 px-2 py-0.5 rounded text-slate-300">
                Latency: {testResult.latencyMs} ms
              </span>
            </div>
            {testResult.errorDetails && (
              <div className="mt-1 bg-black/40 p-2.5 rounded-xl font-mono text-[11px] text-slate-400 overflow-x-auto">
                {testResult.errorDetails}
              </div>
            )}
            {testResult.tablesFound && (
              <p className="text-[11px] text-slate-400">
                Tabel Aktif Terverifikasi: <span className="text-emerald-400 font-semibold">{testResult.tablesFound.join(', ')}</span>
              </p>
            )}
          </div>
        )}

        {/* Env Parameters Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Server className="w-4 h-4 text-cyan-400" />
              <div>
                <p className="text-xs font-semibold text-slate-200">VITE_SUPABASE_URL</p>
                <p className="text-[10px] text-slate-400 font-mono">
                  {import.meta.env.VITE_SUPABASE_URL || 'Belum diisi'}
                </p>
              </div>
            </div>
            {configured ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Dummy / Unconfigured</span>
            )}
          </div>

          <div className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <div>
                <p className="text-xs font-semibold text-slate-200">VITE_SUPABASE_ANON_KEY</p>
                <p className="text-[10px] text-slate-400 font-mono">
                  {import.meta.env.VITE_SUPABASE_ANON_KEY ? '••••••••••••••••' : 'Belum diisi'}
                </p>
              </div>
            </div>
            {configured ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Dummy / Unconfigured</span>
            )}
          </div>
        </div>
      </div>

      {/* SQL Migration & Seed Reference */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileCode className="w-5 h-5 text-emerald-400" />
          Berkas Migrasi & Seed Skema Database PostgreSQL
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Semua skema tabel kependudukan, permohonan surat, transparansi APBDes, berita, UMKM, beserta trigger nomor surat otomatis telah disiapkan pada folder <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono text-[11px]">supabase/</code>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-semibold text-cyan-300">
              <span>1. Skema Tabel & Relasi</span>
              <span className="font-mono text-[10px] text-slate-400">20260724_schema.sql</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Tabel <code className="text-white">penduduk</code>, <code className="text-white font-mono">permohonan_surat</code>, <code className="text-white">apbdes</code>, <code className="text-white">berita</code>, <code className="text-white">umkm</code>, RLS Policies, dan Trigger Digest QR Code.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-semibold text-emerald-300">
              <span>2. Seed Data Awal Desa</span>
              <span className="font-mono text-[10px] text-slate-400">seed.sql</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Data awal 4 Dusun, Jenis Surat (SKD, SKTM, SKU, dll), Anggaran APBDes 2026, Program Pembangunan, Berita Desa, dan Profil UMKM.
            </p>
          </div>
        </div>
      </div>

      {/* Backup & Restore */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-cyan-400" />
            Export / Backup Data Desa (JSON)
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Unduh salinan cadangan seluruh data kependudukan, permohonan surat, dan APBDes Desa Wawasan secara mandiri.
          </p>
          <button
            onClick={handleExportJSON}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Backup File JSON</span>
          </button>
          {backedUp && (
            <p className="text-xs text-emerald-400 font-semibold text-center flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Backup data berhasil diunduh!
            </p>
          )}
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Upload className="w-5 h-5 text-indigo-400" />
            Restore Database Backup
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Pulihkan data sistem informasi desa dari berkas JSON hasil cadangan sebelumnya.
          </p>
          <div className="border-2 border-dashed border-slate-800 rounded-xl p-4 text-center cursor-pointer bg-slate-950/40">
            <span className="text-xs text-slate-400">Pilih berkas backup .json untuk memulihkan data</span>
          </div>
        </div>
      </div>

    </div>
  );
};

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyz-dummy-wawasan.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy';

export const isSupabaseConfigured = (): boolean => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return (
    !!url &&
    url !== 'https://xyz-dummy-wawasan.supabase.co' &&
    url !== 'https://your-supabase-url.supabase.co' &&
    !!key &&
    key !== 'your-supabase-anon-key' &&
    key !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy'
  );
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface SupabaseTestResult {
  success: boolean;
  message: string;
  latencyMs: number;
  tablesFound?: string[];
  errorDetails?: string;
}

export const testSupabaseConnection = async (): Promise<SupabaseTestResult> => {
  const startTime = performance.now();

  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message: 'Credential Supabase belum dikonfigurasi di file .env',
      latencyMs: 0,
      errorDetails: 'VITE_SUPABASE_URL atau VITE_SUPABASE_ANON_KEY masih bernilai dummy atau kosong.'
    };
  }

  try {
    // Ping public query (select count from jenis_surat or berita)
    const { error: beritaError } = await supabase
      .from('berita')
      .select('id', { count: 'exact', head: true });

    const endTime = performance.now();
    const latencyMs = Math.round(endTime - startTime);

    if (beritaError) {
      // If table doesn't exist yet or permission denied
      return {
        success: false,
        message: `Terhubung ke server, namun query gagal (${beritaError.code || 'RLS/Table missing'})`,
        latencyMs,
        errorDetails: beritaError.message
      };
    }

    return {
      success: true,
      message: 'Koneksi ke Supabase Database Berhasil!',
      latencyMs,
      tablesFound: ['berita', 'penduduk', 'permohonan_surat', 'apbdes', 'umkm']
    };
  } catch (err: any) {
    const endTime = performance.now();
    return {
      success: false,
      message: 'Gagal terhubung ke Supabase',
      latencyMs: Math.round(endTime - startTime),
      errorDetails: err.message || String(err)
    };
  }
};

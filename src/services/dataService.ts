import { supabase, isSupabaseConfigured } from './supabase';
import type { 
  Penduduk, PermohonanSurat, APBDesItem, ProgramDesa, 
  BeritaItem, AgendaItem, UMKMItem, VillageMarker 
} from '../types';
import { 
  INITIAL_PENDUDUK, INITIAL_SURAT, INITIAL_APBDES, 
  INITIAL_PROGRAM, INITIAL_BERITA, INITIAL_AGENDA, 
  INITIAL_UMKM, INITIAL_MARKERS, INITIAL_JENIS_SURAT 
} from './mockData';

class DataService {
  // Local storage reactive fallback caches
  private pendudukList: Penduduk[] = JSON.parse(localStorage.getItem('sid_penduduk') || JSON.stringify(INITIAL_PENDUDUK));
  private suratList: PermohonanSurat[] = JSON.parse(localStorage.getItem('sid_surat') || JSON.stringify(INITIAL_SURAT));
  private beritaList: BeritaItem[] = JSON.parse(localStorage.getItem('sid_berita') || JSON.stringify(INITIAL_BERITA));
  private agendaList: AgendaItem[] = JSON.parse(localStorage.getItem('sid_agenda') || JSON.stringify(INITIAL_AGENDA));
  private apbdesList: APBDesItem[] = JSON.parse(localStorage.getItem('sid_apbdes_v2025') || JSON.stringify(INITIAL_APBDES));
  private programList: ProgramDesa[] = JSON.parse(localStorage.getItem('sid_program_v2025') || JSON.stringify(INITIAL_PROGRAM));
  private umkmList: UMKMItem[] = JSON.parse(localStorage.getItem('sid_umkm') || JSON.stringify(INITIAL_UMKM));

  private saveCache(key: string, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Cache write failed:', e);
    }
  }

  // --- PENDUDUK ---
  async getPenduduk(): Promise<Penduduk[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('penduduk').select('*').order('created_at', { ascending: false });
        if (data && !error) return data as unknown as Penduduk[];
      } catch (err) {
        console.warn('Supabase fetch error, using local data:', err);
      }
    }
    return this.pendudukList;
  }

  async addPenduduk(data: Omit<Penduduk, 'id' | 'created_at'>): Promise<Penduduk> {
    const newItem: Penduduk = {
      ...data,
      id: `p-${Date.now()}`,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      try {
        const { data: inserted, error } = await supabase.from('penduduk').insert(newItem as any).select().single();
        if (inserted && !error) {
          this.pendudukList = [inserted as unknown as Penduduk, ...this.pendudukList];
          this.saveCache('sid_penduduk', this.pendudukList);
          return inserted as unknown as Penduduk;
        }
      } catch (err) {
        console.warn('Supabase insert error, saving locally:', err);
      }
    }

    this.pendudukList = [newItem, ...this.pendudukList];
    this.saveCache('sid_penduduk', this.pendudukList);
    return newItem;
  }

  async updatePenduduk(id: string, updates: Partial<Penduduk>): Promise<Penduduk | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data: updated, error } = await (supabase
          .from('penduduk') as any)
          .update(updates)
          .eq('id', id)
          .select()
          .single();
        if (updated && !error) {
          this.pendudukList = this.pendudukList.map(p => p.id === id ? (updated as unknown as Penduduk) : p);
          this.saveCache('sid_penduduk', this.pendudukList);
          return updated as unknown as Penduduk;
        }
      } catch (err) {
        console.warn('Supabase update error:', err);
      }
    }

    const idx = this.pendudukList.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.pendudukList[idx] = { ...this.pendudukList[idx], ...updates };
      this.saveCache('sid_penduduk', this.pendudukList);
      return this.pendudukList[idx];
    }
    return null;
  }

  async deletePenduduk(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('penduduk').delete().eq('id', id);
        if (error) console.warn('Supabase delete error:', error);
      } catch (err) {
        console.warn('Supabase error:', err);
      }
    }
    this.pendudukList = this.pendudukList.filter(p => p.id !== id);
    this.saveCache('sid_penduduk', this.pendudukList);
    return true;
  }

  // --- SURAT ONLINE ---
  async getSuratRequests(): Promise<PermohonanSurat[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('permohonan_surat')
          .select('*, jenis_surat(*)')
          .order('tanggal_pengajuan', { ascending: false });
        if (data && !error) return data as unknown as PermohonanSurat[];
      } catch (err) {
        console.warn('Supabase fetch error, using local data:', err);
      }
    }
    return this.suratList;
  }

  async submitSuratRequest(req: {
    jenis_surat_id: string;
    pemohon_nik: string;
    pemohon_nama: string;
    keperluan: string;
  }): Promise<PermohonanSurat> {
    const jenis = INITIAL_JENIS_SURAT.find(j => j.id === req.jenis_surat_id) || INITIAL_JENIS_SURAT[0];
    const newSurat: PermohonanSurat = {
      id: `surat-${Date.now()}`,
      jenis_surat_id: req.jenis_surat_id,
      pemohon_nik: req.pemohon_nik,
      pemohon_nama: req.pemohon_nama,
      keperluan: req.keperluan,
      status: 'pending',
      tanggal_pengajuan: new Date().toISOString(),
      jenis_surat: jenis
    };

    if (isSupabaseConfigured()) {
      try {
        const { data: inserted, error } = await supabase.from('permohonan_surat').insert({
          id: newSurat.id,
          jenis_surat_id: req.jenis_surat_id,
          pemohon_nik: req.pemohon_nik,
          pemohon_nama: req.pemohon_nama,
          keperluan: req.keperluan,
          status: 'pending'
        } as any).select('*, jenis_surat(*)').single();

        if (inserted && !error) {
          const formatted = inserted as unknown as PermohonanSurat;
          this.suratList = [formatted, ...this.suratList];
          this.saveCache('sid_surat', this.suratList);
          return formatted;
        }
      } catch (err) {
        console.warn('Supabase insert error, saving locally:', err);
      }
    }

    this.suratList = [newSurat, ...this.suratList];
    this.saveCache('sid_surat', this.suratList);
    return newSurat;
  }

  async updateSuratStatus(id: string, status: PermohonanSurat['status'], catatan?: string): Promise<PermohonanSurat | null> {
    const target = this.suratList.find(s => s.id === id);
    if (!target) return null;

    target.status = status;
    if (catatan) target.catatan_revisi = catatan;
    if (status === 'disetujui') {
      const year = new Date().getFullYear();
      const seq = String(Math.floor(Math.random() * 900) + 100).padStart(3, '0');
      target.nomor_surat = `470/${seq}/DS-WWS/${year}`;
      target.tanggal_disetujui = new Date().toISOString();
      target.qr_code_hash = `hash-${Date.now()}-${target.pemohon_nik}`;
    }

    if (isSupabaseConfigured()) {
      try {
        await (supabase.from('permohonan_surat') as any).update({
          status: target.status,
          catatan_revisi: target.catatan_revisi,
          nomor_surat: target.nomor_surat,
          tanggal_disetujui: target.tanggal_disetujui,
          qr_code_hash: target.qr_code_hash
        }).eq('id', id);
      } catch (err) {
        console.warn('Supabase update error:', err);
      }
    }

    this.saveCache('sid_surat', this.suratList);
    return target;
  }

  // --- BERITA ---
  async getBerita(): Promise<BeritaItem[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('berita')
          .select('*, kategori_berita(*)')
          .order('created_at', { ascending: false });
        if (data && !error) return data as unknown as BeritaItem[];
      } catch (err) {
        console.warn('Supabase fetch error:', err);
      }
    }
    return this.beritaList;
  }

  async addBerita(item: Omit<BeritaItem, 'id' | 'views_count' | 'created_at'>): Promise<BeritaItem> {
    const newItem: BeritaItem = {
      ...item,
      id: `news-${Date.now()}`,
      views_count: 0,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      try {
        const { data: inserted, error } = await supabase.from('berita').insert({
          id: newItem.id,
          judul: newItem.judul,
          slug: newItem.slug || newItem.judul.toLowerCase().replace(/\s+/g, '-'),
          konten: newItem.konten,
          thumbnail_url: newItem.thumbnail_url,
          is_published: true
        } as any).select('*, kategori_berita(*)').single();

        if (inserted && !error) {
          const formatted = inserted as unknown as BeritaItem;
          this.beritaList = [formatted, ...this.beritaList];
          this.saveCache('sid_berita', this.beritaList);
          return formatted;
        }
      } catch (err) {
        console.warn('Supabase insert error:', err);
      }
    }

    this.beritaList = [newItem, ...this.beritaList];
    this.saveCache('sid_berita', this.beritaList);
    return newItem;
  }

  async deleteBerita(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('berita').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete error:', err);
      }
    }
    this.beritaList = this.beritaList.filter(b => b.id !== id);
    this.saveCache('sid_berita', this.beritaList);
    return true;
  }

  // --- AGENDA ---
  async getAgenda(): Promise<AgendaItem[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('agenda').select('*').order('tanggal_kegiatan', { ascending: true });
        if (data && !error) return data as unknown as AgendaItem[];
      } catch (err) {
        console.warn('Supabase fetch agenda error:', err);
      }
    }
    return this.agendaList;
  }

  async addAgenda(item: Omit<AgendaItem, 'id'>): Promise<AgendaItem> {
    const newItem: AgendaItem = {
      ...item,
      id: `agenda-${Date.now()}`
    };

    if (isSupabaseConfigured()) {
      try {
        const { data: inserted, error } = await supabase.from('agenda').insert(newItem as any).select().single();
        if (inserted && !error) {
          const formatted = inserted as unknown as AgendaItem;
          this.agendaList = [...this.agendaList, formatted];
          this.saveCache('sid_agenda', this.agendaList);
          return formatted;
        }
      } catch (err) {
        console.warn('Supabase insert agenda error:', err);
      }
    }

    this.agendaList = [...this.agendaList, newItem];
    this.saveCache('sid_agenda', this.agendaList);
    return newItem;
  }

  // --- APBDES & PROGRAM ---
  async getAPBDes(): Promise<APBDesItem[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('apbdes').select('*');
        if (data && !error) return data as unknown as APBDesItem[];
      } catch (err) {
        console.warn('Supabase APBDes error:', err);
      }
    }
    return this.apbdesList;
  }

  async getProgramDesa(): Promise<ProgramDesa[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('program_desa').select('*');
        if (data && !error) return data as unknown as ProgramDesa[];
      } catch (err) {
        console.warn('Supabase Program error:', err);
      }
    }
    return this.programList;
  }

  // --- UMKM ---
  async getUMKM(): Promise<UMKMItem[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('umkm').select('*');
        if (data && !error) return data as unknown as UMKMItem[];
      } catch (err) {
        console.warn('Supabase UMKM error:', err);
      }
    }
    return this.umkmList;
  }

  async addUMKM(item: Omit<UMKMItem, 'id'>): Promise<UMKMItem> {
    const newItem: UMKMItem = {
      ...item,
      id: `umkm-${Date.now()}`
    };

    if (isSupabaseConfigured()) {
      try {
        const { data: inserted, error } = await supabase.from('umkm').insert(newItem as any).select().single();
        if (inserted && !error) {
          const formatted = inserted as unknown as UMKMItem;
          this.umkmList = [formatted, ...this.umkmList];
          this.saveCache('sid_umkm', this.umkmList);
          return formatted;
        }
      } catch (err) {
        console.warn('Supabase add UMKM error:', err);
      }
    }

    this.umkmList = [newItem, ...this.umkmList];
    this.saveCache('sid_umkm', this.umkmList);
    return newItem;
  }

  // --- MAP MARKERS ---
  async getVillageMarkers(): Promise<VillageMarker[]> {
    return INITIAL_MARKERS;
  }
}

export const dataService = new DataService();

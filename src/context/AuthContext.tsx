import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, UserRole } from '../types';
import { supabase, isSupabaseConfigured } from '../services/supabase';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSupabaseActive: boolean;
  loginAsRole: (selectedRole: UserRole, nik?: string) => void;
  logout: () => Promise<void>;
  registerAsWarga: (nik: string, nama: string, email?: string) => Promise<boolean>;
  signInWithSupabase: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-default',
  nik: '1801051508850001',
  nama_lengkap: 'Tamu Warga',
  role: 'warga'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('sid_wawasan_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });
  const [isLoading, setIsLoading] = useState(false);
  const isSupabaseActive = isSupabaseConfigured();

  useEffect(() => {
    if (isSupabaseActive) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          fetchUserProfile(session.user.id, session.user.email);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          fetchUserProfile(session.user.id, session.user.email);
        } else if (_event === 'SIGNED_OUT') {
          setUser(DEFAULT_USER);
          localStorage.setItem('sid_wawasan_user', JSON.stringify(DEFAULT_USER));
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [isSupabaseActive]);

  const fetchUserProfile = async (userId: string, email?: string) => {
    try {
      const { data, error } = await (supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single() as any);

      if (data && !error) {
        const profileData = data as any;
        const profile: UserProfile = {
          id: profileData.id,
          nik: profileData.nik || '',
          nama_lengkap: profileData.nama_lengkap,
          email: profileData.email || email,
          role: profileData.role as UserRole,
          dusun_id: profileData.dusun_id || undefined,
          avatar_url: profileData.avatar_url || undefined
        };
        setUser(profile);
        localStorage.setItem('sid_wawasan_user', JSON.stringify(profile));
      } else {
        // Fallback profile if profile record not found yet
        const defaultProfile: UserProfile = {
          id: userId,
          nik: '1801050000000099',
          nama_lengkap: email?.split('@')[0] || 'Pengguna Supabase',
          email,
          role: 'warga'
        };
        setUser(defaultProfile);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  const loginAsRole = (selectedRole: UserRole, nik?: string) => {
    setIsLoading(true);
    let name = 'Pengguna';
    switch (selectedRole) {
      case 'super_admin': name = 'Administrator Utama'; break;
      case 'kepala_desa': name = 'Sutoyo Walijati'; break;
      case 'sekretaris_desa': name = 'Surya Adiyanto'; break;
      case 'kasi_pemerintahan': name = 'Indri Insani'; break;
      case 'kasi_kesejahteraan': name = 'Leo Anggara'; break;
      case 'kasi_pelayanan': name = 'Sujarwo'; break;
      case 'kaur_keuangan': name = 'Dian Purwanti'; break;
      case 'kaur_perencanaan': name = 'Yogi Adi Pangestu'; break;
      case 'kaur_tu_umum': name = 'Afini Eka Putri'; break;
      case 'kepala_dusun': name = 'Krisna Abi Pratama'; break;
      default: name = 'Warga Desa Wawasan'; break;
    }

    const mockProfile: UserProfile = {
      id: `usr-${selectedRole}-${Date.now()}`,
      nik: nik || (selectedRole === 'warga' ? '1801051508850001' : '1801050000000099'),
      nama_lengkap: name,
      role: selectedRole,
      dusun_id: selectedRole === 'kepala_dusun' ? 'dusun-1' : undefined
    };

    setUser(mockProfile);
    localStorage.setItem('sid_wawasan_user', JSON.stringify(mockProfile));
    setIsLoading(false);
  };

  const signInWithSupabase = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseActive) {
      return { success: false, error: 'Supabase belum dikonfigurasi di file .env' };
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      setIsLoading(false);
      if (error) return { success: false, error: error.message };
      if (data.session?.user) {
        await fetchUserProfile(data.session.user.id, data.session.user.email);
        return { success: true };
      }
      return { success: false, error: 'Gagal mendapatkan sesi pengguna' };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Terjadi kesalahan' };
    }
  };

  const logout = async () => {
    if (isSupabaseActive) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Sign out warning:', e);
      }
    }
    setUser(DEFAULT_USER);
    localStorage.setItem('sid_wawasan_user', JSON.stringify(DEFAULT_USER));
  };

  const registerAsWarga = async (nik: string, nama: string, email?: string): Promise<boolean> => {
    setIsLoading(true);
    const newWarga: UserProfile = {
      id: `usr-warga-${Date.now()}`,
      nik,
      nama_lengkap: nama,
      email,
      role: 'warga'
    };
    setUser(newWarga);
    localStorage.setItem('sid_wawasan_user', JSON.stringify(newWarga));
    setIsLoading(false);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'warga',
        isAuthenticated: !!user && user.role !== 'warga',
        isLoading,
        isSupabaseActive,
        loginAsRole,
        logout,
        registerAsWarga,
        signInWithSupabase
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Lineage, Member, AnniversaryEvent, FamilyMembership } from '../types';
import { MOCK_USER, MOCK_LINEAGES, MOCK_MEMBERS, MOCK_ANNIVERSARIES } from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

interface AppContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<{ success: boolean; error?: string; needsConfirmation?: boolean }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  lineages: Lineage[];
  activeLineageId: string;
  setActiveLineageId: (id: string) => void;
  members: Member[];
  anniversaries: AnniversaryEvent[];
  addMember: (member: Omit<Member, 'id'>) => void;
  updateMember: (member: Member) => void;
  deleteMember: (id: string) => void;
  addLineage: (lineage: Omit<Lineage, 'id' | 'createdAt' | 'adminId' | 'totalGenerations' | 'totalMembers'>) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  isSupabaseConnected: boolean;
  membershipStatus: 'active' | 'pending' | 'none';
  session: Session | null;
  isLoadingAuth: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [membershipStatus, setMembershipStatus] = useState<'active' | 'pending' | 'none'>('active');

  const [lineages, setLineages] = useState<Lineage[]>(MOCK_LINEAGES);
  const [activeLineageId, setActiveLineageId] = useState<string>(MOCK_LINEAGES[0].id);
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [anniversaries, setAnniversaries] = useState<AnniversaryEvent[]>(MOCK_ANNIVERSARIES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Check Supabase Auth session on mount and listen to changes
  useEffect(() => {
    let isMounted = true;

    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        if (!isMounted) return;
        if (session) {
          setSession(session);
          await syncUserFromSession(session);
          setIsSupabaseConnected(true);
        } else {
          // If no live session, keep currentUser null for auth guard
          setIsSupabaseConnected(true);
        }
        if (isMounted) {
          setIsLoadingAuth(false);
        }
      }).catch((err) => {
        if (!isMounted) return;
        console.warn('Supabase session check error:', err);
        setIsLoadingAuth(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!isMounted) return;
        setSession(session);
        if (session) {
          syncUserFromSession(session);
        } else {
          setCurrentUser(null);
        }
      });

      return () => {
        isMounted = false;
        subscription.unsubscribe();
      };
    } else {
      setIsLoadingAuth(false);
    }
  }, []);

  const syncUserFromSession = async (currentSession: Session) => {
    const sbUser = currentSession.user;
    const fullName = sbUser.user_metadata?.full_name || sbUser.email?.split('@')[0] || 'Thành viên';

    // Check family_memberships for this user using current authenticated session
    let status: 'active' | 'pending' | 'none' = 'active';
    let resolvedRole: User['role'] = 'viewer';

    try {
      const { data: memberships, error } = await supabase
        .from('family_memberships')
        .select('*')
        .eq('user_id', sbUser.id);

      if (!error && memberships && memberships.length > 0) {
        const activeMemberships = memberships.filter(
          (m: Record<string, unknown>) => !m.status || String(m.status).toLowerCase() === 'active'
        );

        if (activeMemberships.length > 0) {
          status = 'active';
          const roles = activeMemberships.map((m: Record<string, unknown>) =>
            String(m.role ?? '').toLowerCase()
          );
          if (roles.includes('owner')) {
            resolvedRole = 'owner';
          } else if (roles.includes('admin')) {
            resolvedRole = 'admin';
          } else if (roles.includes('editor')) {
            resolvedRole = 'editor';
          } else {
            resolvedRole = 'viewer';
          }
        } else {
          const firstStatus = String(memberships[0].status ?? 'pending').toLowerCase();
          status = firstStatus === 'active' ? 'active' : 'pending';
          const firstRole = String(memberships[0].role ?? 'viewer').toLowerCase();
          if (firstRole === 'owner' || firstRole === 'admin' || firstRole === 'editor' || firstRole === 'viewer') {
            resolvedRole = firstRole;
          }
        }
      }
    } catch {
      // Fallback if table not accessible
      status = 'active';
    }

    setMembershipStatus(status);

    setCurrentUser({
      id: sbUser.id,
      fullName,
      email: sbUser.email || '',
      role: resolvedRole,
      lineageIds: ['lin-1'],
      avatarUrl: sbUser.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    });
  };

  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    // If demo login or password not provided (quick demo button)
    if (!password || email === 'minh.nguyen@coinuong.vn') {
      setCurrentUser(MOCK_USER);
      setMembershipStatus('active');
      showToast('Đăng nhập thành công với tài khoản quản trị (Demo)!');
      return { success: true };
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          return { success: false, error: error.message };
        }
        if (data.session) {
          setSession(data.session);
          await syncUserFromSession(data.session);
          showToast('Đăng nhập thành công vào hệ thống Cội Nguồn!');
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err?.message || 'Lỗi kết nối đăng nhập.' };
      }
    }

    // Fallback mock login
    setCurrentUser({
      ...MOCK_USER,
      email,
    });
    setMembershipStatus('active');
    showToast('Đăng nhập thành công!');
    return { success: true };
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setCurrentUser(null);
    setMembershipStatus('none');
    showToast('Đã đăng xuất khỏi tài khoản.');
  };

  const register = async (fullName: string, email: string, password: string): Promise<{ success: boolean; error?: string; needsConfirmation?: boolean }> => {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });

        if (error) {
          return { success: false, error: error.message };
        }

        // Check if email confirmation is needed
        if (data.user && !data.session) {
          showToast('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.');
          return { success: true, needsConfirmation: true };
        }

        if (data.session) {
          setSession(data.session);
          await syncUserFromSession(data.session);
          showToast('Đăng ký và đăng nhập thành công!');
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err?.message || 'Lỗi đăng ký tài khoản.' };
      }
    }

    // Fallback registration
    setCurrentUser({
      id: 'u-' + Date.now(),
      fullName,
      email,
      role: 'admin',
      lineageIds: ['lin-1'],
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    });
    setMembershipStatus('active');
    showToast('Đăng ký tài khoản thành công!');
    return { success: true };
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + '/login',
        });
        if (error) {
          return { success: false, error: error.message };
        }
        showToast('Đã gửi email hướng dẫn khôi phục mật khẩu. Vui lòng kiểm tra hộp thư.');
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Không thể gửi yêu cầu khôi phục.' };
      }
    }

    showToast('Đã gửi email hướng dẫn khôi phục mật khẩu.');
    return { success: true };
  };

  const addMember = (newMemData: Omit<Member, 'id'>) => {
    const newMember: Member = {
      ...newMemData,
      id: 'm-' + Date.now(),
    };
    setMembers((prev) => [newMember, ...prev]);
    showToast(`Đã thêm thành viên "${newMember.fullName}" thành công!`);
  };

  const updateMember = (updated: Member) => {
    setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    showToast(`Đã cập nhật hồ sơ thành viên "${updated.fullName}".`);
  };

  const deleteMember = (id: string) => {
    const target = members.find((m) => m.id === id);
    setMembers((prev) => prev.filter((m) => m.id !== id));
    showToast(`Đã xóa thành viên ${target ? target.fullName : ''} khỏi hệ thống.`);
  };

  const addLineage = (lineageData: Omit<Lineage, 'id' | 'createdAt' | 'adminId' | 'totalGenerations' | 'totalMembers'>) => {
    const newLineage: Lineage = {
      ...lineageData,
      id: 'lin-' + Date.now(),
      adminId: currentUser ? currentUser.id : 'u1',
      totalGenerations: 1,
      totalMembers: 1,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLineages((prev) => [...prev, newLineage]);
    setActiveLineageId(newLineage.id);
    showToast(`Đã tạo mới dòng họ "${newLineage.name}" thành công!`);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        logout,
        register,
        forgotPassword,
        lineages,
        activeLineageId,
        setActiveLineageId,
        members,
        anniversaries,
        addMember,
        updateMember,
        deleteMember,
        addLineage,
        toastMessage,
        showToast,
        isSupabaseConnected,
        membershipStatus,
        session,
        isLoadingAuth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

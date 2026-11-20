import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  supabaseAnonKey !== 'your-supabase-anon-key'
);

// Mask sensitive keys for secure display
export const getMaskedConfig = () => {
  const maskedUrl = supabaseUrl ? supabaseUrl.replace(/(https:\/\/)([^.]+)(\..*)/, '$1***$3') : 'Chưa có';
  const maskedKey = supabaseAnonKey ? `${supabaseAnonKey.substring(0, 6)}...${supabaseAnonKey.substring(supabaseAnonKey.length - 4)}` : 'Chưa có';
  return {
    url: maskedUrl,
    key: maskedKey,
    hasUrl: Boolean(supabaseUrl),
    hasKey: Boolean(supabaseAnonKey),
  };
};

// Create Supabase client safely
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);

export interface ConnectionTestResult {
  configStatus: 'success' | 'failed' | 'missing';
  configMessage: string;
  clientStatus: 'success' | 'failed';
  clientMessage: string;
  authStatus: 'success' | 'failed' | 'pending';
  authMessage: string;
  errorDetail?: string;
}

export async function testSupabaseConnection(): Promise<ConnectionTestResult> {
  const result: ConnectionTestResult = {
    configStatus: 'missing',
    configMessage: 'Đang kiểm tra biến môi trường...',
    clientStatus: 'failed',
    clientMessage: 'Chưa khởi tạo',
    authStatus: 'pending',
    authMessage: 'Chưa kiểm tra',
  };

  // 1. Kiểm tra cấu hình
  if (supabaseUrl && supabaseAnonKey) {
    result.configStatus = 'success';
    result.configMessage = `Đọc được cấu hình URL (${getMaskedConfig().url}) và Anon Key.`;
  } else {
    result.configStatus = 'failed';
    result.configMessage = 'Thiếu VITE_SUPABASE_URL hoặc VITE_SUPABASE_ANON_KEY.';
    return result;
  }

  // 2. Khởi tạo Supabase client
  try {
    if (supabase) {
      result.clientStatus = 'success';
      result.clientMessage = 'Khởi tạo Supabase client thành công.';
    } else {
      result.clientStatus = 'failed';
      result.clientMessage = 'Không thể khởi tạo Supabase client.';
      return result;
    }
  } catch (err: any) {
    result.clientStatus = 'failed';
    result.clientMessage = `Lỗi khởi tạo client: ${err?.message || err}`;
    result.errorDetail = err?.message;
    return result;
  }

  // 3. Gọi supabase.auth.getSession()
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      result.authStatus = 'failed';
      result.authMessage = `Gọi Supabase Auth thất bại: ${error.message}`;
      result.errorDetail = error.message;
    } else {
      result.authStatus = 'success';
      result.authMessage = 'Gọi Supabase Auth thành công (getSession() phản hồi bình thường).';
    }
  } catch (err: any) {
    result.authStatus = 'failed';
    result.authMessage = `Lỗi kết nối Auth: ${err?.message || err}`;
    result.errorDetail = err?.message;
  }

  return result;
}

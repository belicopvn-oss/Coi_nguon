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

export type ReviewMemberLinkDecision = 'approve' | 'reject';

export interface ReviewMemberLinkResult {
  success: boolean;
  data?: unknown;
  message: string;
  errorCode?: string;
  errorDetail?: string;
  errorHint?: string;
}

/**
 * Gọi RPC review_member_account_link bằng phiên Supabase Auth hiện tại.
 * Chỉ cho phép thực thi khi phiên đăng nhập thật hợp lệ và tài khoản có quyền chủ gia phả (owner)
 * trong bảng family_memberships. Không giả lập auth.uid(), không dùng service_role.
 */
export async function reviewMemberAccountLink(
  linkId: string,
  decision: ReviewMemberLinkDecision = 'approve'
): Promise<ReviewMemberLinkResult> {
  const trimmedLinkId = linkId.trim();

  if (!trimmedLinkId) {
    return {
      success: false,
      message: 'Vui lòng nhập mã liên kết (p_link_id) hợp lệ.',
    };
  }

  if (!isSupabaseConfigured) {
    return {
      success: false,
      message: 'Ứng dụng chưa được cấu hình biến môi trường Supabase (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).',
    };
  }

  // 1. Xác nhận phiên đăng nhập Supabase Auth thực tế đang hoạt động
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    return {
      success: false,
      message: `Không thể đọc phiên xác thực hiện tại: ${sessionError.message}`,
      errorCode: sessionError.code,
      errorDetail: sessionError.message,
    };
  }

  if (!session?.access_token || !session?.user?.id) {
    return {
      success: false,
      message:
        'Chưa có phiên đăng nhập Supabase hợp lệ. Vui lòng đăng nhập bằng tài khoản Supabase thật (không dùng tài khoản demo).',
    };
  }

  // 2. Xác minh người dùng hiện tại có quyền chủ gia phả (owner) đang hoạt động
  const { data: memberships, error: membershipError } = await supabase
    .from('family_memberships')
    .select('*')
    .eq('user_id', session.user.id);

  if (membershipError) {
    return {
      success: false,
      message: 'Không thể kiểm tra quyền chủ gia phả từ bảng family_memberships.',
      errorCode: membershipError.code,
      errorDetail: membershipError.message,
      errorHint: membershipError.hint || undefined,
    };
  }

  const isOwner =
    Array.isArray(memberships) &&
    memberships.some((m: Record<string, unknown>) => {
      const role = String(m.role ?? '').toLowerCase();
      const status = m.status ? String(m.status).toLowerCase() : 'active';
      return role === 'owner' && status === 'active';
    });

  if (!isOwner) {
    return {
      success: false,
      message:
        'Từ chối thực thi: Chỉ tài khoản có quyền chủ gia phả (owner) đang hoạt động mới được phép xác minh liên kết hồ sơ.',
    };
  }

  // 3. Gọi RPC review_member_account_link bằng JWT của phiên hiện tại
  try {
    const { data, error } = await supabase.rpc('review_member_account_link', {
      p_link_id: trimmedLinkId,
      p_decision: decision,
    });

    if (error) {
      return {
        success: false,
        message: error.message || 'Gọi RPC review_member_account_link thất bại.',
        errorCode: error.code,
        errorDetail: error.details || undefined,
        errorHint: error.hint || undefined,
      };
    }

    return {
      success: true,
      data,
      message:
        decision === 'approve'
          ? 'Đã phê duyệt xác minh liên kết hồ sơ gia đình thành công.'
          : 'Đã cập nhật quyết định từ chối liên kết hồ sơ gia đình thành công.',
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      message: `Lỗi kết nối khi gọi RPC review_member_account_link: ${errMsg}`,
      errorDetail: errMsg,
    };
  }
}

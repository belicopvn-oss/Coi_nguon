import React, { useEffect, useState } from 'react';
import { testSupabaseConnection, ConnectionTestResult, getMaskedConfig } from '../../lib/supabase';
import { Database, CheckCircle2, XCircle, Loader2, RefreshCw, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

const TECHNICAL_BANNER_ROLES: ReadonlySet<string> = new Set(['owner', 'admin']);

/**
 * Cho phép bật thanh trạng thái Supabase thủ công trong môi trường development
 * bằng biến môi trường VITE_SHOW_SUPABASE_STATUS_BANNER=true hoặc query ?debugSupabase=1.
 * Ở bản build production luôn trả về false.
 */
export function isDevSupabaseBannerEnabled(search?: string): boolean {
  if (!import.meta.env.DEV) {
    return false;
  }
  if (import.meta.env.VITE_SHOW_SUPABASE_STATUS_BANNER === 'true') {
    return true;
  }
  const query = search ?? (typeof window !== 'undefined' ? window.location.search : '');
  if (!query) {
    return false;
  }
  const params = new URLSearchParams(query);
  return params.get('debugSupabase') === '1';
}

/**
 * Kiểm tra quyền xem thanh trạng thái kỹ thuật trong khu vực quản trị.
 * Chỉ tài khoản đã đăng nhập, trạng thái active và thuộc vai trò owner hoặc admin mới được render.
 */
export function canViewSupabaseStatusBanner(
  isAuthenticated: boolean,
  membershipStatus: 'active' | 'pending' | 'none',
  role?: string | null
): boolean {
  if (!isAuthenticated || membershipStatus !== 'active' || !role) {
    return false;
  }
  return TECHNICAL_BANNER_ROLES.has(role.toLowerCase());
}

export const SupabaseStatusBanner: React.FC = () => {
  const [testResult, setTestResult] = useState<ConnectionTestResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const runTest = async () => {
    setLoading(true);
    const res = await testSupabaseConnection();
    setTestResult(res);
    setLoading(false);
  };

  useEffect(() => {
    runTest();
  }, []);

  const masked = getMaskedConfig();
  const currentOrigin = window.location.origin;
  const currentHref = window.location.href;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  return (
    <div className="bg-[#162B23] text-[#F5F0E5]/85 border-b border-[#B28A45]/20 text-xs px-4 py-2">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <Database className="w-3.5 h-3.5 text-[#B28A45] shrink-0" />
          <span className="text-[#F5F0E5]/80">Kết nối dữ liệu:</span>
          {loading ? (
            <span className="inline-flex items-center gap-1.5 text-[#E5C98B]">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang kiểm tra...
            </span>
          ) : testResult?.authStatus === 'success' ? (
            <span className="inline-flex items-center gap-1.5 text-[#E5C98B] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#B28A45]" /> Đã kết nối Supabase Auth
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-red-300 font-medium">
              <XCircle className="w-3.5 h-3.5 text-red-400" /> Chưa kết nối Supabase
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1 text-[#E5C98B] hover:text-[#F5F0E5] font-medium transition-colors cursor-pointer"
          >
            <span>{expanded ? 'Thu gọn chi tiết' : 'Chi tiết kết nối & URL'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={runTest}
            className="p-1 rounded hover:bg-[#203D32] text-[#E5C98B] transition-colors cursor-pointer"
            title="Kiểm tra lại kết nối"
            aria-label="Kiểm tra lại kết nối"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-[#F5F0E5]/10 space-y-3 animate-fade-in text-[11px]">
          {/* URL Location Box */}
          <div className="bg-[#203D32]/85 p-3.5 rounded-xl border border-[#B28A45]/25 space-y-2">
            <h4 className="font-semibold text-[#E5C98B] text-xs">Địa chỉ ứng dụng hiện tại</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center justify-between bg-[#162B23] px-3 py-2 rounded-lg border border-[#F5F0E5]/10">
                <div className="overflow-hidden pr-2">
                  <span className="text-[#F5F0E5]/60 block text-[10px]">window.location.origin</span>
                  <span className="font-mono text-[#E5C98B] text-xs truncate block">{currentOrigin}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(currentOrigin, 'origin')}
                  className="bg-[#B28A45] hover:bg-[#9E7838] text-[#162B23] font-semibold px-2.5 py-1.5 rounded-md flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                >
                  {copiedType === 'origin' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'origin' ? 'Đã chép' : 'Sao chép'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between bg-[#162B23] px-3 py-2 rounded-lg border border-[#F5F0E5]/10">
                <div className="overflow-hidden pr-2">
                  <span className="text-[#F5F0E5]/60 block text-[10px]">window.location.href</span>
                  <span className="font-mono text-[#E5C98B] text-xs truncate block">{currentHref}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(currentHref, 'href')}
                  className="bg-[#B28A45] hover:bg-[#9E7838] text-[#162B23] font-semibold px-2.5 py-1.5 rounded-md flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                >
                  {copiedType === 'href' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'href' ? 'Đã chép' : 'Sao chép'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3-State Diagnostic Grid */}
          {testResult && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className={`p-3 rounded-xl border ${testResult.configStatus === 'success' ? 'bg-[#203D32]/70 border-[#B28A45]/25' : 'bg-red-950/60 border-red-700/60'}`}>
                <div className="flex items-center gap-1.5 font-semibold text-[#F5F0E5] mb-1">
                  {testResult.configStatus === 'success' ? <CheckCircle2 className="w-3.5 h-3.5 text-[#B28A45]" /> : <XCircle className="w-3.5 h-3.5 text-red-400" />}
                  <span>1. Cấu hình biến môi trường</span>
                </div>
                <p className="text-[#F5F0E5]/75">{testResult.configMessage}</p>
                <div className="mt-1 text-[10px] text-[#F5F0E5]/55 font-mono">
                  URL: {masked.url} · Key: {masked.key}
                </div>
              </div>

              <div className={`p-3 rounded-xl border ${testResult.clientStatus === 'success' ? 'bg-[#203D32]/70 border-[#B28A45]/25' : 'bg-red-950/60 border-red-700/60'}`}>
                <div className="flex items-center gap-1.5 font-semibold text-[#F5F0E5] mb-1">
                  {testResult.clientStatus === 'success' ? <CheckCircle2 className="w-3.5 h-3.5 text-[#B28A45]" /> : <XCircle className="w-3.5 h-3.5 text-red-400" />}
                  <span>2. Khởi tạo Supabase Client</span>
                </div>
                <p className="text-[#F5F0E5]/75">{testResult.clientMessage}</p>
              </div>

              <div className={`p-3 rounded-xl border ${testResult.authStatus === 'success' ? 'bg-[#203D32]/70 border-[#B28A45]/25' : 'bg-red-950/60 border-red-700/60'}`}>
                <div className="flex items-center gap-1.5 font-semibold text-[#F5F0E5] mb-1">
                  {testResult.authStatus === 'success' ? <CheckCircle2 className="w-3.5 h-3.5 text-[#B28A45]" /> : <XCircle className="w-3.5 h-3.5 text-red-400" />}
                  <span>3. Xác thực Supabase Auth</span>
                </div>
                <p className="text-[#F5F0E5]/75">{testResult.authMessage}</p>
                {testResult.errorDetail && (
                  <p className="mt-1 text-red-300 font-mono text-[10px]">Lỗi: {testResult.errorDetail}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

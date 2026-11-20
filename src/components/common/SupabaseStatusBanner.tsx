import React, { useEffect, useState } from 'react';
import { testSupabaseConnection, ConnectionTestResult, getMaskedConfig } from '../../lib/supabase';
import { Database, CheckCircle2, XCircle, Loader2, RefreshCw, Copy, Check } from 'lucide-react';

export const SupabaseStatusBanner: React.FC = () => {
  const [testResult, setTestResult] = useState<ConnectionTestResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<boolean>(true); // Expanded by default so user sees location info easily
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
    <div className="bg-[#083327] text-emerald-100 border-b border-amber-600/30 text-xs px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <Database className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold text-amber-200">Trạng thái kết nối Supabase & Thông tin URL:</span>
          {loading ? (
            <span className="inline-flex items-center gap-1.5 text-amber-300">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang kiểm tra...
            </span>
          ) : testResult?.authStatus === 'success' ? (
            <span className="inline-flex items-center gap-1.5 text-emerald-300 font-bold bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Đã kết nối Auth
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-red-300 font-bold bg-red-950 px-2.5 py-0.5 rounded-full border border-red-700">
              <XCircle className="w-3.5 h-3.5 text-red-400" /> Lỗi kết nối
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-amber-300 hover:underline font-semibold cursor-pointer"
          >
            {expanded ? 'Ẩn thông tin URL & Chi tiết ▲' : 'Xem thông tin URL & Chi tiết ▼'}
          </button>
          <button
            onClick={runTest}
            className="p-1 rounded bg-emerald-900 hover:bg-emerald-800 text-amber-300 transition-colors"
            title="Kiểm tra lại"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-emerald-900 space-y-3 animate-fade-in text-[11px]">
          {/* URL Location Box */}
          <div className="bg-emerald-950/80 p-3.5 rounded-2xl border border-amber-500/30 space-y-2">
            <h4 className="font-bold text-amber-300 uppercase tracking-wider text-[10px]">Thông tin Địa chỉ Ứng dụng (Window Location)</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Origin */}
              <div className="flex items-center justify-between bg-black/20 px-3 py-2 rounded-xl border border-emerald-900">
                <div className="overflow-hidden pr-2">
                  <span className="text-gray-400 block text-[10px]">window.location.origin:</span>
                  <span className="font-mono text-amber-200 font-bold text-xs truncate block">{currentOrigin}</span>
                </div>
                <button
                  onClick={() => handleCopy(currentOrigin, 'origin')}
                  className="bg-amber-500 hover:bg-amber-600 text-[#0F4C3A] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 shrink-0 transition-colors"
                  title="Sao chép Origin"
                >
                  {copiedType === 'origin' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'origin' ? 'Đã chép' : 'Sao chép'}</span>
                </button>
              </div>

              {/* Href */}
              <div className="flex items-center justify-between bg-black/20 px-3 py-2 rounded-xl border border-emerald-900">
                <div className="overflow-hidden pr-2">
                  <span className="text-gray-400 block text-[10px]">window.location.href:</span>
                  <span className="font-mono text-amber-200 font-bold text-xs truncate block">{currentHref}</span>
                </div>
                <button
                  onClick={() => handleCopy(currentHref, 'href')}
                  className="bg-amber-500 hover:bg-amber-600 text-[#0F4C3A] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 shrink-0 transition-colors"
                  title="Sao chép Href"
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
              {/* State 1 */}
              <div className={`p-3 rounded-xl border ${testResult.configStatus === 'success' ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200' : 'bg-red-950/60 border-red-800 text-red-200'}`}>
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  {testResult.configStatus === 'success' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-red-400" />}
                  <span>1. Cấu hình Env</span>
                </div>
                <p className="text-gray-300">{testResult.configMessage}</p>
                <div className="mt-1 text-[10px] text-gray-400 font-mono">
                  URL: {masked.url} | Key: {masked.key}
                </div>
              </div>

              {/* State 2 */}
              <div className={`p-3 rounded-xl border ${testResult.clientStatus === 'success' ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200' : 'bg-red-950/60 border-red-800 text-red-200'}`}>
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  {testResult.clientStatus === 'success' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-red-400" />}
                  <span>2. Supabase Client</span>
                </div>
                <p className="text-gray-300">{testResult.clientMessage}</p>
              </div>

              {/* State 3 */}
              <div className={`p-3 rounded-xl border ${testResult.authStatus === 'success' ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200' : 'bg-red-950/60 border-red-800 text-red-200'}`}>
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  {testResult.authStatus === 'success' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-red-400" />}
                  <span>3. Supabase Auth (getSession)</span>
                </div>
                <p className="text-gray-300">{testResult.authMessage}</p>
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

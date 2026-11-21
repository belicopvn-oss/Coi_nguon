import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MemberAvatar } from '../../components/common/BrandMark';
import {
  reviewMemberAccountLink,
  ReviewMemberLinkDecision,
  ReviewMemberLinkResult,
} from '../../lib/supabase';
import { ShieldCheck, CheckCircle2, AlertCircle, Loader2, Lock } from 'lucide-react';

const DEFAULT_LINK_ID = '166f0d48-95c7-496c-95ca-c20cbdc6b3dc';

const ROLE_LABELS: Record<string, string> = {
  owner: 'Chủ gia phả (Owner)',
  admin: 'Quản trị viên (Admin)',
  editor: 'Biên tập viên (Editor)',
  viewer: 'Thành viên dòng họ (Viewer)',
};

export const AccountManagement: React.FC = () => {
  const { currentUser, session, membershipStatus, showToast } = useApp();
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '0912 345 678');

  // State for RPC review_member_account_link
  const [linkId, setLinkId] = useState(DEFAULT_LINK_ID);
  const [decision, setDecision] = useState<ReviewMemberLinkDecision>('approve');
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewResult, setReviewResult] = useState<ReviewMemberLinkResult | null>(null);

  const hasLiveSupabaseSession = Boolean(session?.access_token && session?.user?.id);
  const isFamilyTreeOwner =
    hasLiveSupabaseSession &&
    membershipStatus === 'active' &&
    currentUser?.role === 'owner';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Đã cập nhật thông tin tài khoản thành công!');
  };

  const handleReviewMemberLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFamilyTreeOwner) {
      setReviewResult({
        success: false,
        message:
          'Chỉ tài khoản đã đăng nhập Supabase thật và có quyền chủ gia phả (owner) mới được thực hiện xác minh liên kết hồ sơ.',
      });
      return;
    }

    setIsReviewing(true);
    setReviewResult(null);

    const res = await reviewMemberAccountLink(linkId, decision);
    setIsReviewing(false);
    setReviewResult(res);

    if (res.success) {
      showToast(res.message);
    }
  };

  const roleLabel = ROLE_LABELS[currentUser?.role || 'viewer'] || 'Thành viên dòng họ';

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-[#E3D9C6] shadow-xs">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#203D32]">Quản lý tài khoản</h2>
        <p className="text-sm text-[#5A534A] mt-1">Cập nhật thông tin cá nhân và quyền truy cập trong dòng họ</p>
      </div>

      <div className="bg-white p-6 sm:p-9 rounded-2xl border border-[#E3D9C6] shadow-xs">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 border-b border-[#EAE2D1]">
            <MemberAvatar
              src={currentUser?.avatarUrl}
              name={currentUser?.fullName || 'Thành viên'}
              size="xl"
            />
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#6B4632]">
                Vai trò: {roleLabel}
              </p>
              <h3 className="font-serif text-2xl font-semibold text-[#203D32]">{currentUser?.fullName}</h3>
              <p className="text-sm text-[#5A534A]">{currentUser?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="acc-fullname" className="block text-xs font-semibold text-[#6B4632]">
                Họ và tên
              </label>
              <input
                id="acc-fullname"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] focus:outline-none focus:ring-2 focus:ring-[#203D32]"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="acc-email" className="block text-xs font-semibold text-[#6B4632]">
                Email liên hệ
              </label>
              <input
                id="acc-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] focus:outline-none focus:ring-2 focus:ring-[#203D32]"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="acc-phone" className="block text-xs font-semibold text-[#6B4632]">
                Số điện thoại
              </label>
              <input
                id="acc-phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#203D32]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#EAE2D1] flex items-center justify-end">
            <button
              type="submit"
              className="bg-[#203D32] hover:bg-[#162B23] text-[#F5F0E5] font-semibold px-7 py-3 rounded-lg text-sm transition-colors cursor-pointer"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>

      {/* Owner-only Member Account Link Verification via Supabase RPC */}
      <section className="bg-white p-6 sm:p-9 rounded-2xl border border-[#E3D9C6] shadow-xs space-y-5">
        <div className="flex items-start gap-3.5 pb-4 border-b border-[#EAE2D1]">
          <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#B28A45]/45 text-[#203D32] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#203D32]">
              Xác minh liên kết hồ sơ gia đình
            </h3>
            <p className="text-xs sm:text-sm text-[#5A534A] leading-relaxed">
              Phê duyệt yêu cầu liên kết tài khoản thành viên với hồ sơ gia phả bằng phiên xác thực Supabase hiện tại
              (RPC <code className="font-mono text-xs text-[#203D32] bg-[#FAF7F0] px-1.5 py-0.5 rounded">review_member_account_link</code>).
            </p>
          </div>
        </div>

        {/* Current Auth & Permission Summary */}
        <div className="bg-[#FAF7F0] border border-[#E3D9C6] rounded-xl p-4 text-xs text-[#4A443C] space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold text-[#6B4632]">Phiên xác thực Supabase:</span>
            <span className={hasLiveSupabaseSession ? 'text-[#203D32] font-semibold' : 'text-red-700 font-semibold'}>
              {hasLiveSupabaseSession
                ? `Đã xác thực (${session?.user?.email || session?.user?.id})`
                : 'Chưa có phiên Supabase thật (đang ở chế độ demo)'}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold text-[#6B4632]">Quyền hiện tại:</span>
            <span className={isFamilyTreeOwner ? 'text-[#203D32] font-semibold' : 'text-[#5A534A] font-medium'}>
              {roleLabel}
            </span>
          </div>
        </div>

        {!isFamilyTreeOwner ? (
          <div className="bg-amber-50/80 border border-[#B28A45]/45 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-[#513424]">
            <Lock className="w-4 h-4 text-[#8F6D32] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-[#203D32]">Chỉ dành cho chủ gia phả (Owner)</p>
              <p className="leading-relaxed">
                {!hasLiveSupabaseSession
                  ? 'Vui lòng đăng xuất tài khoản demo và đăng nhập bằng email/mật khẩu tài khoản chủ gia phả trên Supabase để thực hiện xác minh liên kết hồ sơ.'
                  : 'Tài khoản hiện tại không có quyền chủ gia phả (owner) đang hoạt động trong family_memberships nên không thể gọi thao tác phê duyệt này.'}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleReviewMemberLink} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label htmlFor="rpc-link-id" className="block text-xs font-semibold text-[#6B4632]">
                  Mã liên kết hồ sơ (<code className="font-mono">p_link_id</code>)
                </label>
                <input
                  id="rpc-link-id"
                  type="text"
                  required
                  value={linkId}
                  onChange={(e) => setLinkId(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm font-mono text-[#1D2823] focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                  placeholder="166f0d48-95c7-496c-95ca-c20cbdc6b3dc"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="rpc-decision" className="block text-xs font-semibold text-[#6B4632]">
                  Quyết định (<code className="font-mono">p_decision</code>)
                </label>
                <select
                  id="rpc-decision"
                  value={decision}
                  onChange={(e) => setDecision(e.target.value as ReviewMemberLinkDecision)}
                  className="w-full px-4 py-3 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] font-medium focus:outline-none focus:ring-2 focus:ring-[#203D32] cursor-pointer"
                >
                  <option value="approve">approve (Phê duyệt)</option>
                  <option value="reject">reject (Từ chối)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end pt-1">
              <button
                type="submit"
                disabled={isReviewing || !linkId.trim()}
                className="inline-flex items-center justify-center gap-2 bg-[#B28A45] hover:bg-[#9E7838] text-[#162B23] font-semibold px-6 py-3 rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {isReviewing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang xác minh...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Xác minh liên kết hồ sơ</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Clear Success / Error Feedback */}
        {reviewResult && (
          <div
            role="status"
            className={`rounded-xl p-4 border text-xs sm:text-sm space-y-2 animate-fade-in ${
              reviewResult.success
                ? 'bg-emerald-50/70 border-[#203D32]/30 text-[#1D2823]'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {reviewResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-[#203D32] shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 min-w-0 flex-1">
                <p className="font-semibold">
                  {reviewResult.success ? 'Thực thi RPC thành công' : 'Thực thi RPC không thành công'}
                </p>
                <p className="leading-relaxed">{reviewResult.message}</p>

                {reviewResult.errorCode && (
                  <p className="font-mono text-xs text-red-700">
                    Mã lỗi: {reviewResult.errorCode}
                  </p>
                )}
                {reviewResult.errorDetail && reviewResult.errorDetail !== reviewResult.message && (
                  <p className="font-mono text-xs text-red-700 break-words">
                    Chi tiết: {reviewResult.errorDetail}
                  </p>
                )}
                {reviewResult.errorHint && (
                  <p className="text-xs text-red-700">
                    Gợi ý: {reviewResult.errorHint}
                  </p>
                )}

                {reviewResult.success && reviewResult.data !== undefined && (
                  <div className="pt-1">
                    <p className="text-xs font-semibold text-[#203D32] mb-1">Dữ liệu phản hồi từ Supabase:</p>
                    <pre className="bg-white/90 border border-[#E3D9C6] rounded-lg p-3 text-xs font-mono text-[#1D2823] overflow-x-auto">
                      {typeof reviewResult.data === 'string'
                        ? reviewResult.data
                        : JSON.stringify(reviewResult.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

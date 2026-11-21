import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, LogOut, Mail, RefreshCw } from 'lucide-react';
import { BrandSeal } from '../../components/common/BrandMark';

export const PendingAccessPage: React.FC = () => {
  const { currentUser, logout, showToast } = useApp();

  const handleRefreshCheck = () => {
    showToast('Đang kiểm tra lại trạng thái cấp quyền...');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-[#E3D9C6] overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#203D32] via-[#B28A45] to-[#6B4632]" />

        <div className="p-7 sm:p-8 text-center space-y-5">
          <div className="flex items-center justify-center gap-3">
            <BrandSeal className="w-11 h-11" variant="light" />
            <div className="w-11 h-11 rounded-xl bg-[#FAF7F0] border border-[#B28A45]/40 text-[#6B4632] flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-semibold text-[#203D32]">Đang chờ cấp quyền truy cập</h2>
            <p className="text-sm text-[#4A443C] leading-relaxed">
              Tài khoản đã được xác thực ({currentUser?.email}). Vui lòng chờ chủ sở hữu gia phả cấp quyền truy cập.
            </p>
          </div>

          <div className="bg-[#FAF7F0] border border-[#E3D9C6] p-4 rounded-xl text-xs text-[#4A443C] space-y-2 text-left">
            <div className="flex items-center gap-2 font-semibold text-[#6B4632]">
              <Mail className="w-4 h-4 text-[#B28A45] shrink-0" />
              <span>Lưu ý bảo mật dòng họ</span>
            </div>
            <p className="leading-relaxed">
              Hệ thống Cội Nguồn áp dụng phân quyền nội bộ nghiêm ngặt nhằm bảo vệ thông tin riêng tư của gia đình. Vui lòng liên hệ Trưởng tộc hoặc Quản trị viên để kích hoạt quyền thành viên.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleRefreshCheck}
              className="w-full bg-[#203D32] hover:bg-[#162B23] text-[#F5F0E5] font-semibold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Kiểm tra lại trạng thái</span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="w-full bg-[#FAF7F0] hover:bg-[#EFE5D0] text-[#203D32] border border-[#E3D9C6] font-semibold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất tài khoản</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, LogOut, Mail, RefreshCw } from 'lucide-react';

export const PendingAccessPage: React.FC = () => {
  const { currentUser, logout, showToast } = useApp();

  const handleRefreshCheck = () => {
    showToast('Đang kiểm tra lại trạng thái cấp quyền...');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-amber-500/30 p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-bold text-[#0F4C3A]">Đang Chờ Cấp Quyền</h2>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            Tài khoản đã được xác thực ({currentUser?.email}). Vui lòng chờ chủ sở hữu gia phả cấp quyền truy cập.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200/80 p-4 rounded-2xl text-xs text-amber-900 space-y-2 text-left">
          <div className="flex items-center gap-2 font-bold">
            <Mail className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Lưu ý khi tham gia:</span>
          </div>
          <p className="text-amber-800/90 leading-relaxed">
            Hệ thống quản lý gia phả Cội Nguồn yêu cầu xác thực phân quyền nghiêm ngặt để bảo vệ thông tin dòng họ. Bạn có thể liên hệ Trưởng tộc hoặc Quản trị viên để được duyệt vào danh sách thành viên active.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={handleRefreshCheck}
            className="w-full bg-[#0F4C3A] hover:bg-[#083327] text-white font-bold py-3.5 rounded-xl shadow text-sm transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Kiểm Tra Lại Trạng Thái</span>
          </button>
          
          <button
            onClick={logout}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng Xuất Tài Khoản</span>
          </button>
        </div>
      </div>
    </div>
  );
};

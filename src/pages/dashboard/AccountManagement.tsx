import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Shield, Lock, Bell, Mail, CheckCircle } from 'lucide-react';

export const AccountManagement: React.FC = () => {
  const { currentUser, showToast } = useApp();
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '0912 345 678');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Đã cập nhật thông tin tài khoản thành công!');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h2 className="font-serif text-3xl font-bold text-[#0F4C3A]">Quản Lý Tài Khoản & Bảo Mật</h2>
        <p className="text-sm text-gray-500 mt-1">Cấu hình thông tin cá nhân và quyền truy cập hệ thống gia phả</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xs border border-gray-200 space-y-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
            <img
              src={currentUser?.avatarUrl}
              alt={currentUser?.fullName}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-amber-500/30"
            />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Vai trò: {currentUser?.role === 'admin' ? 'Quản trị viên (Trưởng tộc)' : 'Thành viên'}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#0F4C3A] mt-2">{currentUser?.fullName}</h3>
              <p className="text-xs text-gray-500">{currentUser?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Họ và tên</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Email liên hệ</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Số điện thoại</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end">
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-[#0F4C3A] font-bold px-8 py-3.5 rounded-xl shadow-lg text-sm transition-all"
            >
              Lưu Thay Đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

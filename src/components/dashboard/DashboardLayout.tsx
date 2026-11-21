import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Network,
  Users,
  GitBranch,
  UserCheck,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  Home,
  Calendar,
  MapPin,
} from 'lucide-react';
import { BrandSeal, MemberAvatar } from '../common/BrandMark';
import { SupabaseStatusBanner, canViewSupabaseStatusBanner } from '../common/SupabaseStatusBanner';

export const DashboardLayout: React.FC = () => {
  const {
    currentUser,
    isAuthenticated,
    membershipStatus,
    logout,
    lineages,
    activeLineageId,
    setActiveLineageId,
    anniversaries,
  } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();

  const activeLineage = lineages.find((l) => l.id === activeLineageId) || lineages[0];
  const canViewTechnicalBanner = canViewSupabaseStatusBanner(
    isAuthenticated,
    membershipStatus,
    currentUser?.role
  );

  const navigation = [
    { name: 'Tổng quan', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Cây gia phả', href: '/dashboard/tree', icon: Network },
    { name: 'Danh sách thành viên', href: '/dashboard/members', icon: Users },
    { name: 'Không gian gia phả', href: '/dashboard/lineages', icon: GitBranch },
    { name: 'Hồ sơ thành viên', href: '/dashboard/profile', icon: UserCheck },
    { name: 'Quản lý tài khoản', href: '/dashboard/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E5] text-[#1D2823] flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#162B23]/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar (Desktop fixed, Mobile drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#203D32] text-[#F5F0E5] flex flex-col transition-transform duration-200 ease-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-[#B28A45]/25`}
      >
        {/* Brand */}
        <div className="h-18 px-5 flex items-center justify-between border-b border-[#F5F0E5]/10 bg-[#162B23]">
          <Link to="/" className="flex items-center gap-3 whitespace-nowrap">
            <BrandSeal className="w-9 h-9 shrink-0" variant="dark" />
            <div>
              <span className="font-serif text-xl font-bold tracking-[0.06em] text-[#F5F0E5] block leading-none">
                CỘI NGUỒN
              </span>
              <span className="block text-[10px] tracking-[0.12em] uppercase text-[#E5C98B]/85 mt-1">
                Quản trị gia phả
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden min-w-[40px] min-h-[40px] flex items-center justify-center text-[#F5F0E5]/80 hover:text-white rounded-lg hover:bg-[#203D32] cursor-pointer"
            aria-label="Đóng thanh điều hướng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lineage Switcher */}
        <div className="p-4 bg-[#162B23]/55 border-b border-[#F5F0E5]/10">
          <label htmlFor="sidebar-lineage-select" className="block text-xs text-[#E5C98B] font-medium mb-1.5">
            Không gian dòng họ
          </label>
          <select
            id="sidebar-lineage-select"
            value={activeLineageId}
            onChange={(e) => setActiveLineageId(e.target.value)}
            className="w-full bg-[#203D32] border border-[#B28A45]/40 text-[#F5F0E5] text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#B28A45] font-medium cursor-pointer"
          >
            {lineages.map((lin) => (
              <option key={lin.id} value={lin.id} className="bg-[#162B23] text-[#F5F0E5]">
                {lin.name}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3.5 py-5 space-y-1 overflow-y-auto" aria-label="Điều hướng quản trị">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-[#B28A45] text-[#162B23] font-semibold'
                    : 'text-[#F5F0E5]/85 hover:bg-[#162B23]/70 hover:text-[#F5F0E5]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#162B23]' : 'text-[#E5C98B]'}`} />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3.5 border-t border-[#F5F0E5]/10 bg-[#162B23]/60 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-[#F5F0E5]/80 hover:text-[#E5C98B] hover:bg-[#203D32] text-sm font-medium transition-colors"
          >
            <Home className="w-4 h-4 text-[#B28A45] shrink-0" />
            <span>Trang chủ công khai</span>
          </Link>
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-red-200 hover:bg-red-950/50 text-sm font-medium transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Đăng xuất tài khoản</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-72 min-w-0">
        {canViewTechnicalBanner && <SupabaseStatusBanner />}

        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E3D9C6] h-18 px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#203D32] hover:bg-[#F5F0E5] transition-colors cursor-pointer"
              aria-label="Mở thanh điều hướng"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h1 className="font-serif text-base sm:text-xl font-semibold text-[#203D32] truncate">
                {activeLineage ? activeLineage.name : 'Quản lý gia phả'}
              </h1>
              <p className="text-xs text-[#5A534A] hidden sm:block truncate">
                {activeLineage?.originPlace} · {activeLineage?.founderName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Anniversaries Notification Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg bg-[#FAF7F0] hover:bg-[#EFE5D0] text-[#203D32] border border-[#E3D9C6] transition-colors cursor-pointer"
                title="Lịch giỗ chạp sắp tới"
                aria-label="Lịch giỗ chạp sắp tới"
              >
                <Bell className="w-4 h-4" />
                {anniversaries.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#6B4632] text-white text-[10px] font-semibold rounded-full flex items-center justify-center tabular-nums">
                    {anniversaries.length}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2.5 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#E3D9C6] py-3 z-50 animate-fade-in">
                  <div className="px-4 pb-3 border-b border-[#EAE2D1] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#B28A45]" />
                      <span className="font-serif font-semibold text-sm text-[#203D32]">Lịch giỗ &amp; sự kiện dòng họ</span>
                    </div>
                    <span className="text-xs text-[#6B4632] font-medium tabular-nums">
                      {anniversaries.length} sự kiện
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-[#EAE2D1]">
                    {anniversaries.map((ann) => (
                      <div key={ann.id} className="p-4 hover:bg-[#FAF7F0] transition-colors space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-sm text-[#203D32]">{ann.title}</h4>
                          <span className="text-xs text-[#6B4632] font-semibold whitespace-nowrap">
                            {ann.lunarDate}
                          </span>
                        </div>
                        <p className="text-xs text-[#5A534A] leading-relaxed">{ann.description}</p>
                        <p className="text-[11px] text-[#5A534A] pt-1 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#B28A45] shrink-0" />
                          <span>{ann.location}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2.5 px-4 border-t border-[#EAE2D1] text-center">
                    <button
                      type="button"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs text-[#203D32] font-semibold hover:text-[#6B4632] cursor-pointer"
                    >
                      Đóng thông báo
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Account Display */}
            <Link
              to="/dashboard/settings"
              className="flex items-center gap-2.5 pl-3 border-l border-[#E3D9C6] hover:opacity-90 transition-opacity"
            >
              <MemberAvatar
                src={currentUser?.avatarUrl}
                name={currentUser?.fullName || 'Thành viên'}
                size="sm"
              />
              <div className="hidden sm:block text-left">
                <span className="block text-sm font-semibold text-[#203D32] leading-tight">
                  {currentUser?.fullName}
                </span>
                <span className="block text-[11px] text-[#6B4632] mt-0.5">
                  {currentUser?.role === 'owner'
                    ? 'Chủ gia phả'
                    : currentUser?.role === 'admin'
                    ? 'Trưởng tộc · Quản trị viên'
                    : currentUser?.role === 'editor'
                    ? 'Biên tập viên gia phả'
                    : 'Thành viên dòng họ'}
                </span>
              </div>
            </Link>
          </div>
        </header>

        {/* Main Workspace Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#F5F0E5]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

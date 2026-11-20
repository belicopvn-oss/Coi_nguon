import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
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
  ChevronDown,
  Menu,
  X,
  Home,
  BookOpen,
  Calendar,
  Search,
} from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const { currentUser, logout, lineages, activeLineageId, setActiveLineageId, anniversaries } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const activeLineage = lineages.find((l) => l.id === activeLineageId) || lineages[0];

  const navigation = [
    { name: 'Tổng quan Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Cây gia phả tương tác', href: '/dashboard/tree', icon: Network },
    { name: 'Danh sách thành viên', href: '/dashboard/members', icon: Users },
    { name: 'Danh sách gia phả', href: '/dashboard/lineages', icon: GitBranch },
    { name: 'Hồ sơ cá nhân / Thành viên', href: '/dashboard/profile', icon: UserCheck },
    { name: 'Quản lý tài khoản', href: '/dashboard/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar for Desktop & Mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0F4C3A] text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-2xl border-r border-amber-600/20`}
      >
        {/* Brand */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-emerald-900/80 bg-[#0a382b]">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#0F4C3A] shadow-md">
              <BookOpen className="w-5 h-5 font-bold" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-wide text-amber-200">
                CỘI NGUỒN
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-amber-400 font-medium">
                Quản Trị Gia Phả
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-emerald-300 hover:text-white rounded-lg hover:bg-emerald-900/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active Lineage Selector dropdown inside sidebar */}
        <div className="p-4 bg-emerald-950/40 border-b border-emerald-900">
          <label className="block text-[11px] uppercase tracking-wider text-amber-400 font-semibold mb-1.5">
            Dòng họ đang quản lý:
          </label>
          <select
            value={activeLineageId}
            onChange={(e) => setActiveLineageId(e.target.value)}
            className="w-full bg-[#0a382b] border border-amber-500/30 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium cursor-pointer"
          >
            {lineages.map((lin) => (
              <option key={lin.id} value={lin.id}>
                {lin.name}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-amber-500 text-[#0F4C3A] shadow-lg font-bold'
                    : 'text-emerald-100 hover:bg-emerald-900/60 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-[#0F4C3A]' : 'text-amber-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions inside sidebar */}
        <div className="p-4 border-t border-emerald-900 bg-[#0a382b]/60 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-emerald-200 hover:text-amber-300 hover:bg-emerald-900/50 text-sm font-medium transition-colors"
          >
            <Home className="w-4 h-4 text-amber-400" />
            <span>Về trang chủ công khai</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-red-300 hover:bg-red-950/40 text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất tài khoản</span>
          </button>
        </div>
      </aside>

      {/* Main Content area */}
      <div className="flex-1 flex flex-col lg:pl-72">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 h-20 px-4 sm:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="font-serif text-lg sm:text-xl font-bold text-[#0F4C3A]">
                {activeLineage ? activeLineage.name : 'Quản lý Gia Phả'}
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Quê gốc: {activeLineage?.originPlace} • Thủy tổ: {activeLineage?.founderName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                title="Thông báo giỗ chạp"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-600 rounded-full ring-2 ring-white" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 z-50 animate-fade-in">
                  <div className="px-4 pb-3 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#0F4C3A]" />
                      <span className="font-bold text-sm text-gray-800">Lịch giỗ & Sự kiện sắp tới</span>
                    </div>
                    <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
                      {anniversaries.length} sự kiện
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                    {anniversaries.map((ann) => (
                      <div key={ann.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-sm text-[#0F4C3A]">{ann.title}</h4>
                          <span className="text-xs text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded">
                            {ann.lunarDate}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{ann.description}</p>
                        <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
                          📍 {ann.location}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 px-4 text-center">
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs text-[#0F4C3A] font-bold hover:underline"
                    >
                      Đóng thông báo
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Badge */}
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <img
                src={currentUser?.avatarUrl}
                alt={currentUser?.fullName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/40"
              />
              <div className="hidden sm:block text-left">
                <span className="block text-sm font-bold text-gray-800">{currentUser?.fullName}</span>
                <span className="block text-[11px] text-amber-700 font-medium capitalize">
                  {currentUser?.role === 'admin' ? 'Quản trị viên (Trưởng tộc)' : 'Thành viên'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 bg-[#FDFBF7]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

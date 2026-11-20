import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { BookOpen, ShieldCheck, Menu, X, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentUser, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-[#0F4C3A]/95 backdrop-blur-md border-b border-amber-600/20 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6 text-[#0F4C3A]" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-wide text-amber-100 group-hover:text-amber-300 transition-colors">
              CỘI NGUỒN
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-amber-400/90 font-medium">
              Gia Phả Điện Tử
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-emerald-100 hover:text-amber-300 text-sm font-medium transition-colors">
            Trang chủ
          </Link>
          <Link to="/about" className="text-emerald-100 hover:text-amber-300 text-sm font-medium transition-colors">
            Giới thiệu
          </Link>
          <Link to="/privacy" className="text-emerald-100 hover:text-amber-300 text-sm font-medium transition-colors">
            Chính sách bảo mật
          </Link>
        </nav>

        {/* Auth Actions / User Profile */}
        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-[#0F4C3A] font-bold px-4 py-2.5 rounded-lg text-sm shadow transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                Vào Dashboard
              </Link>
              <button
                onClick={logout}
                className="p-2.5 text-emerald-200 hover:text-white hover:bg-emerald-900/50 rounded-lg transition-colors"
                title="Đăng xuất"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-emerald-100 hover:text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-emerald-900/40 transition-all"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0F4C3A] font-bold px-5 py-2.5 rounded-lg text-sm shadow-md transition-all"
              >
                Tạo Gia Phả Miễn Phí
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-emerald-100 hover:text-white rounded-lg hover:bg-emerald-900/50 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a382b] border-t border-amber-600/20 px-4 pt-4 pb-6 space-y-3 animate-fade-in">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-emerald-100 hover:text-amber-300 font-medium text-base"
          >
            Trang chủ
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-emerald-100 hover:text-amber-300 font-medium text-base"
          >
            Giới thiệu
          </Link>
          <Link
            to="/privacy"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-emerald-100 hover:text-amber-300 font-medium text-base"
          >
            Chính sách bảo mật
          </Link>
          <div className="pt-4 border-t border-emerald-900 flex flex-col gap-2.5">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-amber-500 text-[#0F4C3A] font-bold py-3 rounded-lg text-center"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Vào Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 bg-emerald-900/60 text-emerald-200 py-3 rounded-lg font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-3 text-emerald-100 bg-emerald-900/50 rounded-lg font-medium"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-3 bg-amber-500 text-[#0F4C3A] font-bold rounded-lg shadow"
                >
                  Tạo Gia Phả Miễn Phí
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

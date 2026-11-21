import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { BrandSeal } from './BrandMark';

export const Header: React.FC = () => {
  const { currentUser, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Giới thiệu', to: '/about' },
    { label: 'Bảo mật', to: '/privacy' },
  ];

  const isNavActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-40 bg-[#203D32]/98 backdrop-blur-md border-b border-[#B28A45]/25 text-[#F5F0E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-3 group whitespace-nowrap shrink-0"
          aria-label="Cội Nguồn - Trang chủ"
        >
          <BrandSeal className="w-9 h-9 shrink-0 transition-transform duration-200 group-hover:scale-[1.03]" variant="dark" />
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.06em] text-[#F5F0E5] group-hover:text-[#E5C98B] transition-colors">
            CỘI NGUỒN
          </span>
        </Link>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Điều hướng chính">
          {navItems.map((item) => {
            const active = isNavActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'text-[#E5C98B]'
                    : 'text-[#F5F0E5]/85 hover:text-[#E5C98B]'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#B28A45]" />
                )}
              </Link>
            );
          })}
          {!currentUser && (
            <Link
              to="/login"
              className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                isNavActive('/login')
                  ? 'text-[#E5C98B]'
                  : 'text-[#F5F0E5]/85 hover:text-[#E5C98B]'
              }`}
            >
              Đăng nhập
              {isNavActive('/login') && (
                <span className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#B28A45]" />
              )}
            </Link>
          )}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {currentUser ? (
            <>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-[#B28A45] hover:bg-[#9E7838] text-[#162B23] font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap shrink-0"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Không gian gia phả</span>
              </Link>
              <button
                onClick={logout}
                className="p-2.5 text-[#F5F0E5]/75 hover:text-[#F5F0E5] hover:bg-[#162B23] rounded-lg transition-colors cursor-pointer"
                title="Đăng xuất"
                aria-label="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <Link
              to="/register"
              className="inline-flex items-center bg-[#B28A45] hover:bg-[#9E7838] text-[#162B23] font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap shrink-0"
            >
              Tạo gia phả
            </Link>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-[#F5F0E5] hover:bg-[#162B23] rounded-lg transition-colors cursor-pointer"
          aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#162B23] border-t border-[#B28A45]/25 px-5 pt-4 pb-6 space-y-2 animate-fade-in">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2.5 px-3 rounded-lg text-base font-medium transition-colors ${
                isNavActive(item.to)
                  ? 'bg-[#203D32] text-[#E5C98B]'
                  : 'text-[#F5F0E5]/90 hover:bg-[#203D32]/60'
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-4 mt-3 border-t border-[#B28A45]/20 flex flex-col gap-2.5">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[#B28A45] text-[#162B23] font-semibold py-3 rounded-lg text-sm"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Không gian gia phả</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 bg-[#203D32] text-[#F5F0E5] py-3 rounded-lg text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-3 text-[#F5F0E5] border border-[#B28A45]/35 rounded-lg text-sm font-medium"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-3 bg-[#B28A45] text-[#162B23] font-semibold rounded-lg text-sm"
                >
                  Tạo gia phả miễn phí
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

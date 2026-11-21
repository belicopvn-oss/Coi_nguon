import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import { BrandSeal } from './BrandMark';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#162B23] text-[#F5F0E5]/85 border-t border-[#B28A45]/25 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F5F0E5]/12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <BrandSeal className="w-10 h-10" variant="dark" />
              <div>
                <span className="font-serif text-2xl font-bold tracking-[0.06em] text-[#F5F0E5] block">
                  CỘI NGUỒN
                </span>
                <span className="text-xs text-[#E5C98B]/85 tracking-wide">
                  Gia phả điện tử dòng họ Việt Nam
                </span>
              </div>
            </Link>
            <p className="text-sm text-[#F5F0E5]/75 leading-relaxed max-w-md">
              Lưu giữ cội nguồn, gìn giữ nếp nhà và kết nối tình cảm huyết thống các thế hệ dòng họ Việt Nam bằng nền tảng số trang trọng, bảo mật.
            </p>
            <p className="text-xs text-[#E5C98B]/90 font-medium">
              Bảo mật nội bộ dòng họ · Phân quyền rõ ràng · Tương thích đa thiết bị
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-[#E5C98B] font-semibold text-base mb-4">Điều hướng</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#E5C98B] transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#E5C98B] transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#E5C98B] transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-[#E5C98B] font-semibold text-base mb-4">Tài khoản</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/login" className="hover:text-[#E5C98B] transition-colors">
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#E5C98B] transition-colors">
                  Đăng ký gia phả
                </Link>
              </li>
              <li>
                <Link to="/forgot-password" className="hover:text-[#E5C98B] transition-colors">
                  Khôi phục mật khẩu
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="font-serif text-[#E5C98B] font-semibold text-base mb-4">Liên hệ hỗ trợ</h3>
            <ul className="space-y-3 text-sm text-[#F5F0E5]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B28A45] shrink-0 mt-0.5" />
                <span>Số 8 Tôn Thất Thuyết, Cầu Giấy, Hà Nội</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B28A45] shrink-0" />
                <span>hotro@coinuong.vn</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B28A45] shrink-0" />
                <span className="tabular-nums">1900 6868 (Giờ hành chính)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5F0E5]/60 gap-3">
          <p>© 2026 Cội Nguồn — Nền tảng Gia phả điện tử Việt Nam.</p>
          <p>Uống nước nhớ nguồn · Kết nối các thế hệ</p>
        </div>
      </div>
    </footer>
  );
};

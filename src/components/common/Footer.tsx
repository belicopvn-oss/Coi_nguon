import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Shield, Heart, MapPin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#083327] text-emerald-100 border-t border-amber-600/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/80">
          {/* Col 1 */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-[#0F4C3A]">
                <BookOpen className="w-5 h-5 font-bold" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wide text-amber-200">
                CỘI NGUỒN
              </span>
            </div>
            <p className="text-sm text-emerald-200/80 leading-relaxed">
              Giải pháp lưu giữ gia phả điện tử trang trọng, kết nối muôn đời con cháu dòng họ Việt Nam trên toàn cầu.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium bg-emerald-900/60 px-3 py-2 rounded-lg w-fit border border-amber-500/20">
              <Shield className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Bảo mật thông tin dòng họ tuyệt đối</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="font-serif text-amber-300 font-bold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-300 transition-colors">Trang chủ</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors">Giới thiệu nền tảng</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-amber-300 transition-colors">Đăng nhập hệ thống</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-amber-300 transition-colors">Đăng ký dòng họ mới</Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="font-serif text-amber-300 font-bold text-lg mb-4">Quy định & Hỗ trợ</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-amber-300 transition-colors">Chính sách quyền riêng tư</Link>
              </li>
              <li>
                <span className="text-emerald-300/80 cursor-pointer hover:text-amber-300">Hướng dẫn sử dụng cây gia phả</span>
              </li>
              <li>
                <span className="text-emerald-300/80 cursor-pointer hover:text-amber-300">Quy chế đóng góp quỹ dòng họ</span>
              </li>
              <li>
                <span className="text-emerald-300/80 cursor-pointer hover:text-amber-300">Liên hệ kỹ thuật</span>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h3 className="font-serif text-amber-300 font-bold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm text-emerald-200/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span>Số 8 Tôn Thát Thuyết, Cầu Giấy, Hà Nội</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>hotro@coinuong.vn</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>1900 6868 (Giờ hành chính)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/70 gap-4">
          <p>© 2026 Cội Nguồn – Hệ thống quản lý gia phả điện tử Việt Nam. Bảo lưu mọi quyền.</p>
          <p className="flex items-center gap-1">
            Thiết kế với <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> vì văn hóa truyền thống Việt.
          </p>
        </div>
      </div>
    </footer>
  );
};

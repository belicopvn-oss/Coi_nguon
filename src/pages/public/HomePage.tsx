import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Shield, Network, Calendar, Award, ArrowRight, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HomePage: React.FC = () => {
  const { lineages, members } = useApp();

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#083327] via-[#0F4C3A] to-[#0A382B] text-white py-24 lg:py-32 overflow-hidden">
        {/* Decorative background patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Nền tảng số hóa gia phả hàng đầu Việt Nam</span>
              </div>
              
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-amber-100 leading-[1.15]">
                Lưu giữ cội nguồn <br />
                <span className="text-amber-400 italic">Kết nối các thế hệ</span>
              </h1>
              
              <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Ứng dụng gia phả điện tử trang trọng, lưu trữ phả hệ nhiều đời, quản lý ngày giỗ chạp âm lịch và gắn kết tình cảm huyết thống con cháu muôn phương.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0F4C3A] font-bold px-8 py-4 rounded-xl shadow-xl flex items-center justify-center gap-3 text-base transition-all transform hover:-translate-y-0.5"
                >
                  <span>Tạo Gia Phả Ngay</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto bg-emerald-900/60 hover:bg-emerald-900 text-emerald-100 border border-emerald-700/60 font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 text-base transition-all"
                >
                  <span>Đăng Nhập Quản Trị</span>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-emerald-800/80 max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="block font-serif text-3xl font-bold text-amber-300">100%</span>
                  <span className="text-xs text-emerald-200">Chuẩn văn hóa Việt</span>
                </div>
                <div>
                  <span className="block font-serif text-3xl font-bold text-amber-300">An toàn</span>
                  <span className="text-xs text-emerald-200">Bảo mật dòng họ</span>
                </div>
                <div>
                  <span className="block font-serif text-3xl font-bold text-amber-300">Đa nền tảng</span>
                  <span className="text-xs text-emerald-200">Máy tính & Điện thoại</span>
                </div>
              </div>
            </div>

            {/* Hero Illustration / Preview Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-gradient-to-b from-emerald-900/80 to-[#0F4C3A] p-6 rounded-3xl border border-amber-500/30 shadow-2xl backdrop-blur-md">
                <div className="absolute -top-3 -right-3 bg-amber-500 text-[#0F4C3A] text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                  Giao diện mẫu
                </div>
                
                <div className="flex items-center gap-4 pb-6 border-b border-emerald-800">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-amber-200">Họ Nguyễn Văn - Thạch Thất</h3>
                    <p className="text-xs text-emerald-200">Xã Canh Nậu, Thạch Thất, Hà Nội</p>
                  </div>
                </div>

                <div className="py-6 space-y-4">
                  <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Network className="w-5 h-5 text-amber-400" />
                      <div>
                        <span className="block text-sm font-bold text-white">Cây phả hệ 5 thế hệ</span>
                        <span className="text-xs text-emerald-300">Đã số hóa 42 thành viên</span>
                      </div>
                    </div>
                    <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full font-bold">Hoạt động</span>
                  </div>

                  <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-amber-400" />
                      <div>
                        <span className="block text-sm font-bold text-white">Lịch giỗ sắp tới</span>
                        <span className="text-xs text-emerald-300">Giỗ Tổ (01/10 Âm lịch)</span>
                      </div>
                    </div>
                    <span className="text-xs bg-red-500/20 text-red-300 px-2.5 py-1 rounded-full font-bold">Sắp diễn ra</span>
                  </div>
                </div>

                <Link
                  to="/dashboard/tree"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-[#0F4C3A] font-bold py-3.5 rounded-xl text-center block shadow-lg transition-colors"
                >
                  Khám Phá Cây Gia Phả Mẫu →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Purpose Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold bg-amber-100 px-3.5 py-1.5 rounded-full">
            Đạo lý uống nước nhớ nguồn
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F4C3A] mt-4 mb-4">
            Lưu truyền gia phong, gắn kết tình thân
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Gia phả không chỉ là danh sách tên tuổi các bậc tiền nhân, mà là mạch nguồn đạo đức, truyền thống hiếu học và tinh thần đoàn kết của mỗi dòng họ Việt Nam qua năm tháng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#0F4C3A] text-amber-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Network className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F4C3A] mb-3">Sơ Đồ Phả Hệ Trực Quan</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Hiển thị cây gia phả phân cấp theo đời, dễ dàng tra cứu mối quan hệ cha mẹ, vợ chồng, con cháu, các nhánh chi phái.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#0F4C3A] text-amber-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F4C3A] mb-3">Nhắc Nhở Ngày Giỗ Âm Lịch</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Tự động quy đổi và thông báo lịch giỗ chạp, ngày kỵ, các sự kiện họp mặt dòng họ giúp con cháu luôn hướng về tổ tiên.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#0F4C3A] text-amber-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F4C3A] mb-3">Phân Quyền & Bảo Mật Cao</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Bảo vệ thông tin riêng tư của dòng họ với hệ thống phân quyền Trưởng tộc, biên tập viên và thành viên xem phả hệ an toàn.
            </p>
          </div>
        </div>
      </section>

      {/* Cultural Banner Section */}
      <section className="bg-[#0F4C3A] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            Gìn giữ truyền thống muôn đời
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-amber-100 mt-3 mb-6">
            “Cây có gốc mới nở cành xanh ngọn, nước có nguồn mới bể rộng sông sâu”
          </h2>
          <p className="text-emerald-100 text-base sm:text-lg mb-10 leading-relaxed">
            Hãy để Cội Nguồn đồng hành cùng dòng họ của bạn trong việc số hóa di sản tinh thần quý giá, trao truyền ngọn lửa truyền thống cho các thế hệ mai sau.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="bg-amber-500 hover:bg-amber-600 text-[#0F4C3A] font-bold px-8 py-4 rounded-xl shadow-xl text-base transition-all"
            >
              Bắt Đầu Tạo Gia Phả Ngay Miễn Phí
            </Link>
            <Link
              to="/about"
              className="bg-transparent hover:bg-emerald-900/50 text-white border border-amber-500/40 px-8 py-4 rounded-xl font-semibold text-base transition-all"
            >
              Tìm Hiểu Thêm Về Chúng Tôi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

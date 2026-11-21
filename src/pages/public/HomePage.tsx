import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Network, Calendar, ShieldCheck, BookOpen } from 'lucide-react';
import { BrandSeal, DongSonBackdrop, HeritageDivider } from '../../components/common/BrandMark';
import heritageCourtyardImg from '../../assets/images/vietnamese_heritage_courtyard_1795219325488.jpg';

export const HomePage: React.FC = () => {
  return (
    <div className="bg-[#F5F0E5] text-[#1D2823]">
      {/* Hero Section */}
      <section className="relative bg-[#203D32] text-[#F5F0E5] overflow-hidden border-b border-[#B28A45]/25">
        <DongSonBackdrop className="absolute -right-24 -top-24 w-[520px] h-[520px] opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3 text-xs font-medium tracking-[0.14em] uppercase text-[#E5C98B]">
                <span className="h-px w-8 bg-[#B28A45]" aria-hidden="true" />
                <span>Cội Nguồn · Gia phả điện tử Việt Nam</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-semibold tracking-tight text-[#F5F0E5] leading-[1.16]">
                Lưu giữ cội nguồn
                <span className="block text-[#E5C98B] italic font-medium mt-1">
                  Kết nối các thế hệ
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#F5F0E5]/82 max-w-2xl leading-relaxed">
                Không gian số trang trọng dành cho các gia đình và dòng họ Việt Nam lưu trữ phả hệ nhiều đời, ghi nhớ ngày giỗ chạp âm lịch và gìn giữ sợi dây huyết thống bền lâu qua năm tháng.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#B28A45] hover:bg-[#9E7838] text-[#162B23] font-semibold px-7 py-3.5 rounded-lg text-sm sm:text-base transition-colors whitespace-nowrap"
                >
                  <span>Khởi tạo gia phả</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 border border-[#F5F0E5]/30 hover:border-[#E5C98B] hover:text-[#E5C98B] text-[#F5F0E5] font-medium px-7 py-3.5 rounded-lg text-sm sm:text-base transition-colors whitespace-nowrap"
                >
                  <span>Đăng nhập quản trị</span>
                </Link>
              </div>

              {/* Quiet Editorial Highlights */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#F5F0E5]/15 max-w-xl">
                <div>
                  <span className="block font-serif text-2xl sm:text-3xl font-semibold text-[#E5C98B]">Trang trọng</span>
                  <span className="text-xs text-[#F5F0E5]/70 mt-1 block">Chuẩn mực văn hóa Việt</span>
                </div>
                <div>
                  <span className="block font-serif text-2xl sm:text-3xl font-semibold text-[#E5C98B]">Riêng tư</span>
                  <span className="text-xs text-[#F5F0E5]/70 mt-1 block">Phân quyền nội bộ họ tộc</span>
                </div>
                <div>
                  <span className="block font-serif text-2xl sm:text-3xl font-semibold text-[#E5C98B]">Bền vững</span>
                  <span className="text-xs text-[#F5F0E5]/70 mt-1 block">Tra cứu mọi lúc mọi nơi</span>
                </div>
              </div>
            </div>

            {/* Right: Restrained Architectural Family Tree Illustration (No Real Family Data) */}
            <div className="lg:col-span-5">
              <div className="bg-[#FAF7F0] text-[#1D2823] rounded-2xl p-6 sm:p-7 border border-[#B28A45]/40 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-[#E3D9C6]">
                  <div className="flex items-center gap-3">
                    <BrandSeal className="w-9 h-9" variant="light" />
                    <div>
                      <h2 className="font-serif text-lg font-semibold text-[#203D32]">Minh họa sơ đồ phả hệ</h2>
                      <p className="text-xs text-[#5A534A]">Cấu trúc phân đời trực quan · Dữ liệu mẫu</p>
                    </div>
                  </div>
                </div>

                {/* Bespoke Geometric Family Tree Diagram */}
                <div className="py-6">
                  {/* Generation 1 */}
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-[230px] bg-white border border-[#B28A45]/60 rounded-xl px-4 py-3 text-center shadow-xs">
                      <span className="text-[11px] font-medium text-[#6B4632] block">Đời thứ nhất · Thủy tổ</span>
                      <span className="font-serif text-base font-semibold text-[#203D32] mt-0.5 block">
                        Tổ Khảo &amp; Tổ Tỷ
                      </span>
                    </div>

                    {/* Vertical Stem + Horizontal Split */}
                    <div className="w-px h-6 bg-[#B28A45]/70" aria-hidden="true" />
                    <div className="w-3/5 h-px bg-[#B28A45]/70" aria-hidden="true" />

                    {/* Generation 2 */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="flex flex-col items-center">
                        <div className="w-px h-5 bg-[#B28A45]/70" aria-hidden="true" />
                        <div className="w-full bg-white border border-[#E3D9C6] rounded-xl px-3 py-2.5 text-center">
                          <span className="text-[11px] text-[#6B4632] block">Đời thứ hai</span>
                          <span className="font-serif text-sm font-semibold text-[#203D32] block mt-0.5">Chi Trưởng</span>
                        </div>
                        <div className="w-px h-5 bg-[#B28A45]/55" aria-hidden="true" />
                        <div className="w-full bg-[#F5F0E5] border border-[#E3D9C6] rounded-lg px-2.5 py-2 text-center">
                          <span className="text-[11px] text-[#5A534A] block">Đời thứ ba · Các nhánh con cháu</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-px h-5 bg-[#B28A45]/70" aria-hidden="true" />
                        <div className="w-full bg-white border border-[#E3D9C6] rounded-xl px-3 py-2.5 text-center">
                          <span className="text-[11px] text-[#6B4632] block">Đời thứ hai</span>
                          <span className="font-serif text-sm font-semibold text-[#203D32] block mt-0.5">Chi Thứ</span>
                        </div>
                        <div className="w-px h-5 bg-[#B28A45]/55" aria-hidden="true" />
                        <div className="w-full bg-[#F5F0E5] border border-[#E3D9C6] rounded-lg px-2.5 py-2 text-center">
                          <span className="text-[11px] text-[#5A534A] block">Đời thứ ba · Các nhánh con cháu</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E3D9C6] flex items-center justify-between gap-3">
                  <span className="text-xs text-[#5A534A]">Không hiển thị dữ liệu thật công khai</span>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#203D32] hover:text-[#6B4632] transition-colors whitespace-nowrap"
                  >
                    <span>Xem giao diện mẫu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Purpose & Cultural Story Section */}
      <section className="py-16 sm:py-22 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[280px] rounded-2xl overflow-hidden border border-[#E3D9C6] bg-[#EAE2D1]">
              <img
                src={heritageCourtyardImg}
                alt="Không gian từ đường truyền thống Việt Nam bên hồ sen"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#162B23]/85 via-[#162B23]/35 to-transparent p-5">
                <p className="text-xs text-[#F5F0E5]/90 font-serif italic">
                  Nếp nhà truyền thống — nơi lưu giữ ký ức và đạo lý uống nước nhớ nguồn của mỗi dòng họ Việt.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#6B4632]">
              Đạo lý uống nước nhớ nguồn
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#203D32] leading-tight">
              Lưu truyền gia phong, gắn kết tình thân muôn đời
            </h2>
            <p className="text-[15px] sm:text-base text-[#4A443C] leading-relaxed">
              Mỗi cuốn gia phả không chỉ ghi chép danh tính, năm sinh năm mất của các bậc tiền nhân, mà còn là biên niên sử sống động về truyền thống hiếu học, công đức và cội rễ của cả một dòng tộc.
            </p>
            <p className="text-[15px] sm:text-base text-[#4A443C] leading-relaxed">
              CỘI NGUỒN kết hợp tinh thần trang trọng của phả hệ truyền thống với sự tiện lợi của công nghệ hiện đại, giúp con cháu dù ở quê nhà hay phương xa vẫn dễ dàng tìm về nguồn cội.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#203D32] hover:text-[#6B4632] border-b border-[#B28A45] pb-1 transition-colors"
              >
                <span>Tìm hiểu sứ mệnh của Cội Nguồn</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeritageDivider />
      </div>

      {/* Core Features Section */}
      <section className="py-16 sm:py-22 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 space-y-3">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#6B4632]">
            Chức năng nổi bật
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#203D32]">
            Thiết kế riêng cho gia phả dòng họ Việt
          </h2>
          <p className="text-sm sm:text-base text-[#5A534A] leading-relaxed">
            Gọn gàng, dễ tra cứu cho cả người lớn tuổi lẫn thế hệ trẻ trên điện thoại, máy tính bảng và máy tính.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <article className="bg-white p-7 rounded-2xl border border-[#E3D9C6] shadow-xs hover:border-[#B28A45] transition-colors flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-[#F5F0E5] text-[#203D32] border border-[#E3D9C6] flex items-center justify-center">
                  <Network className="w-5 h-5" />
                </div>
                <span className="font-serif text-sm font-semibold text-[#B28A45] tabular-nums">01</span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#203D32]">Sơ đồ phả hệ trực quan</h3>
              <p className="text-sm text-[#5A534A] leading-relaxed">
                Phân cấp rõ ràng theo từng đời và từng chi phái, hỗ trợ lọc nhanh thế hệ và xem tiểu sử, công trạng từng thành viên chỉ với một chạm.
              </p>
            </div>
          </article>

          <article className="bg-white p-7 rounded-2xl border border-[#E3D9C6] shadow-xs hover:border-[#B28A45] transition-colors flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-[#F5F0E5] text-[#203D32] border border-[#E3D9C6] flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="font-serif text-sm font-semibold text-[#B28A45] tabular-nums">02</span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#203D32]">Ghi nhớ ngày giỗ âm lịch</h3>
              <p className="text-sm text-[#5A534A] leading-relaxed">
                Tổng hợp lịch giỗ Tổ, ngày kỵ và địa điểm từ đường theo cả âm lịch lẫn dương lịch, giúp con cháu kịp thời sắp xếp sum họp.
              </p>
            </div>
          </article>

          <article className="bg-white p-7 rounded-2xl border border-[#E3D9C6] shadow-xs hover:border-[#B28A45] transition-colors flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-[#F5F0E5] text-[#203D32] border border-[#E3D9C6] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-serif text-sm font-semibold text-[#B28A45] tabular-nums">03</span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#203D32]">Bảo mật &amp; phân quyền chặt chẽ</h3>
              <p className="text-sm text-[#5A534A] leading-relaxed">
                Dữ liệu dòng họ được bảo vệ khép kín. Chỉ thành viên đã xác thực và được Trưởng tộc duyệt quyền mới có thể xem phả hệ nội bộ.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Cultural Proverb & Call to Action */}
      <section className="relative bg-[#203D32] text-[#F5F0E5] py-18 sm:py-22 overflow-hidden">
        <DongSonBackdrop className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] opacity-35" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#162B23] border border-[#B28A45]/40 text-[#E5C98B] mx-auto">
            <BookOpen className="w-5 h-5" />
          </div>

          <blockquote className="font-serif text-2xl sm:text-4xl font-semibold text-[#F5F0E5] leading-snug italic">
            “Cây có gốc mới nở cành xanh ngọn, nước có nguồn mới bể rộng sông sâu”
          </blockquote>

          <p className="text-sm sm:text-base text-[#F5F0E5]/80 max-w-2xl mx-auto leading-relaxed">
            Bắt đầu xây dựng không gian gia phả điện tử trang trọng cho gia đình và dòng họ ngay hôm nay để lưu giữ trọn vẹn ký ức cho thế hệ mai sau.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#B28A45] hover:bg-[#9E7838] text-[#162B23] font-semibold px-7 py-3.5 rounded-lg text-sm sm:text-base transition-colors"
            >
              <span>Đăng ký tạo gia phả</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/privacy"
              className="w-full sm:w-auto inline-flex items-center justify-center border border-[#F5F0E5]/30 hover:border-[#E5C98B] text-[#F5F0E5] hover:text-[#E5C98B] px-7 py-3.5 rounded-lg font-medium text-sm sm:text-base transition-colors"
            >
              <span>Xem cam kết bảo mật</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { ShieldCheck, Heart, Award, Users, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeritageDivider } from '../../components/common/BrandMark';
import heritageCourtyardImg from '../../assets/images/vietnamese_heritage_courtyard_1795219325488.jpg';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F0E5] text-[#1D2823] py-14 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Editorial Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#6B4632]">
            Giới thiệu nền tảng Cội Nguồn
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#203D32] leading-tight">
            Sứ mệnh gìn giữ cội nguồn dòng họ Việt
          </h1>
          <p className="text-base sm:text-lg text-[#4A443C] leading-relaxed">
            CỘI NGUỒN ra đời với tâm huyết ứng dụng công nghệ hiện đại để số hóa, bảo tồn và kết nối phả hệ các dòng họ trên khắp mọi miền Tổ quốc cũng như kiều bào ở nước ngoài.
          </p>
        </div>

        <HeritageDivider />

        {/* Courtyard Image Frame */}
        <figure className="bg-white p-3 sm:p-4 rounded-2xl border border-[#E3D9C6] shadow-xs">
          <div className="aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-[#EAE2D1]">
            <img
              src={heritageCourtyardImg}
              alt="Từ đường và hồ sen truyền thống Việt Nam"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="text-xs font-serif italic text-[#5A534A] mt-3 px-1">
            Cảm hứng từ kiến trúc gỗ truyền thống và sắc sen thanh khiết — tôn vinh giá trị bền vững của gia đình Việt.
          </figcaption>
        </figure>

        {/* Vision & Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white p-7 sm:p-8 rounded-2xl border border-[#E3D9C6] shadow-xs space-y-4">
            <div className="w-11 h-11 rounded-xl bg-[#F5F0E5] border border-[#E3D9C6] text-[#6B4632] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-[#203D32]">Tầm nhìn</h2>
            <p className="text-sm text-[#4A443C] leading-relaxed">
              Trở thành không gian gia phả điện tử tin cậy của người Việt, nơi mỗi dòng họ sở hữu một hệ thống lưu trữ trang trọng, rõ ràng và bền vững để truyền lại gia phong qua nhiều thế hệ.
            </p>
          </div>

          <div className="bg-white p-7 sm:p-8 rounded-2xl border border-[#E3D9C6] shadow-xs space-y-4">
            <div className="w-11 h-11 rounded-xl bg-[#F5F0E5] border border-[#E3D9C6] text-[#203D32] flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-[#203D32]">Giá trị cốt lõi</h2>
            <p className="text-sm text-[#4A443C] leading-relaxed">
              Lấy đạo lý uống nước nhớ nguồn làm gốc. Coi trọng tính chính xác của phả hệ, sự tôn nghiêm đối với bậc tiền nhân và trải nghiệm thân thiện cho mọi lứa tuổi trong gia đình.
            </p>
          </div>
        </div>

        {/* Why Cội Nguồn */}
        <div className="bg-[#203D32] text-[#F5F0E5] p-8 sm:p-12 rounded-2xl border border-[#B28A45]/35 space-y-8">
          <div className="max-w-2xl space-y-2.5">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#E5C98B]">
              Ba trụ cột bền vững
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F5F0E5]">
              Vì sao các dòng họ tin chọn Cội Nguồn?
            </h2>
            <p className="text-sm text-[#F5F0E5]/80 leading-relaxed">
              Giải pháp số hóa toàn diện, khắc phục nguy cơ thất lạc hoặc khó cập nhật của các cuốn gia phả giấy truyền thống.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-[#F5F0E5]/15">
            <div className="space-y-2.5 pt-2">
              <ShieldCheck className="w-6 h-6 text-[#B28A45]" />
              <h3 className="font-serif text-lg font-semibold text-[#E5C98B]">Bảo mật khép kín</h3>
              <p className="text-xs sm:text-sm text-[#F5F0E5]/80 leading-relaxed">
                Thông tin dòng họ được kiểm soát bằng quyền truy cập nội bộ; chỉ thành viên được duyệt mới có thể tra cứu.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <Users className="w-6 h-6 text-[#B28A45]" />
              <h3 className="font-serif text-lg font-semibold text-[#E5C98B]">Gắn kết không khoảng cách</h3>
              <p className="text-xs sm:text-sm text-[#F5F0E5]/80 leading-relaxed">
                Con cháu ở mọi tỉnh thành hay nước ngoài đều có thể tra cứu phả hệ và cập nhật lịch giỗ chạp dễ dàng.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <Award className="w-6 h-6 text-[#B28A45]" />
              <h3 className="font-serif text-lg font-semibold text-[#E5C98B]">Giao diện trang trọng</h3>
              <p className="text-xs sm:text-sm text-[#F5F0E5]/80 leading-relaxed">
                Thiết kế tiết chế, ấm áp với bảng màu kem ngà, xanh rêu đậm và vàng đồng đậm đà bản sắc Việt.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-[#B28A45] hover:bg-[#9E7838] text-[#162B23] font-semibold px-7 py-3.5 rounded-lg text-sm transition-colors"
            >
              <span>Khởi tạo không gian gia phả</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { BookOpen, ShieldCheck, Heart, Award, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold bg-amber-100 px-3.5 py-1.5 rounded-full">
            Về chúng tôi
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0F4C3A]">
            Sứ mệnh gìn giữ cội nguồn dòng họ Việt
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            CỘI NGUỒN ra đời với tâm huyết ứng dụng công nghệ hiện đại để số hóa, lưu giữ và kết nối phả hệ các dòng họ trên khắp mọi miền Tổ quốc và kiều bào ở nước ngoài.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0F4C3A]">Tầm nhìn của chúng tôi</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Trở thành nền tảng gia phả điện tử tin cậy số 1 tại Việt Nam, nơi mỗi dòng họ đều có một không gian số trang trọng, bảo mật và lưu truyền trọn vẹn gia phong đời này qua đời khác.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#0F4C3A] flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0F4C3A]">Giá trị cốt lõi</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Lấy văn hóa truyền thống Á Đông và đạo lý uống nước nhớ nguồn làm nền tảng. Đảm bảo tính chính xác của phả hệ, sự tôn nghiêm đối với bậc tiền nhân và sự tiện lợi tối đa cho con cháu.
            </p>
          </div>
        </div>

        {/* Core Features Overview */}
        <div className="bg-[#0F4C3A] text-white p-8 sm:p-12 rounded-3xl space-y-8 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-3xl font-bold text-amber-200">Tại sao các dòng họ lựa chọn Cội Nguồn?</h2>
            <p className="text-emerald-100 text-sm">
              Giải pháp toàn diện thay thế các cuốn gia phả giấy dễ thất lạc hoặc khó cập nhật thông tin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-800 space-y-2">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
              <h4 className="font-bold text-amber-200 text-base">Bảo mật tuyệt đối</h4>
              <p className="text-xs text-emerald-200 leading-relaxed">
                Dữ liệu gia phả được mã hóa, chỉ có thành viên trong dòng họ được cấp quyền mới có thể truy cập xem và chỉnh sửa.
              </p>
            </div>

            <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-800 space-y-2">
              <Users className="w-8 h-8 text-amber-400" />
              <h4 className="font-bold text-amber-200 text-base">Kết nối không khoảng cách</h4>
              <p className="text-xs text-emerald-200 leading-relaxed">
                Con cháu dù sinh sống ở mọi miền hay nước ngoài đều dễ dàng tra cứu cội nguồn, cập nhật tin tức dòng họ.
              </p>
            </div>

            <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-800 space-y-2">
              <Award className="w-8 h-8 text-amber-400" />
              <h4 className="font-bold text-amber-200 text-base">Giao diện trang trọng</h4>
              <p className="text-xs text-emerald-200 leading-relaxed">
                Thiết kế tinh tế với màu sắc trầm ấm, mang đậm bản sắc văn hóa thờ cúng và gia phả truyền thống Việt Nam.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              to="/register"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-[#0F4C3A] font-bold px-8 py-3.5 rounded-xl text-sm shadow-lg transition-all"
            >
              Tạo Không Gian Gia Phả Ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

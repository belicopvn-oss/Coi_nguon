import React from 'react';
import { Shield, Lock, CheckCircle2 } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold bg-amber-100 px-3.5 py-1.5 rounded-full">
            Cam kết bảo mật
          </span>
          <h1 className="font-serif text-4xl font-bold text-[#0F4C3A]">Chính Sách Quyền Riêng Tư & Bảo Mật</h1>
          <p className="text-gray-600 text-base">
            Cập nhật lần cuối: Tháng 11 năm 2026. Cội Nguồn cam kết bảo vệ tuyệt đối thông tin gia phả và dữ liệu cá nhân của các thành viên dòng họ.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-200 space-y-8">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#0F4C3A] flex items-center gap-2">
              <Shield className="w-6 h-6 text-amber-600" />
              1. Mục đích thu thập thông tin
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Hệ thống Cội Nguồn thu thập thông tin phả hệ (tên thành viên, ngày sinh, ngày mất, quan hệ gia đình, tiểu sử) hoàn toàn do người dùng và Trưởng tộc đại diện nhập liệu nhằm mục đích số hóa gia phả, lưu giữ truyền thống và thông báo ngày giỗ chạp trong nội bộ dòng họ.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#0F4C3A] flex items-center gap-2">
              <Lock className="w-6 h-6 text-amber-600" />
              2. Quyền riêng tư và phạm vi hiển thị
            </h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0F4C3A] shrink-0 mt-1" />
                <span>Thông tin gia phả là tài sản riêng tư của từng dòng họ, không công khai tìm kiếm trên các công cụ tìm kiếm công cộng (Google, Bing...).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0F4C3A] shrink-0 mt-1" />
                <span>Chỉ những thành viên được Trưởng tộc hoặc Quản trị viên cấp quyền tài khoản mới có thể xem hoặc chỉnh sửa phả hệ.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0F4C3A] shrink-0 mt-1" />
                <span>Chúng tôi tuyệt đối không chia sẻ, bán hoặc tiết lộ dữ liệu gia phả cho bất kỳ bên thứ ba nào vì mục đích thương mại.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#0F4C3A] flex items-center gap-2">
              <Shield className="w-6 h-6 text-amber-600" />
              3. Bảo mật kỹ thuật
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Hệ thống áp dụng các tiêu chuẩn mã hóa dữ liệu tiên tiến trong truyền tải và lưu trữ. Cơ sở dữ liệu được thiết kế sẵn sàng tích hợp các giải pháp bảo mật cấp độ cao (như Supabase Auth & RLS Row Level Security) để bảo vệ an toàn tối đa cho thông tin dòng họ.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

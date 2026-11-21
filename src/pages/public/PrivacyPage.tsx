import React from 'react';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { HeritageDivider } from '../../components/common/BrandMark';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F0E5] text-[#1D2823] py-14 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#6B4632]">
            Cam kết quyền riêng tư
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#203D32]">
            Chính sách quyền riêng tư &amp; bảo mật
          </h1>
          <p className="text-sm text-[#5A534A]">
            Cập nhật lần cuối: Tháng 11 năm 2026 · Áp dụng cho toàn bộ thành viên nền tảng Cội Nguồn
          </p>
        </div>

        <HeritageDivider />

        <div className="bg-white p-7 sm:p-11 rounded-2xl border border-[#E3D9C6] shadow-xs space-y-8">
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-[#203D32]">
              <ShieldCheck className="w-5 h-5 text-[#B28A45] shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-semibold">
                01. Mục đích thu thập thông tin
              </h2>
            </div>
            <p className="text-sm sm:text-[15px] text-[#4A443C] leading-relaxed">
              Hệ thống Cội Nguồn chỉ tiếp nhận thông tin phả hệ (họ tên, năm sinh, năm mất, quan hệ huyết thống, tiểu sử và ngày giỗ) do người đại diện dòng họ hoặc thành viên được ủy quyền chủ động cung cấp nhằm phục vụ lưu trữ gia phả và gắn kết nội bộ gia đình.
            </p>
          </section>

          <hr className="border-[#EAE2D1]" />

          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-[#203D32]">
              <Lock className="w-5 h-5 text-[#B28A45] shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-semibold">
                02. Quyền riêng tư và phạm vi hiển thị
              </h2>
            </div>
            <ul className="space-y-3 text-sm sm:text-[15px] text-[#4A443C] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#203D32] shrink-0 mt-1" />
                <span>Dữ liệu gia phả là tài sản riêng tư của từng dòng họ, không công khai trên các trang bên ngoài và không lập chỉ mục trên công cụ tìm kiếm.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#203D32] shrink-0 mt-1" />
                <span>Chỉ thành viên đã xác thực tài khoản và được Trưởng tộc hoặc Quản trị viên duyệt quyền truy cập mới được phép xem phả hệ.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#203D32] shrink-0 mt-1" />
                <span>Cội Nguồn tuyệt đối không chia sẻ, mua bán hay tiết lộ thông tin gia phả cho bất kỳ bên thứ ba nào vì mục đích thương mại.</span>
              </li>
            </ul>
          </section>

          <hr className="border-[#EAE2D1]" />

          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-[#203D32]">
              <ShieldCheck className="w-5 h-5 text-[#B28A45] shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-semibold">
                03. Bảo vệ dữ liệu ở tầng kỹ thuật
              </h2>
            </div>
            <p className="text-sm sm:text-[15px] text-[#4A443C] leading-relaxed">
              Dữ liệu được truyền tải qua kết nối mã hóa và áp dụng xác thực kết hợp cơ chế kiểm soát truy cập theo hàng (Row Level Security) trên Supabase để đảm bảo phân quyền minh bạch và an toàn lâu dài.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

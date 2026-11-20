import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, Award, MapPin, Phone, Mail, Calendar, GitBranch, Edit, FileText } from 'lucide-react';

export const MemberProfilePage: React.FC = () => {
  const { currentUser, members, activeLineageId } = useApp();
  // Find current user's profile in members or take the first member
  const member = members.find((m) => m.lineageId === activeLineageId && m.fullName.includes('Minh')) || members[0];

  if (!member) {
    return <div>Chưa có thông tin hồ sơ.</div>;
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header Profile Card */}
      <div className="bg-gradient-to-r from-[#0F4C3A] to-[#0a382b] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-amber-500/30 flex flex-col md:flex-row items-center gap-6">
        <img
          src={member.avatarUrl}
          alt={member.fullName}
          className="w-28 h-28 rounded-full object-cover ring-4 ring-amber-400 shadow-xl"
        />
        <div className="space-y-2 text-center md:text-left flex-1">
          <span className="text-xs uppercase tracking-widest text-amber-300 font-bold bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-amber-500/30">
            Đời thứ {member.generation} • {member.branch || 'Chi chính'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100">{member.fullName}</h2>
          <p className="text-emerald-100 text-sm">
            {member.occupation || 'Thành viên dòng họ'} • {member.currentLocation || 'Hà Nội'}
          </p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-200 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#0F4C3A]">Thông Tin Tiểu Sử & Lý Lịch</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-semibold text-gray-500">Họ và tên đầy đủ:</span>
                <span className="font-bold text-[#0F4C3A]">{member.fullName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-semibold text-gray-500">Thế hệ (Đời):</span>
                <span className="font-bold text-[#0F4C3A]">Đời thứ {member.generation}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-semibold text-gray-500">Năm sinh:</span>
                <span className="font-bold text-[#0F4C3A]">{member.birthDate || '1968'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-semibold text-gray-500">Nghề nghiệp:</span>
                <span className="font-bold text-[#0F4C3A]">{member.occupation}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-semibold text-gray-500">Nơi ở hiện tại:</span>
                <span className="font-bold text-[#0F4C3A]">{member.currentLocation}</span>
              </div>
            </div>

            {member.bio && (
              <div className="pt-4 space-y-2">
                <h4 className="font-bold text-sm text-[#0F4C3A]">Ghi chú & Đóng góp dòng họ:</h4>
                <p className="text-xs text-gray-600 bg-gray-50 p-4 rounded-2xl leading-relaxed">{member.bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact & Achievements */}
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-200 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#0F4C3A]">Thông Tin Liên Hệ</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{member.contactInfo?.phone || '0912 345 678'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{member.contactInfo?.email || currentUser?.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{member.contactInfo?.address || 'Cầu Giấy, Hà Nội'}</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-200 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#0F4C3A]">Đóng Góp Nổi Bật</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              {member.achievements?.map((ach, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200/60">
                  <Award className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </li>
              )) || (
                <li className="text-gray-400 italic">Chưa có ghi nhận thành tích.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

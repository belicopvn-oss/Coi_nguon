import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, MapPin, Phone, Mail } from 'lucide-react';
import { DongSonBackdrop, MemberAvatar } from '../../components/common/BrandMark';

export const MemberProfilePage: React.FC = () => {
  const { currentUser, members, activeLineageId } = useApp();
  const member =
    members.find((m) => m.lineageId === activeLineageId && m.fullName.includes('Minh')) ||
    members.find((m) => m.lineageId === activeLineageId) ||
    members[0];

  if (!member) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-[#E3D9C6] text-center text-sm text-[#5A534A]">
        Chưa có thông tin hồ sơ thành viên.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Header Profile Card */}
      <section className="relative bg-[#203D32] rounded-2xl p-6 sm:p-9 text-[#F5F0E5] border border-[#B28A45]/35 overflow-hidden flex flex-col md:flex-row items-center gap-6">
        <DongSonBackdrop className="absolute -right-24 -top-24 w-72 h-72 opacity-35" />

        <div className="relative z-10">
          <MemberAvatar
            src={member.avatarUrl}
            name={member.fullName}
            size="xl"
            className="ring-2 ring-[#B28A45]"
          />
        </div>
        <div className="relative z-10 space-y-2 text-center md:text-left flex-1">
          <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#E5C98B] tabular-nums">
            Đời thứ {member.generation} · {member.branch || 'Chi chính'} · {member.isAlive ? 'Còn sống' : 'Đã tạ thế'}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#F5F0E5]">{member.fullName}</h2>
          <p className="text-[#F5F0E5]/80 text-sm">
            {member.occupation || 'Thành viên dòng họ'}
            {member.currentLocation ? ` · ${member.currentLocation}` : ''}
          </p>
        </div>
      </section>

      {/* Details Split */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E3D9C6] shadow-xs space-y-5">
          <h3 className="font-serif text-xl font-semibold text-[#203D32]">Tiểu sử &amp; lý lịch phả hệ</h3>

          <dl className="divide-y divide-[#EAE2D1] text-sm">
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-[#5A534A]">Họ và tên đầy đủ</dt>
              <dd className="font-semibold text-[#203D32] text-right">{member.fullName}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-[#5A534A]">Thế hệ (Đời)</dt>
              <dd className="font-semibold text-[#203D32] tabular-nums">Đời thứ {member.generation}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-[#5A534A]">Chi phái</dt>
              <dd className="font-semibold text-[#203D32]">{member.branch || 'Chi chính'}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-[#5A534A]">Năm sinh</dt>
              <dd className="font-semibold text-[#203D32] tabular-nums">{member.birthDate || '1968'}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-[#5A534A]">Nghề nghiệp</dt>
              <dd className="font-semibold text-[#203D32] text-right">{member.occupation || 'Chưa cập nhật'}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-[#5A534A]">Nơi ở hiện tại</dt>
              <dd className="font-semibold text-[#203D32] text-right">{member.currentLocation || 'Chưa cập nhật'}</dd>
            </div>
          </dl>

          {member.bio && (
            <div className="pt-3 space-y-2">
              <h4 className="text-xs font-semibold text-[#6B4632]">Ghi chú &amp; đóng góp dòng họ</h4>
              <p className="text-sm text-[#4A443C] bg-[#FAF7F0] border border-[#EAE2D1] p-4 rounded-xl leading-relaxed">
                {member.bio}
              </p>
            </div>
          )}
        </div>

        <div className="md:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E3D9C6] shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#203D32]">Thông tin liên hệ</h3>
            <ul className="space-y-3 text-sm text-[#4A443C]">
              <li className="flex items-center gap-3 tabular-nums">
                <Phone className="w-4 h-4 text-[#203D32] shrink-0" />
                <span>{member.contactInfo?.phone || '0912 345 678'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#203D32] shrink-0" />
                <span className="break-all">{member.contactInfo?.email || currentUser?.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B28A45] shrink-0 mt-0.5" />
                <span>{member.contactInfo?.address || 'Cầu Giấy, Hà Nội'}</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E3D9C6] shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#203D32]">Ghi nhận &amp; đóng góp</h3>
            {member.achievements && member.achievements.length > 0 ? (
              <ul className="divide-y divide-[#EAE2D1] text-sm text-[#4A443C]">
                {member.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                    <Award className="w-4 h-4 text-[#B28A45] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{ach}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[#5A534A] italic">Chưa có ghi nhận đóng góp.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

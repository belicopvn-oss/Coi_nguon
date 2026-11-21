import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, GitBranch, Calendar, Award, ArrowRight, Network, UserPlus, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DongSonBackdrop, MemberAvatar } from '../../components/common/BrandMark';

export const DashboardHome: React.FC = () => {
  const { currentUser, lineages, activeLineageId, members, anniversaries } = useApp();
  const activeLineage = lineages.find((l) => l.id === activeLineageId) || lineages[0];
  const lineageMembers = members.filter((m) => m.lineageId === activeLineageId);

  const stats = [
    {
      label: 'Không gian gia phả',
      value: lineages.length,
      note: 'Đang quản lý',
      icon: GitBranch,
    },
    {
      label: 'Thành viên đã lưu',
      value: lineageMembers.length,
      note: 'Trong phả hệ hiện tại',
      icon: Users,
    },
    {
      label: 'Số thế hệ (Đời)',
      value: activeLineage?.totalGenerations || 5,
      note: 'Tính từ Thủy tổ',
      icon: Award,
    },
    {
      label: 'Ngày giỗ sắp tới',
      value: anniversaries.length,
      note: 'Lịch âm lịch dòng họ',
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Greeting Banner */}
      <section className="relative bg-[#203D32] rounded-2xl p-6 sm:p-8 text-[#F5F0E5] border border-[#B28A45]/35 overflow-hidden">
        <DongSonBackdrop className="absolute -right-20 -bottom-24 w-72 h-72 opacity-40" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#E5C98B]">
              Không gian quản trị dòng họ
            </p>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#F5F0E5]">
              Kính chào, {currentUser?.fullName}
            </h2>
            <p className="text-sm sm:text-base text-[#F5F0E5]/82 max-w-2xl leading-relaxed">
              Bạn đang truy cập gia phả <strong className="text-[#E5C98B] font-semibold">{activeLineage?.name}</strong>. Hiện có{' '}
              <span className="tabular-nums font-semibold text-[#E5C98B]">{anniversaries.length}</span> ngày giỗ và sự kiện dòng họ sắp diễn ra.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/dashboard/tree"
              className="inline-flex items-center justify-center gap-2 bg-[#B28A45] hover:bg-[#9E7838] text-[#162B23] font-semibold px-5 py-3 rounded-lg text-sm transition-colors whitespace-nowrap"
            >
              <Network className="w-4 h-4" />
              <span>Xem cây gia phả</span>
            </Link>
            <Link
              to="/dashboard/members"
              className="inline-flex items-center justify-center gap-2 border border-[#F5F0E5]/30 hover:border-[#E5C98B] text-[#F5F0E5] hover:text-[#E5C98B] font-medium px-5 py-3 rounded-lg text-sm transition-colors whitespace-nowrap"
            >
              <UserPlus className="w-4 h-4" />
              <span>Quản lý thành viên</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white p-6 rounded-2xl border border-[#E3D9C6] shadow-xs flex items-start justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-[#5A534A] block">{stat.label}</span>
                <span className="block font-serif text-3xl font-semibold text-[#203D32] tabular-nums">
                  {stat.value}
                </span>
                <span className="text-xs text-[#6B4632] block">{stat.note}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#E3D9C6] text-[#B28A45] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </section>

      {/* Quick Access Lineages Strip */}
      <section className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E3D9C6] shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#203D32]">Các không gian gia phả</h3>
            <p className="text-xs text-[#5A534A] mt-0.5">Truy cập nhanh các dòng họ và chi phái đang quản lý</p>
          </div>
          <Link
            to="/dashboard/lineages"
            className="text-xs font-semibold text-[#203D32] hover:text-[#6B4632] inline-flex items-center gap-1 whitespace-nowrap"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lineages.map((lin) => {
            const isCurrent = lin.id === activeLineageId;
            return (
              <Link
                key={lin.id}
                to="/dashboard/lineages"
                className={`p-4 rounded-xl border transition-colors flex items-center justify-between gap-4 ${
                  isCurrent
                    ? 'bg-[#FAF7F0] border-[#B28A45]'
                    : 'bg-white border-[#EAE2D1] hover:border-[#B28A45]/60'
                }`}
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[#6B4632]">
                    <span>{lin.founderName}</span>
                    {isCurrent && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-[#203D32]">Đang chọn</span>
                      </>
                    )}
                  </div>
                  <h4 className="font-serif text-base font-semibold text-[#203D32] truncate">{lin.name}</h4>
                  <p className="text-xs text-[#5A534A] tabular-nums">
                    {lin.totalGenerations} thế hệ · {lin.totalMembers} thành viên · {lin.originPlace}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B28A45] shrink-0" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Main Split: Recent Members + Upcoming Anniversaries */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Recent Members */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-[#E3D9C6] shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-semibold text-[#203D32]">Thành viên tiêu biểu</h3>
            <Link
              to="/dashboard/members"
              className="text-xs text-[#6B4632] font-semibold hover:text-[#203D32] inline-flex items-center gap-1"
            >
              <span>Danh sách đầy đủ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#EAE2D1]">
            {lineageMembers.slice(0, 5).map((member) => (
              <div
                key={member.id}
                className="py-3.5 flex items-center justify-between gap-4 hover:bg-[#FAF7F0] px-2.5 -mx-2.5 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <MemberAvatar src={member.avatarUrl} name={member.fullName} size="md" />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm text-[#203D32] truncate">{member.fullName}</h4>
                    <p className="text-xs text-[#5A534A] truncate mt-0.5">
                      Đời thứ <span className="tabular-nums">{member.generation}</span> · {member.branch || 'Chi chính'}
                      {member.occupation ? ` · ${member.occupation}` : ''}
                    </p>
                  </div>
                </div>
                <Link
                  to="/dashboard/members"
                  className="text-xs font-semibold text-[#203D32] hover:text-[#6B4632] whitespace-nowrap shrink-0"
                >
                  Chi tiết →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Anniversaries */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-[#E3D9C6] shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-semibold text-[#203D32]">Lịch giỗ chạp sắp tới</h3>
            <Calendar className="w-5 h-5 text-[#B28A45]" />
          </div>

          <div className="divide-y divide-[#EAE2D1]">
            {anniversaries.map((ann) => (
              <div key={ann.id} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-[#6B4632]">{ann.lunarDate}</span>
                  <span className="text-[#5A534A] tabular-nums">{ann.solarDate}</span>
                </div>
                <h4 className="font-serif font-semibold text-base text-[#203D32]">{ann.title}</h4>
                <p className="text-xs text-[#5A534A] leading-relaxed">{ann.description}</p>
                <p className="text-xs text-[#5A534A] pt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B28A45] shrink-0" />
                  <span>{ann.location}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

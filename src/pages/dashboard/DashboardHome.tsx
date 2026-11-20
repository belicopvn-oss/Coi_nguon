import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, GitBranch, Calendar, Award, ArrowRight, Network, UserPlus, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardHome: React.FC = () => {
  const { currentUser, lineages, activeLineageId, members, anniversaries } = useApp();
  const activeLineage = lineages.find((l) => l.id === activeLineageId) || lineages[0];
  const lineageMembers = members.filter((m) => m.lineageId === activeLineageId);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0F4C3A] to-[#0a382b] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Khu vực quản trị dòng họ</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100">
            Kính chào, {currentUser?.fullName}
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base max-w-xl">
            Bạn đang quản lý phả hệ <strong className="text-amber-300">{activeLineage?.name}</strong>. Hôm nay có {anniversaries.length} sự kiện giỗ chạp sắp diễn ra.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link
            to="/dashboard/tree"
            className="bg-amber-500 hover:bg-amber-600 text-[#0F4C3A] font-bold px-6 py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all"
          >
            <Network className="w-4 h-4" />
            <span>Xem Cây Gia Phả</span>
          </Link>
          <Link
            to="/dashboard/members"
            className="bg-emerald-900/80 hover:bg-emerald-900 text-emerald-100 border border-emerald-700 font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
          >
            <UserPlus className="w-4 h-4 text-amber-400" />
            <span>Thêm Thành Viên</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Tổng số dòng họ</span>
            <span className="block font-serif text-3xl font-bold text-[#0F4C3A]">{lineages.length}</span>
            <span className="text-xs text-amber-700 font-medium">Đang kết nối</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <GitBranch className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Thành viên dòng họ</span>
            <span className="block font-serif text-3xl font-bold text-[#0F4C3A]">{lineageMembers.length}</span>
            <span className="text-xs text-emerald-700 font-medium">Đã số hóa</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#0F4C3A] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Số thế hệ (Đời)</span>
            <span className="block font-serif text-3xl font-bold text-[#0F4C3A]">{activeLineage?.totalGenerations || 5}</span>
            <span className="text-xs text-amber-700 font-medium">Từ Thủy tổ</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Ngày giỗ sắp tới</span>
            <span className="block font-serif text-3xl font-bold text-[#0F4C3A]">{anniversaries.length}</span>
            <span className="text-xs text-red-600 font-medium">Cần chuẩn bị</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-800 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Anniversaries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#0F4C3A]">Thành viên nổi bật & Gần đây</h3>
            <Link to="/dashboard/members" className="text-xs text-amber-700 font-bold hover:underline flex items-center gap-1">
              Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {lineageMembers.slice(0, 4).map((member) => (
              <div key={member.id} className="py-4 flex items-center justify-between hover:bg-gray-50 px-3 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <img
                    src={member.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
                    alt={member.fullName}
                    className="w-12 h-12 rounded-full object-cover border border-amber-500/30"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{member.fullName}</h4>
                    <p className="text-xs text-gray-500">
                      Đời thứ {member.generation} • {member.branch || 'Chi chính'} {member.occupation ? `• ${member.occupation}` : ''}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/dashboard/members`}
                  className="text-xs bg-emerald-50 text-[#0F4C3A] font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  Chi tiết
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Anniversaries Upcoming */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#0F4C3A]">Lịch Giỗ Chạp</h3>
            <Calendar className="w-5 h-5 text-amber-600" />
          </div>

          <div className="space-y-4">
            {anniversaries.map((ann) => (
              <div key={ann.id} className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800 bg-amber-200/70 px-2.5 py-0.5 rounded-full">
                    {ann.lunarDate}
                  </span>
                  <span className="text-[11px] text-gray-500">{ann.solarDate}</span>
                </div>
                <h4 className="font-bold text-sm text-[#0F4C3A]">{ann.title}</h4>
                <p className="text-xs text-gray-600">{ann.description}</p>
                <p className="text-[11px] text-gray-400">📍 {ann.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

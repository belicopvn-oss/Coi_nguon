import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';
import { Member } from '../../types';
import { DongSonBackdrop, MemberAvatar } from '../../components/common/BrandMark';

export const FamilyTreeView: React.FC = () => {
  const { members, activeLineageId, lineages } = useApp();
  const [selectedGen, setSelectedGen] = useState<number | 'all'>('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const activeLineage = lineages.find((l) => l.id === activeLineageId) || lineages[0];
  const lineageMembers = members.filter((m) => m.lineageId === activeLineageId);

  const generations = [1, 2, 3, 4, 5];

  const filteredMembers =
    selectedGen === 'all'
      ? lineageMembers
      : lineageMembers.filter((m) => m.generation === selectedGen);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Interactive Generation Filter Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E3D9C6] shadow-xs">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#203D32]">Cây gia phả theo thế hệ</h2>
          <p className="text-sm text-[#5A534A] mt-1">
            {activeLineage?.name} · Chọn từng thành viên để xem tiểu sử chi tiết
          </p>
        </div>

        {/* Interactive Segmented Filter Control */}
        <div
          className="flex items-center gap-1 p-1 bg-[#F5F0E5] border border-[#E3D9C6] rounded-lg overflow-x-auto"
          role="tablist"
          aria-label="Lọc theo thế hệ"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedGen === 'all'}
            onClick={() => setSelectedGen('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              selectedGen === 'all'
                ? 'bg-[#203D32] text-[#F5F0E5]'
                : 'text-[#5A534A] hover:text-[#203D32]'
            }`}
          >
            Tất cả đời
          </button>
          {generations.map((g) => (
            <button
              key={g}
              type="button"
              role="tab"
              aria-selected={selectedGen === g}
              onClick={() => setSelectedGen(g)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap tabular-nums cursor-pointer ${
                selectedGen === g
                  ? 'bg-[#203D32] text-[#F5F0E5]'
                  : 'text-[#5A534A] hover:text-[#203D32]'
              }`}
            >
              Đời {g}
            </button>
          ))}
        </div>
      </div>

      {/* Tree Canvas */}
      <div className="relative bg-[#203D32] rounded-2xl p-6 sm:p-10 border border-[#B28A45]/35 overflow-hidden min-h-[540px]">
        <DongSonBackdrop className="absolute -right-28 -top-28 w-[440px] h-[440px] opacity-35" />

        <div className="relative z-10 text-center mb-10 space-y-2 pb-6 border-b border-[#F5F0E5]/15">
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#E5C98B]">
            {activeLineage?.name} · {activeLineage?.founderName}
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F5F0E5]">
            Sơ đồ phả hệ phân cấp
          </h3>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto space-y-10">
          {generations.map((gen) => {
            const genMembers = filteredMembers.filter((m) => m.generation === gen);
            if (genMembers.length === 0) return null;

            return (
              <div key={gen} className="space-y-4">
                {/* Generation Heading Line */}
                <div className="flex items-center gap-4">
                  <h4 className="font-serif text-base font-semibold text-[#E5C98B] whitespace-nowrap tabular-nums">
                    Đời thứ {gen}
                  </h4>
                  <div className="flex-grow h-px bg-[#B28A45]/35" />
                  <span className="text-xs text-[#F5F0E5]/65 tabular-nums whitespace-nowrap">
                    {genMembers.length} thành viên
                  </span>
                </div>

                {/* Generation Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {genMembers.map((member) => (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => setSelectedMember(member)}
                      className={`text-left bg-white p-4 rounded-xl border transition-all cursor-pointer hover:-translate-y-0.5 hover:shadow-md group ${
                        member.isAlive
                          ? 'border-[#B28A45]/75 hover:border-[#B28A45]'
                          : 'border-[#D8CCB7] hover:border-[#B28A45]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MemberAvatar src={member.avatarUrl} name={member.fullName} size="md" />
                        <div className="min-w-0">
                          <span className="block font-semibold text-sm text-[#203D32] truncate group-hover:text-[#6B4632] transition-colors">
                            {member.fullName}
                          </span>
                          <span className="text-xs text-[#5A534A] block truncate mt-0.5">
                            {member.branch || 'Chi chính'}
                          </span>
                          <span className="text-[11px] text-[#6B4632] block mt-1 tabular-nums">
                            {member.birthDate || '—'} · {member.isAlive ? 'Còn sống' : 'Đã tạ thế'}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredMembers.length === 0 && (
            <div className="text-center py-12 text-[#F5F0E5]/75 text-sm">
              Chưa có thành viên nào được ghi nhận ở thế hệ này.
            </div>
          )}
        </div>
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-[#162B23]/65 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E3D9C6] relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-[#5A534A] hover:text-[#203D32] hover:bg-[#FAF7F0] cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 pb-5 border-b border-[#EAE2D1] pr-8">
              <MemberAvatar src={selectedMember.avatarUrl} name={selectedMember.fullName} size="lg" />
              <div>
                <p className="text-xs font-medium text-[#6B4632] tabular-nums">
                  Đời thứ {selectedMember.generation} · {selectedMember.branch || 'Chi chính'} ·{' '}
                  {selectedMember.isAlive ? 'Còn sống' : 'Đã tạ thế'}
                </p>
                <h3 className="font-serif text-2xl font-semibold text-[#203D32] mt-1">
                  {selectedMember.fullName}
                </h3>
                {selectedMember.alias && (
                  <p className="text-xs text-[#5A534A] mt-0.5">{selectedMember.alias}</p>
                )}
              </div>
            </div>

            <dl className="divide-y divide-[#EAE2D1] text-sm">
              {selectedMember.birthDate && (
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-[#5A534A]">Năm sinh / Năm mất</dt>
                  <dd className="font-semibold text-[#203D32] tabular-nums">
                    {selectedMember.birthDate} — {selectedMember.deathDate || 'Nay'}
                  </dd>
                </div>
              )}

              {selectedMember.occupation && (
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-[#5A534A]">Nghề nghiệp / Chức vụ</dt>
                  <dd className="font-semibold text-[#203D32] text-right">{selectedMember.occupation}</dd>
                </div>
              )}

              {selectedMember.currentLocation && (
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-[#5A534A]">Nơi ở hiện tại</dt>
                  <dd className="font-semibold text-[#203D32] text-right">{selectedMember.currentLocation}</dd>
                </div>
              )}

              {selectedMember.burialLocation && (
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-[#5A534A]">Nơi an táng</dt>
                  <dd className="font-semibold text-[#203D32] text-right">{selectedMember.burialLocation}</dd>
                </div>
              )}

              {selectedMember.anniversaryLunarDate && (
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-[#5A534A]">Ngày giỗ (Âm lịch)</dt>
                  <dd className="font-semibold text-[#6B4632]">{selectedMember.anniversaryLunarDate}</dd>
                </div>
              )}
            </dl>

            {selectedMember.bio && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-[#6B4632]">Tiểu sử &amp; công trạng</h4>
                <p className="bg-[#FAF7F0] border border-[#EAE2D1] p-4 rounded-xl text-xs sm:text-sm text-[#4A443C] leading-relaxed">
                  {selectedMember.bio}
                </p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="bg-[#203D32] hover:bg-[#162B23] text-[#F5F0E5] font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Đóng hồ sơ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

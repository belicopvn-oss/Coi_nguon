import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Network, ZoomIn, ZoomOut, Filter, User, Calendar, MapPin, Award, ChevronRight } from 'lucide-react';
import { Member } from '../../types';

export const FamilyTreeView: React.FC = () => {
  const { members, activeLineageId, lineages } = useApp();
  const [selectedGen, setSelectedGen] = useState<number | 'all'>('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const activeLineage = lineages.find((l) => l.id === activeLineageId) || lineages[0];
  const lineageMembers = members.filter((m) => m.lineageId === activeLineageId);

  // Group by generation
  const generations = [1, 2, 3, 4, 5];

  const filteredMembers = selectedGen === 'all'
    ? lineageMembers
    : lineageMembers.filter((m) => m.generation === selectedGen);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Bar Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-xs border border-gray-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0F4C3A]">Cây Phả Hệ Tương Tác</h2>
          <p className="text-xs text-gray-500 mt-1">Sơ đồ các thế hệ dòng họ {activeLineage?.name}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
            <Filter className="w-4 h-4 text-[#0F4C3A]" />
            <span className="text-xs font-bold text-gray-700">Đời thứ:</span>
            <select
              value={selectedGen}
              onChange={(e) => setSelectedGen(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="bg-transparent text-sm font-bold text-[#0F4C3A] focus:outline-none cursor-pointer"
            >
              <option value="all">Tất cả các đời</option>
              {generations.map((g) => (
                <option key={g} value={g}>Đời thứ {g}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tree Visualization Container */}
      <div className="bg-gradient-to-br from-[#0a382b] via-[#0F4C3A] to-[#083327] rounded-3xl p-6 sm:p-10 shadow-2xl border border-amber-500/30 overflow-x-auto min-h-[600px] flex flex-col items-center">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-emerald-950/80 px-4 py-1.5 rounded-full border border-amber-500/30">
            {activeLineage?.name} — Thủy tổ: {activeLineage?.founderName}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">Sơ Đồ Phả Hệ Theo Thế Hệ</h3>
        </div>

        <div className="w-full max-w-5xl space-y-12">
          {generations.map((gen) => {
            const genMembers = filteredMembers.filter((m) => m.generation === gen);
            if (genMembers.length === 0) return null;

            return (
              <div key={gen} className="space-y-4">
                {/* Generation Header bar */}
                <div className="flex items-center gap-4">
                  <div className="bg-amber-500 text-[#0F4C3A] font-serif font-bold px-4 py-1.5 rounded-full text-xs shadow-md">
                    Đời thứ {gen}
                  </div>
                  <div className="flex-grow h-px bg-amber-500/30" />
                </div>

                {/* Members Cards in this generation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {genMembers.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => setSelectedMember(member)}
                      className={`bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border-2 transition-all cursor-pointer hover:scale-105 group ${
                        member.isAlive ? 'border-amber-400/80 hover:border-amber-500' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={member.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
                          alt={member.fullName}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-500/40 shrink-0"
                        />
                        <div className="overflow-hidden">
                          <h4 className="font-bold text-sm text-[#0F4C3A] truncate group-hover:text-amber-700 transition-colors">
                            {member.fullName}
                          </h4>
                          <span className="text-[11px] text-gray-500 block truncate">
                            {member.branch || 'Chi chính'}
                          </span>
                          <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold mt-1 ${
                            member.isAlive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {member.isAlive ? 'Còn sống' : 'Đã tạ thế'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-amber-500/30 relative">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 font-bold text-xl"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
              <img
                src={selectedMember.avatarUrl}
                alt={selectedMember.fullName}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-amber-500/30"
              />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full">
                  Đời thứ {selectedMember.generation} • {selectedMember.branch || 'Chi chính'}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0F4C3A] mt-1">{selectedMember.fullName}</h3>
                <span className={`inline-block text-xs font-bold mt-1 ${selectedMember.isAlive ? 'text-emerald-700' : 'text-gray-600'}`}>
                  {selectedMember.isAlive ? '🟢 Đang sinh sống' : '🕊️ Đã tạ thế'}
                </span>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              {selectedMember.birthDate && (
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-500">Năm sinh / Năm mất:</span>
                  <span className="font-bold text-[#0F4C3A]">{selectedMember.birthDate} — {selectedMember.deathDate || 'Nay'}</span>
                </div>
              )}

              {selectedMember.occupation && (
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-500">Nghề nghiệp / Chức vụ:</span>
                  <span className="font-bold text-[#0F4C3A]">{selectedMember.occupation}</span>
                </div>
              )}

              {selectedMember.currentLocation && (
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-500">Nơi ở hiện tại:</span>
                  <span className="font-bold text-[#0F4C3A]">{selectedMember.currentLocation}</span>
                </div>
              )}

              {selectedMember.anniversaryLunarDate && (
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-500">Ngày giỗ (Âm lịch):</span>
                  <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded">{selectedMember.anniversaryLunarDate}</span>
                </div>
              )}

              {selectedMember.bio && (
                <div className="space-y-1 pt-2">
                  <span className="font-semibold text-gray-500 block">Tiểu sử / Công trạng:</span>
                  <p className="bg-gray-50 p-3.5 rounded-xl text-xs text-gray-600 leading-relaxed">{selectedMember.bio}</p>
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button
                onClick={() => setSelectedMember(null)}
                className="bg-[#0F4C3A] text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow hover:bg-[#083327] transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

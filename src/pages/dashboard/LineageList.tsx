import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Users, Plus, ArrowRight, X, Check } from 'lucide-react';

export const LineageList: React.FC = () => {
  const { lineages, activeLineageId, setActiveLineageId, addLineage } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [originPlace, setOriginPlace] = useState('');
  const [founderName, setFounderName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLineage({
      name,
      originPlace,
      founderName,
      description,
      crestUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80',
    });
    setShowModal(false);
    setName('');
    setOriginPlace('');
    setFounderName('');
    setDescription('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E3D9C6] shadow-xs">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#203D32]">Không gian gia phả dòng họ</h2>
          <p className="text-sm text-[#5A534A] mt-1">Quản lý và chuyển đổi giữa các dòng họ, chi phái bạn tham gia</p>
        </div>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 bg-[#B28A45] hover:bg-[#9E7838] text-[#162B23] font-semibold px-5 py-3 rounded-lg text-sm transition-colors whitespace-nowrap cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo dòng họ mới</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lineages.map((lin) => {
          const isActive = lin.id === activeLineageId;
          return (
            <article
              key={lin.id}
              className={`bg-white rounded-2xl p-6 sm:p-7 border shadow-xs transition-colors flex flex-col justify-between space-y-6 ${
                isActive ? 'border-[#203D32] ring-1 ring-[#203D32]/20' : 'border-[#E3D9C6] hover:border-[#B28A45]'
              }`}
            >
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-medium text-[#6B4632]">{lin.founderName}</span>
                    {isActive && (
                      <span className="inline-flex items-center gap-1 font-semibold text-[#203D32] shrink-0">
                        <Check className="w-3.5 h-3.5 text-[#B28A45]" /> Đang chọn
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#203D32]">{lin.name}</h3>
                </div>

                <p className="text-sm text-[#4A443C] leading-relaxed">{lin.description}</p>

                <div className="space-y-2 text-xs text-[#5A534A] pt-4 border-t border-[#EAE2D1]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#B28A45] shrink-0" />
                    <span>Quê gốc: {lin.originPlace}</span>
                  </div>
                  <div className="flex items-center gap-2 tabular-nums">
                    <Users className="w-4 h-4 text-[#203D32] shrink-0" />
                    <span>
                      {lin.totalMembers} thành viên · {lin.totalGenerations} thế hệ
                      {lin.foundedYear ? ` · Lập năm ${lin.foundedYear}` : ''}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAE2D1]">
                <button
                  type="button"
                  onClick={() => setActiveLineageId(lin.id)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#203D32] text-[#F5F0E5]'
                      : 'bg-[#FAF7F0] hover:bg-[#EFE5D0] text-[#203D32] border border-[#E3D9C6]'
                  }`}
                >
                  <span>{isActive ? 'Đang làm việc trên dòng họ này' : 'Chuyển sang dòng họ này'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal Add Lineage */}
      {showModal && (
        <div className="fixed inset-0 bg-[#162B23]/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-[#E3D9C6]">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE2D1]">
              <h3 className="font-serif text-2xl font-semibold text-[#203D32]">Tạo dòng họ mới</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-[#5A534A] hover:text-[#203D32] hover:bg-[#FAF7F0] cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#6B4632]">Tên dòng họ / Chi phái</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                  placeholder="Ví dụ: Họ Trần Đình - Chi 2"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#6B4632]">Quê gốc</label>
                <input
                  type="text"
                  required
                  value={originPlace}
                  onChange={(e) => setOriginPlace(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                  placeholder="Ví dụ: Huyện Vĩnh Bảo, Hải Phòng"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#6B4632]">Tên Thủy tổ / Tổ khảo</label>
                <input
                  type="text"
                  required
                  value={founderName}
                  onChange={(e) => setFounderName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                  placeholder="Ví dụ: Cụ Tổ Trần Đình Quý"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#6B4632]">Mô tả giới thiệu</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] focus:outline-none focus:ring-2 focus:ring-[#203D32] resize-none"
                  placeholder="Lịch sử hình thành và truyền thống của dòng họ..."
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-[#FAF7F0] hover:bg-[#EFE5D0] text-[#203D32] border border-[#E3D9C6] font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#203D32] hover:bg-[#162B23] text-[#F5F0E5] font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  Lưu dòng họ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

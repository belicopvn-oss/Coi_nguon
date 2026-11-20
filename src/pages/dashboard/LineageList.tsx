import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GitBranch, MapPin, Users, Plus, Shield, ArrowRight } from 'lucide-react';

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
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#0F4C3A]">Danh Sách Gia Phả Dòng Họ</h2>
          <p className="text-sm text-gray-500 mt-1">Quản lý các không gian gia phả và chi phái bạn tham gia</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-amber-500 hover:bg-amber-600 text-[#0F4C3A] font-bold px-5 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo Dòng Họ Mới</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lineages.map((lin) => {
          const isActive = lin.id === activeLineageId;
          return (
            <div
              key={lin.id}
              className={`bg-white rounded-3xl p-6 sm:p-8 shadow-sm border transition-all ${
                isActive ? 'border-[#0F4C3A] ring-2 ring-[#0F4C3A]/20' : 'border-gray-200 hover:border-amber-500/50'
              } flex flex-col justify-between space-y-6`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                      Thủy tổ: {lin.founderName}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#0F4C3A] mt-3">{lin.name}</h3>
                  </div>
                  {isActive && (
                    <span className="bg-[#0F4C3A] text-white text-xs font-bold px-3 py-1 rounded-full shrink-0">
                      Đang chọn
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">{lin.description}</p>

                <div className="space-y-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Quê gốc: {lin.originPlace}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#0F4C3A] shrink-0" />
                    <span>Tổng số thành viên: {lin.totalMembers} • {lin.totalGenerations} thế hệ</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => setActiveLineageId(lin.id)}
                  className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    isActive
                      ? 'bg-[#0F4C3A] text-white shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  <span>{isActive ? 'Đang truy cập' : 'Chuyển sang dòng họ này'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Add Lineage */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-amber-500/30">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-[#0F4C3A]">Tạo Dòng Họ Mới</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-lg">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Tên dòng họ / Chi phái</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
                  placeholder="Ví dụ: Họ Trần Đình - Chi 2"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Quê gốc</label>
                <input
                  type="text"
                  required
                  value={originPlace}
                  onChange={(e) => setOriginPlace(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
                  placeholder="Ví dụ: Huyện Vĩnh Bảo, Hải Phòng"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Tên Thủy Tổ / Tổ khảo</label>
                <input
                  type="text"
                  required
                  value={founderName}
                  onChange={(e) => setFounderName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
                  placeholder="Ví dụ: Cụ Tổ Trần Đình Quý"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Mô tả giới thiệu</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium resize-none"
                  placeholder="Lịch sử hình thành và phát triển của dòng họ..."
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl text-sm transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-[#0F4C3A] font-bold py-3 rounded-xl text-sm shadow transition-colors"
                >
                  Tạo Dòng Họ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

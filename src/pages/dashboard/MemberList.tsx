import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search, Plus, Trash2, Edit3, Shield, MapPin, Phone, Mail } from 'lucide-react';
import { Member } from '../../types';

export const MemberList: React.FC = () => {
  const { members, activeLineageId, addMember, deleteMember, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGen, setFilterGen] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for new member
  const [fullName, setFullName] = useState('');
  const [generation, setGeneration] = useState(5);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [branch, setBranch] = useState('Chi 1');
  const [isAlive, setIsAlive] = useState(true);
  const [birthDate, setBirthDate] = useState('1990');
  const [occupation, setOccupation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');

  const lineageMembers = members.filter((m) => m.lineageId === activeLineageId);

  const filteredMembers = lineageMembers.filter((m) => {
    const matchSearch = m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.occupation && m.occupation.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchGen = filterGen === 'all' || m.generation === Number(filterGen);
    return matchSearch && matchGen;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMember({
      lineageId: activeLineageId,
      fullName,
      generation,
      gender,
      branch,
      isAlive,
      birthDate,
      occupation,
      currentLocation,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    });
    setShowAddModal(false);
    setFullName('');
    setOccupation('');
    setCurrentLocation('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-xs border border-gray-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0F4C3A]">Danh Sách Thành Viên Dòng Họ</h2>
          <p className="text-xs text-gray-500 mt-1">Quản lý hồ sơ chi tiết các thành viên trong phả hệ</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-amber-500 hover:bg-amber-600 text-[#0F4C3A] font-bold px-5 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Thành Viên Mới</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên, nghề nghiệp..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={filterGen}
            onChange={(e) => setFilterGen(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium cursor-pointer w-full sm:w-auto"
          >
            <option value="all">Tất cả các đời</option>
            <option value="1">Đời thứ 1</option>
            <option value="2">Đời thứ 2</option>
            <option value="3">Đời thứ 3</option>
            <option value="4">Đời thứ 4</option>
            <option value="5">Đời thứ 5</option>
          </select>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={member.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
                  alt={member.fullName}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-500/30 shrink-0"
                />
                <div>
                  <h3 className="font-bold text-base text-[#0F4C3A]">{member.fullName}</h3>
                  <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full inline-block mt-0.5">
                    Đời thứ {member.generation} • {member.branch || 'Chi chính'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteMember(member.id)}
                className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                title="Xóa thành viên"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
              {member.occupation && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-500">Nghề nghiệp:</span>
                  <span>{member.occupation}</span>
                </div>
              )}
              {member.currentLocation && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{member.currentLocation}</span>
                </div>
              )}
              {member.contactInfo?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{member.contactInfo.phone}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                member.isAlive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
              }`}>
                {member.isAlive ? '🟢 Còn sống' : '🕊️ Đã tạ thế'}
              </span>
              <span className="text-xs text-[#0F4C3A] font-bold hover:underline cursor-pointer">
                Xem hồ sơ →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Member */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-amber-500/30 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-[#0F4C3A]">Thêm Thành Viên Mới</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">✕</button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Họ và tên</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
                  placeholder="Ví dụ: Nguyễn Văn Hùng"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Đời thứ mấy</label>
                  <select
                    value={generation}
                    onChange={(e) => setGeneration(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
                  >
                    <option value={1}>Đời thứ 1</option>
                    <option value={2}>Đời thứ 2</option>
                    <option value={3}>Đời thứ 3</option>
                    <option value={4}>Đời thứ 4</option>
                    <option value={5}>Đời thứ 5</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Giới tính</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
                  >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Chi phái</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
                    placeholder="Ví dụ: Chi 1"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Tình trạng</label>
                  <select
                    value={isAlive ? 'true' : 'false'}
                    onChange={(e) => setIsAlive(e.target.value === 'true')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
                  >
                    <option value="true">Còn sống</option>
                    <option value="false">Đã tạ thế</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Nghề nghiệp / Chức vụ</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
                  placeholder="Ví dụ: Kỹ sư xây dựng"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Nơi ở hiện tại</label>
                <input
                  type="text"
                  value={currentLocation}
                  onChange={(e) => setCurrentLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
                  placeholder="Ví dụ: Hà Nội"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl text-sm transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-[#0F4C3A] font-bold py-3 rounded-xl text-sm shadow transition-colors"
                >
                  Lưu Thành Viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Plus, Trash2, MapPin, Phone, X, ArrowRight } from 'lucide-react';
import { Member } from '../../types';
import { MemberAvatar } from '../../components/common/BrandMark';

export const MemberList: React.FC = () => {
  const { members, activeLineageId, addMember, deleteMember } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGen, setFilterGen] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewingMember, setViewingMember] = useState<Member | null>(null);

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
    const matchSearch =
      m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.occupation && m.occupation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.branch && m.branch.toLowerCase().includes(searchQuery.toLowerCase()));
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E3D9C6] shadow-xs">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#203D32]">Danh sách thành viên</h2>
          <p className="text-sm text-[#5A534A] mt-1 tabular-nums">
            Hiển thị {filteredMembers.length} / {lineageMembers.length} thành viên trong dòng họ hiện tại
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 bg-[#B28A45] hover:bg-[#9E7838] text-[#162B23] font-semibold px-5 py-3 rounded-lg text-sm transition-colors whitespace-nowrap cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm thành viên</span>
        </button>
      </div>

      {/* Search & Generation Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E3D9C6] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A534A]">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo họ tên, chi phái, nghề nghiệp..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] placeholder:text-[#5A534A]/65 focus:outline-none focus:ring-2 focus:ring-[#203D32]"
          />
        </div>

        <select
          value={filterGen}
          onChange={(e) => setFilterGen(e.target.value)}
          aria-label="Lọc theo đời"
          className="bg-[#FAF7F0] border border-[#D8CCB7] text-[#203D32] text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#203D32] font-medium cursor-pointer sm:w-48"
        >
          <option value="all">Tất cả các đời</option>
          <option value="1">Đời thứ 1</option>
          <option value="2">Đời thứ 2</option>
          <option value="3">Đời thứ 3</option>
          <option value="4">Đời thứ 4</option>
          <option value="5">Đời thứ 5</option>
        </select>
      </div>

      {/* Members Grid */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <article
              key={member.id}
              className="bg-white rounded-2xl p-6 border border-[#E3D9C6] shadow-xs hover:border-[#B28A45] transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <MemberAvatar src={member.avatarUrl} name={member.fullName} size="lg" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#6B4632] tabular-nums">
                      Đời thứ {member.generation} · {member.branch || 'Chi chính'}
                    </p>
                    <h3 className="font-serif font-semibold text-lg text-[#203D32] truncate mt-0.5">
                      {member.fullName}
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => deleteMember(member.id)}
                  className="text-[#5A534A]/70 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                  title="Xóa thành viên"
                  aria-label={`Xóa ${member.fullName}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-[#4A443C] pt-3 border-t border-[#EAE2D1]">
                {member.occupation && (
                  <p className="truncate">
                    <span className="text-[#5A534A]">Nghề nghiệp: </span>
                    <span className="font-medium text-[#203D32]">{member.occupation}</span>
                  </p>
                )}
                {member.currentLocation && (
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#B28A45] shrink-0" />
                    <span className="truncate">{member.currentLocation}</span>
                  </p>
                )}
                {member.contactInfo?.phone && (
                  <p className="flex items-center gap-2 tabular-nums">
                    <Phone className="w-3.5 h-3.5 text-[#203D32] shrink-0" />
                    <span>{member.contactInfo.phone}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#EAE2D1]">
                <span className="text-xs text-[#5A534A] tabular-nums">
                  {member.birthDate || '—'} ·{' '}
                  <span className={member.isAlive ? 'text-[#203D32] font-medium' : 'text-[#6B4632]'}>
                    {member.isAlive ? 'Còn sống' : 'Đã tạ thế'}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setViewingMember(member)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#203D32] hover:text-[#6B4632] cursor-pointer whitespace-nowrap"
                >
                  <span>Xem hồ sơ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-10 border border-[#E3D9C6] text-center space-y-3">
          <p className="font-serif text-lg font-semibold text-[#203D32]">Không tìm thấy thành viên phù hợp</p>
          <p className="text-sm text-[#5A534A]">Thử thay đổi từ khóa tìm kiếm hoặc chọn bộ lọc thế hệ khác.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setFilterGen('all');
            }}
            className="bg-[#FAF7F0] hover:bg-[#EFE5D0] text-[#203D32] border border-[#E3D9C6] font-semibold px-4 py-2 rounded-lg text-xs cursor-pointer"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}

      {/* Modal View Member Detail */}
      {viewingMember && (
        <div className="fixed inset-0 bg-[#162B23]/65 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E3D9C6] relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setViewingMember(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-[#5A534A] hover:text-[#203D32] hover:bg-[#FAF7F0] cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 pb-5 border-b border-[#EAE2D1] pr-8">
              <MemberAvatar src={viewingMember.avatarUrl} name={viewingMember.fullName} size="lg" />
              <div>
                <p className="text-xs font-medium text-[#6B4632] tabular-nums">
                  Đời thứ {viewingMember.generation} · {viewingMember.branch || 'Chi chính'} ·{' '}
                  {viewingMember.isAlive ? 'Còn sống' : 'Đã tạ thế'}
                </p>
                <h3 className="font-serif text-2xl font-semibold text-[#203D32] mt-1">
                  {viewingMember.fullName}
                </h3>
              </div>
            </div>

            <dl className="divide-y divide-[#EAE2D1] text-sm">
              {viewingMember.birthDate && (
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-[#5A534A]">Năm sinh / Năm mất</dt>
                  <dd className="font-semibold text-[#203D32] tabular-nums">
                    {viewingMember.birthDate} — {viewingMember.deathDate || 'Nay'}
                  </dd>
                </div>
              )}
              {viewingMember.occupation && (
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-[#5A534A]">Nghề nghiệp</dt>
                  <dd className="font-semibold text-[#203D32] text-right">{viewingMember.occupation}</dd>
                </div>
              )}
              {viewingMember.currentLocation && (
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-[#5A534A]">Nơi ở hiện tại</dt>
                  <dd className="font-semibold text-[#203D32] text-right">{viewingMember.currentLocation}</dd>
                </div>
              )}
              {viewingMember.anniversaryLunarDate && (
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-[#5A534A]">Ngày giỗ (Âm lịch)</dt>
                  <dd className="font-semibold text-[#6B4632]">{viewingMember.anniversaryLunarDate}</dd>
                </div>
              )}
            </dl>

            {viewingMember.bio && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-[#6B4632]">Tiểu sử &amp; ghi chú</h4>
                <p className="bg-[#FAF7F0] border border-[#EAE2D1] p-4 rounded-xl text-xs sm:text-sm text-[#4A443C] leading-relaxed">
                  {viewingMember.bio}
                </p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingMember(null)}
                className="bg-[#203D32] hover:bg-[#162B23] text-[#F5F0E5] font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Đóng hồ sơ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Member */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#162B23]/65 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#E3D9C6] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE2D1]">
              <h3 className="font-serif text-2xl font-semibold text-[#203D32]">Thêm thành viên mới</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-[#5A534A] hover:text-[#203D32] hover:bg-[#FAF7F0] cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#6B4632]">Họ và tên</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                  placeholder="Ví dụ: Nguyễn Văn Hùng"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#6B4632]">Đời thứ</label>
                  <select
                    value={generation}
                    onChange={(e) => setGeneration(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                  >
                    <option value={1}>Đời thứ 1</option>
                    <option value={2}>Đời thứ 2</option>
                    <option value={3}>Đời thứ 3</option>
                    <option value={4}>Đời thứ 4</option>
                    <option value={5}>Đời thứ 5</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#6B4632]">Giới tính</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'other')}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                  >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#6B4632]">Chi phái</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                    placeholder="Ví dụ: Chi 1"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#6B4632]">Tình trạng</label>
                  <select
                    value={isAlive ? 'true' : 'false'}
                    onChange={(e) => setIsAlive(e.target.value === 'true')}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                  >
                    <option value="true">Còn sống</option>
                    <option value="false">Đã tạ thế</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#6B4632]">Năm sinh</label>
                  <input
                    type="text"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                    placeholder="Ví dụ: 1990"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#6B4632]">Nơi ở hiện tại</label>
                  <input
                    type="text"
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                    placeholder="Ví dụ: Hà Nội"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#6B4632]">Nghề nghiệp / Chức vụ</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                  placeholder="Ví dụ: Kỹ sư xây dựng"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-[#FAF7F0] hover:bg-[#EFE5D0] text-[#203D32] border border-[#E3D9C6] font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#203D32] hover:bg-[#162B23] text-[#F5F0E5] font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  Lưu thành viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

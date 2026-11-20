export type Gender = 'male' | 'female' | 'other';

export interface Member {
  id: string;
  lineageId: string;
  fullName: string;
  birthName?: string; // Tên khai sinh / Tên húy
  alias?: string; // Tên tự / Tự / Hiệu
  gender: Gender;
  birthDate?: string; // YYYY-MM-DD or approximate string
  deathDate?: string; // YYYY-MM-DD or approximate string
  isAlive: boolean;
  generation: number; // Đời thứ mấy (1, 2, 3...)
  branch?: string; // Chi phái (ví dụ: Chi 1, Chi trưởng, Chi 2...)
  avatarUrl?: string;
  fatherId?: string;
  motherId?: string;
  spouseIds?: string[];
  bio?: string;
  occupation?: string;
  currentLocation?: string;
  burialLocation?: string; // Nơi an táng / Nhà thờ tổ
  achievements?: string[];
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  anniversaryLunarDate?: string; // Ngày giỗ âm lịch (ví dụ: 15/08 Âm lịch)
}

export interface Lineage {
  id: string;
  name: string; // Tên dòng họ (ví dụ: Họ Nguyễn Văn - Thạch Thất)
  originPlace: string; // Quê gốc
  founderName: string; // Thủy tổ / Tổ khảo
  foundedYear?: string; // Năm lập dòng họ
  description: string;
  crestUrl?: string; // Hình huy hiệu / nhà thờ tổ
  totalGenerations: number;
  totalMembers: number;
  adminId: string;
  createdAt: string;
}

export interface AnniversaryEvent {
  id: string;
  lineageId: string;
  lineageName: string;
  memberId: string;
  memberName: string;
  solarDate: string; // YYYY-MM-DD
  lunarDate: string; // e.g., "12 tháng Giêng Âm lịch"
  title: string;
  description: string;
  location: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  lineageIds: string[];
  avatarUrl?: string;
  phone?: string;
}

export interface FamilyMembership {
  id: string;
  user_id: string;
  lineage_id: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'pending' | 'suspended';
  created_at?: string;
}

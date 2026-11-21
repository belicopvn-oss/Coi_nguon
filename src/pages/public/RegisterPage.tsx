import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { User, Mail, Lock, GitBranch, MapPin, ArrowRight, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { BrandSeal } from '../../components/common/BrandMark';

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lineageName, setLineageName] = useState('Họ Nguyễn Văn - Chi phái Mới');
  const [originPlace, setOriginPlace] = useState('Hà Nội');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ needsConfirmation?: boolean } | null>(null);

  const { register, addLineage } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const res = await register(fullName, email, password);
    setLoading(false);

    if (res.success) {
      if (res.needsConfirmation) {
        setSuccessInfo({ needsConfirmation: true });
      } else {
        addLineage({
          name: lineageName,
          originPlace: originPlace,
          founderName: 'Cụ Tổ Khảo (Đời thứ 1)',
          description: 'Dòng họ khởi tạo trên Cội Nguồn.',
          crestUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80',
        });
        navigate('/dashboard');
      }
    } else {
      setErrorMessage(res.error || 'Đăng ký không thành công. Email có thể đã tồn tại.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#F5F0E5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-sm border border-[#E3D9C6] overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#203D32] via-[#B28A45] to-[#6B4632]" />

        <div className="p-7 sm:p-9 space-y-6">
          <div className="text-center space-y-2.5">
            <Link to="/" className="inline-flex justify-center">
              <BrandSeal className="w-12 h-12" variant="light" />
            </Link>
            <h1 className="font-serif text-3xl font-semibold text-[#203D32]">Đăng ký gia phả mới</h1>
            <p className="text-xs sm:text-sm text-[#5A534A]">
              Khởi tạo không gian số trang trọng cho gia đình và dòng họ trên Cội Nguồn
            </p>
          </div>

          {successInfo?.needsConfirmation ? (
            <div className="bg-[#FAF7F0] border border-[#B28A45]/45 p-6 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-11 h-11 text-[#203D32] mx-auto" />
              <h2 className="font-serif font-semibold text-[#203D32] text-xl">Đăng ký tài khoản thành công</h2>
              <p className="text-xs sm:text-sm text-[#4A443C] leading-relaxed">
                Hệ thống đã gửi email xác nhận đến <strong className="text-[#203D32]">{email}</strong>. Vui lòng kiểm tra hộp thư (hoặc thư rác) để xác thực trước khi đăng nhập.
              </p>
              <Link
                to="/login"
                className="inline-block bg-[#203D32] hover:bg-[#162B23] text-[#F5F0E5] font-semibold px-6 py-3 rounded-lg text-sm mt-2 transition-colors"
              >
                Chuyển đến trang đăng nhập
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3.5 rounded-xl font-medium flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="reg-fullname" className="block text-xs font-semibold text-[#6B4632]">
                  Họ và tên Trưởng tộc / Người quản lý
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A534A]">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    id="reg-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] placeholder:text-[#5A534A]/60 focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                    placeholder="Ví dụ: Nguyễn Văn An"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="reg-email" className="block text-xs font-semibold text-[#6B4632]">
                  Email liên hệ
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A534A]">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    id="reg-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] placeholder:text-[#5A534A]/60 focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                    placeholder="email@domain.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="reg-password" className="block text-xs font-semibold text-[#6B4632]">
                  Mật khẩu
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A534A]">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    id="reg-password"
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] placeholder:text-[#5A534A]/60 focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                    placeholder="Ít nhất 6 ký tự"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="reg-lineage" className="block text-xs font-semibold text-[#6B4632]">
                    Tên dòng họ / Chi phái
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A534A]">
                      <GitBranch className="w-4 h-4" />
                    </span>
                    <input
                      id="reg-lineage"
                      type="text"
                      required
                      value={lineageName}
                      onChange={(e) => setLineageName(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                      placeholder="Họ Nguyễn Văn - Chi 1"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="reg-origin" className="block text-xs font-semibold text-[#6B4632]">
                    Quê gốc / Từ đường
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A534A]">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <input
                      id="reg-origin"
                      type="text"
                      required
                      value={originPlace}
                      onChange={(e) => setOriginPlace(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                      placeholder="Huyện X, Tỉnh Y"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#B28A45] hover:bg-[#9E7838] text-[#162B23] font-semibold py-3.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Đang khởi tạo...
                  </span>
                ) : (
                  <>
                    <span>Khởi tạo gia phả ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="text-center pt-2 border-t border-[#EAE2D1] text-sm text-[#5A534A]">
            Đã có tài khoản quản trị?{' '}
            <Link to="/login" className="text-[#203D32] font-semibold hover:text-[#6B4632] hover:underline">
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

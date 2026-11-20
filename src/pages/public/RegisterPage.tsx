import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { BookOpen, User, Mail, Lock, GitBranch, MapPin, ArrowRight, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-[#083327] via-[#0F4C3A] to-[#0A382B] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-amber-500/30 overflow-hidden p-8 space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 items-center justify-center text-[#0F4C3A] shadow-lg mb-1">
            <BookOpen className="w-7 h-7 font-bold" />
          </Link>
          <h2 className="font-serif text-3xl font-bold text-[#0F4C3A]">Đăng Ký Gia Phả Mới</h2>
          <p className="text-xs text-gray-500">
            Khởi tạo không gian số tôn nghiêm cho dòng họ của bạn trên Cội Nguồn
          </p>
        </div>

        {successInfo?.needsConfirmation ? (
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-amber-700 mx-auto" />
            <h3 className="font-bold text-[#0F4C3A] text-lg">Đăng ký tài khoản thành công!</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Hệ thống đã gửi một email xác nhận đến <strong>{email}</strong>. Vui lòng kiểm tra hộp thư của bạn (hoặc thư rác) để xác thực trước khi đăng nhập.
            </p>
            <Link
              to="/login"
              className="inline-block bg-[#0F4C3A] text-white font-bold px-6 py-3 rounded-xl text-xs mt-2"
            >
              Chuyển đến trang đăng nhập
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl font-medium flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Họ và tên Trưởng tộc / Quản lý</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
                  placeholder="Ví dụ: Nguyễn Văn An"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Email liên hệ</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
                  placeholder="email@domain.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Mật khẩu</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
                  placeholder="Ít nhất 6 ký tự"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Tên dòng họ / Chi phái</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <GitBranch className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={lineageName}
                  onChange={(e) => setLineageName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
                  placeholder="Ví dụ: Họ Nguyễn Văn - Chi 1"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Quê gốc / Nhà thờ tổ</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <MapPin className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={originPlace}
                  onChange={(e) => setOriginPlace(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
                  placeholder="Ví dụ: Huyện X, Tỉnh Y"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0F4C3A] font-bold py-3.5 rounded-xl shadow-lg text-sm transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Đang khởi tạo...
                </span>
              ) : (
                <>
                  <span>Khởi Tạo Gia Phả Ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="text-center pt-2 text-sm text-gray-600">
          Đã có tài khoản quản trị?{' '}
          <Link to="/login" className="text-[#0F4C3A] font-bold hover:underline">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Lock, Mail, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { BrandSeal } from '../../components/common/BrandMark';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(res.error || 'Đăng nhập thất bại. Vui lòng kiểm tra lại email hoặc mật khẩu.');
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    const res = await login('minh.nguyen@coinuong.vn', 'demo123');
    setLoading(false);
    if (res.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#F5F0E5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-[#E3D9C6] overflow-hidden">
        {/* Subtle heritage top band */}
        <div className="h-1.5 bg-gradient-to-r from-[#203D32] via-[#B28A45] to-[#6B4632]" />

        <div className="p-7 sm:p-9 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2.5">
            <Link to="/" className="inline-flex justify-center">
              <BrandSeal className="w-12 h-12" variant="light" />
            </Link>
            <h1 className="font-serif text-3xl font-semibold text-[#203D32]">Đăng nhập</h1>
            <p className="text-xs sm:text-sm text-[#5A534A]">
              Truy cập không gian quản lý gia phả dòng họ Cội Nguồn
            </p>
          </div>

          {/* Quick Demo Login */}
          <div className="bg-[#FAF7F0] border border-[#E3D9C6] p-4 rounded-xl space-y-2.5 text-center">
            <span className="text-xs font-medium text-[#6B4632] block">
              Trải nghiệm nhanh giao diện quản trị mẫu
            </span>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full bg-[#B28A45] hover:bg-[#9E7838] text-[#162B23] font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Đang vào...' : 'Đăng nhập tài khoản Trưởng tộc mẫu'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-[#E3D9C6]" />
            <span className="flex-shrink mx-3 text-xs text-[#5A534A]">Hoặc đăng nhập bằng email</span>
            <div className="flex-grow border-t border-[#E3D9C6]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3.5 rounded-xl font-medium flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="login-email" className="block text-xs font-semibold text-[#6B4632]">
                Email tài khoản
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A534A]">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] placeholder:text-[#5A534A]/60 focus:outline-none focus:ring-2 focus:ring-[#203D32] focus:border-[#203D32]"
                  placeholder="nhapemail@domain.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="login-password" className="block text-xs font-semibold text-[#6B4632]">
                  Mật khẩu
                </label>
                <Link to="/forgot-password" className="text-xs text-[#6B4632] hover:text-[#203D32] hover:underline font-medium">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A534A]">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] placeholder:text-[#5A534A]/60 focus:outline-none focus:ring-2 focus:ring-[#203D32] focus:border-[#203D32]"
                  placeholder="Nhập mật khẩu"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#203D32] hover:bg-[#162B23] text-[#F5F0E5] font-semibold py-3.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Đang đăng nhập...
                </span>
              ) : (
                <>
                  <span>Đăng nhập hệ thống</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-[#EAE2D1] text-sm text-[#5A534A]">
            Chưa có tài khoản dòng họ?{' '}
            <Link to="/register" className="text-[#203D32] font-semibold hover:text-[#6B4632] hover:underline">
              Đăng ký tạo gia phả
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

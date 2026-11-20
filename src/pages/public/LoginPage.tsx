import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { BookOpen, Lock, Mail, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-[#083327] via-[#0F4C3A] to-[#0A382B] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-amber-500/30 overflow-hidden p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 items-center justify-center text-[#0F4C3A] shadow-lg mb-1">
            <BookOpen className="w-7 h-7 font-bold" />
          </Link>
          <h2 className="font-serif text-3xl font-bold text-[#0F4C3A]">Đăng Nhập Quản Trị</h2>
          <p className="text-xs text-gray-500">
            Truy cập hệ thống quản lý phả hệ và kết nối dòng họ Cội Nguồn
          </p>
        </div>

        {/* Quick Demo Login Banner */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center space-y-2">
          <span className="text-xs font-bold text-amber-800 block">Tài khoản Trưởng tộc mẫu (Demo):</span>
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-[#0F4C3A] font-bold py-2.5 px-4 rounded-lg text-sm shadow transition-colors flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Đang vào...' : 'Đăng nhập nhanh với tư cách Trưởng Tộc'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-xs text-gray-400 uppercase tracking-widest">Hoặc đăng nhập email</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl font-medium flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Email</label>
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
                placeholder="nhập email của bạn"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Mật khẩu</label>
              <Link to="/forgot-password" className="text-xs text-amber-700 hover:underline font-medium">
                Quên mật khẩu?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F4C3A] hover:bg-[#083327] text-white font-bold py-3.5 rounded-xl shadow-lg text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Đang đăng nhập...
              </span>
            ) : (
              <>
                <span>Đăng Nhập Hệ Thống</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 text-sm text-gray-600">
          Chưa có tài khoản dòng họ?{' '}
          <Link to="/register" className="text-[#0F4C3A] font-bold hover:underline">
            Tạo gia phả miễn phí
          </Link>
        </div>
      </div>
    </div>
  );
};

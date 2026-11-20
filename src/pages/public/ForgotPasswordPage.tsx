import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { BookOpen, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { forgotPassword } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const res = await forgotPassword(email);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMessage(res.error || 'Có lỗi xảy ra khi gửi yêu cầu khôi phục.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#083327] via-[#0F4C3A] to-[#0A382B] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-amber-500/30 overflow-hidden p-8 space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 items-center justify-center text-[#0F4C3A] shadow-lg mb-1">
            <BookOpen className="w-7 h-7 font-bold" />
          </Link>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C3A]">Khôi Phục Mật Khẩu</h2>
          <p className="text-xs text-gray-500">
            Nhập email tài khoản của bạn để nhận liên kết đặt lại mật khẩu từ Cội Nguồn
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-[#0F4C3A] text-base">Đã gửi yêu cầu thành công!</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Vui lòng kiểm tra hộp thư đến (hoặc thư rác) tại <strong>{email}</strong> để làm theo hướng dẫn khôi phục mật khẩu.
            </p>
            <Link
              to="/login"
              className="inline-block bg-[#0F4C3A] text-white font-bold px-6 py-2.5 rounded-xl text-xs mt-2"
            >
              Quay lại đăng nhập
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl font-medium">
                {errorMessage}
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Email đăng ký</label>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0F4C3A] hover:bg-[#083327] text-white font-bold py-3.5 rounded-xl shadow-lg text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Đang gửi...' : 'Gửi Yêu Cầu Khôi Phục'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2 text-sm text-gray-600">
              Nhớ mật khẩu?{' '}
              <Link to="/login" className="text-[#0F4C3A] font-bold hover:underline">
                Đăng nhập ngay
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

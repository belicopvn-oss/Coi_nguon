import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Mail, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { BrandSeal } from '../../components/common/BrandMark';

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
    <div className="min-h-[calc(100vh-140px)] bg-[#F5F0E5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-[#E3D9C6] overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#203D32] via-[#B28A45] to-[#6B4632]" />

        <div className="p-7 sm:p-9 space-y-6">
          <div className="text-center space-y-2.5">
            <Link to="/" className="inline-flex justify-center">
              <BrandSeal className="w-12 h-12" variant="light" />
            </Link>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#203D32]">Khôi phục mật khẩu</h1>
            <p className="text-xs sm:text-sm text-[#5A534A]">
              Nhập email đã đăng ký để nhận liên kết đặt lại mật khẩu từ Cội Nguồn
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#FAF7F0] border border-[#B28A45]/45 p-6 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-11 h-11 text-[#203D32] mx-auto" />
              <h2 className="font-serif font-semibold text-[#203D32] text-lg">Đã gửi yêu cầu thành công</h2>
              <p className="text-xs sm:text-sm text-[#4A443C] leading-relaxed">
                Vui lòng kiểm tra hộp thư đến (hoặc thư rác) tại <strong className="text-[#203D32]">{email}</strong> để làm theo hướng dẫn đặt lại mật khẩu.
              </p>
              <Link
                to="/login"
                className="inline-block bg-[#203D32] hover:bg-[#162B23] text-[#F5F0E5] font-semibold px-6 py-2.5 rounded-lg text-sm mt-2 transition-colors"
              >
                Quay lại đăng nhập
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
                <label htmlFor="forgot-email" className="block text-xs font-semibold text-[#6B4632]">
                  Email đăng ký
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A534A]">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    id="forgot-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF7F0] border border-[#D8CCB7] rounded-lg text-sm text-[#1D2823] placeholder:text-[#5A534A]/60 focus:outline-none focus:ring-2 focus:ring-[#203D32]"
                    placeholder="email@domain.com"
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
                    <Loader2 className="w-4 h-4 animate-spin" /> Đang gửi...
                  </span>
                ) : (
                  <>
                    <span>Gửi yêu cầu khôi phục</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-3 border-t border-[#EAE2D1] text-sm text-[#5A534A]">
                Đã nhớ lại mật khẩu?{' '}
                <Link to="/login" className="text-[#203D32] font-semibold hover:text-[#6B4632] hover:underline">
                  Đăng nhập ngay
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

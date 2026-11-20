/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { SupabaseStatusBanner } from './components/common/SupabaseStatusBanner';
import { DashboardLayout } from './components/dashboard/DashboardLayout';

import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { PrivacyPage } from './pages/public/PrivacyPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';

import { DashboardHome } from './pages/dashboard/DashboardHome';
import { LineageList } from './pages/dashboard/LineageList';
import { FamilyTreeView } from './pages/dashboard/FamilyTreeView';
import { MemberList } from './pages/dashboard/MemberList';
import { MemberProfilePage } from './pages/dashboard/MemberProfilePage';
import { AccountManagement } from './pages/dashboard/AccountManagement';
import { PendingAccessPage } from './pages/dashboard/PendingAccessPage';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <SupabaseStatusBanner />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Route Guard Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; requireActive?: boolean }> = ({ children, requireActive = true }) => {
  const { isAuthenticated, membershipStatus, isLoadingAuth } = useApp();

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#0F4C3A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-[#0F4C3A]">Đang xác thực phiên đăng nhập...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireActive && membershipStatus === 'pending') {
    return <Navigate to="/dashboard/pending" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Toast />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* Pending Access Route */}
          <Route element={<DashboardLayout />}>
            <Route
              path="/dashboard/pending"
              element={
                <ProtectedRoute requireActive={false}>
                  <PendingAccessPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Dashboard Protected Routes */}
          <Route
            element={
              <ProtectedRoute requireActive={true}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/dashboard/lineages" element={<LineageList />} />
            <Route path="/dashboard/tree" element={<FamilyTreeView />} />
            <Route path="/dashboard/members" element={<MemberList />} />
            <Route path="/dashboard/profile" element={<MemberProfilePage />} />
            <Route path="/dashboard/settings" element={<AccountManagement />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

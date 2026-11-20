import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="flex items-center gap-3 bg-emerald-950 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-amber-500/30">
        <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
        <span className="text-sm font-medium">{toastMessage}</span>
      </div>
    </div>
  );
};

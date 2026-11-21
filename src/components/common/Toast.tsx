import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in" role="status" aria-live="polite">
      <div className="flex items-center gap-3 bg-[#203D32] text-[#F5F0E5] px-5 py-3.5 rounded-xl shadow-lg border border-[#B28A45]/50">
        <CheckCircle2 className="w-5 h-5 text-[#E5C98B] shrink-0" />
        <span className="text-sm font-medium">{toastMessage}</span>
      </div>
    </div>
  );
};

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-xs sm:text-sm font-medium ${
          isSuccess
            ? 'bg-emerald-900 text-white border-emerald-700 shadow-emerald-950/20'
            : isError
            ? 'bg-rose-900 text-white border-rose-700 shadow-rose-950/20'
            : 'bg-slate-900 text-white border-slate-700 shadow-slate-950/20'
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
        ) : isError ? (
          <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
        ) : (
          <Info className="w-4 h-4 text-amber-300 shrink-0" />
        )}

        <span className="leading-snug">{toast.message}</span>
      </div>
    </div>
  );
};

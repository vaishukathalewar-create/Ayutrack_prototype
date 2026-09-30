import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { t } = useApp();

  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xs py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 dark:text-slate-200 font-serif">{t('appName')}</span>
          <span>•</span>
          <span className="font-semibold text-amber-700 dark:text-amber-400">{t('sihCode')}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1 text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 font-medium">
            <Info className="w-3 h-3 text-emerald-600" />
            {t('prototypeSampleData')}
          </span>
        </div>

        <div className="flex items-center gap-4 text-center sm:text-right">
          <p className="text-[11px]">
            {t('footerDisclaimer')}
          </p>
          <div className="hidden md:flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('footerGcpReady')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

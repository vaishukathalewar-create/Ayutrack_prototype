import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TranslationKey } from '../../utils/i18n';

interface BreadcrumbProps {
  currentTabKey: TranslationKey;
  subItem?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentTabKey, subItem }) => {
  const { setActiveTab, t } = useApp();

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3" aria-label="Breadcrumb">
      <button
        onClick={() => setActiveTab('dashboard')}
        className="flex items-center gap-1 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>CTMS</span>
      </button>
      
      <ChevronRight className="w-3 h-3 text-slate-400" />
      
      <span className="font-semibold text-slate-800 dark:text-slate-200">
        {t(currentTabKey)}
      </span>

      {subItem && (
        <>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-emerald-700 dark:text-emerald-400 font-mono font-medium">
            {subItem}
          </span>
        </>
      )}
    </nav>
  );
};

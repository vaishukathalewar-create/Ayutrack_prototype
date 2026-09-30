import React from 'react';
import { 
  LayoutDashboard, 
  FlaskConical, 
  Users, 
  ClipboardEdit, 
  AlertTriangle, 
  ShieldAlert, 
  FileCheck2, 
  Building, 
  FileText, 
  BarChart3, 
  Sliders, 
  X,
  HeartPulse,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { TranslationKey, getTranslatedRole } from '../../utils/i18n';

interface NavItem {
  id: string;
  labelKey: TranslationKey;
  icon: React.ReactNode;
  badge?: string;
  badgeHi?: string;
  badgeColor?: string;
}

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { activeTab, setActiveTab, t, language, isGuidedDemoActive, demoStep } = useApp();
  const { userRole } = useAuth();

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      labelKey: 'dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'clinical-trials',
      labelKey: 'trials',
      icon: <FlaskConical className="w-4 h-4" />,
      badge: '4 Active',
      badgeHi: '4 सक्रिय',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
    },
    {
      id: 'participants',
      labelKey: 'participants',
      icon: <Users className="w-4 h-4" />
    },
    {
      id: 'ecrf',
      labelKey: 'ecrf',
      icon: <ClipboardEdit className="w-4 h-4" />,
      badge: 'eCRF',
      badgeHi: 'ई-सीआरएफ',
      badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
    },
    {
      id: 'adverse-events',
      labelKey: 'adverseEvents',
      icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
      badge: '1 SAE',
      badgeHi: '1 गंभीर',
      badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 animate-pulse'
    },
    {
      id: 'pharmacovigilance',
      labelKey: 'pharmacovigilance',
      icon: <ShieldAlert className="w-4 h-4 text-emerald-500" />
    },
    {
      id: 'ethics-regulatory',
      labelKey: 'ethicsRegulatory',
      icon: <FileCheck2 className="w-4 h-4" />,
      badge: 'NDCT',
      badgeHi: 'NDCT',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
    },
    {
      id: 'sites',
      labelKey: 'sites',
      icon: <Building className="w-4 h-4" />,
      badge: '5 Sites',
      badgeHi: '5 केंद्र'
    },
    {
      id: 'reports',
      labelKey: 'reports',
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: 'analytics',
      labelKey: 'analytics',
      icon: <BarChart3 className="w-4 h-4" />
    },
    {
      id: 'settings',
      labelKey: 'settings',
      icon: <Sliders className="w-4 h-4" />
    }
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobileOpen) {
      onCloseMobile();
    }
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      <div className="p-3 space-y-1 overflow-y-auto">
        
        {/* Mobile Header Close */}
        <div className="flex lg:hidden items-center justify-between px-3 py-2 mb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-sm font-serif text-slate-800 dark:text-slate-100">
              AyuTrack Navigation
            </span>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Role Banner */}
        <div className="px-3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-900/10 via-emerald-800/5 to-teal-900/10 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-600/20 mb-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            {t('activeRole')}
          </p>
          <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate mt-0.5">
            {getTranslatedRole(userRole, language)}
          </p>
        </div>

        {/* Guided Demo Indicator if active */}
        {isGuidedDemoActive && (
          <div className="px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 text-xs mb-3 flex items-center justify-between animate-pulse">
            <span className="font-semibold text-[11px]">{t('step')} {demoStep} / 14</span>
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
          </div>
        )}

        {/* Main Navigation List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const badgeText = language === 'hi' && item.badgeHi ? item.badgeHi : item.badge;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-800/30 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isActive ? 'text-amber-300' : 'text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{t(item.labelKey)}</span>
                </div>
                {badgeText && (
                  <span
                    className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-emerald-800 text-amber-200 border border-emerald-600'
                        : item.badgeColor || 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {badgeText}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Info */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400">
            <Award className="w-4 h-4 shrink-0 text-amber-500" />
            <span className="text-[11px] font-bold tracking-tight">{t('sihFullTitle')}</span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
            {t('ministryPrototype')}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors">
        <div className="sticky top-17 h-[calc(100vh-4.25rem)]">
          {navContent}
        </div>
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Mobile Slide-out Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-200 ease-in-out lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent}
      </div>
    </>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Languages, 
  PlayCircle, 
  CheckCircle2, 
  LogOut, 
  ChevronDown, 
  Activity, 
  UserCheck, 
  Menu,
  Sparkles,
  ShieldCheck,
  Building2,
  Stethoscope,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { getTranslatedRole } from '../../utils/i18n';

import { ProfileModal } from '../common/ProfileModal';

interface HeaderProps {
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const { currentUser, userRole, userEmail, switchRole, logout } = useAuth();
  const { 
    theme, 
    toggleTheme, 
    language, 
    setLanguage, 
    t, 
    setIsSearchOpen, 
    unreadCount, 
    setIsNotificationOpen, 
    isNotificationOpen,
    isGuidedDemoActive,
    startGuidedDemo,
    stopGuidedDemo,
    showToast
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const roleDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target as Node)) {
        setIsRoleDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rolesList: { role: UserRole; desc: string; icon: React.ReactNode }[] = [
    {
      role: 'Research Head',
      desc: t('roleDescResearchHead'),
      icon: <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
    },
    {
      role: 'Doctor / Principal Investigator',
      desc: t('roleDescDoctorPI'),
      icon: <Stethoscope className="w-4 h-4 text-teal-600 dark:text-teal-400" />
    },
    {
      role: 'Data Entry Operator',
      desc: t('roleDescDataEntry'),
      icon: <Database className="w-4 h-4 text-amber-600 dark:text-amber-400" />
    },
    {
      role: 'Ayush Officer',
      desc: t('roleDescAyushOfficer'),
      icon: <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
    }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-emerald-900/10 dark:border-slate-800 transition-colors shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8 h-17 flex items-center justify-between gap-4">
        
        {/* Left Section: Mobile Menu & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            {/* Ayurveda Symbol + Clinical Pulse Mark */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 flex items-center justify-center text-amber-300 shadow-md shadow-emerald-950/20 border border-emerald-600/30 shrink-0">
              <span className="font-serif font-bold text-xl tracking-tighter">आयु</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-emerald-950 dark:text-emerald-100 tracking-tight font-serif">
                  {t('appName')}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/50">
                  SIH26046
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                {t('appSubtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Live indicator & Search Trigger */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-xs border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-500/50 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-inner"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="truncate">{t('searchPlaceholder')}</span>
            </span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-700 rounded border border-slate-300 dark:border-slate-600 font-mono text-slate-500">
              ⌘K
            </kbd>
          </button>

          {/* Live system indicator */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-medium shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{t('liveIndicator')}</span>
          </div>
        </div>

        {/* Right Section: Guided Demo, Language, Theme, Role Selector, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Guided Demo Button */}
          {!isGuidedDemoActive ? (
            <button
              onClick={startGuidedDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-sm shadow-amber-600/20 active:scale-95 transition-all border border-amber-400/40"
              title="Walkthrough all 14 CTMS workflow steps"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-900 fill-slate-900" />
              <span className="hidden sm:inline">{t('startDemo')}</span>
              <span className="sm:hidden">Demo</span>
            </button>
          ) : (
            <button
              onClick={stopGuidedDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-xs active:scale-95 transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t('stopDemo')}</span>
            </button>
          )}

          {/* Language Selector: English / Hindi */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-md font-medium transition-all ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 rounded-md font-medium transition-all ${
                language === 'hi'
                  ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="हिन्दी"
            >
              हिं
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Color Theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Role Switcher Dropdown */}
          <div className="relative" ref={roleDropdownRef}>
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/60 transition-colors text-xs font-semibold"
              title="Switch CTMS User Role"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span className="max-w-[110px] sm:max-w-[160px] truncate">{getTranslatedRole(userRole, language)}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {t('switchRole')}
                  </p>
                </div>
                <div className="p-1 space-y-1">
                  {rolesList.map(item => (
                    <button
                      key={item.role}
                      onClick={() => {
                        switchRole(item.role);
                        setIsRoleDropdownOpen(false);
                        showToast(`${language === 'hi' ? 'सक्रिय भूमिका बदली गई: ' : 'Switched role to '}${getTranslatedRole(item.role, language)}`, 'info');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-start gap-2.5 transition-colors ${
                        userRole === item.role
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-medium'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="mt-0.5">{item.icon}</div>
                      <div>
                        <p className="text-xs font-semibold">{getTranslatedRole(item.role, language)}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center gap-2 pl-2 focus:outline-none"
              title="User Account"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-700 to-teal-900 text-white font-bold text-xs flex items-center justify-center ring-2 ring-emerald-500/30">
                {currentUser.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl py-2 z-50">
                <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{currentUser}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{userEmail}</p>
                  <span className="mt-1 inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                    {getTranslatedRole(userRole, language)}
                  </span>
                </div>
                <div className="p-1 space-y-1">
                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      setIsProfileModalOpen(true);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg flex items-center gap-2 font-medium transition-colors"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t('profile')}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      logout();
                      showToast(t('loggedOutSuccess'), 'info');
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg flex items-center gap-2 font-medium transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </header>
  );
};

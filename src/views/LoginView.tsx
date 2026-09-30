import React, { useState } from 'react';
import { 
  Building2, 
  Stethoscope, 
  Database, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  Sparkles, 
  HeartPulse, 
  CheckCircle2,
  Info,
  UserPlus,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth, ROLE_DEFAULT_USERS } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const LoginView: React.FC = () => {
  const { login, setAuthView, rememberMe, setRememberMe } = useAuth();
  const { showToast, t, language, setLanguage } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>('Research Head');
  const [email, setEmail] = useState(ROLE_DEFAULT_USERS['Research Head'].email);
  const [password, setPassword] = useState('ayutrack2025');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(rememberMe);

  const roleCredentials: Record<UserRole, { email: string; name: string; icon: React.ReactNode; desc: string }> = {
    'Research Head': {
      email: 'research.head@aiia.gov.in',
      name: 'Prof. (Dr.) Balram Bhargava',
      icon: <Building2 className="w-5 h-5 text-emerald-600" />,
      desc: language === 'hi' ? 'राष्ट्रीय परीक्षण पोर्टफोलियो, भर्ती मेट्रिक्स एवं बहु-साइट पर्यवेक्षण।' : 'National trial portfolio, recruitment metrics, and multi-site oversight.'
    },
    'Doctor / Principal Investigator': {
      email: 'pi.tanuja@aiia.gov.in',
      name: 'Prof. (Dr.) Tanuja Nesari',
      icon: <Stethoscope className="w-5 h-5 text-teal-600" />,
      desc: language === 'hi' ? 'नैदानिक प्रतिभागी परीक्षण, वाइटल्स एवं प्रतिकूल घटना रिपोर्टिंग।' : 'Clinical participant examination, vital signs, and adverse event reporting.'
    },
    'Data Entry Operator': {
      email: 'deo.sunil@trials.aiia.gov.in',
      name: 'Sunil Verma (CRC-II)',
      icon: <Database className="w-5 h-5 text-amber-600" />,
      desc: language === 'hi' ? 'ई-सीआरएफ विज़िट प्रविष्टि, लैब अवलोकन एवं FHIR निर्यात।' : 'eCRF visit entry, lab observation logging, and FHIR export.'
    },
    'Ayush Officer': {
      email: 'officer.national@ayush.gov.in',
      name: 'Dr. Rajesh Kotecha',
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      desc: language === 'hi' ? 'मंत्रालय स्तर पर राज्य परीक्षण निगरानी, औषध-निगरानी एवं अनुपालन।' : 'Ministry-level state trial monitoring, pharmacovigilance & compliance audits.'
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(roleCredentials[role].email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast(t('fillAllRequiredFields'), 'error');
      return;
    }
    setRememberMe(remember);
    login(selectedRole, email, roleCredentials[selectedRole].name, remember);
    showToast(t('loginSuccessful'), 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Bar */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-amber-300 font-serif font-bold text-2xl shadow-lg border border-emerald-500/40">
            आयु
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl text-white font-serif tracking-tight">{t('appName')}</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                {t('sihCode')}
              </span>
            </div>
            <p className="text-xs text-emerald-300/80">{t('appSubtitle')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                language === 'en'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                language === 'hi'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
          </div>

          <button
            onClick={() => setAuthView('signup')}
            className="text-xs font-semibold text-emerald-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3.5 py-1.5 rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{t('createYourAccount')}</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{t('ndctGcpBadge')}</span>
          </div>
        </div>
      </header>

      {/* Center Auth Card */}
      <main className="max-w-4xl mx-auto w-full my-8 z-10">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Hero & Role Details */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-gradient-to-b from-emerald-950/60 to-slate-900/80 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/20 mb-4">
                <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'hi' ? 'नेक्स्ट-जेन आयुर्वेद सीटीएमएस' : 'Next-Gen Ayurveda CTMS'}</span>
              </div>

              <h2 className="text-2xl font-bold font-serif text-white tracking-tight leading-snug">
                {t('heroSubtitle')}
              </h2>

              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                {t('heroDesc')}
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {t('quickRoleSwitch')}
              </p>

              {(Object.keys(roleCredentials) as UserRole[]).map((r) => {
                const isCurrent = selectedRole === r;
                const info = roleCredentials[r];
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoleSelect(r)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between text-xs ${
                      isCurrent
                        ? 'bg-emerald-900/40 border-emerald-500/60 text-white shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500/40'
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-800/80">{info.icon}</div>
                      <div>
                        <p className="font-semibold text-slate-100">
                          {r === 'Research Head' ? t('roleResearchHead') : r === 'Doctor / Principal Investigator' ? t('roleDoctorPI') : r === 'Data Entry Operator' ? t('roleDataEntry') : t('roleAyushOfficer')}
                        </p>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{info.name}</p>
                      </div>
                    </div>
                    {isCurrent && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Login Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-serif">{t('welcomeBack')}</h3>
                  <p className="text-xs text-slate-400">
                    {t('signInToContinue')}
                  </p>
                </div>
                <span className="text-[11px] bg-amber-400/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/30 font-medium">
                  {t('prototypeSampleData')}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {t('emailAddress')}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      {t('password')}
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[11px] text-emerald-400 flex items-center gap-1 hover:underline"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showPassword ? t('hidePassword') : t('showPassword')}</span>
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={e => setRemember(e.target.checked)}
                      className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>{t('rememberMe')}</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      showToast(language === 'hi' ? 'डेमो मोड: कृपया स्वतः भरे गए पासवर्ड का उपयोग करें' : 'Demo Mode: Use pre-filled password or select role', 'info');
                    }}
                    className="text-emerald-400 hover:underline"
                  >
                    {t('forgotPassword')}
                  </button>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 active:scale-98 transition-all"
                  >
                    <span>{t('launchCtmsBtn')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRememberMe(true);
                      login(selectedRole, email, roleCredentials[selectedRole].name, true);
                      showToast(t('loginSuccessful'), 'success');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/30 flex items-center justify-center gap-2 active:scale-98 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('demoLoginBtn')}</span>
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p className="text-xs text-slate-400">
                  {t('dontHaveAccount')}{' '}
                  <button
                    onClick={() => setAuthView('signup')}
                    className="text-emerald-400 font-semibold hover:underline"
                  >
                    {t('signup')}
                  </button>
                </p>
              </div>
            </div>

            {/* Disclaimer notice */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-start gap-2.5 text-[11px] text-slate-400">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>
                {t('prototypeAuthDisclaimer')}
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 z-10">
        <p>{t('appName')} • {t('appSubtitle')} • {t('sihCode')}</p>
        <p>{t('footerDisclaimer')}</p>
      </footer>
    </div>
  );
};

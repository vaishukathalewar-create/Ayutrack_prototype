import React, { useState } from 'react';
import { 
  ArrowRight, 
  Lock, 
  Mail, 
  HeartPulse, 
  CheckCircle2,
  Info,
  User,
  Phone,
  Building,
  Briefcase,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { UserRole, Language, UserProfile } from '../types';

export const SignupView: React.FC = () => {
  const { signup, setAuthView } = useAuth();
  const { showToast, t, language, setLanguage } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [organization, setOrganization] = useState('All India Institute of Ayurveda (AIIA)');
  const [designation, setDesignation] = useState('Clinical Investigator');
  const [role, setRole] = useState<UserRole>('Doctor / Principal Investigator');
  const [preferredLanguage, setPreferredLanguage] = useState<Language>(language);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword || !organization.trim()) {
      setErrorMsg(t('fillAllRequiredFields'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg(language === 'hi' ? 'कृपया एक वैध ईमेल पता दर्ज करें।' : 'Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setErrorMsg(language === 'hi' ? 'पासवर्ड कम से कम 8 वर्णों का होना चाहिए।' : 'Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(t('passwordsDoNotMatch'));
      return;
    }

    if (!agreeTerms) {
      setErrorMsg(language === 'hi' ? 'आपको नियम एवं गोपनीयता नीति से सहमत होना होगा।' : 'You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    const newProfile: UserProfile = {
      name: fullName.trim(),
      email: email.trim(),
      mobile: mobile.trim() || '+91 98000 00000',
      organization: organization.trim(),
      designation: designation.trim(),
      role,
      language: preferredLanguage
    };

    signup(newProfile, password);
    setLanguage(preferredLanguage);
    setIsSuccess(true);
    showToast(t('accountCreatedSuccessfully'), 'success');

    setTimeout(() => {
      setAuthView('login');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Bar */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between z-10">
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
              onClick={() => {
                setLanguage('en');
                setPreferredLanguage('en');
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                language === 'en'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => {
                setLanguage('hi');
                setPreferredLanguage('hi');
              }}
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
            onClick={() => setAuthView('login')}
            className="text-xs font-semibold text-emerald-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3.5 py-1.5 rounded-xl border border-slate-700 transition-colors"
          >
            {t('alreadyHaveAccount')}
          </button>
        </div>
      </header>

      {/* Main Register Box */}
      <main className="max-w-3xl mx-auto w-full my-8 z-10">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden p-6 sm:p-10">
          
          <div className="text-center max-w-lg mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/20 mb-3">
              <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'hi' ? 'अन्वेषक एवं अनुसंधानकर्ता पंजीकरण' : 'Investigator & Research Registration'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
              {t('createYourAccount')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              {language === 'hi'
                ? 'अखिल भारतीय आयुर्वेद संस्थान (AIIA) एवं आयुष मंत्रालय नैदानिक परीक्षण प्रबंधन प्रणाली हेतु पंजीकरण करें।'
                : 'Register for institutional access to the AIIA & Ministry of Ayush Clinical Trial Management System.'}
            </p>
          </div>

          {isSuccess ? (
            <div className="p-8 text-center bg-emerald-950/40 border border-emerald-500/30 rounded-2xl animate-in fade-in zoom-in-95">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white">{t('accountCreatedSuccessfully')}</h3>
              <p className="text-xs text-emerald-200 mt-1">
                {language === 'hi'
                  ? 'आपके क्रेडेंशियल सुरक्षित रूप से स्थानीय सत्र में सहेज लिए गए हैं। लॉगिन पर ले जाया जा रहा है...'
                  : 'Your credentials have been securely stored in the local prototype session. Redirecting to Login...'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t('fullName')} <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder={language === 'hi' ? 'उदा. डॉ. प्रिया शर्मा' : 'e.g. Dr. Priya Sharma'}
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t('emailAddress')} <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="name@institute.gov.in"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t('mobileNumber')}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      value={mobile}
                      onChange={e => setMobile(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Organization / Institution */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t('organization')} <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={organization}
                      onChange={e => setOrganization(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t('designation')}
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder={language === 'hi' ? 'उदा. एसोसिएट प्रोफेसर / अन्वेषक' : 'e.g. Associate Professor / PI'}
                      value={designation}
                      onChange={e => setDesignation(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {language === 'hi' ? 'लक्ष्य भूमिका' : 'Target Role'} <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Research Head">{t('roleResearchHead')}</option>
                    <option value="Doctor / Principal Investigator">{t('roleDoctorPI')}</option>
                    <option value="Data Entry Operator">{t('roleDataEntry')}</option>
                    <option value="Ayush Officer">{t('roleAyushOfficer')}</option>
                  </select>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-300">
                      {t('password')} <span className="text-rose-400">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[11px] text-emerald-400 flex items-center gap-1 hover:underline"
                    >
                      {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      <span>{showPassword ? t('hidePassword') : t('showPassword')}</span>
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t('confirmPassword')} <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Language Preference */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {t('preferredLanguage')}
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="lang"
                      checked={preferredLanguage === 'en'}
                      onChange={() => setPreferredLanguage('en')}
                      className="text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>English</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="lang"
                      checked={preferredLanguage === 'hi'}
                      onChange={() => setPreferredLanguage('hi')}
                      className="text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>हिंदी (Hindi)</span>
                  </label>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={e => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>
                    {t('agreeTermsCheckbox')}
                  </span>
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  <span>{t('createAccount')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-4 border-t border-slate-800 flex items-start gap-2 text-[11px] text-slate-400">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              {t('prototypeAuthDisclaimer')}
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 z-10">
        <p>{t('appName')} • {t('appSubtitle')} • {t('sihCode')}</p>
        <p>{t('footerDisclaimer')}</p>
      </footer>
    </div>
  );
};

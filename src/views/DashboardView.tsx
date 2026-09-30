import React, { useState, useEffect } from 'react';
import { 
  FlaskConical, 
  Users, 
  TrendingUp, 
  Building, 
  AlertTriangle, 
  AlertOctagon, 
  FileCheck, 
  ClipboardCheck, 
  Sparkles, 
  ArrowUpRight, 
  ChevronRight, 
  Activity, 
  Clock, 
  Stethoscope, 
  MapPin
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { ClinicalTrial, Participant, AdverseEvent, ResearchSite, RegulatoryTask } from '../types';

export const DashboardView: React.FC = () => {
  const { setActiveTab, startGuidedDemo, t, refreshKey, language } = useApp();
  const { userRole, currentUser } = useAuth();

  const [trials, setTrials] = useState<ClinicalTrial[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [adverseEvents, setAdverseEvents] = useState<AdverseEvent[]>([]);
  const [sites, setSites] = useState<ResearchSite[]>([]);
  const [regulatoryTasks, setRegulatoryTasks] = useState<RegulatoryTask[]>([]);

  useEffect(() => {
    setTrials(storageService.getTrials());
    setParticipants(storageService.getParticipants());
    setAdverseEvents(storageService.getAdverseEvents());
    setSites(storageService.getSites());
    setRegulatoryTasks(storageService.getRegulatoryTasks());
  }, [refreshKey]);

  // Derived metrics
  const activeTrials = trials.filter(t => t.status === 'Active' || t.status === 'Recruiting');
  const totalEnrolled = trials.reduce((acc, t) => acc + t.enrolledParticipants, 0);
  const totalTarget = trials.reduce((acc, t) => acc + t.targetParticipants, 0);
  const enrollmentProgressPercent = totalTarget > 0 ? Math.round((totalEnrolled / totalTarget) * 100) : 0;
  const seriousAesCount = adverseEvents.filter(a => a.isSerious).length;
  const pendingTasksCount = regulatoryTasks.filter(t => t.status === 'Pending' || t.status === 'Missing').length;

  // Chart data: Enrollment over time
  const enrollmentOverTimeData = [
    { month: language === 'hi' ? 'अप्रैल 25' : 'Apr 25', enrolled: 45, target: 60 },
    { month: language === 'hi' ? 'मई 25' : 'May 25', enrolled: 95, target: 120 },
    { month: language === 'hi' ? 'जून 25' : 'Jun 25', enrolled: 160, target: 190 },
    { month: language === 'hi' ? 'जुलाई 25' : 'Jul 25', enrolled: 220, target: 260 },
    { month: language === 'hi' ? 'अगस्त 25' : 'Aug 25', enrolled: 285, target: 340 },
    { month: language === 'hi' ? 'सितम्बर 25' : 'Sep 25', enrolled: 335, target: 450 }
  ];

  // Chart data: Site-wise enrollment
  const siteEnrollmentData = sites.map(s => ({
    name: s.name.replace('Site ', 'S-').replace(' (Govt Ayurveda College Kerala)', language === 'hi' ? ' केरल' : ' Kerala').replace(' (Podar Ayurveda Mumbai)', language === 'hi' ? ' मुंबई' : ' Mumbai').replace(' (IPGTRA Jamnagar)', language === 'hi' ? ' जामनगर' : ' Jamnagar').replace(' (NIA Jaipur)', language === 'hi' ? ' जयपुर' : ' Jaipur'),
    enrolled: s.participantsEnrolled,
    target: s.enrollmentTarget
  }));

  // Chart data: Trial status donut
  const trialStatusData = [
    { name: t('recruiting'), value: trials.filter(t => t.status === 'Recruiting').length, color: '#059669' },
    { name: t('active'), value: trials.filter(t => t.status === 'Active').length, color: '#0284c7' },
    { name: t('paused'), value: trials.filter(t => t.status === 'Paused').length, color: '#f59e0b' },
    { name: t('completed'), value: trials.filter(t => t.status === 'Completed').length, color: '#64748b' }
  ];

  // Chart data: Adverse events severity
  const aeSeverityData = [
    { severity: t('mild'), count: adverseEvents.filter(a => a.severity === 'Mild').length, color: '#10b981' },
    { severity: t('moderate'), count: adverseEvents.filter(a => a.severity === 'Moderate').length, color: '#f59e0b' },
    { severity: t('severe'), count: adverseEvents.filter(a => a.severity === 'Severe').length, color: '#ea580c' },
    { severity: t('serious'), count: seriousAesCount, color: '#dc2626' }
  ];

  return (
    <div className="space-y-6">
      
      {/* DASHBOARD HERO */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 sm:p-8 overflow-hidden shadow-xl border border-emerald-700/50">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold border border-amber-300/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'आयुष मंत्रालय • अखिल भारतीय आयुर्वेद संस्थान (AIIA)' : 'Ministry of Ayush • All India Institute of Ayurveda (AIIA)'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-white leading-tight">
            {t('heroTitle')}
          </h1>
          <h2 className="text-base sm:text-xl font-semibold text-emerald-100 mt-1">
            {t('heroSubtitle')}
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 max-w-2xl leading-relaxed">
            {t('heroDesc')}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              onClick={() => setActiveTab('clinical-trials')}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white text-emerald-950 hover:bg-emerald-50 active:scale-95 transition-all shadow-md flex items-center gap-1.5"
            >
              <FlaskConical className="w-4 h-4 text-emerald-800" />
              <span>{t('viewTrialsBtn')}</span>
            </button>

            <button
              onClick={startGuidedDemo}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 active:scale-95 transition-all shadow-md shadow-amber-950/20 flex items-center gap-1.5 border border-amber-400/40"
            >
              <Sparkles className="w-4 h-4 fill-slate-900" />
              <span>{t('startDemo')}</span>
            </button>

            <div className="hidden md:flex items-center gap-2 ml-2 text-xs text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{t('loggedAs')}: <strong className="text-white">{userRole === 'Research Head' ? t('roleResearchHead') : userRole === 'Doctor / Principal Investigator' ? t('roleDoctorPI') : userRole === 'Data Entry Operator' ? t('roleDataEntry') : t('roleAyushOfficer')}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Role-Specific Banner Notice */}
      {userRole === 'Doctor / Principal Investigator' && (
        <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Stethoscope className="w-5 h-5 text-teal-700 dark:text-teal-400" />
            <div>
              <p className="text-xs font-bold text-teal-950 dark:text-teal-100">
                {language === 'hi' ? `चिकित्सक / प्रधान अन्वेषक पोर्टल — ${currentUser}` : `Principal Investigator Clinical Portal — ${currentUser}`}
              </p>
              <p className="text-[11px] text-teal-800 dark:text-teal-300">
                {language === 'hi' ? 'आपके पास 2 लंबित प्रतिकूल घटना समीक्षाएँ और 3 सत्यापन योग्य ई-सीआरएफ विज़िट फॉर्म हैं।' : 'You have 2 pending participant adverse event reviews and 3 eCRF visit forms awaiting verification.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('adverse-events')}
              className="px-3 py-1.5 rounded-lg bg-teal-700 text-white text-xs font-bold hover:bg-teal-600 transition-colors"
            >
              {t('reportAE')}
            </button>
          </div>
        </div>
      )}

      {userRole === 'Data Entry Operator' && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            <div>
              <p className="text-xs font-bold text-amber-950 dark:text-amber-100">
                {language === 'hi' ? 'क्लिनिकल रिसर्च कोऑर्डिनेटर / डेटा एंट्री पोर्टल' : 'Clinical Research Coordinator / Data Entry Portal'}
              </p>
              <p className="text-[11px] text-amber-800 dark:text-amber-300">
                {language === 'hi' ? 'स्वचालित रक्तचाप/खुराक सीमा सत्यापन और FHIR इंटरऑपरेबिलिटी निर्यात के साथ डिजिटल ई-सीआरएफ डेटा प्रविष्टि।' : 'Ready for digital eCRF data entry with automated BP/dose range validation and FHIR interoperability export.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('ecrf')}
            className="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-bold hover:bg-amber-500 transition-colors"
          >
            {t('ecrf')}
          </button>
        </div>
      )}

      {userRole === 'Ayush Officer' && (
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building className="w-5 h-5 text-blue-700 dark:text-blue-400" />
            <div>
              <p className="text-xs font-bold text-blue-950 dark:text-blue-100">
                {language === 'hi' ? 'आयुष मंत्रालय राष्ट्रीय परीक्षण निगरानी एवं विनियामक पर्यवेक्षण' : 'Ministry of Ayush National Trial Monitoring & Regulatory Surveillance'}
              </p>
              <p className="text-[11px] text-blue-800 dark:text-blue-300">
                {language === 'hi' ? 'बहु-साइट अनुपालन सूचकांक 94.2%। सभी 5 प्रतिभागी केंद्रों पर केंद्रीय औषध-निगरानी संकेत सक्रिय हैं।' : 'Multi-site compliance index at 94.2%. Central pharmacovigilance signal detection is active across all 5 participating centers.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('ethics-regulatory')}
            className="px-3 py-1.5 rounded-lg bg-blue-700 text-white text-xs font-bold hover:bg-blue-600 transition-colors"
          >
            {t('ethicsRegulatory')}
          </button>
        </div>
      )}

      {/* KPI Cards Grid - All 8 Mandated Clinical Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Active Trials */}
        <div 
          onClick={() => setActiveTab('clinical-trials')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t('activeTrials')}</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 group-hover:scale-105 transition-transform">
              <FlaskConical className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-slate-900 dark:text-white">{activeTrials.length}</span>
            <span className="text-xs text-slate-400">/ {trials.length} {t('all')}</span>
          </div>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>{t('recruitingCountBadge')}</span>
          </p>
        </div>

        {/* KPI 2: Total Participants */}
        <div 
          onClick={() => setActiveTab('participants')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t('totalParticipants')}</span>
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-slate-900 dark:text-white">{totalEnrolled}</span>
            <span className="text-xs text-slate-400">/ {totalTarget} {t('target')}</span>
          </div>
          <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium mt-1">
            <span>{enrollmentProgressPercent}% {t('recruitmentGoal')}</span>
          </p>
        </div>

        {/* KPI 3: Enrollment Progress */}
        <div 
          onClick={() => setActiveTab('clinical-trials')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t('enrollmentProgress')}</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-slate-900 dark:text-white">{enrollmentProgressPercent}%</span>
            <span className="text-xs text-slate-400">{t('overall')}</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${enrollmentProgressPercent}%` }}></div>
          </div>
        </div>

        {/* KPI 4: Active Sites */}
        <div 
          onClick={() => setActiveTab('sites')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t('activeSites')}</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 group-hover:scale-105 transition-transform">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-slate-900 dark:text-white">{sites.length}</span>
            <span className="text-xs text-slate-400">{t('sites')}</span>
          </div>
          <p className="text-[11px] text-indigo-700 dark:text-indigo-400 font-medium mt-1">
            <span>{t('apexCentersList')}</span>
          </p>
        </div>

        {/* KPI 5: Total Adverse Events */}
        <div 
          onClick={() => setActiveTab('adverse-events')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t('adverseEvents')}</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-slate-900 dark:text-white">{adverseEvents.length}</span>
            <span className="text-xs text-slate-400">{t('all')}</span>
          </div>
          <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium mt-1">
            <span>{t('mildModerateCount')}</span>
          </p>
        </div>

        {/* KPI 6: Serious Adverse Events */}
        <div 
          onClick={() => setActiveTab('adverse-events')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/60 shadow-sm hover:border-rose-500 cursor-pointer transition-all group relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-700 dark:text-rose-400">{t('saeAlert')}</span>
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 group-hover:scale-105 transition-transform">
              <AlertOctagon className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-rose-600 dark:text-rose-400">{seriousAesCount}</span>
            <span className="text-xs text-slate-400">SAE</span>
          </div>
          <p className="text-[11px] text-rose-600 font-bold mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{t('activeSaeClockBadge')}</span>
          </p>
        </div>

        {/* KPI 7: Pending Regulatory Tasks */}
        <div 
          onClick={() => setActiveTab('ethics-regulatory')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t('pendingTasks')}</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 group-hover:scale-105 transition-transform">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-slate-900 dark:text-white">{pendingTasksCount}</span>
            <span className="text-xs text-slate-400">{t('dossiersPending')}</span>
          </div>
          <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium mt-1">
            <span>NDCT 2019 / CTRI</span>
          </p>
        </div>

        {/* KPI 8: eCRF Forms Submitted */}
        <div 
          onClick={() => setActiveTab('ecrf')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t('formsSubmitted')}</span>
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 group-hover:scale-105 transition-transform">
              <ClipboardCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-slate-900 dark:text-white">28</span>
            <span className="text-xs text-slate-400">{t('submitted')}</span>
          </div>
          <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium mt-1">
            <span>{t('verifiedEcRf')}</span>
          </p>
        </div>
      </div>

      {/* Charts Section: 4 Distinct Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart A: Participant Enrollment Line Chart */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>{t('enrollmentVelocityTitle')}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('enrollmentVelocityDesc')}
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
              {t('onTrack')}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentOverTimeData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line 
                  type="monotone" 
                  dataKey="enrolled" 
                  name={t('enrolled')} 
                  stroke="#059669" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, fill: '#059669' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  name={t('target')} 
                  stroke="#d97706" 
                  strokeDasharray="4 4" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart B: Site-wise Enrollment Bar Chart */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Building className="w-4 h-4 text-teal-600" />
                <span>{t('siteWiseEnrollmentTitle')}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('siteWiseEnrollmentDesc')}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('sites')}
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>{t('sites')}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={siteEnrollmentData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="enrolled" name={t('enrolled')} fill="#0d9488" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" name={t('target')} fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart C: Trial Status Donut Chart */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>{t('trialStatusDonutTitle')}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('trialStatusDonutDesc')}
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {trials.length} {t('trials')}
            </span>
          </div>

          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trialStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {trialStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart D: Adverse Events Breakdown */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>{t('aeSeverityTitle')}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('aeSeverityDesc')}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('pharmacovigilance')}
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>{t('pharmacovigilance')}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aeSeverityData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="severity" type="category" stroke="#94a3b8" fontSize={11} width={110} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" name={t('adverseEvents')} radius={[0, 4, 4, 0]}>
                  {aeSeverityData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Live Trial Monitoring Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 font-serif">
              <Activity className="w-5 h-5 text-emerald-600" />
              <span>{t('liveTrialMonitoring')}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'hi' ? 'आयुर्वेदिक औषधि योग, प्रधान अन्वेषक एवं नामांकन प्रगति के साथ चालू नैदानिक परीक्षण।' : 'Ongoing clinical trials with formulation specifications, principal investigators, and recruitment progress.'}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('clinical-trials')}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40 hover:bg-emerald-100 transition-colors flex items-center gap-1"
          >
            <span>{t('viewDetails')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Trial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trials.map((trial) => {
            const progress = Math.round((trial.enrolledParticipants / trial.targetParticipants) * 100);
            const isRecruiting = trial.status === 'Recruiting';
            const isActive = trial.status === 'Active';

            return (
              <div
                key={trial.id}
                onClick={() => setActiveTab('clinical-trials')}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-500/60 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: ID, Phase, Status */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {trial.id}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {trial.phase}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isRecruiting
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                            : isActive
                            ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/30'
                            : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {trial.status === 'Recruiting' ? t('recruiting') : trial.status === 'Active' ? t('active') : trial.status === 'Completed' ? t('completed') : t('paused')}
                      </span>
                    </div>
                  </div>

                  {/* Title & Ayurvedic Intervention */}
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug">
                    {trial.shortTitle}
                  </h4>

                  <div className="mt-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">{t('ayurvedicIntervention')}:</span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-300 truncate max-w-[160px]">
                        {trial.formulation} ({trial.formulationName})
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">{language === 'hi' ? 'रोग संकेत:' : 'Indication:'}</span>
                      <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[160px]">
                        {trial.indication}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">{t('principalInvestigator')}:</span>
                      <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[160px]">
                        {trial.pi}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar & Site stats */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500 dark:text-slate-400">{t('recruitment')}</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {trial.enrolledParticipants} / {trial.targetParticipants} ({progress}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2.5 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>{trial.participatingSites.length} {t('sites')}</span>
                    </span>
                    <span className="font-mono text-[10px]">
                      {trial.ctriNumber.split('/').slice(0, 2).join('/')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

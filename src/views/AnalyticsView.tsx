import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  Filter, 
  Calendar,
  Layers,
  Sparkles
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
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const AnalyticsView: React.FC = () => {
  const { t, language } = useApp();
  const [trialFilter, setTrialFilter] = useState('All');

  // Chart 1: Enrollment trend
  const enrollmentTrendData = [
    { month: 'Apr 25', actual: 45, projected: 50 },
    { month: 'May 25', actual: 95, projected: 100 },
    { month: 'Jun 25', actual: 160, projected: 160 },
    { month: 'Jul 25', actual: 220, projected: 225 },
    { month: 'Aug 25', actual: 285, projected: 290 },
    { month: 'Sep 25', actual: 335, projected: 360 }
  ];

  // Chart 2: Demographics by Prakriti
  const prakritiDemoData = [
    { prakriti: 'Vata', male: 28, female: 32 },
    { prakriti: 'Pitta', male: 42, female: 38 },
    { prakriti: 'Kapha', male: 30, female: 25 },
    { prakriti: 'Vata-Pitta', male: 35, female: 39 },
    { prakriti: 'Pitta-Kapha', male: 22, female: 24 },
    { prakriti: 'Vata-Kapha', male: 14, female: 16 },
    { prakriti: 'Tridosha', male: 6, female: 8 }
  ];

  // Chart 3: Protocol deviations trend (Decreasing due to AyuTrack digital eCRF checks!)
  const deviationTrendData = [
    { month: 'Apr', deviations: 14 },
    { month: 'May', deviations: 9 },
    { month: 'Jun', deviations: 6 },
    { month: 'Jul', deviations: 4 },
    { month: 'Aug', deviations: 2 },
    { month: 'Sep', deviations: 1 }
  ];

  // Chart 4: Compliance trend over time
  const complianceTrendData = [
    { month: 'Apr', score: 78 },
    { month: 'May', score: 84 },
    { month: 'Jun', score: 89 },
    { month: 'Jul', score: 91 },
    { month: 'Aug', score: 93 },
    { month: 'Sep', score: 95 }
  ];

  // Chart 5: Trial completion %
  const trialCompletionData = [
    { trial: 'AYU-001', completion: 78 },
    { trial: 'AYU-002', completion: 81 },
    { trial: 'AYU-003', completion: 60 },
    { trial: 'AYU-004', completion: 68 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <Breadcrumb currentTabKey="analytics" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
              <span>{t('researchAnalyticsTitle')}</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('analyticsSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">{t('filterProtocol')}:</span>
            <select
              value={trialFilter}
              onChange={e => setTrialFilter(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 font-semibold focus:outline-none"
            >
              <option value="All">{t('allClinicalTrialsPooled')}</option>
              <option value="AYU-001">AYU-001 ({language === 'hi' ? 'मेटाबोलिक सिंड्रोम' : 'Metabolic Syndrome'})</option>
              <option value="AYU-002">AYU-002 ({language === 'hi' ? 'संधिवात' : 'Osteoarthritis'})</option>
              <option value="AYU-003">AYU-003 ({language === 'hi' ? 'स्मृति ह्रास' : 'Cognitive Health'})</option>
              <option value="AYU-004">AYU-004 ({language === 'hi' ? 'त्वचा विकार' : 'Dermatology'})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of 4 Core Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Enrollment Velocity (Area Chart) */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>{t('multiCentricEnrollmentTrajectory')}</span>
              </h3>
              <p className="text-xs text-slate-500">{t('actualVsTargeted')}</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              93.1% {language === 'hi' ? 'भर्ती गति' : 'Velocity'}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Area type="monotone" dataKey="actual" name={language === 'hi' ? 'वास्तविक नामांकित' : 'Actual Enrolled'} stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#colorActual)" />
                <Line type="monotone" dataKey="projected" name={language === 'hi' ? 'प्रक्षेपित लक्ष्य' : 'Projected Target'} stroke="#d97706" strokeDasharray="3 3" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Demographics by Prakriti & Gender */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-600" />
                <span>{t('prakritiConstitutionDistribution')}</span>
              </h3>
              <p className="text-xs text-slate-500">{t('stratificationAyurveda')}</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              {language === 'hi' ? 'पित्त प्रधान' : 'Pitta Dominant'}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prakritiDemoData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
                <XAxis dataKey="prakriti" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Bar dataKey="male" name={language === 'hi' ? 'पुरुष' : 'Male'} fill="#0d9488" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="female" name={language === 'hi' ? 'महिला' : 'Female'} fill="#f59e0b" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Protocol Deviations Downward Trend */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t('protocolDeviations')}</span>
              </h3>
              <p className="text-xs text-slate-500">{t('reductionErrorRates')}</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {language === 'hi' ? '-86% त्रुटियां' : '-86% Errors'}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={deviationTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }} />
                <Line type="monotone" dataKey="deviations" name={language === 'hi' ? 'मासिक विचलन' : 'Monthly Deviations'} stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4, fill: '#ef4444' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: National Compliance Trend */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t('qualityRegulatoryCompliance')}</span>
              </h3>
              <p className="text-xs text-slate-500">{t('continuousNdct')}</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              95% {language === 'hi' ? 'लक्ष्य' : 'Target'}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complianceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[60, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }} />
                <Line type="monotone" dataKey="score" name={language === 'hi' ? 'अनुपालन %' : 'Compliance %'} stroke="#059669" strokeWidth={2.5} dot={{ r: 4, fill: '#059669' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

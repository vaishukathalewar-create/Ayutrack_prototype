import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  TrendingUp, 
  BarChart2, 
  Info, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
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
import { storageService } from '../services/storageService';
import { AdverseEvent } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const PharmacovigilanceView: React.FC = () => {
  const { setActiveTab, refreshKey, t, language } = useApp();
  const [adverseEvents, setAdverseEvents] = useState<AdverseEvent[]>([]);

  useEffect(() => {
    setAdverseEvents(storageService.getAdverseEvents());
  }, [refreshKey]);

  // Derived metrics
  const totalAes = adverseEvents.length;
  const totalSaes = adverseEvents.filter(a => a.isSerious).length;
  const resolvedEvents = adverseEvents.filter(a => a.outcome === 'Recovered').length;
  const openEvents = adverseEvents.filter(a => a.outcome !== 'Recovered').length;

  // Chart data: Events by Trial
  const trialMap: Record<string, number> = {};
  adverseEvents.forEach(a => {
    trialMap[a.trialId] = (trialMap[a.trialId] || 0) + 1;
  });
  const trialChartData = Object.keys(trialMap).map(tid => ({
    trial: tid,
    count: trialMap[tid]
  }));

  // Chart data: Events by Causality
  const causalityMap: Record<string, number> = {};
  adverseEvents.forEach(a => {
    causalityMap[a.causality] = (causalityMap[a.causality] || 0) + 1;
  });
  const causalityChartData = Object.keys(causalityMap).map((k, idx) => ({
    name: k,
    value: causalityMap[k],
    color: ['#059669', '#0d9488', '#f59e0b', '#dc2626', '#64748b'][idx % 5]
  }));

  // Chart data: Events by Severity
  const severityChartData = [
    { severity: language === 'hi' ? 'हल्का' : 'Mild', count: adverseEvents.filter(a => a.severity === 'Mild').length, fill: '#10b981' },
    { severity: language === 'hi' ? 'मध्यम' : 'Moderate', count: adverseEvents.filter(a => a.severity === 'Moderate').length, fill: '#f59e0b' },
    { severity: language === 'hi' ? 'गंभीर' : 'Severe', count: adverseEvents.filter(a => a.severity === 'Severe').length, fill: '#ea580c' },
    { severity: language === 'hi' ? 'अति-गंभीर' : 'Serious', count: totalSaes, fill: '#dc2626' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Breadcrumb & Header */}
      <div>
        <Breadcrumb currentTabKey="pharmacovigilance" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-emerald-600" />
              <span>{t('pvSafetySurveillance')}</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('pvSubtitle')}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('adverse-events')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <span>{t('openRawAeRegistry')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Requirement #7: PATTERN ALERT DEMONSTRATION */}
      <div className="p-4 sm:p-5 rounded-3xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-400/50 dark:border-amber-700/60 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 shrink-0 mt-0.5 shadow-md">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-amber-900 dark:text-amber-200 tracking-wide uppercase">
                  {t('safetySignalTrigger')}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                  {t('ruleBasedSignal')}
                </span>
              </div>

              <h3 className="text-sm font-bold text-amber-950 dark:text-amber-100 mt-1">
                {t('potentialSafetyPattern')}
              </h3>

              <p className="text-xs text-amber-900/90 dark:text-amber-200/90 mt-1 max-w-3xl leading-relaxed">
                {t('safetyPatternDescription')}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0 self-end md:self-center">
            <button
              onClick={() => setActiveTab('reports')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all"
            >
              {t('generateDsmbDossier')}
            </button>
            <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
              {t('prototypeRuleBasedNotice')}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">{t('totalAdverseEvents')}</span>
          <p className="text-2xl font-bold font-serif text-slate-900 dark:text-white mt-1">{totalAes}</p>
          <span className="text-[11px] text-emerald-600 font-medium">{language === 'hi' ? 'सभी नैदानिक केंद्र' : 'All clinical sites'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900 shadow-sm">
          <span className="text-xs font-semibold text-rose-700 dark:text-rose-400">{t('seriousAes')}</span>
          <p className="text-2xl font-bold font-serif text-rose-600 mt-1">{totalSaes}</p>
          <span className="text-[11px] text-rose-600 font-bold">{language === 'hi' ? '24-घंटे की विधिक घड़ी सक्रिय' : '24-hr clock active'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">{t('resolvedEvents')}</span>
          <p className="text-2xl font-bold font-serif text-emerald-600 mt-1">{resolvedEvents}</p>
          <span className="text-[11px] text-slate-400">{Math.round((resolvedEvents / (totalAes || 1)) * 100)}% {language === 'hi' ? 'समाधान दर' : 'resolution rate'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">{t('openUnderObservation')}</span>
          <p className="text-2xl font-bold font-serif text-amber-600 mt-1">{openEvents}</p>
          <span className="text-[11px] text-amber-600 font-medium">{language === 'hi' ? 'सक्रिय अनुवर्ती निगरानी' : 'Follow-up active'}</span>
        </div>
      </div>

      {/* Pharmacovigilance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Events by Trial */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-600" />
              <span>{t('adverseEventsByTrial')}</span>
            </h3>
            <p className="text-xs text-slate-500">{t('distributionAcrossProtocols')}</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trialChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
                <XAxis dataKey="trial" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#059669" radius={[4, 4, 0, 0]} name={language === 'hi' ? 'घटनाएँ' : 'AE Incidents'} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Events by WHO-UMC Causality */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>{t('whoUmcCausalityRatio')}</span>
            </h3>
            <p className="text-xs text-slate-500">{t('certainProbableRatio')}</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={causalityChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  dataKey="value"
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {causalityChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Severity Breakdown */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>{t('severityDistribution')}</span>
            </h3>
            <p className="text-xs text-slate-500">{t('mildVsSae')}</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
                <XAxis dataKey="severity" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" name={language === 'hi' ? 'संख्या' : 'Count'} radius={[4, 4, 0, 0]}>
                  {severityChartData.map((entry, idx) => (
                    <Cell key={`bar-${idx}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  Building, 
  MapPin, 
  UserCheck, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Mail, 
  FileCheck,
  Plus,
  X
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { useApp } from '../context/AppContext';
import { storageService } from '../services/storageService';
import { ResearchSite } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const SitesView: React.FC = () => {
  const { refreshKey, showToast, t, language } = useApp();
  const [sites, setSites] = useState<ResearchSite[]>([]);
  const [selectedSite, setSelectedSite] = useState<ResearchSite | null>(null);

  useEffect(() => {
    setSites(storageService.getSites());
  }, [refreshKey]);

  const chartData = sites.map(s => ({
    name: s.name.replace('Site ', 'S-').replace(' (Govt Ayurveda College Kerala)', ' Kerala').replace(' (Podar Ayurveda Mumbai)', ' Mumbai').replace(' (IPGTRA Jamnagar)', ' Jamnagar').replace(' (NIA Jaipur)', ' Jaipur'),
    Enrolled: s.participantsEnrolled,
    Target: s.enrollmentTarget
  }));

  const totalEnrolled = sites.reduce((sum, s) => sum + s.participantsEnrolled, 0);
  const totalTarget = sites.reduce((sum, s) => sum + s.enrollmentTarget, 0);

  return (
    <div className="space-y-6">
      
      {/* Breadcrumb & Header */}
      <div>
        <Breadcrumb currentTabKey="sites" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Building className="w-6 h-6 text-emerald-600" />
              <span>{t('participatingSitesTitle')}</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('sitesSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {t('networkTotal')}: <strong>{totalEnrolled} / {totalTarget} {t('enrolledLabel')}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {t('siteWiseEnrollment')}
            </h3>
            <p className="text-xs text-slate-500">{t('recruitmentVelocity')}</p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar dataKey="Enrolled" name={t('enrolledLabel')} fill="#059669" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Target" name={t('targetLabel')} fill="#94a3b8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Site Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sites.map((site) => {
          const percent = Math.round((site.participantsEnrolled / site.enrollmentTarget) * 100);

          return (
            <div
              key={site.id}
              onClick={() => setSelectedSite(site)}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-emerald-500/60 cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    {site.id}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      site.siteStatus === 'Active'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {site.siteStatus === 'Active' ? t('statusActive') : t('statusPending')}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {site.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>{site.city}, {site.state}</span>
                </p>

                <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('principalInvestigator')}:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{site.pi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('activeTrials')}:</span>
                    <span className="font-bold text-emerald-600">{site.activeTrialsCount} {language === 'hi' ? 'अध्ययन' : 'Studies'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('ethicsStatus')}:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{site.ethicsStatus}</span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{t('enrollmentProgress')}</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {site.participantsEnrolled} / {site.enrollmentTarget} ({percent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Site Modal */}
      {selectedSite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {selectedSite.name}
                </h3>
                <p className="text-xs text-slate-400">{selectedSite.city}, {selectedSite.state}</p>
              </div>
              <button onClick={() => setSelectedSite(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex justify-between">
                <span className="text-slate-400">{t('principalInvestigator')}:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedSite.pi}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex justify-between">
                <span className="text-slate-400">{t('officialContact')}:</span>
                <span className="font-mono text-emerald-600">{selectedSite.contactEmail}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex justify-between">
                <span className="text-slate-400">{t('institutionalEthicsApproval')}:</span>
                <span className="font-bold text-emerald-600">{selectedSite.ethicsStatus}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex justify-between">
                <span className="text-slate-400">{t('recruitmentTarget')}:</span>
                <span className="font-bold">{selectedSite.participantsEnrolled} / {selectedSite.enrollmentTarget} {language === 'hi' ? 'प्रतिभागी' : 'participants'}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedSite(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

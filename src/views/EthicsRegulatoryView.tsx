import React, { useState, useEffect } from 'react';
import { 
  FileCheck2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Calendar, 
  Building, 
  ShieldCheck, 
  Award, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from 'recharts';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { api } from '../services/api';
import { RegulatoryTask, EthicsStatus } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const EthicsRegulatoryView: React.FC = () => {
  const { showToast, refreshKey, triggerRefresh, t, language } = useApp();
  const { currentUser, userRole } = useAuth();

  const [tasks, setTasks] = useState<RegulatoryTask[]>([]);

  useEffect(() => {
    setTasks(storageService.getRegulatoryTasks());
  }, [refreshKey]);

  // Track the 8 mandated regulatory areas:
  const regulatoryAreas = [
    { 
      title: language === 'hi' ? 'नैतिकता समिति अनुमोदन' : 'Ethics Committee Approval', 
      status: 'Approved', 
      desc: language === 'hi' ? 'सक्रिय केंद्रों पर संस्थागत नैतिकता समिति (IEC) का वैध पंजीकरण।' : 'Institutional Ethics Committee (IEC) valid registrations across active sites.' 
    },
    { 
      title: language === 'hi' ? 'CTRI पंजीकरण' : 'CTRI Registration', 
      status: 'Approved', 
      desc: language === 'hi' ? 'क्लिनिकल ट्रायल्स रजिस्ट्री - इंडिया पूर्ण प्रोटोकॉल एवं भर्ती केंद्र प्रकाशन।' : 'Clinical Trials Registry - India full protocol and recruiting site publication.' 
    },
    { 
      title: language === 'hi' ? 'NDCT नियम 2019 दस्तावेज़ीकरण' : 'NDCT Rules 2019 Documentation', 
      status: 'Pending', 
      desc: language === 'hi' ? 'अध्याय III नई औषधियाँ एवं नैदानिक परीक्षण नियम अनुपालन संचिका।' : 'Chapter III New Drugs and Clinical Trials Rules compliance dossier.' 
    },
    { 
      title: language === 'hi' ? 'सूचित सहमति (ऑडियो-वीडियो)' : 'Informed Consent (Audio-Video)', 
      status: 'Approved', 
      desc: language === 'hi' ? 'द्विभाषी रोगी सहमति एवं एवी अभिलेख सत्यापन पूर्ण।' : 'Bilingual patient consent and AV archival verification complete.' 
    },
    { 
      title: language === 'hi' ? 'प्रोटोकॉल अनुमोदन व संशोधन' : 'Protocol Approval & Amendments', 
      status: 'Approved', 
      desc: language === 'hi' ? 'CDSCO एवं AIIA वैज्ञानिक सलाहकार समिति द्वारा स्वीकृत।' : 'CDSCO & AIIA Scientific Advisory Committee cleared.' 
    },
    { 
      title: language === 'hi' ? 'केंद्र अनुमोदन एवं निरीक्षण' : 'Site Approval & Inspection', 
      status: 'Approved', 
      desc: language === 'hi' ? '5 में से 4 केंद्रों के लिए GCP सुविधा निरीक्षण प्रमाणित।' : 'GCP facility inspection certified for 4 of 5 centers.' 
    },
    { 
      title: language === 'hi' ? 'त्वरित सुरक्षा रिपोर्टिंग' : 'Expedited Safety Reporting', 
      status: 'Approved', 
      desc: language === 'hi' ? 'CDSCO पोर्टल के साथ 24-घंटे की विधिक SAE रिपोर्टिंग प्रणाली सिंक्रनाइज़।' : '24-hour statutory SAE reporting mechanism synchronized with CDSCO portal.' 
    },
    { 
      title: language === 'hi' ? 'आवधिक सुरक्षा रिपोर्ट (PSUR)' : 'Periodic Safety Reports (PSUR)', 
      status: 'Pending', 
      desc: language === 'hi' ? 'छमाही प्रगति एवं वार्षिक नवीनीकरण संचिका संकलन।' : 'Six-monthly progress and annual renewal dossier compilation.' 
    }
  ];

  const approvedCount = tasks.filter(t => t.status === 'Approved').length + 5;
  const totalCount = tasks.length + 5;
  const compliancePercent = Math.round((approvedCount / totalCount) * 100);

  const complianceChartData = [
    { name: language === 'hi' ? 'अनुमोदित / अनुपालित' : 'Compliant / Approved', value: approvedCount, color: '#059669' },
    { name: language === 'hi' ? 'लंबित कार्रवाई' : 'Pending Action', value: tasks.filter(t => t.status === 'Pending').length, color: '#f59e0b' },
    { name: language === 'hi' ? 'अनुपस्थित / आवश्यक' : 'Missing / Required', value: tasks.filter(t => t.status === 'Missing').length, color: '#dc2626' }
  ];

  const handleUpdateStatus = async (task: RegulatoryTask, newStatus: EthicsStatus) => {
    const updated = { ...task, status: newStatus };
    await api.updateRegulatoryTask(updated, currentUser, userRole);
    triggerRefresh();
    showToast(language === 'hi' ? `कार्य स्थिति ${newStatus} में अपडेट की गई` : `Task updated to ${newStatus}`, 'success');
  };

  const statusBadge = (status: EthicsStatus) => {
    switch (status) {
      case 'Approved':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">{t('statusApproved')}</span>;
      case 'Pending':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">{t('statusPending')}</span>;
      case 'Expired':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">{language === 'hi' ? 'अवधि समाप्त' : 'Expired'}</span>;
      case 'Missing':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">{t('statusMissing')}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Breadcrumb & Header */}
      <div>
        <Breadcrumb currentTabKey="ethicsRegulatory" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileCheck2 className="w-6 h-6 text-emerald-600" />
              <span>{t('ethicsAndRegulatory')}</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('ethicsSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
              {t('scoreLabel')}: <strong>{compliancePercent}% {t('compliant')}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Top Compliance Score Card & Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Score Highlights (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t('nationalRegulatoryScore')}
              </span>
              <span className="text-xs font-bold text-emerald-600">NDCT 2019 / GCP Certified</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold font-serif text-slate-900 dark:text-white">
                {compliancePercent}%
              </span>
              <span className="text-xs text-slate-500">
                {language === 'hi' ? `${regulatoryAreas.length} मुख्य विधिक मापदंडों पर समग्र परीक्षण अनुपालन` : `Overall trial regulatory adherence across ${regulatoryAreas.length} core parameters`}
              </span>
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mt-3">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${compliancePercent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">{t('ctriRegistrations')}</span>
              <span className="font-bold text-emerald-600 mt-0.5 block">100% {language === 'hi' ? 'सक्रिय' : 'Active'}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">{t('iecApprovals')}</span>
              <span className="font-bold text-emerald-600 mt-0.5 block">4/5 {language === 'hi' ? 'केंद्र' : 'Sites'}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">{t('consentAudits')}</span>
              <span className="font-bold text-emerald-600 mt-0.5 block">{language === 'hi' ? 'सत्यापित' : 'Verified'}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">{t('pendingActions')}</span>
              <span className="font-bold text-amber-600 mt-0.5 block">{tasks.filter(t => t.status !== 'Approved').length} {language === 'hi' ? 'कार्य' : 'Tasks'}</span>
            </div>
          </div>
        </div>

        {/* Donut Chart (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm flex flex-col items-center justify-center">
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            {t('statusBreakdown')}
          </h3>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={complianceChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {complianceChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0.75rem', color: '#fff', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600"></span> {t('statusApproved')}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> {t('statusPending')}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-600"></span> {t('statusMissing')}</span>
          </div>
        </div>

      </div>

      {/* 8 Tracked Regulatory Areas Grid */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-serif mb-3">
          {t('statutoryRegulatoryAreas')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {regulatoryAreas.map((area, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{area.title}</span>
                  {statusBadge(area.status as EthicsStatus)}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {area.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory Task Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-serif">
              {t('regulatoryTaskLedger')}
            </h3>
            <p className="text-xs text-slate-500">{t('activeSubmissionsDesc')}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">{t('taskDescription')}</th>
                <th className="px-4 py-3.5">{t('trialId')}</th>
                <th className="px-4 py-3.5">{t('responsiblePerson')}</th>
                <th className="px-4 py-3.5">{t('dueDate')}</th>
                <th className="px-4 py-3.5">{t('currentStatus')}</th>
                <th className="px-4 py-3.5 text-right">{t('updateStatus')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-bold text-slate-900 dark:text-slate-100">{task.task}</p>
                    <span className="text-[10px] text-slate-400">{task.category}</span>
                  </td>
                  <td className="px-4 py-3.5 font-mono font-bold text-emerald-800 dark:text-emerald-300">
                    {task.trialId}
                  </td>
                  <td className="px-4 py-3.5 text-slate-700 dark:text-slate-300 font-medium">
                    {task.responsiblePerson}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px]">
                    {task.dueDate}
                  </td>
                  <td className="px-4 py-3.5">
                    {statusBadge(task.status)}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <select
                      value={task.status}
                      onChange={e => handleUpdateStatus(task, e.target.value as EthicsStatus)}
                      className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                    >
                      <option value="Approved">{t('statusApproved')}</option>
                      <option value="Pending">{t('statusPending')}</option>
                      <option value="Expired">{language === 'hi' ? 'अवधि समाप्त' : 'Expired'}</option>
                      <option value="Missing">{t('statusMissing')}</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

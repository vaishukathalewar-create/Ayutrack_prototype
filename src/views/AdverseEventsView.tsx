import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  AlertOctagon, 
  Plus, 
  Clock, 
  Download, 
  Search, 
  Filter, 
  CheckCircle2, 
  Eye, 
  Edit3, 
  X, 
  ShieldAlert, 
  BellRing,
  ExternalLink,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { api } from '../services/api';
import { AdverseEvent, Severity, Causality, Participant } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { getTranslatedStatus } from '../utils/i18n';

export const AdverseEventsView: React.FC = () => {
  const { showToast, refreshKey, triggerRefresh, t, language } = useApp();
  const { currentUser, userRole } = useAuth();

  const [adverseEvents, setAdverseEvents] = useState<AdverseEvent[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [seriousnessFilter, setSeriousnessFilter] = useState<string>('All');

  // Modals
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedAeForDetail, setSelectedAeForDetail] = useState<AdverseEvent | null>(null);
  const [editingAe, setEditingAe] = useState<AdverseEvent | null>(null);

  // Form State
  const [formParticipantId, setFormParticipantId] = useState('P-102');
  const [formTrialId, setFormTrialId] = useState('AYU-001');
  const [formDescription, setFormDescription] = useState('');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formSeverity, setFormSeverity] = useState<Severity>('Moderate');
  const [formIsSerious, setFormIsSerious] = useState<boolean>(false);
  const [formOutcome, setFormOutcome] = useState<'Recovered' | 'Recovering' | 'Not Recovered' | 'Fatal' | 'Unknown'>('Recovering');
  const [formActionTaken, setFormActionTaken] = useState<'Dose Interrupted' | 'Dose Reduced' | 'Drug Withdrawn' | 'Concomitant Therapy' | 'None'>('Dose Interrupted');
  const [formCausality, setFormCausality] = useState<Causality>('Probable/Likely');

  useEffect(() => {
    setAdverseEvents(storageService.getAdverseEvents());
    setParticipants(storageService.getParticipants());
  }, [refreshKey]);

  // Synchronize trial ID when participant changes
  const handleParticipantChange = (pid: string) => {
    setFormParticipantId(pid);
    const p = participants.find(item => item.id === pid);
    if (p) {
      setFormTrialId(p.trialId);
    }
  };

  const handleOpenReportModal = () => {
    setFormParticipantId(participants[0]?.id || 'P-101');
    setFormTrialId(participants[0]?.trialId || 'AYU-001');
    setFormDescription('');
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormSeverity('Moderate');
    setFormIsSerious(false);
    setFormOutcome('Recovering');
    setFormActionTaken('Dose Interrupted');
    setFormCausality('Probable/Likely');
    setIsReportModalOpen(true);
  };

  const handleSaveAe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDescription.trim()) {
      showToast(language === 'hi' ? 'कृपया प्रतिकूल घटना का नैदानिक विवरण दर्ज करें' : 'Please enter an adverse event clinical description', 'error');
      return;
    }

    const currentP = participants.find(p => p.id === formParticipantId);
    const newAe: AdverseEvent = {
      id: `AE-2025-${Math.floor(100 + Math.random() * 900)}`,
      participantId: formParticipantId,
      trialId: formTrialId,
      site: currentP?.site || 'AIIA New Delhi',
      eventDescription: formDescription,
      date: formDate,
      severity: formSeverity,
      isSerious: formIsSerious || formSeverity === 'Serious',
      outcome: formOutcome,
      actionTaken: formActionTaken,
      causality: formCausality,
      reportedBy: currentUser,
      reportedAt: new Date().toISOString(),
      countdownDeadline: formIsSerious || formSeverity === 'Serious'
        ? new Date(Date.now() + 24 * 3600 * 1000).toISOString()
        : undefined,
      notificationStatus: {
        ethicsCommittee: 'Notified',
        regulatoryAuthority: formIsSerious ? 'Pending' : 'Acknowledged',
        sponsor: 'Notified'
      }
    };

    await api.createAdverseEvent(newAe, currentUser, userRole);
    setIsReportModalOpen(false);
    triggerRefresh();

    if (newAe.isSerious) {
      showToast(language === 'hi' ? 'अति गंभीर: गंभीर प्रतिकूल घटना (SAE) दर्ज की गई। 24-घंटे की विधिक नियामक घड़ी सक्रिय।' : 'CRITICAL: Serious Adverse Event logged. 24-hr regulatory clock initiated.', 'error');
    } else {
      showToast(language === 'hi' ? 'प्रतिकूल घटना सुरक्षा डेटाबेस में सफलतापूर्वक दर्ज हुई।' : 'Adverse Event logged successfully in safety database.', 'success');
    }
  };

  // Simulate notification acknowledgement
  const handleSimulateNotification = (aeId: string, party: 'ethicsCommittee' | 'regulatoryAuthority' | 'sponsor') => {
    const list = storageService.getAdverseEvents();
    const idx = list.findIndex(a => a.id === aeId);
    if (idx !== -1) {
      list[idx].notificationStatus[party] = 'Acknowledged';
      storageService.saveAdverseEvents(list);
      triggerRefresh();
      showToast(`Simulated status: ${party} updated to Acknowledged`, 'success');
    }
  };

  // CSV Export
  const handleExportCsv = () => {
    const headers = ['AE_ID', 'Participant_ID', 'Trial_ID', 'Site', 'Event_Description', 'Date', 'Severity', 'Is_Serious', 'Outcome', 'Action_Taken', 'WHO_UMC_Causality', 'Reported_By'];
    const rows = adverseEvents.map(a => [
      a.id,
      a.participantId,
      a.trialId,
      `"${a.site}"`,
      `"${a.eventDescription.replace(/"/g, '""')}"`,
      a.date,
      a.severity,
      a.isSerious ? 'YES' : 'NO',
      a.outcome,
      a.actionTaken,
      a.causality,
      `"${a.reportedBy}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AyuTrack_Adverse_Events_Dossier_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported Adverse Events CSV dossier', 'success');
  };

  // Filtered list
  const filteredAes = adverseEvents.filter(ae => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      ae.id.toLowerCase().includes(q) ||
      ae.participantId.toLowerCase().includes(q) ||
      ae.trialId.toLowerCase().includes(q) ||
      ae.eventDescription.toLowerCase().includes(q) ||
      ae.site.toLowerCase().includes(q);

    const matchesSeverity = severityFilter === 'All' || ae.severity === severityFilter;
    const matchesSeriousness = 
      seriousnessFilter === 'All' ||
      (seriousnessFilter === 'Serious' && ae.isSerious) ||
      (seriousnessFilter === 'Non-Serious' && !ae.isSerious);

    return matchesSearch && matchesSeverity && matchesSeriousness;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div>
        <Breadcrumb currentTabKey="adverseEvents" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-rose-600" />
              <span>{t('adverseEventsTitle')}</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('adverseEventsSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>{t('exportCsv')}</span>
            </button>

            <button
              onClick={handleOpenReportModal}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-900/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{t('reportNewAe')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={language === 'hi' ? 'घटना आईडी, प्रतिभागी, औषधि, लक्षण खोजें...' : 'Search event ID, participant, drug, symptom...'}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold">{t('filter')}:</span>
            <select
              value={seriousnessFilter}
              onChange={e => setSeriousnessFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none"
            >
              <option value="All">{t('all')}</option>
              <option value="Serious">{language === 'hi' ? 'केवल गंभीर (SAE)' : 'Serious (SAE only)'}</option>
              <option value="Non-Serious">{language === 'hi' ? 'सामान्य (AE)' : 'Non-Serious (AE)'}</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold">{t('severityLabel')}:</span>
            <select
              value={severityFilter}
              onChange={e => setSeverityFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none"
            >
              <option value="All">{t('all')}</option>
              <option value="Mild">{t('statusMild')}</option>
              <option value="Moderate">{t('statusModerate')}</option>
              <option value="Severe">{t('statusSevere')}</option>
              <option value="Serious">{t('statusSerious')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Adverse Events Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">{t('participantId')}</th>
                <th className="px-4 py-3.5">{t('aeDescription')}</th>
                <th className="px-4 py-3.5">{t('severityLabel')}</th>
                <th className="px-4 py-3.5">{t('causalityLabel')}</th>
                <th className="px-4 py-3.5">{t('actionTaken')} & {t('outcomeLabel')}</th>
                <th className="px-4 py-3.5">{language === 'hi' ? 'नियामक सूचना स्थिति' : 'Regulatory Notification Status'}</th>
                <th className="px-4 py-3.5 text-right">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredAes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                    {t('noDataAvailable')}
                  </td>
                </tr>
              ) : (
                filteredAes.map((ae) => {
                  return (
                    <tr 
                      key={ae.id}
                      className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors ${
                        ae.isSerious ? 'bg-rose-50/20 dark:bg-rose-950/10' : ''
                      }`}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900">
                            {ae.id}
                          </span>
                        </div>
                        <div className="text-[11px] font-semibold text-slate-900 dark:text-slate-100 mt-1">
                          {language === 'hi' ? 'प्रतिभागी' : 'Subject'}: <span className="font-mono">{ae.participantId}</span> ({ae.trialId})
                        </div>
                        <span className="text-[10px] text-slate-400 block">{ae.date}</span>
                      </td>

                      <td className="px-4 py-3.5 max-w-xs">
                        <p className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
                          {ae.eventDescription}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{ae.site}</p>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              ae.severity === 'Severe' || ae.severity === 'Serious'
                                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                                : ae.severity === 'Moderate'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            }`}
                          >
                            {getTranslatedStatus(ae.severity, language)}
                          </span>

                          {ae.isSerious && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-rose-600 text-white uppercase animate-pulse">
                              <AlertOctagon className="w-2.5 h-2.5" />
                              {language === 'hi' ? 'गंभीर' : 'SAE'}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {ae.causality}
                        </span>
                        <span className="text-[10px] text-slate-400 block">{language === 'hi' ? 'WHO-UMC मापदंड' : 'WHO-UMC Criteria'}</span>
                      </td>

                      <td className="px-4 py-3.5">
                        <p className="font-medium text-slate-800 dark:text-slate-200">{ae.actionTaken}</p>
                        <span className="text-[10px] text-emerald-600 font-semibold block">{getTranslatedStatus(ae.outcome, language)}</span>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex flex-col gap-1 text-[10px]">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-slate-400">{language === 'hi' ? 'नैतिकता समिति:' : 'Ethics Committee:'}</span>
                            <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                              {language === 'hi' && ae.notificationStatus.ethicsCommittee === 'Notified' ? 'अधिसूचित' : ae.notificationStatus.ethicsCommittee}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <span className="text-slate-400">{language === 'hi' ? 'नियामक (CDSCO):' : 'Regulatory (CDSCO):'}</span>
                            <span
                              onClick={() => handleSimulateNotification(ae.id, 'regulatoryAuthority')}
                              className={`px-1.5 py-0.2 rounded font-bold cursor-pointer transition-colors ${
                                ae.notificationStatus.regulatoryAuthority === 'Pending'
                                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}
                              title={language === 'hi' ? 'स्वीकृति का अनुकरण करने हेतु क्लिक करें' : 'Click to simulate acknowledgement'}
                            >
                              {language === 'hi' && ae.notificationStatus.regulatoryAuthority === 'Pending' ? 'लंबित' : ae.notificationStatus.regulatoryAuthority === 'Acknowledged' && language === 'hi' ? 'स्वीकृत' : ae.notificationStatus.regulatoryAuthority}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <span className="text-slate-400">{language === 'hi' ? 'प्रायोजक / AIIA:' : 'Sponsor / AIIA:'}</span>
                            <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                              {language === 'hi' && ae.notificationStatus.sponsor === 'Notified' ? 'अधिसूचित' : ae.notificationStatus.sponsor}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => setSelectedAeForDetail(ae)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title={t('viewDossier')}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Adverse Event Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-serif flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>{t('reportNewAe')}</span>
              </h3>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAe} className="space-y-4 mt-4 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('participantId')} *
                  </label>
                  <select
                    value={formParticipantId}
                    onChange={e => handleParticipantChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold"
                  >
                    {participants.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.id} ({p.trialId} • {p.site})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('trialFilter')}
                  </label>
                  <input
                    type="text"
                    value={formTrialId}
                    readOnly
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('aeDescription')} *
                </label>
                <textarea
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder={language === 'hi' ? 'उदा. दोनों हाथों एवं शरीर पर लाल चकत्ते, चेहरे पर मध्यम खुजली...' : 'e.g. Acute maculopapular rash on bilateral arms and trunk with moderate facial pruritus...'}
                  rows={3}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('eventDate')} *
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={e => setFormDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('severityLabel')} *
                  </label>
                  <select
                    value={formSeverity}
                    onChange={e => setFormSeverity(e.target.value as Severity)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium"
                  >
                    <option value="Mild">{t('statusMild')}</option>
                    <option value="Moderate">{t('statusModerate')}</option>
                    <option value="Severe">{t('statusSevere')}</option>
                    <option value="Serious">{t('statusSerious')}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('causalityLabel')} *
                  </label>
                  <select
                    value={formCausality}
                    onChange={e => setFormCausality(e.target.value as Causality)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Certain">{t('certainCausality')}</option>
                    <option value="Probable/Likely">{t('probableCausality')}</option>
                    <option value="Possible">{t('possibleCausality')}</option>
                    <option value="Unlikely">{t('unlikelyCausality')}</option>
                    <option value="Conditional/Unclassified">{t('conditionalCausality')}</option>
                    <option value="Unassessable/Unclassifiable">{t('unassessableCausality')}</option>
                  </select>
                </div>
              </div>

              {/* Seriousness Checkbox & Prompt Banner */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsSerious || formSeverity === 'Serious' || formSeverity === 'Severe'}
                    onChange={e => setFormIsSerious(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {t('isSeriousQuestion')}
                    </span>
                    <p className="text-[11px] text-slate-500">
                      {t('seriousNotice')}
                    </p>
                  </div>
                </label>

                {(formIsSerious || formSeverity === 'Serious' || formSeverity === 'Severe') && (
                  <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-[11px] space-y-1 animate-in fade-in">
                    <p className="font-bold flex items-center gap-1.5">
                      <AlertOctagon className="w-4 h-4 text-rose-600" />
                      <span>{t('regulatoryNoticeClock')}</span>
                    </p>
                    <p>
                      {language === 'hi' ? 'NDCT नियम 2019 के अंतर्गत, यह रिपोर्ट स्वचालित रूप से संस्थागत नैतिकता समिति, केंद्रीय लाइसेंसिंग प्राधिकरण (CDSCO) एवं परीक्षण प्रायोजक को त्वरित सूचना पंक्ति में जोड़ देगी।' : 'Under NDCT Rules 2019, this report will automatically queue expedited notifications to the Institutional Ethics Committee, Central Licensing Authority (CDSCO), and Trial Sponsor.'}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('actionTaken')}
                  </label>
                  <select
                    value={formActionTaken}
                    onChange={e => setFormActionTaken(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Dose Interrupted">{language === 'hi' ? 'खुराक अस्थायी रूप से रोकी गई' : 'Dose Interrupted'}</option>
                    <option value="Dose Reduced">{language === 'hi' ? 'खुराक घटाई गई' : 'Dose Reduced'}</option>
                    <option value="Drug Withdrawn">{language === 'hi' ? 'औषधि बंद की गई' : 'Drug Withdrawn'}</option>
                    <option value="Concomitant Therapy">{language === 'hi' ? 'सहवर्ती चिकित्सा प्रारंभ' : 'Concomitant Therapy Added'}</option>
                    <option value="None">{language === 'hi' ? 'कोई परिवर्तन नहीं' : 'None'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('outcomeLabel')}
                  </label>
                  <select
                    value={formOutcome}
                    onChange={e => setFormOutcome(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Recovering">{t('statusRecovering')}</option>
                    <option value="Recovered">{t('statusRecovered')}</option>
                    <option value="Not Recovered">{t('statusNotRecovered')}</option>
                    <option value="Unknown">{t('statusUnknown')}</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-900/20"
                >
                  {language === 'hi' ? 'दर्ज करें एवं नियामक सूचना भेजें' : 'Log & Dispatch Regulatory Event'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* AE Detail Modal */}
      {selectedAeForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
                  {selectedAeForDetail.id}
                </span>
                {selectedAeForDetail.isSerious && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-extrabold uppercase bg-rose-600 text-white">
                    {language === 'hi' ? 'गंभीर प्रतिकूल घटना (SAE)' : 'SERIOUS ADVERSE EVENT'}
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedAeForDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {selectedAeForDetail.eventDescription}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {t('participantId')}: <strong className="text-slate-800 dark:text-slate-200">{selectedAeForDetail.participantId}</strong> • {t('trialFilter')}: <strong className="text-slate-800 dark:text-slate-200">{selectedAeForDetail.trialId}</strong> • {t('sites')}: {selectedAeForDetail.site}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-[10px] uppercase font-bold text-slate-400">{t('severityLabel')}</span>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{getTranslatedStatus(selectedAeForDetail.severity, language)}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-[10px] uppercase font-bold text-slate-400">{t('causalityLabel')}</span>
                <p className="font-bold text-emerald-800 dark:text-emerald-300 mt-0.5">{selectedAeForDetail.causality}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-[10px] uppercase font-bold text-slate-400">{t('outcomeLabel')}</span>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{getTranslatedStatus(selectedAeForDetail.outcome, language)}</p>
              </div>
            </div>

            {/* Notification Simulation Status Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
                {language === 'hi' ? 'भारतीय नियामक सूचना दस्तावेज़ (सिमुलेटेड)' : 'Indian Regulatory Notification Dossier (Simulated)'}
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{language === 'hi' ? 'नैतिकता समिति' : 'Ethics Committee'}</span>
                  <span className="font-bold text-emerald-600">{selectedAeForDetail.notificationStatus.ethicsCommittee}</span>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{language === 'hi' ? 'CDSCO प्राधिकरण' : 'CDSCO Authority'}</span>
                  <span className="font-bold text-amber-600">{selectedAeForDetail.notificationStatus.regulatoryAuthority}</span>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{language === 'hi' ? 'प्रायोजक / AIIA' : 'Sponsor / AIIA'}</span>
                  <span className="font-bold text-emerald-600">{selectedAeForDetail.notificationStatus.sponsor}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedAeForDetail(null)}
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

import React, { useState, useEffect } from 'react';
import { 
  FlaskConical, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit3, 
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { api } from '../services/api';
import { ClinicalTrial, TrialPhase, TrialStatus, AyurvedicFormulation, EthicsStatus } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const TrialsView: React.FC = () => {
  const { showToast, refreshKey, triggerRefresh, t, language } = useApp();
  const { currentUser, userRole } = useAuth();

  const [trials, setTrials] = useState<ClinicalTrial[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedPhase, setSelectedPhase] = useState<string>('All');

  // Modals
  const [selectedTrialForDetail, setSelectedTrialForDetail] = useState<ClinicalTrial | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTrial, setEditingTrial] = useState<ClinicalTrial | null>(null);

  // New trial form state
  const [formData, setFormData] = useState<Partial<ClinicalTrial>>({
    id: `AYU-00${trials.length + 5}`,
    title: '',
    shortTitle: '',
    phase: 'Phase II',
    studyType: 'Interventional Randomized Controlled Trial',
    formulation: 'Vati',
    formulationName: '',
    indication: '',
    pi: 'Prof. (Dr.) Tanuja Nesari',
    sponsor: 'All India Institute of Ayurveda (AIIA)',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '2027-03-31',
    targetParticipants: 100,
    enrolledParticipants: 0,
    participatingSites: ['AIIA New Delhi'],
    ethicsStatus: 'Approved',
    ctriNumber: 'CTRI/2026/01/095112',
    ndctComplianceStatus: 'Compliant',
    status: 'Recruiting',
    namasteCode: 'NAM-GEN-2025-01',
    summary: ''
  });

  useEffect(() => {
    setTrials(storageService.getTrials());
  }, [refreshKey]);

  // Filters
  const filteredTrials = trials.filter((trial) => {
    const matchesSearch = 
      trial.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trial.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trial.indication.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trial.pi.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || trial.status === selectedStatus;
    const matchesPhase = selectedPhase === 'All' || trial.phase === selectedPhase;

    return matchesSearch && matchesStatus && matchesPhase;
  });

  const handleOpenAdd = () => {
    setFormData({
      id: `AYU-00${trials.length + 1}`,
      title: '',
      shortTitle: '',
      phase: 'Phase II',
      studyType: 'Interventional Randomized Controlled Trial',
      formulation: 'Vati',
      formulationName: '',
      indication: '',
      pi: 'Prof. (Dr.) Tanuja Nesari',
      sponsor: 'All India Institute of Ayurveda (AIIA) / Ministry of Ayush',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2027-03-31',
      targetParticipants: 100,
      enrolledParticipants: 0,
      participatingSites: ['AIIA New Delhi'],
      ethicsStatus: 'Approved',
      ctriNumber: `CTRI/2026/0${trials.length + 1}/09${Math.floor(1000 + Math.random() * 9000)}`,
      ndctComplianceStatus: 'Compliant',
      status: 'Recruiting',
      namasteCode: `NAM-AYU-2026-${Math.floor(10 + Math.random() * 90)}`,
      summary: ''
    });
    setIsAddModalOpen(true);
  };

  const handleSaveNewTrial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.shortTitle || !formData.indication) {
      showToast(t('fillAllRequiredFields'), 'error');
      return;
    }

    const newTrial = formData as ClinicalTrial;
    await api.createTrial(newTrial, currentUser, userRole);
    setIsAddModalOpen(false);
    triggerRefresh();
    showToast(`${t('trials')} ${newTrial.id} ${t('successfullySaved')}`, 'success');
  };

  const handleOpenEdit = (trial: ClinicalTrial) => {
    setEditingTrial({ ...trial });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrial) return;

    await api.updateTrial(editingTrial, currentUser, userRole);
    setIsEditModalOpen(false);
    triggerRefresh();
    showToast(`${editingTrial.id} ${t('successfullySaved')}`, 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Breadcrumb & Actions */}
      <div>
        <Breadcrumb currentTabKey="trials" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FlaskConical className="w-6 h-6 text-emerald-600" />
              <span>{t('clinicalTrialManagementTitle')}</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('clinicalTrialManagementSubtitle')}
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addNewTrial')}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('searchTrialsPlaceholder')}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Filters: Status & Phase */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold">{t('status')}:</span>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none"
            >
              <option value="All">{t('all')}</option>
              <option value="Recruiting">{t('recruiting')}</option>
              <option value="Active">{t('active')}</option>
              <option value="Paused">{t('paused')}</option>
              <option value="Completed">{t('completed')}</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold">{t('phase')}:</span>
            <select
              value={selectedPhase}
              onChange={e => setSelectedPhase(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none"
            >
              <option value="All">{t('all')}</option>
              <option value="Phase I">Phase I</option>
              <option value="Phase II">Phase II</option>
              <option value="Phase III">Phase III</option>
              <option value="Phase IV">Phase IV</option>
              <option value="Observational">Observational</option>
            </select>
          </div>
        </div>

      </div>

      {/* Trials Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">{t('trialId')} & {t('trialDetails')}</th>
                <th className="px-4 py-3.5">{t('phase')} & {t('studyType')}</th>
                <th className="px-4 py-3.5">{t('ayurvedicIntervention')}</th>
                <th className="px-4 py-3.5">{t('principalInvestigator')} / {t('sponsor')}</th>
                <th className="px-4 py-3.5">{t('recruitment')}</th>
                <th className="px-4 py-3.5">{t('status')}</th>
                <th className="px-4 py-3.5 text-right">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredTrials.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                    {t('noDataAvailable')}
                  </td>
                </tr>
              ) : (
                filteredTrials.map((trial) => {
                  const progress = Math.round((trial.enrolledParticipants / trial.targetParticipants) * 100);
                  const isRecruiting = trial.status === 'Recruiting';
                  const isActive = trial.status === 'Active';

                  return (
                    <tr 
                      key={trial.id} 
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                            {trial.id}
                          </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-1 max-w-xs">
                            {trial.shortTitle}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 max-w-xs">
                          {trial.indication}
                        </p>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {trial.phase}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                          {trial.studyType}
                        </p>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">
                            {trial.formulation}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {trial.formulationName}
                        </p>
                      </td>

                      <td className="px-4 py-3.5">
                        <p className="font-medium text-slate-900 dark:text-slate-200">{trial.pi}</p>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{trial.sponsor}</p>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-emerald-600 h-full rounded-full" 
                              style={{ width: `${progress}%` }} 
                            />
                          </div>
                          <span className="font-bold text-[11px]">
                            {trial.enrolledParticipants}/{trial.targetParticipants}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{progress}% {t('enrolled')}</span>
                      </td>

                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isRecruiting
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/40'
                              : isActive
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300/40'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300/40'
                          }`}
                        >
                          {trial.status === 'Recruiting' ? t('recruiting') : trial.status === 'Active' ? t('active') : trial.status === 'Completed' ? t('completed') : t('paused')}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setSelectedTrialForDetail(trial)}
                            className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title={t('viewDetails')}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(trial)}
                            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title={t('edit')}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trial Detail Modal */}
      {selectedTrialForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {selectedTrialForDetail.id}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {selectedTrialForDetail.phase}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  {selectedTrialForDetail.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedTrialForDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-serif">
                {selectedTrialForDetail.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {selectedTrialForDetail.summary}
              </p>
            </div>

            {/* Trial Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400">{t('ayurvedicIntervention')}</span>
                <p className="font-bold text-emerald-800 dark:text-emerald-300 mt-0.5">
                  {selectedTrialForDetail.formulation} — {selectedTrialForDetail.formulationName}
                </p>
                <span className="text-[10px] text-slate-500">{t('namasteCode')}: {selectedTrialForDetail.namasteCode}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400">{language === 'hi' ? 'रोग संकेत:' : 'Target Indication'}</span>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  {selectedTrialForDetail.indication}
                </p>
                <span className="text-[10px] text-slate-500">{t('studyType')}: {selectedTrialForDetail.studyType}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400">{t('principalInvestigator')}</span>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  {selectedTrialForDetail.pi}
                </p>
                <span className="text-[10px] text-slate-500">{t('sponsor')}: {selectedTrialForDetail.sponsor}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400">{t('ctriNumber')}</span>
                <p className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  {selectedTrialForDetail.ctriNumber}
                </p>
                <span className="text-[10px] text-emerald-600 font-semibold">{t('ndctStatus')}: {selectedTrialForDetail.ndctComplianceStatus}</span>
              </div>
            </div>

            {/* Sites list */}
            <div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('participatingSitesLabel')} ({selectedTrialForDetail.participatingSites.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedTrialForDetail.participatingSites.map((site, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium">
                    {site}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setSelectedTrialForDetail(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Trial Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-serif flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                <span>{t('addNewTrial')}</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewTrial} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('trialId')}
                  </label>
                  <input
                    type="text"
                    value={formData.id}
                    onChange={e => setFormData({ ...formData, id: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('phase')}
                  </label>
                  <select
                    value={formData.phase}
                    onChange={e => setFormData({ ...formData, phase: e.target.value as TrialPhase })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Phase I">Phase I</option>
                    <option value="Phase II">Phase II</option>
                    <option value="Phase III">Phase III</option>
                    <option value="Phase IV">Phase IV</option>
                    <option value="Observational">Observational</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'पूर्ण परीक्षण शीर्षक' : 'Full Trial Title'}
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Randomized Clinical Evaluation of Standardized Rasayana"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'संक्षिप्त शीर्षक' : 'Short Title'}
                  </label>
                  <input
                    type="text"
                    value={formData.shortTitle}
                    onChange={e => setFormData({ ...formData, shortTitle: e.target.value })}
                    placeholder="e.g. Rasayana Diabetes Study"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'रोग संकेत (Indication)' : 'Indication'}
                  </label>
                  <input
                    type="text"
                    value={formData.indication}
                    onChange={e => setFormData({ ...formData, indication: e.target.value })}
                    placeholder="e.g. Prameha / Type 2 Diabetes"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('formulationType')}
                  </label>
                  <select
                    value={formData.formulation}
                    onChange={e => setFormData({ ...formData, formulation: e.target.value as AyurvedicFormulation })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Vati">Vati</option>
                    <option value="Churna">Churna</option>
                    <option value="Kwatha">Kwatha</option>
                    <option value="Ghrita">Ghrita</option>
                    <option value="Taila">Taila</option>
                    <option value="Asava">Asava</option>
                    <option value="Arishta">Arishta</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('formulationName')}
                  </label>
                  <input
                    type="text"
                    value={formData.formulationName}
                    onChange={e => setFormData({ ...formData, formulationName: e.target.value })}
                    placeholder="e.g. Nishamalaki Vati (500mg)"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('target')} {t('participants')}
                  </label>
                  <input
                    type="number"
                    value={formData.targetParticipants}
                    onChange={e => setFormData({ ...formData, targetParticipants: parseInt(e.target.value) || 0 })}
                    min={10}
                    max={2000}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('ctriNumber')}
                  </label>
                  <input
                    type="text"
                    value={formData.ctriNumber}
                    onChange={e => setFormData({ ...formData, ctriNumber: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('namasteCode')}
                  </label>
                  <input
                    type="text"
                    value={formData.namasteCode}
                    onChange={e => setFormData({ ...formData, namasteCode: e.target.value })}
                    placeholder="NAM-CODE-2025"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/20"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Trial Modal */}
      {isEditModalOpen && editingTrial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-serif flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-600" />
                <span>{t('edit')} {editingTrial.id}</span>
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'संक्षिप्त शीर्षक' : 'Short Title'}
                </label>
                <input
                  type="text"
                  value={editingTrial.shortTitle}
                  onChange={e => setEditingTrial({ ...editingTrial, shortTitle: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('status')}
                  </label>
                  <select
                    value={editingTrial.status}
                    onChange={e => setEditingTrial({ ...editingTrial, status: e.target.value as TrialStatus })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Recruiting">{t('recruiting')}</option>
                    <option value="Active">{t('active')}</option>
                    <option value="Paused">{t('paused')}</option>
                    <option value="Completed">{t('completed')}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('target')} {t('participants')}
                  </label>
                  <input
                    type="number"
                    value={editingTrial.targetParticipants}
                    onChange={e => setEditingTrial({ ...editingTrial, targetParticipants: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('ethicsStatusLabel')}
                  </label>
                  <select
                    value={editingTrial.ethicsStatus}
                    onChange={e => setEditingTrial({ ...editingTrial, ethicsStatus: e.target.value as EthicsStatus })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Approved">{t('statusApproved')}</option>
                    <option value="Pending">{t('statusPending')}</option>
                    <option value="Expired">{t('statusExpired')}</option>
                    <option value="Missing">{t('statusMissing')}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('ndctStatus')}
                  </label>
                  <select
                    value={editingTrial.ndctComplianceStatus}
                    onChange={e => setEditingTrial({ ...editingTrial, ndctComplianceStatus: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Compliant">Compliant</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Document Required">Document Required</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white"
                >
                  {t('saveChanges')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

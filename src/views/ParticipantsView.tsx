import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Eye, 
  Activity, 
  Heart, 
  Thermometer, 
  Weight, 
  FlaskConical, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  X,
  FileCheck,
  AlertTriangle,
  UserPlus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { api } from '../services/api';
import { Participant, Prakriti } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { getTranslatedStatus } from '../utils/i18n';

export const ParticipantsView: React.FC = () => {
  const { showToast, refreshKey, triggerRefresh, setActiveTab, t, language } = useApp();
  const { currentUser, userRole } = useAuth();

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrakriti, setSelectedPrakriti] = useState<string>('All');
  const [selectedTrial, setSelectedTrial] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortField, setSortField] = useState<'id' | 'age' | 'enrollmentDate'>('id');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Participant detail modal
  const [activeParticipant, setActiveParticipant] = useState<Participant | null>(null);

  // New participant enrollment modal
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [newParticipant, setNewParticipant] = useState<Partial<Participant>>({
    id: `P-${100 + participants.length + 1}`,
    trialId: 'AYU-001',
    site: 'AIIA New Delhi',
    age: 45,
    gender: 'Male',
    prakriti: 'Vata-Pitta',
    dosha: 'Pitta Dominant with mild Vata Ksobha',
    enrollmentDate: new Date().toISOString().split('T')[0],
    currentVisit: 'Baseline',
    treatmentGroup: 'Active Herbal Arm',
    status: 'Enrolled',
    vitals: {
      systolicBp: 120,
      diastolicBp: 80,
      pulseRate: 72,
      temperatureF: 98.6,
      weightKg: 65
    },
    laboratory: {
      fastingSugarMgDl: 100,
      hba1c: 5.9,
      creatinineMgDl: 0.9,
      sgotUPerL: 22,
      sgptUPerL: 25
    },
    eCrfStatus: 'Draft',
    recentFormulation: 'Guduchi-Katuki Compound Vati',
    visitTimeline: [
      { visitName: 'Baseline Screening', date: new Date().toISOString().split('T')[0], completed: true, notes: 'Consent signed.' }
    ]
  });

  useEffect(() => {
    setParticipants(storageService.getParticipants());
  }, [refreshKey]);

  // Filtering & Sorting
  const filteredParticipants = participants
    .filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        p.id.toLowerCase().includes(q) ||
        p.trialId.toLowerCase().includes(q) ||
        p.site.toLowerCase().includes(q) ||
        p.prakriti.toLowerCase().includes(q);

      const matchesPrakriti = selectedPrakriti === 'All' || p.prakriti === selectedPrakriti;
      const matchesTrial = selectedTrial === 'All' || p.trialId === selectedTrial;
      const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;

      return matchesSearch && matchesPrakriti && matchesTrial && matchesStatus;
    })
    .sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];
      if (sortAsc) return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });

  const handleEnrollParticipant = async (e: React.FormEvent) => {
    e.preventDefault();
    const enrolled = newParticipant as Participant;
    await api.createParticipant(enrolled, currentUser, userRole);
    setIsEnrollModalOpen(false);
    triggerRefresh();
    showToast(`Participant ${enrolled.id} enrolled successfully into ${enrolled.trialId}`, 'success');
  };

  const prakritiColor = (prakriti: Prakriti) => {
    switch (prakriti) {
      case 'Vata':
        return 'bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Pitta':
        return 'bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'Kapha':
        return 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      default:
        return 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Breadcrumb & Header */}
      <div>
        <Breadcrumb currentTabKey="participants" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Users className="w-6 h-6 text-emerald-600" />
              <span>{t('participantManagement')}</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('participantManagementDesc')}
            </p>
          </div>

          <button
            onClick={() => setIsEnrollModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>{t('enrollParticipant')}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('searchParticipantPlaceholder')}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Filters: Prakriti, Trial, Status */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold">{t('prakritiFilter')}:</span>
            <select
              value={selectedPrakriti}
              onChange={e => setSelectedPrakriti(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none"
            >
              <option value="All">{t('all')}</option>
              <option value="Vata">Vata</option>
              <option value="Pitta">Pitta</option>
              <option value="Kapha">Kapha</option>
              <option value="Vata-Pitta">Vata-Pitta</option>
              <option value="Pitta-Kapha">Pitta-Kapha</option>
              <option value="Vata-Kapha">Vata-Kapha</option>
              <option value="Tridosha">Tridosha</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold">{t('trialFilter')}:</span>
            <select
              value={selectedTrial}
              onChange={e => setSelectedTrial(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none"
            >
              <option value="All">{t('all')}</option>
              <option value="AYU-001">AYU-001</option>
              <option value="AYU-002">AYU-002</option>
              <option value="AYU-003">AYU-003</option>
              <option value="AYU-004">AYU-004</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold">{t('statusFilter')}:</span>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none"
            >
              <option value="All">{t('all')}</option>
              <option value="Enrolled">{t('statusEnrolled')}</option>
              <option value="In Follow-up">{t('statusInFollowup')}</option>
              <option value="Completed">{t('statusCompleted')}</option>
              <option value="Withdrawn">{t('statusWithdrawn')}</option>
            </select>
          </div>
        </div>

      </div>

      {/* Participants Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5 cursor-pointer" onClick={() => { setSortField('id'); setSortAsc(!sortAsc); }}>
                  <div className="flex items-center gap-1">
                    <span>{t('participantId')}</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3.5">{t('trialFilter')} & {t('sites')}</th>
                <th className="px-4 py-3.5 cursor-pointer" onClick={() => { setSortField('age'); setSortAsc(!sortAsc); }}>
                  <div className="flex items-center gap-1">
                    <span>{t('demographics')}</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3.5">{t('ayurvedaPrakritiDosha')}</th>
                <th className="px-4 py-3.5">{t('currentVisitGroup')}</th>
                <th className="px-4 py-3.5">{t('vitalsBpPulse')}</th>
                <th className="px-4 py-3.5">{t('status')}</th>
                <th className="px-4 py-3.5 text-right">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredParticipants.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-slate-400">
                    {t('noDataAvailable')}
                  </td>
                </tr>
              ) : (
                filteredParticipants.map((p) => {
                  return (
                    <tr 
                      key={p.id} 
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                            {p.id}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">
                          {t('recruitment')}: {p.enrollmentDate}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="font-bold text-slate-900 dark:text-slate-100">{p.trialId}</span>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{p.site}</p>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="font-semibold text-slate-900 dark:text-slate-200">{p.gender === 'Male' ? t('male') : p.gender === 'Female' ? t('female') : t('other')}, {p.age} {language === 'hi' ? 'वर्ष' : 'y'}</span>
                        <p className="text-[10px] text-slate-400">{p.treatmentGroup}</p>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${prakritiColor(p.prakriti)}`}>
                          {p.prakriti}
                        </span>
                        <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{p.dosha}</p>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{p.currentVisit}</span>
                        <span className="text-[10px] text-emerald-600 block font-medium">eCRF: {p.eCrfStatus}</span>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200">
                          {p.vitals.systolicBp}/{p.vitals.diastolicBp} mmHg
                        </div>
                        <span className="text-[10px] text-slate-400">{p.vitals.pulseRate} bpm</span>
                      </td>

                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            p.status === 'Enrolled'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : p.status === 'In Follow-up'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {getTranslatedStatus(p.status, language)}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => setActiveParticipant(p)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 font-semibold flex items-center gap-1 text-[11px] ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{t('viewDetails')}</span>
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

      {/* Participant Detail Drawer / Modal */}
      {activeParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-sm font-bold px-2.5 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                  {activeParticipant.id}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {activeParticipant.gender === 'Male' ? t('male') : activeParticipant.gender === 'Female' ? t('female') : t('other')}, {activeParticipant.age} {language === 'hi' ? 'वर्ष' : 'Years'}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {getTranslatedStatus(activeParticipant.status, language)}
                </span>
              </div>
              <button
                onClick={() => setActiveParticipant(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Trial & Site Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400">{t('trialFilter')} & {t('treatmentArm')}</span>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{activeParticipant.trialId}</p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400">{activeParticipant.treatmentGroup}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400">{t('sites')}</span>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{activeParticipant.site}</p>
                <p className="text-[11px] text-slate-500">{t('recruitment')}: {activeParticipant.enrollmentDate}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400">{t('ayurvedicIntervention')}</span>
                <p className="font-bold text-emerald-800 dark:text-emerald-300 mt-0.5 line-clamp-1">{activeParticipant.recentFormulation}</p>
                <p className="text-[11px] text-slate-500">eCRF: {activeParticipant.eCrfStatus}</p>
              </div>
            </div>

            {/* Prakriti & Dosha Breakdown */}
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  {t('ayurvedaPrakritiDosha')}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${prakritiColor(activeParticipant.prakriti)}`}>
                  {activeParticipant.prakriti}
                </span>
              </div>
              <p className="text-xs text-amber-950 dark:text-amber-100 font-medium">
                {language === 'hi' ? 'नैदानिक दोष मूल्यांकन: ' : 'Clinical Dosha Assessment: '}
                <span className="font-normal text-slate-700 dark:text-slate-300">{activeParticipant.dosha}</span>
              </p>
            </div>

            {/* Vital Signs Grid */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('vitalSignsAssessment')}</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">{t('systolicBp')}</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {activeParticipant.vitals.systolicBp}/{activeParticipant.vitals.diastolicBp}
                  </span>
                  <span className="text-[9px] text-slate-400 block">mmHg</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">{t('pulseRate')}</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{activeParticipant.vitals.pulseRate}</span>
                  <span className="text-[9px] text-slate-400 block">bpm</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">{t('temperature')}</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{activeParticipant.vitals.temperatureF}</span>
                  <span className="text-[9px] text-slate-400 block">°F</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">{t('weight')}</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{activeParticipant.vitals.weightKg}</span>
                  <span className="text-[9px] text-slate-400 block">kg</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">{t('fastingSugar')}</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{activeParticipant.laboratory.fastingSugarMgDl}</span>
                  <span className="text-[9px] text-slate-400 block">mg/dL</span>
                </div>
              </div>
            </div>

            {/* Visit Timeline */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span>{t('visitTimeline')}</span>
              </h4>
              <div className="space-y-2">
                {activeParticipant.visitTimeline.map((v, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 text-xs">
                    {v.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 dark:text-slate-200">{v.visitName}</span>
                        <span className="text-[10px] text-slate-400">{v.date}</span>
                      </div>
                      {v.notes && <p className="text-[11px] text-slate-500 mt-0.5">{v.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setActiveParticipant(null);
                  setActiveTab('ecrf');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors flex items-center gap-1.5"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? `${activeParticipant.id} के लिए डिजिटल ई-सीआरएफ खोलें` : `Open Digital eCRF for ${activeParticipant.id}`}</span>
              </button>

              <button
                onClick={() => setActiveParticipant(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {t('close')}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Enroll Participant Modal */}
      {isEnrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-serif flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                <span>{t('enrollParticipant')}</span>
              </h3>
              <button
                onClick={() => setIsEnrollModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEnrollParticipant} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('participantId')}
                  </label>
                  <input
                    type="text"
                    value={newParticipant.id}
                    onChange={e => setNewParticipant({ ...newParticipant, id: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('trials')}
                  </label>
                  <select
                    value={newParticipant.trialId}
                    onChange={e => setNewParticipant({ ...newParticipant, trialId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="AYU-001">AYU-001 (Metabolic Syndrome)</option>
                    <option value="AYU-002">AYU-002 (Osteoarthritis)</option>
                    <option value="AYU-003">AYU-003 (Cognitive Health)</option>
                    <option value="AYU-004">AYU-004 (Dermatology)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('age')}
                  </label>
                  <input
                    type="number"
                    value={newParticipant.age}
                    onChange={e => setNewParticipant({ ...newParticipant, age: parseInt(e.target.value) || 18 })}
                    min={18}
                    max={95}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('gender')}
                  </label>
                  <select
                    value={newParticipant.gender}
                    onChange={e => setNewParticipant({ ...newParticipant, gender: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Male">{t('male')}</option>
                    <option value="Female">{t('female')}</option>
                    <option value="Other">{t('other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('prakritiFilter')}
                  </label>
                  <select
                    value={newParticipant.prakriti}
                    onChange={e => setNewParticipant({ ...newParticipant, prakriti: e.target.value as Prakriti })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Vata">Vata</option>
                    <option value="Pitta">Pitta</option>
                    <option value="Kapha">Kapha</option>
                    <option value="Vata-Pitta">Vata-Pitta</option>
                    <option value="Pitta-Kapha">Pitta-Kapha</option>
                    <option value="Vata-Kapha">Vata-Kapha</option>
                    <option value="Tridosha">Tridosha</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'दोष मूल्यांकन विवरण' : 'Dosha Assessment Notes'}
                </label>
                <input
                  type="text"
                  value={newParticipant.dosha}
                  onChange={e => setNewParticipant({ ...newParticipant, dosha: e.target.value })}
                  placeholder={language === 'hi' ? 'उदा. पित्त-कफ प्रकोप के साथ साम लक्षण' : 'e.g. Pitta-Kapha aggravation with Sama Lakshan'}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('sites')}
                  </label>
                  <select
                    value={newParticipant.site}
                    onChange={e => setNewParticipant({ ...newParticipant, site: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="AIIA New Delhi">AIIA New Delhi</option>
                    <option value="Site A (IPGTRA Jamnagar)">Site A (IPGTRA Jamnagar)</option>
                    <option value="Site B (NIA Jaipur)">Site B (NIA Jaipur)</option>
                    <option value="Site C (Podar Mumbai)">Site C (Podar Mumbai)</option>
                    <option value="Site D (Govt Ayurveda College Kerala)">Site D (Kerala)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('treatmentArm')}
                  </label>
                  <select
                    value={newParticipant.treatmentGroup}
                    onChange={e => setNewParticipant({ ...newParticipant, treatmentGroup: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Active Herbal Arm">Active Herbal Arm</option>
                    <option value="Standard Care Arm">Standard Care Arm</option>
                    <option value="Placebo/Control">Placebo/Control</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEnrollModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  {t('enrollParticipant')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

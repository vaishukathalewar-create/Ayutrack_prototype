import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  AlertOctagon, 
  Users, 
  FlaskConical, 
  TrendingUp, 
  Filter, 
  Search, 
  FileCheck, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { storageService } from '../services/storageService';
import { ClinicalTrial, ResearchSite, AdverseEvent } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const AyushOfficerNationalView: React.FC = () => {
  const { setActiveTab, refreshKey } = useApp();

  const [trials, setTrials] = useState<ClinicalTrial[]>([]);
  const [sites, setSites] = useState<ResearchSite[]>([]);
  const [adverseEvents, setAdverseEvents] = useState<AdverseEvent[]>([]);

  // Filters
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedTrial, setSelectedTrial] = useState<string>('All');
  const [selectedPhase, setSelectedPhase] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  useEffect(() => {
    setTrials(storageService.getTrials());
    setSites(storageService.getSites());
    setAdverseEvents(storageService.getAdverseEvents());
  }, [refreshKey]);

  // Regional state breakdown
  const statesList = [
    {
      state: 'Delhi (NCT)',
      zone: 'North Zone (Central Apex)',
      institute: 'All India Institute of Ayurveda (AIIA)',
      trialsCount: 3,
      enrolled: 112,
      target: 150,
      pi: 'Prof. (Dr.) Tanuja Nesari',
      compliance: 98,
      saeCount: 1,
      status: 'Active'
    },
    {
      state: 'Gujarat',
      zone: 'West Zone',
      institute: 'IPGTRA / ITRA Jamnagar',
      trialsCount: 2,
      enrolled: 84,
      target: 100,
      pi: 'Prof. (Dr.) Anup Thakar',
      compliance: 94,
      saeCount: 0,
      status: 'Active'
    },
    {
      state: 'Rajasthan',
      zone: 'North Zone',
      institute: 'National Institute of Ayurveda (NIA) Jaipur',
      trialsCount: 2,
      enrolled: 68,
      target: 90,
      pi: 'Prof. Sanjeev Sharma',
      compliance: 96,
      saeCount: 0,
      status: 'Active'
    },
    {
      state: 'Maharashtra',
      zone: 'West Zone',
      institute: 'R.A. Podar Ayurveda College Mumbai',
      trialsCount: 2,
      enrolled: 52,
      target: 75,
      pi: 'Dr. Sunita Kulkarni',
      compliance: 91,
      saeCount: 0,
      status: 'Active'
    },
    {
      state: 'Kerala',
      zone: 'South Zone',
      institute: 'Govt. Ayurveda College Thiruvananthapuram',
      trialsCount: 1,
      enrolled: 41,
      target: 60,
      pi: 'Dr. M. S. Deepa',
      compliance: 86,
      saeCount: 0,
      status: 'Audit Scheduled'
    }
  ];

  // Filtering states
  const filteredStates = statesList.filter(s => {
    if (selectedState !== 'All' && s.state !== selectedState) return false;
    return true;
  });

  const totalTrialsCount = trials.length;
  const activeTrialsCount = trials.filter(t => t.status === 'Active' || t.status === 'Recruiting').length;
  const totalEnrolled = trials.reduce((sum, t) => sum + t.enrolledParticipants, 0);
  const totalSaes = adverseEvents.filter(a => a.isSerious).length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            Ministry of Ayush • National Apex Portal
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-blue-600" />
              <span>National Ayurveda Trial Surveillance Dashboard</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Pan-India monitoring of clinical trials, state-wise research density, safety surveillance, and NDCT 2019 regulatory adherence.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('reports')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <span>Download Ministry Report</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* National KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Total Trials</span>
          <p className="text-2xl font-bold font-serif text-slate-900 dark:text-white mt-1">{totalTrialsCount}</p>
          <span className="text-[10px] text-emerald-600 font-medium">Pan-India</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Active Trials</span>
          <p className="text-2xl font-bold font-serif text-emerald-600 mt-1">{activeTrialsCount}</p>
          <span className="text-[10px] text-slate-400">1 Paused</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Total Enrolled</span>
          <p className="text-2xl font-bold font-serif text-slate-900 dark:text-white mt-1">{totalEnrolled}</p>
          <span className="text-[10px] text-teal-600 font-medium">74.4% of goal</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Research Centers</span>
          <p className="text-2xl font-bold font-serif text-slate-900 dark:text-white mt-1">{statesList.length}</p>
          <span className="text-[10px] text-slate-400">5 States</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 shadow-xs">
          <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 block">Active SAEs</span>
          <p className="text-2xl font-bold font-serif text-rose-600 mt-1">{totalSaes}</p>
          <span className="text-[10px] text-rose-600 font-bold">24-hr reporting</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 shadow-xs">
          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 block">Compliance Index</span>
          <p className="text-2xl font-bold font-serif text-emerald-600 mt-1">94.2%</p>
          <span className="text-[10px] text-emerald-600 font-medium">NDCT Rules 2019</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
          <Filter className="w-3.5 h-3.5 text-blue-600" />
          <span>Filter by State:</span>
          <select
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200"
          >
            <option value="All">All States</option>
            <option value="Delhi (NCT)">Delhi (NCT)</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Kerala">Kerala</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
          <span>Trial Phase:</span>
          <select
            value={selectedPhase}
            onChange={e => setSelectedPhase(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200"
          >
            <option value="All">All Phases</option>
            <option value="Phase I">Phase I</option>
            <option value="Phase II">Phase II</option>
            <option value="Phase III">Phase III</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
          <span>Trial Status:</span>
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200"
          >
            <option value="All">All Statuses</option>
            <option value="Recruiting">Recruiting</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
          </select>
        </div>
      </div>

      {/* Requirement #10: INDIA-FOCUSED STATE/SITE MONITORING VISUALIZATION */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-serif flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>State-wise Trial Density & Compliance Grid</span>
          </h3>
          <span className="text-[11px] text-slate-400">Standardized State Monitoring Visualization</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStates.map((s, i) => {
            const progress = Math.round((s.enrolled / s.target) * 100);

            return (
              <div
                key={i}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                      {s.zone}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                      {s.compliance}% Compliance
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {s.state}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{s.institute}</p>

                  <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Active Protocols:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{s.trialsCount} Trials</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Lead Investigator:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{s.pi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">SAE Incident Count:</span>
                      <span className={`font-bold ${s.saeCount > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {s.saeCount} Incidents
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Participant Goal</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {s.enrolled} / {s.target} ({progress}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${progress}%` }}
                    />
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

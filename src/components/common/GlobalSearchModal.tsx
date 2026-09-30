import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FlaskConical, Users, Building, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import { ClinicalTrial, Participant, ResearchSite, AdverseEvent } from '../../types';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setActiveTab, t } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const [trials, setTrials] = useState<ClinicalTrial[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [sites, setSites] = useState<ResearchSite[]>([]);
  const [adverseEvents, setAdverseEvents] = useState<AdverseEvent[]>([]);

  useEffect(() => {
    if (isSearchOpen) {
      setTrials(storageService.getTrials());
      setParticipants(storageService.getParticipants());
      setSites(storageService.getSites());
      setAdverseEvents(storageService.getAdverseEvents());
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedTrials = trials.filter(t => 
    !q || t.id.toLowerCase().includes(q) || t.title.toLowerCase().includes(q) || t.shortTitle.toLowerCase().includes(q) || t.indication.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchedParticipants = participants.filter(p => 
    !q || p.id.toLowerCase().includes(q) || p.trialId.toLowerCase().includes(q) || p.prakriti.toLowerCase().includes(q) || p.site.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchedSites = sites.filter(s => 
    !q || s.name.toLowerCase().includes(q) || s.state.toLowerCase().includes(q) || s.pi.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchedAes = adverseEvents.filter(a => 
    !q || a.id.toLowerCase().includes(q) || a.participantId.toLowerCase().includes(q) || a.eventDescription.toLowerCase().includes(q) || a.severity.toLowerCase().includes(q)
  ).slice(0, 3);

  const totalMatches = (q ? matchedTrials.length + matchedParticipants.length + matchedSites.length + matchedAes.length : 0);

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search across trials, participants, sites, adverse events... (Type to filter)"
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-4">
          
          {/* Section: Trials */}
          {matchedTrials.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 px-2">
                <span className="flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
                  Clinical Trials
                </span>
                <span>{matchedTrials.length} found</span>
              </div>
              <div className="space-y-1">
                {matchedTrials.map(trial => (
                  <div
                    key={trial.id}
                    onClick={() => handleNavigate('clinical-trials')}
                    className="p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                          {trial.id}
                        </span>
                        <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">{trial.shortTitle}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {trial.phase}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {trial.indication} • Formulation: {trial.formulation} ({trial.formulationName})
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Participants */}
          {matchedParticipants.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 px-2">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-teal-600" />
                  Participants
                </span>
                <span>{matchedParticipants.length} found</span>
              </div>
              <div className="space-y-1">
                {matchedParticipants.map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleNavigate('participants')}
                    className="p-2.5 rounded-xl hover:bg-teal-50 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 bg-teal-100 dark:bg-teal-950 px-1.5 py-0.5 rounded">
                          {p.id}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {p.gender}, {p.age}y
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300/40">
                          Prakriti: {p.prakriti}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Trial: {p.trialId} • Site: {p.site} • Visit: {p.currentVisit}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity text-teal-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Sites */}
          {matchedSites.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 px-2">
                <span className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-blue-600" />
                  Research Sites
                </span>
                <span>{matchedSites.length} found</span>
              </div>
              <div className="space-y-1">
                {matchedSites.map(s => (
                  <div
                    key={s.id}
                    onClick={() => handleNavigate('sites')}
                    className="p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{s.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                          {s.state}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        PI: {s.pi} • Enrolled: {s.participantsEnrolled}/{s.enrollmentTarget} participants
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Adverse Events */}
          {matchedAes.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 px-2">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  Adverse Events
                </span>
                <span>{matchedAes.length} found</span>
              </div>
              <div className="space-y-1">
                {matchedAes.map(ae => (
                  <div
                    key={ae.id}
                    onClick={() => handleNavigate('adverse-events')}
                    className="p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-950 px-1.5 py-0.5 rounded">
                          {ae.id}
                        </span>
                        {ae.isSerious && (
                          <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-600 text-white animate-pulse">
                            SAE
                          </span>
                        )}
                        <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {ae.eventDescription}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Participant: {ae.participantId} ({ae.trialId}) • Severity: {ae.severity} • Causality: {ae.causality}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity text-rose-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Reports Link */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
            <span>Looking for downloadable dossiers?</span>
            <button
              onClick={() => handleNavigate('reports')}
              className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1 hover:underline"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Go to Reports Module</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { AlertOctagon, Clock, ChevronRight, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import { AdverseEvent } from '../../types';

export const SaeAlertBanner: React.FC = () => {
  const { setActiveTab, showToast, refreshKey, triggerRefresh, t, language } = useApp();
  const [activeSae, setActiveSae] = useState<AdverseEvent | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 17,
    minutes: 42,
    seconds: 15
  });
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const aes = storageService.getAdverseEvents();
    const sae = aes.find(a => a.isSerious);
    setActiveSae(sae || null);
  }, [refreshKey]);

  useEffect(() => {
    if (!activeSae?.countdownDeadline) return;

    const updateTimer = () => {
      const deadline = new Date(activeSae.countdownDeadline!).getTime();
      const now = Date.now();
      const diff = Math.max(0, deadline - now);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [activeSae]);

  if (!activeSae || isDismissed) return null;

  const handleSimulateDispatch = () => {
    if (!activeSae) return;
    const aes = storageService.getAdverseEvents();
    const idx = aes.findIndex(a => a.id === activeSae.id);
    if (idx !== -1) {
      aes[idx].notificationStatus.regulatoryAuthority = 'Notified';
      storageService.saveAdverseEvents(aes);
      triggerRefresh();
      showToast(language === 'hi' ? 'केंद्रीय नियामक प्राधिकरण (CDSCO) को सिमुलेटेड सूचना भेजी गई' : 'Simulated notification dispatched to Central Regulatory Authority (CDSCO)', 'success');
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-rose-700 via-rose-600 to-red-800 text-white shadow-lg border-b border-rose-900/40">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          
          {/* Left: SAE Tag & Event Summary */}
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-1.5 rounded-lg bg-white/20 ring-2 ring-white/30 animate-pulse shrink-0 mt-0.5 sm:mt-0">
              <AlertOctagon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold tracking-wider text-xs uppercase bg-black/30 px-2 py-0.5 rounded-full border border-white/20">
                  {language === 'hi' ? 'गंभीर प्रतिकूल घटना (SAE) चेतावनी' : 'SERIOUS ADVERSE EVENT ALERT'}
                </span>
                <span className="font-mono text-xs bg-white/20 px-2 py-0.5 rounded font-bold">
                  {activeSae.participantId}
                </span>
                <span className="text-xs text-rose-100 font-medium">
                  {t('trialId')}: <strong className="text-white">{activeSae.trialId}</strong>
                </span>
              </div>
              <p className="text-xs text-rose-50 font-medium mt-0.5 line-clamp-1">
                {t('aeDescription')}: <span className="text-white font-semibold">{activeSae.eventDescription}</span> • {t('severityLabel')}: <span className="font-bold underline">{activeSae.severity === 'Severe' ? t('severe') : activeSae.severity === 'Serious' ? t('serious') : activeSae.severity === 'Moderate' ? t('moderate') : t('mild')}</span>
              </p>
            </div>
          </div>

          {/* Center: 24-Hour Countdown Clock */}
          <div className="flex items-center gap-3 bg-black/25 px-3 py-1.5 rounded-xl border border-white/20 shrink-0">
            <Clock className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-200">
                {language === 'hi' ? '24-घंटे विधिक रिपोर्टिंग विंडो' : '24-Hour SAE Reporting Window'}
              </p>
              <p className="font-mono text-xs font-bold text-white tracking-widest">
                {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
              </p>
            </div>
          </div>

          {/* Right: Regulatory Notification Simulation & CTA */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <div className="hidden xl:flex items-center gap-2 text-[11px]">
              <span className="text-rose-200">{language === 'hi' ? 'नियामक स्थिति:' : 'Regulatory Status:'}</span>
              <span className="px-2 py-0.5 rounded bg-white/20 font-medium">EC: {activeSae.notificationStatus.ethicsCommittee}</span>
              <span className={`px-2 py-0.5 rounded font-medium ${
                activeSae.notificationStatus.regulatoryAuthority === 'Pending' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-emerald-500 text-white'
              }`}>
                CDSCO: {activeSae.notificationStatus.regulatoryAuthority}
              </span>
            </div>

            {activeSae.notificationStatus.regulatoryAuthority === 'Pending' && (
              <button
                onClick={handleSimulateDispatch}
                className="px-2.5 py-1 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg shadow-xs transition-colors"
                title="Simulate regulatory dispatch"
              >
                {language === 'hi' ? 'सिमुलेटेड प्रेषण' : 'Simulate Notify'}
              </button>
            )}

            <button
              onClick={() => setActiveTab('adverse-events')}
              className="px-3 py-1 rounded-lg bg-white text-rose-900 font-bold text-xs hover:bg-rose-50 flex items-center gap-1 shadow-sm transition-all"
            >
              <span>{t('viewDetails')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 text-rose-200 hover:text-white rounded hover:bg-white/10"
              title="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

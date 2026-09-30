import React from 'react';
import { Bell, CheckCheck, X, AlertOctagon, AlertTriangle, Info, Clock, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationDrawer: React.FC = () => {
  const { 
    isNotificationOpen, 
    setIsNotificationOpen, 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    setActiveTab,
    t,
    language 
  } = useApp();

  if (!isNotificationOpen) return null;

  const handleNotificationClick = (id: string, linkTab?: string) => {
    markAsRead(id);
    if (linkTab) {
      setActiveTab(linkTab);
      setIsNotificationOpen(false);
    }
  };

  // Translate dynamic notifications if matching known mock notifications
  const getTranslatedMessage = (item: { title: string; message: string }) => {
    if (language !== 'hi') return item.message;
    if (item.message.includes('P-102')) return t('notifSaeP102');
    if (item.message.includes('NDCT Rules 2019')) return t('notifNdctPending');
    if (item.message.includes('78%')) return t('notifEnrollmentReached');
    if (item.message.includes('Ethics approval expires')) return t('notifEthicsExpiring');
    if (item.message.includes('safety pattern')) return t('notifSafetyPattern');
    return item.message;
  };

  const getTranslatedTitle = (title: string) => {
    if (language !== 'hi') return title;
    if (title.includes('Urgent: SAE')) return 'अति आवश्यक: गंभीर प्रतिकूल घटना (SAE) दर्ज';
    if (title.includes('NDCT Regulatory')) return 'NDCT नियामक दस्तावेज समीक्षा देय';
    if (title.includes('Recruitment Milestone')) return 'भर्ती मील का पत्थर हासिल';
    if (title.includes('Ethics Committee')) return 'नैतिकता समिति नवीनीकरण आवश्यक';
    if (title.includes('Safety Pattern')) return 'संभावित सुरक्षा पैटर्न संकेत';
    return title;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsNotificationOpen(false)}
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {t('notificationCenter')}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {unreadCount} {t('unreadAlerts')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[11px] text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  {t('markAllRead')}
                </button>
              )}
              <button
                onClick={() => setIsNotificationOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                {t('noNotifications')}
              </div>
            ) : (
              notifications.map((item) => {
                const isHigh = item.priority === 'High';
                const isMed = item.priority === 'Medium';

                return (
                  <div
                    key={item.id}
                    onClick={() => handleNotificationClick(item.id, item.linkTab)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                      !item.read
                        ? isHigh
                          ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60 shadow-xs'
                          : isMed
                          ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60 shadow-xs'
                          : 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                        : 'bg-white dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-800 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5">
                        {isHigh ? (
                          <AlertOctagon className="w-4 h-4 text-rose-600 animate-pulse" />
                        ) : isMed ? (
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                        ) : (
                          <Info className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className={`text-xs font-bold truncate ${isHigh ? 'text-rose-900 dark:text-rose-200' : 'text-slate-900 dark:text-slate-100'}`}>
                            {getTranslatedTitle(item.title)}
                          </p>
                          <span
                            className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full ${
                              isHigh
                                ? 'bg-rose-600 text-white'
                                : isMed
                                ? 'bg-amber-500 text-white'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {language === 'hi' ? (isHigh ? 'उच्च' : isMed ? 'मध्यम' : 'सामान्य') : item.priority}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                          {getTranslatedMessage(item)}
                        </p>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 text-[10px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.timestamp}
                          </span>
                          {item.linkTab && (
                            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                              <span>{t('action')}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 text-center">
            {t('simulatedDispatchFooter')}
          </div>

        </div>
      </div>
    </div>
  );
};

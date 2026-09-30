import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, NotificationItem } from '../types';
import { translations, TranslationKey } from '../utils/i18n';
import { storageService } from '../services/storageService';
import { speechService } from '../services/speechService';
import { useAuth } from './AuthContext';

export interface DemoStepDefinition {
  step: number;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  targetTab: string;
  targetRole?: 'Research Head' | 'Doctor / Principal Investigator' | 'Data Entry Operator' | 'Ayush Officer';
  actionPromptEn?: string;
  actionPromptHi?: string;
}

export const DEMO_STEPS: DemoStepDefinition[] = [
  {
    step: 1,
    titleEn: '1. Research Head Dashboard Overview',
    titleHi: '1. अनुसंधान प्रमुख डैशबोर्ड अवलोकन',
    descriptionEn: 'Welcome to AyuTrack CTMS. The Research Head monitors active clinical trials, enrollment velocity, adverse event status, and national site KPIs in real time.',
    descriptionHi: 'आयु-ट्रैक सीटीएमएस में आपका स्वागत है। अनुसंधान प्रमुख सक्रिय परीक्षणों, नामांकन गति, प्रतिकूल घटनाओं और राष्ट्रीय केंद्रों की वास्तविक समय में निगरानी करते हैं।',
    targetTab: 'dashboard',
    targetRole: 'Research Head'
  },
  {
    step: 2,
    titleEn: '2. Multi-Centric Trial Enrollment Monitoring',
    titleHi: '2. बहु-केंद्रीय परीक्षण नामांकन निगरानी',
    descriptionEn: 'Examine live recruitment progress across AIIA New Delhi, IPGTRA Jamnagar, NIA Jaipur, and Podar Mumbai with target benchmarks.',
    descriptionHi: 'लक्ष्य मानकों के साथ नई दिल्ली, जामनगर, जयपुर और मुंबई केंद्रों पर नामांकन प्रगति की जांच करें।',
    targetTab: 'clinical-trials',
    targetRole: 'Research Head'
  },
  {
    step: 3,
    titleEn: '3. Doctor / Principal Investigator (PI) Perspective',
    titleHi: '3. चिकित्सक / मुख्य अन्वेषक (PI) दृष्टिकोण',
    descriptionEn: 'Switching to Dr. Tanuja Nesari (Lead PI). Investigators have clinical oversight of participants, vitals, visit schedules, and safety incidents.',
    descriptionHi: 'मुख्य अन्वेषक डॉ. तनुजा नेसरी के दृष्टिकोण पर स्विच किया गया। यहां रोगियों की जांच, प्रकृति मूल्यांकन और सुरक्षा की निगरानी होती है।',
    targetTab: 'participants',
    targetRole: 'Doctor / Principal Investigator'
  },
  {
    step: 4,
    titleEn: '4. Pharmacovigilance: Reporting an Adverse Event',
    titleHi: '4. औषध-निगरानी: प्रतिकूल घटना रिपोर्टिंग',
    descriptionEn: 'Clinicians log adverse events with standard WHO-UMC causality assessments (Certain, Probable, Possible).',
    descriptionHi: 'चिकित्सक WHO-UMC कारणता मूल्यांकन (Certain, Probable, Possible) के साथ प्रतिकूल प्रभाव दर्ज करते हैं।',
    targetTab: 'adverse-events',
    targetRole: 'Doctor / Principal Investigator'
  },
  {
    step: 5,
    titleEn: '5. Escalating to Serious Adverse Event (SAE)',
    titleHi: '5. गंभीर प्रतिकूल घटना (SAE) के रूप में चिन्हांकित करना',
    descriptionEn: 'When an event is marked "Serious", statutory Indian regulatory protocols under NDCT Rules 2019 are immediately initiated.',
    descriptionHi: 'जब किसी घटना को "गंभीर" (Serious) चिह्नित किया जाता है, तो NDCT नियम 2019 के अंतर्गत कानूनी प्रक्रिया तुरंत शुरू हो जाती है।',
    targetTab: 'adverse-events',
    targetRole: 'Doctor / Principal Investigator'
  },
  {
    step: 6,
    titleEn: '6. Prominent Red SAE Regulatory Alert',
    titleHi: '6. प्रमुख लाल SAE नियामक चेतावनी',
    descriptionEn: 'Notice the persistent high-priority SAE banner for Participant P-102. Automated simulated notifications are queued for the Ethics Committee, Sponsor, and CDSCO.',
    descriptionHi: 'प्रतिभागी P-102 के लिए हाई-प्रायोरिटी SAE अलर्ट प्रदर्शित हो रहा है। नैतिकता समिति एवं नियामक को तत्काल सूचना भेजी जाती है।',
    targetTab: 'adverse-events',
    targetRole: 'Doctor / Principal Investigator'
  },
  {
    step: 7,
    titleEn: '7. Mandatory 24-Hour Regulatory Countdown Timer',
    titleHi: '7. अनिवार्य 24-घंटे का नियामक काउंटडाउन टाइमर',
    descriptionEn: 'Under Indian clinical trial regulations, SAEs must be notified within 24 hours. The live countdown clock provides strict audit adherence.',
    descriptionHi: 'भारतीय नियमों के अनुसार, 24 घंटे के भीतर SAE की सूचना देना अनिवार्य है। लाइव काउंटडाउन घड़ी नियामक अनुपालन सुनिश्चित करती है।',
    targetTab: 'adverse-events',
    targetRole: 'Doctor / Principal Investigator'
  },
  {
    step: 8,
    titleEn: '8. Data Entry Operator (CRC) eCRF Portal',
    titleHi: '8. डेटा एंट्री ऑपरेटर (ई-सीआरएफ) पोर्टल',
    descriptionEn: 'Switching role to Data Entry Operator. Clean, validated electronic Case Report Form (eCRF) for structured clinical data collection.',
    descriptionHi: 'डेटा एंट्री ऑपरेटर भूमिका पर स्विच किया गया। डिजिटल ई-सीआरएफ फॉर्म में डेटा सत्यापन एवं नैदानिक प्रविष्टि की सुविधा।',
    targetTab: 'ecrf',
    targetRole: 'Data Entry Operator'
  },
  {
    step: 9,
    titleEn: '9. Clinical Validation & Ayurveda Assessment',
    titleHi: '9. क्लिनिकल सत्यापन एवं आयुर्वेद प्रकृति मूल्यांकन',
    descriptionEn: 'Entering systolic BP (range 60-250 mmHg), dose (1-5000 mg), Prakriti classification (Vata, Pitta, Kapha), and classical formulation dosage.',
    descriptionHi: 'रक्तचाप (60-250 mmHg), खुराक (1-5000 mg), प्रकृति वर्गीकरण एवं शास्त्रीय योग खुराक प्रविष्टि।',
    targetTab: 'ecrf',
    targetRole: 'Data Entry Operator'
  },
  {
    step: 10,
    titleEn: '10. Interoperability: FHIR & CDISC/SDTM Export',
    titleHi: '10. इंटरऑपरेबिलिटी: FHIR एवं CDISC/SDTM पूर्वावलोकन',
    descriptionEn: 'AyuTrack standardizes Ayurveda clinical records into HL7 FHIR ResearchSubject/Observation resources and CDISC SDTM domains with NAMASTE terminology placeholders.',
    descriptionHi: 'आयु-ट्रैक आयुर्वेद डेटा को HL7 FHIR और CDISC SDTM मानकों तथा नमस्ते (NAMASTE) कोड में मानकीकृत करता है।',
    targetTab: 'ecrf',
    targetRole: 'Data Entry Operator'
  },
  {
    step: 11,
    titleEn: '11. Return to Research Head Executive View',
    titleHi: '11. अनुसंधान प्रमुख कार्यकारी दृश्य पर वापसी',
    descriptionEn: 'Returning to the Research Head dashboard to view aggregated trial health, recent audit entries, and updated recruitment curves.',
    descriptionHi: 'अनुसंधान प्रमुख डैशबोर्ड पर लौटें जहां समेकित परीक्षण स्वास्थ्य, ऑडिट और भर्ती वक्र दिखाई देते हैं।',
    targetTab: 'dashboard',
    targetRole: 'Research Head'
  },
  {
    step: 12,
    titleEn: '12. Pharmacovigilance & Pattern Safety Alert',
    titleHi: '12. औषध-निगरानी एवं संभावित सुरक्षा पैटर्न चेतावनी',
    descriptionEn: 'The Pharmacovigilance module highlights a rule-based safety pattern alert across multi-site formulations for proactive investigator review.',
    descriptionHi: 'औषध-निगरानी मॉड्यूल बहु-केंद्रीय योगों में संभावित सुरक्षा पैटर्न का पता लगाकर समय पर समीक्षा की सिफारिश करता है।',
    targetTab: 'pharmacovigilance',
    targetRole: 'Research Head'
  },
  {
    step: 13,
    titleEn: '13. Ayush Officer National Monitoring Oversight',
    titleHi: '13. आयुष अधिकारी राष्ट्रीय निगरानी दृश्य',
    descriptionEn: 'Switching to National Ayush Officer. State-wise clinical trial density, compliance index, and national pharmacovigilance safety metrics.',
    descriptionHi: 'राष्ट्रीय आयुष अधिकारी दृश्य पर स्विच किया गया। राज्यवार परीक्षण निगरानी, समग्र अनुपालन और सुरक्षा निरीक्षण।',
    targetTab: 'dashboard',
    targetRole: 'Ayush Officer'
  },
  {
    step: 14,
    titleEn: '14. Ethics & Regulatory Compliance Verification',
    titleHi: '14. नैतिकता एवं नियामक अनुपालन सत्यापन',
    descriptionEn: 'Comprehensive tracking of CTRI registrations, Ethics Committee renewals, and NDCT Rules 2019 dossiers. Guided tour completed!',
    descriptionHi: 'सीटीआरआई पंजीकरण, नैतिकता समिति नवीनीकरण और NDCT नियम 2019 दस्तावेजों की पूर्ण ट्रैकिंग। निर्देशित डेमो संपन्न!',
    targetTab: 'ethics-regulatory',
    targetRole: 'Ayush Officer'
  }
];

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey | string) => string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  // Guided Demo
  isGuidedDemoActive: boolean;
  demoStep: number;
  startGuidedDemo: () => void;
  stopGuidedDemo: () => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  isAudioMuted: boolean;
  toggleAudioMute: () => void;
  refreshKey: number;
  triggerRefresh: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { switchRole, userProfile, updateProfile } = useAuth();

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('ayutrack_theme') as 'light' | 'dark') || 'light';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('ayutrack_language') as Language) || (localStorage.getItem('ayutrack_lang') as Language) || 'en';
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => storageService.getNotifications());
  const [toast, setToast] = useState<ToastState | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // Guided Demo state
  const [isGuidedDemoActive, setIsGuidedDemoActive] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(1);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);

  // Persist theme
  useEffect(() => {
    localStorage.setItem('ayutrack_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Persist language to ayutrack_language and sync with userProfile
  useEffect(() => {
    localStorage.setItem('ayutrack_language', language);
    localStorage.setItem('ayutrack_lang', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    updateProfile({ language: lang });
  };

  const t = useCallback(
    (key: TranslationKey | string): string => {
      const dict = (translations as Record<string, Record<string, string>>)[language] || translations.en;
      if (!dict || !dict[key]) {
        return (translations.en as Record<string, string>)[key] || key;
      }
      return dict[key];
    },
    [language]
  );

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast(prev => (prev?.id === id ? null : prev));
    }, 4000);
  }, []);

  const triggerRefresh = useCallback(() => {
    setRefreshKey(k => k + 1);
    setNotifications(storageService.getNotifications());
  }, []);

  const markAsRead = useCallback((id: string) => {
    const list = storageService.getNotifications();
    const item = list.find(n => n.id === id);
    if (item) {
      item.read = true;
      storageService.saveNotifications(list);
      setNotifications([...list]);
    }
  }, []);

  const markAllAsRead = useCallback(() => {
    const list = storageService.getNotifications();
    list.forEach(n => (n.read = true));
    storageService.saveNotifications(list);
    setNotifications([...list]);
    showToast('All notifications marked as read', 'info');
  }, [showToast]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Guided demo controls
  const runDemoStep = useCallback((stepNum: number) => {
    const current = DEMO_STEPS.find(s => s.step === stepNum);
    if (!current) return;

    if (current.targetRole) {
      switchRole(current.targetRole);
    }
    if (current.targetTab) {
      setActiveTab(current.targetTab);
    }

    // Voice narration
    if (!isAudioMuted) {
      const speechText = language === 'hi' ? `${current.titleHi}. ${current.descriptionHi}` : `${current.titleEn}. ${current.descriptionEn}`;
      speechService.speak(speechText, language);
    }
  }, [switchRole, isAudioMuted, language]);

  const startGuidedDemo = () => {
    setIsGuidedDemoActive(true);
    setDemoStep(1);
    runDemoStep(1);
    showToast('Guided Demo started — Follow the highlighted steps', 'info');
  };

  const stopGuidedDemo = () => {
    setIsGuidedDemoActive(false);
    speechService.stop();
    showToast('Guided Demo stopped', 'info');
  };

  const nextDemoStep = () => {
    if (demoStep < DEMO_STEPS.length) {
      const next = demoStep + 1;
      setDemoStep(next);
      runDemoStep(next);
    } else {
      stopGuidedDemo();
      showToast('Guided Demo completed successfully!', 'success');
    }
  };

  const prevDemoStep = () => {
    if (demoStep > 1) {
      const prev = demoStep - 1;
      setDemoStep(prev);
      runDemoStep(prev);
    }
  };

  const toggleAudioMute = () => {
    const next = !isAudioMuted;
    setIsAudioMuted(next);
    speechService.setMuted(next);
    showToast(next ? 'Demo narration muted' : 'Demo narration enabled', 'info');
  };

  // Keyboard shortcut for Ctrl+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage,
        t,
        activeTab,
        setActiveTab,
        isSearchOpen,
        setIsSearchOpen,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        isNotificationOpen,
        setIsNotificationOpen,
        toast,
        showToast,
        isGuidedDemoActive,
        demoStep,
        startGuidedDemo,
        stopGuidedDemo,
        nextDemoStep,
        prevDemoStep,
        isAudioMuted,
        toggleAudioMute,
        refreshKey,
        triggerRefresh
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

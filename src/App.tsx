/**
 * @license
 * AyuTrack - Clinical Trial Management System (CTMS)
 * AIIA / Ministry of Ayush • Smart India Hackathon SIH26046
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { SaeAlertBanner } from './components/common/SaeAlertBanner';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { Toast } from './components/common/Toast';
import { GuidedDemoController } from './components/guidedDemo/GuidedDemoController';

// Views
import { LoginView } from './views/LoginView';
import { SignupView } from './views/SignupView';
import { DashboardView } from './views/DashboardView';
import { TrialsView } from './views/TrialsView';
import { ParticipantsView } from './views/ParticipantsView';
import { CrfView } from './views/CrfView';
import { AdverseEventsView } from './views/AdverseEventsView';
import { PharmacovigilanceView } from './views/PharmacovigilanceView';
import { EthicsRegulatoryView } from './views/EthicsRegulatoryView';
import { SitesView } from './views/SitesView';
import { AyushOfficerNationalView } from './views/AyushOfficerNationalView';
import { ReportsView } from './views/ReportsView';
import { AnalyticsView } from './views/AnalyticsView';
import { SettingsView } from './views/SettingsView';

const MainAppContent: React.FC = () => {
  const { isAuthenticated, userRole, authView } = useAuth();
  const { activeTab } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If user is not authenticated, show professional CTMS Login View or Signup View
  if (!isAuthenticated) {
    if (authView === 'signup') {
      return <SignupView />;
    }
    return <LoginView />;
  }

  // Active tab renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        // If logged in as Ayush Officer, show the National Overview dashboard
        if (userRole === 'Ayush Officer') {
          return <AyushOfficerNationalView />;
        }
        return <DashboardView />;
      case 'clinical-trials':
        return <TrialsView />;
      case 'participants':
        return <ParticipantsView />;
      case 'ecrf':
        return <CrfView />;
      case 'adverse-events':
        return <AdverseEventsView />;
      case 'pharmacovigilance':
        return <PharmacovigilanceView />;
      case 'ethics-regulatory':
        return <EthicsRegulatoryView />;
      case 'sites':
        return <SitesView />;
      case 'reports':
        return <ReportsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <Header onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      {/* Prominent SAE Alert Banner with 24-hr countdown clock */}
      <SaeAlertBanner />

      {/* Body Layout: Sidebar + Main Content */}
      <div className="flex-1 flex max-w-full">
        {/* Navigation Sidebar */}
        <Sidebar
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Dynamic View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {renderTabContent()}
        </main>
      </div>

      {/* Sticky / Persistent Footer */}
      <Footer />

      {/* Global Overlays & Modals */}
      <GlobalSearchModal />
      <NotificationDrawer />
      <GuidedDemoController />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </AuthProvider>
  );
}

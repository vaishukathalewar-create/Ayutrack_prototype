import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  Table, 
  FileCheck, 
  AlertTriangle, 
  Users, 
  Building, 
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { storageService } from '../services/storageService';
import { Breadcrumb } from '../components/common/Breadcrumb';

type ReportType = 
  | 'Trial Progress Report'
  | 'Participant Enrollment Report'
  | 'Adverse Event Report'
  | 'SAE Report'
  | 'Regulatory Compliance Report'
  | 'Site Performance Report';

export const ReportsView: React.FC = () => {
  const { showToast, t, language } = useApp();
  const [selectedReport, setSelectedReport] = useState<ReportType>('Trial Progress Report');
  const [reportGenerated, setReportGenerated] = useState(true);

  const getReportName = (type: ReportType) => {
    switch (type) {
      case 'Trial Progress Report': return t('reportTrialProgress');
      case 'Participant Enrollment Report': return t('reportParticipantEnrollment');
      case 'Adverse Event Report': return t('reportAdverseEvent');
      case 'SAE Report': return t('reportSae');
      case 'Regulatory Compliance Report': return t('reportRegulatoryCompliance');
      case 'Site Performance Report': return t('reportSitePerformance');
    }
  };

  const reportDefinitions: { type: ReportType; desc: string; icon: React.ReactNode }[] = [
    {
      type: 'Trial Progress Report',
      desc: language === 'hi' ? 'परीक्षण स्थिति, भर्ती गति, नैदानिक प्रोटोकॉल एवं औषधीय योगों का विस्तृत सारांश।' : 'Comprehensive summary of trial status, recruitment velocities, protocols, and formulation details.',
      icon: <Layers className="w-5 h-5 text-emerald-600" />
    },
    {
      type: 'Participant Enrollment Report',
      desc: language === 'hi' ? 'अनामित प्रतिभागी जनसांख्यिकी, प्रकृति वितरण, दोष प्रधानता एवं विज़िट अनुसूची प्रगति।' : 'De-identified participant demographics, Prakriti distribution, Dosha dominance, and visit schedule progress.',
      icon: <Users className="w-5 h-5 text-teal-600" />
    },
    {
      type: 'Adverse Event Report',
      desc: language === 'hi' ? 'नैदानिक प्रतिकूल घटनाओं, WHO-UMC कार्य-कारण संबंधों एवं चिकित्सीय परिणामों का विवरण।' : 'Full log of clinical adverse events, WHO-UMC causality assessments, and drug action outcomes.',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />
    },
    {
      type: 'SAE Report',
      desc: language === 'hi' ? '24-घंटे के विधिक नियामक अनुपालन रिकॉर्ड के साथ गंभीर प्रतिकूल घटनाओं (SAE) की संचिका।' : 'Statutory expedited dossier of Serious Adverse Events with 24-hr regulatory compliance records.',
      icon: <AlertTriangle className="w-5 h-5 text-rose-600" />
    },
    {
      type: 'Regulatory Compliance Report',
      desc: language === 'hi' ? 'NDCT नियम 2019 अनुपालन ऑडिट, CTRI स्थिति एवं संस्थागत नैतिकता समिति नवीनीकरण।' : 'NDCT Rules 2019 compliance audit, CTRI status, and Institutional Ethics Committee renewals.',
      icon: <FileCheck className="w-5 h-5 text-blue-600" />
    },
    {
      type: 'Site Performance Report',
      desc: language === 'hi' ? '5 केंद्रों के बीच बहु-केंद्रिक भर्ती तुलना, साइट ऑडिट स्थिति और परीक्षण लक्ष्य मेट्रिक्स।' : 'Multi-centric recruitment comparisons, site audit status, and trial target metrics across 5 centers.',
      icon: <Building className="w-5 h-5 text-purple-600" />
    }
  ];

  const handleGenerateReport = () => {
    setReportGenerated(true);
    showToast(language === 'hi' ? `${getReportName(selectedReport)} सफलतापूर्वक तैयार किया गया` : `Generated ${selectedReport} successfully`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    const trials = storageService.getTrials();
    const participants = storageService.getParticipants();
    const aes = storageService.getAdverseEvents();
    const sites = storageService.getSites();

    let headers: string[] = [];
    let rows: (string | number)[][] = [];
    let filename = `${selectedReport.toLowerCase().replace(/ /g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;

    switch (selectedReport) {
      case 'Trial Progress Report':
        headers = ['Trial_ID', 'Short_Title', 'Phase', 'Formulation', 'Indication', 'PI', 'Enrolled', 'Target', 'Status', 'CTRI_Number'];
        rows = trials.map(t => [t.id, `"${t.shortTitle}"`, t.phase, t.formulation, `"${t.indication}"`, `"${t.pi}"`, t.enrolledParticipants, t.targetParticipants, t.status, t.ctriNumber]);
        break;

      case 'Participant Enrollment Report':
        headers = ['Participant_ID', 'Trial_ID', 'Site', 'Age', 'Gender', 'Prakriti', 'Dosha', 'Current_Visit', 'Status'];
        rows = participants.map(p => [p.id, p.trialId, `"${p.site}"`, p.age, p.gender, p.prakriti, `"${p.dosha}"`, `"${p.currentVisit}"`, p.status]);
        break;

      case 'Adverse Event Report':
      case 'SAE Report':
        headers = ['AE_ID', 'Participant_ID', 'Trial_ID', 'Description', 'Date', 'Severity', 'Is_Serious', 'Causality', 'Outcome'];
        const filtered = selectedReport === 'SAE Report' ? aes.filter(a => a.isSerious) : aes;
        rows = filtered.map(a => [a.id, a.participantId, a.trialId, `"${a.eventDescription}"`, a.date, a.severity, a.isSerious ? 'YES' : 'NO', a.causality, a.outcome]);
        break;

      case 'Site Performance Report':
        headers = ['Site_ID', 'Site_Name', 'State', 'PI', 'Enrolled', 'Target', 'Active_Trials', 'Site_Status'];
        rows = sites.map(s => [s.id, `"${s.name}"`, s.state, `"${s.pi}"`, s.participantsEnrolled, s.enrollmentTarget, s.activeTrialsCount, s.siteStatus]);
        break;

      default:
        headers = ['ID', 'Trial', 'Title', 'Status', 'Date'];
        rows = trials.map(t => [t.id, t.id, `"${t.shortTitle}"`, t.status, t.startDate]);
        break;
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(language === 'hi' ? `${getReportName(selectedReport)} CSV प्रारूप में निर्यात किया गया` : `Exported ${selectedReport} to CSV`, 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Breadcrumb & Header */}
      <div>
        <Breadcrumb currentTabKey="reports" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="w-6 h-6 text-emerald-600" />
              <span>{t('reportsCenterTitle')}</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('reportsSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>{t('printReport')}</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{t('exportCsv')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {reportDefinitions.map((item) => {
          const isSelected = selectedReport === item.type;
          return (
            <div
              key={item.type}
              onClick={() => {
                setSelectedReport(item.type);
                setReportGenerated(true);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-500/80 shadow-md ring-1 ring-emerald-500/40'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {item.icon}
                  </div>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {getReportName(item.type)}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                <span className="text-[10px] text-slate-400 font-medium">{language === 'hi' ? 'संकलन हेतु तैयार' : 'Ready for compilation'}</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">{language === 'hi' ? 'दस्तावेज़ चुनें' : 'Select Dossier'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Preview Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              {t('activeDossierCompilation')}
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-serif">
              {getReportName(selectedReport)}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'hi' ? `दिनांक ${new Date().toLocaleDateString('hi-IN')} को अखिल भारतीय आयुर्वेद संस्थान एवं आयुष मंत्रालय हेतु तैयार` : `Generated on ${new Date().toLocaleDateString()} for All India Institute of Ayurveda & Ministry of Ayush`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerateReport}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 transition-colors"
            >
              {t('refreshData')}
            </button>
            <button
              onClick={handleExportCsv}
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('downloadCsv')}</span>
            </button>
          </div>
        </div>

        {/* Dynamic preview content */}
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              <tr>
                <th className="px-4 py-3">{t('reportMetricId')}</th>
                <th className="px-4 py-3">{t('primaryCategory')}</th>
                <th className="px-4 py-3">{t('surveillanceParameters')}</th>
                <th className="px-4 py-3">{t('statusValue')}</th>
                <th className="px-4 py-3 text-right">{t('auditFlag')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {selectedReport === 'Trial Progress Report' && (
                <>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-800 dark:text-emerald-300">AYU-001</td>
                    <td className="px-4 py-3">{language === 'hi' ? 'मेटाबोलिक सिंड्रोम (चरण III)' : 'Metabolic Syndrome (Phase III)'}</td>
                    <td className="px-4 py-3">Guduchi-Katuki Compound Vati (500mg)</td>
                    <td className="px-4 py-3 font-bold">142/180 {language === 'hi' ? 'नामांकित' : 'Enrolled'} (78%)</td>
                    <td className="px-4 py-3 text-right text-emerald-600 font-bold">{language === 'hi' ? 'भर्ती जारी' : 'Recruiting'}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-800 dark:text-emerald-300">AYU-002</td>
                    <td className="px-4 py-3">{language === 'hi' ? 'संधिवात (ऑस्टियोआर्थराइटिस) (चरण II)' : 'Osteoarthritis (Phase II)'}</td>
                    <td className="px-4 py-3">Sallaki-Nirgundi Taila & Yogaraj Guggulu</td>
                    <td className="px-4 py-3 font-bold">98/120 {language === 'hi' ? 'नामांकित' : 'Enrolled'} (81%)</td>
                    <td className="px-4 py-3 text-right text-blue-600 font-bold">{t('statusActive')}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-800 dark:text-emerald-300">AYU-003</td>
                    <td className="px-4 py-3">{language === 'hi' ? 'संज्ञानात्मक स्वास्थ्य (स्मृति ह्रास) (चरण II)' : 'Cognitive Health (Phase II)'}</td>
                    <td className="px-4 py-3">Kalyanaka Ghrita & Medhya Extract</td>
                    <td className="px-4 py-3 font-bold">54/90 {language === 'hi' ? 'नामांकित' : 'Enrolled'} (60%)</td>
                    <td className="px-4 py-3 text-right text-emerald-600 font-bold">{language === 'hi' ? 'भर्ती जारी' : 'Recruiting'}</td>
                  </tr>
                </>
              )}

              {selectedReport === 'SAE Report' && (
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-rose-600">AE-2025-001</td>
                  <td className="px-4 py-3">{language === 'hi' ? 'प्रतिभागी' : 'Subject'} P-102 ({language === 'hi' ? 'परीक्षण' : 'Trial'} AYU-001)</td>
                  <td className="px-4 py-3">{language === 'hi' ? 'एंजियोएडेमा के साथ गंभीर तीव्र पित्ती (उर्टिकेरिया)' : 'Severe acute urticarial rash with angioedema'}</td>
                  <td className="px-4 py-3 font-bold text-rose-600">{language === 'hi' ? '24-घंटे रिपोर्टिंग सक्रिय' : '24-hr Reporting Active'}</td>
                  <td className="px-4 py-3 text-right text-rose-600 font-bold">{language === 'hi' ? 'गंभीर SAE' : 'SAE CRITICAL'}</td>
                </tr>
              )}

              {selectedReport !== 'Trial Progress Report' && selectedReport !== 'SAE Report' && (
                <>
                  <tr>
                    <td className="px-4 py-3 font-bold">{language === 'hi' ? 'समूह सारांश' : 'Cohort Summary'}</td>
                    <td className="px-4 py-3">{language === 'hi' ? 'बहु-केंद्रिक एकत्रीकरण' : 'Multi-centric Aggregation'}</td>
                    <td className="px-4 py-3">{language === 'hi' ? 'सभी भाग लेने वाले केंद्र एवं सक्रिय शाखाएं' : 'All participating centers & active arms'}</td>
                    <td className="px-4 py-3 font-bold">335 {language === 'hi' ? 'प्रतिभागी / 5 केंद्र' : 'Participants / 5 Sites'}</td>
                    <td className="px-4 py-3 text-right text-emerald-600 font-bold">{language === 'hi' ? 'सत्यापित' : 'Verified'}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold">{language === 'hi' ? 'GCP अनुपालन सूचकांक' : 'GCP Compliance Index'}</td>
                    <td className="px-4 py-3">{language === 'hi' ? 'भारतीय NDCT नियम 2019' : 'Indian NDCT Rules 2019'}</td>
                    <td className="px-4 py-3">{language === 'hi' ? 'IEC अनुमोदन एवं CTRI प्रकाशन' : 'IEC Approvals & CTRI publications'}</td>
                    <td className="px-4 py-3 font-bold">94.2% {language === 'hi' ? 'अनुरूपता' : 'Conformance'}</td>
                    <td className="px-4 py-3 text-right text-emerald-600 font-bold">{language === 'hi' ? 'स्वीकृत' : 'Cleared'}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

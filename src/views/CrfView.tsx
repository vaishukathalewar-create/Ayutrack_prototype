import React, { useState, useEffect } from 'react';
import { 
  ClipboardEdit, 
  CheckCircle2, 
  AlertCircle, 
  FileCode2, 
  Copy, 
  Database, 
  Activity, 
  Heart, 
  Layers, 
  Save, 
  Sparkles,
  Info,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { api } from '../services/api';
import { Participant, Prakriti, AyurvedicFormulation, ECrfRecord } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const CrfView: React.FC = () => {
  const { showToast, triggerRefresh, t, language } = useApp();
  const { currentUser, userRole } = useAuth();

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedPid, setSelectedPid] = useState<string>('P-101');

  // Form State
  const [visitName, setVisitName] = useState('Visit 3 (Week 4)');
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]);
  const [systolicBp, setSystolicBp] = useState<number>(118);
  const [diastolicBp, setDiastolicBp] = useState<number>(78);
  const [pulseRate, setPulseRate] = useState<number>(72);
  const [temperatureF, setTemperatureF] = useState<number>(98.4);
  const [symptoms, setSymptoms] = useState('Mild fatigue post-exertion, morning stiffness reduced.');
  const [prakriti, setPrakriti] = useState<Prakriti>('Vata-Pitta');
  const [doshaVata, setDoshaVata] = useState<number>(6);
  const [doshaPitta, setDoshaPitta] = useState<number>(7);
  const [doshaKapha, setDoshaKapha] = useState<number>(4);
  const [formulation, setFormulation] = useState<AyurvedicFormulation>('Vati');
  const [formulationName, setFormulationName] = useState('Guduchi-Katuki Compound Vati');
  const [doseMg, setDoseMg] = useState<number>(500);
  const [frequency, setFrequency] = useState('Twice daily after meals (Vyana-Samana Kala)');
  const [fastingSugar, setFastingSugar] = useState<number>(104);
  const [creatinine, setCreatinine] = useState<number>(0.9);
  const [investigatorComments, setInvestigatorComments] = useState('Tolerability confirmed. Dosha balance trending toward baseline.');
  const [namasteCode, setNamasteCode] = useState('NAM-PRM-2024-089');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [previewTab, setPreviewTab] = useState<'fhir' | 'cdisc'>('fhir');

  useEffect(() => {
    const list = storageService.getParticipants();
    setParticipants(list);
    const p = list.find(item => item.id === selectedPid);
    if (p) {
      setSystolicBp(p.vitals.systolicBp);
      setDiastolicBp(p.vitals.diastolicBp);
      setPulseRate(p.vitals.pulseRate);
      setTemperatureF(p.vitals.temperatureF);
      setPrakriti(p.prakriti);
      setFastingSugar(p.laboratory.fastingSugarMgDl);
      setCreatinine(p.laboratory.creatinineMgDl);
    }
  }, [selectedPid]);

  const handleSelectParticipant = (pid: string) => {
    setSelectedPid(pid);
    const p = participants.find(item => item.id === pid);
    if (p) {
      setSystolicBp(p.vitals.systolicBp);
      setDiastolicBp(p.vitals.diastolicBp);
      setPulseRate(p.vitals.pulseRate);
      setTemperatureF(p.vitals.temperatureF);
      setPrakriti(p.prakriti);
      setFastingSugar(p.laboratory.fastingSugarMgDl);
      setCreatinine(p.laboratory.creatinineMgDl);
      setFormulationName(p.recentFormulation || 'Guduchi-Katuki Compound Vati');
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!systolicBp || systolicBp < 60 || systolicBp > 250) {
      errs.systolicBp = language === 'hi' ? 'सिस्टोलिक रक्तचाप 60 से 250 mmHg के बीच होना चाहिए' : 'Systolic BP must be between 60 and 250 mmHg';
    }
    if (!diastolicBp || diastolicBp < 40 || diastolicBp > 150) {
      errs.diastolicBp = language === 'hi' ? 'डायस्टोलिक रक्तचाप 40 से 150 mmHg के बीच होना चाहिए' : 'Diastolic BP must be between 40 and 150 mmHg';
    }
    if (!pulseRate || pulseRate < 40 || pulseRate > 200) {
      errs.pulseRate = language === 'hi' ? 'नाड़ी गति 40 से 200 bpm के बीच होनी चाहिए' : 'Pulse rate must be between 40 and 200 bpm';
    }
    if (!temperatureF || temperatureF < 95 || temperatureF > 106) {
      errs.temperatureF = language === 'hi' ? 'तापमान 95 और 106 °F के बीच होना चाहिए' : 'Temperature must be between 95 and 106 °F';
    }
    if (!doseMg || doseMg < 1 || doseMg > 5000) {
      errs.doseMg = language === 'hi' ? 'खुराक 1 से 5000 मिलीग्राम के बीच होनी चाहिए' : 'Dose must be between 1 and 5000 mg';
    }
    if (!visitDate) {
      errs.visitDate = language === 'hi' ? 'विज़िट दिनांक आवश्यक है' : 'Visit date is required';
    }
    if (!formulationName.trim()) {
      errs.formulationName = language === 'hi' ? 'योग का नाम आवश्यक है' : 'Formulation name is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveCrf = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast(language === 'hi' ? 'सत्यापन विफल। कृपया हाइलाइट की गई सीमाओं को ठीक करें।' : 'Validation failed. Please correct highlighted clinical ranges.', 'error');
      return;
    }

    const currentP = participants.find(p => p.id === selectedPid);
    const crfRecord: ECrfRecord = {
      id: `CRF-${Date.now().toString().slice(-6)}`,
      participantId: selectedPid,
      trialId: currentP ? currentP.trialId : 'AYU-001',
      visitName,
      visitDate,
      systolicBp,
      diastolicBp,
      pulseRate,
      temperatureF,
      symptoms,
      prakriti,
      doshaVataScore: doshaVata,
      doshaPittaScore: doshaPitta,
      doshaKaphaScore: doshaKapha,
      formulation,
      formulationName,
      doseMg,
      frequency,
      labFastingSugar: fastingSugar,
      labCreatinine: creatinine,
      investigatorComments,
      namasteCode,
      savedAt: new Date().toISOString(),
      status: 'Submitted'
    };

    await api.saveCrfRecord(crfRecord, currentUser, userRole);
    setSavedSuccess(true);
    triggerRefresh();
    showToast(t('successfullySaved'), 'success');
  };

  // Standardized FHIR Representation Preview
  const fhirPreviewJson = {
    resourceType: "Bundle",
    type: "transaction",
    entry: [
      {
        resource: {
          resourceType: "ResearchSubject",
          id: selectedPid,
          identifier: [{ system: "https://ayutrack.aiia.gov.in/subjects", value: selectedPid }],
          status: "active",
          study: { reference: `ResearchStudy/${participants.find(p => p.id === selectedPid)?.trialId || 'AYU-001'}` },
          individual: { display: `Anonymous Research Subject (${prakriti} Prakriti)` }
        }
      },
      {
        resource: {
          resourceType: "Observation",
          id: `obs-bp-sys-${selectedPid}`,
          status: "final",
          category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/observation-category", code: "vital-signs" }] }],
          code: {
            coding: [{ system: "http://loinc.org", code: "8480-6", display: "Systolic Blood Pressure" }],
            text: "Systolic Blood Pressure"
          },
          subject: { reference: `ResearchSubject/${selectedPid}` },
          effectiveDateTime: `${visitDate}T09:30:00Z`,
          valueQuantity: {
            value: systolicBp,
            unit: "mmHg",
            system: "http://unitsofmeasure.org",
            code: "mm[Hg]"
          }
        }
      },
      {
        resource: {
          resourceType: "Observation",
          id: `obs-prakriti-${selectedPid}`,
          status: "final",
          code: {
            coding: [
              {
                system: "https://ayush.gov.in/namaste-terminology-placeholder",
                code: namasteCode,
                display: `Ayurveda Prakriti Assessment: ${prakriti}`
              }
            ]
          },
          subject: { reference: `ResearchSubject/${selectedPid}` },
          valueString: prakriti,
          component: [
            { code: { text: "Vata Score" }, valueInteger: doshaVata },
            { code: { text: "Pitta Score" }, valueInteger: doshaPitta },
            { code: { text: "Kapha Score" }, valueInteger: doshaKapha }
          ]
        }
      },
      {
        resource: {
          resourceType: "MedicationStatement",
          id: `med-${selectedPid}`,
          status: "active",
          medicationCodeableConcept: {
            coding: [{ system: "https://ayush.gov.in/ayurvedic-pharmacopoeia", code: formulation, display: formulationName }],
            text: formulationName
          },
          subject: { reference: `ResearchSubject/${selectedPid}` },
          dosage: [
            {
              doseAndRate: [{ doseQuantity: { value: doseMg, unit: "mg", system: "http://unitsofmeasure.org", code: "mg" } }],
              text: frequency
            }
          ]
        }
      }
    ]
  };

  // CDISC SDTM Representation Preview
  const cdiscPreviewJson = {
    standard: "CDISC SDTM v3.3",
    studyId: participants.find(p => p.id === selectedPid)?.trialId || "AYU-001",
    domains: {
      DM: {
        domain: "Demographics",
        USUBJID: `${participants.find(p => p.id === selectedPid)?.trialId}-${selectedPid}`,
        SUBJID: selectedPid,
        AGE: participants.find(p => p.id === selectedPid)?.age,
        SEX: participants.find(p => p.id === selectedPid)?.gender?.charAt(0),
        ARM: participants.find(p => p.id === selectedPid)?.treatmentGroup,
        AYU_PRAKRITI: prakriti
      },
      VS: [
        {
          domain: "Vital Signs",
          VSTESTCD: "SYSBP",
          VSTEST: "Systolic Blood Pressure",
          VSORRES: String(systolicBp),
          VSORRESU: "mmHg",
          VISIT: visitName,
          VSDTC: visitDate
        },
        {
          domain: "Vital Signs",
          VSTESTCD: "DIABP",
          VSTEST: "Diastolic Blood Pressure",
          VSORRES: String(diastolicBp),
          VSORRESU: "mmHg",
          VISIT: visitName,
          VSDTC: visitDate
        },
        {
          domain: "Vital Signs",
          VSTESTCD: "PULSE",
          VSTEST: "Pulse Rate",
          VSORRES: String(pulseRate),
          VSORRESU: "beats/min",
          VISIT: visitName,
          VSDTC: visitDate
        }
      ],
      CM: {
        domain: "Concomitant / Trial Medications",
        CMTRT: formulationName,
        CMDOSE: doseMg,
        CMDOSU: "mg",
        CMDOSFRQ: frequency,
        CMROUTE: "ORAL",
        AYU_KAL: "Vyana-Samana"
      }
    }
  };

  const handleCopyJson = (content: object) => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    showToast(language === 'hi' ? 'इंटरऑपरेबिलिटी पेलोड क्लिपबोर्ड पर कॉपी किया गया' : 'Interoperability payload copied to clipboard', 'info');
  };

  return (
    <div className="space-y-6">
      
      {/* Breadcrumb & Header */}
      <div>
        <Breadcrumb currentTabKey="ecrf" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ClipboardEdit className="w-6 h-6 text-emerald-600" />
              <span>{t('ecrfTitle')}</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('ecrfSubtitle')}
            </p>
          </div>

          {/* Participant Switcher Dropdown */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs text-slate-500 font-semibold">{t('selectParticipant')}:</span>
            <select
              value={selectedPid}
              onChange={e => handleSelectParticipant(e.target.value)}
              className="bg-transparent text-xs font-bold text-emerald-800 dark:text-emerald-300 focus:outline-none"
            >
              {participants.map(p => (
                <option key={p.id} value={p.id} className="text-slate-900 dark:text-slate-100">
                  {p.id} — {p.trialId} ({p.prakriti})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Save Success Notice */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                {t('successfullySaved')}
              </p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                {language === 'hi' ? `प्रतिभागी ${selectedPid} का डेटा सफलतापूर्वक दर्ज हुआ। नीचे FHIR एवं CDISC मॉडल अपडेट हो गए हैं।` : `Data for subject ${selectedPid} stored to local ledger. Interoperability payload updated in FHIR and CDISC views below.`}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSavedSuccess(false)}
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            {t('close')}
          </button>
        </div>
      )}

      {/* Main Form & Interoperability Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 space-y-6">
          
          <form onSubmit={handleSaveCrf} className="space-y-6">
            
            {/* Section 1: Participant & Visit Information */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>1. {t('visitInformation')}</span>
                </h3>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {selectedPid}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'विज़िट चरण *' : 'Visit Stage *'}
                  </label>
                  <select
                    value={visitName}
                    onChange={e => setVisitName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium"
                  >
                    <option value="Screening & Baseline">{language === 'hi' ? 'स्क्रीनिंग एवं बेसलाइन (दिन 0)' : 'Screening & Baseline (Day 0)'}</option>
                    <option value="Visit 1 (Day 7)">{language === 'hi' ? 'विज़िट 1 (दिन 7)' : 'Visit 1 (Day 7)'}</option>
                    <option value="Visit 2 (Week 2)">{language === 'hi' ? 'विज़िट 2 (सप्ताह 2)' : 'Visit 2 (Week 2)'}</option>
                    <option value="Visit 3 (Week 4)">{language === 'hi' ? 'विज़िट 3 (सप्ताह 4)' : 'Visit 3 (Week 4)'}</option>
                    <option value="Visit 4 (Week 8)">{language === 'hi' ? 'विज़िट 4 (सप्ताह 8)' : 'Visit 4 (Week 8)'}</option>
                    <option value="Final Visit (Week 12)">{language === 'hi' ? 'अंतिम विज़िट (सप्ताह 12)' : 'Final Visit (Week 12)'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'विज़िट दिनांक *' : 'Visit Date *'}
                  </label>
                  <input
                    type="date"
                    value={visitDate}
                    onChange={e => setVisitDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  />
                  {errors.visitDate && <span className="text-[10px] text-rose-500">{errors.visitDate}</span>}
                </div>
              </div>
            </div>

            {/* Section 2: Vital Signs with Range Validation */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2. {t('vitalSignsAssessment')}</span>
                </h3>
                <span className="text-[10px] text-slate-400">BP 60-250 / Pulse 40-200</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('systolicBp')} (mmHg) *
                  </label>
                  <input
                    type="number"
                    value={systolicBp}
                    onChange={e => setSystolicBp(parseInt(e.target.value) || 0)}
                    min={60}
                    max={250}
                    className={`w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border ${
                      errors.systolicBp ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                    } text-slate-900 dark:text-slate-100 font-mono`}
                  />
                  {errors.systolicBp && <span className="text-[10px] text-rose-500">{errors.systolicBp}</span>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('diastolicBp')} (mmHg) *
                  </label>
                  <input
                    type="number"
                    value={diastolicBp}
                    onChange={e => setDiastolicBp(parseInt(e.target.value) || 0)}
                    min={40}
                    max={150}
                    className={`w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border ${
                      errors.diastolicBp ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                    } text-slate-900 dark:text-slate-100 font-mono`}
                  />
                  {errors.diastolicBp && <span className="text-[10px] text-rose-500">{errors.diastolicBp}</span>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('pulseRate')} (bpm) *
                  </label>
                  <input
                    type="number"
                    value={pulseRate}
                    onChange={e => setPulseRate(parseInt(e.target.value) || 0)}
                    min={40}
                    max={200}
                    className={`w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border ${
                      errors.pulseRate ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                    } text-slate-900 dark:text-slate-100 font-mono`}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('temperature')}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={temperatureF}
                    onChange={e => setTemperatureF(parseFloat(e.target.value) || 98.6)}
                    min={95}
                    max={106}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Ayurvedic Assessment (Prakriti & Dosha) */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>3. {t('ayurvedicDoshaAssessment')}</span>
                </h3>
                <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">{t('prakritiFilter')} & Dosha Matrix</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('prakritiFilter')}
                  </label>
                  <select
                    value={prakriti}
                    onChange={e => setPrakriti(e.target.value as Prakriti)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-semibold"
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

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('namasteCode')}
                  </label>
                  <input
                    type="text"
                    value={namasteCode}
                    onChange={e => setNamasteCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>
              </div>

              {/* Dosha Balance Intensity Sliders (1 to 10) */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  {language === 'hi' ? 'दोष प्रकोप अंक (1 सामान्य - 10 तीव्र प्रकोप)' : 'Dosha Agitation Scores (1 Normal - 10 Severe Aggravation)'}
                </p>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-blue-700 dark:text-blue-300 font-bold mb-1">
                      <span>Vata</span>
                      <span>{doshaVata}/10</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={doshaVata}
                      onChange={e => setDoshaVata(parseInt(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-rose-700 dark:text-rose-300 font-bold mb-1">
                      <span>Pitta</span>
                      <span>{doshaPitta}/10</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={doshaPitta}
                      onChange={e => setDoshaPitta(parseInt(e.target.value))}
                      className="w-full accent-rose-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-emerald-700 dark:text-emerald-300 font-bold mb-1">
                      <span>Kapha</span>
                      <span>{doshaKapha}/10</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={doshaKapha}
                      onChange={e => setDoshaKapha(parseInt(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Ayurvedic Treatment & Dose (Validation 1-5000 mg) */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-teal-600" />
                  <span>4. {t('investigationalFormulation')}</span>
                </h3>
                <span className="text-[10px] text-slate-400">1–5000 mg</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'औषधि श्रेणी' : 'Formulation Category'}
                  </label>
                  <select
                    value={formulation}
                    onChange={e => setFormulation(e.target.value as AyurvedicFormulation)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
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
                    {language === 'hi' ? 'योग का नाम *' : 'Formulation Name *'}
                  </label>
                  <input
                    type="text"
                    value={formulationName}
                    onChange={e => setFormulationName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  />
                  {errors.formulationName && <span className="text-[10px] text-rose-500">{errors.formulationName}</span>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('dosageMg')} *
                  </label>
                  <input
                    type="number"
                    value={doseMg}
                    onChange={e => setDoseMg(parseInt(e.target.value) || 0)}
                    min={1}
                    max={5000}
                    className={`w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border ${
                      errors.doseMg ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                    } text-slate-900 dark:text-slate-100 font-mono`}
                  />
                  {errors.doseMg && <span className="text-[10px] text-rose-500">{errors.doseMg}</span>}
                </div>
              </div>

              <div className="mt-3">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 text-xs">
                  {t('dosageFrequency')}
                </label>
                <input
                  type="text"
                  value={frequency}
                  onChange={e => setFrequency(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs"
                />
              </div>
            </div>

            {/* Section 5: Lab Observations & Investigator Comments */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  5. {t('labObservations')} & {t('investigatorRemarks')}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('fastingSugar')} (mg/dL)
                  </label>
                  <input
                    type="number"
                    value={fastingSugar}
                    onChange={e => setFastingSugar(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('creatinine')} (mg/dL)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={creatinine}
                    onChange={e => setCreatinine(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 text-xs">
                  {t('investigatorRemarks')}
                </label>
                <textarea
                  value={investigatorComments}
                  onChange={e => setInvestigatorComments(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/20 flex items-center gap-2 transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>{t('submitEcrf')}</span>
              </button>
            </div>

          </form>

        </div>

        {/* Right Interoperability Standard Previews (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-slate-950 text-slate-200 rounded-3xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-full">
            
            {/* Tab Header: FHIR vs CDISC */}
            <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white tracking-wide uppercase">
                  {language === 'hi' ? 'मानकीकृत अंतर-संचालनीयता' : 'Interoperability Mapping'}
                </span>
              </div>

              <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-[11px]">
                <button
                  type="button"
                  onClick={() => setPreviewTab('fhir')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                    previewTab === 'fhir' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  HL7 FHIR R4
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('cdisc')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                    previewTab === 'cdisc' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  CDISC SDTM
                </button>
              </div>
            </div>

            {/* Prototype Interoperability Notice */}
            <div className="p-3 bg-amber-950/30 border-b border-amber-900/40 text-[11px] text-amber-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>
                <strong>{language === 'hi' ? 'प्रोटोटाइप प्रदर्शन:' : 'PROTOTYPE REPRESENTATION:'}</strong> {language === 'hi' ? 'आयु-ट्रैक अनुसंधान एकीकरण के लिए गतिशील रूप से उत्पन्न FHIR और CDISC SDTM स्कीमा।' : 'Standardized FHIR and CDISC SDTM schemas generated dynamically for AyuTrack research integration. Not a certified production interoperability server.'}
              </p>
            </div>

            {/* Code Body */}
            <div className="p-4 flex-1 overflow-x-auto font-mono text-[11px] leading-relaxed text-emerald-400 max-h-[550px] overflow-y-auto">
              {previewTab === 'fhir' ? (
                <pre>{JSON.stringify(fhirPreviewJson, null, 2)}</pre>
              ) : (
                <pre>{JSON.stringify(cdiscPreviewJson, null, 2)}</pre>
              )}
            </div>

            {/* Footer with Copy */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                {previewTab === 'fhir' ? 'HL7 FHIR Observation / Subject' : 'CDISC SDTM DM/VS/CM Domains'}
              </span>
              <button
                type="button"
                onClick={() => handleCopyJson(previewTab === 'fhir' ? fhirPreviewJson : cdiscPreviewJson)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 font-medium transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('copyJson')}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

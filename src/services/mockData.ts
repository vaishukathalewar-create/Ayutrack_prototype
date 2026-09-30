import { ClinicalTrial, Participant, AdverseEvent, ResearchSite, RegulatoryTask, NotificationItem, AuditLog } from '../types';

export const INITIAL_TRIALS: ClinicalTrial[] = [
  {
    id: 'AYU-001',
    title: 'Efficacy and Safety of Standardized Guduchi & Katuki Vati in Metabolic Syndrome: A Multicentric Double-Blind RCT',
    shortTitle: 'Ayurveda Metabolic Syndrome Study (AYUSH-MET)',
    phase: 'Phase III',
    studyType: 'Interventional Randomized Controlled Trial',
    formulation: 'Vati',
    formulationName: 'Guduchi-Katuki Compound Vati (500mg)',
    indication: 'Metabolic Syndrome & Impaired Fasting Glucose (Prameha)',
    pi: 'Prof. (Dr.) Tanuja Nesari',
    sponsor: 'All India Institute of Ayurveda (AIIA) / Ministry of Ayush',
    startDate: '2025-04-15',
    endDate: '2026-12-31',
    targetParticipants: 180,
    enrolledParticipants: 142,
    participatingSites: ['AIIA New Delhi', 'Site A (IPGTRA Jamnagar)', 'Site B (NIA Jaipur)'],
    ethicsStatus: 'Approved',
    ctriNumber: 'CTRI/2025/04/074821',
    ndctComplianceStatus: 'Compliant',
    status: 'Recruiting',
    namasteCode: 'NAM-PRM-2024-089',
    summary: 'Investigating glycemic regulation, lipid panel modulation, and systemic inflammatory reduction under classic Ayurveda rasayana principles.'
  },
  {
    id: 'AYU-002',
    title: 'Clinical Evaluation of Sallaki-Nirgundi Taila and Yogaraj Guggulu in Primary Knee Osteoarthritis (Sandhigata Vata)',
    shortTitle: 'Herbal Formulation Safety in Sandhigata Vata',
    phase: 'Phase II',
    studyType: 'Parallel Group Randomized Clinical Trial',
    formulation: 'Taila',
    formulationName: 'Sallaki-Nirgundi Taila & Yogaraj Guggulu Vati',
    indication: 'Knee Osteoarthritis / Joint Degeneration (Sandhigata Vata)',
    pi: 'Dr. Anup Thakar',
    sponsor: 'Central Council for Research in Ayurvedic Sciences (CCRAS)',
    startDate: '2025-06-01',
    endDate: '2026-08-30',
    targetParticipants: 120,
    enrolledParticipants: 98,
    participatingSites: ['Site A (IPGTRA Jamnagar)', 'Site B (NIA Jaipur)', 'Site C (Podar Mumbai)'],
    ethicsStatus: 'Approved',
    ctriNumber: 'CTRI/2025/06/078912',
    ndctComplianceStatus: 'Compliant',
    status: 'Active',
    namasteCode: 'NAM-VAT-2025-014',
    summary: 'Assessment of WOMAC pain index reduction, mobility restoration, and systemic safety markers across 16 weeks.'
  },
  {
    id: 'AYU-003',
    title: 'Ashwagandha-Brahmi Medhya Rasayana Synergy in Mild Cognitive Impairment: A Placebo-Controlled Trial',
    shortTitle: 'Integrative Ayurveda Cognitive Health Trial',
    phase: 'Phase II',
    studyType: 'Double-Blind Placebo-Controlled Study',
    formulation: 'Ghrita',
    formulationName: 'Kalyanaka Ghrita & Medhya Compound Extract',
    indication: 'Age-Related Cognitive Decline / Smriti Bhramsha',
    pi: 'Dr. Sanjeev Sharma',
    sponsor: 'National Institute of Ayurveda (NIA) & AIIA Collaborative',
    startDate: '2025-08-10',
    endDate: '2027-02-28',
    targetParticipants: 90,
    enrolledParticipants: 54,
    participatingSites: ['AIIA New Delhi', 'Site C (Podar Mumbai)'],
    ethicsStatus: 'Approved',
    ctriNumber: 'CTRI/2025/08/081240',
    ndctComplianceStatus: 'Compliant',
    status: 'Recruiting',
    namasteCode: 'NAM-MED-2025-042',
    summary: 'Evaluating neuro-protective, cognitive, and stress-coping biomarkers using neuropsychological batteries and fMRI indices.'
  },
  {
    id: 'AYU-004',
    title: 'Comparative Trial of Manjishtadi Kwatha vs Conventional Regimen in Chronic Plaque Dermatitis (Kushtha)',
    shortTitle: 'Ayurveda Dermatological Safety Study',
    phase: 'Phase I',
    studyType: 'Early Clinical Safety & Tolerability Study',
    formulation: 'Kwatha',
    formulationName: 'Maha-Manjishtadi Kwatha Decoction (40ml)',
    indication: 'Chronic Inflammatory Skin Disorders (Vicharchika / Kitibha)',
    pi: 'Dr. M. S. Deepa',
    sponsor: 'Government Ayurveda Research Institute & AIIA',
    startDate: '2025-10-01',
    endDate: '2026-11-15',
    targetParticipants: 60,
    enrolledParticipants: 41,
    participatingSites: ['Site D (Govt Ayurveda College Kerala)', 'AIIA New Delhi'],
    ethicsStatus: 'Pending',
    ctriNumber: 'CTRI/2025/09/083119',
    ndctComplianceStatus: 'Document Required',
    status: 'Paused',
    namasteCode: 'NAM-KUS-2025-067',
    summary: 'Hepato-renal safety and PASI index improvement in treatment-resistant cases.'
  }
];

export const INITIAL_PARTICIPANTS: Participant[] = [
  {
    id: 'P-101',
    trialId: 'AYU-001',
    site: 'AIIA New Delhi',
    age: 48,
    gender: 'Male',
    prakriti: 'Vata-Pitta',
    dosha: 'Pitta-Kapha Aggravation',
    enrollmentDate: '2025-09-12',
    currentVisit: 'Visit 3 (Week 4)',
    treatmentGroup: 'Active Herbal Arm',
    status: 'Enrolled',
    vitals: {
      systolicBp: 118,
      diastolicBp: 78,
      pulseRate: 72,
      temperatureF: 98.4,
      weightKg: 74.2
    },
    laboratory: {
      fastingSugarMgDl: 104,
      hba1c: 6.2,
      creatinineMgDl: 0.9,
      sgotUPerL: 24,
      sgptUPerL: 26
    },
    eCrfStatus: 'Verified',
    recentFormulation: 'Guduchi-Katuki Compound Vati (500mg)',
    visitTimeline: [
      { visitName: 'Screening & Baseline', date: '2025-09-12', completed: true, notes: 'Eligible. Informed consent signed in Hindi.' },
      { visitName: 'Visit 1 (Day 7)', date: '2025-09-19', completed: true, notes: 'Good tolerability, no GI upset reported.' },
      { visitName: 'Visit 2 (Week 2)', date: '2025-09-26', completed: true, notes: 'Fasting glucose down by 8 mg/dL.' },
      { visitName: 'Visit 3 (Week 4)', date: '2025-10-10', completed: true, notes: 'Vital signs stable. Dosha assessment re-checked.' },
      { visitName: 'Visit 4 (Week 8)', date: '2025-11-07', completed: false },
      { visitName: 'Final Visit (Week 12)', date: '2025-12-05', completed: false }
    ]
  },
  {
    id: 'P-102',
    trialId: 'AYU-001',
    site: 'AIIA New Delhi',
    age: 52,
    gender: 'Female',
    prakriti: 'Pitta',
    dosha: 'Pitta-Vata Imbalance',
    enrollmentDate: '2025-09-15',
    currentVisit: 'Visit 2 (Week 2)',
    treatmentGroup: 'Active Herbal Arm',
    status: 'In Follow-up',
    vitals: {
      systolicBp: 132,
      diastolicBp: 86,
      pulseRate: 88,
      temperatureF: 99.8,
      weightKg: 68.0
    },
    laboratory: {
      fastingSugarMgDl: 118,
      hba1c: 6.8,
      creatinineMgDl: 1.1,
      sgotUPerL: 42,
      sgptUPerL: 46
    },
    eCrfStatus: 'Pending Review',
    recentFormulation: 'Guduchi-Katuki Compound Vati (500mg)',
    visitTimeline: [
      { visitName: 'Screening & Baseline', date: '2025-09-15', completed: true, notes: 'Pitta prakriti documented. Baseline ECG normal.' },
      { visitName: 'Visit 1 (Day 7)', date: '2025-09-22', completed: true, notes: 'Mild pruritus reported on arms.' },
      { visitName: 'Visit 2 (Week 2)', date: '2025-09-29', completed: true, notes: 'Severe generalized urticarial rash developed. Investigated for SAE.' },
      { visitName: 'Safety Review Visit', date: '2025-10-02', completed: false }
    ]
  },
  {
    id: 'P-103',
    trialId: 'AYU-002',
    site: 'Site A (IPGTRA Jamnagar)',
    age: 61,
    gender: 'Female',
    prakriti: 'Vata',
    dosha: 'Severe Vata Sthana Dusti',
    enrollmentDate: '2025-08-01',
    currentVisit: 'Visit 4 (Week 8)',
    treatmentGroup: 'Active Herbal Arm',
    status: 'In Follow-up',
    vitals: {
      systolicBp: 126,
      diastolicBp: 80,
      pulseRate: 74,
      temperatureF: 98.2,
      weightKg: 62.5
    },
    laboratory: {
      fastingSugarMgDl: 96,
      hba1c: 5.6,
      creatinineMgDl: 0.8,
      sgotUPerL: 20,
      sgptUPerL: 22
    },
    eCrfStatus: 'Verified',
    recentFormulation: 'Sallaki-Nirgundi Taila & Yogaraj Guggulu',
    visitTimeline: [
      { visitName: 'Screening', date: '2025-08-01', completed: true },
      { visitName: 'Visit 1 (Week 2)', date: '2025-08-15', completed: true },
      { visitName: 'Visit 2 (Week 4)', date: '2025-08-29', completed: true },
      { visitName: 'Visit 3 (Week 6)', date: '2025-09-12', completed: true },
      { visitName: 'Visit 4 (Week 8)', date: '2025-09-26', completed: true, notes: 'Marked reduction in knee crepitus.' }
    ]
  },
  {
    id: 'P-104',
    trialId: 'AYU-002',
    site: 'Site B (NIA Jaipur)',
    age: 57,
    gender: 'Male',
    prakriti: 'Vata-Kapha',
    dosha: 'Kapha-Vata Sannipata',
    enrollmentDate: '2025-07-10',
    currentVisit: 'Completed (Week 16)',
    treatmentGroup: 'Standard Care Arm',
    status: 'Completed',
    vitals: {
      systolicBp: 120,
      diastolicBp: 78,
      pulseRate: 70,
      temperatureF: 98.6,
      weightKg: 79.1
    },
    laboratory: {
      fastingSugarMgDl: 101,
      hba1c: 5.8,
      creatinineMgDl: 0.9,
      sgotUPerL: 28,
      sgptUPerL: 30
    },
    eCrfStatus: 'Submitted',
    recentFormulation: 'Yogaraj Guggulu',
    visitTimeline: [
      { visitName: 'Baseline', date: '2025-07-10', completed: true },
      { visitName: 'Midpoint (Week 8)', date: '2025-09-04', completed: true },
      { visitName: 'Exit Visit (Week 16)', date: '2025-10-30', completed: true, notes: 'Protocol completed successfully.' }
    ]
  },
  {
    id: 'P-105',
    trialId: 'AYU-003',
    site: 'Site C (Podar Mumbai)',
    age: 69,
    gender: 'Female',
    prakriti: 'Tridosha',
    dosha: 'Vata Dominant',
    enrollmentDate: '2025-09-02',
    currentVisit: 'Visit 1 (Week 2)',
    treatmentGroup: 'Active Herbal Arm',
    status: 'Enrolled',
    vitals: {
      systolicBp: 128,
      diastolicBp: 82,
      pulseRate: 68,
      temperatureF: 98.4,
      weightKg: 55.4
    },
    laboratory: {
      fastingSugarMgDl: 92,
      hba1c: 5.5,
      creatinineMgDl: 0.7,
      sgotUPerL: 18,
      sgptUPerL: 19
    },
    eCrfStatus: 'Submitted',
    recentFormulation: 'Kalyanaka Ghrita (10g daily)',
    visitTimeline: [
      { visitName: 'Screening', date: '2025-09-02', completed: true },
      { visitName: 'Visit 1 (Week 2)', date: '2025-09-16', completed: true }
    ]
  },
  {
    id: 'P-106',
    trialId: 'AYU-001',
    site: 'Site A (IPGTRA Jamnagar)',
    age: 44,
    gender: 'Male',
    prakriti: 'Kapha',
    dosha: 'Kapha-Medo Vriddhi',
    enrollmentDate: '2025-09-18',
    currentVisit: 'Visit 1 (Day 7)',
    treatmentGroup: 'Placebo/Control',
    status: 'Enrolled',
    vitals: {
      systolicBp: 138,
      diastolicBp: 88,
      pulseRate: 76,
      temperatureF: 98.6,
      weightKg: 88.2
    },
    laboratory: {
      fastingSugarMgDl: 126,
      hba1c: 7.1,
      creatinineMgDl: 1.0,
      sgotUPerL: 32,
      sgptUPerL: 35
    },
    eCrfStatus: 'Draft',
    recentFormulation: 'Matching Placebo Vati',
    visitTimeline: [
      { visitName: 'Screening', date: '2025-09-18', completed: true },
      { visitName: 'Visit 1 (Day 7)', date: '2025-09-25', completed: true }
    ]
  },
  {
    id: 'P-107',
    trialId: 'AYU-003',
    site: 'AIIA New Delhi',
    age: 65,
    gender: 'Male',
    prakriti: 'Pitta-Kapha',
    dosha: 'Sadhaka Pitta & Prana Vata Ksobha',
    enrollmentDate: '2025-08-20',
    currentVisit: 'Visit 2 (Week 4)',
    treatmentGroup: 'Active Herbal Arm',
    status: 'In Follow-up',
    vitals: {
      systolicBp: 122,
      diastolicBp: 76,
      pulseRate: 72,
      temperatureF: 98.3,
      weightKg: 71.0
    },
    laboratory: {
      fastingSugarMgDl: 98,
      hba1c: 5.7,
      creatinineMgDl: 0.9,
      sgotUPerL: 22,
      sgptUPerL: 24
    },
    eCrfStatus: 'Verified',
    recentFormulation: 'Medhya Compound Extract',
    visitTimeline: [
      { visitName: 'Screening', date: '2025-08-20', completed: true },
      { visitName: 'Visit 1', date: '2025-09-03', completed: true },
      { visitName: 'Visit 2', date: '2025-09-17', completed: true }
    ]
  },
  {
    id: 'P-108',
    trialId: 'AYU-004',
    site: 'Site D (Govt Ayurveda College Kerala)',
    age: 39,
    gender: 'Female',
    prakriti: 'Pitta',
    dosha: 'Rakta-Pitta Dusti',
    enrollmentDate: '2025-10-02',
    currentVisit: 'Baseline',
    treatmentGroup: 'Active Herbal Arm',
    status: 'Enrolled',
    vitals: {
      systolicBp: 114,
      diastolicBp: 74,
      pulseRate: 78,
      temperatureF: 98.7,
      weightKg: 58.0
    },
    laboratory: {
      fastingSugarMgDl: 88,
      hba1c: 5.3,
      creatinineMgDl: 0.7,
      sgotUPerL: 20,
      sgptUPerL: 18
    },
    eCrfStatus: 'Submitted',
    recentFormulation: 'Maha-Manjishtadi Kwatha',
    visitTimeline: [
      { visitName: 'Baseline', date: '2025-10-02', completed: true }
    ]
  }
];

export const INITIAL_ADVERSE_EVENTS: AdverseEvent[] = [
  {
    id: 'AE-2025-001',
    participantId: 'P-102',
    trialId: 'AYU-001',
    site: 'AIIA New Delhi',
    eventDescription: 'Severe acute generalized urticarial rash with angioedema',
    date: '2025-09-29',
    severity: 'Severe',
    isSerious: true,
    outcome: 'Recovering',
    actionTaken: 'Drug Withdrawn',
    causality: 'Probable/Likely',
    reportedBy: 'Dr. Tanuja Nesari',
    reportedAt: '2025-09-29T14:30:00Z',
    // Set 24-hour deadline 18 hours from now for interactive live timer demo!
    countdownDeadline: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
    notificationStatus: {
      ethicsCommittee: 'Notified',
      regulatoryAuthority: 'Pending',
      sponsor: 'Notified'
    }
  },
  {
    id: 'AE-2025-002',
    participantId: 'P-106',
    trialId: 'AYU-001',
    site: 'Site A (IPGTRA Jamnagar)',
    eventDescription: 'Mild transient nausea following morning dose',
    date: '2025-09-26',
    severity: 'Mild',
    isSerious: false,
    outcome: 'Recovered',
    actionTaken: 'Dose Interrupted',
    causality: 'Possible',
    reportedBy: 'Dr. Anup Thakar',
    reportedAt: '2025-09-26T10:15:00Z',
    notificationStatus: {
      ethicsCommittee: 'Notified',
      regulatoryAuthority: 'Acknowledged',
      sponsor: 'Acknowledged'
    }
  },
  {
    id: 'AE-2025-003',
    participantId: 'P-103',
    trialId: 'AYU-002',
    site: 'Site A (IPGTRA Jamnagar)',
    eventDescription: 'Moderate localized pruritus and erythema at topical application site',
    date: '2025-08-25',
    severity: 'Moderate',
    isSerious: false,
    outcome: 'Recovered',
    actionTaken: 'Dose Reduced',
    causality: 'Certain',
    reportedBy: 'Dr. Anup Thakar',
    reportedAt: '2025-08-25T16:00:00Z',
    notificationStatus: {
      ethicsCommittee: 'Notified',
      regulatoryAuthority: 'Acknowledged',
      sponsor: 'Acknowledged'
    }
  },
  {
    id: 'AE-2025-004',
    participantId: 'P-107',
    trialId: 'AYU-003',
    site: 'AIIA New Delhi',
    eventDescription: 'Mild sleepiness and sedation after afternoon dose',
    date: '2025-09-10',
    severity: 'Mild',
    isSerious: false,
    outcome: 'Recovered',
    actionTaken: 'Concomitant Therapy',
    causality: 'Unlikely',
    reportedBy: 'Dr. Sanjeev Sharma',
    reportedAt: '2025-09-10T11:20:00Z',
    notificationStatus: {
      ethicsCommittee: 'Notified',
      regulatoryAuthority: 'Acknowledged',
      sponsor: 'Acknowledged'
    }
  },
  {
    id: 'AE-2025-005',
    participantId: 'P-101',
    trialId: 'AYU-001',
    site: 'AIIA New Delhi',
    eventDescription: 'Mild abdominal discomfort with bitter taste (Katuki induced)',
    date: '2025-09-20',
    severity: 'Mild',
    isSerious: false,
    outcome: 'Recovered',
    actionTaken: 'None',
    causality: 'Certain',
    reportedBy: 'Dr. Tanuja Nesari',
    reportedAt: '2025-09-20T09:45:00Z',
    notificationStatus: {
      ethicsCommittee: 'Notified',
      regulatoryAuthority: 'Acknowledged',
      sponsor: 'Acknowledged'
    }
  }
];

export const INITIAL_SITES: ResearchSite[] = [
  {
    id: 'SITE-01',
    name: 'AIIA New Delhi',
    state: 'Delhi (NCT)',
    city: 'New Delhi',
    pi: 'Prof. (Dr.) Tanuja Nesari',
    activeTrialsCount: 3,
    participantsEnrolled: 112,
    enrollmentTarget: 150,
    ethicsStatus: 'Approved',
    siteStatus: 'Active',
    contactEmail: 'ctms.aiia@gov.in'
  },
  {
    id: 'SITE-02',
    name: 'Site A (IPGTRA Jamnagar)',
    state: 'Gujarat',
    city: 'Jamnagar',
    pi: 'Prof. (Dr.) Anup Thakar',
    activeTrialsCount: 2,
    participantsEnrolled: 84,
    enrollmentTarget: 100,
    ethicsStatus: 'Approved',
    siteStatus: 'Active',
    contactEmail: 'research.ipgtra@gov.in'
  },
  {
    id: 'SITE-03',
    name: 'Site B (NIA Jaipur)',
    state: 'Rajasthan',
    city: 'Jaipur',
    pi: 'Prof. Sanjeev Sharma',
    activeTrialsCount: 2,
    participantsEnrolled: 68,
    enrollmentTarget: 90,
    ethicsStatus: 'Approved',
    siteStatus: 'Active',
    contactEmail: 'nia.clinicaltrials@gov.in'
  },
  {
    id: 'SITE-04',
    name: 'Site C (Podar Ayurveda Mumbai)',
    state: 'Maharashtra',
    city: 'Mumbai',
    pi: 'Dr. Sunita Kulkarni',
    activeTrialsCount: 2,
    participantsEnrolled: 52,
    enrollmentTarget: 75,
    ethicsStatus: 'Approved',
    siteStatus: 'Active',
    contactEmail: 'trials.podar@ayush.gov.in'
  },
  {
    id: 'SITE-05',
    name: 'Site D (Govt Ayurveda College Kerala)',
    state: 'Kerala',
    city: 'Thiruvananthapuram',
    pi: 'Dr. M. S. Deepa',
    activeTrialsCount: 1,
    participantsEnrolled: 41,
    enrollmentTarget: 60,
    ethicsStatus: 'Pending',
    siteStatus: 'Audit Scheduled',
    contactEmail: 'clinical.gactvm@kerala.gov.in'
  }
];

export const INITIAL_REGULATORY_TASKS: RegulatoryTask[] = [
  {
    id: 'REG-001',
    task: 'Ethics Committee Annual Renewal for AYU-001',
    trialId: 'AYU-001',
    category: 'Ethics Committee Approval',
    responsiblePerson: 'Dr. Tanuja Nesari',
    dueDate: '2026-04-14',
    status: 'Approved'
  },
  {
    id: 'REG-002',
    task: 'CTRI Six-Monthly Recruitment & Status Upload',
    trialId: 'AYU-001',
    category: 'CTRI Registration',
    responsiblePerson: 'Lead Coordinator (AIIA)',
    dueDate: '2025-10-31',
    status: 'Pending'
  },
  {
    id: 'REG-003',
    task: 'NDCT Rules 2019 Schedule Y / Ch. III Safety Dossier Submission',
    trialId: 'AYU-004',
    category: 'NDCT Rules 2019',
    responsiblePerson: 'Dr. M. S. Deepa',
    dueDate: '2025-10-15',
    status: 'Missing'
  },
  {
    id: 'REG-004',
    task: 'Periodic Safety Update Report (PSUR) Q3 Compilation',
    trialId: 'AYU-002',
    category: 'Periodic Safety Report',
    responsiblePerson: 'Pharmacovigilance Safety Officer',
    dueDate: '2025-10-25',
    status: 'Pending'
  },
  {
    id: 'REG-005',
    task: 'Informed Consent Audio-Video (AV) Archival Verification',
    trialId: 'AYU-003',
    category: 'Informed Consent',
    responsiblePerson: 'Site QA Officer',
    dueDate: '2025-11-05',
    status: 'Approved'
  },
  {
    id: 'REG-006',
    task: 'Substantial Protocol Amendment v2.1 CDSCO Dossier',
    trialId: 'AYU-002',
    category: 'Protocol Approval',
    responsiblePerson: 'Regulatory Liaison Officer',
    dueDate: '2025-12-01',
    status: 'Approved'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    title: 'SERIOUS ADVERSE EVENT (SAE) ALERT',
    message: 'Participant P-102 reported severe urticarial rash in AYU-001. 24-hour statutory reporting window active.',
    timestamp: '15 minutes ago',
    priority: 'High',
    read: false,
    linkTab: 'adverse-events'
  },
  {
    id: 'NOTIF-02',
    title: 'NDCT 2019 Compliance Notice',
    message: 'NDCT safety dossier pending for AYU-004 Site D initiation. Due in 15 days.',
    timestamp: '2 hours ago',
    priority: 'Medium',
    read: false,
    linkTab: 'ethics-regulatory'
  },
  {
    id: 'NOTIF-03',
    title: 'Trial Enrollment Milestone',
    message: 'Trial AYU-001 reached 78% target participant enrollment across 3 sites.',
    timestamp: 'Yesterday',
    priority: 'Low',
    read: true,
    linkTab: 'clinical-trials'
  },
  {
    id: 'NOTIF-04',
    title: 'Ethics Committee Expiry Warning',
    message: 'Institutional Ethics Committee approval for Site D expires in 28 days.',
    timestamp: '2 days ago',
    priority: 'Medium',
    read: true,
    linkTab: 'ethics-regulatory'
  },
  {
    id: 'NOTIF-05',
    title: '3 eCRF Forms Require PI Verification',
    message: 'New eCRF submissions for P-101, P-105, and P-108 pending PI signature verification.',
    timestamp: '3 days ago',
    priority: 'Low',
    read: true,
    linkTab: 'ecrf'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'LOG-1001',
    timestamp: '2025-09-30 04:12:00',
    user: 'Dr. Tanuja Nesari',
    role: 'Doctor / Principal Investigator',
    action: 'eCRF Verified',
    details: 'Verified baseline & Visit 3 vitals for Participant P-101 (AYU-001)',
    ipAddress: '10.14.82.112'
  },
  {
    id: 'LOG-1002',
    timestamp: '2025-09-29 14:35:10',
    user: 'Dr. Tanuja Nesari',
    role: 'Doctor / Principal Investigator',
    action: 'SAE Logged & 24h Trigger',
    details: 'Registered Serious Adverse Event AE-2025-001 for Participant P-102. Automated alert dispatched.',
    ipAddress: '10.14.82.112'
  },
  {
    id: 'LOG-1003',
    timestamp: '2025-09-28 11:20:44',
    user: 'Sunil Verma',
    role: 'Data Entry Operator',
    action: 'eCRF Draft Saved',
    details: 'Drafted Visit 1 data entry for Participant P-106 at Site A (IPGTRA Jamnagar)',
    ipAddress: '10.14.82.204'
  },
  {
    id: 'LOG-1004',
    timestamp: '2025-09-27 16:45:00',
    user: 'Prof. Balram Bhargava (Advisor)',
    role: 'Research Head',
    action: 'Trial Parameters Updated',
    details: 'Updated enrollment target metrics for AYU-003 from 80 to 90 participants.',
    ipAddress: '10.14.82.015'
  },
  {
    id: 'LOG-1005',
    timestamp: '2025-09-26 09:00:12',
    user: 'Dr. Rajesh Kotecha',
    role: 'Ayush Officer',
    action: 'National Audit Dossier Exported',
    details: 'Exported quarterly cross-site pharmacovigilance safety summary for Ministry Review.',
    ipAddress: '164.100.158.4'
  }
];

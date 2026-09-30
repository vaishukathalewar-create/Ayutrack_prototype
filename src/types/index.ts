export type UserRole = 
  | 'Research Head' 
  | 'Doctor / Principal Investigator' 
  | 'Data Entry Operator' 
  | 'Ayush Officer';

export type Language = 'en' | 'hi';

export type Prakriti = 
  | 'Vata' 
  | 'Pitta' 
  | 'Kapha' 
  | 'Vata-Pitta' 
  | 'Pitta-Kapha' 
  | 'Vata-Kapha' 
  | 'Tridosha';

export type AyurvedicFormulation = 
  | 'Vati' 
  | 'Churna' 
  | 'Kwatha' 
  | 'Ghrita' 
  | 'Taila' 
  | 'Asava' 
  | 'Arishta';

export type TrialPhase = 'Phase I' | 'Phase II' | 'Phase III' | 'Phase IV' | 'Observational';

export type TrialStatus = 'Recruiting' | 'Active' | 'Completed' | 'Paused';

export type EthicsStatus = 'Approved' | 'Pending' | 'Expired' | 'Missing';

export type Severity = 'Mild' | 'Moderate' | 'Severe' | 'Serious';

export type Causality = 
  | 'Certain' 
  | 'Probable/Likely' 
  | 'Possible' 
  | 'Unlikely' 
  | 'Conditional/Unclassified' 
  | 'Unassessable/Unclassifiable';

export interface UserProfile {
  name: string;
  email: string;
  mobile?: string;
  organization?: string;
  designation?: string;
  role: UserRole;
  language: Language;
}

export interface ClinicalTrial {
  id: string; // e.g. "AYU-001"
  title: string;
  shortTitle: string;
  phase: TrialPhase;
  studyType: string;
  formulation: AyurvedicFormulation;
  formulationName: string;
  indication: string;
  pi: string;
  sponsor: string;
  startDate: string;
  endDate: string;
  targetParticipants: number;
  enrolledParticipants: number;
  participatingSites: string[];
  ethicsStatus: EthicsStatus;
  ctriNumber: string;
  ndctComplianceStatus: 'Compliant' | 'Pending Review' | 'Document Required';
  status: TrialStatus;
  namasteCode: string;
  summary: string;
}

export interface Participant {
  id: string; // e.g. "P-101"
  trialId: string;
  site: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  prakriti: Prakriti;
  dosha: string;
  enrollmentDate: string;
  currentVisit: string;
  treatmentGroup: 'Active Herbal Arm' | 'Standard Care Arm' | 'Placebo/Control';
  status: 'Enrolled' | 'In Follow-up' | 'Completed' | 'Withdrawn';
  vitals: {
    systolicBp: number;
    diastolicBp: number;
    pulseRate: number;
    temperatureF: number;
    weightKg: number;
  };
  laboratory: {
    fastingSugarMgDl: number;
    hba1c: number;
    creatinineMgDl: number;
    sgotUPerL: number;
    sgptUPerL: number;
  };
  eCrfStatus: 'Submitted' | 'Draft' | 'Pending Review' | 'Verified';
  recentFormulation: string;
  visitTimeline: {
    visitName: string;
    date: string;
    completed: boolean;
    notes?: string;
  }[];
}

export interface AdverseEvent {
  id: string;
  participantId: string;
  trialId: string;
  site: string;
  eventDescription: string;
  date: string;
  severity: Severity;
  isSerious: boolean;
  outcome: 'Recovered' | 'Recovering' | 'Not Recovered' | 'Fatal' | 'Unknown';
  actionTaken: 'Dose Interrupted' | 'Dose Reduced' | 'Drug Withdrawn' | 'Concomitant Therapy' | 'None';
  causality: Causality;
  reportedBy: string;
  reportedAt: string;
  countdownDeadline?: string; // 24-hr window ISO string
  notificationStatus: {
    ethicsCommittee: 'Notified' | 'Pending' | 'Acknowledged';
    regulatoryAuthority: 'Notified' | 'Pending' | 'Acknowledged';
    sponsor: 'Notified' | 'Pending' | 'Acknowledged';
  };
}

export interface ECrfRecord {
  id: string;
  participantId: string;
  trialId: string;
  visitName: string;
  visitDate: string;
  systolicBp: number;
  diastolicBp: number;
  pulseRate: number;
  temperatureF: number;
  symptoms: string;
  prakriti: Prakriti;
  doshaVataScore: number;
  doshaPittaScore: number;
  doshaKaphaScore: number;
  formulation: AyurvedicFormulation;
  formulationName: string;
  doseMg: number;
  frequency: string;
  labFastingSugar?: number;
  labCreatinine?: number;
  investigatorComments: string;
  namasteCode: string;
  savedAt: string;
  status: 'Submitted' | 'Draft' | 'Verified';
}

export interface ResearchSite {
  id: string;
  name: string;
  state: string;
  city: string;
  pi: string;
  activeTrialsCount: number;
  participantsEnrolled: number;
  enrollmentTarget: number;
  ethicsStatus: EthicsStatus;
  siteStatus: 'Active' | 'Audit Scheduled' | 'Initiation';
  contactEmail: string;
}

export interface RegulatoryTask {
  id: string;
  task: string;
  trialId: string;
  category: 'Ethics Committee Approval' | 'CTRI Registration' | 'NDCT Rules 2019' | 'Informed Consent' | 'Protocol Approval' | 'Periodic Safety Report';
  responsiblePerson: string;
  dueDate: string;
  status: EthicsStatus;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  priority: 'High' | 'Medium' | 'Low';
  read: boolean;
  linkTab?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  details: string;
  ipAddress: string;
}

/**
 * AyuTrack Centralized Internationalization Dictionary
 * Smart India Hackathon SIH26046 • AIIA & Ministry of Ayush CTMS Prototype
 * 
 * Provides comprehensive, verified translations in English and Hindi (हिन्दी)
 * for every visible UI element across all 11 modules and components.
 */

export const translations = {
  en: {
    // Brand & Header
    appName: "AyuTrack",
    appSubtitle: "AIIA Clinical Trials Management System",
    sihCode: "SIH26046",
    sihFullTitle: "Smart India Hackathon",
    ministryPrototype: "Ministry of Ayush / AIIA CTMS Prototype",
    ndctGcpBadge: "NDCT Rules 2019 • GCP Standardized",
    searchPlaceholder: "Search trials, participants, sites, adverse events... (Ctrl+K)",
    liveIndicator: "System Online",
    startDemo: "Start Guided Demo",
    stopDemo: "Exit Guided Demo",
    quickRoleSwitch: "Quick 1-Click Role Switch",
    switchRole: "Switch Active Role",
    activeRole: "Active Role",
    logout: "Log Out",
    login: "Log In to AyuTrack",
    signup: "Create Account",
    profile: "User Profile & Identity",
    prototypeNotice: "Prototype Demonstration • Fictional Clinical Data",
    loggedOutSuccess: "Logged out from AyuTrack CTMS",

    // Roles
    roleResearchHead: "Research Head",
    roleDoctorPI: "Doctor / Principal Investigator",
    roleDataEntry: "Data Entry Operator",
    roleAyushOfficer: "Ayush Officer (National)",
    roleDescResearchHead: "National oversight, trial KPIs & cross-site monitoring",
    roleDescDoctorPI: "Clinical oversight, AE reporting & participant vitals",
    roleDescDataEntry: "Digital eCRF case report entry & validation",
    roleDescAyushOfficer: "Ministry-level state trial oversight & compliance audits",

    // Main Navigation Tabs
    dashboard: "Dashboard",
    trials: "Clinical Trials",
    participants: "Participants",
    ecrf: "eCRF / Data Entry",
    adverseEvents: "Adverse Events",
    pharmacovigilance: "Pharmacovigilance",
    ethicsRegulatory: "Ethics & Regulatory",
    sites: "Research Sites",
    reports: "Reports",
    analytics: "Research Analytics",
    settings: "Security & Settings",

    // Common Actions & Form Controls
    save: "Save",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    viewDetails: "View Details",
    generateReport: "Generate Report",
    exportCsv: "Export CSV",
    exportFhir: "Export FHIR JSON",
    exportCdisc: "Export CDISC / SDTM",
    loading: "Loading...",
    noDataAvailable: "No records found matching criteria",
    successfullySaved: "Record saved successfully to local database",
    somethingWentWrong: "An unexpected error occurred",
    confirmDelete: "Are you sure you want to delete this record?",
    next: "Next",
    previous: "Previous",
    exitDemo: "Exit Demo",
    step: "Step",
    of: "of",
    filter: "Filter",
    all: "All",
    status: "Status",
    actions: "Actions",
    search: "Search",
    date: "Date",
    view: "View",
    print: "Print",
    submit: "Submit",
    submitted: "Submitted",
    reset: "Reset",
    close: "Close",
    action: "Action",
    onTrack: "On Track",
    back: "Back",
    clear: "Clear",
    download: "Download",
    refresh: "Refresh",
    yes: "Yes",
    no: "No",
    required: "Required",
    notes: "Notes",

    // Statuses
    statusRecruiting: "Recruiting",
    statusActive: "Active",
    statusPaused: "Paused",
    statusCompleted: "Completed",
    statusEnrolled: "Enrolled",
    statusInFollowup: "In Follow-up",
    statusWithdrawn: "Withdrawn",
    statusApproved: "Approved",
    statusPending: "Pending",
    statusUnderReview: "Under Review",
    statusRejected: "Rejected",
    statusCompliant: "Compliant",
    statusNonCompliant: "Non-Compliant",
    statusDraft: "Draft",
    statusVerified: "Verified",
    statusSigned: "Signed",
    statusMild: "Mild",
    statusModerate: "Moderate",
    statusSevere: "Severe",
    statusSerious: "Serious (SAE)",
    statusRecovered: "Recovered",
    statusRecovering: "Recovering",
    statusNotRecovered: "Not Recovered",
    statusFatal: "Fatal",
    statusUnknown: "Unknown",

    // Dashboard Hero & KPIs
    heroTitle: "AyuTrack",
    heroSubtitle: "Empowering Safe, Standardized & Connected Ayurveda Clinical Research",
    heroDesc: "Real-time clinical trial monitoring, pharmacovigilance, regulatory compliance and interoperable research data for the All India Institute of Ayurveda and Ministry of Ayush.",
    viewTrialsBtn: "View Trials",
    loggedAs: "Logged in as",
    
    // 8 Mandated KPIs
    activeTrials: "Active Trials",
    totalParticipants: "Total Participants",
    enrollmentProgress: "Enrollment Progress",
    activeSites: "Active Sites",
    saeAlert: "Serious Adverse Events",
    pendingTasks: "Pending Regulatory Tasks",
    formsSubmitted: "eCRF Forms Submitted",
    complianceRate: "Overall Compliance",
    recruitingCountBadge: "3 Recruiting • 1 Paused",
    recruitmentGoal: "recruitment goal",
    overall: "overall",
    activeSaeClockBadge: "24-hr Regulatory Clock Active",
    dossiersPending: "dossiers pending",
    verifiedEcRf: "100% FHIR & CDISC compliant",
    gcpAudited: "across 5 national institutes",
    
    // Charts Titles & Captions
    enrollmentVelocityTitle: "Participant Recruitment Velocity",
    enrollmentVelocityDesc: "Cumulative monthly enrollment vs targeted accrual timeline across all sites",
    siteWiseEnrollmentTitle: "Site-wise Enrollment Distribution",
    siteWiseEnrollmentDesc: "Current participant accrual versus allocation target per research institute",
    trialStatusDonutTitle: "Trial Portfolio Status",
    trialStatusDonutDesc: "Distribution of active, recruiting, paused and completed clinical studies",
    aeSeverityTitle: "Adverse Events by Clinical Severity",
    aeSeverityDesc: "Recorded adverse events classified from mild self-limiting to serious adverse events",
    liveTrialMonitoring: "Active Clinical Trials Monitoring",
    liveTrialMonitoringDesc: "Ongoing clinical trials with formulation specifications, principal investigators, and recruitment progress.",
    ayurvedicIntervention: "Ayurvedic Intervention",
    principalInvestigator: "Principal Investigator",
    sponsor: "Trial Sponsor",
    recruitment: "Recruitment",
    phase: "Phase",
    studyType: "Study Type",
    targetIndication: "Target Indication",
    ctriNumber: "CTRI Number",
    ndctStatus: "NDCT Compliance",
    namasteCode: "NAMASTE Code",
    participatingSitesLabel: "Participating Research Centers",
    enrolled: "Enrolled",
    target: "Target",
    reportAE: "Report Adverse Event",
    recordVitals: "Record eCRF Vitals",
    downloadReport: "Download Dossier",

    // Participants View
    participantManagement: "Participant Management",
    participantManagementDesc: "De-identified participant cohort with Ayurveda Prakriti classification, visit timelines, and vitals surveillance.",
    enrollParticipant: "Enroll Participant",
    searchParticipantPlaceholder: "Search participant ID, site, trial, Prakriti...",
    prakritiFilter: "Prakriti",
    trialFilter: "Trial",
    statusFilter: "Status",
    participantId: "Participant ID",
    demographics: "Demographics",
    ayurvedaPrakritiDosha: "Ayurveda Prakriti & Dosha",
    currentVisitGroup: "Current Visit & Group",
    vitalsBpPulse: "Vitals (BP / Pulse)",
    treatmentArm: "Treatment Arm",
    visitTimeline: "Visit Schedule Timeline",
    age: "Age",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    systolicBp: "Systolic BP",
    diastolicBp: "Diastolic BP",
    pulseRate: "Pulse Rate",
    temperature: "Temperature (°F)",
    weight: "Weight (kg)",
    fastingSugar: "Fasting Blood Sugar",
    hba1c: "HbA1c",
    creatinine: "Serum Creatinine",
    sgot: "SGOT (AST)",
    sgpt: "SGPT (ALT)",

    // eCRF View
    ecrfTitle: "Electronic Case Report Form (eCRF)",
    ecrfSubtitle: "GCP-Compliant Digital Case Entry with Ayurvedic Dosha & Interoperability Standards",
    selectParticipant: "Select Participant",
    visitInformation: "Visit Information",
    vitalSignsAssessment: "Vital Signs & Clinical Measurements",
    ayurvedicDoshaAssessment: "Ayurvedic Dosha & Prakriti Assessment",
    investigationalFormulation: "Investigational Ayurvedic Formulation",
    dosageMg: "Dose (mg)",
    dosageFrequency: "Dosing Frequency / Anupana Time",
    symptomProgression: "Clinical Symptom Progression & Notes",
    labObservations: "Laboratory Surveillance Markers",
    investigatorRemarks: "Investigator Evaluation & Comments",
    submitEcrf: "Submit Verified eCRF",
    saveDraftEcrf: "Save Local Draft",
    fhirPreviewTab: "HL7® FHIR® R4 Observation",
    cdiscPreviewTab: "CDISC SDTM Standard Record",
    copyJson: "Copy JSON",
    jsonCopied: "JSON copied to clipboard",

    // Adverse Events View
    adverseEventsTitle: "Adverse Events & Safety Monitoring",
    adverseEventsSubtitle: "Comprehensive Pharmacovigilance Registry, Causality Assessment & 24-Hour SAE Clock",
    reportNewAe: "Report Adverse Event",
    severityLabel: "Severity",
    causalityLabel: "WHO-UMC Causality",
    actionTaken: "Action Taken with Drug",
    outcomeLabel: "Outcome",
    aeDescription: "Adverse Event Description",
    eventDate: "Date of Onset",
    isSeriousQuestion: "Is this a Serious Adverse Event (SAE)?",
    seriousNotice: "Marking as Serious triggers the mandatory 24-Hour NDCT regulatory notification window.",
    regulatoryNoticeClock: "24-Hour Statutory SAE Regulatory Window",
    simulatedDispatch: "Simulate CDSCO Dispatch",
    dispatchSuccessMsg: "Simulated notification dispatched to Central Regulatory Authority (CDSCO) & IEC",
    certainCausality: "Certain",
    probableCausality: "Probable / Likely",
    possibleCausality: "Possible",
    unlikelyCausality: "Unlikely",
    conditionalCausality: "Conditional / Unclassified",
    unassessableCausality: "Unassessable / Unclassifiable",

    // Pharmacovigilance View
    pharmacovigilanceTitle: "National Ayurvedic Pharmacovigilance",
    pharmacovigilanceSubtitle: "Signals, formulations safety monitoring, and WHO-UMC causality analytics",
    safetySignals: "Active Safety Signal Alerts",
    causalityDistribution: "Causality Assessment Distribution",
    formulationSafetyLog: "Formulation Surveillance Register",
    signalWarningGuduchi: "Signal: Elevated transaminase reports detected with Guduchi-Katuki Compound Vati (Podar Mumbai & Kerala sites).",
    safetyIndex: "Composite Safety Index",
    noMajorSignal: "No critical toxicity signals registered across 4 monitored active trials.",

    // Ethics & Regulatory View
    ethicsRegulatoryTitle: "Ethics & Regulatory Compliance",
    ethicsRegulatorySubtitle: "Institutional Ethics Committee (IEC), CTRI registration, and NDCT Rules 2019 compliance audit",
    iecAudits: "Institutional Ethics Committees",
    ctriRegistrations: "CTRI Registrations",
    ndctDossiers: "NDCT Rules 2019 Chapters",
    informedConsentAv: "Audio-Video Informed Consent Audits",
    pendingRegulatoryTasks: "Pending Regulatory Compliance Items",
    dueDate: "Due Date",
    regulatoryAuthority: "Authority",

    // Research Sites View
    sitesTitle: "Participating Research Centers",
    sitesSubtitle: "Multi-center clinical trial network, GCP accreditation status and investigator directories",
    addSite: "Add Research Center",
    activePisInSite: "Principal Investigators",
    enrolledRatio: "Accrual Performance",
    gcpStatus: "GCP Facility Audit",
    stateLabel: "State / UT",
    contactEmail: "Contact Email",

    // Reports View
    reportsTitle: "Regulatory & Clinical Reports",
    reportsSubtitle: "Automated generation of GCP-compliant dossiers, participant registers, and safety audits",
    trialProgressReport: "Trial Progress Report",
    participantEnrollmentReport: "Participant Enrollment Report",
    adverseEventReport: "Adverse Event & Safety Report",
    saeReport: "Serious Adverse Event (SAE) Dossier",
    regulatoryComplianceReport: "Regulatory Compliance Audit Report",
    sitePerformanceReport: "Multicenter Site Performance Summary",
    exportPdf: "Export PDF",
    exportSpreadsheet: "Export Excel / CSV",
    printReportBtn: "Print Dossier",

    // Analytics View
    analyticsTitle: "Research & Clinical Analytics",
    analyticsSubtitle: "Cross-site recruitment trends, demographic cohorts, dosha distribution and trial velocity",
    monthlyAccrualTrend: "Monthly Accrual Trajectory",
    prakritiCohortShare: "Participant Prakriti Classification Cohort",
    multicenterBenchmark: "Inter-Site Recruitment Efficiency",
    formulationEfficacyIndex: "Formulation Response & Compliance Rate",

    // Ayush Officer National View
    ayushOfficerTitle: "National Ayush Trial Surveillance",
    ayushOfficerSubtitle: "Apex monitoring across all States & Union Territories for clinical research standards",
    nationalOversight: "National Trial Map & Regional Centers",
    stateWiseCompliance: "State-wise Regulatory Compliance Index",
    centralSignalDetection: "Central Pharmacovigilance Alerts",
    nationalEnrolledCount: "Total National Accrual",

    // Settings View
    settingsTitle: "Security, RBAC & Audit System",
    settingsSubtitle: "Role-based access control, cryptographic session logs, and system data maintenance",
    rbacMatrixTitle: "Role-Based Access Control (RBAC) Matrix",
    auditLogsTitle: "Regulatory Audit Trail (21 CFR Part 11 / GCP)",
    timestamp: "Timestamp",
    user: "User",
    roleColumn: "Role",
    actionColumn: "Action Performed",
    ipAddress: "Terminal / IP",
    resetDataBtn: "Restore Sample Database",
    resetDataConfirmTitle: "Confirm Database Reset",
    resetDataConfirmDesc: "This will restore all clinical trials, participants, adverse events and sites to initial seed demonstration data.",
    confirmResetBtn: "Yes, Restore Sample Data",

    // User Profile Modal
    userProfileTitle: "User Identity & Account Credentials",
    fullName: "Full Name",
    emailAddress: "Official Email Address",
    mobileNumber: "Mobile Number",
    organization: "Organization / Institution",
    designation: "Designation / Title",
    preferredLanguage: "Preferred Interface Language",
    activeIdentityNotice: "Your account is authenticated for AyuTrack CTMS under AIIA Institutional Guidelines.",
    confirmLogout: "Confirm Logout",
    confirmLogoutDesc: "Are you sure you want to end your active research session?",

    // Notifications
    notificationCenter: "Clinical Alerts & Regulatory Notifications",
    unreadAlerts: "unread alerts",
    markAllRead: "Mark all as read",
    noNotifications: "No new notifications",
    notifSaeP102: "Serious Adverse Event reported for Participant P-102 (AYU-001) - 24-hr regulatory window active.",
    notifNdctPending: "NDCT Rules 2019 Chapter III documentation review is due for AYU-003.",
    notifEnrollmentReached: "Trial AYU-001 enrollment reached 78% of multi-center target.",
    notifEthicsExpiring: "Ethics Committee renewal due for IPGTRA Jamnagar center in 15 days.",
    notifSafetyPattern: "Pharmacovigilance safety pattern signal flagged for Guduchi-Katuki formulation.",

    // Guided Demo Steps
    demoStep1Title: "1. Research Head Dashboard Overview",
    demoStep1Desc: "Welcome to AyuTrack CTMS. The Research Head monitors active trials, recruitment velocities, adverse events and national sites in real-time.",
    demoStep2Title: "2. Multi-Site Trial Enrollment Tracking",
    demoStep2Desc: "Check enrollment progress across New Delhi, Jamnagar, Jaipur and Mumbai centers against target accrual milestones.",
    demoStep3Title: "3. Doctor / Principal Investigator (PI) View",
    demoStep3Desc: "Switching to Principal Investigator Dr. Tanuja Nesari's perspective. Here, clinicians examine participants, record Prakriti and assess safety.",
    demoStep4Title: "4. Pharmacovigilance: Adverse Event Reporting",
    demoStep4Desc: "Clinicians record adverse reactions with WHO-UMC causality assessments (Certain, Probable, Possible).",
    demoStep5Title: "5. Flagging as Serious Adverse Event (SAE)",
    demoStep5Desc: "When an event is designated as 'Serious', statutory regulatory workflows under NDCT Rules 2019 are immediately triggered.",
    demoStep6Title: "6. Prominent Red SAE Regulatory Banner",
    demoStep6Desc: "A high-priority red alert banner appears for Participant P-102. Immediate notification to the Ethics Committee & Regulator is required.",
    demoStep7Title: "7. Mandatory 24-Hour Regulatory Countdown Clock",
    demoStep7Desc: "Under Indian regulations, an SAE must be reported within 24 hours. The live countdown clock enforces regulatory compliance.",
    demoStep8Title: "8. Data Entry Operator (eCRF) Portal",
    demoStep8Desc: "Switching to Data Entry Operator role. Digital eCRF forms provide validated, GCP-compliant clinical data capture.",
    demoStep9Title: "9. Clinical Validation & Ayurveda Prakriti Entry",
    demoStep9Desc: "Notice automated BP ranges (60-250 mmHg), dose validation (1-5000 mg), Prakriti classification and classical formulation dosing.",
    demoStep10Title: "10. Interoperability: FHIR & CDISC / SDTM Export",
    demoStep10Desc: "AyuTrack maps Ayurvedic clinical records to HL7 FHIR and CDISC SDTM standards with standardized NAMASTE terminology.",
    demoStep11Title: "11. Return to Research Head Executive View",
    demoStep11Desc: "Returning to the Research Head dashboard showing consolidated trial health, audit trails, and recruitment curves.",
    demoStep12Title: "12. Pharmacovigilance & Safety Signal Detection",
    demoStep12Desc: "The Pharmacovigilance module analyzes adverse event patterns across multi-center formulations to recommend timely protocol reviews.",
    demoStep13Title: "13. Ayush Officer National Monitoring View",
    demoStep13Desc: "Switching to National Ayush Officer view. State-wise trial surveillance, overall compliance indexing and safety oversight.",
    demoStep14Title: "14. Ethics & Regulatory Compliance Verification",
    demoStep14Desc: "Track CTRI registrations, Ethics Committee renewals and NDCT Rules 2019 dossiers. Guided demo completed successfully!",

    // Authentication & Registration
    welcomeBack: "Welcome Back to AyuTrack",
    loginSubtitle: "Sign in with your institutional credentials to access the CTMS",
    officialEmail: "Official Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    rememberMe: "Remember me on this research workstation",
    forgotPassword: "Forgot Password?",
    dontHaveAccount: "Don't have an institutional account?",
    alreadyHaveAccount: "Already have an account?",
    registerNewAccount: "Create your AyuTrack Account",
    registerSubtitle: "Register as an authorized clinical researcher, investigator, or data entry operator",
    quickDemoCredentials: "Quick 1-Click Role Login (Demo)",
    fillAllRequiredFields: "Please fill in all required fields",
    passwordsDoNotMatch: "Passwords do not match",
    accountCreatedSuccessfully: "Account created successfully! Redirecting to login...",
    loginSuccessful: "Signed in successfully. Welcome to AyuTrack!",
    termsAndPrivacy: "I agree to the AyuTrack Clinical Data Governance Policy, NDCT Rules 2019 Compliance, and GCP Guidelines.",

    // Footer
    footerDisclaimer: "Designed for demonstration purposes. Developed for AIIA and Ministry of Ayush clinical trial workflows.",
    footerGcpReady: "NDCT 2019 / GCP Architecture Compliant",
    prototypeSampleData: "Prototype Demonstration • Synthetic Data"
  },

  hi: {
    // Brand & Header
    appName: "आयु-ट्रैक",
    appSubtitle: "अखिल भारतीय आयुर्वेद संस्थान (AIIA) नैदानिक परीक्षण प्रबंधन प्रणाली",
    sihCode: "SIH26046",
    sihFullTitle: "स्मार्ट इंडिया हैकाथॉन",
    ministryPrototype: "आयुष मंत्रालय / AIIA सीटीएमएस प्रोटोटाइप",
    ndctGcpBadge: "NDCT नियम 2019 • GCP मानकीकृत",
    searchPlaceholder: "परीक्षण, प्रतिभागी, केंद्र, प्रतिकूल घटना खोजें... (Ctrl+K)",
    liveIndicator: "प्रणाली ऑनलाइन",
    startDemo: "निर्देशित डेमो प्रारंभ करें",
    stopDemo: "निर्देशित डेमो से बाहर निकलें",
    quickRoleSwitch: "त्वरित 1-क्लिक भूमिका परिवर्तन",
    switchRole: "सक्रिय भूमिका बदलें",
    activeRole: "सक्रिय भूमिका",
    logout: "लॉग आउट",
    login: "आयु-ट्रैक में लॉग इन करें",
    signup: "खाता बनाएं",
    profile: "उपयोगकर्ता प्रोफ़ाइल एवं पहचान",
    prototypeNotice: "प्रोटोटाइप प्रदर्शन • काल्पनिक नैदानिक डेटा",
    loggedOutSuccess: "आयु-ट्रैक सीटीएमएस से सफलतापूर्वक लॉग आउट किया गया",

    // Roles
    roleResearchHead: "अनुसंधान प्रमुख",
    roleDoctorPI: "चिकित्सक / मुख्य अन्वेषक",
    roleDataEntry: "डेटा एंट्री ऑपरेटर",
    roleAyushOfficer: "आयुष अधिकारी (राष्ट्रीय)",
    roleDescResearchHead: "राष्ट्रीय निगरानी, परीक्षण मेट्रिक्स एवं बहु-केंद्रीय पर्यवेक्षण",
    roleDescDoctorPI: "नैदानिक निगरानी, प्रतिकूल घटना रिपोर्टिंग एवं वाइटल्स",
    roleDescDataEntry: "डिजिटल ई-सीआरएफ केस रिपोर्ट प्रविष्टि एवं सत्यापन",
    roleDescAyushOfficer: "मंत्रालय स्तर पर राज्यवार परीक्षण निगरानी एवं नियामक ऑडिट",

    // Main Navigation Tabs
    dashboard: "डैशबोर्ड",
    trials: "नैदानिक परीक्षण",
    participants: "प्रतिभागी",
    ecrf: "ई-सीआरएफ / डेटा प्रविष्टि",
    adverseEvents: "प्रतिकूल घटनाएं",
    pharmacovigilance: "औषध-निगरानी",
    ethicsRegulatory: "नैतिकता एवं नियामक",
    sites: "अनुसंधान केंद्र",
    reports: "रिपोर्ट्स",
    analytics: "अनुसंधान विश्लेषण",
    settings: "सुरक्षा एवं सेटिंग्स",

    // Common Actions & Form Controls
    save: "सहेजें",
    saveChanges: "परिवर्तन सहेजें",
    cancel: "रद्द करें",
    edit: "संपादित करें",
    delete: "हटाएं",
    viewDetails: "विवरण देखें",
    generateReport: "रिपोर्ट बनाएं",
    exportCsv: "CSV निर्यात करें",
    exportFhir: "FHIR JSON निर्यात करें",
    exportCdisc: "CDISC / SDTM निर्यात",
    loading: "लोड हो रहा है...",
    noDataAvailable: "मापदंडों के अनुसार कोई रिकॉर्ड नहीं मिला",
    successfullySaved: "स्थानीय डेटाबेस में सफलतापूर्वक सहेजा गया",
    somethingWentWrong: "एक अप्रत्याशित त्रुटि उत्पन्न हुई",
    confirmDelete: "क्या आप वाकई इस रिकॉर्ड को हटाना चाहते हैं?",
    next: "अगला",
    previous: "पिछला",
    exitDemo: "डेमो समाप्त करें",
    step: "चरण",
    of: "का",
    filter: "फ़िल्टर",
    all: "सभी",
    status: "स्थिति",
    actions: "कार्रवाई",
    search: "खोजें",
    date: "दिनांक",
    view: "देखें",
    print: "प्रिंट करें",
    submit: "जमा करें",
    submitted: "जमा किया गया",
    reset: "रीसेट करें",
    close: "बंद करें",
    action: "कार्रवाई",
    onTrack: "समय पर",
    back: "वापस",
    clear: "साफ़ करें",
    download: "डाउनलोड करें",
    refresh: "ताज़ा करें",
    yes: "हाँ",
    no: "नहीं",
    required: "अनिवार्य",
    notes: "टिप्पणियाँ",

    // Statuses
    statusRecruiting: "नामांकन जारी",
    statusActive: "सक्रिय",
    statusPaused: "रुका हुआ",
    statusCompleted: "पूर्ण",
    statusEnrolled: "नामांकित",
    statusInFollowup: "अनुवर्ती चरण में",
    statusWithdrawn: "वापस लिया गया",
    statusApproved: "स्वीकृत",
    statusPending: "लंबित",
    statusUnderReview: "समीक्षाधीन",
    statusRejected: "अस्वीकृत",
    statusCompliant: "अनुपालन पूर्ण",
    statusNonCompliant: "अनुपालन अपूर्ण",
    statusDraft: "प्रारूप (ड्राफ्ट)",
    statusVerified: "सत्यापित",
    statusSigned: "हस्ताक्षरित",
    statusMild: "हल्का (Mild)",
    statusModerate: "मध्यम (Moderate)",
    statusSevere: "गंभीर (Severe)",
    statusSerious: "संकटपूर्ण (SAE)",
    statusRecovered: "स्वस्थ हो गए",
    statusRecovering: "स्वास्थ्य लाभ ले रहे हैं",
    statusNotRecovered: "स्वस्थ नहीं हुए",
    statusFatal: "घातक",
    statusUnknown: "अज्ञात",

    // Dashboard Hero & KPIs
    heroTitle: "आयु-ट्रैक",
    heroSubtitle: "सुरक्षित, मानकीकृत एवं संबद्ध आयुर्वेद नैदानिक अनुसंधान",
    heroDesc: "अखिल भारतीय आयुर्वेद संस्थान (AIIA) एवं आयुष मंत्रालय के लिए वास्तविक समय नैदानिक परीक्षण निगरानी, औषध-निगरानी, नियामक अनुपालन एवं अंतर-संचालनीय अनुसंधान डेटा।",
    viewTrialsBtn: "परीक्षण देखें",
    loggedAs: "सक्रिय लॉगिन",
    
    // 8 Mandated KPIs
    activeTrials: "सक्रिय परीक्षण",
    totalParticipants: "कुल प्रतिभागी",
    enrollmentProgress: "नामांकन प्रगति",
    activeSites: "सक्रिय अनुसंधान केंद्र",
    saeAlert: "गंभीर प्रतिकूल घटनाएं (SAE)",
    pendingTasks: "लंबित नियामक कार्य",
    formsSubmitted: "जमा किए गए ई-सीआरएफ फॉर्म",
    complianceRate: "समग्र नियामक अनुपालन",
    recruitingCountBadge: "3 में नामांकन जारी • 1 रुका हुआ",
    recruitmentGoal: "नामांकन लक्ष्य",
    overall: "समग्र",
    activeSaeClockBadge: "24-घंटे विधिक नियामक घड़ी सक्रिय",
    dossiersPending: "नियामक दस्तावेज़ लंबित",
    verifiedEcRf: "100% FHIR एवं CDISC अनुरूप",
    gcpAudited: "5 राष्ट्रीय संस्थानों में",

    // Charts Titles & Captions
    enrollmentVelocityTitle: "प्रतिभागी भर्ती गति (Recruitment Velocity)",
    enrollmentVelocityDesc: "सभी केंद्रों पर लक्षित समयरेखा बनाम संचयी मासिक नामांकन प्रगति",
    siteWiseEnrollmentTitle: "केंद्र-वार नामांकन वितरण",
    siteWiseEnrollmentDesc: "प्रति अनुसंधान संस्थान आवंटित लक्ष्य बनाम वर्तमान प्रतिभागी भर्ती",
    trialStatusDonutTitle: "परीक्षण पोर्टफोलियो स्थिति",
    trialStatusDonutDesc: "सक्रिय, नामांकन जारी, रुके हुए एवं पूर्ण नैदानिक अध्ययनों का अनुपात",
    aeSeverityTitle: "नैदानिक गंभीरता अनुसार प्रतिकूल घटनाएं",
    aeSeverityDesc: "दर्ज की गई प्रतिकूल घटनाओं का हल्के से गंभीर प्रतिकूल घटनाओं तक वर्गीकरण",
    liveTrialMonitoring: "सक्रिय नैदानिक परीक्षणों की सीधी निगरानी",
    liveTrialMonitoringDesc: "आयुर्वेदिक औषधि योग, प्रधान अन्वेषक एवं नामांकन प्रगति के साथ चालू नैदानिक परीक्षण।",
    ayurvedicIntervention: "आयुर्वेदिक औषधि योग",
    principalInvestigator: "मुख्य अन्वेषक (PI)",
    sponsor: "परीक्षण प्रायोजक",
    recruitment: "नामांकन",
    phase: "चरण (Phase)",
    studyType: "अध्ययन प्रकार",
    targetIndication: "लक्षित रोग संकेत",
    ctriNumber: "CTRI संख्या",
    ndctStatus: "NDCT अनुपालन",
    namasteCode: "नमस्ते कोड (NAMASTE)",
    participatingSitesLabel: "प्रतिभागी अनुसंधान केंद्र",
    enrolled: "नामांकित",
    target: "लक्ष्य",
    reportAE: "प्रतिकूल घटना दर्ज करें",
    recordVitals: "ई-सीआरएफ वाइटल्स दर्ज करें",
    downloadReport: "दस्तावेज़ डाउनलोड करें",

    // Participants View
    participantManagement: "प्रतिभागी प्रबंधन",
    participantManagementDesc: "आयुर्वेद प्रकृति वर्गीकरण, विज़िट समयरेखा और वाइटल्स निगरानी के साथ प्रतिभागी समूह।",
    enrollParticipant: "प्रतिभागी नामांकित करें",
    searchParticipantPlaceholder: "प्रतिभागी आईडी, केंद्र, परीक्षण, प्रकृति खोजें...",
    prakritiFilter: "प्रकृति",
    trialFilter: "परीक्षण",
    statusFilter: "स्थिति",
    participantId: "प्रतिभागी आईडी",
    demographics: "जनसांख्यिकी (आयु/लिंग)",
    ayurvedaPrakritiDosha: "आयुर्वेद प्रकृति एवं दोष",
    currentVisitGroup: "वर्तमान विज़िट एवं समूह",
    vitalsBpPulse: "वाइटल्स (रक्तचाप / नाड़ी)",
    treatmentArm: "उपचार समूह (Arm)",
    visitTimeline: "विज़िट समयरेखा",
    age: "आयु",
    gender: "लिंग",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    systolicBp: "सिस्टोलिक रक्तचाप (Systolic BP)",
    diastolicBp: "डायस्टोलिक रक्तचाप (Diastolic BP)",
    pulseRate: "नाड़ी गति (Pulse Rate)",
    temperature: "तापमान (°F)",
    weight: "वज़न (किग्रा)",
    fastingSugar: "खाली पेट रक्त शर्करा",
    hba1c: "HbA1c",
    creatinine: "सीरम क्रिएटिनिन",
    sgot: "SGOT (AST)",
    sgpt: "SGPT (ALT)",

    // eCRF View
    ecrfTitle: "इलेक्ट्रॉनिक केस रिपोर्ट फॉर्म (ई-सीआरएफ)",
    ecrfSubtitle: "आयुर्वेदिक दोष मूल्यांकन एवं अंतर-संचालनीय मानकों के साथ GCP-अनुपालन डिजिटल प्रविष्टि",
    selectParticipant: "प्रतिभागी चुनें",
    visitInformation: "विज़िट विवरण",
    vitalSignsAssessment: "शारीरिक माप एवं वाइटल्स संकेत",
    ayurvedicDoshaAssessment: "आयुर्वेदिक दोष एवं प्रकृति मूल्यांकन",
    investigationalFormulation: "अनुसंधानरत आयुर्वेदिक योग",
    dosageMg: "खुराक (मिलीग्राम)",
    dosageFrequency: "खुराक आवृत्ति / अनुपान काल",
    symptomProgression: "रोग लक्षण सुधार एवं नैदानिक नोट्स",
    labObservations: "प्रयोगशाला जांच अवलोकन",
    investigatorRemarks: "अन्वेषक मूल्यांकन एवं टिप्पणियाँ",
    submitEcrf: "सत्यापित ई-सीआरएफ जमा करें",
    saveDraftEcrf: "स्थानीय ड्राफ्ट सहेजें",
    fhirPreviewTab: "HL7® FHIR® R4 अवलोकन",
    cdiscPreviewTab: "CDISC SDTM मानक रिकॉर्ड",
    copyJson: "JSON कॉपी करें",
    jsonCopied: "JSON क्लिपबोर्ड पर कॉपी किया गया",

    // Adverse Events View
    adverseEventsTitle: "प्रतिकूल घटनाएं एवं सुरक्षा निगरानी",
    adverseEventsSubtitle: "व्यापक औषध-निगरानी रजिस्टर, कारणता मूल्यांकन एवं 24-घंटे की SAE नियामक घड़ी",
    reportNewAe: "प्रतिकूल घटना दर्ज करें",
    severityLabel: "गंभीरता",
    causalityLabel: "WHO-UMC कारणता मूल्यांकन",
    actionTaken: "औषधि के साथ की गई कार्रवाई",
    outcomeLabel: "परिणाम",
    aeDescription: "प्रतिकूल घटना का विवरण",
    eventDate: "घटना प्रारंभ तिथि",
    isSeriousQuestion: "क्या यह एक गंभीर प्रतिकूल घटना (SAE) है?",
    seriousNotice: "गंभीर चिह्नित करने से NDCT नियमों के अंतर्गत अनिवार्य 24-घंटे की विधिक सूचना प्रक्रिया तुरंत शुरू हो जाती है।",
    regulatoryNoticeClock: "24-घंटे की विधिक SAE रिपोर्टिंग विंडो",
    simulatedDispatch: "CDSCO सिमुलेटेड प्रेषण",
    dispatchSuccessMsg: "केंद्रीय नियामक प्राधिकरण (CDSCO) एवं नैतिकता समिति को सिमुलेटेड सूचना भेजी गई",
    certainCausality: "निश्चित (Certain)",
    probableCausality: "संभाव्य (Probable / Likely)",
    possibleCausality: "संभव (Possible)",
    unlikelyCausality: "असंभाव्य (Unlikely)",
    conditionalCausality: "सशर्त / अवर्गीकृत (Conditional)",
    unassessableCausality: "आकलन अयोग्य (Unassessable)",

    // Pharmacovigilance View
    pharmacovigilanceTitle: "राष्ट्रीय आयुर्वेदिक औषध-निगरानी",
    pharmacovigilanceSubtitle: "सुरक्षा संकेत, औषधि योग सुरक्षा निगरानी एवं WHO-UMC कारणता विश्लेषण",
    safetySignals: "सक्रिय सुरक्षा संकेत चेतावनियां",
    causalityDistribution: "कारणता मूल्यांकन वितरण",
    formulationSafetyLog: "औषधि योग सुरक्षा रजिस्टर",
    signalWarningGuduchi: "सुरक्षा संकेत: गुडूची-कटुकी योग (पोदार मुंबई एवं केरल केंद्र) में यकृत एंजाइम वृद्धि की सूचना।",
    safetyIndex: "समग्र सुरक्षा सूचकांक",
    noMajorSignal: "निगरानी वाले 4 सक्रिय परीक्षणों में कोई गंभीर विषाक्तता संकेत नहीं मिला।",

    // Ethics & Regulatory View
    ethicsRegulatoryTitle: "नैतिकता एवं नियामक अनुपालन",
    ethicsRegulatorySubtitle: "संस्थागत नैतिकता समिति (IEC), CTRI पंजीकरण एवं NDCT नियम 2019 अनुपालन ऑडिट",
    iecAudits: "संस्थागत नैतिकता समितियां",
    ctriRegistrations: "CTRI पंजीकरण",
    ndctDossiers: "NDCT नियम 2019 अध्याय",
    informedConsentAv: "ऑडियो-वीडियो सहमति सत्यापन",
    pendingRegulatoryTasks: "लंबित नियामक अनुपालन कार्य",
    dueDate: "अंतिम तिथि",
    regulatoryAuthority: "प्राधिकरण",

    // Research Sites View
    sitesTitle: "प्रतिभागी अनुसंधान केंद्र",
    sitesSubtitle: "बहु-केंद्रीय परीक्षण नेटवर्क, GCP मान्यता स्थिति एवं अन्वेषक निर्देशिका",
    addSite: "अनुसंधान केंद्र जोड़ें",
    activePisInSite: "मुख्य अन्वेषक",
    enrolledRatio: "भर्ती प्रदर्शन",
    gcpStatus: "GCP सुविधा ऑडिट",
    stateLabel: "राज्य / केंद्र शासित प्रदेश",
    contactEmail: "संपर्क ईमेल",

    // Reports View
    reportsTitle: "नियामक एवं नैदानिक रिपोर्ट्स",
    reportsSubtitle: "GCP-अनुपालन दस्तावेज़, प्रतिभागी रजिस्टर एवं सुरक्षा ऑडिट का स्वचालित निर्माण",
    trialProgressReport: "परीक्षण प्रगति रिपोर्ट",
    participantEnrollmentReport: "प्रतिभागी नामांकन रिपोर्ट",
    adverseEventReport: "प्रतिकूल घटना एवं सुरक्षा रिपोर्ट",
    saeReport: "गंभीर प्रतिकूल घटना (SAE) दस्तावेज़",
    regulatoryComplianceReport: "नियामक अनुपालन ऑडिट रिपोर्ट",
    sitePerformanceReport: "बहु-केंद्रीय प्रदर्शन सारांश",
    exportPdf: "PDF निर्यात करें",
    exportSpreadsheet: "एक्सेल / CSV निर्यात करें",
    printReportBtn: "दस्तावेज़ प्रिंट करें",

    // Analytics View
    analyticsTitle: "अनुसंधान एवं नैदानिक विश्लेषण",
    analyticsSubtitle: "बहु-केंद्र भर्ती रुझान, जनसांख्यिकी समूह, दोष वितरण एवं परीक्षण गति",
    monthlyAccrualTrend: "मासिक भर्ती प्रक्षेपवक्र",
    prakritiCohortShare: "प्रतिभागी प्रकृति वर्गीकरण समूह",
    multicenterBenchmark: "अंतर-केंद्र भर्ती दक्षता",
    formulationEfficacyIndex: "औषधि योग प्रतिक्रिया एवं अनुपालन दर",

    // Ayush Officer National View
    ayushOfficerTitle: "राष्ट्रीय आयुष परीक्षण निगरानी",
    ayushOfficerSubtitle: "नैदानिक अनुसंधान मानकों के लिए सभी राज्यों एवं केंद्र शासित प्रदेशों की सर्वोच्च निगरानी",
    nationalOversight: "राष्ट्रीय परीक्षण मानचित्र एवं क्षेत्रीय केंद्र",
    stateWiseCompliance: "राज्य-वार नियामक अनुपालन सूचकांक",
    centralSignalDetection: "केंद्रीय औषध-निगरानी अलर्ट",
    nationalEnrolledCount: "कुल राष्ट्रीय नामांकन",

    // Settings View
    settingsTitle: "सुरक्षा, RBAC एवं ऑडिट प्रणाली",
    settingsSubtitle: "भूमिका-आधारित अभिगम नियंत्रण, क्रिप्टोग्राफ़िक सत्र लॉग एवं सिस्टम डेटा रखरखाव",
    rbacMatrixTitle: "भूमिका-आधारित अभिगम नियंत्रण (RBAC) मैट्रिक्स",
    auditLogsTitle: "नियामक ऑडिट ट्रेल (21 CFR भाग 11 / GCP)",
    timestamp: "समय-मुहर (Timestamp)",
    user: "उपयोगकर्ता",
    roleColumn: "भूमिका",
    actionColumn: "की गई कार्रवाई",
    ipAddress: "टर्मिनल / आईपी पता",
    resetDataBtn: "नमूना डेटाबेस पुनर्स्थापित करें",
    resetDataConfirmTitle: "डेटाबेस रीसेट की पुष्टि करें",
    resetDataConfirmDesc: "यह सभी नैदानिक परीक्षणों, प्रतिभागियों, प्रतिकूल घटनाओं और केंद्रों को प्रारंभिक प्रदर्शन डेटा पर पुनर्स्थापित कर देगा।",
    confirmResetBtn: "हाँ, नमूना डेटा पुनर्स्थापित करें",

    // User Profile Modal
    userProfileTitle: "उपयोगकर्ता पहचान एवं खाता क्रेडेंशियल",
    fullName: "पूरा नाम",
    emailAddress: "आधिकारिक ईमेल पता",
    mobileNumber: "मोबाइल नंबर",
    organization: "संगठन / संस्थान",
    designation: "पद / पदनाम",
    preferredLanguage: "पसंदीदा इंटरफ़ेस भाषा",
    activeIdentityNotice: "आपका खाता AIIA संस्थागत दिशानिर्देशों के तहत आयु-ट्रैक सीटीएमएस के लिए प्रमाणित है।",
    confirmLogout: "लॉग आउट की पुष्टि करें",
    confirmLogoutDesc: "क्या आप वाकई अपना सक्रिय अनुसंधान सत्र समाप्त करना चाहते हैं?",

    // Notifications
    notificationCenter: "नैदानिक अलर्ट एवं नियामक सूचनाएं",
    unreadAlerts: "अपठित अलर्ट",
    markAllRead: "सभी को पढ़ा हुआ चिह्नित करें",
    noNotifications: "कोई नई सूचना नहीं है",
    notifSaeP102: "प्रतिभागी P-102 (AYU-001) के लिए गंभीर प्रतिकूल घटना दर्ज की गई है - 24-घंटे नियामक विंडो सक्रिय।",
    notifNdctPending: "AYU-003 के लिए NDCT नियम 2019 अध्याय III दस्तावेज़ समीक्षा लंबित है।",
    notifEnrollmentReached: "परीक्षण AYU-001 का नामांकन बहु-केंद्रीय लक्ष्य के 78% तक पहुँच गया है।",
    notifEthicsExpiring: "IPGTRA जामनगर केंद्र के लिए नैतिक समिति की स्वीकृति 15 दिनों में समाप्त हो रही है।",
    notifSafetyPattern: "गुडूची-कटुकी योग के लिए औषध-निगरानी सुरक्षा पैटर्न संकेत दर्ज किया गया।",

    // Guided Demo Steps
    demoStep1Title: "1. अनुसंधान प्रमुख डैशबोर्ड अवलोकन",
    demoStep1Desc: "आयु-ट्रैक सीटीएमएस में आपका स्वागत है। अनुसंधान प्रमुख सक्रिय परीक्षणों, नामांकन गति, प्रतिकूल घटनाओं और राष्ट्रीय केंद्रों की वास्तविक समय में निगरानी करते हैं।",
    demoStep2Title: "2. बहु-केंद्रीय परीक्षण नामांकन निगरानी",
    demoStep2Desc: "लक्ष्य मानकों के साथ नई दिल्ली, जामनगर, जयपुर और मुंबई केंद्रों पर नामांकन प्रगति की जांच करें।",
    demoStep3Title: "3. चिकित्सक / प्रधान अन्वेषक (PI) दृष्टिकोण",
    demoStep3Desc: "मुख्य अन्वेषक डॉ. तनुजा नेसरी के दृष्टिकोण पर स्विच किया गया। यहां रोगियों की जांच, प्रकृति मूल्यांकन और सुरक्षा की निगरानी होती है।",
    demoStep4Title: "4. औषध-निगरानी: प्रतिकूल घटना रिपोर्टिंग",
    demoStep4Desc: "चिकित्सक WHO-UMC कारणता मूल्यांकन (Certain, Probable, Possible) के साथ प्रतिकूल प्रभाव दर्ज करते हैं।",
    demoStep5Title: "5. गंभीर प्रतिकूल घटना (SAE) के रूप में चिन्हांकित करना",
    demoStep5Desc: "जब किसी घटना को 'गंभीर' चिह्नित किया जाता है, तो NDCT नियम 2019 के अंतर्गत कानूनी प्रक्रिया तुरंत शुरू हो जाती है।",
    demoStep6Title: "6. प्रमुख लाल SAE नियामक चेतावनी",
    demoStep6Desc: "प्रतिभागी P-102 के लिए हाई-प्रायोरिटी SAE अलर्ट प्रदर्शित हो रहा है। नैतिकता समिति एवं नियामक को तत्काल सूचना भेजी जाती है।",
    demoStep7Title: "7. अनिवार्य 24-घंटे का नियामक काउंटडाउन टाइमर",
    demoStep7Desc: "भारतीय नियमों के अनुसार, 24 घंटे के भीतर SAE की सूचना देना अनिवार्य है। लाइव काउंटडाउन घड़ी नियामक अनुपालन सुनिश्चित करती है।",
    demoStep8Title: "8. डेटा एंट्री ऑपरेटर (ई-सीआरएफ) पोर्टल",
    demoStep8Desc: "डेटा एंट्री ऑपरेटर भूमिका पर स्विच किया गया। डिजिटल ई-सीआरएफ फॉर्म में डेटा सत्यापन एवं नैदानिक प्रविष्टि की सुविधा।",
    demoStep9Title: "9. क्लिनिकल सत्यापन एवं आयुर्वेद प्रकृति मूल्यांकन",
    demoStep9Desc: "रक्तचाप (60-250 mmHg), खुराक (1-5000 mg), प्रकृति वर्गीकरण एवं शास्त्रीय योग खुराक प्रविष्टि।",
    demoStep10Title: "10. इंटरऑपरेबिलिटी: FHIR एवं CDISC/SDTM निर्यात",
    demoStep10Desc: "आयु-ट्रैक आयुर्वेद डेटा को HL7 FHIR और CDISC SDTM मानकों तथा नमस्ते (NAMASTE) कोड में मानकीकृत करता है।",
    demoStep11Title: "11. अनुसंधान प्रमुख कार्यकारी दृश्य पर वापसी",
    demoStep11Desc: "अनुसंधान प्रमुख डैशबोर्ड पर लौटें जहां समेकित परीक्षण स्वास्थ्य, ऑडिट और भर्ती वक्र दिखाई देते हैं।",
    demoStep12Title: "12. औषध-निगरानी एवं संभावित सुरक्षा पैटर्न चेतावनी",
    demoStep12Desc: "औषध-निगरानी मॉड्यूल बहु-केंद्रीय योगों में संभावित सुरक्षा पैटर्न का पता लगाकर समय पर समीक्षा की सिफारिश करता है।",
    demoStep13Title: "13. आयुष अधिकारी राष्ट्रीय निगरानी दृश्य",
    demoStep13Desc: "राष्ट्रीय आयुष अधिकारी दृश्य पर स्विच किया गया। राज्यवार परीक्षण निगरानी, समग्र अनुपालन और सुरक्षा निरीक्षण।",
    demoStep14Title: "14. नैतिकता एवं नियामक अनुपालन सत्यापन",
    demoStep14Desc: "CTRI पंजीकरण, नैतिकता समिति नवीनीकरण और NDCT नियम 2019 दस्तावेजों की पूर्ण ट्रैकिंग। निर्देशित डेमो संपन्न!",

    // Authentication & Registration
    welcomeBack: "आयु-ट्रैक में पुनः स्वागत है",
    loginSubtitle: "सीटीएमएस में प्रवेश के लिए अपने संस्थागत क्रेडेंशियल से साइन इन करें",
    officialEmail: "आधिकारिक ईमेल पता",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    rememberMe: "इस अनुसंधान कंप्यूटर पर मुझे याद रखें",
    forgotPassword: "पासवर्ड भूल गए?",
    dontHaveAccount: "संस्थागत खाता नहीं है?",
    alreadyHaveAccount: "क्या आपके पास पहले से खाता है?",
    registerNewAccount: "अपना आयु-ट्रैक खाता बनाएं",
    registerSubtitle: "अधिकृत नैदानिक शोधकर्ता, अन्वेषक, या डेटा ऑपरेटर के रूप में पंजीकरण करें",
    quickDemoCredentials: "त्वरित 1-क्लिक भूमिका लॉगिन (डेमो)",
    fillAllRequiredFields: "कृपया सभी आवश्यक फ़ील्ड भरें",
    passwordsDoNotMatch: "पासवर्ड मेल नहीं खाते हैं",
    accountCreatedSuccessfully: "खाता सफलतापूर्वक बन गया! लॉगिन पर भेजा जा रहा है...",
    loginSuccessful: "सफलतापूर्वक साइन इन किया गया। आयु-ट्रैक में स्वागत है!",
    termsAndPrivacy: "मैं आयु-ट्रैक डेटा नीति, NDCT नियम 2019 अनुपालन एवं GCP दिशानिर्देशों से सहमत हूँ।",

    // Footer
    footerDisclaimer: "प्रदर्शन उद्देश्यों के लिए डिज़ाइन किया गया। AIIA एवं आयुष मंत्रालय के नैदानिक परीक्षण कार्यप्रवाह के लिए विकसित।",
    footerGcpReady: "NDCT 2019 / GCP वास्तुकला अनुरूप",
    prototypeSampleData: "प्रोटोटाइप — नमूना डेटा"
  }
} as const;

export type TranslationKey = keyof typeof translations.en;

/**
 * Helper to translate role name based on active language
 */
export const getTranslatedRole = (role: string, lang: 'en' | 'hi'): string => {
  if (lang !== 'hi') return role;
  switch (role) {
    case 'Research Head':
      return translations.hi.roleResearchHead;
    case 'Doctor / Principal Investigator':
      return translations.hi.roleDoctorPI;
    case 'Data Entry Operator':
      return translations.hi.roleDataEntry;
    case 'Ayush Officer':
      return translations.hi.roleAyushOfficer;
    default:
      return role;
  }
};

/**
 * Helper to translate trial/participant/regulatory status
 */
export const getTranslatedStatus = (status: string, lang: 'en' | 'hi'): string => {
  if (lang !== 'hi') return status;
  switch (status) {
    case 'Recruiting':
      return translations.hi.statusRecruiting;
    case 'Active':
      return translations.hi.statusActive;
    case 'Paused':
      return translations.hi.statusPaused;
    case 'Completed':
      return translations.hi.statusCompleted;
    case 'Enrolled':
      return translations.hi.statusEnrolled;
    case 'In Follow-up':
      return translations.hi.statusInFollowup;
    case 'Withdrawn':
      return translations.hi.statusWithdrawn;
    case 'Approved':
      return translations.hi.statusApproved;
    case 'Pending':
      return translations.hi.statusPending;
    case 'Under Review':
      return translations.hi.statusUnderReview;
    case 'Rejected':
      return translations.hi.statusRejected;
    case 'Compliant':
      return translations.hi.statusCompliant;
    case 'Non-Compliant':
      return translations.hi.statusNonCompliant;
    case 'Draft':
      return translations.hi.statusDraft;
    case 'Verified':
      return translations.hi.statusVerified;
    case 'Signed':
      return translations.hi.statusSigned;
    case 'Mild':
      return translations.hi.statusMild;
    case 'Moderate':
      return translations.hi.statusModerate;
    case 'Severe':
      return translations.hi.statusSevere;
    case 'Serious':
      return translations.hi.statusSerious;
    case 'Recovered':
      return translations.hi.statusRecovered;
    case 'Recovering':
      return translations.hi.statusRecovering;
    case 'Not Recovered':
      return translations.hi.statusNotRecovered;
    case 'Fatal':
      return translations.hi.statusFatal;
    case 'Unknown':
      return translations.hi.statusUnknown;
    default:
      return status;
  }
};

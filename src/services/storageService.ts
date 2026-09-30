import { ClinicalTrial, Participant, AdverseEvent, ResearchSite, RegulatoryTask, NotificationItem, AuditLog, ECrfRecord } from '../types';
import { INITIAL_TRIALS, INITIAL_PARTICIPANTS, INITIAL_ADVERSE_EVENTS, INITIAL_SITES, INITIAL_REGULATORY_TASKS, INITIAL_NOTIFICATIONS, INITIAL_AUDIT_LOGS } from './mockData';

const KEYS = {
  TRIALS: 'ayutrack_trials_v1',
  PARTICIPANTS: 'ayutrack_participants_v1',
  ADVERSE_EVENTS: 'ayutrack_aes_v1',
  SITES: 'ayutrack_sites_v1',
  REGULATORY_TASKS: 'ayutrack_regulatory_v1',
  NOTIFICATIONS: 'ayutrack_notifications_v1',
  AUDIT_LOGS: 'ayutrack_audit_logs_v1',
  CRF_RECORDS: 'ayutrack_crf_records_v1',
  THEME: 'ayutrack_theme_mode',
  LANG: 'ayutrack_lang'
};

export const storageService = {
  getTrials(): ClinicalTrial[] {
    const raw = localStorage.getItem(KEYS.TRIALS);
    if (!raw) {
      localStorage.setItem(KEYS.TRIALS, JSON.stringify(INITIAL_TRIALS));
      return INITIAL_TRIALS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_TRIALS;
    }
  },

  saveTrials(trials: ClinicalTrial[]): void {
    localStorage.setItem(KEYS.TRIALS, JSON.stringify(trials));
  },

  getParticipants(): Participant[] {
    const raw = localStorage.getItem(KEYS.PARTICIPANTS);
    if (!raw) {
      localStorage.setItem(KEYS.PARTICIPANTS, JSON.stringify(INITIAL_PARTICIPANTS));
      return INITIAL_PARTICIPANTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_PARTICIPANTS;
    }
  },

  saveParticipants(participants: Participant[]): void {
    localStorage.setItem(KEYS.PARTICIPANTS, JSON.stringify(participants));
  },

  getAdverseEvents(): AdverseEvent[] {
    const raw = localStorage.getItem(KEYS.ADVERSE_EVENTS);
    if (!raw) {
      localStorage.setItem(KEYS.ADVERSE_EVENTS, JSON.stringify(INITIAL_ADVERSE_EVENTS));
      return INITIAL_ADVERSE_EVENTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_ADVERSE_EVENTS;
    }
  },

  saveAdverseEvents(aes: AdverseEvent[]): void {
    localStorage.setItem(KEYS.ADVERSE_EVENTS, JSON.stringify(aes));
  },

  getSites(): ResearchSite[] {
    const raw = localStorage.getItem(KEYS.SITES);
    if (!raw) {
      localStorage.setItem(KEYS.SITES, JSON.stringify(INITIAL_SITES));
      return INITIAL_SITES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_SITES;
    }
  },

  getRegulatoryTasks(): RegulatoryTask[] {
    const raw = localStorage.getItem(KEYS.REGULATORY_TASKS);
    if (!raw) {
      localStorage.setItem(KEYS.REGULATORY_TASKS, JSON.stringify(INITIAL_REGULATORY_TASKS));
      return INITIAL_REGULATORY_TASKS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_REGULATORY_TASKS;
    }
  },

  saveRegulatoryTasks(tasks: RegulatoryTask[]): void {
    localStorage.setItem(KEYS.REGULATORY_TASKS, JSON.stringify(tasks));
  },

  getNotifications(): NotificationItem[] {
    const raw = localStorage.getItem(KEYS.NOTIFICATIONS);
    if (!raw) {
      localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  },

  saveNotifications(notifs: NotificationItem[]): void {
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  },

  getAuditLogs(): AuditLog[] {
    const raw = localStorage.getItem(KEYS.AUDIT_LOGS);
    if (!raw) {
      localStorage.setItem(KEYS.AUDIT_LOGS, JSON.stringify(INITIAL_AUDIT_LOGS));
      return INITIAL_AUDIT_LOGS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  },

  addAuditLog(log: AuditLog): void {
    const logs = this.getAuditLogs();
    logs.unshift(log);
    localStorage.setItem(KEYS.AUDIT_LOGS, JSON.stringify(logs.slice(0, 100)));
  },

  getCrfRecords(): ECrfRecord[] {
    const raw = localStorage.getItem(KEYS.CRF_RECORDS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveCrfRecord(record: ECrfRecord): void {
    const records = this.getCrfRecords();
    const idx = records.findIndex(r => r.id === record.id);
    if (idx >= 0) {
      records[idx] = record;
    } else {
      records.unshift(record);
    }
    localStorage.setItem(KEYS.CRF_RECORDS, JSON.stringify(records));
  },

  resetAllToDefaults(): void {
    localStorage.removeItem(KEYS.TRIALS);
    localStorage.removeItem(KEYS.PARTICIPANTS);
    localStorage.removeItem(KEYS.ADVERSE_EVENTS);
    localStorage.removeItem(KEYS.SITES);
    localStorage.removeItem(KEYS.REGULATORY_TASKS);
    localStorage.removeItem(KEYS.NOTIFICATIONS);
    localStorage.removeItem(KEYS.AUDIT_LOGS);
    localStorage.removeItem(KEYS.CRF_RECORDS);
  }
};

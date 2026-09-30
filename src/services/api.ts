/**
 * AyuTrack CTMS API Service Layer
 * 
 * Provides an asynchronous facade over the local storage persistence engine.
 * Designed according to Clean Architecture so it can be swapped with real
 * REST/GraphQL endpoints (FastAPI / Express + PostgreSQL) seamlessly.
 */

import { ClinicalTrial, Participant, AdverseEvent, ResearchSite, RegulatoryTask, NotificationItem, AuditLog, ECrfRecord, UserRole } from '../types';
import { storageService } from './storageService';

export const api = {
  // Trials
  async getTrials(): Promise<ClinicalTrial[]> {
    return storageService.getTrials();
  },

  async getTrialById(id: string): Promise<ClinicalTrial | undefined> {
    const trials = storageService.getTrials();
    return trials.find(t => t.id === id);
  },

  async createTrial(trial: ClinicalTrial, currentUser: string, role: UserRole): Promise<ClinicalTrial> {
    const trials = storageService.getTrials();
    trials.unshift(trial);
    storageService.saveTrials(trials);

    storageService.addAuditLog({
      id: `LOG-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: currentUser,
      role,
      action: 'Trial Created',
      details: `Created new clinical trial ${trial.id}: ${trial.shortTitle}`,
      ipAddress: '127.0.0.1'
    });

    return trial;
  },

  async updateTrial(trial: ClinicalTrial, currentUser: string, role: UserRole): Promise<ClinicalTrial> {
    const trials = storageService.getTrials();
    const idx = trials.findIndex(t => t.id === trial.id);
    if (idx !== -1) {
      trials[idx] = trial;
      storageService.saveTrials(trials);
      storageService.addAuditLog({
        id: `LOG-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        user: currentUser,
        role,
        action: 'Trial Updated',
        details: `Updated parameters for trial ${trial.id}`,
        ipAddress: '127.0.0.1'
      });
    }
    return trial;
  },

  // Participants
  async getParticipants(): Promise<Participant[]> {
    return storageService.getParticipants();
  },

  async getParticipantById(id: string): Promise<Participant | undefined> {
    const list = storageService.getParticipants();
    return list.find(p => p.id === id);
  },

  async createParticipant(participant: Participant, currentUser: string, role: UserRole): Promise<Participant> {
    const list = storageService.getParticipants();
    list.unshift(participant);
    storageService.saveParticipants(list);

    // Update trial enrolled count
    const trials = storageService.getTrials();
    const trialIdx = trials.findIndex(t => t.id === participant.trialId);
    if (trialIdx !== -1) {
      trials[trialIdx].enrolledParticipants += 1;
      storageService.saveTrials(trials);
    }

    storageService.addAuditLog({
      id: `LOG-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: currentUser,
      role,
      action: 'Participant Enrolled',
      details: `Enrolled participant ${participant.id} into trial ${participant.trialId} at ${participant.site}`,
      ipAddress: '127.0.0.1'
    });

    return participant;
  },

  async updateParticipant(participant: Participant, currentUser: string, role: UserRole): Promise<Participant> {
    const list = storageService.getParticipants();
    const idx = list.findIndex(p => p.id === participant.id);
    if (idx !== -1) {
      list[idx] = participant;
      storageService.saveParticipants(list);
      storageService.addAuditLog({
        id: `LOG-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        user: currentUser,
        role,
        action: 'Participant Record Updated',
        details: `Updated visit/vital data for ${participant.id}`,
        ipAddress: '127.0.0.1'
      });
    }
    return participant;
  },

  // Adverse Events
  async getAdverseEvents(): Promise<AdverseEvent[]> {
    return storageService.getAdverseEvents();
  },

  async createAdverseEvent(ae: AdverseEvent, currentUser: string, role: UserRole): Promise<AdverseEvent> {
    const list = storageService.getAdverseEvents();
    list.unshift(ae);
    storageService.saveAdverseEvents(list);

    // If serious, add high-priority notification!
    if (ae.isSerious) {
      const notifs = storageService.getNotifications();
      notifs.unshift({
        id: `NOTIF-${Date.now().toString().slice(-4)}`,
        title: `CRITICAL SAE ALERT: ${ae.participantId}`,
        message: `${ae.eventDescription} in ${ae.trialId}. 24-hr statutory reporting clock started.`,
        timestamp: 'Just now',
        priority: 'High',
        read: false,
        linkTab: 'adverse-events'
      });
      storageService.saveNotifications(notifs);
    }

    storageService.addAuditLog({
      id: `LOG-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: currentUser,
      role,
      action: ae.isSerious ? 'SERIOUS ADVERSE EVENT REPORTED' : 'Adverse Event Logged',
      details: `${ae.isSerious ? '[SAE]' : '[AE]'} ID ${ae.id} for participant ${ae.participantId} (${ae.severity})`,
      ipAddress: '127.0.0.1'
    });

    return ae;
  },

  // Sites
  async getSites(): Promise<ResearchSite[]> {
    return storageService.getSites();
  },

  // Regulatory Tasks
  async getRegulatoryTasks(): Promise<RegulatoryTask[]> {
    return storageService.getRegulatoryTasks();
  },

  async updateRegulatoryTask(task: RegulatoryTask, currentUser: string, role: UserRole): Promise<RegulatoryTask> {
    const tasks = storageService.getRegulatoryTasks();
    const idx = tasks.findIndex(t => t.id === task.id);
    if (idx !== -1) {
      tasks[idx] = task;
      storageService.saveRegulatoryTasks(tasks);
      storageService.addAuditLog({
        id: `LOG-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        user: currentUser,
        role,
        action: 'Compliance Task Updated',
        details: `Task ${task.task} status changed to ${task.status}`,
        ipAddress: '127.0.0.1'
      });
    }
    return task;
  },

  // eCRF
  async saveCrfRecord(record: ECrfRecord, currentUser: string, role: UserRole): Promise<ECrfRecord> {
    storageService.saveCrfRecord(record);

    // Update participant vitals and eCrfStatus
    const participants = storageService.getParticipants();
    const pIdx = participants.findIndex(p => p.id === record.participantId);
    if (pIdx !== -1) {
      participants[pIdx].vitals.systolicBp = record.systolicBp;
      participants[pIdx].vitals.diastolicBp = record.diastolicBp;
      participants[pIdx].vitals.pulseRate = record.pulseRate;
      participants[pIdx].vitals.temperatureF = record.temperatureF;
      participants[pIdx].prakriti = record.prakriti;
      participants[pIdx].eCrfStatus = record.status;
      storageService.saveParticipants(participants);
    }

    storageService.addAuditLog({
      id: `LOG-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: currentUser,
      role,
      action: 'eCRF Saved',
      details: `Saved visit record for ${record.participantId} (${record.visitName})`,
      ipAddress: '127.0.0.1'
    });

    return record;
  },

  // Audit Logs
  async getAuditLogs(): Promise<AuditLog[]> {
    return storageService.getAuditLogs();
  },

  // Notifications
  async getNotifications(): Promise<NotificationItem[]> {
    return storageService.getNotifications();
  },

  async markNotificationRead(id: string): Promise<void> {
    const list = storageService.getNotifications();
    const item = list.find(n => n.id === id);
    if (item) {
      item.read = true;
      storageService.saveNotifications(list);
    }
  },

  async markAllNotificationsRead(): Promise<void> {
    const list = storageService.getNotifications();
    list.forEach(n => (n.read = true));
    storageService.saveNotifications(list);
  }
};

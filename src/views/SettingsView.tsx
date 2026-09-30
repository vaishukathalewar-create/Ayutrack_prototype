import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  UserCheck, 
  Database, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  RefreshCcw,
  Sliders,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { AuditLog } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const SettingsView: React.FC = () => {
  const { showToast, triggerRefresh, refreshKey } = useApp();
  const { userRole, currentUser } = useAuth();

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  useEffect(() => {
    setAuditLogs(storageService.getAuditLogs());
  }, [refreshKey]);

  const handleResetData = () => {
    storageService.resetAllToDefaults();
    setIsResetConfirmOpen(false);
    triggerRefresh();
    showToast('AyuTrack demonstration database restored to default seed state', 'success');
  };

  const rbacMatrix = [
    { permission: 'Create / Register New Clinical Trial', rh: true, pi: false, deo: false, ao: false },
    { permission: 'Enroll Participant into Study', rh: true, pi: true, deo: false, ao: false },
    { permission: 'eCRF Digital Clinical Data Entry', rh: false, pi: true, deo: true, ao: false },
    { permission: 'Verify & Sign eCRF Forms', rh: false, pi: true, deo: false, ao: false },
    { permission: 'Report Adverse Event & Trigger SAE', rh: true, pi: true, deo: false, ao: false },
    { permission: 'National Regulatory Audit & State Surveillance', rh: true, pi: false, deo: false, ao: true },
    { permission: 'Download Institutional GCP Dossiers', rh: true, pi: true, deo: false, ao: true }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <Breadcrumb currentTabKey="settings" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sliders className="w-6 h-6 text-emerald-600" />
              <span>Security, RBAC & Audit System</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Role-Based Access Control matrix, prototype security architecture, and regulatory audit trail.
            </p>
          </div>

          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 hover:bg-rose-100 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Ledger</span>
          </button>
        </div>
      </div>

      {/* Requirement #19: Security Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-400/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold uppercase tracking-wider block">
            PROTOTYPE NOTICE: Certified Backend Integration Architecture
          </span>
          <p className="mt-0.5 leading-relaxed">
            The security controls displayed below represent the architectural requirements for production deployment under Indian CDSCO and NDCT 2019 guidelines. Full HMAC-SHA256 JWT, Hardware Security Module (HSM) key management, and PostgreSQL row-level security (RLS) will be connected upon backend deployment.
          </p>
        </div>
      </div>

      {/* Security Architecture Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        
        {/* JWT Card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Key className="w-5 h-5 text-emerald-600" />
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                Placeholder
              </span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">JWT Token Auth</h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Stateless RS256 token authentication with 15-minute access expiry and sliding refresh sessions.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-emerald-600 font-semibold">
            Status: Simulated in Local State
          </div>
        </div>

        {/* Data Encryption */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Lock className="w-5 h-5 text-teal-600" />
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                Placeholder
              </span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Data Encryption</h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              AES-256 for participant identifiers & PHI at rest. Enforced TLS 1.3 encryption in transit.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-teal-600 font-semibold">
            Status: Backend Integration Required
          </div>
        </div>

        {/* Consent Tracking */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Active
              </span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Informed Consent AV</h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Audio-Video (AV) recording verification ledger for vulnerable clinical cohorts under Schedule Y.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-blue-600 font-semibold">
            Status: 100% Subjects Verified
          </div>
        </div>

        {/* Session Management */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Active
              </span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Session Guard</h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Automatic idle timeout protection (15m inactivity threshold) and IP origin validation.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-amber-600 font-semibold">
            Status: Active for {currentUser}
          </div>
        </div>

      </div>

      {/* Role-Based Access Control (RBAC) Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-serif">
            Role-Based Access Control (RBAC) Permission Matrix
          </h3>
          <p className="text-xs text-slate-500">
            Enforced separation of clinical oversight, data entry, and national surveillance duties.
          </p>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">Permission / CTMS Action</th>
                <th className="px-4 py-3 text-center">Research Head</th>
                <th className="px-4 py-3 text-center">Doctor / PI</th>
                <th className="px-4 py-3 text-center">Data Entry</th>
                <th className="px-4 py-3 text-center">Ayush Officer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {rbacMatrix.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                    {row.permission}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.rh ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.pi ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.deo ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.ao ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <span className="text-slate-300">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-serif">
            Immutable Regulatory Audit Log (CDSCO / GCP Compliant)
          </h3>
          <p className="text-xs text-slate-500">
            Real-time trail of data entry, verification signatures, SAE triggers, and parameter updates.
          </p>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">User & Role</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Audit Details</th>
                <th className="px-4 py-3 text-right">IP Origin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 text-[11px]">
                  <td className="px-4 py-3 text-slate-400">{log.timestamp}</td>
                  <td className="px-4 py-3 font-sans">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{log.user}</span>
                    <span className="text-[10px] text-slate-400 block">{log.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold font-sans">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-sans max-w-sm truncate text-slate-600 dark:text-slate-300">
                    {log.details}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Dialog for Reset */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold text-rose-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Reset Demo Database?</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              This will restore all Clinical Trials, Participants, Adverse Events, and Regulatory Tasks to their initial Smart India Hackathon prototype seed state.
            </p>
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleResetData}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white"
              >
                Yes, Reset Ledger
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

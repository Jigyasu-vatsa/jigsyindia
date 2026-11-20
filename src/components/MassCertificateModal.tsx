import React, { useState, useEffect } from 'react';
import { 
  Award, Download, CheckSquare, Square, 
  Layers, CheckCircle2, ShieldCheck
} from 'lucide-react';
import { InternshipApplication } from '../types';
import { generateCertificateNumber } from '../utils/idGenerator';
import { DEFAULT_ATTENDANCE_CRITERIA } from '../utils/portalHelpers';

export interface BatchCertificateDefaults {
  signatory1Name: string;
  signatory1Title: string;
  signatory2Name: string;
  signatory2Title: string;
  includeEvaluationGrade: boolean;
  grade: string;
  includeAttendanceNote: boolean;
  attendanceCriteria: string;
}

interface MassCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: InternshipApplication[];
  onOpenSingleCertificate: (app: InternshipApplication, defaults?: BatchCertificateDefaults) => void;
}

export const MassCertificateModal: React.FC<MassCertificateModalProps> = ({
  isOpen,
  onClose,
  applications,
  onOpenSingleCertificate,
}) => {
  // Only verified and accepted candidates are eligible for certificate issuance
  const eligibleApps = applications.filter(
    (app) => app.status === 'verified' || app.status === 'accepted'
  );

  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    eligibleApps.map((a) => a.id)
  );

  useEffect(() => {
    if (isOpen) {
      setSelectedIds(
        applications
          .filter((app) => app.status === 'verified' || app.status === 'accepted')
          .map((a) => a.id)
      );
    }
  }, [isOpen, applications]);

  // Mass Customization Controls for Signatories, Attendance Criteria & Evaluation
  const [signatory1Name, setSignatory1Name] = useState('Subhash Chandra Jha');
  const [signatory1Title, setSignatory1Title] = useState('Director & Head JIGSY Youth');
  const [signatory2Name, setSignatory2Name] = useState('Jigyasu Vatsa');
  const [signatory2Title, setSignatory2Title] = useState('Founder & Chief JIGSY India');
  const [includeEvaluationGrade, setIncludeEvaluationGrade] = useState(true);
  const [batchGrade, setBatchGrade] = useState('Grade A+ (Distinction)');
  const [includeAttendanceNote, setIncludeAttendanceNote] = useState(true);
  const [attendanceCriteria, setAttendanceCriteria] = useState(DEFAULT_ATTENDANCE_CRITERIA);

  const [batchStatus, setBatchStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleToggleSelectAll = () => {
    if (selectedIds.length === eligibleApps.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(eligibleApps.map((a) => a.id));
    }
  };

  const handleToggleId = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentBatchDefaults: BatchCertificateDefaults = {
    signatory1Name,
    signatory1Title,
    signatory2Name,
    signatory2Title,
    includeEvaluationGrade,
    grade: batchGrade,
    includeAttendanceNote,
    attendanceCriteria,
  };

  const handleExportSelectedManifest = () => {
    const selectedRecords = eligibleApps
      .filter((app) => selectedIds.includes(app.id))
      .map((app) => ({
        certificateNumber: generateCertificateNumber(app.fullName, app.id),
        applicationId: app.id,
        candidateName: `${app.salutation || 'Mr./Ms.'} ${app.fullName}`,
        fatherName: app.fatherName || 'On Record',
        college: app.college,
        degree: app.degree,
        branch: app.branch,
        track: app.trackTitle,
        format: 'A4 Landscape',
        evaluationStatus: includeEvaluationGrade ? batchGrade : 'Verified',
        evaluationType: includeEvaluationGrade ? 'Evaluation Grade' : 'Verified Credential',
        attendanceCriteria:
          includeAttendanceNote && attendanceCriteria.trim()
            ? attendanceCriteria.trim()
            : null,
        amountPaid: app.totalAmount,
        status: 'Issued & Certified',
        issueDate: new Date().toLocaleDateString('en-GB'),
        signatory1: {
          name: signatory1Name,
          designation: signatory1Title,
        },
        signatory2: {
          name: signatory2Name,
          designation: signatory2Title,
        },
        verificationPortal: 'https://jigsy.in',
      }));

    const blob = new Blob([JSON.stringify(selectedRecords, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jigsy_mass_certificates_registry_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1500);

    setBatchStatus(`Exported signed certificate registry for ${selectedRecords.length} candidates!`);
    setTimeout(() => setBatchStatus(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 my-6 space-y-5 text-slate-900 dark:text-slate-100 max-h-[92vh] overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 dark:bg-amber-950 rounded-xl text-amber-700 dark:text-amber-300">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Bulk Administration Desk
              </span>
              <h3 className="text-lg font-bold brand-font">
                Mass Certificate Issuance &amp; Verification Desk (Landscape A4)
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xl font-bold px-2 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Customizable Signatories & Performance Options Toolbar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            Batch Certificate Configuration &amp; Customizable Signatories
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            {/* Signatory 1 (Director) */}
            <div className="space-y-1">
              <label className="font-semibold block text-slate-700 dark:text-slate-300">
                Signatory 1 Name:
              </label>
              <input
                type="text"
                value={signatory1Name}
                onChange={(e) => setSignatory1Name(e.target.value)}
                placeholder="Signatory 1 Name"
                className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-medium"
              />
              <label className="font-semibold block text-slate-700 dark:text-slate-300 pt-1">
                Signatory 1 Designation:
              </label>
              <input
                type="text"
                value={signatory1Title}
                onChange={(e) => setSignatory1Title(e.target.value)}
                placeholder="Signatory 1 Title"
                className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400"
              />
            </div>

            {/* Signatory 2 (Founder - Jigyasu Vatsa) */}
            <div className="space-y-1">
              <label className="font-semibold block text-slate-700 dark:text-slate-300">
                Signatory 2 Name:
              </label>
              <input
                type="text"
                value={signatory2Name}
                onChange={(e) => setSignatory2Name(e.target.value)}
                placeholder="Signatory 2 Name"
                className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-medium"
              />
              <label className="font-semibold block text-slate-700 dark:text-slate-300 pt-1">
                Signatory 2 Designation:
              </label>
              <input
                type="text"
                value={signatory2Title}
                onChange={(e) => setSignatory2Title(e.target.value)}
                placeholder="Signatory 2 Title"
                className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400"
              />
            </div>

              {/* Performance Grade vs Verified Toggle */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Evaluation Option:
                  </label>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs text-amber-600 dark:text-amber-400 font-bold select-none">
                    <input
                      type="checkbox"
                      checked={includeEvaluationGrade}
                      onChange={(e) => setIncludeEvaluationGrade(e.target.checked)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>Include Grade</span>
                  </label>
                </div>

                {includeEvaluationGrade ? (
                  <div>
                    <input
                      type="text"
                      value={batchGrade}
                      onChange={(e) => setBatchGrade(e.target.value)}
                      placeholder="e.g. Grade A+ (Distinction)"
                      className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-semibold text-emerald-700 dark:text-emerald-400"
                    />
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Evaluation word will be displayed with grade.
                    </span>
                  </div>
                ) : (
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Evaluation replaced with <strong>Verified</strong></span>
                  </div>
                )}

                {/* Attendance Criteria (Optional) */}
                <div className="pt-1 border-t border-slate-200 dark:border-slate-700/80">
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                      Attendance Criteria (Optional):
                    </label>
                    <label className="inline-flex items-center gap-1 cursor-pointer text-[11px] text-amber-600 dark:text-amber-400 font-bold select-none">
                      <input
                        type="checkbox"
                        checked={includeAttendanceNote}
                        onChange={(e) => setIncludeAttendanceNote(e.target.checked)}
                        className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span>Include</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    disabled={!includeAttendanceNote}
                    value={attendanceCriteria}
                    onChange={(e) => setAttendanceCriteria(e.target.value)}
                    placeholder="e.g. Minimum 60% Attendance & Evaluation Criteria Met"
                    className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          </div>

        {/* Selection Bar */}
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between flex-wrap gap-2">
          <div>
            <strong>Automated Batch Manifest:</strong> Select verified candidates to export an official signed certification registry (in standard Landscape A4 format).
          </div>
          <button
            type="button"
            onClick={handleToggleSelectAll}
            className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            {selectedIds.length === eligibleApps.length ? (
              <>
                <CheckSquare className="w-3.5 h-3.5" /> Deselect All
              </>
            ) : (
              <>
                <Square className="w-3.5 h-3.5" /> Select All ({eligibleApps.length})
              </>
            )}
          </button>
        </div>

        {batchStatus && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{batchStatus}</span>
          </div>
        )}

        {/* Candidate Selection List */}
        {eligibleApps.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-500">
            No verified or accepted candidates currently eligible for certificate issuance.
          </div>
        ) : (
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden max-h-96 overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 sticky top-0">
                <tr>
                  <th className="py-2 px-3 w-10">Select</th>
                  <th className="py-2 px-3">Candidate &amp; Father Name</th>
                  <th className="py-2 px-3">Program &amp; Institution</th>
                  <th className="py-2 px-3">Enrolled Track</th>
                  <th className="py-2 px-3">Generated Cert ID</th>
                  <th className="py-2 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {eligibleApps.map((app) => {
                  const isSelected = selectedIds.includes(app.id);
                  const certId = generateCertificateNumber(app.fullName, app.id);
                  return (
                    <tr
                      key={app.id}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                        isSelected ? 'bg-amber-50/40 dark:bg-amber-950/20' : ''
                      }`}
                    >
                      <td className="py-2 px-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleId(app.id)}
                          className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <div className="font-bold text-slate-900 dark:text-slate-100">
                          {app.salutation ? `${app.salutation} ` : ''}{app.fullName}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Father: {app.fatherName || 'On Record'}
                        </div>
                      </td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-300">
                        <div>{app.college}</div>
                        <div className="text-[10px] text-slate-400">
                          {app.degree} ({app.branch})
                        </div>
                      </td>
                      <td className="py-2 px-3 font-medium text-slate-800 dark:text-slate-200">
                        {app.trackTitle}
                      </td>
                      <td className="py-2 px-3 font-mono text-[10.5px] text-blue-700 dark:text-blue-400">
                        {certId}
                      </td>
                      <td className="py-2 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenSingleCertificate(app, currentBatchDefaults);
                          }}
                          className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-[11px] font-semibold flex items-center gap-1 ml-auto cursor-pointer"
                        >
                          <Award className="w-3 h-3" />
                          View Landscape Cert
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal Bottom Actions */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="text-slate-500">
            Selected: <strong>{selectedIds.length}</strong> of <strong>{eligibleApps.length}</strong> candidate(s)
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={handleExportSelectedManifest}
              className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 text-white font-bold rounded-xl flex items-center gap-1.5 shadow cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Export Selected Batch Registry (JSON)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

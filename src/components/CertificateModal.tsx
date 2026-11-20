import React, { useState, useRef, useEffect } from 'react';
import { 
  Award, Download, Printer, Mail, 
  Loader2, CheckCircle2, ShieldCheck, QrCode
} from 'lucide-react';
import QRCode from 'qrcode';
import { InternshipApplication } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { printDocument, exportElementToPdf } from '../utils/printHelper';
import { generateCertificateNumber, buildCertificateQrPayload } from '../utils/idGenerator';
import { TENURE_PRESETS, DEFAULT_ATTENDANCE_CRITERIA, getDefaultTenureForTrack } from '../utils/portalHelpers';
import type { BatchCertificateDefaults } from './MassCertificateModal';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: InternshipApplication | null;
  batchDefaults?: BatchCertificateDefaults | null;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  application,
  batchDefaults = null,
}) => {
  const certPrintRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  // Editable Certificate Fields
  const [certNumber, setCertNumber] = useState('');
  const [salutation, setSalutation] = useState('Mr.');
  const [candidateName, setCandidateName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('B.Tech');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [trackTitle, setTrackTitle] = useState('Internship Training Certification');
  const [duration, setDuration] = useState('4 Weeks (30 Days / 120 Hours)');
  const [includeAttendanceNote, setIncludeAttendanceNote] = useState(true);
  const [attendanceCriteria, setAttendanceCriteria] = useState(DEFAULT_ATTENDANCE_CRITERIA);
  const [includeEvaluationGrade, setIncludeEvaluationGrade] = useState(true);
  const [grade, setGrade] = useState('Grade A+ (Distinction)');
  const [issueDate, setIssueDate] = useState(() => new Date().toLocaleDateString('en-GB'));
  const [signatory1Name, setSignatory1Name] = useState('Subhash Chandra Jha');
  const [signatory1Title, setSignatory1Title] = useState('Director & Head JIGSY Youth');
  const [signatory2Name, setSignatory2Name] = useState('Jigyasu Vatsa');
  const [signatory2Title, setSignatory2Title] = useState('Founder & Chief JIGSY India');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  useEffect(() => {
    if (application) {
      const generatedNo = generateCertificateNumber(application.fullName, application.id);
      setCertNumber(generatedNo);
      setSalutation(application.salutation || 'Mr.');
      setCandidateName(application.fullName);
      setFatherName(application.fatherName || '');
      setCollege(application.college || 'University / Institute');
      setDegree(application.degree || 'B.Tech');
      setBranch(application.branch || 'Engineering & Technology');
      setTrackTitle(application.trackTitle);
      setDuration(getDefaultTenureForTrack(application.trackId));
      setIncludeAttendanceNote(
        batchDefaults ? batchDefaults.includeAttendanceNote : true
      );
      setAttendanceCriteria(
        batchDefaults ? batchDefaults.attendanceCriteria : DEFAULT_ATTENDANCE_CRITERIA
      );
      setIncludeEvaluationGrade(
        batchDefaults ? batchDefaults.includeEvaluationGrade : true
      );
      setGrade(batchDefaults ? batchDefaults.grade : 'Grade A+ (Distinction)');
      setIssueDate(new Date().toLocaleDateString('en-GB'));
      setSignatory1Name(batchDefaults?.signatory1Name || 'Subhash Chandra Jha');
      setSignatory1Title(batchDefaults?.signatory1Title || 'Director & Head JIGSY Youth');
      setSignatory2Name(batchDefaults?.signatory2Name || 'Jigyasu Vatsa');
      setSignatory2Title(batchDefaults?.signatory2Title || 'Founder & Chief JIGSY India');
      setPdfError(null);
    }
  }, [application, batchDefaults]);

  // Build dynamic QR Code data payload and generate local base64 image (Zero external latency / Zero CORS)
  const qrPayload = buildCertificateQrPayload({
    certNumber,
    candidateName: `${salutation} ${candidateName}`,
    fatherName,
    trackTitle,
    issueDate,
  });

  useEffect(() => {
    if (!qrPayload) return;
    QRCode.toDataURL(qrPayload, {
      width: 220,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => {
        console.warn('Local QR generation error, using fallback URL:', err);
        setQrCodeDataUrl(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrPayload)}`);
      });
  }, [qrPayload]);

  if (!isOpen || !application) return null;

  // Download PDF Handler (LANDSCAPE A4 - strictly downloads .pdf file without opening print dialog)
  const handleDownloadPdf = async () => {
    if (!certPrintRef.current) return;
    setIsGeneratingPdf(true);
    setPdfError(null);
    try {
      const safeName = (candidateName || 'Candidate').replace(/\s+/g, '_');
      const safeNum = certNumber.replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `JIGSY_Certificate_Landscape_${safeName}_${safeNum}.pdf`;
      const ok = await exportElementToPdf(certPrintRef.current, filename, true, 'l');
      if (!ok) {
        setPdfError('PDF file export encountered a browser restriction. You may also use Print / Save PDF.');
      }
    } catch (err) {
      console.error('Failed to export landscape certificate PDF:', err);
      setPdfError('Could not generate PDF file. Please try again or use Print / Save PDF.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Browser Print Handler (LANDSCAPE A4)
  const handlePrint = () => {
    if (!certPrintRef.current) return;
    printDocument({
      title: `JIGSY INDIA - Official Certificate - ${candidateName}`,
      filename: `JIGSY_Certificate_Landscape_${candidateName.replace(/\s+/g, '_')}`,
      contentHtml: certPrintRef.current.innerHTML,
      orientation: 'landscape',
    });
  };

  // Mailto Link
  const gradeLine = includeEvaluationGrade ? `• Evaluation Grade: ${grade}\n` : '• Credential Status: Verified\n';
  const emailSubject = encodeURIComponent(`[Internship Certificate] ${certNumber} - ${candidateName}`);
  const emailBody = encodeURIComponent(
`Dear ${candidateName},

Heartiest congratulations on successfully completing your industrial internship with Jigyasu Integrated Global Services Private Limited (JIGSY INDIA)!

Please find your official Certificate credentials below:

• Certificate No: ${certNumber}
• Candidate: ${salutation} ${candidateName}
${fatherName ? `• S/D of: Shri ${fatherName}\n` : ''}• Institution: ${college}
• Program: ${degree} in ${branch}
• Track: ${trackTitle}
• Duration: ${duration}
${gradeLine}• Issue Date: ${issueDate}
• Verifiable at: https://jigsy.in

Your signed official certificate has been issued under the seal of JIGSY INDIA in standard landscape format.

Warm regards,
${signatory1Name}, ${signatory1Title}
${signatory2Name}, ${signatory2Title}
JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED
Email: jigsy25@gmail.com | Phone: +91 94314 00022
`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto print-modal-container">
      <div className="w-full max-w-6xl bg-white text-slate-950 rounded-2xl shadow-2xl p-4 sm:p-6 space-y-4 max-h-[96vh] overflow-y-auto">
        
        {/* Admin Customization Toolbar (Hidden during Print) */}
        <div className="no-print p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 space-y-3 shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                <Award className="w-4 h-4" />
                Certificate Desk (Landscape A4)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold border border-amber-300 dark:border-amber-700">
                Standard Landscape Format (297 × 210 mm)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={isGeneratingPdf}
                onClick={handleDownloadPdf}
                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Download Landscape PDF Certificate"
              >
                {isGeneratingPdf ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                {isGeneratingPdf ? 'Generating PDF...' : 'Download Official PDF (Landscape)'}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Print or Save as Landscape PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF (Landscape)
              </button>

              <a
                href={`mailto:${application.email}?subject=${emailSubject}&body=${emailBody}`}
                className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Email certificate copy to candidate"
              >
                <Mail className="w-3.5 h-3.5" />
                Email to Candidate
              </a>

              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold px-1.5 cursor-pointer"
                title="Close Certificate"
              >
                ✕
              </button>
            </div>
          </div>

          {pdfError && (
            <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 font-medium">
              {pdfError}
            </div>
          )}

          {/* Form Input Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
            {/* Candidate Name & Salutation */}
            <div>
              <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                Candidate Name:
              </label>
              <div className="flex gap-1">
                <select
                  value={salutation}
                  onChange={(e) => setSalutation(e.target.value)}
                  className="w-20 px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-semibold"
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Dr.">Dr.</option>
                </select>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Full Name"
                  className="flex-1 px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>
            </div>

            {/* Father's Name */}
            <div>
              <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                Father's / Guardian's Name:
              </label>
              <input
                type="text"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                placeholder="Father's Full Name"
                className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              />
            </div>

            {/* College */}
            <div>
              <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                College / University:
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="College / Institute"
                className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              />
            </div>

            {/* Degree & Branch */}
            <div>
              <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                Degree &amp; Branch:
              </label>
              <div className="flex gap-1">
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="Degree"
                  className="w-20 px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
                />
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  placeholder="Branch / Domain"
                  className="flex-1 px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
                />
              </div>
            </div>

            {/* Track Title */}
            <div>
              <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                Internship Track / Domain:
              </label>
              <input
                type="text"
                value={trackTitle}
                onChange={(e) => setTrackTitle(e.target.value)}
                placeholder="Track Title"
                className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              />
            </div>

            {/* Duration Preset + Custom Input */}
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Tenure (Weeks / Hours):
                </label>
                <select
                  aria-label="Tenure Preset"
                  value=""
                  onChange={(e) => {
                    if (e.target.value) setDuration(e.target.value);
                  }}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-blue-700 dark:text-blue-300 font-semibold"
                >
                  <option value="">Presets...</option>
                  {TENURE_PRESETS.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 4 Weeks (30 Days / 120 Hours)"
                className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              />
            </div>

            {/* Attendance / Criteria Checkbox & Text */}
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Attendance Criteria:
                </label>
                <label className="inline-flex items-center gap-1 cursor-pointer text-[11px] text-amber-600 dark:text-amber-400 font-semibold select-none">
                  <input
                    type="checkbox"
                    checked={includeAttendanceNote}
                    onChange={(e) => setIncludeAttendanceNote(e.target.checked)}
                    className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span>Show</span>
                </label>
              </div>
              <input
                type="text"
                disabled={!includeAttendanceNote}
                value={attendanceCriteria}
                onChange={(e) => setAttendanceCriteria(e.target.value)}
                placeholder="e.g. Minimum 60% Attendance Met"
                className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 disabled:opacity-50"
              />
            </div>

            {/* Performance Grade vs Verified Toggle */}
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Performance Evaluation:
                </label>
                <label className="inline-flex items-center gap-1 cursor-pointer text-[11px] text-amber-600 dark:text-amber-400 font-semibold select-none">
                  <input
                    type="checkbox"
                    checked={includeEvaluationGrade}
                    onChange={(e) => setIncludeEvaluationGrade(e.target.checked)}
                    className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span>Grade</span>
                </label>
              </div>
              {includeEvaluationGrade ? (
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="e.g. Grade A+ (Distinction)"
                  className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-semibold text-emerald-700 dark:text-emerald-400"
                />
              ) : (
                <div className="w-full px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 font-bold text-emerald-800 dark:text-emerald-200 text-center">
                  Verified Status (Evaluation word replaced)
                </div>
              )}
            </div>

            {/* Certificate Number */}
            <div>
              <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                Certificate Number:
              </label>
              <input
                type="text"
                value={certNumber}
                onChange={(e) => setCertNumber(e.target.value)}
                placeholder="JIGSY/CERT/2026/..."
                className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-[11px]"
              />
            </div>

            {/* Issue Date */}
            <div>
              <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                Date of Issue:
              </label>
              <input
                type="text"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                placeholder="DD/MM/YYYY"
                className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono"
              />
            </div>

            {/* Signatory 1 Name & Designation */}
            <div>
              <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                Signatory 1 Name &amp; Designation:
              </label>
              <div className="space-y-1">
                <input
                  type="text"
                  value={signatory1Name}
                  onChange={(e) => setSignatory1Name(e.target.value)}
                  placeholder="Signatory 1 Name"
                  className="w-full px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-medium"
                />
                <input
                  type="text"
                  value={signatory1Title}
                  onChange={(e) => setSignatory1Title(e.target.value)}
                  placeholder="Signatory 1 Designation"
                  className="w-full px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300"
                />
              </div>
            </div>

            {/* Signatory 2 Name & Designation (Jigyasu Vatsa) */}
            <div>
              <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                Signatory 2 Name &amp; Designation:
              </label>
              <div className="space-y-1">
                <input
                  type="text"
                  value={signatory2Name}
                  onChange={(e) => setSignatory2Name(e.target.value)}
                  placeholder="Signatory 2 Name"
                  className="w-full px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-medium"
                />
                <input
                  type="text"
                  value={signatory2Title}
                  onChange={(e) => setSignatory2Title(e.target.value)}
                  placeholder="Signatory 2 Designation"
                  className="w-full px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* OFFICIAL PRINTABLE CERTIFICATE CARD (LANDSCAPE A4 LAYOUT)                 */}
        {/* ========================================================================= */}
        <div className="overflow-x-auto pb-4 flex justify-center">
          <div 
            ref={certPrintRef}
            id="printableCertificate"
            className="print-section print-landscape relative bg-white text-slate-950 font-serif leading-tight shadow-2xl mx-auto rounded-none overflow-hidden box-border"
            style={{ 
              width: '1020px', 
              minWidth: '1020px', 
              maxWidth: '1020px',
              height: '710px', 
              minHeight: '710px', 
              maxHeight: '710px',
              backgroundColor: '#ffffff',
              padding: '10px',
              boxSizing: 'border-box'
            }}
          >
            {/* Outer Gold Border Frame */}
            <div 
              className="w-full h-full relative flex flex-col justify-between box-border rounded-none"
              style={{
                border: '4px solid #d97706',
                padding: '8px',
                boxSizing: 'border-box',
                backgroundColor: '#ffffff'
              }}
            >
              {/* Inner Fine Gold Border Frame */}
              <div 
                className="w-full h-full relative flex flex-col justify-between box-border p-5 sm:p-6"
                style={{
                  border: '2px solid #b45309',
                  boxSizing: 'border-box',
                  background: 'linear-gradient(180deg, rgba(254, 243, 199, 0.25) 0%, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 1) 70%, rgba(254, 243, 199, 0.25) 100%)'
                }}
              >
                {/* Subtle Centered Watermark Seal */}
                <div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.045] select-none"
                  aria-hidden="true"
                >
                  <img
                    src={COMPANY_DETAILS.logoUrl}
                    alt="Watermark"
                    className="w-[420px] h-[420px] object-contain"
                  />
                </div>

                {/* Corner Decorative Ornaments - Firmly Anchored to the Inner Border */}
                <div className="absolute top-1 left-1 w-6 h-6 border-t-2 border-l-2 border-amber-700 pointer-events-none" />
                <div className="absolute top-1 right-1 w-6 h-6 border-t-2 border-r-2 border-amber-700 pointer-events-none" />
                <div className="absolute bottom-1 left-1 w-6 h-6 border-b-2 border-l-2 border-amber-700 pointer-events-none" />
                <div className="absolute bottom-1 right-1 w-6 h-6 border-b-2 border-r-2 border-amber-700 pointer-events-none" />

                {/* Certificate Inner Content */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  
                  {/* TOP HEADER BLOCK (Clean corporate header without JIGSY Youth pill) */}
                  <div className="text-center border-b-2 border-amber-600/70 pb-2">
                    <div className="flex items-center justify-between px-4 gap-3">
                      {/* Left Corporate Logo & Registration */}
                      <div className="flex items-center gap-3">
                        <img
                          src={COMPANY_DETAILS.logoUrl}
                          alt="JIGSY Official Seal"
                          className="w-14 h-14 object-contain"
                        />
                        <div className="text-left">
                          <div className="text-[10px] uppercase tracking-widest font-black text-amber-700 font-sans">
                            {COMPANY_DETAILS.taglineSanskrit}
                          </div>
                          <h1 className="text-base sm:text-lg font-black tracking-wide text-slate-900 font-sans uppercase">
                            {COMPANY_DETAILS.name}
                          </h1>
                          <div className="text-[9.5px] text-slate-600 font-sans">
                            Recognized under Companies Act 2013 · Govt. of India · CIN: {COMPANY_DETAILS.cin} · DPIIT: {COMPANY_DETAILS.dpiit}
                          </div>
                        </div>
                      </div>

                      {/* Right Statutory Metadata & Make In India Emblem */}
                      <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block font-sans">
                          <div className="text-[9px] font-semibold text-slate-700">
                            GSTIN: {COMPANY_DETAILS.gstin}
                          </div>
                          <div className="text-[9px] text-slate-500">
                            MSME: {COMPANY_DETAILS.msme}
                          </div>
                          <div className="text-[8.5px] text-amber-700 font-bold tracking-wide uppercase">
                            {COMPANY_DETAILS.shortName}
                          </div>
                        </div>
                        <img
                          src={COMPANY_DETAILS.makeInIndiaUrl}
                          alt="Make in India"
                          className="h-11 w-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* CERTIFICATE PRESENTATION TITLE (Includes relocated Division Tag) */}
                  <div className="text-center pt-1">
                    <div className="inline-block px-3.5 pt-1 pb-1.5 mb-1.5 rounded-full bg-amber-100/80 border border-amber-400 text-amber-900 font-sans font-bold text-[9.5px] leading-none uppercase tracking-wider">
                      JIGSY YOUTH · SKILL &amp; INDUSTRIAL RESEARCH DIVISION
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-wider text-amber-800 font-serif uppercase">
                      Certificate of Internship
                    </h2>
                    <div className="w-28 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-1" />
                  </div>

                  {/* PRESENTATION BODY */}
                  <div className="text-center space-y-1.5 text-slate-800 px-4">
                    <p className="italic text-slate-600 text-xs">
                      This is proudly presented and certified to
                    </p>

                    <div className="py-0.5">
                      <span className="text-xl sm:text-2xl font-black text-slate-950 font-sans tracking-wide uppercase border-b-2 border-slate-900 pb-1.5 leading-tight px-6 inline-block">
                        {salutation} {candidateName}
                      </span>
                      {fatherName && (
                        <div className="text-xs text-slate-600 font-medium mt-0.5">
                          (Son / Daughter of Shri <strong>{fatherName}</strong>)
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-[12.5px] leading-relaxed text-slate-700 max-w-3xl mx-auto">
                      Student of <strong>{college}</strong>, pursuing <strong>{degree} ({branch})</strong>, is hereby awarded this credential upon successful completion of the industrial training program in:
                    </p>

                    {/* Enrolled Track Highlight Card */}
                    <div className="py-2 px-4 rounded-xl bg-amber-50/90 border border-amber-300 text-center max-w-2xl mx-auto shadow-xs">
                      <span className="text-sm font-extrabold text-blue-950 uppercase tracking-wide block font-sans">
                        {trackTitle}
                      </span>
                      <div className="text-xs text-slate-600 font-medium mt-0.5">
                        Tenure: <strong>{duration}</strong> · {includeEvaluationGrade ? (
                          <>Evaluation Grade: <strong className="text-emerald-800 font-bold">{grade}</strong></>
                        ) : (
                          <>Credential Status: <strong className="text-emerald-800 font-bold">Verified</strong></>
                        )}
                      </div>
                      {includeAttendanceNote && attendanceCriteria.trim() && (
                        <div className="text-[10.5px] text-slate-600 font-sans mt-0.5">
                          Compliance Standard: <strong className="text-slate-800">{attendanceCriteria}</strong>
                        </div>
                      )}
                    </div>

                    <p className="text-[10.5px] text-slate-600 leading-normal max-w-3xl mx-auto">
                      During this tenure, the candidate demonstrated satisfactory performance, professionalism, and conduct in accordance with JIGSY INDIA benchmarks. We wish him/her every success in future academic and professional endeavors.
                    </p>
                  </div>

                  {/* THREE-COLUMN VERIFICATION & SIGNATORIES BLOCK */}
                  <div className="pt-2 px-3 flex items-end justify-between gap-4 border-t border-slate-200">
                    
                    {/* Column 1 (Left): Dynamic QR Code & Credential Details */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      {qrCodeDataUrl ? (
                        <img
                          src={qrCodeDataUrl}
                          alt="Verification QR"
                          className="w-16 h-16 border border-slate-300 rounded p-0.5 bg-white shadow-xs"
                        />
                      ) : (
                        <div className="w-16 h-16 border border-slate-300 rounded p-0.5 bg-white flex items-center justify-center">
                          <QrCode className="w-8 h-8 text-slate-400" />
                        </div>
                      )}
                      <div className="text-[9px] space-y-0.5 font-sans text-left">
                        <div>Ref No: <strong className="font-mono text-blue-900">{certNumber}</strong></div>
                        <div>App ID: <strong className="font-mono text-slate-700">{application.id}</strong></div>
                        <div>Issued: <strong className="font-mono text-slate-700">{issueDate}</strong></div>
                        <div className="text-[8.5px] text-emerald-700 font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Verifiable at jigsy.in
                        </div>
                      </div>
                    </div>

                    {/* Column 2 (Center): Performance Seal / Verified Badge & Corporate Seal */}
                    <div className="flex items-center justify-center gap-3 shrink-0">
                      {/* Evaluation vs Verified Badge */}
                      {includeEvaluationGrade ? (
                        <div className="text-center p-2 rounded-full border-2 border-dashed border-amber-500 bg-amber-50/90 px-3.5 py-1.5 shadow-xs">
                          <div className="text-[8.5px] uppercase font-bold text-amber-900 tracking-wider">Evaluation</div>
                          <div className="text-xs font-black text-amber-800 uppercase">{grade.split('(')[0].trim()}</div>
                        </div>
                      ) : (
                        <div className="text-center p-2 rounded-full border-2 border-emerald-500 bg-emerald-50/90 px-3.5 py-1.5 shadow-xs">
                          <div className="text-[8.5px] uppercase font-bold text-emerald-900 tracking-wider">Credential</div>
                          <div className="text-xs font-black text-emerald-700 uppercase flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> VERIFIED
                          </div>
                        </div>
                      )}

                      {/* Corporate Seal Emblem */}
                      <div className="text-center">
                        <div className="w-11 h-11 rounded-full border-2 border-amber-500 mx-auto flex items-center justify-center p-0.5 bg-white shadow-xs">
                          <img
                            src={COMPANY_DETAILS.logoUrl}
                            alt="Corporate Seal"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-[8px] uppercase tracking-wider text-slate-500 font-sans font-semibold block mt-0.5">
                          Corporate Seal
                        </span>
                      </div>
                    </div>

                    {/* Column 3 (Right): Dual Customizable Signatories */}
                    <div className="flex items-end justify-end gap-5 text-xs shrink-0">
                      {/* Signatory 1: Subhash Chandra Jha */}
                      <div className="text-center space-y-0.5">
                        <span className="signature-font font-bold text-blue-950 text-sm sm:text-base tracking-wide inline-block transform -rotate-1 whitespace-nowrap">
                          {signatory1Name}
                        </span>
                        <div className="w-36 border-t border-slate-800 mx-auto pt-0.5 font-bold text-slate-900 text-[10px] font-sans whitespace-nowrap">
                          {signatory1Name}
                        </div>
                        <div className="text-[9px] text-slate-600 font-sans leading-tight whitespace-nowrap">
                          {signatory1Title}
                        </div>
                      </div>

                      {/* Signatory 2: Jigyasu Vatsa (Founder & Chief JIGSY India) */}
                      <div className="text-center space-y-0.5">
                        <span className="signature-font font-bold text-blue-950 text-sm sm:text-base tracking-wide inline-block transform -rotate-1 whitespace-nowrap">
                          {signatory2Name}
                        </span>
                        <div className="w-36 border-t border-slate-800 mx-auto pt-0.5 font-bold text-slate-900 text-[10px] font-sans whitespace-nowrap">
                          {signatory2Name}
                        </div>
                        <div className="text-[9px] text-slate-600 font-sans leading-tight whitespace-nowrap">
                          {signatory2Title}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Security Notice pinned strictly at page base */}
                  <div className="pt-1.5 border-t border-amber-400/60 text-[8px] text-slate-600 font-sans text-center space-y-0.5">
                    <div>
                      Issued by <strong>JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED</strong> · Registered Office: South Dighi, Darbhanga, Bihar, India, 846004 · CIN: {COMPANY_DETAILS.cin}
                    </div>
                    <div className="text-[7.5px] text-slate-500">
                      This official credential is generated and digitally verified through the JIGSY INDIA portal. To re-verify credential validity, scan the embedded QR code or contact jigsy25@gmail.com.
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

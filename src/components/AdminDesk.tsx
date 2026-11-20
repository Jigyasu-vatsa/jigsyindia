import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Key, Lock, Clock, 
  Search, Eye, Printer, AlertCircle, RefreshCw, Edit3,
  Download, RotateCcw, FileText, CheckCircle2, Upload, DownloadCloud, Loader2,
  UserPlus, Award, Mail, Layers, CheckSquare
} from 'lucide-react';
import { InternshipApplication } from '../types';
import { COMPANY_DETAILS, INTERNSHIP_TRACKS } from '../data/companyData';
import { CaptchaBox } from './CaptchaBox';
import { validateCaptcha } from '../utils/captcha';
import { printDocument, exportElementToPdf } from '../utils/printHelper';
import { generateApplicationId, generateCertificateNumber, buildCertificateQrPayload } from '../utils/idGenerator';
import { getGraduationYearOptions } from '../utils/portalHelpers';
import { CertificateModal } from './CertificateModal';
import { MassCertificateModal } from './MassCertificateModal';

interface AdminDeskProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminLoggedIn: boolean;
  onAdminLoginStateChange: (loggedIn: boolean) => void;
}

export const AdminDesk: React.FC<AdminDeskProps> = ({
  isOpen,
  onClose,
  isAdminLoggedIn,
  onAdminLoginStateChange,
}) => {
  // PIN state
  const [currentAdminPin, setCurrentAdminPin] = useState<string>(() => {
    return localStorage.getItem('jigsy_admin_pin') || 'Jigsy@2002';
  });
  const [enteredPin, setEnteredPin] = useState('');
  const [loginCaptchaInput, setLoginCaptchaInput] = useState('');
  const [expectedLoginCaptcha, setExpectedLoginCaptcha] = useState('');
  const [loginError, setLoginError] = useState('');

  // Applications List
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'verified' | 'accepted'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Detail & Letter Modals
  const [selectedApp, setSelectedApp] = useState<InternshipApplication | null>(null);
  const [letterApp, setLetterApp] = useState<InternshipApplication | null>(null);
  const letterPrintRef = useRef<HTMLDivElement>(null);

  // Manual Application Entry Modal State
  const graduationYearOptions = getGraduationYearOptions();
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false);
  const [manualFullName, setManualFullName] = useState('');
  const [manualSalutation, setManualSalutation] = useState('Mr.');
  const [manualEmail, setManualEmail] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualCollege, setManualCollege] = useState('');
  const [manualDegree, setManualDegree] = useState('BBA');
  const [manualBranch, setManualBranch] = useState('Management / Computer Science');
  const [manualGradYear, setManualGradYear] = useState(() => String(new Date().getFullYear()));
  const [manualTrackId, setManualTrackId] = useState(INTERNSHIP_TRACKS[0].id);
  const [manualAmount, setManualAmount] = useState(INTERNSHIP_TRACKS[0].discountedPrice);
  const [manualPaymentId, setManualPaymentId] = useState('');
  const [manualFatherName, setManualFatherName] = useState('');
  const [manualReportingManager, setManualReportingManager] = useState('Amanul Haque');

  // Certificate Generator State (delegated to CertificateModal)
  const [certApp, setCertApp] = useState<InternshipApplication | null>(null);
  const [massCertDefaults, setMassCertDefaults] = useState<import('./MassCertificateModal').BatchCertificateDefaults | null>(null);
  const [letterPdfError, setLetterPdfError] = useState<string | null>(null);

  // Mass Certificate Modal State
  const [isMassCertOpen, setIsMassCertOpen] = useState(false);

  // Letter Customization Tags & Fields (Automatic with full manual override)
  const [letterCandidateSalutation, setLetterCandidateSalutation] = useState('Mr./Ms.');
  const [letterCandidateName, setLetterCandidateName] = useState('');
  const [letterCandidateInstitute, setLetterCandidateInstitute] = useState('');
  
  const [letterRefCode, setLetterRefCode] = useState('');
  const [letterDate, setLetterDate] = useState(() => new Date().toLocaleDateString('en-GB'));
  const [letterSignDate, setLetterSignDate] = useState(() => new Date().toLocaleDateString('en-GB'));
  
  const [letterDomain, setLetterDomain] = useState('Software & Web Engineering');
  const [letterDepartment, setLetterDepartment] = useState('JIGSY YOUTH/JIGSY TECH');
  const [letterDuration, setLetterDuration] = useState('30–45 Days');
  const [letterWorkMode, setLetterWorkMode] = useState('Remote / Hybrid');
  const [letterConfirmDays, setLetterConfirmDays] = useState('7 working days');
  
  // Reporting Manager / Officer
  const [letterReportingManagerName, setLetterReportingManagerName] = useState('Amanul Haque');
  const [letterReportingManagerDesignation, setLetterReportingManagerDesignation] = useState('Manager (in charge), Domain HRD Admin & Finance at JIGSY INDIA');
  
  // Authorized Signatory
  const [letterSignatoryName, setLetterSignatoryName] = useState('Subhash Chandra Jha');
  const [letterSignatoryDesignation, setLetterSignatoryDesignation] = useState('Head Jigsy Youth');

  // Change PIN Drawer State
  const [isChangePinOpen, setIsChangePinOpen] = useState(false);
  const [oldPinInput, setOldPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [pinCaptchaInput, setPinCaptchaInput] = useState('');
  const [expectedPinCaptcha, setExpectedPinCaptcha] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [importSuccessMsg, setImportSuccessMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load applications from localStorage
  const reloadApplications = () => {
    try {
      const stored = localStorage.getItem('jigsy_internship_applications');
      if (stored) {
        setApplications(JSON.parse(stored));
      } else {
        setApplications([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Export applications to a downloadable JSON backup
  const handleExportApplications = () => {
    try {
      const dataStr = JSON.stringify(applications, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `jigsy_internship_applications_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 1500);
    } catch (e) {
      console.error('Export failed:', e);
    }
  };

  // Import applications from a JSON backup file
  const handleImportApplications = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          const existingIds = new Set(applications.map((a) => a.id));
          const newItems = parsed.filter((item: InternshipApplication) => item && item.id && !existingIds.has(item.id));
          const merged = [...applications, ...newItems];
          setApplications(merged);
          localStorage.setItem('jigsy_internship_applications', JSON.stringify(merged));
          setImportSuccessMsg(`Imported ${newItems.length} new application record(s)!`);
          setTimeout(() => setImportSuccessMsg(''), 4500);
        } else {
          alert('Invalid file format. Please upload a valid JSON array of application records.');
        }
      } catch (err) {
        console.error('Import parse error:', err);
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
    // Reset file input value so user can import the same file again if desired
    e.target.value = '';
  };

  // Handle Manual Application Save & Offer Letter Launch
  const handleSaveManualEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualFullName.trim() || !manualEmail.trim()) {
      alert('Please fill out applicant full name and email.');
      return;
    }

    const matchedTrack = INTERNSHIP_TRACKS.find((trk) => trk.id === manualTrackId);

    const newApp: InternshipApplication = {
      id: generateApplicationId(),
      salutation: manualSalutation,
      fullName: manualFullName.trim(),
      fatherName: manualFatherName.trim(),
      email: manualEmail.trim(),
      phone: manualPhone.trim() || '+91 94314 00022',
      college: manualCollege.trim() || 'University / Institute',
      degree: manualDegree.trim() || 'BBA',
      branch: manualBranch.trim() || 'Management / Computer Science',
      passingYear: manualGradYear,
      trackId: manualTrackId,
      trackTitle: matchedTrack ? matchedTrack.name.en : 'Internship Track',
      courseFee: 0,
      miscFee: manualAmount,
      totalAmount: manualAmount,
      paymentMethod: 'razorpay',
      razorpayPaymentId: manualPaymentId.trim() || `pay_manual_${Date.now().toString().slice(-6)}`,
      status: 'verified',
      termsAccepted: true,
      createdAt: new Date().toISOString(),
      notes: 'Direct Administrative Manual Entry for Offer Letter Generation',
    };

    const updated = [newApp, ...applications];
    setApplications(updated);
    try {
      localStorage.setItem('jigsy_internship_applications', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setIsManualEntryOpen(false);
    // Pre-populate and open Offer Letter preview immediately
    setLetterApp(newApp);
    applyAutoDefaults(newApp);
    setLetterCandidateSalutation(manualSalutation);
    if (manualReportingManager.trim()) {
      setLetterReportingManagerName(manualReportingManager.trim());
    }

    // Reset fields
    setManualFullName('');
    setManualFatherName('');
    setManualEmail('');
    setManualPhone('');
    setManualCollege('');
    setManualPaymentId('');
  };

  // Open Certificate Modal for Candidate
  const handleOpenCertificate = (
    app: InternshipApplication,
    defaults: import('./MassCertificateModal').BatchCertificateDefaults | null = null
  ) => {
    setMassCertDefaults(defaults);
    setCertApp(app);
  };

  // Handle Offer Letter PDF Generation (strictly 1 single page, no print fallback)
  const handleDownloadLetterPdf = async () => {
    if (!letterPrintRef.current) return;
    setIsGeneratingPdf(true);
    setLetterPdfError(null);
    try {
      const safeCandidate = (letterCandidateName || 'Candidate').replace(/\s+/g, '_');
      const safeRef = letterRefCode.replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `JIGSY_Offer_Letter_${safeCandidate}_${safeRef}.pdf`;
      const ok = await exportElementToPdf(letterPrintRef.current, filename, true);
      if (!ok) {
        setLetterPdfError('PDF file export encountered a browser restriction. Please use Print / Save PDF Letter.');
      }
    } catch (err) {
      console.error('Failed to export letter PDF:', err);
      setLetterPdfError('Could not generate PDF file. Please use Print / Save PDF Letter.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      reloadApplications();
    }
  }, [isAdminLoggedIn]);

  // Helper to initialize or reset letter fields based on applicant data
  const applyAutoDefaults = (app: InternshipApplication) => {
    const branchLower = (app.branch || '').toLowerCase();
    const degreeLower = (app.degree || '').toLowerCase();
    const isTech = degreeLower.includes('tech') || degreeLower.includes('mca') || degreeLower.includes('bca') || branchLower.includes('cse') || branchLower.includes('it') || branchLower.includes('computer');
    
    setLetterCandidateSalutation(app.salutation || 'Mr./Ms.');
    setLetterCandidateName(app.fullName || '');
    setLetterCandidateInstitute(`${app.college || 'University'} · ${app.degree || ''} (${app.branch || ''})`);
    
    setLetterRefCode(`JIGSY/YOUTH/2026/OFFER-${app.id.replace('JIGSY-YOUTH-2026-', '')}`);
    const todayStr = new Date().toLocaleDateString('en-GB');
    setLetterDate(todayStr);
    setLetterSignDate(todayStr);
    
    if (isTech) {
      setLetterDepartment('JIGSY YOUTH/JIGSY TECH');
      setLetterDomain('Software & Web Engineering');
    } else {
      setLetterDepartment('JIGSY YOUTH/JIGSY EDUTECH');
      if (degreeLower.includes('bba') || branchLower.includes('hr') || branchLower.includes('management')) {
        setLetterDomain('HR & Corporate Management');
      } else if (degreeLower.includes('com')) {
        setLetterDomain('Finance & Audit Compliance');
      } else if (degreeLower.includes('sc') || degreeLower.includes('ba')) {
        setLetterDomain('Academic Research & Content Architecture');
      } else {
        setLetterDomain('Industrial Learning & Operations');
      }
    }

    if (app.trackId === 'track-4-research-overview') {
      setLetterDuration('14–15 Days');
      setLetterDepartment('JIGSY YOUTH/JIGSY R&D');
      setLetterDomain('Research Overview - Scientific Methodologies & R');
    } else {
      setLetterDuration('30–45 Days');
    }

    setLetterWorkMode('Remote / Hybrid');
    setLetterConfirmDays('7 working days');
    setLetterReportingManagerName('Amanul Haque');
    setLetterReportingManagerDesignation('Manager (in charge), Domain HRD Admin & Finance at JIGSY INDIA');
    setLetterSignatoryName('Subhash Chandra Jha');
    setLetterSignatoryDesignation('Head Jigsy Youth');
  };

  // When letterApp changes, initialize default tags based on applicant credentials
  useEffect(() => {
    if (letterApp) {
      applyAutoDefaults(letterApp);
    }
  }, [letterApp]);

  // Handle Admin Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!validateCaptcha(loginCaptchaInput, expectedLoginCaptcha)) {
      setLoginError('Invalid CAPTCHA code. Please verify security characters.');
      return;
    }

    if (enteredPin.trim() === currentAdminPin) {
      onAdminLoginStateChange(true);
      setEnteredPin('');
      setLoginCaptchaInput('');
      reloadApplications();
    } else {
      setLoginError('Incorrect alphanumeric PIN. Please re-enter credentials.');
    }
  };

  // Handle Update Status
  const handleUpdateStatus = (appId: string, newStatus: 'pending' | 'verified' | 'accepted' | 'rejected') => {
    try {
      const updated = applications.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            status: newStatus,
            verifiedAt: newStatus === 'verified' ? new Date().toISOString() : app.verifiedAt,
            offerLetterIssuedAt: newStatus === 'accepted' ? new Date().toISOString() : app.offerLetterIssuedAt,
          };
        }
        return app;
      });
      setApplications(updated);
      localStorage.setItem('jigsy_internship_applications', JSON.stringify(updated));

      if (selectedApp && selectedApp.id === appId) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Handle Change PIN
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinChangeMsg(null);

    if (!validateCaptcha(pinCaptchaInput, expectedPinCaptcha)) {
      setPinChangeMsg({ text: 'Invalid CAPTCHA code.', isError: true });
      return;
    }

    if (oldPinInput.trim() !== currentAdminPin) {
      setPinChangeMsg({ text: 'Current PIN is incorrect.', isError: true });
      return;
    }

    if (newPinInput.trim().length < 6) {
      setPinChangeMsg({ text: 'New PIN must be at least 6 alphanumeric characters.', isError: true });
      return;
    }

    const nextPin = newPinInput.trim();
    setCurrentAdminPin(nextPin);
    localStorage.setItem('jigsy_admin_pin', nextPin);
    setPinChangeMsg({ text: 'Administrative PIN updated successfully!', isError: false });
    setOldPinInput('');
    setNewPinInput('');
    setPinCaptchaInput('');
  };

  if (!isOpen) return null;

  // Filtered Applications
  const filteredApps = applications.filter((app) => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      app.fullName.toLowerCase().includes(q) ||
      app.email.toLowerCase().includes(q) ||
      app.id.toLowerCase().includes(q) ||
      (app.utrNumber && app.utrNumber.toLowerCase().includes(q)) ||
      (app.razorpayPaymentId && app.razorpayPaymentId.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 my-6 space-y-6 text-slate-900 dark:text-slate-100 max-h-[92vh] overflow-y-auto">
        
        {/* Modal Top Bar (Never exposes admin password) */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 no-print">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-950 rounded-xl text-blue-700 dark:text-blue-300">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Management Console
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-bold brand-font">
                JIGSY INDIA Administration & Review Desk
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xl font-bold px-2"
          >
            ✕
          </button>
        </div>

        {/* Not Logged In: Alphanumeric PIN + CAPTCHA Login Gate */}
        {!isAdminLoggedIn ? (
          <div className="max-w-md mx-auto py-8 space-y-5 no-print">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold">Admin Authentication Required</h3>
              <p className="text-xs text-slate-500">
                Enter your alphanumeric administrative security key to access student submissions and offer letters.
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">
                  Alphanumeric Admin PIN <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={enteredPin}
                    onChange={(e) => setEnteredPin(e.target.value)}
                    placeholder="Enter Alphanumeric Security PIN"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <Key className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              {/* CAPTCHA Protection */}
              <CaptchaBox
                value={loginCaptchaInput}
                onChange={setLoginCaptchaInput}
                expectedCodeRef={setExpectedLoginCaptcha}
              />

              {loginError && (
                <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-sm shadow transition-colors flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Unlock Admin Desk
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard */
          <div className="space-y-5 no-print">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-slate-600 dark:text-slate-300">Status:</span>
                {(['all', 'pending', 'verified', 'accepted'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-md capitalize font-semibold transition-colors ${
                      statusFilter === st
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {st} ({applications.filter((a) => st === 'all' || a.status === st).length})
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-56">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search applicant, UTR, ID..."
                    className="w-full px-2.5 py-1 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg pr-7 focus:outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2" />
                </div>

                {/* + Manual Entry Button */}
                <button
                  type="button"
                  onClick={() => setIsManualEntryOpen(true)}
                  className="px-2.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg flex items-center gap-1.5 font-bold cursor-pointer shadow-sm transition-colors text-xs shrink-0"
                  title="Manually enter candidate details to issue an official offer letter"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Manual Entry</span>
                </button>

                {/* Mass Certificates Generator */}
                <button
                  type="button"
                  onClick={() => setIsMassCertOpen(true)}
                  className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg flex items-center gap-1.5 font-bold cursor-pointer shadow-sm transition-colors text-xs shrink-0"
                  title="Issue or export certificates in bulk for verified candidates"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Mass Certificates</span>
                </button>

                {/* Export Data JSON */}
                <button
                  type="button"
                  onClick={handleExportApplications}
                  className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1 cursor-pointer"
                  title="Export all applications to JSON backup file"
                >
                  <DownloadCloud className="w-4 h-4 text-emerald-600" />
                  <span className="hidden md:inline font-semibold">Export JSON</span>
                </button>

                {/* Import Data JSON */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImportApplications}
                  accept=".json,application/json"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1 cursor-pointer"
                  title="Import applications from JSON backup file"
                >
                  <Upload className="w-4 h-4 text-blue-600" />
                  <span className="hidden md:inline font-semibold">Import JSON</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsChangePinOpen(!isChangePinOpen)}
                  className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                  title="Change Admin PIN"
                >
                  <Key className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={reloadApplications}
                  className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                  title="Refresh Queue"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onAdminLoginStateChange(false)}
                  className="px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-950/60 dark:text-red-300 rounded-md font-semibold cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Import Notification Banner */}
            {importSuccessMsg && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{importSuccessMsg}</span>
              </div>
            )}

            {/* Architecture / Storage Notice Banner */}
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase">
                  Static Mode (GitHub Pages)
                </span>
                <span>
                  Applications submitted on this domain are stored in the browser's local application vault (<strong>localStorage</strong>).
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                Official email copy dispatched to: <strong className="text-blue-600 dark:text-blue-400">jigsy25@gmail.com</strong>
              </div>
            </div>

            {/* Change PIN Box if toggled */}
            {isChangePinOpen && (
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-3 animate-fadeIn text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-slate-100">
                    <Key className="w-4 h-4 text-blue-600" />
                    Change Alphanumeric Admin PIN
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsChangePinOpen(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleChangePin} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Current PIN</label>
                    <input
                      type="password"
                      required
                      value={oldPinInput}
                      onChange={(e) => setOldPinInput(e.target.value)}
                      placeholder="Current PIN"
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">New Alphanumeric PIN</label>
                    <input
                      type="text"
                      required
                      value={newPinInput}
                      onChange={(e) => setNewPinInput(e.target.value)}
                      placeholder="e.g. Jigsy@2026New"
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                  <div>
                    <CaptchaBox
                      value={pinCaptchaInput}
                      onChange={setPinCaptchaInput}
                      expectedCodeRef={setExpectedPinCaptcha}
                    />
                  </div>

                  <div className="sm:col-span-3 flex items-center justify-between pt-1">
                    {pinChangeMsg && (
                      <span className={`font-semibold ${pinChangeMsg.isError ? 'text-red-600' : 'text-emerald-600'}`}>
                        {pinChangeMsg.text}
                      </span>
                    )}
                    <button
                      type="submit"
                      className="ml-auto px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg shadow"
                    >
                      Save New PIN
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Applications Table */}
            {filteredApps.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
                <Clock className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">
                  No Internship Applications in Queue
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  New submissions from the JIGSY Youth Portal will automatically appear here for payment audit and offer letter generation.
                </p>
              </div>
            ) : (
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="py-2.5 px-3 font-bold">App ID</th>
                      <th className="py-2.5 px-3 font-bold">Candidate</th>
                      <th className="py-2.5 px-3 font-bold">Track</th>
                      <th className="py-2.5 px-3 font-bold">Payment & Ref</th>
                      <th className="py-2.5 px-3 font-bold">Status</th>
                      <th className="py-2.5 px-3 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {filteredApps.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                          {app.id}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="font-bold text-slate-900 dark:text-slate-100">
                            {app.salutation ? `${app.salutation} ` : ''}{app.fullName}
                          </div>
                          {app.fatherName && (
                            <div className="text-[10.5px] text-slate-500 dark:text-slate-400">
                              Father: {app.fatherName}
                            </div>
                          )}
                          <div className="text-[11px] text-slate-500">{app.email} · {app.phone}</div>
                          <div className="text-[10px] text-slate-400">{app.college} · {app.degree} ({app.branch})</div>
                        </td>
                        <td className="py-2.5 px-3 font-medium text-slate-800 dark:text-slate-200">
                          {app.trackTitle}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                            ₹{app.totalAmount} ({app.paymentMethod.toUpperCase()})
                          </div>
                          {app.razorpayPaymentId && (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block">
                              RZP: {app.razorpayPaymentId}
                            </span>
                          )}
                          {app.utrNumber && (
                            <span className="text-[10px] text-amber-600 font-mono block">
                              UTR: {app.utrNumber}
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              app.status === 'accepted'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : app.status === 'verified'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}
                          >
                            {app.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5 flex-wrap">
                            <button
                              type="button"
                              onClick={() => setSelectedApp(app)}
                              className="p-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200"
                              title="Inspect Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setLetterApp(app)}
                              className="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[11px] flex items-center gap-1 shadow-sm"
                              title="Generate Official Acceptance Letter"
                            >
                              <Printer className="w-3 h-3" />
                              Offer Letter
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenCertificate(app)}
                              className="px-2 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px] flex items-center gap-1 shadow-sm"
                              title="Issue Official Internship Completion Certificate"
                            >
                              <Award className="w-3 h-3" />
                              Certificate
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 1. INSPECT APPLICATION DETAIL & STATUS CHANGER MODAL                      */}
      {/* ========================================================================= */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto no-print">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 text-xs text-slate-900 dark:text-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm">Application Details: {selectedApp.id}</h3>
              <button type="button" onClick={() => setSelectedApp(null)} className="font-bold text-slate-400">✕</button>
            </div>

            <div className="space-y-2">
              <div><strong>Full Name:</strong> {selectedApp.fullName}</div>
              <div><strong>Email:</strong> {selectedApp.email}</div>
              <div><strong>Phone:</strong> {selectedApp.phone}</div>
              <div><strong>College:</strong> {selectedApp.college}</div>
              <div><strong>Degree & Branch:</strong> {selectedApp.degree} - {selectedApp.branch} ({selectedApp.passingYear})</div>
              <div><strong>Track:</strong> {selectedApp.trackTitle}</div>
              <div><strong>Amount Paid:</strong> ₹{selectedApp.totalAmount} (Misc: ₹{selectedApp.miscFee})</div>
              <div><strong>Payment Method:</strong> {selectedApp.paymentMethod}</div>
              {selectedApp.razorpayPaymentId && <div><strong>Razorpay Payment ID:</strong> <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">{selectedApp.razorpayPaymentId}</code></div>}
              {selectedApp.utrNumber && <div><strong>Bank UTR:</strong> <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">{selectedApp.utrNumber}</code></div>}

              {selectedApp.screenshotDataUrl && (
                <div className="pt-2">
                  <strong>Attached Payment Proof:</strong>
                  <img
                    src={selectedApp.screenshotDataUrl}
                    alt="Payment Proof Screenshot"
                    className="mt-1 max-h-56 w-auto rounded border border-slate-300 dark:border-slate-700 object-contain"
                  />
                </div>
              )}
            </div>

            <div className="pt-3 border-t space-y-2">
              <label className="font-bold block">Update Review Status:</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedApp.id, 'verified')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold"
                >
                  Mark Verified
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleUpdateStatus(selectedApp.id, 'accepted');
                    setLetterApp(selectedApp);
                    setSelectedApp(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold"
                >
                  Approve & Generate Letter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1.5 MANUAL APPLICATION ENTRY MODAL (DIRECT FROM SYSTEM)                   */}
      {/* ========================================================================= */}
      {isManualEntryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 my-6 space-y-4 text-slate-900 dark:text-slate-100 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-lg text-blue-700 dark:text-blue-300">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Manual Application Entry & Offer Letter Issuance
                  </h3>
                  <p className="text-xs text-slate-500">
                    Enter candidate credentials directly into official records to generate and export an offer letter.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsManualEntryOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold px-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveManualEntry} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Salutation & Full Name */}
                <div>
                  <label className="block font-semibold mb-1">
                    Candidate Salutation & Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-1.5">
                    <select
                      value={manualSalutation}
                      onChange={(e) => setManualSalutation(e.target.value)}
                      className="w-24 px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-semibold"
                    >
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Mr./Ms.">Mr./Ms.</option>
                    </select>
                    <input
                      type="text"
                      required
                      value={manualFullName}
                      onChange={(e) => setManualFullName(e.target.value)}
                      placeholder="e.g. Komal Jha"
                      className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
                    />
                  </div>
                </div>

                {/* Father's / Guardian's Name */}
                <div>
                  <label className="block font-semibold mb-1">
                    Father's / Guardian's Name
                  </label>
                  <input
                    type="text"
                    value={manualFatherName}
                    onChange={(e) => setManualFatherName(e.target.value)}
                    placeholder="Father's Full Name (for Identity Verification)"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>

                {/* Contact Email */}
                <div>
                  <label className="block font-semibold mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    placeholder="candidate@domain.com"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block font-semibold mb-1">Mobile / WhatsApp Number</label>
                  <input
                    type="text"
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    placeholder="10-digit Mobile Number"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>

                {/* College / University */}
                <div>
                  <label className="block font-semibold mb-1">College / University Name</label>
                  <input
                    type="text"
                    value={manualCollege}
                    onChange={(e) => setManualCollege(e.target.value)}
                    placeholder="e.g. LNMU Darbhanga / NIT Patna"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>

                {/* Degree */}
                <div>
                  <label className="block font-semibold mb-1">Degree Program</label>
                  <input
                    type="text"
                    value={manualDegree}
                    onChange={(e) => setManualDegree(e.target.value)}
                    placeholder="e.g. B.Tech / BBA / B.Sc / BCA"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>

                {/* Branch / Specialization */}
                <div>
                  <label className="block font-semibold mb-1">Branch / Specialization</label>
                  <input
                    type="text"
                    value={manualBranch}
                    onChange={(e) => setManualBranch(e.target.value)}
                    placeholder="e.g. CSE / HR / Finance / IT"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>

                {/* Graduation Year */}
                <div>
                  <label className="block font-semibold mb-1">Year of Graduation</label>
                  <select
                    value={manualGradYear}
                    onChange={(e) => setManualGradYear(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  >
                    {graduationYearOptions.map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>

                {/* Track Selection */}
                <div>
                  <label className="block font-semibold mb-1">Enrolled Track</label>
                  <select
                    value={manualTrackId}
                    onChange={(e) => {
                      const id = e.target.value;
                      setManualTrackId(id);
                      const found = INTERNSHIP_TRACKS.find((trk) => trk.id === id);
                      if (found) setManualAmount(found.discountedPrice);
                    }}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  >
                    {INTERNSHIP_TRACKS.map((trk, idx) => (
                      <option key={trk.id} value={trk.id}>
                        {idx + 1}. {trk.name.en} (₹{trk.discountedPrice})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fee & Razorpay Ref */}
                <div>
                  <label className="block font-semibold mb-1">Payment Reference / Razorpay ID</label>
                  <input
                    type="text"
                    value={manualPaymentId}
                    onChange={(e) => setManualPaymentId(e.target.value)}
                    placeholder="e.g. pay_manual_001 or RZP ID"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
                  />
                </div>

                {/* Reporting Manager */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold mb-1">Reporting Manager / Officer</label>
                  <input
                    type="text"
                    value={manualReportingManager}
                    onChange={(e) => setManualReportingManager(e.target.value)}
                    placeholder="Amanul Haque, Manager (in charge) HRD Admin"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsManualEntryOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold flex items-center gap-1.5 shadow"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Save & Issue Offer Letter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. AUTHENTIC JIGSY INDIA OFFER LETTER (MATCHING ATTACHED IMAGE)           */}
      {/* ========================================================================= */}
      {letterApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto print-modal-container">
          <div className="w-full max-w-4xl bg-white text-slate-950 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 space-y-4 max-h-[96vh] overflow-y-auto">
            
            {/* Admin Customization Toolbar (Hidden during Print) */}
            <div className="no-print p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 space-y-3 shadow-inner">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-blue-700 dark:text-blue-400">
                  <Edit3 className="w-4 h-4" />
                  Admin Controls: Custom Letterhead & Tagging
                </span>
                
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={isGeneratingPdf}
                    onClick={handleDownloadLetterPdf}
                    className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Generate and download high-resolution official PDF document (.pdf)"
                  >
                    {isGeneratingPdf ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    {isGeneratingPdf ? 'Generating PDF...' : 'Download Official PDF (.pdf)'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!letterPrintRef.current) return;
                      printDocument({
                        title: `JIGSY INDIA - Offer Letter - ${letterCandidateName || 'Intern'}`,
                        filename: `JIGSY_Offer_Letter_${(letterCandidateName || 'Candidate').replace(/\s+/g, '_')}_${letterRefCode.replace(/[^a-zA-Z0-9_-]/g, '_')}`,
                        contentHtml: letterPrintRef.current.innerHTML,
                      });
                    }}
                    className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Open browser print dialog to Print or Save as PDF"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print / Save PDF Letter
                  </button>

                  <a
                    href={`mailto:${letterApp.email}?subject=${encodeURIComponent(
                      `[Official Offer Letter] Remote/Hybrid Internship - ${letterRefCode} - ${letterCandidateName}`
                    )}&body=${encodeURIComponent(
                      `Dear ${letterCandidateName},\n\nWe are pleased to offer you an industrial internship opportunity with Jigyasu Integrated Global Services Private Limited (JIGSY INDIA).\n\nReference: ${letterRefCode}\nDomain: ${letterDomain}\nDepartment: ${letterDepartment}\nDuration: ${letterDuration}\nReporting Officer: ${letterReportingManagerName} (${letterReportingManagerDesignation})\n\nPlease review, print, and submit your signed acceptance copy along with your identity documents within 7 working days.\n\nWarm regards,\nSubhash Chandra Jha, Head Jigsy Youth\nJIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED\nWebsite: https://jigsy.in`
                    )}`}
                    className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Send pre-filled offer letter email to candidate"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email to Candidate
                  </a>

                  <button
                    type="button"
                    onClick={() => letterApp && applyAutoDefaults(letterApp)}
                    className="px-2.5 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                    title="Reset all fields to smart auto-calculated defaults"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Auto Defaults
                  </button>

                  <button
                    type="button"
                    onClick={() => setLetterApp(null)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold px-1.5 cursor-pointer"
                    title="Close Letter"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Form Input Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
                
                {/* To: Candidate Name & Salutation */}
                <div>
                  <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                    To: Salutation & Name:
                  </label>
                  <div className="flex gap-1">
                    <select
                      value={letterCandidateSalutation}
                      onChange={(e) => setLetterCandidateSalutation(e.target.value)}
                      className="w-24 px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-semibold"
                    >
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Mr./Ms.">Mr./Ms.</option>
                    </select>
                    <input
                      type="text"
                      value={letterCandidateName}
                      onChange={(e) => setLetterCandidateName(e.target.value)}
                      placeholder="Candidate Full Name"
                      className="flex-1 px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-semibold"
                    />
                  </div>
                </div>

                {/* To: Institute & Degree */}
                <div>
                  <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                    Candidate College & Degree:
                  </label>
                  <input
                    type="text"
                    value={letterCandidateInstitute}
                    onChange={(e) => setLetterCandidateInstitute(e.target.value)}
                    placeholder="College/Univ · Degree (Branch)"
                    className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
                  />
                </div>

                {/* Letter Date */}
                <div>
                  <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                    Letter Date:
                  </label>
                  <input
                    type="text"
                    value={letterDate}
                    onChange={(e) => setLetterDate(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono"
                  />
                </div>

                {/* Date at Sign */}
                <div>
                  <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                    Date at Sign:
                  </label>
                  <input
                    type="text"
                    value={letterSignDate}
                    onChange={(e) => setLetterSignDate(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono"
                  />
                </div>

                {/* Reporting Manager Name */}
                <div>
                  <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                    Reporting Manager / Officer:
                  </label>
                  <input
                    type="text"
                    value={letterReportingManagerName}
                    onChange={(e) => setLetterReportingManagerName(e.target.value)}
                    placeholder="e.g. Amanul Haque"
                    className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-semibold"
                  />
                </div>

                {/* Reporting Manager Designation */}
                <div>
                  <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                    Officer Designation:
                  </label>
                  <input
                    type="text"
                    value={letterReportingManagerDesignation}
                    onChange={(e) => setLetterReportingManagerDesignation(e.target.value)}
                    placeholder="e.g. Manager (in charge) HRD Admin"
                    className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
                  />
                </div>

                {/* Tag Intern Role / Domain */}
                <div>
                  <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                    Tag Intern Role / Domain:
                  </label>
                  <input
                    type="text"
                    value={letterDomain}
                    onChange={(e) => setLetterDomain(e.target.value)}
                    placeholder="e.g. Software & Web Engineering"
                    className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
                  />
                </div>

                {/* Tag Department */}
                <div>
                  <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                    Tag Department:
                  </label>
                  <select
                    value={letterDepartment}
                    onChange={(e) => setLetterDepartment(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
                  >
                    <option value="JIGSY YOUTH/JIGSY TECH">JIGSY YOUTH/JIGSY TECH (Technical)</option>
                    <option value="JIGSY YOUTH/JIGSY EDUTECH">JIGSY YOUTH/JIGSY EDUTECH (Non-Tech/Multi-Sector)</option>
                    <option value="JIGSY YOUTH/JIGSY R&D">JIGSY YOUTH/JIGSY R&D (Research)</option>
                    <option value="JIGSY YOUTH/JIGSY CONSULT">JIGSY YOUTH/JIGSY CONSULT (Management/Legal)</option>
                  </select>
                </div>

                {/* Internship Duration */}
                <div>
                  <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                    Internship Duration:
                  </label>
                  <input
                    type="text"
                    value={letterDuration}
                    onChange={(e) => setLetterDuration(e.target.value)}
                    placeholder="30–45 Days or 14–15 Days"
                    className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
                  />
                </div>

                {/* Work Mode */}
                <div>
                  <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                    Work Mode:
                  </label>
                  <input
                    type="text"
                    value={letterWorkMode}
                    onChange={(e) => setLetterWorkMode(e.target.value)}
                    placeholder="Remote / Hybrid"
                    className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
                  />
                </div>

                {/* Letter Ref Code */}
                <div>
                  <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                    Reference Code:
                  </label>
                  <input
                    type="text"
                    value={letterRefCode}
                    onChange={(e) => setLetterRefCode(e.target.value)}
                    placeholder="JIGSY/YOUTH/2026/OFFER-XXXX"
                    className="w-full px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono"
                  />
                </div>

                {/* Signatory Name & Title */}
                <div>
                  <label className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">
                    Authorized Signatory:
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={letterSignatoryName}
                      onChange={(e) => setLetterSignatoryName(e.target.value)}
                      placeholder="Signatory Name"
                      className="w-1/2 px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
                    />
                    <input
                      type="text"
                      value={letterSignatoryDesignation}
                      onChange={(e) => setLetterSignatoryDesignation(e.target.value)}
                      placeholder="Title"
                      className="w-1/2 px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* ========================================================= */}
            {/* PRINT-SECTION: Exact Formal Layout strictly fitting 1 Page */}
            {/* ========================================================= */}
            {letterPdfError && (
              <div className="no-print p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                {letterPdfError}
              </div>
            )}
            <div 
              ref={letterPrintRef}
              id="printableOfferLetter"
              className="print-section relative p-6 sm:p-7 border border-slate-300 bg-white text-slate-950 font-serif leading-tight shadow-sm max-w-[800px] mx-auto min-h-[1080px] flex flex-col justify-between"
            >
              <div className="offer-letter-sheet relative flex flex-col justify-between w-full flex-1">
                {/* Background Watermark Crest */}
                <div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] select-none"
                  aria-hidden="true"
                >
                  <img
                    src={COMPANY_DETAILS.logoUrl}
                    alt="Watermark"
                    className="w-[450px] h-[450px] object-contain"
                  />
                </div>

                <div className="relative z-10 space-y-2.5">
                  {/* Header Block matching image_a9971b2b.png */}
                <div className="flex items-center gap-4 border-b-2 border-slate-900 pb-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                    <img
                      src={COMPANY_DETAILS.logoUrl}
                      alt="JIGSY Seal"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 text-center">
                    <h2 className="text-xl sm:text-2xl font-black tracking-widest text-slate-900 font-sans">
                      JIGSY
                    </h2>
                    <h1 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-slate-900 font-sans">
                      {COMPANY_DETAILS.name}
                    </h1>
                    <div className="text-[11px] text-slate-700 font-sans">
                      South Dighi, Darbhanga, Darbhanga, Bihar, India, 846004
                    </div>
                    <div className="text-[10px] text-slate-600 font-mono mt-0.5">
                      Tagline: {COMPANY_DETAILS.taglineSanskrit} &nbsp;|&nbsp; CIN: {COMPANY_DETAILS.cin} &nbsp;|&nbsp; Moto: {COMPANY_DETAILS.mottoEnglish}
                    </div>
                  </div>
                </div>

                {/* Date on Right & Reference Code */}
                <div className="flex justify-between items-center text-xs font-mono pt-1">
                  <span>Ref: {letterRefCode}</span>
                  <span>Date: {letterDate}</span>
                </div>

                {/* Candidate Addressee ("To:") */}
                <div className="text-xs space-y-0.5 pt-1">
                  <div>To,</div>
                  <div className="font-bold text-sm">
                    {letterCandidateSalutation} {letterCandidateName}
                  </div>
                  <div className="text-slate-600">
                    {letterCandidateInstitute}
                  </div>
                </div>

                {/* Subject Line */}
                <div className="text-xs sm:text-sm font-bold text-slate-900 pt-1">
                  Subject: {letterWorkMode} Internship Opportunity Offer
                </div>

                {/* Opening Salutation & Body */}
                <div className="text-xs space-y-2 text-slate-800" style={{ textAlign: 'justify' }}>
                  <p>
                    Dear {letterCandidateName.split(' ')[0] || letterCandidateName},
                  </p>
                  <p>
                    We are pleased to offer you a {letterWorkMode.toLowerCase()} internship opportunity with <strong>Jigyasu Integrated Global Services Private Limited (JIGSY INDIA)</strong> as: <strong>Intern, Domain: {letterDomain}</strong>. Kindly confirm within the {letterConfirmDays}.
                  </p>

                  {/* Point 1 on Left & Point 2 on Right in 2 columns to strictly fit 1 Page (Transparent so watermark shines through cleanly) */}
                  <div className="grid grid-cols-2 gap-4 text-[10.5px] leading-tight my-1.5 bg-transparent">
                    <div>
                      <strong className="block text-slate-950 font-bold uppercase text-[10.5px] mb-0.5">1. WORK MODE</strong>
                      <p>This internship shall be performed {letterWorkMode.toLowerCase()}. The Intern agrees to:</p>
                      <ul className="list-disc pl-4 space-y-0.5 mt-0.5">
                        <li>Maintain professional availability;</li>
                        <li>Attend online meetings;</li>
                        <li>Use approved communication channels;</li>
                        <li>Protect Company information.</li>
                      </ul>
                    </div>

                    <div>
                      <strong className="block text-slate-950 font-bold uppercase text-[10.5px] mb-0.5">2. REMOTE WORK REQUIREMENTS</strong>
                      <p>The Intern shall maintain:</p>
                      <ul className="list-disc pl-4 space-y-0.5 mt-0.5">
                        <li>Suitable working environment;</li>
                        <li>Required connectivity;</li>
                        <li>Secure handling of information;</li>
                        <li>Professional communication practices.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 3: Internship Terms */}
                  <div className="text-[11px] space-y-0.5">
                    <strong className="block text-slate-950 font-bold uppercase text-[11px]">3. INTERNSHIP TERMS</strong>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 pt-0.5">
                      <div>Duration: <strong>{letterDuration}</strong></div>
                      <div>Department: <strong>{letterDepartment}</strong></div>
                      <div className="col-span-2">Reporting Manager / Officer: <strong>{letterReportingManagerName}, {letterReportingManagerDesignation}</strong></div>
                      <div className="col-span-2">Financial Terms: <strong>Unpaid / 100% Waived Course Fee</strong></div>
                    </div>
                    <p className="text-[10px] text-slate-600 italic pt-0.5 leading-snug">
                      Note: To grow together with India, 100% course tuition fees have been waived. This internship is structured as industrial-oriented learning (including daily syncs, work progress tracking, research intro, paper writing, and referencing across multi-disciplinary scholars). Strictly noted: This does not guarantee any permanent job continuation or financial compensation.
                    </p>
                  </div>

                  {/* Section 4: Acceptance */}
                  <div className="pt-0.5 text-[10px] leading-relaxed">
                    <strong className="block text-slate-950 font-bold uppercase text-[10.5px] mb-0.5">4. ACCEPTANCE</strong>
                    <p>
                      I confirm my acceptance of the {letterWorkMode.toLowerCase()} terms of my own will & in my sound senses. Self-attested copies of 1. Resume, 2. Government Approved Identity (like Aadhar, Voter Id, DL), 3. Passport Photo - 02 submitted as confirmation of my acceptance after I have read the Company's Terms and Conditions (T&Cs) full manual book and understood all applicable policies for this role. All these documents and details are true to the best of my knowledge. Under any circumstances, I will be liable for all possible consequences.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2 text-[10.5px]">
                      <div>Name: _______________________________</div>
                      <div>Signature: _______________________________</div>
                      <div>Date: _____ / _____ / _________</div>
                    </div>
                  </div>

                </div>

                {/* Authorized Signatory Block */}
                <div className="pt-2 flex justify-end text-xs">
                  <div className="text-center space-y-0.5">
                    <div className="flex items-center justify-center gap-2">
                      <span className="signature-font font-bold text-blue-900 text-lg tracking-wide transform -rotate-2 inline-block">
                        {letterSignatoryName}
                      </span>
                      {letterSignDate && (
                        <span className="text-[11px] font-mono text-blue-800 font-bold border-b border-blue-400 pb-0.5">
                          {letterSignDate}
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-slate-900 text-xs">Authorized Signatory</div>
                    <div className="text-[10px] text-slate-700">
                      {letterSignatoryName}, {letterSignatoryDesignation}
                    </div>
                    <div className="text-[9px] text-slate-500">(Signature with Date)</div>
                  </div>
                </div>

              </div>

              {/* Bottom Validity Note + Footer anchored strictly at Page 1 Bottom */}
              <div className="relative z-10 mt-auto pt-2 space-y-1.5">
                <div className="py-1.5 px-3 rounded bg-slate-50 border border-slate-200 text-[9px] text-slate-700 text-center font-sans">
                  <strong>Note:</strong> This is a system-generated official offer letter. It shall be marked as fully validated &amp; genuine only upon the candidate submitting their self-attested signed acceptance copy along with supporting identity documents to JIGSY INDIA within 7 working days.
                </div>

                {/* Formal Letter Footer Bar matching image_a9971b2b.png */}
                <div className="pt-2 border-t-2 border-blue-300 text-[9.5px] text-slate-700 space-y-0.5">
                  <div className="flex flex-wrap justify-between items-center gap-2 font-sans">
                    <span>Mail Us On: <strong className="text-blue-900">{COMPANY_DETAILS.officialEmail}</strong></span>
                    <span>Call Us On: <strong className="text-blue-900">{COMPANY_DETAILS.officialPhone}</strong></span>
                    <span>Visit Us On: <strong className="text-blue-900">jigsy.in</strong></span>
                  </div>
                  <div className="text-[8.5px] text-slate-500 italic text-center font-sans">
                    Sectors/Services: IT, SaaS, Mobile/Web, AI/ML, Consultancy, Sector Management, Event Management, Ad, Skill Development, Agro, Farm, Digital Media, Publishing, Logistic, Sport
                  </div>
                </div>
              </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 3. OFFICIAL VERIFIABLE CERTIFICATE MODAL */}
      <CertificateModal
        isOpen={Boolean(certApp)}
        onClose={() => {
          setCertApp(null);
          setMassCertDefaults(null);
        }}
        application={certApp}
        batchDefaults={massCertDefaults}
      />

      {/* 4. MASS CERTIFICATE GENERATION & BATCH EXPORT MODAL */}
      <MassCertificateModal
        isOpen={isMassCertOpen}
        onClose={() => setIsMassCertOpen(false)}
        applications={applications}
        onOpenSingleCertificate={(app, defaults) => handleOpenCertificate(app, defaults || null)}
      />

    </div>
  );
};

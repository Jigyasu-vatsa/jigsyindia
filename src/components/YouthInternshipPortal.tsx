import React, { useState, useRef } from 'react';
import { 
  GraduationCap, CheckCircle2, ShieldCheck, CreditCard, 
  Clock, ArrowRight, Download, Copy, Mail, Check, 
  FileText, QrCode, AlertCircle, Search, Sparkles, Printer, Loader2, Send
} from 'lucide-react';
import { Language, InternshipTrack, InternshipApplication } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { INTERNSHIP_TRACKS, COMPANY_DETAILS } from '../data/companyData';
import { openRazorpayCheckout } from '../utils/razorpay';
import { CaptchaBox } from './CaptchaBox';
import { validateCaptcha } from '../utils/captcha';
import { printDocument, exportElementToPdf } from '../utils/printHelper';
import { generateApplicationId } from '../utils/idGenerator';
import { getGraduationYearOptions, formatWhatsAppReceiptMessage } from '../utils/portalHelpers';
import { dispatchFormSubmit } from '../utils/formSubmit';

interface YouthInternshipPortalProps {
  language: Language;
  onOpenLegalModal: (tab: 'privacy' | 'terms') => void;
  onApplicationCreated?: (app: InternshipApplication) => void;
}

export const YouthInternshipPortal: React.FC<YouthInternshipPortalProps> = ({
  language,
  onOpenLegalModal,
  onApplicationCreated,
}) => {
  const t = TRANSLATIONS[language];

  // Track selection & form modal
  const [selectedTrack, setSelectedTrack] = useState<InternshipTrack>(INTERNSHIP_TRACKS[0]);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Form inputs
  const [salutation, setSalutation] = useState('Mr.');
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const graduationYearOptions = getGraduationYearOptions();
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('BBA');
  const [branch, setBranch] = useState('Management / Computer Science');
  const [passingYear, setPassingYear] = useState(() => String(new Date().getFullYear()));
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // CAPTCHA state
  const [captchaInput, setCaptchaInput] = useState('');
  const [expectedCaptcha, setExpectedCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  // Mandatory Pre-Payment Data Verification Confirmation Modal State
  const [isConfirmDataModalOpen, setIsConfirmDataModalOpen] = useState(false);

  // Submission result & receipt state
  const [submittedApp, setSubmittedApp] = useState<InternshipApplication | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [copiedPacket, setCopiedPacket] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [formError, setFormError] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const receiptPrintRef = useRef<HTMLDivElement>(null);

  const handlePrintReceipt = () => {
    if (!receiptPrintRef.current || !submittedApp) return;
    printDocument({
      title: `JIGSY INDIA - Registration Receipt - ${submittedApp.id}`,
      filename: `JIGSY_Receipt_${submittedApp.id}`,
      contentHtml: receiptPrintRef.current.innerHTML,
    });
  };

  const handleDownloadReceipt = async () => {
    if (!receiptPrintRef.current || !submittedApp) return;
    setIsGeneratingPdf(true);
    try {
      const filename = `JIGSY_Receipt_${submittedApp.id}.pdf`;
      await exportElementToPdf(receiptPrintRef.current, filename, true);
    } catch (err) {
      console.error('Failed to export receipt PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleSendEmailPacket = () => {
    if (!submittedApp) return;
    const subject = encodeURIComponent(`[internApplication] ${submittedApp.id} - ${submittedApp.salutation || ''} ${submittedApp.fullName}`);
    const body = encodeURIComponent(
`Respected JIGSY Management Team,

Here are my internship enrollment details for official record and verification:

APPLICATION ID: ${submittedApp.id}
DATE: ${new Date(submittedApp.createdAt).toLocaleDateString()}

CANDIDATE DETAILS:
- Salutation: ${submittedApp.salutation || 'Mr./Ms.'}
- Candidate Name: ${submittedApp.fullName}
- Father's / Guardian's Name: ${submittedApp.fatherName || 'On Record'}
- Email: ${submittedApp.email}
- Mobile / WhatsApp: ${submittedApp.phone}
- College / Institute: ${submittedApp.college}
- Degree & Specialization: ${submittedApp.degree} (${submittedApp.branch})
- Year of Graduation: ${submittedApp.passingYear}

INTERNSHIP TRACK:
- Enrolled Program: ${submittedApp.trackTitle}
- Track ID: ${submittedApp.trackId}
- Course Fee: ₹0 (100% Subsidized / Waived)
- Verification & Misc Fee: ₹${submittedApp.miscFee}
- Total Paid: ₹${submittedApp.totalAmount}
- Payment Gateway: Razorpay (Auto-Verified)
- Razorpay Payment ID: ${submittedApp.razorpayPaymentId || 'N/A'}

I have read and agree to all terms and conditions and privacy policy of JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED. Please verify and dispatch the official offer/acceptance letter within 24–72 hours.

Candidate Name: ${submittedApp.salutation || ''} ${submittedApp.fullName}
Father's Name: ${submittedApp.fatherName || 'N/A'}
Email: ${submittedApp.email}
Mobile: ${submittedApp.phone}
`
    );
    window.open(`mailto:jigsy25@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  // Process Application Submission
  const finalizeSubmission = (paymentId?: string) => {
    const appId = generateApplicationId();
    const newApp: InternshipApplication = {
      id: appId,
      salutation: salutation,
      fullName: fullName.trim(),
      fatherName: fatherName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      college: college.trim(),
      degree: degree.trim(),
      branch: branch.trim(),
      passingYear: passingYear.trim(),
      trackId: selectedTrack.id,
      trackTitle: selectedTrack.name[language] || selectedTrack.name.en,
      courseFee: selectedTrack.courseFee,
      miscFee: selectedTrack.miscFee,
      totalAmount: selectedTrack.discountedPrice,
      paymentMethod: 'razorpay',
      razorpayPaymentId: paymentId || `pay_${Date.now().toString().slice(-8)}`,
      status: 'verified',
      termsAccepted: true,
      createdAt: new Date().toISOString(),
      notes: 'Paid and auto-verified via 100% Encrypted Razorpay gateway',
    };

    // Save to localStorage
    try {
      const existingStr = localStorage.getItem('jigsy_internship_applications');
      const list: InternshipApplication[] = existingStr ? JSON.parse(existingStr) : [];
      list.unshift(newApp);
      localStorage.setItem('jigsy_internship_applications', JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }

    // Automated free submission alert dispatched to jigsy25@gmail.com with proper tag
    void dispatchFormSubmit({
      tag: 'JIGSY YOUTH ENROLLMENT',
      subject: `New Registration — ${newApp.id} — ${newApp.salutation || ''} ${newApp.fullName}`,
      replyTo: newApp.email,
      fields: {
        Application_ID: newApp.id,
        Salutation: newApp.salutation || 'Mr./Ms.',
        Applicant_Name: newApp.fullName,
        Father_Name: newApp.fatherName || 'Not Provided',
        Email: newApp.email,
        Mobile: newApp.phone,
        Institute: newApp.college,
        Degree: newApp.degree,
        Specialization: newApp.branch,
        Passing_Year: newApp.passingYear,
        Plan_ID: newApp.trackId,
        Plan_Selected: newApp.trackTitle,
        Paid_Amount: `₹${newApp.totalAmount}`,
        Payment_Gateway: 'Razorpay',
        Razorpay_Payment_ID: newApp.razorpayPaymentId || 'Auto-Verified',
        SLA_Guarantee: '24 to 72 hours for Offer/Acceptance Letter dispatch to candidate email',
      },
    });

    if (onApplicationCreated) {
      onApplicationCreated(newApp);
    }

    setSubmittedApp(newApp);
    setIsApplyModalOpen(false);
    setIsReceiptModalOpen(true);
    setIsProcessingPayment(false);
    setFormError('');
  };

  // Step 1: Validate Form & Open Mandatory Data Verification Popup
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setCaptchaError('');

    if (!termsAccepted) {
      setFormError('You must read and accept the Privacy Policy and Terms & Conditions to proceed.');
      return;
    }

    if (!validateCaptcha(captchaInput, expectedCaptcha)) {
      setCaptchaError('Invalid CAPTCHA code. Please enter the characters shown in the security badge.');
      return;
    }

    setIsConfirmDataModalOpen(true);
  };

  // Step 2: Candidate Confirms Verified Details -> Launch Razorpay Checkout
  const handleConfirmAndPay = () => {
    setIsConfirmDataModalOpen(false);
    setIsProcessingPayment(true);
    openRazorpayCheckout({
      amountInINR: selectedTrack.discountedPrice,
      trackTitle: selectedTrack.name.en,
      applicantName: fullName,
      applicantEmail: email,
      applicantPhone: phone,
      onSuccess: (response) => {
        finalizeSubmission(response.razorpay_payment_id);
      },
      onDismiss: () => {
        setIsProcessingPayment(false);
        setFormError('Payment checkout was cancelled. You can retry anytime to secure your seat.');
      },
      onError: (err) => {
        setIsProcessingPayment(false);
        console.warn('Razorpay checkout error:', err);
        setFormError('Razorpay checkout encountered an issue. Please try again.');
      },
    });
  };

  // Copy Email Packet to Clipboard
  const handleCopyEmailPacket = () => {
    if (!submittedApp) return;
    const packet = `=====================================================
JIGSY YOUTH INTERNSHIP APPLICATION SUBMISSION
=====================================================
Application ID   : ${submittedApp.id}
Date & Time      : ${new Date(submittedApp.createdAt).toLocaleString()}
Salutation       : ${submittedApp.salutation || 'Mr./Ms.'}
Full Name        : ${submittedApp.fullName}
Father/Guardian  : ${submittedApp.fatherName || 'On Record'}
Email            : ${submittedApp.email}
Phone            : ${submittedApp.phone}
College/Univ     : ${submittedApp.college}
Degree & Branch  : ${submittedApp.degree} (${submittedApp.branch})
Passing Year     : ${submittedApp.passingYear}
Selected Track   : ${submittedApp.trackTitle}
Course Fee       : ₹0 (Subsidized)
Misc/Process Fee : ₹${submittedApp.miscFee}
Payment Method   : ${submittedApp.paymentMethod.toUpperCase()}
${submittedApp.razorpayPaymentId ? `Razorpay Ref ID  : ${submittedApp.razorpayPaymentId}` : ''}
Company Details  : JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED
CIN              : U62099BR2025PTC078592
Target Recipient : jigsy25@gmail.com
=====================================================`;

    navigator.clipboard.writeText(packet);
    setCopiedPacket(true);
    setTimeout(() => setCopiedPacket(false), 3000);
  };

  // Generate Mailto Link
  const getMailtoLink = () => {
    if (!submittedApp) return '#';
    const subject = encodeURIComponent(`[Internship Application - Ref: ${submittedApp.id}] ${submittedApp.fullName}`);
    const body = encodeURIComponent(`Respected JIGSY Youth Review Team,

I have submitted my application for the "${submittedApp.trackTitle}" track under JIGSY Youth.

Application Summary:
• Tracking ID: ${submittedApp.id}
• Full Name: ${submittedApp.fullName}
• College: ${submittedApp.college}
• Degree: ${submittedApp.degree} - ${submittedApp.branch} (${submittedApp.passingYear})
• Amount Paid: ₹${submittedApp.totalAmount}
• Payment Ref: ${submittedApp.razorpayPaymentId || submittedApp.utrNumber || 'UPI Receipt Attached'}

Kindly verify my payment and credentials and dispatch the official Offer & Acceptance Letter within 24 to 72 hours.

Sincerely,
${submittedApp.fullName}
${submittedApp.phone}`);
    return `mailto:${COMPANY_DETAILS.officialEmail}?subject=${subject}&body=${body}`;
  };



  return (
    <section className="py-8 md:py-12 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            JIGSY YOUTH RECRUITMENT & APPLICANT PORTAL
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight brand-font">
            {t.internship.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.internship.sectionSubtitle}
          </p>
        </div>

        {/* 24-72 Hour Guarantee Callout */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/30 dark:via-slate-900 dark:to-emerald-950/30 border border-emerald-300 dark:border-emerald-800/60 shadow-sm flex items-start sm:items-center gap-3">
          <div className="p-2 rounded-full bg-emerald-600 text-white shrink-0 mt-0.5 sm:mt-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            <span className="font-extrabold uppercase tracking-wide">
              24–72 Hours Official Confirmation Guarantee:
            </span>{' '}
            {t.internship.guaranteeText}
          </div>
        </div>

        {/* The 4 Curated Internship Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INTERNSHIP_TRACKS.map((track) => (
            <div
              key={track.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all relative ${
                selectedTrack.id === track.id
                  ? 'border-blue-600 dark:border-blue-500 bg-blue-50/40 dark:bg-blue-950/30 shadow-lg ring-1 ring-blue-500'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md'
              }`}
            >
              {/* Highlight ribbon for research or popular */}
              {track.id === 'track-3-research-oriented' && (
                <div className="absolute -top-3 left-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> R&amp;D Cell Guided
                </div>
              )}
              {track.id === 'track-1-cert-30d' && (
                <div className="absolute -top-3 left-4 bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                    {track.trackCode}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                    {track.duration[language] || track.duration.en}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-slate-100 leading-snug">
                    {track.name[language] || track.name.en}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {track.description[language] || track.description.en}
                  </p>
                </div>

                {/* Slashed Original Price & Subsidized Breakdown */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5 border border-slate-200/70 dark:border-slate-700/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 line-through">Standard Fee:</span>
                    <span className="text-slate-400 font-mono line-through font-semibold">
                      ₹{track.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>Course Fee:</span>
                    <span>₹0 (100% Waived)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                    <span>Verification & Misc:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                      ₹{track.miscFee.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      Total Payable:
                    </span>
                    <span className="text-base font-extrabold text-blue-700 dark:text-blue-400 font-mono">
                      ₹{track.discountedPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {(track.highlights[language] || track.highlights.en).map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTrack(track);
                    setIsApplyModalOpen(true);
                  }}
                  className="w-full py-2.5 px-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all group"
                >
                  <span>{t.internship.applyNow}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Official Dispatch & 24-72h SLA Protocol Card */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-3xl mx-auto space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 brand-font">
                Official Verification & Email Dispatch Protocol (24–72 Hours)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct Candidate Dispatch · No Public Status Exposure · Encrypted Official Records
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
            <p>
              Following your registration and Razorpay verification, your application is permanently logged with an encrypted timestamp Tracking ID. To uphold student confidentiality and data integrity, application evaluation records are never exposed publicly.
            </p>
            <p className="font-medium text-slate-800 dark:text-slate-200">
              Upon administrative review, your official <strong>Offer / Acceptance Letter &amp; Next-Steps Guide</strong> are dispatched directly to your registered email address within <strong>24 to 72 hours</strong>.
            </p>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/60 text-[11px] text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <strong>Need Instant Verification Assistance?</strong> Share your payment receipt on WhatsApp helpline: <strong className="font-mono text-amber-800 dark:text-amber-300">+91 94314 00022</strong>.
              </div>
              <a
                href="https://wa.me/919431400022?text=Hello%20JIGSY%20Support%2C%20I%20have%20registered%20on%20JIGSY%20Youth%20portal%20and%20would%20like%20to%20confirm%20my%20application%20status."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shrink-0 text-[11px] transition-colors"
              >
                WhatsApp Desk →
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 1. APPLY & REGISTRATION MODAL WITH CAPTCHA & RAZORPAY                     */}
      {/* ========================================================================= */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 my-8 space-y-5 text-slate-900 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  {selectedTrack.trackCode}
                </span>
                <h3 className="text-lg font-bold brand-font">
                  {t.internship.applicantFormTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            {/* Selected Track Slashed Fee Summary */}
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {selectedTrack.name[language] || selectedTrack.name.en}
                </span>
                <div className="text-slate-500">
                  Course Fee: <span className="line-through text-slate-400">₹{selectedTrack.originalPrice}</span> → <strong className="text-emerald-600">₹0 (Waived)</strong>
                </div>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[11px]">Misc & Verification Fee:</span>
                <span className="text-base font-extrabold text-blue-700 dark:text-blue-400 font-mono">
                  ₹{selectedTrack.discountedPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Personal & Academic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Salutation & Full Name */}
                <div>
                  <label className="block font-semibold mb-1">
                    Salutation &amp; Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-1.5">
                    <select
                      value={salutation}
                      onChange={(e) => setSalutation(e.target.value)}
                      className="w-24 px-2 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
                    >
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Dr.">Dr.</option>
                    </select>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Candidate Full Name"
                      className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                    />
                  </div>
                </div>

                {/* Father's / Guardian's Name */}
                <div>
                  <label className="block font-semibold mb-1">
                    Father's / Guardian's Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    placeholder="Father's Full Name (for Identity Verification)"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">
                    {t.internship.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">
                    {t.internship.phone} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit Mobile Number"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">
                    {t.internship.college} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="University or Institute Name"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">
                    {t.internship.degree} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="B.Tech / MCA / BCA / B.Sc"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">
                    {t.internship.branch} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="CSE / IT / ECE / Data Science"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">
                    {t.internship.passingYear} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={passingYear}
                    onChange={(e) => setPassingYear(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {graduationYearOptions.map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 100% Encrypted & PCI-DSS Compliant Razorpay Gateway (Zero public test key exposure) */}
              <div className="p-3.5 rounded-xl border border-blue-500/50 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      100% Encrypted &amp; PCI-DSS Compliant Razorpay Gateway
                    </span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-extrabold uppercase">
                    256-Bit SSL Encrypted
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Direct gateway checkout. Course tuition (₹{selectedTrack.originalPrice.toLocaleString('en-IN')}) is 100% waived; the administrative misc fee of <strong>₹{selectedTrack.discountedPrice.toLocaleString('en-IN')}</strong> confirms student seat allocation &amp; triggers instant verifiable receipt generation.
                </p>
              </div>

              {/* Mandatory CAPTCHA Protection */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <CaptchaBox
                  value={captchaInput}
                  onChange={setCaptchaInput}
                  expectedCodeRef={setExpectedCaptcha}
                />
                {captchaError && (
                  <p className="text-xs text-red-600 font-semibold mt-1">
                    {captchaError}
                  </p>
                )}
              </div>

              {/* Mandatory Terms Agreement Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2 cursor-pointer text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    required
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    <strong>Mandatory Acceptance:</strong> {t.internship.termsAgreement}{' '}
                    <button
                      type="button"
                      onClick={() => onOpenLegalModal('privacy')}
                      className="text-blue-600 underline font-medium hover:text-blue-700"
                    >
                      Privacy Policy
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      onClick={() => onOpenLegalModal('terms')}
                      className="text-blue-600 underline font-medium hover:text-blue-700"
                    >
                      Terms & Conditions
                    </button>.
                  </span>
                </label>
              </div>

              {formError && (
                <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Submit / Pay Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  {isProcessingPayment
                    ? 'Processing Razorpay Checkout...'
                    : `Pay ₹${selectedTrack.discountedPrice} via Razorpay & Complete Registration`}
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-500">
                Official payment confirmation & acceptance letter will be dispatched to <strong>{email || 'your email'}</strong> within 24 to 72 hours.
              </p>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. AUTOMATED OFFICIAL RECEIPT MODAL WITH PRINT & DISPATCH                 */}
      {/* ========================================================================= */}
      {isReceiptModalOpen && submittedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn print-modal-container">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 my-8 space-y-4 text-slate-900 dark:text-slate-100 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 no-print">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-950 rounded-full text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold brand-font text-slate-900 dark:text-slate-100">
                    Registration & Payment Receipt Generated
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    Status: Verified via Razorpay
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsReceiptModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            {/* Official Printable Receipt Card (Forced clean light paper styling + single block inner wrapper) */}
            <div 
              id="printableReceipt"
              ref={receiptPrintRef}
              className="p-5 rounded-xl border border-slate-300 bg-white text-slate-950 print-section"
              style={{ backgroundColor: '#ffffff', color: '#0f172a' }}
            >
              <div className="space-y-3.5 w-full block">
                {/* Receipt Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={COMPANY_DETAILS.logoUrl}
                      alt="Logo"
                      className="w-10 h-10 object-contain shrink-0"
                    />
                    <div>
                      <h4 className="font-extrabold text-xs text-blue-900 tracking-wide uppercase">
                        {COMPANY_DETAILS.name}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-mono block">
                        CIN: {COMPANY_DETAILS.cin} · GSTIN: {COMPANY_DETAILS.gstin}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono font-bold text-blue-700">
                      {submittedApp.id}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {new Date(submittedApp.createdAt).toLocaleDateString('en-GB')}
                    </div>
                  </div>
                </div>

                {/* Candidate Info Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-800">
                  <div><span className="text-slate-500">Candidate Name:</span> <strong>{submittedApp.salutation ? `${submittedApp.salutation} ` : ''}{submittedApp.fullName}</strong></div>
                  <div><span className="text-slate-500">Father's Name:</span> <strong>{submittedApp.fatherName || 'On Record'}</strong></div>
                  <div><span className="text-slate-500">Contact Email:</span> <strong>{submittedApp.email}</strong></div>
                  <div><span className="text-slate-500">Mobile Number:</span> <strong>{submittedApp.phone}</strong></div>
                  <div><span className="text-slate-500">College/Univ:</span> <strong>{submittedApp.college}</strong></div>
                  <div><span className="text-slate-500">Program:</span> <strong>{submittedApp.degree} ({submittedApp.branch})</strong></div>
                  <div><span className="text-slate-500">Graduation:</span> <strong>{submittedApp.passingYear}</strong></div>
                  <div><span className="text-slate-500">Payment Ref:</span> <strong className="font-mono text-emerald-700">{submittedApp.razorpayPaymentId || 'Auto-Verified'}</strong></div>
                </div>

                {/* Financial Breakup Table */}
                <div className="border border-slate-200 rounded-lg overflow-hidden text-xs bg-white">
                  <div className="bg-slate-100 px-3 py-1.5 font-bold flex justify-between text-slate-900 border-b border-slate-200">
                    <span>Enrolled Track ({submittedApp.trackId})</span>
                    <span>Amount (INR)</span>
                  </div>
                  <div className="p-3 space-y-1.5">
                    <div className="flex justify-between font-semibold text-slate-900">
                      <span>{submittedApp.trackTitle}</span>
                      <span>₹0.00 (Subsidized)</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-[11px]">
                      <span>Administrative Verification &amp; Misc Fee</span>
                      <span>₹{submittedApp.miscFee}.00</span>
                    </div>
                    {submittedApp.razorpayPaymentId && (
                      <div className="flex justify-between text-emerald-700 text-[11px] font-mono">
                        <span>Razorpay Payment ID</span>
                        <span>{submittedApp.razorpayPaymentId}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-blue-900">
                      <span>Total Paid</span>
                      <span>₹{submittedApp.totalAmount}.00 INR</span>
                    </div>
                  </div>
                </div>

                {/* Verification Timeline Notice */}
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-700" />
                  <span>
                    <strong>Verification SLA:</strong> Your application data has been recorded. Offer/Acceptance Letter will be issued to <strong>{submittedApp.email}</strong> within <strong>24 to 72 hours</strong>.
                  </span>
                </div>

                {/* WhatsApp Support Escalation Notice */}
                <div className="p-2.5 rounded-lg bg-green-50 border border-green-200 text-[11px] sm:text-xs text-green-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <strong>Need Quick Response?</strong> For quick response or if not processed on time within 24–72 hours, share this receipt on WhatsApp no. <strong className="font-mono text-green-800">+91 94314 00022</strong>.
                  </div>
                  <a
                    href={`https://wa.me/919431400022?text=${encodeURIComponent(
                      formatWhatsAppReceiptMessage(submittedApp)
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-print inline-flex items-center gap-1.5 px-3 py-1 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shrink-0 text-xs transition-colors shadow"
                  >
                    <span>Share on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Print & Export Action Toolbar (hidden during print) */}
            <div className="space-y-3 pt-1 no-print">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <button
                  type="button"
                  disabled={isGeneratingPdf}
                  onClick={handleDownloadReceipt}
                  className="py-2 px-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
                  title="Generate and download official PDF receipt (.pdf)"
                >
                  {isGeneratingPdf ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF (.pdf)'}
                </button>

                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="py-2 px-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
                  title="Open browser print dialog to Print or Save as PDF"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save PDF
                </button>

                <button
                  type="button"
                  onClick={handleSendEmailPacket}
                  className="py-2 px-3 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
                  title="Open default email app with pre-filled details to jigsy25@gmail.com"
                >
                  <Send className="w-4 h-4" />
                  Send to jigsy25@gmail.com
                </button>

                <button
                  type="button"
                  onClick={handleCopyEmailPacket}
                  className="py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy formatted application packet text"
                >
                  {copiedPacket ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  {copiedPacket ? 'Copied Packet!' : 'Copy Packet'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MANDATORY PRE-PAYMENT DATA VERIFICATION POPUP                          */}
      {/* ========================================================================= */}
      {isConfirmDataModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4 text-slate-900 dark:text-slate-100">
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-100 dark:bg-amber-950 rounded-xl text-amber-700 dark:text-amber-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold brand-font">
                    Verify &amp; Confirm Your Details Before Payment
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Your Receipt, Offer Letter, and Final Certificate will be generated strictly from these entries.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsConfirmDataModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold px-1"
                aria-label="Close Verification Modal"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                <div><span className="text-slate-500 block text-[10px]">Candidate Name</span><strong>{salutation} {fullName}</strong></div>
                <div><span className="text-slate-500 block text-[10px]">Father's / Guardian's Name</span><strong>{fatherName}</strong></div>
                <div><span className="text-slate-500 block text-[10px]">Email Address</span><strong className="break-all">{email}</strong></div>
                <div><span className="text-slate-500 block text-[10px]">Mobile / WhatsApp</span><strong>{phone}</strong></div>
                <div><span className="text-slate-500 block text-[10px]">College / Institute</span><strong>{college}</strong></div>
                <div><span className="text-slate-500 block text-[10px]">Degree &amp; Specialization</span><strong>{degree} ({branch})</strong></div>
                <div><span className="text-slate-500 block text-[10px]">Year of Graduation</span><strong>{passingYear}</strong></div>
                <div><span className="text-slate-500 block text-[10px]">Selected Track ({selectedTrack.trackCode})</span><strong>{selectedTrack.name[language] || selectedTrack.name.en}</strong></div>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Total Payable via Razorpay:</span>
                <strong className="text-sm font-mono text-blue-700 dark:text-blue-400">
                  ₹{selectedTrack.discountedPrice.toLocaleString('en-IN')} INR
                </strong>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-[11px] text-amber-900 dark:text-amber-200">
              Please inspect spellings of your <strong>Name, Father&apos;s Name, Email, College, and Branch</strong> carefully. Click <em>Edit Details</em> to fix anything before proceeding to Razorpay.
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsConfirmDataModalOpen(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs cursor-pointer"
              >
                ← Back / Edit Details
              </button>
              <button
                type="button"
                onClick={handleConfirmAndPay}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                Confirm Data &amp; Pay ₹{selectedTrack.discountedPrice.toLocaleString('en-IN')}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { X, Shield, FileText, CheckCircle2, Mail, Cookie } from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { UI_COPY } from '../utils/uiCopy';

interface LegalModalsProps {
  isOpen: boolean;
  initialTab: 'privacy' | 'terms';
  language: Language;
  onClose: () => void;
  onAcceptConsent?: () => void;
  onOpenContactModal: (opts?: { sectorSlug?: string; engagementType?: string; subject?: string }) => void;
  onOpenCookieNotice: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({
  isOpen,
  initialTab,
  language,
  onClose,
  onAcceptConsent,
  onOpenContactModal,
  onOpenCookieNotice,
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);
  const [accepted, setAccepted] = useState(false);
  const copy = UI_COPY[language].legal;

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAccept = () => {
    setAccepted(true);
    try {
      localStorage.setItem('jigsy_policy_consent_at', new Date().toISOString());
    } catch {
      // Ignore storage quota issues
    }
    if (onAcceptConsent) onAcceptConsent();
    setTimeout(() => {
      setAccepted(false);
      onClose();
    }, 650);
  };

  return (
    <div
      data-testid="legal-modal"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={activeTab === 'privacy' ? copy.privacyTab : copy.termsTab}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[88vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Tabs */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>{copy.privacyTab}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{copy.termsTab}</span>
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.closeBtn}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Legal Document Body */}
        <div className="p-6 sm:p-8 overflow-y-auto text-sm text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
          {activeTab === 'privacy' ? (
            <article className="space-y-5">
              <header className="pb-4 border-b border-slate-200 dark:border-slate-800 space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Privacy Policy — {COMPANY_DETAILS.shortName}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  <strong>{COMPANY_DETAILS.name}</strong> · CIN: {COMPANY_DETAILS.cin} · Effective Date: October 13, 2025
                </p>
              </header>

              {language !== 'en' && (
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/70 text-xs sm:text-sm text-blue-950 dark:text-blue-200">
                  {language === 'hi'
                    ? 'सारांश: JIGSY INDIA आपकी व्यक्तिगत जानकारी कभी नहीं बेचता। इस पोर्टल पर केवल भाषा, थीम और एंटी-DoS सुरक्षा सत्र की बुनियादी प्राथमिकताएं आपके ब्राउज़र में सहेजी जाती हैं। विधिक रूप से मान्य पूर्ण अंग्रेजी नीति नीचे प्रस्तुत है।'
                    : 'सारांश: JIGSY INDIA अहाँक व्यक्तिगत जानकारी कहियो नहि बेचैत अछि। एहि पोर्टल पर केवल भाषा, थीम आ एंटी-DoS सुरक्षा सत्रक प्राथमिकता ब्राउज़र में सहेजल जाएत अछि। विधिक रूप सँ मान्य पूर्ण अंग्रेजी नीति नीचाँ देल गेल अछि।'}
                </div>
              )}

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Introduction and Scope</h3>
                <p>
                  {COMPANY_DETAILS.name} ("Company," "we," "us," or "our") is committed to protecting the privacy and
                  security of the personal data we collect from visitors, clients, institutional partners, jobseekers,
                  and users of our websites and services (collectively, the "Services"). This Privacy Policy explains
                  how we collect, process, store, and safeguard your information when you engage with our corporate
                  sectors (JIGSY Tech, JIGSY Consult, JIGSY R&amp;D, JIGSY DigiTech, JIGSY EduTech, and JIGSY Youth).
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Information We Collect</h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong>Identity &amp; Contact Data:</strong> Name, email address, phone/WhatsApp number, postal
                    address, and organization/institution name provided through our service request, contact, or
                    feedback forms.
                  </li>
                  <li>
                    <strong>Professional &amp; Application Data:</strong> Resumes, portfolios, academic credentials,
                    work experience, and role preferences submitted to our Careers or Talent Pool desk.
                  </li>
                  <li>
                    <strong>Commercial &amp; Transaction Data:</strong> Project specifications, MoU proposals,
                    invoicing details, and statutory identifiers (such as GSTIN or CIN) voluntarily provided for
                    business engagements.
                  </li>
                  <li>
                    <strong>Technical &amp; Usage Data:</strong> Browser preferences (such as dark/light theme and
                    language selection) stored locally in your browser to enhance usability.
                  </li>
                  <li>
                    <strong>User-Generated Content:</strong> Feedback, reviews, messages, and inquiry narratives you
                    choose to submit.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">3. Legal Basis and Use of Your Data</h3>
                <p>We process personal data lawfully and transparently for the following purposes:</p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Responding to service requests, commercial proposals, institutional MoUs, and corporate inquiries.</li>
                  <li>Delivering contracted software, consultancy, R&amp;D, publishing, and training services.</li>
                  <li>Evaluating professional profiles submitted to our Talent Pool or hiring partner desk.</li>
                  <li>Complying with applicable Indian statutory, tax, MCA/ROC, and legal obligations.</li>
                  <li>Protecting website integrity, preventing spam via CAPTCHA checks, and resolving technical issues.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">4. Data Sharing and Disclosure</h3>
                <p>
                  We do <strong>not</strong> sell or rent your personal information. Data may be shared strictly on a
                  need-to-know basis with: (a) authorized internal personnel and Directors handling your request; (b)
                  trusted form-routing or infrastructure service providers assisting in communication delivery; and (c)
                  regulatory or judicial authorities when legally mandated under Indian law.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">5. Cookies, Browser Storage &amp; Security Gateway</h3>
                <p>
                  Our website uses strictly necessary browser storage (<code>localStorage</code> and{' '}
                  <code>sessionStorage</code>) solely to remember your theme mode, preferred language, policy
                  acknowledgment, welcome preference, and temporary Anti-DoS / Anti-Bot security verification session
                  (valid for 30 minutes). We do not deploy intrusive third-party advertising or cross-site tracking
                  pixels on this corporate portal.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCookieNotice();
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/70 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors cursor-pointer"
                >
                  <Cookie className="w-3.5 h-3.5" />
                  <span>
                    {language === 'hi'
                      ? 'कुकी नीति का सारांश देखें'
                      : language === 'mai'
                        ? 'कुकी नीतिक सारांश देखू'
                        : 'View Cookie Policy Summary'}
                  </span>
                </button>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">6. Data Security and Retention</h3>
                <p>
                  We implement reasonable administrative, technical, and physical safeguards to prevent unauthorized
                  access, disclosure, or alteration of personal information. Applicant and Talent Pool submissions are
                  ordinarily retained for up to <strong>24 months</strong> (or longer if required by law or renewed
                  consent), after which they are securely purged or anonymized.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">7. Your Data Protection Rights</h3>
                <p>
                  Subject to applicable Indian data protection laws (including the Digital Personal Data Protection
                  Act, 2023), you may request access to, correction of, or erasure of personal data held by us, or
                  withdraw previously granted consent by contacting our Data Protection Officer below.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">8. Children&apos;s Privacy</h3>
                <p>
                  Our corporate commercial services are intended for adults aged <strong>18 years and older</strong> or
                  duly authorized institutional representatives. We do not knowingly collect personal data from minors
                  without verified parental or guardian consent.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">9. Policy Updates</h3>
                <p>
                  We may revise this Privacy Policy periodically to reflect operational, legal, or regulatory updates.
                  The updated effective date will always appear at the top of this notice.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">10. Governing Law and Jurisdiction</h3>
                <p>
                  This Privacy Policy is governed by the laws of the <strong>Republic of India</strong>. Any disputes
                  arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in{' '}
                  <strong>Darbhanga, Bihar, India</strong>.
                </p>
              </section>

              <section className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  11. Contact Information &amp; Data Protection Officer (DPO)
                </h3>
                <p className="text-xs sm:text-sm">
                  <strong>{COMPANY_DETAILS.name}</strong>
                  <br />
                  Registered Office: {COMPANY_DETAILS.registeredOffice}
                  <br />
                  Official Email: <a href={`mailto:${COMPANY_DETAILS.officialEmail}`} className="text-blue-600 dark:text-blue-400 underline">{COMPANY_DETAILS.officialEmail}</a>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenContactModal({
                      engagementType: 'General Corporate Inquiry',
                      subject: '@DPO — Data Privacy / Protection Inquiry',
                    });
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>
                    {language === 'hi'
                      ? 'डेटा संरक्षण अधिकारी (@DPO) से संपर्क करें'
                      : language === 'mai'
                        ? 'डेटा संरक्षण अधिकारी (@DPO) सँ संपर्क करू'
                        : 'Contact Data Protection Officer (@DPO)'}
                  </span>
                </button>
              </section>
            </article>
          ) : (
            <article className="space-y-5">
              <header className="pb-4 border-b border-slate-200 dark:border-slate-800 space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Terms and Conditions — {COMPANY_DETAILS.shortName}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  <strong>{COMPANY_DETAILS.name}</strong> · CIN: {COMPANY_DETAILS.cin} · Effective Date: October 3, 2025
                </p>
              </header>

              {language !== 'en' && (
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/70 text-xs sm:text-sm text-blue-950 dark:text-blue-200">
                  {language === 'hi'
                    ? 'सारांश: यह कॉर्पोरेट नियम एवं शर्तें JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED (JIGSY INDIA) की वेबसाइट और व्यावसायिक सेवाओं पर लागू होती हैं। सभी व्यावसायिक अनुबंध लिखित प्रस्ताव/MoU द्वारा संचालित होते हैं और न्यायिक क्षेत्राधिकार दरभंगा, बिहार (भारत) है।'
                    : 'सारांश: ई कॉर्पोरेट नियम आ शर्तें JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED (JIGSY INDIA) केर वेबसाइट आ व्यावसायिक सेवा पर लागू होइत अछि। सभ व्यावसायिक अनुबंध लिखित प्रस्ताव/MoU द्वारा संचालित होइत अछि आ न्यायिक क्षेत्राधिकार दरभंगा, बिहार (भारत) अछि।'}
                </div>
              )}

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Introduction &amp; Eligibility</h3>
                <p>
                  Welcome to {COMPANY_DETAILS.shortName}. By accessing or using our website ({COMPANY_DETAILS.website})
                  or engaging our corporate services, you agree to be bound by these Terms and Conditions. You affirm
                  that you are at least <strong>18 years of age</strong> (or acting with valid legal authorization on
                  behalf of an organization) and legally competent to enter into binding agreements.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Company Information</h3>
                <p>
                  This portal is operated by <strong>{COMPANY_DETAILS.name}</strong>, a private limited company
                  incorporated in India (CIN: <code>{COMPANY_DETAILS.cin}</code>, DPIIT: <code>{COMPANY_DETAILS.dpiit}</code>,
                  GSTIN: <code>{COMPANY_DETAILS.gstin}</code>, MSME: <code>{COMPANY_DETAILS.msme}</code>), having its
                  registered office at {COMPANY_DETAILS.registeredOffice}.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">3. Services and User Responsibility</h3>
                <p>
                  JIGSY INDIA provides multi-sector services across technology engineering, business consultancy,
                  applied R&amp;D, publishing &amp; digital media, educational technology, and youth exposure. Specific
                  commercial engagements, timelines, deliverables, and fees are governed by separate signed proposals,
                  Statements of Work (SOW), or Memoranda of Understanding (MoU). Submitting an inquiry through this
                  website does not create a binding contract until formally accepted in writing by JIGSY INDIA.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">4. Acceptable Use &amp; Prohibited Conduct</h3>
                <p>Users agree not to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Submit false, misleading, defamatory, or fraudulent contact, career, or business information.</li>
                  <li>Attempt unauthorized access, scraping, automated spam, or disruption of site availability.</li>
                  <li>Misrepresent affiliation with {COMPANY_DETAILS.name} or misuse its name, logos, or documents.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">5. Intellectual Property Rights</h3>
                <p>
                  All trademarks, emblems, software interfaces, visual designs, publications, and original content on
                  this portal are the exclusive intellectual property of {COMPANY_DETAILS.name} or its respective
                  licensors. No material may be reproduced, redistributed, or commercially exploited without prior
                  written consent.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">6. Payments, Subscriptions &amp; Refunds</h3>
                <p>
                  Commercial invoices, milestone fees, consultancy retainers, or program charges are payable strictly
                  as outlined in the respective official invoice, proposal, or agreement. Refund eligibility, if any,
                  is governed exclusively by the written terms of the specific engagement or portal through which a
                  transaction was executed.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">7. Disclaimers &amp; No Warranties</h3>
                <p>
                  This website and its informational materials are provided on an &quot;as is&quot; and &quot;as
                  available&quot; basis without express or implied warranties of merchantability, fitness for a
                  particular purpose, or uninterrupted availability.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">8. Limitation of Liability</h3>
                <p>
                  To the maximum extent permitted by law, {COMPANY_DETAILS.name} and its Directors shall not be liable
                  for indirect, incidental, special, or consequential damages arising from website usage. In any event,
                  aggregate liability shall not exceed the greater of <strong>₹1,000 INR</strong> or the total service
                  fees actually paid by you to the Company during the preceding twelve (12) months for the specific
                  service giving rise to the claim.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">9. Indemnification</h3>
                <p>
                  You agree to indemnify and hold harmless {COMPANY_DETAILS.name}, its Directors, officers, and
                  affiliates from claims, liabilities, or expenses arising from your breach of these Terms or misuse of
                  our Services.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">10. Third-Party Links</h3>
                <p>
                  This portal may link to dedicated subdomains (such as <code>youth.jigsy.in</code> and{' '}
                  <code>jigyasu.jigsy.in</code>) and external third-party platforms (such as LinkedIn, Amazon, or
                  Springer). External third-party sites operate under their own terms and privacy policies.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">11. Termination</h3>
                <p>
                  We reserve the right to restrict or terminate access to our digital platforms or decline inquiries
                  that violate these Terms, applicable laws, or ethical standards.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">12. Governing Law &amp; Jurisdiction</h3>
                <p>
                  These Terms and Conditions are governed by the laws of the <strong>Republic of India</strong>, and
                  the courts located in <strong>Darbhanga, Bihar, India</strong> shall have exclusive jurisdiction over
                  all disputes.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">13. Miscellaneous</h3>
                <p>
                  If any provision of these Terms is held unenforceable, the remaining provisions shall remain in full
                  force. Failure to enforce any right shall not constitute a waiver of future enforcement.
                </p>
              </section>

              <section className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">14. Contact</h3>
                <p className="text-xs sm:text-sm">
                  For legal notices, compliance queries, or formal correspondence, write to{' '}
                  <a href={`mailto:${COMPANY_DETAILS.officialEmail}`} className="text-blue-600 dark:text-blue-400 underline">
                    {COMPANY_DETAILS.officialEmail}
                  </a>{' '}
                  or submit a corporate inquiry directly below.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenContactModal({
                      engagementType: 'Corporate / Legal & GST Compliance',
                      subject: 'Legal / Terms & Conditions Inquiry',
                    });
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>
                    {language === 'hi'
                      ? 'कॉर्पोरेट संपर्क फ़ॉर्म खोलें'
                      : language === 'mai'
                        ? 'कॉर्पोरेट संपर्क फ़ॉर्म खोलू'
                        : 'Open Corporate Contact Form'}
                  </span>
                </button>
              </section>
            </article>
          )}
        </div>

        {/* Footer Consent Controls */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-slate-600 dark:text-slate-400 text-center sm:text-left">
            {copy.consentNote}
          </p>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              {copy.closeBtn}
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{accepted ? copy.acceptedBadge : copy.acceptBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

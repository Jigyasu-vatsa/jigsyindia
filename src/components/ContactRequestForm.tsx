import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { SECTORS, ENGAGEMENT_REQUEST_TYPES } from '../data/companyData';
import { CaptchaBox } from './CaptchaBox';
import { validateCaptcha } from '../utils/captcha';
import { UI_COPY } from '../utils/uiCopy';
import { dispatchFormSubmit } from '../utils/formSubmit';

export interface ContactRequestPrefill {
  sectorSlug?: string;
  serviceName?: string;
  engagementType?: string;
  subject?: string;
}

interface ContactRequestFormProps {
  language: Language;
  prefill?: ContactRequestPrefill;
  compact?: boolean;
  onClose?: () => void;
}

export const ContactRequestForm: React.FC<ContactRequestFormProps> = ({
  language,
  prefill,
  compact = false,
  onClose,
}) => {
  const copy = UI_COPY[language].contact;

  const [selectedSectorSlug, setSelectedSectorSlug] = useState<string>(prefill?.sectorSlug || 'tech');
  const [selectedService, setSelectedService] = useState<string>(prefill?.serviceName || '');
  const [engagementType, setEngagementType] = useState<string>(
    prefill?.engagementType || ENGAGEMENT_REQUEST_TYPES[0]
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [subject, setSubject] = useState(prefill?.subject || '');
  const [message, setMessage] = useState('');
  const [captchaVal, setCaptchaVal] = useState('');
  const expectedCaptcha = useRef('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const activeSector = SECTORS.find((s) => s.slug === selectedSectorSlug);

  useEffect(() => {
    if (prefill?.sectorSlug) {
      setSelectedSectorSlug(prefill.sectorSlug);
    }
    if (prefill?.serviceName) {
      setSelectedService(prefill.serviceName);
    }
    if (prefill?.engagementType) {
      setEngagementType(prefill.engagementType);
    }
    if (prefill?.subject) {
      setSubject(prefill.subject);
    }
  }, [prefill]);

  useEffect(() => {
    if (selectedSectorSlug === 'general') {
      if (!selectedService) setSelectedService('Custom Requirement');
      return;
    }
    const sec = SECTORS.find((s) => s.slug === selectedSectorSlug);
    if (sec && sec.services.length > 0) {
      const englishTitles = sec.services.map((srv) => srv.title.en);
      if (!selectedService || (!englishTitles.includes(selectedService) && selectedService !== 'Custom Requirement')) {
        setSelectedService(englishTitles[0]);
      }
    }
  }, [selectedSectorSlug, selectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validateCaptcha(captchaVal, expectedCaptcha.current)) {
      setErrorMsg(copy.captchaError);
      return;
    }

    setIsSubmitting(true);

    const sectorName = activeSector ? activeSector.name : 'General Corporate / Multi-Sector';
    const serviceLabel = selectedService || 'General Inquiry';

    try {
      await dispatchFormSubmit({
        tag: 'JIGSY SERVICE REQUEST',
        subject: `${sectorName} — ${engagementType}: ${subject || serviceLabel}`,
        replyTo: email,
        fields: {
          Sector: sectorName,
          Service: serviceLabel,
          Engagement_Type: engagementType,
          Full_Name: name,
          Email: email,
          Phone: phone || 'Not provided',
          Organization: organization || 'Individual / Not specified',
          Subject: subject,
          Request_Details: message,
          Language: language.toUpperCase(),
        },
      });
      setStatus('success');
    } catch {
      setStatus('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setOrganization('');
    setSubject('');
    setMessage('');
    setCaptchaVal('');
    setErrorMsg('');
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <div
        data-testid="contact-form-success"
        className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/70 text-center space-y-4"
      >
        <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{copy.successTitle}</h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
          {copy.successDesc}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={resetForm}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            {copy.submitAnother}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm font-semibold transition-colors cursor-pointer"
            >
              {copy.closeModal}
            </button>
          )}
        </div>
      </div>
    );
  }

  const inputBase =
    'w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors';
  const labelBase = 'block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className={compact ? 'space-y-4' : 'space-y-5'}>
      {/* Row 1: Sector & Service (Sector Names & Service Titles ALWAYS strictly English) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelBase}>
            {copy.sectorLabel} <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedSectorSlug}
            onChange={(e) => {
              setSelectedSectorSlug(e.target.value);
              setSelectedService('');
            }}
            required
            className={inputBase}
          >
            {SECTORS.map((sec) => (
              <option key={sec.id} value={sec.slug}>
                {sec.name}
              </option>
            ))}
            <option value="general">{copy.generalCorporateOption}</option>
          </select>
        </div>

        <div>
          <label className={labelBase}>
            {copy.serviceLabel} <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
            className={inputBase}
          >
            {activeSector?.services.map((srv) => (
              <option key={srv.title.en} value={srv.title.en}>
                {srv.title.en}
              </option>
            ))}
            <option value="Custom Requirement">{copy.customServiceOption}</option>
          </select>
        </div>
      </div>

      {/* Row 2: Engagement Type */}
      <div>
        <label className={labelBase}>
          {copy.engagementTypeLabel} <span className="text-red-500">*</span>
        </label>
        <select
          value={engagementType}
          onChange={(e) => setEngagementType(e.target.value)}
          required
          className={inputBase}
        >
          {ENGAGEMENT_REQUEST_TYPES.map((typeKey) => (
            <option key={typeKey} value={typeKey}>
              {copy.engagementTypes[typeKey] || typeKey}
            </option>
          ))}
        </select>
      </div>

      {/* Row 3: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelBase}>
            {copy.nameLabel} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={copy.namePlaceholder}
            required
            className={inputBase}
          />
        </div>
        <div>
          <label className={labelBase}>
            {copy.emailInputLabel} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={copy.emailPlaceholder}
            required
            className={inputBase}
          />
        </div>
      </div>

      {/* Row 4: Phone & Organization */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelBase}>
            {copy.phoneInputLabel} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={copy.phonePlaceholder}
            required
            className={inputBase}
          />
        </div>
        <div>
          <label className={labelBase}>{copy.orgLabel}</label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder={copy.orgPlaceholder}
            className={inputBase}
          />
        </div>
      </div>

      {/* Row 5: Subject */}
      <div>
        <label className={labelBase}>
          {copy.subjectLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={copy.subjectPlaceholder}
          required
          className={inputBase}
        />
      </div>

      {/* Row 6: Details */}
      <div>
        <label className={labelBase}>
          {copy.detailsLabel} <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={compact ? 3 : 4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={copy.detailsPlaceholder}
          required
          className={inputBase}
        />
      </div>

      {/* CAPTCHA */}
      <CaptchaBox
        value={captchaVal}
        onChange={setCaptchaVal}
        expectedCodeRef={(c) => {
          expectedCaptcha.current = c;
        }}
        language={language}
      />

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Clean, Professional Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        data-testid="contact-submit-btn"
        className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
      >
        <Send className="w-4 h-4" />
        <span>{isSubmitting ? copy.submittingBtn : copy.submitBtn}</span>
      </button>
    </form>
  );
};

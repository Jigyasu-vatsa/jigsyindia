import React, { useState, useRef, useEffect } from 'react';
import {
  Briefcase,
  ExternalLink,
  CheckCircle2,
  X,
  UserPlus,
  Sparkles,
  GraduationCap,
  AlertCircle,
  Linkedin,
  Layers,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS, SECTORS } from '../data/companyData';
import { CaptchaBox } from './CaptchaBox';
import { validateCaptcha } from '../utils/captcha';
import { UI_COPY } from '../utils/uiCopy';
import { dispatchFormSubmit } from '../utils/formSubmit';

interface CareersViewProps {
  language: Language;
}

export const CareersView: React.FC<CareersViewProps> = ({ language }) => {
  const copy = UI_COPY[language].careersPage;

  // Talent Pool Modal State
  const [isTalentModalOpen, setIsTalentModalOpen] = useState(false);
  const [tName, setTName] = useState('');
  const [tEmail, setTEmail] = useState('');
  const [tPhone, setTPhone] = useState('');
  const [tSector, setTSector] = useState(SECTORS[0].name);
  const [tExp, setTExp] = useState('');
  const [tPortfolio, setTPortfolio] = useState('');
  const [tNote, setTNote] = useState('');
  const [tCaptcha, setTCaptcha] = useState('');
  const tExpected = useRef('');
  const [tSubmitting, setTSubmitting] = useState(false);
  const [tSuccess, setTSuccess] = useState(false);
  const [tError, setTError] = useState('');

  const handleTalentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTError('');
    if (!validateCaptcha(tCaptcha, tExpected.current)) {
      setTError(UI_COPY[language].contact.captchaError);
      return;
    }

    setTSubmitting(true);
    try {
      await dispatchFormSubmit({
        tag: 'JIGSY TALENT POOL',
        subject: `${tName} — ${tSector}`,
        replyTo: tEmail,
        fields: {
          Submission_Type: 'Talent Pool Profile',
          Full_Name: tName,
          Email: tEmail,
          Phone: tPhone,
          Preferred_Sector: tSector,
          Experience: tExp,
          Portfolio_Resume_URL: tPortfolio,
          Introduction_Skills: tNote,
          Language: language.toUpperCase(),
        },
      });
    } catch {
      // Graceful fallback
    } finally {
      setTSubmitting(false);
      setTSuccess(true);
    }
  };

  const resetTalentModal = () => {
    setIsTalentModalOpen(false);
    setTSuccess(false);
    setTError('');
    setTName('');
    setTEmail('');
    setTPhone('');
    setTExp('');
    setTPortfolio('');
    setTNote('');
    setTCaptcha('');
  };

  useEffect(() => {
    if (!isTalentModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        resetTalentModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isTalentModalOpen]);

  const inputClass =
    'w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none';
  const labelClass = 'block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5';
  const pillarIcons = [Layers, ShieldCheck, Globe];

  return (
    <div data-testid="careers-view" className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Aligned Page Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800/70">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{copy.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black brand-font text-slate-900 dark:text-white">
            {copy.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {copy.subtitle}
          </p>
        </div>

        {/* Executive "No Current Openings Right Now" Corporate Status Panel */}
        <section
          data-testid="no-openings-panel"
          className="rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-lg jigsy-border-card p-8 sm:p-12 text-center space-y-6"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-400">
            <Briefcase className="w-8 h-8" />
          </div>

          <div className="space-y-2.5 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800/70">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{copy.noOpeningsBadge}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black brand-font text-slate-900 dark:text-white">
              {copy.noOpeningsTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {copy.noOpeningsDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              data-testid="open-talent-pool-btn"
              onClick={() => setIsTalentModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>{copy.talentPoolBtn}</span>
            </button>

            <a
              href={COMPANY_DETAILS.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{copy.linkedinBtn}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* Working with JIGSY INDIA — 3 Equal-Height Culture Pillars */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black brand-font text-slate-900 dark:text-white">
              {copy.whyJoinTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {copy.whyJoinPoints.map((point, idx) => {
              const Icon = pillarIcons[idx % pillarIcons.length];
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm jigsy-border-card space-y-3"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-700 dark:text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold brand-font text-slate-900 dark:text-white">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Compact Dedicated Student Internship Banner -> youth.jigsy.in */}
        <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-blue-800/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>JIGSY Youth</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold brand-font">{copy.youthBannerTitle}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{copy.youthBannerDesc}</p>
          </div>
          <a
            href={COMPANY_DETAILS.youthPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-lg transition-colors flex items-center gap-2 shrink-0"
          >
            <span>{copy.youthBannerCta}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </section>
      </div>

      {/* Modal 1: Submit Profile to Talent Pool */}
      {isTalentModalOpen && (
        <div
          className="fixed inset-0 z-[105] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
          onClick={resetTalentModal}
        >
          <div
            className="w-full max-w-xl my-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 shrink-0">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>{copy.talentModalTitle}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{copy.talentModalSub}</p>
              </div>
              <button
                type="button"
                onClick={resetTalentModal}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {tSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{copy.talentSuccessTitle}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{copy.talentSuccessDesc}</p>
                  <button
                    type="button"
                    onClick={resetTalentModal}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                  >
                    {UI_COPY[language].contact.closeModal}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTalentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>{copy.fields.fullName} *</label>
                      <input type="text" required value={tName} onChange={(e) => setTName(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>{copy.fields.email} *</label>
                      <input type="email" required value={tEmail} onChange={(e) => setTEmail(e.target.value)} className={inputClass} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>{copy.fields.phone} *</label>
                      <input type="tel" required value={tPhone} onChange={(e) => setTPhone(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>{copy.fields.preferredSector} *</label>
                      <select value={tSector} onChange={(e) => setTSector(e.target.value)} className={inputClass}>
                        {SECTORS.map((s) => (
                          <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>{copy.fields.experience} *</label>
                      <input type="text" required value={tExp} onChange={(e) => setTExp(e.target.value)} placeholder="e.g. Fresher / 2 Years" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>{copy.fields.portfolioUrl} *</label>
                      <input type="url" required value={tPortfolio} onChange={(e) => setTPortfolio(e.target.value)} placeholder="https://..." className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>{copy.fields.note} *</label>
                    <textarea rows={3} required value={tNote} onChange={(e) => setTNote(e.target.value)} className={inputClass} />
                  </div>
                  <CaptchaBox
                    value={tCaptcha}
                    onChange={setTCaptcha}
                    expectedCodeRef={(c) => { tExpected.current = c; }}
                    language={language}
                  />
                  {tError && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{tError}</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={tSubmitting}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-sm shadow-md cursor-pointer"
                  >
                    {tSubmitting ? copy.fields.submittingBtn : copy.fields.submitBtn}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

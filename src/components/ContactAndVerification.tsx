import React, { useState, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Star,
  MessageSquare,
  Clock,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { Language, Review } from '../types';
import { COMPANY_DETAILS, INITIAL_REVIEWS } from '../data/companyData';
import { CaptchaBox } from './CaptchaBox';
import { validateCaptcha } from '../utils/captcha';
import { UI_COPY } from '../utils/uiCopy';
import { ContactRequestForm, ContactRequestPrefill } from './ContactRequestForm';
import { dispatchFormSubmit } from '../utils/formSubmit';

interface FeedbackSectionProps {
  language: Language;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({ language }) => {
  const copy = UI_COPY[language].feedback;
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [reviewName, setReviewName] = useState('');
  const [reviewRole, setReviewRole] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewCaptcha, setReviewCaptcha] = useState('');
  const expectedReviewCaptcha = useRef('');
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState('');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError('');

    if (!validateCaptcha(reviewCaptcha, expectedReviewCaptcha.current)) {
      setReviewError(copy.captchaError);
      return;
    }

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      name: reviewName.trim(),
      role: reviewRole.trim() || 'Client / Member',
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: 'Just now',
    };

    void dispatchFormSubmit({
      tag: 'JIGSY USER FEEDBACK',
      subject: `Member Review (${reviewRating}/5) — ${reviewName.trim()}`,
      fields: {
        Reviewer_Name: reviewName.trim(),
        Role_Or_Organization: reviewRole.trim() || 'Client / Member',
        Rating_Stars: `${reviewRating} / 5`,
        Feedback_Comment: reviewComment.trim(),
        Language: language.toUpperCase(),
      },
    });

    setReviews([newRev, ...reviews]);
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewSuccess(false);
      setReviewName('');
      setReviewRole('');
      setReviewComment('');
      setReviewCaptcha('');
    }, 3500);
  };

  const inputClass =
    'w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors';

  return (
    <section
      id="feedback"
      data-testid="feedback-section"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10"
    >
      {/* Centered Aligned Heading */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800/70">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{copy.badge}</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-black brand-font text-slate-900 dark:text-white">
          {copy.title}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">{copy.subtitle}</p>
      </div>

      {/* Symmetrical Equal-Height Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {reviews.slice(0, 6).map((rev) => (
          <article
            key={rev.id}
            className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm jigsy-border-card flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="font-bold text-sm text-slate-900 dark:text-white">{rev.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {rev.role} · {rev.date}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Symmetrically Aligned Feedback Submission Card */}
      <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-md jigsy-border-card space-y-5">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <h3 className="font-extrabold text-lg brand-font text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>{copy.formTitle}</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{copy.formSubtitle}</p>
        </div>

        {reviewSuccess ? (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm font-semibold flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{copy.successMsg}</span>
          </div>
        ) : (
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {copy.nameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder={copy.namePlaceholder}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {copy.roleLabel}
                </label>
                <input
                  type="text"
                  value={reviewRole}
                  onChange={(e) => setReviewRole(e.target.value)}
                  placeholder={copy.rolePlaceholder}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {copy.ratingLabel} <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-1 h-[42px] px-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      aria-label={`Rate ${star} out of 5`}
                      className="focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= reviewRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-bold text-xs text-slate-700 dark:text-slate-300 ml-auto">
                    {reviewRating}/5
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {copy.commentLabel} <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder={copy.commentPlaceholder}
                className={inputClass}
              />
            </div>

            <CaptchaBox
              value={reviewCaptcha}
              onChange={setReviewCaptcha}
              expectedCodeRef={(c) => {
                expectedReviewCaptcha.current = c;
              }}
              language={language}
            />

            {reviewError && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{reviewError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all"
            >
              {copy.submitBtn}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

interface ContactPageViewProps {
  language: Language;
  prefill?: ContactRequestPrefill;
}

/**
 * Dedicated /contact view:
 * Places the Corporate Contact & Service Request Form prominently at the TOP,
 * followed cleanly by the aligned FeedbackSection below.
 * Employee Verification is intentionally disabled and omitted here.
 */
export const ContactPageView: React.FC<ContactPageViewProps> = ({ language, prefill }) => {
  const copy = UI_COPY[language].contact;

  return (
    <div data-testid="contact-page-view" className="py-10 md:py-14 space-y-12">
      {/* Page Heading */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800/70">
            <Mail className="w-3.5 h-3.5" />
            <span>{copy.pageBadge}</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black brand-font text-slate-900 dark:text-white">
            {copy.pageTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {copy.pageSubtitle}
          </p>
        </div>

        {/* Balanced 5/7 Corporate Contact & Service Request Grid AT THE TOP */}
        <div
          id="service-request-desk"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left 5 Columns: Official Corporate Office Details */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white shadow-xl border border-blue-800/50 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  {copy.infoEyebrow}
                </span>
                <h2 className="text-2xl font-black brand-font">{copy.infoTitle}</h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{copy.infoDesc}</p>
              </div>

              <div className="space-y-4 pt-2 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">{copy.officeLabel}</div>
                    <div className="text-slate-300 mt-0.5">{COMPANY_DETAILS.registeredOffice}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">{copy.emailLabel}</div>
                    <a
                      href={`mailto:${COMPANY_DETAILS.officialEmail}`}
                      className="text-blue-300 hover:text-white font-mono underline mt-0.5 inline-block"
                    >
                      {COMPANY_DETAILS.officialEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">{copy.phoneLabel}</div>
                    <a
                      href={`tel:${COMPANY_DETAILS.officialPhone.replace(/\s+/g, '')}`}
                      className="text-blue-300 hover:text-white font-mono underline mt-0.5 inline-block"
                    >
                      {COMPANY_DETAILS.officialPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-200 leading-relaxed">{copy.responsePromise}</p>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-blue-800/70 space-y-1.5 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2 text-amber-300 font-sans font-bold text-xs mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>{COMPANY_DETAILS.name}</span>
              </div>
              <div>CIN: {COMPANY_DETAILS.cin}</div>
              <div>DPIIT: {COMPANY_DETAILS.dpiit}</div>
              <div>GSTIN: {COMPANY_DETAILS.gstin}</div>
              <div>MSME: {COMPANY_DETAILS.msme}</div>
            </div>
          </div>

          {/* Right 7 Columns: Reusable Service & Collaboration Request Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-md jigsy-border-card space-y-5">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-xl sm:text-2xl font-extrabold brand-font text-slate-900 dark:text-white">
                {copy.formTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                {copy.formSubtitle}
              </p>
            </div>
            <ContactRequestForm language={language} prefill={prefill} />
          </div>
        </div>
      </section>

      {/* Aligned Community Feedback Section Underneath */}
      <FeedbackSection language={language} />
    </div>
  );
};

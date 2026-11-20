import React, { useState } from 'react';
import {
  ShieldCheck,
  Scale,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Users,
  Landmark,
  ZoomIn,
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS, DIRECTORS, FOUNDER_PORTRAITS } from '../data/companyData';
import { UI_COPY } from '../utils/uiCopy';
import { CrispImage, PortraitLightbox } from './CrispImage';

interface DirectorsViewProps {
  language: Language;
  onNavigate: (view: string, sectorSlug?: string) => void;
  onRequestService: (sectorSlug?: string, serviceName?: string, engagementType?: string) => void;
}

export const DirectorsView: React.FC<DirectorsViewProps> = ({
  language,
  onNavigate,
  onRequestService,
}) => {
  const copy = UI_COPY[language].directorsPage;
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [lightboxPortrait, setLightboxPortrait] = useState<{
    imageUrl: string;
    title: string;
    subtitle: string;
  } | null>(null);

  return (
    <div data-testid="directors-view" className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800/70">
            <Landmark className="w-4 h-4" />
            <span>{copy.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black brand-font text-slate-900 dark:text-white">
            {copy.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {copy.subtitle}
          </p>
        </div>

        {/* Both Directors Showcase Cards (Equal Height) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {DIRECTORS.map((director, idx) => {
            const meta = copy.profiles[idx];
            const isExpanded = selectedIdx === idx;
            return (
              <article
                key={director.name}
                className="rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden jigsy-border-card flex flex-col justify-between"
              >
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Top Profile Row */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxPortrait({
                          imageUrl: idx === 1 ? FOUNDER_PORTRAITS.standing : director.imageUrl,
                          title: director.name,
                          subtitle: director.role[language] || director.role.en,
                        })
                      }
                      aria-label={`View full-size portrait of ${director.name}`}
                      className="group/photo relative w-40 h-48 sm:w-44 sm:h-52 shrink-0 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md bg-slate-100 dark:bg-slate-800 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    >
                      <CrispImage
                        src={idx === 1 ? FOUNDER_PORTRAITS.standing : director.imageUrl}
                        sizes="(max-width: 640px) 160px, 176px"
                        targetWidth={360}
                        loading="eager"
                        alt={director.name}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/photo:scale-[1.03]"
                      />
                      <span className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-slate-900/75 text-white opacity-0 group-hover/photo:opacity-100 transition-opacity shadow">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </span>
                    </button>
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 text-[11px] font-bold">
                          {meta.badge}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black brand-font text-slate-900 dark:text-white">
                        {director.name}
                      </h2>
                      <p className="text-xs font-bold text-blue-700 dark:text-blue-400">
                        {director.role[language] || director.role.en}
                      </p>
                      {idx === 1 && (
                        <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          M.Tech (CSE) · MBA · Researcher
                        </p>
                      )}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {director.bio[language] || director.bio.en}
                      </p>
                    </div>
                  </div>

                  {/* Governance Mandate */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {copy.boardMandate}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                      {meta.mandate}
                    </div>
                  </div>

                  {/* Key Oversight Areas */}
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedIdx(isExpanded ? null : idx)}
                      className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      {isExpanded ? `${copy.hideOversight} ▲` : `${copy.showOversight} ▼`}
                    </button>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {(isExpanded ? meta.focusAreas : meta.focusAreas.slice(0, 2)).map((area, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quote */}
                  <blockquote className="p-4 rounded-xl border-l-4 border-amber-500 bg-amber-50/80 dark:bg-amber-950/25 text-xs sm:text-sm italic text-slate-700 dark:text-slate-300">
                    &ldquo;{meta.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Action Footer (Employee Verification intentionally omitted) */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  {idx === 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={() => onNavigate('about-founder')}
                        className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>{copy.readFounderPage}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={COMPANY_DETAILS.founderPortfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
                      >
                        <span>jigyasu.jigsy.in</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        onRequestService(
                          'consult',
                          'Business & Institutional Advisory',
                          'Strategic Collaboration / Partnership'
                        )
                      }
                      className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{copy.connectGovernance}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Corporate Governance Assurance Bar */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{copy.assurance1Title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {copy.assurance1Desc}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Scale className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{copy.assurance2Title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {copy.assurance2Desc}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{copy.assurance3Title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {copy.assurance3Desc}
              </p>
            </div>
          </div>
        </section>
      </div>

      <PortraitLightbox
        isOpen={Boolean(lightboxPortrait)}
        imageUrl={lightboxPortrait?.imageUrl || ''}
        title={lightboxPortrait?.title || ''}
        subtitle={lightboxPortrait?.subtitle}
        onClose={() => setLightboxPortrait(null)}
      />
    </div>
  );
};

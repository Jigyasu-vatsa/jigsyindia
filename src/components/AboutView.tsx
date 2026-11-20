import React from 'react';
import {
  Building,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Users,
  Lightbulb,
  Handshake,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS, SECTORS } from '../data/companyData';
import { UI_COPY } from '../utils/uiCopy';
import { CrispImage } from './CrispImage';

interface AboutViewProps {
  language: Language;
  onNavigate: (view: string, sectorSlug?: string) => void;
  onRequestService: (sectorSlug?: string, serviceName?: string, engagementType?: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  language,
  onNavigate,
  onRequestService,
}) => {
  const copy = UI_COPY[language].aboutPage;
  const nav = UI_COPY[language].nav;

  return (
    <div data-testid="about-company-view" className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800/70">
            <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{copy.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight brand-font text-slate-900 dark:text-white">
            {copy.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold">
            {COMPANY_DETAILS.name} ({COMPANY_DETAILS.shortName})
          </p>
        </div>

        {/* Corporate Identity Strip with Statutory Numbers */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="font-mono font-bold text-slate-700 dark:text-slate-300">
            CIN: <span className="text-blue-700 dark:text-blue-400">{COMPANY_DETAILS.cin}</span>
          </div>
          <div className="italic text-emerald-800 dark:text-emerald-400 font-serif text-center">
            <strong>{copy.mottoLabel}</strong> {COMPANY_DETAILS.mottoEnglish} &nbsp;|&nbsp;{' '}
            <strong>{copy.taglineLabel}</strong> {COMPANY_DETAILS.taglineSanskrit}
          </div>
          <div className="font-mono text-slate-600 dark:text-slate-400 text-center md:text-right">
            DPIIT: {COMPANY_DETAILS.dpiit} · GSTIN: {COMPANY_DETAILS.gstin} · MSME: {COMPANY_DETAILS.msme}
          </div>
        </div>

        {/* Story & Corporate Seal Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold brand-font text-slate-900 dark:text-white">
              {copy.storyTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {copy.storyPara1}
            </p>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {copy.storyPara2}
            </p>

            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/70 text-xs sm:text-sm text-blue-900 dark:text-blue-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{copy.milestoneTitle}</span>
              </div>
              <div>{copy.milestoneText}</div>
            </div>

            {/* Strategic Pillars */}
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">
                {copy.visionTitle}
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {copy.visionBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-white/95 dark:bg-slate-900/95 text-center p-6 sm:p-7 space-y-5 jigsy-border-card">
              <div className="w-28 h-28 mx-auto rounded-full p-1 border-2 border-amber-400 bg-white shadow-lg overflow-hidden">
                <CrispImage
                  src={COMPANY_DETAILS.logoUrl}
                  sizes="112px"
                  targetWidth={144}
                  alt="JIGSY Crest Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-lg brand-font text-blue-900 dark:text-blue-300">
                  {COMPANY_DETAILS.shortName}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-serif italic">
                  {COMPANY_DETAILS.taglineSanskrit}
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs space-y-1.5 text-slate-700 dark:text-slate-300 text-left">
                <div><strong>{copy.registeredOffice}</strong> {COMPANY_DETAILS.registeredOffice}</div>
                <div><strong>{copy.conceived}</strong> {COMPANY_DETAILS.conceptionDate}</div>
                <div><strong>{copy.incorporated}</strong> {COMPANY_DETAILS.incorporationYear} (DPIIT)</div>
                <div><strong>{copy.divisions}</strong> 6</div>
              </div>
              <button
                type="button"
                onClick={() => onRequestService('tech', undefined, 'Strategic Collaboration / Partnership')}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{copy.proposalCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Six Operating Divisions Architecture Strip */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> {copy.footprintBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold brand-font text-slate-900 dark:text-white mt-1">
                {copy.footprintTitle}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('sectors')}
              className="text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{copy.inspectAll}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {SECTORS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => onNavigate('sector-detail', sec.slug)}
                className="text-left p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm jigsy-border-card cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span>{sec.code}</span>
                  <span>
                    {sec.services.length} {copy.coreServicesUnit}
                  </span>
                </div>
                <h3 className="font-extrabold text-base brand-font text-slate-900 dark:text-white">{sec.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {sec.shortDescription[language] || sec.shortDescription.en}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Dedicated Leadership & Engagement Navigation Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200 dark:border-slate-800 items-stretch">
          <div className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm jigsy-border-card flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <Lightbulb className="w-6 h-6 text-amber-500" />
              <h3 className="text-lg font-extrabold brand-font text-slate-900 dark:text-white">{nav.founder}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {UI_COPY[language].home.founderDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('about-founder')}
              className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{copy.openFounderCta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm jigsy-border-card flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-extrabold brand-font text-slate-900 dark:text-white">{nav.directors}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {UI_COPY[language].home.directorsDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('about-directors')}
              className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{copy.viewDirectorsCta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm jigsy-border-card flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <Handshake className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-lg font-extrabold brand-font text-slate-900 dark:text-white">{nav.howToEngage}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {UI_COPY[language].engagePage.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onNavigate('how-to-engage')}
                className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{copy.openEngageCta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={COMPANY_DETAILS.youthPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>youth.jigsy.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Code,
  Users,
  Cpu,
  Tv,
  Scale,
  GraduationCap,
  CheckCircle2,
  Send,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Language } from '../types';
import { SECTORS, COMPANY_DETAILS } from '../data/companyData';
import { UI_COPY } from '../utils/uiCopy';

interface SectorsViewProps {
  language: Language;
  selectedSectorSlug?: string;
  onNavigate: (view: string, sectorSlug?: string) => void;
  onRequestService: (sectorSlug?: string, serviceName?: string, engagementType?: string) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Users,
  Cpu,
  Tv,
  Scale,
  GraduationCap,
};

export const SectorsView: React.FC<SectorsViewProps> = ({
  language,
  selectedSectorSlug,
  onNavigate,
  onRequestService,
}) => {
  const copy = UI_COPY[language].sectorsPage;
  const [activeSlug, setActiveSlug] = useState<string>(selectedSectorSlug || SECTORS[0].slug);

  useEffect(() => {
    if (selectedSectorSlug) {
      setActiveSlug(selectedSectorSlug);
    }
  }, [selectedSectorSlug]);

  const currentSector = SECTORS.find((s) => s.slug === activeSlug) || SECTORS[0];
  const IconComp = ICON_MAP[currentSector.iconName] || Layers;

  return (
    <div data-testid="sectors-view" className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Centered Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800/70">
            <Layers className="w-3.5 h-3.5" />
            <span>{copy.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black brand-font text-slate-900 dark:text-white">
            {copy.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {copy.subtitle}
          </p>
        </div>

        {/* 6 Sector Switcher Tabs (Sector Names strictly untranslated) */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {SECTORS.map((sec) => {
            const TabIcon = ICON_MAP[sec.iconName] || Layers;
            const isActive = sec.slug === currentSector.slug;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => {
                  setActiveSlug(sec.slug);
                  onNavigate('sector-detail', sec.slug);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{sec.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Division Detail Showcase */}
        <div className="rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden jigsy-border-card">
          {/* Division Header Banner */}
          <div className="p-6 sm:p-8 md:p-10 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0"
                style={{ backgroundColor: currentSector.colorScheme.accent }}
              >
                <IconComp className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-white/10 text-amber-300 border border-white/15">
                    {currentSector.code}
                  </span>
                  <span className="text-[11px] font-semibold text-blue-200 uppercase tracking-wider">
                    {copy.activeDivision}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black brand-font">{currentSector.name}</h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                  {currentSector.motto[language] || currentSector.motto.en}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {currentSector.slug === 'youth' ? (
                <a
                  href={COMPANY_DETAILS.youthPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-colors"
                >
                  <span>{copy.visitYouthCta}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    onRequestService(
                      currentSector.slug,
                      currentSector.services[0]?.title.en,
                      'Project Proposal & Development'
                    )
                  }
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{copy.requestDivisionCta}</span>
                </button>
              )}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 md:p-10 space-y-10">
            {/* Profile + Core Capabilities Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-lg font-extrabold brand-font text-slate-900 dark:text-white">
                  {copy.profileHeading}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentSector.fullDescription[language] || currentSector.fullDescription.en}
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                    {copy.deliverablesHeading}
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {currentSector.deliverables[language] || currentSector.deliverables.en}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3.5">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  {copy.coreOpsHeading}
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {(currentSector.coreOperations[language] || currentSector.coreOperations.en).map((op, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{op}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Generic Services Offered Grid (Service Titles ALWAYS strictly English!) */}
            <div className="space-y-5">
              <h3 className="text-xl font-extrabold brand-font text-slate-900 dark:text-white">
                {copy.servicesHeadingPrefix} {currentSector.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                {currentSector.services.map((srv, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                        {srv.title.en}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {srv.description[language] || srv.description.en}
                      </p>
                    </div>
                    <div className="pt-2">
                      {currentSector.slug === 'youth' ? (
                        <a
                          href={COMPANY_DETAILS.youthPortalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline"
                        >
                          <span>{copy.visitYouthCta}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            onRequestService(currentSector.slug, srv.title.en, 'Project Proposal & Development')
                          }
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer"
                        >
                          <span>{UI_COPY[language].home.requestService}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Works / Highlights */}
            {currentSector.featuredProjects.length > 0 && (
              <div className="space-y-5">
                <h3 className="text-xl font-extrabold brand-font text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>{copy.caseStudiesHeading}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                  {currentSector.featuredProjects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                          {proj.title[language] || proj.title.en}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                          {proj.status}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {proj.shortDescription[language] || proj.shortDescription.en}
                      </p>
                      <ul className="flex flex-wrap gap-2 pt-1">
                        {(proj.details[language] || proj.details.en).map((d, i) => (
                          <li
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold"
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* In-Place Consultation CTA Banner (Opens Contact Modal Without Redirecting Away) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  {copy.consultTitlePrefix} {currentSector.name}?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {copy.consultSubtitle}
                </p>
              </div>
              {currentSector.slug === 'youth' ? (
                <a
                  href={COMPANY_DETAILS.youthPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shrink-0"
                >
                  <span>{copy.visitYouthCta}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    onRequestService(
                      currentSector.slug,
                      currentSector.services[0]?.title.en,
                      'Project Proposal & Development'
                    )
                  }
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0 shadow-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{copy.requestDivisionCta}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

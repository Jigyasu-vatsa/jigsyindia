import React, { useState } from 'react';
import {
  Building2,
  GraduationCap,
  Briefcase,
  Handshake,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { UI_COPY } from '../utils/uiCopy';

interface HowToEngageViewProps {
  language: Language;
  onNavigate: (view: string, sectorSlug?: string) => void;
  onRequestService: (sectorSlug?: string, serviceName?: string, engagementType?: string) => void;
}

const PATHWAY_ICONS = {
  enterprise: Building2,
  academic: Handshake,
  careers: Briefcase,
  youth: GraduationCap,
};

export const HowToEngageView: React.FC<HowToEngageViewProps> = ({
  language,
  onNavigate,
  onRequestService,
}) => {
  const copy = UI_COPY[language].engagePage;
  const [activeId, setActiveId] = useState<'enterprise' | 'academic' | 'careers' | 'youth'>('enterprise');

  const activePathway = copy.pathways.find((p) => p.id === activeId) || copy.pathways[0];
  const ActiveIcon = PATHWAY_ICONS[activePathway.id];

  const handlePrimaryCta = () => {
    if (activePathway.id === 'enterprise') {
      onRequestService('tech', 'Web & Application Development', 'Project Proposal & Development');
    } else if (activePathway.id === 'academic') {
      onRequestService('edutech', 'In-Campus Incubation Centers', 'Institutional MoU & Academic Tie-Up');
    } else if (activePathway.id === 'careers') {
      onNavigate('careers');
    }
  };

  return (
    <div data-testid="how-to-engage-view" className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800/70">
            <Handshake className="w-4 h-4" />
            <span>{copy.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black brand-font text-slate-900 dark:text-white">
            {copy.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {copy.subtitle}
          </p>
        </div>

        {/* 4 Interactive Pathway Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {copy.pathways.map((p) => {
            const Icon = PATHWAY_ICONS[p.id];
            const isActive = p.id === activePathway.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveId(p.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                    : 'bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-blue-400'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-white/15 text-white' : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-extrabold leading-snug">{p.label}</div>
                  <div className={`text-[11px] mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                    {p.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pathway Detailed Roadmap Card */}
        <section className="rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl jigsy-border-card p-6 sm:p-8 md:p-10 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <ActiveIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  {activePathway.badge}
                </span>
                <h2 className="text-xl sm:text-2xl font-black brand-font text-slate-900 dark:text-white">
                  {activePathway.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activePathway.summary}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              {activePathway.id === 'youth' ? (
                <a
                  href={COMPANY_DETAILS.youthPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-md transition-colors"
                >
                  <span>{activePathway.ctaLabel}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handlePrimaryCta}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-colors cursor-pointer"
                >
                  <span>{activePathway.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            {activePathway.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2"
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

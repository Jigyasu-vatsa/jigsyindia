import React from 'react';
import {
  ArrowRight,
  Compass,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface FeeWaiverShowcaseProps {
  language: Language;
  onApply: () => void;
}

export const FeeWaiverShowcase: React.FC<FeeWaiverShowcaseProps> = ({
  language,
  onApply,
}) => {
  const fw = TRANSLATIONS[language].feeWaiverShowcase;

  const pillars = [
    {
      icon: GraduationCap,
      title: fw.pillars.accessTitle,
      desc: fw.pillars.accessDesc,
      accent: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60',
    },
    {
      icon: Compass,
      title: fw.pillars.exposureTitle,
      desc: fw.pillars.exposureDesc,
      accent: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60',
    },
    {
      icon: Lightbulb,
      title: fw.pillars.innovateTitle,
      desc: fw.pillars.innovateDesc,
      accent: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60',
    },
    {
      icon: HeartHandshake,
      title: fw.pillars.socialTitle,
      desc: fw.pillars.socialDesc,
      accent: 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/60',
    },
  ];

  return (
    <section
      aria-labelledby="fee-waiver-showcase-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 shadow-lg overflow-hidden">
        {/* Top Highlight Header Strip */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-50 via-white to-blue-50/70 dark:from-emerald-950/40 dark:via-slate-900 dark:to-blue-950/30 border-b border-emerald-100 dark:border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span>{fw.badge}</span>
              </div>
              <h2
                id="fee-waiver-showcase-heading"
                className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 brand-font leading-tight"
              >
                {fw.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {fw.subtitle}
              </p>
            </div>

            {/* 100% Waiver Callout Block & Primary Apply CTA */}
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3">
              <div className="px-5 py-3.5 rounded-2xl bg-emerald-700 dark:bg-emerald-800 text-white shadow-md text-center lg:text-right">
                <div className="text-xl sm:text-2xl font-black tracking-tight font-mono">
                  {fw.waiverHeadline}
                </div>
                <div className="text-[11px] font-medium text-emerald-100 mt-0.5">
                  {fw.waiverSubtext}
                </div>
              </div>

              <button
                type="button"
                onClick={onApply}
                className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-sm shadow hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{fw.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Impact Pillars Grid */}
        <div className="p-6 sm:p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${pillar.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center sm:text-left border-t border-slate-100 dark:border-slate-800 pt-3">
            {fw.note}
          </p>
        </div>
      </div>
    </section>
  );
};

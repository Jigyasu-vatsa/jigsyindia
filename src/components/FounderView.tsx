import React, { useState } from 'react';
import {
  BookOpen,
  Code2,
  ExternalLink,
  GraduationCap,
  Layers,
  Lightbulb,
  Milestone,
  Sparkles,
  Users,
  ArrowRight,
  CheckCircle2,
  FileText,
  ZoomIn,
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS, DIRECTORS, FOUNDER_PORTRAITS, SECTORS } from '../data/companyData';
import { resolveAssetUrl } from '../utils/portalHelpers';
import { UI_COPY } from '../utils/uiCopy';
import { CrispImage, PortraitLightbox } from './CrispImage';

interface FounderViewProps {
  language: Language;
  onNavigate: (view: string, sectorSlug?: string) => void;
  onRequestService: (sectorSlug?: string, serviceName?: string, engagementType?: string) => void;
}

const RESEARCH_PUBLICATIONS = [
  {
    venue: 'Springer Nature & Atlantis Press · ICIPAI-2026 (WoS)',
    title:
      'AI-Assisted Smart Food Redistribution System with Priority-Based Optimization: A Circular Economy Framework for SRM',
    domain: 'DOI: 10.2991/978-94-6239-789-7_18 · Primary Author & Presenter',
  },
  {
    venue: 'Taylor & Francis Group · ICTTI-2026 (Scopus, In Press)',
    title:
      'Cyber-Resilient AI-Assisted Smart Food Redistribution Using Secure Priority Optimization for Sustainable Industry 5.0',
    domain: 'Primary Author & Presenter · Accepted for Scopus Indexing',
  },
  {
    venue: 'GTISD-2026 · International Conference (ISBN Proceeding)',
    title:
      'Zero Waste Food Management: A Web-Based Circular Economy Framework for Sustainable Food Redistribution',
    domain: 'ISBN: 978-81-685333-4-9 · Faculty Guide & Mentor',
  },
  {
    venue: 'FAIR-2026 · International Conference (ISBN Proceeding)',
    title: 'Futuristic Automation in Robotics with AI for Strategizing Mankind’s Ethical Growth',
    domain: 'ISBN: 978-93-94599-97-0 · Paper Presenter & Author',
  },
  {
    venue: 'Vedanjali Research Journal · 2025 (Peer-Reviewed & Indexed)',
    title: 'उद्यमशीलता के राजनीतिक परिदृश्य एवं दलितों का साथ : समावेशी आर्थिक विकास का एक संस्थागत विश्लेषण',
    domain: 'ISSN: 2349-364X · Co-Author (Hindi Journal Article)',
  },
];

export const FounderView: React.FC<FounderViewProps> = ({
  language,
  onNavigate,
  onRequestService,
}) => {
  const copy = UI_COPY[language].founderPage;
  const [activePillar, setActivePillar] = useState<'ideation' | 'implementation' | 'research'>('ideation');
  const [isPortraitZoomOpen, setIsPortraitZoomOpen] = useState(false);
  const founder = DIRECTORS[1];
  const bookImage = resolveAssetUrl('/assets/aistudio/image_35628884.png');

  return (
    <div data-testid="founder-view" className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Hero Banner */}
        <section className="rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden jigsy-border-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 md:p-10 items-center">
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <button
                type="button"
                onClick={() => setIsPortraitZoomOpen(true)}
                aria-label="View full-size portrait of Mr. Jigyasu Vatsa"
                className="group/photo relative w-56 sm:w-64 aspect-[4/5] rounded-3xl overflow-hidden border-4 border-amber-400/90 shadow-xl bg-slate-100 dark:bg-slate-800 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <CrispImage
                  src={FOUNDER_PORTRAITS.chairperson}
                  sizes="(max-width: 640px) 224px, 256px"
                  targetWidth={480}
                  loading="eager"
                  alt="Mr. Jigyasu Vatsa — Chairperson & Founder of JIGSY INDIA"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/photo:scale-[1.02]"
                />
                <span className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-slate-900/75 text-white opacity-0 group-hover/photo:opacity-100 transition-opacity shadow">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </button>
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
                  {copy.roleLine}
                </div>
                <h1 className="text-2xl sm:text-3xl font-black brand-font text-slate-900 dark:text-white">
                  Mr. Jigyasu Vatsa
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                  M.Tech (CSE) · MBA · Researcher
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800/70">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{copy.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black brand-font leading-tight text-slate-900 dark:text-white">
                {copy.headlinePrefix}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-600 dark:from-blue-400 dark:via-cyan-300 dark:to-amber-400">
                  {copy.headlineHighlight}
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {founder.bio[language] || founder.bio.en} {copy.bioExtra}
              </p>

              {/* Key Verified Credentials Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <div className="text-base sm:text-lg font-black text-blue-700 dark:text-blue-400 font-mono">2010→2025</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">{copy.stat1Lbl}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <div className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-400 font-mono">5 Papers</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">{copy.stat2Lbl}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <div className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-400 font-mono">ISBN 2026</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">{copy.stat3Lbl}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <div className="text-base sm:text-lg font-black text-purple-700 dark:text-purple-400 font-mono">IRCTC</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">{copy.stat4Lbl}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    onRequestService('rd', 'Academic & Industry Research Collaboration', 'Strategic Collaboration / Partnership')
                  }
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>{copy.collaborateCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('about-directors')}
                  className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-bold rounded-xl border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  {copy.directorsCta}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Focus Switcher: Ideation / Implementation / Research */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {[
              { id: 'ideation', label: copy.tabIdeation, icon: Milestone },
              { id: 'implementation', label: copy.tabImplementation, icon: Layers },
              { id: 'research', label: copy.tabResearch, icon: BookOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activePillar === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActivePillar(tab.id as 'ideation' | 'implementation' | 'research')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                    active
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-blue-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {activePillar === 'ideation' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn items-stretch">
              {copy.timeline.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm jigsy-border-card space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono font-bold text-blue-700 dark:text-blue-400">{item.year}</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 font-bold text-[11px]">
                      {item.phase}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold brand-font text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activePillar === 'implementation' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn items-stretch">
              {SECTORS.map((sec) => (
                <div
                  key={sec.id}
                  className="p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm jigsy-border-card flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">{sec.code}</span>
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                        {copy.architectedActive}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold brand-font text-slate-900 dark:text-white">
                      {sec.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {sec.motto[language] || sec.motto.en}
                    </p>
                    <ul className="space-y-1.5 pt-1 text-xs text-slate-700 dark:text-slate-300">
                      {(sec.coreOperations[language] || sec.coreOperations.en).slice(0, 2).map((op, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{op}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('sector-detail', sec.slug)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-900 dark:text-slate-100 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>
                      {copy.inspectArchitecturePrefix} {sec.name}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activePillar === 'research' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
              <div className="lg:col-span-5 p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm jigsy-border-card space-y-4">
                <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <CrispImage
                    src={bookImage}
                    sizes="(max-width: 1024px) 92vw, 440px"
                    targetWidth={840}
                    alt="Mastering DSA Without Fear by Jigyasu Vatsa"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                    {copy.bookBadge}
                  </span>
                  <h3 className="text-lg font-extrabold brand-font text-slate-900 dark:text-white">
                    Mastering DSA Without Fear
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {copy.bookDesc}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-extrabold brand-font text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{copy.papersHeading}</span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">JIGSY R&amp;D</span>
                </div>
                <div className="space-y-3">
                  {RESEARCH_PUBLICATIONS.map((pub, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 space-y-1"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                        <span className="font-bold text-blue-700 dark:text-blue-400">{pub.venue}</span>
                        <span className="text-slate-500 dark:text-slate-400">{pub.domain}</span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">{pub.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Academic & Engineering Milestones Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <div className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 jigsy-border-card space-y-2.5">
            <GraduationCap className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            <h3 className="font-extrabold text-base brand-font text-slate-900 dark:text-white">
              {copy.milestone1Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {copy.milestone1Desc}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 jigsy-border-card space-y-2.5">
            <Code2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-extrabold text-base brand-font text-slate-900 dark:text-white">
              {copy.milestone2Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {copy.milestone2Desc}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 jigsy-border-card space-y-2.5">
            <Users className="w-7 h-7 text-amber-600 dark:text-amber-400" />
            <h3 className="font-extrabold text-base brand-font text-slate-900 dark:text-white">
              {copy.milestone3Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {copy.milestone3Desc}
            </p>
          </div>
        </section>

        {/* Bottom Prominent Founder Portfolio Link Card (jigyasu.jigsy.in) */}
        <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 md:p-10 shadow-2xl border border-blue-800/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left max-w-2xl">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400/90 shadow-lg shrink-0 bg-slate-800">
              <CrispImage
                src={FOUNDER_PORTRAITS.headshot}
                sizes="80px"
                targetWidth={160}
                alt="Mr. Jigyasu Vatsa"
                className="w-full h-full object-cover object-[38%_18%]"
              />
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{copy.portfolioBadge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black brand-font">
                {copy.portfolioTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {copy.portfolioDesc}
              </p>
            </div>
          </div>

          <a
            href={COMPANY_DETAILS.founderPortfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center gap-2.5 shrink-0"
          >
            <span>jigyasu.jigsy.in</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </section>
      </div>

      <PortraitLightbox
        isOpen={isPortraitZoomOpen}
        imageUrl={FOUNDER_PORTRAITS.chairperson}
        title="Mr. Jigyasu Vatsa"
        subtitle="Founder, Chairperson & Chief Architect · M.Tech (CSE) · MBA · Researcher"
        onClose={() => setIsPortraitZoomOpen(false)}
      />
    </div>
  );
};

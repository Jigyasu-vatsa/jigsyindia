import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  GraduationCap,
  ExternalLink,
  Code,
  Users,
  Cpu,
  Tv,
  Scale,
  Building2,
  Lightbulb,
  Handshake,
  Briefcase,
  Send,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Globe,
  BookOpen,
} from 'lucide-react';
import { Language } from './types';
import { COMPANY_DETAILS, SECTORS, DIRECTORS, FOUNDER_PORTRAITS } from './data/companyData';
import { resolveRouteFromLocation, getPathForView, getRepoBasePath } from './utils/portalHelpers';
import { SECURITY_GATE_CONFIG, shouldShowSecurityGate, isSearchEngineCrawler } from './utils/securityGate';
import { applySeoMetadataToDocument, getSeoMetadataForView } from './utils/seoManager';
import { UI_COPY } from './utils/uiCopy';
import { CrispImage } from './components/CrispImage';
import { SecurityGate } from './components/SecurityGate';
import { InteractiveBackground } from './components/InteractiveBackground';
import { AppErrorBoundary } from './components/AppErrorBoundary';
import { ErrorDialogueView, InteractiveStatusModal } from './components/ErrorDialogueView';
import { ContactRequestPrefill } from './components/ContactRequestForm';
import { ContactRequestModal } from './components/ContactRequestModal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { YouthInternshipPortal } from './components/YouthInternshipPortal';
import { SectorsView } from './components/SectorsView';
import { CareersView } from './components/CareersView';
import { AboutView } from './components/AboutView';
import { FounderView } from './components/FounderView';
import { DirectorsView } from './components/DirectorsView';
import { HowToEngageView } from './components/HowToEngageView';
import { ContactPageView, FeedbackSection } from './components/ContactAndVerification';
import { AdminDesk } from './components/AdminDesk';
import { LegalModals } from './components/LegalModals';
import { FirstVisitModal } from './components/FirstVisitModal';
import { Footer } from './components/Footer';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { JigsyAIAssistant } from './components/JigsyAIAssistant';

const SECTOR_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Users,
  Cpu,
  Tv,
  Scale,
  GraduationCap,
};

const PILLAR_ICONS = [Layers, ShieldCheck, BookOpen, Globe];

export default function App() {
  const initialBasePath =
    typeof window !== 'undefined'
      ? getRepoBasePath(window.location.pathname, window.location.hostname)
      : '';
  const initialRoute = resolveRouteFromLocation(
    typeof window !== 'undefined' ? window.location.pathname : '/',
    typeof window !== 'undefined' ? window.location.hash : '',
    typeof window !== 'undefined' ? window.location.search : '',
    typeof window !== 'undefined' ? window.location.hostname : ''
  );

  const [currentView, setCurrentView] = useState<string>(initialRoute.view);
  const [selectedSectorSlug, setSelectedSectorSlug] = useState<string>(initialRoute.sectorSlug || 'tech');
  const [invalidPath, setInvalidPath] = useState<string | undefined>(initialRoute.invalidPath);
  const [homeSectorFilter, setHomeSectorFilter] = useState<string>('all');
  const [worksFilter, setWorksFilter] = useState<string>('all');

  // In-place Contact Request Modal state (never redirects away or distorts exploration)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalPrefill, setContactModalPrefill] = useState<ContactRequestPrefill>({});

  // Interactive Status Modal (Cookie Policy / Missing Resource / Unavailable notice)
  const [statusModalState, setStatusModalState] = useState<{
    isOpen: boolean;
    kind: 'cookie' | 'pdf' | 'verification' | 'unavailable';
    resourceLabel?: string;
  }>({ isOpen: false, kind: 'cookie' });

  useEffect(() => {
    // Normalize GitHub Pages 404.html redirect (?route=/...) into clean browser path
    try {
      const params = new URLSearchParams(window.location.search || '');
      if (params.has('route')) {
        if (initialRoute.view !== 'not-found') {
          const canonicalPath = getPathForView(
            initialRoute.view,
            initialRoute.sectorSlug,
            window.location.hostname,
            initialBasePath
          );
          params.delete('route');
          const remainingQuery = params.toString();
          const nextUrl = `${canonicalPath}${remainingQuery ? `?${remainingQuery}` : ''}${window.location.hash || ''}`;
          window.history.replaceState({ view: initialRoute.view, sectorSlug: initialRoute.sectorSlug }, '', nextUrl);
        }
      }
    } catch (e) {
      console.warn('Initial route cleanup skipped:', e);
    }

    const syncFromUrl = () => {
      const next = resolveRouteFromLocation(
        window.location.pathname,
        window.location.hash,
        window.location.search,
        window.location.hostname
      );
      setCurrentView(next.view);
      setInvalidPath(next.invalidPath);
      if (next.sectorSlug) setSelectedSectorSlug(next.sectorSlug);
    };
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, [initialBasePath, initialRoute.sectorSlug, initialRoute.view]);

  // Trilingual Language State
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('jigsy_language') as Language;
      return stored && ['en', 'hi', 'mai'].includes(stored) ? stored : 'en';
    } catch {
      return 'en';
    }
  });

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('jigsy_language', lang);
    } catch (e) {
      console.error(e);
    }
  };

  // Dark / Light Theme State
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('jigsy_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.setAttribute('data-bs-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.setAttribute('data-bs-theme', 'light');
    }
    try {
      localStorage.setItem('jigsy_theme', isDark ? 'dark' : 'light');
    } catch (e) {
      console.error(e);
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // 15-Second Anti-DoS / Anti-Bot Security Gate State (once per 30-min session; supports ?autostart=1 bypass)
  const [isSecurityGateOpen, setIsSecurityGateOpen] = useState<boolean>(() => {
    try {
      const search = typeof window !== 'undefined' ? window.location.search : '';
      const stored =
        typeof sessionStorage !== 'undefined'
          ? sessionStorage.getItem(SECURITY_GATE_CONFIG.sessionStorageKey)
          : null;
      return shouldShowSecurityGate(search, stored);
    } catch {
      return false;
    }
  });

  // First Visit Onboarding Modal State (skipped for crawlers or when Security Gate already ran)
  const [isFirstVisitModalOpen, setIsFirstVisitModalOpen] = useState<boolean>(() => {
    try {
      const params = new URLSearchParams(window.location.search || '');
      if (params.get('autostart') === '1') return false;
      if (typeof navigator !== 'undefined' && isSearchEngineCrawler(navigator.userAgent)) return false;
      const storedGate = sessionStorage.getItem(SECURITY_GATE_CONFIG.sessionStorageKey);
      if (shouldShowSecurityGate(window.location.search || '', storedGate)) return false;
      return !localStorage.getItem('jigsy_visited');
    } catch {
      return false;
    }
  });

  // Dynamic Per-Route SEO Title, Description, Canonical, Robots & BreadcrumbList JSON-LD
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : undefined;
    const meta = getSeoMetadataForView(currentView, selectedSectorSlug, language, origin);
    applySeoMetadataToDocument(meta);
  }, [currentView, selectedSectorSlug, language]);

  const handleCloseFirstVisitModal = () => {
    setIsFirstVisitModalOpen(false);
    try {
      localStorage.setItem('jigsy_visited', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const handleSecurityGateVerified = () => {
    setIsSecurityGateOpen(false);
    setIsFirstVisitModalOpen(false);
  };

  // Admin Desk State
  const [isAdminDeskOpen, setIsAdminDeskOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Legal Modals State
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms'>('privacy');

  const handleOpenLegal = (tab: 'privacy' | 'terms') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  // Navigation Handler
  const handleNavigate = (view: string, sectorSlug?: string) => {
    setCurrentView(view);
    setInvalidPath(undefined);
    if (sectorSlug) setSelectedSectorSlug(sectorSlug);
    try {
      const basePath = getRepoBasePath(window.location.pathname, window.location.hostname);
      const nextPath = getPathForView(view, sectorSlug, window.location.hostname, basePath);
      if (window.location.pathname !== nextPath || window.location.search || window.location.hash) {
        window.history.pushState({ view, sectorSlug }, '', nextPath);
      }
    } catch (e) {
      console.warn('History update skipped:', e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Opens the Contact Modal IN-PLACE without redirecting or distorting exploration!
  const handleOpenContactModal = (opts?: ContactRequestPrefill) => {
    setContactModalPrefill(opts || {});
    setIsContactModalOpen(true);
  };

  const handleRequestService = (
    sectorSlug?: string,
    serviceName?: string,
    engagementType?: string
  ) => {
    handleOpenContactModal({ sectorSlug, serviceName, engagementType });
  };

  const homeCopy = UI_COPY[language].home;

  const visibleHomeSectors =
    homeSectorFilter === 'all'
      ? SECTORS
      : SECTORS.filter((s) => s.slug === homeSectorFilter);

  const allFlagshipWorks = SECTORS.flatMap((sec) =>
    sec.featuredProjects.map((proj, idx) => ({
      id: `${sec.slug}-work-${idx}`,
      sectorSlug: sec.slug,
      sectorName: sec.name,
      accent: sec.colorScheme.accent,
      serviceDefault: sec.services[0]?.title.en,
      title: proj.title[language] || proj.title.en,
      shortDescription: proj.shortDescription[language] || proj.shortDescription.en,
      details: proj.details[language] || proj.details.en,
      status: proj.status,
    }))
  );

  const visibleWorks =
    worksFilter === 'all'
      ? allFlagshipWorks
      : allFlagshipWorks.filter((w) => w.sectorSlug === worksFilter);

  if (isSecurityGateOpen) {
    return (
      <SecurityGate
        language={language}
        onLanguageChange={handleLanguageChange}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onVerified={handleSecurityGateVerified}
      />
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200 jigsy-ambient-bg">
      {/* Interactive Cursor-Reactive & Constellation Ambient Background */}
      <InteractiveBackground isDark={isDark} />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 1. Global Sticky Corporate Navbar */}
        <Navbar
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenContactModal={handleOpenContactModal}
          language={language}
          onLanguageChange={handleLanguageChange}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onOpenAdminLogin={() => setIsAdminDeskOpen(true)}
          isAdminLoggedIn={isAdminLoggedIn}
        />

        {/* 2. Main Content Router Protected by ErrorBoundary */}
        <main className="flex-1">
          <AppErrorBoundary
            language={language}
            onNavigate={handleNavigate}
            onOpenContactModal={handleOpenContactModal}
          >
            {currentView === 'home' && (
              <div className="space-y-16 pb-6">
                {/* Corporate Multi-Sector Hero */}
                <Hero
                  language={language}
                  onNavigate={handleNavigate}
                  onRequestService={handleRequestService}
                />

                {/* ================================================================= */}
                {/* SECTION 1: ALL 6 SECTORS & GENERIC SERVICES PORTFOLIO             */}
                {/* ================================================================= */}
                <section
                  data-testid="home-sectors-section"
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7"
                >
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
                    <div className="space-y-2 max-w-2xl">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800/70">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{homeCopy.sectorsBadge}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black brand-font text-slate-900 dark:text-white">
                        {homeCopy.sectorsTitle}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {homeCopy.sectorsSubtitle}
                      </p>
                    </div>

                    {/* Interactive Sector Filter Buttons (Sector Names strictly English) */}
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => setHomeSectorFilter('all')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          homeSectorFilter === 'all'
                            ? 'bg-blue-600 text-white shadow'
                            : 'bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400'
                        }`}
                      >
                        {homeCopy.allSectorsFilter}
                      </button>
                      {SECTORS.map((sec) => (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => setHomeSectorFilter(sec.slug)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            homeSectorFilter === sec.slug
                              ? 'bg-blue-600 text-white shadow'
                              : 'bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400'
                          }`}
                        >
                          {sec.name.replace('JIGSY ', '')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 6-Sector Interactive Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {visibleHomeSectors.map((sector) => {
                      const IconComp = SECTOR_ICON_MAP[sector.iconName] || Code;
                      const topWork = sector.featuredProjects[0];
                      return (
                        <article
                          key={sector.id}
                          className="group rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl jigsy-border-card flex flex-col justify-between overflow-hidden"
                        >
                          <div className="p-5 sm:p-6 space-y-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0"
                                  style={{ backgroundColor: sector.colorScheme.accent }}
                                >
                                  <IconComp className="w-5 h-5" />
                                </div>
                                <div>
                                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 block">
                                    {sector.code}
                                  </span>
                                  <h3 className="font-black text-lg brand-font text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                                    {sector.name}
                                  </h3>
                                </div>
                              </div>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${sector.colorScheme.badge}`}
                              >
                                {sector.services.length}{' '}
                                {sector.services.length === 1 ? homeCopy.serviceUnit : homeCopy.servicesUnit}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                              {sector.shortDescription[language] || sector.shortDescription.en}
                            </p>

                            {/* Generic Services Offered (STRICTLY ENGLISH TITLES across all languages!) */}
                            <div className="space-y-2 pt-1">
                              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {homeCopy.servicesOffered}
                              </div>
                              <ul className="space-y-1.5">
                                {sector.services.map((srv, i) => (
                                  <li
                                    key={i}
                                    className="text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                    <span className="font-semibold">{srv.title.en}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Hover-Highlighted Featured Work */}
                            {topWork && (
                              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 group-hover:bg-blue-50/90 dark:group-hover:bg-blue-950/40 group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-colors space-y-1">
                                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider gap-2">
                                  <span className="text-blue-700 dark:text-amber-400">{homeCopy.featuredWork}</span>
                                  <span className="text-emerald-700 dark:text-emerald-400">{topWork.status}</span>
                                </div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">
                                  {topWork.title[language] || topWork.title.en}
                                </div>
                                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">
                                  {topWork.shortDescription[language] || topWork.shortDescription.en}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Card Footer CTAs */}
                          <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                            <button
                              type="button"
                              onClick={() => handleNavigate('sector-detail', sector.slug)}
                              className="font-bold text-slate-800 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 flex items-center gap-1 cursor-pointer"
                            >
                              <span>{homeCopy.exploreDivision}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>

                            {sector.slug === 'youth' ? (
                              <a
                                href={COMPANY_DETAILS.youthPortalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold flex items-center gap-1 transition-colors"
                              >
                                <span>youth.jigsy.in</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  handleRequestService(
                                    sector.slug,
                                    sector.services[0]?.title.en,
                                    'Project Proposal & Development'
                                  )
                                }
                                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Send className="w-3 h-3" />
                                <span>{homeCopy.requestService}</span>
                              </button>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>

                {/* ================================================================= */}
                {/* NEW SECTION 2: WHY PARTNER WITH JIGSY INDIA (4 EXECUTION PILLARS) */}
                {/* ================================================================= */}
                <section
                  data-testid="home-pillars-section"
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7"
                >
                  <div className="text-center max-w-3xl mx-auto space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800/70">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{homeCopy.pillarsBadge}</span>
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black brand-font text-slate-900 dark:text-white">
                      {homeCopy.pillarsTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {homeCopy.pillarsSubtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
                    {homeCopy.pillars.map((pillar, idx) => {
                      const PIcon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
                      return (
                        <div
                          key={idx}
                          className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm jigsy-border-card flex flex-col justify-between space-y-4"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/70 flex items-center justify-center text-blue-700 dark:text-blue-400">
                                <PIcon className="w-5 h-5" />
                              </div>
                              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-300">
                                {pillar.metric}
                              </span>
                            </div>
                            <h3 className="text-base font-extrabold brand-font text-slate-900 dark:text-white">
                              {pillar.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                              {pillar.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* ================================================================= */}
                {/* NEW SECTION 3: FLAGSHIP WORKS & SOLUTIONS PORTFOLIO               */}
                {/* ================================================================= */}
                <section
                  data-testid="home-works-section"
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7"
                >
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
                    <div className="space-y-2 max-w-2xl">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800/70">
                        <Layers className="w-3.5 h-3.5" />
                        <span>{homeCopy.worksBadge}</span>
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black brand-font text-slate-900 dark:text-white">
                        {homeCopy.worksTitle}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {homeCopy.worksSubtitle}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => setWorksFilter('all')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          worksFilter === 'all'
                            ? 'bg-blue-600 text-white shadow'
                            : 'bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400'
                        }`}
                      >
                        {homeCopy.worksAll}
                      </button>
                      {SECTORS.map((sec) => (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => setWorksFilter(sec.slug)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            worksFilter === sec.slug
                              ? 'bg-blue-600 text-white shadow'
                              : 'bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400'
                          }`}
                        >
                          {sec.name.replace('JIGSY ', '')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {visibleWorks.slice(0, 6).map((work) => (
                      <article
                        key={work.id}
                        className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl jigsy-border-card flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2 text-[11px] font-bold">
                            <span
                              className="px-2.5 py-0.5 rounded-md text-white"
                              style={{ backgroundColor: work.accent }}
                            >
                              {work.sectorName}
                            </span>
                            <span className="text-emerald-700 dark:text-emerald-400">{work.status}</span>
                          </div>
                          <h3 className="text-base font-extrabold brand-font text-slate-900 dark:text-white">
                            {work.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {work.shortDescription}
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {work.details.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => handleNavigate('sector-detail', work.sectorSlug)}
                            className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer"
                          >
                            {homeCopy.exploreDivision} →
                          </button>

                          {work.sectorSlug === 'youth' ? (
                            <a
                              href={COMPANY_DETAILS.youthPortalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
                            >
                              <span>{homeCopy.worksVisit}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                handleOpenContactModal({
                                  sectorSlug: work.sectorSlug,
                                  serviceName: work.serviceDefault,
                                  engagementType: 'Project Proposal & Development',
                                  subject: `Inquiry: ${work.title}`,
                                })
                              }
                              className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>{homeCopy.worksInquire}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                {/* ================================================================= */}
                {/* NEW SECTION 4: HOW TO ENGAGE & COLLABORATE (CLIENTS & PROS)       */}
                {/* ================================================================= */}
                <section
                  data-testid="home-collab-section"
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7"
                >
                  <div className="text-center max-w-3xl mx-auto space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800/70">
                      <Handshake className="w-3.5 h-3.5" />
                      <span>{homeCopy.collabBadge}</span>
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black brand-font text-slate-900 dark:text-white">
                      {homeCopy.collabTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {homeCopy.collabSubtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {/* Column A: Clients & Institutional Partners */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-md jigsy-border-card flex flex-col justify-between space-y-6">
                      <div className="space-y-5">
                        <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                              <Building2 className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                                {homeCopy.forClientsBadge}
                              </span>
                              <h3 className="text-lg font-extrabold brand-font text-slate-900 dark:text-white">
                                {homeCopy.forClientsTitle}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <ol className="space-y-3.5">
                          {homeCopy.forClientsSteps.map((st, idx) => (
                            <li key={idx} className="space-y-0.5">
                              <div className="text-sm font-bold text-slate-900 dark:text-white">{st.title}</div>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{st.desc}</p>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRequestService('tech', undefined, 'Project Proposal & Development')}
                        className="w-full py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>{homeCopy.forClientsCta}</span>
                      </button>
                    </div>

                    {/* Column B: Professionals & Jobseekers */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-md jigsy-border-card flex flex-col justify-between space-y-6">
                      <div className="space-y-5">
                        <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                              <Briefcase className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                                {homeCopy.forProfessionalsBadge}
                              </span>
                              <h3 className="text-lg font-extrabold brand-font text-slate-900 dark:text-white">
                                {homeCopy.forProfessionalsTitle}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <ol className="space-y-3.5">
                          {homeCopy.forProfessionalsSteps.map((st, idx) => (
                            <li key={idx} className="space-y-0.5">
                              <div className="text-sm font-bold text-slate-900 dark:text-white">{st.title}</div>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{st.desc}</p>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleNavigate('careers')}
                        className="w-full py-3 px-5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                      >
                        <Briefcase className="w-4 h-4" />
                        <span>{homeCopy.forProfessionalsCta}</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => handleNavigate('how-to-engage')}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      <span>{homeCopy.fullRoadmapLink}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </section>

                {/* ================================================================= */}
                {/* SECTION 5: LEADERSHIP, FOUNDER & CAREERS QUICK DIRECTORY          */}
                {/* ================================================================= */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                  <div className="text-center max-w-2xl mx-auto space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                      {homeCopy.leadershipEyebrow}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black brand-font text-slate-900 dark:text-white">
                      {homeCopy.leadershipTitle}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
                    <button
                      type="button"
                      onClick={() => handleNavigate('about-company')}
                      className="text-left p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm jigsy-border-card cursor-pointer flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2.5">
                        <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        <h3 className="font-extrabold text-base brand-font text-slate-900 dark:text-white">
                          {homeCopy.aboutCompanyTitle}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {homeCopy.aboutCompanyDesc}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 dark:text-blue-400">
                        {homeCopy.aboutCompanyCta} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigate('about-founder')}
                      className="text-left p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm jigsy-border-card cursor-pointer flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2.5">
                          <CrispImage
                            src={FOUNDER_PORTRAITS.headshot}
                            sizes="36px"
                            targetWidth={160}
                            alt="Mr. Jigyasu Vatsa"
                            className="w-9 h-9 rounded-full object-cover object-[38%_18%] border-2 border-amber-400 shadow-sm shrink-0"
                          />
                          <Lightbulb className="w-5 h-5 text-amber-500" />
                        </div>
                        <h3 className="font-extrabold text-base brand-font text-slate-900 dark:text-white">
                          {homeCopy.founderTitle}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {homeCopy.founderDesc}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400">
                        {homeCopy.founderCta} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigate('about-directors')}
                      className="text-left p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm jigsy-border-card cursor-pointer flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center -space-x-2">
                          {DIRECTORS.map((d, dIdx) => (
                            <CrispImage
                              key={d.name}
                              src={d.imageUrl}
                              sizes="36px"
                              targetWidth={160}
                              alt={d.name}
                              className={`w-9 h-9 rounded-full object-cover border-2 border-white dark:border-slate-900 ${
                                dIdx === 1 ? 'object-[38%_18%]' : 'object-top'
                              }`}
                            />
                          ))}
                        </div>
                        <h3 className="font-extrabold text-base brand-font text-slate-900 dark:text-white">
                          {homeCopy.directorsTitle}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {homeCopy.directorsDesc}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 dark:text-blue-400">
                        {homeCopy.directorsCta} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigate('careers')}
                      className="text-left p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm jigsy-border-card cursor-pointer flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2.5">
                        <Briefcase className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        <h3 className="font-extrabold text-base brand-font text-slate-900 dark:text-white">
                          {homeCopy.careersTitle}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {homeCopy.careersDesc}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        {homeCopy.careersCta} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </div>
                </section>

                {/* ================================================================= */}
                {/* SECTION 6: COMPACT JIGSY YOUTH SPOTLIGHT (youth.jigsy.in)         */}
                {/* ================================================================= */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white shadow-xl border border-blue-800/60 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl text-center md:text-left">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider border border-amber-400/40">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>{homeCopy.youthBadge}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold brand-font">{homeCopy.youthTitle}</h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{homeCopy.youthDesc}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                      <a
                        href={COMPANY_DETAILS.youthPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl text-xs sm:text-sm shadow-lg transition-colors flex items-center gap-2"
                      >
                        <span>{homeCopy.youthCta}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenContactModal({
                            sectorSlug: 'edutech',
                            serviceName: 'In-Campus Incubation Centers',
                            engagementType: 'Institutional MoU & Academic Tie-Up',
                            subject: 'Institutional Campus MoU Inquiry',
                          })
                        }
                        className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs sm:text-sm border border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Handshake className="w-4 h-4" />
                        <span>{homeCopy.campusMouCta}</span>
                      </button>
                    </div>
                  </div>
                </section>

                {/* ================================================================= */}
                {/* SECTION 7: ALIGNED COMMUNITY FEEDBACK SECTION                     */}
                {/* ================================================================= */}
                <FeedbackSection language={language} />
              </div>
            )}

            {/* Sectors Overview & Detail View */}
            {(currentView === 'sectors' || currentView === 'sector-detail') && (
              <SectorsView
                language={language}
                selectedSectorSlug={selectedSectorSlug}
                onNavigate={handleNavigate}
                onRequestService={handleRequestService}
              />
            )}

            {/* Dedicated About Company Page */}
            {(currentView === 'about' || currentView === 'about-company') && (
              <AboutView
                language={language}
                onNavigate={handleNavigate}
                onRequestService={handleRequestService}
              />
            )}

            {/* Dedicated Founder Page (Mr. Jigyasu Vatsa + jigyasu.jigsy.in) */}
            {currentView === 'about-founder' && (
              <FounderView
                language={language}
                onNavigate={handleNavigate}
                onRequestService={handleRequestService}
              />
            )}

            {/* Dedicated Board of Directors Page (Both Directors) */}
            {currentView === 'about-directors' && (
              <DirectorsView
                language={language}
                onNavigate={handleNavigate}
                onRequestService={handleRequestService}
              />
            )}

            {/* Dedicated Interactive How to Engage Page */}
            {(currentView === 'how-to-engage' || currentView === 'how-to-join') && (
              <HowToEngageView
                language={language}
                onNavigate={handleNavigate}
                onRequestService={handleRequestService}
              />
            )}

            {/* JIGSY Youth Secondary Route (for direct /internships or internship.jigsy.in visits) */}
            {currentView === 'youth-portal' && (
              <YouthInternshipPortal
                language={language}
                onOpenLegalModal={handleOpenLegal}
              />
            )}

            {/* Careers & Talent Pool Desk ("No Current Openings Right Now") */}
            {currentView === 'careers' && (
              <CareersView
                language={language}
                onNavigateToYouth={() => handleNavigate('youth-portal')}
              />
            )}

            {/* Dedicated /contact View (Contact Form Prominently at the TOP) */}
            {currentView === 'contact' && (
              <ContactPageView language={language} prefill={contactModalPrefill} />
            )}

            {/* Disabled Employee Verification Interactive Notice */}
            {currentView === 'verification' && (
              <ErrorDialogueView
                kind="verification"
                invalidPath="/verification"
                language={language}
                onNavigate={handleNavigate}
                onOpenContactModal={handleOpenContactModal}
              />
            )}

            {/* Interactive 404 / Missing PDF / GitHub Link Recovery Dialogue */}
            {currentView === 'not-found' && (
              <ErrorDialogueView
                kind="not-found"
                invalidPath={invalidPath}
                language={language}
                onNavigate={handleNavigate}
                onOpenContactModal={handleOpenContactModal}
              />
            )}
          </AppErrorBoundary>
        </main>

        {/* 3. Global Corporate Footer (No Total Visitors, Perfectly Aligned 4 Columns) */}
        <Footer
          language={language}
          onNavigate={handleNavigate}
          onOpenLegal={handleOpenLegal}
          onOpenCookieNotice={() =>
            setStatusModalState({ isOpen: true, kind: 'cookie' })
          }
          onOpenAdminLogin={() => setIsAdminDeskOpen(true)}
        />
      </div>

      {/* 4. In-Place Corporate Contact & Service Request Modal */}
      <ContactRequestModal
        isOpen={isContactModalOpen}
        language={language}
        prefill={contactModalPrefill}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* 5. Interactive Cookie / Unavailable Resource Modal */}
      <InteractiveStatusModal
        isOpen={statusModalState.isOpen}
        kind={statusModalState.kind}
        resourceLabel={statusModalState.resourceLabel}
        language={language}
        onClose={() => setStatusModalState((prev) => ({ ...prev, isOpen: false }))}
        onOpenContactModal={handleOpenContactModal}
      />

      {/* 6. Admin Management Desk Modal */}
      <AdminDesk
        isOpen={isAdminDeskOpen}
        onClose={() => setIsAdminDeskOpen(false)}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminLoginStateChange={setIsAdminLoggedIn}
      />

      {/* 7. Corporate Legal Terms & Privacy Policy Modal */}
      <LegalModals
        isOpen={isLegalModalOpen}
        initialTab={legalModalTab}
        language={language}
        onClose={() => setIsLegalModalOpen(false)}
        onAcceptConsent={() => {
          try {
            localStorage.setItem('jigsy_policy_accepted', 'true');
          } catch (e) {
            console.error(e);
          }
        }}
        onOpenContactModal={handleOpenContactModal}
        onOpenCookieNotice={() =>
          setStatusModalState({ isOpen: true, kind: 'cookie' })
        }
      />

      {/* 8. First-Visit Welcome & Preference Modal */}
      <FirstVisitModal
        isOpen={isFirstVisitModalOpen}
        onClose={handleCloseFirstVisitModal}
        language={language}
        onLanguageChange={handleLanguageChange}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* 9. JIGSY Interactive Voice Assistant & Chatbot (Bottom-Left) */}
      <JigsyAIAssistant
        onNavigate={handleNavigate}
        onPrefillContact={handleRequestService}
      />

      {/* 10. Floating Brand Scroll-to-Top Control (Bottom-Right) */}
      <ScrollToTopButton />
    </div>
  );
}

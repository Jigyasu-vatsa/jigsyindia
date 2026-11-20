import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Play,
  Send,
  Handshake,
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { resolveAssetUrl } from '../utils/portalHelpers';
import { UI_COPY } from '../utils/uiCopy';
import { CrispImage } from './CrispImage';

interface HeroProps {
  language: Language;
  onNavigate: (view: string, sectorSlug?: string) => void;
  onRequestService: (sectorSlug?: string, serviceName?: string, engagementType?: string) => void;
}

const SLIDE_IMAGES = [
  resolveAssetUrl('/assets/aistudio/image_252646dc.png'),
  resolveAssetUrl('/assets/aistudio/image_35628884.png'),
  resolveAssetUrl('/assets/aistudio/image_2ede27f5.png'),
];

export const Hero: React.FC<HeroProps> = ({ language, onNavigate, onRequestService }) => {
  const hero = UI_COPY[language].hero;
  const [ribbonIndex, setRibbonIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRibbonIndex((prev) => (prev + 1) % hero.ribbons.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [hero.ribbons.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % hero.slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [hero.slides.length]);

  const activeSlide = hero.slides[currentSlide] || hero.slides[0];

  return (
    <section className="relative overflow-hidden pt-5 pb-12 md:pt-7 md:pb-16 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Corporate Ribbon Banner */}
        <div className="w-full bg-gradient-to-r from-blue-800 via-indigo-800 to-slate-900 text-white rounded-xl py-2.5 px-4 shadow-md text-center border border-blue-500/30">
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-semibold tracking-wide min-h-[24px]">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="transition-all duration-300 font-medium">
              {hero.ribbons[ribbonIndex % hero.ribbons.length]}
            </span>
          </div>
        </div>

        {/* 2-Column Corporate Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pt-1">
          {/* Left Column: Corporate Positioning & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800/70">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{hero.badge} · CIN: {COMPANY_DETAILS.cin}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] brand-font">
              {hero.titleLine1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-600 dark:from-blue-400 dark:via-cyan-300 dark:to-amber-400">
                {hero.titleLine2}
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {hero.description}
            </p>

            {/* Corporate Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                type="button"
                data-testid="hero-request-service-btn"
                onClick={() => onRequestService('tech', undefined, 'Project Proposal & Development')}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('sectors')}
                className="w-full sm:w-auto px-5 py-3.5 text-sm font-bold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                {hero.ctaSecondary}
              </button>

              <button
                type="button"
                onClick={() => onNavigate('how-to-engage')}
                className="w-full sm:w-auto px-4 py-3.5 text-sm font-bold text-blue-700 dark:text-amber-300 hover:underline flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Handshake className="w-4 h-4" />
                <span>{hero.ctaTertiary}</span>
              </button>
            </div>

            {/* Corporate Enterprise Credentials Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800/80">
              <div className="p-3.5 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm jigsy-border-card text-left">
                <div className="text-base sm:text-lg font-black text-blue-700 dark:text-blue-400 font-mono">
                  {hero.stat1Val}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight mt-0.5">
                  {hero.stat1Lbl}
                </div>
              </div>

              <div className="p-3.5 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm jigsy-border-card text-left">
                <div className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-400 font-mono">
                  {hero.stat2Val}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight mt-0.5">
                  {hero.stat2Lbl}
                </div>
              </div>

              <div className="p-3.5 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm jigsy-border-card text-left">
                <div className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-400 font-mono">
                  {hero.stat3Val}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight mt-0.5">
                  {hero.stat3Lbl}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Works Showcase Carousel */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl relative group jigsy-border-card">
              <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden">
                <CrispImage
                  src={SLIDE_IMAGES[currentSlide % SLIDE_IMAGES.length]}
                  sizes="(max-width: 768px) 92vw, 448px"
                  targetWidth={840}
                  loading="eager"
                  alt={activeSlide.title}
                  className="w-full h-full object-contain bg-slate-900 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 bg-blue-600/95 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
                  {activeSlide.tag}
                </div>

                {/* Prev / Next Controls */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                  <button
                    type="button"
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + hero.slides.length) % hero.slides.length)}
                    className="p-1.5 rounded-full bg-slate-900/80 border border-white/15 backdrop-blur-sm text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    aria-label="Previous highlight slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % hero.slides.length)}
                    className="p-1.5 rounded-full bg-slate-900/80 border border-white/15 backdrop-blur-sm text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    aria-label="Next highlight slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h2 className="font-bold text-sm md:text-base leading-tight">{activeSlide.title}</h2>
                  <p className="text-xs text-slate-200 line-clamp-2 mt-0.5">{activeSlide.subtitle}</p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => onNavigate('sector-detail', activeSlide.slug)}
                  className="font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>
                    {hero.exploreSlidePrefix} {activeSlide.tag} →
                  </span>
                </button>
                <div className="flex gap-1.5">
                  {hero.slides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentSlide === idx ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300 dark:bg-slate-600'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

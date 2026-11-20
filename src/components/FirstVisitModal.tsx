import React, { useEffect } from 'react';
import { Sun, Moon, Globe, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { CrispImage } from './CrispImage';

interface FirstVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const WELCOME_COPY: Record<
  Language,
  {
    badge: string;
    hubLabel: string;
    intro: string;
    languageLabel: string;
    themeLabel: string;
    lightMode: string;
    darkMode: string;
    enterCta: string;
    footerNote: string;
  }
> = {
  en: {
    badge: 'Welcome to JIGSY INDIA',
    hubLabel: 'Verified Corporate Portal',
    intro:
      'Security check complete. Personalize your preferred language and display theme before exploring our six corporate divisions.',
    languageLabel: 'Choose Your Preferred Language / भाषा चुनें',
    themeLabel: 'Display Appearance / थीम मोड',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    enterCta: 'Explore JIGSY INDIA Portal',
    footerNote: 'You can switch language or theme anytime from the top navigation bar.',
  },
  hi: {
    badge: 'JIGSY INDIA में आपका स्वागत है',
    hubLabel: 'सत्यापित कॉर्पोरेट पोर्टल',
    intro:
      'सुरक्षा जांच पूर्ण हो गई है। हमारे छह कॉर्पोरेट प्रभागों का अन्वेषण करने से पहले अपनी पसंदीदा भाषा और डिस्प्ले थीम चुनें।',
    languageLabel: 'अपनी पसंदीदा भाषा चुनें',
    themeLabel: 'डिस्प्ले थीम मोड',
    lightMode: 'लाइट मोड',
    darkMode: 'डार्क मोड',
    enterCta: 'JIGSY INDIA पोर्टल में प्रवेश करें',
    footerNote: 'आप शीर्ष नेविगेशन बार से कभी भी भाषा और थीम बदल सकते हैं।',
  },
  mai: {
    badge: 'JIGSY INDIA में अहाँक स्वागत अछि',
    hubLabel: 'सत्यापित कॉर्पोरेट पोर्टल',
    intro:
      'सुरक्षा जांच पूर्ण भऽ गेल अछि। हमर छओ कॉर्पोरेट प्रभाग देखबा सँ पहिने अपन पसंदीदा भाषा आ डिस्प्ले थीम चुनू।',
    languageLabel: 'अपन पसंदीदा भाषा चुनू',
    themeLabel: 'डिस्प्ले थीम मोड',
    lightMode: 'लाइट मोड',
    darkMode: 'डार्क मोड',
    enterCta: 'JIGSY INDIA पोर्टल में प्रवेश करू',
    footerNote: 'अहाँ ऊपर नेविगेशन बार सँ कहियो भी भाषा आ थीम बदलि सकैत छी।',
  },
};

export const FirstVisitModal: React.FC<FirstVisitModalProps> = ({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  isDark,
  onToggleTheme,
}) => {
  const copy = WELCOME_COPY[language];

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      data-testid="first-visit-modal"
      role="dialog"
      aria-modal="true"
      aria-label={copy.badge}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn"
    >
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-5 text-slate-900 dark:text-slate-100 relative">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-amber-400 p-0.5 bg-white shrink-0 shadow-sm">
            <CrispImage
              src={COMPANY_DETAILS.logoUrl}
              sizes="52px"
              targetWidth={144}
              loading="eager"
              alt="JIGSY INDIA Crest"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
                {copy.badge}
              </span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{copy.hubLabel}</span>
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold brand-font text-slate-900 dark:text-white leading-tight mt-1">
              {COMPANY_DETAILS.name}
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {copy.intro}
        </p>

        {/* Language Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{copy.languageLabel}</span>
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { code: 'en' as Language, label: 'English', sub: 'Global' },
              { code: 'hi' as Language, label: 'हिंदी', sub: 'राजभाषा' },
              { code: 'mai' as Language, label: 'मैथिली', sub: 'मिथिलांचल' },
            ].map((item) => (
              <button
                key={item.code}
                type="button"
                data-testid={`welcome-lang-${item.code}`}
                onClick={() => onLanguageChange(item.code)}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  language === item.code
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 shadow-sm ring-1 ring-blue-500'
                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="text-sm font-bold">{item.label}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Theme Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{copy.themeLabel}</span>
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              data-testid="welcome-theme-light"
              onClick={() => {
                if (isDark) onToggleTheme();
              }}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs sm:text-sm transition-all cursor-pointer ${
                !isDark
                  ? 'border-blue-600 bg-blue-50 text-blue-800 font-bold shadow-sm ring-1 ring-blue-500'
                  : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>{copy.lightMode}</span>
            </button>
            <button
              type="button"
              data-testid="welcome-theme-dark"
              onClick={() => {
                if (!isDark) onToggleTheme();
              }}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs sm:text-sm transition-all cursor-pointer ${
                isDark
                  ? 'border-blue-500 bg-slate-800 text-amber-300 font-bold shadow-sm ring-1 ring-blue-400'
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 hover:text-slate-900 hover:border-slate-400'
              }`}
            >
              <Moon className="w-4 h-4 text-amber-400" />
              <span>{copy.darkMode}</span>
            </button>
          </div>
        </div>

        {/* Confirmation Button */}
        <button
          type="button"
          data-testid="welcome-enter-btn"
          onClick={onClose}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{copy.enterCta}</span>
        </button>

        <div className="text-[11px] text-center text-slate-500 dark:text-slate-400">
          CIN: {COMPANY_DETAILS.cin} · {copy.footerNote}
        </div>
      </div>
    </div>
  );
};

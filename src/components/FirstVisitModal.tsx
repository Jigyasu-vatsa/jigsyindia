import React from 'react';
import { Sun, Moon, Globe, Sparkles, CheckCircle2 } from 'lucide-react';
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

export const FirstVisitModal: React.FC<FirstVisitModalProps> = ({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  isDark,
  onToggleTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 text-slate-900 dark:text-slate-100 relative">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 p-0.5 bg-white shrink-0">
            <CrispImage
              src={COMPANY_DETAILS.logoUrl}
              sizes="48px"
              targetWidth={96}
              loading="eager"
              alt="JIGSY INDIA Crest"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                Welcome to JIGSY INDIA
              </span>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Live Multi-Sector Hub
              </span>
            </div>
            <h2 className="text-lg font-bold brand-font text-slate-900 dark:text-slate-100 leading-tight mt-0.5">
              Jigyasu Integrated Global Services Pvt Ltd
            </h2>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Welcome to our official corporate portal.
        </p>

        {/* Language Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-500" /> Choose Your Preferred Language / भाषा चुनें
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { code: 'en' as Language, label: 'English', sub: 'Global' },
              { code: 'hi' as Language, label: 'हिंदी', sub: 'राजभाषा' },
              { code: 'mai' as Language, label: 'मैथिली', sub: 'मिथिलांचल' },
            ].map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => onLanguageChange(item.code)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  language === item.code
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 shadow-sm ring-1 ring-blue-500'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
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
            {isDark ? <Moon className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
            Color Mode / थीम शैली
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => { if (isDark) onToggleTheme(); }}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                !isDark
                  ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" /> ☀️ Light Mode
            </button>
            <button
              type="button"
              onClick={() => { if (!isDark) onToggleTheme(); }}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                isDark
                  ? 'border-blue-500 bg-slate-800 text-amber-300 font-semibold shadow-sm ring-1 ring-blue-400'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Moon className="w-4 h-4 text-amber-400" /> 🌙 Dark Mode
            </button>
          </div>
        </div>

        {/* Confirmation Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
        >
          <CheckCircle2 className="w-4 h-4" />
          {language === 'mai' ? 'वेबसाइट में प्रवेश करू' : language === 'hi' ? 'वेबसाइट में प्रवेश करें' : 'Explore JIGSY INDIA Portal'}
        </button>

        <div className="text-[11px] text-center text-slate-500 dark:text-slate-400">
          CIN: U62099BR2025PTC078592 · You can change language and theme anytime from the top bar.
        </div>
      </div>
    </div>
  );
};

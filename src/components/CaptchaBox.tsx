import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Language } from '../types';
import { generateCaptcha, CaptchaChallenge } from '../utils/captcha';
import { UI_COPY } from '../utils/uiCopy';

interface CaptchaBoxProps {
  value: string;
  onChange: (value: string) => void;
  expectedCodeRef?: (code: string) => void;
  onRefresh?: () => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
  language?: Language;
}

export const CaptchaBox: React.FC<CaptchaBoxProps> = ({
  value,
  onChange,
  expectedCodeRef,
  onRefresh,
  className = '',
  placeholder,
  required = true,
  language = 'en',
}) => {
  const [challenge, setChallenge] = useState<CaptchaChallenge>(generateCaptcha);
  const copy = UI_COPY[language].captcha;

  const refresh = () => {
    const next = generateCaptcha();
    setChallenge(next);
    if (expectedCodeRef) expectedCodeRef(next.code);
    if (onRefresh) onRefresh();
    onChange('');
  };

  useEffect(() => {
    if (expectedCodeRef) expectedCodeRef(challenge.code);
  }, [challenge, expectedCodeRef]);

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
        {copy.label} <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
        <div
          className="px-3.5 py-2 bg-amber-300 border border-amber-500/80 select-none rounded-lg text-slate-950 font-mono text-base font-extrabold tracking-widest line-through shadow-inner flex items-center justify-center min-w-[124px]"
          title={copy.label}
        >
          {challenge.displayText}
        </div>
        <button
          type="button"
          onClick={refresh}
          className="p-2.5 text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors cursor-pointer"
          title={copy.refreshTitle}
          aria-label={copy.refreshTitle}
        >
          <RefreshCw className="w-4 h-4" />
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || copy.placeholder}
          required={required}
          maxLength={6}
          className="flex-1 min-w-[140px] px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none uppercase font-mono tracking-wider"
        />
      </div>
      <p className="text-[11px] text-slate-600 dark:text-slate-400">
        {copy.helper}
      </p>
    </div>
  );
};

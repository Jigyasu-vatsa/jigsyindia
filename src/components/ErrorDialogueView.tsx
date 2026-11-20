import React, { useState, useEffect } from 'react';
import {
  Compass,
  FileWarning,
  ShieldOff,
  AlertTriangle,
  Cookie,
  Home,
  Layers,
  Mail,
  Sparkles,
  RefreshCw,
  X,
  ArrowRight,
} from 'lucide-react';
import { Language } from '../types';
import { UI_COPY } from '../utils/uiCopy';

export type ErrorDialogueKind = 'not-found' | 'pdf' | 'verification' | 'runtime';

interface ErrorDialogueViewProps {
  kind: ErrorDialogueKind;
  invalidPath?: string;
  language: Language;
  onNavigate: (view: string, sectorSlug?: string) => void;
  onOpenContactModal: (opts?: { sectorSlug?: string; engagementType?: string; subject?: string }) => void;
  onRetry?: () => void;
}

export function detectResourceKind(kind: ErrorDialogueKind, invalidPath?: string): ErrorDialogueKind {
  if (kind !== 'not-found' || !invalidPath) return kind;
  const lower = invalidPath.toLowerCase();
  if (
    /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar|csv|txt)$/i.test(lower) ||
    lower.includes('/docs/') ||
    lower.includes('/files/') ||
    lower.includes('/downloads/') ||
    lower.includes('github') ||
    lower.includes('brochure')
  ) {
    return 'pdf';
  }
  return 'not-found';
}

export const ErrorDialogueView: React.FC<ErrorDialogueViewProps> = ({
  kind,
  invalidPath,
  language,
  onNavigate,
  onOpenContactModal,
  onRetry,
}) => {
  const copy = UI_COPY[language].errors;
  const resolvedKind = detectResourceKind(kind, invalidPath);
  const [factIndex, setFactIndex] = useState(0);

  const cycleFact = () => {
    setFactIndex((prev) => (prev + 1) % copy.facts.length);
  };

  const configMap = {
    'not-found': {
      badge: copy.notFoundBadge,
      title: copy.notFoundTitle,
      desc: copy.notFoundDesc,
      Icon: Compass,
      accentBg: 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/70',
      iconColor: 'text-blue-600 dark:text-blue-400',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 border-blue-200 dark:border-blue-700/60',
      contactSubject: invalidPath ? `Broken or Missing Page Inquiry: ${invalidPath}` : 'Website Navigation Inquiry',
    },
    pdf: {
      badge: copy.pdfBadge,
      title: copy.pdfTitle,
      desc: copy.pdfDesc,
      Icon: FileWarning,
      accentBg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/70',
      iconColor: 'text-amber-600 dark:text-amber-400',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border-amber-200 dark:border-amber-700/60',
      contactSubject: invalidPath ? `Official Document / File Request: ${invalidPath}` : 'Official Document / Brochure Request',
    },
    verification: {
      badge: copy.verificationBadge,
      title: copy.verificationTitle,
      desc: copy.verificationDesc,
      Icon: ShieldOff,
      accentBg: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/70',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700/60',
      contactSubject: 'Official Employee / Credential Verification Inquiry',
    },
    runtime: {
      badge: copy.runtimeBadge,
      title: copy.runtimeTitle,
      desc: copy.runtimeDesc,
      Icon: AlertTriangle,
      accentBg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/70',
      iconColor: 'text-rose-600 dark:text-rose-400',
      badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300 border-rose-200 dark:border-rose-700/60',
      contactSubject: 'Technical Issue Report on jigsy.in',
    },
  };

  const cfg = configMap[resolvedKind];
  const Icon = cfg.Icon;

  return (
    <section
      data-testid="error-dialogue-view"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
    >
      <div className="jigsy-glow-card rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Top Accent Header */}
        <div className={`px-6 sm:px-10 py-8 border-b ${cfg.accentBg}`}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center shrink-0">
              <Icon className={`w-8 h-8 ${cfg.iconColor}`} />
            </div>
            <div className="space-y-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${cfg.badgeColor}`}>
                {cfg.badge}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {cfg.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-6 sm:p-10 space-y-8">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {cfg.desc}
          </p>

          {invalidPath && (
            <div className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">
                {copy.requestedPathLabel}
              </span>
              <code className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-mono text-slate-900 dark:text-amber-300 break-all">
                {invalidPath}
              </code>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {resolvedKind === 'runtime' && onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{copy.reloadBtn}</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>{copy.goHomeBtn}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('sectors')}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{copy.exploreSectorsBtn}</span>
            </button>
            <button
              type="button"
              onClick={() =>
                onOpenContactModal({
                  engagementType: 'General Corporate Inquiry',
                  subject: cfg.contactSubject,
                })
              }
              className="px-5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/70 font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>{copy.contactUsBtn}</span>
            </button>
          </div>

          {/* Interactive Entertaining Quick Fact Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{copy.triviaLabel}</span>
              </div>
              <button
                type="button"
                onClick={cycleFact}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{copy.nextFactBtn}</span>
              </button>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {copy.facts[factIndex]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export interface InteractiveStatusModalProps {
  isOpen: boolean;
  kind: 'cookie' | 'pdf' | 'verification' | 'unavailable';
  resourceLabel?: string;
  language: Language;
  onClose: () => void;
  onOpenContactModal: (opts?: { sectorSlug?: string; engagementType?: string; subject?: string }) => void;
}

export const InteractiveStatusModal: React.FC<InteractiveStatusModalProps> = ({
  isOpen,
  kind,
  resourceLabel,
  language,
  onClose,
  onOpenContactModal,
}) => {
  const copy = UI_COPY[language].errors;
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalConfig = {
    cookie: {
      badge: copy.cookieBadge,
      title: copy.cookieTitle,
      desc: copy.cookieDesc,
      Icon: Cookie,
      iconClass: 'text-amber-600 dark:text-amber-400',
      subject: 'Privacy & Cookie Preferences Inquiry',
    },
    pdf: {
      badge: copy.pdfBadge,
      title: copy.pdfTitle,
      desc: copy.pdfDesc,
      Icon: FileWarning,
      iconClass: 'text-amber-600 dark:text-amber-400',
      subject: resourceLabel ? `Document Request: ${resourceLabel}` : 'Official Document Request',
    },
    verification: {
      badge: copy.verificationBadge,
      title: copy.verificationTitle,
      desc: copy.verificationDesc,
      Icon: ShieldOff,
      iconClass: 'text-indigo-600 dark:text-indigo-400',
      subject: 'Official Employee / Credential Verification Inquiry',
    },
    unavailable: {
      badge: copy.notFoundBadge,
      title: copy.notFoundTitle,
      desc: copy.notFoundDesc,
      Icon: Compass,
      iconClass: 'text-blue-600 dark:text-blue-400',
      subject: resourceLabel ? `Unavailable Link Report: ${resourceLabel}` : 'Website Link Inquiry',
    },
  }[kind];

  const Icon = modalConfig.Icon;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={modalConfig.title}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <Icon className={`w-5 h-5 ${modalConfig.iconClass}`} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                {modalConfig.badge}
              </p>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {modalConfig.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={UI_COPY[language].legal.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {modalConfig.desc}
          </p>

          {resourceLabel && (
            <div className="px-3.5 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-amber-300 break-all">
              {resourceLabel}
            </div>
          )}

          {kind !== 'cookie' && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {copy.triviaLabel}
                </span>
                <button
                  type="button"
                  onClick={() => setFactIndex((p) => (p + 1) % copy.facts.length)}
                  className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {copy.nextFactBtn}
                </button>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {copy.facts[factIndex]}
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              {UI_COPY[language].legal.closeBtn}
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenContactModal({
                  engagementType: 'General Corporate Inquiry',
                  subject: modalConfig.subject,
                });
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{copy.contactUsBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

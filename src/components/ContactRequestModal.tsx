import React, { useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { Language } from '../types';
import { UI_COPY } from '../utils/uiCopy';
import { ContactRequestForm, ContactRequestPrefill } from './ContactRequestForm';

interface ContactRequestModalProps {
  isOpen: boolean;
  language: Language;
  prefill?: ContactRequestPrefill;
  onClose: () => void;
}

export const ContactRequestModal: React.FC<ContactRequestModalProps> = ({
  isOpen,
  language,
  prefill,
  onClose,
}) => {
  const copy = UI_COPY[language].contact;

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
      data-testid="contact-request-modal"
      className="fixed inset-0 z-[105] flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={copy.modalTitle}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl my-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 shrink-0">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                {copy.modalEyebrow}
              </p>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                {copy.modalTitle}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {copy.modalSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={copy.closeModal}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-6 overflow-y-auto">
          <ContactRequestForm language={language} prefill={prefill} compact onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

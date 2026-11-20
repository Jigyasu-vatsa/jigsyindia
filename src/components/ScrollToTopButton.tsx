import React, { useEffect, useState } from 'react';
import { COMPANY_DETAILS } from '../data/companyData';
import { CrispImage } from './CrispImage';

export const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 220);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      title="Back to top"
      className="fixed bottom-5 right-5 z-40 p-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 no-print"
    >
      <CrispImage
        src={COMPANY_DETAILS.scrollTopIconUrl}
        sizes="28px"
        targetWidth={64}
        alt="Move to top"
        className="w-7 h-10 object-contain rounded-lg dark:invert"
      />
    </button>
  );
};

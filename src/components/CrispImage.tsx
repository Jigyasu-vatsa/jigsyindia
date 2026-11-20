import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { buildCrispImageSource } from '../utils/imageAssets';

interface CrispImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  /** CSS display width hint (e.g. '48px', '(max-width: 640px) 144px, 176px') */
  sizes?: string;
  /** Preferred pixel width for fallback src selection (e.g. 2x rendered CSS width) */
  targetWidth?: number;
  /** Force full-resolution original (used inside zoom lightbox) */
  preferFullRes?: boolean;
}

/**
 * Renders any JIGSY image using gamma-correct Lanczos-downsampled responsive variants
 * at small/medium sizes while keeping full-resolution originals available for Retina & zoom.
 */
export const CrispImage: React.FC<CrispImageProps> = ({
  src,
  sizes,
  targetWidth,
  preferFullRes,
  className = '',
  alt = '',
  loading = 'lazy',
  decoding = 'async',
  referrerPolicy = 'no-referrer',
  ...rest
}) => {
  const resolved = buildCrispImageSource(src, { targetWidth, preferFullRes });

  return (
    <img
      src={resolved.src}
      srcSet={!preferFullRes ? resolved.srcSet : undefined}
      sizes={!preferFullRes ? sizes : undefined}
      alt={alt}
      loading={loading}
      decoding={decoding}
      referrerPolicy={referrerPolicy}
      className={`jigsy-crisp-img ${className}`.trim()}
      {...rest}
    />
  );
};

interface PortraitLightboxProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  subtitle?: string;
  onClose: () => void;
}

export const PortraitLightbox: React.FC<PortraitLightboxProps> = ({
  isOpen,
  imageUrl,
  title,
  subtitle,
  onClose,
}) => {
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
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close portrait preview"
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="bg-slate-100 dark:bg-slate-950 max-h-[75vh] flex items-center justify-center overflow-hidden">
          <CrispImage
            src={imageUrl}
            alt={title}
            preferFullRes
            loading="eager"
            className="w-full h-full max-h-[75vh] object-contain"
          />
        </div>
        <div className="px-5 py-3.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div>
            <div className="font-extrabold text-sm sm:text-base brand-font text-slate-900 dark:text-white">
              {title}
            </div>
            {subtitle && (
              <div className="text-xs text-slate-600 dark:text-slate-400">{subtitle}</div>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 dark:text-blue-400 shrink-0">
            <ZoomIn className="w-3.5 h-3.5" /> HD Preview
          </span>
        </div>
      </div>
    </div>
  );
};

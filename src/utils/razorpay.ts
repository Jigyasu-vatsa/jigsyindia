/**
 * Razorpay Checkout SDK Integration for JIGSY Youth Internships
 */

import { resolveAssetUrl } from './portalHelpers';

export const RAZORPAY_TEST_KEY_ID = 'rzp_test_xV8BYsKCh5UANt';
export const RAZORPAY_MERCHANT_NAME = 'JIGSY INDIA';
export const RAZORPAY_LOGO_PATH = '/assets/aistudio/company_logo_9f4f4bb5.png';

declare global {
  interface Window {
    Razorpay?: any;
  }
}

let cachedLogoDataUri: string | null = null;

/**
 * Resolves the JIGSY seal logo to a self-contained square PNG Data URI so Razorpay's
 * cross-origin checkout iframe displays it reliably on localhost, preview proxies, and custom domains.
 */
export async function resolveRazorpayLogoUrl(): Promise<string> {
  if (cachedLogoDataUri) return cachedLogoDataUri;

  const resolvedPath = resolveAssetUrl(RAZORPAY_LOGO_PATH);
  const fallbackAbsoluteUrl =
    typeof window !== 'undefined' && window.location?.origin
      ? `${window.location.origin}${resolvedPath.startsWith('/') ? resolvedPath : `/${resolvedPath}`}`
      : resolvedPath;

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return fallbackAbsoluteUrl;
  }

  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const loaded = await new Promise<boolean>((resolve) => {
      const timer = setTimeout(() => resolve(false), 1800);
      img.onload = () => {
        clearTimeout(timer);
        resolve(true);
      };
      img.onerror = () => {
        clearTimeout(timer);
        resolve(false);
      };
      img.src = resolvedPath;
    });

    if (loaded && img.naturalWidth > 0) {
      const canvas = document.createElement('canvas');
      canvas.width = 160;
      canvas.height = 160;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 160, 160);
        ctx.drawImage(img, 8, 8, 144, 144);
        cachedLogoDataUri = canvas.toDataURL('image/png');
        return cachedLogoDataUri;
      }
    }
  } catch (err) {
    console.warn('Fallback to absolute Razorpay logo URL:', err);
  }

  return fallbackAbsoluteUrl;
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export interface RazorpayPaymentOptions {
  amountInINR: number;
  trackTitle: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  onSuccess: (response: { razorpay_payment_id: string }) => void;
  onDismiss?: () => void;
  onError?: (err: any) => void;
}

export function formatRazorpayContact(rawPhone: string): string {
  const trimmed = (rawPhone || '').trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('+')) {
    return `+${trimmed.slice(1).replace(/\D/g, '')}`;
  }
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`;
  }
  return digits || trimmed;
}

export function buildRazorpayCheckoutConfig(params: {
  amountInINR: number;
  trackTitle: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  logoImageUrl: string;
}) {
  return {
    key: RAZORPAY_TEST_KEY_ID,
    amount: Math.round(params.amountInINR * 100),
    currency: 'INR',
    name: RAZORPAY_MERCHANT_NAME,
    description: `${params.trackTitle} · JIGSY Youth`,
    image: params.logoImageUrl,
    prefill: {
      name: params.applicantName.trim(),
      email: params.applicantEmail.trim(),
      contact: formatRazorpayContact(params.applicantPhone),
    },
    notes: {
      company: 'Jigyasu Integrated Global Services Private Limited',
      cin: 'U62099BR2025PTC078592',
      division: 'JIGSY Youth Development',
      track: params.trackTitle,
    },
    theme: {
      color: '#1e3a8a',
    },
  };
}

export async function openRazorpayCheckout({
  amountInINR,
  trackTitle,
  applicantName,
  applicantEmail,
  applicantPhone,
  onSuccess,
  onDismiss,
  onError,
}: RazorpayPaymentOptions): Promise<void> {
  const [loaded, logoImageUrl] = await Promise.all([
    loadRazorpayScript(),
    resolveRazorpayLogoUrl(),
  ]);

  if (!loaded || !window.Razorpay) {
    if (onError) onError(new Error('Razorpay SDK failed to load. Please check your internet connection.'));
    return;
  }

  const baseConfig = buildRazorpayCheckoutConfig({
    amountInINR,
    trackTitle,
    applicantName,
    applicantEmail,
    applicantPhone,
    logoImageUrl,
  });

  const options = {
    ...baseConfig,
    handler: function (response: any) {
      if (response && response.razorpay_payment_id) {
        onSuccess({ razorpay_payment_id: response.razorpay_payment_id });
      }
    },
    modal: {
      ondismiss: function () {
        if (onDismiss) onDismiss();
      },
    },
  };

  try {
    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response: any) {
      if (onError) onError(response.error);
    });
    rzp.open();
  } catch (err) {
    if (onError) onError(err);
  }
}

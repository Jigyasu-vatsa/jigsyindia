import { resolveAssetUrl } from './portalHelpers';

export interface ImageVariant {
  path: string;
  width: number;
}

export interface OptimizedImageSet {
  originalPath: string;
  originalWidth: number;
  variants: ImageVariant[];
}

/**
 * Registry of gamma-correct linear-light Lanczos downsampled image sets.
 * Prevents single-pass browser downscaling aliasing ("jagged/blurry small thumbnails")
 * across avatars, logos, director portraits, and showcase cards while preserving
 * full-resolution originals when zoomed or viewed on high-DPI displays.
 */
export const OPTIMIZED_IMAGE_REGISTRY: Record<string, OptimizedImageSet> = {
  'company_logo_9f4f4bb5.png': {
    originalPath: '/assets/aistudio/company_logo_9f4f4bb5.png',
    originalWidth: 200,
    variants: [
      { path: '/assets/aistudio/opt/company_logo-96.png', width: 96 },
      { path: '/assets/aistudio/opt/company_logo-144.png', width: 144 },
    ],
  },
  'MadeInIndia2_9a914348.png': {
    originalPath: '/assets/aistudio/MadeInIndia2_9a914348.png',
    originalWidth: 150,
    variants: [{ path: '/assets/aistudio/opt/made_in_india-96.png', width: 96 }],
  },
  'top_move_up_ec85c21c.jpg': {
    originalPath: '/assets/aistudio/top_move_up_ec85c21c.jpg',
    originalWidth: 92,
    variants: [{ path: '/assets/aistudio/opt/top_move_up-64.jpg', width: 64 }],
  },
  'director1_46675417.jpg': {
    originalPath: '/assets/aistudio/director1_46675417.jpg',
    originalWidth: 736,
    variants: [
      { path: '/assets/aistudio/opt/director1-160.jpg', width: 160 },
      { path: '/assets/aistudio/opt/director1-360.jpg', width: 360 },
      { path: '/assets/aistudio/opt/director1-640.jpg', width: 640 },
    ],
  },
  'JIGSY_Chairperson_Corporate_Portrait_aac8c605.png': {
    originalPath: '/assets/aistudio/JIGSY_Chairperson_Corporate_Portrait_aac8c605.png',
    originalWidth: 1142,
    variants: [
      { path: '/assets/aistudio/opt/founder_chairperson-240.jpg', width: 240 },
      { path: '/assets/aistudio/opt/founder_chairperson-480.jpg', width: 480 },
      { path: '/assets/aistudio/opt/founder_chairperson-760.jpg', width: 760 },
    ],
  },
  'Confident_Corporate_Portrait_at_JIGYASU__1__556345ac.png': {
    originalPath: '/assets/aistudio/Confident_Corporate_Portrait_at_JIGYASU__1__556345ac.png',
    originalWidth: 1199,
    variants: [
      { path: '/assets/aistudio/opt/founder_standing-240.jpg', width: 240 },
      { path: '/assets/aistudio/opt/founder_standing-480.jpg', width: 480 },
      { path: '/assets/aistudio/opt/founder_standing-760.jpg', width: 760 },
    ],
  },
  'Confident_Corporate_Portrait_at_JIGYASU_24e9f1da.png': {
    originalPath: '/assets/aistudio/Confident_Corporate_Portrait_at_JIGYASU_24e9f1da.png',
    originalWidth: 771,
    variants: [
      { path: '/assets/aistudio/opt/founder_headshot-160.jpg', width: 160 },
      { path: '/assets/aistudio/opt/founder_headshot-360.jpg', width: 360 },
      { path: '/assets/aistudio/opt/founder_headshot-640.jpg', width: 640 },
    ],
  },
  'image_252646dc.png': {
    originalPath: '/assets/aistudio/image_252646dc.png',
    originalWidth: 1235,
    variants: [
      { path: '/assets/aistudio/opt/slide1-480.jpg', width: 480 },
      { path: '/assets/aistudio/opt/slide1-840.jpg', width: 840 },
    ],
  },
  'image_35628884.png': {
    originalPath: '/assets/aistudio/image_35628884.png',
    originalWidth: 1035,
    variants: [
      { path: '/assets/aistudio/opt/slide2-480.jpg', width: 480 },
      { path: '/assets/aistudio/opt/slide2-840.jpg', width: 840 },
    ],
  },
  'image_2ede27f5.png': {
    originalPath: '/assets/aistudio/image_2ede27f5.png',
    originalWidth: 1241,
    variants: [
      { path: '/assets/aistudio/opt/slide3-480.jpg', width: 480 },
      { path: '/assets/aistudio/opt/slide3-840.jpg', width: 840 },
    ],
  },
  'image_625dc6ec.png': {
    originalPath: '/assets/aistudio/image_625dc6ec.png',
    originalWidth: 1779,
    variants: [
      { path: '/assets/aistudio/opt/jigs_assistant-96.png', width: 96 },
      { path: '/assets/aistudio/opt/jigs_assistant-160.png', width: 160 },
      { path: '/assets/aistudio/opt/jigs_assistant-320.png', width: 320 },
    ],
  },
};

function extractFilename(urlOrPath: string): string {
  const withoutQuery = (urlOrPath || '').split('?')[0].split('#')[0];
  const parts = withoutQuery.split('/');
  return parts[parts.length - 1] || '';
}

export interface CrispImageSource {
  src: string;
  srcSet?: string;
  fullResSrc: string;
}

/**
 * Given any resolved or relative asset URL, returns an optimal default `src`,
 * a multi-resolution `srcSet` (Lanczos-filtered small/medium sizes + full original),
 * and `fullResSrc` for zoom/lightbox views.
 *
 * When `targetWidth` is specified, picks the cleanest pre-filtered variant >= targetWidth
 * (typically 2x rendered CSS width) as default `src` so even browsers that ignore srcSet
 * render ultra-smooth downscaled portraits and emblems.
 */
export function buildCrispImageSource(
  rawUrl: string,
  options?: { targetWidth?: number; baseUrl?: string; preferFullRes?: boolean }
): CrispImageSource {
  if (!rawUrl) {
    return { src: '', fullResSrc: '' };
  }

  const filename = extractFilename(rawUrl);
  const entry = OPTIMIZED_IMAGE_REGISTRY[filename];
  if (!entry) {
    return { src: rawUrl, fullResSrc: rawUrl };
  }

  const resolve = (p: string) => resolveAssetUrl(p, options?.baseUrl);
  const fullResSrc = resolve(entry.originalPath);

  if (options?.preferFullRes) {
    return { src: fullResSrc, fullResSrc };
  }

  const allEntries = [
    ...entry.variants.map((v) => ({ url: resolve(v.path), width: v.width })),
    { url: fullResSrc, width: entry.originalWidth },
  ];

  const srcSet = allEntries.map((item) => `${item.url} ${item.width}w`).join(', ');

  let chosenSrc = fullResSrc;
  if (options?.targetWidth && options.targetWidth > 0) {
    const match = allEntries.find((item) => item.width >= options.targetWidth!);
    chosenSrc = match ? match.url : fullResSrc;
  }

  return {
    src: chosenSrc,
    srcSet,
    fullResSrc,
  };
}

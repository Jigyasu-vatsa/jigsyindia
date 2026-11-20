/**
 * Resolves static asset paths safely across custom domains (jigsy.in -> '/assets/...')
 * and GitHub Pages repository subpaths (user.github.io/repo -> '/repo/assets/...').
 */
export function resolveAssetUrl(assetPath: string, baseUrl?: string): string {
  if (!assetPath) return '';
  if (/^(https?:|data:|blob:)/i.test(assetPath)) return assetPath;

  const rawBase =
    baseUrl !== undefined
      ? baseUrl
      : (typeof import.meta !== 'undefined' && (import.meta as any).env?.BASE_URL) || '/';

  const normalizedBase = rawBase === './' ? '/' : rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  const cleanAsset = assetPath.replace(/^\/+/, '');
  return `${normalizedBase}${cleanAsset}`;
}

export interface ResolvedRoute {
  view: string;
  sectorSlug?: string;
  invalidPath?: string;
}

const VALID_SECTOR_SLUGS = new Set(['tech', 'youth', 'rd', 'digitech', 'consult', 'edutech']);

const KNOWN_TOP_LEVEL_ROUTES = new Set([
  'home',
  'internships',
  'internship',
  'youth',
  'youth-portal',
  'apply',
  'careers',
  'jobs',
  'sectors',
  'services',
  'about',
  'about-us',
  'founder',
  'founders',
  'directors',
  'director',
  'engage',
  'how-to-engage',
  'how-to-join',
  'contact',
  'verification',
]);

export function isInternshipSubdomain(hostname: string = ''): boolean {
  const host = (hostname || '').trim().toLowerCase();
  return host.startsWith('internship.') || host.startsWith('internships.');
}

/**
 * Detects a GitHub Pages project repository base path (e.g. '/jigsy-portal/')
 * when hosted on '<user>.github.io/<repo>/' or configured via VITE_BASE_PATH.
 */
export function getRepoBasePath(
  pathname: string = '/',
  hostname: string = '',
  configuredBase?: string
): string {
  const baseFromEnv =
    configuredBase !== undefined
      ? configuredBase
      : (typeof import.meta !== 'undefined' && (import.meta as any).env?.BASE_URL) || '/';

  if (baseFromEnv && baseFromEnv !== '/' && baseFromEnv !== './') {
    const clean = baseFromEnv.replace(/^\/+|\/+$/g, '');
    return clean ? `/${clean}` : '';
  }

  const host = (hostname || '').trim().toLowerCase();
  if (host.endsWith('.github.io')) {
    const segments = (pathname || '/').split('/').filter(Boolean);
    if (segments.length > 0 && !KNOWN_TOP_LEVEL_ROUTES.has(segments[0].toLowerCase())) {
      return `/${segments[0]}`;
    }
  }

  return '';
}

function stripBasePrefix(pathname: string, basePrefix: string): string {
  if (!basePrefix) return pathname || '/';
  const lowerPath = (pathname || '/').toLowerCase();
  const lowerPrefix = basePrefix.toLowerCase();
  if (lowerPath === lowerPrefix) return '/';
  if (lowerPath.startsWith(`${lowerPrefix}/`)) {
    return pathname.slice(basePrefix.length) || '/';
  }
  return pathname || '/';
}

/**
 * Resolves portal view from browser hostname, pathname, hash, or query parameters
 * to support custom domains (jigsy.in), GitHub Pages subpaths, JIGSY Youth referrals
 * (dedicated internships hosted at youth.jigsy.in), and graceful 404 recovery dialogues.
 */
export function resolveRouteFromLocation(
  pathname: string = '/',
  hash: string = '',
  search: string = '',
  hostname: string = '',
  configuredBase?: string
): ResolvedRoute {
  const params = new URLSearchParams(search || '');
  const queryRoute = params.get('route') || params.get('page') || '';
  const basePrefix = getRepoBasePath(pathname, hostname, configuredBase);
  const strippedPathname = stripBasePrefix(pathname || '/', basePrefix);

  const cleanHash = (hash || '').replace(/^#\/?/, '').toLowerCase();
  const cleanPath = (queryRoute || strippedPathname || '/').toLowerCase().replace(/\/+$/, '') || '/';

  const candidate = cleanHash || cleanPath.replace(/^\/+/, '');

  if (
    candidate === 'internships' ||
    candidate === 'internship' ||
    candidate === 'youth' ||
    candidate === 'youth-portal' ||
    candidate === 'apply'
  ) {
    return { view: 'sector-detail', sectorSlug: 'youth' };
  }

  if (candidate === 'careers' || candidate === 'jobs') {
    return { view: 'careers' };
  }

  if (candidate === 'sectors' || candidate === 'services') {
    return { view: 'sectors' };
  }

  if (candidate.startsWith('sectors/')) {
    const slug = candidate.split('/')[1] || '';
    if (VALID_SECTOR_SLUGS.has(slug)) {
      return { view: 'sector-detail', sectorSlug: slug };
    }
    return { view: 'not-found', invalidPath: `/${candidate}` };
  }

  if (
    candidate === 'about/founder' ||
    candidate === 'founder' ||
    candidate === 'founders' ||
    candidate === 'about-founder'
  ) {
    return { view: 'about-founder' };
  }

  if (
    candidate === 'about/directors' ||
    candidate === 'directors' ||
    candidate === 'director' ||
    candidate === 'about-directors'
  ) {
    return { view: 'about-directors' };
  }

  if (
    candidate === 'engage' ||
    candidate === 'how-to-engage' ||
    candidate === 'how-to-join' ||
    candidate === 'about/engage'
  ) {
    return { view: 'how-to-engage' };
  }

  if (
    candidate === 'about' ||
    candidate === 'about-us' ||
    candidate === 'about/company' ||
    candidate === 'about-company'
  ) {
    return { view: 'about-company' };
  }

  if (candidate === 'contact' || candidate === 'verification') {
    return { view: candidate };
  }

  if (candidate === 'home' || candidate === 'index.html') {
    return { view: 'home' };
  }

  if (!candidate) {
    if (isInternshipSubdomain(hostname)) {
      return { view: 'sector-detail', sectorSlug: 'youth' };
    }
    return { view: 'home' };
  }

  return { view: 'not-found', invalidPath: `/${candidate}` };
}

export function getPathForView(
  view: string,
  sectorSlug?: string,
  hostname: string = '',
  basePrefix: string = ''
): string {
  const onInternshipHost = isInternshipSubdomain(hostname);
  const normalizedPrefix = basePrefix ? `/${basePrefix.replace(/^\/+|\/+$/g, '')}` : '';

  let relativePath: string;
  switch (view) {
    case 'youth-portal':
      relativePath = '/sectors/youth';
      break;
    case 'careers':
      relativePath = '/careers';
      break;
    case 'sectors':
      relativePath = '/sectors';
      break;
    case 'sector-detail':
      relativePath = `/sectors/${sectorSlug || 'tech'}`;
      break;
    case 'about':
    case 'about-company':
      relativePath = '/about/company';
      break;
    case 'about-founder':
      relativePath = '/about/founder';
      break;
    case 'about-directors':
      relativePath = '/about/directors';
      break;
    case 'how-to-engage':
    case 'how-to-join':
      relativePath = '/engage';
      break;
    case 'contact':
      relativePath = '/contact';
      break;
    case 'verification':
      relativePath = '/verification';
      break;
    default:
      relativePath = onInternshipHost ? '/home' : '/';
      break;
  }

  if (!normalizedPrefix) return relativePath;
  return relativePath === '/' ? `${normalizedPrefix}/` : `${normalizedPrefix}${relativePath}`;
}

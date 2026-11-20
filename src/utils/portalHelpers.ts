import { EmployeeRecord, InternshipApplication, CertificateRecord } from '../types';

export interface TenurePreset {
  label: string;
  value: string;
}

export const TENURE_PRESETS: TenurePreset[] = [
  { label: '4 Weeks (30 Days / 120 Hours)', value: '4 Weeks (30 Days / 120 Hours)' },
  { label: '6 Weeks (45 Days / 180 Hours)', value: '6 Weeks (45 Days / 180 Hours)' },
  { label: '2 Weeks (15 Days / 60 Hours)', value: '2 Weeks (15 Days / 60 Hours)' },
  { label: '4 Weeks (160 Hours)', value: '4 Weeks (160 Hours)' },
  { label: '6 Weeks (240 Hours)', value: '6 Weeks (240 Hours)' },
  { label: '8 Weeks (60 Days / 240 Hours)', value: '8 Weeks (60 Days / 240 Hours)' },
];

export const DEFAULT_ATTENDANCE_CRITERIA = 'Minimum 60% Attendance & Evaluation Criteria Met';

export function getDefaultTenureForTrack(trackId?: string): string {
  if (trackId === 'track-4-research-overview') {
    return '2 Weeks (15 Days / 60 Hours)';
  }
  return '4 Weeks (30 Days / 120 Hours)';
}

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

/**
 * Dynamically generates graduation year options spanning
 * previous year through next 4 years (6 options total).
 */
export function getGraduationYearOptions(referenceDate: Date = new Date()): string[] {
  const currentYear = referenceDate.getFullYear();
  return Array.from({ length: 6 }, (_, idx) => String(currentYear - 1 + idx));
}

/**
 * Formats a complete WhatsApp verification message containing all
 * candidate, academic, track, and Razorpay transaction details.
 */
export function formatWhatsAppReceiptMessage(app: InternshipApplication): string {
  const fullDisplayName = `${app.salutation ? `${app.salutation} ` : ''}${app.fullName}`.trim();
  const formattedDate = new Date(app.createdAt).toLocaleString('en-IN');

  return [
    '*JIGSY INDIA — Official Internship Registration Receipt*',
    '',
    `*Application ID:* ${app.id}`,
    `*Plan ID:* ${app.trackId}`,
    `*Selected Track:* ${app.trackTitle}`,
    `*Salutation & Name:* ${fullDisplayName}`,
    `*Father's / Guardian's Name:* ${app.fatherName || 'On Record'}`,
    `*Email:* ${app.email}`,
    `*Mobile:* ${app.phone}`,
    `*College / Institute:* ${app.college}`,
    `*Degree:* ${app.degree}`,
    `*Specialization / Branch:* ${app.branch}`,
    `*Passing Year:* ${app.passingYear}`,
    `*Course Fee:* ₹${app.courseFee || 0} (100% Waived)`,
    `*Verification & Misc Fee:* ₹${app.miscFee}`,
    `*Total Paid:* ₹${app.totalAmount} INR`,
    `*Payment Gateway:* ${app.paymentMethod.toUpperCase()}`,
    `*Razorpay Payment ID:* ${app.razorpayPaymentId || app.utrNumber || 'Completed'}`,
    `*Submitted On:* ${formattedDate}`,
    '',
    'Kindly verify my registration receipt and confirm Offer/Acceptance Letter dispatch within 24–72 hours.',
  ].join('\n');
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
 * to support custom domains (jigsy.in, internship.jigsy.in), GitHub Pages subpaths,
 * and graceful 404 / missing-document error dialogues.
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
    return { view: 'youth-portal' };
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
      return { view: 'youth-portal' };
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
      relativePath = onInternshipHost ? '/' : '/internships';
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

export type VerifiedRegistryRecord =
  | {
      kind: 'employee';
      id: string;
      fullName: string;
      title: string;
      department: string;
      status: string;
      email: string;
      dateLabel: string;
      dateValue: string;
    }
  | {
      kind: 'certificate';
      id: string;
      fullName: string;
      title: string;
      department: string;
      status: string;
      email: string;
      dateLabel: string;
      dateValue: string;
    }
  | {
      kind: 'application';
      id: string;
      fullName: string;
      title: string;
      department: string;
      status: string;
      email: string;
      dateLabel: string;
      dateValue: string;
    };

/**
 * Verifies an Employee ID, Certificate Number, or JIGSY Youth Application ID
 * against the official corporate registry and locally stored records.
 */
export function verifyRegistryRecord(
  queryId: string,
  employees: EmployeeRecord[],
  applications: InternshipApplication[] = [],
  certificates: Partial<CertificateRecord>[] = []
): VerifiedRegistryRecord | null {
  const normalized = (queryId || '').trim().toUpperCase();
  if (!normalized) return null;

  const employeeMatch = employees.find(
    (emp) => emp.employeeId.trim().toUpperCase() === normalized
  );
  if (employeeMatch) {
    return {
      kind: 'employee',
      id: employeeMatch.employeeId,
      fullName: employeeMatch.fullName,
      title: employeeMatch.designation,
      department: employeeMatch.department,
      status: employeeMatch.status,
      email: employeeMatch.officialEmail,
      dateLabel: 'Joined',
      dateValue: employeeMatch.joiningDate,
    };
  }

  const certMatch = certificates.find(
    (cert) => (cert.certificateNumber || '').trim().toUpperCase() === normalized
  );
  if (certMatch && certMatch.certificateNumber) {
    return {
      kind: 'certificate',
      id: certMatch.certificateNumber,
      fullName: `${certMatch.salutation ? `${certMatch.salutation} ` : ''}${certMatch.candidateName || ''}`.trim(),
      title: certMatch.trackTitle || 'JIGSY Youth Program',
      department: 'JIGSY Youth Credential Registry',
      status: certMatch.grade ? `Verified · ${certMatch.grade}` : 'Verified Credential',
      email: certMatch.college || 'Verified Institute',
      dateLabel: 'Issued On',
      dateValue: certMatch.issueDate || 'On Record',
    };
  }

  const appMatch = applications.find(
    (app) =>
      app.id.trim().toUpperCase() === normalized ||
      (app.certificateNumber || '').trim().toUpperCase() === normalized
  );
  if (appMatch) {
    return {
      kind: (appMatch.certificateNumber || '').trim().toUpperCase() === normalized ? 'certificate' : 'application',
      id: (appMatch.certificateNumber || '').trim().toUpperCase() === normalized ? (appMatch.certificateNumber as string) : appMatch.id,
      fullName: `${appMatch.salutation ? `${appMatch.salutation} ` : ''}${appMatch.fullName}`.trim(),
      title: appMatch.trackTitle,
      department: `${appMatch.college} (${appMatch.degree})`,
      status:
        appMatch.status === 'verified' || appMatch.status === 'accepted'
          ? 'Verified Enrollee'
          : appMatch.status === 'rejected'
            ? 'Rejected'
            : 'Registered · Pending Dispatch',
      email: appMatch.email,
      dateLabel: 'Submitted',
      dateValue: new Date(appMatch.createdAt).toLocaleDateString('en-IN'),
    };
  }

  return null;
}

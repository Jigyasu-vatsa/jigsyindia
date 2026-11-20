import { Language } from '../types';
import { SECTORS } from '../data/companyData';

export const CANONICAL_SITE_ORIGIN = 'https://jigsy.in';

/**
 * Exhaustive official brand, legal-name, and abbreviation keyword coverage
 * across all search engines and browsers (Google, Bing, Yahoo, DuckDuckGo, Safari, Edge, Yandex).
 */
export const BRAND_KEYWORDS: string[] = [
  'JIGSY',
  'JIGSY INDIA',
  'JIGS',
  'JIGYASU',
  'JIGYASU INTEGRATED',
  'JIGYASU INTEGRATED GLOBAL',
  'JIGYASU INTEGRATED GLOBAL SERVICES',
  'JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE',
  'JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED',
  'JIGYASU INTEGRATED GLOBAL SERVICES PVT',
  'JIGYASU INTEGRATED GLOBAL SERVICES PVT LTD',
  'JIGYASU INTEGRATED GLOBAL SERVICES PVT LIMITED',
  'JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LTD',
  'Jigsy Pvt Ltd',
  'Jigsy India Pvt Ltd',
  'Jigyasu Vatsa',
  'Subhash Chandra Jha',
  'JIGSY Tech',
  'JIGSY Consult',
  'JIGSY R&D',
  'JIGSY DigiTech',
  'JIGSY EduTech',
  'JIGSY Youth',
  'youth.jigsy.in',
  'jigyasu.jigsy.in',
  'U62099BR2025PTC078592',
  'DIPP228528',
  '10AAHCJ0404B1ZN',
  'UDYAM-BR-34-0051280',
  'DPIIT Startup India Bihar',
  'Darbhanga IT Software Company',
  'Multi-Sector Enterprise India',
  'Enterprise Software SaaS India',
  'Business Compliance Consultancy India',
  'Applied AI R&D Cell India',
  'ISBN Publishing Digital Media India',
  'Campus Incubation EduTech India',
];

export interface BreadcrumbEntry {
  name: string;
  url: string;
}

export interface RouteSeoMetadata {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  htmlLang: string;
  breadcrumbs: BreadcrumbEntry[];
}

function normalizeOrigin(origin?: string): string {
  if (!origin) return CANONICAL_SITE_ORIGIN;
  const trimmed = origin.replace(/\/+$/, '');
  // Always canonicalize localhost/dev preview hosts to production https://jigsy.in for SEO consistency
  if (/^https?:\/\/(localhost|127\.0\.0\.1)/i.test(trimmed)) {
    return CANONICAL_SITE_ORIGIN;
  }
  return trimmed;
}

function getHtmlLangCode(language: Language): string {
  if (language === 'hi') return 'hi-IN';
  if (language === 'mai') return 'mai-IN';
  return 'en-IN';
}

/**
 * Generates unique, search-engine-optimized per-route metadata, canonical URL,
 * robots directives (`noindex, follow` on 404/error routes), and BreadcrumbList JSON-LD.
 */
export function getSeoMetadataForView(
  view: string,
  sectorSlug?: string,
  language: Language = 'en',
  origin?: string
): RouteSeoMetadata {
  const baseOrigin = normalizeOrigin(origin);
  const baseKeywords = BRAND_KEYWORDS.join(', ');
  const htmlLang = getHtmlLangCode(language);
  const indexRobots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const makeMeta = (opts: {
    title: string;
    description: string;
    path: string;
    extraKeywords?: string[];
    robots?: string;
    breadcrumbs: BreadcrumbEntry[];
  }): RouteSeoMetadata => {
    const canonicalUrl = `${baseOrigin}${opts.path}`;
    const keywords = opts.extraKeywords?.length
      ? `${opts.extraKeywords.join(', ')}, ${baseKeywords}`
      : baseKeywords;

    return {
      title: opts.title,
      description: opts.description,
      keywords,
      canonicalUrl,
      robots: opts.robots || indexRobots,
      ogTitle: opts.title,
      ogDescription: opts.description,
      ogUrl: canonicalUrl,
      htmlLang,
      breadcrumbs: opts.breadcrumbs,
    };
  };

  if (view === 'about-company' || view === 'about') {
    return makeMeta({
      title: 'About JIGSY INDIA | Jigyasu Integrated Global Services Private Limited (Pvt Ltd)',
      description:
        'Official corporate profile of Jigyasu Integrated Global Services Private Limited (JIGSY / JIGS / JIGYASU Pvt Ltd). MCA CIN U62099BR2025PTC078592, DPIIT Startup India DIPP228528, Darbhanga, Bihar.',
      path: '/about/company',
      extraKeywords: [
        'About JIGSY INDIA',
        'About Jigyasu Integrated Global Services Private Limited',
        'Jigyasu Integrated Global Services Pvt Ltd CIN',
      ],
      breadcrumbs: [
        { name: 'JIGSY INDIA', url: `${baseOrigin}/` },
        { name: 'About Company', url: `${baseOrigin}/about/company` },
      ],
    });
  }

  if (view === 'about-founder') {
    return makeMeta({
      title: 'Founder Mr. Jigyasu Vatsa | JIGSY INDIA (Jigyasu Integrated Global Services Pvt Ltd)',
      description:
        'Official profile of Mr. Jigyasu Vatsa (M.Tech CSE, MBA, Researcher) — Founder & Chairperson of JIGSY INDIA (Jigyasu Integrated Global Services Private Limited), author of Mastering DSA Without Fear.',
      path: '/about/founder',
      extraKeywords: [
        'Jigyasu Vatsa',
        'Founder of JIGSY INDIA',
        'Founder of Jigyasu Integrated Global Services Private Limited',
        'Mastering DSA Without Fear',
        'jigyasu.jigsy.in',
      ],
      breadcrumbs: [
        { name: 'JIGSY INDIA', url: `${baseOrigin}/` },
        { name: 'About Company', url: `${baseOrigin}/about/company` },
        { name: 'Founder — Mr. Jigyasu Vatsa', url: `${baseOrigin}/about/founder` },
      ],
    });
  }

  if (view === 'about-directors') {
    return makeMeta({
      title: 'Board of Directors | JIGSY INDIA — Jigyasu Integrated Global Services Private Limited',
      description:
        'Meet the Board of Directors of Jigyasu Integrated Global Services Private Limited (JIGSY INDIA): Mr. Subhash Chandra Jha and Mr. Jigyasu Vatsa.',
      path: '/about/directors',
      extraKeywords: [
        'JIGSY INDIA Directors',
        'Subhash Chandra Jha JIGSY',
        'Jigyasu Vatsa Director',
        'Jigyasu Integrated Global Services Private Limited Directors',
      ],
      breadcrumbs: [
        { name: 'JIGSY INDIA', url: `${baseOrigin}/` },
        { name: 'About Company', url: `${baseOrigin}/about/company` },
        { name: 'Board of Directors', url: `${baseOrigin}/about/directors` },
      ],
    });
  }

  if (view === 'sectors') {
    return makeMeta({
      title: 'Corporate Sectors & Services | JIGSY INDIA (Jigyasu Integrated Global Services Pvt Ltd)',
      description:
        'Explore all 6 corporate divisions of JIGSY INDIA (Jigyasu Integrated Global Services Private Limited): JIGSY Tech, JIGSY Consult, JIGSY R&D, JIGSY DigiTech, JIGSY EduTech, and JIGSY Youth.',
      path: '/sectors',
      extraKeywords: [
        'JIGSY Services',
        'JIGSY INDIA Sectors',
        'Jigyasu Integrated Global Services Offerings',
      ],
      breadcrumbs: [
        { name: 'JIGSY INDIA', url: `${baseOrigin}/` },
        { name: 'Sectors & Services', url: `${baseOrigin}/sectors` },
      ],
    });
  }

  if (view === 'sector-detail') {
    const sector = SECTORS.find((s) => s.slug === sectorSlug) || SECTORS[0];
    const serviceNames = sector.services.map((srv) => srv.title.en);
    return makeMeta({
      title: `${sector.name} | JIGSY INDIA — Jigyasu Integrated Global Services Private Limited`,
      description: `${sector.name} by Jigyasu Integrated Global Services Private Limited (JIGSY INDIA / JIGS Pvt Ltd): ${sector.shortDescription.en}`,
      path: `/sectors/${sector.slug}`,
      extraKeywords: [sector.name, `${sector.name} JIGSY INDIA`, ...serviceNames],
      breadcrumbs: [
        { name: 'JIGSY INDIA', url: `${baseOrigin}/` },
        { name: 'Sectors & Services', url: `${baseOrigin}/sectors` },
        { name: sector.name, url: `${baseOrigin}/sectors/${sector.slug}` },
      ],
    });
  }

  if (view === 'how-to-engage' || view === 'how-to-join') {
    return makeMeta({
      title: 'How to Engage & Collaborate | JIGSY INDIA (Jigyasu Integrated Global Services Pvt Ltd)',
      description:
        'Partner with Jigyasu Integrated Global Services Private Limited (JIGSY INDIA) for enterprise software, institutional MoUs, R&D collaborations, consultancy, and campus incubation.',
      path: '/engage',
      extraKeywords: ['Collaborate with JIGSY INDIA', 'JIGSY MoU', 'JIGSY Partnership'],
      breadcrumbs: [
        { name: 'JIGSY INDIA', url: `${baseOrigin}/` },
        { name: 'How to Engage', url: `${baseOrigin}/engage` },
      ],
    });
  }

  if (view === 'careers') {
    return makeMeta({
      title: 'Careers & Talent Pool | JIGSY INDIA — Jigyasu Integrated Global Services Private Limited',
      description:
        'Explore careers and submit your professional profile to the talent pool of Jigyasu Integrated Global Services Private Limited (JIGSY INDIA / JIGS Pvt Ltd).',
      path: '/careers',
      extraKeywords: ['JIGSY INDIA Careers', 'Jigyasu Integrated Global Services Jobs'],
      breadcrumbs: [
        { name: 'JIGSY INDIA', url: `${baseOrigin}/` },
        { name: 'Careers', url: `${baseOrigin}/careers` },
      ],
    });
  }

  if (view === 'contact') {
    return makeMeta({
      title: 'Contact JIGSY INDIA | Jigyasu Integrated Global Services Private Limited',
      description:
        'Submit service proposals, institutional MoUs, and corporate inquiries to Jigyasu Integrated Global Services Private Limited (JIGSY INDIA), Darbhanga, Bihar.',
      path: '/contact',
      extraKeywords: ['Contact JIGSY INDIA', 'JIGSY Email', 'jigsy25@gmail.com'],
      breadcrumbs: [
        { name: 'JIGSY INDIA', url: `${baseOrigin}/` },
        { name: 'Contact Us', url: `${baseOrigin}/contact` },
      ],
    });
  }

  if (view === 'youth-portal') {
    return makeMeta({
      title: 'JIGSY Youth Programs | JIGSY INDIA — Jigyasu Integrated Global Services Pvt Ltd',
      description:
        'JIGSY Youth skill empowerment and internship initiative by Jigyasu Integrated Global Services Private Limited (JIGSY INDIA). Dedicated portal hosted at youth.jigsy.in.',
      path: '/internships',
      extraKeywords: ['JIGSY Youth', 'youth.jigsy.in', 'JIGSY Internships'],
      breadcrumbs: [
        { name: 'JIGSY INDIA', url: `${baseOrigin}/` },
        { name: 'JIGSY Youth', url: `${baseOrigin}/internships` },
      ],
    });
  }

  if (view === 'not-found' || view === 'verification') {
    return makeMeta({
      title: 'Page Notice | JIGSY INDIA — Jigyasu Integrated Global Services Private Limited',
      description:
        'Navigate back to the official corporate portal of JIGSY INDIA — Jigyasu Integrated Global Services Private Limited.',
      path: view === 'verification' ? '/verification' : '/',
      robots: 'noindex, follow',
      breadcrumbs: [{ name: 'JIGSY INDIA', url: `${baseOrigin}/` }],
    });
  }

  // Default Home Route
  return makeMeta({
    title: 'JIGSY INDIA | Jigyasu Integrated Global Services Private Limited (JIGSY / JIGS Pvt Ltd)',
    description:
      'Official website of JIGSY INDIA — Jigyasu Integrated Global Services Private Limited (JIGS / JIGYASU Pvt Ltd, CIN: U62099BR2025PTC078592). DPIIT Startup India enterprise across Tech, Consult, R&D, DigiTech, EduTech & Youth.',
    path: '/',
    breadcrumbs: [{ name: 'JIGSY INDIA', url: `${baseOrigin}/` }],
  });
}

function upsertMeta(selector: string, attrs: Record<string, string>, content: string) {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, v);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  if (typeof document === 'undefined') return;
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function upsertBreadcrumbJsonLd(breadcrumbs: BreadcrumbEntry[]) {
  if (typeof document === 'undefined') return;
  const scriptId = 'jigsy-dynamic-breadcrumb-ld';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
  script.textContent = JSON.stringify(payload);
}

/**
 * Applies computed per-route SEO metadata cleanly into document.head.
 */
export function applySeoMetadataToDocument(meta: RouteSeoMetadata): void {
  if (typeof document === 'undefined') return;

  document.title = meta.title;
  document.documentElement.setAttribute('lang', meta.htmlLang);

  upsertMeta('meta[name="description"]', { name: 'description' }, meta.description);
  upsertMeta('meta[name="keywords"]', { name: 'keywords' }, meta.keywords);
  upsertMeta('meta[name="robots"]', { name: 'robots' }, meta.robots);
  upsertMeta('meta[name="googlebot"]', { name: 'googlebot' }, meta.robots);
  upsertMeta('meta[name="bingbot"]', { name: 'bingbot' }, meta.robots);

  upsertMeta('meta[property="og:title"]', { property: 'og:title' }, meta.ogTitle);
  upsertMeta('meta[property="og:description"]', { property: 'og:description' }, meta.ogDescription);
  upsertMeta('meta[property="og:url"]', { property: 'og:url' }, meta.ogUrl);

  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, meta.ogTitle);
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, meta.ogDescription);

  upsertCanonical(meta.canonicalUrl);
  upsertBreadcrumbJsonLd(meta.breadcrumbs);
}

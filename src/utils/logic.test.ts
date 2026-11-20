import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { validateCaptcha, generateCaptcha } from './captcha';
import {
  resolveRouteFromLocation,
  getPathForView,
  isInternshipSubdomain,
  resolveAssetUrl,
  getRepoBasePath,
} from './portalHelpers';
import { generateJigsyAssistantReply, sanitizeForSpeech } from './jigsyAssistantEngine';
import { SECTORS } from '../data/companyData';
import { UI_COPY } from './uiCopy';
import { buildFormSubmitPayload, FORMSUBMIT_ENDPOINT } from './formSubmit';
import { buildCrispImageSource, OPTIMIZED_IMAGE_REGISTRY } from './imageAssets';
import {
  SECURITY_GATE_CONFIG,
  WELCOME_MODAL_SESSION_KEY,
  shouldShowSecurityGate,
  shouldShowWelcomeModal,
  isSearchEngineCrawler,
  computeStage2Progress,
  computeStage3Remaining,
  isManualBypassReady,
  isHoneypotTriggered,
} from './securityGate';
import { BRAND_KEYWORDS, getSeoMetadataForView } from './seoManager';

test('captcha generator creates 5-character alphanumeric uppercase code', () => {
  const challenge = generateCaptcha();
  assert.equal(challenge.code.length, 5);
  assert.equal(challenge.code, challenge.code.toUpperCase());
  assert.ok(challenge.id.startsWith('cap_'));
  assert.equal(challenge.displayText.length, 9);
});

test('captcha validator performs case-insensitive comparison ignoring whitespace', () => {
  assert.equal(validateCaptcha(' 4K9M2 ', '4K9M2'), true);
  assert.equal(validateCaptcha('4k9m2', '4K9M2'), true);
  assert.equal(validateCaptcha('WRONG', '4K9M2'), false);
  assert.equal(validateCaptcha('', '4K9M2'), false);
  assert.equal(validateCaptcha('4K9M2', ''), false);
});

test('resolveRouteFromLocation routes /internships and youth aliases cleanly to JIGSY Youth sector detail', () => {
  assert.equal(isInternshipSubdomain('internship.jigsy.in'), true);
  assert.equal(isInternshipSubdomain('jigsy.in'), false);
  assert.deepEqual(resolveRouteFromLocation('/', '', '', 'internship.jigsy.in'), {
    view: 'sector-detail',
    sectorSlug: 'youth',
  });
  assert.deepEqual(resolveRouteFromLocation('/home', '', '', 'internship.jigsy.in'), { view: 'home' });
  assert.equal(getPathForView('home', undefined, 'internship.jigsy.in'), '/home');

  assert.deepEqual(resolveRouteFromLocation('/internships', '', ''), {
    view: 'sector-detail',
    sectorSlug: 'youth',
  });
  assert.deepEqual(resolveRouteFromLocation('/', '#/internships', ''), {
    view: 'sector-detail',
    sectorSlug: 'youth',
  });
  assert.deepEqual(resolveRouteFromLocation('/', '', '?route=/internships'), {
    view: 'sector-detail',
    sectorSlug: 'youth',
  });
  assert.deepEqual(resolveRouteFromLocation('/', '', '?page=youth'), {
    view: 'sector-detail',
    sectorSlug: 'youth',
  });
  assert.deepEqual(resolveRouteFromLocation('/sectors/rd', '', ''), { view: 'sector-detail', sectorSlug: 'rd' });
  assert.deepEqual(resolveRouteFromLocation('/', '', ''), { view: 'home' });
  assert.equal(getPathForView('sector-detail', 'youth'), '/sectors/youth');
});

test('resolveAssetUrl handles root custom domain and GitHub Pages repository subpaths', () => {
  assert.equal(resolveAssetUrl('/assets/aistudio/company_logo_9f4f4bb5.png', '/'), '/assets/aistudio/company_logo_9f4f4bb5.png');
  assert.equal(resolveAssetUrl('/assets/aistudio/company_logo_9f4f4bb5.png', '/jigsy-site/'), '/jigsy-site/assets/aistudio/company_logo_9f4f4bb5.png');
  assert.equal(resolveAssetUrl('assets/aistudio/top_move_up_ec85c21c.jpg', '/jigsy-site'), '/jigsy-site/assets/aistudio/top_move_up_ec85c21c.jpg');
  assert.equal(resolveAssetUrl('https://jigsy.in/logo.png', '/jigsy-site/'), 'https://jigsy.in/logo.png');
});

test('getRepoBasePath and routing support GitHub Pages project URLs (*.github.io/<repo>/)', () => {
  assert.equal(getRepoBasePath('/jigsy-website/sectors/edutech', 'jigsy-india.github.io', '/'), '/jigsy-website');
  assert.equal(getRepoBasePath('/sectors/edutech', 'jigsy.in', '/'), '');
  assert.deepEqual(
    resolveRouteFromLocation('/jigsy-website/sectors/edutech', '', '', 'jigsy-india.github.io', '/'),
    { view: 'sector-detail', sectorSlug: 'edutech' }
  );
  assert.deepEqual(
    resolveRouteFromLocation('/jigsy-website/', '', '?route=/internships', 'jigsy-india.github.io', '/'),
    { view: 'sector-detail', sectorSlug: 'youth' }
  );
  assert.equal(getPathForView('sector-detail', 'edutech', 'jigsy-india.github.io', '/jigsy-website'), '/jigsy-website/sectors/edutech');
  assert.equal(getPathForView('home', undefined, 'jigsy-india.github.io', '/jigsy-website'), '/jigsy-website/');
});

test('resolveRouteFromLocation and getPathForView support separate About, Founder, Directors, and Engage routes', () => {
  assert.deepEqual(resolveRouteFromLocation('/about/company', '', ''), { view: 'about-company' });
  assert.deepEqual(resolveRouteFromLocation('/about', '', ''), { view: 'about-company' });
  assert.deepEqual(resolveRouteFromLocation('/about/founder', '', ''), { view: 'about-founder' });
  assert.deepEqual(resolveRouteFromLocation('/founder', '', ''), { view: 'about-founder' });
  assert.deepEqual(resolveRouteFromLocation('/about/directors', '', ''), { view: 'about-directors' });
  assert.deepEqual(resolveRouteFromLocation('/directors', '', ''), { view: 'about-directors' });
  assert.deepEqual(resolveRouteFromLocation('/engage', '', ''), { view: 'how-to-engage' });
  assert.deepEqual(
    resolveRouteFromLocation('/jigsy-site/about/founder', '', '', 'jigsy-india.github.io', '/'),
    { view: 'about-founder' }
  );

  assert.equal(getPathForView('about-company'), '/about/company');
  assert.equal(getPathForView('about-founder'), '/about/founder');
  assert.equal(getPathForView('about-directors'), '/about/directors');
  assert.equal(getPathForView('how-to-engage'), '/engage');
});

test('JIGSY AI Assistant handles Founder, Directors, MoU proposals, Youth portal, context follow-ups, and speech sanitization', () => {
  const founderReply = generateJigsyAssistantReply('Tell me about Founder Jigyasu Vatsa');
  assert.equal(founderReply.intentLabel, 'Founder Profile');
  assert.ok(founderReply.text.includes('https://jigyasu.jigsy.in'));
  assert.ok(founderReply.actions.some((a) => a.type === 'external_link' && a.url === 'https://jigyasu.jigsy.in'));

  const directorsReply = generateJigsyAssistantReply('Open Board of Directors');
  assert.equal(directorsReply.intentLabel, 'Board of Directors');
  assert.ok(directorsReply.text.includes('Subhash Chandra Jha'));
  assert.equal(directorsReply.autoExecuteAction?.type, 'navigate');

  const proposalReply = generateJigsyAssistantReply('We want an institutional MoU for JIGSY EduTech');
  assert.equal(proposalReply.intentLabel, 'Proposal & MoU Desk');
  assert.ok(
    proposalReply.actions.some(
      (a) => a.type === 'prefill_contact' && a.sectorSlug === 'edutech' && a.engagementType?.includes('MoU')
    )
  );

  const youthReply = generateJigsyAssistantReply('Where can I apply for JIGSY Youth internship?');
  assert.equal(youthReply.intentLabel, 'JIGSY Youth Portal');
  assert.ok(youthReply.text.includes('https://youth.jigsy.in'));

  const techReply = generateJigsyAssistantReply('What services does JIGSY Tech offer?');
  assert.equal(techReply.intentLabel, 'JIGSY Tech');
  const followUp = generateJigsyAssistantReply('Tell me more', techReply.nextContext);
  assert.equal(followUp.intentLabel, 'JIGSY Tech Deep Dive');

  const cleanSpeech = sanitizeForSpeech('Visit https://jigyasu.jigsy.in 🚀 **JIGSY INDIA** • Ready!');
  assert.ok(!cleanSpeech.includes('https://'));
  assert.ok(!cleanSpeech.includes('🚀'));
  assert.ok(!cleanSpeech.includes('**'));
  assert.ok(cleanSpeech.includes('JIGSY INDIA'));
});

test('resolveRouteFromLocation routes unknown paths, missing PDFs, and unknown sectors to not-found with invalidPath', () => {
  assert.deepEqual(resolveRouteFromLocation('/unknown-page', '', ''), {
    view: 'not-found',
    invalidPath: '/unknown-page',
  });
  assert.deepEqual(resolveRouteFromLocation('/docs/missing-brochure.pdf', '', ''), {
    view: 'not-found',
    invalidPath: '/docs/missing-brochure.pdf',
  });
  assert.deepEqual(resolveRouteFromLocation('/sectors/nonexistent', '', ''), {
    view: 'not-found',
    invalidPath: '/sectors/nonexistent',
  });
  assert.deepEqual(resolveRouteFromLocation('/verification', '', ''), {
    view: 'verification',
  });
});

test('SECTORS keeps all service titles strictly English across en/hi/mai while UI_COPY uses clean Submit labels', () => {
  assert.equal(SECTORS.length, 6);
  for (const sector of SECTORS) {
    assert.ok(sector.services.length >= 3, `Expected generic services for ${sector.name}`);
    for (const srv of sector.services) {
      assert.equal(srv.title.hi, srv.title.en, `Hindi service title must stay English: ${srv.title.en}`);
      assert.equal(srv.title.mai, srv.title.en, `Maithili service title must stay English: ${srv.title.en}`);
    }
  }

  for (const lang of ['en', 'hi', 'mai'] as const) {
    const submitLbl = UI_COPY[lang].contact.submitBtn;
    assert.ok(!submitLbl.includes('jigsy25@gmail.com'), 'Submit label must not expose raw email address');
    assert.ok(!submitLbl.toLowerCase().includes('formsubmit'), 'Submit label must not mention FormSubmit');
  }
  assert.equal(UI_COPY.en.contact.submitBtn, 'Submit');
});

test('JIGSY AI Assistant reports offline Employee Verification and no current Careers openings accurately', () => {
  const verifyReply = generateJigsyAssistantReply('How do I verify an employee ID?');
  assert.equal(verifyReply.intentLabel, 'Verification Notice');
  assert.ok(verifyReply.text.toLowerCase().includes('temporarily'));
  assert.ok(verifyReply.actions.some((a) => a.type === 'prefill_contact'));

  const careersReply = generateJigsyAssistantReply('Are there any open jobs in careers?');
  assert.equal(careersReply.intentLabel, 'Careers & Talent Pool');
  assert.ok(careersReply.text.toLowerCase().includes('no active corporate openings'));
});

test('FormSubmit helper targets jigsy25@gmail.com with proper subject tags, Form_Tag, table template, and replyTo', () => {
  assert.equal(FORMSUBMIT_ENDPOINT, 'https://formsubmit.co/ajax/jigsy25@gmail.com');

  const talentPayload = buildFormSubmitPayload({
    tag: 'JIGSY TALENT POOL',
    subject: 'Aarav Kumar — JIGSY Tech',
    replyTo: 'aarav@example.com',
    fields: { Full_Name: 'Aarav Kumar', Preferred_Sector: 'JIGSY Tech' },
  });
  assert.equal(talentPayload._subject, '[JIGSY TALENT POOL] Aarav Kumar — JIGSY Tech');
  assert.equal(talentPayload.Form_Tag, 'JIGSY TALENT POOL');
  assert.equal(talentPayload._template, 'table');
  assert.equal(talentPayload._captcha, 'false');
  assert.equal(talentPayload._replyto, 'aarav@example.com');

  const feedbackPayload = buildFormSubmitPayload({
    tag: 'JIGSY USER FEEDBACK',
    subject: 'Member Review (5/5) — Priya',
    fields: { Reviewer_Name: 'Priya', Rating_Stars: '5 / 5' },
  });
  assert.equal(feedbackPayload._subject, '[JIGSY USER FEEDBACK] Member Review (5/5) — Priya');
  assert.equal(feedbackPayload.Form_Tag, 'JIGSY USER FEEDBACK');
});

test('Founder copy across en/hi/mai and assistant reflects updated credentials (KVS CS, IRCTC, B.Tech AI/ML, M.Tech Sandip University, MBA, 2026 Book) and omits Nabeng/TA', () => {
  const forbidden = [
    'Nabeng',
    'Teaching Assistant',
    'टीचिंग असिस्टेंट',
    'Jul 2023',
    'July 2023',
    'जुलाई 2023',
    'जुलाई २०२३',
    'Examination Coordinator',
    'FDP Coordinator',
    'TPC Ordinance',
    'UGC-NET',
    'STET',
    'DMRC',
    '2016',
    '2023 – 2024',
    '385+',
  ];
  for (const lang of ['en', 'hi', 'mai'] as const) {
    const serialized = JSON.stringify(UI_COPY[lang].founderPage);
    for (const term of forbidden) {
      assert.ok(!serialized.includes(term), `Founder copy (${lang}) must not include "${term}"`);
    }
    assert.ok(serialized.includes('2026') || serialized.includes('२०२६'), `Founder copy (${lang}) must reference 2026 book/research`);
    assert.ok(serialized.includes('KVS'), `Founder copy (${lang}) must reference KVS 12th CS`);
    assert.ok(serialized.includes('IRCTC'), `Founder copy (${lang}) must reference IRCTC internships`);
    assert.ok(serialized.includes('MBA'), `Founder copy (${lang}) must reference MBA`);
    assert.ok(
      serialized.includes('May 2019 – June 2021') ||
        serialized.includes('मई 2019 – जून 2021') ||
        serialized.includes('मई २०१९ – जून २०२१'),
      `Founder copy (${lang}) must include May 2019 – June 2021`
    );
  }

  const founderReply = generateJigsyAssistantReply('Tell me about the founder Jigyasu Vatsa');
  for (const term of forbidden) {
    assert.ok(!founderReply.text.includes(term), `Assistant founder reply must not include "${term}"`);
  }
  assert.ok(founderReply.text.includes('M.Tech (CSE) · MBA · Researcher'));
  assert.ok(founderReply.text.includes('May 2019 – June 2021'));
  assert.ok(founderReply.text.includes('KVS'));
  assert.ok(founderReply.text.includes('IRCTC'));
  assert.ok(founderReply.text.includes('Sandip University'));
  assert.ok(founderReply.text.includes('June 2026'));
});

test('buildCrispImageSource maps active assets to Lanczos multi-resolution srcSet and supports subpath bases', () => {
  assert.ok(Object.keys(OPTIMIZED_IMAGE_REGISTRY).length >= 10);

  const smallDirector = buildCrispImageSource('/assets/aistudio/Confident_Corporate_Portrait_at_JIGYASU__1__556345ac.png', {
    targetWidth: 360,
    baseUrl: '/',
  });
  assert.equal(smallDirector.src, '/assets/aistudio/opt/founder_standing-480.jpg');
  assert.ok(smallDirector.srcSet?.includes('/assets/aistudio/opt/founder_standing-240.jpg 240w'));
  assert.ok(smallDirector.srcSet?.includes('/assets/aistudio/Confident_Corporate_Portrait_at_JIGYASU__1__556345ac.png 1199w'));
  assert.equal(smallDirector.fullResSrc, '/assets/aistudio/Confident_Corporate_Portrait_at_JIGYASU__1__556345ac.png');

  const fullResZoom = buildCrispImageSource('/assets/aistudio/Confident_Corporate_Portrait_at_JIGYASU__1__556345ac.png', {
    preferFullRes: true,
    baseUrl: '/jigsy-site/',
  });
  assert.equal(fullResZoom.src, '/jigsy-site/assets/aistudio/Confident_Corporate_Portrait_at_JIGYASU__1__556345ac.png');
  assert.equal(fullResZoom.srcSet, undefined);

  const logoSubpath = buildCrispImageSource('/jigsy-site/assets/aistudio/company_logo_9f4f4bb5.png', {
    targetWidth: 96,
    baseUrl: '/jigsy-site/',
  });
  assert.equal(logoSubpath.src, '/jigsy-site/assets/aistudio/opt/company_logo-96.png');
  assert.ok(logoSubpath.srcSet?.includes('/jigsy-site/assets/aistudio/opt/company_logo-144.png 144w'));
});

test('Security Gate enforces exact 15s total staged timeline, session persistence, manual unlock, and honeypot detection', () => {
  const totalMs =
    SECURITY_GATE_CONFIG.stage0DurationMs +
    SECURITY_GATE_CONFIG.stage2MaxDurationMs +
    SECURITY_GATE_CONFIG.stage3DurationMs;
  assert.equal(totalMs, 15000);
  assert.equal(SECURITY_GATE_CONFIG.totalDurationSec, 15);

  const now = 1_700_000_000_000;
  assert.equal(shouldShowSecurityGate('', null, now), true);
  assert.equal(shouldShowSecurityGate('?autostart=1', null, now), false);
  assert.equal(shouldShowSecurityGate('?security_gate=1', String(now - 1000), now), true);
  assert.equal(shouldShowSecurityGate('', String(now - 60_000), now), false);
  assert.equal(shouldShowSecurityGate('', String(now - SECURITY_GATE_CONFIG.sessionTtlMs - 1000), now), true);

  assert.deepEqual(computeStage2Progress(0, 7500), { percentage: 0, remainingSec: 8 });
  assert.deepEqual(computeStage2Progress(3750, 7500), { percentage: 50, remainingSec: 4 });
  assert.deepEqual(computeStage2Progress(7500, 7500), { percentage: 100, remainingSec: 0 });

  assert.equal(computeStage3Remaining(0, 5000), 5);
  assert.equal(computeStage3Remaining(3000, 5000), 2);
  assert.equal(computeStage3Remaining(5000, 5000), 0);

  assert.equal(isManualBypassReady(0, 5), false);
  assert.equal(isManualBypassReady(2, 1), false);
  assert.equal(isManualBypassReady(3, 3), false);
  assert.equal(isManualBypassReady(3, 2), true);
  assert.equal(isManualBypassReady(4, 0), true);

  assert.equal(isHoneypotTriggered(''), false);
  assert.equal(isHoneypotTriggered('   '), false);
  assert.equal(isHoneypotTriggered('http://spam-bot.example'), true);
});

test('Welcome Modal (Language & Theme popup) triggers after Security Gate for visitors while bypassing crawlers & autostart', () => {
  const chromeUa = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128.0.0.0 Safari/537.36';
  const googlebotUa = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

  assert.ok(WELCOME_MODAL_SESSION_KEY.length > 0);
  assert.equal(shouldShowWelcomeModal('', null, chromeUa), true);
  assert.equal(shouldShowWelcomeModal('?security_gate=1', null, chromeUa), true);
  assert.equal(shouldShowWelcomeModal('', 'true', chromeUa), false);
  assert.equal(shouldShowWelcomeModal('?autostart=1', null, chromeUa), false);
  assert.equal(shouldShowWelcomeModal('', null, googlebotUa), false);
});

test('Search engine and social crawlers bypass 15s Security Gate immediately for uninterrupted SEO indexing', () => {
  const crawlers = [
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    'DuckDuckBot/1.0; (+http://duckduckgo.com/duckduckbot.html)',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15 (Applebot/0.1)',
    'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
    'Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)',
    'Twitterbot/1.0',
    'LinkedInBot/1.0',
  ];
  for (const ua of crawlers) {
    assert.equal(isSearchEngineCrawler(ua), true, `Expected crawler detected: ${ua}`);
    assert.equal(shouldShowSecurityGate('', null, Date.now(), SECURITY_GATE_CONFIG, ua), false);
  }
  const normalChrome = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128.0.0.0 Safari/537.36';
  assert.equal(isSearchEngineCrawler(normalChrome), false);
  assert.equal(shouldShowSecurityGate('', null, Date.now(), SECURITY_GATE_CONFIG, normalChrome), true);
  assert.equal(shouldShowSecurityGate('?security_gate=1', null, Date.now(), SECURITY_GATE_CONFIG, crawlers[0]), true);
});

test('SEO manager covers every JIGSY / JIGS / JIGYASU legal brand variant and generates per-route canonical & robots metadata', () => {
  const requiredVariants = [
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
  ];

  for (const variant of requiredVariants) {
    assert.ok(BRAND_KEYWORDS.includes(variant), `Missing required brand keyword: ${variant}`);
  }

  const homeMeta = getSeoMetadataForView('home', undefined, 'en', 'http://localhost:3000');
  assert.equal(homeMeta.canonicalUrl, 'https://jigsy.in/');
  assert.ok(homeMeta.robots.includes('index, follow'));
  assert.ok(homeMeta.title.includes('JIGSY INDIA'));
  assert.ok(homeMeta.title.includes('Jigyasu Integrated Global Services Private Limited'));

  const founderMeta = getSeoMetadataForView('about-founder', undefined, 'hi', 'https://jigsy.in');
  assert.equal(founderMeta.canonicalUrl, 'https://jigsy.in/about/founder');
  assert.equal(founderMeta.htmlLang, 'hi-IN');
  assert.ok(founderMeta.title.includes('Jigyasu Vatsa'));
  assert.equal(founderMeta.breadcrumbs.length, 3);

  const techMeta = getSeoMetadataForView('sector-detail', 'tech', 'en', 'https://jigsy.in');
  assert.equal(techMeta.canonicalUrl, 'https://jigsy.in/sectors/tech');
  assert.ok(techMeta.title.includes('JIGSY Tech'));

  const notFoundMeta = getSeoMetadataForView('not-found', undefined, 'en', 'https://jigsy.in');
  assert.equal(notFoundMeta.robots, 'noindex, follow');
});

test('All active corporate images, Lanczos variants, and SEO/GitHub Pages files exist cleanly on disk', () => {
  const publicRoot = path.resolve(process.cwd(), 'public');
  for (const seoFile of ['.nojekyll', '404.html', 'robots.txt', 'sitemap.xml', 'site.webmanifest']) {
    assert.ok(fs.existsSync(path.join(publicRoot, seoFile)), `Missing SEO/hosting file: public/${seoFile}`);
  }

  for (const [key, entry] of Object.entries(OPTIMIZED_IMAGE_REGISTRY)) {
    const origFile = path.join(publicRoot, entry.originalPath.replace(/^\/+/, ''));
    assert.ok(fs.existsSync(origFile), `Missing active image for ${key}: ${origFile}`);
    for (const variant of entry.variants) {
      const varFile = path.join(publicRoot, variant.path.replace(/^\/+/, ''));
      assert.ok(fs.existsSync(varFile), `Missing Lanczos variant for ${key}: ${varFile}`);
    }
  }
});

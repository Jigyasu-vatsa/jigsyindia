import { COMPANY_DETAILS, SECTORS } from '../data/companyData';

export type AssistantAction =
  | {
      type: 'navigate';
      label: string;
      view: string;
      sectorSlug?: string;
    }
  | {
      type: 'prefill_contact';
      label: string;
      sectorSlug?: string;
      serviceName?: string;
      engagementType?: string;
    }
  | {
      type: 'external_link';
      label: string;
      url: string;
    };

export interface AssistantContext {
  lastTopic?: string;
  lastSectorSlug?: string;
}

export interface AssistantReply {
  text: string;
  speechText: string;
  intentLabel: string;
  actions: AssistantAction[];
  autoExecuteAction?: AssistantAction;
  nextContext: AssistantContext;
}

const SECTOR_KEYWORDS: Record<string, string[]> = {
  tech: [
    'tech',
    'software',
    'saas',
    'web',
    'app',
    'application',
    'database',
    'mysql',
    'postgres',
    'postgresql',
    'cloud',
    'api',
    'ats',
    'messenger',
    'websocket',
    'docker',
    'infrastructure',
    'it',
  ],
  consult: [
    'consult',
    'legal',
    'gst',
    'gstin',
    'dsc',
    'company registration',
    'incorporation',
    'pvt ltd',
    'llp',
    'compliance',
    'mca',
    'spice',
    'tax',
    'msme',
    'affiliation',
    'advisory',
  ],
  rd: [
    'r&d',
    'rnd',
    'research',
    'paper',
    'springer',
    'taylor',
    'algorithm',
    'heuristic',
    'decay',
    'circular economy',
    'zerowfm',
    'publication',
    'patent',
    'tatkal',
    'simulation',
  ],
  digitech: [
    'digitech',
    'publish',
    'publishing',
    'book',
    'isbn',
    'amazon',
    'dsa',
    'media',
    'video',
    'poster',
    'reel',
    'advertisement',
    'typesetting',
    'proceedings',
    'branding',
  ],
  edutech: [
    'edutech',
    'education',
    'sandbox',
    'daa',
    'course',
    'training',
    'incubation',
    'campus',
    'masterclass',
    'college',
    'university',
    'lab',
    'workshop',
  ],
  youth: [
    'youth',
    'intern',
    'internship',
    'student',
    'apprenticeship',
    'waiver',
    'certificate',
    'capstone',
    'freshers',
    'btech',
    'bba',
    'bca',
  ],
};

function normalizeInput(raw: string): string {
  return (raw || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s.&/-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasAny(text: string, terms: string[]): boolean {
  return terms.some((term) => {
    if (term.includes(' ') || term.length > 4) {
      return text.includes(term);
    }
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|\\s)${escaped}(\\s|$|[.,!?])`, 'i').test(text);
  });
}

function scoreSectorMatch(text: string): { slug: string; score: number } | null {
  let best: { slug: string; score: number } | null = null;
  for (const [slug, keywords] of Object.entries(SECTOR_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      if (kw.includes(' ') || kw.length >= 4) {
        if (text.includes(kw)) score += kw.length >= 6 ? 3 : 2;
      } else {
        const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (new RegExp(`(^|\\s)${escaped}(\\s|$)`, 'i').test(text)) score += 2;
      }
    }
    if (text.includes(`jigsy ${slug}`) || text.includes(`jigsy-${slug}`)) {
      score += 5;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { slug, score };
    }
  }
  return best;
}

/**
 * Strips emojis, markdown tokens, and raw URLs so Web Speech API TTS reads
 * naturally and clearly without pronouncing punctuation or web addresses.
 */
export function sanitizeForSpeech(text: string): string {
  return (text || '')
    .replace(/https?:\/\/[^\s)]+/gi, '')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
    .replace(/[*_`#>|•·]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function generateJigsyAssistantReply(
  rawQuery: string,
  context: AssistantContext = {}
): AssistantReply {
  const q = normalizeInput(rawQuery);
  if (!q) {
    const emptyText =
      'Hello! I am JIGSY, the interactive Voice & Chat Assistant for JIGSY INDIA. Ask me about our 6 corporate sectors, request a proposal or MoU, meet our Founder and Directors, explore careers, or visit JIGSY Youth.';
    return {
      text: emptyText,
      speechText: sanitizeForSpeech(emptyText),
      intentLabel: 'Welcome',
      actions: [
        { type: 'navigate', label: 'Explore All 6 Sectors', view: 'sectors' },
        { type: 'prefill_contact', label: 'Submit Service Proposal', engagementType: 'Project Proposal & Development' },
      ],
      nextContext: context,
    };
  }

  const wantsNavigation = hasAny(q, ['open', 'go to', 'navigate', 'take me', 'show me', 'visit', 'launch']);
  const wantsProposal = hasAny(q, [
    'proposal',
    'mou',
    'collab',
    'collaboration',
    'partner',
    'partnership',
    'hire',
    'quote',
    'service request',
    'request service',
    'submit request',
    'project inquiry',
    'tie up',
    'tie-up',
  ]);
  const sectorMatch = scoreSectorMatch(q);

  // 1. Trilingual & Polite Greetings
  if (
    hasAny(q, [
      'hello',
      'hi',
      'hey',
      'namaste',
      'pranam',
      'pranaam',
      'good morning',
      'good afternoon',
      'good evening',
      'नमस्ते',
      'प्रणाम',
      'हेलो',
    ]) &&
    q.split(' ').length <= 5 &&
    !sectorMatch &&
    !wantsProposal
  ) {
    const isIndic = hasAny(q, ['namaste', 'pranam', 'pranaam', 'नमस्ते', 'प्रणाम']);
    const text = isIndic
      ? 'Namaste & Pranam! Welcome to JIGSY INDIA (Jigyasu Integrated Global Services Pvt. Ltd.). I can guide you across our 6 sectors, open any page by voice command, or pre-fill a service proposal or MoU request for jigsy25@gmail.com. How may I assist you today?'
      : 'Hello! Welcome to JIGSY INDIA (Jigyasu Integrated Global Services Pvt. Ltd.). I can walk you through our 6 operating sectors, navigate to our Founder, Directors, or Careers pages, or draft a service proposal or MoU directly to jigsy25@gmail.com. What would you like to explore?';
    return {
      text,
      speechText: sanitizeForSpeech(text),
      intentLabel: 'Greeting',
      actions: [
        { type: 'navigate', label: 'All 6 Corporate Sectors', view: 'sectors' },
        { type: 'navigate', label: 'Founder: Jigyasu Vatsa', view: 'about-founder' },
        { type: 'prefill_contact', label: 'Start Proposal / MoU', engagementType: 'Strategic Collaboration / Partnership' },
      ],
      nextContext: { lastTopic: 'greeting' },
    };
  }

  // 2. Service Proposal / MoU / Collaboration Intent (with optional sector detection)
  if (wantsProposal) {
    const resolvedSlug = sectorMatch?.slug || context.lastSectorSlug || 'tech';
    const sectorObj = SECTORS.find((s) => s.slug === resolvedSlug);
    const engagementType = q.includes('mou') || q.includes('college') || q.includes('university') || q.includes('campus')
      ? 'Institutional MoU & Academic Tie-Up'
      : q.includes('collab') || q.includes('partner')
        ? 'Strategic Collaboration / Partnership'
        : q.includes('hire') || q.includes('recruit')
          ? 'Mass Recruitment / Talent Hiring'
          : q.includes('gst') || q.includes('legal') || q.includes('compliance') || q.includes('registration')
            ? 'Corporate / Legal & GST Compliance'
            : 'Project Proposal & Development';

    const serviceName = sectorObj?.services[0]?.title.en;
    const prefillAction: AssistantAction = {
      type: 'prefill_contact',
      label: `Open Pre-Filled ${sectorObj ? sectorObj.name : 'Corporate'} Request Form`,
      sectorSlug: sectorObj?.slug,
      serviceName,
      engagementType,
    };

    const article = /^[aeiou]/i.test(engagementType) ? 'an' : 'a';
    const text = `I can help you submit ${article} ${engagementType} request${sectorObj ? ` under ${sectorObj.name}` : ''}. Our Service Request Desk dispatches details directly to ${COMPANY_DETAILS.officialEmail} with sector and service selection. Click below and I will pre-fill the form for you right away!`;
    return {
      text,
      speechText: sanitizeForSpeech(text),
      intentLabel: 'Proposal & MoU Desk',
      actions: [
        prefillAction,
        { type: 'navigate', label: 'How to Engage Roadmap', view: 'how-to-engage' },
      ],
      autoExecuteAction: wantsNavigation ? prefillAction : undefined,
      nextContext: { lastTopic: 'proposal', lastSectorSlug: sectorObj?.slug },
    };
  }

  // 3. Founder — Mr. Jigyasu Vatsa
  if (
    hasAny(q, [
      'founder',
      'jigyasu',
      'vatsa',
      'portfolio',
      'author',
      'mastering dsa',
      'creator',
      'who built',
      'who made',
      'ideation',
    ])
  ) {
    const navFounder: AssistantAction = {
      type: 'navigate',
      label: 'Open Founder Page',
      view: 'about-founder',
    };
    const text = `Mr. Jigyasu Vatsa (M.Tech (CSE) · MBA · Researcher) is the Founder, Director & Chief Technology Architect of JIGSY INDIA. He conceived the JIGSY vision on October 3, 2010 and incorporated the company in September 2025 across 6 divisions. His academic and industry background spans 12th from KVS with Computer Science (May 2019 – June 2021), B.Tech (CSE with add-on AI/ML), IRCTC Internships, M.Tech (CSE) from Sandip University, and MBA. He authored "Mastering DSA Without Fear" (June 2026, Amazon ISBN 979-8181718425) and published 5 peer-reviewed papers across Springer Nature (WoS), Taylor & Francis (Scopus), GTISD, FAIR, and Vedanjali Research Journal. Explore his dedicated portfolio at ${COMPANY_DETAILS.founderPortfolioUrl}.`;
    return {
      text,
      speechText: sanitizeForSpeech(text),
      intentLabel: 'Founder Profile',
      actions: [
        navFounder,
        { type: 'external_link', label: 'Visit jigyasu.jigsy.in', url: COMPANY_DETAILS.founderPortfolioUrl },
        { type: 'navigate', label: 'Board of Directors', view: 'about-directors' },
      ],
      autoExecuteAction: wantsNavigation ? navFounder : undefined,
      nextContext: { lastTopic: 'founder' },
    };
  }

  // 4. Board of Directors
  if (hasAny(q, ['director', 'directors', 'subhash', 'board', 'leadership', 'governance'])) {
    const navDirectors: AssistantAction = {
      type: 'navigate',
      label: 'Open Board of Directors',
      view: 'about-directors',
    };
    const text =
      'JIGSY INDIA is governed by two Directors: Mr. Subhash Chandra Jha (Director & Strategic Governance Lead, overseeing corporate administration, statutory governance, and national media outreach) and Mr. Jigyasu Vatsa (Founder, Director & Chief Technology Architect, leading engineering, R&D, and multi-sector implementation).';
    return {
      text,
      speechText: sanitizeForSpeech(text),
      intentLabel: 'Board of Directors',
      actions: [
        navDirectors,
        { type: 'navigate', label: 'Founder Ideation Page', view: 'about-founder' },
        { type: 'navigate', label: 'About Company', view: 'about-company' },
      ],
      autoExecuteAction: wantsNavigation ? navDirectors : undefined,
      nextContext: { lastTopic: 'directors' },
    };
  }

  // 5. Dedicated Youth / Internship Portal (youth.jigsy.in)
  if (
    hasAny(q, [
      'internship',
      'internships',
      'youth.jigsy.in',
      'jigsy youth',
      'apprenticeship',
      'student exposure',
      'fee waiver',
    ])
  ) {
    const text = `JIGSY Youth is our youth-engagement division dedicated to practical student exposure for a better India (with 100% course tuition fee waiver). All live internship enrollments, cohorts, and track registrations are handled on our dedicated Youth portal at ${COMPANY_DETAILS.youthPortalUrl}.`;
    return {
      text,
      speechText: sanitizeForSpeech(text),
      intentLabel: 'JIGSY Youth Portal',
      actions: [
        { type: 'external_link', label: 'Visit youth.jigsy.in ↗', url: COMPANY_DETAILS.youthPortalUrl },
        { type: 'navigate', label: 'View JIGSY Youth Division', view: 'sector-detail', sectorSlug: 'youth' },
        {
          type: 'prefill_contact',
          label: 'College / Campus MoU Request',
          sectorSlug: 'edutech',
          engagementType: 'Institutional MoU & Academic Tie-Up',
        },
      ],
      nextContext: { lastTopic: 'youth', lastSectorSlug: 'youth' },
    };
  }

  // 6. Careers & Hiring
  if (hasAny(q, ['career', 'careers', 'job', 'jobs', 'opening', 'vacancy', 'hiring', 'recruit', 'apply job'])) {
    const navCareers: AssistantAction = {
      type: 'navigate',
      label: 'Open Careers Page',
      view: 'careers',
    };
    const text =
      'There are no active corporate openings right now at JIGSY INDIA. However, professionals can submit their profiles to our Talent Pool on the Careers page for upcoming roles. For student internships, please visit youth.jigsy.in.';
    return {
      text,
      speechText: sanitizeForSpeech(text),
      intentLabel: 'Careers & Talent Pool',
      actions: [
        navCareers,
        { type: 'external_link', label: 'Student Internships (youth.jigsy.in)', url: COMPANY_DETAILS.youthPortalUrl },
      ],
      autoExecuteAction: wantsNavigation ? navCareers : undefined,
      nextContext: { lastTopic: 'careers' },
    };
  }

  // 7. Credential & Employee Verification (Temporarily Disabled)
  if (hasAny(q, ['verify', 'verification', 'employee id', 'certificate check', 'credential', 'authentic'])) {
    const text =
      'Our public Employee Verification portal is temporarily offline while we upgrade our corporate registry. For urgent official HR or credential verification, please submit a request directly through our Contact form and our team will assist promptly.';
    return {
      text,
      speechText: sanitizeForSpeech(text),
      intentLabel: 'Verification Notice',
      actions: [
        {
          type: 'prefill_contact',
          label: 'Request Official HR Verification',
          engagementType: 'General Corporate Inquiry',
        },
        { type: 'navigate', label: 'View Status Notice', view: 'verification' },
      ],
      nextContext: { lastTopic: 'verification' },
    };
  }

  // 8. How to Engage / Join
  if (hasAny(q, ['how to engage', 'how to join', 'onboard', 'work with', 'engage', 'roadmap', 'process'])) {
    const navEngage: AssistantAction = {
      type: 'navigate',
      label: 'Open How to Engage',
      view: 'how-to-engage',
    };
    const text =
      'Engaging with JIGSY INDIA is tailored to your role: Commercial clients can submit sector-specific service proposals; colleges and universities can sign Institutional MoUs for campus incubation and industrial training; professionals can submit their profile to our Talent Pool via Careers; and students can join JIGSY Youth internships at youth.jigsy.in.';
    return {
      text,
      speechText: sanitizeForSpeech(text),
      intentLabel: 'Engagement Pathways',
      actions: [
        navEngage,
        { type: 'prefill_contact', label: 'Submit Service Request', engagementType: 'Strategic Collaboration / Partnership' },
      ],
      autoExecuteAction: wantsNavigation ? navEngage : undefined,
      nextContext: { lastTopic: 'engage' },
    };
  }

  // 9. Statutory Registrations & Company Profile
  if (
    hasAny(q, [
      'cin',
      'dpiit',
      'gstin',
      'msme',
      'udyam',
      'about company',
      'about jigsy',
      'registered',
      'registration',
      'darbhanga',
      'bihar',
      'motto',
      'tagline',
      'incorporated',
      '2010',
    ])
  ) {
    const navCompany: AssistantAction = {
      type: 'navigate',
      label: 'Open About Company',
      view: 'about-company',
    };
    const text = `JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED (JIGSY INDIA) was conceived on October 3, 2010 and incorporated in 2025 from Darbhanga, Bihar. Statutory registrations: CIN ${COMPANY_DETAILS.cin}, DPIIT ${COMPANY_DETAILS.dpiit}, GSTIN ${COMPANY_DETAILS.gstin}, and MSME ${COMPANY_DETAILS.msme}. Our Sanskrit tagline is "${COMPANY_DETAILS.taglineSanskrit}".`;
    return {
      text,
      speechText: sanitizeForSpeech(text),
      intentLabel: 'Corporate Credentials',
      actions: [
        navCompany,
        { type: 'navigate', label: 'Founder Page', view: 'about-founder' },
        { type: 'navigate', label: 'Directors Page', view: 'about-directors' },
      ],
      autoExecuteAction: wantsNavigation ? navCompany : undefined,
      nextContext: { lastTopic: 'company' },
    };
  }

  // 10. Specific Sector Inquiry (All 6 Sectors)
  if (sectorMatch) {
    const sector = SECTORS.find((s) => s.slug === sectorMatch.slug);
    if (sector) {
      const serviceList = sector.services.map((srv) => srv.title.en).join(', ');
      const projectList = sector.featuredProjects.map((p) => p.title.en).join('; ');
      const navSector: AssistantAction = {
        type: 'navigate',
        label: `Explore ${sector.name}`,
        view: 'sector-detail',
        sectorSlug: sector.slug,
      };
      const actions: AssistantAction[] = [
        navSector,
        {
          type: 'prefill_contact',
          label: `Request ${sector.name} Service`,
          sectorSlug: sector.slug,
          serviceName: sector.services[0]?.title.en,
          engagementType: 'Project Proposal & Development',
        },
      ];
      if (sector.slug === 'youth') {
        actions.push({
          type: 'external_link',
          label: 'Visit youth.jigsy.in ↗',
          url: COMPANY_DETAILS.youthPortalUrl,
        });
      }

      const text = `${sector.name} (${sector.code}) focuses on: ${sector.motto.en}. Key services include ${serviceList}. Highlighted work: ${projectList}. Would you like to explore the full division page or submit a direct service request to jigsy25@gmail.com?`;
      return {
        text,
        speechText: sanitizeForSpeech(text),
        intentLabel: sector.name,
        actions,
        autoExecuteAction: wantsNavigation ? navSector : undefined,
        nextContext: { lastTopic: 'sector', lastSectorSlug: sector.slug },
      };
    }
  }

  // 11. All Sectors / Services Overview
  if (hasAny(q, ['sector', 'sectors', 'service', 'services', 'what do you do', 'offerings', 'divisions', 'company activities'])) {
    const navSectors: AssistantAction = {
      type: 'navigate',
      label: 'Explore All 6 Sectors',
      view: 'sectors',
    };
    const text =
      'JIGSY INDIA operates across 6 integrated corporate sectors: (1) JIGSY Tech — Web & Application Development, SaaS, Database & Cloud Management; (2) JIGSY Consult — Company Registration, Tax & GST Compliance, Legal & Business Advisory; (3) JIGSY R&D — Applied Research, Algorithm Prototyping & Academic Collaboration; (4) JIGSY DigiTech — Book & ISBN Publishing, Digital Media & Branding; (5) JIGSY EduTech — Industrial Training, In-Campus Incubation & Skill Labs; and (6) JIGSY Youth — Student Internships & Youth Skill Exposure (hosted separately at youth.jigsy.in).';
    return {
      text,
      speechText: sanitizeForSpeech(text),
      intentLabel: '6 Corporate Sectors',
      actions: [
        navSectors,
        { type: 'prefill_contact', label: 'Request a Sector Service', engagementType: 'Project Proposal & Development' },
      ],
      autoExecuteAction: wantsNavigation ? navSectors : undefined,
      nextContext: { lastTopic: 'sectors' },
    };
  }

  // 12. Contact & Office Info
  if (hasAny(q, ['contact', 'email', 'phone', 'call', 'address', 'office', 'reach', 'support', 'whatsapp'])) {
    const navContact: AssistantAction = {
      type: 'navigate',
      label: 'Open Contact & Request Form',
      view: 'contact',
    };
    const text = `You can reach JIGSY INDIA directly via email at ${COMPANY_DETAILS.officialEmail}, telephone at ${COMPANY_DETAILS.officialPhone}, or our registered office at ${COMPANY_DETAILS.registeredOffice}. You can also submit a sector-specific service request right from our portal—it delivers straight to jigsy25@gmail.com.`;
    return {
      text,
      speechText: sanitizeForSpeech(text),
      intentLabel: 'Corporate Contact',
      actions: [
        navContact,
        { type: 'prefill_contact', label: 'Fill Service Request Form', engagementType: 'General Corporate Inquiry' },
      ],
      autoExecuteAction: wantsNavigation ? navContact : undefined,
      nextContext: { lastTopic: 'contact' },
    };
  }

  // 13. Contextual Follow-Up Handler ("tell me more", "what services", "how to contact them")
  if (hasAny(q, ['more', 'details', 'explain', 'elaborate', 'tell me', 'next'])) {
    if (context.lastSectorSlug) {
      const sector = SECTORS.find((s) => s.slug === context.lastSectorSlug);
      if (sector) {
        const ops = sector.coreOperations.en.slice(0, 3).join('; ');
        const text = `More on ${sector.name}: ${sector.fullDescription.en} Core operations include ${ops}.`;
        return {
          text,
          speechText: sanitizeForSpeech(text),
          intentLabel: `${sector.name} Deep Dive`,
          actions: [
            { type: 'navigate', label: `Open ${sector.name} Page`, view: 'sector-detail', sectorSlug: sector.slug },
            {
              type: 'prefill_contact',
              label: `Send ${sector.name} Proposal`,
              sectorSlug: sector.slug,
              engagementType: 'Project Proposal & Development',
            },
          ],
          nextContext: context,
        };
      }
    }
    if (context.lastTopic === 'founder') {
      const text = `Mr. Jigyasu Vatsa bridged his October 3, 2010 vision into a DPIIT-recognized multi-sector enterprise in 2025. You can inspect his complete research papers, engineering systems, and books on our Founder page or visit his dedicated portfolio at ${COMPANY_DETAILS.founderPortfolioUrl}.`;
      return {
        text,
        speechText: sanitizeForSpeech(text),
        intentLabel: 'Founder Deep Dive',
        actions: [
          { type: 'navigate', label: 'Open Founder Page', view: 'about-founder' },
          { type: 'external_link', label: 'Open jigyasu.jigsy.in', url: COMPANY_DETAILS.founderPortfolioUrl },
        ],
        nextContext: context,
      };
    }
  }

  // 14. Helpful Guided Fallback
  const fallbackText =
    'I am JIGSY, JIGSY INDIA’s interactive corporate AI assistant. I can explain any of our 6 sectors (Tech, Consult, R&D, DigiTech, EduTech, Youth), open our Founder or Directors pages, show Careers & Talent Pool, guide you on How to Engage, or pre-fill a Collaboration / MoU / Service Proposal form directly to jigsy25@gmail.com. Choose a quick action below or ask me directly!';
  return {
    text: fallbackText,
    speechText: sanitizeForSpeech(fallbackText),
    intentLabel: 'Corporate Guide',
    actions: [
      { type: 'navigate', label: 'All 6 Sectors & Services', view: 'sectors' },
      { type: 'prefill_contact', label: 'Submit Proposal / MoU', engagementType: 'Project Proposal & Development' },
      { type: 'navigate', label: 'Founder: Jigyasu Vatsa', view: 'about-founder' },
      { type: 'external_link', label: 'JIGSY Youth (youth.jigsy.in)', url: COMPANY_DETAILS.youthPortalUrl },
    ],
    nextContext: context,
  };
}

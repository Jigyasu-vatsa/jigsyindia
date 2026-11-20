import { Language } from '../types';

export interface UiCopySet {
  nav: {
    marquee: string;
    home: string;
    sectorsServices: string;
    allSectorsOverview: string;
    about: string;
    aboutCompany: string;
    aboutCompanySub: string;
    founder: string;
    founderSub: string;
    directors: string;
    directorsSub: string;
    howToEngage: string;
    howToEngageSub: string;
    careers: string;
    contact: string;
    requestService: string;
    youthPortal: string;
    lightMode: string;
    darkMode: string;
    adminDesk: string;
  };
  hero: {
    ribbons: string[];
    badge: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaTertiary: string;
    stat1Val: string;
    stat1Lbl: string;
    stat2Val: string;
    stat2Lbl: string;
    stat3Val: string;
    stat3Lbl: string;
    exploreSlidePrefix: string;
    slides: {
      title: string;
      subtitle: string;
      tag: string;
      slug: string;
    }[];
  };
  home: {
    sectorsBadge: string;
    sectorsTitle: string;
    sectorsSubtitle: string;
    allSectorsFilter: string;
    servicesOffered: string;
    serviceUnit: string;
    servicesUnit: string;
    featuredWork: string;
    exploreDivision: string;
    requestService: string;
    // New Section 1: Why JIGSY INDIA (Execution Pillars)
    pillarsBadge: string;
    pillarsTitle: string;
    pillarsSubtitle: string;
    pillars: { title: string; metric: string; desc: string }[];
    // New Section 2: Flagship Works & Solutions Portfolio
    worksBadge: string;
    worksTitle: string;
    worksSubtitle: string;
    worksAll: string;
    worksInquire: string;
    worksVisit: string;
    // New Section 3: How We Collaborate (Clients & Professionals Roadmap)
    collabBadge: string;
    collabTitle: string;
    collabSubtitle: string;
    forClientsTitle: string;
    forClientsBadge: string;
    forClientsSteps: { title: string; desc: string }[];
    forClientsCta: string;
    forProfessionalsTitle: string;
    forProfessionalsBadge: string;
    forProfessionalsSteps: { title: string; desc: string }[];
    forProfessionalsCta: string;
    fullRoadmapLink: string;
    // Leadership Directory
    leadershipEyebrow: string;
    leadershipTitle: string;
    aboutCompanyTitle: string;
    aboutCompanyDesc: string;
    aboutCompanyCta: string;
    founderTitle: string;
    founderDesc: string;
    founderCta: string;
    directorsTitle: string;
    directorsDesc: string;
    directorsCta: string;
    careersTitle: string;
    careersDesc: string;
    careersCta: string;
    // Compact Youth Spotlight
    youthBadge: string;
    youthTitle: string;
    youthDesc: string;
    youthCta: string;
    campusMouCta: string;
  };
  sectorsPage: {
    badge: string;
    title: string;
    subtitle: string;
    activeDivision: string;
    profileHeading: string;
    deliverablesHeading: string;
    coreOpsHeading: string;
    servicesHeadingPrefix: string;
    caseStudiesHeading: string;
    requestDivisionCta: string;
    visitYouthCta: string;
    consultTitlePrefix: string;
    consultSubtitle: string;
  };
  aboutPage: {
    badge: string;
    title: string;
    mottoLabel: string;
    taglineLabel: string;
    storyTitle: string;
    storyPara1: string;
    storyPara2: string;
    milestoneTitle: string;
    milestoneText: string;
    visionTitle: string;
    visionBullets: string[];
    registeredOffice: string;
    conceived: string;
    incorporated: string;
    divisions: string;
    proposalCta: string;
    footprintBadge: string;
    footprintTitle: string;
    inspectAll: string;
    coreServicesUnit: string;
    openFounderCta: string;
    viewDirectorsCta: string;
    openEngageCta: string;
  };
  founderPage: {
    roleLine: string;
    badge: string;
    headlinePrefix: string;
    headlineHighlight: string;
    bioExtra: string;
    stat1Lbl: string;
    stat2Lbl: string;
    stat3Lbl: string;
    stat4Lbl: string;
    collaborateCta: string;
    directorsCta: string;
    tabIdeation: string;
    tabImplementation: string;
    tabResearch: string;
    architectedActive: string;
    inspectArchitecturePrefix: string;
    bookBadge: string;
    bookDesc: string;
    papersHeading: string;
    milestone1Title: string;
    milestone1Desc: string;
    milestone2Title: string;
    milestone2Desc: string;
    milestone3Title: string;
    milestone3Desc: string;
    portfolioBadge: string;
    portfolioTitle: string;
    portfolioDesc: string;
    timeline: { year: string; phase: string; title: string; desc: string }[];
  };
  directorsPage: {
    badge: string;
    title: string;
    subtitle: string;
    boardMandate: string;
    hideOversight: string;
    showOversight: string;
    readFounderPage: string;
    connectGovernance: string;
    assurance1Title: string;
    assurance1Desc: string;
    assurance2Title: string;
    assurance2Desc: string;
    assurance3Title: string;
    assurance3Desc: string;
    profiles: {
      badge: string;
      mandate: string;
      focusAreas: string[];
      quote: string;
    }[];
  };
  engagePage: {
    badge: string;
    title: string;
    subtitle: string;
    pathways: {
      id: 'enterprise' | 'academic' | 'careers' | 'youth';
      label: string;
      badge: string;
      title: string;
      summary: string;
      steps: { title: string; detail: string }[];
      ctaLabel: string;
    }[];
  };
  careersPage: {
    badge: string;
    title: string;
    subtitle: string;
    postReqBtn: string;
    noOpeningsBadge: string;
    noOpeningsTitle: string;
    noOpeningsDesc: string;
    talentPoolBtn: string;
    linkedinBtn: string;
    whyJoinTitle: string;
    whyJoinPoints: { title: string; desc: string }[];
    youthBannerTitle: string;
    youthBannerDesc: string;
    youthBannerCta: string;
    talentModalTitle: string;
    talentModalSub: string;
    talentSuccessTitle: string;
    talentSuccessDesc: string;
    hireModalTitle: string;
    hireModalSub: string;
    hireSuccessTitle: string;
    hireSuccessDesc: string;
    fields: {
      fullName: string;
      email: string;
      phone: string;
      preferredSector: string;
      experience: string;
      portfolioUrl: string;
      note: string;
      companyName: string;
      contactPerson: string;
      roleTitle: string;
      location: string;
      workType: string;
      budget: string;
      reqDetails: string;
      submitBtn: string;
      submittingBtn: string;
    };
  };
  contact: {
    pageBadge: string;
    pageTitle: string;
    pageSubtitle: string;
    modalEyebrow: string;
    modalTitle: string;
    modalSubtitle: string;
    infoEyebrow: string;
    infoTitle: string;
    infoDesc: string;
    officeLabel: string;
    emailLabel: string;
    phoneLabel: string;
    responsePromise: string;
    formTitle: string;
    formSubtitle: string;
    sectorLabel: string;
    generalCorporateOption: string;
    serviceLabel: string;
    customServiceOption: string;
    engagementTypeLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    emailInputLabel: string;
    emailPlaceholder: string;
    phoneInputLabel: string;
    phonePlaceholder: string;
    orgLabel: string;
    orgPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    detailsLabel: string;
    detailsPlaceholder: string;
    captchaError: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successDesc: string;
    submitAnother: string;
    closeModal: string;
    engagementTypes: Record<string, string>;
  };
  feedback: {
    badge: string;
    title: string;
    subtitle: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    roleLabel: string;
    rolePlaceholder: string;
    ratingLabel: string;
    commentLabel: string;
    commentPlaceholder: string;
    submitBtn: string;
    successMsg: string;
    captchaError: string;
  };
  captcha: {
    label: string;
    placeholder: string;
    helper: string;
    refreshTitle: string;
  };
  footer: {
    contactHeading: string;
    sectorsHeading: string;
    companyHeading: string;
    connectHeading: string;
    allSectors: string;
    aboutCompany: string;
    founder: string;
    directors: string;
    howToEngage: string;
    careers: string;
    contactUs: string;
    privacyPolicy: string;
    termsConditions: string;
    cookiePolicy: string;
    founderPortfolio: string;
    adminDesk: string;
    developedBy: string;
    rightsReserved: string;
  };
  legal: {
    privacyTab: string;
    termsTab: string;
    consentNote: string;
    closeBtn: string;
    acceptBtn: string;
    acceptedBadge: string;
  };
  errors: {
    notFoundBadge: string;
    notFoundTitle: string;
    notFoundDesc: string;
    pdfBadge: string;
    pdfTitle: string;
    pdfDesc: string;
    verificationBadge: string;
    verificationTitle: string;
    verificationDesc: string;
    runtimeBadge: string;
    runtimeTitle: string;
    runtimeDesc: string;
    cookieBadge: string;
    cookieTitle: string;
    cookieDesc: string;
    requestedPathLabel: string;
    triviaLabel: string;
    nextFactBtn: string;
    goHomeBtn: string;
    exploreSectorsBtn: string;
    contactUsBtn: string;
    reloadBtn: string;
    facts: string[];
  };
}

export const UI_COPY: Record<Language, UiCopySet> = {
  en: {
    nav: {
      marquee:
        'Multi-Sector Enterprise · Software & Cloud · Business Consultancy · Applied R&D · ISBN Publishing · EduTech & Campus Incubation · Youth Internships: youth.jigsy.in',
      home: 'Home',
      sectorsServices: 'Sectors & Services',
      allSectorsOverview: 'All 6 Sectors Overview',
      about: 'About',
      aboutCompany: 'About Company',
      aboutCompanySub: 'Heritage, Mission & 6 Divisions',
      founder: 'Founder — Mr. Jigyasu Vatsa',
      founderSub: 'Ideation, Implementation & Portfolio',
      directors: 'Board of Directors',
      directorsSub: 'Mr. Subhash Chandra Jha & Mr. Jigyasu Vatsa',
      howToEngage: 'How to Engage',
      howToEngageSub: 'Clients, MoUs, Careers & Youth',
      careers: 'Careers',
      contact: 'Contact Us',
      requestService: 'Request Service',
      youthPortal: 'Youth Portal',
      lightMode: 'Light',
      darkMode: 'Dark',
      adminDesk: 'Admin Desk',
    },
    hero: {
      ribbons: [
        'JIGSY INDIA · Multi-Sector Enterprise delivering Software, Consultancy, R&D, Publishing & EduTech',
        'Open for Corporate Collaborations, Project Proposals, Institutional MoUs & Campus Incubation',
        'ॐ जिज्ञासु ईक्षण ग्रंथि समृद्धि युक्ति · JIGYASU INTEGRATED GLOBAL SERVICES with YOU ॐ',
      ],
      badge: 'DPIIT Recognized Startup · Est. Vision 2010',
      titleLine1: 'Integrated Global Services',
      titleLine2: 'Across Six Specialized Sectors',
      description:
        'JIGSY INDIA unites six specialized divisions — Software & Cloud, Business Consultancy, Applied R&D, Publishing & Media, EduTech Training, and Youth Exposure — serving enterprises, institutions, and learners.',
      ctaPrimary: 'Request a Service',
      ctaSecondary: 'Explore All 6 Sectors',
      ctaTertiary: 'How to Engage',
      stat1Val: '6 Sectors',
      stat1Lbl: 'Integrated Operating Divisions',
      stat2Val: 'DPIIT · MSME',
      stat2Lbl: 'Registered & GST Verified',
      stat3Val: 'Global Reach',
      stat3Lbl: 'Technology, Advisory & Research',
      exploreSlidePrefix: 'Explore',
      slides: [
        {
          title: 'Web, SaaS & Enterprise Cloud Systems',
          subtitle: 'Scalable software applications, database engineering, and IT support delivered by JIGSY Tech.',
          tag: 'JIGSY Tech',
          slug: 'tech',
        },
        {
          title: 'Global ISBN Publishing & Applied R&D',
          subtitle: 'Authoring, ISBN publishing, and peer-reviewed research collaborations across JIGSY R&D & DigiTech.',
          tag: 'JIGSY R&D & DigiTech',
          slug: 'digitech',
        },
        {
          title: 'Campus Incubation & Youth Skill Exposure',
          subtitle: 'Industrial training programs and institutional incubation powered by JIGSY EduTech & youth.jigsy.in.',
          tag: 'JIGSY EduTech & Youth',
          slug: 'edutech',
        },
      ],
    },
    home: {
      sectorsBadge: 'All 6 Sectors & Services',
      sectorsTitle: 'Corporate Divisions & Generic Service Portfolio',
      sectorsSubtitle:
        'Explore our six operating divisions and core services. Hover over any card to preview featured works, or open a quick request right from here.',
      allSectorsFilter: 'All 6 Sectors',
      servicesOffered: 'Core Services',
      serviceUnit: 'Service',
      servicesUnit: 'Services',
      featuredWork: 'Featured Highlight',
      exploreDivision: 'Explore Division',
      requestService: 'Request Service',
      pillarsBadge: 'Why Partner With JIGSY INDIA',
      pillarsTitle: 'Four Pillars of Integrated Execution',
      pillarsSubtitle:
        'Every engagement combines engineering discipline, statutory accountability, research depth, and responsive client communication.',
      pillars: [
        {
          title: 'Multi-Sector Synergy',
          metric: '6 Divisions',
          desc: 'Technology, legal incorporation, digital media, research, and training delivered seamlessly under one corporate roof.',
        },
        {
          title: 'Statutory & DPIIT Integrity',
          metric: 'MCA · GST · MSME',
          desc: 'Fully registered private limited enterprise with transparent invoicing, documented milestones, and ethical governance.',
        },
        {
          title: 'Research-Backed Engineering',
          metric: 'Springer · T&F',
          desc: 'Solutions grounded in algorithmic rigor, peer-reviewed publications, and practical system reliability.',
        },
        {
          title: 'Rooted in Bharat, Built Globally',
          metric: 'Pan-India & Global',
          desc: 'Headquartered in Darbhanga, Bihar, delivering remote and hybrid engagements for enterprises and colleges everywhere.',
        },
      ],
      worksBadge: 'Flagship Works & Solutions',
      worksTitle: 'Selected Deliverables Across Our Divisions',
      worksSubtitle:
        'Inspect active deployments, published volumes, compliance desks, and institutional initiatives engineered by our teams.',
      worksAll: 'All Works',
      worksInquire: 'Inquire Now',
      worksVisit: 'Open Portal',
      collabBadge: 'How to Engage & Collaborate',
      collabTitle: 'Simple Onboarding for Clients & Professionals',
      collabSubtitle:
        'Whether you are commissioning a project, proposing an institutional MoU, or registering your interest for upcoming roles, our workflow is clear and transparent.',
      forClientsTitle: 'For Clients & Institutional Partners',
      forClientsBadge: 'B2B · Projects · MoUs',
      forClientsSteps: [
        {
          title: '1. Submit Your Service Request',
          desc: 'Choose the relevant sector, service, and engagement type using our quick Contact Modal without leaving your page.',
        },
        {
          title: '2. Scope & Proposal Review',
          desc: 'Our leadership and division specialists evaluate requirements, timelines, and compliance checkpoints promptly.',
        },
        {
          title: '3. Transparent Milestone Agreement',
          desc: 'Align on deliverables, communication cadence, and commercial or institutional MoU terms clearly up front.',
        },
        {
          title: '4. Execution & Ongoing Support',
          desc: 'Receive production-ready deliverables backed by documentation and dedicated post-delivery assistance.',
        },
      ],
      forClientsCta: 'Start a Service Request',
      forProfessionalsTitle: 'For Professionals & Jobseekers',
      forProfessionalsBadge: 'Talent Pool · Future Roles',
      forProfessionalsSteps: [
        {
          title: '1. Explore Our 6 Operating Sectors',
          desc: 'Understand where your technical, legal, research, creative, or academic skills best align across JIGSY INDIA.',
        },
        {
          title: '2. Join the JIGSY Talent Pool',
          desc: 'Submit your profile and resume link through our Careers desk so our HR team can reach out as new openings arise.',
        },
        {
          title: '3. Student Internships via JIGSY Youth',
          desc: 'Students seeking structured industrial exposure and internships can register directly on youth.jigsy.in.',
        },
        {
          title: '4. Structured Review & Updates',
          desc: 'Shortlisted profiles receive direct interview schedules and official communication from our recruiting desk.',
        },
      ],
      forProfessionalsCta: 'Visit Careers Desk',
      fullRoadmapLink: 'View Detailed Engagement Roadmap',
      leadershipEyebrow: 'Governance · Ideation · Careers',
      leadershipTitle: 'Explore Leadership, Heritage & Opportunities',
      aboutCompanyTitle: 'About Company',
      aboutCompanyDesc: 'Conceived on October 3, 2010 and incorporated in 2025 with DPIIT, MSME, and GST recognition.',
      aboutCompanyCta: 'Read Company Story',
      founderTitle: 'Founder — Mr. Jigyasu Vatsa',
      founderDesc: 'Dedicated page covering ideation, systems implementation, research publications, authored book & jigyasu.jigsy.in.',
      founderCta: 'Explore Founder Page',
      directorsTitle: 'Board of Directors',
      directorsDesc: 'Meet both Directors — Mr. Subhash Chandra Jha & Mr. Jigyasu Vatsa — guiding corporate governance.',
      directorsCta: 'Meet Both Directors',
      careersTitle: 'Careers & Talent Desk',
      careersDesc: 'Check current corporate hiring status or submit your profile to the JIGSY INDIA Talent Pool.',
      careersCta: 'Open Careers Page',
      youthBadge: 'JIGSY Youth Initiative · Youth Exposure for a Better India',
      youthTitle: 'Dedicated Youth Internships & Student Skill Exposure Portal',
      youthDesc:
        'As part of JIGSY INDIA’s commitment to youth empowerment and practical exposure across India, our JIGSY Youth wing operates structured internships and mentorship on a separate dedicated portal at youth.jigsy.in.',
      youthCta: 'Visit youth.jigsy.in',
      campusMouCta: 'Campus MoU Inquiry',
    },
    sectorsPage: {
      badge: 'Specialized Corporate Ecosystem',
      title: 'Explore All 6 JIGSY INDIA Divisions',
      subtitle:
        'Select any division below to review its mandate, generic service offerings, core capabilities, and flagship deliverables.',
      activeDivision: 'Active Operating Division',
      profileHeading: 'Division Profile & Mandate',
      deliverablesHeading: 'Primary Deliverables',
      coreOpsHeading: 'Core Capabilities',
      servicesHeadingPrefix: 'Services Offered —',
      caseStudiesHeading: 'Featured Works & Highlights',
      requestDivisionCta: 'Request a Service from this Division',
      visitYouthCta: 'Visit youth.jigsy.in',
      consultTitlePrefix: 'Need a tailored proposal for',
      consultSubtitle: 'Open our quick Service Request form right here without losing your place on this page.',
    },
    aboutPage: {
      badge: 'About Company · Corporate Heritage & Mandate',
      title: 'About JIGSY INDIA',
      mottoLabel: 'Motto:',
      taglineLabel: 'Tagline:',
      storyTitle: 'From Vision to Multi-Sector Corporate Reality',
      storyPara1:
        'Conceived on October 3, 2010 and formally incorporated in 2025 as JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED, JIGSY INDIA was built to unify modern technology, trustworthy business consultancy, original research, publishing, and skill empowerment.',
      storyPara2:
        'Headquartered in Darbhanga, Bihar and serving organizations across India and globally, JIGSY INDIA operates six integrated divisions: JIGSY Tech, JIGSY Consult, JIGSY R&D, JIGSY DigiTech, JIGSY EduTech, and JIGSY Youth (hosted separately at youth.jigsy.in).',
      milestoneTitle: 'Foundational Milestone',
      milestoneText: 'Vision conceived on October 3, 2010 — incorporated as a DPIIT-recognized Private Limited enterprise in 2025.',
      visionTitle: 'Corporate Mission & Strategic Focus',
      visionBullets: [
        'Delivering dependable software, compliance, research, publishing, and training services under ethical corporate governance.',
        'Building lasting commercial partnerships, academic MoUs, and campus incubation programs.',
        'Supporting practical youth skill exposure across India through the dedicated JIGSY Youth portal.',
      ],
      registeredOffice: 'Registered Office:',
      conceived: 'Conceived:',
      incorporated: 'Incorporated:',
      divisions: 'Operating Divisions:',
      proposalCta: 'Submit a Corporate Request',
      footprintBadge: 'Multi-Sector Corporate Footprint',
      footprintTitle: 'Six Specialized Divisions Under One Entity',
      inspectAll: 'Inspect All Sectors',
      coreServicesUnit: 'Services',
      openFounderCta: 'Open Founder Page',
      viewDirectorsCta: 'View Both Directors',
      openEngageCta: 'Open Engagement Guide',
    },
    founderPage: {
      roleLine: 'Founder · Director · Chief Technology Architect',
      badge: 'Founder’s Ideation & Implementation Archive',
      headlinePrefix: 'From a 2010 Ideation Blueprint to a',
      headlineHighlight: 'Six-Division Global Enterprise',
      bioExtra:
        'Conceived on October 3, 2010, Mr. Jigyasu Vatsa architected JIGSY INDIA to connect computer science research, enterprise software engineering, statutory consultancy, global ISBN publishing, and youth mentorship under one cohesive organization.',
      stat1Lbl: 'Vision to Pvt Ltd',
      stat2Lbl: 'WoS, Scopus & ISBN',
      stat3Lbl: 'Mastering DSA Book',
      stat4Lbl: 'Industry Internships',
      collaborateCta: 'Connect with Founder’s Office',
      directorsCta: 'Board of Directors',
      tabIdeation: 'Ideation & Journey (2010–2026)',
      tabImplementation: '6-Division Implementation',
      tabResearch: '5 Research Works & 2026 Book',
      architectedActive: 'Active Division',
      inspectArchitecturePrefix: 'Explore',
      bookBadge: 'Global ISBN Publication · Amazon KDP (June 2026)',
      bookDesc:
        'Published in June 2026 (ISBN-13: 979-8181718425 · ASIN: B0H5QK7NF2). Independently authored technical textbook on Data Structures & Algorithms with clear intuition, complexity proofs, and practical engineering templates.',
      papersHeading: 'Peer-Reviewed Research & Proceedings (5 Works · 2025–2026)',
      milestone1Title: 'Academic Foundation (KVS, B.Tech, M.Tech & MBA)',
      milestone1Desc:
        'Completed 12th from Kendriya Vidyalaya (KVS) with Computer Science, B.Tech (CSE with add-on AI/ML), M.Tech (CSE) from Sandip University, and MBA.',
      milestone2Title: 'IRCTC Software & Database Internships',
      milestone2Desc:
        'Completed industry internships at IRCTC (New Delhi) covering enterprise database workflows, API integration, and production software engineering.',
      milestone3Title: 'Global ISBN Authorship & Indexed Research',
      milestone3Desc:
        'Authored "Mastering DSA Without Fear" (June 2026, Amazon KDP ISBN) and published 5 peer-reviewed works across Springer Nature (WoS), Taylor & Francis (Scopus), GTISD, FAIR, and Vedanjali Research Journal.',
      portfolioBadge: 'Founder’s Official Personal Portfolio',
      portfolioTitle: 'Explore Mr. Jigyasu Vatsa’s Complete Portfolio',
      portfolioDesc:
        'Read full research abstracts, software engineering repositories, publications, and speaking highlights directly on his dedicated portfolio site.',
      timeline: [
        {
          year: 'October 3, 2010',
          phase: 'Genesis & Ideation',
          title: 'Conception of the JIGSY Vision',
          desc: 'Formulated the founding motto uniting curiosity, multi-disciplinary integration, and dependable global service.',
        },
        {
          year: 'May 2019 – June 2021',
          phase: 'Academics & IRCTC Internships',
          title: '12th from KVS (CS), B.Tech (CSE · AI/ML) & IRCTC Internships',
          desc: 'Completed 12th from Kendriya Vidyalaya (KVS) with Computer Science as a subject, followed by B.Tech (CSE with add-on AI/ML) and industry internships at IRCTC.',
        },
        {
          year: 'Sep 2025 – Present',
          phase: 'Corporate Incorporation',
          title: 'Founder & Director, JIGYASU INTEGRATED GLOBAL SERVICES PVT. LTD.',
          desc: 'Incorporated JIGSY INDIA in Darbhanga with MCA, DPIIT Startup India, GST, and MSME registrations, spearheading full-stack engineering, IT architecture, and all six divisions.',
        },
        {
          year: '2026',
          phase: 'M.Tech, ISBN Book & Indexed Research',
          title: 'M.Tech (Sandip University), Authored Book (June 2026) & 5 Papers',
          desc: 'Pursuing M.Tech (CSE) from Sandip University alongside MBA, publishing "Mastering DSA Without Fear" globally on Amazon KDP (June 2026), and authoring 5 scholarly works across Springer Nature (WoS), Taylor & Francis (Scopus), GTISD, FAIR, and Vedanjali Research Journal.',
        },
      ],
    },
    directorsPage: {
      badge: 'Board of Directors · Executive Governance',
      title: 'Leadership Stewarding JIGSY INDIA',
      subtitle:
        'JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED is governed by two Directors combining administrative discipline, strategic outreach, and deep technical leadership.',
      boardMandate: 'Board Mandate',
      hideOversight: 'Hide Detailed Oversight Scope',
      showOversight: 'View Detailed Oversight & Focus Areas',
      readFounderPage: 'Open Founder’s Dedicated Page',
      connectGovernance: 'Connect for Governance & MoUs',
      assurance1Title: 'MCA & DPIIT Compliant',
      assurance1Desc: 'Incorporated under active MCA, DPIIT Startup India, GSTIN, and MSME registrations.',
      assurance2Title: 'Ethical Multi-Sector Delivery',
      assurance2Desc: 'Transparent scopes, documented agreements, and direct board accountability across all 6 sectors.',
      assurance3Title: 'Enterprise & Institutional Ready',
      assurance3Desc: 'Equipped for corporate contracts, university MoUs, incubation centers, and joint research.',
      profiles: [
        {
          badge: 'Executive Board · Governance',
          mandate: 'Corporate Governance, Administration & Strategic Media Outreach',
          focusAreas: [
            'Board-level statutory governance, MCA/ROC compliance oversight, and ethical policy stewardship',
            'Strategic administrative management across headquarters and regional operations',
            'Institutional relations, public communication, and national digital media positioning',
            'Commercial partnership oversight and long-term organizational alignment',
          ],
          quote:
            'Sustainable institutions are built on disciplined governance, transparent administration, and steadfast service to every partner and stakeholder.',
        },
        {
          badge: 'Founder · Technology & R&D',
          mandate: 'Technology Architecture, Applied R&D & Multi-Sector Implementation',
          focusAreas: [
            'Software engineering and cloud architecture across JIGSY Tech & JIGSY EduTech',
            'Applied research direction, peer-reviewed publications, and JIGSY R&D Cell leadership',
            'Global ISBN publishing ("Mastering DSA Without Fear") & institutional academic MoUs',
            'Youth mentorship design & practical skill-exposure strategy via JIGSY Youth',
          ],
          quote:
            'True innovation happens when deep foundational science translates into practical systems that uplift enterprises, institutions, and young minds alike.',
        },
      ],
    },
    engagePage: {
      badge: 'Interactive Engagement Roadmap',
      title: 'How to Engage with JIGSY INDIA',
      subtitle:
        'Select your profile below to view the exact onboarding steps for commercial services, institutional MoUs, careers, or student exposure.',
      pathways: [
        {
          id: 'enterprise',
          label: 'For Clients & Enterprises',
          badge: 'Projects · Advisory · Media',
          title: 'Commission Software, Consultancy, R&D, or Publishing Projects',
          summary:
            'Work directly with JIGSY Tech, JIGSY Consult, JIGSY R&D, or JIGSY DigiTech for custom software, business incorporation & compliance, applied research, or publishing campaigns.',
          steps: [
            {
              title: '1. Submit a Service Request',
              detail: 'Select your target sector, service, and scope through our Contact Modal without leaving your current page.',
            },
            {
              title: '2. Executive Scope & Architecture Review',
              detail: 'Our directors and division specialists evaluate technical or statutory requirements and respond promptly.',
            },
            {
              title: '3. Clear Proposal & Milestone Plan',
              detail: 'Review structured deliverables, timelines, and transparent terms before kickoff.',
            },
            {
              title: '4. Execution & Ongoing Partnership',
              detail: 'Receive documented deliverables, compliance clearance, and dedicated ongoing support.',
            },
          ],
          ctaLabel: 'Open Service Request Form',
        },
        {
          id: 'academic',
          label: 'Colleges & Institutional MoUs',
          badge: 'MoU · Incubation · Training',
          title: 'Institutional MoUs, Campus Incubation & Industrial Training',
          summary:
            'Colleges and universities partner with JIGSY EduTech and JIGSY R&D for structured MoUs, hybrid industrial training, workshops, and in-campus incubation centers.',
          steps: [
            {
              title: '1. Share Institutional Requirements',
              detail: 'Submit your institution profile, student disciplines, and preferred program format via our Contact Modal.',
            },
            {
              title: '2. Curriculum & Program Alignment',
              detail: 'We align workshops, training modules, and incubation labs with academic credit and industry benchmarks.',
            },
            {
              title: '3. Formal MoU Execution',
              detail: 'Execute a transparent institutional MoU detailing schedules, mentorship, and deliverables.',
            },
            {
              title: '4. Delivery & Joint Research Initiatives',
              detail: 'Run live technical workshops, skill labs, and collaborative research projects on campus.',
            },
          ],
          ctaLabel: 'Request Institutional MoU',
        },
        {
          id: 'careers',
          label: 'For Professionals & Jobseekers',
          badge: 'Talent Pool · Future Roles',
          title: 'Join the JIGSY INDIA Talent Pool',
          summary:
            'While there are no active corporate openings right now, professionals can submit their profiles to our Talent Pool for priority consideration when roles open.',
          steps: [
            {
              title: '1. Review Division Focus Areas',
              detail: 'Explore our six operating divisions to see where your experience creates the greatest impact.',
            },
            {
              title: '2. Submit Profile to Talent Pool',
              detail: 'Share your resume or portfolio link through the Careers page for future opportunities across JIGSY INDIA.',
            },
            {
              title: '3. Follow Official Updates',
              detail: 'Stay updated on new corporate role announcements via our official LinkedIn page.',
            },
            {
              title: '4. Direct HR Communication',
              detail: 'Our team maintains confidential records and reaches out directly for matching opportunities.',
            },
          ],
          ctaLabel: 'Open Careers Page',
        },
        {
          id: 'youth',
          label: 'Youth Exposure & Internships',
          badge: 'Hosted at youth.jigsy.in',
          title: 'JIGSY Youth — Student Exposure for a Better India',
          summary:
            'Student internships and youth exposure initiatives are managed exclusively on our dedicated portal at youth.jigsy.in across undergraduate and postgraduate streams.',
          steps: [
            {
              title: '1. Visit youth.jigsy.in',
              detail: 'Explore active internship programs, training cohorts, and youth exposure initiatives.',
            },
            {
              title: '2. Choose Your Learning Track',
              detail: 'Select a structured program aligned with your academic stream and career goals.',
            },
            {
              title: '3. Guided Project Exposure',
              detail: 'Gain practical workplace experience and mentorship alongside structured assignments.',
            },
            {
              title: '4. Completion Credentials',
              detail: 'Receive official completion documentation upon meeting evaluation and attendance criteria.',
            },
          ],
          ctaLabel: 'Visit youth.jigsy.in',
        },
      ],
    },
    careersPage: {
      badge: 'Corporate Careers & Talent Desk',
      title: 'Careers at JIGSY INDIA',
      subtitle:
        'Explore career opportunities across our six operating sectors or share your profile for upcoming positions.',
      postReqBtn: 'Post a Hiring Requirement',
      noOpeningsBadge: 'Current Hiring Status',
      noOpeningsTitle: 'No Current Openings Right Now',
      noOpeningsDesc:
        'We do not have any active corporate job vacancies open at this moment. However, we welcome talented engineers, researchers, legal associates, designers, and educators to submit their profiles to our Talent Pool for upcoming roles.',
      talentPoolBtn: 'Submit Profile to Talent Pool',
      linkedinBtn: 'Follow Updates on LinkedIn',
      whyJoinTitle: 'Working with JIGSY INDIA',
      whyJoinPoints: [
        {
          title: 'Cross-Sector Exposure',
          desc: 'Work across enterprise software, applied research, publishing, legal advisory, and institutional innovation.',
        },
        {
          title: 'Ethical & Transparent Culture',
          desc: 'Structured mentorship, clear deliverables, and direct collaboration with company leadership.',
        },
        {
          title: 'Flexible Remote & Hybrid Work',
          desc: 'Balanced collaboration supporting talent across Darbhanga, Bihar, and pan-India remote teams.',
        },
      ],
      youthBannerTitle: 'Looking for Student Internships?',
      youthBannerDesc:
        'Student internship programs and youth skill exposure cohorts are handled separately on our dedicated JIGSY Youth portal at youth.jigsy.in.',
      youthBannerCta: 'Visit youth.jigsy.in',
      talentModalTitle: 'Submit Profile to Talent Pool',
      talentModalSub: 'Share your resume or portfolio link for future openings across JIGSY INDIA.',
      talentSuccessTitle: 'Profile Submitted Successfully',
      talentSuccessDesc: 'Thank you for your interest in JIGSY INDIA. Our HR desk will review your profile when matching roles open.',
      hireModalTitle: 'Post a Hiring Requirement',
      hireModalSub: 'Partner with JIGSY INDIA for skilled talent or institutional recruitment support.',
      hireSuccessTitle: 'Requirement Submitted Successfully',
      hireSuccessDesc: 'Thank you. Our talent coordination team has received your requirement and will reach out promptly.',
      fields: {
        fullName: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        preferredSector: 'Preferred Sector',
        experience: 'Experience Level',
        portfolioUrl: 'Resume / Portfolio Link',
        note: 'Brief Introduction / Skills',
        companyName: 'Organization / Company Name',
        contactPerson: 'Contact Person',
        roleTitle: 'Role / Requirement Title',
        location: 'Location',
        workType: 'Engagement Type',
        budget: 'Compensation / Budget',
        reqDetails: 'Requirement Details',
        submitBtn: 'Submit',
        submittingBtn: 'Submitting...',
      },
    },
    contact: {
      pageBadge: 'Corporate Contact & Service Desk',
      pageTitle: 'Contact JIGSY INDIA',
      pageSubtitle:
        'Reach our executive desk for project proposals, collaborations, institutional MoUs, consultancy, or general inquiries.',
      modalEyebrow: 'Direct Service & Collaboration Request',
      modalTitle: 'Contact JIGSY INDIA',
      modalSubtitle: 'Select your target sector and service. Our team will review your request and respond promptly.',
      infoEyebrow: 'Official Corporate Office',
      infoTitle: 'Get in Touch Directly',
      infoDesc:
        'Connect with our leadership and sector leads for commercial projects, institutional MoUs, statutory advisory, research collaborations, or publishing inquiries.',
      officeLabel: 'Registered Office',
      emailLabel: 'Official Email',
      phoneLabel: 'Phone / Support',
      responsePromise: 'Typical executive response time: within 24 business hours.',
      formTitle: 'Submit a Service or Collaboration Request',
      formSubtitle: 'Choose your sector, service, and request type below, then click Submit.',
      sectorLabel: 'Select Sector',
      generalCorporateOption: 'General Corporate / Multi-Sector',
      serviceLabel: 'Select Service',
      customServiceOption: 'Custom Requirement / Multi-Sector Collaboration',
      engagementTypeLabel: 'Request / Engagement Type',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your full name',
      emailInputLabel: 'Email Address',
      emailPlaceholder: 'name@organization.com',
      phoneInputLabel: 'Phone / WhatsApp Number',
      phonePlaceholder: '10-digit mobile number',
      orgLabel: 'Organization / Institution (Optional)',
      orgPlaceholder: 'Company, College, or Startup name',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Brief title for your request or proposal',
      detailsLabel: 'Request Details (Collaboration, Proposal, MoU, or Scope)',
      detailsPlaceholder: 'Describe your goals, deliverables, expected timeline, or inquiry details...',
      captchaError: 'Invalid verification code. Please enter the characters shown in the yellow box.',
      submitBtn: 'Submit',
      submittingBtn: 'Submitting...',
      successTitle: 'Request Submitted Successfully',
      successDesc: 'Thank you for contacting JIGSY INDIA. Our team has received your submission and will connect with you shortly.',
      submitAnother: 'Submit Another Request',
      closeModal: 'Close',
      engagementTypes: {
        'Project Proposal & Development': 'Project Proposal & Development',
        'Strategic Collaboration / Partnership': 'Strategic Collaboration / Partnership',
        'Institutional MoU & Academic Tie-Up': 'Institutional MoU & Academic Tie-Up',
        'Corporate / Legal & GST Compliance': 'Corporate / Legal & GST Compliance',
        'Campus Incubation & Industrial Training': 'Campus Incubation & Industrial Training',
        'Mass Recruitment / Talent Hiring': 'Mass Recruitment / Talent Hiring',
        'Book / ISBN Publishing & Media Outreach': 'Book / ISBN Publishing & Media Outreach',
        'General Corporate Inquiry': 'General Corporate Inquiry',
      },
    },
    feedback: {
      badge: 'Community Voices',
      title: 'User & Member Feedback',
      subtitle: 'Verified experiences from clients, institutional partners, and community members.',
      formTitle: 'Share Your Feedback',
      formSubtitle: 'Tell us about your experience with JIGSY INDIA.',
      nameLabel: 'Your Name',
      namePlaceholder: 'Enter your full name',
      roleLabel: 'Role / Organization',
      rolePlaceholder: 'Client, Partner, or Member',
      ratingLabel: 'Rating',
      commentLabel: 'Your Feedback',
      commentPlaceholder: 'Share your experience or suggestions with JIGSY INDIA...',
      submitBtn: 'Submit',
      successMsg: 'Thank you! Your feedback has been submitted successfully.',
      captchaError: 'Invalid verification code. Please try again.',
    },
    captcha: {
      label: 'Security Verification (CAPTCHA)',
      placeholder: 'Enter code above',
      helper: 'Type the characters shown in the yellow box (case-insensitive).',
      refreshTitle: 'Refresh verification code',
    },
    footer: {
      contactHeading: 'Registered Office & Contact',
      sectorsHeading: 'Corporate Sectors',
      companyHeading: 'Company & Leadership',
      connectHeading: 'Connect & Resources',
      allSectors: 'All 6 Corporate Sectors',
      aboutCompany: 'About Company',
      founder: 'Founder — Mr. Jigyasu Vatsa',
      directors: 'Board of Directors',
      howToEngage: 'How to Engage',
      careers: 'Careers',
      contactUs: 'Contact Us',
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms & Conditions',
      cookiePolicy: 'Cookie Policy',
      founderPortfolio: 'Founder Portfolio (jigyasu.jigsy.in)',
      adminDesk: 'Admin Desk',
      developedBy: 'Developed & Maintained by',
      rightsReserved: 'All rights reserved.',
    },
    legal: {
      privacyTab: 'Privacy Policy',
      termsTab: 'Terms & Conditions',
      consentNote: 'Clicking accept records your acknowledgment of our corporate policies for this browser session.',
      closeBtn: 'Close',
      acceptBtn: 'I Understand & Accept',
      acceptedBadge: 'Policy Consent Recorded',
    },
    errors: {
      notFoundBadge: '404 · Page Not Found',
      notFoundTitle: 'This route took an unexpected detour',
      notFoundDesc:
        'The page or link you requested is either unavailable, moved, or no longer active on JIGSY INDIA. Choose one of the quick paths below to continue exploring smoothly.',
      pdfBadge: 'Document / Link Unavailable',
      pdfTitle: 'Requested File or External Resource Not Found',
      pdfDesc:
        'The PDF document or linked GitHub asset could not be located at this path. You can request the latest official brochure or document directly from our team.',
      verificationBadge: 'Service Temporarily Offline',
      verificationTitle: 'Employee Verification Is Temporarily Disabled',
      verificationDesc:
        'Our public Employee Verification portal is currently paused while we upgrade our corporate registry infrastructure. For urgent official HR or credential verification, please submit a request via our Contact form.',
      runtimeBadge: 'Interactive Recovery Notice',
      runtimeTitle: 'Something interrupted this view',
      runtimeDesc:
        'We caught an unexpected rendering issue before it could disrupt your session. You can safely reload this section or return to the JIGSY INDIA homepage.',
      cookieBadge: 'Cookie & Browser Preferences',
      cookieTitle: 'Cookie Policy Summary',
      cookieDesc:
        'JIGSY INDIA uses strictly necessary local storage preferences (theme mode, selected language, and session consent) to provide a smooth browsing experience. No invasive third-party advertising trackers are run on this static portal. You may clear or manage cookies anytime in your browser settings.',
      requestedPathLabel: 'Requested Path / Resource:',
      triviaLabel: 'While you are here — JIGSY Quick Fact',
      nextFactBtn: 'Show Another Fact',
      goHomeBtn: 'Return to Home',
      exploreSectorsBtn: 'Explore All 6 Sectors',
      contactUsBtn: 'Open Contact Form',
      reloadBtn: 'Reload View',
      facts: [
        'JIGSY INDIA’s foundational vision was conceived on October 3, 2010 and incorporated as a DPIIT-recognized enterprise in 2025.',
        'JIGSY stands for "Jigyasu Integrated Global Services" — spanning Tech, Consult, R&D, DigiTech, EduTech, and Youth.',
        'Our Sanskrit motto "जिज्ञासु ईक्षण ग्रंथि समृद्धि युक्ति" celebrates curiosity, unified vision, and collaborative prosperity.',
        'Student internships and youth exposure cohorts operate on a dedicated sister platform at youth.jigsy.in.',
      ],
    },
  },
  hi: {
    nav: {
      marquee:
        'बहु-क्षेत्रीय उद्यम · सॉफ्टवेयर एवं क्लाउड · व्यावसायिक परामर्श · अनुप्रयुक्त अनुसंधान · आईएसबीएन प्रकाशन · एडुटेक एवं कैंपस इनक्यूबेशन · युवा इंटर्नशिप: youth.jigsy.in',
      home: 'मुख्य पृष्ठ',
      sectorsServices: 'सेक्टर एवं सेवाएं',
      allSectorsOverview: 'सभी 6 सेक्टर का अवलोकन',
      about: 'हमारे बारे में',
      aboutCompany: 'कंपनी के बारे में',
      aboutCompanySub: 'विरासत, मिशन एवं 6 प्रभाग',
      founder: 'संस्थापक — श्री जिज्ञासु वत्स',
      founderSub: 'परिकल्पना, कार्यान्वयन एवं पोर्टफोलियो',
      directors: 'निदेशक मंडल',
      directorsSub: 'श्री सुभाष चंद्र झा एवं श्री जिज्ञासु वत्स',
      howToEngage: 'हमसे कैसे जुड़ें',
      howToEngageSub: 'ग्राहक, MoU, करियर एवं युवा',
      careers: 'करियर',
      contact: 'संपर्क करें',
      requestService: 'सेवा अनुरोध',
      youthPortal: 'यूथ पोर्टल',
      lightMode: 'लाइट',
      darkMode: 'डार्क',
      adminDesk: 'एडमिन डेस्क',
    },
    hero: {
      ribbons: [
        'JIGSY INDIA · सॉफ्टवेयर, परामर्श, अनुसंधान, प्रकाशन एवं एडुटेक प्रदान करने वाला बहु-क्षेत्रीय उद्यम',
        'कॉर्पोरेट सहयोग, प्रोजेक्ट प्रस्ताव, संस्थागत MoU एवं कैंपस इनक्यूबेशन हेतु खुला आमंत्रण',
        'ॐ जिज्ञासु ईक्षण ग्रंथि समृद्धि युक्ति · JIGYASU INTEGRATED GLOBAL SERVICES with YOU ॐ',
      ],
      badge: 'DPIIT मान्यता प्राप्त स्टार्टअप · विज़न 2010 से',
      titleLine1: 'एकीकृत वैश्विक सेवाएं',
      titleLine2: 'छह विशेषज्ञ सेक्टरों में',
      description:
        'JIGSY INDIA छह विशेषज्ञ प्रभागों — सॉफ्टवेयर एवं क्लाउड, व्यावसायिक परामर्श, अनुप्रयुक्त अनुसंधान, प्रकाशन एवं मीडिया, एडुटेक प्रशिक्षण और युवा कौशल अनुभव — को एक मंच पर लाता है।',
      ctaPrimary: 'सेवा का अनुरोध करें',
      ctaSecondary: 'सभी 6 सेक्टर देखें',
      ctaTertiary: 'हमसे कैसे जुड़ें',
      stat1Val: '6 सेक्टर',
      stat1Lbl: 'एकीकृत परिचालन प्रभाग',
      stat2Val: 'DPIIT · MSME',
      stat2Lbl: 'पंजीकृत एवं GST सत्यापित',
      stat3Val: 'वैश्विक पहुंच',
      stat3Lbl: 'प्रौद्योगिकी, परामर्श एवं शोध',
      exploreSlidePrefix: 'देखें',
      slides: [
        {
          title: 'वेब, सास एवं एंटरप्राइज क्लाउड सिस्टम',
          subtitle: 'JIGSY Tech द्वारा निर्मित स्केलेबल सॉफ्टवेयर, डेटाबेस इंजीनियरिंग और आईटी सहायता।',
          tag: 'JIGSY Tech',
          slug: 'tech',
        },
        {
          title: 'वैश्विक आईएसबीएन प्रकाशन एवं अनुप्रयुक्त अनुसंधान',
          subtitle: 'JIGSY R&D और JIGSY DigiTech द्वारा पुस्तक प्रकाशन और समकक्ष-समीक्षित शोध सहयोग।',
          tag: 'JIGSY R&D & DigiTech',
          slug: 'digitech',
        },
        {
          title: 'कैंपस इनक्यूबेशन एवं युवा कौशल अनुभव',
          subtitle: 'JIGSY EduTech और youth.jigsy.in द्वारा औद्योगिक प्रशिक्षण व संस्थागत इनक्यूबेशन।',
          tag: 'JIGSY EduTech & Youth',
          slug: 'edutech',
        },
      ],
    },
    home: {
      sectorsBadge: 'सभी 6 सेक्टर एवं सेवाएं',
      sectorsTitle: 'कॉर्पोरेट प्रभाग एवं सामान्य सेवा पोर्टफोलियो',
      sectorsSubtitle:
        'हमारे छह परिचालन प्रभागों और प्रमुख सेवाओं का अवलोकन करें। कार्यों की झलक देखने के लिए किसी भी कार्ड पर होवर करें या सीधे सेवा अनुरोध भेजें।',
      allSectorsFilter: 'सभी 6 सेक्टर',
      servicesOffered: 'प्रमुख सेवाएं',
      serviceUnit: 'सेवा',
      servicesUnit: 'सेवाएं',
      featuredWork: 'प्रमुख कार्य झलक',
      exploreDivision: 'प्रभाग देखें',
      requestService: 'सेवा अनुरोध',
      pillarsBadge: 'JIGSY INDIA के साथ साझेदारी क्यों करें',
      pillarsTitle: 'एकीकृत निष्पादन के चार स्तंभ',
      pillarsSubtitle:
        'हर कार्य में इंजीनियरिंग अनुशासन, वैधानिक पारदर्शिता, शोध गहराई और उत्तरदायी संवाद का समन्वय।',
      pillars: [
        {
          title: 'बहु-क्षेत्रीय समन्वय',
          metric: '6 प्रभाग',
          desc: 'प्रौद्योगिकी, विधिक निगमन, डिजिटल मीडिया, अनुसंधान और प्रशिक्षण एक ही कॉर्पोरेट छत के नीचे।',
        },
        {
          title: 'वैधानिक एवं DPIIT विश्वसनीयता',
          metric: 'MCA · GST · MSME',
          desc: 'पारदर्शी कार्यप्रणाली, सुव्यवस्थित दस्तावेजीकरण और नैतिक सुशासन युक्त पंजीकृत प्राइवेट लिमिटेड कंपनी।',
        },
        {
          title: 'अनुसंधान-आधारित इंजीनियरिंग',
          metric: 'Springer · T&F',
          desc: 'एल्गोरिदम दक्षता, प्रकाशित शोध पत्रों और विश्वसनीय सिस्टम डिजाइन पर आधारित समाधान।',
        },
        {
          title: 'भारत में जड़ें, वैश्विक सेवा',
          metric: 'अखिल भारतीय व वैश्विक',
          desc: 'दरभंगा, बिहार से संचालित होकर देश-विदेश के उद्यमों और संस्थानों को रिमोट व हाइब्रिड सेवाएं।',
        },
      ],
      worksBadge: 'प्रमुख कार्य एवं समाधान',
      worksTitle: 'हमारे प्रभागों के चयनित कार्य',
      worksSubtitle:
        'हमारी टीमों द्वारा निर्मित सक्रिय सॉफ्टवेयर प्लेटफॉर्म, प्रकाशित पुस्तकें, अनुपालन डेस्क और संस्थागत पहल देखें।',
      worksAll: 'सभी कार्य',
      worksInquire: 'पूछताछ करें',
      worksVisit: 'पोर्टल खोलें',
      collabBadge: 'हमसे कैसे जुड़ें और सहयोग करें',
      collabTitle: 'ग्राहकों एवं पेशेवरों के लिए सरल प्रक्रिया',
      collabSubtitle:
        'चाहे आप कोई प्रोजेक्ट शुरू करना चाहें, संस्थागत MoU का प्रस्ताव दें, या भविष्य की भूमिकाओं के लिए जुड़ें — हमारी प्रक्रिया पूरी तरह स्पष्ट है।',
      forClientsTitle: 'ग्राहकों एवं संस्थागत साझेदारों के लिए',
      forClientsBadge: 'प्रोजेक्ट · परामर्श · MoU',
      forClientsSteps: [
        {
          title: '1. सेवा अनुरोध सबमिट करें',
          desc: 'अपना वर्तमान पृष्ठ छोड़े बिना हमारे त्वरित संपर्क फॉर्म से उपयुक्त सेक्टर और सेवा चुनें।',
        },
        {
          title: '2. कार्यक्षेत्र एवं प्रस्ताव समीक्षा',
          desc: 'हमारे निदेशक और प्रभाग विशेषज्ञ आपकी आवश्यकताओं, समयसीमा और अनुपालन बिंदुओं की त्वरित समीक्षा करते हैं।',
        },
        {
          title: '3. पारदर्शी समझौता एवं माइलस्टोन',
          desc: 'कार्य प्रारंभ होने से पहले स्पष्ट डिलीवरेबल्स, संवाद माध्यम और शर्तों पर सहमति बनती है।',
        },
        {
          title: '4. निष्पादन एवं निरंतर सहयोग',
          desc: 'दस्तावेजीकरण और डिलीवरी के बाद भी समर्पित सहायता के साथ गुणवत्तापूर्ण कार्य प्राप्त करें।',
        },
      ],
      forClientsCta: 'सेवा अनुरोध प्रारंभ करें',
      forProfessionalsTitle: 'पेशेवरों एवं नौकरी चाहने वालों के लिए',
      forProfessionalsBadge: 'टैलेंट पूल · आगामी अवसर',
      forProfessionalsSteps: [
        {
          title: '1. हमारे 6 प्रभागों को समझें',
          desc: 'जानें कि आपका तकनीकी, विधिक, शोध, रचनात्मक या शैक्षणिक कौशल किस प्रभाग के लिए सर्वाधिक उपयुक्त है।',
        },
        {
          title: '2. JIGSY टैलेंट पूल से जुड़ें',
          desc: 'करियर पृष्ठ पर अपना प्रोफ़ाइल और रिज्यूमे लिंक सबमिट करें ताकि नई रिक्ति आने पर हम आपसे संपर्क कर सकें।',
        },
        {
          title: '3. JIGSY Youth के माध्यम से छात्र इंटर्नशिप',
          desc: 'औद्योगिक अनुभव और छात्र इंटर्नशिप के इच्छुक विद्यार्थी सीधे youth.jigsy.in पर पंजीकरण कर सकते हैं।',
        },
        {
          title: '4. व्यवस्थित समीक्षा एवं अपडेट',
          desc: 'चयनित प्रोफ़ाइल को हमारी भर्ती टीम द्वारा सीधे साक्षात्कार और आधिकारिक सूचना भेजी जाती है।',
        },
      ],
      forProfessionalsCta: 'करियर पृष्ठ देखें',
      fullRoadmapLink: 'विस्तृत सहभागिता मार्गदर्शिका देखें',
      leadershipEyebrow: 'सुशासन · परिकल्पना · करियर',
      leadershipTitle: 'नेतृत्व, विरासत एवं अवसरों को जानें',
      aboutCompanyTitle: 'कंपनी के बारे में',
      aboutCompanyDesc: '3 अक्टूबर 2010 को परिकल्पित और 2025 में DPIIT, MSME तथा GST मान्यता के साथ निगमित।',
      aboutCompanyCta: 'कंपनी की कहानी पढ़ें',
      founderTitle: 'संस्थापक — श्री जिज्ञासु वत्स',
      founderDesc: 'परिकल्पना, सिस्टम कार्यान्वयन, शोध प्रकाशन, प्रकाशित पुस्तक एवं jigyasu.jigsy.in हेतु समर्पित पृष्ठ।',
      founderCta: 'संस्थापक पृष्ठ देखें',
      directorsTitle: 'निदेशक मंडल',
      directorsDesc: 'दोनों निदेशकों — श्री सुभाष चंद्र झा एवं श्री जिज्ञासु वत्स — से मिलें जो कॉर्पोरेट सुशासन का नेतृत्व करते हैं।',
      directorsCta: 'दोनों निदेशकों से मिलें',
      careersTitle: 'करियर एवं प्रतिभा डेस्क',
      careersDesc: 'वर्तमान भर्ती स्थिति देखें या आगामी पदों के लिए टैलेंट पूल में अपना प्रोफ़ाइल जमा करें।',
      careersCta: 'करियर पृष्ठ खोलें',
      youthBadge: 'JIGSY Youth पहल · बेहतर भारत हेतु युवा अनुभव',
      youthTitle: 'समर्पित युवा इंटर्नशिप एवं छात्र कौशल अनुभव पोर्टल',
      youthDesc:
        'भारत के युवाओं को व्यावहारिक अनुभव और कौशल प्रदान करने की प्रतिबद्धता के तहत, हमारा JIGSY Youth प्रभाग youth.jigsy.in पर एक पृथक समर्पित पोर्टल संचालित करता है।',
      youthCta: 'youth.jigsy.in पर जाएं',
      campusMouCta: 'कैंपस MoU पूछताछ',
    },
    sectorsPage: {
      badge: 'विशेषज्ञ कॉर्पोरेट इकोसिस्टम',
      title: 'JIGSY INDIA के सभी 6 प्रभाग देखें',
      subtitle:
        'किसी भी प्रभाग का चयन करें और उसका कार्यक्षेत्र, सामान्य सेवाएं, मुख्य क्षमताएं व प्रमुख कार्य देखें।',
      activeDivision: 'सक्रिय परिचालन प्रभाग',
      profileHeading: 'प्रभाग परिचय एवं दायित्व',
      deliverablesHeading: 'प्रमुख डिलीवरेबल्स',
      coreOpsHeading: 'मुख्य क्षमताएं',
      servicesHeadingPrefix: 'प्रदान की जाने वाली सेवाएं —',
      caseStudiesHeading: 'प्रमुख कार्य एवं उपलब्धियां',
      requestDivisionCta: 'इस प्रभाग से सेवा अनुरोध करें',
      visitYouthCta: 'youth.jigsy.in पर जाएं',
      consultTitlePrefix: 'क्या आपको विशेष प्रस्ताव चाहिए:',
      consultSubtitle: 'इस पृष्ठ को छोड़े बिना यहीं त्वरित सेवा अनुरोध फॉर्म खोलें।',
    },
    aboutPage: {
      badge: 'कंपनी के बारे में · कॉर्पोरेट विरासत एवं मिशन',
      title: 'JIGSY INDIA के बारे में',
      mottoLabel: 'ध्येय वाक्य:',
      taglineLabel: 'टैगलाइन:',
      storyTitle: 'परिकल्पना से बहु-क्षेत्रीय कॉर्पोरेट वास्तविकता तक',
      storyPara1:
        '3 अक्टूबर 2010 को परिकल्पित और 2025 में JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED के रूप में विधिवत निगमित, JIGSY INDIA आधुनिक तकनीक, विश्वसनीय परामर्श, मौलिक अनुसंधान, प्रकाशन और कौशल सशक्तिकरण को एक साथ जोड़ता है।',
      storyPara2:
        'दरभंगा, बिहार में मुख्यालय के साथ भारत और विश्व भर के संगठनों को सेवा देते हुए JIGSY INDIA छह एकीकृत प्रभागों — JIGSY Tech, JIGSY Consult, JIGSY R&D, JIGSY DigiTech, JIGSY EduTech और JIGSY Youth (youth.jigsy.in) — का संचालन करता है।',
      milestoneTitle: 'ऐतिहासिक मील का पत्थर',
      milestoneText: '3 अक्टूबर 2010 को विज़न की परिकल्पना — 2025 में DPIIT मान्यता प्राप्त प्राइवेट लिमिटेड कंपनी के रूप में निगमन।',
      visionTitle: 'कॉर्पोरेट मिशन एवं रणनीतिक दृष्टिकोण',
      visionBullets: [
        'नैतिक कॉर्पोरेट सुशासन के साथ विश्वसनीय सॉफ्टवेयर, अनुपालन, शोध, प्रकाशन और प्रशिक्षण सेवाएं प्रदान करना।',
        'दीर्घकालिक व्यावसायिक साझेदारी, शैक्षणिक MoU और कैंपस इनक्यूबेशन कार्यक्रमों का निर्माण।',
        'समर्पित JIGSY Youth पोर्टल के माध्यम से भारतीय युवाओं को व्यावहारिक औद्योगिक अनुभव प्रदान करना।',
      ],
      registeredOffice: 'पंजीकृत कार्यालय:',
      conceived: 'परिकल्पना:',
      incorporated: 'निगमन:',
      divisions: 'परिचालन प्रभाग:',
      proposalCta: 'कॉर्पोरेट अनुरोध भेजें',
      footprintBadge: 'बहु-क्षेत्रीय कॉर्पोरेट संरचना',
      footprintTitle: 'एक विधिक इकाई के अंतर्गत छह विशेषज्ञ प्रभाग',
      inspectAll: 'सभी सेक्टर देखें',
      coreServicesUnit: 'सेवाएं',
      openFounderCta: 'संस्थापक पृष्ठ खोलें',
      viewDirectorsCta: 'दोनों निदेशकों को देखें',
      openEngageCta: 'सहभागिता मार्गदर्शिका खोलें',
    },
    founderPage: {
      roleLine: 'संस्थापक · निदेशक · मुख्य प्रौद्योगिकी वास्तुकार',
      badge: 'संस्थापक की परिकल्पना एवं कार्यान्वयन अभिलेख',
      headlinePrefix: '2010 की एक परिकल्पना से',
      headlineHighlight: 'छह-प्रभाग वाले वैश्विक उद्यम तक',
      bioExtra:
        '3 अक्टूबर 2010 को परिकल्पित, श्री जिज्ञासु वत्स ने कंप्यूटर विज्ञान अनुसंधान, एंटरप्राइज सॉफ्टवेयर इंजीनियरिंग, वैधानिक परामर्श, वैश्विक आईएसबीएन प्रकाशन और युवा मार्गदर्शन को एक सशक्त संगठन में पिरोने हेतु JIGSY INDIA की नींव रखी।',
      stat1Lbl: 'विज़न से प्रा. लि.',
      stat2Lbl: 'WoS, Scopus व ISBN',
      stat3Lbl: 'Mastering DSA पुस्तक',
      stat4Lbl: 'उद्योग इंटर्नशिप',
      collaborateCta: 'संस्थापक कार्यालय से जुड़ें',
      directorsCta: 'निदेशक मंडल',
      tabIdeation: 'परिकल्पना एवं यात्रा (2010–2026)',
      tabImplementation: '6-प्रभाग कार्यान्वयन',
      tabResearch: '5 शोध कार्य एवं 2026 पुस्तक',
      architectedActive: 'सक्रिय प्रभाग',
      inspectArchitecturePrefix: 'देखें',
      bookBadge: 'वैश्विक आईएसबीएन प्रकाशन · अमेज़न KDP (जून 2026)',
      bookDesc:
        'जून 2026 में प्रकाशित (ISBN-13: 979-8181718425 · ASIN: B0H5QK7NF2)। स्पष्ट व्याख्या, हल किए गए जटिलता प्रमाण और व्यावहारिक इंजीनियरिंग टेम्पलेट्स के साथ डेटा स्ट्रक्चर्स एवं एल्गोरिदम की स्वतंत्र रूप से रचित पाठ्यपुस्तक।',
      papersHeading: 'समकक्ष-समीक्षित शोध एवं कार्यवाही (5 कार्य · 2025–2026)',
      milestone1Title: 'शैक्षणिक आधार (KVS, B.Tech, M.Tech एवं MBA)',
      milestone1Desc:
        'केंद्रीय विद्यालय (KVS) से कंप्यूटर साइंस के साथ 12वीं, AI/ML ऐड-ऑन सहित B.Tech (CSE), संदीप विश्वविद्यालय से M.Tech (CSE) तथा MBA।',
      milestone2Title: 'IRCTC सॉफ्टवेयर एवं डेटाबेस इंटर्नशिप',
      milestone2Desc:
        'IRCTC (नई दिल्ली) में एंटरप्राइज डेटाबेस कार्यप्रणाली, API एकीकरण और सॉफ्टवेयर इंजीनियरिंग पर औद्योगिक इंटर्नशिप पूर्ण कीं।',
      milestone3Title: 'वैश्विक ISBN लेखन एवं समकक्ष-समीक्षित शोध',
      milestone3Desc:
        'जून 2026 में अमेज़न KDP पर "Mastering DSA Without Fear" पुस्तक प्रकाशित की तथा Springer Nature (WoS), Taylor & Francis (Scopus), GTISD, FAIR एवं वेदाञ्जलि में 5 शोध कार्य प्रकाशित किए।',
      portfolioBadge: 'संस्थापक का आधिकारिक व्यक्तिगत पोर्टफोलियो',
      portfolioTitle: 'श्री जिज्ञासु वत्स का संपूर्ण पोर्टफोलियो देखें',
      portfolioDesc:
        'संपूर्ण शोध सार, सॉफ्टवेयर रिपॉजिटरी, प्रकाशन और तकनीकी लेख सीधे उनके समर्पित पोर्टफोलियो पर पढ़ें।',
      timeline: [
        {
          year: '3 अक्टूबर 2010',
          phase: 'उत्पत्ति एवं परिकल्पना',
          title: 'JIGSY विज़न की संकल्पना',
          desc: 'जिज्ञासा, बहु-विषयक एकीकरण और विश्वसनीय वैश्विक सेवा को जोड़ने वाले मूल सिद्धांत की स्थापना।',
        },
        {
          year: 'मई 2019 – जून 2021',
          phase: 'शिक्षा एवं IRCTC इंटर्नशिप',
          title: '12वीं (KVS · CS), B.Tech (CSE · AI/ML) एवं IRCTC इंटर्नशिप',
          desc: 'केंद्रीय विद्यालय (KVS) से कंप्यूटर साइंस विषय के साथ 12वीं पूर्ण की, तत्पश्चात AI/ML ऐड-ऑन सहित B.Tech (CSE) एवं IRCTC में औद्योगिक इंटर्नशिप कीं।',
        },
        {
          year: 'सितंबर 2025 – वर्तमान',
          phase: 'कॉर्पोरेट निगमन',
          title: 'संस्थापक एवं निदेशक, JIGYASU INTEGRATED GLOBAL SERVICES PVT. LTD.',
          desc: 'दरभंगा में MCA, DPIIT स्टार्टअप इंडिया, GST और MSME पंजीकरण के साथ JIGSY INDIA का निगमन एवं सभी छह प्रभागों का संचालन।',
        },
        {
          year: '2026',
          phase: 'M.Tech, ISBN पुस्तक एवं शोध',
          title: 'M.Tech (संदीप विश्वविद्यालय), प्रकाशित पुस्तक (जून 2026) एवं 5 शोध पत्र',
          desc: 'संदीप विश्वविद्यालय से M.Tech (CSE) एवं MBA के साथ जून 2026 में अमेज़न KDP पर "Mastering DSA Without Fear" प्रकाशित तथा Springer Nature (WoS), Taylor & Francis (Scopus), GTISD, FAIR व वेदाञ्जलि में 5 शोध कार्य।',
        },
      ],
    },
    directorsPage: {
      badge: 'निदेशक मंडल · कार्यकारी सुशासन',
      title: 'JIGSY INDIA का नेतृत्व करने वाले निदेशक',
      subtitle:
        'JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED का नेतृत्व दो समर्पित निदेशकों द्वारा किया जाता है, जो प्रशासनिक सुशासन, रणनीतिक विस्तार और तकनीकी नवाचार का संगम प्रस्तुत करते हैं।',
      boardMandate: 'निदेशक दायित्व',
      hideOversight: 'विस्तृत कार्यक्षेत्र छिपाएं',
      showOversight: 'विस्तृत कार्यक्षेत्र एवं फोकस देखें',
      readFounderPage: 'संस्थापक का समर्पित पृष्ठ खोलें',
      connectGovernance: 'सुशासन एवं MoU हेतु संपर्क करें',
      assurance1Title: 'MCA एवं DPIIT अनुपालित',
      assurance1Desc: 'सक्रिय MCA, DPIIT स्टार्टअप इंडिया, GSTIN और MSME पंजीकरण के अंतर्गत निगमित।',
      assurance2Title: 'नैतिक बहु-क्षेत्रीय सेवा',
      assurance2Desc: 'सभी 6 सेक्टरों में पारदर्शी कार्यक्षेत्र, लिखित समझौते और प्रत्यक्ष निदेशक उत्तरदायित्व।',
      assurance3Title: 'उद्यम एवं संस्थान हेतु तत्पर',
      assurance3Desc: 'कॉर्पोरेट अनुबंध, विश्वविद्यालय MoU, इनक्यूबेशन सेंटर और संयुक्त शोध हेतु पूर्ण तैयार।',
      profiles: [
        {
          badge: 'कार्यकारी मंडल · सुशासन',
          mandate: 'कॉर्पोरेट सुशासन, प्रशासन एवं रणनीतिक मीडिया आउटरीच',
          focusAreas: [
            'बोर्ड-स्तरीय वैधानिक सुशासन, MCA/ROC अनुपालन निगरानी और नैतिक नीति संचालन',
            'मुख्यालय और क्षेत्रीय संचालन में रणनीतिक प्रशासनिक प्रबंधन',
            'संस्थागत संबंध, जनसंपर्क और राष्ट्रीय डिजिटल मीडिया संवाद',
            'व्यावसायिक साझेदारी निरीक्षण और दीर्घकालिक संगठनात्मक समन्वय',
          ],
          quote:
            'टिकाऊ संस्थानों का निर्माण अनुशासित सुशासन, पारदर्शी प्रशासन और हर साझेदार के प्रति निष्ठावान सेवा से होता है।',
        },
        {
          badge: 'संस्थापक · प्रौद्योगिकी एवं अनुसंधान',
          mandate: 'प्रौद्योगिकी वास्तुकला, अनुप्रयुक्त अनुसंधान एवं बहु-क्षेत्रीय कार्यान्वयन',
          focusAreas: [
            'JIGSY Tech एवं JIGSY EduTech में सॉफ्टवेयर इंजीनियरिंग व क्लाउड आर्किटेक्चर',
            'अनुप्रयुक्त शोध निर्देशन, समकक्ष-समीक्षित प्रकाशन एवं JIGSY R&D सेल नेतृत्व',
            'वैश्विक आईएसबीएन प्रकाशन ("Mastering DSA Without Fear") एवं संस्थागत शैक्षणिक MoU',
            'JIGSY Youth के माध्यम से युवा मेंटरशिप और व्यावहारिक कौशल अनुभव रणनीति',
          ],
          quote:
            'सच्चा नवाचार तब होता है जब मौलिक विज्ञान व्यावहारिक प्रणालियों में बदलकर उद्यमों, संस्थानों और युवाओं को सशक्त बनाता है।',
        },
      ],
    },
    engagePage: {
      badge: 'इंटरैक्टिव सहभागिता मार्गदर्शिका',
      title: 'JIGSY INDIA से कैसे जुड़ें',
      subtitle:
        'व्यावसायिक सेवाओं, संस्थागत MoU, करियर या छात्र कौशल अनुभव की सटीक प्रक्रिया देखने हेतु नीचे अपनी श्रेणी चुनें।',
      pathways: [
        {
          id: 'enterprise',
          label: 'ग्राहकों एवं उद्यमों के लिए',
          badge: 'प्रोजेक्ट · परामर्श · मीडिया',
          title: 'सॉफ्टवेयर, परामर्श, अनुसंधान या प्रकाशन प्रोजेक्ट शुरू करें',
          summary:
            'कस्टम सॉफ्टवेयर, व्यवसाय निगमन व कर अनुपालन, अनुप्रयुक्त शोध या प्रकाशन अभियानों के लिए सीधे JIGSY Tech, JIGSY Consult, JIGSY R&D या JIGSY DigiTech के साथ कार्य करें।',
          steps: [
            {
              title: '1. सेवा अनुरोध सबमिट करें',
              detail: 'अपना पृष्ठ छोड़े बिना संपर्क फॉर्म के माध्यम से उपयुक्त सेक्टर, सेवा और विवरण भेजें।',
            },
            {
              title: '2. कार्यक्षेत्र एवं तकनीकी समीक्षा',
              detail: 'हमारे निदेशक और विशेषज्ञ तकनीकी या वैधानिक आवश्यकताओं की समीक्षा कर शीघ्र उत्तर देते हैं।',
            },
            {
              title: '3. स्पष्ट प्रस्ताव एवं समयसीमा',
              detail: 'कार्य प्रारंभ से पूर्व डिलीवरेबल्स, चरणों और पारदर्शी शर्तों पर सहमति बनती है।',
            },
            {
              title: '4. निष्पादन एवं निरंतर सहायता',
              detail: 'सुव्यवस्थित दस्तावेजीकरण और डिलीवरी उपरांत तकनीकी सहायता के साथ कार्य पूर्णता।',
            },
          ],
          ctaLabel: 'सेवा अनुरोध फॉर्म खोलें',
        },
        {
          id: 'academic',
          label: 'कॉलेज एवं संस्थागत MoU',
          badge: 'MoU · इनक्यूबेशन · प्रशिक्षण',
          title: 'संस्थागत MoU, कैंपस इनक्यूबेशन एवं औद्योगिक प्रशिक्षण',
          summary:
            'कॉलेज और विश्वविद्यालय संरचित MoU, हाइब्रिड औद्योगिक प्रशिक्षण, कार्यशालाओं और कैंपस इनक्यूबेशन केंद्रों हेतु JIGSY EduTech व JIGSY R&D के साथ साझेदारी करते हैं।',
          steps: [
            {
              title: '1. संस्थागत विवरण साझा करें',
              detail: 'संपर्क फॉर्म द्वारा अपने संस्थान, संकाय और वांछित कार्यक्रम प्रारूप की जानकारी भेजें।',
            },
            {
              title: '2. पाठ्यक्रम एवं कार्यक्रम समन्वय',
              detail: 'हम कार्यशालाओं, प्रशिक्षण मॉड्यूल और इनक्यूबेशन लैब को शैक्षणिक मानकों के अनुरूप ढालते हैं।',
            },
            {
              title: '3. औपचारिक MoU हस्ताक्षर',
              detail: 'समयसारिणी, मार्गदर्शन और डिलीवरेबल्स सहित पारदर्शी संस्थागत MoU निष्पादित होता है।',
            },
            {
              title: '4. संचालन एवं संयुक्त शोध पहल',
              detail: 'कैंपस में लाइव तकनीकी कार्यशालाएं, कौशल लैब और सहयोगात्मक शोध परियोजनाएं संचालित करें।',
            },
          ],
          ctaLabel: 'संस्थागत MoU का अनुरोध करें',
        },
        {
          id: 'careers',
          label: 'पेशेवरों एवं अभ्यर्थियों के लिए',
          badge: 'टैलेंट पूल · आगामी पद',
          title: 'JIGSY INDIA टैलेंट पूल से जुड़ें',
          summary:
            'यद्यपि अभी कोई सक्रिय कॉर्पोरेट पद रिक्त नहीं है, पेशेवर आगामी भूमिकाओं में प्राथमिकता के लिए हमारे टैलेंट पूल में अपना प्रोफ़ाइल जमा कर सकते हैं।',
          steps: [
            {
              title: '1. प्रभागों का अवलोकन करें',
              detail: 'हमारे छह प्रभागों को देखें और जानें कि आपका अनुभव कहां सबसे उपयुक्त है।',
            },
            {
              title: '2. टैलेंट पूल में प्रोफ़ाइल जमा करें',
              detail: 'भविष्य की रिक्तियों में प्राथमिकता हेतु करियर पृष्ठ पर अपना रिज्यूमे/पोर्टफोलियो लिंक भेजें।',
            },
            {
              title: '3. आधिकारिक अपडेट फॉलो करें',
              detail: 'नए कॉर्पोरेट पदों की घोषणाओं के लिए हमारे आधिकारिक LinkedIn पृष्ठ से जुड़े रहें।',
            },
            {
              title: '4. प्रत्यक्ष HR संवाद',
              detail: 'हमारी टीम गोपनीय रिकॉर्ड रखती है और उपयुक्त अवसर उपलब्ध होने पर सीधे संपर्क करती है।',
            },
          ],
          ctaLabel: 'करियर पृष्ठ खोलें',
        },
        {
          id: 'youth',
          label: 'युवा अनुभव एवं इंटर्नशिप',
          badge: 'youth.jigsy.in पर संचालित',
          title: 'JIGSY Youth — बेहतर भारत हेतु छात्र अनुभव',
          summary:
            'छात्र इंटर्नशिप और युवा कौशल अनुभव कार्यक्रम हमारे पृथक समर्पित पोर्टल youth.jigsy.in पर स्नातक व स्नातकोत्तर विद्यार्थियों हेतु संचालित होते हैं।',
          steps: [
            {
              title: '1. youth.jigsy.in पर जाएं',
              detail: 'सक्रिय इंटर्नशिप कार्यक्रम, प्रशिक्षण बैच और युवा अनुभव पहल देखें।',
            },
            {
              title: '2. उपयुक्त ट्रैक चुनें',
              detail: 'अपने शैक्षणिक संकाय और करियर लक्ष्य के अनुरूप संरचित कार्यक्रम का चयन करें।',
            },
            {
              title: '3. निर्देशित प्रोजेक्ट अनुभव',
              detail: 'व्यावहारिक कार्यस्थल अनुभव और संरचित असाइनमेंट के साथ मेंटरशिप प्राप्त करें।',
            },
            {
              title: '4. पूर्णता प्रमाणन',
              detail: 'मूल्यांकन और उपस्थिति मानदंड पूर्ण करने पर आधिकारिक पूर्णता दस्तावेज प्राप्त करें।',
            },
          ],
          ctaLabel: 'youth.jigsy.in पर जाएं',
        },
      ],
    },
    careersPage: {
      badge: 'कॉर्पोरेट करियर एवं प्रतिभा डेस्क',
      title: 'JIGSY INDIA में करियर',
      subtitle:
        'हमारे छह प्रभागों में करियर अवसरों की जानकारी देखें या आगामी पदों के लिए अपना प्रोफ़ाइल साझा करें।',
      postReqBtn: 'भर्ती आवश्यकता पोस्ट करें',
      noOpeningsBadge: 'वर्तमान भर्ती स्थिति',
      noOpeningsTitle: 'फिलहाल कोई वर्तमान रिक्ति नहीं है',
      noOpeningsDesc:
        'इस समय हमारे पास कोई सक्रिय कॉर्पोरेट पद रिक्त नहीं है। हालांकि, प्रतिभाशाली इंजीनियर, शोधकर्ता, विधिक सहयोगी, डिजाइनर और शिक्षक आगामी अवसरों हेतु हमारे टैलेंट पूल में अपना प्रोफ़ाइल सबमिट कर सकते हैं।',
      talentPoolBtn: 'टैलेंट पूल में प्रोफ़ाइल जमा करें',
      linkedinBtn: 'LinkedIn पर अपडेट फॉलो करें',
      whyJoinTitle: 'JIGSY INDIA के साथ कार्य संस्कृति',
      whyJoinPoints: [
        {
          title: 'बहु-क्षेत्रीय अनुभव',
          desc: 'एंटरप्राइज सॉफ्टवेयर, अनुप्रयुक्त अनुसंधान, प्रकाशन, विधिक परामर्श और शैक्षणिक नवाचार में कार्य अवसर।',
        },
        {
          title: 'नैतिक एवं पारदर्शी कार्य संस्कृति',
          desc: 'व्यवस्थित मार्गदर्शन, स्पष्ट लक्ष्य और नेतृत्व टीम के साथ सीधा संवाद।',
        },
        {
          title: 'लचीला रिमोट एवं हाइब्रिड कार्य',
          desc: 'दरभंगा, बिहार और अखिल भारतीय रिमोट टीमों को जोड़ने वाला संतुलित कार्य वातावरण।',
        },
      ],
      youthBannerTitle: 'क्या आप छात्र इंटर्नशिप खोज रहे हैं?',
      youthBannerDesc:
        'छात्र इंटर्नशिप कार्यक्रम और युवा कौशल अनुभव बैच हमारे समर्पित JIGSY Youth पोर्टल youth.jigsy.in पर पृथक रूप से संचालित होते हैं।',
      youthBannerCta: 'youth.jigsy.in पर जाएं',
      talentModalTitle: 'टैलेंट पूल में प्रोफ़ाइल जमा करें',
      talentModalSub: 'JIGSY INDIA में आगामी अवसरों हेतु अपना रिज्यूमे या पोर्टफोलियो लिंक साझा करें।',
      talentSuccessTitle: 'प्रोफ़ाइल सफलतापूर्वक सबमिट हुआ',
      talentSuccessDesc: 'JIGSY INDIA में रुचि दिखाने हेतु धन्यवाद। उपयुक्त पद खुलने पर हमारी HR टीम आपसे संपर्क करेगी।',
      hireModalTitle: 'भर्ती आवश्यकता पोस्ट करें',
      hireModalSub: 'कुशल प्रतिभा या संस्थागत भर्ती सहयोग हेतु JIGSY INDIA से जुड़ें।',
      hireSuccessTitle: 'आवश्यकता सफलतापूर्वक सबमिट हुई',
      hireSuccessDesc: 'धन्यवाद। हमारी टीम को आपकी आवश्यकता प्राप्त हो गई है और हम शीघ्र संपर्क करेंगे।',
      fields: {
        fullName: 'पूरा नाम',
        email: 'ईमेल पता',
        phone: 'फ़ोन नंबर',
        preferredSector: 'पसंदीदा सेक्टर',
        experience: 'अनुभव स्तर',
        portfolioUrl: 'रिज्यूमे / पोर्टफोलियो लिंक',
        note: 'संक्षिप्त परिचय / कौशल',
        companyName: 'संगठन / कंपनी का नाम',
        contactPerson: 'संपर्क व्यक्ति',
        roleTitle: 'पद / आवश्यकता शीर्षक',
        location: 'स्थान',
        workType: 'कार्य प्रकार',
        budget: 'पारिश्रमिक / बजट',
        reqDetails: 'आवश्यकता का विवरण',
        submitBtn: 'सबमिट करें',
        submittingBtn: 'सबमिट हो रहा है...',
      },
    },
    contact: {
      pageBadge: 'कॉर्पोरेट संपर्क एवं सेवा डेस्क',
      pageTitle: 'JIGSY INDIA से संपर्क करें',
      pageSubtitle:
        'प्रोजेक्ट प्रस्ताव, सहयोग, संस्थागत MoU, परामर्श या सामान्य पूछताछ के लिए हमारे कार्यकारी डेस्क से संपर्क करें।',
      modalEyebrow: 'सेवा एवं सहयोग अनुरोध',
      modalTitle: 'JIGSY INDIA से संपर्क करें',
      modalSubtitle: 'अपना उपयुक्त सेक्टर और सेवा चुनें। हमारी टीम आपके अनुरोध की समीक्षा कर शीघ्र संपर्क करेगी।',
      infoEyebrow: 'आधिकारिक कॉर्पोरेट कार्यालय',
      infoTitle: 'सीधे संपर्क करें',
      infoDesc:
        'व्यावसायिक प्रोजेक्ट, संस्थागत MoU, वैधानिक परामर्श, शोध सहयोग या प्रकाशन पूछताछ हेतु हमारे नेतृत्व और प्रभाग विशेषज्ञों से जुड़ें।',
      officeLabel: 'पंजीकृत कार्यालय',
      emailLabel: 'आधिकारिक ईमेल',
      phoneLabel: 'फ़ोन / सहायता',
      responsePromise: 'सामान्य उत्तर समय: 24 कार्य घंटों के भीतर।',
      formTitle: 'सेवा या सहयोग अनुरोध सबमिट करें',
      formSubtitle: 'नीचे अपना सेक्टर, सेवा और अनुरोध प्रकार चुनें तथा सबमिट करें।',
      sectorLabel: 'सेक्टर चुनें',
      generalCorporateOption: 'सामान्य कॉर्पोरेट / बहु-क्षेत्रीय',
      serviceLabel: 'सेवा चुनें',
      customServiceOption: 'कस्टम आवश्यकता / बहु-क्षेत्रीय सहयोग',
      engagementTypeLabel: 'अनुरोध / सहभागिता प्रकार',
      nameLabel: 'पूरा नाम',
      namePlaceholder: 'अपना पूरा नाम लिखें',
      emailInputLabel: 'ईमेल पता',
      emailPlaceholder: 'name@organization.com',
      phoneInputLabel: 'मोबाइल / व्हाट्सएप नंबर',
      phonePlaceholder: '10 अंकों का मोबाइल नंबर',
      orgLabel: 'संगठन / संस्थान (वैकल्पिक)',
      orgPlaceholder: 'कंपनी, कॉलेज या स्टार्टअप का नाम',
      subjectLabel: 'विषय',
      subjectPlaceholder: 'आपके अनुरोध या प्रस्ताव का संक्षिप्त शीर्षक',
      detailsLabel: 'अनुरोध विवरण (सहयोग, प्रस्ताव, MoU या कार्यक्षेत्र)',
      detailsPlaceholder: 'अपने उद्देश्य, अपेक्षित कार्य, समयसीमा या पूछताछ का विवरण लिखें...',
      captchaError: 'अमान्य सुरक्षा कोड। कृपया पीले बॉक्स में दिखाए गए अक्षर सही से दर्ज करें।',
      submitBtn: 'सबमिट करें',
      submittingBtn: 'सबमिट हो रहा है...',
      successTitle: 'अनुरोध सफलतापूर्वक सबमिट हुआ',
      successDesc: 'JIGSY INDIA से संपर्क करने हेतु धन्यवाद। हमारी टीम को आपका संदेश प्राप्त हो गया है और हम शीघ्र संपर्क करेंगे।',
      submitAnother: 'नया अनुरोध भेजें',
      closeModal: 'बंद करें',
      engagementTypes: {
        'Project Proposal & Development': 'प्रोजेक्ट प्रस्ताव एवं विकास',
        'Strategic Collaboration / Partnership': 'रणनीतिक सहयोग / साझेदारी',
        'Institutional MoU & Academic Tie-Up': 'संस्थागत MoU एवं शैक्षणिक समझौता',
        'Corporate / Legal & GST Compliance': 'कॉर्पोरेट / विधिक एवं GST अनुपालन',
        'Campus Incubation & Industrial Training': 'कैंपस इनक्यूबेशन एवं औद्योगिक प्रशिक्षण',
        'Mass Recruitment / Talent Hiring': 'प्रतिभा भर्ती / नियुक्ति सहयोग',
        'Book / ISBN Publishing & Media Outreach': 'पुस्तक / ISBN प्रकाशन एवं मीडिया प्रचार',
        'General Corporate Inquiry': 'सामान्य कॉर्पोरेट पूछताछ',
      },
    },
    feedback: {
      badge: 'समुदाय के विचार',
      title: 'उपयोगकर्ता एवं सदस्य प्रतिक्रिया',
      subtitle: 'हमारे ग्राहकों, संस्थागत साझेदारों और सदस्यों के प्रमाणित अनुभव।',
      formTitle: 'अपनी प्रतिक्रिया साझा करें',
      formSubtitle: 'JIGSY INDIA के साथ अपने अनुभव के बारे में बताएं।',
      nameLabel: 'आपका नाम',
      namePlaceholder: 'अपना पूरा नाम लिखें',
      roleLabel: 'भूमिका / संगठन',
      rolePlaceholder: 'ग्राहक, साझेदार या सदस्य',
      ratingLabel: 'रेटिंग',
      commentLabel: 'आपकी प्रतिक्रिया',
      commentPlaceholder: 'JIGSY INDIA की सेवाओं या सहयोग के बारे में अपने विचार साझा करें...',
      submitBtn: 'सबमिट करें',
      successMsg: 'धन्यवाद! आपकी प्रतिक्रिया सफलतापूर्वक सबमिट हो गई है।',
      captchaError: 'अमान्य सुरक्षा कोड। कृपया पुनः प्रयास करें।',
    },
    captcha: {
      label: 'सुरक्षा सत्यापन (CAPTCHA)',
      placeholder: 'ऊपर दिया कोड लिखें',
      helper: 'पीले बॉक्स में दिखाए गए अक्षर दर्ज करें (केस-इनसेंसिटिव)।',
      refreshTitle: 'नया सुरक्षा कोड प्राप्त करें',
    },
    footer: {
      contactHeading: 'पंजीकृत कार्यालय एवं संपर्क',
      sectorsHeading: 'कॉर्पोरेट सेक्टर',
      companyHeading: 'कंपनी एवं नेतृत्व',
      connectHeading: 'जुड़ें एवं संसाधन',
      allSectors: 'सभी 6 कॉर्पोरेट सेक्टर',
      aboutCompany: 'कंपनी के बारे में',
      founder: 'संस्थापक — श्री जिज्ञासु वत्स',
      directors: 'निदेशक मंडल',
      howToEngage: 'हमसे कैसे जुड़ें',
      careers: 'करियर',
      contactUs: 'संपर्क करें',
      privacyPolicy: 'गोपनीयता नीति',
      termsConditions: 'नियम एवं शर्तें',
      cookiePolicy: 'कुकी नीति',
      founderPortfolio: 'संस्थापक पोर्टफोलियो (jigyasu.jigsy.in)',
      adminDesk: 'एडमिन डेस्क',
      developedBy: 'द्वारा विकसित एवं अनुरक्षित',
      rightsReserved: 'सर्वाधिकार सुरक्षित।',
    },
    legal: {
      privacyTab: 'गोपनीयता नीति',
      termsTab: 'नियम एवं शर्तें',
      consentNote: 'स्वीकार करने पर इस ब्राउज़र सत्र के लिए हमारी कॉर्पोरेट नीतियों की आपकी सहमति दर्ज होती है।',
      closeBtn: 'बंद करें',
      acceptBtn: 'मैं समझता/समझती हूँ एवं स्वीकार करता/करती हूँ',
      acceptedBadge: 'नीति सहमति दर्ज',
    },
    errors: {
      notFoundBadge: '404 · पृष्ठ उपलब्ध नहीं',
      notFoundTitle: 'यह लिंक अभी सक्रिय नहीं है',
      notFoundDesc:
        'आपके द्वारा अनुरोधित पृष्ठ या लिंक या तो उपलब्ध नहीं है, स्थानांतरित हो गया है, या वर्तमान में सक्रिय नहीं है। आगे बढ़ने के लिए नीचे दिए विकल्पों में से चुनें।',
      pdfBadge: 'दस्तावेज़ / लिंक उपलब्ध नहीं',
      pdfTitle: 'अनुरोधित फ़ाइल या बाहरी संसाधन नहीं मिला',
      pdfDesc:
        'इस पथ पर संबंधित पीडीएफ दस्तावेज़ या गिटहब संसाधन उपलब्ध नहीं है। नवीनतम आधिकारिक दस्तावेज़ हेतु आप सीधे हमारी टीम से संपर्क कर सकते हैं।',
      verificationBadge: 'सेवा अस्थायी रूप से बंद',
      verificationTitle: 'कर्मचारी सत्यापन अभी अस्थायी रूप से बंद है',
      verificationDesc:
        'रजिस्ट्री प्रणाली के उन्नयन के कारण सार्वजनिक कर्मचारी सत्यापन सेवा अस्थायी रूप से रोकी गई है। आधिकारिक HR या प्रमाणपत्र सत्यापन हेतु कृपया संपर्क फॉर्म द्वारा अनुरोध भेजें।',
      runtimeBadge: 'इंटरैक्टिव रिकवरी सूचना',
      runtimeTitle: 'इस अनुभाग को लोड करने में बाधा आई',
      runtimeDesc:
        'हमने इस तकनीकी व्यवधान को सुरक्षित रूप से संभाल लिया है। आप इस पृष्ठ को पुनः लोड कर सकते हैं या मुख्य पृष्ठ पर लौट सकते हैं।',
      cookieBadge: 'कुकी एवं ब्राउज़र प्राथमिकताएं',
      cookieTitle: 'कुकी नीति का सारांश',
      cookieDesc:
        'JIGSY INDIA सुगम अनुभव हेतु केवल आवश्यक स्थानीय प्राथमिकताएं (थीम मोड, चुनी गई भाषा और नीति सहमति) सहेजता है। इस पोर्टल पर कोई विज्ञापन ट्रैकर नहीं चलता। आप अपने ब्राउज़र की सेटिंग्स से कभी भी कुकीज़ प्रबंधित कर सकते हैं।',
      requestedPathLabel: 'अनुरोधित पथ / संसाधन:',
      triviaLabel: 'जब आप यहाँ हैं — JIGSY रोचक तथ्य',
      nextFactBtn: 'अगला तथ्य देखें',
      goHomeBtn: 'मुख्य पृष्ठ पर लौटें',
      exploreSectorsBtn: 'सभी 6 सेक्टर देखें',
      contactUsBtn: 'संपर्क फॉर्म खोलें',
      reloadBtn: 'पुनः लोड करें',
      facts: [
        'JIGSY INDIA के विज़न की परिकल्पना 3 अक्टूबर 2010 को हुई थी और 2025 में इसे DPIIT मान्यता प्राप्त कंपनी के रूप में निगमित किया गया।',
        'JIGSY के अंतर्गत छह प्रभाग — Tech, Consult, R&D, DigiTech, EduTech और Youth — एक साथ कार्य करते हैं।',
        'हमारी संस्कृत टैगलाइन "जिज्ञासु ईक्षण ग्रंथि समृद्धि युक्ति" जिज्ञासा, दूरदृष्टि और सामूहिक समृद्धि का प्रतीक है।',
        'छात्र इंटर्नशिप और युवा कौशल अनुभव कार्यक्रम youth.jigsy.in पोर्टल पर पृथक रूप से संचालित होते हैं।',
      ],
    },
  },
  mai: {
    nav: {
      marquee:
        'बहु-क्षेत्रीय उद्यम · सॉफ्टवेयर आ क्लाउड · व्यावसायिक परामर्श · अनुप्रयुक्त अनुसंधान · आईएसबीएन प्रकाशन · एडुटेक आ कैंपस इनक्यूबेशन · युवा इंटर्नशिप: youth.jigsy.in',
      home: 'मुख्य पृष्ठ',
      sectorsServices: 'सेक्टर आ सेवा',
      allSectorsOverview: 'सभ ६ सेक्टरक अवलोकन',
      about: 'हमरा बारे में',
      aboutCompany: 'कंपनीक परिचय',
      aboutCompanySub: 'विरासत, मिशन आ ६ प्रभाग',
      founder: 'संस्थापक — श्री जिज्ञासु वत्स',
      founderSub: 'परिकल्पना, कार्यान्वयन आ पोर्टफोलियो',
      directors: 'निदेशक मंडल',
      directorsSub: 'श्री सुभाष चंद्र झा आ श्री जिज्ञासु वत्स',
      howToEngage: 'हमरा सँ जुड़ू',
      howToEngageSub: 'ग्राहक, MoU, करियर आ युवा',
      careers: 'करियर',
      contact: 'संपर्क करू',
      requestService: 'सेवा अनुरोध',
      youthPortal: 'यूथ पोर्टल',
      lightMode: 'लाइट',
      darkMode: 'डार्क',
      adminDesk: 'एडमिन डेस्क',
    },
    hero: {
      ribbons: [
        'JIGSY INDIA · सॉफ्टवेयर, परामर्श, अनुसंधान, प्रकाशन आ एडुटेक प्रदान करय वला बहु-क्षेत्रीय उद्यम',
        'कॉर्पोरेट सहयोग, प्रोजेक्ट प्रस्ताव, संस्थागत MoU आ कैंपस इनक्यूबेशन लेल आमंत्रण',
        'ॐ जिज्ञासु ईक्षण ग्रंथि समृद्धि युक्ति · JIGYASU INTEGRATED GLOBAL SERVICES with YOU ॐ',
      ],
      badge: 'DPIIT मान्यता प्राप्त स्टार्टअप · विज़न २०१० सँ',
      titleLine1: 'एकीकृत वैश्विक सेवा',
      titleLine2: 'छह विशेषज्ञ सेक्टर में',
      description:
        'JIGSY INDIA छह विशेषज्ञ प्रभाग — सॉफ्टवेयर आ क्लाउड, व्यावसायिक परामर्श, अनुप्रयुक्त अनुसंधान, प्रकाशन आ मीडिया, एडुटेक प्रशिक्षण आ युवा कौशल अनुभव — केँ एक संग जोड़ैत अछि।',
      ctaPrimary: 'सेवा अनुरोध करू',
      ctaSecondary: 'सभ ६ सेक्टर देखू',
      ctaTertiary: 'हमरा सँ कोना जुड़ब',
      stat1Val: '६ सेक्टर',
      stat1Lbl: 'एकीकृत परिचालन प्रभाग',
      stat2Val: 'DPIIT · MSME',
      stat2Lbl: 'पंजीकृत आ GST सत्यापित',
      stat3Val: 'वैश्विक पहुंच',
      stat3Lbl: 'प्रौद्योगिकी, परामर्श आ शोध',
      exploreSlidePrefix: 'देखू',
      slides: [
        {
          title: 'वेब, सास आ एंटरप्राइज क्लाउड सिस्टम',
          subtitle: 'JIGSY Tech द्वारा निर्मित स्केलेबल सॉफ्टवेयर, डेटाबेस इंजीनियरिंग आ आईटी सहायता।',
          tag: 'JIGSY Tech',
          slug: 'tech',
        },
        {
          title: 'वैश्विक आईएसबीएन प्रकाशन आ अनुप्रयुक्त अनुसंधान',
          subtitle: 'JIGSY R&D आ JIGSY DigiTech द्वारा पुस्तक प्रकाशन आ शोध सहयोग।',
          tag: 'JIGSY R&D & DigiTech',
          slug: 'digitech',
        },
        {
          title: 'कैंपस इनक्यूबेशन आ युवा कौशल अनुभव',
          subtitle: 'JIGSY EduTech आ youth.jigsy.in द्वारा औद्योगिक प्रशिक्षण आ कैंपस इनक्यूबेशन।',
          tag: 'JIGSY EduTech & Youth',
          slug: 'edutech',
        },
      ],
    },
    home: {
      sectorsBadge: 'सभ ६ सेक्टर आ सेवा',
      sectorsTitle: 'कॉर्पोरेट प्रभाग आ सामान्य सेवा पोर्टफोलियो',
      sectorsSubtitle:
        'हमर छह परिचालन प्रभाग आ प्रमुख सेवाक जानकारी देखू। प्रमुख कार्य देखबाक लेल कार्ड पर होवर करू वा सीधे सेवा अनुरोध भेजियौक।',
      allSectorsFilter: 'सभ ६ सेक्टर',
      servicesOffered: 'प्रमुख सेवा',
      serviceUnit: 'सेवा',
      servicesUnit: 'सेवा',
      featuredWork: 'प्रमुख कार्य झलक',
      exploreDivision: 'प्रभाग देखू',
      requestService: 'सेवा अनुरोध',
      pillarsBadge: 'JIGSY INDIA संग साझेदारी किएक करू',
      pillarsTitle: 'एकीकृत निष्पादनक चारि स्तंभ',
      pillarsSubtitle:
        'प्रत्येक कार्य में इंजीनियरिंग अनुशासन, वैधानिक पारदर्शिता, शोध गहराई आ त्वरित संवादक संगम।',
      pillars: [
        {
          title: 'बहु-क्षेत्रीय समन्वय',
          metric: '६ प्रभाग',
          desc: 'प्रौद्योगिकी, विधिक निगमन, डिजिटल मीडिया, अनुसंधान आ प्रशिक्षण एकहि कॉर्पोरेट मंच पर।',
        },
        {
          title: 'वैधानिक आ DPIIT विश्वसनीयता',
          metric: 'MCA · GST · MSME',
          desc: 'पारदर्शी प्रक्रिया, सुव्यवस्थित दस्तावेज आ नैतिक सुशासन संग पंजीकृत प्राइवेट लिमिटेड उद्यम।',
        },
        {
          title: 'अनुसंधान आधारित इंजीनियरिंग',
          metric: 'Springer · T&F',
          desc: 'एल्गोरिदम दक्षता, प्रकाशित शोध आ विश्वसनीय सिस्टम डिजाइन पर आधारित समाधान।',
        },
        {
          title: 'मिथिला-भारत सँ वैश्विक सेवा',
          metric: 'अखिल भारतीय आ वैश्विक',
          desc: 'दरभंगा, बिहार सँ संचालित भऽ देश-विदेशक उद्यम आ संस्थान सभकेँ रिमोट व हाइब्रिड सेवा।',
        },
      ],
      worksBadge: 'प्रमुख कार्य आ समाधान',
      worksTitle: 'हमर प्रभागक चयनित कार्य',
      worksSubtitle:
        'हमर टीम द्वारा निर्मित सक्रिय सॉफ्टवेयर, प्रकाशित पुस्तक, अनुपालन डेस्क आ संस्थागत पहल देखू।',
      worksAll: 'सभ कार्य',
      worksInquire: 'पूछताछ करू',
      worksVisit: 'पोर्टल खोलू',
      collabBadge: 'हमरा सँ कोना जुड़ब आ सहयोग करब',
      collabTitle: 'ग्राहक आ पेशेवर लेल सरल प्रक्रिया',
      collabSubtitle:
        'प्रोजेक्ट शुरू करबाक हो, संस्थागत MoU प्रस्ताव देबाक हो वा भविष्यक पद लेल जुड़बाक हो — हमर प्रक्रिया स्पष्ट अछि।',
      forClientsTitle: 'ग्राहक आ संस्थागत साझेदार लेल',
      forClientsBadge: 'प्रोजेक्ट · परामर्श · MoU',
      forClientsSteps: [
        {
          title: '१. सेवा अनुरोध सबमिट करू',
          desc: 'वर्तमान पृष्ठ छोड़ने बिना त्वरित संपर्क फॉर्म सँ उपयुक्त सेक्टर आ सेवा चुनू।',
        },
        {
          title: '२. कार्यक्षेत्र आ प्रस्ताव समीक्षा',
          desc: 'हमर निदेशक आ विशेषज्ञ अहाँक आवश्यकता, समयसीमा आ अनुपालनक शीघ्र समीक्षा करैत छथि।',
        },
        {
          title: '३. पारदर्शी समझौता आ चरण',
          desc: 'काज शुरू करबाक पहिने स्पष्ट डिलीवरेबल्स आ शर्त पर सहमति बनैत अछि।',
        },
        {
          title: '४. निष्पादन आ निरंतर सहयोग',
          desc: 'दस्तावेजीकरण आ कार्य पूर्णताक बादो समर्पित सहायता संग गुणवत्तापूर्ण सेवा प्राप्त करू।',
        },
      ],
      forClientsCta: 'सेवा अनुरोध शुरू करू',
      forProfessionalsTitle: 'पेशेवर आ नौकरी खोजनिहार लेल',
      forProfessionalsBadge: 'टैलेंट पूल · आगामी अवसर',
      forProfessionalsSteps: [
        {
          title: '१. हमर ६ प्रभागकेँ बुझू',
          desc: 'जानू जे अहाँक तकनीकी, विधिक, शोध वा शैक्षणिक कौशल कोन प्रभाग लेल सर्वाधिक उपयुक्त अछि।',
        },
        {
          title: '२. JIGSY टैलेंट पूल सँ जुड़ू',
          desc: 'करियर पृष्ठ पर अपन प्रोफ़ाइल आ रिज्यूमे लिंक सबमिट करू जाहि सँ नव रिक्ति पर संपर्क कएल जा सकय।',
        },
        {
          title: '३. JIGSY Youth द्वारा छात्र इंटर्नशिप',
          desc: 'औद्योगिक अनुभव आ छात्र इंटर्नशिप लेल विद्यार्थी सीधे youth.jigsy.in पर पंजीकरण कऽ सकैत छथि।',
        },
        {
          title: '४. व्यवस्थित समीक्षा आ सूचना',
          desc: 'चयनित प्रोफ़ाइलकेँ हमर टीम द्वारा सीधे साक्षात्कार आ आधिकारिक सूचना पठाओल जाइत अछि।',
        },
      ],
      forProfessionalsCta: 'करियर पृष्ठ देखू',
      fullRoadmapLink: 'विस्तृत सहभागिता मार्गदर्शिका देखू',
      leadershipEyebrow: 'सुशासन · परिकल्पना · करियर',
      leadershipTitle: 'नेतृत्व, विरासत आ अवसरकेँ जानू',
      aboutCompanyTitle: 'कंपनीक परिचय',
      aboutCompanyDesc: '३ अक्टूबर २०१० केँ परिकल्पित आ २०२५ में DPIIT, MSME तथा GST मान्यताक संग निगमित।',
      aboutCompanyCta: 'कंपनीक कथा पढ़ू',
      founderTitle: 'संस्थापक — श्री जिज्ञासु वत्स',
      founderDesc: 'परिकल्पना, सिस्टम कार्यान्वयन, शोध प्रकाशन, प्रकाशित पुस्तक आ jigyasu.jigsy.in लेल समर्पित पृष्ठ।',
      founderCta: 'संस्थापक पृष्ठ देखू',
      directorsTitle: 'निदेशक मंडल',
      directorsDesc: 'दुहू निदेशक — श्री सुभाष चंद्र झा आ श्री जिज्ञासु वत्स — सँ मिलू जे कॉर्पोरेट सुशासनक नेतृत्व करैत छथि।',
      directorsCta: 'दुहू निदेशक सँ मिलू',
      careersTitle: 'करियर आ प्रतिभा डेस्क',
      careersDesc: 'वर्तमान भर्ती स्थिति देखू वा आगामी पद लेल टैलेंट पूल में अपन प्रोफ़ाइल जमा करू।',
      careersCta: 'करियर पृष्ठ खोलू',
      youthBadge: 'JIGSY Youth पहल · बेहतर भारत लेल युवा अनुभव',
      youthTitle: 'समर्पित युवा इंटर्नशिप आ छात्र कौशल अनुभव पोर्टल',
      youthDesc:
        'युवा सशक्तिकरण आ व्यावहारिक अनुभवक प्रतिबद्धताक संग हमर JIGSY Youth प्रभाग youth.jigsy.in पर एक पृथक समर्पित पोर्टल संचालित करैत अछि।',
      youthCta: 'youth.jigsy.in पर जाउ',
      campusMouCta: 'कैंपस MoU पूछताछ',
    },
    sectorsPage: {
      badge: 'विशेषज्ञ कॉर्पोरेट इकोसिस्टम',
      title: 'JIGSY INDIA केर सभ ६ प्रभाग देखू',
      subtitle:
        'कोनो प्रभाग चुनू आ ओकर कार्यक्षेत्र, सामान्य सेवा, मुख्य क्षमता आ प्रमुख कार्य देखू।',
      activeDivision: 'सक्रिय परिचालन प्रभाग',
      profileHeading: 'प्रभाग परिचय आ दायित्व',
      deliverablesHeading: 'प्रमुख डिलीवरेबल्स',
      coreOpsHeading: 'मुख्य क्षमता',
      servicesHeadingPrefix: 'प्रदान कएल जाइत सेवा —',
      caseStudiesHeading: 'प्रमुख कार्य आ उपलब्धि',
      requestDivisionCta: 'एहि प्रभाग सँ सेवा अनुरोध करू',
      visitYouthCta: 'youth.jigsy.in पर जाउ',
      consultTitlePrefix: 'की अहाँकेँ विशेष प्रस्ताव चाही:',
      consultSubtitle: 'ई पृष्ठ छोड़ने बिना यैह स्थान पर त्वरित सेवा अनुरोध फॉर्म खोलू।',
    },
    aboutPage: {
      badge: 'कंपनीक परिचय · कॉर्पोरेट विरासत आ मिशन',
      title: 'JIGSY INDIA केर बारे में',
      mottoLabel: 'ध्येय वाक्य:',
      taglineLabel: 'टैगलाइन:',
      storyTitle: 'परिकल्पना सँ बहु-क्षेत्रीय कॉर्पोरेट वास्तविकता धरि',
      storyPara1:
        '३ अक्टूबर २०१० केँ परिकल्पित आ २०२५ में JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED रूपेँ विधिवत निगमित, JIGSY INDIA आधुनिक तकनीक, विश्वसनीय परामर्श, मौलिक अनुसंधान, प्रकाशन आ कौशल सशक्तिकरणकेँ जोड़ैत अछि।',
      storyPara2:
        'दरभंगा, बिहार में मुख्यालयक संग भारत आ विश्वक संगठन सभकेँ सेवा दैत JIGSY INDIA छह एकीकृत प्रभाग — JIGSY Tech, JIGSY Consult, JIGSY R&D, JIGSY DigiTech, JIGSY EduTech आ JIGSY Youth (youth.jigsy.in) — संचालित करैत अछि।',
      milestoneTitle: 'ऐतिहासिक मीलक पत्थर',
      milestoneText: '३ अक्टूबर २०१० केँ विज़नक परिकल्पना — २०२५ में DPIIT मान्यता प्राप्त प्राइवेट लिमिटेड कंपनीक रूप में निगमन।',
      visionTitle: 'कॉर्पोरेट मिशन आ रणनीतिक दृष्टिकोण',
      visionBullets: [
        'नैतिक कॉर्पोरेट सुशासनक संग विश्वसनीय सॉफ्टवेयर, अनुपालन, शोध, प्रकाशन आ प्रशिक्षण सेवा प्रदान करब।',
        'दीर्घकालिक व्यावसायिक साझेदारी, शैक्षणिक MoU आ कैंपस इनक्यूबेशन कार्यक्रमक निर्माण।',
        'समर्पित JIGSY Youth पोर्टलक माध्यम सँ भारतीय युवाकेँ व्यावहारिक औद्योगिक अनुभव प्रदान करब।',
      ],
      registeredOffice: 'पंजीकृत कार्यालय:',
      conceived: 'परिकल्पना:',
      incorporated: 'निगमन:',
      divisions: 'परिचालन प्रभाग:',
      proposalCta: 'कॉर्पोरेट अनुरोध भेजियौक',
      footprintBadge: 'बहु-क्षेत्रीय कॉर्पोरेट संरचना',
      footprintTitle: 'एक विधिक इकाईक अंतर्गत छह विशेषज्ञ प्रभाग',
      inspectAll: 'सभ सेक्टर देखू',
      coreServicesUnit: 'सेवा',
      openFounderCta: 'संस्थापक पृष्ठ खोलू',
      viewDirectorsCta: 'दुहू निदेशककेँ देखू',
      openEngageCta: 'सहभागिता मार्गदर्शिका खोलू',
    },
    founderPage: {
      roleLine: 'संस्थापक · निदेशक · मुख्य प्रौद्योगिकी वास्तुकार',
      badge: 'संस्थापकक परिकल्पना आ कार्यान्वयन अभिलेख',
      headlinePrefix: '२०१० केर एक परिकल्पना सँ',
      headlineHighlight: 'छह-प्रभाग वला वैश्विक उद्यम धरि',
      bioExtra:
        '३ अक्टूबर २०१० केँ परिकल्पित, श्री जिज्ञासु वत्स कंप्यूटर विज्ञान अनुसंधान, एंटरप्राइज सॉफ्टवेयर इंजीनियरिंग, वैधानिक परामर्श, वैश्विक आईएसबीएन प्रकाशन आ युवा मार्गदर्शनकेँ एक सशक्त संगठन में जोड़बाक लेल JIGSY INDIA केर नींव रखलनि।',
      stat1Lbl: 'विज़न सँ प्रा. लि.',
      stat2Lbl: 'WoS, Scopus आ ISBN',
      stat3Lbl: 'Mastering DSA पुस्तक',
      stat4Lbl: 'उद्योग इंटर्नशिप',
      collaborateCta: 'संस्थापक कार्यालय सँ जुड़ू',
      directorsCta: 'निदेशक मंडल',
      tabIdeation: 'परिकल्पना आ यात्रा (२०१०–२०२६)',
      tabImplementation: '६-प्रभाग कार्यान्वयन',
      tabResearch: '५ शोध कार्य आ २०२६ पुस्तक',
      architectedActive: 'सक्रिय प्रभाग',
      inspectArchitecturePrefix: 'देखू',
      bookBadge: 'वैश्विक आईएसबीएन प्रकाशन · अमेज़न KDP (जून २०२६)',
      bookDesc:
        'जून २०२६ में प्रकाशित (ISBN-13: 979-8181718425 · ASIN: B0H5QK7NF2)। स्पष्ट व्याख्या आ व्यावहारिक इंजीनियरिंग टेम्पलेट संग डेटा स्ट्रक्चर्स आ एल्गोरिदमक स्वतंत्र रूप सँ रचित पाठ्यपुस्तक।',
      papersHeading: 'समकक्ष-समीक्षित शोध आ कार्यवाही (५ कार्य · २०२५–२०२६)',
      milestone1Title: 'शैक्षणिक आधार (KVS, B.Tech, M.Tech आ MBA)',
      milestone1Desc:
        'केंद्रीय विद्यालय (KVS) सँ कंप्यूटर साइंस संग १२वीं, AI/ML ऐड-ऑन सहित B.Tech (CSE), संदीप विश्वविद्यालय सँ M.Tech (CSE) तथा MBA।',
      milestone2Title: 'IRCTC सॉफ्टवेयर आ डेटाबेस इंटर्नशिप',
      milestone2Desc:
        'IRCTC (नई दिल्ली) में एंटरप्राइज डेटाबेस कार्यप्रणाली, API एकीकरण आ सॉफ्टवेयर इंजीनियरिंग पर औद्योगिक इंटर्नशिप पूर्ण कएलनि।',
      milestone3Title: 'वैश्विक ISBN लेखन आ समकक्ष-समीक्षित शोध',
      milestone3Desc:
        'जून २०२६ में अमेज़न KDP पर "Mastering DSA Without Fear" पुस्तक प्रकाशित कएलनि तथा Springer Nature (WoS), Taylor & Francis (Scopus), GTISD, FAIR आ वेदाञ्जलि में ५ शोध कार्य प्रकाशित कएलनि।',
      portfolioBadge: 'संस्थापकक आधिकारिक व्यक्तिगत पोर्टफोलियो',
      portfolioTitle: 'श्री जिज्ञासु वत्सक संपूर्ण पोर्टफोलियो देखू',
      portfolioDesc:
        'संपूर्ण शोध सार, सॉफ्टवेयर रिपॉजिटरी, प्रकाशन आ तकनीकी लेख सीधे हुनक समर्पित पोर्टफोलियो पर पढ़ू।',
      timeline: [
        {
          year: '३ अक्टूबर २०१०',
          phase: 'उत्पत्ति आ परिकल्पना',
          title: 'JIGSY विज़नक संकल्पना',
          desc: 'जिज्ञासा, बहु-विषयक एकीकरण आ विश्वसनीय वैश्विक सेवाकेँ जोड़य वला मूल सिद्धांतक स्थापना।',
        },
        {
          year: 'मई २०१९ – जून २०२१',
          phase: 'शिक्षा आ IRCTC इंटर्नशिप',
          title: '१२वीं (KVS · CS), B.Tech (CSE · AI/ML) आ IRCTC इंटर्नशिप',
          desc: 'केंद्रीय विद्यालय (KVS) सँ कंप्यूटर साइंस विषय संग १२वीं पूर्ण कएलनि, ओकर बाद AI/ML ऐड-ऑन सहित B.Tech (CSE) आ IRCTC में औद्योगिक इंटर्नशिप कएलनि।',
        },
        {
          year: 'सितंबर २०२५ – वर्तमान',
          phase: 'कॉर्पोरेट निगमन',
          title: 'संस्थापक आ निदेशक, JIGYASU INTEGRATED GLOBAL SERVICES PVT. LTD.',
          desc: 'दरभंगा में MCA, DPIIT स्टार्टअप इंडिया, GST आ MSME पंजीकरण संग JIGSY INDIA केर निगमन आ सभ छह प्रभागक सक्रिय संचालन।',
        },
        {
          year: '२०२६',
          phase: 'M.Tech, ISBN पुस्तक आ शोध',
          title: 'M.Tech (संदीप विश्वविद्यालय), प्रकाशित पुस्तक (जून २०२६) आ ५ शोध पत्र',
          desc: 'संदीप विश्वविद्यालय सँ M.Tech (CSE) आ MBA संग जून २०२६ में अमेज़न KDP पर "Mastering DSA Without Fear" प्रकाशित तथा Springer Nature (WoS), Taylor & Francis (Scopus), GTISD, FAIR आ वेदाञ्जलि में ५ शोध कार्य।',
        },
      ],
    },
    directorsPage: {
      badge: 'निदेशक मंडल · कार्यकारी सुशासन',
      title: 'JIGSY INDIA केर नेतृत्व करय वला निदेशक',
      subtitle:
        'JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED केर नेतृत्व दू समर्पित निदेशक द्वारा कएल जाइत अछि जे प्रशासनिक सुशासन आ तकनीकी नवाचारक संगम प्रस्तुत करैत छथि।',
      boardMandate: 'निदेशक दायित्व',
      hideOversight: 'विस्तृत कार्यक्षेत्र नुकाउ',
      showOversight: 'विस्तृत कार्यक्षेत्र आ फोकस देखू',
      readFounderPage: 'संस्थापकक समर्पित पृष्ठ खोलू',
      connectGovernance: 'सुशासन आ MoU लेल संपर्क करू',
      assurance1Title: 'MCA आ DPIIT अनुपालित',
      assurance1Desc: 'सक्रिय MCA, DPIIT स्टार्टअप इंडिया, GSTIN आ MSME पंजीकरणक अंतर्गत निगमित।',
      assurance2Title: 'नैतिक बहु-क्षेत्रीय सेवा',
      assurance2Desc: 'सभ ६ सेक्टर में पारदर्शी कार्यक्षेत्र, लिखित समझौता आ प्रत्यक्ष निदेशक उत्तरदायित्व।',
      assurance3Title: 'उद्यम आ संस्थान लेल तत्पर',
      assurance3Desc: 'कॉर्पोरेट अनुबंध, विश्वविद्यालय MoU, इनक्यूबेशन सेंटर आ संयुक्त शोध लेल पूर्ण तैयार।',
      profiles: [
        {
          badge: 'कार्यकारी मंडल · सुशासन',
          mandate: 'कॉर्पोरेट सुशासन, प्रशासन आ रणनीतिक मीडिया आउटरीच',
          focusAreas: [
            'बोर्ड-स्तरीय वैधानिक सुशासन, MCA/ROC अनुपालन निगरानी आ नैतिक नीति संचालन',
            'मुख्यालय आ क्षेत्रीय संचालन में रणनीतिक प्रशासनिक प्रबंधन',
            'संस्थागत संबंध, जनसंपर्क आ राष्ट्रीय डिजिटल मीडिया संवाद',
            'व्यावसायिक साझेदारी निरीक्षण आ दीर्घकालिक संगठनात्मक समन्वय',
          ],
          quote:
            'टिकाऊ संस्थानक निर्माण अनुशासित सुशासन, पारदर्शी प्रशासन आ प्रत्येक साझेदारक प्रति निष्ठावान सेवा सँ होइत अछि।',
        },
        {
          badge: 'संस्थापक · प्रौद्योगिकी आ अनुसंधान',
          mandate: 'प्रौद्योगिकी वास्तुकला, अनुप्रयुक्त अनुसंधान आ बहु-क्षेत्रीय कार्यान्वयन',
          focusAreas: [
            'JIGSY Tech आ JIGSY EduTech में सॉफ्टवेयर इंजीनियरिंग व क्लाउड आर्किटेक्चर',
            'अनुप्रयुक्त शोध निर्देशन, समकक्ष-समीक्षित प्रकाशन आ JIGSY R&D सेल नेतृत्व',
            'वैश्विक आईएसबीएन प्रकाशन ("Mastering DSA Without Fear") आ संस्थागत शैक्षणिक MoU',
            'JIGSY Youth केर माध्यम सँ युवा मेंटरशिप आ व्यावहारिक कौशल अनुभव रणनीति',
          ],
          quote:
            'सच्चा नवाचार तखन होइत अछि जखन मौलिक विज्ञान व्यावहारिक प्रणाली बनि उद्यम, संस्थान आ युवाकेँ सशक्त बनबैत अछि।',
        },
      ],
    },
    engagePage: {
      badge: 'इंटरैक्टिव सहभागिता मार्गदर्शिका',
      title: 'JIGSY INDIA सँ कोना जुड़ब',
      subtitle:
        'व्यावसायिक सेवा, संस्थागत MoU, करियर वा छात्र कौशल अनुभवक सटीक प्रक्रिया देखबाक लेल नीचाँ अपन श्रेणी चुनू।',
      pathways: [
        {
          id: 'enterprise',
          label: 'ग्राहक आ उद्यम लेल',
          badge: 'प्रोजेक्ट · परामर्श · मीडिया',
          title: 'सॉफ्टवेयर, परामर्श, अनुसंधान वा प्रकाशन प्रोजेक्ट शुरू करू',
          summary:
            'कस्टम सॉफ्टवेयर, व्यवसाय निगमन आ कर अनुपालन, अनुप्रयुक्त शोध वा प्रकाशन अभियान लेल सीधे JIGSY Tech, JIGSY Consult, JIGSY R&D वा JIGSY DigiTech संग काज करू।',
          steps: [
            {
              title: '१. सेवा अनुरोध सबमिट करू',
              detail: 'अपन पृष्ठ छोड़ने बिना संपर्क फॉर्म द्वारा उपयुक्त सेक्टर, सेवा आ विवरण भेजियौक।',
            },
            {
              title: '२. कार्यक्षेत्र आ तकनीकी समीक्षा',
              detail: 'हमर निदेशक आ विशेषज्ञ तकनीकी वा वैधानिक आवश्यकताक समीक्षा कऽ शीघ्र उत्तर दैत छथि।',
            },
            {
              title: '३. स्पष्ट प्रस्ताव आ समयसीमा',
              detail: 'काज शुरू करबाक पहिने डिलीवरेबल्स, चरण आ पारदर्शी शर्त पर सहमति बनैत अछि।',
            },
            {
              title: '४. निष्पादन आ निरंतर सहायता',
              detail: 'सुव्यवस्थित दस्तावेजीकरण आ डिलीवरीक बादो तकनीकी सहायता संग कार्य पूर्णता।',
            },
          ],
          ctaLabel: 'सेवा अनुरोध फॉर्म खोलू',
        },
        {
          id: 'academic',
          label: 'कॉलेज आ संस्थागत MoU',
          badge: 'MoU · इनक्यूबेशन · प्रशिक्षण',
          title: 'संस्थागत MoU, कैंपस इनक्यूबेशन आ औद्योगिक प्रशिक्षण',
          summary:
            'कॉलेज आ विश्वविद्यालय संरचित MoU, हाइब्रिड औद्योगिक प्रशिक्षण, कार्यशाला आ कैंपस इनक्यूबेशन केंद्र लेल JIGSY EduTech आ JIGSY R&D संग साझेदारी करैत छथि।',
          steps: [
            {
              title: '१. संस्थागत विवरण साझा करू',
              detail: 'संपर्क फॉर्म द्वारा अपन संस्थान, संकाय आ वांछित कार्यक्रम प्रारूपक जानकारी भेजियौक।',
            },
            {
              title: '२. पाठ्यक्रम आ कार्यक्रम समन्वय',
              detail: 'हम कार्यशाला, प्रशिक्षण मॉड्यूल आ इनक्यूबेशन लैबकेँ शैक्षणिक मानकक अनुरूप बनबैत छी।',
            },
            {
              title: '३. औपचारिक MoU हस्ताक्षर',
              detail: 'समयसारिणी, मार्गदर्शन आ डिलीवरेबल्स सहित पारदर्शी संस्थागत MoU निष्पादित होइत अछि।',
            },
            {
              title: '४. संचालन आ संयुक्त शोध पहल',
              detail: 'कैंपस में लाइव तकनीकी कार्यशाला, कौशल लैब आ सहयोगात्मक शोध परियोजना संचालित करू।',
            },
          ],
          ctaLabel: 'संस्थागत MoU अनुरोध करू',
        },
        {
          id: 'careers',
          label: 'पेशेवर आ अभ्यर्थी लेल',
          badge: 'टैलेंट पूल · आगामी पद',
          title: 'JIGSY INDIA टैलेंट पूल सँ जुड़ू',
          summary:
            'यद्यपि एखन कोनो सक्रिय कॉर्पोरेट पद रिक्त नहि अछि, पेशेवर आगामी भूमिका लेल हमर टैलेंट पूल में अपन प्रोफ़ाइल जमा कऽ सकैत छथि।',
          steps: [
            {
              title: '१. प्रभागक अवलोकन करू',
              detail: 'हमर छह प्रभाग देखू आ जानू जे अहाँक अनुभव कतय सबसँ उपयुक्त अछि।',
            },
            {
              title: '२. टैलेंट पूल में प्रोफ़ाइल जमा करू',
              detail: 'भविष्यक रिक्ति में प्राथमिकता लेल करियर पृष्ठ पर अपन रिज्यूमे/पोर्टफोलियो लिंक भेजियौक।',
            },
            {
              title: '३. आधिकारिक अपडेट देखू',
              detail: 'नव कॉर्पोरेट पदक घोषणा लेल हमर आधिकारिक LinkedIn पृष्ठ सँ जुड़ल रहू।',
            },
            {
              title: '४. प्रत्यक्ष HR संवाद',
              detail: 'हमर टीम गोपनीय रिकॉर्ड रखैत अछि आ उपयुक्त अवसर उपलब्ध भेला पर सीधे संपर्क करैत अछि।',
            },
          ],
          ctaLabel: 'करियर पृष्ठ खोलू',
        },
        {
          id: 'youth',
          label: 'युवा अनुभव आ इंटर्नशिप',
          badge: 'youth.jigsy.in पर संचालित',
          title: 'JIGSY Youth — बेहतर भारत लेल छात्र अनुभव',
          summary:
            'छात्र इंटर्नशिप आ युवा कौशल अनुभव कार्यक्रम हमर पृथक समर्पित पोर्टल youth.jigsy.in पर स्नातक आ स्नातकोत्तर विद्यार्थी लेल संचालित होइत अछि।',
          steps: [
            {
              title: '१. youth.jigsy.in पर जाउ',
              detail: 'सक्रिय इंटर्नशिप कार्यक्रम, प्रशिक्षण बैच आ युवा अनुभव पहल देखू।',
            },
            {
              title: '२. उपयुक्त ट्रैक चुनू',
              detail: 'अपन शैक्षणिक संकाय आ करियर लक्ष्यक अनुरूप संरचित कार्यक्रम चुनू।',
            },
            {
              title: '३. निर्देशित प्रोजेक्ट अनुभव',
              detail: 'व्यावहारिक कार्यस्थल अनुभव आ संरचित असाइनमेंट संग मेंटरशिप प्राप्त करू।',
            },
            {
              title: '४. पूर्णता प्रमाणन',
              detail: 'मूल्यांकन आ उपस्थिति मानदंड पूर्ण कएला पर आधिकारिक पूर्णता दस्तावेज प्राप्त करू।',
            },
          ],
          ctaLabel: 'youth.jigsy.in पर जाउ',
        },
      ],
    },
    careersPage: {
      badge: 'कॉर्पोरेट करियर आ प्रतिभा डेस्क',
      title: 'JIGSY INDIA में करियर',
      subtitle:
        'हमर छह प्रभाग में करियर अवसरक जानकारी देखू वा आगामी पद लेल अपन प्रोफ़ाइल साझा करू।',
      postReqBtn: 'भर्ती आवश्यकता पोस्ट करू',
      noOpeningsBadge: 'वर्तमान भर्ती स्थिति',
      noOpeningsTitle: 'एखन कोनो वर्तमान रिक्ति नहि अछि',
      noOpeningsDesc:
        'एहि समय हमरा लग कोनो सक्रिय कॉर्पोरेट पद रिक्त नहि अछि। तथापि, प्रतिभाशाली इंजीनियर, शोधकर्ता, विधिक सहयोगी, डिजाइनर आ शिक्षक आगामी अवसर लेल हमर टैलेंट पूल में अपन प्रोफ़ाइल सबमिट कऽ सकैत छथि।',
      talentPoolBtn: 'टैलेंट पूल में प्रोफ़ाइल जमा करू',
      linkedinBtn: 'LinkedIn पर अपडेट देखू',
      whyJoinTitle: 'JIGSY INDIA संग कार्य संस्कृति',
      whyJoinPoints: [
        {
          title: 'बहु-क्षेत्रीय अनुभव',
          desc: 'एंटरप्राइज सॉफ्टवेयर, अनुप्रयुक्त अनुसंधान, प्रकाशन, विधिक परामर्श आ शैक्षणिक नवाचार में कार्य अवसर।',
        },
        {
          title: 'नैतिक आ पारदर्शी संस्कृति',
          desc: 'व्यवस्थित मार्गदर्शन, स्पष्ट लक्ष्य आ नेतृत्व टीम संग सीधा संवाद।',
        },
        {
          title: 'लचीला रिमोट आ हाइब्रिड कार्य',
          desc: 'दरभंगा, बिहार आ अखिल भारतीय रिमोट टीमकेँ जोड़य वला संतुलित कार्य वातावरण।',
        },
      ],
      youthBannerTitle: 'की अहाँ छात्र इंटर्नशिप खोजि रहल छी?',
      youthBannerDesc:
        'छात्र इंटर्नशिप कार्यक्रम आ युवा कौशल अनुभव बैच हमर समर्पित JIGSY Youth पोर्टल youth.jigsy.in पर पृथक रूप सँ संचालित होइत अछि।',
      youthBannerCta: 'youth.jigsy.in पर जाउ',
      talentModalTitle: 'टैलेंट पूल में प्रोफ़ाइल जमा करू',
      talentModalSub: 'JIGSY INDIA में आगामी अवसर लेल अपन रिज्यूमे वा पोर्टफोलियो लिंक साझा करू।',
      talentSuccessTitle: 'प्रोफ़ाइल सफलतापूर्वक सबमिट भेल',
      talentSuccessDesc: 'JIGSY INDIA में रुचि लेल धन्यवाद। उपयुक्त पद खुलला पर हमर HR टीम अहाँ सँ संपर्क करत।',
      hireModalTitle: 'भर्ती आवश्यकता पोस्ट करू',
      hireModalSub: 'कुशल प्रतिभा वा संस्थागत भर्ती सहयोग लेल JIGSY INDIA सँ जुड़ू।',
      hireSuccessTitle: 'आवश्यकता सफलतापूर्वक सबमिट भेल',
      hireSuccessDesc: 'धन्यवाद। हमर टीमकेँ अहाँक आवश्यकता प्राप्त भऽ गेल अछि आ हम शीघ्र संपर्क करब।',
      fields: {
        fullName: 'पूरा नाम',
        email: 'ईमेल पता',
        phone: 'फ़ोन नंबर',
        preferredSector: 'पसंदीदा सेक्टर',
        experience: 'अनुभव स्तर',
        portfolioUrl: 'रिज्यूमे / पोर्टफोलियो लिंक',
        note: 'संक्षिप्त परिचय / कौशल',
        companyName: 'संगठन / कंपनीक नाम',
        contactPerson: 'संपर्क व्यक्ति',
        roleTitle: 'पद / आवश्यकता शीर्षक',
        location: 'स्थान',
        workType: 'कार्य प्रकार',
        budget: 'पारिश्रमिक / बजट',
        reqDetails: 'आवश्यकताक विवरण',
        submitBtn: 'सबमिट करू',
        submittingBtn: 'सबमिट भऽ रहल अछि...',
      },
    },
    contact: {
      pageBadge: 'कॉर्पोरेट संपर्क आ सेवा डेस्क',
      pageTitle: 'JIGSY INDIA सँ संपर्क करू',
      pageSubtitle:
        'प्रोजेक्ट प्रस्ताव, सहयोग, संस्थागत MoU, परामर्श वा सामान्य पूछताछ लेल हमर कार्यकारी डेस्क सँ संपर्क करू।',
      modalEyebrow: 'सेवा आ सहयोग अनुरोध',
      modalTitle: 'JIGSY INDIA सँ संपर्क करू',
      modalSubtitle: 'अपन उपयुक्त सेक्टर आ सेवा चुनू। हमर टीम अहाँक अनुरोधक समीक्षा कऽ शीघ्र संपर्क करत।',
      infoEyebrow: 'आधिकारिक कॉर्पोरेट कार्यालय',
      infoTitle: 'सीधे संपर्क करू',
      infoDesc:
        'व्यावसायिक प्रोजेक्ट, संस्थागत MoU, वैधानिक परामर्श, शोध सहयोग वा प्रकाशन पूछताछ लेल हमर नेतृत्व आ प्रभाग विशेषज्ञ सँ जुड़ू।',
      officeLabel: 'पंजीकृत कार्यालय',
      emailLabel: 'आधिकारिक ईमेल',
      phoneLabel: 'फ़ोन / सहायता',
      responsePromise: 'सामान्य उत्तर समय: २४ कार्य घंटाक भीतर।',
      formTitle: 'सेवा वा सहयोग अनुरोध सबमिट करू',
      formSubtitle: 'नीचाँ अपन सेक्टर, सेवा आ अनुरोध प्रकार चुनू आ सबमिट करू।',
      sectorLabel: 'सेक्टर चुनू',
      generalCorporateOption: 'सामान्य कॉर्पोरेट / बहु-क्षेत्रीय',
      serviceLabel: 'सेवा चुनू',
      customServiceOption: 'कस्टम आवश्यकता / बहु-क्षेत्रीय सहयोग',
      engagementTypeLabel: 'अनुरोध / सहभागिता प्रकार',
      nameLabel: 'पूरा नाम',
      namePlaceholder: 'अपन पूरा नाम लिखू',
      emailInputLabel: 'ईमेल पता',
      emailPlaceholder: 'name@organization.com',
      phoneInputLabel: 'मोबाइल / व्हाट्सएप नंबर',
      phonePlaceholder: '१० अंकक मोबाइल नंबर',
      orgLabel: 'संगठन / संस्थान (वैकल्पिक)',
      orgPlaceholder: 'कंपनी, कॉलेज वा स्टार्टअपक नाम',
      subjectLabel: 'विषय',
      subjectPlaceholder: 'अहाँक अनुरोध वा प्रस्तावक संक्षिप्त शीर्षक',
      detailsLabel: 'अनुरोध विवरण (सहयोग, प्रस्ताव, MoU वा कार्यक्षेत्र)',
      detailsPlaceholder: 'अपन उद्देश्य, अपेक्षित कार्य, समयसीमा वा पूछताछक विवरण लिखू...',
      captchaError: 'अमान्य सुरक्षा कोड। कृपया पीयर बॉक्स में देखाओल अक्षर सही सँ दर्ज करू।',
      submitBtn: 'सबमिट करू',
      submittingBtn: 'सबमिट भऽ रहल अछि...',
      successTitle: 'अनुरोध सफलतापूर्वक सबमिट भेल',
      successDesc: 'JIGSY INDIA सँ संपर्क करबाक लेल धन्यवाद। हमर टीमकेँ अहाँक संदेश प्राप्त भऽ गेल अछि आ हम शीघ्र संपर्क करब।',
      submitAnother: 'नव अनुरोध भेजियौक',
      closeModal: 'बंद करू',
      engagementTypes: {
        'Project Proposal & Development': 'प्रोजेक्ट प्रस्ताव आ विकास',
        'Strategic Collaboration / Partnership': 'रणनीतिक सहयोग / साझेदारी',
        'Institutional MoU & Academic Tie-Up': 'संस्थागत MoU आ शैक्षणिक समझौता',
        'Corporate / Legal & GST Compliance': 'कॉर्पोरेट / विधिक आ GST अनुपालन',
        'Campus Incubation & Industrial Training': 'कैंपस इनक्यूबेशन आ औद्योगिक प्रशिक्षण',
        'Mass Recruitment / Talent Hiring': 'प्रतिभा भर्ती / नियुक्ति सहयोग',
        'Book / ISBN Publishing & Media Outreach': 'पुस्तक / ISBN प्रकाशन आ मीडिया प्रचार',
        'General Corporate Inquiry': 'सामान्य कॉर्पोरेट पूछताछ',
      },
    },
    feedback: {
      badge: 'समुदायक विचार',
      title: 'उपयोगकर्ता आ सदस्य प्रतिक्रिया',
      subtitle: 'हमर ग्राहक, संस्थागत साझेदार आ सदस्य सभक प्रमाणित अनुभव।',
      formTitle: 'अपन प्रतिक्रिया साझा करू',
      formSubtitle: 'JIGSY INDIA संग अपन अनुभवक बारे में बताउ।',
      nameLabel: 'अहाँक नाम',
      namePlaceholder: 'अपन पूरा नाम लिखू',
      roleLabel: 'भूमिका / संगठन',
      rolePlaceholder: 'ग्राहक, साझेदार वा सदस्य',
      ratingLabel: 'रेटिंग',
      commentLabel: 'अहाँक प्रतिक्रिया',
      commentPlaceholder: 'JIGSY INDIA केर सेवा वा सहयोगक बारे में अपन विचार साझा करू...',
      submitBtn: 'सबमिट करू',
      successMsg: 'धन्यवाद! अहाँक प्रतिक्रिया सफलतापूर्वक सबमिट भऽ गेल अछि।',
      captchaError: 'अमान्य सुरक्षा कोड। कृपया पुनः प्रयास करू।',
    },
    captcha: {
      label: 'सुरक्षा सत्यापन (CAPTCHA)',
      placeholder: 'ऊपर देल कोड लिखू',
      helper: 'पीयर बॉक्स में देखाओल अक्षर दर्ज करू (केस-इनसेंसिटिव)।',
      refreshTitle: 'नव सुरक्षा कोड प्राप्त करू',
    },
    footer: {
      contactHeading: 'पंजीकृत कार्यालय आ संपर्क',
      sectorsHeading: 'कॉर्पोरेट सेक्टर',
      companyHeading: 'कंपनी आ नेतृत्व',
      connectHeading: 'जुड़ू आ संसाधन',
      allSectors: 'सभ ६ कॉर्पोरेट सेक्टर',
      aboutCompany: 'कंपनीक परिचय',
      founder: 'संस्थापक — श्री जिज्ञासु वत्स',
      directors: 'निदेशक मंडल',
      howToEngage: 'हमरा सँ कोना जुड़ब',
      careers: 'करियर',
      contactUs: 'संपर्क करू',
      privacyPolicy: 'गोपनीयता नीति',
      termsConditions: 'नियम आ शर्त',
      cookiePolicy: 'कुकी नीति',
      founderPortfolio: 'संस्थापक पोर्टफोलियो (jigyasu.jigsy.in)',
      adminDesk: 'एडमिन डेस्क',
      developedBy: 'द्वारा विकसित आ अनुरक्षित',
      rightsReserved: 'सर्वाधिकार सुरक्षित।',
    },
    legal: {
      privacyTab: 'गोपनीयता नीति',
      termsTab: 'नियम आ शर्त',
      consentNote: 'स्वीकार कएला पर एहि ब्राउज़र सत्र लेल हमर कॉर्पोरेट नीतिक अहाँक सहमति दर्ज होइत अछि।',
      closeBtn: 'बंद करू',
      acceptBtn: 'हम बुझलहुँ आ स्वीकार करैत छी',
      acceptedBadge: 'नीति सहमति दर्ज',
    },
    errors: {
      notFoundBadge: '४०४ · पृष्ठ उपलब्ध नहि',
      notFoundTitle: 'ई लिंक एखन सक्रिय नहि अछि',
      notFoundDesc:
        'अहाँ द्वारा अनुरोधित पृष्ठ वा लिंक उपलब्ध नहि अछि वा स्थानांतरित भऽ गेल अछि। आगू बढ़बाक लेल नीचाँ देल विकल्प में सँ चुनू।',
      pdfBadge: 'दस्तावेज़ / लिंक उपलब्ध नहि',
      pdfTitle: 'अनुरोधित फ़ाइल वा बाहरी संसाधन नहि भेटल',
      pdfDesc:
        'एहि पथ पर संबंधित पीडीएफ दस्तावेज़ वा गिटहब संसाधन उपलब्ध नहि अछि। नवीनतम आधिकारिक दस्तावेज़ लेल अहाँ सीधे हमर टीम सँ संपर्क कऽ सकैत छी।',
      verificationBadge: 'सेवा अस्थायी रूप सँ बंद',
      verificationTitle: 'कर्मचारी सत्यापन एखन अस्थायी रूप सँ बंद अछि',
      verificationDesc:
        'रजिस्ट्री प्रणालीक उन्नयनक कारण सार्वजनिक कर्मचारी सत्यापन सेवा अस्थायी रूप सँ रोकल गेल अछि। आधिकारिक HR वा प्रमाणपत्र सत्यापन लेल कृपया संपर्क फॉर्म द्वारा अनुरोध भेजियौक।',
      runtimeBadge: 'इंटरैक्टिव रिकवरी सूचना',
      runtimeTitle: 'एहि अनुभागकेँ लोड करबा में बाधा आएल',
      runtimeDesc:
        'हम एहि तकनीकी व्यवधानकेँ सुरक्षित रूप सँ संभालि लेलहुँ अछि। अहाँ एहि पृष्ठकेँ पुनः लोड कऽ सकैत छी वा मुख्य पृष्ठ पर लौट सकैत छी।',
      cookieBadge: 'कुकी आ ब्राउज़र प्राथमिकता',
      cookieTitle: 'कुकी नीतिक सारांश',
      cookieDesc:
        'JIGSY INDIA सुगम अनुभव लेल केवल आवश्यक स्थानीय प्राथमिकता (थीम मोड, चुनल भाषा आ नीति सहमति) सहेजैत अछि। एहि पोर्टल पर कोनो विज्ञापन ट्रैकर नहि चलैत अछि।',
      requestedPathLabel: 'अनुरोधित पथ / संसाधन:',
      triviaLabel: 'जखन अहाँ एतय छी — JIGSY रोचक तथ्य',
      nextFactBtn: 'अगिला तथ्य देखू',
      goHomeBtn: 'मुख्य पृष्ठ पर लौटू',
      exploreSectorsBtn: 'सभ ६ सेक्टर देखू',
      contactUsBtn: 'संपर्क फॉर्म खोलू',
      reloadBtn: 'पुनः लोड करू',
      facts: [
        'JIGSY INDIA केर विज़नक परिकल्पना ३ अक्टूबर २०१० केँ भेल छल आ २०२५ में एकरा DPIIT मान्यता प्राप्त कंपनीक रूप में निगमित कएल गेल।',
        'JIGSY केर अंतर्गत छह प्रभाग — Tech, Consult, R&D, DigiTech, EduTech आ Youth — एक संग काज करैत छथि।',
        'हमर संस्कृत टैगलाइन "जिज्ञासु ईक्षण ग्रंथि समृद्धि युक्ति" जिज्ञासा, दूरदृष्टि आ सामूहिक समृद्धिक प्रतीक अछि।',
        'छात्र इंटर्नशिप आ युवा कौशल अनुभव कार्यक्रम youth.jigsy.in पोर्टल पर पृथक रूप सँ संचालित होइत अछि।',
      ],
    },
  },
};

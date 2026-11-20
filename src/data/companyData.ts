import { Sector, InternshipTrack, Job, EmployeeRecord, Review } from '../types';
import { resolveAssetUrl } from '../utils/portalHelpers';

export const COMPANY_DETAILS = {
  name: 'JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED',
  shortName: 'JIGSY INDIA',
  cin: 'U62099BR2025PTC078592',
  dpiit: 'DIPP228528',
  gstin: '10AAHCJ0404B1ZN',
  msme: 'UDYAM-BR-34-0051280',
  conceptionDate: 'October 3, 2010',
  incorporationYear: '2025',
  registeredOffice: 'South Dighi, Darbhanga, Bihar, India - 846004',
  officialEmail: 'jigsy25@gmail.com',
  officialPhone: '+91 94314 00022',
  upiId: 'jigsy25@okaxis',
  website: 'jigsy.in',
  youthPortalUrl: 'https://youth.jigsy.in',
  founderPortfolioUrl: 'https://jigyasu.jigsy.in',
  linkedinUrl: 'https://linkedin.com/company/jigsy',
  facebookUrl: 'https://facebook.com/jigsy25',
  taglineSanskrit: 'जिज्ञासु ईक्षण ग्रंथि समृद्धि युक्ति',
  mottoEnglish: 'JIGYASU INTEGRATED GLOBAL SERVICES with YOU',
  logoUrl: resolveAssetUrl('/assets/aistudio/company_logo_9f4f4bb5.png'),
  makeInIndiaUrl: resolveAssetUrl('/assets/aistudio/MadeInIndia2_9a914348.png'),
  scrollTopIconUrl: resolveAssetUrl('/assets/aistudio/top_move_up_ec85c21c.jpg'),
};

export const ENGAGEMENT_REQUEST_TYPES = [
  'Project Proposal & Development',
  'Strategic Collaboration / Partnership',
  'Institutional MoU & Academic Tie-Up',
  'Corporate / Legal & GST Compliance',
  'Campus Incubation & Industrial Training',
  'Mass Recruitment / Talent Hiring',
  'Book / ISBN Publishing & Media Outreach',
  'General Corporate Inquiry',
] as const;

export const FOUNDER_PORTRAITS = {
  chairperson: resolveAssetUrl('/assets/aistudio/JIGSY_Chairperson_Corporate_Portrait_0c353573.png'),
  standing: resolveAssetUrl('/assets/aistudio/Confident_Corporate_Portrait_at_JIGYASU__1__16c127e6.png'),
  headshot: resolveAssetUrl('/assets/aistudio/Confident_Corporate_Portrait_at_JIGYASU_a4741f9c.png'),
};

export const DIRECTORS = [
  {
    name: 'Subhash Chandra Jha',
    role: {
      en: 'Director & Strategic Governance Lead',
      hi: 'निदेशक एवं रणनीतिक सुशासन प्रमुख',
      mai: 'निदेशक आ रणनीतिक सुशासन प्रमुख',
    },
    bio: {
      en: 'A seasoned visionary leader with deep professionalism in strategic corporate management, administrative governance, and advancement in national digital media outreach.',
      hi: 'रणनीतिक कॉर्पोरेट प्रबंधन, प्रशासनिक सुशासन और राष्ट्रीय डिजिटल मीडिया आउटरीच में गहरी विशेषज्ञता वाले एक अनुभवी दूरदर्शी नेता।',
      mai: 'रणनीतिक कॉर्पोरेट प्रबंधन, प्रशासनिक सुशासन आ डिजिटल मीडिया प्रसार में पारंगत एक अनुभवी मार्गदर्शक।',
    },
    imageUrl: resolveAssetUrl('/assets/aistudio/director1_46675417.jpg'),
  },
  {
    name: 'Jigyasu Vatsa',
    role: {
      en: 'Founder, Director & Chief Technology Architect',
      hi: 'संस्थापक, निदेशक एवं मुख्य प्रौद्योगिकी वास्तुकार',
      mai: 'संस्थापक, निदेशक आ मुख्य प्रौद्योगिकी विशेषज्ञ',
    },
    bio: {
      en: 'Passionate computer scientist, software architect, and author of "Mastering DSA Without Fear" (Amazon ISBN). Dedicated to bridging academic learning with high-impact industrial engineering.',
      hi: 'कंप्यूटर वैज्ञानिक, सॉफ्टवेयर वास्तुकार और "मास्टरिंग डीएसए विदाउट फियर" के लेखक। अकादमिक ज्ञान को उच्च-स्तरीय औद्योगिक इंजीनियरिंग से जोड़ने हेतु समर्पित।',
      mai: 'कंप्यूटर वैज्ञानिक, सॉफ्टवेयर वास्तुकार आ "मास्टरिंग डीएसए विदाउट फियर"क लेखक। युवा प्रतिभाकेँ उद्योग स्तरक ज्ञान सँ जोड़ब इनका मुख्य ध्येय अछि।',
    },
    imageUrl: FOUNDER_PORTRAITS.headshot,
  },
];

export const INTERNSHIP_TRACKS: InternshipTrack[] = [
  {
    id: 'track-1-cert-30d',
    trackCode: 'JIGSY-TRK-01',
    name: {
      en: 'Internship Certification',
      hi: 'इंटर्नशिप प्रमाणन',
      mai: 'इंटर्नशिप प्रमाणन',
    },
    duration: {
      en: '4 Weeks (30 Days) / 6 Weeks',
      hi: '4 सप्ताह (30 दिवस) / 6 सप्ताह',
      mai: '४ सप्ताह (३० दिन) / ६ सप्ताह',
    },
    originalPrice: 2999,
    discountedPrice: 500,
    courseFee: 0,
    miscFee: 500,
    description: {
      en: 'Foundation program focusing on core industrial practices, practical domain assignments, structured documentation workflows, and official completion credentials for multi-stream scholars.',
      hi: 'व्यावहारिक कार्य, प्रलेखन प्रक्रिया और आधिकारिक पूर्णता प्रमाणन पर केंद्रित सभी संकायों हेतु मूलभूत कार्यक्रम।',
      mai: 'व्यावहारिक काज, दस्तावेज़ीकरण प्रणाली आ आधिकारिक पूर्णता प्रमाणन पर आधारित सभ संकाय लेल कार्यक्रम।',
    },
    highlights: {
      en: [
        'Hands-on practical module & applied domain assignment',
        'Structured project workflow, documentation & quality review standards',
        'Direct task evaluation by JIGSY sector mentors',
        'Official Verified Internship Completion Certificate',
      ],
      hi: [
        'व्यावहारिक मॉड्यूल व क्षेत्र-आधारित प्रोजेक्ट कार्य',
        'सुव्यवस्थित कार्यप्रणाली, प्रलेखन एवं गुणवत्ता समीक्षा मानक',
        'जिग्सी मार्गदर्शकों द्वारा प्रत्यक्ष कार्य मूल्यांकन',
        'आधिकारिक सत्यापित इंटर्नशिप पूर्णता प्रमाण पत्र',
      ],
      mai: [
        'व्यावहारिक मॉड्यूल आ विषय आधारित प्रोजेक्ट काज',
        'सुव्यवस्थित कार्यप्रणाली, प्रलेखन आ गुणवत्ता समीक्षा',
        'जिग्सी मार्गदर्शक द्वारा प्रत्यक्ष कार्य मूल्यांकन',
        'आधिकारिक सत्यापित इंटर्नशिप पूर्णता प्रमाण पत्र',
      ],
    },
    deliverables: {
      en: 'Verified Certificate + Project Deliverable + Letter of Completion',
      hi: 'सत्यापित प्रमाण पत्र + प्रोजेक्ट कार्य + पूर्णता पत्र',
      mai: 'प्रमाण पत्र + प्रोजेक्ट विवरण + पूर्णता पत्रक',
    },
  },
  {
    id: 'track-2-training-cert',
    trackCode: 'JIGSY-TRK-02',
    name: {
      en: 'Internship Training Certification',
      hi: 'इंटर्नशिप प्रशिक्षण एवं प्रमाणन',
      mai: 'इंटर्नशिप प्रशिक्षण आ प्रमाणन',
    },
    duration: {
      en: '4–6 Weeks Guided Industrial Program',
      hi: '4–6 सप्ताह निर्देशित औद्योगिक कार्यक्रम',
      mai: '४–६ सप्ताह मार्गदर्शित औद्योगिक कार्यक्रम',
    },
    originalPrice: 4999,
    discountedPrice: 1000,
    courseFee: 0,
    miscFee: 1000,
    description: {
      en: 'Structured apprenticeship combining guided training, applied industry workflows, analytical problem-solving, and career readiness across technical, management, commerce, and humanities streams.',
      hi: 'निर्देशित प्रशिक्षण, व्यावहारिक औद्योगिक कार्यप्रणाली, विश्लेषणात्मक अभ्यास और साक्षात्कार तैयारी का समन्वित बहु-संकाय कार्यक्रम।',
      mai: 'मार्गदर्शित प्रशिक्षण, औद्योगिक कार्यप्रणाली आ साक्षात्कार तैयारीक समन्वित बहु-संकाय कार्यक्रम।',
    },
    highlights: {
      en: [
        'Practical domain curriculum covering execution, workflows & delivery',
        'Regular guided progress review sessions with JIGSY leads',
        'Resume structure & professional portfolio refinement',
        'Performance-based recommendation letter (subject to evaluation)',
      ],
      hi: [
        'निष्पादन, कार्यप्रणाली एवं डिलीवरी पर आधारित व्यावहारिक पाठ्यक्रम',
        'जिग्सी प्रमुखों के साथ नियमित प्रगति समीक्षा सत्र',
        'रिज्यूमे संरचना एवं व्यावसायिक पोर्टफोलियो सुधार',
        'मूल्यांकन के आधार पर अनुशंसा पत्र (LOR)',
      ],
      mai: [
        'व्यावहारिक निष्पादन आ कार्यप्रणाली पर केंद्रित सत्र',
        'जिग्सी मार्गदर्शक संग नियमित प्रगति समीक्षा',
        'रिज्यूमे आ प्रोफाइल निर्माण में सहयोग',
        'मूल्यांकनक आधार पर अनुशंसा पत्र (LOR)',
      ],
    },
    deliverables: {
      en: 'Industrial Training Certificate + Applied Project Portfolio + Official Verification Record',
      hi: 'औद्योगिक प्रशिक्षण प्रमाण पत्र + प्रोजेक्ट पोर्टफोलियो + आधिकारिक सत्यापन रिकॉर्ड',
      mai: 'औद्योगिक प्रशिक्षण प्रमाण पत्र + प्रोजेक्ट पोर्टफोलियो + सत्यापन रिकॉर्ड',
    },
  },
  {
    id: 'track-3-research-oriented',
    trackCode: 'JIGSY-TRK-03',
    name: {
      en: 'Internship Training Certification - Research Oriented',
      hi: 'इंटर्नशिप प्रशिक्षण प्रमाणन - अनुसंधान अभिमुख',
      mai: 'इंटर्नशिप प्रशिक्षण प्रमाणन - अनुसंधान आधारित',
    },
    duration: {
      en: '4–6 Weeks Guided Research Fellowship',
      hi: '4–6 सप्ताह निर्देशित शोध फेलोशिप',
      mai: '४–६ सप्ताह मार्गदर्शित अनुसंधान फेलोशिप',
    },
    originalPrice: 7999,
    discountedPrice: 2000,
    courseFee: 0,
    miscFee: 2000,
    description: {
      en: 'Introductory research-oriented fellowship alongside JIGSY R&D Cell covering structured inquiry, methodology design, analytical study, and foundational manuscript preparation across disciplines.',
      hi: 'जिग्सी आरएंडडी सेल के मार्गदर्शन में संरचित शोध पद्धति, विश्लेषणात्मक अध्ययन और प्रारंभिक शोध लेखन पर आधारित बहु-विषयक फेलोशिप।',
      mai: 'जिग्सी आरएंडडी सेलक मार्गदर्शन में शोध पद्धति, विश्लेषण आ प्रारंभिक शोध पत्र लेखन पर आधारित फेलोशिप।',
    },
    highlights: {
      en: [
        'Guided foundational research methodology & problem formulation',
        'Introductory manuscript structuring & standard citation practices',
        'Papers recommended by JIGSY R&D Cell may receive Company-sponsored publication funding (strictly subject to Management decision)',
        'Research Orientation Certificate & verified project documentation',
      ],
      hi: [
        'मौलिक शोध कार्यप्रणाली एवं समस्या निर्धारण का मार्गदर्शन',
        'प्रारंभिक शोध पत्र संरचना एवं मानक उद्धरण अभ्यास',
        'जिग्सी R&D सेल द्वारा अनुशंसित शोध पत्रों को कंपनी-प्रायोजित प्रकाशन सहायता मिल सकती है (पूर्णतः प्रबंधन के निर्णय के अधीन)',
        'अनुसंधान अभिमुख प्रमाण पत्र एवं सत्यापित प्रोजेक्ट प्रलेखन',
      ],
      mai: [
        'मौलिक शोध पद्धति आ विषय निर्धारण में मार्गदर्शन',
        'प्रारंभिक शोध पत्र रचना आ संदर्भ लेखन अभ्यास',
        'जिग्सी R&D सेल द्वारा अनुशंसित शोध पत्रकेँ कंपनी प्रायोजित प्रकाशन सहायता भेटि सकैत अछि (पूर्णतः प्रबंधनक निर्णय पर निर्भर)',
        'अनुसंधान अभिमुख प्रमाण पत्र आ प्रोजेक्ट विवरण',
      ],
    },
    deliverables: {
      en: 'Research Orientation Credential + Guided Manuscript Draft + Project Verification Record',
      hi: 'रिसर्च ओरिएंटेशन प्रमाण पत्र + निर्देशित शोध मसौदा + प्रोजेक्ट सत्यापन रिकॉर्ड',
      mai: 'रिसर्च ओरिएंटेशन प्रमाण पत्र + निर्देशित शोध मसौदा + प्रोजेक्ट सत्यापन',
    },
  },
  {
    id: 'track-4-research-overview',
    trackCode: 'JIGSY-TRK-04',
    name: {
      en: 'Research Overview - R',
      hi: 'रिसर्च ओवरव्यू - आर (R)',
      mai: 'रिसर्च ओवरव्यू - आर (R)',
    },
    duration: {
      en: '2 Weeks (15 Days) Foundational Overview',
      hi: '2 सप्ताह (15 दिवस) परिचयात्मक कार्यक्रम',
      mai: '२ सप्ताह (१५ दिन) परिचयात्मक कार्यक्रम',
    },
    originalPrice: 1499,
    discountedPrice: 250,
    courseFee: 0,
    miscFee: 250,
    description: {
      en: 'Fast-track introductory course for scholars from any academic background covering research fundamentals, literature review basics, citation ethics, and foundational data analysis.',
      hi: 'किसी भी संकाय के विद्यार्थियों हेतु शोध मूलभूत सिद्धांत, साहित्य समीक्षा, उद्धरण नैतिकता और प्रारंभिक डेटा विश्लेषण पर आधारित त्वरित परिचयात्मक कोर्स।',
      mai: 'कोनो भी संकाय केर विद्यार्थी लेल शोध सिद्धांत, साहित्य समीक्षा, उद्धरण नैतिकता आ प्रारंभिक डेटा विश्लेषणक त्वरित कोर्स।',
    },
    highlights: {
      en: [
        'Structured literature review basics & academic reading frameworks',
        'Introductory data organization & exploratory analysis concepts',
        'Academic integrity, plagiarism awareness & standard citation basics (APA/IEEE)',
        'Official Participation & Research Literacy Credential',
      ],
      hi: [
        'संरचित साहित्य समीक्षा की मूल बातें एवं शैक्षणिक पठन ढांचा',
        'प्रारंभिक डेटा संगठन एवं विश्लेषणात्मक अवधारणाएं',
        'शैक्षणिक ईमानदारी, साहित्यिक चोरी से बचाव व मानक उद्धरण परिचय',
        'आधिकारिक सहभागिता एवं शोध साक्षरता प्रमाण पत्र',
      ],
      mai: [
        'लिटरेचर रिव्यूक मूल बात आ शैक्षणिक पठन विधि',
        'प्रारंभिक डेटा व्यवस्थापन आ विश्लेषणक परिचय',
        'शैक्षणिक शुचिता, साहित्यिक चोरी सँ बचाव आ संदर्भ नियम',
        'आधिकारिक सहभागिता आ शोध साक्षरता प्रमाण पत्र',
      ],
    },
    deliverables: {
      en: 'Research Literacy Certificate + Reference Guide + Introductory Study Notes',
      hi: 'शोध साक्षरता प्रमाण पत्र + संदर्भ मार्गदर्शिका + प्रारंभिक अध्ययन नोट्स',
      mai: 'शोध साक्षरता प्रमाण पत्र + संदर्भ पुस्तिका + अध्ययन नोट्स',
    },
  },
];

export const SECTORS: Sector[] = [
  {
    id: 'sec-tech',
    code: 'JIGSY-SEC-01',
    name: 'JIGSY Tech',
    slug: 'tech',
    motto: {
      en: 'Bespoke Software Engineering, High-Availability Portals & Cloud Infrastructure',
      hi: 'विशिष्ट सॉफ्टवेयर इंजीनियरिंग, उच्च उपलब्धता पोर्टल एवं क्लाउड अवसंरचना',
      mai: 'सॉफ्टवेयर इंजीनियरिंग, उच्च क्षमता पोर्टल आ क्लाउड अवसंरचना',
    },
    shortDescription: {
      en: 'Delivering production-grade bespoke enterprise web applications, real-time collaboration engines, and cloud database optimization for institutions and enterprises.',
      hi: 'संस्थानों एवं उद्यमों हेतु उत्पादन-ग्रेड कस्टम वेब एप्लिकेशन, रीयल-टाइम संचार इंजन और क्लाउड डेटाबेस अनुकूलन समाधान।',
      mai: 'संस्थान आ व्यवसाय लेल आधुनिक वेब एप्लिकेशन, रीयल-टाइम प्लेटफॉर्म आ क्लाउड डेटाबेस सेवा।',
    },
    fullDescription: {
      en: 'JIGSY Tech serves as the core engineering wing of JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED. We architect high-concurrency systems, applicant tracking architectures, real-time WebSocket communication engines, and resilient database schemas tailored for modern compliance.',
      hi: 'जिग्सी टेक हमारी मूल इंजीनियरिंग शाखा है। हम उच्च समवर्ती प्रणालियों, आवेदक ट्रैकिंग आर्किटेक्चर, रीयल-टाइम वेबसॉकेट इंजन और मजबूत डेटाबेस स्कीमा का निर्माण करते हैं।',
      mai: 'जिग्सी टेक हमर मुख्य तकनीकी प्रभाग अछि। हम उच्च क्षमताक सॉफ्टवेयर, आवेदक ट्रैकिंग सिस्टम आ सुरक्षित डेटाबेसक निर्माण करैत छी।',
    },
    iconName: 'Code',
    colorScheme: {
      badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      accent: '#059669',
    },
    deliverables: {
      en: 'Cloud SaaS Workstations, Web Applications & High-Load APIs',
      hi: 'क्लाउड सास वर्कस्टेशन, वेब अनुप्रयोग एवं उच्च-भार एपीआई',
      mai: 'क्लाउड सास प्लेटफॉर्म, वेब अनुप्रयोग आ एपीआई',
    },
    coreOperations: {
      en: [
        'Proprietary Enterprise Applicant Tracking Systems (ATS)',
        'Real-Time WebSocket Personalized Messenger & Collaborative Channels',
        'High-Performance MySQL/PostgreSQL Schema Normalization & Query Tuning',
        'Cloud Infrastructure Deployment, REST/FastAPI Microservices & Security Audits',
      ],
      hi: [
        'स्वामित्व युक्त एंटरप्राइज आवेदक ट्रैकिंग सिस्टम (ATS)',
        'रीयल-टाइम वेबसॉकेट संदेशवाहक व सहयोगी चैनल',
        'उच्च-प्रदर्शन मायएसक्यूएल/पोस्टग्रेएसक्यूएल डेटाबेस ट्यूनिंग',
        'क्लाउड इन्फ्रास्ट्रक्चर डिप्लॉयमेंट व रेस्ट एपीआई सुरक्षा ऑडिट',
      ],
      mai: [
        'स्वामित्व आवेदक ट्रैकिंग सिस्टम (ATS)',
        'रीयल-टाइम चैट आ सहयोगी प्लेटफॉर्म',
        'डेटाबेस नॉर्मलाइजेशन आ क्वेरी सुधार',
        'क्लाउड डिप्लॉयमेंट आ एपीआई सुरक्षा ऑडिट',
      ],
    },
    services: [
      {
        title: { en: 'Web & Application Development', hi: 'Web & Application Development', mai: 'Web & Application Development' },
        description: {
          en: 'Custom websites, portals, and full-stack business applications engineered for performance and reliability.',
          hi: 'उच्च प्रदर्शन और विश्वसनीयता हेतु कस्टम वेबसाइट, पोर्टल और फुल-स्टैक व्यावसायिक एप्लिकेशन।',
          mai: 'उच्च प्रदर्शन आ विश्वसनीयता लेल कस्टम वेबसाइट, पोर्टल आ फुल-स्टैक व्यावसायिक एप्लिकेशन।',
        },
        icon: 'Code',
      },
      {
        title: { en: 'SaaS & Enterprise Software', hi: 'SaaS & Enterprise Software', mai: 'SaaS & Enterprise Software' },
        description: {
          en: 'Scalable cloud software platforms, workflow automation, and institutional management systems.',
          hi: 'स्केलेबल क्लाउड सॉफ्टवेयर प्लेटफॉर्म, वर्कफ़्लो ऑटोमेशन और संस्थागत प्रबंधन प्रणाली।',
          mai: 'स्केलेबल क्लाउड सॉफ्टवेयर प्लेटफॉर्म, वर्कफ़्लो ऑटोमेशन आ संस्थागत प्रबंधन प्रणाली।',
        },
        icon: 'Cloud',
      },
      {
        title: { en: 'Database & Cloud Management', hi: 'Database & Cloud Management', mai: 'Database & Cloud Management' },
        description: {
          en: 'Secure database architecture, automated backups, cloud hosting, and performance optimization.',
          hi: 'सुरक्षित डेटाबेस आर्किटेक्चर, स्वचालित बैकअप, क्लाउड होस्टिंग और प्रदर्शन अनुकूलन।',
          mai: 'सुरक्षित डेटाबेस आर्किटेक्चर, स्वचालित बैकअप, क्लाउड होस्टिंग आ प्रदर्शन सुधार।',
        },
        icon: 'Database',
      },
      {
        title: { en: 'IT Support & System Integration', hi: 'IT Support & System Integration', mai: 'IT Support & System Integration' },
        description: {
          en: 'End-to-end API integration, infrastructure setup, security hardening, and ongoing technical support.',
          hi: 'संपूर्ण एपीआई एकीकरण, अवसंरचना सेटअप, सुरक्षा सुदृढ़ीकरण और निरंतर तकनीकी सहायता।',
          mai: 'संपूर्ण एपीआई एकीकरण, अवसंरचना सेटअप, सुरक्षा आ निरंतर तकनीकी सहायता।',
        },
        icon: 'Server',
      },
    ],
    featuredProjects: [
      {
        title: { en: 'JIGSY Real-Time Collaboration Engine', hi: 'JIGSY Real-Time Collaboration Engine', mai: 'JIGSY Real-Time Collaboration Engine' },
        shortDescription: {
          en: 'Low-latency multi-channel communication engine with end-to-end token validation.',
          hi: 'सुरक्षित टोकन प्रमाणीकरण युक्त कम-विलंबता बहु-चैनल संचार मंच।',
          mai: 'सुरक्षित बहु-चैनल संचार आ रीयल-टाइम मैसेजिंग प्लेटफॉर्म।',
        },
        details: {
          en: ['Sub-50ms message propagation', 'Role-based access matrix', 'Encrypted attachments'],
          hi: ['50ms से कम विलंबता', 'भूमिका-आधारित पहुंच नियंत्रण', 'एन्क्रिप्टेड फाइल अटैचमेंट'],
          mai: ['अति त्वरित संदेश सम्प्रेषण', 'भूमिका आधारित सुरक्षा', 'सुरक्षित फाइल आदान-प्रदान'],
        },
        status: 'Active Deployment',
      },
      {
        title: { en: 'Enterprise Candidate Pipeline ATS', hi: 'Enterprise Candidate Pipeline ATS', mai: 'Enterprise Candidate Pipeline ATS' },
        shortDescription: {
          en: 'Automated candidate screening, verification workflows, and document generation portal.',
          hi: 'स्वचालित उम्मीदवार स्क्रीनिंग, सत्यापन वर्कफ़्लो और दस्तावेज़ निर्माण पोर्टल।',
          mai: 'स्वचालित उम्मीदवार जांच, सत्यापन आ दस्तावेज़ निर्माण पोर्टल।',
        },
        details: {
          en: ['Automated PDF generation', 'Dual-entry audit trail', 'Candidate status portal'],
          hi: ['स्वचालित पीडीएफ निर्माण', 'द्वि-प्रविष्टि ऑडिट ट्रेल', 'उम्मीदवार स्थिति ट्रैकर'],
          mai: ['स्वचालित रसीद आ पत्र निर्माण', 'ऑडिट ट्रेल', 'उम्मीदवार स्थिति जांच'],
        },
        status: 'In Production',
      },
    ],
  },
  {
    id: 'sec-youth',
    code: 'JIGSY-SEC-02',
    name: 'JIGSY Youth',
    slug: 'youth',
    motto: {
      en: 'Industrial Apprenticeships, Mentorship & Student Skill Exposure',
      hi: 'औद्योगिक शिक्षुता, मेंटरशिप एवं छात्र कौशल अनुभव',
      mai: 'औद्योगिक शिक्षुता, युवा मार्गदर्शन आ छात्र कौशल अनुभव',
    },
    shortDescription: {
      en: 'Youth-centric engagement division offering practical student exposure, structured internships, and career mentorship hosted at youth.jigsy.in.',
      hi: 'युवा-केंद्रित प्रभाग जो व्यावहारिक छात्र अनुभव, संरचित इंटर्नशिप और करियर मेंटरशिप (youth.jigsy.in पर संचालित) प्रदान करता है।',
      mai: 'युवा-केंद्रित प्रभाग जे व्यावहारिक छात्र अनुभव, संरचित इंटर्नशिप आ करियर मेंटरशिप (youth.jigsy.in पर) प्रदान करैत अछि।',
    },
    fullDescription: {
      en: 'JIGSY Youth is committed to democratizing practical industry exposure for students across India. All active student internship cohorts, enrollments, and mentorship sprints are managed on our dedicated Youth portal at youth.jigsy.in.',
      hi: 'जिग्सी यूथ भारत भर के विद्यार्थियों को सुलभ व्यावहारिक औद्योगिक अनुभव प्रदान करने हेतु प्रतिबद्ध है। सभी सक्रिय छात्र इंटर्नशिप बैच हमारे समर्पित पोर्टल youth.jigsy.in पर संचालित होते हैं।',
      mai: 'जिग्सी यूथ भारत भरिक विद्यार्थी सभकेँ सुलभ व्यावहारिक औद्योगिक अनुभव देबाक लेल प्रतिबद्ध अछि। सभ सक्रिय इंटर्नशिप बैच हमर समर्पित पोर्टल youth.jigsy.in पर संचालित होइत अछि।',
    },
    iconName: 'Users',
    colorScheme: {
      badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      accent: '#2563eb',
    },
    deliverables: {
      en: 'Structured Internships, Industrial Mentorship & Career Readiness',
      hi: 'संरचित इंटर्नशिप, औद्योगिक मेंटरशिप एवं करियर तैयारी',
      mai: 'संरचित इंटर्नशिप, औद्योगिक मेंटरशिप आ करियर तैयारी',
    },
    coreOperations: {
      en: [
        'Multi-Stream Student Internship Programs (hosted at youth.jigsy.in)',
        'Capstone & Final-Year Academic Project Mentorship',
        'Practical Workplace Readiness & Team Collaboration Exposure',
        'Career Counseling, Resume Structuring & Skill Orientation',
      ],
      hi: [
        'बहु-संकाय छात्र इंटर्नशिप कार्यक्रम (youth.jigsy.in पर संचालित)',
        'कैपस्टोन एवं अंतिम-वर्ष शैक्षणिक प्रोजेक्ट मार्गदर्शन',
        'व्यावहारिक कार्यस्थल तैयारी एवं टीम सहयोग अनुभव',
        'करियर परामर्श, रिज्यूमे निर्माण एवं कौशल अभिविन्यास',
      ],
      mai: [
        'बहु-संकाय छात्र इंटर्नशिप कार्यक्रम (youth.jigsy.in पर संचालित)',
        'कैपस्टोन आ अंतिम-वर्ष प्रोजेक्ट मार्गदर्शन',
        'व्यावहारिक कार्यस्थल तैयारी आ टीम सहयोग अनुभव',
        'करियर परामर्श, रिज्यूमे निर्माण आ कौशल अभिविन्यास',
      ],
    },
    services: [
      {
        title: { en: 'Student Internship Programs', hi: 'Student Internship Programs', mai: 'Student Internship Programs' },
        description: {
          en: 'Structured multi-stream student internship cohorts hosted separately on youth.jigsy.in.',
          hi: 'youth.jigsy.in पर पृथक रूप से संचालित संरचित बहु-संकाय छात्र इंटर्नशिप कार्यक्रम।',
          mai: 'youth.jigsy.in पर पृथक रूप सँ संचालित संरचित बहु-संकाय छात्र इंटर्नशिप कार्यक्रम।',
        },
        icon: 'Briefcase',
      },
      {
        title: { en: 'Career Guidance & Mentorship', hi: 'Career Guidance & Mentorship', mai: 'Career Guidance & Mentorship' },
        description: {
          en: 'Practical guidance on portfolios, resumes, project execution, and professional readiness.',
          hi: 'पोर्टफोलियो, रिज्यूमे, प्रोजेक्ट निष्पादन और व्यावसायिक तैयारी पर व्यावहारिक मार्गदर्शन।',
          mai: 'पोर्टफोलियो, रिज्यूमे, प्रोजेक्ट निष्पादन आ व्यावसायिक तैयारी पर व्यावहारिक मार्गदर्शन।',
        },
        icon: 'Award',
      },
      {
        title: { en: 'Youth Skill Exposure Initiatives', hi: 'Youth Skill Exposure Initiatives', mai: 'Youth Skill Exposure Initiatives' },
        description: {
          en: 'Hands-on exposure initiatives bridging collegiate theory with real organizational workflows.',
          hi: 'कॉलेज के सिद्धांत को वास्तविक संगठनात्मक कार्यप्रणाली से जोड़ने वाली व्यावहारिक पहल।',
          mai: 'कॉलेजक सिद्धांतकेँ वास्तविक संगठनात्मक कार्यप्रणाली सँ जोड़य वला व्यावहारिक पहल।',
        },
        icon: 'Users',
      },
    ],
    featuredProjects: [
      {
        title: { en: 'JIGSY Youth National Exposure Initiative', hi: 'JIGSY Youth National Exposure Initiative', mai: 'JIGSY Youth National Exposure Initiative' },
        shortDescription: {
          en: 'Empowering 500+ students across streams via our dedicated youth.jigsy.in platform.',
          hi: 'हमारे समर्पित youth.jigsy.in प्लेटफॉर्म के माध्यम से 500+ विद्यार्थियों का मार्गदर्शन।',
          mai: 'हमर समर्पित youth.jigsy.in प्लेटफॉर्मक माध्यम सँ ५००+ विद्यार्थी सभक मार्गदर्शन।',
        },
        details: {
          en: ['Dedicated youth.jigsy.in portal', 'Multi-stream accessibility', 'Practical project mentorship'],
          hi: ['समर्पित youth.jigsy.in पोर्टल', 'बहु-संकाय सुलभता', 'व्यावहारिक प्रोजेक्ट मेंटरशिप'],
          mai: ['समर्पित youth.jigsy.in पोर्टल', 'बहु-संकाय सुलभता', 'व्यावहारिक प्रोजेक्ट मार्गदर्शन'],
        },
        status: 'Active on youth.jigsy.in',
      },
    ],
  },
  {
    id: 'sec-rd',
    code: 'JIGSY-SEC-03',
    name: 'JIGSY R&D',
    slug: 'rd',
    motto: {
      en: 'Applied Research, Algorithmic Prototyping & Scientific Discovery',
      hi: 'अनुप्रयुक्त अनुसंधान, एल्गोरिदम प्रोटोटाइपिंग एवं वैज्ञानिक खोज',
      mai: 'अनुप्रयुक्त अनुसंधान, एल्गोरिदम प्रोटोटाइपिंग आ वैज्ञानिक खोज',
    },
    shortDescription: {
      en: 'Dedicated R&D division focused on applied scientific discovery, algorithm prototyping, technical feasibility studies, and peer-reviewed collaborations.',
      hi: 'वैज्ञानिक खोज, एल्गोरिदम प्रोटोटाइपिंग, तकनीकी व्यवहार्यता अध्ययन और सह-समीक्षित शोध सहयोग पर केंद्रित अनुसंधान प्रभाग।',
      mai: 'वैज्ञानिक अनुसंधान, एल्गोरिदम प्रोटोटाइपिंग, तकनीकी अध्ययन आ शोध सहयोग पर केंद्रित अनुसंधान प्रभाग।',
    },
    fullDescription: {
      en: 'JIGSY R&D Cell conducts foundational and applied investigation into high-throughput computing, scheduling optimization, and sustainable resource architectures. Our work has been published in Springer Nature and international conference proceedings.',
      hi: 'जिग्सी आरएंडडी सेल उच्च-थ्रूपुट कंप्यूटिंग, शेड्यूलिंग अनुकूलन और सतत संसाधन आर्किटेक्चर में मौलिक एवं अनुप्रयुक्त शोध करता है। हमारे शोध स्प्रिंगर नेचर और अंतरराष्ट्रीय सम्मेलनों में प्रकाशित हुए हैं।',
      mai: 'जिग्सी आरएंडडी सेल उच्च कंप्यूटिंग आ सतत संसाधन प्रणाली में मौलिक शोध करैत अछि। हमर शोध स्प्रिंगर नेचर आ अंतरराष्ट्रीय सम्मेलन में प्रकाशित भऽ चुकल अछि।',
    },
    iconName: 'Cpu',
    colorScheme: {
      badge: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
      accent: '#0891b2',
    },
    deliverables: {
      en: 'Research Publications, Technical Prototypes & Feasibility Reports',
      hi: 'शोध प्रकाशन, तकनीकी प्रोटोटाइप एवं व्यवहार्यता रिपोर्ट',
      mai: 'शोध प्रकाशन, तकनीकी प्रोटोटाइप आ व्यवहार्यता रिपोर्ट',
    },
    coreOperations: {
      en: [
        'Combinatorial Scheduling & Priority Allocation Heuristics',
        'Sustainable Circular Economy & Resource Redistribution Modeling',
        'Security Verification & Data Integrity Protocols',
        'High-Concurrency Systems Simulation & Performance Benchmarking',
      ],
      hi: [
        'कॉम्बिनेटोरियल शेड्यूलिंग एवं प्राथमिकता आवंटन एल्गोरिदम',
        'सतत चक्रीय अर्थव्यवस्था एवं संसाधन पुनर्वितरण मॉडलिंग',
        'सुरक्षा सत्यापन एवं डेटा अखंडता प्रोटोकॉल',
        'उच्च-समवर्ती प्रणाली सिमुलेशन एवं प्रदर्शन बेंचमार्किंग',
      ],
      mai: [
        'शेड्यूलिंग आ प्राथमिकता आवंटन एल्गोरिदम',
        'सतत चक्रीय अर्थव्यवस्था संसाधन पुनर्वितरण मॉडलिंग',
        'सुरक्षा सत्यापन आ डेटा अखंडता प्रोटोकॉल',
        'उच्च क्षमता प्रणाली सिमुलेशन आ प्रदर्शन परीक्षण',
      ],
    },
    services: [
      {
        title: { en: 'Applied Research & Innovation', hi: 'Applied Research & Innovation', mai: 'Applied Research & Innovation' },
        description: {
          en: 'Structured scientific inquiry, novel system architectures, and applied innovation studies for industry and academia.',
          hi: 'उद्योग और शिक्षा जगत के लिए संरचित वैज्ञानिक अनुसंधान, नवीन प्रणाली आर्किटेक्चर और अनुप्रयुक्त नवाचार अध्ययन।',
          mai: 'उद्योग आ शिक्षा जगत लेल संरचित वैज्ञानिक अनुसंधान आ नवीन प्रणाली अध्ययन।',
        },
        icon: 'Cpu',
      },
      {
        title: { en: 'Algorithm & System Prototyping', hi: 'Algorithm & System Prototyping', mai: 'Algorithm & System Prototyping' },
        description: {
          en: 'Mathematical modeling, proof-of-concept prototypes, and empirical simulation benchmarks.',
          hi: 'गणितीय मॉडलिंग, प्रूफ-ऑफ-कॉन्सेप्ट प्रोटोटाइप और प्रायोगिक सिमुलेशन बेंचमार्क।',
          mai: 'गणितीय मॉडलिंग, प्रोटोटाइप विकास आ प्रायोगिक सिमुलेशन बेंचमार्क।',
        },
        icon: 'Code',
      },
      {
        title: { en: 'Technical Feasibility & Analytics', hi: 'Technical Feasibility & Analytics', mai: 'Technical Feasibility & Analytics' },
        description: {
          en: 'Data-driven feasibility assessments, performance audits, and architecture evaluation reports.',
          hi: 'डेटा-आधारित व्यवहार्यता मूल्यांकन, प्रदर्शन ऑडिट और आर्किटेक्चर समीक्षा रिपोर्ट।',
          mai: 'डेटा-आधारित व्यवहार्यता मूल्यांकन, प्रदर्शन ऑडिट आ तकनीकी समीक्षा रिपोर्ट।',
        },
        icon: 'BookOpen',
      },
      {
        title: { en: 'Academic & Industry Research Collaboration', hi: 'Academic & Industry Research Collaboration', mai: 'Academic & Industry Research Collaboration' },
        description: {
          en: 'Joint research initiatives, institutional R&D MoUs, and peer-reviewed publication advisory.',
          hi: 'संयुक्त शोध पहल, संस्थागत R&D समझौते (MoU) और समकक्ष-समीक्षित प्रकाशन परामर्श।',
          mai: 'संयुक्त शोध पहल, संस्थागत R&D समझौता (MoU) आ प्रकाशन मार्गदर्शन।',
        },
        icon: 'Layers',
      },
    ],
    featuredProjects: [
      {
        title: { en: 'Priority-Based Decay Allocation Heuristics', hi: 'Priority-Based Decay Allocation Heuristics', mai: 'Priority-Based Decay Allocation Heuristics' },
        shortDescription: {
          en: 'Published in Springer Nature, modeling decay schedules in high-demand supply chains.',
          hi: 'स्प्रिंगर नेचर में प्रकाशित, उच्च मांग वाली आपूर्ति श्रृंखलाओं में शेड्यूलिंग मॉडल।',
          mai: 'स्प्रिंगर नेचर में प्रकाशित, उच्च मांग आपूर्ति श्रृंखला में शेड्यूलिंग मॉडल।',
        },
        details: {
          en: ['Springer Nature indexed', 'Polynomial runtime bounds', 'Verified simulation data'],
          hi: ['स्प्रिंगर नेचर अनुक्रमित', 'बहुपद रनटाइम सीमाएं', 'सत्यापित सिमुलेशन डेटा'],
          mai: ['स्प्रिंगर नेचर में अनुक्रमित', 'गणितीय प्रमाण', 'प्रमाणित सिमुलेशन'],
        },
        status: 'Peer Reviewed & Published',
      },
    ],
  },
  {
    id: 'sec-digitech',
    code: 'JIGSY-SEC-04',
    name: 'JIGSY DigiTech',
    slug: 'digitech',
    motto: {
      en: 'Book Publishing, Brand Promotion, Design & Multimedia Content',
      hi: 'पुस्तक प्रकाशन, ब्रांड प्रचार, डिजाइन एवं मल्टीमीडिया सामग्री',
      mai: 'पुस्तक प्रकाशन, ब्रांड प्रचार, डिजाइन आ मल्टीमीडिया सामग्री',
    },
    shortDescription: {
      en: 'Creative publishing and digital media arm delivering ISBN book publishing, brand promotion, graphic design, and corporate documentation.',
      hi: 'रचनात्मक प्रकाशन एवं डिजिटल मीडिया प्रभाग जो आईएसबीएन पुस्तक प्रकाशन, ब्रांड प्रचार, ग्राफिक डिजाइन और कॉर्पोरेट दस्तावेज़ीकरण प्रदान करता है।',
      mai: 'प्रकाशन आ डिजिटल मीडिया प्रभाग जे आईएसबीएन पुस्तक प्रकाशन, ब्रांड प्रचार, ग्राफिक डिजाइन आ दस्तावेज़ीकरण सेवा दैत अछि।',
    },
    fullDescription: {
      en: 'JIGSY DigiTech connects technical knowledge and corporate brands with global audiences. Notable releases include "Mastering DSA Without Fear" by Jigyasu Vatsa (Amazon ISBN). We deliver end-to-end publishing, digital promotion, graphic design, and institutional documentation.',
      hi: 'जिग्सी डिजीटेक तकनीकी ज्ञान और कॉर्पोरेट ब्रांड को वैश्विक दर्शकों से जोड़ता है। प्रमुख प्रकाशनों में जिज्ञासु वत्स द्वारा रचित "Mastering DSA Without Fear" (Amazon ISBN) शामिल है।',
      mai: 'जिग्सी डिजीटेक तकनीकी ज्ञान आ ब्रांडकेँ वैश्विक दर्शक सँ जोड़ैत अछि। प्रमुख प्रकाशन में जिज्ञासु वत्सक "Mastering DSA Without Fear" (Amazon ISBN) शामिल अछि।',
    },
    iconName: 'Tv',
    colorScheme: {
      badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      accent: '#9333ea',
    },
    deliverables: {
      en: 'ISBN Books, Brand Campaigns, Multimedia Assets & Publications',
      hi: 'आईएसबीएन पुस्तकें, ब्रांड अभियान, मल्टीमीडिया सामग्री एवं प्रकाशन',
      mai: 'आईएसबीएन पुस्तक, ब्रांड अभियान, मल्टीमीडिया सामग्री आ प्रकाशन',
    },
    coreOperations: {
      en: [
        'End-to-End Book Authoring, Typesetting & Global ISBN Distribution',
        'Digital Marketing, Social Media Campaigns & Brand Outreach',
        'Graphic Design, Posters, Infographics & Short-Form Video Production',
        'Academic Conference Proceedings & Corporate Profile Documentation',
      ],
      hi: [
        'संपूर्ण पुस्तक लेखन, टाइपसेटिंग एवं वैश्विक आईएसबीएन वितरण',
        'डिजिटल मार्केटिंग, सोशल मीडिया अभियान एवं ब्रांड प्रचार',
        'ग्राफिक डिजाइन, पोस्टर, इन्फोग्राफिक्स एवं वीडियो निर्माण',
        'शैक्षणिक सम्मेलन कार्यवाही एवं कॉर्पोरेट प्रोफ़ाइल दस्तावेज़ीकरण',
      ],
      mai: [
        'पुस्तक लेखन, टाइपसेटिंग आ वैश्विक आईएसबीएन वितरण',
        'डिजिटल मार्केटिंग, सोशल मीडिया आ ब्रांड प्रचार',
        'ग्राफिक डिजाइन, पोस्टर, इन्फोग्राफिक्स आ वीडियो निर्माण',
        'शैक्षणिक प्रकाशन आ कॉर्पोरेट दस्तावेज़ीकरण',
      ],
    },
    services: [
      {
        title: { en: 'Book & ISBN Publishing', hi: 'Book & ISBN Publishing', mai: 'Book & ISBN Publishing' },
        description: {
          en: 'Manuscript editing, professional layout typesetting, ISBN registration, and global print/digital publishing.',
          hi: 'पांडुलिपि संपादन, पेशेवर टाइपसेटिंग, आईएसबीएन पंजीकरण और वैश्विक प्रिंट/डिजिटल प्रकाशन।',
          mai: 'पांडुलिपि संपादन, टाइपसेटिंग, आईएसबीएन पंजीकरण आ वैश्विक प्रिंट/डिजिटल प्रकाशन।',
        },
        icon: 'BookOpen',
      },
      {
        title: { en: 'Digital Marketing & Brand Promotion', hi: 'Digital Marketing & Brand Promotion', mai: 'Digital Marketing & Brand Promotion' },
        description: {
          en: 'Targeted online campaigns, corporate identity positioning, and institutional outreach strategies.',
          hi: 'लक्षित ऑनलाइन अभियान, कॉर्पोरेट पहचान सुदृढ़ीकरण और संस्थागत प्रचार रणनीतियाँ।',
          mai: 'लक्षित ऑनलाइन अभियान, ब्रांड पहचान आ संस्थागत प्रचार रणनीति।',
        },
        icon: 'Tv',
      },
      {
        title: { en: 'Graphic Design & Multimedia Content', hi: 'Graphic Design & Multimedia Content', mai: 'Graphic Design & Multimedia Content' },
        description: {
          en: 'Visual branding, promotional posters, infographics, explainer videos, and digital creative assets.',
          hi: 'विजुअल ब्रांडिंग, प्रचार पोस्टर, इन्फोग्राफिक्स, व्याख्यात्मक वीडियो और डिजिटल क्रिएटिव सामग्री।',
          mai: 'विजुअल ब्रांडिंग, पोस्टर, इन्फोग्राफिक्स, वीडियो आ डिजिटल क्रिएटिव सामग्री।',
        },
        icon: 'Film',
      },
      {
        title: { en: 'Academic & Corporate Documentation', hi: 'Academic & Corporate Documentation', mai: 'Academic & Corporate Documentation' },
        description: {
          en: 'Conference proceedings, whitepapers, annual reports, and structured institutional brochures.',
          hi: 'सम्मेलन कार्यवाही, श्वेतपत्र, वार्षिक रिपोर्ट और सुव्यवस्थित संस्थागत विवरणिका।',
          mai: 'सम्मेलन कार्यवाही, वार्षिक रिपोर्ट आ संस्थागत विवरणिका निर्माण।',
        },
        icon: 'FileText',
      },
    ],
    featuredProjects: [
      {
        title: { en: 'Mastering DSA Without Fear (Global ISBN)', hi: 'Mastering DSA Without Fear (Global ISBN)', mai: 'Mastering DSA Without Fear (Global ISBN)' },
        shortDescription: {
          en: 'Algorithmic handbook authored by Jigyasu Vatsa, published globally with Amazon ISBN.',
          hi: 'जिज्ञासु वत्स द्वारा रचित लोकप्रिय एल्गोरिदम हैंडबुक, अमेज़न आईएसबीएन पर प्रकाशित।',
          mai: 'जिज्ञासु वत्स द्वारा रचित प्रसिद्ध एल्गोरिदम हैंडबुक, अमेज़न आईएसबीएन पर प्रकाशित।',
        },
        details: {
          en: ['Global ISBN registered', '500+ solved algorithmic proofs', 'Worldwide distribution'],
          hi: ['ग्लोबल आईएसबीएन पंजीकृत', '500+ हल किए गए एल्गोरिदम', 'विश्वव्यापी वितरण'],
          mai: ['ग्लोबल आईएसबीएन पंजीकृत', '५००+ एल्गोरिदम समाधान', 'विश्वव्यापी वितरण'],
        },
        status: 'Published Globally',
      },
    ],
  },
  {
    id: 'sec-consult',
    code: 'JIGSY-SEC-05',
    name: 'JIGSY Consult',
    slug: 'consult',
    motto: {
      en: 'Company Registration, Tax Compliance, DSC & Business Advisory',
      hi: 'कंपनी पंजीकरण, कर अनुपालन, डीएससी एवं व्यावसायिक परामर्श',
      mai: 'कंपनी पंजीकरण, कर अनुपालन, डीएससी आ व्यावसायिक परामर्श',
    },
    shortDescription: {
      en: 'Business incorporation, GST and statutory compliance, DSC issuance, and strategic institutional advisory for startups and organizations.',
      hi: 'स्टार्टअप्स और संगठनों के लिए व्यवसाय निगमन, जीएसटी व वैधानिक अनुपालन, डीएससी जारी करना और रणनीतिक संस्थागत परामर्श।',
      mai: 'स्टार्टअप आ संस्था सभ लेल व्यवसाय निगमन, जीएसटी आ वैधानिक अनुपालन, डीएससी आ रणनीतिक परामर्श।',
    },
    fullDescription: {
      en: 'JIGSY Consult simplifies regulatory and statutory workflows for startups, institutions, and commercial enterprises. We support Private Limited / LLP incorporation, GST registrations and filings, Digital Signature Certificates (DSC), and ongoing business advisory.',
      hi: 'जिग्सी कंसल्ट स्टार्टअप्स, संस्थानों और वाणिज्यिक उद्यमों के लिए नियामक और वैधानिक प्रक्रियाओं को सरल बनाता है। हम प्राइवेट लिमिटेड/एलएलपी निगमन, जीएसटी फाइलिंग, डीएससी और व्यावसायिक परामर्श प्रदान करते हैं।',
      mai: 'जिग्सी कंसल्ट स्टार्टअप, संस्थान आ व्यवसायक वैधानिक प्रक्रियाकेँ सरल बनबैत अछि। प्राइवेट लिमिटेड/एलएलपी निगमन, जीएसटी, डीएससी आ व्यावसायिक परामर्श।',
    },
    iconName: 'Scale',
    colorScheme: {
      badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      accent: '#d97706',
    },
    deliverables: {
      en: 'Incorporation Filings, GST Returns, DSC Tokens & Advisory Reports',
      hi: 'निगमन फाइलिंग, जीएसटी रिटर्न, डीएससी टोकन एवं परामर्श रिपोर्ट',
      mai: 'निगमन फाइलिंग, जीएसटी रिटर्न, डीएससी टोकन आ परामर्श रिपोर्ट',
    },
    coreOperations: {
      en: [
        'Company Registrations (Private Limited, LLP, OPC & Section 8 Formations)',
        'GST Registration, Periodic Returns & Statutory Tax Compliance',
        'Digital Signature Certificates (Class 3 DSC Issuance & Setup)',
        'Startup, MSME & Institutional Affiliation Advisory',
      ],
      hi: [
        'कंपनी पंजीकरण (प्राइवेट लिमिटेड, एलएलपी, ओपीसी एवं धारा 8 गठन)',
        'जीएसटी पंजीकरण, नियमित रिटर्न फाइलिंग एवं कर अनुपालन',
        'डिजिटल हस्ताक्षर प्रमाण पत्र (क्लास 3 डीएससी टोकन सेटअप)',
        'स्टार्टअप, एमएसएमई एवं संस्थागत संबद्धता परामर्श',
      ],
      mai: [
        'कंपनी पंजीकरण (प्राइवेट लिमिटेड, एलएलपी, ओपीसी आ सेक्शन ८)',
        'जीएसटी पंजीकरण आ कर अनुपालन',
        'डिजिटल हस्ताक्षर प्रमाण पत्र (क्लास ३ डीएससी टोकन)',
        'स्टार्टअप, एमएसएमई आ संस्थागत संबद्धता परामर्श',
      ],
    },
    services: [
      {
        title: { en: 'Company Registration & Incorporation', hi: 'Company Registration & Incorporation', mai: 'Company Registration & Incorporation' },
        description: {
          en: 'End-to-end MCA incorporation support for Private Limited, LLP, OPC, MSME, and Section 8 entities.',
          hi: 'प्राइवेट लिमिटेड, एलएलपी, ओपीसी, एमएसएमई और सेक्शन 8 संस्थाओं के लिए संपूर्ण एमसीए निगमन सहायता।',
          mai: 'प्राइवेट लिमिटेड, एलएलपी, ओपीसी, एमएसएमई आ सेक्शन ८ संस्था लेल संपूर्ण एमसीए निगमन सहायता।',
        },
        icon: 'FileText',
      },
      {
        title: { en: 'GST, Tax & Statutory Compliance', hi: 'GST, Tax & Statutory Compliance', mai: 'GST, Tax & Statutory Compliance' },
        description: {
          en: 'GST registration, monthly/quarterly return filing, ROC documentation, and ongoing regulatory compliance.',
          hi: 'जीएसटी पंजीकरण, मासिक/त्रैमासिक रिटर्न फाइलिंग, आरओसी दस्तावेजीकरण और निरंतर नियामक अनुपालन।',
          mai: 'जीएसटी पंजीकरण, नियमित रिटर्न फाइलिंग आ वैधानिक कर अनुपालन सेवा।',
        },
        icon: 'Scale',
      },
      {
        title: { en: 'Digital Signature (DSC) & Licensing', hi: 'Digital Signature (DSC) & Licensing', mai: 'Digital Signature (DSC) & Licensing' },
        description: {
          en: 'Fast Class 3 Digital Signature Certificate (DSC) token issuance and essential business licensing.',
          hi: 'त्वरित क्लास 3 डिजिटल हस्ताक्षर प्रमाण पत्र (डीएससी) टोकन और आवश्यक व्यावसायिक लाइसेंसिंग।',
          mai: 'त्वरित क्लास ३ डिजिटल हस्ताक्षर प्रमाण पत्र (डीएससी) टोकन आ व्यावसायिक लाइसेंसिंग।',
        },
        icon: 'ShieldCheck',
      },
      {
        title: { en: 'Business & Institutional Advisory', hi: 'Business & Institutional Advisory', mai: 'Business & Institutional Advisory' },
        description: {
          en: 'Strategic consulting for operational setup, institutional affiliations, and governance structuring.',
          hi: 'परिचालन सेटअप, संस्थागत संबद्धता और सुशासन संरचना हेतु रणनीतिक परामर्श।',
          mai: 'परिचालन सेटअप, संस्थागत संबद्धता आ सुशासन संरचना लेल रणनीतिक परामर्श।',
        },
        icon: 'Briefcase',
      },
    ],
    featuredProjects: [
      {
        title: { en: 'PAN-India MSME & Startup Compliance Desk', hi: 'PAN-India MSME & Startup Compliance Desk', mai: 'PAN-India MSME & Startup Compliance Desk' },
        shortDescription: {
          en: 'Assisted 120+ entities in smooth incorporation and statutory tax structuring.',
          hi: '120+ संस्थाओं को सफल निगमन और वैधानिक कर संरचना में सहायता प्रदान की।',
          mai: '१२०+ संस्था सभकेँ सफल निगमन आ कर संरचना में सहायता।',
        },
        details: {
          en: ['100% statutory clarity', 'Average turnaround 4 business days', 'Active advisory'],
          hi: ['100% वैधानिक स्पष्टता', 'औसत समय सीमा 4 कार्य दिवस', 'सक्रिय परामर्श'],
          mai: ['१००% वैधानिक स्पष्टता', '४ दिनक औसत समय', 'सक्रिय विधिक सेवा'],
        },
        status: 'Operational',
      },
    ],
  },
  {
    id: 'sec-edutech',
    code: 'JIGSY-SEC-06',
    name: 'JIGSY EduTech',
    slug: 'edutech',
    motto: {
      en: 'Industrial Training, Campus Incubation & Digital Learning Programs',
      hi: 'औद्योगिक प्रशिक्षण, कैंपस इनक्यूबेशन एवं डिजिटल शिक्षण कार्यक्रम',
      mai: 'औद्योगिक प्रशिक्षण, कैंपस इनक्यूबेशन आ डिजिटल शिक्षण कार्यक्रम',
    },
    shortDescription: {
      en: 'Academic and institutional learning division providing industrial training, campus incubation centers, technical workshops, and digital courseware.',
      hi: 'औद्योगिक प्रशिक्षण, कैंपस इनक्यूबेशन सेंटर, तकनीकी कार्यशालाएं और डिजिटल पाठ्यक्रम प्रदान करने वाला शैक्षणिक शिक्षण प्रभाग।',
      mai: 'औद्योगिक प्रशिक्षण, कैंपस इनक्यूबेशन सेंटर, तकनीकी कार्यशाला आ डिजिटल पाठ्यक्रम प्रदान करय वला शैक्षणिक प्रभाग।',
    },
    fullDescription: {
      en: 'JIGSY EduTech partners with colleges, universities, and training organizations to deliver practical technical education, hybrid industrial training, in-campus incubation centers, and interactive digital learning platforms.',
      hi: 'जिग्सी एडुटेक व्यावहारिक तकनीकी शिक्षा, हाइब्रिड औद्योगिक प्रशिक्षण, इन-कैंपस इनक्यूबेशन सेंटर और इंटरैक्टिव डिजिटल लर्निंग प्लेटफॉर्म प्रदान करने हेतु कॉलेजों और विश्वविद्यालयों के साथ साझेदारी करता है।',
      mai: 'जिग्सी एडुटेक व्यावहारिक तकनीकी शिक्षा, औद्योगिक प्रशिक्षण, कैंपस इनक्यूबेशन सेंटर आ डिजिटल लर्निंग प्लेटफॉर्म लेल कॉलेज आ विश्वविद्यालय संग साझेदारी करैत अछि।',
    },
    iconName: 'GraduationCap',
    colorScheme: {
      badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      accent: '#e11d48',
    },
    deliverables: {
      en: 'Campus Incubation Labs, Technical Workshops & Digital Courseware',
      hi: 'कैंपस इनक्यूबेशन लैब, तकनीकी कार्यशालाएं एवं डिजिटल पाठ्यक्रम',
      mai: 'कैंपस इनक्यूबेशन लैब, तकनीकी कार्यशाला आ डिजिटल पाठ्यक्रम',
    },
    coreOperations: {
      en: [
        'Hybrid Industrial Training & Skill Enhancement Programs',
        'In-Campus Incubation Centers & Institutional Innovation Labs',
        'Hands-On Technical Workshops, Coding Bootcamps & Seminars',
        'Interactive Digital Learning Suites & Structured Courseware',
      ],
      hi: [
        'हाइब्रिड औद्योगिक प्रशिक्षण एवं कौशल संवर्धन कार्यक्रम',
        'इन-कैंपस इनक्यूबेशन सेंटर एवं संस्थागत नवाचार प्रयोगशालाएं',
        'व्यावहारिक तकनीकी कार्यशालाएं, कोडिंग बूटकैंप एवं सेमिनार',
        'इंटरैक्टिव डिजिटल लर्निंग सूट एवं संरचित पाठ्यक्रम',
      ],
      mai: [
        'हाइब्रिड औद्योगिक प्रशिक्षण आ कौशल संवर्धन कार्यक्रम',
        'इन-कैंपस इनक्यूबेशन सेंटर आ संस्थागत नवाचार लैब',
        'व्यावहारिक तकनीकी कार्यशाला, कोडिंग बूटकैंप आ सेमिनार',
        'इंटरैक्टिव डिजिटल लर्निंग सूट आ संरचित पाठ्यक्रम',
      ],
    },
    services: [
      {
        title: { en: 'Industrial Training Programs', hi: 'Industrial Training Programs', mai: 'Industrial Training Programs' },
        description: {
          en: 'Outcome-oriented online and hybrid training tracks equipping learners with industry-ready skills.',
          hi: 'उद्योग-तैयार कौशल प्रदान करने वाले परिणाम-उन्मुख ऑनलाइन और हाइब्रिड प्रशिक्षण कार्यक्रम।',
          mai: 'उद्योग-तैयार कौशल प्रदान करय वला ऑनलाइन आ हाइब्रिड प्रशिक्षण कार्यक्रम।',
        },
        icon: 'GraduationCap',
      },
      {
        title: { en: 'In-Campus Incubation Centers', hi: 'In-Campus Incubation Centers', mai: 'In-Campus Incubation Centers' },
        description: {
          en: 'Institutional MoUs to establish and operate dedicated skill, startup, and innovation labs inside campuses.',
          hi: 'कैंपस के भीतर समर्पित कौशल, स्टार्टअप और नवाचार प्रयोगशालाएं स्थापित करने हेतु संस्थागत समझौते (MoU)।',
          mai: 'कैंपसक भीतर समर्पित कौशल, स्टार्टअप आ नवाचार लैब स्थापना लेल संस्थागत समझौता (MoU)।',
        },
        icon: 'Building2',
      },
      {
        title: { en: 'Technical Workshops & Skill Labs', hi: 'Technical Workshops & Skill Labs', mai: 'Technical Workshops & Skill Labs' },
        description: {
          en: 'Live masterclasses, faculty development sessions, and hands-on laboratory sprints across core disciplines.',
          hi: 'प्रमुख विषयों में लाइव मास्टरक्लास, संकाय विकास सत्र और व्यावहारिक प्रयोगशाला कार्यशालाएं।',
          mai: 'प्रमुख विषय में लाइव मास्टरक्लास, संकाय विकास सत्र आ व्यावहारिक कार्यशाला।',
        },
        icon: 'Code',
      },
      {
        title: { en: 'E-Learning & Digital Courseware', hi: 'E-Learning & Digital Courseware', mai: 'E-Learning & Digital Courseware' },
        description: {
          en: 'Structured digital learning modules, browser-based practice labs, and assessment platforms.',
          hi: 'संरचित डिजिटल लर्निंग मॉड्यूल, ब्राउज़र-आधारित अभ्यास लैब और मूल्यांकन प्लेटफॉर्म।',
          mai: 'संरचित डिजिटल लर्निंग मॉड्यूल, अभ्यास लैब आ मूल्यांकन प्लेटफॉर्म।',
        },
        icon: 'BookOpen',
      },
    ],
    featuredProjects: [
      {
        title: { en: 'Interactive Learning & Code Practice Suite', hi: 'Interactive Learning & Code Practice Suite', mai: 'Interactive Learning & Code Practice Suite' },
        shortDescription: {
          en: 'Structured digital learning and browser practice environment for computing curricula.',
          hi: 'कंप्यूटिंग पाठ्यक्रम हेतु संरचित डिजिटल लर्निंग और ब्राउज़र अभ्यास वातावरण।',
          mai: 'कंप्यूटिंग पाठ्यक्रम लेल संरचित डिजिटल लर्निंग आ अभ्यास वातावरण।',
        },
        details: {
          en: ['Multi-language practice modules', 'Institutional lab ready', 'Assessment analytics'],
          hi: ['बहुभाषी अभ्यास मॉड्यूल', 'संस्थागत लैब हेतु तैयार', 'मूल्यांकन विश्लेषण'],
          mai: ['बहुभाषी अभ्यास मॉड्यूल', 'संस्थागत लैब लेल तैयार', 'मूल्यांकन विश्लेषण'],
        },
        status: 'Under Active Rollout',
      },
    ],
  },
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-01',
    title: 'Full Stack Web & Cloud Engineer',
    sectorSlug: 'tech',
    sectorName: 'JIGSY Tech',
    company: 'Jigyasu Integrated Global Services Pvt Ltd',
    location: 'Darbhanga / Remote',
    type: 'Full-time',
    experience: '1–3 Years',
    salaryStipend: '₹4.5L – ₹7.2L P.A.',
    description: 'We are seeking an enthusiastic engineer skilled in React, Node.js/Express, TypeScript, and relational databases (PostgreSQL/MySQL) to architect high-concurrency client portals and ATS engines.',
    requirements: [
      'Strong proficiency in TypeScript, React, and Tailwind CSS',
      'Solid experience with Node.js/Express REST APIs and database schema normalization',
      'Familiarity with Git branching, Docker containerization, and cloud hosting',
      'Ability to write clean, self-documenting code with unit test coverage',
    ],
    postedAt: '2026-11-01',
    isActive: true,
  },
  {
    id: 'job-02',
    title: 'Junior Research Fellow - Algorithmic Systems',
    sectorSlug: 'rd',
    sectorName: 'JIGSY R&D',
    company: 'Jigyasu Integrated Global Services Pvt Ltd',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    experience: '0–2 Years / M.Tech / B.Tech',
    salaryStipend: '₹35,000 – ₹50,000 / month',
    description: 'Collaborate directly with our Chief Architect on combinatorial scheduling heuristics, decay allocation algorithms, and academic manuscripts intended for Springer/IEEE indexed conferences.',
    requirements: [
      'Strong foundation in Discrete Mathematics, Probability, and Analysis of Algorithms',
      'Proficiency in Python or C++ for algorithmic simulation and statistical benchmarking',
      'Familiarity with LaTeX manuscript typesetting and academic citation workflows',
      'Prior participation in competitive programming or academic research projects is a plus',
    ],
    postedAt: '2026-11-04',
    isActive: true,
  },
  {
    id: 'job-03',
    title: 'Student Developer Intern - Full Stack Sprints',
    sectorSlug: 'youth',
    sectorName: 'JIGSY Youth',
    company: 'Jigyasu Integrated Global Services Pvt Ltd',
    location: 'Remote (All India)',
    type: 'Internship',
    experience: 'Fresher / Current Student',
    salaryStipend: 'Performance-based Stipend + Verifiable Credentials',
    description: 'Join our cohort of young developer apprentices. Build practical microservices, collaborate in live Git repositories, and earn accredited industrial completion certificates.',
    requirements: [
      'Currently enrolled in B.Tech / MCA / BCA / B.Sc (Computer Science / IT / ECE)',
      'Basic knowledge of JavaScript/TypeScript, HTML, CSS, and Git',
      'Eagerness to learn production standards and complete assigned weekly sprints',
    ],
    postedAt: '2026-11-05',
    isActive: true,
  },
  {
    id: 'job-04',
    title: 'Corporate Compliance & Legal Advisory Associate',
    sectorSlug: 'consult',
    sectorName: 'JIGSY Consult',
    company: 'Jigyasu Integrated Global Services Pvt Ltd',
    location: 'Darbhanga / Hybrid',
    type: 'Full-time',
    experience: '1–3 Years',
    salaryStipend: '₹3.6L – ₹5.5L P.A.',
    description: 'Support entrepreneurs and institutional clients with MCA company incorporations (Pvt Ltd, LLP), GST monthly returns, Class 3 DSC token setups, and regulatory audits.',
    requirements: [
      'Degree in Commerce, Law (LLB), or Corporate Secretaryship (CS Executive / Inter)',
      'Hands-on familiarity with MCA V3 portal, SPICe+ filings, and GST portal filings',
      'Exceptional written communication and client coordination abilities',
    ],
    postedAt: '2026-11-02',
    isActive: true,
  },
  {
    id: 'job-05',
    title: 'Technical Content & Publishing Coordinator',
    sectorSlug: 'digitech',
    sectorName: 'JIGSY DigiTech',
    company: 'Jigyasu Integrated Global Services Pvt Ltd',
    location: 'Remote',
    type: 'Part-time',
    experience: '0–2 Years',
    salaryStipend: '₹18,000 – ₹28,000 / month',
    description: 'Assist our publishing arm in editing engineering manuscripts, authoring short-form technical reels, preparing ISBN proceeding drafts, and managing Amazon KDP digital distributions.',
    requirements: [
      'Demonstrated experience with technical writing, typography, or academic typesetting',
      'Familiarity with Canva, Adobe Premiere / DaVinci Resolve, or Figma',
      'Strong eye for detail, grammar, and technical accuracy',
    ],
    postedAt: '2026-11-03',
    isActive: true,
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Komal Jha',
    role: 'HR Intern at JIGSY INDIA, Student of BBA',
    rating: 5,
    comment: 'Submitted report on "Design and Development of an HR Management Framework". The hybrid structure with daily meetings and practical workplace mentoring made this an invaluable learning experience.',
    date: 'May 2026',
  },
  {
    id: 'rev-2',
    name: 'Amanul Haque',
    role: 'Manager (in charge), Domain HRD Admin & Finance at JIGSY INDIA',
    rating: 5,
    comment: 'Our industrial-oriented learning model is designed so students from BA, B.Sc, B.Com, BBA, and B.Tech can seamlessly collaborate. 100% course fee waiver allows everyone to grow together with India.',
    date: 'April 2026',
  },
  {
    id: 'rev-3',
    name: 'Dr. Gyanvati Jha',
    role: 'Chief of R & D Cell, JIGSY INDIA',
    rating: 5,
    comment: 'Fostering academic rigor, paper writing, referencing, and scientific curiosity. JIGSY provides youth with foundational research literacy and structured publication guidance.',
    date: 'March 2026',
  },
];

export const INITIAL_EMPLOYEES: EmployeeRecord[] = [
  {
    employeeId: 'JIGSY-EMP-001',
    fullName: 'Subhash Chandra Jha',
    designation: 'Director & Governance Lead',
    department: 'Executive Board',
    joiningDate: '2025-01-10',
    status: 'Active',
    officialEmail: 'subhash.jha@jigsyindia.com',
  },
  {
    employeeId: 'JIGSY-EMP-002',
    fullName: 'Jigyasu Vatsa',
    designation: 'Founder & Chief Technology Architect',
    department: 'Engineering & R&D',
    joiningDate: '2025-01-10',
    status: 'Active',
    officialEmail: 'jigyasu.vatsa@gmail.com',
  },
  {
    employeeId: 'JIGSY-EMP-015',
    fullName: 'Amit Kumar Mishra',
    designation: 'Senior Full Stack Lead',
    department: 'JIGSY Tech',
    joiningDate: '2025-03-01',
    status: 'Active',
    officialEmail: 'amit.m@jigsyindia.com',
  },
  {
    employeeId: 'JIGSY-EMP-024',
    fullName: 'Neha Kumari',
    designation: 'Compliance Officer',
    department: 'JIGSY Consult',
    joiningDate: '2025-04-15',
    status: 'Active',
    officialEmail: 'neha.k@jigsyindia.com',
  },
];

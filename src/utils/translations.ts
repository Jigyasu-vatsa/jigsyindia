import { Language } from '../types';

export interface TranslationSchema {
  siteTitle: string;
  companyName: string;
  tagline: string;
  motto: string;
  marqueeAnnouncement: string;
  nav: {
    home: string;
    sectors: string;
    services: string;
    careers: string;
    youthPortal: string;
    about: string;
    ourCompany: string;
    ourDirectors: string;
    ourFounders: string;
    exploreJigsy: string;
    contact: string;
    writeToUs: string;
    employeeVerification: string;
    adminDesk: string;
    toggleTheme: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stat1Label: string;
    stat1Val: string;
    stat2Label: string;
    stat2Val: string;
    stat3Label: string;
    stat3Val: string;
  };
  servicesBento: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    viewAllBtn: string;
    saas: {
      title: string;
      desc: string;
      cta: string;
    };
    database: {
      title: string;
      desc: string;
      cta: string;
    };
    internship: {
      title: string;
      feeTag: string;
      desc: string;
      cta: string;
    };
    rd: {
      title: string;
      desc: string;
      cta: string;
    };
    publishing: {
      title: string;
      desc: string;
      cta: string;
    };
    advisory: {
      title: string;
      desc: string;
      cta: string;
    };
  };
  youthBanner: {
    badge: string;
    title: string;
    desc: string;
    cta: string;
  };
  feeWaiverShowcase: {
    badge: string;
    waiverHeadline: string;
    waiverSubtext: string;
    title: string;
    subtitle: string;
    pillars: {
      accessTitle: string;
      accessDesc: string;
      exposureTitle: string;
      exposureDesc: string;
      innovateTitle: string;
      innovateDesc: string;
      socialTitle: string;
      socialDesc: string;
    };
    note: string;
    cta: string;
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    leaveReviewTitle: string;
    nameLabel: string;
    ratingLabel: string;
    commentLabel: string;
    submitReview: string;
  };
  contactSection: {
    badge: string;
    title: string;
    desc: string;
    officeLabel: string;
    emailLabel: string;
    phoneLabel: string;
    writeUsTitle: string;
    writeUsSubtitle: string;
    nameLabel: string;
    emailLabelInput: string;
    sectorLabel: string;
    selectSectorPlaceholder: string;
    generalOption: string;
    subjectLabel: string;
    messageLabel: string;
    sendBtn: string;
    successMsg: string;
  };
  internship: {
    sectionTitle: string;
    sectionSubtitle: string;
    guaranteeText: string;
    applyNow: string;
    viewDetails: string;
    feeBreakdown: string;
    courseFee: string;
    miscFee: string;
    totalPayable: string;
    enrollNow: string;
    verificationNotice: string;
    applicantFormTitle: string;
    fullName: string;
    email: string;
    phone: string;
    college: string;
    degree: string;
    branch: string;
    passingYear: string;
    payWithRazorpay: string;
    termsAgreement: string;
    enterCaptcha: string;
    submitApplication: string;
    checkStatusTitle: string;
    checkStatusBtn: string;
  };
  about: {
    title: string;
    subtitle: string;
    storyTitle: string;
    storyContent: string;
    milestoneConception: string;
    visionTitle: string;
    directorsTitle: string;
    foundersTitle: string;
  };
  careers: {
    title: string;
    subtitle: string;
    filterAll: string;
    applyJob: string;
    postJobBtn: string;
  };
  verification: {
    title: string;
    subtitle: string;
    empIdLabel: string;
    emailLabel: string;
    verifyBtn: string;
  };
  footer: {
    developedBy: string;
    rights: string;
    cin: string;
    dpit: string;
    gstin: string;
    msme: string;
    office: string;
    visitors: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  en: {
    siteTitle: 'JIGSY INDIA',
    companyName: 'JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED',
    tagline: 'जिज्ञासु ईक्षण ग्रंथि समृद्धि युक्ति',
    motto: 'JIGYASU INTEGRATED GLOBAL SERVICES with YOU',
    marqueeAnnouncement: 'Contact us for SaaS, IT enterprise systems, mass recruitments, campus hiring, digital outreach, and legal compliance · Delivering services worldwide · JIGSY Youth internship applications open now - Secure your seat!',
    nav: {
      home: 'Home',
      sectors: 'Sectors',
      services: 'Services',
      careers: 'Careers & Jobs',
      youthPortal: 'JIGSY Youth Portal',
      about: 'About Us',
      ourCompany: 'Our Company',
      ourDirectors: 'Our Directors',
      ourFounders: 'Our Founders',
      exploreJigsy: 'Explore JIGSY',
      contact: 'Contact',
      writeToUs: 'Write To Us',
      employeeVerification: 'Employee Verification',
      adminDesk: 'Admin Desk',
      toggleTheme: 'Theme',
    },
    hero: {
      badge: 'Integrated Multi-Sector Enterprise',
      titleLine1: 'We are dedicated',
      titleLine2: 'to contribute globally',
      subtitle: 'Empowering upcoming generations by uniting cutting-edge technology, youth mentorship, foundational R&D, and corporate governance for a smarter tomorrow.',
      ctaPrimary: 'Secure Your Seat / Apply Now',
      ctaSecondary: 'Explore All 6 Sectors',
      stat1Val: 'Limited Seats',
      stat1Label: 'Batch 2025–26 Now Open',
      stat2Val: 'Multi-Stream',
      stat2Label: 'BA, BSc, BCom, BTech & More',
      stat3Val: '100% Waived',
      stat3Label: '₹0 Tuition (Grow with India)',
    },
    servicesBento: {
      sectionBadge: 'Enterprise Capabilities',
      sectionTitle: 'Our Core Operating Capabilities & Services',
      sectionSubtitle: 'Customized cross-sector business and technological solutions spanning full-stack cloud applications, foundational mathematical research, accredited publishing, and verified talent pipelines.',
      viewAllBtn: 'Explore All 6 Corporate Sectors',
      saas: {
        title: 'SaaS & Web Project Development',
        desc: 'Building custom web applications, full-stack software, and scalable SaaS platforms for businesses worldwide.',
        cta: 'Explore Tech Solutions →',
      },
      database: {
        title: 'Database Design & Management',
        desc: 'Designing secure, high-performance relational databases and providing expert data management and optimization services.',
        cta: 'View Data Services →',
      },
      internship: {
        title: 'Internship & Certification Tracks',
        feeTag: 'Fee: ₹0',
        desc: 'Structured 30 to 45-day industrial apprenticeships with Razorpay checkout, subsidized tuition, and 24-72h confirmation.',
        cta: 'Apply for Internships →',
      },
      rd: {
        title: 'Foundational R&D & Algorithms',
        desc: 'Combinatorial algorithms and heuristics published in Springer Nature with academic co-authorship and mathematical rigor.',
        cta: 'Explore Research Cell →',
      },
      publishing: {
        title: 'Global ISBN Publishing & Media',
        desc: 'Textbook authoring ("Mastering DSA Without Fear" on Amazon), ISBN proceedings, and educational video production.',
        cta: 'View Publications →',
      },
      advisory: {
        title: 'Digital & Legal Consultancy',
        desc: 'Essential corporate services covering company registration (Pvt Ltd, LLP), GST filing, and Class 3 DSC tokens.',
        cta: 'Get Advisory →',
      },
    },
    youthBanner: {
      badge: 'Secure Your Seat / Apply 2025–26',
      title: 'JIGSY Youth Internship & Certification Sprints',
      desc: 'Apply for Internship Certification, Industrial Training, or Research-Oriented tracks across all academic streams. All course tuition fees waived (₹0)! Automated receipt generated upon Razorpay checkout.',
      cta: 'Apply Now',
    },
    feeWaiverShowcase: {
      badge: 'Grow Together with India · ₹0 Tuition Initiative',
      waiverHeadline: '100% Course Fee Waiver',
      waiverSubtext: '₹0 Course Tuition Fee across all academic streams',
      title: 'Smooth, Barrier-Free Exposure for Young Minds of India',
      subtitle: 'At JIGSY INDIA, we believe financial barriers should never limit curiosity or national progress. We waive 100% of course tuition fees to create easy, smooth access for students across India to explore, innovate, build industry readiness, and contribute socially.',
      pillars: {
        accessTitle: 'Easy & Smooth Access for All Streams',
        accessDesc: 'Open to all diploma, undergraduate (BA, B.Sc, B.Com, BBA, BCA, B.Tech, etc) and postgraduate (MA, MSc, M.Com, MBA, M.Tech) learners with streamlined digital registration and zero tuition cost.',
        exposureTitle: 'Practical Industry & R&D Exposure',
        exposureDesc: 'Experience real-world workflows across technology, enterprise operations, multi-disciplinary publishing, and foundational research.',
        innovateTitle: 'Innovate, Explore & Build Confidence',
        innovateDesc: 'Encouraging curious young minds to experiment, prototype ideas, master structured methodologies, and grow through mentorship.',
        socialTitle: 'Contribute Socially & Nation-Building',
        socialDesc: 'Channeling youth energy into socially impactful projects, open knowledge sharing, and sustainable community growth across Bharat.',
      },
      note: '100% of course tuition fees are waived (₹0). Only nominal administrative, credential verification & certification processing applies cleanly per track.',
      cta: 'Apply Now',
    },
    testimonials: {
      badge: 'Authentic Experiences',
      title: 'Voices of Trust & Growth',
      subtitle: 'Hear directly from our student researchers, operations managers, and research fellows collaborating with JIGSY INDIA.',
      leaveReviewTitle: 'Share Your Experience with JIGSY',
      nameLabel: 'Your Full Name',
      ratingLabel: 'Rating',
      commentLabel: 'Your Review / Comment',
      submitReview: 'Submit Review',
    },
    contactSection: {
      badge: 'Get In Touch',
      title: 'Contact Information',
      desc: 'Connect with our corporate office for software development, research collaboration, mass hirings, or legal compliance.',
      officeLabel: 'Registered Office',
      emailLabel: 'Official Email Address',
      phoneLabel: 'Telephone Support',
      writeUsTitle: 'Write To Us ☎️📨',
      writeUsSubtitle: 'Send an official message to our executive team. We respond within 24 hours.',
      nameLabel: 'Your Name *',
      emailLabelInput: 'Email Address *',
      sectorLabel: 'Select Sector *',
      selectSectorPlaceholder: 'Select target sector...',
      generalOption: 'General Corporate Inquiry',
      subjectLabel: 'Subject *',
      messageLabel: 'Your Message *',
      sendBtn: 'Dispatch Message',
      successMsg: 'Your message has been dispatched successfully! Our team will get in touch shortly.',
    },
    internship: {
      sectionTitle: 'JIGSY Youth Internship & Certification Tracks',
      sectionSubtitle: 'Hands-on industrial exposure, multi-stream project assignments, and certified credentials backed by JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED.',
      guaranteeText: 'All application documents, payment credentials, and student verification will be confirmed with official Offer/Acceptance Letter delivered via email within 24 to 72 hours.',
      applyNow: 'Enroll in Track',
      viewDetails: 'Syllabus & Details',
      feeBreakdown: 'Fee Structure',
      courseFee: 'Tuition Fee (Subsidized)',
      miscFee: 'Processing & Miscellaneous Fee',
      totalPayable: 'Total Payable',
      enrollNow: 'Proceed to Secure Payment',
      verificationNotice: 'Payment confirmation, student credentials check, and formal acceptance letter will be dispatched to your email within 24-72 hours.',
      applicantFormTitle: 'Internship Application & Registration Form',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Mobile / WhatsApp Number',
      college: 'College / Institute Name',
      degree: 'Degree (e.g. BBA / B.Tech / B.Sc / BA / B.Com)',
      branch: 'Specialization / Stream (e.g. HR / CSE / Finance)',
      passingYear: 'Year of Graduation',
      payWithRazorpay: 'Pay via Razorpay (Instant Auto-Receipt)',
      termsAgreement: 'I have read, understood, am aware of, and accept all Privacy Policies and Terms & Conditions of JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED.',
      enterCaptcha: 'Enter CAPTCHA Code',
      submitApplication: 'Complete Registration & Generate Receipt',
      checkStatusTitle: 'Track Existing Application Status',
      checkStatusBtn: 'Check Status',
    },
    about: {
      title: 'About JIGSY INDIA',
      subtitle: 'Building a Foundation for Sustainable Global Contributions',
      storyTitle: 'Our Story & Historical Foundation',
      storyContent: 'The founding vision of JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED was officially conceived on October 3rd, 2010. Dedicated to empowering youth and fostering enterprise innovation, the founder declared this significant milestone as the foundation day for work commencement and national engagement.',
      milestoneConception: 'Conception Date: October 3, 2010 | Corporate Incorporation: 2025',
      visionTitle: 'Our Strategic Vision',
      directorsTitle: 'Board of Directors',
      foundersTitle: 'Our Visionary Founders',
    },
    careers: {
      title: 'Careers & Opportunities at JIGSY',
      subtitle: 'Join a purpose-driven organization advancing technology, publishing, and youth development.',
      filterAll: 'All Positions',
      applyJob: 'Apply for Role',
      postJobBtn: 'Post a Requirement / Hire Talent',
    },
    verification: {
      title: 'Employee & Credential Verification',
      subtitle: 'Authenticate the active status of JIGSY personnel securely.',
      empIdLabel: 'Employee Unique ID',
      emailLabel: 'Official Email ID',
      verifyBtn: 'Request Verification Check',
    },
    footer: {
      developedBy: 'Developed & Maintained by JIGYASU VATSA',
      rights: 'All Rights Reserved. JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED',
      cin: 'CIN: U62099BR2025PTC078592',
      dpit: 'DPIIT: DIPP228528',
      gstin: 'GSTIN: 10AAHCJ0404B1ZN',
      msme: 'MSME: UDYAM-BR-34-0051280',
      office: 'Darbhanga, Bihar, INDIA - 846004',
      visitors: 'Total Portal Visitors',
    },
  },
  hi: {
    siteTitle: 'जिग्सी इंडिया',
    companyName: 'जिज्ञासु इंटीग्रेटेड ग्लोबल सर्विसेज प्राइवेट लिमिटेड',
    tagline: 'जिज्ञासु ईक्षण ग्रंथि समृद्धि युक्ति',
    motto: 'जिज्ञासु इंटीग्रेटेड ग्लोबल सर्विसेज विथ यू',
    marqueeAnnouncement: 'सास (SaaS), आईटी उद्यम प्लेटफॉर्म, जन भर्ती, कैंपस प्लेसमेंट, डिजिटल प्रचार एवं विधिक परामर्श के लिए हमसे संपर्क करें · विश्व स्तर पर सेवाएं प्रदान कर रहे हैं · जिग्सी यूथ इंटर्नशिप प्रवेश प्रारंभ!',
    nav: {
      home: 'मुख्य पृष्ठ',
      sectors: 'कार्य क्षेत्र (सेक्टर्स)',
      services: 'सेवाएं',
      careers: 'करियर एवं रोजगार',
      youthPortal: 'जिग्सी यूथ पोर्टल',
      about: 'हमारे बारे में',
      ourCompany: 'हमारी कंपनी',
      ourDirectors: 'हमारे निदेशक',
      ourFounders: 'हमारे संस्थापक',
      exploreJigsy: 'जिग्सी को जानें',
      contact: 'संपर्क करें',
      writeToUs: 'संदेश भेजें',
      employeeVerification: 'कर्मचारी सत्यापन',
      adminDesk: 'प्रशासन डेस्क',
      toggleTheme: 'थीम',
    },
    hero: {
      badge: 'एकीकृत बहु-क्षेत्रीय उद्यम',
      titleLine1: 'हम समर्पित हैं',
      titleLine2: 'वैश्विक स्तर पर योगदान हेतु',
      subtitle: 'आगामी पीढ़ी को आधुनिक तकनीक, युवा मार्गदर्शन, मौलिक अनुसंधान और कॉरपोरेट सुशासन से सशक्त बनाकर एक स्मार्ट भविष्य का निर्माण।',
      ctaPrimary: 'सीट सुरक्षित करें / आवेदन करें',
      ctaSecondary: 'सभी 6 कार्य क्षेत्र देखें',
      stat1Val: 'सीमित सीटें',
      stat1Label: 'बैच 2025–26 खुला है',
      stat2Val: 'बहु-संकाय',
      stat2Label: 'बीए, बीएससी, बीकॉम, बीटेक आदि',
      stat3Val: '100% माफ',
      stat3Label: '₹0 शिक्षण शुल्क (देश के साथ बढ़ें)',
    },
    servicesBento: {
      sectionBadge: 'कॉरपोरेट क्षमताएं',
      sectionTitle: 'हमारी प्रमुख परिचालन क्षमताएं एवं सेवाएं',
      sectionSubtitle: 'सॉफ्टवेयर डेवलपमेंट, गणितीय अनुसंधान, वैश्विक प्रकाशन और युवा प्रशिक्षण में अनुकूलित बहु-क्षेत्रीय तकनीकी समाधान।',
      viewAllBtn: 'सभी 6 कॉरपोरेट क्षेत्र देखें',
      saas: {
        title: 'सास एवं वेब प्रोजेक्ट विकास',
        desc: 'विश्वभर के उद्यमों हेतु कस्टम वेब एप्लिकेशन, फुल-स्टैक सॉफ्टवेयर और स्केलेबल सास प्लेटफॉर्म का निर्माण।',
        cta: 'तकनीकी समाधान देखें →',
      },
      database: {
        title: 'डेटाबेस डिजाइन एवं प्रबंधन',
        desc: 'सुरक्षित, उच्च प्रदर्शन रिलेशनल डेटाबेस का निर्माण और कुशल डेटा अनुकूलन सेवाएं।',
        cta: 'डेटा सेवाएं देखें →',
      },
      internship: {
        title: 'इंटर्नशिप एवं प्रमाणन ट्रैक',
        feeTag: 'शुल्क: ₹0',
        desc: 'रेज़रपे चेकआउट, अनुदानित ट्यूशन और 24-72 घंटे में पुष्टि के साथ संरचित 30 से 45 दिवसीय औद्योगिक इंटर्नशिप।',
        cta: 'इंटर्नशिप हेतु आवेदन करें →',
      },
      rd: {
        title: 'मौलिक आरएंडडी एवं एल्गोरिदम',
        desc: 'स्प्रिंगर नेचर में प्रकाशित संयुक्त एल्गोरिदम, अकादमिक सह-लेखन और गणितीय विश्लेषण।',
        cta: 'अनुसंधान प्रकोष्ठ देखें →',
      },
      publishing: {
        title: 'वैश्विक आईएसबीएन प्रकाशन एवं मीडिया',
        desc: 'अमेज़न पर प्रकाशित पाठ्यपुस्तक ("Mastering DSA Without Fear"), आईएसबीएन कार्यवाही और शैक्षिक वीडियो निर्माण।',
        cta: 'प्रकाशन देखें →',
      },
      advisory: {
        title: 'डिजिटल एवं विधिक परामर्श',
        desc: 'कंपनी पंजीकरण (Pvt Ltd, LLP), जीएसटी रिटर्न और क्लास 3 डीएससी टोकन जैसी आवश्यक कॉरपोरेट सेवाएं।',
        cta: 'परामर्श प्राप्त करें →',
      },
    },
    youthBanner: {
      badge: 'सीट सुरक्षित करें / आवेदन 2025–26',
      title: 'जिग्सी यूथ इंटर्नशिप एवं प्रमाणन कार्यक्रम',
      desc: 'सभी संकायों हेतु इंटर्नशिप प्रमाणन, औद्योगिक प्रशिक्षण या शोध-अभिमुख ट्रैक के लिए आवेदन करें। संपूर्ण पाठ्यक्रम शुल्क माफ (₹0)! रेज़रपे भुगतान पर स्वतः रसीद उपलब्ध।',
      cta: 'अभी आवेदन करें',
    },
    feeWaiverShowcase: {
      badge: 'देश के साथ बढ़ें · ₹0 शिक्षण शुल्क पहल',
      waiverHeadline: '100% कोर्स फीस माफी',
      waiverSubtext: 'सभी संकायों हेतु ₹0 पाठ्यक्रम शिक्षण शुल्क',
      title: 'भारत की युवा प्रतिभाओं को सहज, सुलभ और व्यावहारिक अवसर',
      subtitle: 'जिग्सी इंडिया का संकल्प है कि आर्थिक बाधाएं कभी भी जिज्ञासा या राष्ट्र निर्माण के मार्ग में बाधक न बनें। हम 100% कोर्स शिक्षण शुल्क माफ करते हैं ताकि भारत के युवा सहजता से नए अनुभव प्राप्त कर सकें, नवाचार कर सकें और समाज में सार्थक योगदान दे सकें।',
      pillars: {
        accessTitle: 'सभी संकायों के लिए सहज व सुगम प्रवेश',
        accessDesc: 'डिप्लोमा, स्नातक (बीए, बीएससी, बीकॉम, बीबीए, बीसीए, बी.टेक आदि) और स्नातकोत्तर (एमए, एमएससी, एमकॉम, एमबीए, एम.टेक) के सभी छात्रों के लिए बिना किसी ट्यूशन शुल्क के सरल डिजिटल पंजीकरण।',
        exposureTitle: 'व्यावहारिक उद्योग एवं शोध अनुभव',
        exposureDesc: 'सॉफ्टवेयर तकनीक, कॉरपोरेट संचालन, प्रकाशन एवं मौलिक अनुसंधान की वास्तविक कार्यप्रणाली से प्रत्यक्ष जुड़ाव।',
        innovateTitle: 'नवाचार, अन्वेषण एवं आत्मविश्वास निर्माण',
        innovateDesc: 'जिज्ञासु युवाओं को नए विचार खोजने, प्रयोगात्मक सीखने और विशेषज्ञ मार्गदर्शन में आगे बढ़ने का प्रोत्साहन।',
        socialTitle: 'सामाजिक योगदान एवं राष्ट्र निर्माण',
        socialDesc: 'युवा ऊर्जा को समाजोपयोगी समाधानों, ज्ञान साझा करने और भारत के सतत विकास से जोड़ने की पहल।',
      },
      note: 'पाठ्यक्रम का 100% शिक्षण शुल्क माफ (₹0) है। केवल न्यूनतम प्रशासनिक, साख सत्यापन एवं प्रमाणपत्र प्रक्रिया शुल्क लागू होता है।',
      cta: 'अभी आवेदन करें',
    },
    testimonials: {
      badge: 'प्रामाणिक अनुभव',
      title: 'विश्वास एवं प्रगति के अनुभव',
      subtitle: 'जिग्सी इंडिया के साथ जुड़े छात्रों, शोध प्रमुखों और उद्योग संरक्षकों के प्रत्यक्ष विचार।',
      leaveReviewTitle: 'जिग्सी के साथ अपना अनुभव साझा करें',
      nameLabel: 'आपका पूरा नाम',
      ratingLabel: 'रेटिंग',
      commentLabel: 'आपकी समीक्षा / विचार',
      submitReview: 'समीक्षा भेजें',
    },
    contactSection: {
      badge: 'संपर्क सूत्र',
      title: 'संपर्क विवरण',
      desc: 'सॉफ्टवेयर विकास, शोध सहयोग, जन भर्ती या विधिक अनुपालन हेतु हमारे कॉरपोरेट कार्यालय से संपर्क करें।',
      officeLabel: 'पंजीकृत कार्यालय',
      emailLabel: 'आधिकारिक ईमेल पता',
      phoneLabel: 'दूरभाष सहायता',
      writeUsTitle: 'संदेश भेजें ☎️📨',
      writeUsSubtitle: 'हमारी कार्यकारी टीम को संदेश भेजें। हम 24 घंटे में उत्तर देते हैं।',
      nameLabel: 'आपका नाम *',
      emailLabelInput: 'ईमेल पता *',
      sectorLabel: 'क्षेत्र चुनें *',
      selectSectorPlaceholder: 'लक्षित क्षेत्र चुनें...',
      generalOption: 'सामान्य कॉरपोरेट पूछताछ',
      subjectLabel: 'विषय *',
      messageLabel: 'आपका संदेश *',
      sendBtn: 'संदेश प्रेषित करें',
      successMsg: 'आपका संदेश सफलतापूर्वक भेज दिया गया है! हमारी टीम शीघ्र संपर्क करेगी।',
    },
    internship: {
      sectionTitle: 'जिग्सी यूथ इंटर्नशिप एवं प्रमाणन कार्यक्रम',
      sectionSubtitle: 'व्यावहारिक औद्योगिक अनुभव, बहु-संकाय प्रोजेक्ट्स और प्रामाणिक प्रमाणन — जिज्ञासु इंटीग्रेटेड ग्लोबल सर्विसेज द्वारा संचालित।',
      guaranteeText: 'आपके सभी आवेदन विवरण, शुल्क रसीद एवं छात्र साख की पुष्टि के पश्चात 24 से 72 घंटों के भीतर आधिकारिक स्वीकृति पत्र (Offer Letter) आपके ईमेल पर प्रेषित किया जाएगा।',
      applyNow: 'प्रवेश लें',
      viewDetails: 'पाठ्यक्रम एवं विवरण',
      feeBreakdown: 'शुल्क संरचना',
      courseFee: 'कोर्स शिक्षण शुल्क (अनुदानित)',
      miscFee: 'प्रक्रिया एवं विविध शुल्क',
      totalPayable: 'कुल देय राशि',
      enrollNow: 'सुरक्षित भुगतान करें',
      verificationNotice: 'भुगतान सत्यापन और साख जांच के बाद 24 से 72 घंटे में स्वीकृति पत्र भेजा जाएगा।',
      applicantFormTitle: 'इंटर्नशिप आवेदन एवं पंजीकरण प्रपत्र',
      fullName: 'पूरा नाम',
      email: 'ईमेल पता',
      phone: 'मोबाइल / व्हाट्सएप नंबर',
      college: 'महाविद्यालय / संस्थान का नाम',
      degree: 'डिग्री (उदा. बीबीए / बी.टेक / बी.एससी / बी.कॉम)',
      branch: 'शाखा / संकाय (उदा. एचआर / सीएसई / वित्त / कला)',
      passingYear: 'उत्तीर्ण वर्ष',
      payWithRazorpay: 'रेज़रपे द्वारा त्वरित भुगतान (स्वतः रसीद)',
      termsAgreement: 'मैंने जिज्ञासु इंटीग्रेटेड ग्लोबल सर्विसेज प्राइवेट लिमिटेड की सभी गोपनीयता नीतियों एवं नियमों व शर्तों को पढ़ लिया है, समझ लिया है और स्वीकार करता/करती हूँ।',
      enterCaptcha: 'कैप्चा कोड दर्ज करें',
      submitApplication: 'पंजीकरण पूर्ण करें एवं रसीद प्राप्त करें',
      checkStatusTitle: 'आवेदन स्थिति जांचें',
      checkStatusBtn: 'स्थिति देखें',
    },
    about: {
      title: 'जिग्सी इंडिया के विषय में',
      subtitle: 'सतत वैश्विक योगदान हेतु सुदृढ़ आधारशिला',
      storyTitle: 'हमारी कहानी एवं ऐतिहासिक पृष्ठभूमि',
      storyContent: 'जिज्ञासु इंटीग्रेटेड ग्लोबल सर्विसेज प्राइवेट लिमिटेड की मूल संकल्पना 3 अक्टूबर 2010 को उद्भूत हुई थी। युवाओं को संबल प्रदान करने और नवाचार को गति देने के लिए संस्थापक ने इस गौरवशाली दिवस को कार्य प्रारंभ व राष्ट्रीय सहभागिता का स्थापना दिवस घोषित किया।',
      milestoneConception: 'संकल्पना दिवस: 3 अक्टूबर 2010 | विधिक निगमन: 2025',
      visionTitle: 'हमारा रणनीतिक दृष्टिकोण',
      directorsTitle: 'निदेशक मंडल',
      foundersTitle: 'हमारे दूरदर्शी संस्थापक',
    },
    careers: {
      title: 'जिग्सी में करियर एवं अवसर',
      subtitle: 'तकनीक, प्रकाशन और युवा संवर्धन में अग्रसर एक लक्ष्य-उन्मुख संगठन का हिस्सा बनें।',
      filterAll: 'सभी पद',
      applyJob: 'आवेदन करें',
      postJobBtn: 'नौकरी प्रकाशित करें / प्रतिभा खोजें',
    },
    verification: {
      title: 'कर्मचारी एवं साख सत्यापन',
      subtitle: 'जिग्सी कर्मियों की सक्रिय स्थिति की त्वरित व सुरक्षित जांच करें।',
      empIdLabel: 'कर्मचारी यूनिक आईडी',
      emailLabel: 'आधिकारिक ईमेल आईडी',
      verifyBtn: 'सत्यापन अनुरोध भेजें',
    },
    footer: {
      developedBy: 'विकास एवं संधारण: जिज्ञासु वत्स द्वारा',
      rights: 'सर्वाधिकार सुरक्षित। जिज्ञासु इंटीग्रेटेड ग्लोबल सर्विसेज प्राइवेट लिमिटेड',
      cin: 'सीआईएन (CIN): U62099BR2025PTC078592',
      dpit: 'डीपीआईआईटी (DPIIT): DIPP228528',
      gstin: 'जीएसटीआईएन (GSTIN): 10AAHCJ0404B1ZN',
      msme: 'एमएसएमई (MSME): UDYAM-BR-34-0051280',
      office: 'दरभंगा, बिहार, भारत - 846004',
      visitors: 'कुल आगंतुक संख्या',
    },
  },
  mai: {
    siteTitle: 'जिग्सी इंडिया',
    companyName: 'जिज्ञासु इंटीग्रेटेड ग्लोबल सर्विसेज प्राइवेट लिमिटेड',
    tagline: 'जिज्ञासु ईक्षण ग्रंथि समृद्धि युक्ति',
    motto: 'जिज्ञासु एकीकृत वैश्विक सेवा अहाँक संग',
    marqueeAnnouncement: 'सॉफ्टवेयर (SaaS), आईटी उद्यम प्रणालियों, मास हायरिंग, कैंपस रिक्रूटमेंट, डिजिटल प्रसार आ विधिक परामर्श हेतु संपर्क करू · विश्व भरि में सेवा प्रदाय · जिग्सी यूथ इंटर्नशिप प्रवेश आरंभ!',
    nav: {
      home: 'मुख पृष्ठ',
      sectors: 'कार्य क्षेत्र (सेक्टर्स)',
      services: 'सेवा सभ',
      careers: 'करियर आ रोजगार',
      youthPortal: 'जिग्सी यूथ पोर्टल',
      about: 'हमरा लोकनिक संबंध में',
      ourCompany: 'हमार कंपनी',
      ourDirectors: 'हमार निदेशक',
      ourFounders: 'हमार संस्थापक',
      exploreJigsy: 'जिग्सीकेँ बूझू',
      contact: 'संपर्क करू',
      writeToUs: 'संदेश पठाऊ',
      employeeVerification: 'कर्मचारी सत्यापन',
      adminDesk: 'प्रशासन डेस्क',
      toggleTheme: 'थीम',
    },
    hero: {
      badge: 'एकीकृत बहु-क्षेत्रीय उद्यम',
      titleLine1: 'हम समर्पित छी',
      titleLine2: 'वैश्विक योगदान हेतु',
      subtitle: 'भावी पीढ़ीकेँ आधुनिक तकनीक, युवा मार्गदर्शन, मौलिक अनुसंधान आ सुदृढ़ सुशासन सँ समृद्ध बना कऽ एक उत्कृष्ट भविष्यक निर्माण।',
      ctaPrimary: 'स्थान सुरक्षित करू / आवेदन करू',
      ctaSecondary: 'सभटा ६ टा क्षेत्र देखू',
      stat1Val: 'सीमित स्थान',
      stat1Label: 'बैच २०२५–२६ खुला अछि',
      stat2Val: 'बहु-संकाय',
      stat2Label: 'बीए, बीएससी, बीकॉम, बीटेक आदि',
      stat3Val: '१००% माफ',
      stat3Label: '₹० ट्यूशन शुल्क (देश संग बढ़ू)',
    },
    servicesBento: {
      sectionBadge: 'कॉरपोरेट क्षमता सभ',
      sectionTitle: 'हमार मुख्य परिचालन क्षमता आ सेवा सभ',
      sectionSubtitle: 'सॉफ्टवेयर निर्माण, गणितीय अनुसंधान, वैश्विक प्रकाशन आ युवा प्रशिक्षण में समर्पित बहु-क्षेत्रीय तकनीकी समाधान।',
      viewAllBtn: 'सभटा ६ टा क्षेत्र देखू',
      saas: {
        title: 'सास आ वेब प्रोजेक्ट विकास',
        desc: 'विश्वभरक उद्यम लेल आधुनिक वेब ऐप्लिकेशन, फुल-स्टैक सॉफ्टवेयर आ क्लाउड सास प्लेटफॉर्मक निर्माण।',
        cta: 'तकनीकी समाधान देखू →',
      },
      database: {
        title: 'डेटाबेस डिजाइन आ प्रबंधन',
        desc: 'सुरक्षित, उच्च प्रदर्शन रिलेशनल डेटाबेस आ दक्ष डेटा प्रबंधन सेवा सभ।',
        cta: 'डेटा सेवा देखू →',
      },
      internship: {
        title: 'इंटर्नशिप आ प्रमाणन ट्रैक',
        feeTag: 'शुल्क: ₹०',
        desc: 'रेज़रपे चेकआउट, अनुदानित ट्यूशन आ २४-७२ घंटा में पुष्टिकेँ संग संरचित ३० सँ ४५ दिनक औद्योगिक इंटर्नशिप।',
        cta: 'इंटर्नशिप लेल आवेदन करू →',
      },
      rd: {
        title: 'मौलिक आरएंडडी आ एल्गोरिदम',
        desc: 'स्प्रिंगर नेचर में प्रकाशित शोध पत्र, अकादमिक सह-लेखन आ गणितीय विश्लेषण।',
        cta: 'अनुसंधान कक्ष देखू →',
      },
      publishing: {
        title: 'वैश्विक आईएसबीएन प्रकाशन आ मीडिया',
        desc: 'अमेज़न पर प्रकाशित पुस्तक ("Mastering DSA Without Fear"), आईएसबीएन कार्यवाही आ शैक्षिक वीडियो निर्माण।',
        cta: 'प्रकाशन देखू →',
      },
      advisory: {
        title: 'डिजिटल आ विधिक परामर्श',
        desc: 'कंपनी पंजीकरण (Pvt Ltd, LLP), जीएसटी फाइलिंग आ क्लास ३ डीएससी टोकनक संपूर्ण कॉरपोरेट सेवा।',
        cta: 'परामर्श लिअ →',
      },
    },
    youthBanner: {
      badge: 'स्थान सुरक्षित करू / आवेदन २०२५–२६',
      title: 'जिग्सी यूथ इंटर्नशिप आ प्रमाणन कार्यक्रम',
      desc: 'सभ संकाय हेतु इंटर्नशिप प्रमाणन, औद्योगिक प्रशिक्षण वा शोध आधारित ट्रैक लेल आवेदन करू। सभटा कोर्स ट्यूशन फीस माफ (₹०)! रेज़रपे चेकआउट पर स्वतः रसीद।',
      cta: 'आबहि आवेदन करू',
    },
    feeWaiverShowcase: {
      badge: 'देश संग बढ़ू · ₹० शिक्षण शुल्क पहल',
      waiverHeadline: '१००% कोर्स फीस माफी',
      waiverSubtext: 'सभ संकाय लेल ₹० पाठ्यक्रम शिक्षण शुल्क',
      title: 'भारतक युवा मन लेल सहज, सुगम आ व्यावहारिक अवसर',
      subtitle: 'जिग्सी इंडिया मानैत अछि जे आर्थिक बाधा कहियो जिज्ञासा वा राष्ट्र विकास में अवरोध नहि बनबाक चाही। हम १००% कोर्स शिक्षण शुल्क माफ करैत छी जाहि सँ देशक युवा सहजता सँ नवाचार कऽ सकथि, नव अनुभव पाबि सकथि आ समाज में सार्थक योगदान दऽ सकथि।',
      pillars: {
        accessTitle: 'सभ संकाय लेल सहज आ सुगम पहुँच',
        accessDesc: 'डिप्लोमा, स्नातक (बीए, बीएससी, बीकॉम, बीबीए, बीसीए, बी.टेक आदि) आ स्नातकोत्तर (एमए, एमएससी, एमकॉम, एमबीए, एम.टेक) केँ सभ विद्यार्थी लेल बिना कोनो ट्यूशन शुल्क केँ सरल डिजिटल पंजीकरण।',
        exposureTitle: 'व्यावहारिक उद्योग आ शोध अनुभव',
        exposureDesc: 'प्रौद्योगिकी, उद्यम संचालन, प्रकाशन आ मौलिक अनुसंधानक वास्तविक कार्यप्रणाली सँ प्रत्यक्ष परिचय।',
        innovateTitle: 'नवाचार, अन्वेषण आ आत्मविश्वास निर्माण',
        innovateDesc: 'जिज्ञासु युवा लोकनि केँ नव विचार खोजबाक, प्रयोग करबाक आ विशेषज्ञ मार्गदर्शन में सीखबाक प्रोत्साहन।',
        socialTitle: 'सामाजिक योगदान आ राष्ट्र सेवा',
        socialDesc: 'युवा ऊर्जाकेँ समाजोपयोगी समाधान, ज्ञान प्रसार आ भारतक सतत प्रगतिक दिशा में अग्रसर करबाक संकल्प।',
      },
      note: 'पाठ्यक्रमक १००% शिक्षण शुल्क माफ (₹०) अछि। केवल न्यूनतम प्रशासनिक, साख सत्यापन आ प्रमाणपत्र प्रक्रिया शुल्क लागू होइत अछि।',
      cta: 'आबहि आवेदन करू',
    },
    testimonials: {
      badge: 'विश्वासक स्वर',
      title: 'विश्वास आ प्रगतिक अनुभव',
      subtitle: 'जिग्सी इंडिया संग जुड़ल छात्र, शोध प्रमुख आ मेंटर लोकनिक प्रत्यक्ष अनुभव।',
      leaveReviewTitle: 'जिग्सी संग अपन अनुभव साझा करू',
      nameLabel: 'अहाँक पूरा नाम',
      ratingLabel: 'रेटिंग',
      commentLabel: 'अहाँक समीक्षा / विचार',
      submitReview: 'समीक्षा पठाऊ',
    },
    contactSection: {
      badge: 'संपर्क सूत्र',
      title: 'संपर्क विवरण',
      desc: 'सॉफ्टवेयर विकास, शोध सहयोग, नियुक्ति वा विधिक परामर्श हेतु हमर कॉरपोरेट कार्यालय सँ संपर्क करू।',
      officeLabel: 'पंजीकृत कार्यालय',
      emailLabel: 'आधिकारिक ईमेल पता',
      phoneLabel: 'दूरभाष सहायता',
      writeUsTitle: 'संदेश पठाऊ ☎️📨',
      writeUsSubtitle: 'हमार कार्यकारी टीमकेँ संदेश पठाऊ। हम २४ घंटा में उत्तर दैत छी।',
      nameLabel: 'अहाँक नाम *',
      emailLabelInput: 'ईमेल पता *',
      sectorLabel: 'क्षेत्र चुनू *',
      selectSectorPlaceholder: 'लक्षित क्षेत्र चुनू...',
      generalOption: 'सामान्य पूछताछ',
      subjectLabel: 'विषय *',
      messageLabel: 'अहाँक संदेश *',
      sendBtn: 'संदेश पठाऊ',
      successMsg: 'अहाँक संदेश सफलता पूर्वक पठाओल गेल! हमार टीम शीघ्र संपर्क करत।',
    },
    internship: {
      sectionTitle: 'जिग्सी यूथ इंटर्नशिप आ प्रमाणन कार्यक्रम',
      sectionSubtitle: 'व्यावहारिक औद्योगिक अनुभव, बहु-संकाय प्रोजेक्ट्स आ प्रामाणिक प्रमाणन — जिज्ञासु इंटीग्रेटेड ग्लोबल सर्विसेज द्वारा।',
      guaranteeText: 'अहाँक आवेदन विवरण आ शुल्क पुष्टिकेँ उपरांत २४ सँ ७२ घंटाक भीतर आधिकारिक स्वीकृति पत्र (Offer Letter) अहाँक ईमेल पर पठाओल जायत।',
      applyNow: 'प्रवेश लिअ',
      viewDetails: 'पाठ्यक्रम विवरण',
      feeBreakdown: 'शुल्क संरचना',
      courseFee: 'कोर्स शिक्षण शुल्क (अनुदानित)',
      miscFee: 'प्रक्रिया आ विविध शुल्क',
      totalPayable: 'कुल देय राशि',
      enrollNow: 'सुरक्षित भुगतान करू',
      verificationNotice: 'भुगतान सत्यापन उपरांत २४ सँ ७२ घंटा में ईमेल द्वारा स्वीकृति पत्र उपलब्ध कराओल जायत।',
      applicantFormTitle: 'इंटर्नशिप आवेदन आ पंजीकरण फॉर्म',
      fullName: 'पूरा नाम',
      email: 'ईमेल पता',
      phone: 'मोबाइल / व्हाट्सएप नंबर',
      college: 'कॉलेज / संस्थानक नाम',
      degree: 'डिग्री (उदा. बीबीए / बी.टेक / बी.एससी)',
      branch: 'शाखा / विषय (उदा. एचआर / सीएसई / कला)',
      passingYear: 'उत्तीर्ण वर्ष',
      payWithRazorpay: 'रेज़रपे द्वारा त्वरित भुगतान (स्वतः रसीद)',
      termsAgreement: 'हम जिज्ञासु इंटीग्रेटेड ग्लोबल सर्विसेज प्राइवेट लिमिटेडक सभटा गोपनीयता नीति आ नियम-शर्तकेँ पढ़ि कऽ स्वीकार करैत छी।',
      enterCaptcha: 'कैप्चा कोड भरू',
      submitApplication: 'पंजीकरण पूर्ण करू आ रसीद पाबू',
      checkStatusTitle: 'आवेदनक स्थिति देखू',
      checkStatusBtn: 'स्थिति जांचू',
    },
    about: {
      title: 'जिग्सी इंडियाक परिचय',
      subtitle: 'सतत वैश्विक योगदान लेल सुदृढ़ आधारशिला',
      storyTitle: 'हमार इतिहास आ यात्रा',
      storyContent: 'जिज्ञासु इंटीग्रेटेड ग्लोबल सर्विसेज प्राइवेट लिमिटेडक मूल विचार ३ अक्टूबर २०१० केँ उद्भूत भेल छल। मिथिलाक पावन धरती दरभंगा सँ प्रेरित भऽ देश आ दुनियाक समृद्धिक लेल एहि संस्थाक स्थापना भेल।',
      milestoneConception: 'संकल्पना दिवस: ३ अक्टूबर २०१० | निगमन: २०२५',
      visionTitle: 'हमार दूरदर्शिता',
      directorsTitle: 'निदेशक मंडल',
      foundersTitle: 'हमार संस्थापक लोकनि',
    },
    careers: {
      title: 'जिग्सी में करियरक अवसर',
      subtitle: 'तकनीक, प्रकाशन आ युवा सशक्तीकरणक अग्रदूत संगठन संग जुड़ू।',
      filterAll: 'सभटा पद',
      applyJob: 'आवेदन करू',
      postJobBtn: 'नौकरी प्रकाशित करू',
    },
    verification: {
      title: 'कर्मचारी सत्यापन',
      subtitle: 'जिग्सीक कर्मीक प्रमाणिकता तुरन्त जांचू।',
      empIdLabel: 'कर्मचारी यूनिक आईडी',
      emailLabel: 'आधिकारिक ईमेल आईडी',
      verifyBtn: 'सत्यापन शुरू करू',
    },
    footer: {
      developedBy: 'विकास आ देखरेख: जिज्ञासु वत्स द्वारा',
      rights: 'सर्वाधिकार सुरक्षित। जिज्ञासु इंटीग्रेटेड ग्लोबल सर्विसेज प्राइवेट लिमिटेड',
      cin: 'सीआईएन (CIN): U62099BR2025PTC078592',
      dpit: 'डीपीआईआईटी (DPIIT): DIPP228528',
      gstin: 'जीएसटीआईएन (GSTIN): 10AAHCJ0404B1ZN',
      msme: 'एमएसएमई (MSME): UDYAM-BR-34-0051280',
      office: 'दरभंगा, बिहार, भारत - ८४६००४',
      visitors: 'कुल आगंतुक संख्या',
    },
  },
};

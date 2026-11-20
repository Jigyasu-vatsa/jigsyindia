import React, { useEffect, useRef, useState } from 'react';
import {
  Zap,
  ShieldAlert,
  ShieldCheck,
  Bot,
  MousePointerClick,
  CheckCircle2,
  ArrowRightCircle,
  ExternalLink,
  Sun,
  Moon,
  Globe,
  Mail,
  Loader2,
  Lock,
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import {
  SECURITY_GATE_CONFIG,
  SecurityGateStage,
  computeStage2Progress,
  computeStage3Remaining,
  isHoneypotTriggered,
  isManualBypassReady,
} from '../utils/securityGate';
import { CrispImage } from './CrispImage';

interface SecurityGateProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onVerified: () => void;
}

const GATE_COPY: Record<
  Language,
  {
    marquee: string;
    shieldBadge: string;
    stage0Heading: string;
    stage0Body: string;
    stage0Note: string;
    stage2Heading: string;
    stage2Body: string;
    stage2Note: string;
    stage3Heading: string;
    stage3Body: string;
    stage3Note: string;
    stage4Heading: string;
    timerPrefix: string;
    shortly: string;
    inSeconds: (sec: number) => string;
    antiBotTitle: string;
    antiBotDesc: string;
    verifiedTitle: string;
    verifiedDesc: string;
    servicesHeading: string;
    card1Desc: string;
    card1Footer: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
    card3Footer: string;
    panelTitle: string;
    completeBtn: string;
    proceedingBtn: string;
    statusLabel: string;
    awaitingLabel: string;
    remainingLabel: (sec: number) => string;
    successBarLabel: string;
    honeypotWarning: string;
    enterLocked: string;
    enterReady: string;
    enteringNow: string;
    step0Lbl: string;
    step2Lbl: string;
    step3Lbl: string;
    supportPrompt: string;
  }
> = {
  en: {
    marquee:
      'Protected by JIGSY INDIA Automated Anti-DoS & Anti-Bot Security Gateway · Verified access in ~15 seconds',
    shieldBadge: 'DDoS & Bot Protection Gateway',
    stage0Heading: 'Forwarding Request',
    stage0Body:
      'Our portal enforces automated traffic screening to protect against DoS and bot attacks. Please wait while we complete your initial security handshake (~2.5 seconds).',
    stage0Note: 'We appreciate your patience.',
    stage2Heading: 'Human Verification Required',
    stage2Body:
      'To ensure optimal performance and defense against automated traffic, a quick human verification is in progress. Click "Complete Verification" below the Services preview to proceed faster.',
    stage2Note: 'Your cooperation keeps JIGSY INDIA fast and resilient.',
    stage3Heading: 'Request Forwarding in Process',
    stage3Body:
      'Security screening passed! We are preparing the official JIGSY INDIA corporate portal for you. You will enter automatically when the countdown completes.',
    stage3Note: 'Thank you for your patience.',
    stage4Heading: 'Access Granted — Entering JIGSY INDIA',
    timerPrefix: 'You will automatically enter the official portal',
    shortly: 'shortly',
    inSeconds: (sec) => `in ${sec} second${sec === 1 ? '' : 's'}`,
    antiBotTitle: 'Anti-Bot Security Check',
    antiBotDesc:
      'Review the Services preview below and click "Complete Verification" to fast-track access. Auto-verification completes within ~15 seconds total.',
    verifiedTitle: 'Human Verified!',
    verifiedDesc: 'Human verification successful — advancing to final connection check...',
    servicesHeading: 'Services Preview',
    card1Desc:
      'Explore our integrated multi-sector corporate services across Tech, Consult, R&D, DigiTech, EduTech, and Youth.',
    card1Footer: 'Securing live portal connection...',
    card2Title: "Founder's Portfolio",
    card2Desc: 'Explore the research, publications, and institutional architecture of Founder Mr. Jigyasu Vatsa.',
    card3Title: 'All Services',
    card3Desc: 'Navigate all 6 corporate divisions, engagement models, and inquiry workflows.',
    card3Footer: '6 Corporate Divisions Ready',
    panelTitle: 'Verification Panel',
    completeBtn: 'Complete Verification',
    proceedingBtn: 'Proceeding next...',
    statusLabel: 'Process Status:',
    awaitingLabel: 'Awaiting User Click...',
    remainingLabel: (sec) => `${sec}s Remaining`,
    successBarLabel: 'Verification Successful!',
    honeypotWarning: 'Automated field tampering detected. Please verify manually.',
    enterLocked: 'Security Check Active',
    enterReady: 'Enter JIGSY INDIA (Ready)',
    enteringNow: 'Entering Portal...',
    step0Lbl: '1. Handshake',
    step2Lbl: '2. Human Scan',
    step3Lbl: '3. Forward',
    supportPrompt: 'Need urgent assistance? Reach our official desk directly at',
  },
  hi: {
    marquee:
      'JIGSY INDIA स्वचालित एंटी-DoS एवं एंटी-बॉट सुरक्षा गेटवे द्वारा संरक्षित · लगभग 15 सेकंड में सुरक्षित प्रवेश',
    shieldBadge: 'DDoS एवं बॉट सुरक्षा गेटवे',
    stage0Heading: 'अनुरोध अग्रेषित किया जा रहा है',
    stage0Body:
      'हमारा पोर्टल DoS और बॉट हमलों से सुरक्षा हेतु स्वचालित ट्रैफ़िक जांच करता है। प्रारंभिक सुरक्षा जांच पूर्ण होने तक कृपया प्रतीक्षा करें (~2.5 सेकंड)।',
    stage0Note: 'आपके धैर्य के लिए धन्यवाद।',
    stage2Heading: 'मानव सत्यापन आवश्यक है',
    stage2Body:
      'स्वचालित बॉट ट्रैफ़िक से सुरक्षा सुनिश्चित करने हेतु त्वरित मानव सत्यापन जारी है। शीघ्र आगे बढ़ने के लिए नीचे "सत्यापन पूर्ण करें" बटन पर क्लिक करें।',
    stage2Note: 'आपका सहयोग JIGSY INDIA को सुरक्षित और तेज़ बनाए रखता है।',
    stage3Heading: 'अनुरोध अग्रेषण प्रक्रियाधीन',
    stage3Body:
      'सुरक्षा जांच सफल रही! हम आपके लिए JIGSY INDIA आधिकारिक कॉर्पोरेट पोर्टल तैयार कर रहे हैं। काउंटडाउन पूर्ण होते ही आप स्वतः प्रवेश करेंगे।',
    stage3Note: 'आपके धैर्य के लिए आभार।',
    stage4Heading: 'प्रवेश स्वीकृत — JIGSY INDIA में प्रवेश',
    timerPrefix: 'आप आधिकारिक पोर्टल में स्वतः प्रवेश करेंगे',
    shortly: 'शीघ्र ही',
    inSeconds: (sec) => `${sec} सेकंड में`,
    antiBotTitle: 'एंटी-बॉट सुरक्षा जांच',
    antiBotDesc:
      'शीघ्र प्रवेश हेतु नीचे Services पूर्वावलोकन के बाद "सत्यापन पूर्ण करें" पर क्लिक करें। स्वतः सत्यापन लगभग 15 सेकंड में पूर्ण हो जाता है।',
    verifiedTitle: 'मानव सत्यापित!',
    verifiedDesc: 'मानव सत्यापन सफल — अंतिम कनेक्शन चरण की ओर अग्रसर...',
    servicesHeading: 'सेवा पूर्वावलोकन',
    card1Desc:
      'Tech, Consult, R&D, DigiTech, EduTech और Youth में हमारी एकीकृत कॉर्पोरेट सेवाओं का अन्वेषण करें।',
    card1Footer: 'सुरक्षित पोर्टल कनेक्शन स्थापित हो रहा है...',
    card2Title: 'संस्थापक पोर्टफोलियो',
    card2Desc: 'संस्थापक श्री जिज्ञासु वत्स के शोध, प्रकाशन और संस्थागत योगदान देखें।',
    card3Title: 'सभी सेवाएं',
    card3Desc: 'सभी 6 कॉर्पोरेट प्रभागों, सहभागिता मॉडल और सेवा अनुरोधों तक पहुंचें।',
    card3Footer: '6 कॉर्पोरेट प्रभाग तैयार',
    panelTitle: 'सत्यापन पैनल',
    completeBtn: 'सत्यापन पूर्ण करें',
    proceedingBtn: 'आगे बढ़ रहे हैं...',
    statusLabel: 'प्रक्रिया स्थिति:',
    awaitingLabel: 'उपयोगकर्ता क्लिक की प्रतीक्षा...',
    remainingLabel: (sec) => `${sec} सेकंड शेष`,
    successBarLabel: 'सत्यापन सफल!',
    honeypotWarning: 'स्वचालित इनपुट अवरोधित किया गया। कृपया मैन्युअल रूप से सत्यापित करें।',
    enterLocked: 'सुरक्षा जांच सक्रिय',
    enterReady: 'JIGSY INDIA में प्रवेश करें (तैयार)',
    enteringNow: 'पोर्टल खुल रहा है...',
    step0Lbl: '1. हैंडशेक',
    step2Lbl: '2. मानव स्कैन',
    step3Lbl: '3. प्रवेश',
    supportPrompt: 'तत्काल सहायता हेतु हमारे आधिकारिक डेस्क से संपर्क करें:',
  },
  mai: {
    marquee:
      'JIGSY INDIA स्वचालित एंटी-DoS आ एंटी-बॉट सुरक्षा गेटवे सँ सुरक्षित · लगभग 15 सेकंड में सुरक्षित प्रवेश',
    shieldBadge: 'DDoS आ बॉट सुरक्षा गेटवे',
    stage0Heading: 'अनुरोध आगू बढ़ाओल जा रहल अछि',
    stage0Body:
      'हमर पोर्टल DoS आ बॉट हमला सँ सुरक्षा लेल स्वचालित जांच करैत अछि। प्रारंभिक सुरक्षा जांच पूर्ण हेबा धरि प्रतीक्षा करू (~2.5 सेकंड)।',
    stage0Note: 'अहाँक धैर्य लेल धन्यवाद।',
    stage2Heading: 'मानव सत्यापन आवश्यक अछि',
    stage2Body:
      'स्वचालित बॉट ट्रैफ़िक सँ सुरक्षा लेल त्वरित मानव सत्यापन चलि रहल अछि। जल्दी आगू बढ़बा लेल नीचाँ "सत्यापन पूर्ण करू" बटन पर क्लिक करू।',
    stage2Note: 'अहाँक सहयोग JIGSY INDIA केँ सुरक्षित रखैत अछि।',
    stage3Heading: 'अनुरोध अग्रेषण प्रक्रियाधीन',
    stage3Body:
      'सुरक्षा जांच सफल भेल! हम अहाँ लेल JIGSY INDIA आधिकारिक कॉर्पोरेट पोर्टल तैयार कए रहल छी। काउंटडाउन पूर्ण भेला पर स्वतः प्रवेश भऽ जाएत।',
    stage3Note: 'अहाँक धैर्य लेल आभार।',
    stage4Heading: 'प्रवेश स्वीकृत — JIGSY INDIA में प्रवेश',
    timerPrefix: 'अहाँ आधिकारिक पोर्टल में स्वतः प्रवेश करब',
    shortly: 'शीघ्रहि',
    inSeconds: (sec) => `${sec} सेकंड में`,
    antiBotTitle: 'एंटी-बॉट सुरक्षा जांच',
    antiBotDesc:
      'शीघ्र प्रवेश लेल नीचाँ Services पूर्वावलोकन के बाद "सत्यापन पूर्ण करू" पर क्लिक करू। स्वतः सत्यापन लगभग 15 सेकंड में पूर्ण भऽ जाएत।',
    verifiedTitle: 'मानव सत्यापित!',
    verifiedDesc: 'मानव सत्यापन सफल — अंतिम चरण दिस अग्रसर...',
    servicesHeading: 'सेवा पूर्वावलोकन',
    card1Desc:
      'Tech, Consult, R&D, DigiTech, EduTech आ Youth में हमर एकीकृत कॉर्पोरेट सेवाक अनुभव करू।',
    card1Footer: 'सुरक्षित पोर्टल कनेक्शन स्थापित भऽ रहल अछि...',
    card2Title: 'संस्थापक पोर्टफोलियो',
    card2Desc: 'संस्थापक श्री जिज्ञासु वत्स केर शोध, प्रकाशन आ योगदान देखू।',
    card3Title: 'सभ सेवा',
    card3Desc: 'सभ 6 कॉर्पोरेट प्रभाग आ सेवा अनुरोध प्रणाली तक पहुँचू।',
    card3Footer: '6 कॉर्पोरेट प्रभाग तैयार',
    panelTitle: 'सत्यापन पैनल',
    completeBtn: 'सत्यापन पूर्ण करू',
    proceedingBtn: 'आगू बढ़ि रहल छी...',
    statusLabel: 'प्रक्रिया स्थिति:',
    awaitingLabel: 'उपयोगकर्ता क्लिक केर प्रतीक्षा...',
    remainingLabel: (sec) => `${sec} सेकंड शेष`,
    successBarLabel: 'सत्यापन सफल!',
    honeypotWarning: 'स्वचालित इनपुट रोकल गेल। कृपया मैन्युअल रूप सँ सत्यापित करू।',
    enterLocked: 'सुरक्षा जांच सक्रिय',
    enterReady: 'JIGSY INDIA में प्रवेश करू (तैयार)',
    enteringNow: 'पोर्टल खुलि रहल अछि...',
    step0Lbl: '1. हैंडशेक',
    step2Lbl: '2. मानव स्कैन',
    step3Lbl: '3. प्रवेश',
    supportPrompt: 'तत्काल सहायता लेल हमर आधिकारिक डेस्क पर संपर्क करू:',
  },
};

export const SecurityGate: React.FC<SecurityGateProps> = ({
  language,
  onLanguageChange,
  isDark,
  onToggleTheme,
  onVerified,
}) => {
  const copy = GATE_COPY[language];
  const [stage, setStage] = useState<SecurityGateStage>(0);
  const [humanVerified, setHumanVerified] = useState(false);
  const [stage2Percent, setStage2Percent] = useState(0);
  const [stage2Remaining, setStage2Remaining] = useState(
    Math.ceil(SECURITY_GATE_CONFIG.stage2MaxDurationMs / 1000)
  );
  const [stage3Remaining, setStage3Remaining] = useState(
    Math.ceil(SECURITY_GATE_CONFIG.stage3DurationMs / 1000)
  );
  const [honeypot, setHoneypot] = useState('');
  const [botBlockedMsg, setBotBlockedMsg] = useState<string | null>(null);
  const [taglineIdx, setTaglineIdx] = useState(0);

  const stage2VerifiedRef = useRef(false);
  const completedRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const intervalsRef = useRef<number[]>([]);

  const taglines = [COMPANY_DETAILS.taglineSanskrit, COMPANY_DETAILS.mottoEnglish];

  const clearScheduled = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    intervalsRef.current.forEach((id) => window.clearInterval(id));
    timersRef.current = [];
    intervalsRef.current = [];
  };

  const finishVerification = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    clearScheduled();
    setStage(4);
    try {
      sessionStorage.setItem(SECURITY_GATE_CONFIG.sessionStorageKey, String(Date.now()));
      localStorage.setItem('jigsy_visited', 'true');
    } catch {
      // Ignore storage quota errors in restricted sandboxes
    }
    const doneId = window.setTimeout(() => {
      onVerified();
    }, 350);
    timersRef.current.push(doneId);
  };

  const enterStage3 = () => {
    clearScheduled();
    setStage(3);
    const stage3Start = Date.now();
    const initialSec = Math.ceil(SECURITY_GATE_CONFIG.stage3DurationMs / 1000);
    setStage3Remaining(initialSec);

    const tickId = window.setInterval(() => {
      const elapsed = Date.now() - stage3Start;
      const rem = computeStage3Remaining(elapsed, SECURITY_GATE_CONFIG.stage3DurationMs);
      setStage3Remaining(rem);
      if (elapsed >= SECURITY_GATE_CONFIG.stage3DurationMs) {
        finishVerification();
      }
    }, 200);
    intervalsRef.current.push(tickId);
  };

  useEffect(() => {
    const mottoInterval = window.setInterval(() => {
      setTaglineIdx((prev) => (prev + 1) % 2);
    }, 3500);

    // Stage 0 -> Stage 2 after 2.5s
    const s0Timer = window.setTimeout(() => {
      setStage(2);
      const stage2Start = Date.now();

      const progressTick = window.setInterval(() => {
        if (stage2VerifiedRef.current) {
          window.clearInterval(progressTick);
          return;
        }
        const { percentage, remainingSec } = computeStage2Progress(
          Date.now() - stage2Start,
          SECURITY_GATE_CONFIG.stage2MaxDurationMs
        );
        setStage2Percent(percentage);
        setStage2Remaining(remainingSec);
      }, 100);
      intervalsRef.current.push(progressTick);

      // Auto-advance from Stage 2 to Stage 3 at 7.5s if user hasn't clicked
      const autoStage3Timer = window.setTimeout(() => {
        if (!stage2VerifiedRef.current) {
          enterStage3();
        }
      }, SECURITY_GATE_CONFIG.stage2MaxDurationMs);
      timersRef.current.push(autoStage3Timer);
    }, SECURITY_GATE_CONFIG.stage0DurationMs);
    timersRef.current.push(s0Timer);

    return () => {
      window.clearInterval(mottoInterval);
      clearScheduled();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCompleteVerificationClick = () => {
    if (stage2VerifiedRef.current || stage !== 2) return;
    if (isHoneypotTriggered(honeypot)) {
      setBotBlockedMsg(copy.honeypotWarning);
      return;
    }

    setBotBlockedMsg(null);
    stage2VerifiedRef.current = true;
    setHumanVerified(true);
    setStage2Percent(100);
    setStage2Remaining(0);

    // Clear auto-advance timer from Stage 2
    clearScheduled();

    // Scroll smoothly to top after 1.0s (reduced from 5s)
    const scrollId = window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, SECURITY_GATE_CONFIG.humanClickScrollDelayMs);
    timersRef.current.push(scrollId);

    // Advance cleanly to Stage 3 after 1.5s so user sees the green "Human Verified!" confirmation
    const advanceId = window.setTimeout(() => {
      enterStage3();
    }, SECURITY_GATE_CONFIG.humanClickAdvanceDelayMs);
    timersRef.current.push(advanceId);
  };

  const manualReady = isManualBypassReady(stage, stage3Remaining);
  const isServicesActive = stage >= 2;
  const isScannerActive = stage === 2 && !humanVerified;
  const isServicesVerified = humanVerified || stage >= 3;

  return (
    <div
      data-testid="security-gate"
      data-stage={stage}
      className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200 jigsy-ambient-bg"
    >
      {/* Top Security Marquee Strip */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs py-1.5 px-4 overflow-hidden border-b border-blue-800/40">
        <div className="flex items-center">
          <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase px-2 py-0.5 rounded mr-3 shrink-0 tracking-wider">
            {COMPANY_DETAILS.shortName}
          </span>
          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="animate-marquee inline-block font-medium text-slate-100">
              {copy.marquee} &nbsp; • &nbsp; CIN: {COMPANY_DETAILS.cin} &nbsp; • &nbsp; DPIIT:{' '}
              {COMPANY_DETAILS.dpiit}
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Header Banner with Language & Theme Controls */}
      <header className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-amber-400 p-0.5 bg-white shadow-md shrink-0">
            <CrispImage
              src={COMPANY_DETAILS.logoUrl}
              sizes="56px"
              targetWidth={144}
              loading="eager"
              alt="JIGSY Official Seal"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="text-center flex-1 min-w-0 px-1">
            <div className="text-xs sm:text-sm md:text-base font-extrabold text-red-700 dark:text-amber-400 tracking-wide uppercase leading-snug brand-font truncate sm:whitespace-normal">
              {COMPANY_DETAILS.name}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 italic font-serif mt-0.5">
              {taglines[taglineIdx]}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden md:flex items-center">
              <CrispImage
                src={COMPANY_DETAILS.makeInIndiaUrl}
                sizes="44px"
                targetWidth={96}
                loading="eager"
                alt="Make in India"
                className="h-10 w-auto object-contain mr-2"
              />
            </div>

            {/* Compact Language Switcher */}
            <div className="flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-0.5">
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mx-1.5 hidden sm:block" />
              {(['en', 'hi', 'mai'] as Language[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => onLanguageChange(code)}
                  className={`px-2 py-1 rounded text-[11px] font-bold uppercase transition-colors cursor-pointer ${
                    language === code
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Staged Anti-DoS / Anti-Bot Verification Workspace */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-7 sm:py-10 space-y-7 text-center">
        {/* Stepper Indicator */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm text-[11px] font-bold">
          <span
            className={`px-2 py-0.5 rounded-full ${
              stage === 0
                ? 'bg-blue-600 text-white'
                : 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300'
            }`}
          >
            {copy.step0Lbl}
          </span>
          <span className="text-slate-300 dark:text-slate-600">→</span>
          <span
            className={`px-2 py-0.5 rounded-full ${
              stage === 2
                ? humanVerified
                  ? 'bg-emerald-600 text-white'
                  : 'bg-cyan-600 text-white'
                : stage >= 3
                  ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300'
                  : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            {copy.step2Lbl}
          </span>
          <span className="text-slate-300 dark:text-slate-600">→</span>
          <span
            className={`px-2 py-0.5 rounded-full ${
              stage === 3
                ? 'bg-amber-500 text-slate-950'
                : stage === 4
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            {copy.step3Lbl}
          </span>
        </div>

        {/* Stage Heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800/70">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{copy.shieldBadge}</span>
          </div>

          <h1
            data-testid="security-gate-heading"
            className={`text-2xl sm:text-3xl md:text-4xl font-black brand-font transition-opacity duration-500 ${
              stage === 0
                ? 'text-blue-700 dark:text-blue-400'
                : stage === 2
                  ? 'text-cyan-700 dark:text-cyan-400'
                  : stage === 3
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-emerald-600 dark:text-emerald-400'
            }`}
          >
            {stage === 0
              ? copy.stage0Heading
              : stage === 2
                ? copy.stage2Heading
                : stage === 3
                  ? copy.stage3Heading
                  : copy.stage4Heading}
          </h1>
        </div>

        {/* Central Animated Ring / Shield Indicator (Preserves Stage 0, Stage 2, Stage 3, Stage 4 Visuals) */}
        <div className="relative flex flex-col items-center justify-center py-2">
          {(stage === 0 || stage === 3) && (
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-6 rounded-full jigsy-futuristic-pulse pointer-events-none" />
              <div
                data-testid="security-gate-spinner"
                className={`jigsy-countdown-circle relative z-10 ${
                  stage === 0
                    ? 'text-blue-600 dark:text-cyan-400'
                    : 'text-amber-500 dark:text-amber-400'
                }`}
              >
                <div className="jigsy-countdown-upright flex items-center justify-center">
                  {stage === 0 ? (
                    <Zap className="w-11 h-11" />
                  ) : (
                    <span
                      data-testid="security-gate-countdown"
                      className="text-4xl font-black font-mono text-slate-900 dark:text-white"
                    >
                      {stage3Remaining}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {stage === 2 && (
            <div className="w-16 h-16 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 border-2 border-cyan-400/80 flex items-center justify-center shadow-lg">
              {humanVerified ? (
                <CheckCircle2 className="w-9 h-9 text-emerald-500" />
              ) : (
                <ShieldAlert className="w-9 h-9 text-cyan-600 dark:text-cyan-400" />
              )}
            </div>
          )}

          {stage === 4 && (
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-9 h-9 text-emerald-600 dark:text-emerald-400" />
            </div>
          )}

          {/* Timer Note (Visible in Stage 3 & Stage 4, matching original flow) */}
          <p
            className={`mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 transition-opacity duration-500 ${
              stage >= 3 ? 'opacity-100' : 'opacity-60'
            }`}
          >
            {copy.timerPrefix}{' '}
            <span
              data-testid="security-gate-time-left"
              className={`font-extrabold ${
                stage === 3
                  ? 'text-red-600 dark:text-amber-400'
                  : stage === 4
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-blue-700 dark:text-cyan-400'
              }`}
            >
              {stage === 3 ? copy.inSeconds(stage3Remaining) : copy.shortly}
            </span>
            .
          </p>
        </div>

        {/* Stage 2 Top Prompt Card (Above Services Preview — Exact Stage 2 Layout) */}
        {stage === 2 && (
          <div className="max-w-xl mx-auto animate-fadeIn">
            <div
              data-testid="security-gate-top-card"
              className={`rounded-2xl p-4 sm:p-5 border shadow-md transition-all ${
                humanVerified
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700'
                  : 'bg-white/95 dark:bg-slate-900/95 border-cyan-400/70 dark:border-cyan-700/80'
              }`}
            >
              <div
                className={`text-base sm:text-lg font-extrabold brand-font flex items-center justify-center gap-2 ${
                  humanVerified
                    ? 'text-emerald-700 dark:text-emerald-300'
                    : 'text-cyan-700 dark:text-cyan-300'
                }`}
              >
                {humanVerified ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Bot className="w-5 h-5" />
                )}
                <span>{humanVerified ? copy.verifiedTitle : copy.antiBotTitle}</span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {humanVerified ? copy.verifiedDesc : copy.antiBotDesc}
              </p>
            </div>
          </div>
        )}

        {/* Services Preview Section with Active Laser Scanner Overlay */}
        <section
          data-testid="security-gate-services-panel"
          className={`rounded-2xl p-5 sm:p-6 bg-white/90 dark:bg-slate-900/90 shadow-md jigsy-scanning-container ${
            isServicesVerified ? 'verified' : ''
          } ${isServicesActive ? 'opacity-100' : 'opacity-20 pointer-events-none select-none'}`}
        >
          {/* Active Cyan/Emerald Laser Scan Line during Stage 2 */}
          <div
            data-testid="security-gate-laser"
            className={`jigsy-scanner-line ${isScannerActive ? 'active-scan' : ''}`}
          />

          <div className="flex items-center justify-between gap-2 mb-4">
            <h2 className="text-left text-base sm:text-lg font-black brand-font text-slate-900 dark:text-white">
              {copy.servicesHeading}
            </h2>
            <span
              className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                isServicesVerified
                  ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300'
                  : isScannerActive
                    ? 'bg-cyan-100 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              {isServicesVerified ? 'VERIFIED' : isScannerActive ? 'SCANNING...' : 'STANDBY'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="text-sm font-extrabold brand-font text-slate-900 dark:text-white">
                  {COMPANY_DETAILS.shortName}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  {copy.card1Desc}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600 dark:text-cyan-400 shrink-0" />
                <span>{copy.card1Footer}</span>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="text-sm font-extrabold brand-font text-slate-900 dark:text-white">
                  {copy.card2Title}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  {copy.card2Desc}
                </p>
              </div>
              <a
                href={COMPANY_DETAILS.founderPortfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px] font-bold text-blue-700 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>jigyasu.jigsy.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="text-sm font-extrabold brand-font text-slate-900 dark:text-white">
                  {copy.card3Title}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  {copy.card3Desc}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                {copy.card3Footer}
              </div>
            </div>
          </div>

          {/* Stage 2 Bottom Verification Panel (Inside/Below Services — Exact Stage 2 Layout) */}
          {stage === 2 && (
            <div className="mt-6 max-w-xl mx-auto animate-fadeIn">
              <div
                data-testid="security-gate-verification-panel"
                className={`rounded-2xl p-5 border shadow-lg transition-all ${
                  humanVerified
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700'
                    : 'bg-white dark:bg-slate-900 border-cyan-400/80 dark:border-cyan-700'
                }`}
              >
                <div className="text-base font-extrabold brand-font text-cyan-700 dark:text-cyan-300 flex items-center justify-center gap-2">
                  <MousePointerClick className="w-5 h-5" />
                  <span>{copy.panelTitle}</span>
                </div>

                {/* Invisible Anti-Bot Honeypot Input */}
                <input
                  type="text"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  aria-hidden="true"
                  className="sr-only"
                />

                <div className="mt-4">
                  <button
                    type="button"
                    data-testid="security-gate-verify-btn"
                    disabled={humanVerified}
                    onClick={handleCompleteVerificationClick}
                    className={`px-6 py-3 rounded-xl font-extrabold text-sm shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer ${
                      humanVerified
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white hover:shadow-lg'
                    }`}
                  >
                    {humanVerified ? (
                      <>
                        <ArrowRightCircle className="w-4 h-4" />
                        <span>{copy.proceedingBtn}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>{copy.completeBtn}</span>
                      </>
                    )}
                  </button>
                </div>

                {botBlockedMsg && (
                  <p className="mt-2 text-xs font-semibold text-red-600 dark:text-red-400">
                    {botBlockedMsg}
                  </p>
                )}

                {/* Animated Progress Bar */}
                <div className="mt-4 text-left space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <span>{copy.statusLabel}</span>
                    <span className="font-mono">
                      {humanVerified
                        ? '100%'
                        : stage2Remaining > 0
                          ? copy.remainingLabel(stage2Remaining)
                          : copy.awaitingLabel}
                    </span>
                  </div>
                  <div className="relative w-full h-7 rounded-lg bg-slate-200 dark:bg-slate-800 overflow-hidden border border-slate-300 dark:border-slate-700">
                    <div
                      data-testid="security-gate-progress"
                      role="progressbar"
                      aria-valuenow={Math.round(stage2Percent)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ width: `${Math.max(4, stage2Percent)}%` }}
                      className={`h-full transition-all duration-150 ${
                        humanVerified
                          ? 'bg-emerald-600'
                          : 'bg-gradient-to-r from-cyan-600 to-blue-600'
                      }`}
                    />
                    <div
                      className={`absolute inset-0 flex items-center justify-center text-[11px] font-extrabold tracking-wide pointer-events-none select-none ${
                        humanVerified || stage2Percent >= 52
                          ? 'text-white drop-shadow-sm'
                          : 'text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      {humanVerified
                        ? copy.successBarLabel
                        : copy.remainingLabel(stage2Remaining)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Stage Explanation Copy */}
        <div className="max-w-2xl mx-auto space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            {stage === 0
              ? copy.stage0Body
              : stage === 2
                ? copy.stage2Body
                : copy.stage3Body}
          </p>
          <p className="font-bold text-slate-700 dark:text-slate-200">
            ~ {stage === 0 ? copy.stage0Note : stage === 2 ? copy.stage2Note : copy.stage3Note}
          </p>
        </div>

        {/* Manual Enter CTA (Disabled until Stage 3 reaches <= 2s remaining, then unlocks cleanly) */}
        <div>
          <button
            type="button"
            data-testid="security-gate-enter-btn"
            disabled={!manualReady}
            onClick={finishVerification}
            className={`px-6 py-3 rounded-xl font-extrabold text-sm inline-flex items-center gap-2 border transition-all ${
              stage === 4
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg cursor-pointer'
                : manualReady
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-500 shadow-lg cursor-pointer'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-300 dark:border-slate-700 cursor-not-allowed'
            }`}
          >
            <ArrowRightCircle className="w-4 h-4" />
            <span>
              {stage === 4
                ? copy.enteringNow
                : manualReady
                  ? copy.enterReady
                  : copy.enterLocked}
            </span>
          </button>
        </div>

        {/* Direct Support Contact Strip */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-center gap-2">
          <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>{copy.supportPrompt}</span>
          <a
            href={`mailto:${COMPANY_DETAILS.officialEmail}`}
            className="font-mono font-bold text-blue-700 dark:text-amber-400 hover:underline"
          >
            {COMPANY_DETAILS.officialEmail}
          </a>
        </div>
      </main>
    </div>
  );
};

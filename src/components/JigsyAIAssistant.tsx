import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Mic,
  MicOff,
  Send,
  X,
  Volume2,
  VolumeX,
  Trash2,
  Sparkles,
  Square,
  ExternalLink,
  ArrowRight,
  SlidersHorizontal,
  AudioWaveform,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';
import {
  generateJigsyAssistantReply,
  AssistantAction,
  AssistantContext,
  sanitizeForSpeech,
} from '../utils/jigsyAssistantEngine';
import { CrispImage } from './CrispImage';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  intentLabel?: string;
  actions?: AssistantAction[];
  timestamp: string;
}

type VoicePersona = 'soft' | 'corporate' | 'crisp';

interface JigsyAIAssistantProps {
  onNavigate: (view: string, sectorSlug?: string) => void;
  onPrefillContact: (sectorSlug?: string, serviceName?: string, engagementType?: string) => void;
}

const STORAGE_KEY = 'jigsy_corporate_ai_messages_v3';

const QUICK_PROMPTS = [
  'Show all 6 sectors & services',
  'Tell me about Founder Jigyasu Vatsa',
  'Meet both Directors',
  'Draft an Institutional MoU proposal',
  'Where is JIGSY Youth internship portal?',
  'Show Careers & Talent Pool',
];

const INITIAL_WELCOME: ChatMessage = {
  id: 'welcome-jigsy-v2',
  sender: 'bot',
  intentLabel: 'JIGSY AI Ready',
  text: 'Namaste! I am JIGSY — JIGSY INDIA’s interactive Voice & Chat Assistant. Speak or type to explore our 6 corporate sectors, open the Founder or Directors pages, check Careers status, or open a pre-filled Service Request / MoU form right here.',
  actions: [
    { type: 'navigate', label: 'All 6 Corporate Sectors', view: 'sectors' },
    { type: 'prefill_contact', label: 'Submit Proposal / MoU', engagementType: 'Project Proposal & Development' },
    { type: 'navigate', label: 'Founder: Jigyasu Vatsa', view: 'about-founder' },
    { type: 'external_link', label: 'JIGSY Youth (youth.jigsy.in)', url: COMPANY_DETAILS.youthPortalUrl },
  ],
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export const JigsyAIAssistant: React.FC<JigsyAIAssistantProps> = ({
  onNavigate,
  onPrefillContact,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAttentionBanner, setShowAttentionBanner] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return [INITIAL_WELCOME];
  });
  const [assistantContext, setAssistantContext] = useState<AssistantContext>({});
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voicePersona, setVoicePersona] = useState<VoicePersona>('soft');
  const [showVoiceControls, setShowVoiceControls] = useState(false);
  const [micError, setMicError] = useState('');
  const [eqLevels, setEqLevels] = useState<number[]>([22, 34, 48, 60, 44, 30, 24]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transcriptRef = useRef<string>('');
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const isMutedRef = useRef<boolean>(isMuted);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const timer = setTimeout(() => setShowAttentionBanner(false), 6500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-24)));
    } catch {
      // Ignore storage quota issues
    }
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Preload voices cleanly
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      stopAudioVisualizer();
    };
  }, []);

  const stopAudioVisualizer = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    analyserRef.current = null;
  };

  const startAudioVisualizer = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) return;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx: AudioContext = new AudioCtx();
      audioContextRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 32;
      source.connect(analyser);
      analyserRef.current = analyser;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const tick = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        const bars = Array.from({ length: 7 }, (_, i) => {
          const val = dataArray[i] || 0;
          return Math.max(18, Math.min(100, Math.round((val / 255) * 100) + 18));
        });
        setEqLevels(bars);
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      // Fallback animated heights if mic analyser unavailable
    }
  };

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const speakText = useCallback(
    (rawText: string) => {
      if (isMutedRef.current || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();

      const cleaned = sanitizeForSpeech(rawText);
      if (!cleaned) return;

      const utterance = new SpeechSynthesisUtterance(cleaned);
      const voices = window.speechSynthesis.getVoices();

      const preferredFemale = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('en') &&
          /heera|neerja|priya|samantha|zira|google uk english female|aria|jenny|female/i.test(v.name)
      );
      const indianEnglish = voices.find((v) => v.lang === 'en-IN');
      const fallbackEnglish = voices.find((v) => v.lang.toLowerCase().startsWith('en'));

      if (voicePersona === 'soft') {
        utterance.voice = preferredFemale || indianEnglish || fallbackEnglish || null;
        utterance.pitch = 1.08;
        utterance.rate = 0.96;
      } else if (voicePersona === 'corporate') {
        utterance.voice = indianEnglish || preferredFemale || fallbackEnglish || null;
        utterance.pitch = 1.0;
        utterance.rate = 1.02;
      } else {
        utterance.voice = preferredFemale || fallbackEnglish || null;
        utterance.pitch = 1.02;
        utterance.rate = 1.12;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    },
    [voicePersona]
  );

  const executeAction = useCallback(
    (action: AssistantAction) => {
      if (action.type === 'navigate') {
        onNavigate(action.view, action.sectorSlug);
        return;
      }
      if (action.type === 'prefill_contact') {
        onPrefillContact(action.sectorSlug, action.serviceName, action.engagementType);
      }
    },
    [onNavigate, onPrefillContact]
  );

  const handleSendMessage = useCallback(
    (overrideText?: string) => {
      const text = (overrideText !== undefined ? overrideText : inputText).trim();
      if (!text) return;

      stopSpeaking();
      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const userMsg: ChatMessage = {
        id: `usr-${Date.now()}`,
        sender: 'user',
        text,
        timestamp: timeNow,
      };

      const reply = generateJigsyAssistantReply(text, assistantContext);
      setAssistantContext(reply.nextContext);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now() + 1}`,
        sender: 'bot',
        text: reply.text,
        intentLabel: reply.intentLabel,
        actions: reply.actions,
        timestamp: timeNow,
      };

      setMessages((prev) => [...prev, userMsg, botMsg]);
      setInputText('');
      speakText(reply.speechText);

      if (reply.autoExecuteAction) {
        setTimeout(() => executeAction(reply.autoExecuteAction!), 450);
      }
    },
    [inputText, assistantContext, speakText, stopSpeaking, executeAction]
  );

  const stopListening = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop errors
      }
    }
    stopAudioVisualizer();
    setIsListening(false);
  }, []);

  const toggleListening = () => {
    setMicError('');
    if (isListening) {
      const captured = transcriptRef.current.trim();
      stopListening();
      if (captured) {
        handleSendMessage(captured);
        transcriptRef.current = '';
      }
      return;
    }

    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setMicError('Voice input requires Chrome, Edge, or Safari. You can type your request below.');
      return;
    }

    stopSpeaking();
    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'en-IN';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognitionRef.current = recognition;
    transcriptRef.current = '';

    recognition.onstart = () => {
      setIsListening(true);
      startAudioVisualizer();
    };

    recognition.onresult = (event: any) => {
      let combined = '';
      for (let i = 0; i < event.results.length; i++) {
        combined += event.results[i][0].transcript;
      }
      const clean = combined.trim();
      transcriptRef.current = clean;
      setInputText(clean);

      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (clean) {
        silenceTimerRef.current = setTimeout(() => {
          stopListening();
          handleSendMessage(clean);
          transcriptRef.current = '';
        }, 1800);
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'not-allowed') {
        setMicError('Microphone permission denied. Please allow mic access or type below.');
      } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
        setMicError(`Voice capture paused (${event.error}). Try again or type below.`);
      }
      stopListening();
    };

    recognition.onend = () => {
      setIsListening(false);
      stopAudioVisualizer();
    };

    try {
      recognition.start();
    } catch {
      setMicError('Could not start voice listener. Please type below.');
      setIsListening(false);
    }
  };

  const handleClearChat = () => {
    stopSpeaking();
    setMessages([INITIAL_WELCOME]);
    setAssistantContext({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-50 no-print">
      {/* Attention Callout Bubble on Initial Load */}
      {!isOpen && showAttentionBanner && (
        <div className="mb-3 max-w-[260px] p-3 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 shadow-xl text-xs animate-pop-larger relative">
          <button
            type="button"
            onClick={() => setShowAttentionBanner(false)}
            aria-label="Dismiss JIGSY assistant hint"
            className="absolute top-1.5 right-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="font-extrabold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Meet JIGSY AI Voice Assistant</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug">
            Ask by voice or text to explore sectors, navigate pages, or draft a proposal!
          </p>
        </div>
      )}

      {/* Floating Launcher Button (Bottom-Left — Zero Collision with Bottom-Right ScrollToTop) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setShowAttentionBanner(false);
          }}
          aria-label="Open JIGSY Voice Assistant & Chatbot"
          className="group relative flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-2xl border border-blue-500/40 hover:border-amber-400 transition-all hover:scale-105 cursor-pointer animate-attract-3x"
        >
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-sky-50 to-teal-50 p-0.5 shadow-inner shrink-0 overflow-hidden">
            <span className="absolute inset-0 rounded-full border-2 border-amber-400/80 animate-voice-ring pointer-events-none" />
            <CrispImage
              src={COMPANY_DETAILS.assistantIconUrl}
              sizes="44px"
              targetWidth={96}
              loading="eager"
              alt="Jigs Voice Assistant"
              className="w-full h-full object-contain"
            />
          </span>
          <div className="text-left leading-tight">
            <div className="text-xs font-extrabold tracking-wide flex items-center gap-1">
              <span>JIGSY AI</span>
              <AudioWaveform className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-[10px] text-blue-200 font-medium">Voice &amp; Chat Desk</div>
          </div>
        </button>
      )}

      {/* Main Interactive Voice & Chat Assistant Cockpit */}
      {isOpen && (
        <section
          aria-label="JIGSY AI Voice Assistant and Chatbot"
          className="w-[calc(100vw-2rem)] sm:w-[410px] max-h-[82vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden animate-pop-larger"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white px-4 py-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-b from-sky-50 to-teal-50 p-0.5 border border-amber-400 shrink-0 overflow-hidden">
                <CrispImage
                  src={COMPANY_DETAILS.assistantIconUrl}
                  sizes="40px"
                  targetWidth={96}
                  loading="eager"
                  alt="Jigs Voice Assistant"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-black tracking-wide brand-font flex items-center gap-1.5">
                  <span>JIGSY AI Assistant</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-extrabold uppercase">
                    Voice+Chat
                  </span>
                </div>
                <div className="text-[10px] text-blue-200 truncate">
                  {isListening
                    ? 'Listening live… speak your command'
                    : isSpeaking
                      ? 'Speaking response…'
                      : 'Navigate · Draft MoU · Ask Anything'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setShowVoiceControls((v) => !v)}
                title="Voice Persona Settings"
                aria-label="Voice Persona Settings"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  showVoiceControls ? 'bg-amber-400 text-slate-950' : 'hover:bg-white/10 text-blue-100'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!isMuted) stopSpeaking();
                  setIsMuted((m) => !m);
                }}
                title={isMuted ? 'Unmute Voice' : 'Mute Voice'}
                aria-label={isMuted ? 'Unmute Voice' : 'Mute Voice'}
                className="p-1.5 rounded-lg hover:bg-white/10 text-blue-100 transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={handleClearChat}
                title="Clear Conversation"
                aria-label="Clear Conversation"
                className="p-1.5 rounded-lg hover:bg-white/10 text-blue-100 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  stopListening();
                  stopSpeaking();
                  setIsOpen(false);
                }}
                title="Close Assistant"
                aria-label="Close Assistant"
                className="p-1.5 rounded-lg hover:bg-white/10 text-blue-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expandable Voice Persona & Controls Bar */}
          {showVoiceControls && (
            <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-600 dark:text-slate-300">Voice:</span>
                {(['soft', 'corporate', 'crisp'] as VoicePersona[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setVoicePersona(mode)}
                    className={`px-2 py-0.5 rounded-md font-bold capitalize cursor-pointer ${
                      voicePersona === mode
                        ? 'bg-blue-700 text-white'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  speakText(
                    'Namaste! I am JIGSY, the interactive Voice Assistant for JIGSY INDIA. How may I guide you today?'
                  )
                }
                className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-bold cursor-pointer hover:bg-amber-300"
              >
                Test Voice
              </button>
            </div>
          )}

          {/* Live Voice Equalizer Strip */}
          {(isListening || isSpeaking) && (
            <div className="px-4 py-2 bg-blue-50 dark:bg-blue-950/60 border-b border-blue-200 dark:border-blue-900 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-end gap-1 h-5">
                  {eqLevels.map((lvl, idx) => (
                    <span
                      key={idx}
                      style={{ height: `${isListening ? lvl : 35 + ((idx * 17) % 55)}%` }}
                      className={`w-1 rounded-full transition-all duration-150 ${
                        isListening ? 'bg-rose-500' : 'bg-blue-600 dark:bg-blue-400'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-blue-900 dark:text-blue-200">
                  {isListening ? 'Voice Capture Active (auto-sends on pause)' : 'JIGSY Speaking…'}
                </span>
              </div>
              {isSpeaking && (
                <button
                  type="button"
                  onClick={stopSpeaking}
                  className="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Square className="w-2.5 h-2.5 fill-current" /> Stop
                </button>
              )}
            </div>
          )}

          {/* Message Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/70 dark:bg-slate-950/70 min-h-[260px] max-h-[46vh]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-700 text-white rounded-br-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-bl-sm'
                  }`}
                >
                  {msg.sender === 'bot' && msg.intentLabel && (
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-amber-400 mb-1">
                      {msg.intentLabel}
                    </div>
                  )}
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Actionable Command Chips */}
                  {msg.sender === 'bot' && msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {msg.actions.map((act, idx) =>
                        act.type === 'external_link' ? (
                          <a
                            key={idx}
                            href={act.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200"
                          >
                            <span>{act.label}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => executeAction(act)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                              act.type === 'prefill_contact'
                                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 hover:bg-amber-200'
                                : 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 hover:bg-blue-200'
                            }`}
                          >
                            <span>{act.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-3 py-2 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-1.5 overflow-x-auto">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-300 text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Error Notice if Mic Unavailable */}
          {micError && (
            <div className="px-3 py-1.5 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 text-[11px] border-t border-amber-200 dark:border-amber-900">
              {micError}
            </div>
          )}

          {/* Input & Voice Controls */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleListening}
              aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
              title={isListening ? 'Stop & Send Voice' : 'Speak to JIGSY AI'}
              className={`p-2.5 rounded-xl transition-all shrink-0 cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white shadow-lg ring-4 ring-rose-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about sectors, Founder, MoU, careers..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <button
              type="submit"
              aria-label="Send message to JIGSY AI"
              className="p-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white shadow transition-colors shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

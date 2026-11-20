export interface SecurityGateConfig {
  /** Total automatic verification duration in seconds (reduced from 30–45s to 15s) */
  totalDurationSec: number;
  /** Stage 0: Initial security handshake & request screening duration (ms) */
  stage0DurationMs: number;
  /** Stage 2: Max duration of interactive human verification & laser scan before auto-advance (ms) */
  stage2MaxDurationMs: number;
  /** Stage 3: Final request forwarding countdown duration (ms) */
  stage3DurationMs: number;
  /** Delay after human clicks "Complete Verification" before smooth scrolling to top (ms, reduced from 5000ms) */
  humanClickScrollDelayMs: number;
  /** Minimum delay after human verification click before advancing into Stage 3 (ms) */
  humanClickAdvanceDelayMs: number;
  /** Remaining seconds in Stage 3 when manual "Enter Portal (Ready)" button unlocks */
  manualUnlockRemainingSec: number;
  /** Session storage key & TTL so visitors are not re-challenged during normal browsing */
  sessionStorageKey: string;
  sessionTtlMs: number;
}

/**
 * 15-Second Anti-DoS / Anti-Bot Verification Timing Profile
 * Preserves all 4 stages from JIGSY's original security gate while scaling wait durations
 * down from 30–45s to a crisp 15s total (2.5s Stage 0 + 7.5s Stage 2 + 5.0s Stage 3 = 15.0s).
 */
export const SECURITY_GATE_CONFIG: SecurityGateConfig = {
  totalDurationSec: 15,
  stage0DurationMs: 2500,
  stage2MaxDurationMs: 7500,
  stage3DurationMs: 5000,
  humanClickScrollDelayMs: 1000,
  humanClickAdvanceDelayMs: 1500,
  manualUnlockRemainingSec: 2,
  sessionStorageKey: 'jigsy_dos_verified_v1',
  sessionTtlMs: 30 * 60 * 1000,
};

export type SecurityGateStage = 0 | 2 | 3 | 4;

/**
 * Verified major search engine & social preview crawler signatures.
 * Allowing legitimate indexing bots past the 15s Anti-DoS gate guarantees
 * Google, Bing, Yahoo, DuckDuckGo, Safari/Applebot, Yandex, Baidu, and social
 * link previews index 100% of the live JIGSY INDIA corporate content immediately.
 */
const VERIFIED_SEARCH_CRAWLER_PATTERN =
  /googlebot|google-inspectiontool|adsbot-google|mediapartners-google|bingbot|bingpreview|msnbot|slurp|duckduckbot|baiduspider|yandex(bot|images|mobilebot)?|applebot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|slackbot|petalbot|qwantify|seznambot|yeti|sogou|exabot/i;

export function isSearchEngineCrawler(userAgent: string = ''): boolean {
  return VERIFIED_SEARCH_CRAWLER_PATTERN.test(userAgent || '');
}

/**
 * Determines whether the pre-load Anti-DoS / Anti-Bot Security Gate should display.
 * - `?security_gate=1` always forces the gate open (useful for inspection & verification).
 * - `?autostart=1` bypasses the gate for quick direct preview/automated links.
 * - Verified search engine & social crawlers bypass immediately for full SEO indexing.
 * - Otherwise, displays once per 30-minute session until verified.
 */
export function shouldShowSecurityGate(
  search: string = '',
  sessionVerifiedAtRaw: string | null = null,
  nowMs: number = Date.now(),
  config: SecurityGateConfig = SECURITY_GATE_CONFIG,
  userAgent?: string
): boolean {
  const params = new URLSearchParams(search || '');
  if (params.get('security_gate') === '1') {
    return true;
  }
  if (params.get('autostart') === '1') {
    return false;
  }
  const effectiveUa =
    userAgent !== undefined
      ? userAgent
      : typeof navigator !== 'undefined'
        ? navigator.userAgent || ''
        : '';
  if (isSearchEngineCrawler(effectiveUa)) {
    return false;
  }
  if (sessionVerifiedAtRaw) {
    const parsed = Number(sessionVerifiedAtRaw);
    if (Number.isFinite(parsed) && parsed > 0 && nowMs - parsed < config.sessionTtlMs) {
      return false;
    }
  }
  return true;
}

/**
 * Computes Stage 2 progress bar percentage (0..100) and integer remaining seconds.
 */
export function computeStage2Progress(
  elapsedInStage2Ms: number,
  maxMs: number = SECURITY_GATE_CONFIG.stage2MaxDurationMs
): { percentage: number; remainingSec: number } {
  const safeMax = Math.max(1000, maxMs);
  const clampedElapsed = Math.max(0, Math.min(safeMax, elapsedInStage2Ms));
  const percentage = Math.min(100, (clampedElapsed / safeMax) * 100);
  const remainingSec = Math.max(0, Math.ceil((safeMax - clampedElapsed) / 1000));
  return { percentage, remainingSec };
}

/**
 * Computes the Stage 3 remaining countdown seconds (e.g. 5..0) from elapsed ms inside Stage 3.
 */
export function computeStage3Remaining(
  elapsedInStage3Ms: number,
  stage3DurationMs: number = SECURITY_GATE_CONFIG.stage3DurationMs
): number {
  const remainingMs = Math.max(0, stage3DurationMs - Math.max(0, elapsedInStage3Ms));
  return Math.ceil(remainingMs / 1000);
}

/**
 * Determines whether the manual "Enter JIGSY INDIA (Ready)" button should be unlocked in Stage 3.
 */
export function isManualBypassReady(
  stage: SecurityGateStage,
  remainingSec: number,
  config: SecurityGateConfig = SECURITY_GATE_CONFIG
): boolean {
  if (stage === 4) return true;
  if (stage !== 3) return false;
  return remainingSec <= config.manualUnlockRemainingSec;
}

/**
 * Lightweight client-side anti-bot honeypot validator.
 * Returns true if the invisible trap field was filled by an automated script.
 */
export function isHoneypotTriggered(honeypotValue: string): boolean {
  return (honeypotValue || '').trim().length > 0;
}

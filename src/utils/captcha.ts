/**
 * Universal Client-Side CAPTCHA Engine for JIGSY INDIA
 * Prevents automated bot and dummy form submissions across all forms.
 */

export interface CaptchaChallenge {
  id: string;
  code: string;
  displayText: string;
}

const CHARACTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateCaptcha(): CaptchaChallenge {
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }
  return {
    id: 'cap_' + Math.random().toString(36).substring(2, 9),
    code: code,
    displayText: code.split('').join(' '),
  };
}

export function validateCaptcha(input: string, expected: string): boolean {
  if (!input || !expected) return false;
  return input.trim().toUpperCase() === expected.trim().toUpperCase();
}

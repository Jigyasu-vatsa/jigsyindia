import { COMPANY_DETAILS } from '../data/companyData';

export type JigsyFormTag =
  | 'JIGSY SERVICE REQUEST'
  | 'JIGSY TALENT POOL'
  | 'JIGSY USER FEEDBACK'
  | 'JIGSY YOUTH ENROLLMENT';

export interface FormSubmitOptions {
  tag: JigsyFormTag;
  subject: string;
  replyTo?: string;
  fields: Record<string, string | number | boolean | undefined>;
}

export interface FormSubmitPayload {
  _subject: string;
  _template: 'table';
  _captcha: 'false';
  _replyto?: string;
  Form_Tag: JigsyFormTag;
  Target_Company: string;
  Submitted_At: string;
  [key: string]: string | number | boolean | undefined;
}

export const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${COMPANY_DETAILS.officialEmail}`;

export function buildFormSubmitPayload(options: FormSubmitOptions): FormSubmitPayload {
  const cleanSubject = options.subject.trim() || options.tag;
  const payload: FormSubmitPayload = {
    _subject: `[${options.tag}] ${cleanSubject}`,
    _template: 'table',
    _captcha: 'false',
    Form_Tag: options.tag,
    Target_Company: COMPANY_DETAILS.name,
    ...options.fields,
    Submitted_At: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  if (options.replyTo && options.replyTo.trim()) {
    payload._replyto = options.replyTo.trim();
  }

  return payload;
}

export async function dispatchFormSubmit(
  options: FormSubmitOptions
): Promise<{ ok: boolean; endpoint: string; payload: FormSubmitPayload }> {
  const payload = buildFormSubmitPayload(options);
  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return { ok: response.ok, endpoint: FORMSUBMIT_ENDPOINT, payload };
  } catch {
    return { ok: false, endpoint: FORMSUBMIT_ENDPOINT, payload };
  }
}

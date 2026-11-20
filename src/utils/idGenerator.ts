/**
 * Sequential, collision-proof ID and Certificate generator for JIGSY INDIA.
 */

/**
 * Generates collision-proof sequential Application IDs:
 * Format: JIGSY-YOUTH-YYYYMMDD-HHMMSS-XXX (e.g. JIGSY-YOUTH-20261112-140532-842)
 */
export function generateApplicationId(date: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const rand = Math.floor(100 + Math.random() * 900); // 3-digit random suffix
  return `JIGSY-YOUTH-${year}${month}${day}-${hours}${minutes}${seconds}-${rand}`;
}

/**
 * Generates unique verifiable Certificate Number:
 * Format: JIGSY-CERT-YYYY-XXXX-INITIALS
 */
export function generateCertificateNumber(
  candidateName: string,
  appId: string,
  year: number = new Date().getFullYear()
): string {
  const safeInitials = candidateName
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 4) || 'INT';

  const parts = appId.split('-');
  const idSuffix = parts[parts.length - 1] || Math.floor(1000 + Math.random() * 9000).toString();
  return `JIGSY/CERT/${year}/YOUTH-${idSuffix}-${safeInitials}`;
}

/**
 * Builds the verification payload string for QR code generation
 */
export function buildCertificateQrPayload(data: {
  certNumber: string;
  candidateName: string;
  fatherName?: string;
  trackTitle: string;
  issueDate: string;
}): string {
  const fatherStr = data.fatherName ? ` | S/D of: ${data.fatherName}` : '';
  return `JIGSY INDIA VERIFIABLE CREDENTIAL | Cert No: ${data.certNumber} | Candidate: ${data.candidateName}${fatherStr} | Track: ${data.trackTitle} | Issue Date: ${data.issueDate} | Portal: https://jigsy.in`;
}

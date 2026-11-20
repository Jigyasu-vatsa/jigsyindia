import test from 'node:test';
import assert from 'node:assert/strict';
import { generateCaptcha, validateCaptcha } from './captcha';
import { COMPANY_DETAILS, DIRECTORS } from '../data/companyData';

test('generateCaptcha produces 5 alphanumeric characters', () => {
  const cap = generateCaptcha();
  assert.equal(cap.code.length, 5);
  assert.equal(typeof cap.displayText, 'string');
});

test('validateCaptcha performs case-insensitive verification', () => {
  assert.equal(validateCaptcha('AB34X', 'ab34x'), true);
  assert.equal(validateCaptcha('Ab34X ', 'AB34X'), true);
  assert.equal(validateCaptcha('WRONG', 'AB34X'), false);
  assert.equal(validateCaptcha('', 'AB34X'), false);
});

test('corporate statutory disclosures and executive board records are accurate', () => {
  assert.equal(COMPANY_DETAILS.cin, 'U62099BR2025PTC078592');
  assert.equal(COMPANY_DETAILS.dpiit, 'DIPP228528');
  assert.equal(COMPANY_DETAILS.gstin, '10AAHCJ0404B1ZN');
  assert.equal(COMPANY_DETAILS.msme, 'UDYAM-BR-34-0051280');
  assert.equal(COMPANY_DETAILS.youthPortalUrl, 'https://youth.jigsy.in');
  assert.equal(COMPANY_DETAILS.founderPortfolioUrl, 'https://jigyasu.jigsy.in');
  assert.equal(DIRECTORS.length, 2);
});

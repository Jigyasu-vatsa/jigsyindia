import test from 'node:test';
import assert from 'node:assert/strict';
import { generateCaptcha, validateCaptcha } from './captcha';
import { INTERNSHIP_TRACKS } from '../data/companyData';

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

test('internship tracks maintain 100% course fee waiver with nominal misc fee', () => {
  assert.equal(INTERNSHIP_TRACKS.length, 4);

  // Track 1: 30 Days (Fee: 0, Misc: 500, Slashed: 2999)
  const track1 = INTERNSHIP_TRACKS[0];
  assert.equal(track1.courseFee, 0);
  assert.equal(track1.miscFee, 500);
  assert.equal(track1.discountedPrice, 500);
  assert.equal(track1.originalPrice, 2999);

  // Track 2: Training (Fee: 0, Misc: 1000, Slashed: 4999)
  const track2 = INTERNSHIP_TRACKS[1];
  assert.equal(track2.courseFee, 0);
  assert.equal(track2.miscFee, 1000);
  assert.equal(track2.discountedPrice, 1000);

  // Track 3: Research Oriented (Fee: 0, Misc: 2000, Slashed: 7999)
  const track3 = INTERNSHIP_TRACKS[2];
  assert.equal(track3.courseFee, 0);
  assert.equal(track3.miscFee, 2000);
  assert.equal(track3.discountedPrice, 2000);

  // Track 4: Research Overview - R (Fee: 0, Misc: 250, Slashed: 1499)
  const track4 = INTERNSHIP_TRACKS[3];
  assert.equal(track4.courseFee, 0);
  assert.equal(track4.miscFee, 250);
  assert.equal(track4.discountedPrice, 250);
});

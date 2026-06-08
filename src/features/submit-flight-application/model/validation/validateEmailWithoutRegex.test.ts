import { describe, expect, it } from 'vitest';

import { validateEmailWithoutRegex } from './validateEmailWithoutRegex';

describe('validateEmailWithoutRegex', () => {
  it.each([
    'pilot@relay.net',
    'mara.voss@helion.registry',
    'operator-7@sector-control.org',
  ])('returns true for a valid email: %s', (email) => {
    expect(validateEmailWithoutRegex(email)).toBe(true);
  });

  it('trims surrounding whitespace before validation', () => {
    expect(validateEmailWithoutRegex('  pilot@relay.net  ')).toBe(true);
  });

  it.each([
    '',
    'pilot',
    'pilot@',
    '@relay.net',
    'pilot@@relay.net',
    'pilot relay@net.com',
    'pilot@relay',
    'pilot@.relay.net',
    'pilot@relay.net.',
    '.pilot@relay.net',
    'pilot.@relay.net',
    'pilot@relay..net',
  ])('returns false for an invalid email: %s', (email) => {
    expect(validateEmailWithoutRegex(email)).toBe(false);
  });

  it.each(['pilot\t@relay.net', 'pilot\n@relay.net', 'pilot\r@relay.net'])(
    'returns false when the email contains forbidden whitespace: %s',
    (email) => {
      expect(validateEmailWithoutRegex(email)).toBe(false);
    },
  );
});

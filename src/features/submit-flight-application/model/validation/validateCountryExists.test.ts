import { describe, expect, it } from 'vitest';

import { validateCountryExists } from './validateCountryExists';

const countryOptions = [
  'United Terran Directorate',
  'Orion Frontier Council',
  'Vega Colonial Authority',
] as const;

describe('validateCountryExists', () => {
  it('returns true when the country exists in the provided options', () => {
    expect(
      validateCountryExists('United Terran Directorate', countryOptions),
    ).toBe(true);
  });

  it('trims the submitted country before comparison', () => {
    expect(
      validateCountryExists('  Orion Frontier Council  ', countryOptions),
    ).toBe(true);
  });

  it('returns false when the country does not exist in the provided options', () => {
    expect(validateCountryExists('Unknown Authority', countryOptions)).toBe(
      false,
    );
  });

  it('uses exact case-sensitive comparison', () => {
    expect(
      validateCountryExists('united terran directorate', countryOptions),
    ).toBe(false);
  });
});

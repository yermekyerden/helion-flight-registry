import { describe, expect, it } from 'vitest';

import { getPassphraseIntegrityState } from './passphraseIntegrity';

describe('passphraseIntegrity', () => {
  it('returns idle status when the password is empty', () => {
    expect(
      getPassphraseIntegrityState({
        password: '',
        confirmPassword: '',
      }),
    ).toEqual({
      hasLowercaseLetter: false,
      hasMatchingConfirmation: false,
      hasMinimumLength: false,
      hasNumber: false,
      hasPassword: false,
      hasSpecialCharacter: false,
      hasUppercaseLetter: false,
      isPasswordStrong: false,
      requiredStrengthRequirementCount: 5,
      satisfiedStrengthRequirementCount: 0,
      status: 'idle',
    });
  });

  it('returns incomplete status when the password is weak', () => {
    expect(
      getPassphraseIntegrityState({
        password: 'abcdefg',
        confirmPassword: 'abcdefg',
      }),
    ).toEqual({
      hasLowercaseLetter: true,
      hasMatchingConfirmation: true,
      hasMinimumLength: false,
      hasNumber: false,
      hasPassword: true,
      hasSpecialCharacter: false,
      hasUppercaseLetter: false,
      isPasswordStrong: false,
      requiredStrengthRequirementCount: 5,
      satisfiedStrengthRequirementCount: 1,
      status: 'incomplete',
    });
  });

  it('returns incomplete status when the password is strong but confirmation does not match', () => {
    expect(
      getPassphraseIntegrityState({
        password: 'Abcdef1!',
        confirmPassword: 'Abcdef1?',
      }),
    ).toEqual({
      hasLowercaseLetter: true,
      hasMatchingConfirmation: false,
      hasMinimumLength: true,
      hasNumber: true,
      hasPassword: true,
      hasSpecialCharacter: true,
      hasUppercaseLetter: true,
      isPasswordStrong: true,
      requiredStrengthRequirementCount: 5,
      satisfiedStrengthRequirementCount: 5,
      status: 'incomplete',
    });
  });

  it('returns ready status when the password is strong and confirmation matches', () => {
    expect(
      getPassphraseIntegrityState({
        password: 'Abcdef1!',
        confirmPassword: 'Abcdef1!',
      }),
    ).toEqual({
      hasLowercaseLetter: true,
      hasMatchingConfirmation: true,
      hasMinimumLength: true,
      hasNumber: true,
      hasPassword: true,
      hasSpecialCharacter: true,
      hasUppercaseLetter: true,
      isPasswordStrong: true,
      requiredStrengthRequirementCount: 5,
      satisfiedStrengthRequirementCount: 5,
      status: 'ready',
    });
  });

  it('does not treat an empty confirmation as matching the password', () => {
    const state = getPassphraseIntegrityState({
      password: 'Abcdef1!',
      confirmPassword: '',
    });

    expect(state.hasMatchingConfirmation).toBe(false);
    expect(state.status).toBe('incomplete');
  });
});

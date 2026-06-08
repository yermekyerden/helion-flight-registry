import { describe, expect, it } from 'vitest';

import {
  getPasswordStrengthState,
  validatePasswordHasLowercaseLetter,
  validatePasswordHasMinimumLength,
  validatePasswordHasNumber,
  validatePasswordHasSpecialCharacter,
  validatePasswordHasUppercaseLetter,
} from './passwordStrength';

describe('passwordStrength', () => {
  describe('validatePasswordHasMinimumLength', () => {
    it('returns true when the password has the minimum required length', () => {
      expect(validatePasswordHasMinimumLength('Abcdef1!')).toBe(true);
    });

    it('returns false when the password is shorter than the minimum required length', () => {
      expect(validatePasswordHasMinimumLength('Abc1!')).toBe(false);
    });
  });

  describe('validatePasswordHasNumber', () => {
    it('returns true when the password contains a number', () => {
      expect(validatePasswordHasNumber('Password1')).toBe(true);
    });

    it('returns false when the password does not contain a number', () => {
      expect(validatePasswordHasNumber('Password')).toBe(false);
    });
  });

  describe('validatePasswordHasUppercaseLetter', () => {
    it('returns true when the password contains an uppercase Latin letter', () => {
      expect(validatePasswordHasUppercaseLetter('passwordA')).toBe(true);
    });

    it('returns false when the password does not contain an uppercase Latin letter', () => {
      expect(validatePasswordHasUppercaseLetter('password')).toBe(false);
    });
  });

  describe('validatePasswordHasLowercaseLetter', () => {
    it('returns true when the password contains a lowercase Latin letter', () => {
      expect(validatePasswordHasLowercaseLetter('PASSWORDa')).toBe(true);
    });

    it('returns false when the password does not contain a lowercase Latin letter', () => {
      expect(validatePasswordHasLowercaseLetter('PASSWORD')).toBe(false);
    });
  });

  describe('validatePasswordHasSpecialCharacter', () => {
    it('returns true when the password contains a non-alphanumeric non-whitespace character', () => {
      expect(validatePasswordHasSpecialCharacter('Password1!')).toBe(true);
    });

    it('returns false for numbers', () => {
      expect(validatePasswordHasSpecialCharacter('Password1')).toBe(false);
    });

    it('returns false for uppercase letters', () => {
      expect(validatePasswordHasSpecialCharacter('PASSWORD')).toBe(false);
    });

    it('returns false for lowercase letters', () => {
      expect(validatePasswordHasSpecialCharacter('password')).toBe(false);
    });

    it('returns false for whitespace characters', () => {
      expect(validatePasswordHasSpecialCharacter('Password1 ')).toBe(false);
      expect(validatePasswordHasSpecialCharacter('Password1\t')).toBe(false);
      expect(validatePasswordHasSpecialCharacter('Password1\n')).toBe(false);
      expect(validatePasswordHasSpecialCharacter('Password1\r')).toBe(false);
    });
  });

  describe('getPasswordStrengthState', () => {
    it('returns a strong state when all password requirements are satisfied', () => {
      expect(getPasswordStrengthState('Abcdef1!')).toEqual({
        hasLowercaseLetter: true,
        hasMinimumLength: true,
        hasNumber: true,
        hasSpecialCharacter: true,
        hasUppercaseLetter: true,
        isStrong: true,
        requiredRequirementCount: 5,
        satisfiedRequirementCount: 5,
      });
    });

    it('returns a weak state and counts satisfied requirements', () => {
      expect(getPasswordStrengthState('abcdefg')).toEqual({
        hasLowercaseLetter: true,
        hasMinimumLength: false,
        hasNumber: false,
        hasSpecialCharacter: false,
        hasUppercaseLetter: false,
        isStrong: false,
        requiredRequirementCount: 5,
        satisfiedRequirementCount: 1,
      });
    });

    it('returns an empty state for an empty password', () => {
      expect(getPasswordStrengthState('')).toEqual({
        hasLowercaseLetter: false,
        hasMinimumLength: false,
        hasNumber: false,
        hasSpecialCharacter: false,
        hasUppercaseLetter: false,
        isStrong: false,
        requiredRequirementCount: 5,
        satisfiedRequirementCount: 0,
      });
    });
  });
});

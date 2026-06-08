import { formLimits } from '@/shared/config/formLimits';

export type PasswordStrengthState = {
  hasLowercaseLetter: boolean;
  hasMinimumLength: boolean;
  hasNumber: boolean;
  hasSpecialCharacter: boolean;
  hasUppercaseLetter: boolean;
  isStrong: boolean;
  requiredRequirementCount: number;
  satisfiedRequirementCount: number;
};

type PasswordStrengthRequirements = Pick<
  PasswordStrengthState,
  | 'hasLowercaseLetter'
  | 'hasMinimumLength'
  | 'hasNumber'
  | 'hasSpecialCharacter'
  | 'hasUppercaseLetter'
>;

const requiredRequirementCount = 5;

const whitespaceCharacters = [' ', '\t', '\n', '\r'] as const;

export function getPasswordStrengthState(
  password: string,
): PasswordStrengthState {
  const requirements = getPasswordStrengthRequirements(password);
  const satisfiedRequirementCount = countSatisfiedRequirements(requirements);

  return {
    ...requirements,
    isStrong: satisfiedRequirementCount === requiredRequirementCount,
    requiredRequirementCount,
    satisfiedRequirementCount,
  };
}

export function validatePasswordHasMinimumLength(password: string) {
  return password.length >= formLimits.password.minLength;
}

export function validatePasswordHasNumber(password: string) {
  return Array.from(password).some(isNumberCharacter);
}

export function validatePasswordHasUppercaseLetter(password: string) {
  return Array.from(password).some(isUppercaseLatinLetter);
}

export function validatePasswordHasLowercaseLetter(password: string) {
  return Array.from(password).some(isLowercaseLatinLetter);
}

export function validatePasswordHasSpecialCharacter(password: string) {
  return Array.from(password).some(isSpecialPasswordCharacter);
}

function getPasswordStrengthRequirements(
  password: string,
): PasswordStrengthRequirements {
  return {
    hasLowercaseLetter: validatePasswordHasLowercaseLetter(password),
    hasMinimumLength: validatePasswordHasMinimumLength(password),
    hasNumber: validatePasswordHasNumber(password),
    hasSpecialCharacter: validatePasswordHasSpecialCharacter(password),
    hasUppercaseLetter: validatePasswordHasUppercaseLetter(password),
  };
}

function countSatisfiedRequirements(
  requirements: PasswordStrengthRequirements,
) {
  return Object.values(requirements).filter(Boolean).length;
}

function isNumberCharacter(character: string) {
  return character >= '0' && character <= '9';
}

function isUppercaseLatinLetter(character: string) {
  return character >= 'A' && character <= 'Z';
}

function isLowercaseLatinLetter(character: string) {
  return character >= 'a' && character <= 'z';
}

function isSpecialPasswordCharacter(character: string) {
  if (isNumberCharacter(character)) {
    return false;
  }

  if (isUppercaseLatinLetter(character)) {
    return false;
  }

  if (isLowercaseLatinLetter(character)) {
    return false;
  }

  if (isWhitespaceCharacter(character)) {
    return false;
  }

  return true;
}

function isWhitespaceCharacter(character: string) {
  return whitespaceCharacters.some(
    (whitespaceCharacter) => whitespaceCharacter === character,
  );
}

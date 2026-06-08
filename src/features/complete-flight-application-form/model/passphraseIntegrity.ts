import { getPasswordStrengthState } from '@/shared/lib/validation/flight-application/passwordStrength';

export type PassphraseIntegrityStatus = 'idle' | 'incomplete' | 'ready';

export type PassphraseIntegrityState = {
  hasLowercaseLetter: boolean;
  hasMatchingConfirmation: boolean;
  hasMinimumLength: boolean;
  hasNumber: boolean;
  hasPassword: boolean;
  hasSpecialCharacter: boolean;
  hasUppercaseLetter: boolean;
  isPasswordStrong: boolean;
  requiredStrengthRequirementCount: number;
  satisfiedStrengthRequirementCount: number;
  status: PassphraseIntegrityStatus;
};

type PassphraseIntegrityCandidate = {
  confirmPassword: string;
  password: string;
};

type PassphraseIntegrityStatusCandidate = {
  hasMatchingConfirmation: boolean;
  hasPassword: boolean;
  isPasswordStrong: boolean;
};

export function getPassphraseIntegrityState({
  confirmPassword,
  password,
}: PassphraseIntegrityCandidate): PassphraseIntegrityState {
  const hasPassword = password.length > 0;
  const passwordStrength = getPasswordStrengthState(password);

  const hasMatchingConfirmation = hasConfirmedPassphrase({
    confirmPassword,
    password,
  });

  return {
    hasLowercaseLetter: passwordStrength.hasLowercaseLetter,
    hasMatchingConfirmation,
    hasMinimumLength: passwordStrength.hasMinimumLength,
    hasNumber: passwordStrength.hasNumber,
    hasPassword,
    hasSpecialCharacter: passwordStrength.hasSpecialCharacter,
    hasUppercaseLetter: passwordStrength.hasUppercaseLetter,
    isPasswordStrong: passwordStrength.isStrong,
    requiredStrengthRequirementCount: passwordStrength.requiredRequirementCount,
    satisfiedStrengthRequirementCount:
      passwordStrength.satisfiedRequirementCount,
    status: getPassphraseIntegrityStatus({
      hasMatchingConfirmation,
      hasPassword,
      isPasswordStrong: passwordStrength.isStrong,
    }),
  };
}

function hasConfirmedPassphrase({
  confirmPassword,
  password,
}: PassphraseIntegrityCandidate) {
  return confirmPassword.length > 0 && password === confirmPassword;
}

function getPassphraseIntegrityStatus({
  hasMatchingConfirmation,
  hasPassword,
  isPasswordStrong,
}: PassphraseIntegrityStatusCandidate): PassphraseIntegrityStatus {
  if (!hasPassword) {
    return 'idle';
  }

  if (isPasswordStrong && hasMatchingConfirmation) {
    return 'ready';
  }

  return 'incomplete';
}

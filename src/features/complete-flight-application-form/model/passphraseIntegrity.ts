import { formLimits } from '@/shared/config/formLimits';

export type PassphraseIntegrityStatus = 'idle' | 'incomplete' | 'ready';

export type PassphraseIntegrityState = {
  hasMatchingConfirmation: boolean;
  hasMinimumLength: boolean;
  hasPassword: boolean;
  status: PassphraseIntegrityStatus;
};

type PassphraseIntegrityCandidate = {
  confirmPassword: string;
  password: string;
};

export function getPassphraseIntegrityState({
  confirmPassword,
  password,
}: PassphraseIntegrityCandidate): PassphraseIntegrityState {
  const hasPassword = password.length > 0;
  const hasMinimumLength = hasRequiredPassphraseLength(password);
  const hasMatchingConfirmation = hasConfirmedPassphrase({
    confirmPassword,
    password,
  });

  return {
    hasMatchingConfirmation,
    hasMinimumLength,
    hasPassword,
    status: getPassphraseIntegrityStatus({
      hasMatchingConfirmation,
      hasMinimumLength,
      hasPassword,
    }),
  };
}

function hasRequiredPassphraseLength(password: string) {
  return password.length >= formLimits.password.minLength;
}

function hasConfirmedPassphrase({
  confirmPassword,
  password,
}: PassphraseIntegrityCandidate) {
  return confirmPassword.length > 0 && password === confirmPassword;
}

function getPassphraseIntegrityStatus({
  hasMatchingConfirmation,
  hasMinimumLength,
  hasPassword,
}: Omit<PassphraseIntegrityState, 'status'>): PassphraseIntegrityStatus {
  if (!hasPassword) {
    return 'idle';
  }

  if (hasMinimumLength && hasMatchingConfirmation) {
    return 'ready';
  }

  return 'incomplete';
}

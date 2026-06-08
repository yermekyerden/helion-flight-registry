import { z } from 'zod';

import { flightApplicationValidationMessages as messages } from './flightApplicationValidationMessages';

type PasswordConfirmationCandidate = {
  password: string;
  confirmPassword: string;
};

export function addPasswordMismatchIssueIfNeeded(
  candidate: PasswordConfirmationCandidate,
  context: z.RefinementCtx,
) {
  if (candidate.password === candidate.confirmPassword) {
    return;
  }

  context.addIssue({
    code: 'custom',
    message: messages.securityClearance.passwordsDoNotMatch,
    path: ['confirmPassword'],
  });
}

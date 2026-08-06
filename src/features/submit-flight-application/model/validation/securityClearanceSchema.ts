import { z } from 'zod';

import { flightApplicationFormLimits } from '@/shared/config/flightApplicationFormLimits';
import { addPasswordMismatchIssueIfNeeded } from './addPasswordMismatchIssueIfNeeded';
import { flightApplicationValidationMessages as messages } from './flightApplicationValidationMessages';

export const securityClearanceBaseSchema = z.object({
  password: z
    .string()
    .min(
      flightApplicationFormLimits.password.minLength,
      messages.securityClearance.passwordTooShort,
    ),

  confirmPassword: z.string(),

  acceptedTerms: z.boolean().refine((acceptedTerms) => acceptedTerms, {
    message: messages.securityClearance.termsNotAccepted,
  }),
});

export const securityClearanceSchema = securityClearanceBaseSchema.superRefine(
  addPasswordMismatchIssueIfNeeded,
);

import { z } from 'zod';

import { formLimits } from '@/shared/config/formLimits';
import { addPasswordMismatchIssueIfNeeded } from './addPasswordMismatchIssueIfNeeded';
import { flightApplicationValidationMessages as messages } from './flightApplicationValidationMessages';
import {
  validatePasswordHasLowercaseLetter,
  validatePasswordHasNumber,
  validatePasswordHasSpecialCharacter,
  validatePasswordHasUppercaseLetter,
} from './passwordStrength';

export const securityClearanceBaseSchema = z.object({
  password: z
    .string()
    .min(
      formLimits.password.minLength,
      messages.securityClearance.passwordTooShort,
    )
    .refine(validatePasswordHasNumber, {
      message: messages.securityClearance.passwordMissingNumber,
    })
    .refine(validatePasswordHasUppercaseLetter, {
      message: messages.securityClearance.passwordMissingUppercaseLetter,
    })
    .refine(validatePasswordHasLowercaseLetter, {
      message: messages.securityClearance.passwordMissingLowercaseLetter,
    })
    .refine(validatePasswordHasSpecialCharacter, {
      message: messages.securityClearance.passwordMissingSpecialCharacter,
    }),

  confirmPassword: z.string(),

  acceptedTerms: z.boolean().refine((acceptedTerms) => acceptedTerms, {
    message: messages.securityClearance.termsNotAccepted,
  }),
});

export const securityClearanceSchema = securityClearanceBaseSchema.superRefine(
  addPasswordMismatchIssueIfNeeded,
);

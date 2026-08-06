import { z } from 'zod';

import { identityMarkers } from '@/entities/flight-application/model/flightApplicationOptions';
import { flightApplicationFormLimits } from '@/shared/config/flightApplicationFormLimits';
import { flightApplicationValidationMessages as messages } from './flightApplicationValidationMessages';
import { imageFileSchema } from './imageFileSchema';
import { validateEmailWithoutRegex } from './validateEmailWithoutRegex';
import { validateNameStartsWithUppercaseLetter } from './validateNameStartsWithUppercaseLetter';

export const pilotIdentitySchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      flightApplicationFormLimits.name.minLength,
      messages.pilotIdentity.nameTooShort,
    )
    .max(
      flightApplicationFormLimits.name.maxLength,
      messages.pilotIdentity.nameTooLong,
    )
    .refine(validateNameStartsWithUppercaseLetter, {
      message: messages.pilotIdentity.nameMustStartWithUppercaseLetter,
    }),

  age: z.coerce
    .number()
    .int(messages.pilotIdentity.ageNotInteger)
    .min(flightApplicationFormLimits.age.min, messages.pilotIdentity.ageTooLow)
    .max(
      flightApplicationFormLimits.age.max,
      messages.pilotIdentity.ageTooHigh,
    ),

  email: z.string().trim().refine(validateEmailWithoutRegex, {
    message: messages.pilotIdentity.invalidEmail,
  }),

  gender: z.enum(identityMarkers, {
    message: messages.pilotIdentity.missingIdentityMarker,
  }),

  pilotPhoto: imageFileSchema,
});

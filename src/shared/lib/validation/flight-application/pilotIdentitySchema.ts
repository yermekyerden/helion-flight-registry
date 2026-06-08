import { z } from 'zod';

import { identityMarkers } from '../../../config/flightApplicationOptions';
import { formLimits } from '../../../config/formLimits';
import { flightApplicationValidationMessages as messages } from './flightApplicationValidationMessages';
import { imageFileSchema } from './imageFileSchema';
import { validateEmailWithoutRegex } from './validateEmailWithoutRegex';

export const pilotIdentitySchema = z.object({
  name: z
    .string()
    .trim()
    .min(formLimits.name.minLength, messages.pilotIdentity.nameTooShort)
    .max(formLimits.name.maxLength, messages.pilotIdentity.nameTooLong),

  age: z.coerce
    .number()
    .int(messages.pilotIdentity.ageNotInteger)
    .min(formLimits.age.min, messages.pilotIdentity.ageTooLow)
    .max(formLimits.age.max, messages.pilotIdentity.ageTooHigh),

  email: z.string().trim().refine(validateEmailWithoutRegex, {
    message: messages.pilotIdentity.invalidEmail,
  }),

  gender: z.enum(identityMarkers, {
    message: messages.pilotIdentity.missingIdentityMarker,
  }),

  pilotPhoto: imageFileSchema,
});

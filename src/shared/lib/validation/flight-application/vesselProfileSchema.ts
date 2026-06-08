import { z } from 'zod';

import { vesselClasses } from '@/shared/config/flightApplicationOptions';
import { formLimits } from '@/shared/config/formLimits';
import { flightApplicationValidationMessages as messages } from './flightApplicationValidationMessages';

export const vesselProfileSchema = z.object({
  vesselName: z
    .string()
    .trim()
    .min(
      formLimits.vesselName.minLength,
      messages.vesselProfile.vesselNameTooShort,
    )
    .max(
      formLimits.vesselName.maxLength,
      messages.vesselProfile.vesselNameTooLong,
    ),

  vesselClass: z.enum(vesselClasses, {
    message: messages.vesselProfile.missingVesselClass,
  }),

  crewCapacity: z.coerce
    .number()
    .int(messages.vesselProfile.crewCapacityNotInteger)
    .min(formLimits.crewCapacity.min, messages.vesselProfile.crewCapacityTooLow)
    .max(
      formLimits.crewCapacity.max,
      messages.vesselProfile.crewCapacityTooHigh,
    ),

  callsign: z
    .string()
    .trim()
    .max(formLimits.callsign.maxLength, messages.vesselProfile.callsignTooLong),
});

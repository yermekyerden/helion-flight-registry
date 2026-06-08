import { z } from 'zod';

import { vesselClasses } from '@/entities/flight-application/model/flightApplicationOptions';
import { flightApplicationFormLimits } from '@/shared/config/flightApplicationFormLimits';
import { flightApplicationValidationMessages as messages } from './flightApplicationValidationMessages';

export const vesselProfileSchema = z.object({
  vesselName: z
    .string()
    .trim()
    .min(
      flightApplicationFormLimits.vesselName.minLength,
      messages.vesselProfile.vesselNameTooShort,
    )
    .max(
      flightApplicationFormLimits.vesselName.maxLength,
      messages.vesselProfile.vesselNameTooLong,
    ),

  vesselClass: z.enum(vesselClasses, {
    message: messages.vesselProfile.missingVesselClass,
  }),

  crewCapacity: z.coerce
    .number()
    .int(messages.vesselProfile.crewCapacityNotInteger)
    .min(
      flightApplicationFormLimits.crewCapacity.min,
      messages.vesselProfile.crewCapacityTooLow,
    )
    .max(
      flightApplicationFormLimits.crewCapacity.max,
      messages.vesselProfile.crewCapacityTooHigh,
    ),

  callsign: z
    .string()
    .trim()
    .max(
      flightApplicationFormLimits.callsign.maxLength,
      messages.vesselProfile.callsignTooLong,
    ),
});

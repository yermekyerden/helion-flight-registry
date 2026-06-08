import { z } from 'zod';

import {
  originAuthorities,
  originSectors,
} from '@/entities/flight-application/model/flightApplicationOptions';
import { flightApplicationFormLimits } from '@/shared/config/flightApplicationFormLimits';
import { flightApplicationValidationMessages as messages } from './flightApplicationValidationMessages';
import { validateCountryExists } from './validateCountryExists';

export function createOriginRegistrySchema(
  countryOptions: readonly string[] = originAuthorities,
) {
  return z.object({
    originSector: z.enum(originSectors, {
      message: messages.originRegistry.missingOriginSector,
    }),

    originWorld: z
      .string()
      .trim()
      .min(
        flightApplicationFormLimits.originWorld.minLength,
        messages.originRegistry.originWorldTooShort,
      )
      .max(
        flightApplicationFormLimits.originWorld.maxLength,
        messages.originRegistry.originWorldTooLong,
      ),

    country: z
      .string()
      .trim()
      .refine((country) => validateCountryExists(country, countryOptions), {
        message: messages.originRegistry.unknownOriginAuthority,
      }),
  });
}

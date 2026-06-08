import { z } from 'zod';

import {
  originAuthorities,
  originSectors,
} from '../../../config/flightApplicationOptions';
import { formLimits } from '../../../config/formLimits';
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
        formLimits.originWorld.minLength,
        messages.originRegistry.originWorldTooShort,
      )
      .max(
        formLimits.originWorld.maxLength,
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

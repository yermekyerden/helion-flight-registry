import { z } from 'zod';

import { addPasswordMismatchIssueIfNeeded } from './addPasswordMismatchIssueIfNeeded';
import { createOriginRegistrySchema } from './originRegistrySchema';
import { flightRequestSchema } from './flightRequestSchema';
import { pilotIdentitySchema } from './pilotIdentitySchema';
import { securityClearanceBaseSchema } from './securityClearanceSchema';
import { vesselProfileSchema } from './vesselProfileSchema';

export function createFlightApplicationFormSchema(
  countryOptions?: readonly string[],
) {
  const originRegistrySchema = createOriginRegistrySchema(countryOptions);

  return z
    .object({
      ...pilotIdentitySchema.shape,
      ...originRegistrySchema.shape,
      ...vesselProfileSchema.shape,
      ...flightRequestSchema.shape,
      ...securityClearanceBaseSchema.shape,
    })
    .superRefine(addPasswordMismatchIssueIfNeeded);
}

export const flightApplicationFormSchema = createFlightApplicationFormSchema();

export type FlightApplicationFormValues = z.infer<
  typeof flightApplicationFormSchema
>;

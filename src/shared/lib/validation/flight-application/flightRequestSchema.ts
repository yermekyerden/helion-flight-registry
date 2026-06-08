import { z } from 'zod';

import {
  flightPurposes,
  originSectors,
} from '@/shared/config/flightApplicationOptions';
import { flightApplicationValidationMessages as messages } from './flightApplicationValidationMessages';

export const flightRequestSchema = z.object({
  destinationSector: z.enum(originSectors, {
    message: messages.flightRequest.missingDestinationSector,
  }),

  flightPurpose: z.enum(flightPurposes, {
    message: messages.flightRequest.missingFlightPurpose,
  }),
});

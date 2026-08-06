import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { flightApplicationValidationMessages as messages } from '../validation/flightApplicationValidationMessages';
import { createFlightApplicationFormSchema } from '../validation/flightApplicationFormSchema';
import { mapZodErrorToFlightApplicationFormFieldErrors } from './mapZodErrorToFlightApplicationFormFieldErrors';

describe('mapZodErrorToFlightApplicationFormFieldErrors', () => {
  it('maps Zod issues to form field errors', () => {
    const validationResult = createFlightApplicationFormSchema().safeParse({
      name: 'mara Voss',
      age: '15',
      email: 'invalid-email',
      gender: '',
      pilotPhoto: undefined,

      originSector: '',
      originWorld: 'T',
      country: 'Unknown Authority',

      vesselName: 'A',
      vesselClass: '',
      crewCapacity: '0',
      callsign: '',

      destinationSector: '',
      flightPurpose: '',

      password: 'weak',
      confirmPassword: 'different',
      acceptedTerms: false,
    });

    expect(validationResult.success).toBe(false);

    if (validationResult.success) {
      return;
    }

    const fieldErrors = mapZodErrorToFlightApplicationFormFieldErrors(
      validationResult.error,
    );

    expect(fieldErrors).toMatchObject({
      name: messages.pilotIdentity.nameMustStartWithUppercaseLetter,
      age: messages.pilotIdentity.ageTooLow,
      email: messages.pilotIdentity.invalidEmail,
      pilotPhoto: messages.pilotIdentity.missingPilotPhoto,
      originWorld: messages.originRegistry.originWorldTooShort,
      country: messages.originRegistry.unknownOriginAuthority,
      vesselName: messages.vesselProfile.vesselNameTooShort,
      crewCapacity: messages.vesselProfile.crewCapacityTooLow,
      password: messages.securityClearance.passwordTooShort,
      acceptedTerms: messages.securityClearance.termsNotAccepted,
    });
  });

  it('keeps only the first error for a field', () => {
    const zodError = new z.ZodError([
      {
        code: 'custom',
        message: 'First name error',
        path: ['name'],
      },
      {
        code: 'custom',
        message: 'Second name error',
        path: ['name'],
      },
    ]);

    const fieldErrors = mapZodErrorToFlightApplicationFormFieldErrors(zodError);

    expect(fieldErrors.name).toBe('First name error');
  });

  it('ignores issues without a known field path', () => {
    const zodError = new z.ZodError([
      {
        code: 'custom',
        message: 'Root error',
        path: [],
      },
      {
        code: 'custom',
        message: 'Unknown field error',
        path: ['unknownField'],
      },
    ]);

    const fieldErrors = mapZodErrorToFlightApplicationFormFieldErrors(zodError);

    expect(fieldErrors).toEqual({});
  });

  it('maps a confirm password issue when it exists in the Zod error', () => {
    const zodError = new z.ZodError([
      {
        code: 'custom',
        message: messages.securityClearance.passwordsDoNotMatch,
        path: ['confirmPassword'],
      },
    ]);

    const fieldErrors = mapZodErrorToFlightApplicationFormFieldErrors(zodError);

    expect(fieldErrors.confirmPassword).toBe(
      messages.securityClearance.passwordsDoNotMatch,
    );
  });
});

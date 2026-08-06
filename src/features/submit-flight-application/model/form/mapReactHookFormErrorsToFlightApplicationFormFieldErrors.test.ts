import type { FieldErrors } from 'react-hook-form';
import { describe, expect, it } from 'vitest';

import type { FlightApplicationFormInputValues } from '../validation/flightApplicationFormSchema';
import { mapReactHookFormErrorsToFlightApplicationFormFieldErrors } from './mapReactHookFormErrorsToFlightApplicationFormFieldErrors';

describe('mapReactHookFormErrorsToFlightApplicationFormFieldErrors', () => {
  it('maps React Hook Form errors to form field errors', () => {
    const reactHookFormErrors: FieldErrors<FlightApplicationFormInputValues> = {
      name: {
        type: 'manual',
        message: 'Name error',
      },
      email: {
        type: 'manual',
        message: 'Email error',
      },
      country: {
        type: 'manual',
        message: 'Country error',
      },
      password: {
        type: 'manual',
        message: 'Password error',
      },
      acceptedTerms: {
        type: 'manual',
        message: 'Terms error',
      },
    };

    const fieldErrors =
      mapReactHookFormErrorsToFlightApplicationFormFieldErrors(
        reactHookFormErrors,
      );

    expect(fieldErrors).toMatchObject({
      name: 'Name error',
      email: 'Email error',
      country: 'Country error',
      password: 'Password error',
      acceptedTerms: 'Terms error',
    });
  });

  it('returns undefined for fields without errors', () => {
    const fieldErrors =
      mapReactHookFormErrorsToFlightApplicationFormFieldErrors({});

    expect(fieldErrors).toMatchObject({
      name: undefined,
      age: undefined,
      email: undefined,
      gender: undefined,
      pilotPhoto: undefined,
      originSector: undefined,
      originWorld: undefined,
      country: undefined,
      vesselName: undefined,
      vesselClass: undefined,
      crewCapacity: undefined,
      callsign: undefined,
      destinationSector: undefined,
      flightPurpose: undefined,
      password: undefined,
      confirmPassword: undefined,
      acceptedTerms: undefined,
    });
  });

  it('ignores errors without a string message', () => {
    const reactHookFormErrors: FieldErrors<FlightApplicationFormInputValues> = {
      name: {
        type: 'manual',
      },
    };

    const fieldErrors =
      mapReactHookFormErrorsToFlightApplicationFormFieldErrors(
        reactHookFormErrors,
      );

    expect(fieldErrors.name).toBeUndefined();
  });
});

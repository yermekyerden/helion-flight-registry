import { describe, expect, it } from 'vitest';

import { createTestImageFile } from '@/shared/lib/test/createTestImageFile';

import { flightApplicationValidationMessages as messages } from './flightApplicationValidationMessages';
import {
  createFlightApplicationFormSchema,
  type FlightApplicationFormInputValues,
} from './flightApplicationFormSchema';

describe('createFlightApplicationFormSchema', () => {
  it('accepts a complete valid flight application form', () => {
    const pilotPhoto = createTestImageFile();
    const formValues = createValidFlightApplicationFormInput({
      pilotPhoto,
    });

    const validationResult =
      createFlightApplicationFormSchema().safeParse(formValues);

    expect(validationResult.success).toBe(true);

    if (!validationResult.success) {
      return;
    }

    expect(validationResult.data).toMatchObject({
      name: 'Mara Voss',
      age: 34,
      email: 'mara.voss@relay.net',
      gender: 'Female',
      pilotPhoto,

      originSector: 'Sol Core',
      originWorld: 'Terra',
      country: 'United Terran Directorate',

      vesselName: 'Asterion-7',
      vesselClass: 'Scout Corvette',
      crewCapacity: 12,
      callsign: 'Blue Meridian',

      destinationSector: 'Orion Frontier',
      flightPurpose: 'Scientific Survey',

      password: 'Abcdef1!',
      confirmPassword: 'Abcdef1!',
      acceptedTerms: true,
    });
  });

  it('trims text fields and coerces numeric fields', () => {
    const formValues = createValidFlightApplicationFormInput({
      age: '34',
      callsign: '  Blue Meridian  ',
      country: '  United Terran Directorate  ',
      crewCapacity: '12',
      email: '  mara.voss@relay.net  ',
      name: '  Mara Voss  ',
      originWorld: '  Terra  ',
      vesselName: '  Asterion-7  ',
    });

    const validationResult =
      createFlightApplicationFormSchema().safeParse(formValues);

    expect(validationResult.success).toBe(true);

    if (!validationResult.success) {
      return;
    }

    expect(validationResult.data).toMatchObject({
      age: 34,
      callsign: 'Blue Meridian',
      country: 'United Terran Directorate',
      crewCapacity: 12,
      email: 'mara.voss@relay.net',
      name: 'Mara Voss',
      originWorld: 'Terra',
      vesselName: 'Asterion-7',
    });
  });

  it('rejects an unknown origin authority', () => {
    const formValues = createValidFlightApplicationFormInput({
      country: 'Unknown Authority',
    });

    const validationResult =
      createFlightApplicationFormSchema().safeParse(formValues);

    expect(validationResult.success).toBe(false);

    if (validationResult.success) {
      return;
    }

    expect(getIssueMessages(validationResult.error)).toContain(
      messages.originRegistry.unknownOriginAuthority,
    );
  });

  it('uses custom country options when they are provided', () => {
    const formValues = createValidFlightApplicationFormInput({
      country: 'Independent Mars Registry',
    });

    const validationResult = createFlightApplicationFormSchema([
      'Independent Mars Registry',
    ]).safeParse(formValues);

    expect(validationResult.success).toBe(true);
  });

  it('rejects mismatched access passphrases', () => {
    const formValues = createValidFlightApplicationFormInput({
      confirmPassword: 'Abcdef1?',
      password: 'Abcdef1!',
    });

    const validationResult =
      createFlightApplicationFormSchema().safeParse(formValues);

    expect(validationResult.success).toBe(false);

    if (validationResult.success) {
      return;
    }

    expect(getIssueMessages(validationResult.error)).toContain(
      messages.securityClearance.passwordsDoNotMatch,
    );

    expect(validationResult.error.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['confirmPassword'],
        }),
      ]),
    );
  });

  it('rejects an unchecked protocol agreement', () => {
    const formValues = createValidFlightApplicationFormInput({
      acceptedTerms: false,
    });

    const validationResult =
      createFlightApplicationFormSchema().safeParse(formValues);

    expect(validationResult.success).toBe(false);

    if (validationResult.success) {
      return;
    }

    expect(getIssueMessages(validationResult.error)).toContain(
      messages.securityClearance.termsNotAccepted,
    );
  });

  it('rejects a weak access passphrase', () => {
    const formValues = createValidFlightApplicationFormInput({
      confirmPassword: 'weak',
      password: 'weak',
    });

    const validationResult =
      createFlightApplicationFormSchema().safeParse(formValues);

    expect(validationResult.success).toBe(false);

    if (validationResult.success) {
      return;
    }

    expect(getIssueMessages(validationResult.error)).toContain(
      messages.securityClearance.passwordTooShort,
    );
  });

  it('rejects invalid identity values', () => {
    const formValues = createValidFlightApplicationFormInput({
      age: '15',
      email: 'invalid-email',
      name: 'mara Voss',
    });

    const validationResult =
      createFlightApplicationFormSchema().safeParse(formValues);

    expect(validationResult.success).toBe(false);

    if (validationResult.success) {
      return;
    }

    expect(getIssueMessages(validationResult.error)).toEqual(
      expect.arrayContaining([
        messages.pilotIdentity.ageTooLow,
        messages.pilotIdentity.invalidEmail,
        messages.pilotIdentity.nameMustStartWithUppercaseLetter,
      ]),
    );
  });
});

function createValidFlightApplicationFormInput(
  overrides: Partial<FlightApplicationFormInputValues> = {},
): FlightApplicationFormInputValues {
  return {
    name: 'Mara Voss',
    age: '34',
    email: 'mara.voss@relay.net',
    gender: 'Female',
    pilotPhoto: createTestImageFile(),

    originSector: 'Sol Core',
    originWorld: 'Terra',
    country: 'United Terran Directorate',

    vesselName: 'Asterion-7',
    vesselClass: 'Scout Corvette',
    crewCapacity: '12',
    callsign: 'Blue Meridian',

    destinationSector: 'Orion Frontier',
    flightPurpose: 'Scientific Survey',

    password: 'Abcdef1!',
    confirmPassword: 'Abcdef1!',
    acceptedTerms: true,

    ...overrides,
  };
}

function getIssueMessages(error: { issues: Array<{ message: string }> }) {
  return error.issues.map((issue) => issue.message);
}

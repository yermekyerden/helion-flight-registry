import { afterEach, describe, expect, it, vi } from 'vitest';

import { createTestImageFile } from '@/shared/lib/test/createTestImageFile';

import { flightApplicationFormFieldNames as fieldNames } from './flightApplicationFormFieldNames';
import { readLegacyPilotIntakeFormData } from './readLegacyPilotIntakeFormData';

describe('readLegacyPilotIntakeFormData', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('reads submitted values from legacy form data', () => {
    const formElement = document.createElement('form');
    const pilotPhoto = createTestImageFile();

    mockFormData({
      [fieldNames.name]: 'Mara Voss',
      [fieldNames.age]: '34',
      [fieldNames.email]: 'mara.voss@relay.net',
      [fieldNames.gender]: 'Female',
      [fieldNames.pilotPhoto]: pilotPhoto,

      [fieldNames.originSector]: 'Sol Core',
      [fieldNames.originWorld]: 'Terra',
      [fieldNames.country]: 'United Terran Directorate',

      [fieldNames.vesselName]: 'Asterion-7',
      [fieldNames.vesselClass]: 'Scout Corvette',
      [fieldNames.crewCapacity]: '12',
      [fieldNames.callsign]: 'Blue Meridian',

      [fieldNames.destinationSector]: 'Orion Frontier',
      [fieldNames.flightPurpose]: 'Scientific Survey',

      [fieldNames.password]: 'Abcdef1!',
      [fieldNames.confirmPassword]: 'Abcdef1!',
      [fieldNames.acceptedTerms]: 'on',
    });

    const rawFormValues = readLegacyPilotIntakeFormData(formElement);

    expect(rawFormValues).toEqual({
      name: 'Mara Voss',
      age: '34',
      email: 'mara.voss@relay.net',
      gender: 'Female',
      pilotPhoto,

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
    });
  });

  it('returns empty strings for missing text fields', () => {
    const formElement = document.createElement('form');

    mockFormData({});

    const rawFormValues = readLegacyPilotIntakeFormData(formElement);

    expect(rawFormValues).toMatchObject({
      name: '',
      age: '',
      email: '',
      gender: '',
      originSector: '',
      originWorld: '',
      country: '',
      vesselName: '',
      vesselClass: '',
      crewCapacity: '',
      callsign: '',
      destinationSector: '',
      flightPurpose: '',
      password: '',
      confirmPassword: '',
    });
  });

  it('returns false when the terms checkbox is missing', () => {
    const formElement = document.createElement('form');

    mockFormData({});

    const rawFormValues = readLegacyPilotIntakeFormData(formElement);

    expect(rawFormValues.acceptedTerms).toBe(false);
  });

  it('returns false when the terms checkbox is unchecked', () => {
    const formElement = document.createElement('form');

    mockFormData({
      [fieldNames.acceptedTerms]: undefined,
    });

    const rawFormValues = readLegacyPilotIntakeFormData(formElement);

    expect(rawFormValues.acceptedTerms).toBe(false);
  });

  it('returns undefined when the pilot photo field is missing', () => {
    const formElement = document.createElement('form');

    mockFormData({});

    const rawFormValues = readLegacyPilotIntakeFormData(formElement);

    expect(rawFormValues.pilotPhoto).toBeUndefined();
  });

  it('returns undefined when the pilot photo field contains an empty file', () => {
    const formElement = document.createElement('form');
    const emptyFile = new File([], '', {
      type: 'application/octet-stream',
    });

    mockFormData({
      [fieldNames.pilotPhoto]: emptyFile,
    });

    const rawFormValues = readLegacyPilotIntakeFormData(formElement);

    expect(rawFormValues.pilotPhoto).toBeUndefined();
  });
});

function mockFormData(values: Record<string, FormDataEntryValue | undefined>) {
  vi.stubGlobal(
    'FormData',
    class {
      get(fieldName: string) {
        return values[fieldName] ?? null;
      }

      has(fieldName: string) {
        return values[fieldName] !== undefined;
      }
    },
  );
}

import { describe, expect, it } from 'vitest';

import { createTestImageFile } from '@/shared/lib/test/createTestImageFile';

import type { FlightApplicationFormValues } from '../validation/flightApplicationFormSchema';
import { mapFlightApplicationFormToFlightApplication } from './mapFlightApplicationFormToFlightApplication';

describe('mapFlightApplicationFormToFlightApplication', () => {
  it('maps validated form values to a flight application entity', () => {
    const formValues = createValidFlightApplicationFormValues();
    const flightApplication = mapFlightApplicationFormToFlightApplication({
      formValues,
      id: 'flight-application-1',
      pilotPhotoDataUrl: 'data:image/png;base64,test-image',
      protocol: 'assisted',
      submittedAt: '2026-06-08T12:00:00.000Z',
    });

    expect(flightApplication).toEqual({
      id: 'flight-application-1',
      submittedAt: '2026-06-08T12:00:00.000Z',
      protocol: 'assisted',
      status: 'pending-review',

      name: 'Mara Voss',
      age: 34,
      email: 'mara.voss@relay.net',
      identityMarker: 'Female',
      pilotPhotoDataUrl: 'data:image/png;base64,test-image',

      originSector: 'Sol Core',
      originWorld: 'Terra',
      originAuthority: 'United Terran Directorate',

      vesselName: 'Asterion-7',
      vesselClass: 'Scout Corvette',
      crewCapacity: 12,
      callsign: 'Blue Meridian',

      destinationSector: 'Orion Frontier',
      flightPurpose: 'Scientific Survey',
    });
  });

  it('preserves the selected submission protocol', () => {
    const formValues = createValidFlightApplicationFormValues();
    const flightApplication = mapFlightApplicationFormToFlightApplication({
      formValues,
      id: 'flight-application-1',
      pilotPhotoDataUrl: 'data:image/png;base64,test-image',
      protocol: 'legacy',
      submittedAt: '2026-06-08T12:00:00.000Z',
    });

    expect(flightApplication.protocol).toBe('legacy');
  });

  it('uses the submitted country as the origin authority', () => {
    const formValues = createValidFlightApplicationFormValues({
      country: 'Orion Frontier Council',
    });

    const flightApplication = mapFlightApplicationFormToFlightApplication({
      formValues,
      id: 'flight-application-1',
      pilotPhotoDataUrl: 'data:image/png;base64,test-image',
      protocol: 'assisted',
      submittedAt: '2026-06-08T12:00:00.000Z',
    });

    expect(flightApplication.originAuthority).toBe('Orion Frontier Council');
  });
});

function createValidFlightApplicationFormValues(
  overrides: Partial<FlightApplicationFormValues> = {},
): FlightApplicationFormValues {
  return {
    name: 'Mara Voss',
    age: 34,
    email: 'mara.voss@relay.net',
    gender: 'Female',
    pilotPhoto: createTestImageFile(),

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

    ...overrides,
  };
}

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createTestImageFile } from '@/shared/lib/test/createTestImageFile';

import type { FlightApplicationFormValues } from '../validation/flightApplicationFormSchema';
import { createFlightApplicationFromFormValues } from './createFlightApplicationFromFormValues';

const fixedSubmittedAt = '2026-06-08T12:00:00.000Z';
const fixedFlightApplicationId = '00000000-0000-4000-8000-000000000001';

describe('createFlightApplicationFromFormValues', () => {
  beforeEach(() => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValue(fixedFlightApplicationId);
    vi.spyOn(Date.prototype, 'toISOString').mockReturnValue(fixedSubmittedAt);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a flight application from validated form values', async () => {
    const formValues = createValidFlightApplicationFormValues({
      pilotPhoto: createTestImageFile({
        content: 'pilot image content',
        name: 'pilot.png',
        type: 'image/png',
      }),
    });

    const flightApplication = await createFlightApplicationFromFormValues({
      formValues,
      protocol: 'assisted',
    });

    expect(flightApplication).toEqual({
      id: fixedFlightApplicationId,
      submittedAt: fixedSubmittedAt,
      protocol: 'assisted',
      status: 'pending-review',

      name: 'Mara Voss',
      age: 34,
      email: 'mara.voss@relay.net',
      identityMarker: 'Female',
      pilotPhotoDataUrl: 'data:image/png;base64,cGlsb3QgaW1hZ2UgY29udGVudA==',

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

  it('preserves the provided submission protocol', async () => {
    const formValues = createValidFlightApplicationFormValues();

    const flightApplication = await createFlightApplicationFromFormValues({
      formValues,
      protocol: 'legacy',
    });

    expect(flightApplication.protocol).toBe('legacy');
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

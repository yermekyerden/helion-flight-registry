import type { FlightApplication } from '@/entities/flight-application/model/flightApplication.types';

export function createFlightApplicationFixture(
  overrides: Partial<FlightApplication> = {},
): FlightApplication {
  return {
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

    ...overrides,
  };
}

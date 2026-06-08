import type {
  flightPurposes,
  identityMarkers,
  originAuthorities,
  originSectors,
  vesselClasses,
} from './flightApplicationOptions';

export type OriginSector = (typeof originSectors)[number];

export type DestinationSector = OriginSector;

export type OriginAuthority = (typeof originAuthorities)[number];

export type VesselClass = (typeof vesselClasses)[number];

export type FlightPurpose = (typeof flightPurposes)[number];

export type IdentityMarker = (typeof identityMarkers)[number];

export type FlightApplicationProtocol = 'legacy' | 'assisted';

export type FlightApplicationStatus = 'pending-review';

export interface PilotIdentity {
  name: string;
  age: number;
  email: string;
  identityMarker: IdentityMarker;
  pilotPhotoDataUrl: string;
}

export interface OriginRegistry {
  originSector: OriginSector;
  originWorld: string;
  originAuthority: OriginAuthority;
}

export interface VesselProfile {
  vesselName: string;
  vesselClass: VesselClass;
  crewCapacity: number;
  callsign: string;
}

export interface FlightRequest {
  destinationSector: DestinationSector;
  flightPurpose: FlightPurpose;
}

export interface FlightApplication
  extends PilotIdentity, OriginRegistry, VesselProfile, FlightRequest {
  id: string;
  submittedAt: string;
  protocol: FlightApplicationProtocol;
  status: FlightApplicationStatus;
}

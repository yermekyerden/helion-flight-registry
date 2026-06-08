import type {
  FlightApplication,
  FlightApplicationProtocol,
  OriginAuthority,
} from '@/entities/flight-application/model/flightApplication.types';

import type { FlightApplicationFormValues } from '../validation/flightApplicationFormSchema';

type MapFlightApplicationFormToFlightApplicationParams = {
  formValues: FlightApplicationFormValues;
  id: string;
  pilotPhotoDataUrl: string;
  protocol: FlightApplicationProtocol;
  submittedAt: string;
};

export function mapFlightApplicationFormToFlightApplication({
  formValues,
  id,
  pilotPhotoDataUrl,
  protocol,
  submittedAt,
}: MapFlightApplicationFormToFlightApplicationParams): FlightApplication {
  return {
    id,
    submittedAt,
    protocol,
    status: 'pending-review',

    name: formValues.name,
    age: formValues.age,
    email: formValues.email,
    identityMarker: formValues.gender,
    pilotPhotoDataUrl,

    originSector: formValues.originSector,
    originWorld: formValues.originWorld,
    originAuthority: mapCountryToOriginAuthority(formValues.country),

    vesselName: formValues.vesselName,
    vesselClass: formValues.vesselClass,
    crewCapacity: formValues.crewCapacity,
    callsign: formValues.callsign,

    destinationSector: formValues.destinationSector,
    flightPurpose: formValues.flightPurpose,
  };
}

function mapCountryToOriginAuthority(country: string): OriginAuthority {
  return country as OriginAuthority;
}

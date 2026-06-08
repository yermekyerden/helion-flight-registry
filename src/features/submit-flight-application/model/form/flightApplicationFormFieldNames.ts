import type { FlightApplicationFormValues } from '../validation/flightApplicationFormSchema';

export const flightApplicationFormFieldNames = {
  name: 'name',
  age: 'age',
  email: 'email',
  gender: 'gender',
  pilotPhoto: 'pilotPhoto',

  originSector: 'originSector',
  originWorld: 'originWorld',
  country: 'country',

  vesselName: 'vesselName',
  vesselClass: 'vesselClass',
  crewCapacity: 'crewCapacity',
  callsign: 'callsign',

  destinationSector: 'destinationSector',
  flightPurpose: 'flightPurpose',

  password: 'password',
  confirmPassword: 'confirmPassword',
  acceptedTerms: 'acceptedTerms',
} as const satisfies Record<
  keyof FlightApplicationFormValues,
  keyof FlightApplicationFormValues
>;

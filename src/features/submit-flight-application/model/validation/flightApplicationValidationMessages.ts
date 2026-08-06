import { flightApplicationFormLimits } from '@/shared/config/flightApplicationFormLimits';

export const flightApplicationValidationMessages = {
  pilotIdentity: {
    nameTooShort: `Full legal name must contain at least ${flightApplicationFormLimits.name.minLength} characters.`,
    nameTooLong: `Full legal name must contain no more than ${flightApplicationFormLimits.name.maxLength} characters.`,
    nameMustStartWithUppercaseLetter:
      'Full legal name must start with an uppercase letter.',
    ageNotInteger: 'Registry age must be a whole number.',
    ageTooLow: `Registry age must be at least ${flightApplicationFormLimits.age.min}.`,
    ageTooHigh: `Registry age must be no more than ${flightApplicationFormLimits.age.max}.`,
    invalidEmail: 'Relay email must contain one @ symbol and a valid domain.',
    missingIdentityMarker: 'Identity marker is required.',
    missingPilotPhoto: 'Pilot photo is required.',
    invalidPilotPhotoType: 'Pilot photo must be a PNG or JPEG image.',
    oversizedPilotPhoto: `Pilot photo must be smaller than ${flightApplicationFormLimits.image.maxSizeInMegabytes} MB.`,
  },

  originRegistry: {
    missingOriginSector: 'Origin sector is required.',
    originWorldTooShort: `Origin world must contain at least ${flightApplicationFormLimits.originWorld.minLength} characters.`,
    originWorldTooLong: `Origin world must contain no more than ${flightApplicationFormLimits.originWorld.maxLength} characters.`,
    unknownOriginAuthority:
      'Origin country or authority must exist in the registry.',
  },

  vesselProfile: {
    vesselNameTooShort: `Vessel name must contain at least ${flightApplicationFormLimits.vesselName.minLength} characters.`,
    vesselNameTooLong: `Vessel name must contain no more than ${flightApplicationFormLimits.vesselName.maxLength} characters.`,
    missingVesselClass: 'Vessel class is required.',
    crewCapacityNotInteger: 'Crew capacity must be a whole number.',
    crewCapacityTooLow: `Crew capacity must be at least ${flightApplicationFormLimits.crewCapacity.min}.`,
    crewCapacityTooHigh: `Crew capacity must be no more than ${flightApplicationFormLimits.crewCapacity.max}.`,
    callsignTooLong: `Callsign must contain no more than ${flightApplicationFormLimits.callsign.maxLength} characters.`,
  },

  flightRequest: {
    missingDestinationSector: 'Destination sector is required.',
    missingFlightPurpose: 'Flight purpose is required.',
  },

  securityClearance: {
    passwordTooShort: `Access passphrase must contain at least ${flightApplicationFormLimits.password.minLength} characters.`,
    termsNotAccepted: 'Stellar Flight Protocol must be accepted.',
    passwordsDoNotMatch: 'Access passphrases must match.',
  },
} as const;

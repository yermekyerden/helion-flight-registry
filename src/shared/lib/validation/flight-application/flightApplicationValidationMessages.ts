import { formLimits } from '@/shared/config/formLimits';

export const flightApplicationValidationMessages = {
  pilotIdentity: {
    nameTooShort: `Full legal name must contain at least ${formLimits.name.minLength} characters.`,
    nameTooLong: `Full legal name must contain no more than ${formLimits.name.maxLength} characters.`,
    ageNotInteger: 'Registry age must be a whole number.',
    ageTooLow: `Registry age must be at least ${formLimits.age.min}.`,
    ageTooHigh: `Registry age must be no more than ${formLimits.age.max}.`,
    invalidEmail: 'Relay email must contain one @ symbol and a valid domain.',
    missingIdentityMarker: 'Identity marker is required.',
    missingPilotPhoto: 'Pilot photo is required.',
    invalidPilotPhotoType: 'Pilot photo must be a PNG or JPEG image.',
    oversizedPilotPhoto: `Pilot photo must be smaller than ${formLimits.image.maxSizeInMegabytes} MB.`,
  },

  originRegistry: {
    missingOriginSector: 'Origin sector is required.',
    originWorldTooShort: `Origin world must contain at least ${formLimits.originWorld.minLength} characters.`,
    originWorldTooLong: `Origin world must contain no more than ${formLimits.originWorld.maxLength} characters.`,
    unknownOriginAuthority:
      'Origin country or authority must exist in the registry.',
  },

  vesselProfile: {
    vesselNameTooShort: `Vessel name must contain at least ${formLimits.vesselName.minLength} characters.`,
    vesselNameTooLong: `Vessel name must contain no more than ${formLimits.vesselName.maxLength} characters.`,
    missingVesselClass: 'Vessel class is required.',
    crewCapacityNotInteger: 'Crew capacity must be a whole number.',
    crewCapacityTooLow: `Crew capacity must be at least ${formLimits.crewCapacity.min}.`,
    crewCapacityTooHigh: `Crew capacity must be no more than ${formLimits.crewCapacity.max}.`,
    callsignTooLong: `Callsign must contain no more than ${formLimits.callsign.maxLength} characters.`,
  },

  flightRequest: {
    missingDestinationSector: 'Destination sector is required.',
    missingFlightPurpose: 'Flight purpose is required.',
  },

  securityClearance: {
    passwordTooShort: `Access passphrase must contain at least ${formLimits.password.minLength} characters.`,
    passwordMissingNumber: 'Access passphrase must contain at least 1 number.',
    passwordMissingUppercaseLetter:
      'Access passphrase must contain at least 1 uppercase letter.',
    passwordMissingLowercaseLetter:
      'Access passphrase must contain at least 1 lowercase letter.',
    passwordMissingSpecialCharacter:
      'Access passphrase must contain at least 1 special character.',
    termsNotAccepted: 'Stellar Flight Protocol must be accepted.',
    passwordsDoNotMatch: 'Access passphrases must match.',
  },
} as const;

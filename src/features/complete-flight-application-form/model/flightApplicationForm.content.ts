import { formLimits } from '@/shared/config/formLimits';

export const flightApplicationFormContent = {
  selectPlaceholder: 'Select registry value',

  actions: {
    resetButtonLabel: 'Reset packet',
    legacySubmitButtonLabel: 'Submit dossier',
    assistedSubmitButtonLabel: 'Run clearance check',
  },

  sections: {
    pilotIdentity: {
      title: 'Pilot identity',
      description:
        'Verify the applicant identity before opening a sector travel dossier.',
    },
    originRegistry: {
      title: 'Origin registry',
      description:
        'Record the applicant sector, world, and recognized origin authority.',
    },
    vesselProfile: {
      title: 'Vessel profile',
      description:
        'Register the vessel assigned to the requested clearance packet.',
    },
    flightRequest: {
      title: 'Flight request',
      description:
        'Define the destination sector and operational purpose of this transit.',
    },
    securityClearance: {
      title: 'Security clearance',
      description:
        'Create the registry access passphrase and accept the flight protocol.',
    },
  },

  fields: {
    name: {
      label: 'Full legal name',
      placeholder: 'Mara Voss',
    },
    age: {
      label: 'Registry age',
      placeholder: '34',
    },
    email: {
      label: 'Relay email',
      placeholder: 'pilot@relay.net',
      hint: 'Used for interstellar registry notifications.',
    },
    gender: {
      label: 'Identity marker',
    },
    pilotPhoto: {
      label: 'Pilot photo',
      hint: `PNG or JPEG image. Maximum file size: ${formLimits.image.maxSizeInMegabytes} MB.`,
    },
    originSector: {
      label: 'Origin sector',
    },
    originWorld: {
      label: 'Origin world',
      placeholder: 'Terra',
    },
    country: {
      label: 'Origin country / authority',
      placeholder: 'United Terran Directorate',
      hint: 'Must match a recognized authority in the registry.',
    },
    vesselName: {
      label: 'Vessel name',
      placeholder: 'Asterion-7',
    },
    vesselClass: {
      label: 'Vessel class',
    },
    crewCapacity: {
      label: 'Crew capacity',
      placeholder: '12',
    },
    callsign: {
      label: 'Callsign',
      placeholder: 'Blue Meridian',
      hint: 'Optional public flight identifier.',
    },
    destinationSector: {
      label: 'Destination sector',
    },
    flightPurpose: {
      label: 'Flight purpose',
    },
    password: {
      label: 'Access passphrase',
      placeholder: 'Enter access passphrase',
    },
    confirmPassword: {
      label: 'Confirm access passphrase',
      placeholder: 'Repeat access passphrase',
    },
    acceptedTerms: {
      label: 'I accept the Stellar Flight Protocol and registry data policy.',
    },
  },

  passphraseIntegrity: {
    title: 'Passphrase integrity',
    description:
      'Registry checks update while the access passphrase is entered.',
    strengthScoreLabel: 'Passphrase strength',
    status: {
      idle: 'Awaiting passphrase',
      incomplete: 'Incomplete',
      ready: 'Ready for clearance',
    },
    requirements: {
      minimumLength: `At least ${formLimits.password.minLength} characters`,
      number: 'At least 1 number',
      uppercaseLetter: 'At least 1 uppercase letter',
      lowercaseLetter: 'At least 1 lowercase letter',
      specialCharacter: 'At least 1 special character',
      confirmationMatch: 'Confirmation matches access passphrase',
    },
    requirementStatus: {
      satisfied: 'Satisfied',
      pending: 'Pending',
    },
  },
} as const;

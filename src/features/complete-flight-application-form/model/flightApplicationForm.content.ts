export const flightApplicationFormContent = {
  selectPlaceholder: 'Select registry value',

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
} as const;

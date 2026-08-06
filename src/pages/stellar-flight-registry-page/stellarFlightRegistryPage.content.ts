import { registryIdentity } from '@/shared/config/registryIdentity';

export const stellarFlightRegistryPageContent = {
  hero: {
    eyebrow: registryIdentity.authorityName,
    title: registryIdentity.registryName,
    description:
      'Internal clearance terminal for pilot identity, origin registry, vessel profile, and interstellar sector travel applications.',
  },

  modal: {
    legacyPilotIntake: {
      eyebrow: 'Clearance packet',
      title: 'Legacy Pilot Intake',
      description:
        'Manual terminal intake. Errors are reported after the dossier submission attempt.',
    },
    assistedFlightClearance: {
      eyebrow: 'Clearance packet',
      title: 'Assisted Flight Clearance',
      description:
        'Live validation protocol. Submit remains locked until the packet is complete.',
    },
  },
} as const;

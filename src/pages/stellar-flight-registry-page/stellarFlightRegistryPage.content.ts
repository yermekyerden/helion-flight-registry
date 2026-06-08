import { registryIdentity } from '@/shared/config/registryIdentity';

export const stellarFlightRegistryPageContent = {
  hero: {
    eyebrow: registryIdentity.authorityName,
    title: registryIdentity.registryName,
    description:
      'Internal clearance terminal for pilot identity, origin registry, vessel profile, and interstellar sector travel applications.',
  },
} as const;

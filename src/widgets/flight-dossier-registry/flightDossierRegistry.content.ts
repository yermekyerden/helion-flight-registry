export const flightDossierRegistryContent = {
  eyebrow: 'Flight dossiers',
  emptyTitle: 'No flight dossiers registered yet',
  emptyDescription:
    'Submitted applications will appear here after a pilot completes either the legacy intake protocol or the assisted clearance protocol.',

  registeredTitle: 'Registered flight dossiers',
  registeredDescription:
    'Pending clearance packets submitted through the active registry node.',

  labels: {
    protocol: 'Protocol',
    status: 'Status',
    pilot: 'Pilot',
    age: 'Registry age',
    email: 'Relay email',
    identityMarker: 'Identity marker',
    origin: 'Origin',
    vessel: 'Vessel',
    crewCapacity: 'Crew',
    destination: 'Destination',
    purpose: 'Purpose',
    submittedAt: 'Submitted',
  },

  status: {
    pendingReview: 'Pending review',
  },

  protocol: {
    legacy: 'Legacy intake',
    assisted: 'Assisted clearance',
  },
} as const;

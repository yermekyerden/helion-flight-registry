export const flightApplicationFormLimits = {
  name: {
    minLength: 2,
    maxLength: 80,
  },
  age: {
    min: 16,
    max: 240,
  },
  originWorld: {
    minLength: 2,
    maxLength: 80,
  },
  vesselName: {
    minLength: 2,
    maxLength: 80,
  },
  callsign: {
    maxLength: 40,
  },
  crewCapacity: {
    min: 1,
    max: 500,
  },
  password: {
    minLength: 8,
  },
  image: {
    maxSizeInMegabytes: 5,
    acceptedMimeTypes: ['image/jpeg', 'image/png'],
  },
} as const;

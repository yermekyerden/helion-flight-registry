import { create } from 'zustand';

import { originAuthorities } from '@/shared/config/flightApplicationOptions';
import type {
  FlightApplication,
  OriginAuthority,
} from './flightApplication.types';

export type FlightApplicationStoreState = {
  flightApplications: FlightApplication[];
  latestFlightApplicationId: string | null;
  originCountryOptions: readonly OriginAuthority[];
  addFlightApplication: (flightApplication: FlightApplication) => void;
  clearFlightApplications: () => void;
};

export const useFlightApplicationStore = create<FlightApplicationStoreState>()(
  (set) => ({
    flightApplications: [],
    latestFlightApplicationId: null,
    originCountryOptions: originAuthorities,

    addFlightApplication: (flightApplication) => {
      set((state) => ({
        flightApplications: [flightApplication, ...state.flightApplications],
        latestFlightApplicationId: flightApplication.id,
      }));
    },

    clearFlightApplications: () => {
      set({
        flightApplications: [],
        latestFlightApplicationId: null,
      });
    },
  }),
);

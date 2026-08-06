import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { originAuthorities } from './flightApplicationOptions';
import type {
  FlightApplication,
  OriginAuthority,
} from './flightApplication.types';

const flightApplicationStoreStorageKey = 'helion-flight-registry';

export interface FlightApplicationStoreState {
  flightApplications: FlightApplication[];
  latestFlightApplicationId: string | null;
  originCountryOptions: readonly OriginAuthority[];
  addFlightApplication: (flightApplication: FlightApplication) => void;
  clearFlightApplications: () => void;
}

export const useFlightApplicationStore = create<FlightApplicationStoreState>()(
  persist(
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
    {
      name: flightApplicationStoreStorageKey,
      partialize: (state) => ({
        flightApplications: state.flightApplications,
        latestFlightApplicationId: state.latestFlightApplicationId,
      }),
    },
  ),
);

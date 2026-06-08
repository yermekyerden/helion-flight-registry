import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
      name: 'helion-flight-registry',
      partialize: (state) => ({
        flightApplications: state.flightApplications,
        latestFlightApplicationId: state.latestFlightApplicationId,
      }),
    },
  ),
);

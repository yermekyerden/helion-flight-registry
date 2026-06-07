import type { FlightApplicationStoreState } from './flightApplicationStore';

export function selectFlightApplications(state: FlightApplicationStoreState) {
  return state.flightApplications;
}

export function selectLatestFlightApplicationId(
  state: FlightApplicationStoreState,
) {
  return state.latestFlightApplicationId;
}

export function selectOriginCountryOptions(state: FlightApplicationStoreState) {
  return state.originCountryOptions;
}

export function selectActiveFlightDossierCount(
  state: FlightApplicationStoreState,
) {
  return state.flightApplications.length;
}

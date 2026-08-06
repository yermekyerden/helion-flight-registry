import { beforeEach, describe, expect, it } from 'vitest';

import { createFlightApplicationFixture } from '@/shared/lib/test/createFlightApplicationFixture';

import { originAuthorities } from './flightApplicationOptions';
import {
  selectActiveFlightDossierCount,
  selectAddFlightApplication,
  selectFlightApplications,
  selectLatestFlightApplicationId,
  selectOriginCountryOptions,
} from './flightApplicationStore.selectors';
import { useFlightApplicationStore } from './flightApplicationStore';

describe('flightApplicationStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useFlightApplicationStore.getState().clearFlightApplications();
  });

  it('starts with an empty flight application registry', () => {
    const storeState = useFlightApplicationStore.getState();

    expect(selectFlightApplications(storeState)).toEqual([]);
    expect(selectLatestFlightApplicationId(storeState)).toBeNull();
    expect(selectActiveFlightDossierCount(storeState)).toBe(0);
  });

  it('keeps origin country options in the store', () => {
    const storeState = useFlightApplicationStore.getState();

    expect(selectOriginCountryOptions(storeState)).toEqual(originAuthorities);
  });

  it('adds a flight application to the beginning of the registry', () => {
    const firstFlightApplication = createFlightApplicationFixture({
      id: 'flight-application-1',
      name: 'Mara Voss',
    });

    const secondFlightApplication = createFlightApplicationFixture({
      id: 'flight-application-2',
      name: 'Orin Vale',
    });

    const addFlightApplication = selectAddFlightApplication(
      useFlightApplicationStore.getState(),
    );

    addFlightApplication(firstFlightApplication);
    addFlightApplication(secondFlightApplication);

    const storeState = useFlightApplicationStore.getState();

    expect(selectFlightApplications(storeState)).toEqual([
      secondFlightApplication,
      firstFlightApplication,
    ]);
  });

  it('stores the latest flight application id when a dossier is added', () => {
    const flightApplication = createFlightApplicationFixture({
      id: 'latest-flight-application',
    });

    useFlightApplicationStore
      .getState()
      .addFlightApplication(flightApplication);

    const storeState = useFlightApplicationStore.getState();

    expect(selectLatestFlightApplicationId(storeState)).toBe(
      'latest-flight-application',
    );
  });

  it('clears registered flight applications and latest id', () => {
    const flightApplication = createFlightApplicationFixture();

    useFlightApplicationStore
      .getState()
      .addFlightApplication(flightApplication);
    useFlightApplicationStore.getState().clearFlightApplications();

    const storeState = useFlightApplicationStore.getState();

    expect(selectFlightApplications(storeState)).toEqual([]);
    expect(selectLatestFlightApplicationId(storeState)).toBeNull();
    expect(selectActiveFlightDossierCount(storeState)).toBe(0);
  });
});

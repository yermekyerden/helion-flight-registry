import { screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useFlightApplicationStore } from '@/entities/flight-application/model/flightApplicationStore';
import { createFlightApplicationFixture } from '@/shared/lib/test/createFlightApplicationFixture';
import { renderWithUser } from '@/shared/lib/test/renderWithUser';

import { FlightDossierRegistry } from './FlightDossierRegistry';

describe('FlightDossierRegistry', () => {
  beforeEach(() => {
    localStorage.clear();
    useFlightApplicationStore.getState().clearFlightApplications();
  });

  it('renders the empty registry state when there are no submitted dossiers', () => {
    renderWithUser(<FlightDossierRegistry />);

    expect(
      screen.getByText('No flight dossiers registered yet'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Submitted applications will appear here after a pilot completes either the legacy intake protocol or the assisted clearance protocol.',
      ),
    ).toBeInTheDocument();
  });

  it('renders submitted flight dossiers from the store', () => {
    const firstFlightApplication = createFlightApplicationFixture({
      id: 'flight-application-1',
      name: 'Mara Voss',
    });

    const secondFlightApplication = createFlightApplicationFixture({
      id: 'flight-application-2',
      name: 'Orin Vale',
      email: 'orin.vale@relay.net',
      protocol: 'legacy',
    });

    useFlightApplicationStore
      .getState()
      .addFlightApplication(firstFlightApplication);

    useFlightApplicationStore
      .getState()
      .addFlightApplication(secondFlightApplication);

    renderWithUser(<FlightDossierRegistry />);

    expect(screen.getByText('Registered flight dossiers')).toBeInTheDocument();
    expect(screen.getByText('Mara Voss')).toBeInTheDocument();
    expect(screen.getByText('Orin Vale')).toBeInTheDocument();
    expect(screen.getByText('mara.voss@relay.net')).toBeInTheDocument();
    expect(screen.getByText('orin.vale@relay.net')).toBeInTheDocument();
  });

  it('marks the latest submitted dossier', () => {
    const firstFlightApplication = createFlightApplicationFixture({
      id: 'flight-application-1',
      name: 'Mara Voss',
    });

    const secondFlightApplication = createFlightApplicationFixture({
      id: 'flight-application-2',
      name: 'Orin Vale',
    });

    useFlightApplicationStore
      .getState()
      .addFlightApplication(firstFlightApplication);

    useFlightApplicationStore
      .getState()
      .addFlightApplication(secondFlightApplication);

    renderWithUser(<FlightDossierRegistry />);

    const latestDossier = screen.getByRole('article', {
      name: 'Latest submitted flight dossier',
    });

    expect(within(latestDossier).getByText('Orin Vale')).toBeInTheDocument();
    expect(
      within(latestDossier).getByText('Latest packet'),
    ).toBeInTheDocument();
  });

  it('renders newer dossiers before older dossiers', () => {
    const firstFlightApplication = createFlightApplicationFixture({
      id: 'flight-application-1',
      name: 'Mara Voss',
    });

    const secondFlightApplication = createFlightApplicationFixture({
      id: 'flight-application-2',
      name: 'Orin Vale',
    });

    useFlightApplicationStore
      .getState()
      .addFlightApplication(firstFlightApplication);

    useFlightApplicationStore
      .getState()
      .addFlightApplication(secondFlightApplication);

    renderWithUser(<FlightDossierRegistry />);

    const pilotNames = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent);

    expect(pilotNames).toEqual(['Orin Vale', 'Mara Voss']);
  });
});

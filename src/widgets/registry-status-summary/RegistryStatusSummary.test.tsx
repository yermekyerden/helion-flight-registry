import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useFlightApplicationStore } from '@/entities/flight-application/model/flightApplicationStore';
import { createFlightApplicationFixture } from '@/shared/lib/test/createFlightApplicationFixture';
import { renderWithUser } from '@/shared/lib/test/renderWithUser';

import { RegistryStatusSummary } from './RegistryStatusSummary';

describe('RegistryStatusSummary', () => {
  beforeEach(() => {
    localStorage.clear();
    useFlightApplicationStore.getState().clearFlightApplications();
  });

  it('renders static registry status cards', () => {
    renderWithUser(<RegistryStatusSummary />);

    expect(screen.getByText('Protocol')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();

    expect(screen.getByText('Clearance node')).toBeInTheDocument();
    expect(screen.getByText('Terra-Orbit / 07')).toBeInTheDocument();
  });

  it('renders zero active dossiers when the registry is empty', () => {
    renderWithUser(<RegistryStatusSummary />);

    expect(screen.getByText('Active dossiers')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders the active dossier count from the store', () => {
    useFlightApplicationStore
      .getState()
      .addFlightApplication(
        createFlightApplicationFixture({ id: 'flight-application-1' }),
      );

    useFlightApplicationStore
      .getState()
      .addFlightApplication(
        createFlightApplicationFixture({ id: 'flight-application-2' }),
      );

    renderWithUser(<RegistryStatusSummary />);

    expect(screen.getByText('Active dossiers')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});

import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useFlightApplicationStore } from '@/entities/flight-application/model/flightApplicationStore';
import { renderWithUser } from '@/shared/lib/test/renderWithUser';

import { StellarFlightRegistryPage } from './StellarFlightRegistryPage';

describe('StellarFlightRegistryPage', () => {
  beforeEach(() => {
    localStorage.clear();
    useFlightApplicationStore.getState().clearFlightApplications();
  });

  it('renders the registry landing page', () => {
    renderWithUser(<StellarFlightRegistryPage />);

    expect(screen.getByText('Celestial Transit Authority')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Helion Flight Registry',
      }),
    ).toBeInTheDocument();

    expect(screen.getByText('Protocol')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
    expect(screen.getByText('Active dossiers')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();

    expect(
      screen.getByText('No flight dossiers registered yet'),
    ).toBeInTheDocument();
  });

  it('opens and closes the legacy pilot intake modal', async () => {
    const { user } = renderWithUser(<StellarFlightRegistryPage />);

    await user.click(
      screen.getByRole('button', { name: 'Legacy Pilot Intake' }),
    );

    expect(
      screen.getByRole('dialog', { name: 'Legacy Pilot Intake' }),
    ).toBeInTheDocument();

    expect(screen.getByText('Legacy terminal protocol')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close modal' }));

    expect(
      screen.queryByRole('dialog', { name: 'Legacy Pilot Intake' }),
    ).not.toBeInTheDocument();
  });

  it('opens and closes the assisted flight clearance modal', async () => {
    const { user } = renderWithUser(<StellarFlightRegistryPage />);

    await user.click(
      screen.getByRole('button', { name: 'Assisted Flight Clearance' }),
    );

    expect(
      screen.getByRole('dialog', { name: 'Assisted Flight Clearance' }),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Assisted validation protocol'),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close modal' }));

    expect(
      screen.queryByRole('dialog', { name: 'Assisted Flight Clearance' }),
    ).not.toBeInTheDocument();
  });
});

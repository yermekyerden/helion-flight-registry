import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithUser } from '@/shared/lib/test/renderWithUser';

import { FlightApplicationLauncher } from './FlightApplicationLauncher';

describe('FlightApplicationLauncher', () => {
  it('renders intake protocol content and action buttons', () => {
    renderWithUser(
      <FlightApplicationLauncher
        onOpenAssistedFlow={vi.fn()}
        onOpenLegacyFlow={vi.fn()}
      />,
    );

    expect(screen.getByText('Intake protocols')).toBeInTheDocument();
    expect(
      screen.getByText('Register a new flight dossier'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Legacy Pilot Intake' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Assisted Flight Clearance' }),
    ).toBeInTheDocument();
  });

  it('calls the legacy flow handler when the legacy button is clicked', async () => {
    const handleOpenLegacyFlow = vi.fn();
    const handleOpenAssistedFlow = vi.fn();

    const { user } = renderWithUser(
      <FlightApplicationLauncher
        onOpenAssistedFlow={handleOpenAssistedFlow}
        onOpenLegacyFlow={handleOpenLegacyFlow}
      />,
    );

    await user.click(
      screen.getByRole('button', { name: 'Legacy Pilot Intake' }),
    );

    expect(handleOpenLegacyFlow).toHaveBeenCalledTimes(1);
    expect(handleOpenAssistedFlow).not.toHaveBeenCalled();
  });

  it('calls the assisted flow handler when the assisted button is clicked', async () => {
    const handleOpenLegacyFlow = vi.fn();
    const handleOpenAssistedFlow = vi.fn();

    const { user } = renderWithUser(
      <FlightApplicationLauncher
        onOpenAssistedFlow={handleOpenAssistedFlow}
        onOpenLegacyFlow={handleOpenLegacyFlow}
      />,
    );

    await user.click(
      screen.getByRole('button', { name: 'Assisted Flight Clearance' }),
    );

    expect(handleOpenAssistedFlow).toHaveBeenCalledTimes(1);
    expect(handleOpenLegacyFlow).not.toHaveBeenCalled();
  });
});

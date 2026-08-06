import { screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useFlightApplicationStore } from '@/entities/flight-application/model/flightApplicationStore';
import { createTestImageFile } from '@/shared/lib/test/createTestImageFile';
import { renderWithUser } from '@/shared/lib/test/renderWithUser';

import { LegacyPilotIntakeForm } from './LegacyPilotIntakeForm';

describe('LegacyPilotIntakeForm', () => {
  beforeEach(() => {
    localStorage.clear();
    useFlightApplicationStore.getState().clearFlightApplications();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('submits a valid legacy flight application and stores it in the registry', async () => {
    const handleSubmitted = vi.fn();
    const pilotPhoto = createTestImageFile({
      content: 'pilot image content',
      name: 'pilot.png',
      type: 'image/png',
    });

    stubLegacyPilotIntakeFormData(pilotPhoto);

    const { user } = renderWithUser(
      <LegacyPilotIntakeForm onSubmitted={handleSubmitted} />,
    );

    await user.click(screen.getByRole('button', { name: 'Submit dossier' }));

    await waitFor(() => {
      expect(handleSubmitted).toHaveBeenCalledTimes(1);
    });

    const storeState = useFlightApplicationStore.getState();

    expect(storeState.flightApplications).toHaveLength(1);
    expect(storeState.flightApplications[0]).toMatchObject({
      name: 'Mara Voss',
      age: 34,
      email: 'mara.voss@relay.net',
      identityMarker: 'Female',
      originSector: 'Sol Core',
      originWorld: 'Terra',
      originAuthority: 'United Terran Directorate',
      vesselName: 'Asterion-7',
      vesselClass: 'Scout Corvette',
      crewCapacity: 12,
      callsign: 'Blue Meridian',
      destinationSector: 'Orion Frontier',
      flightPurpose: 'Scientific Survey',
      protocol: 'legacy',
      status: 'pending-review',
    });

    expect(storeState.flightApplications[0]?.pilotPhotoDataUrl).toContain(
      'data:image/png;base64,',
    );

    expect(storeState.latestFlightApplicationId).toBe(
      storeState.flightApplications[0]?.id,
    );
  });

  it('shows validation errors only after submit attempt', async () => {
    const handleSubmitted = vi.fn();
    const { user } = renderWithUser(
      <LegacyPilotIntakeForm onSubmitted={handleSubmitted} />,
    );

    expect(
      screen.queryByText('Full legal name must contain at least 2 characters.'),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Submit dossier' }));

    expect(
      await screen.findByText(
        'Full legal name must contain at least 2 characters.',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Relay email must contain one @ symbol and a valid domain.',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Origin country or authority must exist in the registry.',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Stellar Flight Protocol must be accepted.'),
    ).toBeInTheDocument();

    expect(handleSubmitted).not.toHaveBeenCalled();
    expect(useFlightApplicationStore.getState().flightApplications).toEqual([]);
  });

  it('clears submitted values and local passphrase state after reset', async () => {
    const { user } = renderWithUser(<LegacyPilotIntakeForm />);

    await user.type(screen.getByLabelText('Full legal name'), 'Mara Voss');
    await user.type(screen.getByLabelText('Access passphrase'), 'Abcdef1!');
    await user.type(
      screen.getByLabelText('Confirm access passphrase'),
      'Abcdef1!',
    );

    expect(screen.getByLabelText('Full legal name')).toHaveValue('Mara Voss');
    expect(screen.getByText('Ready for clearance')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Reset packet' }));

    expect(screen.getByLabelText('Full legal name')).toHaveValue('');
    expect(screen.getByText('Awaiting passphrase')).toBeInTheDocument();
  });
});

function stubLegacyPilotIntakeFormData(pilotPhoto: File) {
  const values: Record<string, FormDataEntryValue | undefined> = {
    name: 'Mara Voss',
    age: '34',
    email: 'mara.voss@relay.net',
    gender: 'Female',
    pilotPhoto,

    originSector: 'Sol Core',
    originWorld: 'Terra',
    country: 'United Terran Directorate',

    vesselName: 'Asterion-7',
    vesselClass: 'Scout Corvette',
    crewCapacity: '12',
    callsign: 'Blue Meridian',

    destinationSector: 'Orion Frontier',
    flightPurpose: 'Scientific Survey',

    password: 'Abcdef1!',
    confirmPassword: 'Abcdef1!',
    acceptedTerms: 'on',
  };

  vi.stubGlobal(
    'FormData',
    class {
      get(fieldName: string) {
        return values[fieldName] ?? null;
      }

      has(fieldName: string) {
        return values[fieldName] !== undefined;
      }
    },
  );
}

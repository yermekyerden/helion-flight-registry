import { screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useFlightApplicationStore } from '@/entities/flight-application/model/flightApplicationStore';
import { createTestImageFile } from '@/shared/lib/test/createTestImageFile';
import { renderWithUser } from '@/shared/lib/test/renderWithUser';

import { AssistedFlightClearanceForm } from './AssistedFlightClearanceForm';

describe('AssistedFlightClearanceForm', () => {
  beforeEach(() => {
    localStorage.clear();
    useFlightApplicationStore.getState().clearFlightApplications();
  });

  it('keeps submit disabled until the flight application form is valid', async () => {
    const { user } = renderWithUser(<AssistedFlightClearanceForm />);

    const submitButton = screen.getByRole('button', {
      name: 'Run clearance check',
    });

    expect(submitButton).toBeDisabled();

    await fillAssistedFlightClearanceForm(user);

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });

  it('submits a valid assisted flight application and stores it in the registry', async () => {
    const handleSubmitted = vi.fn();
    const { user } = renderWithUser(
      <AssistedFlightClearanceForm onSubmitted={handleSubmitted} />,
    );

    await fillAssistedFlightClearanceForm(user);

    const submitButton = screen.getByRole('button', {
      name: 'Run clearance check',
    });

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });

    await user.click(submitButton);

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
      protocol: 'assisted',
      status: 'pending-review',
    });

    expect(storeState.flightApplications[0]?.pilotPhotoDataUrl).toContain(
      'data:image/png;base64,',
    );

    expect(storeState.latestFlightApplicationId).toBe(
      storeState.flightApplications[0]?.id,
    );
  });

  it('shows live validation feedback after an invalid field change', async () => {
    const { user } = renderWithUser(<AssistedFlightClearanceForm />);

    await user.type(screen.getByLabelText('Full legal name'), 'm');

    expect(
      await screen.findByText(
        'Full legal name must contain at least 2 characters.',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Run clearance check' }),
    ).toBeDisabled();
  });

  it('resets entered values and passphrase state', async () => {
    const { user } = renderWithUser(<AssistedFlightClearanceForm />);

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

async function fillAssistedFlightClearanceForm(
  user: ReturnType<typeof renderWithUser>['user'],
) {
  await user.type(screen.getByLabelText('Full legal name'), 'Mara Voss');
  await user.type(screen.getByLabelText('Registry age'), '34');
  await user.type(screen.getByLabelText('Relay email'), 'mara.voss@relay.net');
  await user.selectOptions(screen.getByLabelText('Identity marker'), 'Female');

  await user.upload(
    screen.getByLabelText('Pilot photo'),
    createTestImageFile({
      content: 'pilot image content',
      name: 'pilot.png',
      type: 'image/png',
    }),
  );

  await user.selectOptions(screen.getByLabelText('Origin sector'), 'Sol Core');
  await user.type(screen.getByLabelText('Origin world'), 'Terra');
  await user.type(
    screen.getByLabelText('Origin country / authority'),
    'United Terran Directorate',
  );

  await user.type(screen.getByLabelText('Vessel name'), 'Asterion-7');
  await user.selectOptions(
    screen.getByLabelText('Vessel class'),
    'Scout Corvette',
  );
  await user.type(screen.getByLabelText('Crew capacity'), '12');
  await user.type(screen.getByLabelText('Callsign'), 'Blue Meridian');

  await user.selectOptions(
    screen.getByLabelText('Destination sector'),
    'Orion Frontier',
  );

  await user.selectOptions(
    screen.getByLabelText('Flight purpose'),
    'Scientific Survey',
  );

  await user.type(screen.getByLabelText('Access passphrase'), 'Abcdef1!');
  await user.type(
    screen.getByLabelText('Confirm access passphrase'),
    'Abcdef1!',
  );

  await user.click(
    screen.getByRole('checkbox', {
      name: 'I accept the Stellar Flight Protocol and registry data policy.',
    }),
  );
}

import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithUser } from '@/shared/lib/test/renderWithUser';

import { PassphraseIntegrityPanel } from './PassphraseIntegrityPanel';

describe('PassphraseIntegrityPanel', () => {
  it('renders the idle state when the passphrase is empty', () => {
    renderWithUser(<PassphraseIntegrityPanel confirmPassword="" password="" />);

    expect(screen.getByText('Passphrase integrity')).toBeInTheDocument();
    expect(screen.getByText('Awaiting passphrase')).toBeInTheDocument();
    expect(screen.getByText('Passphrase strength: 0/5')).toBeInTheDocument();
    expect(screen.getAllByText('Pending')).toHaveLength(6);
  });

  it('renders the incomplete state when the passphrase is weak', () => {
    renderWithUser(
      <PassphraseIntegrityPanel confirmPassword="abcdefg" password="abcdefg" />,
    );

    expect(screen.getByText('Incomplete')).toBeInTheDocument();
    expect(screen.getByText('Passphrase strength: 1/5')).toBeInTheDocument();
    expect(screen.getAllByText('Satisfied')).toHaveLength(2);
    expect(screen.getAllByText('Pending')).toHaveLength(4);
  });

  it('renders the incomplete state when the passphrase is strong but confirmation does not match', () => {
    renderWithUser(
      <PassphraseIntegrityPanel
        confirmPassword="Abcdef1?"
        password="Abcdef1!"
      />,
    );

    expect(screen.getByText('Incomplete')).toBeInTheDocument();
    expect(screen.getByText('Passphrase strength: 5/5')).toBeInTheDocument();
    expect(screen.getAllByText('Satisfied')).toHaveLength(5);
    expect(screen.getAllByText('Pending')).toHaveLength(1);
  });

  it('renders the ready state when the passphrase is strong and confirmation matches', () => {
    renderWithUser(
      <PassphraseIntegrityPanel
        confirmPassword="Abcdef1!"
        password="Abcdef1!"
      />,
    );

    expect(screen.getByText('Ready for clearance')).toBeInTheDocument();
    expect(screen.getByText('Passphrase strength: 5/5')).toBeInTheDocument();
    expect(screen.getAllByText('Satisfied')).toHaveLength(6);
  });

  it('renders all passphrase requirements', () => {
    renderWithUser(<PassphraseIntegrityPanel confirmPassword="" password="" />);

    expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
    expect(screen.getByText('At least 1 number')).toBeInTheDocument();
    expect(screen.getByText('At least 1 uppercase letter')).toBeInTheDocument();
    expect(screen.getByText('At least 1 lowercase letter')).toBeInTheDocument();
    expect(
      screen.getByText('At least 1 special character'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Confirmation matches access passphrase'),
    ).toBeInTheDocument();
  });
});

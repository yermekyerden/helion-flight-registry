import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { createFlightApplicationFixture } from '@/shared/lib/test/createFlightApplicationFixture';
import { renderWithUser } from '@/shared/lib/test/renderWithUser';

import { FlightDossierCard } from './FlightDossierCard';

describe('FlightDossierCard', () => {
  it('renders submitted flight application details', () => {
    const flightApplication = createFlightApplicationFixture();

    renderWithUser(
      <FlightDossierCard flightApplication={flightApplication} isLatest />,
    );

    expect(screen.getByText('Mara Voss')).toBeInTheDocument();
    expect(screen.getByText('34')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('mara.voss@relay.net')).toBeInTheDocument();
    expect(
      screen.getByText('Terra / United Terran Directorate'),
    ).toBeInTheDocument();
    expect(screen.getByText('Asterion-7 / Scout Corvette')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Orion Frontier')).toBeInTheDocument();
    expect(screen.getByText('Scientific Survey')).toBeInTheDocument();
  });

  it('renders the pilot photo with an accessible description', () => {
    const flightApplication = createFlightApplicationFixture();

    renderWithUser(
      <FlightDossierCard flightApplication={flightApplication} isLatest />,
    );

    const image = screen.getByRole('img', {
      name: 'Mara Voss pilot registry portrait',
    });

    expect(image).toHaveAttribute('src', 'data:image/png;base64,test-image');
  });

  it('renders latest packet badge and article label for the latest dossier', () => {
    const flightApplication = createFlightApplicationFixture();

    renderWithUser(
      <FlightDossierCard flightApplication={flightApplication} isLatest />,
    );

    expect(
      screen.getByRole('article', {
        name: 'Latest submitted flight dossier',
      }),
    ).toBeInTheDocument();

    expect(screen.getByText('Latest packet')).toBeInTheDocument();
  });

  it('does not render latest packet badge for older dossiers', () => {
    const flightApplication = createFlightApplicationFixture();

    renderWithUser(
      <FlightDossierCard
        flightApplication={flightApplication}
        isLatest={false}
      />,
    );

    expect(screen.queryByText('Latest packet')).not.toBeInTheDocument();
  });

  it.each([
    { protocol: 'assisted' as const, label: 'Assisted clearance' },
    { protocol: 'legacy' as const, label: 'Legacy intake' },
  ])('renders the $label protocol badge', ({ label, protocol }) => {
    const flightApplication = createFlightApplicationFixture({
      protocol,
    });

    renderWithUser(
      <FlightDossierCard flightApplication={flightApplication} isLatest />,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('renders pending review status badge', () => {
    const flightApplication = createFlightApplicationFixture();

    renderWithUser(
      <FlightDossierCard flightApplication={flightApplication} isLatest />,
    );

    expect(screen.getByText('Pending review')).toBeInTheDocument();
  });
});
